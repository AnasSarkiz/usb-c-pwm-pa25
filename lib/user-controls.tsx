import { SchematicNote } from "./schematic-note";
import { B3B_PH_K_S_LF__SN_ } from "../imports/B3B_PH_K_S_LF__SN_";
import { LTST_C190TBKT } from "../imports/LTST_C190TBKT";
import { LTST_C190KGKT } from "../imports/LTST_C190KGKT";
import { LTST_C190KRKT } from "../imports/LTST_C190KRKT";
import { C, R } from "./passives";

export function UserControls() {
	return (
		<schematicsheet
			name="controls"
			displayName="06 Knob, FWD / STOP / REV, indicators — A1 prototype"
			sheetSize="A4"
			sheetIndex={5}
		>
			<B3B_PH_K_S_LF__SN_
				name="J3"
				pcbX={-27}
				pcbY={26}
				schX={-8}
				schY={5}
				connections={{
					pin1: "net.GND",
					pin2: "net.POT_WIPER",
					pin3: "net.V3V3",
				}}
			/>
			<R
				name="R60"
				resistance="1k"
				pcb={[-27, 19]}
				sch={[-8, 1]}
				nets={["POT_WIPER", "POT_ADC"]}
			/>
			<R
				name="R61"
				resistance="100k"
				pcb={[-23, 19]}
				sch={[-8, -2]}
				nets={["POT_ADC", "GND"]}
			/>
			<C
				name="C50"
				capacitance="100nF"
				pcb={[-23, 16.5]}
				sch={[-8, -5]}
				nets={["POT_ADC", "GND"]}
			/>
			<B3B_PH_K_S_LF__SN_
				name="J4"
				pcbX={-11}
				pcbY={26}
				schX={2}
				schY={5}
				connections={{ pin1: "net.FWD", pin2: "net.GND", pin3: "net.REV" }}
			/>
			<R
				name="R62"
				rotation={180}
				resistance="10k"
				pcb={[-13, 19]}
				sch={[0, 1]}
				nets={["V3V3", "FWD"]}
			/>
			<R
				name="R63"
				resistance="10k"
				pcb={[-9, 19]}
				sch={[5, 1]}
				nets={["V3V3", "REV"]}
			/>
			<C
				name="C51"
				capacitance="100nF"
				pcb={[-13, 16.5]}
				sch={[0, -2]}
				nets={["FWD", "GND"]}
			/>
			<C
				name="C52"
				rotation={180}
				capacitance="100nF"
				pcb={[-9, 16.5]}
				sch={[5, -2]}
				nets={["REV", "GND"]}
			/>
			<SchematicNote
				schX={0}
				schY={9}
				fontSize={0.23}
				text={
					"Panel controls: J3 → 10 kΩ linear pot; J4 → maintained SPDT center-OFF switch.\nSTOP = both contacts open; both closed is a fault. Debounce in firmware.\nStartup/reconnect requires STOP and knob below 2%, then a deliberate direction selection.\nOpen pot wiper pulls command to zero. Control cables ≤150 mm inside enclosure."
				}
			/>
			<R
				name="R64"
				resistance="1k"
				pcb={[-33, -22]}
				sch={[-8, -7]}
				nets={["V3V3", "LED_PWR_A"]}
			/>
			<LTST_C190TBKT
				name="D3"
				color="blue"
				pcbX={-33}
				pcbY={-25}
				schX={-8}
				schY={-9.5}
				schRotation={-90}
				connections={{ anode: "net.LED_PWR_A", cathode: "net.GND" }}
			/>
			<R
				name="R65"
				schRotation={-90}
				resistance="1k"
				pcb={[-26, -22]}
				sch={[0, -7]}
				nets={["LED_READY", "LED_READY_A"]}
			/>
			<LTST_C190KGKT
				name="D4"
				color="green"
				pcbX={-26}
				pcbY={-25}
				schX={0}
				schY={-9.5}
				schRotation={-90}
				connections={{ anode: "net.LED_READY_A", cathode: "net.GND" }}
			/>
			<R
				name="R66"
				schRotation={-90}
				resistance="1k"
				pcb={[-19, -22]}
				sch={[8, -7]}
				nets={["LED_FAULT", "LED_FAULT_A"]}
			/>
			<LTST_C190KRKT
				name="D5"
				color="red"
				pcbX={-19}
				pcbY={-25}
				schX={8}
				schY={-9.5}
				schRotation={-90}
				connections={{ anode: "net.LED_FAULT_A", cathode: "net.GND" }}
			/>
			<SchematicNote
				schX={2}
				schY={-4}
				fontSize={0.23}
				text={
					"Blue: control power present. Green: armed/ready or running.\nRed: latched fault; turn to STOP and set knob to zero.\nReversal requires ramp-down, coast and re-arming.\nOpen-loop duty control: speed depends on the mechanical load."
				}
			/>
		</schematicsheet>
	);
}
