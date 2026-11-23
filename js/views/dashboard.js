import { esc } from '../dom.js';
import { getState } from '../store.js';
import { ITEMS, itemsAtLevel, stageOfLevel, TYPES, MAX_LEVEL } from '../data/index.js';
import {
  availableLessons, availableReviews, forecast, srsCounts, levelProgress, accuracy, GURU, BURNED, HOUR,
} from '../srs.js';
import { tile, STAGE_COLORS, TYPE_COLORS } from './common.js';

export function renderDashboard(root) {
  const state = getState();
  const now = Date.now();
  const lessons = availableLessons(state);
  const reviews = availableReviews(state, now);
  const lp = levelProgress(state);
  const stage = stageOfLevel(state.level);
  const counts = srsCounts(state);
  const fc = forecast(state, now, 24);
  const items = itemsAtLevel(state.level);

  // next review time when none are available
  let next = null;
  for (const it of ITEMS) {
    const p = state.items[it.id];
    if (p && p.stage >= 1 && p.stage < BURNED && p.availableAt > now && (!next || p.availableAt < next)) next = p.availableAt;
  }

  const byType = (type) => items.filter((i) => i.type === type);
  const typeBar = (type) => {
    const list = byType(type);
    if (!list.length) return '';
    const passed = list.filter((i) => state.items[i.id] && state.items[i.id].passedAt).length;
    const pct = (100 * passed) / list.length;
    const goal = type === lp.gate[0]?.type ? `<span class="goal" style="left:${(100 * lp.needed) / lp.total}%" title="90% needed to level up"></span>` : '';
    return `<div class="level-progress-row"><span class="name" style="color:${TYPE_COLORS[type]}">${TYPES[type].plural}</span>
      <div class="progress"><span style="width:${pct}%;background:${TYPE_COLORS[type]}"></span>${goal}</div>
      <span class="num">${passed} / ${list.length}</span></div>`;
  };

  // forecast grouped
  let running = reviews.length;
  const maxBucket = Math.max(1, ...fc.map((b) => b.count));
  let lastDay = '';
  const fcRows = fc.filter((b) => b.count).map((b) => {
    running += b.count;
    const d = new Date(b.at);
    const day = d.toLocaleDateString(undefined, { weekday: 'long' });
    const dayHeader = day !== lastDay ? `<div class="day">${d.toDateString() === new Date(now).toDateString() ? 'Today' : day}</div>` : '';
    lastDay = day;
    return `${dayHeader}<div class="f-row"><span>${d.toLocaleTimeString(undefined, { hour: 'numeric' })}</span>
      <span class="bar" style="width:${(100 * b.count) / maxBucket}%"></span><span class="tot">+${b.count} · ${running}</span></div>`;
  }).join('');

  // apprentice items with the worst accuracy ("critical condition")
  const critical = ITEMS.filter((it) => {
    const p = state.items[it.id];
    return p && p.stage >= 1 && p.stage < GURU && p.incorrect > 0 && accuracy(p) < 75;
  }).sort((a, b) => accuracy(state.items[a.id]) - accuracy(state.items[b.id])).slice(0, 12);

  const recentLessons = ITEMS.filter((it) => state.items[it.id] && state.items[it.id].startedAt)
    .sort((a, b) => state.items[b.id].startedAt - state.items[a.id].startedAt).slice(0, 12);
  const mistakes = recentMistakes(state);

  const burnedCount = counts.burned;

  root.innerHTML = `
    <div class="hero">
      <a class="hero-btn lessons ${lessons.length ? '' : 'empty'}" href="#/lessons">
        <span class="bg-kanji">学</span>
        <span class="label">Lessons</span><span class="count">${lessons.length}</span>
        <span class="sub">${lessons.length ? 'Learn new grammar' : 'No lessons right now — finish your reviews to unlock more'}</span>
      </a>
      <a class="hero-btn reviews ${reviews.length ? '' : 'empty'}" href="#/reviews">
        <span class="bg-kanji">復</span>
        <span class="label">Reviews</span><span class="count">${reviews.length}</span>
        <span class="sub">${reviews.length ? 'Write a sentence for each grammar point' : next ? `Next review ${new Date(next).toLocaleString(undefined, { weekday: 'short', hour: 'numeric', minute: '2-digit' })}` : 'Do some lessons first'}</span>
      </a>
    </div>

    <div class="card">
      <h2>Level ${state.level} progress <span class="muted">· ${esc(stage.kanji)} ${esc(stage.name)} — ${esc(stage.blurb)}</span>
        <span class="right"><a href="#/level/${state.level}">View level ${state.level} →</a></span></h2>
      ${['particle', 'conjugation', 'phrase'].map(typeBar).join('')}
      <p class="muted small" style="margin:6px 0 12px">${state.level >= MAX_LEVEL ? 'You are at the final level.' : `Pass (Guru) ${lp.needed} of this level's ${lp.total} ${TYPES[lp.gate[0]?.type || 'conjugation'].plural.toLowerCase()} to reach level ${state.level + 1}.`}</p>
      <div class="tiles">${items.map((it) => tile(state, it)).join('')}</div>
    </div>

    <div class="card">
      <h2>Item spread</h2>
      <div class="srs-row">
        ${['apprentice', 'guru', 'master', 'enlightened', 'burned'].map((g) => `<div class="srs-box srs-${g}"><div class="n">${counts[g]}</div><div class="l">${g}</div></div>`).join('')}
      </div>
    </div>

    <div class="grid-2">
      <div class="card"><h2>Review forecast <span class="right muted">next 24 hours</span></h2>
        ${fcRows ? `<div class="forecast">${fcRows}</div>` : '<p class="muted">No reviews coming up in the next 24 hours.</p>'}
      </div>
      <div class="card"><h2>Extra study <span class="right muted">doesn't affect SRS</span></h2>
        <div class="list" style="gap:10px">
          <a class="btn" href="#/practice/recent">Recent lessons (${Math.min(recentLessons.length, 20)})</a>
          <a class="btn" href="#/practice/mistakes">Recent mistakes (${mistakes.length})</a>
          <a class="btn" href="#/practice/level">Current level (${items.filter((i) => state.items[i.id] && state.items[i.id].stage >= 1).length})</a>
          <a class="btn" href="#/practice/burned">Burned items (${burnedCount})</a>
        </div>
      </div>
    </div>

    <div class="grid-2">
      <div class="card"><h2>Critical condition</h2>
        ${critical.length ? `<div class="tiles">${critical.map((it) => tile(state, it, { compact: true })).join('')}</div>` : '<p class="muted">No struggling items. Nice!</p>'}
      </div>
      <div class="card"><h2>Recent lessons</h2>
        ${recentLessons.length ? `<div class="tiles">${recentLessons.map((it) => tile(state, it, { compact: true })).join('')}</div>` : '<p class="muted">Nothing yet — start with your first lessons.</p>'}
      </div>
    </div>`;
}

export function recentMistakes(state, hours = 24 * 7) {
  const since = Date.now() - hours * HOUR;
  const ids = [];
  for (let i = state.log.length - 1; i >= 0; i--) {
    const e = state.log[i];
    if (e.at < since) break;
    if (e.wrong && !ids.includes(e.id)) ids.push(e.id);
  }
  return ids;
}

void STAGE_COLORS;
