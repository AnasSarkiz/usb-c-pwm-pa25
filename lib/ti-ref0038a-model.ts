import { jscadPlanner as cad } from "jscad-planner";
import type { Vector3D } from "jscad-planner";

// TI REF0038A, drawing 4226763/C: nominal dimensions in millimetres.
// Top view matches the footprint: pin 1 at left/top, pin 7 at bottom/left.
// This is a package visualization, not a manufacturer-supplied mechanical model.
function block(size: Vector3D, center: Vector3D) {
	return cad.transforms.translate(center, cad.primitives.cuboid({ size }));
}

const perimeterContacts = [
	// Pins 1–6 and 20–25. The right-side power contacts use 0.45 mm pitch.
	...Array.from({ length: 6 }, (_, index) =>
		block([0.35, 0.2, 0.2], [-2.825, 1 - index * 0.4, 0.1]),
	),
	...[-1.1, -0.65, -0.2, 0.2, 0.65, 1.1].map((centerY) =>
		block([0.35, 0.2, 0.2], [2.825, centerY, 0.1]),
	),
	// Pins 7–19 and 26–38.
	...Array.from({ length: 13 }, (_, index) =>
		block([0.2, 0.35, 0.2], [-2.4 + index * 0.4, -1.825, 0.1]),
	),
	...Array.from({ length: 13 }, (_, index) =>
		block([0.2, 0.35, 0.2], [2.4 - index * 0.4, 1.825, 0.1]),
	),
	// Connected contact groups: 20–22, 23–25, 32–33 and 34–35.
	block([0.15, 1.1, 0.2], [2.725, -0.65, 0.1]),
	block([0.15, 1.1, 0.2], [2.725, 0.65, 0.1]),
	block([0.6, 0.15, 0.2], [-0.2, 1.725, 0.1]),
	block([0.6, 0.15, 0.2], [-1, 1.725, 0.1]),
];

// Pad 39 is 2.72 × 2.65 mm with a 0.30 mm pin-1 chamfer.
const groundPad = cad.extrusions.extrudeLinear(
	{ height: 0.2 },
	cad.primitives.polygon({
		points: [
			[-2.325, -1.325],
			[0.395, -1.325],
			[0.395, 1.325],
			[-2.025, 1.325],
			[-2.325, 1.025],
		],
	}),
);
const contacts = cad.booleans.union(
	...perimeterContacts,
	groundPad,
	block([1.53, 2.65, 0.2], [1.56, 0, 0.1]),
);

// Nominal 0.75 mm total height and 0.025 mm body standoff.
// The circular top-side pin-1 indicator is illustrative; TI specifies its area.
const pin1Recess = cad.primitives.cylinder({
	radius: 0.15,
	height: 0.06,
	center: [-2.5, 1.5, 0.75],
});

// Keep materials as separate solids when exporting the colored GLB.
export const tiRef0038aParts = [
	cad.colors.colorize(
		[0.12, 0.13, 0.14],
		cad.booleans.subtract(
			block([6, 4, 0.725], [0, 0, 0.3875]),
			contacts,
			pin1Recess,
		),
	),
	cad.colors.colorize([0.72, 0.74, 0.76], contacts),
];
