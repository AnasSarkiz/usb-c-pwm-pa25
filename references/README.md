# A1 reference register

Access/review date: 2026-09-30. Local manufacturer PDFs are reference material, not generated board deliverables. Supplier stock is a dated observation and is not reserved. The public repositories contain this source register; downloaded manufacturer PDFs, the original user attachment and workspace instruction copies stay local. Filenames below identify the original review evidence, while external links provide the public references.

| Circuit / topic | Primary source and evidence |
|---|---|
| User requirements | `user-brief.txt`; root instructions copied in `workspace-instructions.md` |
| Motor | [Official PA25-G23 drawing](https://www.stepperonline.com.mx/index.php?route=product/product/get_file&file=2743/PA25-24126000-G23_Full_Datasheet.pdf); `motor-pa25-g23.pdf`, single scanned page visually inspected in evidence/motor-datasheet.png |
| U1 PD sink | [TPS25730 datasheet](https://www.ti.com/lit/ds/symlink/tps25730.pdf) and local `tps25730-trm.pdf`; pins, hardware strap codes, power path, default-5-V behavior and active PDO/RDO registers reviewed |
| U2/U5 protection | [TPS25947 datasheet](https://www.ti.com/lit/ds/symlink/tps25947.pdf); exact TPS259470L latched variant, continuous reverse blocking, UV/OV, ILM, dVdt, ITIMER and AUXOFF/FLT reviewed |
| U3 control supply | [TPS709 datasheet](https://www.ti.com/lit/ds/symlink/tps709.pdf); 30 V input rating, EN behavior, capacitance and pinout |
| U4 buck | [TPS54202 datasheet](https://www.ti.com/lit/ds/symlink/tps54202.pdf), February 2026 revision; feedback corners, inductor/output-capacitor calculations, feed-forward compensation and layout |
| L1 inductor | [Bourns SRP7050TA](https://www.bourns.com/docs/product-datasheets/srp7050ta.pdf); 15 µH ratings and manufacturer land pattern visually reviewed |
| C15 output capacitor | [Panasonic SVPF](https://industrial.panasonic.com/cdbs/www-data/pdf/AAB8000/AAB8000C177.pdf); exact 25SVPF47M, 47 µF/25 V, ±20%, 30 mΩ, 2.8 A and C6 case. [LCSC C136280](https://www.lcsc.com/product-detail/C136280.html): 1,440 stocked; no JLCPCB catalog match, so separate procurement/hand solder or consignment |
| U6 motor bridge | [DRV8874 datasheet](https://www.ti.com/lit/ds/symlink/drv8874.pdf); pinout, PH/EN truth table, sleep/coast, IMODE, current regulation, charge pump and exposed pad |
| U7 reference | [LM4040 datasheet](https://www.ti.com/lit/ds/symlink/lm4040.pdf); B-grade 2.5 V accuracy, minimum bias and allowed pin-3 connection |
| U8 clamp/temperature | [LM393B datasheet](https://www.ti.com/lit/ds/symlink/lm393b.pdf); supply, open-collector output, input range/offset and pinout |
| D1 VBUS protection | [TVS2200 datasheet](https://www.ti.com/lit/ds/symlink/tvs2200.pdf); stand-off/clamp limits. Full-temperature maximum surge clamp exceeds the downstream PD IC absolute maximum; no full surge-immunity claim |
| U9 firmware/device | ST STM32C011F4 datasheet (`stm32c011f4-lcsc.pdf`), official ST CMSIS C0 v1.4.1 headers/startup and ST LL ADC calibration definitions. Firmware README records exact commit and build requirements |
| USB connector | [GCT USB4105](https://gct.co/connector/usb4105); shell stakes, contact arrangement and connector access |
| Brake resistors | [Bourns CRM-A](https://www.bourns.com/docs/product-datasheets/crm-a.pdf); exact CRM2512AJW-201ELF ratings and pulse curve visually inspected. Do not substitute the different CRM series datasheet |
| Panel pot | [Bourns PDB18](https://www.bourns.com/docs/product-datasheets/pdb18.pdf); PDB181-K420K-103B electrical, bushing, shaft and pin arrangement |
| Panel switch | [C&K 7000 toggle](https://www.ckswitches.com/media/1394/7000toggle.pdf); 7103 ON-OFF-ON, S/Y/Z/B/E options, gold dry-circuit contacts, common pin 2 and panel mounting |
| Reference supply | [Anker A2147](https://www.anker.com/products/a2147); fixed 15 V/2 A candidate; verify regional label in the physical test record |
| Fabrication | [JLCPCB rigid-board capabilities](https://jlcpcb.com/capabilities/Capab) and [stackup options](https://jlcpcb.com/impedance); four-layer FR-4 target with 1 oz copper on all layers and documented rules in MECHANICAL. Final manufacturer DFM and plating confirmation pending |
| tscircuit | [Handbook code guide](https://github.com/tscircuit/handbook/blob/main/guides/code.md), [bootstrapping guide](https://github.com/tscircuit/handbook/blob/main/guides/bootstrapping-repos.md); current guides read during intake. Standard SWD example retained as `standard-swd-example.tsx`/`standard-swd-parts.tsx` |

Per-part JLCPCB search responses, exact MPN/LCSC joins, packages, descriptions, Basic/Extended classification and stock observations are retained in `evidence/catalog/` and `evidence/bom-catalog-join.json`; procurement table is `output/BOM-review.csv`. Components were not qualified merely from a distributor category description. Low-stock parts must be rechecked before procurement, and no substitute is automatically approved.

The discarded ceramic-output option would have required Murata DC-bias verification. SimSurfing presented a software-license agreement that was not accepted. The implemented polymer option does not rely on that unreviewed curve. Legacy shortlisted PDFs remain historical research, not BOM selections.
