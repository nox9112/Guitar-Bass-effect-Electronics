(()=>{
'use strict';
const D=window.ToneForgeDetail;if(!D)return;
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot',"'":'&#39;'}[c]));
const plans=window.GBE_SCHEMATIC_SOURCES?.[D.key]||[];
const boxes=document.querySelector('.boxes');if(!boxes)return;
const primary=boxes.querySelector('.box.full');if(!primary)return;
function planCard(p,i){
 const label=p.label||`Schaltplan ${i+1}`;
 const image=p.image||'';
 const source=p.source||image;
 return `<article class="source-plan-card"><div class="source-plan-head"><div><span class="source-plan-badge">ECHTER SCHALTPLAN</span><h4>${esc(label)}</h4><p>${esc(p.publisher||'Referenzquelle')} · ${esc(p.revision||'')}</p></div><div class="source-plan-actions">${source?`<a href="${esc(source)}" target="_blank" rel="noopener noreferrer">Quelle öffnen ↗</a>`:''}${image?`<a href="${esc(image)}" target="_blank" rel="noopener noreferrer">Originalbild ↗</a>`:''}</div></div>${image?`<a class="plan-stage" data-project="${esc(D.key)}" data-plan-index="${i}" href="${esc(image)}" target="_blank" rel="noopener noreferrer" aria-label="${esc(label)} in Originalgröße öffnen"><img src="${esc(image)}" alt="${esc(label)}" loading="eager" decoding="async"><svg class="plan-annotation-surface" viewBox="0 0 1000 1000" preserveAspectRatio="none" aria-hidden="true"></svg><span class="plan-open-hint">Antippen für Originalgröße</span><span class="plan-load-error" hidden>Bild konnte nicht eingebettet werden. Bitte Quelle oder Originalbild öffnen.</span></a>`:''}</article>`;
}
primary.classList.add('source-schematic-box');
primary.innerHTML=plans.length?`<div class="schematic-priority-head"><div><span class="ey">PRIORITÄT 1</span><h3>Schaltplan</h3></div><strong>${plans.length} geprüfte Referenz${plans.length===1?'':'en'}</strong></div><p class="schematic-definition">Hier stehen ausschließlich echte Schalt- oder Verdrahtungspläne. Keine Blockgrafik und keine automatisch nachgezeichnete Ersatzschaltung.</p><div class="source-plan-list">${plans.map(planCard).join('')}</div>`:`<div class="schematic-priority-head"><div><span class="ey">PRIORITÄT 1</span><h3>Schaltplan</h3></div><strong class="missing">FEHLT</strong></div><div class="schematic-missing"><b>Noch kein belastbarer Schaltplan hinterlegt.</b><p>Für dieses Projekt wird kein Blockschaltbild und keine Eigenzeichnung als Ersatz ausgegeben. Erst eine geprüfte Original-, Hersteller-, Service-, Open-Source-CAD- oder etablierte DIY-Referenz erhält diesen Platz.</p></div>`;
primary.querySelectorAll('.plan-stage img').forEach(img=>img.addEventListener('error',()=>{img.hidden=true;img.closest('.plan-stage')?.querySelector('.plan-load-error')?.removeAttribute('hidden')}));
const oldBlock=boxes.querySelector('.block-overview');if(oldBlock)oldBlock.remove();
const stages=String(D.data?.[3]||'').split('|').map(s=>s.trim()).filter(Boolean);
if(stages.length){
 const block=document.createElement('div');block.className='box full block-overview signal-flow-only';
 block.innerHTML=`<div class="schematic-priority-head"><div><span class="ey">ZUSATZGRAFIK</span><h3>Blockschaltbild / Signalfluss</h3></div><strong>ÜBERSICHT</strong></div><p class="block-definition">Nur zur Orientierung im Signalweg. Dieses Diagramm ersetzt ausdrücklich keinen elektrischen Schaltplan.</p><div class="signal-flow-blocks">${stages.map((s,i)=>`${i?'<span class="flow-arrow" aria-hidden="true">→</span>':''}<div class="flow-block">${esc(s)}</div>`).join('')}</div>`;
 primary.insertAdjacentElement('afterend',block);
}
const refBox=[...boxes.querySelectorAll('.box.full')].find(box=>box.querySelector('h3')?.textContent.trim()==='Datenstand / Referenzen');
if(refBox){
 const refs=plans.length?plans.map(p=>`<p><b>${esc(p.label||'Schaltplan')}</b><br>${esc(p.publisher||'Referenzquelle')} · ${esc(p.revision||'')} ${p.source?`· <a class="source" href="${esc(p.source)}" target="_blank" rel="noopener noreferrer">Quelle ↗</a>`:''}</p>`).join(''):'<p class="schem-warning"><b>Schaltplan-Status:</b> Für dieses Projekt fehlt noch eine geprüfte Referenz.</p>';
 refBox.innerHTML=`<h3>Datenstand / Referenzen</h3><p><b>Status:</b> ${plans.length?'Geprüfter Referenz-Schaltplan hinterlegt':'Schaltplan-Recherche offen'}</p>${refs}<p class="schem-warning">Hersteller-Pinouts, Polaritäten, Revisionen und Bauteilwerte vor dem Aufbau immer gegen die konkrete Quelle bzw. das Datenblatt prüfen. Bei Netzspannung und Röhrenverstärkern gelten zusätzliche Sicherheitsanforderungen.</p>`;
}
})();