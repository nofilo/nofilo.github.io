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
 const keys=['q','business','platform','type','status'] as const;
 const fields=Object.fromEntries(keys.map(key=>[key,form.elements.namedItem(key)])) as Record<typeof keys[number],HTMLInputElement|HTMLSelectElement>;
 const labels={q:'搜索',business:'业务',platform:'平台',type:'形态',status:'状态'};
 let view='all';
 const chips=document.querySelector<HTMLElement>('[data-filter-chips]');
 function apply(push=true){
  document.querySelectorAll<HTMLButtonElement>('[data-directory-view]').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.directoryView===view)));
  let count=0;
  document.querySelectorAll<HTMLElement>('[data-app-card]').forEach(card=>{
   const matches=(view==='all'||(view==='favorites'?favorites.has(card.dataset.appId!):readList('platform-recent').includes(card.dataset.appId!)))&&(card.dataset.name||'').toLowerCase().includes(fields.q.value.trim().toLowerCase())&&(!fields.business.value||card.dataset.business===fields.business.value)&&(!fields.type.value||card.dataset.type===fields.type.value)&&(!fields.status.value||card.dataset.status===fields.status.value)&&(!fields.platform.value||JSON.parse(card.dataset.platforms||'[]').includes(fields.platform.value));
   card.hidden=!matches;if(matches)count++;
  });
  const result=document.querySelector('[data-result-count]');if(result)result.textContent=count+' 个应用';
  const empty=document.querySelector<HTMLElement>('[data-empty]');if(empty)empty.hidden=count>0;
  if(chips){chips.replaceChildren();for(const key of keys){const field=fields[key];if(!field.value.trim())continue;const button=document.createElement('button');button.type='button';const value=field instanceof HTMLSelectElement?field.selectedOptions[0]?.textContent:field.value;button.textContent=labels[key]+'：'+value+' ×';button.setAttribute('aria-label','取消'+labels[key]+'：'+value);button.addEventListener('click',()=>{field.value='';apply();fields.q.focus();});chips.append(button);}}
  if(push){const params=new URLSearchParams();if(view!=='all')params.set('view',view);for(const key of keys)if(fields[key].value.trim())params.set(key,fields[key].value.trim());const target=location.pathname+(params.size?'?'+params:'');if(target!==location.pathname+location.search)history.pushState(null,'',target);}
 }
 function restore(){const params=new URLSearchParams(location.search);view=['favorites','recent'].includes(params.get('view')||'')?params.get('view')!:'all';for(const key of keys)fields[key].value=params.get(key)||'';const details=form?.querySelector('details');if(details)details.open=keys.some(key=>key!=='q'&&!!fields[key].value);apply(false);}
 document.querySelectorAll<HTMLButtonElement>('[data-directory-view]').forEach(button=>button.addEventListener('click',()=>{view=button.dataset.directoryView!;apply();}));
 document.addEventListener('favorites-updated',()=>apply(false));
 restore();window.addEventListener('popstate',restore);
 form.addEventListener('submit',event=>{event.preventDefault();apply();});
 for(const key of keys.filter(key=>key!=='q'))fields[key].addEventListener('change',()=>apply());
 form.addEventListener('reset',()=>setTimeout(()=>apply(),0));
 document.querySelector('[data-clear-filters]')?.addEventListener('click',()=>{view='all';form.reset();fields.q.focus();});
}
export {};
