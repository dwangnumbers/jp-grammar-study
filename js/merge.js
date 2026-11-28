// Merging two copies of the progress state (this device and the cloud save).
//
// Same epoch: merge item by item, keeping whichever copy of an item changed
// most recently, so reviews done on two devices are never lost.
// Different epochs: progress was reset or rewritten on one side (reset, level
// change, import), so the newer epoch replaces the older one entirely.
// (A device's first connection uses `force`, so a brand-new device's empty
// state is merged in rather than replacing the cloud save.)

const LOG_CAP = 5000;

export const epochOf = (s) => s.epoch || s.createdAt || 0;

export function isEmpty(s) {
  return !s || (!Object.values(s.items || {}).some((p) => p.stage >= 1) && !(s.log && s.log.length));
}

// When an item was last changed. An item that is merely unlocked (never
// studied, no note) counts as oldest, so it never replaces real progress.
const stamp = (p) => {
  if (p.stage === 0 && !p.startedAt && !p.note) return 0;
  return p.t || Math.max(p.lastReviewedAt || 0, p.startedAt || 0, p.burnedAt || 0, p.unlockedAt || 0);
};

const clone = (s) => JSON.parse(JSON.stringify(s));

// `force`: merge item by item even if the epochs differ (used when a device
// first connects, so its progress is combined with the cloud save).
export function mergeStates(local, remote, { force = false } = {}) {
  if (!remote) return clone(local);
  if (!local) return clone(remote);
  const el = epochOf(local);
  const er = epochOf(remote);
  if (el !== er && !force) return clone(el > er ? local : remote);

  const out = clone(local);
  // a newly connected device joins the cloud save's epoch, so other devices
  // keep merging with it item by item
  out.epoch = force ? er : Math.max(el, er);
  out.createdAt = Math.min(local.createdAt || Infinity, remote.createdAt || Infinity);
  out.level = Math.max(local.level || 1, remote.level || 1);

  out.items = {};
  for (const id of new Set([...Object.keys(local.items || {}), ...Object.keys(remote.items || {})])) {
    const a = local.items[id];
    const b = remote.items && remote.items[id];
    if (!a || !b) { out.items[id] = clone(a || b); continue; }
    const sa = stamp(a);
    const sb = stamp(b);
    out.items[id] = clone(sb > sa || (sb === sa && b.stage > a.stage) ? b : a);
  }

  out.levels = {};
  for (const l of new Set([...Object.keys(local.levels || {}), ...Object.keys(remote.levels || {})])) {
    const a = (local.levels || {})[l] || {};
    const b = (remote.levels || {})[l] || {};
    const pick = (x, y) => (x && y ? Math.min(x, y) : x || y);
    const lv = { unlockedAt: pick(a.unlockedAt, b.unlockedAt) };
    const passed = pick(a.passedAt, b.passedAt);
    if (passed) lv.passedAt = passed;
    out.levels[l] = lv;
  }

  const seen = new Set();
  out.log = [...(local.log || []), ...(remote.log || [])]
    .filter((e) => { const k = `${e.id}|${e.at}`; if (seen.has(k)) return false; seen.add(k); return true; })
    .sort((x, y) => x.at - y.at)
    .slice(-LOG_CAP);
  return out;
}
