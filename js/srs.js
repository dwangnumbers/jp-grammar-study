// Spaced-repetition engine — a faithful copy of WaniKani's system.
//
// Stages: 0 lesson · 1–4 Apprentice · 5–6 Guru · 7 Master · 8 Enlightened · 9 Burned
// Intervals (hours) to the next review after reaching a stage:
//   A1 4h · A2 8h · A3 23h · A4 47h · G1 1w · G2 2w · M 1mo · E 4mo
// Levels 1–2 use accelerated Apprentice intervals: 2h · 4h · 8h · 23h.
// Review times are rounded down to the start of the hour.
// A wrong answer drops the item: new = cur − ceil(wrong/2) × (cur ≥ Guru ? 2 : 1), min A1.
// An item unlocks once every part it is built from has been passed (reached Guru).
// You level up once 90% of the current level's conjugations (the "kanji") are passed.

import { ITEMS, BY_ID, MAX_LEVEL, itemsAtLevel } from './data/index.js';

export const HOUR = 3600 * 1000;
export const GURU = 5;
export const BURNED = 9;

export const SRS_STAGES = [
  { stage: 0, name: 'Lesson', group: 'lesson' },
  { stage: 1, name: 'Apprentice I', group: 'apprentice' },
  { stage: 2, name: 'Apprentice II', group: 'apprentice' },
  { stage: 3, name: 'Apprentice III', group: 'apprentice' },
  { stage: 4, name: 'Apprentice IV', group: 'apprentice' },
  { stage: 5, name: 'Guru I', group: 'guru' },
  { stage: 6, name: 'Guru II', group: 'guru' },
  { stage: 7, name: 'Master', group: 'master' },
  { stage: 8, name: 'Enlightened', group: 'enlightened' },
  { stage: 9, name: 'Burned', group: 'burned' },
];
export const SRS_GROUPS = ['apprentice', 'guru', 'master', 'enlightened', 'burned'];

const INTERVALS = { 1: 4, 2: 8, 3: 23, 4: 47, 5: 167, 6: 335, 7: 719, 8: 2879 };
const ACCELERATED = { 1: 2, 2: 4, 3: 8, 4: 23 };
export const LEVEL_UP_FRACTION = 0.9;

export const floorHour = (t) => Math.floor(t / HOUR) * HOUR;

export function intervalHours(stage, itemLevel) {
  if (itemLevel <= 2 && ACCELERATED[stage]) return ACCELERATED[stage];
  return INTERVALS[stage];
}

export function nextReviewAt(stage, itemLevel, now) {
  if (stage >= BURNED || stage < 1) return null;
  return floorHour(now + intervalHours(stage, itemLevel) * HOUR);
}

export function stageAfter(stage, incorrect) {
  if (incorrect <= 0) return Math.min(BURNED, stage + 1);
  const penalty = stage >= GURU ? 2 : 1;
  return Math.max(1, stage - Math.ceil(incorrect / 2) * penalty);
}

export function newState(now = Date.now()) {
  return {
    version: 1,
    createdAt: now,
    // A new epoch starts whenever progress is reset or rewritten (reset, level
    // change, import). Cloud sync merges states of the same epoch item by item;
    // otherwise the newer epoch wins.
    epoch: now,
    level: 1,
    levels: { 1: { unlockedAt: now } },
    items: {},
    log: [], // review history: {id, at, from, to, wrong}
  };
}

export const progressOf = (state, id) => state.items[id] || null;
export const stageOf = (state, id) => (state.items[id] ? state.items[id].stage : 0);
export const isPassed = (state, id) => !!(state.items[id] && state.items[id].passedAt);
export const isStarted = (state, id) => !!(state.items[id] && state.items[id].stage >= 1);

export function isUnlocked(state, item) {
  if (item.level > state.level) return false;
  return item.parts.every((p) => isPassed(state, p));
}

// The items that gate levelling up (WaniKani: the level's kanji).
export function gateItems(level) {
  const lv = itemsAtLevel(level);
  const conj = lv.filter((i) => i.type === 'conjugation');
  return conj.length ? conj : lv;
}

export function levelProgress(state, level = state.level) {
  const gate = gateItems(level);
  const passed = gate.filter((i) => isPassed(state, i.id)).length;
  const needed = Math.ceil(gate.length * LEVEL_UP_FRACTION);
  return { gate, passed, needed, total: gate.length, done: passed >= needed };
}

// Record unlock times and handle level-ups. Returns {levelUps: [n…], unlocked: [id…]}
export function refresh(state, now = Date.now()) {
  const levelUps = [];
  while (state.level < MAX_LEVEL && levelProgress(state).done) {
    state.levels[state.level].passedAt = state.levels[state.level].passedAt || now;
    state.level++;
    state.levels[state.level] = state.levels[state.level] || { unlockedAt: now };
    levelUps.push(state.level);
  }
  const unlocked = [];
  for (const it of ITEMS) {
    if (it.level > state.level) break;
    if (state.items[it.id]) continue;
    if (isUnlocked(state, it)) {
      state.items[it.id] = { stage: 0, unlockedAt: now, correct: 0, incorrect: 0, streak: 0, maxStreak: 0, t: now };
      unlocked.push(it.id);
    }
  }
  return { levelUps, unlocked };
}

export function availableLessons(state) {
  return ITEMS.filter((it) => state.items[it.id] && state.items[it.id].stage === 0);
}

export function availableReviews(state, now = Date.now()) {
  return ITEMS.filter((it) => {
    const p = state.items[it.id];
    return p && p.stage >= 1 && p.stage < BURNED && p.availableAt <= now;
  });
}

// Lesson quiz passed → Apprentice I
export function startItem(state, id, now = Date.now()) {
  const it = BY_ID.get(id);
  const p = state.items[id];
  if (!p || p.stage !== 0) return;
  p.stage = 1;
  p.startedAt = now;
  p.t = now;
  p.availableAt = nextReviewAt(1, it.level, now);
}

// A review is finished when the item is finally answered correctly.
// `incorrect` = number of wrong answers given during this session.
export function applyReview(state, id, incorrect, now = Date.now()) {
  const it = BY_ID.get(id);
  const p = state.items[id];
  if (!p || p.stage < 1 || p.stage >= BURNED) return null;
  const from = p.stage;
  const to = stageAfter(from, incorrect);
  p.stage = to;
  p.lastReviewedAt = now;
  p.t = now;
  if (incorrect) { p.incorrect += incorrect; p.streak = 0; } else { p.streak++; p.maxStreak = Math.max(p.maxStreak, p.streak); }
  p.correct++;
  if (to >= GURU && !p.passedAt) p.passedAt = now;
  if (to === BURNED) { p.burnedAt = now; p.availableAt = null; } else p.availableAt = nextReviewAt(to, it.level, now);
  state.log.push({ id, at: now, from, to, wrong: incorrect });
  if (state.log.length > 5000) state.log.splice(0, state.log.length - 5000);
  return { from, to };
}

export function resurrect(state, id, now = Date.now()) {
  const p = state.items[id];
  if (!p || p.stage !== BURNED) return;
  const it = BY_ID.get(id);
  p.stage = 1; p.burnedAt = null; p.availableAt = nextReviewAt(1, it.level, now); p.t = now;
}

export function accuracy(p) {
  if (!p || !(p.correct + p.incorrect)) return null;
  return Math.round((100 * p.correct) / (p.correct + p.incorrect));
}

// Reviews coming up in the next `hours`, bucketed by the hour they unlock.
export function forecast(state, now = Date.now(), hours = 24) {
  const start = floorHour(now) + HOUR;
  const buckets = [];
  for (let h = 0; h < hours; h++) buckets.push({ at: start + h * HOUR, count: 0 });
  for (const it of ITEMS) {
    const p = state.items[it.id];
    if (!p || p.stage < 1 || p.stage >= BURNED || p.availableAt <= now) continue;
    const idx = Math.floor((p.availableAt - start) / HOUR);
    if (idx >= 0 && idx < hours) buckets[idx].count++;
  }
  return buckets;
}

export function srsCounts(state) {
  const c = { apprentice: 0, guru: 0, master: 0, enlightened: 0, burned: 0 };
  for (const id in state.items) {
    const s = state.items[id].stage;
    if (s >= 1) c[SRS_STAGES[s].group]++;
  }
  return c;
}

// Move to a different level (WaniKani lets you reset down; we also allow skipping
// ahead). Progress on items above the new level is cleared.
export function setLevel(state, level, now = Date.now()) {
  level = Math.max(1, Math.min(MAX_LEVEL, level));
  state.epoch = now;
  for (const it of ITEMS) if (it.level > level) delete state.items[it.id];
  for (const l of Object.keys(state.levels)) if (+l > level) delete state.levels[l];
  state.level = level;
  state.levels[level] = state.levels[level] || { unlockedAt: now };
  // when skipping ahead, everything below counts as unlocked
  for (const it of ITEMS) {
    if (it.level > level) break;
    if (!state.items[it.id]) state.items[it.id] = { stage: 0, unlockedAt: now, correct: 0, incorrect: 0, streak: 0, maxStreak: 0, t: now };
  }
  delete state.levels[level].passedAt;
}
