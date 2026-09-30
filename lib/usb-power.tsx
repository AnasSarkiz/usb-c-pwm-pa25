import { SchematicNote } from "./schematic-note";
import { TPS25730DREFR } from "../imports/TPS25730DREFR";
import { TPS70933DBVR } from "../imports/TPS70933DBVR";
import { TPD2E2U06DCKR } from "../imports/TPD2E2U06DCKR";
import { TVS2200DRVR } from "../imports/TVS2200DRVR";
import { USB4105_GF_A } from "../imports/USB4105_GF_A";
import { C, R, TestPad } from "./passives";

export function UsbPower() {
	return (
		<schematicsheet
			name="usb"
			displayName="01 USB-C PD and control supply — A1 prototype"
			sheetSize="A4"
			sheetIndex={0}
		>
			<USB4105_GF_A
				name="J1"
				pcbX={-40}
				pcbY={0}
				pcbRotation={270}
				schX={-10}
				schY={4}
				connections={{
					EH1: "net.GND",
					EH2: "net.GND",
					EH3: "net.GND",
					EH4: "net.GND",
					GND1: "net.GND",
					GND2: "net.GND",
					GND3: "net.GND",
					GND4: "net.GND",
					VBUS1: "net.VBUS",
					VBUS2: "net.VBUS",
					VBUS3: "net.VBUS",
					VBUS4: "net.VBUS",
					CC1: "net.CC1",
					CC2: "net.CC2",
				}}
				noConnect={["SBU1", "SBU2", "DP1", "DP2", "DN1", "DN2"]}
			/>
			<TVS2200DRVR
				name="D1"
				schHeight={0.8}
				pcbX={-34}
				pcbY={1}
				schX={-10}
				schY={-4}
				connections={{
					IN1: "net.VBUS",
					IN2: "net.VBUS",
					IN3: "net.VBUS",
					GND1: "net.GND",
					GND2: "net.GND",
					GND3: "net.GND",
					GND4: "net.GND",
				}}
			/>
			<TPD2E2U06DCKR
				name="D2"
				pcbX={-34}
				pcbY={-3}
				schX={-10}
				schY={-7}
				connections={{ IO1: "net.CC1", IO2: "net.CC2", GND: "net.GND" }}
			/>
			<TPS25730DREFR
				name="U1"
				pcbX={-27}
				pcbY={0}
				schX={0}
				schY={3}
				connections={{
					LDO_3V3: "net.PD_3V3",
					LDO_1V5: "net.PD_1V5",
					ADCIN1: "net.PD_MIN",
					ADCIN2: "net.PD_MAX",
					ADCIN3: "net.PD_IOP",
					ADCIN4: "net.GND",
					I2Ct_SDA: "net.SDA",
					I2Ct_SCL: "net.SCL",
					N_FAULT_IN: "net.PD_3V3",
					PPHV1: "net.PD_OUT",
					PPHV2: "net.PD_OUT",
					PPHV3: "net.PD_OUT",
					VBUS_IN1: "net.VBUS",
					VBUS_IN2: "net.VBUS",
					VBUS_IN3: "net.VBUS",
					VBUS1: "net.VBUS",
					VBUS2: "net.VBUS",
					GND1: "net.GND",
					GND2: "net.GND",
					GND3: "net.GND",
					GND4: "net.GND",
					GND5: "net.GND",
					GND6: "net.GND",
					GND7: "net.GND",
					GND8: "net.GND",
					GND9: "net.GND",
					RESERVED1: "net.GND",
					RESERVED2: "net.GND",
					RESERVED3: "net.GND",
					VIN_3V3: "net.GND",
					CC1: "net.CC1",
					CC2: "net.CC2",
				}}
				noConnect={[
					"DRAIN1",
					"DRAIN2",
					"DRAIN3",
					"CAP_MIS",
					"DBG_ACC",
					"PLUG_FLIP",
					"N_SINK_EN",
					"PLUG_EVENT",
				]}
			/>
			<SchematicNote
				schX={0}
				schY={9.4}
				fontSize={0.23}
				text={
					"U1: stand-alone PD sink; no NVM. ADC straps 3/5/1/0\n15 V min/max, 1 A operating / 1.5 A maximum; I2C 0x21\nPPHV can carry default 5 V: U2 lockout + firmware qualification required."
				}
			/>
			<SchematicNote
				schX={-10}
				schY={-9.2}
				fontSize={0.23}
				text={
					"D1: 22 V VBUS flat clamp; surge margin requires qualification.\nD2: CC-only 5.5 V ESD. Never connect D2 to VBUS.\nJ1 shield tied directly to local ground; USB data unused."
				}
			/>
			<R
				name="R1"
				resistance="162k"
				pcb={[-30, 6]}
				sch={[8, 7]}
				nets={["PD_3V3", "PD_MIN"]}
			/>
			<R
				name="R2"
				resistance="38.3k"
				pcb={[-26, 6]}
				sch={[12, 7]}
				nets={["PD_MIN", "GND"]}
			/>
			<R
				name="R3"
				resistance="86.6k"
				pcb={[-30, 8.5]}
				sch={[8, 4.8]}
				nets={["PD_3V3", "PD_MAX"]}
			/>
			<R
				name="R4"
				resistance="100k"
				pcb={[-26, 8.5]}
				sch={[12, 4.8]}
				nets={["PD_MAX", "GND"]}
			/>
			<R
				name="R5"
				resistance="191k"
				pcb={[-30, 11]}
				sch={[8, 2.6]}
				nets={["PD_3V3", "PD_IOP"]}
			/>
			<R
				name="R6"
				resistance="9.53k"
				pcb={[-26, 11]}
				sch={[12, 2.6]}
				nets={["PD_IOP", "GND"]}
			/>
			<C
				name="C1"
				capacitance="4.7uF"
				pcb={[-35, 9]}
				sch={[-6, -2]}
				nets={["VBUS", "GND"]}
			/>
			<C
				name="C2"
				capacitance="10uF"
				pcb={[-33, -7]}
				sch={[-2, -4]}
				nets={["PD_3V3", "GND"]}
			/>
			<C
				name="C3"
				capacitance="10uF"
				pcb={[-28, -7]}
				sch={[3, -4]}
				nets={["PD_1V5", "GND"]}
			/>
			<C
				name="C4"
				capacitance="4.7uF"
				pcb={[-21, 2]}
				sch={[2, -3.5]}
				nets={["PD_OUT", "GND"]}
			/>
			<C
				name="C5"
				capacitance="330pF"
				pcb={[-34, 4]}
				sch={[-6, -5]}
				nets={["CC1", "GND"]}
			/>
			<C
				name="C6"
				rotation={180}
				capacitance="330pF"
				pcb={[-38, -8]}
				sch={[-6, -7]}
				nets={["CC2", "GND"]}
			/>
			<TPS70933DBVR
				name="U3"
				schHeight={0.6}
				pcbX={-27}
				pcbY={-14}
				schX={7}
				schY={-6}
				connections={{ IN: "net.PD_OUT", GND: "net.GND", OUT: "net.V3V3" }}
				noConnect={["EN", "NC"]}
			/>
			<C
				name="C7"
				capacitance="1uF"
				pcb={[-31, -14]}
				sch={[2, -7]}
				nets={["PD_OUT", "GND"]}
			/>
			<C
				name="C8"
				capacitance="4.7uF"
				pcb={[-22, -14]}
				sch={[12, -7]}
				nets={["V3V3", "GND"]}
			/>
			<SchematicNote
				schX={7}
				schY={-9.2}
				fontSize={0.23}
				text={
					"U3: 3.3 V / 150 mA control LDO, 30 V input rating.\nEN floating = enabled. Intended control load <15 mA.\nPower present does not mean motor ready."
				}
			/>
			<TestPad name="TP1" net="VBUS" pcb={[-39, 12]} sch={[-13, -1]} />
			<TestPad name="TP2" net="V3V3" pcb={[-20, -18]} sch={[12, -3]} />
		</schematicsheet>
	);
}
