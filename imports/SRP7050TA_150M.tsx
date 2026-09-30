import type { InductorProps } from "@tscircuit/props";

export const SRP7050TA_150M = (props: Omit<InductorProps, "inductance">) => {
	return (
		<inductor
			inductance="15uH"
			supplierPartNumbers={{
				jlcpcb: ["C2045384"],
			}}
			manufacturerPartNumber="SRP7050TA-150M"
			footprint={
				<footprint>
					{/* Bourns recommended land pattern: 8.4 overall, 2.5 gap, 3.5 height. */}
					<smtpad
						portHints={["pin1"]}
						pcbX="2.725mm"
						pcbY="0mm"
						width="2.95mm"
						height="3.5mm"
						shape="rect"
					/>
					<smtpad
						portHints={["pin2"]}
						pcbX="-2.725mm"
						pcbY="0mm"
						width="2.95mm"
						height="3.5mm"
						shape="rect"
					/>
					<silkscreenpath
						route={[
							{ x: -3.726205400000026, y: 1.8624042000000145 },
							{ x: -3.726205400000026, y: 3.3761934000000338 },
							{ x: 3.7262053999999125, y: 3.3761934000000338 },
							{ x: 3.7262053999999125, y: 1.8624042000000145 },
						]}
					/>
					<silkscreenpath
						route={[
							{ x: -3.726205400000026, y: -1.8624041999999008 },
							{ x: -3.726205400000026, y: -3.3761934000000338 },
							{ x: 3.7262053999999125, y: -3.3761934000000338 },
							{ x: 3.7262053999999125, y: -1.8624041999999008 },
						]}
					/>
					<silkscreentext
						text="{NAME}"
						pcbX="0mm"
						pcbY="4.3782mm"
						anchorAlignment="center"
						fontSize="1mm"
					/>
					<courtyardoutline
						outline={[
							{ x: -4.745800000000031, y: 3.6282000000001062 },
							{ x: 4.745800000000031, y: 3.6282000000001062 },
							{ x: 4.745800000000031, y: -3.6281999999999925 },
							{ x: -4.745800000000031, y: -3.6281999999999925 },
							{ x: -4.745800000000031, y: 3.6282000000001062 },
						]}
					/>
				</footprint>
			}
			cadModel={{
				objUrl:
					"https://modelcdn.tscircuit.com/easyeda_models/assets/C2045384.obj?uuid=fd41bc67ad4c4c5f978bcfd3746341ff",
				stepUrl:
					"https://modelcdn.tscircuit.com/easyeda_models/assets/C2045384.step?uuid=fd41bc67ad4c4c5f978bcfd3746341ff",
				pcbRotationOffset: 0,
				modelOriginPosition: { x: -0.000012700000070253736, y: 0, z: 0 },
			}}
			{...props}
		/>
	);
};
