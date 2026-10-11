const root=document.documentElement;
const reduced=matchMedia('(prefers-reduced-motion: reduce)');
const finePointer=matchMedia('(hover:hover) and (pointer:fine)');
const allowed=()=>!reduced.matches&&root.dataset.input!=='keyboard';
const glide='cubic-bezier(.23,1,.32,1)';
const animations=new Set<Animation>();
function reveal(el:HTMLElement,frames:Keyframe[],duration=600,delay=0,easing=glide){if(!allowed())return;const animation=el.animate(frames,{duration,delay,easing,fill:'backwards'});animations.add(animation);animation.finished.catch(()=>{}).finally(()=>animations.delete(animation));}
root.classList.add('motion-js');
// Hero headline: quiet line reveals inside clipped rows (no per-character motion).
document.querySelectorAll<HTMLElement>('.hero-line>span').forEach((line,i)=>reveal(line,[{opacity:0,transform:'translateY(110%)'},{opacity:1,transform:'translateY(0)'}],760,160+i*140));
document.querySelectorAll<HTMLElement>('.hero-eyebrow,.hero-tagline,.hero-description,.hero-actions').forEach((el,i)=>reveal(el,[{opacity:0,transform:'translateY(14px)'},{opacity:1,transform:'translateY(0)'}],560,120+i*90));
// Inner pages get one quiet entrance so navigation feels continuous with the homepage.
const pageShell=document.querySelector<HTMLElement>('main');
if(!document.querySelector('.hero')&&pageShell)reveal(pageShell,[{opacity:0,transform:'translateY(14px)'},{opacity:1,transform:'translateY(0)'}],260);
const targets=Array.from(document.querySelectorAll<HTMLElement>('[data-reveal],.section-heading,.scene-grid>.scene-card,.workspace-apps>.catalog-card,.personal-rows>a,.workspace-heading,.detail-main>section'));
if('IntersectionObserver' in window){const observer=new IntersectionObserver(entries=>{const groups=new Map<Element|null,number>();for(const entry of entries){if(!entry.isIntersecting)continue;observer.unobserve(entry.target);const el=entry.target as HTMLElement;const i=groups.get(el.parentElement)||0;groups.set(el.parentElement,i+1);reveal(el,[{opacity:0,transform:'translateY(26px)'},{opacity:1,transform:'translateY(0)'}],640,Math.min(i,3)*70);}},{threshold:.12});targets.forEach(el=>observer.observe(el));const headings=document.querySelectorAll<HTMLElement>('.section-heading');const headingObserver=new IntersectionObserver(entries=>{for(const entry of entries){if(!entry.isIntersecting)continue;headingObserver.unobserve(entry.target);entry.target.classList.add('is-in');}},{threshold:.3});headings.forEach(el=>headingObserver.observe(el));}
const header=document.querySelector<HTMLElement>('.site-header');
const hero=document.querySelector<HTMLElement>('.hero');
const progressBar=document.querySelector<HTMLElement>('.scroll-progress__bar');
let frame=0;
function updateScroll(){frame=0;header?.classList.toggle('is-scrolled',scrollY>24);if(hero){const progress=Math.min(1,scrollY/hero.offsetHeight);hero.style.setProperty('--hero-shift',allowed()?`${Math.min(scrollY*.12,90)}px`:'0px');hero.style.setProperty('--hero-opacity',allowed()?String(1-progress*.45):'1');}const max=document.documentElement.scrollHeight-innerHeight;progressBar?.style.setProperty('--scroll-progress',max>0?String(Math.min(1,Math.max(0,scrollY/max))):'0');}
function schedule(){if(!frame)frame=requestAnimationFrame(updateScroll);}
window.addEventListener('scroll',schedule,{passive:true});window.addEventListener('resize',schedule,{passive:true});updateScroll();
const cleanups:(()=>void)[]=[];
// Stats count-up: server-rendered numbers stay final without JS or when motion is off.
const counters=document.querySelectorAll<HTMLElement>('[data-count]');
if('IntersectionObserver' in window&&counters.length){const counterObserver=new IntersectionObserver(entries=>{for(const entry of entries){if(!entry.isIntersecting)continue;counterObserver.unobserve(entry.target);const el=entry.target as HTMLElement;const target=Number(el.dataset.count||'');if(!allowed()||!Number.isFinite(target)||target<=0)continue;const started=performance.now();let tick=0;const stop=()=>{cancelAnimationFrame(tick);el.textContent=String(target);};cleanups.push(stop);const step=(now:number)=>{const p=Math.min(1,(now-started)/1000);el.textContent=String(Math.round(target*(1-Math.pow(1-p,3))));if(p<1)tick=requestAnimationFrame(step);};tick=requestAnimationFrame(step);}},{threshold:.5});counters.forEach(el=>counterObserver.observe(el));}
// Magnetic CTA: subtle pull toward the pointer, eased back on leave (editorial restraint).
document.querySelectorAll<HTMLElement>('[data-magnetic]').forEach(el=>{let tick=0;const reset=()=>{cancelAnimationFrame(tick);tick=0;el.style.transform='';};cleanups.push(reset);el.addEventListener('pointermove',event=>{if(!allowed()||!finePointer.matches)return;const rect=el.getBoundingClientRect();const dx=event.clientX-(rect.left+rect.width/2);const dy=event.clientY-(rect.top+rect.height/2);const x=Math.max(-5,Math.min(5,dx*.12));const y=Math.max(-4,Math.min(4,dy*.14));if(!tick)tick=requestAnimationFrame(()=>{tick=0;el.style.transform=`translate(${x.toFixed(1)}px,${y.toFixed(1)}px)`;});},{passive:true});el.addEventListener('pointerleave',reset);});
document.querySelectorAll<HTMLElement>('.card').forEach(card=>{card.dataset.spotlight='';let tick=0,x=0,y=0;const reset=()=>{cancelAnimationFrame(tick);tick=0;card.style.removeProperty('--spot-x');card.style.removeProperty('--spot-y');};cleanups.push(reset);card.addEventListener('pointermove',event=>{if(!allowed()||!finePointer.matches)return;const rect=card.getBoundingClientRect();x=event.clientX-rect.left;y=event.clientY-rect.top;if(!tick)tick=requestAnimationFrame(()=>{tick=0;card.style.setProperty('--spot-x',`${x}px`);card.style.setProperty('--spot-y',`${y}px`);});},{passive:true});card.addEventListener('pointerleave',reset);});
function settle(){animations.forEach(a=>a.cancel());animations.clear();cleanups.forEach(fn=>fn());schedule();}
document.addEventListener('keydown',settle);reduced.addEventListener('change',settle);document.addEventListener('pointermove',schedule,{passive:true});
export {};
