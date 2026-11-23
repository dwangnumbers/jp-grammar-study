// Loads the kuromoji morphological analyser (~18 MB dictionary, cached by the
// browser after the first visit) and builds the sentence checker on top of it.
import { createChecker } from './checker.js';

let promise = null;
let checker = null;
const waiters = new Set();

export const getChecker = () => checker;
export const onCheckerReady = (fn) => { if (checker) fn(checker); else waiters.add(fn); };

function loadScript(src) {
  return new Promise((res, rej) => {
    const s = document.createElement('script');
    s.src = src; s.onload = res; s.onerror = () => rej(new Error('Failed to load ' + src));
    document.head.appendChild(s);
  });
}

export function loadChecker() {
  if (!promise) {
    promise = (async () => {
      if (!window.kuromoji) await loadScript('vendor/kuromoji/kuromoji.js');
      const tokenizer = await new Promise((res, rej) =>
        window.kuromoji.builder({ dicPath: 'vendor/kuromoji/dict/' }).build((err, t) => (err ? rej(err) : res(t))));
      checker = createChecker(tokenizer);
      waiters.forEach((fn) => fn(checker));
      waiters.clear();
      return checker;
    })();
    promise.catch((e) => { console.error(e); promise = null; });
  }
  return promise;
}
