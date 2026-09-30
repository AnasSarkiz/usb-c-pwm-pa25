import type { InductorProps } from "@tscircuit/props";

export const SWPA6045S150MT = (props: Omit<InductorProps, "inductance">) => {
	return (
		<inductor
			inductance="15uH"
			supplierPartNumbers={{
				jlcpcb: ["C83374"],
			}}
			manufacturerPartNumber="SWPA6045S150MT"
			footprint={
				<footprint>
					<smtpad
						portHints={["pin1"]}
						pcbX="-2.602992mm"
						pcbY="0mm"
						width="2.4740108mm"
						height="5.0200052mm"
						shape="rect"
					/>
					<smtpad
						portHints={["pin2"]}
						pcbX="2.602992mm"
						pcbY="0mm"
						width="2.4740108mm"
						height="5.0200052mm"
						shape="rect"
					/>
					<silkscreenpath
						route={[
							{ x: -3.0762193999999, y: 2.6624280000002045 },
							{ x: -3.0762193999999, y: 3.0762194000000136 },
							{ x: 3.07616859999996, y: 3.0762194000000136 },
							{ x: 3.07616859999996, y: 2.6624280000002045 },
						]}
					/>
					<silkscreenpath
						route={[
							{ x: -3.0762193999999, y: -2.662377200000037 },
							{ x: -3.0762193999999, y: -3.07616859999996 },
							{ x: 3.07616859999996, y: -3.07616859999996 },
							{ x: 3.07616859999996, y: -2.662377200000037 },
						]}
					/>
					<silkscreentext
						text="{NAME}"
						pcbX="-0.0000254mm"
						pcbY="4.0734254mm"
						anchorAlignment="center"
						fontSize="1mm"
					/>
					<courtyardoutline
						outline={[
							{ x: -4.085425399999963, y: 3.323425400000133 },
							{ x: 4.085374600000023, y: 3.323425400000133 },
							{ x: 4.085374600000023, y: -3.3233745999999655 },
							{ x: -4.085425399999963, y: -3.3233745999999655 },
							{ x: -4.085425399999963, y: 3.323425400000133 },
						]}
					/>
				</footprint>
			}
			cadModel={{
				objUrl:
					"https://modelcdn.tscircuit.com/easyeda_models/assets/C83374.obj?uuid=38d40b1b5688411c9194395505ca5302",
				stepUrl:
					"https://modelcdn.tscircuit.com/easyeda_models/assets/C83374.step?uuid=38d40b1b5688411c9194395505ca5302",
				pcbRotationOffset: 90,
				modelOriginPosition: {
					x: -0.000025400000026820635,
					y: -0.000025399999913133797,
					z: -0.01,
				},
			}}
			{...props}
		/>
	);
};
