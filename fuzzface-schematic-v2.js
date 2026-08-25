(()=>{
'use strict';
if(!window.SchematicRenderer)return;
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const meta=window.SchematicRenderer.meta;
const comp=(id,mark,body)=>`<g class="schematic-component" data-component="${id}" tabindex="0" role="button" aria-label="${id} ${esc(meta[id]?.value||'')}"><rect class="component-mark" ${mark}/>${body}</g>`;
const dot=(x,y)=>`<circle class="node" cx="${x}" cy="${y}" r="5"/>`;
const ground=(x,y)=>`<path class="wire" d="M${x} ${y}v18M${x-20} ${y+18}h40M${x-13} ${y+28}h26M${x-6} ${y+38}h12"/>`;
function rH(x1,x2,y,l,v){const m=(x1+x2)/2,a=x1+22,b=x2-22,s=(b-a)/8;let d=`M${x1} ${y}H${a}`,x=a;for(let i=0;i<8;i++){x+=s;d+=`L${x} ${y+(i%2?-13:13)}`}d+=`L${b} ${y}H${x2}`;return `<path class="symbol" d="${d}"/><text class="label" x="${m}" y="${y-28}" text-anchor="middle">${l}</text><text class="value" x="${m}" y="${y+38}" text-anchor="middle">${v}</text>`}
function rV(x,y1,y2,l,v){const m=(y1+y2)/2,a=y1+22,b=y2-22,s=(b-a)/8;let d=`M${x} ${y1}V${a}`,y=a;for(let i=0;i<8;i++){y+=s;d+=`L${x+(i%2?-13:13)} ${y}`}d+=`L${x} ${b}V${y2}`;return `<path class="symbol" d="${d}"/><text class="label" x="${x+28}" y="${m-6}">${l}</text><text class="value" x="${x+28}" y="${m+20}">${v}</text>`}
function cH(x1,x2,y,l,v,polar=false,plusLeft=true){const m=(x1+x2)/2;return `<path class="wire" d="M${x1} ${y}H${m-12}M${m+12} ${y}H${x2}"/><path class="symbol" d="M${m-12} ${y-28}V${y+28}M${m+12} ${y-28}V${y+28}"/>${polar?`<text class="label" x="${plusLeft?m-38:m+27}" y="${y-34}">+</text>`:''}<text class="label" x="${m}" y="${y-52}" text-anchor="middle">${l}</text><text class="value" x="${m}" y="${y+55}" text-anchor="middle">${v}</text>`}
function cV(x,y1,y2,l,v,plusBottom){const m=(y1+y2)/2;return `<path class="wire" d="M${x} ${y1}V${m-12}M${x} ${m+12}V${y2}"/><path class="symbol" d="M${x-28} ${m-12}H${x+28}M${x-28} ${m+12}H${x+28}"/><text class="label" x="${x+37}" y="${plusBottom?m+22:m-16}">+</text><text class="label" x="${x+48}" y="${m-5}">${l}</text><text class="value" x="${x+48}" y="${m+20}">${v}</text>`}
function qPNP(x,y,l){return `<path class="symbol" d="M${x-48} ${y}H${x-15}M${x-15} ${y-48}V${y+48}M${x-15} ${y-26}L${x+38} ${y-72}M${x-15} ${y+26}L${x+38} ${y+72}"/><path class="symbol-fill" d="M${x+7} ${y+43}l18 2-9-15z"/><text class="label" x="${x-10}" y="${y-88}" text-anchor="middle">${l}</text><text class="value" x="${x-10}" y="${y+104}" text-anchor="middle">PNP AC128</text><text class="value" x="${x-62}" y="${y+6}">B</text><text class="value" x="${x+45}" y="${y-70}">C</text><text class="value" x="${x+45}" y="${y+80}">E</text>`}
function potV(x,y1,y2,l,v,wX){const m=(y1+y2)/2;return `<path class="wire" d="M${x} ${y1}V${y1+26}M${x} ${y2-26}V${y2}"/><path class="symbol" d="M${x} ${y1+26}l-14 18 28 18-28 18 28 18-28 18 28 18-14 18V${y2-26}"/><path class="symbol" d="M${wX} ${m}H${x+22}l-13 -9m13 9l-13 9"/><text class="label" x="${x-62}" y="${m-14}">${l}</text><text class="value" x="${x-62}" y="${m+12}">${v}</text>`}
function fuzzFace(){
return `<svg class="true-schematic" viewBox="0 0 1400 820" data-schematic-kind="component" data-project="pedal:fuzz-face" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Fuzz Face PNP germanium component schematic">
<rect width="1400" height="820" fill="#090d11"/>
<text class="title-text" x="45" y="42">Fuzz Face · PNP Germanium · positive ground</text>
<text class="subtitle-text" x="45" y="70">Klassischer Effektkern · AC128 · 9 V Batterie</text>
<text class="warning-text" x="1355" y="42" text-anchor="end">Positive Masse · isolierte Versorgung / Batterie verwenden</text>
<path class="wire" d="M120 105H1260"/><text class="net-label" x="125" y="94">−9 V</text>
${comp('B1','x="1230" y="78" width="125" height="650" rx="20"',`<path class="wire" d="M1290 105V190"/><path class="symbol" d="M1260 200h60M1274 221h32"/><path class="wire" d="M1290 221V680"/>${ground(1290,680)}<text class="label" x="1320" y="201">B1</text><text class="value" x="1320" y="226">9 V</text><text class="value" x="1320" y="251">+ = GND</text>`)}
${comp('J1','x="35" y="300" width="105" height="125" rx="18"',`<circle class="symbol" cx="72" cy="350" r="18"/><path class="wire" d="M90 350H125"/><text class="label" x="48" y="315">J1</text><text class="value" x="43" y="409">INPUT</text>`)}
${comp('C1','x="120" y="285" width="150" height="135" rx="18"',cH(125,270,350,'C1','2.2 µF',true,true))}
<path class="wire" d="M270 350H342"/>${dot(300,350)}
${comp('Q1','x="325" y="218" width="155" height="310" rx="24"',qPNP(390,350,'Q1'))}
<path class="wire" d="M428 422V680"/>${ground(428,680)}
<path class="wire" d="M428 278H535V300"/>${dot(535,300)}
${comp('R1','x="470" y="102" width="145" height="220" rx="20"',rV(535,105,300,'R1','33 kΩ'))}
<path class="wire" d="M535 300H650V340H700"/>
${comp('Q2','x="680" y="208" width="170" height="330" rx="24"',qPNP(750,340,'Q2'))}
<path class="wire" d="M788 268H820"/>${dot(820,268)}
${comp('R3','x="755" y="168" width="130" height="125" rx="18"',rV(820,180,268,'R3','8.2 kΩ'))}
<path class="wire" d="M820 180H930"/>${dot(930,180)}
${comp('R2','x="870" y="100" width="125" height="105" rx="18"',rV(930,105,180,'R2','470 Ω'))}
<path class="wire" d="M930 180H985"/>
${comp('C3','x="975" y="120" width="155" height="135" rx="18"',cH(985,1125,180,'C3','10 nF'))}
<path class="wire" d="M1125 180H1160V260"/>
${comp('VR2','x="1080" y="240" width="165" height="315" rx="22"',potV(1160,260,520,'VR2','500 kΩ A',1240))}
<path class="wire" d="M1160 520V680"/>${ground(1160,680)}
<path class="wire" d="M1240 390H1270"/>
${comp('J2','x="1260" y="330" width="105" height="125" rx="18"',`<circle class="symbol" cx="1320" cy="390" r="18"/><path class="wire" d="M1270 390H1302"/><text class="label" x="1278" y="350">J2</text><text class="value" x="1275" y="445">OUTPUT</text>`)}
<path class="wire" d="M788 412H850V470"/>${dot(850,470)}
${comp('VR1','x="785" y="455" width="180" height="250" rx="22"',potV(850,470,680,'VR1','1 kΩ B',955))}
${ground(850,680)}
<path class="wire" d="M955 575H990"/>
${comp('C2','x="925" y="505" width="165" height="205" rx="20"',cV(990,545,680,'C2','22 µF',true))}
<path class="wire" d="M990 680H990"/>${ground(990,680)}
<path class="wire" d="M850 470H740V610H300V350"/>
${comp('R4','x="430" y="545" width="250" height="125" rx="18"',rH(450,660,610,'R4','100 kΩ feedback'))}
<text class="net-label" x="650" y="585" text-anchor="middle">Q2 emitter → Q1 base feedback</text>
<text class="subtitle-text" x="45" y="770">3PDT True-Bypass und LED sind nicht Teil des historischen Effektkerns und kommen als eigene Verdrahtungsansicht.</text>
</svg>`}
const old=window.SchematicRenderer.render;window.SchematicRenderer.render=(key,x)=>key==='pedal:fuzz-face'?fuzzFace():old(key,x);
})();