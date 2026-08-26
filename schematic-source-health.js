(()=>{
'use strict';
const P=window.GBE_SCHEMATIC_SOURCES||{};
const archive={
 'pedal:fuzz-face':{source:'https://electrosmash.mas-effects.com/fuzz-face',image:'https://electrosmash.mas-effects.com/images/fuzz-face/fuzz-face-original-schematic-parts.png'},
 'pedal:tube-screamer':{source:'https://electrosmash.mas-effects.com/tube-screamer-analysis.html'},
 'pedal:rat':{source:'https://electrosmash.mas-effects.com/pro-co-rat-analysis'},
 'pedal:big-muff':{source:'https://electrosmash.mas-effects.com/big-muff-pi-analysis.html'},
 'pedal:compressor':{source:'https://electrosmash.mas-effects.com/mxr-dyna-comp-analysis',image:'https://electrosmash.mas-effects.com/images/mxr-dyna-comp-analysis/mxr-dyna-comp-schematic-parts.png'},
 'pedal:chorus':{source:'https://electrosmash.mas-effects.com/boss-ce-2-analysis'},
 'pedal:distortion-plus':{source:'https://electrosmash.mas-effects.com/mxr-distortion-plus-analysis'},
 'pedal:vox-v847':{source:'https://electrosmash.mas-effects.com/vox-v847-analysis'},
 'pedal:rangemaster':{source:'https://electrosmash.mas-effects.com/dallas-rangemaster',image:'https://electrosmash.mas-effects.com/images/dallas-rangemaster/dallas-rangemaster-schematic-parts.png'},
 'pedal:micro-amp':{source:'https://electrosmash.mas-effects.com/mxr-microamp',image:'https://electrosmash.mas-effects.com/images/mxr-microamp/mxr-microamp-schematic.png'}
};
for(const [key,repl] of Object.entries(archive)){
 const rows=P[key]||[];
 for(const plan of rows){
  if(!/electrosmash/i.test(String(plan.publisher||''))&&!/electrosmash\.com/i.test(String(plan.source||'')))continue;
  plan.source=repl.source;
  if(repl.image)plan.image=repl.image;
  else if(/electrosmash\.com/i.test(String(plan.image||'')))plan.image='';
  plan.sourceHealth='archive';
  plan.sourceHealthNote='Original ElectroSmash currently unavailable; routed to MAS Effects archive rebuilt from Internet Archive.';
 }
}
const muff=(P['pedal:big-muff']||[]).find(x=>/American V3/i.test(String(x.label||'')));
if(muff){muff.review='crosschecked';muff.note='ToneForge BOM matches the archived ElectroSmash American Version 3 (1976–1977) reference. This is one concrete V3 reference, not a claim that every V3 production subvariant is identical.';}
})();
