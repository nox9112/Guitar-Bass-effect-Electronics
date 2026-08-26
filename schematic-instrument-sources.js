(()=>{
'use strict';
const P=window.GBE_SCHEMATIC_SOURCES||(window.GBE_SCHEMATIC_SOURCES={});
const D=window.GBE_DATA||(window.GBE_DATA={});
const checked='2026-08-26';
P['instrument:theremin']=[
 {label:'Open.Theremin V3 · KiCad schematic / PCB / BOM',standard:'CAD',revision:'Open.Theremin V3 Shield',image:'',source:'https://github.com/GaudiLabs/OpenTheremin_V3_Shield',cad:'https://github.com/GaudiLabs/OpenTheremin_V3_Shield/tree/master/PCB',publisher:'GaudiLabs',trust:'open-source',review:'source-found',checked,note:'GPL-3.0 open-hardware repository. Contains OpenThereminCC.sch, KiCad PCB, netlist, BOM spreadsheet, Gerbers, antenna drawing and assembly instructions. ToneForge data must be reconciled to this exact V3 shield before crosschecked status.'}
];
P['instrument:stylophone']=[
 {label:'1968 Dubreq Stylophone · KiCad reconstruction',standard:'CAD',revision:'1968 original reverse-engineering project',image:'',source:'https://github.com/simoninns/stylophone-1968',cad:'https://github.com/simoninns/stylophone-1968/tree/main/kicad',publisher:'Simon Inns',trust:'open-source',review:'source-found',checked,note:'GPL-3.0 project contains a full KiCad schematic, original-manual archive, measured component data and OpenSCAD case reconstruction. It reverse-engineers the 1968 Stylophone with original reference designators.'}
];
P['instrument:keyboard']=[
 {label:'mechmidi1 · RP2040 MIDI controller / sequencer',standard:'CAD',revision:'RP2040-Zero 20-key prototype',image:'',source:'https://github.com/konsumer/mechmidi1',cad:'https://github.com/konsumer/mechmidi1/tree/main/kicad',publisher:'konsumer',trust:'open-source',review:'candidate',checked,note:'Repository provides KiCad hardware, schematic image and firmware for a 20-key USB/classic-MIDI controller/sequencer. IMPORTANT: the author reports key spacing and RP2040 board-clearance issues in the current PCB and is reworking it. ToneForge therefore keeps this as a candidate, not a build-ready design.'}
];
if(!D['instrument:theremin'])D['instrument:theremin']=[
 'Open.Theremin V3 · Arduino Shield','Theremin / Open Hardware','Konkretes Open-Source-Theremin auf Basis des GaudiLabs Open.Theremin-V3-Shields. Das Repository enthält Schaltplan, PCB, Netlist, BOM, Gerber, Antennenzeichnung und Aufbauunterlagen.','Pitch Oscillators|Arduino / Digital Control|Volume Oscillator|Audio Output|Antennas','BOM NACH QUELLE: BOMOpenThereminV3.ods im GaudiLabs-Repository; Arduino-UNO-kompatible Steuerung; Open.Theremin-V3-Shield-PCB; Antennen- und Mechanikteile nach Bauanleitung','Quelle prüfen','Vor dem Aufbau ausschließlich die V3-Unterlagen zusammen verwenden. Antennenmechanik und Kalibrierung sind Teil des Systems; Bauteilwerte und Footprints nicht aus anderen Theremin-Revisionen mischen.','GaudiLabs OpenTheremin_V3_Shield: KiCad-Schaltplan/PCB, Netlist, BOM, Gerber und Montageunterlagen.','Open.Theremin V3 Shield · Open Hardware'
];
if(!D['instrument:stylophone'])D['instrument:stylophone']=[
 '1968 Dubreq Stylophone · Reconstruction','Stylophone / Reverse Engineering','Reverse-Engineering-Projekt des ursprünglichen 1968 Dubreq Stylophone mit KiCad-Schaltplan, gemessenen Bauteildaten, Originalmanual und OpenSCAD-Gehäuserekonstruktion.','Stylus Keyboard|Relaxation Oscillator|Vibrato / Tone|Amplifier|Speaker','BOM NACH QUELLE: KiCad- und Messdaten im stylophone-1968-Repository; Originalwert-Rekonstruktion; Lautsprecher; Stylus-/Kontakt-Tastatur; Gehäuseteile nach OpenSCAD-Unterlagen','Quelle prüfen','Als historische Rekonstruktion behandeln: gemessene Originalwerte und KiCad-Revision zusammen verwenden. Vor Ersatzteilwahl Transistor-/Bauteilvarianten und mechanische Kontaktgeometrie gegen die Repository-Dokumentation prüfen.','Simon Inns stylophone-1968: GPL-3.0 Reverse Engineering mit KiCad, Messdaten, Originalmanual und OpenSCAD-Gehäuse.','1968 Original-Rekonstruktion · KiCad/OpenSCAD'
];
if(!D['instrument:keyboard'])D['instrument:keyboard']=[
 'mechmidi1 · RP2040 MIDI Controller','MIDI Controller / Prototype','Open-Source-Prototyp eines 20-Tasten USB-/DIN-MIDI-Controllers und Sequenzers auf RP2040-Zero-Basis. Elektronik, KiCad-Dateien und Firmware sind vorhanden, die aktuelle mechanische PCB-Revision ist laut Autor jedoch noch problematisch.','Key Matrix|RP2040-Zero|USB MIDI|DIN MIDI|Sequencer / Firmware','BOM NACH QUELLE: mechmidi1 KiCad-/Projektdateien; RP2040-Zero; 20 Tasten/Schalter; MIDI-/USB-Anschlüsse; PCB- und Mechanikteile nach Repository','Quelle prüfen','KANDIDAT – nicht build-ready. Der Autor dokumentiert Probleme mit Tastenabstand und Board-Clearance; deshalb vor Fertigung zuerst die aktuelle KiCad-Mechanik und offene Issues prüfen.','konsumer/mechmidi1: Open-Source-Hardware und Firmware; aktuelle PCB-Mechanik ausdrücklich noch in Überarbeitung.','RP2040-Zero 20-Key Prototype · mechanische Revision offen'
];
const patch={
 'instrument:theremin':['Open.Theremin V3 · Arduino Shield','Open-source heterodyne theremin · KiCad PCB/BOM/Gerber'],
 'instrument:stylophone':['1968 Dubreq Stylophone · Reconstruction','Original-circuit reverse engineering · KiCad + OpenSCAD'],
 'instrument:keyboard':['mechmidi1 · RP2040 MIDI Controller','20 keys · USB/classic MIDI · RP2040 · prototype caution']
};
for(const [key,[name,meta]] of Object.entries(patch)){
 const row=D[key];if(row){row[0]=name;row[8]=key==='instrument:keyboard'?'Open-source prototype · mechanical PCB revision still open':'Concrete open-source hardware target';}
 const item=window.ToneForgeLibrary?.all?.find(x=>x.key===key);if(item){item.name=name;item.meta=meta;}
}
})();
