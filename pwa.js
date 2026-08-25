(()=>{
'use strict';
const root=document.documentElement,status=document.createElement('div');status.className='connection-status';status.setAttribute('role','status');status.setAttribute('aria-live','polite');document.body.append(status);
const updateConnection=()=>{const offline=!navigator.onLine;root.classList.toggle('is-offline',offline);status.textContent=offline?'Offline – Bibliothek und Fortschritt bleiben verfügbar':'Wieder online';status.classList.toggle('show',offline);if(!offline){status.classList.add('online');setTimeout(()=>status.classList.remove('show','online'),1800)}};
addEventListener('online',updateConnection);addEventListener('offline',updateConnection);updateConnection();
let installPrompt=null;const buttons=[...document.querySelectorAll('[data-install-app]')];
const showInstall=show=>buttons.forEach(b=>b.hidden=!show);
addEventListener('beforeinstallprompt',event=>{event.preventDefault();installPrompt=event;showInstall(true)});
buttons.forEach(button=>button.addEventListener('click',async()=>{if(!installPrompt)return;installPrompt.prompt();await installPrompt.userChoice;installPrompt=null;showInstall(false)}));
addEventListener('appinstalled',()=>{installPrompt=null;showInstall(false)});
if(!('serviceWorker' in navigator))return;
addEventListener('load',()=>navigator.serviceWorker.register('./service-worker.js').then(reg=>{reg.addEventListener('updatefound',()=>{const worker=reg.installing;worker?.addEventListener('statechange',()=>{if(worker.state==='installed'&&navigator.serviceWorker.controller&&!document.querySelector('.update-notice')){const notice=document.createElement('button');notice.className='update-notice';notice.textContent='Neue ToneForge-Version laden';notice.addEventListener('click',()=>{worker.postMessage('SKIP_WAITING');location.reload()});document.body.append(notice)}})});}).catch(()=>{}));
})();
