(()=>{
'use strict';
const detail=window.ToneForgeDetail;
if(!detail)return;

const overlay=document.createElement('div');
overlay.className='schematic-modal';
overlay.hidden=true;
overlay.innerHTML=`<div class="schematic-modal-backdrop" data-schematic-close></div><section class="schematic-modal-panel" role="dialog" aria-modal="true" aria-label="Schaltplan vergrößert"><header><strong data-schematic-title>Schaltplan</strong><button type="button" data-schematic-close aria-label="Schaltplan schließen">×</button></header><div class="schematic-modal-canvas"><img data-schematic-image alt="Schaltplan vergrößert"></div></section>`;
document.body.appendChild(overlay);
const modalImg=overlay.querySelector('[data-schematic-image]');
const modalTitle=overlay.querySelector('[data-schematic-title]');
let lastFocus=null;

function openModal(anchor){
 const img=anchor.querySelector('img');
 if(!img||img.hidden)return;
 lastFocus=anchor;
 modalImg.src=img.currentSrc||img.src;
 modalImg.alt=img.alt||'Schaltplan vergrößert';
 modalTitle.textContent=img.alt||'Schaltplan';
 overlay.hidden=false;
 document.documentElement.classList.add('schematic-modal-open');
 overlay.querySelector('button[data-schematic-close]')?.focus();
}
function closeModal(){
 if(overlay.hidden)return;
 overlay.hidden=true;
 modalImg.removeAttribute('src');
 document.documentElement.classList.remove('schematic-modal-open');
 lastFocus?.focus?.();
 lastFocus=null;
}

document.querySelectorAll('.plan-stage').forEach(stage=>{
 const card=stage.closest('.source-plan-card');
 const stageUrl=stage.href;
 card?.querySelectorAll('.source-plan-actions a').forEach(a=>{
  if(a.href===stageUrl && /Originalgröße/i.test(a.textContent||''))a.remove();
 });
});

document.addEventListener('click',e=>{
 const stage=e.target.closest('.plan-stage');
 if(stage){e.preventDefault();openModal(stage);return;}
 if(e.target.closest('[data-schematic-close]'))closeModal();
});
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeModal();});

const cards=[...document.querySelectorAll('.source-plan-card')];
(detail.plans||[]).forEach((plan,i)=>{
 if(!plan?.cad||!cards[i])return;
 const actions=cards[i].querySelector('.source-plan-actions');
 if(!actions)return;
 const a=document.createElement('a');
 a.href=plan.cad;
 a.target='_blank';
 a.rel='noopener noreferrer';
 a.textContent='CAD öffnen ↗';
 actions.prepend(a);
});
})();
