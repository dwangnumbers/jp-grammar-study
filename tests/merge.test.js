import { mergeStates, isEmpty } from '../js/merge.js';

export function runMergeTests() {
  let failures = 0;
  const ok = (name, cond) => { if (!cond) { failures++; console.log(`✗ merge: ${name}`); } };
  const item = (stage, t, extra = {}) => ({ stage, t, correct: 0, incorrect: 0, streak: 0, maxStreak: 0, unlockedAt: 1, ...extra });
  const base = (epoch, items, extra = {}) => ({ version: 1, createdAt: epoch, epoch, level: 1, levels: { 1: { unlockedAt: epoch } }, items, log: [], ...extra });

  // two devices, same epoch: union, newest copy of each item wins
  const a = base(100, { wa: item(3, 500), ka: item(1, 200) }, { log: [{ id: 'wa', at: 500, from: 2, to: 3, wrong: 0 }] });
  const b = base(100, { wa: item(2, 400), ka: item(2, 300), no: item(1, 350) }, { log: [{ id: 'ka', at: 300, from: 1, to: 2, wrong: 0 }, { id: 'wa', at: 500, from: 2, to: 3, wrong: 0 }] });
  const m = mergeStates(a, b);
  ok('newer item wins (local)', m.items.wa.stage === 3);
  ok('newer item wins (remote)', m.items.ka.stage === 2);
  ok('items only on one side are kept', m.items.no && m.items.no.stage === 1);
  ok('logs are merged without duplicates, in order', m.log.length === 2 && m.log[0].at === 300);
  ok('merge is symmetric', JSON.stringify(mergeStates(b, a).items) === JSON.stringify(m.items));

  // a reset (newer epoch) replaces older progress …
  const reset = base(900, { wa: item(0, 900) });
  const old = base(100, { wa: item(5, 800), ka: item(4, 800) }, { log: [{ id: 'wa', at: 800 }] });
  ok('a reset (newer epoch, nothing learned) replaces old progress', !mergeStates(reset, old).items.ka && !mergeStates(old, reset).items.ka);
  ok('a new device (empty, newer epoch) is merged in on first connect', mergeStates(reset, old, { force: true }).items.ka.stage === 4);
  const reset2 = base(900, { wa: item(1, 950) });
  ok('newer epoch wins over older progress', !mergeStates(old, reset2).items.ka && mergeStates(old, reset2).epoch === 900);
  ok('… in either order', !mergeStates(reset2, old).items.ka);
  // … unless forced (first connection of a device)
  const forced = mergeStates(reset2, old, { force: true });
  ok('forced merge combines different epochs, keeping the cloud epoch', forced.items.ka && forced.items.wa.stage === 1 && forced.epoch === 100);
  // a fresh device's just-unlocked items (newer timestamps) never beat studied ones
  const fresh = base(2000, { wa: item(0, 2000) });
  const studied = base(100, { wa: item(1, 500, { startedAt: 500 }) });
  ok('unlocked-only item never replaces a studied one', mergeStates(fresh, studied, { force: true }).items.wa.stage === 1);

  // missing sides
  ok('no remote keeps local', mergeStates(a, null).items.wa.stage === 3);
  ok('isEmpty', isEmpty(base(1, { wa: item(0, 1) })) && !isEmpty(a));

  // levels: max level, earliest pass time
  const la = base(100, { wa: item(5, 10) }, { level: 3, levels: { 1: { unlockedAt: 100, passedAt: 300 }, 2: { unlockedAt: 300 }, 3: { unlockedAt: 600 } } });
  const lb = base(100, { wa: item(5, 10) }, { level: 2, levels: { 1: { unlockedAt: 100, passedAt: 250 }, 2: { unlockedAt: 250 } } });
  const lm = mergeStates(la, lb);
  ok('highest level kept', lm.level === 3 && lm.levels[3]);
  ok('earliest pass time kept', lm.levels[1].passedAt === 250);
  return failures;
}
