// Tests for the review-context rotation (js/contexts.js).
import { ITEMS } from '../js/data/index.js';
import { contextOrder, nextContext } from '../js/contexts.js';

export function runContextTests() {
  let failures = 0;
  const fail = (m) => { failures++; console.log('✗ ' + m); };
  for (const it of ITEMS) {
    const n = it.prompts.length;
    for (let c = 0; c < 3; c++) {
      const o = contextOrder(it.id, n, c);
      if (new Set(o).size !== n || o.some((i) => i < 0 || i >= n)) fail(`${it.id}: cycle ${c} is not a permutation`);
    }
    const state = { items: { [it.id]: { stage: 1 } } };
    const seen = [];
    for (let k = 0; k < n * 6; k++) seen.push(it.prompts.indexOf(nextContext(state, it)));
    if (seen.includes(-1)) fail(`${it.id}: rotation returned an unknown context`);
    if (new Set(seen.slice(0, n)).size !== n) fail(`${it.id}: the first ${n} reviews repeat a context`);
    for (let k = 1; k < seen.length; k++) if (seen[k] === seen[k - 1]) { fail(`${it.id}: same context twice in a row`); break; }
    for (let k = 0; k + n <= seen.length; k++) {
      // any n consecutive presentations show n different contexts
      if (new Set(seen.slice(k, k + n)).size !== n) { fail(`${it.id}: a context repeats within ${n} reviews`); break; }
    }
  }
  if (!failures) console.log(`context rotation: ${ITEMS.length} items checked`);
  return failures;
}
