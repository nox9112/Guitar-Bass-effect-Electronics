(()=>{
'use strict';
const P=window.GBE_SCHEMATIC_SOURCES||(window.GBE_SCHEMATIC_SOURCES={});
const checked='2026-08-26';
P['pedal:boss-ds1']=[
 {label:'BOSS DS-1 · Service Notes',standard:'ANSI',revision:'DS-1 / DS-1A Service-Unterlage',image:'',source:'https://www.synfo.nl/servicemanuals/Boss/DS-1_SERVICE_NOTES.pdf',publisher:'BOSS Service Notes mirror · Synfo',trust:'service-copy',review:'source-found',checked,note:'Echte Service-Unterlage mit Schaltplan und PCB-Informationen. DS-1 besitzt mehrere relevante Produktionsrevisionen; ToneForge-BOM noch nicht auf eine einzige Revision eingefroren.'},
 {label:'Aion Comet Vintage Distortion · BOSS DS-1 build reference',standard:'ANSI',revision:'Aion current documentation · dual-op-amp build with vintage-voicing options',image:'',source:'https://aionfx.com/app/files/docs/comet_documentation.pdf',publisher:'Aion FX',trust:'established-diy',review:'source-found',checked,note:'Vollständige Build-Dokumentation mit BOM, Bauhinweisen, Schaltplan und Verdrahtung. Gute konkrete DIY-Basis; noch nicht mit ToneForge-BOM 1:1 gegengeprüft.'}
];
P['pedal:sd1']=[
 {label:'BOSS SD-1 · 1981 Service Notes',standard:'ANSI',revision:'ET5212-510A · 1981-03-03',image:'',source:'https://www.synfo.nl/servicemanuals/Boss/BOSS_SD-1_SERVICE_NOTES.pdf',publisher:'BOSS Service Notes mirror · Synfo',trust:'service-copy',review:'source-found',checked,note:'Historische Service-Unterlage mit vollständigem Schaltplan, FET-Schaltung und PCB-Informationen.'},
 {label:'Boss SD-1 Replica · GGG True-Bypass build',standard:'ANSI',revision:'GGG ITS8 SD-1 · 2018May07',image:'',source:'https://generalguitargadgets.com/pdf/ggg_its8_sd1_sc.pdf',publisher:'General Guitar Gadgets',trust:'established-diy',review:'source-found',checked,note:'Konkreter True-Bypass-DIY-Schaltplan. GGG untersagt Rehosting; ToneForge verlinkt nur die Originaldatei. Historische BOSS-FET-Schaltung und GGG-True-Bypass nicht vermischen.'}
];
P['pedal:orange-squeezer']=[
 {label:'Dan Armstrong Orange Squeezer · GGG Replica',standard:'ANSI',revision:'GGG OSQ · 2013June11',image:'',source:'https://generalguitargadgets.com/pdf/ggg_osq_sc.pdf',publisher:'General Guitar Gadgets',trust:'established-diy',review:'source-found',checked,note:'Konkreter DIY-Schaltplan. GGG stellt dazu BOM, Build Instructions und Wiring bereit; Rehosting ist untersagt.'},
 {label:'Dan Armstrong Orange Squeezer · Original reference',standard:'ANSI',revision:'Original circuit reference · GGG scan/redraw',image:'',source:'https://generalguitargadgets.com/pdf/ggg_osq_sc_original.pdf',publisher:'General Guitar Gadgets',trust:'reference',review:'source-found',checked,note:'Originalschaltung als Gegenreferenz; ToneForge hostet keine Kopie.'}
];
P['pedal:noise-gate']=[
 {label:'No-Noise Gate · MXR Noise Gate inspired',standard:'ANSI',revision:'PCB Guitar Mania · Building Docs v1.2 · 2021-11-29',image:'',source:'https://pcbguitarmania.com/wp-content/uploads/2018/07/No-Noise-Gate-1.2v-Building-Docs.pdf',publisher:'PCB Guitar Mania',trust:'established-diy',review:'source-found',checked,note:'Vollständiges Building-Doc mit Schaltplan. Konkrete Schaltung mit Dual-OpAmp, zwei 2N3904 und JFET 2N5485/2N5457-Familie. ToneForge-Projekt wird auf diese Revision umgestellt, bevor BOM als gegengeprüft gilt.'}
];
P['pedal:envelope-filter']=[
 {label:'Aion Minima Resonant Filter · Mu-Tron Micro V',standard:'ANSI',revision:'Aion Minima v1.0.0 · 2023-09-08',image:'',source:'https://aionfx.com/app/files/docs/minima_documentation.pdf',publisher:'Aion FX',trust:'established-diy',review:'source-found',checked,note:'Vollständige Build-Dokumentation mit BOM, Schaltplan, Verdrahtung und Build Notes. LM13700-basierte moderne Adaptation des Mu-Tron Micro V; ToneForge-BOM noch auf diese konkrete Variante einfrieren.'}
];
P['pedal:belton-reverb']=[
 {label:'PedalPCB Sproing Reverb · BTDR-2H(L)',standard:'ANSI',revision:'PedalPCB · revised 2022-10-27',image:'',source:'https://docs.pedalpcb.com/project/Sproing-PedalPCB.pdf',publisher:'PedalPCB',trust:'established-diy',review:'source-found',checked,note:'Vollständige BOM, Schaltplan und Wiring Diagram. Verwendet BTDR-2H(L), TL072×2 und L78L05. ToneForge-BOM noch auf diese Revision einfrieren.'}
];
P['pedal:aby-buffered']=[
 {label:'Dual IC Buffer · Buffered Outputs on an ABY Switch',standard:'ANSI',revision:'GGG · 2014July28',image:'',source:'https://generalguitargadgets.com/pdf/ggg_ic2buf_lo_aby.pdf',publisher:'General Guitar Gadgets',trust:'established-diy',review:'source-found',checked,note:'Konkreter Buffered-ABY-Schalt-/Verdrahtungsplan mit zwei dedizierten Ausgangspuffern. Diese Quelle deckt keine galvanische Transformer-Isolation ab; falls ToneForge Isolation behalten soll, wird dafür eine zweite konkrete Schaltung ergänzt.'}
];

const rename={
 'pedal:boss-ds1':'BOSS DS-1 · Revision auswählen',
 'pedal:sd1':'BOSS SD-1 · Revision auswählen',
 'pedal:orange-squeezer':'Dan Armstrong Orange Squeezer',
 'pedal:noise-gate':'No-Noise Gate · JFET',
 'pedal:envelope-filter':'Minima Resonant Filter · Mu-Tron Micro V',
 'pedal:belton-reverb':'Sproing Reverb · BTDR-2H',
 'pedal:aby-buffered':'Buffered ABY · Dual IC Buffer'
};
for(const [key,name] of Object.entries(rename)){
 const row=window.GBE_DATA?.[key]; if(row)row[0]=name;
 const item=window.ToneForgeLibrary?.all?.find(x=>x.key===key); if(item)item.name=name;
}
})();
