(()=>{
'use strict';
const P=window.GBE_SCHEMATIC_SOURCES||(window.GBE_SCHEMATIC_SOURCES={});
const checked='2026-08-26';
P['body:e-guitar']=[
 {label:'Stratocaster ’62 Body · 1:1 front/profile plan',standard:'CAD / 1:1 PDF',revision:'’62-style body reference',image:'',source:'https://www.electricherald.com/fender-stratocaster-templates/',publisher:'Electric Herald template archive',trust:'reference',review:'source-found',checked,note:'Free 1:1 body resource with measurements, pickup/bridge positions, neck heel pocket, electronics cavities and cross-sections. Electric Herald explicitly notes that most templates are not manufacturer-supplied and exact accuracy cannot be guaranteed; verify critical hardware and scale dimensions before routing.'}
];
P['body:e-bass']=[
 {label:'1957 Precision Bass · full-scale DXF/PDF',standard:'CAD / 1:1',revision:'1957 P-Bass reference · DXF-056',image:'',source:'https://www.electricherald.com/shop/bass-dxf-fender-precision-bass-1957/',publisher:'Electric Herald',trust:'reference',review:'source-found',checked,note:'Paid full-scale digital template set ($10–20 at audit date), based on a 1957 Precision Bass. Available as DXF/PDF/AI with labelled layers, scale/center lines and separated parts. Not a Fender factory CAD; verify bridge/neck/hardware against the chosen parts before machining.'},
 {label:'American Vintage II 1960 Precision Bass · official Fender service drawing',standard:'REFERENCE',revision:'FMIC service drawing',image:'',source:'https://www.fmicassets.com/Damroot/Original/10009/SM_0190160804_AM_VINT_II_60_P_BASS.pdf',publisher:'Fender Musical Instruments Corporation',trust:'manufacturer',review:'source-found',checked,note:'Official Fender service drawing used as an independent geometry/hardware reference. It is not itself a ready-to-route 1957 body template and must not be mixed blindly with the 1957 DXF.'}
];
P['body:e-violin']=[
 {label:'OpenFab F-F-Fiddle · full-size electric violin build',standard:'CAD / STL',revision:'F-F-Fiddle R7/R8-era build documentation',image:'',source:'https://makezine.com/projects/fffiddle/',cad:'https://www.thingiverse.com/thing:3131400',publisher:'OpenFab PDX / Make',trust:'open-source',review:'source-found',checked,note:'Full-size functional electric violin designed in Fusion 360 for FFF printing. Build documentation specifies printable bout/neck/bridge, 355mm truss rod, hardware, piezo pickup installation and assembly. The current public Thingiverse listing is linked as the CAD/STL source.'},
 {label:'F-F-Fiddle · OSHWA certification',standard:'REFERENCE',revision:'OSHWA US000010 · Version 1',image:'',source:'https://certification.oshwa.org/us000010.html',publisher:'Open Source Hardware Association',trust:'reference',review:'crosschecked',checked,note:'OSHWA records F-F-Fiddle as a full-size electric violin and documents CC BY-SA open-hardware/documentation status. This source validates provenance/licensing, while the Make build guide provides construction details.'}
];
const patch={
 'body:e-guitar':['’62 Stratocaster Body · 1:1 Plan','1:1 PDF · cavities · neck pocket · cross-sections'],
 'body:e-bass':['1957 Precision Bass · Full-Scale DXF/PDF','1:1 DXF/PDF · paid reference · Fender crosscheck'],
 'body:e-violin':['OpenFab F-F-Fiddle · Electric Violin','Full-size FFF electric violin · STL/CAD · piezo']
};
for(const [key,[name,meta]] of Object.entries(patch)){
 const row=window.GBE_DATA?.[key];if(row){row[0]=name;row[8]=key==='body:e-bass'?'1957 paid CAD target · official Fender drawing as crosscheck':'Concrete full-scale construction target';}
 const item=window.ToneForgeLibrary?.all?.find(x=>x.key===key);if(item){item.name=name;item.meta=meta;}
}
})();
