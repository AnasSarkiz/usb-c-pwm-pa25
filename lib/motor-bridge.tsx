import { SchematicNote } from "./schematic-note";
import { DRV8874PWPR } from "../imports/DRV8874PWPR";
import { EEEFK1E471AP } from "../imports/EEEFK1E471AP";
import { KF350_3_5_2P } from "../imports/KF350_3_5_2P";
import { C, R, TestPad } from "./passives";

export function MotorBridge() {
	return (
		<schematicsheet
			name="bridge"
			displayName="03 12 V current-regulated motor bridge — A1 prototype"
			sheetSize="A4"
			sheetIndex={2}
		>
			<DRV8874PWPR
				name="U6"
				schHeight={1.8}
				pcbX={25}
				pcbY={-3}
				schX={0}
				schY={3}
				connections={{
					EN: "net.PWM",
					PH: "net.DIR",
					nSLEEP: "net.DRIVE_ENABLE",
					nFAULT: "net.HEALTH",
					VREF: "net.VREF_2V5",
					IPROPI: "net.IPROPI",
					OUT1: "net.MOTOR_A",
					OUT2: "net.MOTOR_B",
					VM: "net.VM",
					VCP: "net.VCP",
					CPH: "net.CPH",
					CPL: "net.CPL",
					GND: "net.GND",
					PGND: "net.GND",
					EP: "net.GND",
					PMODE: "net.GND",
				}}
				noConnect={["IMODE"]}
			/>
			<SchematicNote
				schX={0}
				schY={9}
				fontSize={0.23}
				text={
					"U6: DRV8874, 12 V brushed-motor H-bridge.\nPMODE low = PH/EN; 20 kHz drive/brake PWM. EN low = brake.\nnSLEEP low = high-impedance coast; firmware ramps before STOP.\nIMODE floating = 25 µs fixed-off-time regulation, latched overcurrent fault.\nIlimit ≈2.5 V / (9.8795 kΩ × 450 µA/A) = 0.562 A; prototype setting."
				}
			/>
			<KF350_3_5_2P
				name="J2"
				pcbX={40}
				pcbY={-4}
				pcbRotation={90}
				schX={10}
				schY={4}
				connections={{ pin1: "net.MOTOR_A", pin2: "net.MOTOR_B" }}
			/>
			<C
				name="C20"
				capacitance="100nF"
				pcb={[29, 2]}
				sch={[8, 0]}
				nets={["VM", "GND"]}
			/>
			<C
				name="C21"
				capacitance="22nF"
				pcb={[25, 3.5]}
				sch={[-8, 4]}
				nets={["CPH", "CPL"]}
			/>
			<C
				name="C22"
				capacitance="100nF"
				pcb={[29, 5]}
				sch={[-8, 0.5]}
				nets={["VCP", "VM"]}
			/>
			<EEEFK1E471AP
				name="C23"
				pcbX={26}
				pcbY={-16}
				schX={10}
				schY={-4}
				schRotation={-90}
				connections={{ pin1: "net.VM", pin2: "net.GND" }}
			/>
			<R
				name="R30"
				resistance="10k"
				pcb={[20, -8]}
				sch={[-8, -3]}
				nets={["IPROPI", "GND"]}
			/>
			<R
				name="R31"
				rotation={180}
				resistance="820k"
				pcb={[15, -7]}
				sch={[-3, -3]}
				nets={["IPROPI", "GND"]}
			/>
			<R
				name="R32"
				resistance="1k"
				pcb={[16, -10]}
				sch={[2, -3]}
				nets={["IPROPI", "CURRENT_ADC"]}
			/>
			<C
				name="C24"
				rotation={180}
				capacitance="100nF"
				pcb={[12, -13]}
				sch={[2, -6]}
				nets={["CURRENT_ADC", "GND"]}
			/>
			<R
				name="R33"
				resistance="100k"
				pcb={[20, -2]}
				sch={[-8, -6]}
				nets={["PWM", "GND"]}
			/>
			<R
				name="R34"
				resistance="100k"
				pcb={[20, -4.5]}
				sch={[-3, -6]}
				nets={["DRIVE_ENABLE", "GND"]}
			/>
			<SchematicNote
				schX={1}
				schY={-9.5}
				fontSize={0.23}
				text={
					"J2: PA25-24126000-G23 ONLY; rated 12 V / 250 mA, two wires.\n0.56 A regulation is not a continuous motor rating. Stall duration is unknown.\nFirmware overload shutdown and board-temperature trip do not measure winding temperature.\nC23: 470 µF / 25 V; rail clamp is on sheet 04. No external VM power injection."
				}
			/>
			<TestPad name="TP5" net="VM" pcb={[34, -15]} sch={[11, -7]} />
			<TestPad name="TP6" net="IPROPI" pcb={[17, -16]} sch={[-12, -3]} />
			<TestPad name="TP7" net="PWM" pcb={[17, -20]} sch={[-12, -6]} />
			<TestPad name="TP8" net="GND" pcb={[34, -19]} sch={[11, -9]} />
		</schematicsheet>
	);
}
