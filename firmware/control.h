#ifndef PA25_CONTROL_H
#define PA25_CONTROL_H
#include <stdbool.h>
#include <stdint.h>

enum Direction { STOP, FORWARD, REVERSE, INVALID };
enum Mode { WAIT_PD, POWER_SETTLE, DISARMED, READY, RUNNING, RAMP_DOWN, COAST, FAULT };
enum Fault { NO_FAULT, POWER_FAULT, HARDWARE_FAULT, OVERLOAD_FAULT, TEMPERATURE_FAULT, SWITCH_FAULT, SCHEDULER_FAULT };

struct Inputs {
  bool pd_valid;
  bool hardware_healthy;
  bool forward_closed;
  bool reverse_closed;
  bool adc_valid;
  uint16_t pot_permille;
  uint16_t current_ma;
  uint16_t vm_mv;
  uint16_t temperature_mv;
};

struct Controller {
  enum Mode mode;
  enum Fault fault;
  enum Direction observed_direction;
  enum Direction stable_direction;
  enum Direction applied_direction;
  uint16_t direction_ticks;
  uint16_t state_ticks;
  uint16_t reset_ticks;
  uint16_t overload_ticks;
  uint16_t duty_permille;
  bool power_enabled;
  bool bridge_enabled;
};

// Called once per millisecond. Time assumptions are checked by the platform layer.
void controller_tick(struct Controller *controller, const struct Inputs *inputs);
void controller_fault(struct Controller *controller, enum Fault fault);
bool pd_contract_valid(uint32_t pdo, uint32_t rdo);
#endif
