(()=>{
'use strict';
const KEYS={favorites:'tf:favorites:v1',recent:'tf:recent:v1',inventory:'tf:inventory:v1',notes:'tf:notes:v1',settings:'tf:settings:v1'};
const read=(key,fallback)=>{try{const v=JSON.parse(localStorage.getItem(key));return v??fallback}catch{return fallback}};
const write=(key,value)=>{localStorage.setItem(key,JSON.stringify(value));window.dispatchEvent(new CustomEvent('tf:state',{detail:{key,value}}));return value};
const favorites=()=>read(KEYS.favorites,[]),isFavorite=key=>favorites().includes(key);
const toggleFavorite=key=>{const list=favorites(),next=list.includes(key)?list.filter(x=>x!==key):[key,...list];write(KEYS.favorites,next);return next.includes(key)};
const recent=()=>read(KEYS.recent,[]);
const remember=item=>{if(!item?.key)return;write(KEYS.recent,[{...item,seenAt:Date.now()},...recent().filter(x=>x.key!==item.key)].slice(0,10))};
const notes=()=>read(KEYS.notes,{}),getNote=key=>notes()[key]||'',setNote=(key,text)=>write(KEYS.notes,{...notes(),[key]:String(text||'')});
const inventory=()=>read(KEYS.inventory,{});
const setInventory=(id,qty)=>{const inv=inventory(),n=Math.max(0,Number(qty)||0);if(n)inv[id]=n;else delete inv[id];write(KEYS.inventory,inv);return n};
const settings=()=>read(KEYS.settings,{theme:'dark'}),patchSettings=patch=>write(KEYS.settings,{...settings(),...patch});
const projectProgress=()=>{let done=0,active=0,total=0,projects=0;for(const k of Object.keys(localStorage)){if(!k.startsWith('gbe-build-status-v3:'))continue;projects++;let state={};try{state=JSON.parse(localStorage.getItem(k)||'{}')}catch{}Object.values(state).forEach(v=>{total++;if(v==='done')done++;if(v==='active')active++})}return{done,active,total,projects}};
const exportWorkspace=()=>({version:2,app:'ToneForge Workshop Web',exportedAt:new Date().toISOString(),favorites:favorites(),recent:recent(),inventory:inventory(),notes:notes(),settings:settings(),buildStatus:Object.fromEntries(Object.keys(localStorage).filter(k=>k.startsWith('gbe-build-status-v3:')).map(k=>[k,localStorage.getItem(k)]))});
const importWorkspace=data=>{if(!data||typeof data!=='object')throw new Error('Ungültige Workspace-Datei');if(Array.isArray(data.favorites))write(KEYS.favorites,data.favorites);if(Array.isArray(data.recent))write(KEYS.recent,data.recent);if(data.inventory&&typeof data.inventory==='object')write(KEYS.inventory,data.inventory);if(data.notes&&typeof data.notes==='object')write(KEYS.notes,data.notes);if(data.settings&&typeof data.settings==='object')write(KEYS.settings,data.settings);if(data.buildStatus&&typeof data.buildStatus==='object')Object.entries(data.buildStatus).forEach(([k,v])=>{if(k.startsWith('gbe-build-status-v3:')&&typeof v==='string')localStorage.setItem(k,v)});return true};
const download=(name,text,type='application/json')=>{const blob=new Blob([text],{type}),url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download=name;document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),500)};
window.ToneForgeState={KEYS,read,write,favorites,isFavorite,toggleFavorite,recent,remember,getNote,setNote,inventory,setInventory,settings,patchSettings,exportWorkspace,importWorkspace,download,projectProgress};
})();
