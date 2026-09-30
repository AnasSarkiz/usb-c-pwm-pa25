#include "control.h"

enum { ZERO_PERMILLE = 20, DEBOUNCE_MS = 30, REARM_MS = 500,
       POWER_SETTLE_MS = 500, COAST_MS = 2000, OVERLOAD_MS = 100,
       OVERLOAD_MA = 350, DUTY_STEP_PER_MS = 2 };

static enum Direction read_direction(const struct Inputs *inputs) {
  if (inputs->forward_closed && inputs->reverse_closed) return INVALID;
  if (inputs->forward_closed) return FORWARD;
  if (inputs->reverse_closed) return REVERSE;
  return STOP;
}

static bool temperature_healthy(const struct Inputs *inputs) {
  // 27.4k pull-up / 10k NTC. ~65°C upper trip; high input detects an open NTC.
  return inputs->adc_valid && inputs->temperature_mv >= 300 && inputs->temperature_mv <= 1800;
}

static bool rail_healthy(const struct Inputs *inputs) {
  return inputs->adc_valid && inputs->vm_mv >= 11100 && inputs->vm_mv <= 12800;
}

static void enter_mode(struct Controller *controller, enum Mode mode) {
  controller->mode = mode;
  controller->state_ticks = 0;
  controller->reset_ticks = 0;
}

void controller_fault(struct Controller *controller, enum Fault fault) {
  controller->fault = fault;
  controller->duty_permille = 0;
  controller->bridge_enabled = false;
  controller->power_enabled = false;
  controller->overload_ticks = 0;
  enter_mode(controller, FAULT);
}

bool pd_contract_valid(uint32_t pdo, uint32_t rdo) {
  const uint32_t voltage_mv = ((pdo >> 10) & 1023U) * 50U;
  const uint32_t offered_ma = (pdo & 1023U) * 10U;
  const uint32_t operating_ma = ((rdo >> 10) & 1023U) * 10U;
  const uint32_t maximum_ma = (rdo & 1023U) * 10U;
  return (pdo >> 30) == 0 && voltage_mv == 15000 && offered_ma >= 1500 &&
    ((rdo >> 28) & 7U) != 0 && (rdo & ((1UL << 26) | (1UL << 27))) == 0 &&
    operating_ma >= 1000 && maximum_ma >= 1500 && maximum_ma <= offered_ma;
}

void controller_tick(struct Controller *controller, const struct Inputs *inputs) {
  const enum Direction raw_direction = read_direction(inputs);
  if (raw_direction != controller->observed_direction) {
    controller->observed_direction = raw_direction;
    controller->direction_ticks = 0;
  } else if (controller->direction_ticks < DEBOUNCE_MS) {
    controller->direction_ticks++;
  } else {
    controller->stable_direction = raw_direction;
  }
  if (controller->state_ticks < 60000) controller->state_ticks++;

  if (!inputs->pd_valid) {
    controller->power_enabled = false;
    controller->bridge_enabled = false;
    controller->duty_permille = 0;
    controller->overload_ticks = 0;
    enter_mode(controller, WAIT_PD);
    return;
  }
  if (controller->mode == WAIT_PD) {
    controller->power_enabled = true;
    controller->fault = NO_FAULT;
    enter_mode(controller, POWER_SETTLE);
    return;
  }
  if (controller->mode == FAULT) {
    if (raw_direction == STOP && controller->stable_direction == STOP &&
        inputs->pot_permille <= ZERO_PERMILLE && temperature_healthy(inputs)) {
      if (++controller->reset_ticks >= REARM_MS) {
        controller->power_enabled = true;
        controller->fault = NO_FAULT;
        enter_mode(controller, POWER_SETTLE);
      }
    } else {
      controller->reset_ticks = 0;
    }
    return;
  }
  if (controller->mode == POWER_SETTLE) {
    if (controller->state_ticks < POWER_SETTLE_MS) return;
    if (!rail_healthy(inputs)) { controller_fault(controller, POWER_FAULT); return; }
    if (!inputs->hardware_healthy) { controller_fault(controller, HARDWARE_FAULT); return; }
    enter_mode(controller, DISARMED);
  }
  if (!temperature_healthy(inputs)) { controller_fault(controller, TEMPERATURE_FAULT); return; }
  if (!rail_healthy(inputs)) { controller_fault(controller, POWER_FAULT); return; }
  if (!inputs->hardware_healthy) { controller_fault(controller, HARDWARE_FAULT); return; }
  if (controller->stable_direction == INVALID) { controller_fault(controller, SWITCH_FAULT); return; }

  if (controller->bridge_enabled && inputs->current_ma >= OVERLOAD_MA) {
    if (++controller->overload_ticks >= OVERLOAD_MS) {
      controller_fault(controller, OVERLOAD_FAULT);
      return;
    }
  } else {
    controller->overload_ticks = 0;
  }

  switch (controller->mode) {
  case DISARMED:
    if (raw_direction == STOP && controller->stable_direction == STOP && inputs->pot_permille <= ZERO_PERMILLE) {
      if (++controller->reset_ticks >= REARM_MS) enter_mode(controller, READY);
    } else controller->reset_ticks = 0;
    break;
  case READY:
    if (controller->stable_direction == FORWARD || controller->stable_direction == REVERSE) {
      // Direction must be selected at zero. Raising the knob first consumes authorization.
      if (inputs->pot_permille > ZERO_PERMILLE) { enter_mode(controller, DISARMED); break; }
      controller->applied_direction = controller->stable_direction;
      enter_mode(controller, RUNNING);
    }
    break;
  case RUNNING:
    if (raw_direction != controller->applied_direction) {
      enter_mode(controller, RAMP_DOWN);
      break;
    }
    if (inputs->pot_permille <= ZERO_PERMILLE) {
      controller->duty_permille = 0;
      controller->bridge_enabled = false;
    } else {
      const uint16_t target = (uint16_t)(((uint32_t)inputs->pot_permille - ZERO_PERMILLE) * 1000U / (1000U - ZERO_PERMILLE));
      if (controller->duty_permille + DUTY_STEP_PER_MS < target) controller->duty_permille += DUTY_STEP_PER_MS;
      else if (controller->duty_permille > target + DUTY_STEP_PER_MS) controller->duty_permille -= DUTY_STEP_PER_MS;
      else controller->duty_permille = target;
      // Allow >1 ms driver wake-up before any PWM pulses.
      controller->bridge_enabled = true;
    }
    break;
  case RAMP_DOWN:
    if (controller->duty_permille > DUTY_STEP_PER_MS) controller->duty_permille -= DUTY_STEP_PER_MS;
    else {
      controller->duty_permille = 0;
      controller->bridge_enabled = false;
      enter_mode(controller, COAST);
    }
    break;
  case COAST:
    if (controller->state_ticks >= COAST_MS) enter_mode(controller, DISARMED);
    break;
  default:
    break;
  }
}
