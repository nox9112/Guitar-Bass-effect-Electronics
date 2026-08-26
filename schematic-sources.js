(()=>{
'use strict';
const checked='2026-08-26';
window.GBE_SCHEMATIC_SOURCES={
 'pedal:fuzz-face':[
  {label:'Dallas-Arbiter Fuzz Face · PNP Germanium',standard:'ANSI',revision:'frühe Arbiter-Referenz · AC128',image:'',source:'https://www.electrosmash.com/fuzz-face',publisher:'ElectroSmash',trust:'established-diy',review:'crosschecked',checked,note:'Topologie und BOM gegen die ElectroSmash-Analyse sowie die dort referenzierte Overton-Fuzz-Face-Arbeit geprüft. Klassisch: C1 2.2µF, C2 20µF, C3 10nF, 33k/470R/8.2k/100k, Fuzz 1k, Volume 500k, PNP positive Masse.'}
 ],
 'pedal:tube-screamer':[
  {label:'Ibanez TS-808 · historische Service-Schaltung',standard:'ANSI',revision:'TS-808 · 1980/81 Service-Unterlage',image:'https://www.tonehome.de/app/download/8039226/Ibanez_TS808_Schematics.jpg',source:'https://www.tonehome.de/ibanez/0-series-ts-808/ts-808-tube-scr/',publisher:'ToneHome · historische Ibanez-Unterlage',trust:'service-copy',review:'source-found',checked,note:'Diese Quelle zeigt den originalen elektronischen JFET-Bypass. Nicht mit der ToneForge-True-Bypass-Variante vermischen.'},
  {label:'TS808 · True-Bypass-Effektkern',standard:'ANSI',revision:'TS808-Kern ohne JFET-Schaltlogik',image:'',source:'https://electrosmash.com/tube-screamer-analysis',publisher:'ElectroSmash',trust:'established-diy',review:'crosschecked',checked,note:'Effektkern/BOM gegen die dokumentierte True-Bypass-Variante geprüft. C1 original 20nF; 22nF ist ein üblicher moderner Normwert-Ersatz.'}
 ],
 'pedal:rat':[
  {label:'ProCo RAT · Type B',standard:'ANSI',revision:'Type B · Rev. 7-81',image:'https://www.generalguitargadgets.com/wp-content/uploads/ratb.gif',source:'https://generalguitargadgets.com/effects-projects/distortion/rat/',publisher:'General Guitar Gadgets',trust:'established-diy',review:'crosschecked',checked,note:'Explizit Type B Rev. 7-81; nicht als universellen RAT2-/Turbo-RAT-Plan behandeln.'},
  {label:'ProCo RAT · klassischer LM308-Kern',standard:'ANSI',revision:'klassische Through-Hole-BOM',image:'',source:'https://www.electrosmash.com/proco-rat-analysis/pedals/distortion/pro-co-rat-distortion.html',publisher:'ElectroSmash',trust:'established-diy',review:'crosschecked',checked,note:'BOM stimmt mit den ToneForge-Kerndaten überein: LM308, 2N5458, 1N914-Clipping, 100k Dist/Filter/Volume und die dokumentierten RC-Werte.'}
 ],
 'pedal:big-muff':[
  {label:'Electro-Harmonix Big Muff Pi · V3 Circuit Guide',standard:'ANSI',revision:'V3-Familie · konkrete Untervariante offen',image:'',source:'https://www.kitrae.net/music/Images_Secret_Music_Page/BIG%20MUFF%20CIRCUIT%20GUIDE.pdf',publisher:'Kit Rae · Big Muff Page',trust:'established-diy',review:'source-found',checked,note:'Die V3-Familie besitzt mehrere Schaltungsvarianten. Noch kein eindeutiger Build-Plan, bis eine konkrete Produktionsuntervariante gewählt ist.'},
  {label:'Big Muff Pi · American V3 Analyse',standard:'ANSI',revision:'American Version 3 · 1976–1977 Referenz',image:'',source:'https://www.electrosmash.com/big-muff-pi-analysis',publisher:'ElectroSmash',trust:'established-diy',review:'source-found',checked,note:'Dient zum Gegenvergleich. Vor Build-ready muss eine konkrete V3-Untervariante festgelegt und die ToneForge-BOM darauf eingefroren werden.'}
 ],
 'pedal:compressor':[
  {label:'MXR Dyna Comp · CA3080',standard:'ANSI',revision:'klassische CA3080-Schaltung',image:'https://www.electrosmash.com/images/tech/mxr-dyna-comp/mxr-dyna-comp-schematic-parts.png',source:'https://www.electrosmash.com/mxr-dyna-comp-analysis',publisher:'ElectroSmash',trust:'established-diy',review:'crosschecked',checked,note:'Schaltplan und BOM gemeinsam geprüft. CA3080, Q1–Q5 2N3904, 500k Sustain, 50k Level und 2k Trimmer stimmen mit den ToneForge-Daten überein.'}
 ],
 'pedal:phase90':[
  {label:'MXR Phase 90 · GGG schematic',standard:'ANSI',revision:'P90 Replica · 2015June30',image:'',source:'https://generalguitargadgets.com/pdf/ggg_p90_sc.pdf',publisher:'General Guitar Gadgets',trust:'established-diy',review:'source-found',checked,note:'Echter Schaltplan; Rehosting ist laut Dokument untersagt. ToneForge verlinkt daher nur die Originaldatei. Noch nicht als identische historische Script-Logo-Produktionsrevision verifiziert.'},
  {label:'MXR Phase 90 · LTspice CAD reference',standard:'ANSI',revision:'Politecnico di Milano LTspice model',image:'',source:'https://github.com/polimi-ispl/mxrphase90',cad:'https://github.com/polimi-ispl/mxrphase90/blob/main/LTspice/MXRphase90.asc',publisher:'Politecnico di Milano · ISPL',trust:'open-source',review:'source-found',checked,note:'Echte LTspice-CAD-Datei. GGG-Schaltplan und CAD-Modell werden noch netzweise gegeneinander geprüft, bevor ToneForge die Phase-90-BOM als build-ready einstuft.'}
 ],
 'pedal:chorus':[
  {label:'Boss CE-2 · MN3007 / MN3101',standard:'ANSI',revision:'klassische CE-2 BBD-Topologie',image:'https://www.electrosmash.com/images/tech/ce-2/boss-ce-2-schematic-parts.png',source:'https://www.electrosmash.com/boss-ce-2-analysis',publisher:'ElectroSmash',trust:'established-diy',review:'crosschecked',checked,note:'MN3007/MN3101, 4558/TL022 und die dokumentierte BOM sind gegengeprüft. ACA-/PSA-Versorgungsrevision vor einer 1:1-Replikation gesondert festlegen.'}
 ],
 'pedal:pt2399':[
  {label:'Synthrotek PT2399 Delay',standard:'ANSI',revision:'v0.4',image:'',source:'https://www.synthrotek.com/wp-content/uploads/2014/02/pt2399_delay_v04.pdf',publisher:'Synthrotek',trust:'open-source',review:'source-found',checked,note:'Eindeutiger v0.4-Schaltplan mit PT2399, NE5532, 78L05 sowie Delay/Feedback/Mix. Die aktuelle ToneForge-Projekt-BOM ist noch generischer als diese Revision und wird deshalb noch nicht als gegengeprüft markiert.'}
 ],
 'pedal:distortion-plus':[
  {label:'MXR Distortion+ · LM741 / Germanium',standard:'ANSI',revision:'klassischer Distortion+-Kern',image:'https://www.electrosmash.com/images/tech/mxr-distortion-plus/mxr_distortion_schematic_parts.png',source:'https://www.electrosmash.com/mxr-distortion-plus-analysis',publisher:'ElectroSmash',trust:'established-diy',review:'crosschecked',checked,note:'LM741, 1M Distortion, 10k Output, 4.7k/47nF Gain-Zweig und 1nF Ausgangsfilter gegengeprüft. Historische Geräte nutzten Germaniumdioden wie 1N270; die ElectroSmash-Zeichnung zeigt 1N34A.'}
 ],
 'pedal:vox-v847':[
  {label:'Vox V847 Wah-Wah',standard:'ANSI',revision:'klassische V847-Topologie',image:'',source:'https://www.electrosmash.com/vox-v847-analysis',publisher:'ElectroSmash',trust:'established-diy',review:'crosschecked',checked,note:'500mH-Induktor, 100k-Wah-Poti und die klassische zweistufige V847-Topologie gegen die ToneForge-Daten geprüft. Nicht mit gepufferten späteren CryBaby-GCB95-Revisionen vermischen.'}
 ],
 'pedal:rangemaster':[
  {label:'Dallas Rangemaster · OC44 PNP',standard:'ANSI',revision:'klassische positive-ground Topologie',image:'',source:'https://www.electrosmash.com/dallas-rangemaster',publisher:'ElectroSmash',trust:'established-diy',review:'crosschecked',checked,note:'Exakt abgeglichen: OC44 PNP, R1 470k, R2 68k, R3 3.9k, RV 10k log, C1 5nF, C2 10nF, C3/C4 47µF. Positive Masse beachten.'}
 ],
 'pedal:tone-bender-mkii':[
  {label:'Tone Bender Mark II Professional · PNP Germanium Replica',standard:'ANSI',revision:'GGG · 2012February09',image:'',source:'https://generalguitargadgets.com/pdf/ggg_tb_m2p_sc_pg.pdf',publisher:'General Guitar Gadgets',trust:'established-diy',review:'crosschecked',checked,note:'Konkrete ToneForge-Variante auf die GGG-PNP-Germanium-Replica festgelegt. GGG ergänzt 1.5M-Pulldown, True Bypass und LED; das ist nicht als unangetastetes historisches Original auszugeben.'}
 ],
 'pedal:green-ringer':[
  {label:'Dan Armstrong Green Ringer · GGG Replica',standard:'ANSI',revision:'2012January10',image:'',source:'https://generalguitargadgets.com/pdf/ggg_gro_sc.pdf',publisher:'General Guitar Gadgets',trust:'established-diy',review:'crosschecked',checked,note:'BOM und Topologie gegengeprüft: Q1/Q3 2N5088/5089, Q2 2N3906 low gain; D1/D2 gematcht; R/C-Werte stimmen mit ToneForge überein. Original-PDF nicht rehosten.'}
 ],
 'pedal:ea-tremolo':[
  {label:'Improved EA Tremolo',standard:'ANSI',revision:'GGG · 2007November13',image:'',source:'https://generalguitargadgets.com/pdf/ggg_eat_sc_improved.pdf',publisher:'General Guitar Gadgets',trust:'established-diy',review:'crosschecked',checked,note:'Schaltplan und BOM gegengeprüft. Q1 2N3904, Q2/Q4 2N5457 oder J201, Q3 2N5089/2N5088; Volume 25k log, Depth 250k lin, Speed 100k reverse-log. Original-PDF nicht rehosten.'}
 ],
 'pedal:micro-amp':[
  {label:'MXR Micro Amp · TL061',standard:'ANSI',revision:'klassische M-133 Topologie',image:'https://www.electrosmash.com/images/tech/microamp/mxr-microamp-schematic.png',source:'https://www.electrosmash.com/mxr-microamp',publisher:'ElectroSmash',trust:'established-diy',review:'crosschecked',checked,note:'Exakt abgeglichen: TL061, R1 22M, R2 10M, R3 1k, R4 56k, 500k reverse-log Gain, R6 2.7k, R7/R8 100k, R9 470R, R10 10k; C1 100nF, C2 47pF, C3 4.7µF, C4 1µF, C5 15µF.'}
 ],
 'wiring:treble-bleed':[
  {label:'Treble Bleed · C + R parallel',standard:'WIRING',revision:'Volume-Poti · parallele RC-Variante',image:'',source:'https://www.guitar-mod.com/rg_diag_treble_bleed.html',publisher:'Rothstein Guitars',trust:'established-diy',review:'crosschecked',checked,note:'Topologie geprüft: Kondensator und Widerstand parallel zwischen Eingang und Wiper des Volume-Potis. Rothstein nennt typ. 680–1000pF plus etwa 50–90% des Pot-Werts; Beispiel 1000pF + 150k bei 250k.'}
 ],
 'wiring:kill-switch':[
  {label:'Momentary Kill Switch / Output Mute',standard:'WIRING',revision:'Normally-open-Taster gegen Masse',image:'https://cdn11.bigcommerce.com/s-fxdzp2uudp/images/stencil/1280x1280/products/2525/5390/WIRING_MOD_SW001__23857.1471907091.jpg?c=2',source:'https://guitarelectronics.com/guitar-kill-switch-output-mute-switch/',publisher:'GuitarElectronics.com',trust:'established-diy',review:'crosschecked',checked,note:'Geprüfte Grundtopologie: Normally-open Momenttaster schließt Hot gegen Masse. Quelle untersagt unautorisierte Neuveröffentlichung; ToneForge hostet keine lokale Kopie.'}
 ],
 'wiring:phase-reverse':[
  {label:'Pickup In Phase / Reverse Phase',standard:'WIRING',revision:'DPDT On/On · Hot/Cold kreuzen',image:'https://cdn11.bigcommerce.com/s-fxdzp2uudp/images/stencil/1280x1280/products/2522/5406/In_Phase_Reverse_Phase__40362.1471991208.jpg',source:'https://guitarelectronics.com/in-phase-reverse-phase/',publisher:'GuitarElectronics.com',trust:'established-diy',review:'crosschecked',checked,note:'DPDT-On/On-Phasenumkehr geprüft. Wirkt klanglich erst im Zusammenspiel mit einem zweiten aktiven Pickup. Abschirmung/Bare darf nicht mit dem umgeschalteten Signal-Cold verwechselt werden.'}
 ],
 'wiring:coil-split':[
  {label:'Humbucker Coil Split · Seymour Duncan 1H/1V',standard:'WIRING',revision:'1 Humbucker · 1 Volume · On/On Mini-Toggle',image:'',source:'https://www.seymourduncan.com/images/wiring-diagrams/1H_1V_mtSPL.pdf',publisher:'Seymour Duncan',trust:'manufacturer',review:'crosschecked',checked,note:'Herstellerdiagramm für Seymour-Duncan-Farbcode. Nicht auf andere Herstellerfarben übertragen; Red/White-Series-Link und Black/Green/Bare gelten nur im SD-Kontext.'}
 ]
};
})();
