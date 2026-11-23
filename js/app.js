// App shell: hash router, header counts, background loading of the analyzer.
import { getState, onChange } from './store.js';
import { availableLessons, availableReviews, refresh } from './srs.js';
import { loadChecker, onCheckerReady } from './tokenizer.js';
import { renderDashboard } from './views/dashboard.js';
import { renderLevels, renderLevel, renderType, renderItem, renderSearch } from './views/browse.js';
import { renderLessons, renderReviews, renderPractice, leaveSession } from './views/session.js';
import { renderSettings } from './views/settings.js';
import { toast } from './views/common.js';

const app = document.getElementById('app');
let cleanup = null;
let currentRoute = '';
let inSession = false;

function parse() {
  const h = decodeURIComponent(location.hash.replace(/^#\/?/, ''));
  const [name = '', ...rest] = h.split('/');
  return { name, rest, raw: h };
}

function route() {
  if (cleanup) { try { cleanup(); } catch (e) { console.error(e); } cleanup = null; }
  leaveSession();
  const { name, rest, raw } = parse();
  currentRoute = raw;
  inSession = ['lessons', 'reviews', 'practice'].includes(name);
  app.innerHTML = '';
  window.scrollTo(0, 0);
  switch (name) {
    case '': case 'dashboard': renderDashboard(app); break;
    case 'lessons': cleanup = renderLessons(app); break;
    case 'reviews': cleanup = renderReviews(app); break;
    case 'practice': cleanup = renderPractice(app, rest[0]); break;
    case 'levels': renderLevels(app); break;
    case 'level': renderLevel(app, +rest[0] || getState().level); break;
    case 'type': renderType(app, rest[0], rest[1] !== undefined ? +rest[1] : undefined); break;
    case 'item': renderItem(app, rest.join('/')); break;
    case 'search': renderSearch(app, rest.join('/')); break;
    case 'settings': renderSettings(app); break;
    default: app.innerHTML = '<div class="empty-state"><div class="big">迷</div>Page not found. <a href="#/">Go to the dashboard</a>.</div>';
  }
  // if the session view decided there was nothing to do, it's not a session
  if (!document.body.classList.contains('in-session')) inSession = false;
  highlightNav(name, rest);
  updateHeader();
}

function highlightNav(name, rest) {
  const key = name === 'type' ? `type/${rest[0]}` : name || 'dashboard';
  document.querySelectorAll('#nav a').forEach((a) => a.classList.toggle('active', a.dataset.route === key));
}

function updateHeader() {
  const state = getState();
  const l = availableLessons(state).length;
  const r = availableReviews(state).length;
  document.getElementById('header-actions').innerHTML = `
    <a class="pill level" href="#/level/${state.level}" title="Your level">Lv <span class="n">${state.level}</span></a>
    <a class="pill lessons" href="#/lessons" title="Lessons">Lessons <span class="n">${l}</span></a>
    <a class="pill reviews" href="#/reviews" title="Reviews">Reviews <span class="n">${r}</span></a>`;
  document.title = `${r ? `(${r}) ` : ''}JP Grammar Study — 文法`;
}

document.getElementById('search-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const q = document.getElementById('search-input').value.trim();
  location.hash = `#/search/${encodeURIComponent(q)}`;
});

window.addEventListener('hashchange', route);
onChange(updateHeader);

// Reviews become available on the hour; refresh counts every minute.
setInterval(() => {
  const state = getState();
  refresh(state);
  updateHeader();
  if (!inSession && (currentRoute === '' || currentRoute === 'dashboard')) renderDashboard(app);
}, 60 * 1000);

// Load the analyzer in the background; re-render pages that show example
// sentences so they get furigana and grammar highlighting.
onCheckerReady(() => {
  if (!inSession && currentRoute.startsWith('item')) route();
});
loadChecker().catch(() => toast('Could not load the Japanese analyzer — check your connection.'));

route();
