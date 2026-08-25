(()=>{
'use strict';
const NS='http://www.w3.org/2000/svg';
const projectKey='pedal:fuzz-face';
const components=[
 {id:'J1',kind:'Klinkenbuchse',value:'Input'},
 {id:'C1',kind:'Kondensator',value:'2.2 µF electrolytic'},
 {id:'Q1',kind:'Transistor',value:'AC128 PNP germanium'},
 {id:'R1',kind:'Widerstand',value:'33 kΩ'},
 {id:'R4',kind:'Widerstand',value:'100 kΩ feedback'},
 {id:'Q2',kind:'Transistor',value:'AC128 PNP germanium'},
 {id:'R2',kind:'Widerstand',value:'470 Ω'},
 {id:'R3',kind:'Widerstand',value:'8.2 kΩ'},
 {id:'C3',kind:'Kondensator',value:'10 nF output'},
 {id:'VR1',kind:'Potentiometer',value:'1 kΩ linear FUZZ'},
 {id:'C2',kind:'Kondensator',value:'22 µF electrolytic'},
 {id:'VR2',kind:'Potentiometer',value:'500 kΩ audio VOLUME'},
 {id:'J2',kind:'Klinkenbuchse',value:'Output'},
 {id:'B1',kind:'Versorgung',value:'9 V battery · positive ground'}
];
const meta=Object.fromEntries(components.map(c=>[c.id,c]));
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const comp=(id,mark,body)=>`<g class="schematic-component" data-component="${id}" tabindex="0" role="button" aria-label="${id} ${esc(meta[id]?.value||'')}"><rect class="component-mark" ${mark}/>${body}</g>`;
const dot=(x,y)=>`<circle class="node" cx="${x}" cy="${y}" r="5"/>`;
const ground=(x,y)=>`<path class="wire" d="M${x} ${y}v18M${x-20} ${y+18}h40M${x-13} ${y+28}h26M${x-6} ${y+38}h12"/>`;
const resistorH=(x1,x2,y,label,value)=>{
 const mid=(x1+x2)/2,lead=22,w=(x2-x1)-44,step=w/8;let d=`M${x1} ${y}H${x1+lead}`;let x=x1+lead;for(let i=0;i<8;i++){const nx=x+step,yy=y+(i%2?-13:13);d+=`L${nx} ${yy}`;x=nx}d+=`L${x2-lead} ${y}H${x2}`;
 return `<path class="symbol" d="${d}"/><text class="label" x="${mid}" y="${y-28}" text-anchor="middle">${label}</text><text class="value" x="${mid}" y="${y+38}" text-anchor="middle">${value}</text>`;
};
const resistorV=(x,y1,y2,label,value)=>{
 const mid=(y1+y2)/2,lead=22,h=(y2-y1)-44,step=h/8;let d=`M${x} ${y1}V${y1+lead}`;let y=y1+lead;for(let i=0;i<8;i++){const ny=y+step,xx=x+(i%2?-13:13);d+=`L${xx} ${ny}`;y=ny}d+=`L${x} ${y2-lead}V${y2}`;
 return `<path class="symbol" d="${d}"/><text class="label" x="${x+28}" y="${mid-5}">${label}</text><text class="value" x="${x+28}" y="${mid+20}">${value}</text>`;
};
const capH=(x1,x2,y,label,value,polar=false,plusLeft=true)=>{
 const mid=(x1+x2)/2;return `<path class="wire" d="M${x1} ${y}H${mid-12}M${mid+12} ${y}H${x2}"/><path class="symbol" d="M${mid-12} ${y-28}V${y+28}M${mid+12} ${y-28}V${y+28}"/>${polar?`<text class="label" x="${plusLeft?mid-35:mid+25}" y="${y-34}">+</text>`:''}<text class="label" x="${mid}" y="${y-52}" text-anchor="middle">${label}</text><text class="value" x="${mid}" y="${y+55}" text-anchor="middle">${value}</text>`;
};
const capV=(x,y1,y2,label,value,polar=false,plusBottom=false)=>{
 const mid=(y1+y2)/2;return `<path class="wire" d="M${x} ${y1}V${mid-12}M${x} ${mid+12}V${y2}"/><path class="symbol" d="M${x-28} ${mid-12}H${x+28}M${x-28} ${mid+12}H${x+28}"/>${polar?`<text class="label" x="${x+36}" y="${plusBottom?mid+22:mid-16}">+</text>`:''}<text class="label" x="${x+45}" y="${mid-4}">${label}</text><text class="value" x="${x+45}" y="${mid+20}">${value}</text>`;
};
const transistorPNP=(x,y,label)=>`<path class="symbol" d="M${x-48} ${y}H${x-15}M${x-15} ${y-48}V${y+48}M${x-15} ${y-26}L${x+38} ${y-72}M${x-15} ${y+26}L${x+38} ${y+72}"/><path class="symbol-fill" d="M${x+7} ${y+43}l18 2-9-15z"/><text class="label" x="${x-10}" y="${y-88}" text-anchor="middle">${label}</text><text class="value" x="${x-10}" y="${y+104}" text-anchor="middle">PNP AC128</text><text class="value" x="${x-62}" y="${y+6}">B</text><text class="value" x="${x+45}" y="${y-70}">C</text><text class="value" x="${x+45}" y="${y+80}">E</text>`;
const potV=(x,y1,y2,label,value,wiperToX)=>{
 const mid=(y1+y2)/2;return `<path class="wire" d="M${x} ${y1}V${y1+26}M${x} ${y2-26}V${y2}"/><path class="symbol" d="M${x} ${y1+26}l-14 18 28 18-28 18 28 18-28 18 28 18-14 18V${y2-26}"/><path class="symbol" d="M${wiperToX} ${mid}H${x+22}l-13 -9m13 9l-13 9"/><text class="label" x="${x-54}" y="${mid-14}">${label}</text><text class="value" x="${x-54}" y="${mid+12}">${value}</text>`;
};
function fuzzFaceSVG(){
 return `<svg class="true-schematic" viewBox="0 0 1400 820" data-schematic-kind="component" data-project="${projectKey}" xmlns="${NS}" role="img" aria-label="Fuzz Face PNP germanium component schematic">
 <rect width="1400" height="820" fill="#090d11"/>
 <text class="title-text" x="45" y="42">Fuzz Face · PNP Germanium · positive ground</text>
 <text class="subtitle-text" x="45" y="70">Komponenten-Schaltplan · klassische Werte · Effektkern</text>
 <text class="warning-text" x="1355" y="42" text-anchor="end">Positive Masse: nicht direkt mit Standard-Daisy-Chain betreiben</text>
 <path class="wire" d="M120 105H1260"/><text class="net-label" x="125" y="94">−9 V rail</text>
 ${comp('B1','x="1230" y="78" width="125" height="620" rx="20"',`<path class="wire" d="M1290 105V195"/><path class="symbol" d="M1260 205h60M1273 224h34"/><path class="wire" d="M1290 224V680"/>${ground(1290,680)}<text class="label" x="1320" y="205">B1</text><text class="value" x="1320" y="228">9 V</text><text class="value" x="1320" y="252">+ to ground</text>`)}
 ${comp('J1','x="38" y="300" width="105" height="125" rx="18"',`<circle class="symbol" cx="72" cy="350" r="18"/><path class="wire" d="M90 350H125"/><text class="label" x="55" y="315">J1</text><text class="value" x="45" y="408">INPUT</text>`)}
 ${comp('C1','x="125" y="285" width="145" height="135" rx="18"',capH(125,270,350,'C1','2.2 µF',true,true))}
 <path class="wire" d="M270 350H342"/>${dot(300,350)}
 ${comp('Q1','x="325" y="218" width="155" height="310" rx="24"',transistorPNP(390,350,'Q1'))}
 <path class="wire" d="M428 422V680"/>${ground(428,680)}
 <path class="wire" d="M428 278H535V300"/>${dot(535,300)}
 ${comp('R1','x="465" y="105" width="145" height="215" rx="20"',resistorV(535,105,300,'R1','33 kΩ'))}
 <path class="wire" d="M535 300H650V340H700"/>
 ${comp('Q2','x="680" y="208" width="170" height="330" rx="24"',transistorPNP(750,340,'Q2'))}
 <path class="wire" d="M788 268H820V245"/>${dot(820,245)}
 ${comp('R3','x="760" y="145" width="125" height="130" rx="18"',resistorV(820,145,245,'R3','8.2 kΩ'))}
 <path class="wire" d="M820 145V140H930"/>${dot(930,140)}
 ${comp('R2','x="875" y="105" width="120" height="110" rx="18"',resistorV(930,105,205,'R2','470 Ω'))}
 <path class="wire" d="M930 105V105"/>
 <path class="wire" d="M930 140H985"/>
 ${comp('C3','x="975" y="83" width="155" height="130" rx="18"',capH(985,1125,140,'C3','10 nF'))}
 <path class="wire" d="M1125 140H1160V260"/>
 ${comp('VR2','x="1080" y="240" width="165" height="310" rx="22"',potV(1160,260,520,'VR2','500 kΩ A',1240))}
 <path class="wire" d="M1160 520V680"/>${ground(1160,680)}
 <path class="wire" d="M1240 390H1270"/>
 ${comp('J2','x="1260" y="330" width="105" height="125" rx="18"',`<circle class="symbol" cx="1320" cy="390" r="18"/><path class="wire" d="M1270 390H1302"/><text class="label" x="1280" y="350">J2</text><text class="value" x="1275" y="445">OUTPUT</text>`)}
 <path class="wire" d="M788 412H850V470"/>${dot(850,470)}
 ${comp('VR1','x="790" y="455" width="170" height="245" rx="22"',potV(850,470,680,'VR1','1 kΩ B',955))}
 <path class="wire" d="M850 680H850"/>${ground(850,680)}
 ${comp('C2','x="925" y="500" width="150" height="205" rx="20"',capV(990,545,680,'C2','22 µF',true,true))}
 <path class="wire" d="M955 575H990"/>
 <path class="wire" d="M850 470H740V610H300V350"/>
 ${comp('R4','x="430" y="545" width="250" height="120" rx="18"',resistorH(450,660,610,'R4','100 kΩ feedback'))}
 <text class="net-label" x="650" y="590" text-anchor="middle">feedback Q2 emitter → Q1 base</text>
 <text class="subtitle-text" x="45" y="770">Hinweis: Dieser Plan zeigt den Effektkern. 3PDT-True-Bypass und LED-Verdrahtung werden als separate Verdrahtungsansicht ergänzt.</text>
 </svg>`;
}
function fallbackSVG(x){
 const sig=(x?.[3]||'Input|Output').split('|').map(s=>s.trim()).filter(Boolean),W=1200,H=360,bw=150,gap=(W-100-bw*sig.length)/Math.max(1,sig.length-1);let out=`<svg viewBox="0 0 ${W} ${H}" data-schematic-kind="block" xmlns="${NS}"><rect width="1200" height="360" fill="#090d11"/><text class="title-text" x="40" y="42">Funktionsübersicht</text><text class="warning-text" x="40" y="72">Komponenten-Schaltplan für dieses Projekt folgt noch.</text>`;sig.forEach((s,i)=>{const x0=50+i*(bw+gap);if(i)out+=`<path class="wire" d="M${x0-gap} 190H${x0}"/>`;out+=`<rect x="${x0}" y="145" width="${bw}" height="90" rx="14" fill="#172029" stroke="#65d5aa" stroke-width="2"/><text class="label" x="${x0+bw/2}" y="195" text-anchor="middle">${esc(s)}</text>`});return out+'</svg>';
}
const STORAGE='gbe-build-status-v2:';
let state={},selected=null,currentProject=null;
function load(project){currentProject=project;try{state=JSON.parse(localStorage.getItem(STORAGE+project)||'{}')||{}}catch{state={}}}
function save(){if(currentProject)localStorage.setItem(STORAGE+currentProject,JSON.stringify(state))}
function statusOf(id){return state[id]||'open'}
function setStatus(id,status){if(!id)return;if(status==='open')delete state[id];else state[id]=status;save();selected=id;refresh()}
function select(id){selected=id;refresh()}
function refresh(){
 document.querySelectorAll('[data-component]').forEach(el=>{const id=el.dataset.component;el.dataset.status=statusOf(id);el.dataset.selected=String(id===selected)});
 document.querySelectorAll('[data-component-row]').forEach(row=>{const id=row.dataset.componentRow,st=statusOf(id);row.dataset.selected=String(id===selected);const b=row.querySelector('.status-badge');if(b){b.className='status-badge '+st;b.textContent=st==='done'?'Fertig':st==='active'?'In Arbeit':'Offen'}});
 document.querySelectorAll('[data-selected-component]').forEach(el=>{if(selected&&meta[selected])el.textContent=`${selected} · ${meta[selected].kind} · ${meta[selected].value}`;else el.textContent='Bauteil im Schaltplan oder in der Liste antippen'});
 const done=components.filter(c=>statusOf(c.id)==='done').length,active=components.filter(c=>statusOf(c.id)==='active').length;
 document.querySelectorAll('[data-progress]').forEach(el=>el.textContent=`${done}/${components.length} fertig · ${active} in Arbeit`);
 document.dispatchEvent(new CustomEvent('gbe:tracker-refresh',{detail:{project:currentProject,selected,state:{...state}}}));
}
function initTracker(project){if(project!==projectKey)return;load(project);document.addEventListener('click',e=>{const cmp=e.target.closest('[data-component]');if(cmp){select(cmp.dataset.component);return}const row=e.target.closest('[data-component-row]');if(row){select(row.dataset.componentRow);return}const btn=e.target.closest('[data-set-status]');if(btn){setStatus(selected,btn.dataset.setStatus);return}if(e.target.closest('[data-reset-status]')){if(confirm('Gespeicherten Baufortschritt für dieses Projekt zurücksetzen?')){state={};selected=null;save();refresh()}}});document.addEventListener('keydown',e=>{const cmp=e.target.closest?.('[data-component]');if(cmp&&(e.key==='Enter'||e.key===' ')){e.preventDefault();select(cmp.dataset.component)}});refresh()}
function trackerHTML(){return `<div class="tracker"><div class="tracker-head"><div><div class="tracker-title">Lötfortschritt</div><div class="tracker-progress" data-progress></div></div><button class="tracker-reset" data-reset-status>Zurücksetzen</button></div><div class="tracker-legend"><span class="legend-chip"><i class="legend-dot"></i>Offen · unmarkiert</span><span class="legend-chip"><i class="legend-dot active"></i>In Arbeit · blau</span><span class="legend-chip"><i class="legend-dot done"></i>Fertig · rot</span></div><div class="tracker-selection"><strong data-selected-component>Bauteil antippen</strong><div class="tracker-buttons"><button data-set-status="open">Offen</button><button data-set-status="active">In Arbeit</button><button data-set-status="done">Fertig</button></div></div></div>`}
function componentRows(){return components.map(c=>`<tr data-component-row="${c.id}"><td>${c.id}</td><td>${esc(c.kind)}</td><td>${esc(c.value)}</td><td class="status-cell"><span class="status-badge">Offen</span></td></tr>`).join('')}
window.SchematicRenderer={projectKey,components,meta,render:(key,x)=>key===projectKey?fuzzFaceSVG():fallbackSVG(x),isTrue:key=>key===projectKey,trackerHTML,componentRows,initTracker,statusOf,setStatus,select,refresh,getSelected:()=>selected};
})();