(()=>{
  'use strict';
  if(window.__schematicViewerV2)return;
  window.__schematicViewerV2=true;

  const clamp=(n,min,max)=>Math.min(max,Math.max(min,n));
  const qs=(s,r=document)=>r.querySelector(s);

  function init(){
    const preview=qs('.schem');
    if(!preview||!qs('svg',preview))return;

    const css=document.createElement('style');
    css.textContent=`
      .schem{overflow:hidden!important;cursor:zoom-in;position:relative;border-radius:14px;outline:none}
      .schem:focus-visible{box-shadow:0 0 0 3px #65d5aa55}
      .schem svg{min-width:0!important;width:100%!important;height:auto!important;aspect-ratio:1200/460;display:block;background:#0b1015}
      .schem:after{content:'Tippen für große Ansicht';position:absolute;right:10px;bottom:9px;background:#0a0e12e8;border:1px solid #2a3642;color:#65d5aa;padding:7px 10px;border-radius:9px;font:12px system-ui;pointer-events:none}
      .slb{position:fixed;inset:0;z-index:9999;display:none;background:#05080bf5;color:#f2f6f9;overscroll-behavior:contain}
      .slb.on{display:grid;grid-template-rows:auto auto 1fr}
      .slbbar{display:flex;align-items:center;gap:7px;padding:9px 10px;background:#0a0e12;border-bottom:1px solid #2a3642;min-height:62px}
      .slbtitle{min-width:0;margin-right:auto;line-height:1.2}
      .slbtitle b{display:block;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:40vw}
      .slbtitle small{display:block;color:#aab6c2;font-size:11px;margin-top:2px}
      .slbbar button{min-width:44px;height:44px;padding:0 10px;border:1px solid #2a3642;border-radius:10px;background:#18212b;color:#f2f6f9;font-size:18px;font-weight:700;touch-action:manipulation}
      .slbbar button:hover,.slbbar button:focus-visible{border-color:#65d5aa;outline:none}
      .slbbar .slbclose{font-size:24px}
      .slbzoom{min-width:58px;text-align:center;color:#65d5aa;font:700 12px system-ui;font-variant-numeric:tabular-nums}
      .slbhint{color:#aab6c2;font:12px system-ui;padding:7px 12px;background:#0d1218;border-bottom:1px solid #1c2730}
      .slbview{min-width:0;min-height:0;overflow:auto;padding:20px;touch-action:pan-x pan-y;cursor:grab;-webkit-overflow-scrolling:touch;overscroll-behavior:contain}
      .slbview.dragging{cursor:grabbing;user-select:none}
      .slbcanvas{position:relative;margin:0 auto;transform:none!important;max-width:none!important}
      .slbcanvas svg{display:block;width:100%!important;height:100%!important;min-width:0!important;max-width:none!important;background:#0b1015;border:1px solid #2a3642;border-radius:14px;box-shadow:0 18px 70px #0008}
      .slbcorner{position:fixed;right:12px;bottom:12px;z-index:10001;background:#0a0e12dd;border:1px solid #2a3642;border-radius:9px;padding:6px 8px;color:#aab6c2;font:11px system-ui;pointer-events:none}
      @media(max-width:760px){
        .schem:after{font-size:11px;padding:6px 8px}
        .slbbar{gap:5px;padding:7px;overflow-x:auto}
        .slbtitle{display:none}
        .slbbar button{min-width:44px;padding:0 8px}
        .slbzoom{min-width:50px}
        .slbhint{font-size:11px;padding:6px 9px}
        .slbview{padding:10px}
        .slbcorner{display:none}
      }
    `;
    document.head.appendChild(css);

    const overlay=document.createElement('div');
    overlay.className='slb';
    overlay.setAttribute('role','dialog');
    overlay.setAttribute('aria-modal','true');
    overlay.setAttribute('aria-label','Schaltplan große Ansicht');
    overlay.innerHTML=`
      <div class="slbbar">
        <div class="slbtitle"><b>Schaltplan – große Ansicht</b><small></small></div>
        <button type="button" data-act="out" aria-label="Verkleinern" title="Verkleinern (−)">−</button>
        <span class="slbzoom" aria-live="polite">100%</span>
        <button type="button" data-act="in" aria-label="Vergrößern" title="Vergrößern (+)">+</button>
        <button type="button" data-act="fit" aria-label="An Bildschirm anpassen" title="Einpassen (F)">Fit</button>
        <button type="button" data-act="reset" aria-label="Zoom auf 100 Prozent zurücksetzen" title="100% (0)">100%</button>
        <button type="button" class="slbclose" data-act="close" aria-label="Schließen" title="Schließen (Esc)">×</button>
      </div>
      <div class="slbhint">Zoomen: +/− · Einpassen: Fit · Verschieben: Finger/Scrollen · Doppeltippen: Fit ↔ 100%</div>
      <div class="slbview"><div class="slbcanvas"></div></div>
      <div class="slbcorner">Esc = schließen · F = einpassen · 0 = 100%</div>`;
    document.body.appendChild(overlay);

    const view=qs('.slbview',overlay);
    const canvas=qs('.slbcanvas',overlay);
    const zoomLabel=qs('.slbzoom',overlay);
    const titleSmall=qs('.slbtitle small',overlay);
    const closeButton=qs('[data-act="close"]',overlay);
    let sourceSvg=null,cloneSvg=null;
    let scale=1,baseW=1200,baseH=460;
    let priorBodyOverflow='',priorFocus=null;
    let drag=null,lastTap=0;

    function readBaseSize(svg){
      const vb=svg.viewBox&&svg.viewBox.baseVal;
      if(vb&&vb.width&&vb.height){baseW=vb.width;baseH=vb.height;return;}
      baseW=Number(svg.getAttribute('width'))||1200;
      baseH=Number(svg.getAttribute('height'))||460;
    }
    function renderSize(){
      const w=Math.max(260,Math.round(baseW*scale));
      const h=Math.max(120,Math.round(baseH*scale));
      canvas.style.width=w+'px';
      canvas.style.height=h+'px';
      if(cloneSvg){cloneSvg.setAttribute('width',String(w));cloneSvg.setAttribute('height',String(h));}
      zoomLabel.textContent=Math.round(scale*100)+'%';
    }
    function fitScale(){
      const vw=Math.max(260,view.clientWidth-2);
      const vh=Math.max(140,view.clientHeight-2);
      return clamp(Math.min(vw/baseW,vh/baseH),0.2,2.5);
    }
    function setScale(next,anchor){
      const old=scale;
      const beforeX=anchor?view.scrollLeft+anchor.x:(view.scrollLeft+view.clientWidth/2);
      const beforeY=anchor?view.scrollTop+anchor.y:(view.scrollTop+view.clientHeight/2);
      const ratioX=beforeX/(baseW*old||1),ratioY=beforeY/(baseH*old||1);
      scale=clamp(next,0.2,4);
      renderSize();
      requestAnimationFrame(()=>{
        const ax=anchor?anchor.x:view.clientWidth/2,ay=anchor?anchor.y:view.clientHeight/2;
        view.scrollLeft=Math.max(0,ratioX*baseW*scale-ax);
        view.scrollTop=Math.max(0,ratioY*baseH*scale-ay);
      });
    }
    function fit(){setScale(fitScale());requestAnimationFrame(()=>{view.scrollLeft=0;view.scrollTop=0;});}
    function reset(){setScale(1);requestAnimationFrame(()=>{view.scrollLeft=Math.max(0,(baseW-view.clientWidth)/2);view.scrollTop=Math.max(0,(baseH-view.clientHeight)/2);});}
    function open(){
      sourceSvg=qs('svg',preview);if(!sourceSvg)return;
      priorFocus=document.activeElement;priorBodyOverflow=document.body.style.overflow;
      cloneSvg=sourceSvg.cloneNode(true);cloneSvg.removeAttribute('style');
      cloneSvg.setAttribute('aria-label',(sourceSvg.getAttribute('aria-label')||'Schaltplan')+' – große Ansicht');
      canvas.replaceChildren(cloneSvg);readBaseSize(cloneSvg);
      const h1=qs('h1');titleSmall.textContent=h1?h1.textContent:'';
      overlay.classList.add('on');document.body.style.overflow='hidden';
      requestAnimationFrame(()=>{fit();closeButton.focus({preventScroll:true});});
    }
    function close(){
      if(!overlay.classList.contains('on'))return;
      overlay.classList.remove('on');document.body.style.overflow=priorBodyOverflow;
      canvas.replaceChildren();cloneSvg=null;drag=null;
      if(priorFocus&&typeof priorFocus.focus==='function')priorFocus.focus({preventScroll:true});
    }
    function isOpen(){return overlay.classList.contains('on');}

    preview.setAttribute('role','button');preview.setAttribute('tabindex','0');preview.setAttribute('aria-label','Schaltplan vergrößern');
    preview.addEventListener('click',open);
    preview.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();open();}});

    overlay.addEventListener('click',e=>{
      const act=e.target&&e.target.dataset&&e.target.dataset.act;
      if(act==='close')close();
      else if(act==='in')setScale(scale*1.2);
      else if(act==='out')setScale(scale/1.2);
      else if(act==='fit')fit();
      else if(act==='reset')reset();
    });

    view.addEventListener('wheel',e=>{
      if(!isOpen()||!(e.ctrlKey||e.metaKey))return;
      e.preventDefault();
      const r=view.getBoundingClientRect();
      setScale(scale*(e.deltaY<0?1.12:1/1.12),{x:e.clientX-r.left,y:e.clientY-r.top});
    },{passive:false});

    view.addEventListener('pointerdown',e=>{
      if(e.pointerType==='mouse'&&e.button===0){
        drag={x:e.clientX,y:e.clientY,left:view.scrollLeft,top:view.scrollTop,id:e.pointerId};
        view.setPointerCapture(e.pointerId);view.classList.add('dragging');
      }
    });
    view.addEventListener('pointermove',e=>{
      if(!drag||drag.id!==e.pointerId)return;
      view.scrollLeft=drag.left-(e.clientX-drag.x);view.scrollTop=drag.top-(e.clientY-drag.y);
    });
    const endDrag=e=>{if(drag&&(!e||drag.id===e.pointerId)){drag=null;view.classList.remove('dragging');}};
    view.addEventListener('pointerup',endDrag);view.addEventListener('pointercancel',endDrag);

    view.addEventListener('click',e=>{
      const now=Date.now();
      if(e.pointerType==='touch'||matchMedia('(pointer:coarse)').matches){
        if(now-lastTap<330){const r=view.getBoundingClientRect();const fs=fitScale();setScale(Math.abs(scale-fs)<0.05?1:fs,{x:e.clientX-r.left,y:e.clientY-r.top});lastTap=0;}
        else lastTap=now;
      }
    });

    document.addEventListener('keydown',e=>{
      if(!isOpen())return;
      if(e.key==='Escape'){e.preventDefault();close();}
      else if(e.key==='+'||e.key==='='){e.preventDefault();setScale(scale*1.2);}
      else if(e.key==='-'){e.preventDefault();setScale(scale/1.2);}
      else if(e.key==='0'){e.preventDefault();reset();}
      else if(e.key.toLowerCase()==='f'){e.preventDefault();fit();}
      else if(e.key==='Tab'){
        const focusables=[...overlay.querySelectorAll('button:not([disabled])')];
        if(!focusables.length)return;
        const i=focusables.indexOf(document.activeElement);
        if(e.shiftKey&&i===0){e.preventDefault();focusables.at(-1).focus();}
        else if(!e.shiftKey&&i===focusables.length-1){e.preventDefault();focusables[0].focus();}
      }
    });

    let resizeTimer;
    addEventListener('resize',()=>{if(!isOpen())return;clearTimeout(resizeTimer);resizeTimer=setTimeout(fit,120);});

    window.__schematicViewer={open,close,fit,reset,getScale:()=>scale,isOpen};
  }

  document.readyState==='loading'?document.addEventListener('DOMContentLoaded',init,{once:true}):init();
})();