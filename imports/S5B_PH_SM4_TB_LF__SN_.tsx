import type { ConnectorProps } from "@tscircuit/props";

const pinLabels = {
	pin1: ["pin1"],
	pin2: ["pin2"],
	pin3: ["pin3"],
	pin4: ["pin4"],
	pin5: ["pin5"],
	pin6: ["pin6"],
	pin7: ["pin7"],
} as const;

export const S5B_PH_SM4_TB_LF__SN_ = (props: ConnectorProps) => {
	return (
		<connector
			pinLabels={pinLabels}
			supplierPartNumbers={{
				jlcpcb: ["C265104"],
			}}
			manufacturerPartNumber="S5B-PH-SM4-TB(LF)(SN)"
			footprint={
				<footprint insertionDirection="from_y_pos">
					<smtpad
						portHints={["pin1"]}
						pcbX="3.999992mm"
						pcbY="-3.0375479mm"
						width="0.999998mm"
						height="3.499993mm"
						shape="rect"
					/>
					<smtpad
						portHints={["pin2"]}
						pcbX="1.999996mm"
						pcbY="-3.0372939mm"
						width="0.999998mm"
						height="3.499993mm"
						shape="rect"
					/>
					<smtpad
						portHints={["pin3"]}
						pcbX="0mm"
						pcbY="-3.0372939mm"
						width="0.999998mm"
						height="3.499993mm"
						shape="rect"
					/>
					<smtpad
						portHints={["pin4"]}
						pcbX="-1.999996mm"
						pcbY="-3.0372939mm"
						width="0.999998mm"
						height="3.499993mm"
						shape="rect"
					/>
					<smtpad
						portHints={["pin6"]}
						pcbX="6.35mm"
						pcbY="2.9375481mm"
						width="1.7999964mm"
						height="3.6999926mm"
						shape="rect"
					/>
					<smtpad
						portHints={["pin7"]}
						pcbX="-6.35mm"
						pcbY="2.9375481mm"
						width="1.7999964mm"
						height="3.6999926mm"
						shape="rect"
					/>
					<smtpad
						portHints={["pin5"]}
						pcbX="-3.999992mm"
						pcbY="-3.0372939mm"
						width="0.999998mm"
						height="3.499993mm"
						shape="rect"
					/>
					<silkscreenpath
						route={[
							{ x: -4.842002000000093, y: 4.5220000999997865 },
							{ x: 5.190997999999809, y: 4.52205089999984 },
						]}
					/>
					<silkscreenpath
						route={[
							{ x: -4.809998000000178, y: -1.5742539000000306 },
							{ x: -5.988532600000099, y: -1.5742539000000306 },
							{ x: -5.988532600000099, y: -3.1389193000001114 },
							{ x: -6.968998000000056, y: -3.1389193000001114 },
							{ x: -6.968998000000056, y: 0.7120762999998078 },
							{ x: -6.968998000000056, y: 0.8390762999997605 },
						]}
					/>
					<silkscreenpath
						route={[
							{ x: 6.968997999999942, y: 0.8387460999999803 },
							{ x: 6.968997999999942, y: 0.8387460999999803 },
							{ x: 6.968997999999942, y: -3.1388939000001983 },
							{ x: 6.115557999999851, y: -3.1388939000001983 },
							{ x: 5.988557999999898, y: -3.1388939000001983 },
							{ x: 5.988557999999898, y: -1.5742539000000306 },
							{ x: 4.9369979999997895, y: -1.5742539000000306 },
							{ x: 4.809997999999837, y: -1.5739491000001635 },
						]}
					/>
					<silkscreencircle
						pcbX="5.1099974mm"
						pcbY="-3.3600009mm"
						radius="0.1999996mm"
					/>
					<silkscreentext
						text="{NAME}"
						pcbX="-0.003302mm"
						pcbY="5.7757461mm"
						anchorAlignment="center"
						fontSize="1mm"
					/>
					<courtyardoutline
						outline={[
							{ x: -7.505002000000218, y: 5.025746099999878 },
							{ x: 7.498397999999838, y: 5.025746099999878 },
							{ x: 7.498397999999838, y: -5.05005390000008 },
							{ x: -7.505002000000218, y: -5.05005390000008 },
							{ x: -7.505002000000218, y: 5.025746099999878 },
						]}
					/>
				</footprint>
			}
			cadModel={{
				objUrl:
					"https://modelcdn.tscircuit.com/easyeda_models/assets/C265104.obj?uuid=509a27f953f44417851d738abef721b8",
				stepUrl:
					"https://modelcdn.tscircuit.com/easyeda_models/assets/C265104.step?uuid=509a27f953f44417851d738abef721b8",
				pcbRotationOffset: 0,
				modelOriginPosition: { x: 0, y: -0.4100110999999016, z: -0.12 },
			}}
			{...props}
		/>
	);
};
