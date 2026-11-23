import { ITEMS, itemsAtLevel } from '../js/data/index.js';
import {
  HOUR, floorHour, stageAfter, nextReviewAt, newState, refresh, availableLessons, availableReviews,
  startItem, applyReview, levelProgress, isUnlocked, forecast, setLevel,
} from '../js/srs.js';

export function runSrsTests() {
  let failures = 0;
  const eq = (name, got, want) => {
    if (JSON.stringify(got) !== JSON.stringify(want)) { failures++; console.log(`✗ srs: ${name}: got ${JSON.stringify(got)}, want ${JSON.stringify(want)}`); }
  };
  const T0 = Date.UTC(2026, 0, 1, 10, 37);

  // WaniKani penalty formula
  eq('correct moves up', stageAfter(3, 0), 4);
  eq('one wrong at apprentice', stageAfter(4, 1), 3);
  eq('two wrong at apprentice', stageAfter(4, 2), 3);
  eq('three wrong at apprentice', stageAfter(4, 3), 2);
  eq('one wrong at guru drops 2', stageAfter(6, 1), 4);
  eq('one wrong at enlightened', stageAfter(8, 1), 6);
  eq('floor at apprentice 1', stageAfter(2, 9), 1);
  eq('enlightened → burned', stageAfter(8, 0), 9);

  // intervals, rounded down to the hour
  eq('A1 normal level', nextReviewAt(1, 5, T0), floorHour(T0 + 4 * HOUR));
  eq('A1 accelerated level', nextReviewAt(1, 1, T0), floorHour(T0 + 2 * HOUR));
  eq('Guru I is a week minus an hour', nextReviewAt(5, 10, T0), floorHour(T0 + 167 * HOUR));
  eq('burned has no review', nextReviewAt(9, 10, T0), null);

  // unlocking & a full simulated run through level 1 → 2
  const st = newState(T0);
  refresh(st, T0);
  const l1 = itemsAtLevel(1);
  const lessons = availableLessons(st).map((i) => i.id);
  const noParts = l1.filter((i) => !i.parts.length).map((i) => i.id);
  eq('level 1 lessons = items without parts', lessons.sort(), noParts.sort());
  if (lessons.some((id) => ITEMS.find((i) => i.id === id).level !== 1)) { failures++; console.log('✗ srs: lesson from a higher level'); }

  let now = T0;
  const teach = () => { for (const it of availableLessons(st)) startItem(st, it.id, now); };
  teach();
  eq('nothing to review right away', availableReviews(st, now).length, 0);
  // answer everything correctly until level 2
  let guard = 0;
  while (st.level === 1 && guard++ < 200) {
    now += HOUR;
    for (const it of availableReviews(st, now)) applyReview(st, it.id, 0, now);
    refresh(st, now);
    teach();
  }
  eq('reached level 2', st.level, 2);
  const lp = levelProgress(st, 1);
  eq('level 1 gate satisfied', lp.done, true);
  // accelerated level: A1→G1 takes 2+4+8+23 = 37h minimum (+ rounding)
  const hours = (now - T0) / HOUR;
  if (hours < 37 || hours > 80) { failures++; console.log(`✗ srs: level 1 took ${hours}h, expected ~37–80h`); }

  // an item with unpassed parts stays locked
  const withParts = ITEMS.find((i) => i.level === 2 && i.parts.some((p) => !st.items[p] || !st.items[p].passedAt));
  if (withParts && isUnlocked(st, withParts)) { failures++; console.log('✗ srs: item unlocked before its parts were passed'); }

  // whole-curriculum simulation: perfect answers must reach level 60 (no dead ends)
  const sim = newState(T0);
  let t = T0;
  refresh(sim, t);
  for (let i = 0; i < 20000 && sim.level < 60; i++) {
    t += 6 * HOUR;
    for (const it of availableReviews(sim, t)) applyReview(sim, it.id, 0, t);
    refresh(sim, t);
    for (const it of availableLessons(sim)) startItem(sim, it.id, t);
  }
  eq('perfect run reaches level 60', sim.level, 60);
  // …and every item eventually becomes available
  for (let i = 0; i < 400; i++) {
    t += 24 * HOUR;
    for (const it of availableReviews(sim, t)) applyReview(sim, it.id, 0, t);
    refresh(sim, t);
    for (const it of availableLessons(sim)) startItem(sim, it.id, t);
  }
  const never = ITEMS.filter((i) => !sim.items[i.id]);
  eq('every item unlocks', never.map((i) => i.id), []);
  const days = Math.round((t - T0) / HOUR / 24);
  void days;

  // forecast buckets
  const f = forecast(sim, t, 24);
  eq('forecast has 24 buckets', f.length, 24);

  // setLevel
  const s2 = newState(T0);
  setLevel(s2, 10, T0);
  eq('skip-ahead level', s2.level, 10);
  eq('skip-ahead unlocks levels 1–10', availableLessons(s2).length, ITEMS.filter((i) => i.level <= 10).length);
  return failures;
}
