# A1 controller firmware

This is complete register-level firmware for STM32C011F4P6, with independent host tests for its control state machine. It compiles to ELF, BIN and HEX. It is **not yet tested on a physical MCU or motor board**.

## Build

The checked build uses Arm GNU Toolchain 13.3.Rel1 (GCC 13.3.1), obtained from Arm's official download, in `toolchain/arm-gnu-toolchain-13.3.rel1-darwin-arm64-arm-none-eabi/`. Other hosts should obtain the same official release and pass `CROSS=/absolute/toolchain/bin/arm-none-eabi-` to make. Do not use the vendored macOS binary on another platform.

The downloadable review archive omits the compiler binaries and unused vendor files. It includes the required CMSIS headers/startup and their original licenses. After installing the stated compiler, use `make -C firmware CROSS=/absolute/toolchain/bin/arm-none-eabi- all` to rebuild on another machine.

```sh
make -C firmware test
make -C firmware all
```

The vendor headers/startup are ST CMSIS device C0 v1.4.1, commit bcc8d94fecb767d1afb53d8c12a8f87ebeb503a2, and Arm CMSIS 5.9.0. Their licenses are retained. The program uses the ST reset clock (HSI48 / 4 = 12 MHz), TIM14 at 20 kHz, ADC with internal-reference calibration and I2C1 at approximately 90 kHz. There is no RTOS, bootloader, network or USB data stack.

## Programming

Disconnect the motor first. Power the board through USB-C and connect a 3.3 V-compatible SWD probe to J5: 1 VTREF, 2 SWDIO, 3 GND, 4 SWCLK, 5 NRST. Do not drive J5 pin 1 from the probe. Use STM32CubeProgrammer to connect under reset and erase/program/verify `build/pa25.hex` (or BIN at 0x08000000).

In the STM32C011 option-byte editor, explicitly set BOR_EN=1, BORR_LEV=3 and BORF_LEV=3, apply/reload, power-cycle and read them back. This selects the highest available brownout thresholds (typical rising 2.91 V, falling 2.81 V). Preserve unrelated option bytes. Firmware checks these fields and holds the motor off with a red LED if they are wrong. Record the readback, firmware checksum and board serial number in the physical test record.

Verify PWM frequency, ADC voltages, actual PD register reads and hardware shutdown with the motor disconnected before the first spin. A compiled binary alone does not validate pin multiplexing or electrical timing on hardware.

## Safety sequence and prototype parameters

The input power path stays inhibited until TPS25730 active PDO/RDO registers report fixed 15 V, at least 1 A operating and 1.5 A maximum current, without capability mismatch. The analog input lockout independently rejects default 5 V. Each unsuccessful I2C check removes run authorization. The driver also needs valid motor voltage and the wired hardware HEALTH signal.

- STOP plus command ≤2% for 500 ms arms the controller. Direction must then be selected at zero.
- PWM rises/falls at 2 permille per millisecond; full-scale ramp is 500 ms.
- First raw direction-contact change latches a ramp-down, even if the switch bounces back.
- Coast lasts at least 2 s, followed by STOP/zero re-arming. A person must verify the shaft has stopped; there is no speed sensor.
- Sustained measured current ≥350 mA for 100 ms latches a fault. This is a prototype cutoff to validate, not a known safe winding/stall duration.
- Valid running VM window is 11.1–12.8 V. Temperature voltage below 300 mV (approximately 65°C) or above 1.8 V (open sensor / outside cold limit) faults.
- U8 independently pulls HEALTH low around 70°C. Reset, watchdog or power loss pulls nSLEEP/PWM low and disables both power stages.
- A roughly 100 ms independent watchdog and a >5 ms loop-lateness check protect stalled firmware. Normal PD polling is every 20 ms. Hardware fault gating is asynchronous.

Tests cover contract type/current/mismatch, startup, zero command, switch bounce, direction change, re-arm, disconnect/reconnect, overload, open/short temperature sensor, rail failure and hardware faults. Peripheral and physical safety tests remain in the board test plan.

The linker emits newlib `nosys` diagnostics for unused file-I/O stubs. The final ELF symbol review confirmed `_close`, `_read`, `_write` and `_lseek` stubs were discarded (evidence/firmware-syscall-symbols.log is empty); the firmware intentionally has no file-I/O implementation. Do not add dummy successful system calls to silence them.
