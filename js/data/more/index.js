// Extra review contexts, keyed by item id. Each item's pool is its context in
// js/data/prompts*.js plus the ones here; reviews rotate through the pool.
import l01 from './L01-05.js';
import l06 from './L06-10.js';
import l11 from './L11-15.js';
import l16 from './L16-20.js';
import l21 from './L21-25.js';
import l26 from './L26-30.js';
import l31 from './L31-35.js';
import l36 from './L36-40.js';
import l41 from './L41-45.js';
import l46 from './L46-50.js';
import l51 from './L51-55.js';
import l56 from './L56-60.js';

export default { ...l01, ...l06, ...l11, ...l16, ...l21, ...l26, ...l31, ...l36, ...l41, ...l46, ...l51, ...l56 };
