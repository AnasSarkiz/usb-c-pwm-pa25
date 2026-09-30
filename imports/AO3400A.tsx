import type { ChipProps } from "@tscircuit/props";

const pinLabels = {
	pin1: ["gate", "G"],
	pin2: ["source", "S"],
	pin3: ["drain", "D"],
} as const;

export const AO3400A = (
	props: ChipProps<typeof pinLabels> & { name: string },
) => {
	return (
		<chip
			symbolName="n_channel_e_mosfet_transistor"
			pinLabels={pinLabels}
			pinAttributes={{
				pin1: { isInput: true },
				pin2: { requiresGround: true },
				pin3: { isPassive: true },
			}}
			supplierPartNumbers={{
				jlcpcb: ["C20917"],
			}}
			manufacturerPartNumber="AO3400A"
			footprint={
				<footprint>
					<smtpad
						portHints={["pin1"]}
						pcbX="0.999998mm"
						pcbY="-0.94996mm"
						width="0.999998mm"
						height="0.6500114mm"
						shape="rect"
					/>
					<smtpad
						portHints={["pin2"]}
						pcbX="0.999998mm"
						pcbY="0.94996mm"
						width="0.999998mm"
						height="0.6500114mm"
						shape="rect"
					/>
					<smtpad
						portHints={["pin3"]}
						pcbX="-0.999998mm"
						pcbY="0mm"
						width="0.999998mm"
						height="0.6500114mm"
						shape="rect"
					/>
					<silkscreenpath
						route={[
							{ x: 0.726211400000011, y: 1.5262098000000606 },
							{ x: -0.726211400000011, y: 1.5262098000000606 },
							{ x: -0.726211400000011, y: 0.49458879999997407 },
						]}
					/>
					<silkscreenpath
						route={[
							{ x: 0.726211400000011, y: -1.5262097999999469 },
							{ x: -0.726211400000011, y: -1.5262097999999469 },
							{ x: -0.726211400000011, y: -0.49458879999997407 },
						]}
					/>
					<silkscreenpath
						route={[
							{ x: 0.726211400000011, y: 0.45539659999997184 },
							{ x: 0.726211400000011, y: -0.45539659999985815 },
						]}
					/>
					<silkscreentext
						text="{NAME}"
						pcbX="0.0254mm"
						pcbY="2.524mm"
						anchorAlignment="center"
						fontSize="1mm"
					/>
					<courtyardoutline
						outline={[
							{ x: -1.748600000000124, y: 1.774000000000001 },
							{ x: 1.7993999999998778, y: 1.774000000000001 },
							{ x: 1.7993999999998778, y: -1.774000000000001 },
							{ x: -1.748600000000124, y: -1.774000000000001 },
							{ x: -1.748600000000124, y: 1.774000000000001 },
						]}
					/>
				</footprint>
			}
			cadModel={{
				objUrl:
					"https://modelcdn.tscircuit.com/easyeda_models/assets/C20917.obj?uuid=d777607a152f4f3aac9bb0d0c14ed6fd",
				stepUrl:
					"https://modelcdn.tscircuit.com/easyeda_models/assets/C20917.step?uuid=d777607a152f4f3aac9bb0d0c14ed6fd",
				pcbRotationOffset: 180,
				modelOriginPosition: {
					x: 0.000012700000070253736,
					y: -0.000012699999956566899,
					z: 0.050795,
				},
			}}
			{...props}
		/>
	);
};
