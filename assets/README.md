# U1 package model

`ti-ref0038a.glb` is an original, nominal-dimension visualization for the
TPS25730DREFR in TI's REF0038A package. It is derived from the manufacturer's
[package drawing](https://www.ti.com/lit/pdf/MPQF652A) (4226763/C, also in the
[TPS25730 datasheet](https://www.ti.com/lit/ds/symlink/tps25730.pdf)). It is not a
TI-supplied STEP model or a manufacturing tolerance model.

The EasyEDA record for LCSC C22438973 has an empty 3D reference. The circuit
therefore explicitly imports this local GLB. No external model host is required.

- Body: 6.00 × 4.00 mm; nominal overall height 0.75 mm (drawing range 0.70–0.80 mm).
- Mold-body standoff: 0.025 mm; metal thickness: 0.20 mm.
- 38 perimeter contacts, including the connected power-contact groups.
- Exposed pad 39: 2.72 × 2.65 mm, x = −0.965 mm, with the 0.30 mm pin-1 chamfer.
- Exposed pad 40: 1.53 × 2.65 mm, x = +1.560 mm.
- Origin: center of the seating plane, z = 0; +z points out of the board.
- Pin 1 is on the upper left in PCB top view. No rotation or scale correction.

Terminal ends are simplified to rectangles. The circular top pin-1 recess is
illustrative: the drawing specifies the index area, not that exact mark. Colors
are illustrative. The model does not change pads, connections, or routing.

The declarative source is `lib/ti-ref0038a-model.ts`. The two materials are kept
as separate solids because merging them into one JSCAD union discards colors.
Regenerate from the project root with the pinned dependencies:

```sh
bun -e '
import { tiRef0038aParts } from "./lib/ti-ref0038a-model";
import { executeJscadOperations } from "jscad-planner";
import jscad from "@jscad/modeling";
import { convertJscadModelToGltf } from "jscad-to-gltf";
const geometries = tiRef0038aParts.map(plan => ({
  geom: executeJscadOperations(jscad, plan)
}));
const result = await convertJscadModelToGltf({ geometries }, {
  format: "glb", meshName: "TI_REF0038A", axisTransform: "none"
});
await Bun.write("assets/ti-ref0038a.glb", result.data);
'
```

Dimensional and visual evidence is in `evidence/u1-cad-update`. The top,
underside, footprint alignment and whole-board render were inspected. This
visualization update does not resolve the board's documented fabrication blockers.
