// Picks the review context to show for an item.
//
// Every item has a pool of contexts (js/data/prompts*.js + js/data/more/*.js).
// Each time an item is shown — lesson quiz, review, a retry after a wrong
// answer, or extra study — the next context in the item's rotation is used,
// so no context repeats until all of them have been seen. The rotation is a
// fixed shuffle that differs per item.

function hash(str) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) { h ^= str.charCodeAt(i); h = Math.imul(h, 16777619); }
  return h >>> 0;
}

export function contextOrder(id, n, cycle = 0) {
  let seed = hash(`${id}#${cycle}`) || 1;
  const rand = () => { seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0; return seed / 4294967296; };
  const order = [...Array(n).keys()];
  for (let i = n - 1; i > 0; i--) { const j = Math.floor(rand() * (i + 1)); [order[i], order[j]] = [order[j], order[i]]; }
  return order;
}

// Returns the next context for `item` and advances its rotation counter
// (stored with the item's progress, so it syncs across devices).
export function nextContext(state, item) {
  const list = item.prompts || [];
  if (!list.length) return null;
  const n = list.length;
  const p = state && state.items[item.id];
  if (!p) return list[Math.floor(Math.random() * n)];
  const ci = p.ci || 0;
  p.ci = ci + 1;
  // one fixed shuffled order per item, walked round and round: a context
  // comes back only after every other context in the pool has been shown
  return list[contextOrder(item.id, n)[ci % n]];
}
