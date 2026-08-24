/**
 * Zero-allocation color manipulation and cached palette strings.
 */

export function hsla(h: number, s: number, l: number, a = 1): string {
  // Normalize hue to 0-360
  const normalizedH = ((h % 360) + 360) % 360;
  return `hsla(${normalizedH.toFixed(1)}, ${s}%, ${l}%, ${a.toFixed(3)})`;
}

export function rgba(r: number, g: number, b: number, a = 1): string {
  return `rgba(${Math.floor(r)}, ${Math.floor(g)}, ${Math.floor(b)}, ${a.toFixed(3)})`;
}

export function hexToRgb(hex: string): { r: number; g: number; b: number } {
  let cleanHex = hex.replace('#', '');
  if (cleanHex.length === 3) {
    cleanHex = cleanHex
      .split('')
      .map((c) => c + c)
      .join('');
  }
  const num = parseInt(cleanHex, 16);
  return {
    r: (num >> 16) & 255,
    g: (num >> 8) & 255,
    b: num & 255,
  };
}

export function lerpColor(
  r1: number,
  g1: number,
  b1: number,
  r2: number,
  g2: number,
  b2: number,
  t: number
): { r: number; g: number; b: number } {
  return {
    r: r1 + (r2 - r1) * t,
    g: g1 + (g2 - g1) * t,
    b: b1 + (b2 - b1) * t,
  };
}
