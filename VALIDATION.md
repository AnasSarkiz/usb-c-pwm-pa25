# A1 validation record

Board: USB-C PWM controller for STEPPERONLINE PA25-24126000-G23. Revision **A1 / 0.1.0-prototype.1**, 2026-09-30. This is an **untested prototype**, not a hardware-tested store product. Initial local development used source/dependency/output checksums. The authorized public snapshot adds a board-local Git repository and PUBLICATION.sha256; no electrical design changes accompany publication.

## Stage status

| Stage | Status | Evidence and remaining work |
|---|---|---|
| 1. Confirm requirements | passed | Bench-prototype scope, rails/current limits/interfaces/90 × 65 mm mechanics/four-layer fabrication targets recorded in README, CALCULATIONS and MECHANICAL. One-ounce inner copper must be explicitly ordered. The unknown application is excluded from assigned load, braking and stopping ratings. |
| 2. Review schematic and BOM | passed | All six current native A4 pages visually inspected; pin review in ARCHITECTURE and exact 116-part/51-identity BOM refreshed. Accepted warnings and procurement exceptions below. |
| 3. Validate placement before routing | blocked | Physical placement and the required netlist, pin, source and schematic-placement reviews passed, repeated for four layers. Native routing-difficulty analysis stalled on both source and prebuilt JSON; this required skill check has no successful result. Final unrouted geometry is frozen in evidence/unrouted-a1-four-layer. Subsequent routing was diagnostic investigation, not acceptance of this gate. |
| 4. Route and validate copper | blocked | Final native four-layer output has 301 traces / 204 full-stack vias but fails independent shorts, drill-to-pad and minimum-width checks. No copper revision is accepted. |
| 5. Automated and visual checks | blocked | Final formatting/TypeScript and firmware build/host tests passed. Board tests: six pass, two fail. Both native build and snapshot report an asynchronous DRC crash despite exit zero. Four copper-layer previews and short debug bitmap inspected; snapshots rejected. |
| 6. Approve prototype fabrication | blocked | Copper gates failed. Strict CPL export also rejects unresolved supplier rotations. No fabrication ZIP, approved CPL, order or fabrication approval; exact stack/plating and manufacturer DFM remain pending. |
| 7. Test physical prototype | not started | No physical board or measurements. See PROTOTYPE_TEST_PLAN. |
| 8. Prepare store release | blocked | Public source publication is now authorized as an explicitly unvalidated prototype. Failed design gates prevent a qualified store/fabrication release. No hardware-tested claim and no order authorization. |

Stage 1 applies only to an unloaded, supervised bench prototype at 0–40 °C ambient with the specified motor. Driven mechanism, back-driving energy, enclosure and application duty remain unknown. They must be defined and the affected stages revalidated before extending this scope. The initial current limit and coast interval do not establish a safe stall duration or stopped shaft.

## Toolchain and native capabilities

Bun 1.3.9; tscircuit 0.0.2679; CLI 0.1.2193; core 0.0.2016; runframe 0.0.2848; capacity-autorouter 0.0.941; circuit-json 0.0.506; TypeScript 5.9.3; Biome 2.5.14. Direct versions and transitive resolutions are pinned in package.json/bun.lock. Native sheet API, routing controls and CLI commands were verified from installed help/types/source. Build-worker timeout remains 3,600,000 ms; no hosted-build result is claimed. Native A4 sheets render at 297 × 210 mm. The previous toolchain and its failed/stalled results are retained under evidence/unrouted-a1 and documented in evidence/toolchain-migration-a1.md.

Firmware: Arm GNU 13.3.Rel1, ST CMSIS device C0 v1.4.1 (bcc8d94fecb767d1afb53d8c12a8f87ebeb503a2), Arm CMSIS 5.9.0. The bundled local compiler path is overridable using CROSS. Working firmware outputs are in firmware/build; 3,140-byte binary fits the 16 KB part. The host control-state tests run with address/undefined-behavior sanitizers. Peripheral timing, programming and actual motor behavior remain untested.

## Command and artifact ledger

Run all commands from this board directory. Logs are retained in evidence; failed intermediate iterations remain available and are superseded only by a documented successful current revision.

- `bun run format:check`, `bun run typecheck`: final logs format-check-a1-final.log/typecheck-a1-final.log; both passed. Tests now include an eighth check for actual routed minimum widths.
- `bun test`: board-tests-unrouted-a1-four-layer.log has seven tests / 1,823 assertions passing on the unrouted PCB. Final routed result is board-tests-routed-a1-final.log: six pass, two fail / 5,071 assertions. Drill-to-pad and actual trace-width requirements fail; these failures remain visible.
- `bun run firmware:test`, `bun run firmware:build`: firmware-tests-a1-final.log/firmware-build-a1-final.log. No hardware tests implied.
- `bunx tsci check netlist index.circuit.tsx`: netlist-a1-four-layer.log, pin listing reviewed against ARCHITECTURE, including AO3400A pin 1 gate / 2 source / 3 drain. A regression test checks these physical numbers.
- `bunx tsci check pin_specification index.circuit.tsx`: pin_specification-a1-four-layer.log, zero errors/six passive-wrapper warnings below.
- `bunx tsci check source index.circuit.tsx`: source-a1-four-layer.log, zero errors/warnings.
- `bunx tsci check schematic-placement index.circuit.tsx` and `check placement`: schematic-placement-a1-four-layer.log and placement-a1-four-layer.log. Actual collisions resolved; placement has zero errors/warnings. Only reviewed grouping/alignment advice remains.
- `bunx tsci check routing-difficulty index.circuit.tsx`: native checks stalled without a result, including the updated toolchain. The owned processes ignored TERM and were stopped with KILL after approximately 44/31/16 minutes for the three congestion attempts. No passing claim or substitute check.
- `bunx tsci build index.circuit.tsx --pcb-png --pcb-svgs --schematic-svgs`: build-unrouted-a1-fanout.log passed with routing disabled. Seven tests passed on its zero-trace output. Native symbols and the moved clamp-sheet note were visually inspected; footprints/placement/connectivity are unchanged.
- `bunx tsci check shorts dist/index/circuit.json`: shorts-a1-pipeline7.log detected two top-layer Gerber shorts (CC2/GND and INPUT_LIMIT/GND) despite a successful native build. That output is rejected. Its evidence is frozen in evidence/routed-attempt-4.
- Final four-layer congestion check on evidence/unrouted-a1-four-layer/circuit.json also produced no output while using a CPU core, and was stopped after more than three minutes. Log routing-difficulty-a1-four-layer.log is empty; this is not a pass.
- `bunx tsci build index.circuit.tsx --pcb-png --pcb-svgs --schematic-svgs`: build-routed-a1-four-layer-default.log and the final-source rebuild build-routed-a1-final.log exit zero, but report `Async effect error in PcbDesignRuleChecks` / `source_net_36_mst1_0: Unresolved boundary conflict in boolean operation`. This invalidates the apparent success and zero native error-record count. final-build-equivalence.json confirms identical copper, footprints, component placement, source connections and schematic records; only explicit default-false board metadata, project metadata and transient network warnings differ. The independent rejection evidence remains applicable, and board tests were rerun on the final output.
- `bunx tsci check shorts dist/index/circuit.json`: shorts-a1-four-layer.log finds one top-layer short at (-26.135, 2.012) mm between U1.DRAIN2 (intentionally unconnected pin) and CC2. Debug bitmap and SVG are in evidence/routed-four-layer-rejected. This is a real rejection even though DRAIN2 is not a named operating net.
- `bunx tsci check trace-length net.VM index.circuit.tsx` before routing and `net.VM dist/index/circuit.json` after routing: trace-length-VM-unrouted-a1-four-layer.log and trace-length-VM-routed-a1-four-layer.log. Native analysis reports 291.37 mm aggregate VM routes across 20 trace records; that is not a single power path or an ampacity approval. Earlier trace-length-a1-final-attempt.log used invalid syntax and is superseded by these correctly targeted runs.
- Schematic PDF at output/pdf/pa25-a1-schematic.pdf was refreshed after the native-symbol changes; all six final PDF pages were visually inspected. evidence/schematic-pdf-provenance.json verifies identical source/schematic records across the PCB layer change. All four output/pcb-review/REJECTED-*.png previews and the shorts bitmap were inspected. They are rejected design renders, not photographs or approved fabrication previews.
- `bunx tsci snapshot index.circuit.tsx`: snapshot-a1-four-layer.log says snapshots match and exits zero, but contains the same asynchronous DRC crash. The automatically created snapshots are rejected and retained under evidence/rejected-snapshots, not accepted as test baselines.
- Strict native supplier-aware CPL conversion (`circuit-json-to-pnp-csv` 0.0.16, `requireSupplierRotation: true`) fails at U2. A diagnostic enumeration identifies U2/U5/J3/J4/D3/D4/D5 with missing authored pin-1 location and C19 with missing supplier pin-1 location. See cpl-export-a1.log and cpl-orientation-unresolved.json. No unverified CSV was saved or labeled approved.

## Routing investigations

The default pipeline 9 first produced 301 traces / 233 vias and 104 error records. Stronger trace-to-pad and via-to-pad settings plus 2x effort still produced 142 errors. A supported native simplify phase rejected its own result because DRC errors increased (98 to 179). No error filters or route-array imports were introduced.

Pipeline 7 produced 301 traces / 234 vias and returned success, but independent checks rejected it: two Gerber-level shorts and 21 drill-to-pad pairs below the 0.20 mm clearance requirement (excluding one floating-point value effectively equal to 0.20 mm). One via drill actually overlapped U2's DVDT pad by about 0.024 mm. Evidence: board-tests-routed-a1-pipeline7.log, via-pad-clearance-a1-pipeline7.json and shorts-a1-pipeline7.log.

Native fanout was tested around U1/U2/U9. Custom React symbols initially prevented early port discovery; native boxed pin symbols resolved that while preserving exact physical pins. Automatic fanout then failed to escape U1 at both 1.2 mm and 2.5 mm padding. These failed fanout directives were removed. Native phased routing on pipeline 7 failed its ground reachability precheck. Two-layer pipeline 9 failed either CLAMP_SENSE or GND depending on phase order. Four-layer phased pipeline 9 also failed ground routing (`source_net_58_mst42`, failed node cmn_124). Logs retain each failure.

The final four-layer, single-phase pipeline 7 route completed but is rejected. The measured drill-to-pad report has 15 pairs below 0.20 mm, including actual overlaps at R41 and U1 (minimum signed gap -0.15 mm); see via-pad-clearance-a1-four-layer.json. Emitted trace widths range 0.10–0.80 mm, with 23 wire-point width fields below the required 0.15 mm; see trace-widths-a1-four-layer.json. All 204 via records span top/inner1/inner2/bottom, and the explicit board setting disallows blind/buried vias. Nominal trace and pad clearances did not guarantee valid generated geometry. Power-return integrity, neck-down ampacity, mask/drill export and exact finished stack remain unapproved.

Current design rules remain at least as strong as the brief: 0.15 mm minimum trace width, 0.20 mm trace-to-pad clearance, 0.15 mm pad-to-pad clearance, 0.30 mm via-copper-to-pad clearance, 0.60/0.30 mm vias, 0.25 mm drill-to-drill clearance, 0.50 mm board-edge clearance. Board-level default via tenting is set on both sides; fabrication output must verify inheritance for generated vias. No generated geometry has been manually patched.

## Reviewed warnings and tool limitations

Six native `source_no_power_pin_defined_warning` records apply to D1/D2, Q1/Q2/Q3 and U7. These are passive protection devices, MOSFETs and a shunt reference, whose real pins are fully specified; a fictitious VCC annotation would be wrong. Accepted after pin/datasheet review.

The schematic checker applies series diode/resistor alignment advice to D6 and R45, which are parallel gate-protection elements. Their common nodes and zener polarity are intentional. Its cross-sheet-block decoupling grouping advice spans distinct ICs: C15/C16 at U4 versus C18 at U5; C40/C41 at U9 versus C44 at U10. Keeping each bypass beside its IC is intentional. Actual text/trace collisions are fixed, not accepted.

The historical circuit-json 0.0.499 whole-document schema rejected native numeric PCB display offsets and null parent IDs for standalone fiducials/silkscreen. No generated records were patched. Current board tests use circuit-json 0.0.506 and precise schemas for actual source identities/connectivity and geometric fields. No whole-document schema pass is claimed.

C15 is Panasonic 25SVPF47M/C136280, found in LCSC stock (1,440 observed 2026-09-30), but absent from the JLCPCB search result. Procure separately and hand-solder or arrange consignment. Do not mislabel it Basic/Extended. Other exact parts' stock/class records are in evidence/catalog and the reviewed BOM. Stock is not reserved; several parts have low stock and must be rechecked before procurement.

C19's exact Samsung CL10C470JB8NNNC/C1671 identity and Basic stock were verified in the catalog, but the parts engine failed to fetch its supplier footprint. The explicit non-polar 0603 footprint is reviewed; supplier rotation metadata and the strict CPL remain unresolved rather than suppressed.

TVS2200 is the TI reference protection choice. Its 125 °C, 35 A maximum clamp can exceed TPS25730's 28 V absolute maximum; no full-temperature surge immunity is claimed. CC protection is for ESD and is not a demonstrated CC-to-VBUS short protector. Buck loop stability, transient peaks, component temperature and all EMC/surge behavior require physical qualification. No certification is implied.

## Provenance

Root AGENTS.md, supplied brief and manufacturer PDFs are retained locally under references; those local inputs are not part of the public upload. The tscircuit skill and current official handbook were read during intake. Other board directories and shared workspace instructions were not modified. The earlier proposal-r0.sha256 and output/A1-review-manifest.sha256 are historical; the latter identifies output/pa25-a1-review.zip before publication metadata changes. PUBLICATION.sha256 and Git history identify the public snapshot. See PUBLICATION.md for its selected evidence scope. No fabrication files from an unvalidated revision may be presented as ready to order.

## Proper next action

Resolve the native routing/checker defects with this reproducible source and rejected circuit JSON, including the asynchronous Boolean-geometry crash, ignored minimum width/drill-to-pad constraints, and stalled congestion analysis. Then regenerate routing, rerun all affected checks, inspect the new copper and resolve supplier rotation metadata. Only after zero unresolved errors may Gerbers/drills/mask/paste/CPL be reviewed for a prototype order. This task stops at a reviewable, unvalidated design; no workaround routing arrays, patched copper, weakened tests or hidden failures were used. See docs/TOOLING_BLOCKERS.md for a concise reproduction record.

## Public snapshot checks

For the authorized public-source upload, formatting, TypeScript, netlist, placement, native build, board tests and independent shorts were rerun; see evidence/publish-*.log. Formatting/TypeScript and placement pass. Build again logs the DRC exception despite returning zero; board tests retain two failures and shorts retains the same short. evidence/publish-geometry-comparison.json confirms unchanged copper, pads, holes and electrical connections. Publication does not change any failed validation gate. Native dist is included for reproducible review, explicitly rejected for fabrication. Hosted-build status must be assessed separately from upload success.
