import { esc } from '../dom.js';
import { getState, getSettings, saveSettings, save, exportData, importData, resetProgress } from '../store.js';
import { setLevel, refresh } from '../srs.js';
import { MAX_LEVEL, ITEMS } from '../data/index.js';
import { AI_MODELS, testKey } from '../ai.js';
import { toast } from './common.js';
import { connect, disconnect, syncNow, isConnected, syncInfo, getStatus, onStatus } from '../sync.js';
import { fmtDate } from '../dom.js';

let offPrevStatus = null;
const TOKEN_URL = 'https://github.com/settings/tokens/new?scopes=gist&description=JP%20Grammar%20Study%20sync';

function syncCardHTML() {
  if (!isConnected()) {
    return `<div class="card" id="sync-card"><h2>Cloud sync <span class="right muted">GitHub</span></h2>
      <p class="muted small">Progress is saved in this browser only. Connect your GitHub account to also save it to a private Gist, so it follows you to any browser or device and survives clearing your browser data. Changes from different devices are merged item by item.</p>
      <ol class="muted small steps">
        <li><a href="${TOKEN_URL}" target="_blank" rel="noopener">Create a GitHub token</a> with only the <b>gist</b> scope ticked (the link pre-fills it). Choose "No expiration", or a date you'll remember to renew.</li>
        <li>Paste it below and press Connect. Do the same on each device you use.</li>
      </ol>
      <div class="setting"><div class="label"><b>GitHub token</b><span>Stored only in this browser and sent only to api.github.com. It can only read and write your gists.</span></div>
        <div><input type="password" id="sync-token" placeholder="ghp_…" autocomplete="off"> <button class="btn sm primary" id="sync-connect">Connect</button></div></div>
      <p class="small" id="sync-msg"></p>
    </div>`;
  }
  const info = syncInfo();
  return `<div class="card" id="sync-card"><h2>Cloud sync <span class="right muted">GitHub</span></h2>
    <div class="setting"><div class="label"><b>Connected as @${esc(info.login)}</b>
      <span>Progress is saved to a <a href="https://gist.github.com/${esc(info.login)}/${esc(info.gistId)}" target="_blank" rel="noopener">private gist</a> and synced whenever it changes, when the app opens, and every few minutes.</span></div>
      <div><button class="btn sm" id="sync-now">Sync now</button> <button class="btn sm danger" id="sync-off">Disconnect</button></div></div>
    <p class="small" id="sync-msg"></p>
  </div>`;
}

function syncStatusText() {
  const st = getStatus();
  const info = syncInfo();
  const last = info && info.lastSync ? `Last synced ${fmtDate(info.lastSync)}.` : '';
  const text = {
    ok: `<span style="color:var(--correct)">✓ Synced.</span> ${last}`,
    pending: 'Saving your latest progress…',
    syncing: 'Syncing…',
    offline: `<span style="color:var(--warn)">⚠ ${esc(st.message)}</span> ${last}`,
    error: `<span style="color:var(--incorrect)">✗ ${esc(st.message)}</span>`,
    idle: last,
  }[st.state];
  return text || '';
}

const sw = (id, on) => `<label class="switch"><input type="checkbox" id="${id}" ${on ? 'checked' : ''}><span></span></label>`;

export function renderSettings(root) {
  const s = getSettings();
  const state = getState();
  const known = AI_MODELS.some((m) => m.id === s.ai.model);
  root.innerHTML = `
    <h1 class="page-title">Settings <span class="jp">設定</span></h1>

    ${syncCardHTML()}

    <div class="card"><h2>Lessons & reviews</h2>
      <div class="setting"><div class="label"><b>Lesson batch size</b><span>How many new items to learn per lesson session (WaniKani default: 5).</span></div>
        <input type="number" id="batch" min="1" max="20" value="${s.lessonBatchSize}" style="min-width:90px"></div>
      <div class="setting"><div class="label"><b>Review order</b><span>Random, or lowest level first.</span></div>
        <select id="order"><option value="random" ${s.reviewOrder === 'random' ? 'selected' : ''}>Random</option><option value="lowest-level" ${s.reviewOrder === 'lowest-level' ? 'selected' : ''}>Lowest level first</option></select></div>
      <div class="setting"><div class="label"><b>Romaji → kana input</b><span>Type romaji and have it converted to hiragana (uppercase for katakana), like WaniKani's reading field. Leave off if you use a Japanese keyboard/IME so you can type kanji. You can also toggle it with the あ button during reviews.</span></div>${sw('romaji', s.romajiInput)}</div>
      <div class="setting"><div class="label"><b>Accept lesson examples as answers</b><span>Off by default: you must write your own sentence, not copy one from the lesson.</span></div>${sw('copies', s.allowExampleCopies)}</div>
      <div class="setting"><div class="label"><b>Speak correct answers</b><span>Read your sentence aloud with the browser's Japanese voice after a correct answer.</span></div>${sw('autoplay', s.autoplayAudio)}</div>
    </div>

    <div class="card"><h2>Display</h2>
      <div class="setting"><div class="label"><b>Furigana</b><span>Show readings above kanji in example sentences (generated automatically).</span></div>${sw('furigana', s.furigana)}</div>
      <div class="setting"><div class="label"><b>Highlight grammar</b><span>Underline the grammar point inside example sentences.</span></div>${sw('highlight', s.highlightGrammar)}</div>
    </div>

    <div class="card"><h2>AI grading <span class="right muted">optional</span></h2>
      <p class="muted small">The built-in checker confirms you used the grammar point with the right kind of word and catches common conjugation mistakes, but it can't fully judge whether a sentence is natural Japanese. Turn this on to have Claude grade every answer like a teacher, with an explanation and a corrected sentence when you're wrong. Uses your own <a href="https://console.anthropic.com/" target="_blank" rel="noopener">Anthropic API key</a>, stored only in this browser and sent only to api.anthropic.com.</p>
      <div class="setting"><div class="label"><b>Enable AI grading</b></div>${sw('ai-on', s.ai.enabled)}</div>
      <div class="setting"><div class="label"><b>API key</b><span>Starts with sk-ant-…</span></div><input type="password" id="ai-key" value="${esc(s.ai.apiKey)}" placeholder="sk-ant-…" autocomplete="off"></div>
      <div class="setting"><div class="label"><b>Model</b></div>
        <div><select id="ai-model">${AI_MODELS.map((m) => `<option value="${m.id}" ${m.id === s.ai.model ? 'selected' : ''}>${esc(m.label)}</option>`).join('')}<option value="__custom" ${known ? '' : 'selected'}>Custom model id…</option></select>
        <input type="text" id="ai-custom" class="${known ? 'hidden' : ''}" value="${known ? '' : esc(s.ai.model)}" placeholder="model id" style="margin-top:6px;display:block"></div></div>
      <div class="setting"><div class="label"><b>Test connection</b><span id="ai-test-out"></span></div><button class="btn sm" id="ai-test">Test</button></div>
    </div>

    <div class="card"><h2>Progress</h2>
      <div class="setting"><div class="label"><b>Current level</b><span>You're on level ${state.level} of ${MAX_LEVEL}. Already know some grammar? Jump ahead — every item up to that level becomes available in lessons. Moving down clears progress on higher levels.</span></div>
        <div><input type="number" id="level" min="1" max="${MAX_LEVEL}" value="${state.level}" style="min-width:90px"> <button class="btn sm" id="set-level">Set level</button></div></div>
      <div class="setting"><div class="label"><b>Back up progress</b><span>Progress is saved in this browser. Export a backup file to keep it safe or move to another device. (Your API key is never exported.)</span></div>
        <div><button class="btn sm" id="export">Export</button> <label class="btn sm">Import<input type="file" id="import" accept="application/json,.json" class="hidden"></label></div></div>
      <div class="setting"><div class="label"><b>Reset all progress</b><span>Start over from level 1. This can't be undone.</span></div><button class="btn sm danger" id="reset">Reset</button></div>
    </div>
    <p class="muted small center">${ITEMS.length} grammar items across ${MAX_LEVEL} levels.</p>`;

  const $ = (id) => root.querySelector('#' + id);

  // ---- cloud sync
  const msg = () => root.querySelector('#sync-msg');
  const showStatus = () => { if (msg() && isConnected()) msg().innerHTML = syncStatusText(); };
  showStatus();
  if (offPrevStatus) offPrevStatus();
  const offStatus = onStatus(showStatus);
  offPrevStatus = offStatus;
  if ($('sync-connect')) {
    const go = async () => {
      const btn = $('sync-connect');
      btn.disabled = true;
      msg().textContent = 'Connecting…';
      try {
        const r = await connect($('sync-token').value);
        toast(r.mergedWithCloud ? `Connected as @${r.login} — merged with your cloud save.` : `Connected as @${r.login} — progress saved to the cloud.`, 4000);
        renderSettings(root);
      } catch (e) {
        msg().innerHTML = `<span style="color:var(--incorrect)">✗ ${esc(e.message)}</span>`;
        btn.disabled = false;
      }
    };
    $('sync-connect').addEventListener('click', go);
    $('sync-token').addEventListener('keydown', (e) => { if (e.key === 'Enter') go(); });
  }
  if ($('sync-now')) $('sync-now').addEventListener('click', () => syncNow());
  if ($('sync-off')) $('sync-off').addEventListener('click', () => {
    if (!confirm('Disconnect cloud sync on this device? Your progress stays here and in the gist; this device just stops syncing.')) return;
    disconnect();
    renderSettings(root);
  });
  const bindSwitch = (id, key) => $(id).addEventListener('change', (e) => saveSettings({ [key]: e.target.checked }));
  $('batch').addEventListener('change', (e) => saveSettings({ lessonBatchSize: Math.max(1, Math.min(20, +e.target.value || 5)) }));
  $('order').addEventListener('change', (e) => saveSettings({ reviewOrder: e.target.value }));
  bindSwitch('romaji', 'romajiInput');
  bindSwitch('copies', 'allowExampleCopies');
  bindSwitch('autoplay', 'autoplayAudio');
  bindSwitch('furigana', 'furigana');
  bindSwitch('highlight', 'highlightGrammar');
  $('ai-on').addEventListener('change', (e) => saveSettings({ ai: { enabled: e.target.checked } }));
  $('ai-key').addEventListener('change', (e) => saveSettings({ ai: { apiKey: e.target.value.trim() } }));
  const modelVal = () => ($('ai-model').value === '__custom' ? $('ai-custom').value.trim() : $('ai-model').value);
  $('ai-model').addEventListener('change', () => {
    $('ai-custom').classList.toggle('hidden', $('ai-model').value !== '__custom');
    if (modelVal()) saveSettings({ ai: { model: modelVal() } });
  });
  $('ai-custom').addEventListener('change', () => { if (modelVal()) saveSettings({ ai: { model: modelVal() } }); });
  $('ai-test').addEventListener('click', async () => {
    const out = $('ai-test-out');
    const key = $('ai-key').value.trim();
    if (!key) { out.textContent = 'Enter an API key first.'; return; }
    out.textContent = 'Testing…';
    try {
      const r = await testKey(key, modelVal());
      out.innerHTML = `<span style="color:var(--correct)">✓ Working.</span> ${esc(r.feedback)}`;
    } catch (e) { out.innerHTML = `<span style="color:var(--incorrect)">✗ ${esc(e.message)}</span>`; }
  });
  $('set-level').addEventListener('click', () => {
    const lvl = Math.max(1, Math.min(MAX_LEVEL, +$('level').value || 1));
    if (lvl === state.level) return;
    const msg = lvl < state.level
      ? `Move down to level ${lvl}? Progress on levels ${lvl + 1}–${state.level} will be cleared.`
      : `Jump to level ${lvl}? Every item up to level ${lvl} will be added to your lessons.`;
    if (!confirm(msg)) return;
    setLevel(state, lvl);
    refresh(state);
    save();
    toast(`You're now on level ${lvl}.`);
    renderSettings(root);
  });
  $('export').addEventListener('click', () => {
    const blob = new Blob([exportData()], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `jp-grammar-study-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    setTimeout(() => URL.revokeObjectURL(a.href), 1000);
  });
  $('import').addEventListener('change', async (e) => {
    const f = e.target.files[0];
    if (!f) return;
    try {
      importData(await f.text());
      toast('Progress imported.');
      renderSettings(root);
    } catch (err) { alert(err.message); }
  });
  $('reset').addEventListener('click', () => {
    if (!confirm(`Reset ALL progress and start again from level 1?${isConnected() ? ' This also resets your cloud save and every synced device.' : ''} This cannot be undone.`)) return;
    if (!confirm('Are you absolutely sure?')) return;
    resetProgress();
    toast('Progress reset.');
    renderSettings(root);
  });
  return offStatus;
}
