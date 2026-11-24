// Lessons, lesson quizzes, reviews and extra study — WaniKani's session flow.
import { esc, shuffle } from '../dom.js';
import { getState, getSettings, saveSettings, save } from '../store.js';
import { BY_ID, TYPES, ITEMS, itemsAtLevel } from '../data/index.js';
import { availableLessons, availableReviews, startItem, applyReview, refresh, SRS_STAGES, BURNED } from '../srs.js';
import { loadChecker, getChecker } from '../tokenizer.js';
import { gradeWithAI } from '../ai.js';
import { speak, canSpeak } from '../speech.js';
import { detailSections, bindSpeak, tile, STAGE_COLORS, TYPE_COLORS, renderJa, partsHTML, examplesHTML } from './common.js';
import { recentMistakes } from './dashboard.js';

const TRIVIAL_SHAKES = new Set(['empty', 'latin', 'notjp', 'copy', 'bare', 'short', 'word', 'class']);

function enterSession() { document.body.classList.add('in-session'); window.scrollTo(0, 0); }
export function leaveSession() { document.body.classList.remove('in-session'); }

// ---------------------------------------------------------------- lessons
export function renderLessons(root) {
  const state = getState();
  const settings = getSettings();
  const batch = availableLessons(state).slice(0, Math.max(1, settings.lessonBatchSize | 0));
  if (!batch.length) {
    root.innerHTML = `<div class="empty-state"><div class="big">学</div><p>No lessons available right now.</p>
      <p class="muted">New grammar unlocks when the items it is built from reach Guru, and when you level up.</p>
      <p><a class="btn" href="#/">Back to dashboard</a></p></div>`;
    return null;
  }
  enterSession();
  loadChecker();
  // WaniKani-style: every section of the item is on one page as a dropdown,
  // and Next moves straight to the next item. Collapsed sections stay collapsed.
  const SECTIONS_KEY = 'jp-grammar-study:lesson-closed';
  let closed;
  try { closed = new Set(JSON.parse(localStorage.getItem(SECTIONS_KEY)) || []); } catch { closed = new Set(); }
  let idx = 0;

  const draw = () => {
    const it = batch[idx];
    const typeBlurb = it.type === 'particle' ? 'A particle — one of the building blocks of Japanese sentences.'
      : it.type === 'conjugation' ? 'A conjugation — a form built on verb, adjective or noun stems.'
        : 'A phrase — a grammar pattern combining particles and conjugations.';
    const sections = [
      { key: 'grammar', label: 'Grammar', html: `
        <p class="explain">${typeBlurb}</p>
        <div class="structure" lang="ja">${esc(it.structure)}</div>
        <h4>Built from</h4>${partsHTML(state, it)}` },
      { key: 'meaning', label: 'Meaning', html: `
        <dl class="kv"><dt>Primary</dt><dd><b>${esc(it.meaning)}</b></dd>
        ${it.also.length ? `<dt>Also</dt><dd>${it.also.map(esc).join(', ')}</dd>` : ''}</dl>
        <p class="explain">${esc(it.explain)}</p>` },
      { key: 'pronunciation', label: 'Pronunciation', html: `
        <div class="row" style="align-items:center;gap:12px">
          ${canSpeak() ? `<button class="speak" data-say="${esc(it.reading)}" title="Listen" aria-label="Listen" style="margin:0">🔊</button>` : ''}
          <div><div class="reading-big" lang="ja">${esc(it.reading)}</div><div class="muted">${esc(it.romaji)}</div></div>
        </div>` },
      { key: 'examples', label: 'Examples', html: examplesHTML(it) },
    ];
    const last = idx === batch.length - 1;
    root.innerHTML = `
      <div class="session">
        <div class="session-top"><a class="home" href="#/" title="Dashboard">⌂</a><span>Lessons</span>
          <span class="stats"><span><b>${availableLessons(state).length}</b> in queue</span></span></div>
        <div class="q-banner ${it.type}"><span class="level-tag">Level ${it.level} · ${TYPES[it.type].label}</span>
          <div class="grammar" lang="ja">${esc(it.grammar)}</div>${it.variant ? `<div class="variant-tag">${esc(it.variant)}</div>` : ''}<div class="lesson-meaning">${esc(it.meaning)}</div></div>
        <div class="lesson-body" style="--tabc:${TYPE_COLORS[it.type]}">
          ${sections.map((sec) => `
            <details class="dropdown" data-sec="${sec.key}" ${closed.has(sec.key) ? '' : 'open'}>
              <summary>${sec.label}</summary>
              <div class="dropdown-body">${sec.html}</div>
            </details>`).join('')}
        </div>
        <div class="lesson-footer">
          <button class="btn" id="prev" ${idx === 0 ? 'disabled' : ''}>← Back</button>
          <div class="lesson-chips">${batch.map((b, i) => `<button class="${b.type} ${i === idx ? 'active' : ''}" data-item="${i}" lang="ja">${esc(b.grammar)}${b.variant ? `<small>${esc(b.variant.split(/[ ,+]/)[0])}</small>` : ''}</button>`).join('')}</div>
          <button class="btn ${last ? 'primary' : ''}" id="next">${last ? 'Start quiz →' : 'Next →'}</button>
        </div>
      </div>`;
    bindSpeak(root);
    root.querySelectorAll('details.dropdown').forEach((d) => d.addEventListener('toggle', () => {
      if (d.open) closed.delete(d.dataset.sec); else closed.add(d.dataset.sec);
      try { localStorage.setItem(SECTIONS_KEY, JSON.stringify([...closed])); } catch {}
    }));
    root.querySelectorAll('[data-item]').forEach((b) => b.addEventListener('click', () => { idx = +b.dataset.item; draw(); }));
    root.querySelector('#prev').addEventListener('click', back);
    root.querySelector('#next').addEventListener('click', forward);
  };
  const forward = () => {
    if (idx < batch.length - 1) idx++;
    else { teardown(); cleanup = runQuiz(root, batch); return; }
    draw();
    window.scrollTo(0, 0);
  };
  const back = () => {
    if (idx > 0) { idx--; draw(); window.scrollTo(0, 0); }
  };
  const onKey = (e) => {
    if (e.target.matches('input, textarea')) return;
    if (e.target.matches('summary') && (e.key === 'Enter' || e.key === ' ')) return; // toggles the dropdown
    if (e.key === 'ArrowRight' || e.key === 'Enter') { e.preventDefault(); forward(); }
    else if (e.key === 'ArrowLeft' || e.key === 'Backspace') { e.preventDefault(); back(); }
  };
  document.addEventListener('keydown', onKey);
  const teardown = () => document.removeEventListener('keydown', onKey);
  let cleanup = teardown;
  draw();
  return () => cleanup();
}

function runQuiz(root, batch) {
  return runSession(root, {
    mode: 'quiz', title: 'Lesson quiz', ids: batch.map((b) => b.id),
    onComplete: (id) => { const st = getState(); startItem(st, id); return null; },
  });
}

// ---------------------------------------------------------------- reviews
export function renderReviews(root) {
  const state = getState();
  const settings = getSettings();
  let items = availableReviews(state);
  if (!items.length) {
    root.innerHTML = `<div class="empty-state"><div class="big">復</div><p>No reviews right now.</p><p><a class="btn" href="#/">Back to dashboard</a></p></div>`;
    return null;
  }
  items = settings.reviewOrder === 'lowest-level'
    ? shuffle(items).sort((a, b) => a.level - b.level)
    : shuffle(items);
  return runSession(root, {
    mode: 'review', title: 'Reviews', ids: items.map((i) => i.id), keepOrder: true,
    onComplete: (id, wrong) => applyReview(getState(), id, wrong),
  });
}

// ---------------------------------------------------------------- extra study
export function renderPractice(root, kind) {
  const state = getState();
  const started = (it) => state.items[it.id] && state.items[it.id].stage >= 1;
  let ids = [];
  let title = 'Extra study';
  if (kind === 'recent') {
    ids = ITEMS.filter((it) => state.items[it.id] && state.items[it.id].startedAt)
      .sort((a, b) => state.items[b.id].startedAt - state.items[a.id].startedAt).slice(0, 20).map((i) => i.id);
    title = 'Extra study: recent lessons';
  } else if (kind === 'mistakes') { ids = recentMistakes(state); title = 'Extra study: recent mistakes'; }
  else if (kind === 'level') { ids = itemsAtLevel(state.level).filter(started).map((i) => i.id); title = `Extra study: level ${state.level}`; }
  else if (kind === 'burned') { ids = shuffle(ITEMS.filter((it) => state.items[it.id] && state.items[it.id].stage >= BURNED).map((i) => i.id)).slice(0, 20); title = 'Extra study: burned items'; }
  if (!ids.length) {
    root.innerHTML = `<div class="empty-state"><div class="big">習</div><p>Nothing to practice here yet.</p><p><a class="btn" href="#/">Back to dashboard</a></p></div>`;
    return null;
  }
  return runSession(root, { mode: 'practice', title, ids, onComplete: () => null });
}

// ---------------------------------------------------------------- generic answering session
function runSession(root, { mode, title, ids, keepOrder, onComplete }) {
  enterSession();
  const settings = getSettings();
  const queue = keepOrder ? [...ids] : shuffle([...ids]);
  const total = ids.length;
  const wrong = new Map();
  const results = []; // {id, wrong, change}
  const levelUps = [];
  let answers = 0;
  let correctAnswers = 0;
  let current = null;
  let phase = 'answer'; // answer | grading | correct | incorrect
  let lastResult = null;
  let showInfo = false;
  let wrapUp = false;
  let aborter = null;

  const checkerReady = () => !!getChecker();
  loadChecker().then(() => { if (current && phase === 'answer') drawStatus(); }).catch(() => drawStatus('error'));

  root.innerHTML = `
    <div class="session">
      <div class="session-top">
        <a class="home" href="#/" id="home" title="Dashboard">⌂</a><span>${esc(title)}</span>
        <span class="stats">
          <span title="Answered correctly">✓ <b id="s-pct">100%</b></span>
          <span title="Completed">✔ <b id="s-done">0</b></span>
          <span title="Remaining">◷ <b id="s-left">${total}</b></span>
          ${mode === 'review' ? '<button class="btn sm wrap" id="wrap">Wrap up</button>' : ''}
        </span>
      </div>
      <div class="session-progress"><span id="s-bar" style="width:0"></span></div>
      <div class="q-banner" id="banner"><span class="level-tag" id="lvl"></span><div class="grammar" id="grammar" lang="ja"></div><div class="variant-tag" id="variant"></div></div>
      <div class="q-prompt" id="prompt"></div>
      <div class="q-context" id="context"></div>
      <div class="q-answer">
        <div class="answer-box" id="abox">
          <button class="ime-toggle" id="ime" title="Romaji → kana input (toggle)">あ</button>
          <input id="answer" type="text" lang="ja" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="Write a sentence using this grammar…">
          <button class="submit" id="submit" title="Submit (Enter)">➜</button>
        </div>
        <div class="feedback" id="feedback"></div>
        <div class="status-line" id="status"></div>
        <div class="q-actions hidden" id="actions">
          <button class="btn" id="info">Item info <kbd>F</kbd></button>
          <button class="btn hidden" id="override" title="Use if the checker got it wrong">My answer was right</button>
          <button class="btn primary" id="next">Next <kbd>Enter</kbd></button>
        </div>
      </div>
      <div class="q-info hidden" id="qinfo"></div>
    </div>`;
  const $ = (id) => root.querySelector('#' + id);
  const input = $('answer');
  const box = $('abox');

  // romaji → kana
  let imeOn = false;
  const setIme = (on) => {
    imeOn = on && !!window.wanakana;
    $('ime').classList.toggle('on', imeOn);
    $('ime').title = imeOn ? 'Romaji → kana: ON (click to use your own keyboard)' : 'Romaji → kana: OFF (click to type romaji)';
    try { if (imeOn) window.wanakana.bind(input, { IMEMode: true }); else window.wanakana && window.wanakana.unbind(input); } catch {}
  };
  const initIme = () => setIme(settings.romajiInput);
  if (window.wanakana) initIme(); else window.addEventListener('load', initIme, { once: true });
  $('ime').addEventListener('click', () => { setIme(!imeOn); saveSettings({ romajiInput: imeOn }); input.focus(); });

  function drawStatus(err) {
    const st = $('status');
    if (err === 'error') st.innerHTML = '⚠ Could not load the Japanese analyzer. Check your connection and reload.';
    else if (!checkerReady()) st.innerHTML = '<span class="spinner"></span>Loading the Japanese analyzer (one-time ~18 MB download)…';
    else st.innerHTML = settings.ai.enabled && settings.ai.apiKey ? `Graded by Claude (${esc(settings.ai.model)})` : 'Graded locally · <a href="#/settings">enable AI grading</a> for full grammar checks';
    $('submit').disabled = !checkerReady();
  }

  function updateStats() {
    const done = results.length;
    $('s-done').textContent = done;
    $('s-left').textContent = queue.length + (current && phase !== 'done' ? 1 : 0);
    $('s-pct').textContent = answers ? `${Math.round((100 * correctAnswers) / answers)}%` : '100%';
    $('s-bar').style.width = `${(100 * done) / total}%`;
  }

  function nextItem() {
    if (!queue.length) return finish();
    current = BY_ID.get(queue.shift());
    phase = 'answer';
    lastResult = null;
    showInfo = false;
    const it = current;
    $('banner').className = `q-banner ${it.type}`;
    $('grammar').textContent = it.grammar;
    $('variant').textContent = it.variant || '';
    $('variant').classList.toggle('hidden', !it.variant);
    $('lvl').textContent = `Level ${it.level}`;
    const pr = it.prompt;
    $('prompt').innerHTML = `${TYPES[it.type].label} <b>${pr && pr.kind === 'passage' ? 'Fill in the blank' : 'Reply'}</b>`;
    $('context').innerHTML = contextHTML(it);
    input.placeholder = pr && pr.kind === 'passage' ? 'Write the missing sentence…' : 'Write your reply…';
    input.value = '';
    input.readOnly = false;
    box.className = 'answer-box';
    $('feedback').className = 'feedback';
    $('feedback').innerHTML = '';
    $('actions').classList.add('hidden');
    $('qinfo').classList.add('hidden');
    $('qinfo').innerHTML = '';
    drawStatus();
    updateStats();
    input.focus();
  }

  async function submit() {
    if (phase !== 'answer' || !checkerReady()) return;
    const text = input.value.trim();
    const item = current;
    const checker = getChecker();
    let res = checker.check(item, text, { allowCopies: settings.allowExampleCopies, words: item.prompt ? item.prompt.words : [] });
    let source = 'local';
    const useAI = settings.ai.enabled && settings.ai.apiKey;
    if (useAI && !(res.status === 'shake' && TRIVIAL_SHAKES.has(res.code))) {
      phase = 'grading';
      box.classList.add('grading');
      input.readOnly = true;
      $('status').innerHTML = '<span class="spinner"></span>Claude is grading your sentence…';
      try {
        aborter = new AbortController();
        const ai = await gradeWithAI({ apiKey: settings.ai.apiKey, model: settings.ai.model, item, prompt: item.prompt, sentence: text, signal: aborter.signal });
        if (current !== item) return;
        source = 'ai';
        res = { status: ai.verdict === 'missing' ? 'shake' : ai.verdict, message: ai.feedback, correction: ai.correction, local: res };
      } catch (e) {
        if (current !== item) return;
        res = { ...res, note: `${e.message} — graded locally instead.` };
      } finally {
        box.classList.remove('grading');
        input.readOnly = false;
        phase = 'answer';
        drawStatus();
      }
    }
    lastResult = { ...res, source, text };
    const fb = $('feedback');
    const srcTag = `<span class="src">${source === 'ai' ? 'Claude' : 'Checker'}</span>`;
    if (res.status === 'shake') {
      box.classList.remove('shake'); void box.offsetWidth; box.classList.add('shake');
      fb.className = 'feedback warn';
      fb.innerHTML = `${srcTag}${esc(res.message)}${res.note ? `<br><span class="muted small">${esc(res.note)}</span>` : ''}`;
      input.focus();
      return;
    }
    answers++;
    const ok = res.status === 'correct';
    if (ok) correctAnswers++; else wrong.set(item.id, (wrong.get(item.id) || 0) + 1);
    phase = ok ? 'correct' : 'incorrect';
    input.readOnly = true;
    box.className = `answer-box ${phase}`;
    fb.className = `feedback ${ok ? 'good' : 'bad'}`;
    fb.innerHTML = `${srcTag}${ok ? (res.message ? esc(res.message) : 'Correct!') : esc(res.message || 'Not quite.')}`
      + (res.correction && !ok ? `<span class="correction" lang="ja">→ ${esc(res.correction)}</span>` : '')
      + (res.note ? `<br><span class="muted small">${esc(res.note)}</span>` : '');
    $('actions').classList.remove('hidden');
    $('override').classList.toggle('hidden', ok);
    recordSentence(item.id, text, ok);
    if (ok && settings.autoplayAudio) speak(text);
    if (!ok) { showInfo = true; drawInfo(); }
    updateStats();
    $('next').focus();
  }

  function recordSentence(id, text, ok) {
    const p = getState().items[id];
    if (!p) return;
    p.sentences = p.sentences || [];
    const last = p.sentences[p.sentences.length - 1];
    if (last && last.text === text && Date.now() - last.at < 60000) last.ok = ok;
    else p.sentences.push({ text, ok, at: Date.now() });
    if (p.sentences.length > 30) p.sentences.splice(0, p.sentences.length - 30);
  }

  function override() {
    if (phase !== 'incorrect') return;
    wrong.set(current.id, wrong.get(current.id) - 1);
    if (!wrong.get(current.id)) wrong.delete(current.id);
    correctAnswers++;
    phase = 'correct';
    box.className = 'answer-box correct';
    $('feedback').className = 'feedback good';
    $('feedback').innerHTML = '<span class="src">You</span>Marked as correct.';
    $('override').classList.add('hidden');
    recordSentence(current.id, lastResult.text, true);
    updateStats();
  }

  function drawInfo() {
    const qi = $('qinfo');
    qi.classList.toggle('hidden', !showInfo);
    if (!showInfo) return;
    const st = getState();
    qi.innerHTML = `
      <div class="item-header"><div class="big ${current.type}" lang="ja">${esc(current.grammar)}${current.variant ? `<span class="v">${esc(current.variant)}</span>` : ''}</div>
        <div><div class="title">${esc(current.meaning)}</div><div class="sub"><a href="#/item/${esc(current.id)}" target="_blank">Open item page ↗</a></div></div></div>
      ${current.prompt ? `<div class="section"><h3>Example answer</h3><div class="example"><span></span><div class="ja answer-echo" lang="ja" style="--hl:${TYPE_COLORS[current.type]}">${renderJa(current.prompt.answer, current)}</div></div></div>` : ''}
      ${lastResult && lastResult.text ? `<div class="section"><h3>Your answer</h3><div class="example"><span></span><div class="ja answer-echo" lang="ja" style="--hl:${TYPE_COLORS[current.type]}">${renderJa(lastResult.text, current, { furigana: false })}</div></div></div>` : ''}
      ${detailSections(st, current, { which: ['meaning', 'pronunciation', 'examples', 'parts'] })}`;
    bindSpeak(qi);
  }

  function advance() {
    if (phase === 'correct') {
      const id = current.id;
      const w = wrong.get(id) || 0;
      const change = onComplete(id, w);
      const st = getState();
      const r = refresh(st);
      levelUps.push(...r.levelUps);
      save();
      results.push({ id, wrong: w, change });
      wrong.delete(id);
    } else if (phase === 'incorrect') {
      // comes back later in the session
      const pos = Math.min(queue.length, 2 + Math.floor(Math.random() * 6));
      queue.splice(pos, 0, current.id);
    } else return;
    nextItem();
  }

  function finish() {
    current = null;
    phase = 'done';
    cleanup();
    renderSummary(root, { mode, title, results, answers, correctAnswers, levelUps });
  }

  const onKey = (e) => {
    if (phase === 'answer' || phase === 'grading') {
      if (e.key === 'Enter' && e.target === input) {
        // let an IME finish composing first
        if (e.isComposing || e.keyCode === 229) return;
        e.preventDefault(); submit();
      }
      return;
    }
    if (e.target.matches('textarea')) return;
    if (e.key === 'Enter') { e.preventDefault(); advance(); }
    else if (e.key === 'f' || e.key === 'F') { e.preventDefault(); showInfo = !showInfo; drawInfo(); }
  };
  document.addEventListener('keydown', onKey);
  $('submit').addEventListener('click', submit);
  $('next').addEventListener('click', advance);
  $('info').addEventListener('click', () => { showInfo = !showInfo; drawInfo(); });
  $('override').addEventListener('click', override);
  const wrapBtn = $('wrap');
  if (wrapBtn) wrapBtn.addEventListener('click', () => {
    if (wrapUp) return;
    wrapUp = true;
    // like WaniKani: finish what you've started plus up to 10 more items
    const missed = queue.filter((id) => wrong.has(id));
    const fresh = queue.filter((id) => !wrong.has(id)).slice(0, 10);
    queue.length = 0;
    queue.push(...fresh, ...missed);
    wrapBtn.textContent = 'Wrapping up…';
    wrapBtn.classList.add('primary');
    wrapBtn.disabled = true;
    updateStats();
  });
  $('home').addEventListener('click', (e) => {
    if (results.length) { e.preventDefault(); finish(); }
  });

  function cleanup() {
    document.removeEventListener('keydown', onKey);
    if (aborter) aborter.abort();
  }

  nextItem();
  return cleanup;
}

// ---------------------------------------------------------------- review context
function contextHTML(item) {
  const pr = item.prompt;
  if (!pr) return '';
  const ja = (t) => renderJa(t, null, { highlight: false });
  const words = `<div class="ctx-words">Use: ${pr.words.map((w) => `<span class="word" lang="ja">${esc(w.split('|')[0])}</span>`).join('')}</div>`;
  const body = pr.kind === 'passage'
    ? `<div class="ctx-passage"><div class="ja" lang="ja">${pr.ja.split('＿').map(ja).join('<span class="blank">\u3000\u3000\u3000\u3000</span>')}</div>
         <div class="en">${esc(pr.en).replace('___', '<span class="blank-en">___</span>')}</div></div>`
    : `<div class="ctx-dialogue">${pr.lines.map((l) => `
         <div class="line"><span class="who">${esc(l.who)}</span>
           <div class="bubble"><div class="ja" lang="ja">${ja(l.ja)}</div><div class="en">${esc(l.en)}</div></div></div>`).join('')}
         <div class="line you"><span class="who">You</span><div class="bubble"><span class="dots">…</span></div></div></div>`;
  return `<div class="ctx"><div class="ctx-scene">${esc(pr.scene)}</div>${body}
    <div class="ctx-task"><b>${esc(pr.task)}</b></div>${words}</div>`;
}

// ---------------------------------------------------------------- summary
function renderSummary(root, { mode, title, results, answers, correctAnswers, levelUps }) {
  const state = getState();
  const pct = answers ? Math.round((100 * correctAnswers) / answers) : 100;
  const good = results.filter((r) => !r.wrong);
  const bad = results.filter((r) => r.wrong);
  const changeLabel = (r) => {
    if (!r.change) return '';
    const up = r.change.to > r.change.from;
    return `<span class="change">${up ? '▲' : '▼'} ${esc(SRS_STAGES[r.change.to].name)}</span>`;
  };
  const tiles = (list) => list.map((r) => {
    const it = BY_ID.get(r.id);
    return `<a class="tile ${it.type}" href="#/item/${esc(it.id)}" title="${esc(it.meaning)}"><span class="g">${esc(it.grammar)}</span>${it.variant ? `<span class="v">${esc(it.variant)}</span>` : ''}<span class="m">${esc(it.meaning)}${changeLabel(r)}</span></a>`;
  }).join('');
  const more = mode === 'quiz' && availableLessons(state).length;
  const moreReviews = mode === 'review' && availableReviews(state).length;
  root.innerHTML = `
    <div class="session"><div class="session-top"><a class="home" href="#/">⌂</a><span>${esc(title)} — summary</span></div>
    <div class="lesson-body">
      ${levelUps.length ? `<div class="card levelup"><div class="muted">Level up!</div><div class="n">${levelUps[levelUps.length - 1]}</div><div>New grammar is waiting in your lessons.</div></div>` : ''}
      ${mode === 'quiz' ? `<h1 class="page-title">Lessons complete</h1><p class="muted">These items are now Apprentice I. Your first review comes in a few hours.</p>` : `
      <div class="summary-head"><div class="pct">${pct}%</div><div><b>answered correctly</b><div class="muted">${results.length} item${results.length === 1 ? '' : 's'} completed · ${answers} answer${answers === 1 ? '' : 's'}</div></div></div>`}
      ${bad.length ? `<div class="section"><h3>${mode === 'quiz' ? 'Needed another try' : 'Answered incorrectly'} (${bad.length})</h3><div class="tiles">${tiles(bad)}</div></div>` : ''}
      ${good.length ? `<div class="section"><h3>${mode === 'quiz' ? 'Learned' : 'Answered correctly'} (${good.length})</h3><div class="tiles">${tiles(good)}</div></div>` : ''}
      <div class="q-actions" style="justify-content:flex-start">
        <a class="btn" href="#/">Dashboard</a>
        ${more ? `<a class="btn primary" href="#/lessons" id="again">More lessons (${more})</a>` : ''}
        ${moreReviews ? `<a class="btn blue" href="#/reviews" id="again">Continue reviews (${moreReviews})</a>` : ''}
      </div>
    </div></div>`;
  const again = root.querySelector('#again');
  if (again) again.addEventListener('click', () => { if (location.hash === again.getAttribute('href')) window.dispatchEvent(new HashChangeEvent('hashchange')); });
}

void tile; void STAGE_COLORS;
