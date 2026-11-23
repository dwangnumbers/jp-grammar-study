import stage1 from './stage1.js';
import stage2 from './stage2.js';
import stage3 from './stage3.js';
import stage4 from './stage4.js';
import stage5 from './stage5.js';
import stage6 from './stage6.js';

// WaniKani-style level groups
export const STAGES = [
  { name: 'Pleasant', kanji: '快', from: 1, to: 10, blurb: 'Foundations (JLPT N5)' },
  { name: 'Painful', kanji: '苦', from: 11, to: 20, blurb: 'Elementary (JLPT N4)' },
  { name: 'Death', kanji: '死', from: 21, to: 30, blurb: 'Intermediate (JLPT N3)' },
  { name: 'Hell', kanji: '地獄', from: 31, to: 40, blurb: 'Upper-intermediate (JLPT N2)' },
  { name: 'Paradise', kanji: '天国', from: 41, to: 50, blurb: 'Advanced (JLPT N1)' },
  { name: 'Reality', kanji: '現実', from: 51, to: 60, blurb: 'Literary & Classical Japanese' },
];

export const TYPES = {
  particle: { label: 'Particle', plural: 'Particles', order: 0 },
  conjugation: { label: 'Conjugation', plural: 'Conjugations', order: 1 },
  phrase: { label: 'Phrase', plural: 'Phrases', order: 2 },
};

export const MAX_LEVEL = 60;

export const ITEMS = [];
for (const stage of [stage1, stage2, stage3, stage4, stage5, stage6]) {
  for (const [level, items] of Object.entries(stage)) {
    items.forEach((it, i) => ITEMS.push({ ...it, level: Number(level), order: i }));
  }
}
ITEMS.sort((a, b) => a.level - b.level || TYPES[a.type].order - TYPES[b.type].order || a.order - b.order);

export const BY_ID = new Map(ITEMS.map((it) => [it.id, it]));

// Reverse index: which items use this one as a part ("Found in")
export const USED_IN = new Map();
for (const it of ITEMS) for (const p of it.parts) {
  if (!USED_IN.has(p)) USED_IN.set(p, []);
  USED_IN.get(p).push(it.id);
}

export const stageOfLevel = (lvl) => STAGES.find((s) => lvl >= s.from && lvl <= s.to);
export const itemsAtLevel = (lvl) => ITEMS.filter((it) => it.level === lvl);
