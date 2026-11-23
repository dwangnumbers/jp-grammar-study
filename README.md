# 文法 JP Grammar Study

A Japanese grammar spaced-repetition app in the WaniKani format. It covers 392 grammar points over 60 levels, starting with は and です and ending with classical Japanese.

WaniKani teaches radicals, kanji and vocabulary, and you pass a review by typing the meaning and the reading. This app teaches **particles**, **conjugations** and **phrases**, and **you pass a review by writing your own grammatically correct Japanese sentence that uses the grammar point.**

It is a static site written in plain HTML, CSS and JavaScript, with a dark theme and no build step.

## How it maps to WaniKani

| WaniKani | JP Grammar Study | Color |
|---|---|---|
| Radicals: the building blocks | **Particles** (は, を, こそ, すら, ぞ …) | Blue |
| Kanji: built from radicals; they gate level-ups | **Conjugations** (〜ます, て-form, potential, 〜べき, 〜けり …) | Pink |
| Vocabulary: built from kanji | **Phrases** (〜てもいい, 〜わけにはいかない, 〜をものともせずに …) | Purple |
| Meaning + reading answers | **An original example sentence** | |

The parts of WaniKani that are copied directly:

- **SRS stages.** Apprentice I–IV, Guru I–II, Master, Enlightened, Burned.
- **Review intervals.** 4h · 8h · 23h · 47h · 1 week · 2 weeks · 1 month · 4 months. Levels 1–2 use the faster 2h · 4h · 8h · 23h. Review times round down to the hour.
- **Wrong-answer penalty.** `new stage = current − ceil(wrong ÷ 2) × (2 if Guru or higher, else 1)`, and an item never drops below Apprentice I.
- **Unlocks.** An item unlocks once every item it is built from reaches Guru. For example, 〜てもいい needs the て-form and も.
- **Level-ups.** You go up a level when 90% of the current level's conjugations reach Guru.
- **Sessions.** Lessons come in batches of 5. Each item has tabs for **Grammar → Meaning → Pronunciation → Examples**, and a quiz follows the batch. Reviews put missed items back in the queue, offer Wrap up, and end with a summary.
- **Pages and extras.** Dashboard, review forecast, item spread, critical-condition items, level and type pages, item pages with notes, search, and Extra Study.

### Levels

| Levels | Stage | Content |
|---|---|---|
| 1–10 | 快 Pleasant | Foundations (≈ JLPT N5) |
| 11–20 | 苦 Painful | Elementary (≈ JLPT N4) |
| 21–30 | 死 Death | Intermediate (≈ JLPT N3) |
| 31–40 | 地獄 Hell | Upper-intermediate (≈ JLPT N2) |
| 41–50 | 天国 Paradise | Advanced (≈ JLPT N1) |
| 51–60 | 現実 Reality | Classical Japanese (けり, む, べし, 係り結び, 候文), kanbun forms, advanced keigo, legal and literary rhetoric |

## How answers are graded

**Built-in checker (always on, works offline).** The [kuromoji](https://github.com/takuyaa/kuromoji.js) morphological analyzer runs in the browser and breaks your sentence into words. The checker then looks at three things:

1. **Is this a real attempt?** Answers that are empty, contain romaji, are too short, or copy a lesson example **shake** and don't count, the same way WaniKani shakes an answer typed in the wrong field. If the grammar point doesn't appear at all, that shakes too.
2. **Is the grammar attached to the right kind of word?** For example, 〜てもいい must follow a て-form, 〜たばかり a た-form, and 〜べき a dictionary-form verb.
3. **Are there common errors?** It catches mistakes such as 食べるます, 書きて, 読んて, 高いだ, 寒いでした, 行くです and doubled particles.

A rule-based checker can't prove that a whole sentence sounds natural. If you write something odd that it accepts, or it rejects a correct sentence, use **"My answer was right"**, just like the override that experienced WaniKani users rely on.

**AI grading (optional).** Go to Settings → AI grading and add your own [Anthropic API key](https://console.anthropic.com/). Claude will then grade every sentence like a teacher would, explain its verdict, and show a corrected sentence when you're wrong. The key is stored only in your browser, is sent only to `api.anthropic.com`, and is never included in exports. AI grading is especially recommended for levels 51–60.

### Other features

- **Romaji → kana input.** Use the **あ** button during reviews; uppercase letters give katakana. Leave it off to type kanji with your own Japanese keyboard.
- **Pronunciation audio.** Uses your browser's Japanese text-to-speech voice.
- **Example sentences.** These get automatic furigana and grammar highlighting.
- **Your past sentences.** Each item page keeps a record of the sentences you've written.
- **Export and import.** Save your progress as a JSON file to back it up or move it to another device. Progress is otherwise stored in `localStorage`.
- **Skip ahead.** If you already know the basics, Settings → Current level lets you start at a higher level.

## Running it

ES modules and the analyzer's dictionary have to be served over HTTP, so opening `index.html` as a file won't work.

```bash
git clone https://github.com/dwangnumbers/jp-grammar-study
cd jp-grammar-study
python3 -m http.server 8000      # or: npm run serve
# open http://localhost:8000
```

**GitHub Pages:** go to the repo's Settings → Pages → Deploy from branch → `main` / `(root)`. The app is then at `https://dwangnumbers.github.io/jp-grammar-study/`.

The first visit downloads the analyzer's dictionary (about 18 MB). The browser caches it after that.

## Tests

```bash
npm install
npm test
```

The test suite checks the following:

- **Curriculum integrity.** IDs are unique, every part exists at the same level or lower, there are no dependency cycles, and every level has conjugations.
- **Examples.** All 784 example sentences pass their own item's checker.
- **Checker cases.** Hand-written correct sentences must be accepted and incorrect ones rejected.
- **SRS engine.** The penalty math, intervals and hour rounding behave like WaniKani's. A simulated perfect run reaches level 60, and every item eventually unlocks.

`npm test 21-30` runs only the given level range, and `npm test te-mo-ii` runs only that item.

## Project layout

```
index.html            app shell
css/style.css         dark theme
js/app.js             router + header
js/srs.js             spaced-repetition engine (WaniKani rules)
js/checker.js         sentence checker (spec DSL documented at the top of the file)
js/ai.js              optional Claude grading
js/data/stage1–6.js   the curriculum, 10 levels per file
js/views/             dashboard, lessons/reviews, browsing, settings
vendor/               kuromoji (Apache-2.0, IPADIC data) and WanaKana (MIT)
tests/                node test suite
```

### Adding or editing grammar

Each item in `js/data/stageN.js` has this shape:

```js
Ph({ id: 'te-mo-ii', grammar: '〜てもいい', meaning: "It's okay to …; may",
     reading: 'てもいい', romaji: 'te mo ii',
     structure: 'Verb / Adjective (て-form) + もいい',
     explain: '…',
     examples: [['窓を開けてもいいですか。', 'May I open the window?'], …],
     parts: ['te-form', 'mo'],                         // unlock requirements
     check: ['(て|で)も(いい|良い|…)@Vt,A,N'] })       // checker spec
```

Never rename an `id`, because progress is stored against it. The `check` mini-language is documented at the top of `js/checker.js`. After editing, run `npm test`.

## Credits

- Format inspired by [WaniKani](https://www.wanikani.com/) (Tofugu). This project is not affiliated with it.
- [kuromoji.js](https://github.com/takuyaa/kuromoji.js): Apache License 2.0. Dictionary data from mecab-ipadic, © Nara Institute of Science and Technology. See `vendor/kuromoji/`.
- [WanaKana](https://github.com/WaniKani/WanaKana): MIT License. See `vendor/wanakana/`.
- Classical quotations come from pre-modern works in the public domain: Ise Monogatari, Taketori Monogatari, Kokinshū, Tosa Nikki, Tannishō, the Analects, the 1917 Japanese Bible, and Aogeba Tōtoshi (1884).
