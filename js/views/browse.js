import { esc, timeUntil, fmtDate } from '../dom.js';
import { getState, save } from '../store.js';
import { ITEMS, BY_ID, USED_IN, STAGES, TYPES, itemsAtLevel, stageOfLevel, MAX_LEVEL } from '../data/index.js';
import { levelProgress, accuracy, BURNED, resurrect, SRS_STAGES } from '../srs.js';
import { tile, listRow, detailSections, bindSpeak, stageLabel, typeBadge, STAGE_COLORS, TYPE_COLORS, toast } from './common.js';

const LEGEND = `<div class="legend">
  <span style="--c:var(--particle)">Particle</span><span style="--c:var(--conjugation)">Conjugation</span><span style="--c:var(--phrase)">Phrase</span>
  <span style="--c:var(--locked)">Locked</span>
  ${['apprentice', 'guru', 'master', 'enlightened', 'burned'].map((g) => `<span style="--c:${STAGE_COLORS[g]}">${g[0].toUpperCase() + g.slice(1)}</span>`).join('')}
</div>`;

export function renderLevels(root) {
  const state = getState();
  root.innerHTML = `<h1 class="page-title">Levels <span class="jp">レベル</span></h1>
    ${STAGES.map((s) => `
      <section class="stage-block">
        <h2><span class="k">${esc(s.kanji)}</span> ${esc(s.name)} <span class="muted small">Levels ${s.from}–${s.to} · ${esc(s.blurb)}</span></h2>
        <div class="levels-grid">
          ${Array.from({ length: s.to - s.from + 1 }, (_, i) => s.from + i).map((lvl) => {
            const items = itemsAtLevel(lvl);
            const passed = items.filter((i) => state.items[i.id] && state.items[i.id].passedAt).length;
            const cls = lvl === state.level ? 'current' : lvl > state.level ? 'locked' : '';
            const counts = Object.keys(TYPES).map((t) => items.filter((i) => i.type === t).length);
            return `<a class="level-card ${cls}" href="#/level/${lvl}">
              <div class="num">${lvl}</div>
              <div class="meta"><span style="color:var(--particle)">${counts[0]}</span> · <span style="color:var(--conjugation)">${counts[1]}</span> · <span style="color:var(--phrase)">${counts[2]}</span> items</div>
              <div class="progress"><span style="width:${items.length ? (100 * passed) / items.length : 0}%;background:var(--guru)"></span></div></a>`;
          }).join('')}
        </div>
      </section>`).join('')}`;
}

export function renderLevel(root, lvl) {
  const state = getState();
  lvl = Math.max(1, Math.min(MAX_LEVEL, lvl | 0));
  const items = itemsAtLevel(lvl);
  const stage = stageOfLevel(lvl);
  const lp = levelProgress(state, lvl);
  const lvState = state.levels[lvl];
  root.innerHTML = `
    <div class="level-nav">
      ${lvl > 1 ? `<a class="btn sm" href="#/level/${lvl - 1}">← Level ${lvl - 1}</a>` : '<span></span>'}
      ${lvl < MAX_LEVEL ? `<a class="btn sm" href="#/level/${lvl + 1}">Level ${lvl + 1} →</a>` : '<span></span>'}
    </div>
    <h1 class="page-title">Level ${lvl} <span class="jp">${esc(stage.kanji)} ${esc(stage.name)}</span></h1>
    <p class="muted">${lvl > state.level ? `You'll unlock this level after level ${lvl - 1}.` : lvState && lvState.passedAt ? `Passed ${fmtDate(lvState.passedAt)}.` : `${lp.passed} of ${lp.needed} needed ${TYPES[lp.gate[0].type].plural.toLowerCase()} passed.`}</p>
    ${LEGEND}
    ${Object.keys(TYPES).map((t) => {
      const list = items.filter((i) => i.type === t);
      if (!list.length) return '';
      return `<section class="type-section"><h3>${typeBadge(t)} ${TYPES[t].plural} <span class="muted small">${list.length}</span></h3>
        <div class="list">${list.map((it) => listRow(state, it)).join('')}</div></section>`;
    }).join('')}`;
}

export function renderType(root, type, stageIdx) {
  const state = getState();
  if (!TYPES[type]) { root.innerHTML = '<p>Unknown type.</p>'; return; }
  const cur = Number.isInteger(stageIdx) ? stageIdx : STAGES.findIndex((s) => state.level >= s.from && state.level <= s.to);
  const s = STAGES[Math.max(0, cur)];
  const blurb = {
    particle: 'Particles are the building blocks of Japanese grammar — like WaniKani\'s radicals. They mark the role a word plays in the sentence.',
    conjugation: 'Conjugations are forms built from verb, adjective and noun stems — like WaniKani\'s kanji. Passing 90% of a level\'s conjugations levels you up.',
    phrase: 'Phrases are grammar patterns built from particles and conjugations — like WaniKani\'s vocabulary. They unlock once their parts reach Guru.',
  }[type];
  root.innerHTML = `
    <h1 class="page-title" style="color:${TYPE_COLORS[type]}">${TYPES[type].plural}</h1>
    <p class="muted">${blurb}</p>
    <div class="row" style="margin:14px 0 20px;gap:6px">${STAGES.map((st, i) => `<a class="btn sm ${i === cur ? 'primary' : ''}" href="#/type/${type}/${i}">${esc(st.kanji)} ${esc(st.name)} · ${st.from}–${st.to}</a>`).join('')}</div>
    ${LEGEND}
    ${Array.from({ length: s.to - s.from + 1 }, (_, i) => s.from + i).map((lvl) => {
      const list = itemsAtLevel(lvl).filter((i) => i.type === type);
      if (!list.length) return '';
      return `<section class="type-section"><h3><a href="#/level/${lvl}">Level ${lvl}</a></h3><div class="tiles">${list.map((it) => tile(state, it)).join('')}</div></section>`;
    }).join('')}`;
}

export function renderItem(root, id) {
  const state = getState();
  const item = BY_ID.get(id);
  if (!item) { root.innerHTML = '<div class="empty-state"><div class="big">？</div>No such item.</div>'; return; }
  const p = state.items[item.id];
  const usedIn = (USED_IN.get(item.id) || []).map((x) => BY_ID.get(x));
  const acc = accuracy(p);
  const progress = !p ? `<p class="muted">${item.level > state.level ? `Unlocks at level ${item.level}.` : 'Locked until the items it is built from reach Guru.'}</p>`
    : p.stage === 0 ? '<p class="muted">Waiting in your lessons queue.</p>'
    : `<dl class="kv">
        <dt>SRS stage</dt><dd>${stageLabel(state, item)}</dd>
        <dt>Next review</dt><dd>${p.stage >= BURNED ? 'Burned 🔥' : `${timeUntil(p.availableAt)} <span class="muted small">(${fmtDate(p.availableAt)})</span>`}</dd>
        <dt>Accuracy</dt><dd>${acc == null ? '—' : `${acc}%`} <span class="muted small">(${p.correct} correct · ${p.incorrect} incorrect)</span></dd>
        <dt>Streak</dt><dd>${p.streak} <span class="muted small">(best ${p.maxStreak})</span></dd>
        <dt>Unlocked</dt><dd>${fmtDate(p.unlockedAt)}</dd>
        ${p.startedAt ? `<dt>Started</dt><dd>${fmtDate(p.startedAt)}</dd>` : ''}
        ${p.passedAt ? `<dt>Passed</dt><dd>${fmtDate(p.passedAt)}</dd>` : ''}
        ${p.burnedAt ? `<dt>Burned</dt><dd>${fmtDate(p.burnedAt)}</dd>` : ''}
      </dl>
      ${p.stage >= BURNED ? '<p><button class="btn sm" id="resurrect">Resurrect (back to Apprentice I)</button></p>' : ''}`;

  const sentences = (p && p.sentences) || [];
  root.innerHTML = `
    <div class="item-header">
      <div class="big ${item.type}" lang="ja">${esc(item.grammar)}${item.variant ? `<span class="v">${esc(item.variant)}</span>` : ''}</div>
      <div><div class="title">${esc(item.meaning)}</div>
        <div class="sub">${typeBadge(item.type)} <a href="#/level/${item.level}">Level ${item.level}</a> · <span lang="ja">${esc(item.reading)}</span> · ${esc(item.romaji)}</div></div>
    </div>
    ${detailSections(state, item, { which: ['meaning', 'pronunciation', 'examples', 'parts'] })}
    ${usedIn.length ? `<div class="section"><h3>Found in</h3><div class="tiles">${usedIn.map((it) => tile(state, it)).join('')}</div></div>` : ''}
    <div class="section"><h3>Your progress</h3>${progress}</div>
    ${sentences.length ? `<div class="section"><h3>Your sentences</h3><ul class="past-sentences">${sentences.slice(-12).reverse().map((s) => `<li><span class="${s.ok ? 'ok' : 'bad'}">${s.ok ? '✓' : '✗'}</span> ${esc(s.text)} <span class="muted small">${fmtDate(s.at)}</span></li>`).join('')}</ul></div>` : ''}
    ${p ? `<div class="section notes"><h3>Notes</h3><textarea id="note" placeholder="Add your own notes, mnemonics, or example sentences…">${esc(p.note || '')}</textarea></div>` : ''}`;
  bindSpeak(root);
  const note = root.querySelector('#note');
  if (note) note.addEventListener('change', () => { p.note = note.value; p.t = Date.now(); save(); toast('Note saved'); });
  const r = root.querySelector('#resurrect');
  if (r) r.addEventListener('click', () => { resurrect(state, item.id); save(); renderItem(root, id); toast('Resurrected'); });
}

export function renderSearch(root, q) {
  const state = getState();
  const query = (q || '').trim().toLowerCase();
  const norm = (s) => String(s || '').toLowerCase().replace(/[〜～]/g, '');
  const res = !query ? [] : ITEMS.filter((it) =>
    [it.grammar, it.meaning, it.reading, it.romaji, it.id, it.variant, ...it.also].some((f) => norm(f).includes(norm(query))));
  root.innerHTML = `<h1 class="page-title">Search</h1>
    <p class="muted">${query ? `${res.length} result${res.length === 1 ? '' : 's'} for “${esc(q)}”` : 'Search by grammar (てもいい), meaning (even if), reading or romaji.'}</p>
    <div class="list">${res.map((it) => listRow(state, it)).join('')}</div>`;
}

void SRS_STAGES;
