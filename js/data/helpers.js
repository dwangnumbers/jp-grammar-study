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
