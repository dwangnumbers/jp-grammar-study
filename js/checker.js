// Sentence checker.
//
// A review asks you to write an original Japanese sentence that uses the
// grammar point correctly. This module grades that sentence locally, using
// the kuromoji morphological analyser (IPADIC) to split it into words with
// part-of-speech and conjugation information.
//
// The local checker answers three questions:
//   1. Is this a real attempt? (Japanese text, long enough, not a copied example)
//      -> if not, the answer "shakes" and is not counted, like WaniKani does
//         when you type a reading into a meaning field.
//   2. Does it use the target grammar, attached to the right kind of word?
//      (e.g. 〜てもいい must follow a verb/adjective in て-form)
//   3. Does it contain a common conjugation or particle error?
//      (e.g. 食べるます, 書きて, 高いだ, doubled particles)
//
// A local checker cannot prove that a sentence is natural Japanese. For full
// grading, enable AI grading in Settings (see ai.js).
//
// ---------------------------------------------------------------------------
// Check specs
//
// Each item has `check: [spec, spec, ...]`. The sentence passes the grammar
// test if ANY spec matches. A spec is a string:
//
//     PATTERN [ "@" HOST_CLASSES ] [ ">" FOLLOW_CLASSES ]
//
//   PATTERN   a regular expression over the sentence (whitespace removed), or
//             "#x"   – a particle token whose surface is exactly x, or
//             "%name" – a named detector from DETECTORS below.
//   HOST      comma-separated word classes (see CLASSES). The "host" is the
//             word the grammar attaches to: the word just before the match,
//             or the word the match starts inside (高|かった).
//   FOLLOW    comma-separated word classes; some later word must match one.
//
// Examples:  "#を>V"          particle を followed somewhere by a verb
//            "ても(いい|良い)@Vt,A"   〜てもいい after a verb/adjective
// ---------------------------------------------------------------------------

const isVerb = (t) => t && t.pos === '動詞';
const isAdj = (t) => t && t.pos === '形容詞';
const isNoun = (t) => t && t.pos === '名詞';
const isAux = (t) => t && t.pos === '助動詞';
const form = (t) => (t && t.conjugated_form) || '';
// past た, or the voiced だ after a godan sound change (読んだ, 泳いだ)
const isPastAux = (t, prev) => isAux(t) && (t.basic_form === 'た' || (t.basic_form === 'だ' && isVerb(prev) && form(prev) === '連用タ接続'));
const godanNonSa = (t) => isVerb(t) && /^五段/.test(t.conjugated_type) && !/サ行/.test(t.conjugated_type);

// Word classes used in HOST / FOLLOW.
export const CLASSES = {
  X: { desc: 'anything', test: () => true },
  N: { desc: 'a noun', test: (t) => isNoun(t) || (t && t.pos === '接頭詞') },
  Na: { desc: 'a な-adjective', test: (t) => isNoun(t) && /形容動詞語幹|ナイ形容詞語幹/.test(t.pos_detail_1) },
  Ns: { desc: 'a する-noun (勉強, 買い物 …)', test: (t) => isNoun(t) && t.pos_detail_1 === 'サ変接続' },
  // verbs formed with the suffix 〜がる (怖がる, 嫌がる) that IPADIC stores as one word
  G: { desc: 'an adjective stem', test: (t) => isVerb(t) && /.がる$/.test(t.basic_form) && !/^(上|下|曲|広|繋|転|群|あ|さ|ま|ひろ|つな|ころ|むら|す|縋|寝転|つ|た)がる$/.test(t.basic_form) },
  // nouns that are really ます-stems (遊び, 釣り, 泳ぎ)
  Nm: { desc: 'a verb in its ます-stem', test: (t) => isNoun(t) && /[いきしちにひみりぎじびぴえけせてねへめれげぜでべぺ]$/.test(t.surface_form) && /[ぁ-ゖ]/.test(t.surface_form) },
  Ad: { desc: 'an adverb', test: (t) => t && t.pos === '副詞' },
  D: { desc: 'a demonstrative (この/その/あの …)', test: (t) => t && t.pos === '連体詞' },
  V: { desc: 'a verb', test: (t) => isVerb(t) },
  Vm: { desc: 'a verb in its ます-stem', test: (t) => isVerb(t) && /^連用/.test(form(t)) },
  Vt: { desc: 'a verb in て/た-connective form', test: (t) => isVerb(t) && /^連用/.test(form(t)) },
  Vd: { desc: 'a verb in dictionary form', test: (t) => isVerb(t) && /^(文語)?基本形$/.test(form(t)) },
  Vn: { desc: 'a verb in its ない-stem', test: (t) => isVerb(t) && /^未然/.test(form(t)) },
  Vb: { desc: 'a word in its ば (hypothetical) form', test: (t) => (isVerb(t) || isAdj(t) || isAux(t)) && /仮定/.test(form(t)) },
  Vv: { desc: 'a verb in volitional form', test: (t) => isVerb(t) && form(t) === '未然ウ接続' },
  A: { desc: 'an い-adjective', test: (t) => isAdj(t) },
  As: { desc: 'an adjective stem', test: (t) => isAdj(t) && /ガル|語幹/.test(form(t)) },
  Aux: { desc: 'an auxiliary', test: (t) => isAux(t) },
  // A predicate in plain (non-polite) form: dictionary form verb/adjective,
  // or an auxiliary such as た / ない / だ / たい in plain form.
  P: {
    desc: 'a plain-form verb, adjective or auxiliary',
    test: (t) => (isVerb(t) || isAdj(t) || isAux(t)) && (form(t) === '基本形' || form(t) === '体言接続'),
  },
  // Plain past
  Pt: { desc: 'a plain past form (〜た)', test: (t) => isAux(t) && /^[たっだ]/.test(t.surface_form) && /^[ただ]$/.test(t.basic_form) && form(t) === '基本形' },
  // Any inflecting word (verb/adjective/auxiliary)
  I: { desc: 'a verb, adjective or auxiliary', test: (t) => isVerb(t) || isAdj(t) || isAux(t) },
  // Particle
  Pa: { desc: 'a particle', test: (t) => t && t.pos === '助詞' },
};

// Verb class: 'g' = godan (五段), 'i' = ichidan (一段) or irregular する / 来る.
// A potential verb like 読める is itself ichidan; only the potential detector
// traces it back to its godan verb.
export function verbClass(t) {
  if (!isVerb(t)) return null;
  // IPADIC sometimes tags 来ら (来られる) as a godan verb, and splits 来させる as
  // 来す + せる; 来る is always irregular
  if ((t.basic_form === '来る' || t.basic_form === '来す') && /^来/.test(t.surface_form)) return 'i';
  const ct = t.conjugated_type || '';
  if (/^五段/.test(ct)) return 'g';
  if (/一段|サ変|カ変/.test(ct)) return 'i';
  return null;
}
// true when no class is required, or the verb is of the required class
const ofClass = (t, ctx) => !ctx || !ctx.cls || verbClass(t) === ctx.cls;

// Named detectors for conjugations that are easier to see in tokens than in
// text. Each returns the index of the token where the pattern occurs, or -1.
export const DETECTORS = {
  // い-adjective in dictionary form (高い, おいしい)
  iadj: (ts) => ts.findIndex((t) => isAdj(t) && t.pos_detail_1 === '自立' && form(t) === '基本形'),
  // existence verbs ある / いる (as main verbs)
  exist: (ts) => ts.findIndex((t) => isVerb(t) && t.pos_detail_1 === '自立' && /^(ある|有る|在る|いる|居る|おる|居る|ござる)$/.test(t.basic_form)),
  // 食べます / 行きました / 読みません …
  masu: (ts) => ts.findIndex((t, i) => isAux(t) && t.basic_form === 'ます' && (isVerb(ts[i - 1]))),
  // Dictionary form of a verb used as a predicate (not followed by an auxiliary)
  dict: (ts) => ts.findIndex((t, i) => isVerb(t) && t.pos_detail_1 === '自立' && form(t) === '基本形' && !isAux(ts[i + 1])),
  // Plain negative 〜ない after a verb
  nai: (ts, ctx) => ts.findIndex((t, i) => isAux(t) && t.basic_form === 'ない' && isVerb(ts[i - 1]) && ofClass(ts[i - 1], ctx)),
  // Plain past 〜た/だ after a verb
  ta: (ts, ctx) => ts.findIndex((t, i) => isPastAux(t, ts[i - 1]) && isVerb(ts[i - 1]) && ofClass(ts[i - 1], ctx)),
  // 〜なかった after a verb
  nakatta: (ts) => ts.findIndex((t, i) => isAux(t) && t.basic_form === 'ない' && /タ接続/.test(form(t)) && isVerb(ts[i - 1]) && isAux(ts[i + 1]) && ts[i + 1].basic_form === 'た'),
  // て-form of a verb
  te: (ts, ctx) => ts.findIndex((t, i) => isVerb(t) && /^連用/.test(form(t)) && ts[i + 1] && ts[i + 1].pos === '助詞' && /^[てで]$/.test(ts[i + 1].surface_form) && ofClass(t, ctx)),
  // Potential form: 食べられる / 読める / できる / 来られる
  potential: (ts, ctx) => ts.findIndex((t, i) => {
    if (!isVerb(t)) return false;
    const cls = ctx && ctx.cls;
    // する → できる
    if (t.basic_form === 'できる' || t.basic_form === '出来る') return cls !== 'g';
    // 食べられる / 来られる (ichidan & 来る); 〜れる after a godan stem is the passive
    if (t.pos_detail_1 === '接尾' && /^(られる|れる)$/.test(t.basic_form)) {
      if (!cls) return true;
      return cls === 'i' && verbClass(ts[i - 1]) === 'i';
    }
    // 読める / 話せる — potential of a godan verb
    if (t.pos_detail_1 === '自立' && t.conjugated_type === '一段' && ctx && ctx.isPotentialVerb && ctx.isPotentialVerb(t.basic_form)) return cls !== 'i';
    // ら抜き: 見れる / 来れる
    if (/^(見れ|来れ|これ|寝れ|出れ|着れ)/.test(t.surface_form) && t.conjugated_type === '一段') return cls !== 'g';
    return false;
  }),
  // Passive: 〜れる / 〜られる after a ない-stem
  passive: (ts, ctx) => ts.findIndex((t, i) => isVerb(t) && t.pos_detail_1 === '接尾' && /^(られる|れる)$/.test(t.basic_form) && isVerb(ts[i - 1]) && ofClass(ts[i - 1], ctx)),
  // Causative: 〜せる / 〜させる
  causative: (ts, ctx) => ts.findIndex((t, i) => {
    if (!isVerb(t)) return false;
    if (t.pos_detail_1 === '接尾' && /^(させる|せる|す)$/.test(t.basic_form) && isVerb(ts[i - 1])) return ofClass(ts[i - 1], ctx);
    if (t.basic_form === 'させる') return !ctx || ctx.cls !== 'g'; // する → させる
    return false;
  }),
  // Causative-passive: 〜させられる / 〜せられる / 〜される(short)
  causativePassive: (ts) => ts.findIndex((t, i) => {
    const n = ts[i + 1];
    if (!isVerb(t) || !n || !isVerb(n)) return false;
    if (/^(させる|せる)$/.test(t.basic_form) && /^(られる)$/.test(n.basic_form)) return true;
    if (t.pos_detail_1 === '接尾' && t.basic_form === 'す' && n.basic_form === 'れる') return true;
    return false;
  }),
  // Plain volitional: 食べよう / 行こう / しよう
  volitional: (ts, ctx) => ts.findIndex((t, i) => isVerb(t) && form(t) === '未然ウ接続' && isAux(ts[i + 1]) && /^(う|よう)$/.test(ts[i + 1].basic_form) && ofClass(t, ctx)),
  // Imperative: 食べろ / 行け / 来い / しろ
  imperative: (ts, ctx) => ts.findIndex((t) => isVerb(t) && /^命令/.test(form(t)) && !/^(なさる|くださる|下さる|いらっしゃる|ござる)$/.test(t.basic_form) && ofClass(t, ctx)),
  // ば-conditional
  // with class 'i', い-adjectives (高ければ) count too
  ba: (ts, ctx) => ts.findIndex((t, i) => /仮定形/.test(form(t)) && ts[i + 1] && ts[i + 1].surface_form === 'ば'
    && (!ctx || !ctx.cls || (isVerb(t) ? verbClass(t) === ctx.cls : ctx.cls === 'i' && isAdj(t)))),
  // any main verb (used with a class: %verb/g, %verb/i)
  verb: (ts, ctx) => ts.findIndex((t) => isVerb(t) && t.pos_detail_1 === '自立' && ofClass(t, ctx)),
  // 〜たら conditional
  tara: (ts) => ts.findIndex((t, i) => isPastAux(t, ts[i - 1]) && /仮定/.test(form(t))),
};

const JP_RE = /[぀-ヿ㐀-鿿ｦ-ﾟ々〆ヶ]/;
const LATIN_RE = /[A-Za-z]/;

export function normalize(s) {
  return (s || '')
    .normalize('NFKC')
    .replace(/[\s　]+/g, '')
    .replace(/[!]/g, '！')
    .replace(/[?]/g, '？')
    .replace(/[,]/g, '、')
    .trim();
}

function stripPunct(s) {
  return normalize(s).replace(/[。、！？「」『』（）()…・〜~ー—\-.]/g, '');
}

export function parseSpec(spec) {
  let rest = spec;
  // trailing "~": also accept the grammar fused inside one dictionary word
  // (IPADIC stores some set phrases, e.g. 言うまでもなく, as a single token)
  let fused = false;
  if (rest.endsWith('~')) { fused = true; rest = rest.slice(0, -1); }
  let follow = null;
  let host = null;
  const gt = rest.lastIndexOf('>');
  if (gt > 0 && !/\(\?<?[=!]?$/.test(rest.slice(0, gt))) {
    follow = rest.slice(gt + 1).split(',').filter(Boolean);
    rest = rest.slice(0, gt);
  }
  const at = rest.lastIndexOf('@');
  if (at > 0) {
    host = rest.slice(at + 1).split(',').filter(Boolean);
    rest = rest.slice(0, at);
  }
  let kind = 're';
  let pattern = rest;
  let pos = null;
  let cls = null;
  if (rest.startsWith('#')) { kind = 'particle'; pattern = rest.slice(1); }
  else if (rest.startsWith('=')) { kind = 'token'; [pattern, pos] = rest.slice(1).split(':'); }
  else if (rest.startsWith('%')) { kind = 'detector'; [pattern, cls] = rest.slice(1).split('/'); }
  for (const c of [...(host || []), ...(follow || [])]) {
    if (!CLASSES[c]) throw new Error(`Unknown word class "${c}" in spec "${spec}"`);
  }
  if (kind === 'detector' && !DETECTORS[pattern]) throw new Error(`Unknown detector "${pattern}" in spec "${spec}"`);
  if (cls && !/^[gi]$/.test(cls)) throw new Error(`Unknown verb class "${cls}" in spec "${spec}" (use /g or /i)`);
  if (kind === 're') new RegExp(pattern); // throws on a bad pattern
  return { kind, pattern, pos, cls, host, follow, fused, spec };
}

// Offsets: kuromoji's word_position is 1-based.
function withOffsets(tokens) {
  let pos = 0;
  return tokens.map((t, i) => {
    const start = pos;
    pos += t.surface_form.length;
    return { ...t, start, end: pos, index: i };
  });
}

function hostFor(tokens, startIdx) {
  // the token that contains startIdx
  const containing = tokens.find((t) => t.start <= startIdx && startIdx < t.end);
  if (!containing) return tokens[tokens.length - 1];
  if (containing.start !== startIdx) return containing;
  // skip closing quotes/brackets: 「積ん読」という → host is 読
  let i = containing.index - 1;
  while (i > 0 && tokens[i].pos === '記号' && /括弧閉/.test(tokens[i].pos_detail_1)) i--;
  return tokens[i];
}

function classOk(classes, tok) {
  if (!classes || !classes.length) return true;
  return classes.some((c) => CLASSES[c].test(tok));
}

function followOk(classes, tokens, endIdx) {
  if (!classes || !classes.length) return true;
  return tokens.some((t) => t.start >= endIdx && classes.some((c) => CLASSES[c].test(t)));
}

// Returns { found: bool, hostProblem: {spec, host} | null }
function matchSpecs(specs, text, tokens, ctx) {
  let hostProblem = null;
  let classProblem = null; // right form, wrong verb class
  for (const raw of specs) {
    const s = typeof raw === 'string' ? parseSpec(raw) : Array.isArray(raw) ? null : raw;
    const hits = [];
    if (Array.isArray(raw)) {
      // all sub-specs must match
      const subs = raw.map((r) => matchSpecs([r], text, tokens, ctx));
      if (subs.every((r) => r.found)) return { found: true, range: subs[subs.length - 1].range, ranges: subs.map((r) => r.range) };
      const bad = subs.find((r) => !r.found && r.hostProblem);
      if (bad && !hostProblem && subs.filter((r) => !r.found).length === 1) hostProblem = bad.hostProblem;
      const cbad = subs.find((r) => !r.found && r.classProblem);
      if (cbad && !classProblem) classProblem = cbad.classProblem;
      continue;
    }
    if (s.kind === 'particle') {
      for (const t of tokens) if (t.pos === '助詞' && t.surface_form === s.pattern) hits.push([t.start, t.end]);
    } else if (s.kind === 'token') {
      for (const t of tokens) if (t.surface_form === s.pattern && (!s.pos || t.pos === s.pos || t.pos_detail_1 === s.pos)) hits.push([t.start, t.end]);
    } else if (s.kind === 'detector') {
      const idx = DETECTORS[s.pattern](tokens, { ...ctx, cls: s.cls });
      if (idx < 0 && s.cls && !classProblem && DETECTORS[s.pattern](tokens, ctx) >= 0) classProblem = { cls: s.cls };
      if (idx >= 0) {
        const t = tokens[idx];
        const n = tokens[idx + 1];
        const p = tokens[idx - 1];
        // verb + its auxiliary/particle (食べ|ます, 読ん|で), or the inflected word itself
        if ((isAux(t) || t.pos === '助詞' || t.pos_detail_1 === '接尾') && p) return { found: true, range: [p.start, t.end] };
        if (n && (isAux(n) || (n.pos === '助詞' && /^[てでばたり]$/.test(n.surface_form)))) return { found: true, range: [t.start, n.end] };
        return { found: true, range: [t.start, t.end] };
      }
      continue;
    } else {
      const re = new RegExp(s.pattern, 'g');
      let m;
      while ((m = re.exec(text))) {
        hits.push([m.index, m.index + m[0].length]);
        if (m[0].length === 0) re.lastIndex++;
      }
    }
    for (const [a, b] of hits) {
      const host = hostFor(tokens, a);
      const isFused = s.fused && host && host.start < a && host.pos !== "記号";
      const hostGood = isFused || classOk(s.host, host);
      const followGood = followOk(s.follow, tokens, b);
      if (hostGood && followGood) return { found: true, range: [a, b] };
      if (!hostProblem) hostProblem = { spec: s, host, hostGood, followGood };
    }
  }
  return { found: false, hostProblem, classProblem };
}

const CLASS_HINT = {
  g: 'a godan verb (書く, 読む, 話す, 待つ, 行く …)',
  i: 'an ichidan verb (食べる, 見る, 起きる …), する or 来る',
};

// Common errors that a learner can make regardless of the grammar point.
export function findGeneralErrors(tokens) {
  const errs = [];
  const ts = tokens.filter((t) => t.pos !== '記号');
  ts.forEach((t, i) => {
    const prev = ts[i - 1];
    const next = ts[i + 1];
    // 食べるます
    if (isAux(t) && t.basic_form === 'ます' && isVerb(prev) && form(prev) === '基本形')
      errs.push(`ます attaches to the ます-stem, not the dictionary form: 「${prev.surface_form}${t.surface_form}」.`);
    // 食べるない
    if (isAux(t) && t.basic_form === 'ない' && isVerb(prev) && form(prev) === '基本形')
      errs.push(`ない attaches to the ない-stem, not the dictionary form: 「${prev.surface_form}${t.surface_form}」.`);
    // 見るた / 食べるたい
    if (isAux(t) && /^(た|たい)$/.test(t.basic_form) && isVerb(prev) && form(prev) === '基本形')
      errs.push(`「${t.surface_form}」 doesn't attach to the dictionary form: 「${prev.surface_form}${t.surface_form}」.`);
    // 書きて / 読みた (godan verbs other than す-verbs change before て/た)
    if (godanNonSa(prev) && form(prev) === '連用形' &&
        ((t.pos === '助詞' && /^[てで]$/.test(t.surface_form)) || isPastAux(t, prev)))
      errs.push(`「${prev.basic_form}」 is a godan verb, so its て/た-form changes sound (e.g. 書く→書いて, 読む→読んで). 「${prev.surface_form}${t.surface_form}」 is not a valid form.`);
    // 書いで / 読んて: wrong voicing
    if (godanNonSa(prev) && form(prev) === '連用タ接続') {
      const voiced = /ガ行|ナ行|バ行|マ行/.test(prev.conjugated_type);
      const s = t.surface_form;
      if ((t.pos === '助詞' && /^[てで]$/.test(s)) || isPastAux(t, prev)) {
        const isVoiced = /^[でだ]/.test(s);
        if (voiced !== isVoiced)
          errs.push(`「${prev.basic_form}」 takes ${voiced ? 'で/だ' : 'て/た'} in its て/た-form, not 「${s}」.`);
      }
    }
    // 高いだ (but not the listing particle だの, which IPADIC sometimes splits as だ + の)
    const isDano = next && next.surface_form === 'の' && next.pos === '名詞';
    if (isAux(t) && t.basic_form === 'だ' && form(t) === '基本形' && isAdj(prev) && form(prev) === '基本形' && !(next && next.pos === '助詞') && !isDano)
      errs.push(`い-adjectives don't take だ: 「${prev.surface_form}だ」 → just 「${prev.surface_form}」.`);
    // 行くです / 行くでした
    if (isAux(t) && t.basic_form === 'です' && !/^未然/.test(form(t)) && isVerb(prev) && form(prev) === '基本形')
      errs.push(`です doesn't follow a dictionary-form verb directly: 「${prev.surface_form}です」. Use the ます-form, or 〜んです/〜のです.`);
    // doubled particles: をを, がが
    if (t.pos === '助詞' && prev && prev.pos === '助詞' && prev.surface_form === t.surface_form && !/^(か|ね|よ|な|ぞ)$/.test(t.surface_form))
      errs.push(`The particle 「${t.surface_form}」 appears twice in a row.`);
    // two case particles colliding: をが, がを, をに …
    if (t.pos === '助詞' && t.pos_detail_1 === '格助詞' && prev && prev.pos === '助詞' && prev.pos_detail_1 === '格助詞' &&
        /^[をが]$/.test(t.surface_form) && /^[をがにへで]$/.test(prev.surface_form))
      errs.push(`「${prev.surface_form}${t.surface_form}」: two case particles can't stack like this.`);
  });
  if (ts.length) {
    const first = ts[0];
    if (first.pos === '助詞' && /^(格助詞|係助詞)$/.test(first.pos_detail_1) && /^[はがをにへ]$/.test(first.surface_form))
      errs.push(`The sentence starts with the particle 「${first.surface_form}」 — particles follow the word they mark.`);
    const last = ts[ts.length - 1];
    if (last.pos === '助詞' && last.pos_detail_1 === '格助詞' && /^[をがへ]$/.test(last.surface_form))
      errs.push(`The sentence ends with 「${last.surface_form}」 and looks unfinished.`);
  }
  return [...new Set(errs)];
}

export function createChecker(tokenizer, options = {}) {
  const cache = new Map();
  const potentialCache = new Map();
  const tokenize = (s) => {
    if (!cache.has(s)) cache.set(s, withOffsets(tokenizer.tokenize(s)));
    return cache.get(s);
  };
  // A one-dan verb like 読める is the potential of 読む if 読む is a real godan verb.
  const ROW_E_TO_U = { え: 'う', け: 'く', げ: 'ぐ', せ: 'す', て: 'つ', ね: 'ぬ', べ: 'ぶ', め: 'む', れ: 'る' };
  const isPotentialVerb = (base) => {
    if (potentialCache.has(base)) return potentialCache.get(base);
    let ok = false;
    const m = base.match(/^(.*)(.)る$/);
    if (m && ROW_E_TO_U[m[2]] && m[1]) {
      const godan = m[1] + ROW_E_TO_U[m[2]];
      const ts = tokenizer.tokenize(godan);
      ok = ts.length === 1 && ts[0].pos === '動詞' && /^五段/.test(ts[0].conjugated_type) && ts[0].basic_form === godan;
    }
    potentialCache.set(base, ok);
    return ok;
  };
  const ctx = { isPotentialVerb };

  // ---- required words ("use 窓 and 開ける")
  const toHira = (s) => (s || '').replace(/[\u30a1-\u30f6]/g, (c) => String.fromCharCode(c.charCodeAt(0) - 0x60));
  const readingOf = (s) => toHira(tokenizer.tokenize(s).map((t) => (t.reading && t.reading !== '*' ? t.reading : t.surface_form)).join(''));
  const KANJI = /[\u3400-\u9fff々]/;
  const wordCache = new Map();
  const wordInfo = (w) => {
    if (!wordCache.has(w)) {
      const alts = w.split('|').map((a) => {
        const surface = a.replace(/する$/, '') || a;
        const toks = tokenizer.tokenize(surface);
        const last = toks[toks.length - 1];
        const inflects = !!last && (isVerb(last) || isAdj(last));
        const reading = readingOf(surface);
        return {
          surface, reading, inflects,
          // the part up to the last kanji, so classical forms still match (忘れる → 忘る, 伝える → 伝へ)
          stem: inflects && surface.length > 1 ? surface.slice(0, Math.max(...[...surface].map((c, i) => (KANJI.test(c) ? i + 1 : 0)))) || surface.slice(0, -1) : null,
          rstem: inflects && reading.length > 2 ? reading.slice(0, -1) : null,
        };
      });
      wordCache.set(w, alts);
    }
    return wordCache.get(w);
  };
  function hasWord(w, text, tokens) {
    const textReading = toHira(tokens.map((t) => (t.reading && t.reading !== '*' ? t.reading : t.surface_form)).join(''));
    const hiraText = toHira(text);
    return wordInfo(w).some((a) => {
      if (text.includes(a.surface) || hiraText.includes(a.reading)) return true;
      if (textReading.includes(a.reading)) return true;
      if (tokens.some((t) => t.basic_form === a.surface || (t.basic_form && t.basic_form !== '*' && readingOf(t.basic_form) === a.reading))) return true;
      if (a.stem && KANJI.test(a.stem) && text.includes(a.stem)) return true;
      if (a.rstem && (textReading.includes(a.rstem) || hiraText.includes(a.rstem))) return true;
      return false;
    });
  }
  const missingWords = (words, text, tokens) => (words || []).filter((w) => !hasWord(w, text, tokens));

  function check(item, sentence, opts = {}) {
    const text = normalize(sentence);
    const bare = stripPunct(sentence);
    if (!text) return { status: 'shake', code: 'empty', message: 'Type a Japanese sentence.' };
    if (LATIN_RE.test(text)) return { status: 'shake', code: 'latin', message: 'Your answer contains Latin letters. Type it in Japanese (turn on あ for romaji → kana).' };
    if (!JP_RE.test(text)) return { status: 'shake', code: 'notjp', message: 'Type your sentence in Japanese.' };
    // copying a lesson example only counts when there are no required words
    // (with required words, the context already forces an answer of your own)
    const examples = (item.examples || []).map((e) => stripPunct(Array.isArray(e) ? e[0] : e.ja));
    if (!opts.allowCopies && !(opts.words && opts.words.length) && examples.includes(bare)) return { status: 'shake', code: 'copy', message: "That's one of the lesson's example sentences — write your own." };
    if (stripPunct(item.grammar.replace(/[〜～]/g, '')) === bare) return { status: 'shake', code: 'bare', message: 'Write a whole sentence, not just the grammar point.' };

    const tokens = tokenize(text);
    const content = tokens.filter((t) => t.pos !== '記号');
    if (bare.length < (opts.minLength || 4) || content.length < 3) return { status: 'shake', code: 'short', message: 'Write a full sentence (at least a few words).' };
    const unknown = content.filter((t) => t.word_type === 'UNKNOWN' && !/^[゠-ヿ]+$/.test(t.surface_form));
    if (unknown.length && unknown.length / content.length > 0.34) return { status: 'shake', code: 'parse', message: "I can't parse this as Japanese. Check for typos." };

    const missing = missingWords(opts.words, text, tokens);
    if (missing.length) {
      const list = missing.map((w) => `「${w.split('|')[0]}」`).join(' and ');
      return { status: 'shake', code: 'word', message: `Use ${list} in your answer.`, missing, tokens };
    }

    const res = matchSpecs(item.check || [], text, tokens, ctx);
    const name = item.variant ? `${item.grammar} (${item.variant})` : item.grammar;
    if (!res.found && res.classProblem) {
      const hint = item.useHint || CLASS_HINT[res.classProblem.cls];
      return { status: 'shake', code: 'class', message: `This is the ${item.variant || ''} version of ${item.grammar} — use ${hint}.`.replace('  ', ' '), tokens };
    }
    if (!res.found) {
      if (res.hostProblem) {
        const { spec, host, hostGood, followGood } = res.hostProblem;
        let why;
        if (!hostGood) {
          const wants = spec.host.map((c) => CLASSES[c].desc).join(' or ');
          why = `${name} should attach to ${wants}${host ? `, but here it follows 「${host.surface_form}」` : ''}.`;
        } else if (!followGood) {
          why = `${name} needs ${spec.follow.map((c) => CLASSES[c].desc).join(' or ')} after it.`;
        }
        return { status: 'incorrect', code: 'attach', message: why, tokens };
      }
      return { status: 'shake', code: 'missing', message: `Use ${name} in your answer.`, tokens };
    }

    // modern conjugation rules don't apply to classical (文語) forms
    const errors = item.classical ? [] : findGeneralErrors(tokens);
    if (errors.length) return { status: 'incorrect', code: 'error', message: errors[0], errors, tokens };
    return { status: 'correct', code: 'ok', message: '', tokens };
  }

  function furigana(sentence) {
    // Returns [{text, reading|null}] segments for ruby display.
    const toks = tokenizer.tokenize(sentence);
    return toks.map((t) => {
      const s = t.surface_form;
      if (!/[㐀-鿿々]/.test(s) || !t.reading || t.reading === '*') return { text: s, reading: null };
      const hira = t.reading.replace(/[ァ-ヶ]/g, (c) => String.fromCharCode(c.charCodeAt(0) - 0x60));
      // trim okurigana shared at the end, e.g. 食べ / たべ → 食(た)べ
      let i = s.length, j = hira.length;
      while (i > 0 && j > 0 && s[i - 1] === hira[j - 1]) { i--; j--; }
      let a = 0, b = 0;
      while (a < i && b < j && s[a] === hira[b]) { a++; b++; }
      const segs = [];
      if (a) segs.push({ text: s.slice(0, a), reading: null });
      segs.push({ text: s.slice(a, i), reading: hira.slice(b, j) });
      if (i < s.length) segs.push({ text: s.slice(i), reading: null });
      return segs;
    }).flat();
  }

  // Character ranges of the grammar point inside a sentence (for highlighting).
  function highlight(item, sentence) {
    const text = normalize(sentence);
    if (text.length !== sentence.length) return [];
    const res = matchSpecs(item.check || [], text, tokenize(text), ctx);
    if (!res.found) return [];
    return (res.ranges || [res.range]).filter(Boolean);
  }

  return { check, tokenize, furigana, highlight, isPotentialVerb, missingWords: (words, s) => missingWords(words, normalize(s), tokenize(normalize(s))) };
}
