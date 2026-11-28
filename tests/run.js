// Run with: npm test
// 1. curriculum integrity  2. every example sentence passes its own checker
// 3. known-bad sentences are rejected  4. SRS engine behaves like WaniKani
import kuromoji from 'kuromoji';
import { createRequire } from 'module';
import path from 'path';
import { fileURLToPath } from 'url';
import { ITEMS, BY_ID, MAX_LEVEL } from '../js/data/index.js';
import MORE from '../js/data/more/index.js';
import { createChecker, parseSpec } from '../js/checker.js';
import { NEGATIVE, POSITIVE, WORD_CASES } from './cases.js';
import { runSrsTests } from './srs.test.js';
import { runMergeTests } from './merge.test.js';
import { runContextTests } from './contexts.test.js';

const require = createRequire(import.meta.url);
const dicPath = path.join(path.dirname(require.resolve('kuromoji/package.json')), 'dict');
const only = process.argv[2]; // optional: level range "1-10" or item id
let failures = 0;
const fail = (msg) => { failures++; console.log('✗ ' + msg); };

// ---------- 1. integrity
const ids = new Set();
for (const it of ITEMS) {
  if (ids.has(it.id)) fail(`duplicate id ${it.id}`);
  ids.add(it.id);
  for (const k of ['grammar', 'meaning', 'reading', 'romaji', 'structure', 'explain']) if (!it[k]) fail(`${it.id}: missing ${k}`);
  if (!Array.isArray(it.examples) || it.examples.length < 2) fail(`${it.id}: needs at least 2 examples`);
  if (!it.check || !it.check.length) fail(`${it.id}: no check specs`);
  for (const spec of (it.check || []).flat()) { try { parseSpec(spec); } catch (e) { fail(`${it.id}: ${e.message}`); } }
  for (const p of it.parts) {
    const q = BY_ID.get(p);
    if (!q) fail(`${it.id}: unknown part ${p}`);
    else if (q.level > it.level) fail(`${it.id} (L${it.level}) depends on ${p} (L${q.level})`);
    else if (q.level === it.level && q.type === 'phrase' && it.type !== 'phrase') fail(`${it.id}: non-phrase depends on same-level phrase ${p}`);
  }
}
// cycles
const visiting = new Set(), done = new Set();
const dfs = (id, trail) => {
  if (done.has(id)) return;
  if (visiting.has(id)) { fail(`cycle: ${[...trail, id].join(' → ')}`); return; }
  visiting.add(id);
  for (const p of BY_ID.get(id)?.parts || []) dfs(p, [...trail, id]);
  visiting.delete(id); done.add(id);
};
ITEMS.forEach((it) => dfs(it.id, []));
const present = new Set(ITEMS.map((i) => i.level));
for (let l = 1; l <= MAX_LEVEL; l++) {
  if (!present.has(l)) { if (!only) fail(`level ${l} has no items`); continue; }
  if (!ITEMS.some((i) => i.level === l && i.type === 'conjugation')) fail(`level ${l} has no conjugations (needed for level-up)`);
}

// ---------- 2-3. checker
const tokenizer = await new Promise((res, rej) => kuromoji.builder({ dicPath }).build((e, t) => (e ? rej(e) : res(t))));
const checker = createChecker(tokenizer);
const dump = (ts) => (ts || []).map((t) => `${t.surface_form}[${t.pos}/${t.pos_detail_1}/${t.conjugated_form}]`).join(' ');
let inRange = (it) => true;
if (only) {
  const m = only.match(/^(\d+)-(\d+)$/);
  inRange = m ? (it) => it.level >= +m[1] && it.level <= +m[2] : (it) => it.id === only;
}
let n = 0;
for (const it of ITEMS.filter(inRange)) {
  for (const [ja] of it.examples) {
    n++;
    const r = checker.check(it, ja, { allowCopies: true });
    if (r.status !== 'correct') fail(`L${it.level} ${it.id} example rejected (${r.status}): ${ja}\n    ${r.message}\n    ${dump(r.tokens || checker.tokenize(ja))}`);
  }
}
// review prompts: every item has one, and its model answer passes
for (const id of Object.keys(MORE)) if (!BY_ID.has(id)) fail(`extra contexts for unknown item id: ${id}`);
let nPrompts = 0;
const MIN_CONTEXTS = Number(process.env.MIN_CONTEXTS || 9);
for (const it of ITEMS.filter(inRange)) {
  if (!it.prompts.length) { fail(`L${it.level} ${it.id}: no review prompt`); continue; }
  if (it.prompts.length < MIN_CONTEXTS) fail(`L${it.level} ${it.id}: only ${it.prompts.length} contexts (need ${MIN_CONTEXTS})`);
  const answers = new Set();
  for (const pr of it.prompts) {
  nPrompts++;
  if (answers.has(pr.answer)) fail(`${it.id}: duplicate sample answer ${pr.answer}`);
  answers.add(pr.answer);
  for (const k of ['scene', 'task', 'answer']) if (!pr[k]) fail(`${it.id}: prompt missing ${k}`);
  if (!pr.words.length) fail(`${it.id}: prompt has no required words`);
  if (pr.kind === 'passage') {
    if ((pr.ja.match(/＿/g) || []).length !== 1) fail(`${it.id}: passage needs exactly one ＿ blank`);
    if (!pr.en.includes('___')) fail(`${it.id}: passage translation needs a ___ blank`);
  } else if (!pr.lines.length || pr.lines.some((l) => !l.who || !l.ja || !l.en)) fail(`${it.id}: bad dialogue lines`);
  const r = checker.check(it, pr.answer, { allowCopies: true, words: pr.words });
  if (r.status !== 'correct') fail(`L${it.level} ${it.id} model answer rejected (${r.status}): ${pr.answer}\n    ${r.message}\n    ${dump(r.tokens || checker.tokenize(pr.answer))}`);
  }
}
for (const [id, s, want] of NEGATIVE) {
  const it = BY_ID.get(id); if (!it || !inRange(it)) continue;
  const r = checker.check(it, s);
  if (r.status === 'correct' || (want && r.status !== want)) fail(`negative case accepted/mismatched for ${id}: ${s} → ${r.status} (${r.message})\n    ${dump(r.tokens)}`);
}
for (const [id, s, words] of WORD_CASES) {
  const missing = checker.missingWords(words.split(' '), s);
  const want = id === 'has' ? [] : [id];
  if (JSON.stringify(missing) !== JSON.stringify(want)) fail(`required words: "${s}" with [${words}] → missing ${JSON.stringify(missing)}, want ${JSON.stringify(want)}`);
}
for (const [id, s] of POSITIVE) {
  const it = BY_ID.get(id); if (!it || !inRange(it)) continue;
  const r = checker.check(it, s);
  if (r.status !== 'correct') fail(`positive case rejected for ${id}: ${s} → ${r.status} (${r.message})\n    ${dump(r.tokens)}`);
}

// ---------- 4. SRS
failures += runSrsTests();
failures += runMergeTests();
failures += runContextTests();

console.log(`\n${ITEMS.length} items, ${nPrompts} review contexts, ${n} example sentences checked, ${NEGATIVE.length} negative + ${POSITIVE.length} positive cases.`);
console.log(failures ? `${failures} failure(s)` : 'All tests passed.');
process.exit(failures ? 1 : 0);
