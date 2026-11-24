// Optional AI grading with your own Anthropic API key.
//
// The local checker verifies that the grammar point is present and attached
// correctly, and catches common conjugation mistakes — but it can't judge
// whether a whole sentence is natural Japanese. With AI grading on, each
// answer is sent to Claude, which grades it like a teacher would.
//
// Your key is stored only in this browser's localStorage and is sent only to
// api.anthropic.com. It is never included in exports.

export const AI_MODELS = [
  { id: 'claude-haiku-5-5', label: 'Claude Haiku 5.5 — fastest, cheapest' },
  { id: 'claude-sonnet-5-5', label: 'Claude Sonnet 5.5 — recommended' },
  { id: 'claude-opus-5-5', label: 'Claude Opus 5.5 — most careful' },
];

const SYSTEM = `You are an expert Japanese teacher grading answers in a grammar spaced-repetition app.
The learner was shown one grammar point and a context — either a conversation they must reply to, or a passage with one missing sentence they must fill in — plus a task in English and a list of required words.

Grade the learner's answer:
- "correct": the answer is grammatical Japanese a native speaker would accept, it uses the target grammar point with its correct meaning/function and connecting form, it fits the context and does what the task asks, and it uses each required word (any conjugation, kanji or kana). Minor stylistic awkwardness, unusual-but-valid vocabulary, all-hiragana writing, and casual or polite register are all fine unless the context clearly calls for a register. Be fair, not pedantic.
- "incorrect": the answer attempts the target grammar but has a real grammatical error (wrong conjugation, connection, particle, or meaning/usage of the grammar point), or it doesn't fit the context or doesn't do what the task asks.
- "missing": the answer does not use the target grammar point at all (or uses a different grammar point instead), or leaves out a required word.
For classical (文語) grammar points, judge by classical grammar rules; mixing a classical form into an otherwise modern sentence is acceptable if the form itself is used correctly.

Reply with ONLY a JSON object, no markdown:
{"verdict":"correct"|"incorrect"|"missing","feedback":"one or two short sentences in English explaining the verdict","correction":"a corrected version of the learner's answer if incorrect, otherwise an empty string"}`;

export async function gradeWithAI({ apiKey, model, item, prompt: ctx, sentence, signal }) {
  const prompt = [
    `Grammar point: ${item.grammar}`,
    `Type: ${item.type}`,
    `Meaning: ${item.meaning}${item.also && item.also.length ? ` (also: ${item.also.join('; ')})` : ''}`,
    `Formation: ${item.structure}`,
    item.classical ? 'This is a classical (文語) grammar point.' : '',
    ctx ? `Context (${ctx.kind === 'passage' ? 'passage — the learner writes the sentence at ＿' : 'conversation — the learner writes the next line'}): ${ctx.scene}` : '',
    ctx && ctx.kind === 'passage' ? `Passage: ${ctx.ja}\n(English: ${ctx.en})` : '',
    ctx && ctx.kind === 'dialogue' ? ctx.lines.map((l) => `${l.who}: ${l.ja} (${l.en})`).join('\n') : '',
    ctx ? `Task: ${ctx.task}` : '',
    ctx ? `Required words: ${ctx.words.map((w) => w.replace(/\|/g, ' or ')).join(', ')}` : '',
    `Learner's answer: ${sentence}`,
  ].filter(Boolean).join('\n');

  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    signal,
    headers: {
      'content-type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
      'anthropic-dangerous-direct-browser-access': 'true',
    },
    body: JSON.stringify({
      model,
      max_tokens: 400,
      system: SYSTEM,
      messages: [{ role: 'user', content: prompt }],
    }),
  });
  if (!res.ok) {
    let msg = `${res.status}`;
    try { const j = await res.json(); msg = j.error?.message || msg; } catch {}
    throw new Error(`AI grading failed: ${msg}`);
  }
  const data = await res.json();
  const text = (data.content || []).filter((c) => c.type === 'text').map((c) => c.text).join('');
  const m = text.match(/\{[\s\S]*\}/);
  if (!m) throw new Error('AI grading returned an unexpected response.');
  const out = JSON.parse(m[0]);
  if (!['correct', 'incorrect', 'missing'].includes(out.verdict)) throw new Error('AI grading returned an unexpected verdict.');
  return { verdict: out.verdict, feedback: String(out.feedback || ''), correction: String(out.correction || '') };
}

export async function testKey(apiKey, model) {
  const r = await gradeWithAI({
    apiKey, model,
    item: { grammar: 'は', type: 'particle', meaning: 'Topic marker', structure: 'Noun + は', also: [] },
    sentence: '私は学生です。',
  });
  return r;
}
