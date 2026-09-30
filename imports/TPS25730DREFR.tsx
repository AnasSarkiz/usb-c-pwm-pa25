import type { ChipProps } from "@tscircuit/props";
import modelUrl from "../assets/ti-ref0038a.glb";

const pinLabels = {
	pin1: ["LDO_3V3"],
	pin2: ["ADCIN1"],
	pin3: ["ADCIN2"],
	pin4: ["LDO_1V5"],
	pin5: ["ADCIN3"],
	pin6: ["CAP_MIS"],
	pin7: ["ADCIN4"],
	pin8: ["I2Ct_SDA"],
	pin9: ["I2Ct_SCL"],
	pin10: ["DBG_ACC"],
	pin11: ["GND1"],
	pin12: ["GND2"],
	pin13: ["PLUG_FLIP"],
	pin14: ["GND3"],
	pin15: ["DRAIN1"],
	pin16: ["GND4"],
	pin17: ["GND5"],
	pin18: ["N_FAULT_IN"],
	pin19: ["N_SINK_EN"],
	pin20: ["PPHV1"],
	pin21: ["PPHV2"],
	pin22: ["PPHV3"],
	pin23: ["VBUS_IN1"],
	pin24: ["VBUS_IN2"],
	pin25: ["VBUS_IN3"],
	pin26: ["RESERVED1"],
	pin27: ["RESERVED2"],
	pin28: ["CC1"],
	pin29: ["CC2"],
	pin30: ["DRAIN2"],
	pin31: ["GND6"],
	pin32: ["VBUS1"],
	pin33: ["VBUS2"],
	pin34: ["GND7"],
	pin35: ["GND8"],
	pin36: ["RESERVED3"],
	pin37: ["PLUG_EVENT"],
	pin38: ["VIN_3V3"],
	pin39: ["GND9"],
	pin40: ["DRAIN3"],
} as const;

const pinAttributes = {
	pin11: {
		requiresGround: true,
	},
	pin12: {
		requiresGround: true,
	},
	pin14: {
		requiresGround: true,
	},
	pin16: {
		requiresGround: true,
	},
	pin17: {
		requiresGround: true,
	},
	pin31: {
		requiresGround: true,
	},
	pin34: {
		requiresGround: true,
	},
	pin35: {
		requiresGround: true,
	},
	pin39: {
		requiresGround: true,
	},
	pin1: {
		providesPower: true,
	},
	pin2: {
		isInput: true,
	},
	pin3: {
		isInput: true,
	},
	pin4: {
		providesPower: true,
	},
	pin5: {
		isInput: true,
	},
	pin6: {
		isOutput: true,
		canUseOpenCollector: true,
		isUsingOpenCollector: true,
	},
	pin7: {
		isInput: true,
	},
	pin8: {
		isBidirectional: true,
		canUseOpenCollector: true,
		isUsingOpenCollector: true,
	},
	pin9: {
		isInput: true,
	},
	pin10: {
		isOutput: true,
		canUseOpenCollector: true,
		isUsingOpenCollector: true,
	},
	pin13: {
		isOutput: true,
		canUseOpenCollector: true,
		isUsingOpenCollector: true,
	},
	pin18: {
		isInput: true,
	},
	pin19: {
		isOutput: true,
		canUseOpenCollector: true,
		isUsingOpenCollector: true,
	},
	pin20: {
		providesPower: true,
	},
	pin21: {
		providesPower: true,
	},
	pin22: {
		providesPower: true,
	},
	pin23: {
		requiresPower: true,
	},
	pin24: {
		requiresPower: true,
	},
	pin25: {
		requiresPower: true,
	},
	pin26: {
		isInput: true,
	},
	pin27: {
		isInput: true,
	},
	pin28: {
		isBidirectional: true,
	},
	pin29: {
		isBidirectional: true,
	},
	pin32: {
		requiresPower: true,
	},
	pin33: {
		requiresPower: true,
	},
	pin36: {
		isInput: true,
	},
	pin37: {
		isOutput: true,
		canUseOpenCollector: true,
		isUsingOpenCollector: true,
	},
	pin38: {
		isPassive: true,
	},
} as const;

export const TPS25730DREFR = (props: ChipProps<typeof pinLabels>) => {
	return (
		<chip
			pinLabels={pinLabels}
			pinAttributes={pinAttributes}
			supplierPartNumbers={{
				jlcpcb: ["C22438973"],
			}}
			manufacturerPartNumber="TPS25730DREFR"
			footprint={
				<footprint>
					<smtpad
						portHints={["pin1"]}
						pcbX="-2.8999942mm"
						pcbY="0.999998mm"
						width="0.5999988mm"
						height="0.1999996mm"
						shape="rect"
					/>
					<smtpad
						portHints={["pin2"]}
						pcbX="-2.8999942mm"
						pcbY="0.599948mm"
						width="0.5999988mm"
						height="0.1999996mm"
						shape="rect"
					/>
					<smtpad
						portHints={["pin3"]}
						pcbX="-2.8999942mm"
						pcbY="0.199898mm"
						width="0.5999988mm"
						height="0.1999996mm"
						shape="rect"
					/>
					<smtpad
						portHints={["pin4"]}
						pcbX="-2.8999942mm"
						pcbY="-0.199898mm"
						width="0.5999988mm"
						height="0.1999996mm"
						shape="rect"
					/>
					<smtpad
						portHints={["pin5"]}
						pcbX="-2.8999942mm"
						pcbY="-0.599948mm"
						width="0.5999988mm"
						height="0.1999996mm"
						shape="rect"
					/>
					<smtpad
						portHints={["pin6"]}
						pcbX="-2.8999942mm"
						pcbY="-0.999998mm"
						width="0.5999988mm"
						height="0.1999996mm"
						shape="rect"
					/>
					<smtpad
						portHints={["pin7"]}
						pcbX="-2.400046mm"
						pcbY="-1.8999962mm"
						width="0.1999996mm"
						height="0.5999988mm"
						shape="rect"
					/>
					<smtpad
						portHints={["pin8"]}
						pcbX="-1.999996mm"
						pcbY="-1.8999962mm"
						width="0.1999996mm"
						height="0.5999988mm"
						shape="rect"
					/>
					<smtpad
						portHints={["pin9"]}
						pcbX="-1.599946mm"
						pcbY="-1.8999962mm"
						width="0.1999996mm"
						height="0.5999988mm"
						shape="rect"
					/>
					<smtpad
						portHints={["pin10"]}
						pcbX="-1.199896mm"
						pcbY="-1.8999962mm"
						width="0.1999996mm"
						height="0.5999988mm"
						shape="rect"
					/>
					<smtpad
						portHints={["pin11"]}
						pcbX="-0.8001mm"
						pcbY="-1.8999962mm"
						width="0.1999996mm"
						height="0.5999988mm"
						shape="rect"
					/>
					<smtpad
						portHints={["pin12"]}
						pcbX="-0.40005mm"
						pcbY="-1.8999962mm"
						width="0.1999996mm"
						height="0.5999988mm"
						shape="rect"
					/>
					<smtpad
						portHints={["pin13"]}
						pcbX="0mm"
						pcbY="-1.8999962mm"
						width="0.1999996mm"
						height="0.5999988mm"
						shape="rect"
					/>
					<smtpad
						portHints={["pin14"]}
						pcbX="0.40005mm"
						pcbY="-1.8999962mm"
						width="0.1999996mm"
						height="0.5999988mm"
						shape="rect"
					/>
					<smtpad
						portHints={["pin15"]}
						pcbX="0.8001mm"
						pcbY="-1.8999962mm"
						width="0.1999996mm"
						height="0.5999988mm"
						shape="rect"
					/>
					<smtpad
						portHints={["pin16"]}
						pcbX="1.199896mm"
						pcbY="-1.8999962mm"
						width="0.1999996mm"
						height="0.5999988mm"
						shape="rect"
					/>
					<smtpad
						portHints={["pin17"]}
						pcbX="1.599946mm"
						pcbY="-1.8999962mm"
						width="0.1999996mm"
						height="0.5999988mm"
						shape="rect"
					/>
					<smtpad
						portHints={["pin18"]}
						pcbX="1.999996mm"
						pcbY="-1.8999962mm"
						width="0.1999996mm"
						height="0.5999988mm"
						shape="rect"
					/>
					<smtpad
						portHints={["pin19"]}
						pcbX="2.400046mm"
						pcbY="-1.8999962mm"
						width="0.1999996mm"
						height="0.5999988mm"
						shape="rect"
					/>
					<smtpad
						portHints={["pin20"]}
						pcbX="2.8999942mm"
						pcbY="-1.1249914mm"
						width="0.5999988mm"
						height="0.2199894mm"
						shape="rect"
					/>
					<smtpad
						portHints={["pin21"]}
						pcbX="2.8999942mm"
						pcbY="-0.675005mm"
						width="0.5999988mm"
						height="0.2199894mm"
						shape="rect"
					/>
					<smtpad
						portHints={["pin22"]}
						pcbX="2.8999942mm"
						pcbY="-0.2249932mm"
						width="0.5999988mm"
						height="0.2199894mm"
						shape="rect"
					/>
					<smtpad
						portHints={["pin23"]}
						pcbX="2.8999942mm"
						pcbY="0.2249932mm"
						width="0.5999988mm"
						height="0.2199894mm"
						shape="rect"
					/>
					<smtpad
						portHints={["pin24"]}
						pcbX="2.8999942mm"
						pcbY="0.675005mm"
						width="0.5999988mm"
						height="0.2199894mm"
						shape="rect"
					/>
					<smtpad
						portHints={["pin25"]}
						pcbX="2.8999942mm"
						pcbY="1.1249914mm"
						width="0.5999988mm"
						height="0.2199894mm"
						shape="rect"
					/>
					<smtpad
						portHints={["pin26"]}
						pcbX="2.400046mm"
						pcbY="1.8999962mm"
						width="0.1999996mm"
						height="0.5999988mm"
						shape="rect"
					/>
					<smtpad
						portHints={["pin27"]}
						pcbX="1.999996mm"
						pcbY="1.8999962mm"
						width="0.1999996mm"
						height="0.5999988mm"
						shape="rect"
					/>
					<smtpad
						portHints={["pin28"]}
						pcbX="1.599946mm"
						pcbY="1.8999962mm"
						width="0.1999996mm"
						height="0.5999988mm"
						shape="rect"
					/>
					<smtpad
						portHints={["pin29"]}
						pcbX="1.199896mm"
						pcbY="1.8999962mm"
						width="0.1999996mm"
						height="0.5999988mm"
						shape="rect"
					/>
					<smtpad
						portHints={["pin30"]}
						pcbX="0.8001mm"
						pcbY="1.8999962mm"
						width="0.1999996mm"
						height="0.5999988mm"
						shape="rect"
					/>
					<smtpad
						portHints={["pin31"]}
						pcbX="0.40005mm"
						pcbY="1.8999962mm"
						width="0.1999996mm"
						height="0.5999988mm"
						shape="rect"
					/>
					<smtpad
						portHints={["pin32"]}
						pcbX="0mm"
						pcbY="1.8999962mm"
						width="0.1999996mm"
						height="0.5999988mm"
						shape="rect"
					/>
					<smtpad
						portHints={["pin33"]}
						pcbX="-0.40005mm"
						pcbY="1.8999962mm"
						width="0.1999996mm"
						height="0.5999988mm"
						shape="rect"
					/>
					<smtpad
						portHints={["pin34"]}
						pcbX="-0.8001mm"
						pcbY="1.8999962mm"
						width="0.1999996mm"
						height="0.5999988mm"
						shape="rect"
					/>
					<smtpad
						portHints={["pin35"]}
						pcbX="-1.199896mm"
						pcbY="1.8999962mm"
						width="0.1999996mm"
						height="0.5999988mm"
						shape="rect"
					/>
					<smtpad
						portHints={["pin36"]}
						pcbX="-1.599946mm"
						pcbY="1.8999962mm"
						width="0.1999996mm"
						height="0.5999988mm"
						shape="rect"
					/>
					<smtpad
						portHints={["pin37"]}
						pcbX="-1.999996mm"
						pcbY="1.8999962mm"
						width="0.1999996mm"
						height="0.5999988mm"
						shape="rect"
					/>
					<smtpad
						portHints={["pin38"]}
						pcbX="-2.400046mm"
						pcbY="1.8999962mm"
						width="0.1999996mm"
						height="0.5999988mm"
						shape="rect"
					/>
					<smtpad
						portHints={["pin39"]}
						pcbX="-0.9649968mm"
						pcbY="0mm"
						width="2.6500074mm"
						height="2.6500074mm"
						shape="rect"
					/>
					<smtpad
						portHints={["pin35"]}
						points={[
							{ x: "-0.6999986mm", y: "1.959991mm" },
							{ x: "-0.6999986mm", y: "1.5999968mm" },
							{ x: "-1.2999974mm", y: "1.5999968mm" },
							{ x: "-1.2999974mm", y: "1.959991mm" },
							{ x: "-0.6999986mm", y: "1.959991mm" },
						]}
						shape="polygon"
					/>
					<smtpad
						portHints={["pin33"]}
						points={[
							{ x: "0.0998474mm", y: "1.9599656mm" },
							{ x: "0.0998474mm", y: "1.5999968mm" },
							{ x: "-0.5001514mm", y: "1.5999968mm" },
							{ x: "-0.5001514mm", y: "1.9599656mm" },
							{ x: "0.0998474mm", y: "1.9599656mm" },
						]}
						shape="polygon"
					/>
					<smtpad
						portHints={["pin25"]}
						points={[
							{ x: "2.959989mm", y: "1.2349988mm" },
							{ x: "2.959989mm", y: "0.1149858mm" },
							{ x: "2.5999948mm", y: "0.1149858mm" },
							{ x: "2.5999948mm", y: "1.2349988mm" },
						]}
						shape="polygon"
					/>
					<smtpad
						portHints={["pin22"]}
						points={[
							{ x: "2.959989mm", y: "-0.1149858mm" },
							{ x: "2.959989mm", y: "-1.2349988mm" },
							{ x: "2.5999948mm", y: "-1.2349988mm" },
							{ x: "2.5999948mm", y: "-0.1149858mm" },
						]}
						shape="polygon"
					/>
					<smtpad
						portHints={["pin40"]}
						pcbX="1.5599918mm"
						pcbY="0mm"
						width="1.5299944mm"
						height="2.6500074mm"
						shape="rect"
					/>
					<silkscreenpath
						route={[
							{ x: 2.999994000000015, y: 1.415135599999985 },
							{ x: 2.999994000000015, y: 1.9999959999999817 },
						]}
					/>
					<silkscreenpath
						route={[
							{ x: 2.680182599999995, y: -1.99999600000001 },
							{ x: 2.999994000000015, y: -1.99999600000001 },
							{ x: 2.999994000000015, y: -1.4151356000000135 },
						]}
					/>
					<silkscreenpath
						route={[
							{ x: -2.999994000000015, y: -1.280134600000011 },
							{ x: -2.999994000000015, y: -1.99999600000001 },
							{ x: -2.680182599999995, y: -1.99999600000001 },
						]}
					/>
					<silkscreenpath
						route={[
							{ x: -2.680182599999995, y: 1.9999959999999817 },
							{ x: -2.999994000000015, y: 1.9999959999999817 },
							{ x: -2.999994000000015, y: 1.2801345999999967 },
						]}
					/>
					<silkscreenpath
						route={[
							{ x: 2.999994000000015, y: 1.9999959999999817 },
							{ x: 2.680182599999995, y: 1.9999959999999817 },
						]}
					/>
					<silkscreencircle
						pcbX="-3.499993mm"
						pcbY="1.499997mm"
						radius="0.0999998mm"
					/>
					<silkscreentext
						text="{NAME}"
						pcbX="-0.2031746mm"
						pcbY="3.2098254mm"
						anchorAlignment="center"
						fontSize="1mm"
					/>
					<courtyardoutline
						outline={[
							{ x: -3.8567745999999943, y: 2.4598253999999855 },
							{ x: 3.4504254000000145, y: 2.4598253999999855 },
							{ x: 3.4504254000000145, y: -2.4343746000000124 },
							{ x: -3.8567745999999943, y: -2.4343746000000124 },
							{ x: -3.8567745999999943, y: 2.4598253999999855 },
						]}
					/>
				</footprint>
			}
			cadModel={{
				glbUrl: modelUrl,
				modelOriginPosition: { x: 0, y: 0, z: 0 },
				size: { x: 6, y: 4, z: 0.75 },
				pcbRotationOffset: 0,
			}}
			{...props}
		/>
	);
};
