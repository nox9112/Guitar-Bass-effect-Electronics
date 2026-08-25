(()=>{
'use strict';
const S=window.SchematicRenderer;if(!S)return;const h=S.helpers;
const {comp,dot,ground,resistorH,resistorV,capH,capV,diodeH,opamp,transistorNPN,transistorPNP,potV,icBox}=h;
const wire=d=>`<path class="wire" d="${d}"/>`;
const title=(name,sub,warn='')=>`<rect width="1500" height="900" fill="#090d11"/><text class="title-text" x="45" y="42">${name}</text><text class="subtitle-text" x="45" y="70">${sub}</text>${warn?`<text class="warning-text" x="1455" y="42" text-anchor="end">${warn}</text>`:''}`;

S.register('pedal:fuzz-face',{
 variant:'Klassische PNP-Germanium-Ausführung · positive Masse · Effektkern',
 reference:'ElectroSmash Fuzz Face Analyse; klassische Dallas-Arbiter-Topologie. Eigene SVG-Neuzeichnung.',
 components:[
  {id:'J1',kind:'Klinkenbuchse',value:'Input'},{id:'C1',kind:'Kondensator',value:'2.2 µF electrolytic'},{id:'Q1',kind:'Transistor',value:'AC128 PNP germanium'},{id:'R1',kind:'Widerstand',value:'33 kΩ'},{id:'R4',kind:'Widerstand',value:'100 kΩ feedback'},{id:'Q2',kind:'Transistor',value:'AC128 PNP germanium'},{id:'R2',kind:'Widerstand',value:'470 Ω'},{id:'R3',kind:'Widerstand',value:'8.2 kΩ'},{id:'C3',kind:'Kondensator',value:'10 nF output'},{id:'VR1',kind:'Potentiometer',value:'1 kΩ linear FUZZ'},{id:'C2',kind:'Kondensator',value:'22 µF electrolytic'},{id:'VR2',kind:'Potentiometer',value:'500 kΩ audio VOLUME'},{id:'J2',kind:'Klinkenbuchse',value:'Output'},{id:'B1',kind:'Versorgung',value:'9 V battery · positive ground'}
 ],
 render:()=>`<svg class="true-schematic" viewBox="0 0 1400 820" data-schematic-kind="component" data-project="pedal:fuzz-face" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Fuzz Face PNP germanium component schematic">
 <rect width="1400" height="820" fill="#090d11"/><text class="title-text" x="45" y="42">Fuzz Face · PNP Germanium · positive ground</text><text class="subtitle-text" x="45" y="70">Klassischer Effektkern · AC128 · 9 V Batterie</text><text class="warning-text" x="1355" y="42" text-anchor="end">Positive Masse · isolierte Versorgung / Batterie</text>
 ${wire('M120 105H1260')}<text class="net-label" x="125" y="94">−9 V</text>
 ${comp('B1','x="1230" y="78" width="125" height="650" rx="20"',`${wire('M1290 105V190')}<path class="symbol" d="M1260 200h60M1274 221h32"/>${wire('M1290 221V680')}${ground(1290,680)}<text class="label" x="1320" y="201">B1</text><text class="value" x="1320" y="226">9 V</text><text class="value" x="1320" y="251">+ = GND</text>`)}
 ${comp('J1','x="35" y="300" width="105" height="125" rx="18"',`<circle class="symbol" cx="72" cy="350" r="18"/>${wire('M90 350H125')}<text class="label" x="48" y="315">J1</text><text class="value" x="43" y="409">INPUT</text>`)}
 ${comp('C1','x="120" y="285" width="150" height="135" rx="18"',capH(125,270,350,'C1','2.2 µF',true,true))}${wire('M270 350H342')}${dot(300,350)}
 ${comp('Q1','x="325" y="218" width="155" height="310" rx="24"',transistorPNP(390,350,'Q1','PNP AC128'))}${wire('M428 422V680')}${ground(428,680)}${wire('M428 278H535V300')}${dot(535,300)}
 ${comp('R1','x="470" y="102" width="145" height="220" rx="20"',resistorV(535,105,300,'R1','33 kΩ'))}${wire('M535 300H650V340H700')}
 ${comp('Q2','x="680" y="208" width="170" height="330" rx="24"',transistorPNP(750,340,'Q2','PNP AC128'))}${wire('M788 268H820')}${dot(820,268)}
 ${comp('R3','x="755" y="168" width="130" height="125" rx="18"',resistorV(820,180,268,'R3','8.2 kΩ'))}${wire('M820 180H930')}${dot(930,180)}
 ${comp('R2','x="870" y="100" width="125" height="105" rx="18"',resistorV(930,105,180,'R2','470 Ω'))}${wire('M930 180H985')}
 ${comp('C3','x="975" y="120" width="155" height="135" rx="18"',capH(985,1125,180,'C3','10 nF'))}${wire('M1125 180H1160V260')}
 ${comp('VR2','x="1080" y="240" width="165" height="315" rx="22"',potV(1160,260,520,'VR2','500 kΩ A',1240))}${wire('M1160 520V680')}${ground(1160,680)}${wire('M1240 390H1270')}
 ${comp('J2','x="1260" y="330" width="105" height="125" rx="18"',`<circle class="symbol" cx="1320" cy="390" r="18"/>${wire('M1270 390H1302')}<text class="label" x="1278" y="350">J2</text><text class="value" x="1275" y="445">OUTPUT</text>`)}
 ${wire('M788 412H850V470')}${dot(850,470)}${comp('VR1','x="785" y="455" width="180" height="250" rx="22"',potV(850,470,680,'VR1','1 kΩ B',955))}${ground(850,680)}${wire('M955 575H990')}
 ${comp('C2','x="925" y="505" width="165" height="205" rx="20"',capV(990,545,680,'C2','22 µF',true,true))}${ground(990,680)}${wire('M850 470H740V610H300V350')}
 ${comp('R4','x="430" y="545" width="250" height="125" rx="18"',resistorH(450,660,610,'R4','100 kΩ feedback'))}<text class="net-label" x="650" y="585" text-anchor="middle">Q2 emitter → Q1 base feedback</text><text class="subtitle-text" x="45" y="770">3PDT True-Bypass und LED werden separat verdrahtet.</text></svg>`
});

S.register('pedal:distortion-plus',{
 variant:'MXR Distortion+ Referenzschaltung · LM741 · Germanium-Hard-Clipping',
 reference:'ElectroSmash MXR Distortion+ Analyse; Werte gegen GGG DIST2 gegengeprüft. Eigene Neuzeichnung.',
 components:[
  {id:'J1',kind:'Klinkenbuchse',value:'Input'},{id:'R1',kind:'Widerstand',value:'10 kΩ input'},{id:'C1',kind:'Kondensator',value:'1 nF RF shunt'},{id:'C2',kind:'Kondensator',value:'10 nF input coupling'},{id:'R2',kind:'Widerstand',value:'1 MΩ bias to Vref'},{id:'U1',kind:'Operationsverstärker',value:'LM741 / UA741'},{id:'R4',kind:'Widerstand',value:'1 MΩ feedback'},{id:'R3',kind:'Widerstand',value:'4.7 kΩ minimum gain'},{id:'C3',kind:'Kondensator',value:'47 nF gain HPF'},{id:'VR1',kind:'Potentiometer',value:'1 MΩ DISTORTION'},{id:'C4',kind:'Kondensator',value:'1 µF output coupling'},{id:'R5',kind:'Widerstand',value:'10 kΩ clip current limit'},{id:'D1',kind:'Diode',value:'1N270 / 1N34A germanium'},{id:'D2',kind:'Diode',value:'1N270 / 1N34A germanium'},{id:'C5',kind:'Kondensator',value:'1 nF clip HF filter'},{id:'VR2',kind:'Potentiometer',value:'10 kΩ OUTPUT'},{id:'R6',kind:'Widerstand',value:'1 MΩ Vref upper'},{id:'R7',kind:'Widerstand',value:'1 MΩ Vref lower'},{id:'C6',kind:'Kondensator',value:'1 µF Vref decoupling'},{id:'J2',kind:'Klinkenbuchse',value:'Output'}
 ],
 render:()=>`<svg class="true-schematic" viewBox="0 0 1500 900" data-schematic-kind="component" data-project="pedal:distortion-plus" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="MXR Distortion Plus component schematic">${title('Distortion+ · LM741 · Germanium clipping','Komponenten-Schaltplan · klassische Referenzwerte')}
 <text class="net-label" x="80" y="112">+9 V</text>${wire('M80 125H1380')}
 ${comp('R6','x="1140" y="110" width="110" height="170" rx="15"',resistorV(1190,125,260,'R6','1 MΩ'))}${wire('M1190 260V330')}${dot(1190,295)}<text class="net-label" x="1210" y="302">VREF 4.5 V</text>
 ${comp('R7','x="1140" y="315" width="110" height="170" rx="15"',resistorV(1190,330,465,'R7','1 MΩ'))}${wire('M1190 465V740')}${ground(1190,740)}
 ${comp('C6','x="1240" y="285" width="150" height="215" rx="15"',capV(1320,310,465,'C6','1 µF',true,false))}${wire('M1320 310H1190M1320 465V740')}${ground(1320,740)}
 ${comp('J1','x="25" y="315" width="95" height="115" rx="15"',`<circle class="symbol" cx="65" cy="365" r="17"/>${wire('M82 365H130')}<text class="label" x="42" y="330">J1</text><text class="value" x="35" y="417">INPUT</text>`)}
 ${comp('R1','x="120" y="305" width="155" height="120" rx="15"',resistorH(130,260,365,'R1','10 kΩ'))}${wire('M260 365H310')}${dot(290,365)}
 ${comp('C1','x="245" y="410" width="115" height="190" rx="15"',capV(290,365,535,'C1','1 nF'))}${wire('M290 535V740')}${ground(290,740)}
 ${comp('C2','x="300" y="300" width="170" height="130" rx="15"',capH(310,460,365,'C2','10 nF'))}${wire('M460 365H530V455H595')}
 ${comp('R2','x="475" y="215" width="135" height="220" rx="15"',resistorV(530,260,365,'R2','1 MΩ'))}${wire('M530 260H1190')}
 ${comp('U1','x="570" y="330" width="210" height="245" rx="20"',opamp(675,455,'U1','LM741'))}${wire('M740 455H825')}
 ${comp('R4','x="590" y="190" width="310" height="120" rx="15"',resistorH(610,865,245,'R4','1 MΩ feedback'))}${wire('M610 245H600V420H620M865 245V455H825')}
 ${wire('M620 420H555V610H470')}${comp('R3','x="365" y="550" width="130" height="120" rx="15"',resistorH(375,470,610,'R3','4.7 kΩ'))}
 ${comp('VR1','x="185" y="525" width="190" height="190" rx="15"',potV(250,535,690,'VR1','1 MΩ DIST',340))}${wire('M340 612H375M250 690V740')}${ground(250,740)}
 ${comp('C3','x="430" y="650" width="180" height="150" rx="15"',capH(470,590,690,'C3','47 nF'))}${wire('M590 690V740')}${ground(590,740)}
 ${comp('C4','x="810" y="390" width="175" height="130" rx="15"',capH(825,970,455,'C4','1 µF',true,true))}
 ${comp('R5','x="960" y="395" width="160" height="120" rx="15"',resistorH(970,1110,455,'R5','10 kΩ'))}${wire('M1110 455H1230')}${dot(1165,455)}
 ${comp('D1','x="1090" y="500" width="150" height="115" rx="15"',diodeH(1110,1220,555,'D1','1N270'))}${wire('M1110 555V455M1220 555V650')}
 ${comp('D2','x="1090" y="605" width="150" height="115" rx="15"',`<g transform="rotate(180 1165 660)">${diodeH(1110,1220,660,'D2','1N270')}</g>`)}${wire('M1110 660V455M1220 660V740')}${ground(1220,740)}
 ${comp('C5','x="1240" y="500" width="125" height="220" rx="15"',capV(1300,455,650,'C5','1 nF'))}${wire('M1300 650V740')}${ground(1300,740)}
 ${comp('VR2','x="1320" y="385" width="145" height="300" rx="18"',potV(1375,455,680,'VR2','10 kΩ OUTPUT',1450))}${wire('M1375 680V740')}${ground(1375,740)}
 ${wire('M1230 455H1375M1450 568H1470')}${comp('J2','x="1435" y="515" width="60" height="110" rx="12"',`<circle class="symbol" cx="1475" cy="568" r="15"/><text class="value" x="1438" y="620">OUT</text>`)}
 <text class="subtitle-text" x="45" y="850">Hard-Clipping: D1/D2 antiparallel gegen Masse. C5 liegt am Clipping-Knoten und begrenzt sehr hohe Harmonische.</text></svg>`
});

S.register('pedal:rat',{
 variant:'RAT-Kern · LM308/OP07 · symmetrisches Hard-Clipping · Filter',
 reference:'ElectroSmash ProCo RAT Analyse; klassische Through-Hole-Werte. Eigene Neuzeichnung des Effektkerns.',
 components:[
  {id:'J1',kind:'Klinkenbuchse',value:'Input'},{id:'C1',kind:'Kondensator',value:'22 nF input'},{id:'R1',kind:'Widerstand',value:'1 MΩ input bias'},{id:'U1',kind:'Operationsverstärker',value:'LM308N / OP07'},{id:'C3',kind:'Kondensator',value:'30 pF compensation'},{id:'VR1',kind:'Potentiometer',value:'100 kΩ DISTORTION'},{id:'R4',kind:'Widerstand',value:'47 Ω gain leg'},{id:'C5',kind:'Kondensator',value:'2.2 µF gain HPF'},{id:'R5',kind:'Widerstand',value:'560 Ω gain leg'},{id:'C6',kind:'Kondensator',value:'4.7 µF gain HPF'},{id:'R3',kind:'Widerstand',value:'1 kΩ clip current'},{id:'D1',kind:'Diode',value:'1N914'},{id:'D2',kind:'Diode',value:'1N914'},{id:'C8',kind:'Kondensator',value:'3.3 nF filter cap'},{id:'VR2',kind:'Potentiometer',value:'100 kΩ FILTER'},{id:'Q1',kind:'JFET',value:'2N5458 output buffer'},{id:'C10',kind:'Kondensator',value:'1 µF output coupling'},{id:'VR3',kind:'Potentiometer',value:'100 kΩ VOLUME'},{id:'R11',kind:'Widerstand',value:'100 kΩ Vref upper'},{id:'R12',kind:'Widerstand',value:'100 kΩ Vref lower'},{id:'C11',kind:'Kondensator',value:'100 µF supply filter'},{id:'D3',kind:'Diode',value:'1N4002 polarity protection'},{id:'J2',kind:'Klinkenbuchse',value:'Output'}
 ],
 render:()=>`<svg class="true-schematic" viewBox="0 0 1500 900" data-schematic-kind="component" data-project="pedal:rat" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="RAT style distortion component schematic">${title('RAT · LM308 / OP07 · hard clip','Komponenten-Schaltplan · Effektkern','VREF = 4.5 V')}
 <text class="net-label" x="70" y="110">+9 V</text>${wire('M70 125H1410')}
 ${comp('D3','x="1160" y="80" width="150" height="110" rx="15"',diodeH(1170,1280,125,'D3','1N4002'))}${comp('C11','x="1300" y="115" width="130" height="230" rx="15"',capV(1360,125,315,'C11','100 µF',true,false))}${wire('M1360 315V760')}${ground(1360,760)}
 ${comp('R11','x="1050" y="150" width="120" height="170" rx="15"',resistorV(1100,125,270,'R11','100 kΩ'))}${wire('M1100 270V335')}${dot(1100,300)}<text class="net-label" x="1120" y="307">VREF</text>
 ${comp('R12','x="1050" y="325" width="120" height="170" rx="15"',resistorV(1100,335,480,'R12','100 kΩ'))}${wire('M1100 480V760')}${ground(1100,760)}
 ${comp('J1','x="25" y="305" width="90" height="110" rx="14"',`<circle class="symbol" cx="62" cy="355" r="16"/>${wire('M78 355H125')}<text class="value" x="32" y="405">INPUT</text>`)}${comp('C1','x="115" y="290" width="170" height="130" rx="15"',capH(125,275,355,'C1','22 nF'))}${wire('M275 355H370V445H505')}
 ${comp('R1','x="315" y="205" width="115" height="190" rx="15"',resistorV(370,270,355,'R1','1 MΩ'))}${wire('M370 270H1100')}
 ${comp('U1','x="480" y="315" width="220" height="250" rx="18"',opamp(590,445,'U1','LM308'))}${wire('M655 445H760')}
 ${comp('C3','x="525" y="205" width="160" height="115" rx="15"',capH(535,675,255,'C3','30 pF'))}<text class="value" x="565" y="292">LM308 compensation</text>
 ${wire('M535 255V385M675 255V445')}
 ${wire('M535 410H470V625H300')}${comp('VR1','x="150" y="535" width="200" height="210" rx="18"',potV(230,545,715,'VR1','100 kΩ DIST',335))}${wire('M335 630H470M230 715V760')}${ground(230,760)}
 ${comp('R4','x="355" y="565" width="150" height="115" rx="15"',resistorH(365,485,610,'R4','47 Ω'))}${comp('C5','x="480" y="545" width="160" height="130" rx="15"',capH(485,625,610,'C5','2.2 µF',true,true))}${wire('M625 610V760')}${ground(625,760)}
 ${comp('R5','x="355" y="675" width="150" height="110" rx="15"',resistorH(365,485,720,'R5','560 Ω'))}${comp('C6','x="480" y="655" width="160" height="130" rx="15"',capH(485,625,720,'C6','4.7 µF',true,true))}${wire('M625 720V760')}${ground(625,760)}
 ${comp('R3','x="745" y="385" width="150" height="120" rx="15"',resistorH(760,885,445,'R3','1 kΩ'))}${wire('M885 445H950')}${dot(925,445)}
 ${comp('D1','x="855" y="495" width="145" height="110" rx="15"',diodeH(865,985,550,'D1','1N914'))}${wire('M865 550V445M985 550V690')}
 ${comp('D2','x="855" y="600" width="145" height="110" rx="15"',`<g transform="rotate(180 925 655)">${diodeH(865,985,655,'D2','1N914')}</g>`)}${wire('M865 655V445M985 655V760')}${ground(985,760)}
 ${comp('C8','x="940" y="375" width="155" height="130" rx="15"',capH(950,1080,445,'C8','3.3 nF'))}${wire('M1080 445H1160')}
 ${comp('VR2','x="1110" y="415" width="150" height="300" rx="18"',potV(1160,445,700,'VR2','100 kΩ FILTER',1245))}${wire('M1160 700V760')}${ground(1160,760)}${wire('M1245 573H1280')}
 ${comp('Q1','x="1250" y="460" width="140" height="250" rx="18"',transistorNPN(1320,570,'Q1','2N5458 JFET'))}${wire('M1358 642V760')}${ground(1358,760)}
 ${wire('M1358 498V350H1395')}${comp('C10','x="1340" y="285" width="155" height="130" rx="15"',capH(1395,1480,350,'C10','1 µF',true,true))}
 ${comp('VR3','x="1370" y="440" width="120" height="270" rx="15"',potV(1450,455,690,'VR3','100 kΩ VOL',1490))}${wire('M1480 350H1450V455M1450 690V760')}${ground(1450,760)}
 ${comp('J2','x="1455" y="500" width="40" height="115" rx="10"',`<circle class="symbol" cx="1482" cy="570" r="13"/><text class="value" x="1458" y="612">OUT</text>`)}${wire('M1490 573H1469')}
 <text class="subtitle-text" x="45" y="850">Clipping-Dioden liegen antiparallel am Clipping-Knoten; FILTER arbeitet als nachgeschalteter Tiefpass. Detailwerte folgen der klassischen RAT-Through-Hole-Stückliste.</text></svg>`
});

S.register('pedal:tube-screamer',{
 variant:'TS808-artiger True-Bypass-Effektkern · JRC4558 · symmetrisches Soft-Clipping',
 reference:'ElectroSmash Tube Screamer Analyse; GGG ITS8 Schematic/BOM zur Werteprüfung. Eigene Neuzeichnung.',
 components:[
  {id:'J1',kind:'Klinkenbuchse',value:'Input'},{id:'C1',kind:'Kondensator',value:'22 nF input'},{id:'R1',kind:'Widerstand',value:'1 kΩ input'},{id:'Q1',kind:'Transistor',value:'2SC1815 / 2N5089 input buffer'},{id:'R2',kind:'Widerstand',value:'510 kΩ buffer bias'},{id:'R3',kind:'Widerstand',value:'10 kΩ buffer emitter'},{id:'C2',kind:'Kondensator',value:'1 µF BP coupling'},{id:'U1A',kind:'Operationsverstärker',value:'1/2 JRC4558 clipping amp'},{id:'R6',kind:'Widerstand',value:'4.7 kΩ gain HPF'},{id:'C3',kind:'Kondensator',value:'47 nF gain HPF'},{id:'R7',kind:'Widerstand',value:'51 kΩ feedback'},{id:'VR1',kind:'Potentiometer',value:'500 kΩ DRIVE log'},{id:'D1',kind:'Diode',value:'1N914 / 1N4148'},{id:'D2',kind:'Diode',value:'1N914 / 1N4148'},{id:'C4',kind:'Kondensator',value:'51 pF feedback'},{id:'U1B',kind:'Operationsverstärker',value:'1/2 JRC4558 tone amp'},{id:'VR2',kind:'Potentiometer',value:'20 kΩ TONE'},{id:'C5',kind:'Kondensator',value:'220 nF tone network'},{id:'R11',kind:'Widerstand',value:'220 Ω tone network'},{id:'C8',kind:'Kondensator',value:'1 µF BP output coupling'},{id:'VR3',kind:'Potentiometer',value:'100 kΩ LEVEL'},{id:'Q2',kind:'Transistor',value:'2SC1815 / 2N5089 output buffer'},{id:'R12',kind:'Widerstand',value:'510 kΩ output bias'},{id:'R14',kind:'Widerstand',value:'10 kΩ output emitter'},{id:'C11',kind:'Kondensator',value:'10 µF output'},{id:'R9',kind:'Widerstand',value:'10 kΩ Vref upper'},{id:'R10',kind:'Widerstand',value:'10 kΩ Vref lower'},{id:'C7',kind:'Kondensator',value:'47 µF Vref decoupling'},{id:'C12',kind:'Kondensator',value:'100 µF supply filter'},{id:'J2',kind:'Klinkenbuchse',value:'Output'}
 ],
 render:()=>`<svg class="true-schematic" viewBox="0 0 1700 980" data-schematic-kind="component" data-project="pedal:tube-screamer" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Tube Screamer style component schematic">${title('Tube Screamer · 4558 · soft clipping','TS808-artiger Effektkern · True-Bypass-Variante')}
 <text class="net-label" x="70" y="112">+9 V</text>${wire('M70 125H1620')}
 ${comp('R9','x="1400" y="130" width="120" height="180" rx="15"',resistorV(1450,125,280,'R9','10 kΩ'))}${wire('M1450 280V350')}${dot(1450,315)}<text class="net-label" x="1470" y="322">VREF ≈ 4.5 V</text>
 ${comp('R10','x="1400" y="340" width="120" height="180" rx="15"',resistorV(1450,350,505,'R10','10 kΩ'))}${wire('M1450 505V820')}${ground(1450,820)}
 ${comp('C7','x="1510" y="275" width="130" height="250" rx="15"',capV(1570,315,505,'C7','47 µF',true,false))}${wire('M1570 315H1450M1570 505V820')}${ground(1570,820)}
 ${comp('C12','x="1580" y="125" width="110" height="250" rx="15"',capV(1630,125,315,'C12','100 µF',true,false))}${wire('M1630 315V820')}${ground(1630,820)}
 ${comp('J1','x="20" y="330" width="90" height="110" rx="14"',`<circle class="symbol" cx="58" cy="380" r="16"/>${wire('M74 380H115')}<text class="value" x="28" y="430">INPUT</text>`)}${comp('C1','x="105" y="315" width="170" height="130" rx="15"',capH(115,265,380,'C1','22 nF'))}${comp('R1','x="255" y="320" width="150" height="120" rx="15"',resistorH(265,390,380,'R1','1 kΩ'))}${wire('M390 380H430')}
 ${comp('Q1','x="405" y="275" width="160" height="300" rx="18"',transistorNPN(485,390,'Q1','2SC1815'))}${wire('M523 318V125M523 462V600')}${comp('R3','x="465" y="575" width="120" height="190" rx="15"',resistorV(523,600,745,'R3','10 kΩ'))}${wire('M523 745V820')}${ground(523,820)}
 ${comp('R2','x="390" y="175" width="130" height="200" rx="15"',resistorV(445,210,340,'R2','510 kΩ'))}${wire('M445 210H1450M445 340V390')}
 ${comp('C2','x="535" y="355" width="170" height="130" rx="15"',capH(560,690,420,'C2','1 µF BP'))}${wire('M523 462V420H560M690 420H735V510H795')}
 ${comp('U1A','x="770" y="375" width="225" height="265" rx="18"',opamp(885,510,'U1A','JRC4558'))}${wire('M950 510H1060')}
 ${wire('M830 475H760V700H600')}${comp('R6','x="590" y="650" width="145" height="115" rx="15"',resistorH(600,720,700,'R6','4.7 kΩ'))}${comp('C3','x="710" y="635" width="170" height="130" rx="15"',capH(720,865,700,'C3','47 nF'))}${wire('M865 700V820')}${ground(865,820)}
 ${comp('R7','x="830" y="220" width="175" height="115" rx="15"',resistorH(840,990,275,'R7','51 kΩ'))}${wire('M840 275V475M990 275H1060V510')}
 ${comp('VR1','x="1020" y="195" width="190" height="205" rx="18"',potV(1090,205,365,'VR1','500 kΩ DRIVE',1180))}${wire('M1090 205H990M1090 365V510')}
 ${comp('D1','x="965" y="335" width="155" height="105" rx="15"',diodeH(975,1100,390,'D1','1N914'))}${wire('M975 390V475M1100 390V510')}
 ${comp('D2','x="1080" y="335" width="155" height="105" rx="15"',`<g transform="rotate(180 1150 390)">${diodeH(1090,1210,390,'D2','1N914')}</g>`)}${wire('M1090 390V475M1210 390V510')}
 ${comp('C4','x="1020" y="430" width="185" height="120" rx="15"',capH(1030,1190,475,'C4','51 pF'))}${wire('M1030 475H950M1190 475V510')}
 ${wire('M1060 510H1200V585H1245')}${comp('VR2','x="1160" y="530" width="170" height="285" rx="18"',potV(1210,555,770,'VR2','20 kΩ TONE',1300))}${wire('M1210 770V820')}${ground(1210,820)}
 ${comp('C5','x="1260" y="605" width="145" height="150" rx="15"',capH(1300,1405,670,'C5','220 nF'))}${wire('M1405 670H1450')}
 ${comp('R11','x="1340" y="700" width="145" height="115" rx="15"',resistorH(1350,1465,755,'R11','220 Ω'))}${wire('M1465 755V820')}${ground(1465,820)}
 ${comp('U1B','x="1220" y="330" width="230" height="230" rx="18"',opamp(1335,445,'U1B','JRC4558'))}${wire('M1400 445H1480')}${wire('M1280 410H1245V585M1280 480H1250V315H1450')}
 ${comp('C8','x="1460" y="380" width="175" height="130" rx="15"',capH(1480,1610,445,'C8','1 µF BP'))}${wire('M1610 445H1640')}
 ${comp('VR3','x="1535" y="500" width="150" height="290" rx="18"',potV(1600,510,760,'VR3','100 kΩ LEVEL',1680))}${wire('M1640 445V510H1600M1600 760V820')}${ground(1600,820)}
 ${comp('Q2','x="1430" y="545" width="150" height="255" rx="18"',transistorNPN(1500,660,'Q2','2SC1815'))}${wire('M1538 588V125M1538 732V820')}${comp('R14','x="1480" y="725" width="120" height="100" rx="12"',resistorV(1538,732,805,'R14','10 kΩ'))}
 ${comp('R12','x="1370" y="520" width="120" height="165" rx="14"',resistorV(1420,540,650,'R12','510 kΩ'))}${wire('M1420 540H1450M1420 650H1452')}
 ${comp('C11','x="1600" y="615" width="100" height="145" rx="12"',capH(1610,1685,680,'C11','10 µF',true,true))}${wire('M1538 732V680H1610')}
 ${comp('J2','x="1650" y="625" width="45" height="115" rx="10"',`<circle class="symbol" cx="1680" cy="680" r="13"/><text class="value" x="1650" y="735">OUT</text>`)}
 <text class="subtitle-text" x="45" y="910">Der historische elektronische FET-Bypass ist hier bewusst nicht enthalten; die App behandelt 3PDT-True-Bypass/LED als separate Verdrahtung. Audio-, Bias- und Clipping-Werte folgen der TS808-artigen ITS8-Referenz.</text></svg>`
});
})();