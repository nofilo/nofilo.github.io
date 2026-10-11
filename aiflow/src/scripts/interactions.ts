const root = document.documentElement;
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const runningAnimations = new Set<Animation>();
const cancelAnimations = () => {
  runningAnimations.forEach(animation => animation.cancel());
  runningAnimations.clear();
  // Existing CSS transitions can outlive a duration change; settle them immediately as well.
  document.getAnimations().forEach(animation => animation.cancel());
};
const canAnimate = () => !reducedMotion.matches && root.dataset.input !== 'keyboard';
function enter(element: HTMLElement, keyframes: Keyframe[], duration = 240, delay = 0) {
  if (!canAnimate() || typeof element.animate !== 'function') return;
  const animation = element.animate(keyframes, { duration, delay, fill: 'backwards', easing: 'cubic-bezier(.23,1,.32,1)' });
  runningAnimations.add(animation);
  animation.finished.then(() => runningAnimations.delete(animation)).catch(() => runningAnimations.delete(animation));
}
document.addEventListener('keydown', () => { root.dataset.input = 'keyboard'; cancelAnimations(); }, { capture: true });
document.addEventListener('pointerdown', () => { root.dataset.input = 'pointer'; }, { capture: true });
document.addEventListener('pointermove', event => {
  if (event.pointerType === 'mouse' && (event.movementX !== 0 || event.movementY !== 0)) root.dataset.input = 'pointer';
}, { passive: true });
reducedMotion.addEventListener('change', cancelAnimations);

const dialog = document.querySelector<HTMLDialogElement>('#preview-dialog');
document.addEventListener('click', event => {
  if (!(event.target instanceof Element)) return;
  const pending = event.target.closest<HTMLAnchorElement>('[data-destination]');
  if (!pending || !dialog || typeof dialog.showModal !== 'function' || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
  event.preventDefault();
  const title = dialog.querySelector<HTMLElement>('#preview-title');
  if (title) title.textContent = `${pending.dataset.pageLabel || '此页面'}正在准备中`;
  if (!dialog.open) dialog.showModal();
  enter(dialog, [{ opacity: 0, transform: 'translateY(6px) scale(.98)' }, { opacity: 1, transform: 'translateY(0) scale(1)' }], 180);
});
dialog?.addEventListener('click', event => {
  if (event.target !== dialog) return;
  const rect = dialog.getBoundingClientRect();
  if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
});

document.querySelector<HTMLAnchorElement>('[data-scroll]')?.addEventListener('click', event => {
  const target = document.getElementById('business');
  if (!target || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
  event.preventDefault();
  target.scrollIntoView({ behavior: canAnimate() && event.detail !== 0 ? 'smooth' : 'instant', block: 'start' });
  history.replaceState(null, '', '#business');
});

// Section and headline entrances are managed by motion.ts.
export {};
