(()=>{
'use strict';
const P=window.GBE_SCHEMATIC_SOURCES||(window.GBE_SCHEMATIC_SOURCES={});
const checked='2026-08-26';
const winding='https://www.stewmac.com/globalassets/video-and-ideas/online-resources/building-instruments/pickup-winding-with-the-schatten-pickup-winder/pickup-winding-with-the-schatten-pickup-winder';
P['pickup:strat-pickup']=[
 {label:'50s / early-60s Strat Single Coil · winding specification',standard:'WINDING',revision:'StewMac vintage Fender reference',image:'',source:winding,publisher:'Stewart-MacDonald',trust:'established-diy',review:'crosschecked',checked,note:'Concrete winding target: 7,900–8,350 turns, 42 AWG Formvar or plain enamel, Alnico 5, vintage orientation/polarity data and black-start/white-finish lead convention.'},
 {label:'Strat Single-Coil Kit · construction and lead wiring',standard:'CONSTRUCTION',revision:'StewMac single-coil kit',image:'',source:'https://www.stewmac.com/video-and-ideas/online-resources/learn-about-guitar-pickups-and-electronics-and-wiring/single-coil-pickup-kits/',publisher:'Stewart-MacDonald',trust:'established-diy',review:'crosschecked',checked,note:'Assembly source covers staggered polepieces, flatwork, eyelets, 42-AWG wire, winding technique, magnetizing, black start / white finish and optional modern RWRP middle pickup.'}
];
P['pickup:tele-bridge-pickup']=[
 {label:'50s Tele Bridge · winding specification',standard:'WINDING',revision:'StewMac 50s Tele Bridge reference',image:'',source:winding,publisher:'Stewart-MacDonald',trust:'established-diy',review:'crosschecked',checked,note:'Concrete winding target: 8,000–9,200 turns, 42 AWG plain enamel, Alnico 5, vintage winding/polarity reference, black start and white/yellow finish.'},
 {label:'Tele Bridge Pickup Kit · construction',standard:'CONSTRUCTION',revision:'StewMac Tele Bridge kit',image:'',source:'https://www.stewmac.com/kits-and-projects/electronic-kits/pickup-kits/pickup-kit-for-tele-bridge/',publisher:'Stewart-MacDonald',trust:'established-diy',review:'crosschecked',checked,note:'Construction source specifies fiber flatwork, staggered polepieces, copper-plated steel baseplate, lead wiring and 2.165-inch polepiece spread.'}
];
P['pickup:p90']=[
 {label:'Vintage P-90 · winding specification',standard:'WINDING',revision:'StewMac Gibson-style vintage reference',image:'',source:winding,publisher:'Stewart-MacDonald',trust:'established-diy',review:'crosschecked',checked,note:'Concrete winding target: 10,000 turns of 42 AWG plain enamel, counterclockwise winder reference, Alnico 5 and two bar magnets.'},
 {label:'P-90 Vintage-style Bobbin · assembly and wiring',standard:'CONSTRUCTION',revision:'StewMac vintage-style P-90',image:'',source:'https://www.stewmac.com/video-and-ideas/online-resources/learn-about-guitar-pickups-and-electronics-and-wiring/p-90-pickup-kit-with-vintage-style-bobbin/',publisher:'Stewart-MacDonald',trust:'established-diy',review:'crosschecked',checked,note:'Detailed assembly: 42-AWG winding, black start / red finish, 10,000 turns, baseplate, keeper/spacer, two magnets and braided-shield hookup.'}
];
P['pickup:paf']=[
 {label:'PAF-style Humbucker · winding specification',standard:'WINDING',revision:'StewMac PAF reference',image:'',source:winding,publisher:'Stewart-MacDonald',trust:'established-diy',review:'crosschecked',checked,note:'Concrete target: 5,000–5,050 turns per coil, 42 AWG plain enamel. Reference lists Alnico 2 with South toward adjustable coil and notes historical PAFs also varied among Alnico 2/3/5.'},
 {label:'Humbucker Pickup Kit · construction and series wiring',standard:'CONSTRUCTION',revision:'PAF-size StewMac kit',image:'',source:'https://www.stewmac.com/video-and-ideas/online-resources/learn-about-guitar-pickups-and-electronics-and-wiring/humbucker-pickup-kit/',publisher:'Stewart-MacDonald',trust:'established-diy',review:'crosschecked',checked,note:'Detailed two-bobbin construction source: 42 AWG, traditional 5,000 turns per coil, slug and screw bobbins, bar magnet, lead identification and four-conductor option.'}
];
P['pickup:p-bass']=[
 {label:'50s/60s Precision Bass · winding specification',standard:'WINDING',revision:'StewMac vintage Fender bass reference',image:'',source:winding,publisher:'Stewart-MacDonald',trust:'established-diy',review:'crosschecked',checked,note:'Concrete target: 10,000 turns of 42 AWG plain enamel per split coil. Two coils are reverse-wound/reverse-polarity for hum cancellation.'},
 {label:'Precision Bass Pickup Kit · construction and coil connection',standard:'CONSTRUCTION',revision:'StewMac P-Bass kit',image:'',source:'https://www.stewmac.com/video-and-ideas/online-resources/learn-about-guitar-pickups-and-electronics-and-wiring/parts-kit-for-precision-bass-pickups/',publisher:'Stewart-MacDonald',trust:'established-diy',review:'crosschecked',checked,note:'Detailed build instructions specify 42 AWG, approximately 10,000 turns per coil, opposite magnetic polarity, inter-coil series connection and about 10.5kΩ completed pair target.'}
];
P['pickup:j-bass']=[
 {label:'50s/60s Jazz Bass · winding specification',standard:'WINDING',revision:'StewMac vintage Fender bass reference',image:'',source:winding,publisher:'Stewart-MacDonald',trust:'established-diy',review:'crosschecked',checked,note:'Concrete target: about 9,500 turns of 42 AWG plain enamel for bridge and neck. Reference documents opposite winding/polarity so the pair hum-cancels when both are active.'},
 {label:'Jazz Bass Pickup Kit · construction',standard:'CONSTRUCTION',revision:'StewMac Jazz Bass kit',image:'',source:'https://www.stewmac.com/video-and-ideas/online-resources/learn-about-guitar-pickups-and-electronics-and-wiring/parts-kit-for-jazz-bass-pickups/',publisher:'Stewart-MacDonald',trust:'established-diy',review:'crosschecked',checked,note:'Detailed construction instructions identify bridge/neck flatwork, 42 AWG wire, approximately 9,500 turns, lead attachment, magnetization and RWRP set behavior.'}
];
const patch={
 'pickup:strat-pickup':['50s / Early-60s Strat Single Coil','7,900–8,350 turns · 42 AWG Formvar/plain enamel · Alnico 5 · vintage flatwork/polepieces'],
 'pickup:tele-bridge-pickup':['50s Tele Bridge Pickup','8,000–9,200 turns · 42 AWG plain enamel · Alnico 5 · copper-plated steel baseplate'],
 'pickup:p90':['Vintage P-90 · 10,000 turns','10,000 turns · 42 AWG plain enamel · two Alnico bar magnets · vintage-style bobbin'],
 'pickup:paf':['PAF-style Humbucker · 5,000 turns/coil','2 coils × 5,000–5,050 turns · 42 AWG plain enamel · Alnico 2/3/5 historical family'],
 'pickup:p-bass':['50s/60s Precision Bass Split Coil','2 coils × ~10,000 turns · 42 AWG · Alnico 5 · RWRP hum-cancelling'],
 'pickup:j-bass':['50s/60s Jazz Bass Set','~9,500 turns each · 42 AWG · Alnico 5 · RWRP pair']
};
for(const [key,[name,build]] of Object.entries(patch)){
 const row=window.GBE_DATA?.[key];if(row){row[0]=name;row[4]=build;row[7]='StewMac pickup winding specification plus matching construction/assembly instructions; winding, polarity and lead data crosschecked.';row[8]='Concrete vintage-style winding target';}
 const item=window.ToneForgeLibrary?.all?.find(x=>x.key===key);if(item){item.name=name;item.meta=build;}
}
})();
