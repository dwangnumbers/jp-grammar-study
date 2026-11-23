export const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
export const $ = (sel, root = document) => root.querySelector(sel);
export const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
export function el(html) {
  const t = document.createElement('template');
  t.innerHTML = html.trim();
  return t.content.firstElementChild;
}
export function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
  return a;
}
export function timeUntil(t, now = Date.now()) {
  const d = t - now;
  if (d <= 0) return 'Available now';
  const h = d / 3600000;
  if (h < 1) return `in ${Math.max(1, Math.round(d / 60000))} min`;
  if (h < 24) return `in ${Math.round(h)} hour${Math.round(h) === 1 ? '' : 's'}`;
  const days = Math.round(h / 24);
  if (days < 31) return `in ${days} day${days === 1 ? '' : 's'}`;
  return `in ${Math.round(days / 30)} month${Math.round(days / 30) === 1 ? '' : 's'}`;
}
export const fmtDate = (t) => new Date(t).toLocaleString(undefined, { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' });
