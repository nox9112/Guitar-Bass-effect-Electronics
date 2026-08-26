(()=>{
'use strict';
function collapse(img){
  if(!img||img.dataset.fallbackHandled)return;
  img.dataset.fallbackHandled='1';
  const thumb=img.closest('.project-thumb');
  if(thumb){
    const card=thumb.closest('.project-card'),link=thumb.closest('.project-link');
    thumb.remove();
    card?.classList.remove('has-thumb');card?.classList.add('no-thumb');
    link?.classList.remove('has-thumb');link?.classList.add('no-thumb');
    return;
  }
  const product=img.closest('.detail-product');
  if(product)product.remove();
}
function bind(img){
  if(img.dataset.fallbackBound)return;
  img.dataset.fallbackBound='1';
  img.addEventListener('error',()=>collapse(img),{once:true});
  if(img.complete&&img.naturalWidth===0)collapse(img);
}
function scan(root=document){root.querySelectorAll('.project-thumb img,.detail-product img').forEach(bind)}
scan();
new MutationObserver(records=>records.forEach(r=>r.addedNodes.forEach(n=>{if(n.nodeType!==1)return;if(n.matches?.('.project-thumb img,.detail-product img'))bind(n);scan(n)}))).observe(document.documentElement,{childList:true,subtree:true});
})();
