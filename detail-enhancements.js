(()=>{
'use strict';
const D=window.ToneForgeDetail,S=window.ToneForgeState;if(!D||!S)return;
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const toast=msg=>{const el=$('[data-toast]');if(!el)return;el.textContent=msg;el.classList.add('show');clearTimeout(toast.t);toast.t=setTimeout(()=>el.classList.remove('show'),1800)};
const note=$('[data-project-note]');if(note){note.value=S.getNote(D.key);let timer;note.addEventListener('input',()=>{clearTimeout(timer);timer=setTimeout(()=>S.setNote(D.key,note.value),180)});note.addEventListener('change',()=>S.setNote(D.key,note.value))}
S.remember({key:D.key,name:D.data[0],type:D.type,id:D.id,kind:D.data[1]});
const favButtons=$$('[data-detail-favorite]');function syncFav(){const on=S.isFavorite(D.key);favButtons.forEach(b=>{b.classList.toggle('active',on);const span=b.querySelector('span');if(span)span.textContent=on?'Favorit gespeichert':'Favorit'})}syncFav();
function exportBom(){const rows=$$('.bom tbody tr').map(r=>[r.cells[0]?.textContent.trim()||'']),csv=[['Project',D.data[0]],[],['Bauteil'],...rows].map(row=>row.map(v=>`"${String(v??'').replace(/"/g,'""')}"`).join(';')).join('\r\n');S.download(`${D.id||'projekt'}-bom.csv`,csv,'text/csv;charset=utf-8');toast('BOM exportiert')}
function toggleTheme(){const next=S.settings().theme==='light'?'dark':'light';S.patchSettings({theme:next});document.documentElement.dataset.theme=next}
document.documentElement.dataset.theme=S.settings().theme||'dark';
document.addEventListener('click',e=>{if(e.target.closest('[data-detail-favorite]')){const on=S.toggleFavorite(D.key);syncFav();toast(on?'Favorit gespeichert':'Favorit entfernt')}if(e.target.closest('[data-export-bom]'))exportBom();if(e.target.closest('[data-theme-toggle]'))toggleTheme()});
})();
