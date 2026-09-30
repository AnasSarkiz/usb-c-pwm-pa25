#include "control.h"
#include <assert.h>
#include <stdio.h>

static struct Inputs healthy = {.pd_valid=true,.hardware_healthy=true,.adc_valid=true,.vm_mv=12000,.temperature_mv=880};

static void tick_for(struct Controller *controller, unsigned milliseconds) {
  while (milliseconds--) controller_tick(controller, &healthy);
}

static struct Controller ready_controller(void) {
  struct Controller controller = {0};
  healthy.forward_closed=false; healthy.reverse_closed=false;
  healthy.pot_permille=0; healthy.current_ma=0; healthy.pd_valid=true;
  healthy.hardware_healthy=true; healthy.vm_mv=12000; healthy.temperature_mv=880;
  tick_for(&controller,1100);
  assert(controller.mode==READY && controller.duty_permille==0);
  return controller;
}

static void run_forward(struct Controller *controller) {
  healthy.forward_closed=true;
  tick_for(controller,40);
  assert(controller->mode==RUNNING && controller->duty_permille==0);
  healthy.pot_permille=1000;
  tick_for(controller,500);
  assert(controller->duty_permille==1000 && controller->applied_direction==FORWARD);
}

int main(void) {
  const uint32_t pdo = (300UL<<10)|200U;
  const uint32_t rdo = (2UL<<28)|(100UL<<10)|150U;
  assert(pd_contract_valid(pdo,rdo));
  assert(!pd_contract_valid((100UL<<10)|300U,rdo));
  assert(!pd_contract_valid(pdo,rdo|(1UL<<26)));
  assert(!pd_contract_valid(pdo,rdo|(1UL<<27)));
  assert(!pd_contract_valid(pdo,0));
  assert(!pd_contract_valid(pdo|(3UL<<30),rdo));
  assert(!pd_contract_valid((300UL<<10)|100U,rdo));
  struct Controller controller=ready_controller();
  run_forward(&controller);

  // Bounce initiates a retained ramp-down; it cannot reverse or restart the ramp.
  healthy.forward_closed=false; healthy.reverse_closed=true;
  tick_for(&controller,10);
  assert(controller.mode==RAMP_DOWN && controller.applied_direction==FORWARD);
  healthy.forward_closed=true; healthy.reverse_closed=false;
  tick_for(&controller,600);
  assert(controller.mode==COAST && !controller.bridge_enabled);
  tick_for(&controller,2500);
  assert(controller.mode==DISARMED && !controller.bridge_enabled);
  healthy.forward_closed=false; healthy.pot_permille=0;
  tick_for(&controller,600);
  assert(controller.mode==READY);
  healthy.reverse_closed=true; tick_for(&controller,40);
  healthy.pot_permille=500; tick_for(&controller,300);
  assert(controller.mode==RUNNING && controller.applied_direction==REVERSE);

  // Unplug/reconnect with controls unchanged never restarts the motor.
  healthy.pd_valid=false; tick_for(&controller,1);
  assert(controller.mode==WAIT_PD && !controller.power_enabled && !controller.bridge_enabled);
  healthy.pd_valid=true; tick_for(&controller,1500);
  assert(controller.mode==DISARMED && controller.duty_permille==0);

  controller=ready_controller(); run_forward(&controller);
  healthy.current_ma=400; tick_for(&controller,99);
  assert(controller.mode==RUNNING);
  tick_for(&controller,1);
  assert(controller.mode==FAULT && controller.fault==OVERLOAD_FAULT && !controller.power_enabled);
  tick_for(&controller,1000); assert(controller.mode==FAULT);

  controller=ready_controller(); run_forward(&controller);
  healthy.pot_permille=0; tick_for(&controller,1);
  assert(controller.duty_permille==0 && !controller.bridge_enabled);
  healthy.temperature_mv=0; tick_for(&controller,1);
  assert(controller.fault==TEMPERATURE_FAULT);
  controller=ready_controller(); run_forward(&controller);
  healthy.temperature_mv=3300; tick_for(&controller,1);
  assert(controller.fault==TEMPERATURE_FAULT);
  controller=ready_controller(); run_forward(&controller);
  healthy.hardware_healthy=false; tick_for(&controller,1);
  assert(controller.fault==HARDWARE_FAULT && !controller.bridge_enabled);
  controller=ready_controller(); run_forward(&controller);
  healthy.vm_mv=14000; tick_for(&controller,1);
  assert(controller.fault==POWER_FAULT && !controller.bridge_enabled);
  controller=ready_controller();
  healthy.forward_closed=true; healthy.reverse_closed=true;
  tick_for(&controller,40); assert(controller.fault==SWITCH_FAULT);
  puts("PASS: PD qualification, restart interlock, sequencing, bounce, overload, thermal, supply, hardware faults, true zero");
}
