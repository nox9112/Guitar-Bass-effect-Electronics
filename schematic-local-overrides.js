(()=>{
'use strict';
const P=window.GBE_SCHEMATIC_SOURCES||(window.GBE_SCHEMATIC_SOURCES={});
P['pedal:phase90']=[
 {label:'MXR Phase 90 · Script Logo · GGG schematic',standard:'ANSI',revision:'P90 replica · 2015June30',image:'',source:'https://generalguitargadgets.com/pdf/ggg_p90_sc.pdf',publisher:'General Guitar Gadgets',trust:'established-diy',review:'source-found',note:'Originalschaltplan bleibt auf der GGG-Seite. ToneForge hostet keine Kopie, weil das Dokument Rehosting ausdrücklich untersagt.'},
 {label:'MXR Phase 90 · LTspice CAD reference',standard:'ANSI',revision:'Politecnico di Milano LTspice model',image:'',source:'https://github.com/polimi-ispl/mxrphase90',cad:'https://github.com/polimi-ispl/mxrphase90/blob/main/LTspice/MXRphase90.asc',publisher:'Politecnico di Milano · ISPL',trust:'open-source',review:'source-found',note:'Echte LTspice-CAD-Datei. Noch nicht als identische Produktionsrevision zum GGG-P90-Schaltplan markiert; Topologie und Werte werden zuerst gegengeprüft.'}
];
if(window.GBE_DATA?.['pedal:phase90'])window.GBE_DATA['pedal:phase90'][0]='MXR Phase 90 · Script Logo';
if(window.GBE_DATA?.['pedal:tone-bender-mkii'])window.GBE_DATA['pedal:tone-bender-mkii'][0]='Tone Bender Mark II Professional · PNP Germanium';
const phase=window.ToneForgeLibrary?.all?.find(x=>x.key==='pedal:phase90');if(phase)phase.name='MXR Phase 90 · Script Logo';
const tb=window.ToneForgeLibrary?.all?.find(x=>x.key==='pedal:tone-bender-mkii');if(tb)tb.name='Tone Bender Mark II Professional · PNP Germanium';
})();
