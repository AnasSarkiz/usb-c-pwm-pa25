import type { ChipProps } from "@tscircuit/props";

const pinLabels = {
	pin1: ["IO1"],
	pin2: ["IO2"],
	pin3: ["GND"],
} as const;

const pinAttributes = {
	pin3: { requiresGround: true },
} as const;

export const TPD2E2U06DCKR = (props: ChipProps<typeof pinLabels>) => {
	return (
		<chip
			pinLabels={pinLabels}
			pinAttributes={pinAttributes}
			supplierPartNumbers={{
				jlcpcb: ["C1855726"],
			}}
			manufacturerPartNumber="TPD2E2U06DCKR"
			footprint={
				<footprint>
					<smtpad
						portHints={["pin1"]}
						pcbX="-0.65024mm"
						pcbY="-0.94996mm"
						width="0.6999986mm"
						height="0.999998mm"
						shape="rect"
					/>
					<smtpad
						portHints={["pin2"]}
						pcbX="0.65024mm"
						pcbY="-0.94996mm"
						width="0.6999986mm"
						height="0.999998mm"
						shape="rect"
					/>
					<smtpad
						portHints={["pin3"]}
						pcbX="-0.000254mm"
						pcbY="0.94996mm"
						width="0.6999986mm"
						height="0.999998mm"
						shape="rect"
					/>
					<silkscreenpath
						route={[
							{ x: 1.1998705999999402, y: 0.7000239999999849 },
							{ x: 1.1998705999999402, y: -0.6999478000000181 },
						]}
					/>
					<silkscreenpath
						route={[
							{ x: -1.200124599999981, y: 0.7000239999999849 },
							{ x: -0.5042915999999877, y: 0.7000239999999849 },
						]}
					/>
					<silkscreenpath
						route={[
							{ x: 0.5040376000000606, y: 0.7000239999999849 },
							{ x: 1.1936729999999898, y: 0.7000239999999849 },
						]}
					/>
					<silkscreenpath
						route={[
							{ x: -1.200124599999981, y: 0.7000239999999849 },
							{ x: -1.200124599999981, y: -0.6802374000001237 },
						]}
					/>
					<silkscreenpath
						route={[
							{ x: 1.1998705999999402, y: -0.6999478000000181 },
							{ x: 1.1539728000000196, y: -0.6999478000000181 },
						]}
					/>
					<silkscreenpath
						route={[
							{ x: 0.1457198000000517, y: -0.6999478000000181 },
							{ x: -0.14597379999997884, y: -0.6999478000000181 },
						]}
					/>
					<silkscreenpath
						route={[
							{ x: -1.1542776000000003, y: -0.6999478000000181 },
							{ x: -1.200124599999981, y: -0.6999478000000181 },
						]}
					/>
					<silkscreentext
						text="{NAME}"
						pcbX="-0.225552mm"
						pcbY="2.438148mm"
						anchorAlignment="center"
						fontSize="1mm"
					/>
					<courtyardoutline
						outline={[
							{ x: -1.885251999999923, y: 1.6881479999999556 },
							{ x: 1.4341479999999365, y: 1.6881479999999556 },
							{ x: 1.4341479999999365, y: -1.7074519999999893 },
							{ x: -1.885251999999923, y: -1.7074519999999893 },
							{ x: -1.885251999999923, y: 1.6881479999999556 },
						]}
					/>
				</footprint>
			}
			cadModel={{
				objUrl:
					"https://modelcdn.tscircuit.com/easyeda_models/assets/C1855726.obj?uuid=00b27d59cda749e29c8c8e513111fee3",
				stepUrl:
					"https://modelcdn.tscircuit.com/easyeda_models/assets/C1855726.step?uuid=00b27d59cda749e29c8c8e513111fee3",
				pcbRotationOffset: 90,
				modelOriginPosition: {
					x: 0.000038099999983387534,
					y: -0.00012699999979304266,
					z: -0.1,
				},
			}}
			{...props}
		/>
	);
};
