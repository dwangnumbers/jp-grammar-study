// Small constructors so the curriculum files stay readable.
//   P  = particle      (WaniKani's radicals: the building blocks)
//   C  = conjugation   (WaniKani's kanji: forms built from stems)
//   Ph = phrase        (WaniKani's vocabulary: patterns built from the others)
//
// Item fields
//   id         unique, stable id (progress is stored against it — never rename)
//   grammar    what is shown on the card
//   meaning    primary English meaning
//   also       alternative meanings / nuances
//   reading    kana pronunciation
//   romaji     romanised pronunciation
//   structure  how it is formed
//   explain    lesson explanation
//   examples   [[japanese, english], …]
//   parts      ids of the items it is built from (must be Guru'd to unlock)
//   check      sentence-checker specs, see js/checker.js
const make = (type) => (o) => ({ type, also: [], parts: [], ...o });
export const P = make('particle');
export const C = make('conjugation');
export const Ph = make('phrase');

// Review prompts. Each item has one; a review shows the context and you write
// the missing reply / sentence, using the grammar point and the required words.
//   D(scene, [[speaker, japanese, english], …], task, words, modelAnswer)
//       a conversation — you write the next line
//   Pa(scene, passageJa, passageEn, task, words, modelAnswer)
//       a passage with one blank (＿ in Japanese, ___ in English) — you fill it in
// `words` is a space-separated list of words that must appear in the answer, in
// any conjugation, in kanji or kana. Use | for alternatives (いい|良い).
const wordList = (w) => w.split(/\s+/).filter(Boolean);
export const D = (scene, lines, task, words, answer) => ({
  kind: 'dialogue', scene, lines: lines.map(([who, ja, en]) => ({ who, ja, en })), task, words: wordList(words), answer,
});
export const Pa = (scene, ja, en, task, words, answer) => ({ kind: 'passage', scene, ja, en, task, words: wordList(words), answer });
