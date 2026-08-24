/**
 * Fast math utility functions and noise generators optimized for zero-allocation loops.
 */

export function lerp(start: number, end: number, t: number): number {
  return start * (1 - t) + end * t;
}

export function clamp(val: number, min: number, max: number): number {
  return val < min ? min : val > max ? max : val;
}

export function map(
  val: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number
): number {
  return outMin + ((val - inMin) / (inMax - inMin)) * (outMax - outMin);
}

export function dist(x1: number, y1: number, x2: number, y2: number): number {
  const dx = x2 - x1;
  const dy = y2 - y1;
  return Math.sqrt(dx * dx + dy * dy);
}

export function distSq(x1: number, y1: number, x2: number, y2: number): number {
  const dx = x2 - x1;
  const dy = y2 - y1;
  return dx * dx + dy * dy;
}

// 2D Simplex / Perlin-like gradient noise without allocations
const PERM = new Uint8Array(512);
const GRAD_X = new Float32Array(512);
const GRAD_Y = new Float32Array(512);

// Deterministic seed for reproducible noise
(function initNoise() {
  const p = new Uint8Array(256);
  for (let i = 0; i < 256; i++) p[i] = i;
  // Fisher-Yates shuffle with simple PRNG
  let seed = 1337;
  for (let i = 255; i > 0; i--) {
    seed = (seed * 16807) % 2147483647;
    const j = seed % (i + 1);
    const tmp = p[i];
    p[i] = p[j];
    p[j] = tmp;
  }
  for (let i = 0; i < 512; i++) {
    PERM[i] = p[i & 255];
    const angle = (PERM[i] / 256) * Math.PI * 2;
    GRAD_X[i] = Math.cos(angle);
    GRAD_Y[i] = Math.sin(angle);
  }
})();

function fade(t: number): number {
  return t * t * t * (t * (t * 6 - 15) + 10);
}

export function noise2D(x: number, y: number): number {
  const X = Math.floor(x) & 255;
  const Y = Math.floor(y) & 255;

  const xf = x - Math.floor(x);
  const yf = y - Math.floor(y);

  const u = fade(xf);
  const v = fade(yf);

  const aa = PERM[PERM[X] + Y];
  const ab = PERM[PERM[X] + Y + 1];
  const ba = PERM[PERM[X + 1] + Y];
  const bb = PERM[PERM[X + 1] + Y + 1];

  const g1 = GRAD_X[aa] * xf + GRAD_Y[aa] * yf;
  const g2 = GRAD_X[ba] * (xf - 1) + GRAD_Y[ba] * yf;
  const g3 = GRAD_X[ab] * xf + GRAD_Y[ab] * (yf - 1);
  const g4 = GRAD_X[bb] * (xf - 1) + GRAD_Y[bb] * (yf - 1);

  const x1 = lerp(g1, g2, u);
  const x2 = lerp(g3, g4, u);

  return lerp(x1, x2, v);
}

export function fbm2D(x: number, y: number, octaves = 3, lacunarity = 2.0, gain = 0.5): number {
  let total = 0;
  let frequency = 1.0;
  let amplitude = 1.0;
  let maxValue = 0;

  for (let i = 0; i < octaves; i++) {
    total += noise2D(x * frequency, y * frequency) * amplitude;
    maxValue += amplitude;
    amplitude *= gain;
    frequency *= lacunarity;
  }

  return total / maxValue;
}
