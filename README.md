# USB-C PWM controller for PA25-24126000-G23

> **UNVALIDATED PROTOTYPE — DO NOT FABRICATE.** The current PCB has a detected short, drill-to-pad clearance violations and undersized traces. Native DRC also reports a crash. This public project is for review and continued development; it is not a tested motor controller or an approved fabrication release.

**A1 prototype, 2026-09-30.** A standalone 90 × 65 mm four-layer board design with an integrated DRV8874 motor driver. No separate motor-driver module is required. Design validation is incomplete; do not manufacture from an intermediate build. The current status and exact evidence are in [VALIDATION.md](VALIDATION.md).

USB-C negotiates fixed 15 V, a protected power path feeds a 12 V buck regulator, and the DRV8874 controls the two-wire motor at 20 kHz. A separate reverse-blocking stage and a switched resistor bank handle regenerative energy. This design is for the PA25-24126000-G23: 12 V and 250 mA rated motor current. The approximately 0.56 A hardware limit is an initial startup-test setting, not a continuous motor rating.

A small STM32C011 supervises the actual PD contract, startup authorization, overload timing and reversal sequence. It replaces multiple timers/latches and makes the restart behavior testable. It does not provide USB data, encoder or UART interfaces. Compiled firmware and host logic tests are included; operation on physical hardware has not been verified.

## Controls and connections

| Connector | Pinout / function |
|---|---|
| J1 USB-C | Power only. Reference: 30 W USB-C PD charger offering fixed 15 V / 2 A, e.g. Anker A2147; verify its regional label. USB-C to USB-C 3 A cable, ≤1 m. |
| J2 motor | 1 = OUT1 / MOTOR_A, 2 = OUT2 / MOTOR_B. Forward makes pin 1 positive. |
| J3 speed | 1 = GND / counterclockwise end, 2 = wiper, 3 = 3.3 V / clockwise end. External 10 kΩ linear potentiometer. |
| J4 direction | 1 = forward contact, 2 = common GND, 3 = reverse contact. Maintained SPDT ON-OFF-ON switch. |
| J5 programming | Standard tscircuit JST PH: 1 VTREF, 2 SWDIO, 3 GND, 4 SWCLK, 5 NRST. VTREF is sense-only. |

Start with the knob at zero and switch at STOP. After a valid supply and 500 ms at STOP/zero, green indicates ready. Select a direction while the knob remains at zero, then raise the speed. A direction change ramps down, coasts and consumes authorization; return to STOP/zero before selecting the opposite direction. Observe a fully stopped shaft before reversing: the initial two-second software delay is not a measured stopping guarantee. Power restoration cannot resume the previous run automatically.

Blue means control power is present, including with an unsupported 5 V source. Red indicates a latched fault. Remove its cause, use STOP and zero, and wait for requalification. Do not repeatedly reset an overload fault.

## Intended prototype scope

Begin with an unloaded motor on a supervised bench, 0–40°C ambient, ventilated board, short internal control cables (≤150 mm) and a twisted motor pair (≤300 mm). No driven-mechanism or continuous back-driving rating has been established. The clamp's initial ≤0.5 J/event and ≤1 W average limits are qualification targets, not physical test results. Startup current, stall current, safe stall duration, reversal delay, winding temperature and regenerative energy must be measured before application use.

The project contains native A4 schematic sheets, exact supplier part identities and native routing configuration. All task files and dependencies are local to this directory. It does not modify the previous controller project.

## Reproduce and review

```sh
bun install --frozen-lockfile
bun run format:check
bun run typecheck
bun run firmware:test
bun run firmware:build
bunx tsci check netlist index.circuit.tsx
bunx tsci check pin_specification index.circuit.tsx
bunx tsci check source index.circuit.tsx
bunx tsci check schematic-placement index.circuit.tsx
bunx tsci check placement index.circuit.tsx
bunx tsci check routing-difficulty index.circuit.tsx
bunx tsci check trace-length net.VM index.circuit.tsx
bun run build -- index.circuit.tsx --pcb-png --pcb-svgs --schematic-svgs
bun test
bunx tsci check shorts dist/index/circuit.json
bunx tsci snapshot index.circuit.tsx
```

Read the routing stage in VALIDATION before changing routing configuration. The 3,600,000 ms build-worker timeout is retained. `firmware/README.md` describes toolchain setup, flashing and required brownout option bytes. No physical hardware tests or board order are claimed.

The review archive excludes downloaded compilers and installed Node dependencies. It retains the exact lockfile, required licensed MCU headers/startup, firmware source and compiled outputs, schematic PDF, reviewed BOM, calculations and validation evidence. Install the pinned dependencies and obtain the stated Arm compiler to rebuild. This archive is not a fabrication package.

Public locations: [GitHub source](https://github.com/AnasSarkiz/usb-c-pwm-pa25) and [tscircuit project](https://tscircuit.com/AnasSarkiz/usb-c-pwm-pa25). See [PUBLICATION.md](PUBLICATION.md) for the published file scope and reproduction details. The `private` field in package.json prevents accidental npm publication; GitHub and tscircuit visibility are managed separately.

Version **0.1.0-prototype.2** adds a local, datasheet-derived 3D package model for U1 (TPS25730DREFR), including contacts, exposed pads and a pin-1 indicator. [Model details and reproduction](assets/README.md). It is a rendered package visualization; the electrical design and rejected routing are unchanged.

- [Architecture and pin review](docs/ARCHITECTURE.md)
- [Calculations and remaining qualification](docs/CALCULATIONS.md)
- [Mechanical / assembly instructions](docs/MECHANICAL.md)
- [Prototype test plan](docs/PROTOTYPE_TEST_PLAN.md)
- [References](references/README.md)
