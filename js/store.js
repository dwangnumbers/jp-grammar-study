// Persistence: progress and settings live in localStorage on this device.
// Cloud sync (js/sync.js) keeps progress in a private GitHub Gist as well,
// and Settings → Export makes a backup file.
import { newState, refresh } from './srs.js';
import { BY_ID } from './data/index.js';

const STATE_KEY = 'jp-grammar-study:state:v1';
const SETTINGS_KEY = 'jp-grammar-study:settings:v1';

export const DEFAULT_SETTINGS = {
  lessonBatchSize: 5,
  romajiInput: false, // convert romaji → kana while typing answers
  furigana: true, // show readings above kanji in example sentences
  highlightGrammar: true,
  autoplayAudio: false, // speak the example sentence after a correct answer
  allowExampleCopies: false, // accept a lesson's example sentence as an answer
  reviewOrder: 'random', // random | lowest-level
  ai: { enabled: false, apiKey: '', model: 'claude-sonnet-5-5' },
};

let state = null;
let settings = null;
const listeners = new Set();
const stateListeners = new Set(); // called only when progress changes

function safeParse(s) { try { return JSON.parse(s); } catch { return null; } }

export function getState() {
  if (!state) {
    state = safeParse(localStorage.getItem(STATE_KEY)) || newState();
    // drop progress for items that no longer exist in the curriculum
    for (const id of Object.keys(state.items)) if (!BY_ID.has(id)) delete state.items[id];
    refresh(state);
    save();
  }
  return state;
}

export function save({ fromSync = false } = {}) {
  try { localStorage.setItem(STATE_KEY, JSON.stringify(state)); } catch (e) { console.error('Could not save progress', e); }
  listeners.forEach((fn) => fn());
  if (!fromSync) stateListeners.forEach((fn) => fn());
}

export function onChange(fn) { listeners.add(fn); return () => listeners.delete(fn); }
export function onStateChange(fn) { stateListeners.add(fn); return () => stateListeners.delete(fn); }

// Used by cloud sync after merging in progress from another device.
export function replaceState(next) {
  state = next;
  for (const id of Object.keys(state.items)) if (!BY_ID.has(id)) delete state.items[id];
  refresh(state);
  save({ fromSync: true });
}

export function getSettings() {
  if (!settings) {
    const s = safeParse(localStorage.getItem(SETTINGS_KEY)) || {};
    settings = { ...DEFAULT_SETTINGS, ...s, ai: { ...DEFAULT_SETTINGS.ai, ...(s.ai || {}) } };
  }
  return settings;
}

export function saveSettings(patch) {
  const cur = getSettings();
  settings = { ...cur, ...patch, ai: { ...cur.ai, ...(patch.ai || {}) } };
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  listeners.forEach((fn) => fn());
}

export function exportData() {
  const { ai, ...rest } = getSettings();
  return JSON.stringify({ app: 'jp-grammar-study', exportedAt: new Date().toISOString(), state: getState(), settings: { ...rest, ai: { enabled: ai.enabled, model: ai.model } } }, null, 1);
}

export function importData(text) {
  const data = JSON.parse(text);
  if (!data || data.app !== 'jp-grammar-study' || !data.state || !data.state.items) throw new Error('This is not a JP Grammar Study backup file.');
  state = data.state;
  state.epoch = Date.now(); // the imported progress replaces what's in the cloud
  refresh(state);
  save();
  if (data.settings) saveSettings({ ...data.settings, ai: { ...data.settings.ai, apiKey: getSettings().ai.apiKey } });
}

export function resetProgress() {
  state = newState();
  refresh(state);
  save();
}
