(()=>{
'use strict';
const P=window.GBE_SCHEMATIC_SOURCES||(window.GBE_SCHEMATIC_SOURCES={});
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
const patch={
 'instrument:theremin':['Open.Theremin V3 · Arduino Shield','Open-source heterodyne theremin · KiCad PCB/BOM/Gerber'],
 'instrument:stylophone':['1968 Dubreq Stylophone · Reconstruction','Original-circuit reverse engineering · KiCad + OpenSCAD'],
 'instrument:keyboard':['mechmidi1 · RP2040 MIDI Controller','20 keys · USB/classic MIDI · RP2040 · prototype caution']
};
for(const [key,[name,meta]] of Object.entries(patch)){
 const row=window.GBE_DATA?.[key];if(row){row[0]=name;row[8]=key==='instrument:keyboard'?'Open-source prototype · mechanical PCB revision still open':'Concrete open-source hardware target';}
 const item=window.ToneForgeLibrary?.all?.find(x=>x.key===key);if(item){item.name=name;item.meta=meta;}
}
})();
