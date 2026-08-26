(()=>{
'use strict';
const P=window.GBE_SCHEMATIC_SOURCES||(window.GBE_SCHEMATIC_SOURCES={});
const checked='2026-08-26';
P['amp:5f1']=[{label:'Fender Champ 5F1 · Factory schematic/layout',standard:'ANSI',revision:'5F1',image:'',source:'https://el34world.com/charts/Schematics/Files/Fender/Fender_champ_5f1_schem.pdf',publisher:'Fender factory drawing mirror · EL34 World',trust:'service-copy',review:'source-found',checked,note:'Original 5F1 schematic/layout reference. HIGH VOLTAGE: mains, rectifier and B+ are lethal. ToneForge BOM, transformer voltages, fuse, earth and modern mains wiring must be checked separately before build-ready.'}];
P['amp:5e3']=[{label:'Fender Deluxe 5E3 · Factory schematic/layout',standard:'ANSI',revision:'5E3',image:'',source:'https://el34world.com/charts/Schematics/Files/Fender/Fender_deluxe_5e3_schem.pdf',publisher:'Fender factory drawing mirror · EL34 World',trust:'service-copy',review:'source-found',checked,note:'Original 5E3 reference. HIGH VOLTAGE: mains and B+ are lethal. Modern protective earth, fuse placement, transformer specification and capacitor voltage ratings must be audited before build-ready.'}];
P['amp:jcm800-2204']=[{label:'Marshall JCM800 Lead Series 2204 · 50 W',standard:'ANSI',revision:'2204 · May 1983 reference',image:'',source:'https://el34world.com/charts/Schematics/Files/Marshall/Marshall_jcm800_2204_lead_series.pdf',publisher:'Marshall reference redraw · Mark Huss / EL34 World',trust:'reference',review:'source-found',checked,note:'Complete 2204 signal path, bias and power supply reference. HIGH VOLTAGE and mains selector wiring are lethal. Regional mains/fuse/EL34 details and exact production revision must be fixed before build-ready.'}];
P['amp:ac15']=[{label:'Vox AC15 No.3 · OA/031',standard:'ANSI',revision:'Jennings 1960 · OA/031',image:'',source:'https://www.drtube.com/vox/',publisher:'Dr.Tube archive · Jennings/Vox schematic',trust:'service-copy',review:'source-found',checked,note:'Dr.Tube indexes the AC15 No.3 OA/031 factory-era schematic. HIGH VOLTAGE: choose this exact 1960 revision before freezing BOM; do not mix 1959, V-1-5, 1996 or modern AC15 revisions.'}];
P['amp:b15n']=[{label:'Ampeg B-15N · Technical schematic',standard:'ANSI',revision:'B-15N · vintage family',image:'',source:'https://ampeg.com/support/schematics.html',publisher:'Ampeg official Technical Schematics',trust:'manufacturer',review:'source-found',checked,note:'Official Ampeg support library contains B-15N documentation. HIGH VOLTAGE: B-15N/NA/NB/NC/NF revisions differ; ToneForge must select one exact revision before BOM is build-ready.'}];
P['amp:ruby']=[{label:'Runoffgroove Ruby · LM386 practice amp',standard:'ANSI',revision:'Ruby LM386 / MPF102',image:'',source:'https://beavisaudio.com/beavisboard/projects/bbp_Ruby.pdf',publisher:'Beavis Audio / Runoffgroove circuit reference',trust:'established-diy',review:'source-found',checked,note:'Concrete low-voltage Ruby build reference with MPF102 input buffer and LM386 power stage. BOM and current ToneForge description still need a 1:1 comparison before crosschecked status.'}];
P['amp:tda7294']=[{label:'ST TDA7294 · Datasheet application circuit',standard:'ANSI',revision:'TDA7294 Rev.8 datasheet',image:'',source:'https://www.st.com/resource/en/datasheet/tda7294.pdf',publisher:'STMicroelectronics',trust:'manufacturer',review:'source-found',checked,note:'Official datasheet includes application/test circuits, supply limits, mute/standby and thermal requirements. This is a high-power dual-rail amplifier: power supply, heatsink, speaker protection and mains PSU remain separate safety-critical design items.'}];
const names={
 'amp:5f1':'Fender Champ 5F1',
 'amp:5e3':'Fender Deluxe 5E3',
 'amp:jcm800-2204':'Marshall JCM800 2204 · 50 W',
 'amp:ac15':'Vox AC15 No.3 · OA/031',
 'amp:b15n':'Ampeg B-15N · Revision auswählen',
 'amp:ruby':'Runoffgroove Ruby · LM386',
 'amp:tda7294':'TDA7294 · ST Datasheet Application'
};
for(const [key,name] of Object.entries(names)){
 const row=window.GBE_DATA?.[key];if(row)row[0]=name;
 const item=window.ToneForgeLibrary?.all?.find(x=>x.key===key);if(item)item.name=name;
}
})();
