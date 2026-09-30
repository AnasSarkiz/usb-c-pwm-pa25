type Placement = {
	name: string;
	pcb: readonly [number, number];
	sch: readonly [number, number];
	nets: readonly [string, string];
	rotation?: number;
};

// Manufacturer ordering codes are explicit: a footprint size alone is not a BOM.
const resistorParts = {
	"1k": { mpn: "0603WAF1001T5E", lcsc: "C21190" },
	"2.8k": { mpn: "RC0603FR-072K8L", lcsc: "C482810" },
	"3.3k": { mpn: "RC0603FR-073K3L", lcsc: "C108078" },
	"4.7k": { mpn: "RC0603FR-074K7L", lcsc: "C99782" },
	"9.53k": { mpn: "RC0603FR-079K53L", lcsc: "C273743" },
	"10k": { mpn: "RC0603FR-0710KL", lcsc: "C98220" },
	"26.7k": { mpn: "RC0603FR-0726K7L", lcsc: "C137756" },
	"27.4k": { mpn: "RC0603FR-0727K4L", lcsc: "C165753" },
	"38.3k": { mpn: "RC0603FR-0738K3L", lcsc: "C137736" },
	"43.2k": { mpn: "RC0603FR-0743K2L", lcsc: "C137720" },
	"80.6k": { mpn: "RC0603FR-0780K6L", lcsc: "C482928" },
	"86.6k": { mpn: "RC0603FR-0786K6L", lcsc: "C141683" },
	"100k": { mpn: "RC0603FR-07100KL", lcsc: "C14675" },
	"130k": { mpn: "RC0603FR-07130KL", lcsc: "C163432" },
	"162k": { mpn: "RC0603FR-07162KL", lcsc: "C165760" },
	"191k": { mpn: "RC0603FR-07191KL", lcsc: "C273767" },
	"240k": { mpn: "RC0603FR-07240KL", lcsc: "C137765" },
	"820k": { mpn: "RC0603FR-07820KL", lcsc: "C141684" },
} as const;

type ResistorSelection = Placement & {
	resistance: keyof typeof resistorParts;
	schRotation?: number;
};

export function R(props: ResistorSelection) {
	return (
		<resistor
			name={props.name}
			resistance={props.resistance}
			footprint="0603"
			manufacturerPartNumber={resistorParts[props.resistance].mpn}
			supplierPartNumbers={{ jlcpcb: [resistorParts[props.resistance].lcsc] }}
			pcbX={props.pcb[0]}
			pcbY={props.pcb[1]}
			pcbRotation={props.rotation}
			schX={props.sch[0]}
			schY={props.sch[1]}
			schRotation={
				props.schRotation ??
				(props.nets[1] === "GND" ||
				props.nets[0].startsWith("V") ||
				props.nets[0] === "PD_3V3" ||
				props.nets[0] === "PD_OUT"
					? -90
					: 0)
			}
			connections={{
				pin1: `net.${props.nets[0]}`,
				pin2: `net.${props.nets[1]}`,
			}}
		/>
	);
}

const capacitorParts = {
	"47pF": { mpn: "CL10C470JB8NNNC", lcsc: "C1671", footprint: "0603" },
	"100nF": { mpn: "GRM188R71H104KA93D", lcsc: "C77055", footprint: "0603" },
	"10nF": { mpn: "GRM188R71H103KA01D", lcsc: "C77053", footprint: "0603" },
	"22nF": { mpn: "GRM188R71H223KA01D", lcsc: "C77056", footprint: "0603" },
	"330pF": { mpn: "GRM1885C1H331FA01D", lcsc: "C882521", footprint: "0603" },
	"1uF": { mpn: "GRM21BR71H105KA12L", lcsc: "C77083", footprint: "0805" },
	"4.7uF": { mpn: "GRM31CR71H475KA12L", lcsc: "C77096", footprint: "1206" },
	"10uF": { mpn: "GRM32ER71H106KA12L", lcsc: "C77102", footprint: "1210" },
	"22uF": { mpn: "GRM32ER71E226KE15L", lcsc: "C21397", footprint: "1210" },
} as const;

export function C(
	props: Placement & { capacitance: keyof typeof capacitorParts },
) {
	const part = capacitorParts[props.capacitance];
	return (
		<capacitor
			name={props.name}
			capacitance={props.capacitance}
			footprint={part.footprint}
			manufacturerPartNumber={part.mpn}
			supplierPartNumbers={{ jlcpcb: [part.lcsc] }}
			pcbX={props.pcb[0]}
			pcbY={props.pcb[1]}
			pcbRotation={props.rotation}
			schX={props.sch[0]}
			schY={props.sch[1]}
			schRotation={
				props.nets[1] === "GND" || props.nets[0] === "V12_BUCK"
					? -90
					: props.nets[1] === "VM"
						? 90
						: 0
			}
			connections={{
				pin1: `net.${props.nets[0]}`,
				pin2: `net.${props.nets[1]}`,
			}}
		/>
	);
}

export function TestPad(props: {
	name: string;
	net: string;
	pcb: readonly [number, number];
	sch: readonly [number, number];
}) {
	return (
		<testpoint
			name={props.name}
			footprint={
				<footprint>
					<smtpad portHints={["pin1"]} shape="circle" radius={0.7} />
					<courtyardcircle radius={1} />
				</footprint>
			}
			pcbX={props.pcb[0]}
			pcbY={props.pcb[1]}
			schX={props.sch[0]}
			schY={props.sch[1]}
			connections={{ pin1: `net.${props.net}` }}
		/>
	);
}
