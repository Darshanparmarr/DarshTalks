// Deterministic, seeded randomization utilities.
// These are pure functions: the same seed always produces the same sequence,
// which is what keeps server render and client hydration identical.

// xmur3 string hash -> 32-bit seed.
export function hashStringToSeed(str) {
  let h = 1779033703 ^ str.length;
  for (let i = 0; i < str.length; i++) {
    h = Math.imul(h ^ str.charCodeAt(i), 3432918353);
    h = (h << 13) | (h >>> 19);
  }
  h = Math.imul(h ^ (h >>> 16), 2246822507);
  h = Math.imul(h ^ (h >>> 13), 3266489909);
  return (h ^= h >>> 16) >>> 0;
}

// mulberry32 PRNG. Returns a function producing floats in [0, 1).
export function mulberry32(seed) {
  let a = seed >>> 0;
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Build a seeded random float generator from any string seed.
export function createRng(seed) {
  return mulberry32(hashStringToSeed(String(seed)));
}

// Deterministic integer in [0, max) from a numeric random in [0,1).
export function randInt(rng, max) {
  return Math.floor(rng() * max);
}

// Deterministic Fisher-Yates shuffle. Returns a new array; input untouched.
export function seededShuffle(array, seed) {
  const rng = createRng(seed);
  const out = array.slice();
  for (let i = out.length - 1; i > 0; i--) {
    const j = randInt(rng, i + 1);
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}
