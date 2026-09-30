#include "stm32c011xx.h"
#include "control.h"

static volatile uint32_t milliseconds;
static uint16_t bridge_wake_ticks;

void SysTick_Handler(void) { milliseconds++; }

struct RegisterWait { volatile uint32_t *reg; uint32_t mask; bool asserted; };

static bool wait_register(struct RegisterWait condition) {
  const uint32_t started = milliseconds;
  while (((*condition.reg & condition.mask) != 0) != condition.asserted) {
    if ((uint32_t)(milliseconds-started) >= 5) return false;
  }
  return true;
}

static void delay_ms(uint32_t duration) {
  const uint32_t started = milliseconds;
  while ((uint32_t)(milliseconds-started) < duration) __WFI();
}

static void safe_outputs(void) {
  TIM14->CCR1=0;
  GPIOA->BSRR=(1UL<<(6+16))|(1UL<<11);
  bridge_wake_ticks=0;
}

static void gpio_init(void) {
  RCC->IOPENR |= RCC_IOPENR_GPIOAEN|RCC_IOPENR_GPIOBEN|RCC_IOPENR_GPIOCEN;
  (void)RCC->IOPENR;
  GPIOA->BSRR=(1UL<<11)|(1UL<<(5+16))|(1UL<<(6+16))|(1UL<<(7+16))|(1UL<<(12+16));
  GPIOA->OTYPER |= 1UL<<11; // Released output asserts the external power-inhibit MOSFET.
  const uint32_t output_mask=(3UL<<10)|(3UL<<12)|(3UL<<14)|(3UL<<22)|(3UL<<24);
  GPIOA->MODER=(GPIOA->MODER & ~(output_mask|(3UL<<8)|(3UL<<16)))|
    (1UL<<10)|(1UL<<12)|(1UL<<14)|(1UL<<22)|(1UL<<24)|(2UL<<8)|0xFFUL;
  GPIOA->AFR[0]=(GPIOA->AFR[0]&~(15UL<<16))|(4UL<<16); // PA4 AF4 TIM14_CH1.
  GPIOC->MODER &= ~((3UL<<28)|(3UL<<30));
  GPIOB->OTYPER |= (1UL<<6)|(1UL<<7);
  GPIOB->MODER=(GPIOB->MODER&~((3UL<<12)|(3UL<<14)))|(2UL<<12)|(2UL<<14);
  GPIOB->AFR[0]=(GPIOB->AFR[0]&~((15UL<<24)|(15UL<<28)))|(6UL<<24)|(6UL<<28);
}

static void timer_init(void) {
  RCC->APBENR2 |= RCC_APBENR2_TIM14EN;
  TIM14->PSC=0;
  TIM14->ARR=599; // HSI48 / 4 = 12 MHz; 12 MHz / 600 = 20 kHz.
  TIM14->CCR1=0;
  TIM14->CCMR1=(6UL<<TIM_CCMR1_OC1M_Pos)|TIM_CCMR1_OC1PE;
  TIM14->CCER=TIM_CCER_CC1E;
  TIM14->EGR=TIM_EGR_UG;
  TIM14->CR1=TIM_CR1_ARPE|TIM_CR1_CEN;
}

static bool adc_init(void) {
  RCC->APBENR2 |= RCC_APBENR2_ADCEN;
  ADC1->CFGR2=ADC_CFGR2_CKMODE_0; // PCLK / 2 = 6 MHz.
  ADC1->CR=ADC_CR_ADVREGEN;
  delay_ms(1);
  ADC1->CR |= ADC_CR_ADCAL;
  if (!wait_register((struct RegisterWait){&ADC1->CR,ADC_CR_ADCAL,false})) return false;
  delay_ms(1);
  ADC1->SMPR=ADC_SMPR_SMP1; // Long acquisition for the high-impedance dividers.
  ADC1_COMMON->CCR |= ADC_CCR_VREFEN;
  ADC1->ISR=ADC_ISR_ADRDY;
  ADC1->CR |= ADC_CR_ADEN;
  return wait_register((struct RegisterWait){&ADC1->ISR,ADC_ISR_ADRDY,true});
}

static bool adc_read(uint8_t channel, uint16_t *sample) {
  ADC1->ISR=ADC_ISR_CCRDY|ADC_ISR_EOC|ADC_ISR_EOS|ADC_ISR_OVR;
  ADC1->CHSELR=1UL<<channel;
  if (!wait_register((struct RegisterWait){&ADC1->ISR,ADC_ISR_CCRDY,true})) return false;
  ADC1->CR |= ADC_CR_ADSTART;
  if (!wait_register((struct RegisterWait){&ADC1->ISR,ADC_ISR_EOC,true})) return false;
  *sample=(uint16_t)ADC1->DR;
  return true;
}

static void i2c_init(void) {
  RCC->APBENR1 |= RCC_APBENR1_I2C1EN;
  RCC->CCIPR &= ~RCC_CCIPR_I2C1SEL; // PCLK 12 MHz.
  I2C1->CR1=0;
  // Conservative standard-mode timing, about 90 kHz; 300 ns rise/fall budget.
  I2C1->TIMINGR=0x10421B23UL;
  I2C1->CR1=I2C_CR1_PE;
}

static bool i2c_wait(uint32_t mask) {
  const uint32_t started=milliseconds;
  while (!(I2C1->ISR & mask)) {
    if ((I2C1->ISR & (I2C_ISR_NACKF|I2C_ISR_BERR|I2C_ISR_ARLO)) ||
        (uint32_t)(milliseconds-started)>=5) return false;
  }
  return true;
}

struct PdRead { uint8_t address; uint8_t length; uint8_t bytes[6]; };

static bool pd_read(struct PdRead *request) {
  if (I2C1->ISR & I2C_ISR_BUSY) return false;
  I2C1->ICR=I2C_ICR_STOPCF|I2C_ICR_NACKCF|I2C_ICR_BERRCF|I2C_ICR_ARLOCF;
  I2C1->CR2=(0x21UL<<1)|(1UL<<I2C_CR2_NBYTES_Pos)|I2C_CR2_START;
  if (!i2c_wait(I2C_ISR_TXIS)) return false;
  I2C1->TXDR=request->address;
  if (!i2c_wait(I2C_ISR_TC)) return false;
  I2C1->CR2=(0x21UL<<1)|((uint32_t)(request->length+1)<<I2C_CR2_NBYTES_Pos)|
    I2C_CR2_RD_WRN|I2C_CR2_AUTOEND|I2C_CR2_START;
  if (!i2c_wait(I2C_ISR_RXNE)) return false;
  const uint8_t length=(uint8_t)I2C1->RXDR;
  for (unsigned index=0;index<request->length;index++) {
    if (!i2c_wait(I2C_ISR_RXNE)) return false;
    request->bytes[index]=(uint8_t)I2C1->RXDR;
  }
  if (!i2c_wait(I2C_ISR_STOPF)) return false;
  I2C1->ICR=I2C_ICR_STOPCF;
  return length==request->length;
}

static uint32_t little_endian_word(const uint8_t *bytes) {
  return bytes[0]|((uint32_t)bytes[1]<<8)|((uint32_t)bytes[2]<<16)|((uint32_t)bytes[3]<<24);
}

static bool qualify_pd(void) {
  struct PdRead pdo={.address=0x34,.length=6};
  struct PdRead rdo={.address=0x35,.length=4};
  if (!pd_read(&pdo) || !pd_read(&rdo)) {
    I2C1->CR1=0;
    I2C1->CR1=I2C_CR1_PE;
    return false; // An unsuccessful read always removes run authorization.
  }
  return pd_contract_valid(little_endian_word(pdo.bytes),little_endian_word(rdo.bytes));
}

static bool read_inputs(struct Inputs *inputs) {
  uint16_t adc[5];
  for (uint8_t channel=0;channel<4;channel++) if (!adc_read(channel,&adc[channel])) return false;
  if (!adc_read(10,&adc[4]) || adc[4]==0) return false; // STM32C011 internal VREFINT channel 10.
  const uint16_t factory_vref=*(const uint16_t *)0x1FFF756AUL;
  const uint32_t vdda_mv=(uint32_t)factory_vref*3000U/adc[4];
  if (factory_vref==0 || factory_vref==65535 || vdda_mv<3000 || vdda_mv>3500) return false;
  inputs->pot_permille=(uint16_t)((uint32_t)adc[0]*1000U/4095U);
  if (inputs->pot_permille>=980) inputs->pot_permille=1000;
  const uint32_t current_mv=(uint32_t)adc[1]*vdda_mv/4095U;
  inputs->current_ma=(uint16_t)(current_mv*1000U/4446U);
  inputs->vm_mv=(uint16_t)(((uint32_t)adc[2]*vdda_mv/4095U)*1267U/267U);
  inputs->temperature_mv=(uint16_t)((uint32_t)adc[3]*vdda_mv/4095U);
  inputs->hardware_healthy=(GPIOA->IDR&(1UL<<8))!=0;
  inputs->forward_closed=(GPIOC->IDR&(1UL<<14))==0;
  inputs->reverse_closed=(GPIOC->IDR&(1UL<<15))==0;
  return true;
}

static void apply_outputs(const struct Controller *controller, uint16_t elapsed_ms) {
  if (!controller->bridge_enabled) {
    TIM14->CCR1=0;
    GPIOA->BSRR=1UL<<(6+16);
    bridge_wake_ticks=0;
    GPIOA->BSRR=controller->applied_direction==FORWARD ? (1UL<<5) : (1UL<<(5+16));
  } else {
    GPIOA->BSRR=1UL<<6;
    if (bridge_wake_ticks<3) {
      bridge_wake_ticks+=elapsed_ms;
      TIM14->CCR1=0;
    } else TIM14->CCR1=(uint32_t)controller->duty_permille*600U/1000U;
  }
  GPIOA->BSRR=controller->power_enabled ? (1UL<<(11+16)) : (1UL<<11);
  GPIOA->BSRR=controller->mode==FAULT ? (1UL<<7) : (1UL<<(7+16));
  GPIOA->BSRR=(controller->mode==READY || controller->mode==RUNNING) ? (1UL<<12) : (1UL<<(12+16));
}

int main(void) {
  SystemCoreClockUpdate();
  gpio_init();
  timer_init();
  safe_outputs();
  SysTick_Config(SystemCoreClock/1000U);
  // Programming verification is part of assembly: BOR must be enabled at the highest levels.
  const uint32_t bor_mask=FLASH_OPTR_BOR_EN|FLASH_OPTR_BORR_LEV|FLASH_OPTR_BORF_LEV;
  if (SystemCoreClock!=12000000UL || (FLASH->OPTR&bor_mask)!=bor_mask || !adc_init()) {
    GPIOA->BSRR=1UL<<7;
    for (;;) __WFI();
  }
  i2c_init();
  IWDG->KR=0xCCCC;
  IWDG->KR=0x5555;
  IWDG->PR=2;
  IWDG->RLR=199; // About 100 ms at nominal 32 kHz; tolerate LSI variation.
  while (IWDG->SR) {}
  IWDG->KR=0xAAAA;
  struct Controller controller={0};
  struct Inputs inputs={0};
  uint32_t last_update=milliseconds;
  uint32_t last_pd=milliseconds-20U;
  for (;;) {
    __WFI();
    if ((uint32_t)(milliseconds-last_pd)>=20) {
      inputs.pd_valid=qualify_pd();
      last_pd=milliseconds;
      if (!inputs.pd_valid) safe_outputs();
    }
    inputs.adc_valid=read_inputs(&inputs);
    const uint32_t now=milliseconds;
    const uint32_t elapsed=now-last_update;
    if (elapsed==0) continue;
    if (elapsed>5) controller_fault(&controller,SCHEDULER_FAULT);
    else for (uint32_t tick=0;tick<elapsed;tick++) controller_tick(&controller,&inputs);
    apply_outputs(&controller,(uint16_t)elapsed);
    last_update=now;
    IWDG->KR=0xAAAA;
  }
}
