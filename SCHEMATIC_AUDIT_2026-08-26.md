# ToneForge schematic audit — 2026-08-26

Scope: every project that currently has at least one technical schematic/wiring source in ToneForge (19 project keys). Hand-coded ToneForge SVG redraws are explicitly excluded and were removed from the active web branch.

## Audit rules

1. A schematic must come from a real manufacturer/service document, established DIY reference, datasheet, or genuine CAD file.
2. A source link must be reachable or routed to a stable archive.
3. Project revision and the referenced circuit revision must be identified where possible.
4. BOM/topology is only marked `crosschecked` after comparison with the referenced schematic/BOM.
5. `source-found` does **not** mean build-ready.
6. No hand-coded SVG is accepted as an electrical schematic.
7. If a document forbids rehosting, ToneForge links to the original instead of copying it.

## Source-health finding

The original `electrosmash.com` site is currently unreliable/suspended. ToneForge now routes affected technical source pages to the MAS Effects ElectroSmash Archive, which was rebuilt from an Internet Archive capture. Original ElectroSmash hotlinks are therefore not treated as durable primary navigation.

## Project-by-project status

| Project | Audit status | Technical basis | Important result |
|---|---|---|---|
| Fuzz Face | CROSSCHECKED | ElectroSmash archive | Classic PNP AC128 reference confirmed. C2 is 20uF in the reference; 22uF is only a modern substitute. |
| TS808 effect core | CROSSCHECKED | ElectroSmash archive + ToneHome historical service source | Original TS808 uses JFET switching. ToneForge True-Bypass effect core must remain separate from the historical switching circuit. |
| ProCo RAT | CROSSCHECKED | GGG Type B Rev. 7-81 + ElectroSmash archive | LM308/2N5458/1N914 core and current ToneForge BOM align with the classic reference. |
| Big Muff Pi V3 | BOM CROSSCHECKED / VARIANT CAUTION | ElectroSmash American V3 + Kit Rae guide | ToneForge BOM matches the ElectroSmash American V3 1976–1977 reference, but V3 production has multiple real subvariants. Do not call it a universal V3 BOM. |
| MXR Dyna Comp | CROSSCHECKED | ElectroSmash archive | CA3080, five 2N3904 transistors, detector network, controls and BOM align. |
| MXR Phase 90 | SOURCE FOUND / REVISION OPEN | GGG P90 2015June30 + Politecnico di Milano LTspice CAD | Old ToneForge BOM conflicts with the GGG replica in several values/refdes. BOM has been withdrawn from build-ready use pending net-by-net CAD comparison. |
| Boss CE-2 | CROSSCHECKED / POWER REVISION CAUTION | ElectroSmash archive | MN3007/MN3101, 4558/TL022 and audio topology align. ACA/PSA power revision must be chosen for a strict replica. |
| PT2399 Delay | SOURCE FOUND / BOM OPEN | Synthrotek v0.4 PDF | Real v0.4 schematic confirmed (PT2399, NE5532, 78L05, Delay/Feedback/Mix). Existing ToneForge data is too generic and must be frozen to this revision before build-ready. |
| MXR Distortion+ | CROSSCHECKED | ElectroSmash archive | LM741 non-inverting gain stage, 4.7k/47nF gain branch, 1N270 germanium hard clipping, 1nF output filter confirmed. |
| Vox V847 | CROSSCHECKED | ElectroSmash archive | MPSA18 x2, 500mH inductor, 100k wah pot and classic V847 values confirmed. Do not mix with later buffered V847A/GCB95-type revisions. |
| Dallas Rangemaster | CROSSCHECKED | ElectroSmash archive | OC44 PNP, 470k/68k/3.9k, 10k log, 5nF/10nF/47uF values and positive-ground context confirmed. |
| Tone Bender Mark II Professional PNP | CROSSCHECKED | GGG 2012February09 | Exact GGG PNP-Germanium replica values confirmed. GGG adds 1.5M pulldown, true bypass and LED; it is not an untouched historical original. |
| Green Ringer | CROSSCHECKED | GGG 2012January10 | Q1/Q3 2N5088/5089, low-gain Q2 2N3906, matched diode pair and R/C network confirmed. |
| Improved EA Tremolo | CROSSCHECKED | GGG 2007November13 | Visual audit corrected C8 to 0.05uF (50nF), not 47nF. Q3 is shown as 2N5088 in the schematic. |
| MXR Micro Amp | CROSSCHECKED | ElectroSmash archive | TL061 circuit and exact BOM confirmed: 22M, 10M, 56k, 500k reverse-log, 4.7uF, 15uF, etc. |
| Treble Bleed | CROSSCHECKED | Rothstein Guitars | Parallel capacitor/resistor goes between volume input and wiper. Values are application-dependent; no universal pair is implied. |
| Kill Switch | CROSSCHECKED | GuitarElectronics.com | Normally-open momentary switch shorts signal hot to ground when pressed. External copyrighted diagram is not rehosted locally. |
| Phase Reverse | CROSSCHECKED | GuitarElectronics.com | DPDT On/On swaps pickup hot/cold. Shield/bare conductor must remain ground and must not be treated as switchable signal cold. |
| Humbucker Coil Split | CROSSCHECKED FOR SD COLOR CODE | Seymour Duncan official wiring PDF | 1H/1V On/On coil split confirmed for Seymour Duncan four-conductor color code only. Do not reuse those colors for other manufacturers. |

## Corrections made during this audit

- Removed all eight hand-coded schematic SVG redraws from the active web branch.
- Removed the obsolete `schematic-local-overrides.js` layer.
- Replaced misleading Phase 90 build BOM with an explicit `BOM NOT FROZEN` audit state.
- Corrected Fuzz Face C2 from 22uF to the 20uF reference value (22uF noted only as a modern substitute).
- Corrected Tone Bender MkII PNP BOM to the GGG 2012February09 replica.
- Corrected Improved EA Tremolo resistor/capacitor details; C8 is 0.05uF.
- Replaced generic Micro Amp BOM with the exact TL061 reference BOM.
- Replaced generic Rangemaster BOM with the exact classic OC44 PNP reference values.
- Clarified Green Ringer diode matching options.
- Separated historical TS808 JFET switching from the ToneForge True-Bypass effect-core variant.
- Routed dead/unreliable ElectroSmash navigation to the MAS Effects archive.

## Still open before build-ready

### Phase 90
Perform a net-by-net comparison between GGG P90 2015June30 and `polimi-ispl/mxrphase90/LTspice/MXRphase90.asc`. Freeze one exact revision and regenerate the BOM from that source only.

### PT2399 Delay
Choose Synthrotek v0.4 as the concrete ToneForge build target or choose a different documented design. If v0.4 is selected, replace the generic project BOM with the complete v0.4 BOM and switching network.

### Big Muff Pi V3
The current BOM is a valid American-V3 reference and matches the ElectroSmash analysis, but a strict historical reproduction still needs a specific V3 production subvariant to be named.
