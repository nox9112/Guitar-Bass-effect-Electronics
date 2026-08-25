(()=>{
  'use strict';
  const STORAGE='gbe-schematic-standard',schematic=document.querySelector('.true-schematic');if(!schematic)return;
  const box=schematic.closest('.box'),heading=box?.querySelector('h3');if(!box||!heading)return;
  const toolbar=document.createElement('div');toolbar.className='standard-switch';toolbar.setAttribute('role','group');toolbar.setAttribute('aria-label','Schaltzeichen-Norm');toolbar.innerHTML='<span>Schaltzeichen</span><button type="button" data-standard="ansi">US · ANSI</button><button type="button" data-standard="iec">EU · IEC</button>';
  heading.insertAdjacentElement('afterend',toolbar);
  const apply=standard=>{const value=standard==='iec'?'iec':'ansi';document.documentElement.dataset.schematicStandard=value;localStorage.setItem(STORAGE,value);toolbar.querySelectorAll('button').forEach(button=>{const active=button.dataset.standard===value;button.classList.toggle('active',active);button.setAttribute('aria-pressed',String(active))})};
  toolbar.addEventListener('click',event=>{const standard=event.target.closest('[data-standard]')?.dataset.standard;if(standard)apply(standard)});apply(localStorage.getItem(STORAGE)||'ansi');
})();
