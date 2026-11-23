// Pronunciation audio via the browser's built-in Japanese text-to-speech voice.
let voice = null;
function pickVoice() {
  if (!('speechSynthesis' in window)) return null;
  const vs = speechSynthesis.getVoices().filter((v) => /^ja/i.test(v.lang));
  voice = vs.find((v) => /google|kyoko|o-ren|nanami|haruka/i.test(v.name)) || vs[0] || null;
  return voice;
}
if ('speechSynthesis' in window) speechSynthesis.onvoiceschanged = pickVoice;

export const canSpeak = () => 'speechSynthesis' in window;

export function speak(text, rate = 0.9) {
  if (!canSpeak() || !text) return;
  const u = new SpeechSynthesisUtterance(text.replace(/[〜～]/g, ''));
  u.lang = 'ja-JP';
  u.rate = rate;
  const v = voice || pickVoice();
  if (v) u.voice = v;
  speechSynthesis.cancel();
  speechSynthesis.speak(u);
}
