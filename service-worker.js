const CACHE_NAME='toneforge-workshop-v14-schematic-priority';
const APP_SHELL=['./','./index.html','./detail2.html','./styles.css','./schematic-v2.css','./schematic-priority.css','./app-icon.svg','./manifest.webmanifest','./app-state.js','./library-data.js','./home-v2.js','./pwa.js','./status-migration.js','./detail-data.js','./schematic-renderer.js','./pedal-schematics.js','./wiring-schematics.js','./schematic-sources.js','./detail-page-v2.js','./schematic-priority.js','./detail-enhancements.js','./schematic-standard.js','./schematic-marker.js','./schematic-viewer-v3.js'];
self.addEventListener('install',event=>event.waitUntil(caches.open(CACHE_NAME).then(cache=>cache.addAll(APP_SHELL)).then(()=>self.skipWaiting())));
self.addEventListener('activate',event=>event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(key=>key!==CACHE_NAME).map(key=>caches.delete(key)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',event=>{
 if(event.request.method!=='GET')return;const url=new URL(event.request.url);if(url.origin!==self.location.origin)return;
 if(event.request.mode==='navigate'){event.respondWith(fetch(event.request).then(response=>{const copy=response.clone();caches.open(CACHE_NAME).then(cache=>cache.put(event.request,copy));return response}).catch(()=>caches.match(url.pathname.endsWith('detail2.html')?'./detail2.html':'./index.html')));return}
 event.respondWith(caches.match(event.request).then(cached=>cached||fetch(event.request).then(response=>{if(response.ok)caches.open(CACHE_NAME).then(cache=>cache.put(event.request,response.clone()));return response})))
});
self.addEventListener('message',event=>{if(event.data==='SKIP_WAITING')self.skipWaiting()});