import { esc } from '../dom.js';
import { SRS_STAGES, isUnlocked, BURNED } from '../srs.js';
import { TYPES, BY_ID } from '../data/index.js';
import { getChecker } from '../tokenizer.js';
import { getSettings } from '../store.js';
import { speak, canSpeak } from '../speech.js';

export const STAGE_COLORS = {
  lesson: 'var(--surface-3)', apprentice: 'var(--apprentice)', guru: 'var(--guru)', master: 'var(--master)',
  enlightened: 'var(--enlightened)', burned: 'var(--burned)', locked: 'var(--locked)',
};
export const TYPE_COLORS = { particle: 'var(--particle)', conjugation: 'var(--conjugation)', phrase: 'var(--phrase)' };

export function itemStatus(state, item) {
  const p = state.items[item.id];
  if (!p) return { key: 'locked', label: isUnlocked(state, item) ? 'Unlocking…' : 'Locked', stage: -1 };
  if (p.stage === 0) return { key: 'lesson', label: 'In lessons', stage: 0 };
  const s = SRS_STAGES[p.stage];
  return { key: s.group, label: s.name, stage: p.stage };
}

export function stageLabel(state, item) {
  const st = itemStatus(state, item);
  return `<span class="stage-label" style="background:${STAGE_COLORS[st.key]}">${esc(st.label)}</span>`;
}

export function tile(state, item, { compact = false } = {}) {
  const st = itemStatus(state, item);
  const cls = st.key === 'locked' ? 'locked' : st.key === 'lesson' ? `${item.type} lesson` : item.type;
  const dot = st.stage >= 1 ? `<span class="stage-dot" style="background:${STAGE_COLORS[st.key]}" title="${esc(st.label)}"></span>` : '';
  return `<a class="tile ${cls}${compact ? ' compact' : ''}" href="#/item/${esc(item.id)}" title="${esc(item.meaning)} — ${esc(st.label)}">${dot}<span class="g">${esc(item.grammar)}</span>${item.variant ? `<span class="v">${esc(item.variant)}</span>` : ''}${compact ? '' : `<span class="m">${esc(item.meaning)}</span>`}</a>`;
}

export function listRow(state, item) {
  const st = itemStatus(state, item);
  const cls = st.key === 'locked' ? 'locked' : item.type;
  return `<a class="list-row ${cls}" href="#/item/${esc(item.id)}">
    <span class="g">${esc(item.grammar)}${item.variant ? `<span class="v">${esc(item.variant)}</span>` : ''}</span>
    <span class="m">${esc(item.meaning)}${st.stage >= 1 ? `<span class="stage">${esc(st.label)}</span>` : ''}</span>
    <span class="r">${esc(item.reading)}</span></a>`;
}

// Japanese text → HTML with optional furigana and grammar highlight.
export function renderJa(text, item, { furigana, highlight } = {}) {
  const s = getSettings();
  furigana = furigana ?? s.furigana;
  highlight = highlight ?? s.highlightGrammar;
  const checker = getChecker();
  if (!checker) return esc(text);
  let ranges = [];
  if (highlight && item) { try { ranges = checker.highlight(item, text); } catch { ranges = []; } }
  const inRange = (i) => ranges.some(([a, b]) => i >= a && i < b);
  const segs = furigana ? checker.furigana(text) : [{ text, reading: null }];
  let pos = 0;
  let out = '';
  for (const seg of segs) {
    const start = pos;
    pos += seg.text.length;
    if (seg.reading) {
      const html = `<ruby>${esc(seg.text)}<rt>${esc(seg.reading)}</rt></ruby>`;
      out += inRange(start) ? `<mark>${html}</mark>` : html;
    } else {
      // split plain text at highlight boundaries
      let buf = '', on = false;
      for (let i = 0; i < seg.text.length; i++) {
        const h = inRange(start + i);
        if (h !== on) { out += on ? `<mark>${esc(buf)}</mark>` : esc(buf); buf = ''; on = h; }
        buf += seg.text[i];
      }
      out += on ? `<mark>${esc(buf)}</mark>` : esc(buf);
    }
  }
  return out.replace(/<\/mark><mark>/g, '');
}

export function examplesHTML(item, examples = item.examples) {
  return `<div class="examples" style="--hl:${TYPE_COLORS[item.type]}">${examples.map(([ja, en]) => `
    <div class="example">
      ${canSpeak() ? `<button class="speak" data-say="${esc(ja)}" title="Listen" aria-label="Listen">🔊</button>` : '<span></span>'}
      <div class="ja" lang="ja">${renderJa(ja, item)}</div>
      <div class="en">${esc(en)}</div>
    </div>`).join('')}</div>`;
}

export function bindSpeak(root) {
  root.querySelectorAll('[data-say]').forEach((b) => b.addEventListener('click', (e) => { e.preventDefault(); speak(b.dataset.say); }));
}

export function partsHTML(state, item) {
  if (!item.parts.length) return '<p class="muted">This is a building block — it isn\'t built from other items.</p>';
  return `<div class="tiles">${item.parts.map((id) => tile(state, BY_ID.get(id))).join('')}</div>`;
}

export function typeBadge(type) {
  return `<span class="type-badge ${type}">${TYPES[type].label}</span>`;
}

// Full item details (used on the item page, in lessons, and in the review "item info" panel)
export function detailSections(state, item, { which = ['meaning', 'pronunciation', 'examples', 'parts'] } = {}) {
  const sec = {
    meaning: `
      <div class="section"><h3>Meaning</h3>
        <dl class="kv"><dt>Primary</dt><dd><b>${esc(item.meaning)}</b></dd>
        ${item.also.length ? `<dt>Also</dt><dd>${item.also.map(esc).join(', ')}</dd>` : ''}
        <dt>Formation</dt><dd><div class="structure" lang="ja">${esc(item.structure)}</div></dd></dl>
      </div>
      <div class="section"><h3>Explanation</h3><p class="explain">${esc(item.explain)}</p></div>`,
    pronunciation: `
      <div class="section"><h3>Pronunciation ${canSpeak() ? `<button class="speak" data-say="${esc(item.reading)}" title="Listen">🔊</button>` : ''}</h3>
        <div class="reading-big" lang="ja">${esc(item.reading)}</div><div class="muted">${esc(item.romaji)}</div>
      </div>`,
    examples: `<div class="section"><h3>Example sentences</h3>${examplesHTML(item)}</div>`,
    parts: `<div class="section"><h3>Built from</h3>${partsHTML(state, item)}</div>`,
  };
  return which.map((w) => sec[w]).join('');
}

export function toast(msg, ms = 2600) {
  const t = document.createElement('div');
  t.className = 'toast';
  t.textContent = msg;
  document.body.appendChild(t);
  setTimeout(() => t.remove(), ms);
}

export { BURNED };
