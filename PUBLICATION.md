# Public prototype publication

The user authorized a new public GitHub repository and a tscircuit project on 2026-09-30. Publication makes the current design available for review and development. It does not approve fabrication, establish operating limits, or complete physical testing.

- GitHub: https://github.com/AnasSarkiz/usb-c-pwm-pa25
- tscircuit: https://tscircuit.com/AnasSarkiz/usb-c-pwm-pa25
- Design revision: A1; package version: 0.1.0-prototype.1.
- Status: **unvalidated prototype; do not fabricate**.

## Published contents

The repositories include the declarative circuit sources and footprints, pinned package dependencies, firmware and required licensed CMSIS headers/startup, compiled firmware, six-sheet schematic PDF/SVGs, BOM, calculations, assembly/test instructions, current rejected PCB renders, current native build output, and selected validation evidence. PUBLICATION.sha256 identifies the published local inputs and outputs. Git history identifies the source revision.

The original user attachment, workspace instructions, downloaded manufacturer PDFs, local credentials/configuration, compiler installation, dependency installation, caches and the large historical review ZIP are excluded. The source register retains primary-source links. Historical evidence paths mentioned in VALIDATION.md that are not in this repository refer to the local development record; the current failures and their reproduction commands are included here.

The original local review ZIP and its A1-review manifest describe the earlier pre-publication snapshot. Metadata, documentation and Git provenance were subsequently updated for publication; that historical archive is not the public file manifest.

## Current failures

The current route has a detected top-layer short, 15 ordinary drill-to-pad clearance violations, and 23 emitted wire-width values below 0.15 mm. Native build/snapshot DRC reports a Boolean-geometry exception despite a zero exit status. The independent board tests intentionally remain failing for the rejected geometry. Congestion analysis stalls. Supplier rotation metadata is also incomplete, so no approved CPL or fabrication ZIP is provided.

See VALIDATION.md and docs/TOOLING_BLOCKERS.md. A hosted preview or successful upload is not evidence that these checks passed. No physical hardware tests have been performed and no board order is authorized by publication.

## Reproduction and upload

Use the frozen Bun lockfile and the compiler version described in firmware/README.md. All circuit checks run from this project root. Preserve the 60-minute worker timeout.

The installed tsci push implementation enumerates project files without consulting .gitignore. Publication therefore uses a clean export of the reviewed Git tree, including its dist directory, and the native `tsci push --include-dist --compress` command. No generated copper is patched and no routing arrays are imported. Verify uploaded source and dist hashes against the public manifest.

Original project code has no additional license grant in this snapshot. Retained third-party firmware files carry their original license notices. The package.json private flag prevents accidental npm publication and does not control either repository's public visibility.
