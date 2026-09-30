import { Fragment } from "react";
import { UsbPower } from "./usb-power";
import { MotorPower } from "./motor-power";
import { MotorBridge } from "./motor-bridge";
import { RailClamp } from "./rail-clamp";
import { Controller } from "./controller";
import { UserControls } from "./user-controls";

const mountCenters = [
	[-40, -27.5],
	[-40, 27.5],
	[40, -27.5],
	[40, 27.5],
] as const;

export function PwmControllerBoard() {
	return (
		<board
			width="90mm"
			height="65mm"
			thickness="1.6mm"
			layers={4}
			allowBlindAndBuriedVias={false}
			defaultViaTenting="both_sides"
			schLayout={{ layoutMode: "none" }}
			minTraceWidth="0.15mm"
			autorouterVersion="beta_pipeline7"
			autorouterEffortLevel="2x"
			minViaPadDiameter="0.60mm"
			minViaHoleDiameter="0.30mm"
			autorouter={{ local: true, traceClearance: 0.15, allowViaInPad: false }}
			minBoardEdgeClearance={0.5}
			minTraceToPadEdgeClearance={0.2}
			minPadEdgeToPadEdgeClearance={0.15}
			minViaEdgeToPadEdgeClearance={0.3}
			minViaHoleEdgeToViaHoleEdgeClearance={0.25}
			minPlatedHoleDrillEdgeToDrillEdgeClearance={0.25}
		>
			{[
				"CC1",
				"CC2",
				"INPUT_LIMIT",
				"INPUT_SLEW",
				"FB",
				"BOOT",
				"CPH",
				"CPL",
				"VCP",
			].map((name) => (
				<Fragment key={name}>
					<net name={name} />
				</Fragment>
			))}
			{[
				"PD_MIN",
				"PD_MAX",
				"PD_IOP",
				"SDA",
				"SCL",
				"INPUT_EN",
				"INPUT_OV",
				"HEALTH",
				"PWR_OFF",
				"MOTOR_UV",
				"MOTOR_OV",
				"MOTOR_SLEW",
				"MOTOR_LIMIT",
				"PWM",
				"DIR",
				"DRIVE_ENABLE",
				"IPROPI",
				"CURRENT_ADC",
				"CLAMP_SENSE",
				"CLAMP_GATE",
				"TEMP_ADC",
				"TEMP_REF",
				"NRST",
				"FWD",
				"REV",
				"POT_ADC",
				"VM_ADC",
				"MCU_ENABLE",
				"LED_FAULT",
				"LED_READY",
				"SWDIO",
				"SWCLK",
				"POT_WIPER",
				"LED_PWR_A",
				"LED_READY_A",
				"LED_FAULT_A",
			].map((name) => (
				<Fragment key={name}>
					<net name={name} />
				</Fragment>
			))}
			{["VBUS", "PD_OUT", "V15", "V12_BUCK", "VM"].map((name) => (
				<Fragment key={name}>
					<net name={name} isPowerNet nominalTraceWidth="0.8mm" />
				</Fragment>
			))}
			{["V3V3", "PD_3V3", "PD_1V5", "VREF_2V5"].map((name) => (
				<Fragment key={name}>
					<net name={name} isPowerNet nominalTraceWidth="0.2mm" />
				</Fragment>
			))}
			{["MOTOR_A", "MOTOR_B", "SW", "BRAKE_DRAIN"].map((name) => (
				<Fragment key={name}>
					<net name={name} nominalTraceWidth="0.8mm" />
				</Fragment>
			))}
			<net name="GND" isGroundNet nominalTraceWidth="0.8mm" />
			<UsbPower />
			<MotorPower />
			<MotorBridge />
			<RailClamp />
			<Controller />
			<UserControls />
			{(["inner1", "inner2"] as const).map((layer) => (
				<Fragment key={layer}>
					<copperpour
						name={`ground_${layer}`}
						layer={layer}
						connectsTo="net.GND"
						clearance={0.2}
						boardEdgeMargin={0.5}
						cutoutMargin={0.5}
						useThermalReliefs={false}
					/>
				</Fragment>
			))}
			<copperpour
				name="ground_top"
				layer="top"
				connectsTo="net.GND"
				clearance={0.2}
				boardEdgeMargin={0.5}
				cutoutMargin={0.5}
				useThermalReliefs={false}
			/>
			<copperpour
				name="ground_bottom"
				layer="bottom"
				connectsTo="net.GND"
				clearance={0.2}
				boardEdgeMargin={0.5}
				cutoutMargin={0.5}
				useThermalReliefs={false}
			/>
			{[22.45, 27.55].flatMap((pcbX) =>
				[-3.45, -2.55].map((pcbY) => (
					<Fragment key={`${pcbX},${pcbY}`}>
						<via
							pcbX={pcbX}
							pcbY={pcbY}
							fromLayer="top"
							toLayer="bottom"
							outerDiameter={0.6}
							holeDiameter={0.3}
							connectsTo="net.GND"
							tented
						/>
					</Fragment>
				)),
			)}
			<fiducial
				name="FID1"
				pcbX={-34}
				pcbY={30}
				padDiameter={1}
				soldermaskPullback={0.5}
			/>
			<fiducial
				name="FID2"
				pcbX={34}
				pcbY={-29.5}
				padDiameter={1}
				soldermaskPullback={0.5}
			/>
			<fiducial
				name="FID3"
				pcbX={-34}
				pcbY={-30}
				padDiameter={1}
				soldermaskPullback={0.5}
			/>
			{mountCenters.map(([pcbX, pcbY], index) => (
				<Fragment key={index}>
					<hole name={`H${index + 1}`} diameter={3.2} pcbX={pcbX} pcbY={pcbY} />
					<keepout
						shape="circle"
						radius={4}
						pcbX={pcbX}
						pcbY={pcbY}
						layers={["top", "inner1", "inner2", "bottom"]}
					/>
				</Fragment>
			))}
			<silkscreentext
				text="PA25 PWM • A1 PROTOTYPE"
				pcbX={-12}
				pcbY={12.5}
				fontSize={1.1}
			/>
			<silkscreentext
				text="USB-C PD 15V / 1.5A"
				pcbX={-31}
				pcbY={-10}
				fontSize={0.9}
			/>
			<silkscreentext text="SPEED" pcbX={-27} pcbY={30} fontSize={1} />
			<silkscreentext
				text="FWD  STOP  REV"
				pcbX={-11}
				pcbY={30}
				fontSize={0.9}
			/>
			<silkscreentext text="12V MOTOR" pcbX={38} pcbY={1.5} fontSize={0.9} />
			<silkscreentext
				text="PWR    READY    FAULT"
				pcbX={-26}
				pcbY={-28}
				fontSize={0.8}
			/>
			<silkscreentext
				text="BRAKE LOAD — MAY BE HOT"
				pcbX={21}
				pcbY={30.5}
				fontSize={0.8}
			/>
			<silkscreentext
				text="For evaluation only;"
				pcbX={0}
				pcbY={3}
				fontSize={1.4}
				layer="bottom"
			/>
			<silkscreentext
				text="not FCC approved for resale."
				pcbX={0}
				pcbY={0}
				fontSize={1.4}
				layer="bottom"
			/>
		</board>
	);
}
