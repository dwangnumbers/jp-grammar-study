// Cloud sync: keeps your progress in a private GitHub Gist so it follows you
// across browsers and devices.
//
// You connect once in Settings with a GitHub token that can only access gists.
// The token and gist id are stored in this browser only (never exported).
//
// How it works
//   • When the app opens, comes back into focus, or every few minutes, it
//     downloads the cloud save and merges it with this device (js/merge.js).
//   • A few seconds after any progress changes, it merges again and uploads.
//   • When the tab is closed, any unsent change is uploaded immediately.

import { getState, replaceState, onStateChange } from './store.js';
import { mergeStates, isEmpty } from './merge.js';
import { refresh } from './srs.js';

const CFG_KEY = 'jp-grammar-study:sync:v1';
const FILE = 'jp-grammar-study-progress.json';
const DESCRIPTION = 'JP Grammar Study — progress (synced by the app; do not edit)';
const API = 'https://api.github.com';
const PUSH_DELAY = 2500;
const PULL_EVERY = 5 * 60 * 1000;

let cfg = load();
let status = { state: cfg ? 'idle' : 'off', message: '', at: cfg && cfg.lastSync };
let dirty = false;
let changeSeq = 0; // bumped on every local change, so a change made mid-sync isn't lost
let pushTimer = null;
let running = null;
let lastRemoteJSON = null;
const statusListeners = new Set();
const appliedListeners = new Set();

function load() { try { return JSON.parse(localStorage.getItem(CFG_KEY)) || null; } catch { return null; } }
function store() { if (cfg) localStorage.setItem(CFG_KEY, JSON.stringify(cfg)); else localStorage.removeItem(CFG_KEY); }

export const isConnected = () => !!(cfg && cfg.token && cfg.gistId);
export const syncInfo = () => (cfg ? { login: cfg.login, gistId: cfg.gistId, lastSync: cfg.lastSync } : null);
export const getStatus = () => status;
export const onStatus = (fn) => { statusListeners.add(fn); return () => statusListeners.delete(fn); };
// Called after progress from the cloud was merged into this device.
export const onApplied = (fn) => { appliedListeners.add(fn); return () => appliedListeners.delete(fn); };

function setStatus(state, message = '') {
  status = { state, message, at: cfg && cfg.lastSync };
  statusListeners.forEach((fn) => fn(status));
}

class SyncError extends Error {
  constructor(message, kind) { super(message); this.kind = kind; }
}

async function api(path, { method = 'GET', body, token = cfg && cfg.token, keepalive = false } = {}) {
  let res;
  try {
    res = await fetch(API + path, {
      method,
      keepalive,
      cache: 'no-store',
      headers: {
        Accept: 'application/vnd.github+json',
        Authorization: `Bearer ${token}`,
        'X-GitHub-Api-Version': '2022-11-28',
        ...(body ? { 'Content-Type': 'application/json' } : {}),
      },
      body: body ? JSON.stringify(body) : undefined,
    });
  } catch {
    throw new SyncError("Couldn't reach GitHub — you may be offline. Progress is still saved on this device.", 'offline');
  }
  if (res.status === 401) throw new SyncError('GitHub rejected the token (it may have expired or been revoked). Reconnect in Settings.', 'auth');
  if (res.status === 403 || res.status === 404) {
    let msg = '';
    try { msg = (await res.json()).message || ''; } catch {}
    if (/rate limit/i.test(msg)) throw new SyncError('GitHub rate limit reached — will try again later.', 'offline');
    throw new SyncError(res.status === 404
      ? 'The sync gist was not found (was it deleted?), or the token lacks gist access. Reconnect in Settings.'
      : "The token doesn't have permission to use gists. Create one with the gist scope.", 'auth');
  }
  if (!res.ok) throw new SyncError(`GitHub error ${res.status}. Will try again later.`, 'offline');
  return res.status === 204 ? null : res.json();
}

async function readGistState(gist) {
  const f = gist.files && gist.files[FILE];
  if (!f) return null;
  let text = f.content;
  if (f.truncated) {
    // large files are cut off in the API response; fetch the full raw file
    const r = await fetch(f.raw_url, { cache: 'no-store' });
    if (!r.ok) throw new SyncError("Couldn't download the cloud save.", 'offline');
    text = await r.text();
  }
  try {
    const data = JSON.parse(text);
    return data && data.state && data.state.items ? data.state : null;
  } catch {
    return null;
  }
}

const payload = (state) => ({
  files: { [FILE]: { content: JSON.stringify({ app: 'jp-grammar-study', updatedAt: new Date().toISOString(), state }) } },
});

// ---------------------------------------------------------------- connect
export async function connect(token) {
  token = token.trim();
  if (!token) throw new SyncError('Paste a GitHub token first.', 'auth');
  const user = await api('/user', { token });
  // look for an existing sync gist (e.g. made on another device)
  let gist = null;
  for (let page = 1; page <= 10 && !gist; page++) {
    const list = await api(`/gists?per_page=100&page=${page}`, { token });
    gist = list.find((g) => g.files && g.files[FILE]) || null;
    if (list.length < 100) break;
  }
  const local = getState();
  let merged;
  let mergedWithCloud = false;
  if (gist) {
    const full = await api(`/gists/${gist.id}`, { token });
    const remote = await readGistState(full);
    // first connection on this device: combine both, whatever their epochs
    merged = mergeStates(local, remote, { force: true });
    mergedWithCloud = !!remote && !isEmpty(remote);
    refresh(merged);
    await api(`/gists/${gist.id}`, { method: 'PATCH', body: payload(merged), token });
  } else {
    merged = JSON.parse(JSON.stringify(local));
    gist = await api('/gists', { method: 'POST', body: { description: DESCRIPTION, public: false, ...payload(merged) }, token });
  }
  lastRemoteJSON = JSON.stringify(merged);
  cfg = { token, gistId: gist.id, login: user.login, lastSync: Date.now() };
  store();
  replaceState(merged);
  appliedListeners.forEach((fn) => fn());
  setStatus('ok');
  return { login: user.login, gistId: gist.id, mergedWithCloud };
}

export function disconnect() {
  cfg = null;
  store();
  clearTimeout(pushTimer);
  dirty = false;
  setStatus('off');
}

// ---------------------------------------------------------------- sync
// Download, merge, and upload if anything changed. Safe to call any time.
export function syncNow() {
  if (!isConnected()) return Promise.resolve();
  if (running) return running;
  clearTimeout(pushTimer);
  setStatus('syncing');
  const seqAtStart = changeSeq;
  running = (async () => {
    try {
      const gist = await api(`/gists/${cfg.gistId}`);
      const remote = await readGistState(gist);
      const local = getState();
      const localJSON = JSON.stringify(local);
      const merged = mergeStates(local, remote);
      refresh(merged);
      const mergedJSON = JSON.stringify(merged);
      if (mergedJSON !== localJSON) {
        replaceState(merged);
        appliedListeners.forEach((fn) => fn());
      }
      if (!remote || mergedJSON !== JSON.stringify(remote)) {
        await api(`/gists/${cfg.gistId}`, { method: 'PATCH', body: payload(merged) });
      }
      lastRemoteJSON = mergedJSON;
      cfg.lastSync = Date.now();
      store();
      if (changeSeq === seqAtStart) { dirty = false; setStatus('ok'); } else { setStatus('pending'); schedulePush(); }
    } catch (e) {
      setStatus(e.kind === 'auth' ? 'error' : 'offline', e.message);
      if (e.kind !== 'auth') schedulePush(60 * 1000); // retry later
    } finally {
      running = null;
    }
  })();
  return running;
}

function schedulePush(delay = PUSH_DELAY) {
  if (!isConnected()) return;
  clearTimeout(pushTimer);
  pushTimer = setTimeout(() => { if (dirty) syncNow(); }, delay);
}

// Upload right away when the page is being closed (no time to download first;
// merging is per item, so any other device's newer work is merged back later).
function flushOnClose() {
  if (!isConnected() || !dirty) return;
  const state = getState();
  const json = JSON.stringify(state);
  if (json === lastRemoteJSON) return;
  const body = payload(state);
  // keepalive requests are limited to 64 KB
  if (JSON.stringify(body).length < 60000) {
    api(`/gists/${cfg.gistId}`, { method: 'PATCH', body, keepalive: true }).catch(() => {});
  } else {
    syncNow();
  }
}

export function initSync() {
  onStateChange(() => {
    if (!isConnected()) return;
    dirty = true;
    changeSeq++;
    setStatus('pending');
    schedulePush();
  });
  setInterval(() => { if (isConnected() && document.visibilityState === 'visible') syncNow(); }, PULL_EVERY);
  document.addEventListener('visibilitychange', () => {
    if (!isConnected()) return;
    if (document.visibilityState === 'visible') syncNow();
    else flushOnClose();
  });
  window.addEventListener('pagehide', flushOnClose);
  window.addEventListener('online', () => syncNow());
  syncNow();
}
