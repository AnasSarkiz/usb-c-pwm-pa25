import type { ChipProps } from "@tscircuit/props";

const pinLabels = {
	pin1: ["PB7"],
	pin2: ["PC14_OSCX_IN"],
	pin3: ["PC15_OSCX_OUT"],
	pin4: ["VDD"],
	pin5: ["GND"],
	pin6: ["PF2_NRST"],
	pin7: ["PA0"],
	pin8: ["PA1"],
	pin9: ["PA2"],
	pin10: ["PA3"],
	pin11: ["PA4"],
	pin12: ["PA5"],
	pin13: ["PA6"],
	pin14: ["PA7"],
	pin15: ["PA8"],
	pin16: ["PA11"],
	pin17: ["PA12"],
	pin18: ["PA13"],
	pin19: ["PA14_BOOT0"],
	pin20: ["PB6"],
} as const;

export const STM32C011F4P6 = (props: ChipProps<typeof pinLabels>) => {
	return (
		<chip
			pinLabels={pinLabels}
			pinAttributes={{
				pin1: {
					isBidirectional: true,
					canUseOpenCollector: true,
					isUsingOpenCollector: true,
				},
				pin2: { isInput: true },
				pin3: { isInput: true },
				pin4: { requiresPower: true },
				pin5: { requiresGround: true },
				pin6: { isInput: true },
				pin7: { isInput: true },
				pin8: { isInput: true },
				pin9: { isInput: true },
				pin10: { isInput: true },
				pin11: { isOutput: true },
				pin12: { isOutput: true },
				pin13: { isOutput: true },
				pin14: { isOutput: true },
				pin15: { isInput: true },
				pin16: {
					isOutput: true,
					canUseOpenCollector: true,
					isUsingOpenCollector: true,
				},
				pin17: { isOutput: true },
				pin18: { isBidirectional: true },
				pin19: { isInput: true },
				pin20: {
					isOutput: true,
					canUseOpenCollector: true,
					isUsingOpenCollector: true,
				},
			}}
			supplierPartNumbers={{
				jlcpcb: ["C5452432"],
			}}
			manufacturerPartNumber="STM32C011F4P6"
			footprint={
				<footprint>
					<smtpad
						portHints={["pin1"]}
						pcbX="-2.925064mm"
						pcbY="-2.870962mm"
						width="0.3640074mm"
						height="1.7420082mm"
						radius="0.1820037mm"
						shape="pill"
					/>
					<smtpad
						portHints={["pin2"]}
						pcbX="-2.275078mm"
						pcbY="-2.870962mm"
						width="0.3640074mm"
						height="1.7420082mm"
						radius="0.1820037mm"
						shape="pill"
					/>
					<smtpad
						portHints={["pin3"]}
						pcbX="-1.625092mm"
						pcbY="-2.870962mm"
						width="0.3640074mm"
						height="1.7420082mm"
						radius="0.1820037mm"
						shape="pill"
					/>
					<smtpad
						portHints={["pin4"]}
						pcbX="-0.975106mm"
						pcbY="-2.870962mm"
						width="0.3640074mm"
						height="1.7420082mm"
						radius="0.1820037mm"
						shape="pill"
					/>
					<smtpad
						portHints={["pin5"]}
						pcbX="-0.324866mm"
						pcbY="-2.870962mm"
						width="0.3640074mm"
						height="1.7420082mm"
						radius="0.1820037mm"
						shape="pill"
					/>
					<smtpad
						portHints={["pin6"]}
						pcbX="0.32512mm"
						pcbY="-2.870962mm"
						width="0.3640074mm"
						height="1.7420082mm"
						radius="0.1820037mm"
						shape="pill"
					/>
					<smtpad
						portHints={["pin7"]}
						pcbX="0.975106mm"
						pcbY="-2.870962mm"
						width="0.3640074mm"
						height="1.7420082mm"
						radius="0.1820037mm"
						shape="pill"
					/>
					<smtpad
						portHints={["pin8"]}
						pcbX="1.625092mm"
						pcbY="-2.870962mm"
						width="0.3640074mm"
						height="1.7420082mm"
						radius="0.1820037mm"
						shape="pill"
					/>
					<smtpad
						portHints={["pin9"]}
						pcbX="2.275078mm"
						pcbY="-2.870962mm"
						width="0.3640074mm"
						height="1.7420082mm"
						radius="0.1820037mm"
						shape="pill"
					/>
					<smtpad
						portHints={["pin10"]}
						pcbX="2.925064mm"
						pcbY="-2.870962mm"
						width="0.3640074mm"
						height="1.7420082mm"
						radius="0.1820037mm"
						shape="pill"
					/>
					<smtpad
						portHints={["pin20"]}
						pcbX="-2.925064mm"
						pcbY="2.870962mm"
						width="0.3640074mm"
						height="1.7420082mm"
						radius="0.1820037mm"
						shape="pill"
					/>
					<smtpad
						portHints={["pin19"]}
						pcbX="-2.275078mm"
						pcbY="2.870962mm"
						width="0.3640074mm"
						height="1.7420082mm"
						radius="0.1820037mm"
						shape="pill"
					/>
					<smtpad
						portHints={["pin18"]}
						pcbX="-1.625092mm"
						pcbY="2.870962mm"
						width="0.3640074mm"
						height="1.7420082mm"
						radius="0.1820037mm"
						shape="pill"
					/>
					<smtpad
						portHints={["pin17"]}
						pcbX="-0.975106mm"
						pcbY="2.870962mm"
						width="0.3640074mm"
						height="1.7420082mm"
						radius="0.1820037mm"
						shape="pill"
					/>
					<smtpad
						portHints={["pin16"]}
						pcbX="-0.324866mm"
						pcbY="2.870962mm"
						width="0.3640074mm"
						height="1.7420082mm"
						radius="0.1820037mm"
						shape="pill"
					/>
					<smtpad
						portHints={["pin15"]}
						pcbX="0.32512mm"
						pcbY="2.870962mm"
						width="0.3640074mm"
						height="1.7420082mm"
						radius="0.1820037mm"
						shape="pill"
					/>
					<smtpad
						portHints={["pin14"]}
						pcbX="0.975106mm"
						pcbY="2.870962mm"
						width="0.3640074mm"
						height="1.7420082mm"
						radius="0.1820037mm"
						shape="pill"
					/>
					<smtpad
						portHints={["pin13"]}
						pcbX="1.625092mm"
						pcbY="2.870962mm"
						width="0.3640074mm"
						height="1.7420082mm"
						radius="0.1820037mm"
						shape="pill"
					/>
					<smtpad
						portHints={["pin12"]}
						pcbX="2.275078mm"
						pcbY="2.870962mm"
						width="0.3640074mm"
						height="1.7420082mm"
						radius="0.1820037mm"
						shape="pill"
					/>
					<smtpad
						portHints={["pin11"]}
						pcbX="2.925064mm"
						pcbY="2.870962mm"
						width="0.3640074mm"
						height="1.7420082mm"
						radius="0.1820037mm"
						shape="pill"
					/>
					<silkscreenpath
						route={[
							{ x: -3.326206200000115, y: -1.7713960000000952 },
							{ x: -3.326206200000115, y: 1.7713959999999815 },
							{ x: 3.3262061999998878, y: 1.7713959999999815 },
							{ x: 3.3262061999998878, y: -1.7713960000000952 },
							{ x: -3.326206200000115, y: -1.7713960000000952 },
						]}
					/>
					<silkscreencircle
						pcbX="-2.925064mm"
						pcbY="-1.019048mm"
						radius="0.150114mm"
					/>
					<silkscreencircle
						pcbX="-3.559302mm"
						pcbY="-2.870962mm"
						radius="0.150114mm"
					/>
					<silkscreentext
						text="{NAME}"
						pcbX="-0.1905mm"
						pcbY="4.556mm"
						anchorAlignment="center"
						fontSize="1mm"
					/>
					<courtyardoutline
						outline={[
							{ x: -3.958400000000097, y: 3.80600000000004 },
							{ x: 3.5773999999998978, y: 3.80600000000004 },
							{ x: 3.5773999999998978, y: -4.009199999999964 },
							{ x: -3.958400000000097, y: -4.009199999999964 },
							{ x: -3.958400000000097, y: 3.80600000000004 },
						]}
					/>
				</footprint>
			}
			cadModel={{
				objUrl:
					"https://modelcdn.tscircuit.com/easyeda_models/assets/C5452432.obj?uuid=f8ba5b4174b9490d8c445fbe2ed40b80",
				stepUrl:
					"https://modelcdn.tscircuit.com/easyeda_models/assets/C5452432.step?uuid=f8ba5b4174b9490d8c445fbe2ed40b80",
				pcbRotationOffset: 90,
				modelOriginPosition: { x: 0, y: 0.000012700000070253736, z: -0.019205 },
			}}
			{...props}
		/>
	);
};
