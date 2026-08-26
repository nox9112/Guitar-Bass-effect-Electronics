(()=>{
'use strict';
const D=window.GBE_DATA||{};
const L=window.ToneForgeLibrary?.all||[];
const patch=(key,changes)=>{
 const row=D[key];
 if(row){for(const [i,v] of Object.entries(changes.row||{}))row[Number(i)]=v;}
 const item=L.find(x=>x.key===key);
 if(item&&changes.name)item.name=changes.name;
};

patch('pedal:fuzz-face',{row:{
 4:'2× AC128 PNP Germanium; R1 33k, R2 470R, R3 8.2k, R4 100k Feedback; C1 2.2µF, C2 20µF (22µF als moderner Normwert-Ersatz möglich), C3 10nF; Fuzz 1k lin; Volume 500k log; positive Masse',
 7:'ElectroSmash Fuzz Face Analyse; klassische Dallas-Arbiter PNP-Topologie gegengeprüft.',
 8:'PNP Germanium · positive Masse · AC128-Referenz'
}});

patch('pedal:tube-screamer',{name:'TS808 · True-Bypass-Effektkern',row:{
 0:'TS808 · True-Bypass-Effektkern',
 4:'JRC4558D; Q1/Q2 2SC1815 oder 2N5089; D1/D2 1N914/1N4148; R: 1k×4, 4.7k, 51k, 510k×2, 10k×7, 220R, 100R; C1 20nF (22nF moderner Ersatz), 47nF, 51pF, 220nF×2, 100nF, 1µF×2, 10µF, 47µF, 100µF; Drive 500k log; Tone 20k/22k; Level 100k',
 6:'Vref auf ca. 4.5 V prüfen. Diese ToneForge-Variante behandelt den Audio-/Clipping-/Tone-Kern mit True Bypass. Der historische TS808-Serviceplan besitzt dagegen JFET-Schaltlogik; beide Varianten nicht vermischen.',
 7:'ElectroSmash TS808-Analyse für den Effektkern; historische Ibanez/ToneHome-Serviceunterlage separat für Original-JFET-Bypass.',
 8:'TS808-Effektkern · True Bypass separat'
}});

patch('pedal:compressor',{name:'MXR Dyna Comp · CA3080',row:{
 0:'MXR Dyna Comp · CA3080',
 7:'ElectroSmash MXR Dyna Comp Analyse; CA3080-BOM und Topologie gegengeprüft.',
 8:'Vintage CA3080-Referenz'
}});

patch('pedal:phase90',{name:'MXR Phase 90 · Script Logo',row:{
 0:'MXR Phase 90 · Script Logo',
 6:'JFETs nach VGS(off)/Idss matchen und Bias sauber einstellen. GGG-Schaltplan und Politecnico-LTspice-CAD sind als echte technische Quellen hinterlegt; die genaue historische Script-Logo-Produktionsrevision ist noch nicht netzweise verifiziert. Noch nicht build-ready.',
 7:'General Guitar Gadgets P90-Schematic + Politecnico di Milano LTspice CAD. Netzweiser Revisionsabgleich noch offen.',
 8:'Script-Logo-Ziel · Revision noch offen'
}});

patch('pedal:pt2399',{row:{
 6:'Saubere 5 V und lokale Entkopplung direkt am IC. Pin 6 niemals direkt auf Masse kurzschließen. Der hinterlegte Synthrotek-v0.4-Plan ist eine konkrete NE5532/78L05-Variante; die ToneForge-BOM ist derzeit noch generischer und deshalb noch nicht build-ready.',
 7:'Synthrotek PT2399 Delay v0.4 als konkrete Schaltplanquelle; ToneForge-BOM muss noch 1:1 auf diese Revision eingefroren werden.',
 8:'Synthrotek v0.4 · BOM-Abgleich offen'
}});

patch('pedal:big-muff',{row:{
 6:'Nicht verschiedene Muff-Revisionen mischen. Für die V3-Familie existieren mehrere Produktionsuntervarianten. Vor dem Aufbau eine konkrete V3-Schaltung auswählen und danach BOM, Transistoren und Tonestack exakt darauf festlegen.',
 7:'Kit Rae Big Muff Circuit Guide + ElectroSmash American-V3-Analyse. Konkrete V3-Untervariante noch offen.',
 8:'American V3-Familie · Untervariante offen'
}});

patch('pedal:rangemaster',{row:{
 4:'Q1 Mullard OC44 oder selektierter PNP-Germanium; R1 470k, R2 68k, R3 3.9k; RV 10k log; C1 5nF, C2 10nF, C3/C4 47µF; 9 V positive Masse',
 6:'Germanium nach Leckstrom/hFE selektieren. Klassische Schaltung ist PNP/positive Masse; Pinout des tatsächlich verwendeten OC44/Alternativtyps vor dem Löten prüfen.',
 7:'ElectroSmash Dallas Rangemaster Analyse; Werte und positive-ground Topologie gegengeprüft.',
 8:'OC44 PNP · positive Masse · klassische Referenz'
}});

patch('pedal:tone-bender-mkii',{name:'Tone Bender Mark II Professional · PNP Germanium',row:{
 0:'Tone Bender Mark II Professional · PNP Germanium',
 4:'Q1–Q3 OC81D oder andere selektierte PNP-Germanium; R1 100k, R2 10k, R3 47k, R4 100k, R5 1k, R6 8.2k (optional 20k Bias-Trimmer), Attack R7 1k reverse-log, Volume R8 100k log, R9 1.5M Pulldown; C1 4.7µF, C2 100nF, C3 10nF, C4 4.7µF, C5 47µF, C6 10nF; positive Masse',
 6:'Diese Variante folgt der GGG-PNP-Germanium-Replica. Transistorselektion, Leckstrom und Bias bleiben kritisch. GGG ergänzt 1.5M-Pulldown, True Bypass und LED – daher nicht als unangetastetes historisches Original ausgeben.',
 7:'General Guitar Gadgets Tone Bender Mark II Professional PNP-Germanium-Schematic/BOM, 2012-02-09, gegengeprüft.',
 8:'GGG PNP-Germanium-Replica · positive Masse'
}});

patch('pedal:green-ringer',{row:{
 7:'General Guitar Gadgets Green Ringer Schematic/BOM; Q1/Q3, Q2, gematchte Dioden und R/C-Werte gegengeprüft.',
 8:'GGG Green Ringer Replica · 2012-01-10'
}});

patch('pedal:ea-tremolo',{row:{
 4:'Q1 2N3904; Q2/Q4 2N5457 oder J201; Q3 2N5088/2N5089; R: 1M×3, 560k, 150k, 47k, 180R, 1k×3, 120k, 15k×2, 2.2M, 10k, 68k; C: 220nF, 470nF×2, 22µF, 1µF×3, 47nF, 10µF; Volume 25k log, Depth 250k lin, Speed 100k reverse-log',
 7:'General Guitar Gadgets Improved EA Tremolo Schematic/BOM, 2007-11-13, gegengeprüft.',
 8:'Improved EA Tremolo · GGG 2007-11-13'
}});

patch('pedal:micro-amp',{name:'MXR Micro Amp · TL061',row:{
 0:'MXR Micro Amp · TL061',
 4:'U1 TL061; D1 1N4001; R1 22M, R2 10M, R3 1k, R4 56k, Gain R5 500k reverse-log, R6 2.7k, R7/R8 100k, R9 470R, R10 10k; C1 100nF, C2 47pF, C3 4.7µF, C4 1µF, C5 15µF',
 6:'4.5-V-Bias und Versorgung zuerst prüfen. Gain-Poti ist in der klassischen Referenz 500k reverse-log. TL061-Pinout und Elko-Polaritäten vor dem Aufbau kontrollieren.',
 7:'ElectroSmash MXR Micro Amp Analyse; TL061-Topologie und BOM gegengeprüft.',
 8:'Klassische M-133 TL061-Referenz'
}});
})();
