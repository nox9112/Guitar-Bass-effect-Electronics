(()=>{
'use strict';
function init(){
 const preview=document.querySelector('.schem');if(!preview)return;
 const overlay=document.createElement('div');overlay.className='slb';overlay.innerHTML=`<div class="slbbar"><b>Schaltplan – große Ansicht</b><button data-act="fit" title="Einpassen">Fit</button><button data-act="reset" title="100 Prozent">100</button><span class="slbzoom">100%</span><button data-act="out" aria-label="Verkleinern">−</button><button data-act="in" aria-label="Vergrößern">+</button><button data-act="close" aria-label="Schließen">×</button></div><div class="slbview"><div class="slbcanvas"></div></div><div class="slbstatus"><b data-viewer-selected>Bauteil auswählen</b><button data-status="open">Offen</button><button data-status="active">In Arbeit</button><button data-status="done">Fertig</button></div>`;document.body.appendChild(overlay);
 const view=overlay.querySelector('.slbview'),canvas=overlay.querySelector('.slbcanvas'),zoomLabel=overlay.querySelector('.slbzoom'),statusbar=overlay.querySelector('.slbstatus'),selectedText=overlay.querySelector('[data-viewer-selected]');
 let zoom=1,baseW=1200,baseH=500,lastFocus=null,drag=null;
 function sourceSVG(){return preview.querySelector('svg')}
 function syncCloneStatus(){
  const tracker=window.SchematicRenderer;if(!tracker)return;
  const selected=tracker.getSelected?.();
  canvas.querySelectorAll('[data-component]').forEach(el=>{const id=el.dataset.component;el.dataset.status=tracker.statusOf?.(id)||'open';el.dataset.selected=String(id===selected)});
 }
 function applyZoom(center=true){const svg=canvas.querySelector('svg');if(!svg)return;const oldW=svg.getBoundingClientRect().width,oldH=svg.getBoundingClientRect().height;const cx=view.scrollLeft+view.clientWidth/2,cy=view.scrollTop+view.clientHeight/2,rx=oldW?cx/oldW:.5,ry=oldH?cy/oldH:.5;svg.style.width=`${Math.max(240,baseW*zoom)}px`;svg.style.height=`${Math.max(120,baseH*zoom)}px`;zoomLabel.textContent=`${Math.round(zoom*100)}%`;if(center)requestAnimationFrame(()=>{const nw=svg.getBoundingClientRect().width,nh=svg.getBoundingClientRect().height;view.scrollLeft=Math.max(0,rx*nw-view.clientWidth/2);view.scrollTop=Math.max(0,ry*nh-view.clientHeight/2)})}
 function fit(){const pad=26;zoom=Math.min((view.clientWidth-pad)/baseW,(view.clientHeight-pad)/baseH,1);zoom=Math.max(.18,zoom);applyZoom(false);requestAnimationFrame(()=>{view.scrollLeft=Math.max(0,(view.scrollWidth-view.clientWidth)/2);view.scrollTop=Math.max(0,(view.scrollHeight-view.clientHeight)/2)})}
 function open(){const src=sourceSVG();if(!src)return;lastFocus=document.activeElement;canvas.innerHTML=src.outerHTML;const vb=(src.getAttribute('viewBox')||'0 0 1200 500').trim().split(/\s+/).map(Number);baseW=vb[2]||1200;baseH=vb[3]||500;overlay.classList.add('on');document.body.style.overflow='hidden';requestAnimationFrame(()=>{fit();syncCloneStatus()})}
 function close(){overlay.classList.remove('on');document.body.style.overflow='';statusbar.classList.remove('on');if(lastFocus?.focus)lastFocus.focus()}
 function selectInViewer(id){const tracker=window.SchematicRenderer;if(!tracker)return;tracker.select(id);const m=tracker.meta[id];selectedText.textContent=m?`${id} · ${m.kind} · ${m.value}`:id;statusbar.classList.add('on');syncCloneStatus()}
 preview.setAttribute('role','button');preview.setAttribute('tabindex','0');preview.setAttribute('aria-label','Schaltplan vergrößern');preview.addEventListener('click',open);preview.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();open()}});
 overlay.addEventListener('click',e=>{
  const act=e.target.closest('[data-act]')?.dataset.act;if(act){if(act==='close')close();if(act==='fit')fit();if(act==='reset'){zoom=1;applyZoom()}if(act==='in'){zoom=Math.min(3.5,zoom+.2);applyZoom()}if(act==='out'){zoom=Math.max(.18,zoom-.2);applyZoom()}return}
  const st=e.target.closest('[data-status]')?.dataset.status;if(st&&window.SchematicRenderer){const id=window.SchematicRenderer.getSelected();if(id)window.SchematicRenderer.setStatus(id,st);syncCloneStatus();return}
  const cmp=e.target.closest('[data-component]');if(cmp){selectInViewer(cmp.dataset.component);return}
 });
 document.addEventListener('gbe:tracker-refresh',()=>{const tracker=window.SchematicRenderer,id=tracker?.getSelected();if(id){const m=tracker.meta[id];selectedText.textContent=m?`${id} · ${m.kind} · ${m.value}`:id;statusbar.classList.add('on')}syncCloneStatus()});
 window.addEventListener('keydown',e=>{if(!overlay.classList.contains('on'))return;if(e.key==='Escape'){e.preventDefault();close()}else if(e.key==='+'||e.key==='='){e.preventDefault();zoom=Math.min(3.5,zoom+.2);applyZoom()}else if(e.key==='-'){e.preventDefault();zoom=Math.max(.18,zoom-.2);applyZoom()}else if(e.key==='0'){e.preventDefault();zoom=1;applyZoom()}else if(e.key.toLowerCase()==='f'){e.preventDefault();fit()}});
 view.addEventListener('pointerdown',e=>{if(e.target.closest('[data-component]'))return;drag={x:e.clientX,y:e.clientY,sl:view.scrollLeft,st:view.scrollTop};view.setPointerCapture?.(e.pointerId)});view.addEventListener('pointermove',e=>{if(!drag)return;view.scrollLeft=drag.sl-(e.clientX-drag.x);view.scrollTop=drag.st-(e.clientY-drag.y)});function stopDrag(){drag=null}view.addEventListener('pointerup',stopDrag);view.addEventListener('pointercancel',stopDrag);
 let tap=0;view.addEventListener('pointerup',e=>{if(e.target.closest('[data-component]'))return;const now=Date.now();if(now-tap<330){fit();tap=0}else tap=now});
 window.addEventListener('resize',()=>{if(overlay.classList.contains('on'))fit()});
}
document.readyState==='loading'?document.addEventListener('DOMContentLoaded',init):init();
})();