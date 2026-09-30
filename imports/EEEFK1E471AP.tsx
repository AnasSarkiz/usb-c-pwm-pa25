import type { CapacitorProps } from "@tscircuit/props";

export const EEEFK1E471AP = (props: Omit<CapacitorProps, "capacitance">) => {
	const { name = "C1", ...restProps } = props;

	return (
		<capacitor
			name={name}
			capacitance="470uF"
			polarized
			supplierPartNumbers={{
				jlcpcb: ["C401717"],
			}}
			manufacturerPartNumber="EEEFK1E471AP"
			footprint={
				<footprint>
					<smtpad
						portHints={["pin1"]}
						pcbX="-4.499864mm"
						pcbY="0mm"
						width="4.499991mm"
						height="1.6500094mm"
						shape="rect"
					/>
					<smtpad
						portHints={["pin2"]}
						pcbX="4.499864mm"
						pcbY="0mm"
						width="4.499991mm"
						height="1.6500094mm"
						shape="rect"
					/>
					<silkscreenpath
						route={[
							{ x: 5.226227799999833, y: 0.8524240000001555 },
							{ x: 5.226227799999833, y: 5.226227800000061 },
							{ x: -3.0899861999999985, y: 5.226227800000061 },
							{ x: -5.226227799999947, y: 3.089986200000112 },
							{ x: -5.226227799999947, y: 0.8524240000001555 },
						]}
					/>
					<silkscreenpath
						route={[
							{ x: 5.226227799999833, y: -0.8524240000000418 },
							{ x: 5.226227799999833, y: -5.226227799999947 },
							{ x: -3.0899861999999985, y: -5.226227799999947 },
							{ x: -5.226227799999947, y: -3.0899861999999985 },
							{ x: -5.226227799999947, y: -0.8524240000000418 },
						]}
					/>
					<silkscreentext
						text="{NAME}"
						pcbX="-0.0127mm"
						pcbY="6.2324mm"
						anchorAlignment="center"
						fontSize="1mm"
					/>
					<fabricationnotepath
						route={[
							{ x: 4.841011399999957, y: 0.1545082000000093 },
							{ x: 4.841011399999957, y: -0.15450819999989562 },
							{ x: 3.6049966000000495, y: -0.15450819999989562 },
							{ x: 3.6049966000000495, y: 0.1545082000000093 },
							{ x: 4.841011399999957, y: 0.1545082000000093 },
						]}
						strokeWidth="0.254mm"
					/>
					<fabricationnotepath
						route={[
							{ x: -4.84101140000007, y: 0.1545082000000093 },
							{ x: -4.84101140000007, y: -0.15450819999989562 },
							{ x: -3.604996600000163, y: -0.15450819999989562 },
							{ x: -3.604996600000163, y: 0.1545082000000093 },
							{ x: -4.84101140000007, y: 0.1545082000000093 },
						]}
						strokeWidth="0.254mm"
					/>
					<fabricationnotepath
						route={[
							{ x: -4.377512200000069, y: 1.0299953999999616 },
							{ x: -4.377512200000069, y: -1.0299953999999616 },
							{ x: -4.068495799999937, y: -1.0299953999999616 },
							{ x: -4.068495799999937, y: 1.0299953999999616 },
							{ x: -4.377512200000069, y: 1.0299953999999616 },
						]}
						strokeWidth="0.254mm"
					/>
					<courtyardoutline
						outline={[
							{ x: -7.006400000000099, y: 5.482399999999984 },
							{ x: 6.9809999999999945, y: 5.482399999999984 },
							{ x: 6.9809999999999945, y: -5.4823999999998705 },
							{ x: -7.006400000000099, y: -5.4823999999998705 },
							{ x: -7.006400000000099, y: 5.482399999999984 },
						]}
					/>
				</footprint>
			}
			cadModel={{
				objUrl:
					"https://modelcdn.tscircuit.com/easyeda_models/assets/C401717.obj?uuid=f9399d38f4bf4dafaa6a7aeba7f82438",
				stepUrl:
					"https://modelcdn.tscircuit.com/easyeda_models/assets/C401717.step?uuid=f9399d38f4bf4dafaa6a7aeba7f82438",
				pcbRotationOffset: 180,
				modelOriginPosition: { x: 0, y: 0.000012700000070253736, z: -0.05 },
			}}
			{...restProps}
		/>
	);
};
