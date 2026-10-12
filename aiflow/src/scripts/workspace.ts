const favoriteKey='platform-favorites';
function readList(key:string):string[]{try{const value=JSON.parse(localStorage.getItem(key)||'[]');return Array.isArray(value)?value.filter((x:unknown)=>typeof x==='string'):[];}catch{return [];}}
const favorites=new Set(readList(favoriteKey));
const feedback=document.querySelector<HTMLElement>('[data-local-feedback]');
let timer:ReturnType<typeof setTimeout>;
function notify(message:string){if(!feedback)return;feedback.textContent=message;clearTimeout(timer);timer=setTimeout(()=>{feedback.textContent='';},2800);}
function sync(){document.querySelectorAll<HTMLButtonElement>('[data-favorite]').forEach(button=>{const selected=favorites.has(button.dataset.favorite!);button.setAttribute('aria-pressed',String(selected));const label=button.querySelector('[data-favorite-label]');if(label)label.textContent=selected?'已收藏':'收藏';else button.textContent=selected?'已收藏':'收藏应用';button.setAttribute('aria-label',(selected?'取消收藏':'收藏')+(button.closest('[data-app-card]')?.querySelector('h2')?.textContent||'应用'));});}
sync();
document.querySelectorAll<HTMLButtonElement>('[data-favorite]').forEach(button=>button.addEventListener('click',()=>{const id=button.dataset.favorite!;const selected=favorites.has(id);selected?favorites.delete(id):favorites.add(id);try{localStorage.setItem(favoriteKey,JSON.stringify([...favorites]));sync();document.dispatchEvent(new Event('favorites-updated'));notify(selected?'已取消收藏':'已收藏到当前浏览器');}catch{selected?favorites.add(id):favorites.delete(id);notify('浏览器不允许保存收藏');}}));
document.querySelectorAll<HTMLAnchorElement>('[data-record-recent]').forEach(link=>link.addEventListener('click',()=>{try{const id=link.dataset.recordRecent!;localStorage.setItem('platform-recent',JSON.stringify([id,...readList('platform-recent').filter(x=>x!==id)].slice(0,30)));}catch{/* Navigation remains available when storage is disabled. */}}));
const form=document.querySelector<HTMLFormElement>('[data-search]');
if(form){
 const query=form.elements.namedItem('q') as HTMLInputElement;
 const type=form.elements.namedItem('type') as HTMLSelectElement;
 const business=form.elements.namedItem('business') as HTMLSelectElement;
 const platform=form.elements.namedItem('platform') as HTMLSelectElement;
 const status=form.elements.namedItem('status') as HTMLSelectElement;
 function apply(push=true){if(!form)return;let count=0;document.querySelectorAll<HTMLElement>('[data-app-card]').forEach(card=>{const matches=(card.dataset.name||'').toLowerCase().includes(query.value.trim().toLowerCase())&&(!type.value||card.dataset.type===type.value)&&(!status.value||card.dataset.status===status.value)&&(!business.value||card.dataset.business===business.value)&&(!platform.value||JSON.parse(card.dataset.platforms||'[]').includes(platform.value));card.hidden=!matches;if(matches)count++;});const result=document.querySelector('[data-result-count]');if(result)result.textContent=`${count} 个应用`;const empty=document.querySelector<HTMLElement>('[data-empty]');if(empty)empty.hidden=count>0;if(push){const params=new URLSearchParams();if(query.value.trim())params.set('q',query.value.trim());if(type.value)params.set('type',type.value);if(status.value)params.set('status',status.value);if(business.value)params.set('business',business.value);if(platform.value)params.set('platform',platform.value);history.pushState(null,'',location.pathname+(params.size?'?'+params:''));}}
 function restore(){const params=new URLSearchParams(location.search);query.value=params.get('q')||'';type.value=params.get('type')||'';status.value=params.get('status')||'';business.value=params.get('business')||'';platform.value=params.get('platform')||'';const details=form?.querySelector('details');if(details)details.open=!!(type.value||status.value||business.value||platform.value);apply(false);}
 restore();window.addEventListener('popstate',restore);
 form.addEventListener('submit',event=>{event.preventDefault();apply();});business.addEventListener('change',()=>apply());platform.addEventListener('change',()=>apply());type.addEventListener('change',()=>apply());status.addEventListener('change',()=>apply());form.addEventListener('reset',()=>setTimeout(()=>apply(),0));
}

export {};
