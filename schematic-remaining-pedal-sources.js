(()=>{
'use strict';
const P=window.GBE_SCHEMATIC_SOURCES||(window.GBE_SCHEMATIC_SOURCES={});
const checked='2026-08-26';
P['pedal:volume-passive']=[
 {label:'Passive Volume · variable voltage divider',standard:'ANSI',revision:'high-impedance passive guitar signal',image:'',source:'https://stompboxelectronics.com/2022/11/08/circuit-3-of-48-the-voltage-divider/',publisher:'Stompbox Electronics',trust:'established-diy',review:'crosschecked',checked,note:'The source explicitly shows passive volume as a potentiometer used as a variable AC voltage divider: input at the top terminal, ground at the bottom, output from the wiper.'},
 {label:'Ernie Ball VP Jr 250K · passive-signal impedance reference',standard:'REFERENCE',revision:'250 kΩ passive / 25 kΩ active guidance',image:'',source:'https://www.ernieball.de/faq',publisher:'Ernie Ball',trust:'manufacturer',review:'crosschecked',checked,note:'Manufacturer guidance confirms 250K/500K volume pedals for passive sources and 25K for active/buffered sources. ToneForge build target is the passive high-impedance 250K variant.'}
];
P['pedal:sample-trigger']=[
 {label:'Adafruit Audio FX Sound Board · trigger/audio hardware',standard:'CAD',revision:'Audio FX Sound Board · GPIO trigger mode',image:'',source:'https://learn.adafruit.com/adafruit-audio-fx-sound-board/downloads',cad:'https://github.com/adafruit/Adafruit-Audio-FX-Sound-Board-PCBs',publisher:'Adafruit Industries',trust:'manufacturer',review:'source-found',checked,note:'Official documentation provides schematic/fabrication prints and open EagleCAD PCB files. Eleven trigger inputs are active-low to ground; outputs are line/headphone level. This is the concrete sample-trigger core, not by itself a guitar dry/wet mixer.'},
 {label:'Adafruit Audio FX · trigger behavior / pinout',standard:'REFERENCE',revision:'GPIO trigger mode',image:'',source:'https://learn.adafruit.com/adafruit-audio-fx-sound-board/triggering-audio',publisher:'Adafruit Industries',trust:'manufacturer',review:'crosschecked',checked,note:'Official guide documents the 11 pull-up trigger pins, switch-to-ground operation and supported trigger modes. Any guitar input buffer or dry/wet mixer must be a separately documented circuit.'}
];
P['pedal:talkbox']=[
 {label:'Heil Sound HT-1 Talk Box · inspected schematic',standard:'ANSI',revision:'HT-1 inspected 1992 · drawing rev 2000-07-12',image:'',source:'https://schematicheaven.net/effects/ggg_heil_talkbox_ht1.pdf',publisher:'JD Sleep / Guitar Effects Projects archive',trust:'reference',review:'crosschecked',checked,note:'Classic speaker-level topology: heavy-duty SPDT routing, 15µF 50V non-polarized capacitor and high-frequency compression driver. The document explicitly forbids rehosting, so ToneForge links only to it.'},
 {label:'Heil HT-1 · official operating configuration',standard:'REFERENCE',revision:'Jim Dunlop HT-1 manual',image:'',source:'https://www.jimdunlop.com/content/manuals/HT-1.pdf',publisher:'Dunlop Manufacturing / Heil Sound',trust:'manufacturer',review:'crosschecked',checked,note:'Official manual confirms the Talk Box is driven from an amplifier SPEAKER OUTPUT, is an 8-ohm load rated 100W max / 50W RMS, and requires speaker cable. ToneForge therefore treats this as a classic external-amplifier talkbox, not a pedal with an invented internal power amp.'}
];
const names={
 'pedal:volume-passive':'Passive Volume · 250K',
 'pedal:sample-trigger':'Adafruit Audio FX Sample Trigger',
 'pedal:talkbox':'Heil HT-1 Style Talk Box · External Amp'
};
for(const [key,name] of Object.entries(names)){
 const row=window.GBE_DATA?.[key];if(row)row[0]=name;
 const item=window.ToneForgeLibrary?.all?.find(x=>x.key===key);if(item)item.name=name;
}
const talk=window.GBE_DATA?.['pedal:talkbox'];if(talk){talk[2]='Klassische speaker-level Talkbox: der Lautsprecherausgang eines externen Verstärkers treibt einen Kompressionstreiber, dessen Schall über einen Schlauch in den Mund geführt und mit einem Mikrofon abgenommen wird.';talk[3]='Amp Speaker Out|SPDT Routing|15µF NP Protection|Compression Driver|Tube|Microphone / PA';talk[6]='Nur an einem geeigneten Lautsprecherausgang mit korrekter Last/Leistung betreiben. Schweres Lautsprecherkabel verwenden, kein normales Gitarrenkabel. Verstärker- und PA-Erdung sowie maximale Treiberleistung prüfen.';talk[8]='Heil HT-1 Referenz · externer Verstärker';}
})();
