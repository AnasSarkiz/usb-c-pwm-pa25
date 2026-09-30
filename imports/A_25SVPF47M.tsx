import type { CapacitorProps } from "@tscircuit/props";

export const A_25SVPF47M = (props: Omit<CapacitorProps, "capacitance">) => {
	const { name = "C1", ...restProps } = props;

	return (
		<capacitor
			name={name}
			capacitance="47uF"
			polarized
			supplierPartNumbers={{
				jlcpcb: ["C136280"],
			}}
			manufacturerPartNumber="25SVPF47M"
			footprint="cap_p5.3401mm_pw3.5mm_ph1.2mm_cyw9.3392mm_cyh7.2564mm"
			cadModel={{
				objUrl:
					"https://modelcdn.tscircuit.com/easyeda_models/assets/C136280.obj?uuid=6cb1ec5759f6404189e20b90556867d6",
				stepUrl:
					"https://modelcdn.tscircuit.com/easyeda_models/assets/C136280.step?uuid=6cb1ec5759f6404189e20b90556867d6",
				pcbRotationOffset: 180,
				modelOriginPosition: { x: 0, y: -0.000012700000070253736, z: -0.05 },
			}}
			{...restProps}
		/>
	);
};
