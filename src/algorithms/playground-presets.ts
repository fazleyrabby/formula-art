// Complete Standalone Executable Canvas 2D Recipes for all 55 Formula Art Presets

export const presetCatalogMap: Record<string, string> = {
  // 1. Organic Wave
  'organic-wave': `// Organic Wave (Harmonic Wave Superposition)
ctx.fillStyle = 'rgba(6, 8, 12, 0.18)';
ctx.fillRect(0, 0, width, height);

const cx = width * 0.5;
const cy = height * 0.5;
const baseR = Math.min(width, height) * 0.35;
const t = time * 1.2;

for (let layer = 1; layer <= 6; layer++) {
  const normL = layer / 6;
  ctx.beginPath();
  const steps = 360;
  for (let i = 0; i <= steps; i++) {
    const phi = (i / steps) * Math.PI * 2;
    const wave = Math.sin(phi * 6 + t * 2 + normL * 3) * Math.cos(phi * 4 - t) * (baseR * 0.25 * normL);
    const r = baseR * 0.7 * normL + wave;
    const px = cx + Math.cos(phi) * r;
    const py = cy + Math.sin(phi) * r;
    if (i === 0) ctx.moveTo(px, py);
    else ctx.lineTo(px, py);
  }
  ctx.closePath();
  const hue = (195 + layer * 15 + time * 20) % 360;
  ctx.strokeStyle = 'hsla(' + hue + ', 95%, 70%, ' + (0.15 + normL * 0.7) + ')';
  ctx.lineWidth = 1.8;
  ctx.stroke();
}`,

  // 2. Phyllotaxis Spiral
  'phyllotaxis-spiral': `// Phyllotaxis Golden Spiral
ctx.fillStyle = 'rgba(4, 6, 10, 0.25)';
ctx.fillRect(0, 0, width, height);

const cx = width * 0.5;
const cy = height * 0.5;
const c = 8.5 * (Math.min(width, height) / 500);
const goldenAngle = 137.508 * (Math.PI / 180);
const N = 400;

for (let n = 1; n <= N; n++) {
  const theta = n * goldenAngle + time * 0.4;
  const r = c * Math.sqrt(n) * (1 + 0.15 * Math.sin(time * 2 + n * 0.05));
  const px = cx + Math.cos(theta) * r;
  const py = cy + Math.sin(theta) * r;
  const hue = (n * 0.8 + time * 30) % 360;
  const dotR = 1.2 + (n / N) * 3.5;

  ctx.fillStyle = 'hsla(' + hue + ', 95%, 72%, 0.85)';
  ctx.beginPath();
  ctx.arc(px, py, dotR, 0, Math.PI * 2);
  ctx.fill();
}`,

  // 3. Superformula Bloom
  'superformula-bloom': `// Superformula Gielis Bloom
ctx.fillStyle = 'rgba(5, 7, 12, 0.2)';
ctx.fillRect(0, 0, width, height);

const cx = width * 0.5;
const cy = height * 0.5;
const scale = Math.min(width, height) * 0.38;
const t = time * 1.2;

const m = 6 + Math.sin(t * 0.5) * 2;
const n1 = 0.5 + Math.sin(t) * 0.3;
const n2 = 1.7;
const n3 = 1.7;
const a = 1.0, b = 1.0;

ctx.beginPath();
const steps = 400;
for (let i = 0; i <= steps; i++) {
  const phi = (i / steps) * Math.PI * 2;
  const t1 = Math.pow(Math.abs(Math.cos(m * phi / 4) / a), n2);
  const t2 = Math.pow(Math.abs(Math.sin(m * phi / 4) / b), n3);
  const r = Math.pow(t1 + t2, -1 / n1) * scale * 0.5;

  const px = cx + Math.cos(phi) * r;
  const py = cy + Math.sin(phi) * r;
  if (i === 0) ctx.moveTo(px, py);
  else ctx.lineTo(px, py);
}
ctx.closePath();

const hue = (time * 25 + 280) % 360;
ctx.strokeStyle = 'hsla(' + hue + ', 95%, 72%, 0.9)';
ctx.lineWidth = 2.2;
ctx.stroke();`,

  // 4. Perlin Tendrils
  'perlin-tendrils': `// Perlin Noise Flow Tendrils
ctx.fillStyle = 'rgba(3, 4, 8, 0.08)';
ctx.fillRect(0, 0, width, height);

const cx = width * 0.5;
const cy = height * 0.5;
const t = time * 0.8;
const strands = 60;

for (let s = 0; s < strands; s++) {
  const normS = s / strands;
  const baseAngle = normS * Math.PI * 2;
  ctx.beginPath();
  let curX = cx + Math.cos(baseAngle) * 30;
  let curY = cy + Math.sin(baseAngle) * 30;
  ctx.moveTo(curX, curY);

  for (let step = 0; step < 35; step++) {
    const angle = Math.sin(curX * 0.01 + t) * Math.cos(curY * 0.01 - t) * Math.PI * 4;
    curX += Math.cos(angle) * 7;
    curY += Math.sin(angle) * 7;
    ctx.lineTo(curX, curY);
  }
  const hue = (160 + s * 4 + time * 15) % 360;
  ctx.strokeStyle = 'hsla(' + hue + ', 95%, 70%, 0.6)';
  ctx.lineWidth = 1.2;
  ctx.stroke();
}`,

  // 5. Vortex Filament
  'vortex-filament': `// Vortex Filament Biot-Savart Drift
ctx.fillStyle = 'rgba(4, 6, 12, 0.15)';
ctx.fillRect(0, 0, width, height);

const cx = width * 0.5;
const cy = height * 0.5;
const t = time * 1.4;
const rings = 40;

for (let r = 1; r <= rings; r++) {
  const normR = r / rings;
  const radius = normR * Math.min(width, height) * 0.42;
  const spin = (1 / (normR + 0.1)) * t * 0.4;

  ctx.beginPath();
  const steps = 60;
  for (let i = 0; i <= steps; i++) {
    const theta = (i / steps) * Math.PI * 2;
    const wave = Math.sin(theta * 5 - spin * 3) * (14 * normR);
    const px = cx + Math.cos(theta + spin) * (radius + wave);
    const py = cy + Math.sin(theta + spin) * (radius + wave);
    if (i === 0) ctx.moveTo(px, py);
    else ctx.lineTo(px, py);
  }
  ctx.closePath();
  const hue = (200 + normR * 80 + time * 20) % 360;
  ctx.strokeStyle = 'hsla(' + hue + ', 90%, 65%, ' + (0.1 + (1 - normR) * 0.7) + ')';
  ctx.lineWidth = 1.5;
  ctx.stroke();
}`,

  // 6. Curl Vector Field
  'curl-vector-field': `// Incompressible Curl Vector Streamlines
ctx.fillStyle = 'rgba(2, 4, 8, 0.12)';
ctx.fillRect(0, 0, width, height);

const cx = width * 0.5;
const cy = height * 0.5;
const t = time * 0.9;
const grid = 22;
const stepX = width / grid;
const stepY = height / grid;

for (let x = 1; x < grid; x++) {
  for (let y = 1; y < grid; y++) {
    const px = x * stepX;
    const py = y * stepY;
    const dx = (px - cx) * 0.008;
    const dy = (py - cy) * 0.008;

    const u = Math.sin(dy * 3 + t) - dx * 0.5;
    const v = Math.cos(dx * 3 - t) - dy * 0.5;
    const angle = Math.atan2(v, u);
    const len = 14;

    ctx.beginPath();
    ctx.moveTo(px, py);
    ctx.lineTo(px + Math.cos(angle) * len, py + Math.sin(angle) * len);
    const hue = (Math.sin(dx + dy + t) * 60 + 200) % 360;
    ctx.strokeStyle = 'hsla(' + hue + ', 95%, 70%, 0.7)';
    ctx.lineWidth = 1.4;
    ctx.stroke();
  }
}`,

  // 7. Smoke Lattice
  'smoke-lattice': `// Smoke Lattice Navier-Stokes Dissipation
ctx.fillStyle = 'rgba(4, 5, 9, 0.14)';
ctx.fillRect(0, 0, width, height);

const cx = width * 0.5;
const cy = height * 0.5;
const t = time * 1.1;

for (let k = 0; k < 30; k++) {
  const normK = k / 30;
  ctx.beginPath();
  const steps = 180;
  for (let i = 0; i <= steps; i++) {
    const phi = (i / steps) * Math.PI * 2;
    const r = Math.min(width, height) * 0.38 * (normK + 0.1 * Math.sin(phi * 4 + t * 2));
    const warp = Math.sin(phi * 7 - t * 3 + normK * 5) * 20;
    const px = cx + Math.cos(phi) * (r + warp);
    const py = cy + Math.sin(phi) * (r + warp);
    if (i === 0) ctx.moveTo(px, py);
    else ctx.lineTo(px, py);
  }
  ctx.closePath();
  ctx.strokeStyle = 'hsla(' + ((220 + k * 4) % 360) + ', 85%, 75%, 0.35)';
  ctx.lineWidth = 1.2;
  ctx.stroke();
}`,

  // 8. Viscous Gyre
  'viscous-gyre': `// Viscous Gyre Spiral Eddies
ctx.fillStyle = 'rgba(3, 5, 9, 0.2)';
ctx.fillRect(0, 0, width, height);

const cx = width * 0.5;
const cy = height * 0.5;
const t = time * 1.3;
const arms = 5;

for (let a = 0; a < arms; a++) {
  const armOffset = (a / arms) * Math.PI * 2;
  ctx.beginPath();
  for (let r = 10; r < Math.min(width, height) * 0.45; r += 4) {
    const theta = armOffset + Math.pow(r * 0.015, 1.4) - t;
    const px = cx + Math.cos(theta) * r;
    const py = cy + Math.sin(theta) * r;
    if (r === 10) ctx.moveTo(px, py);
    else ctx.lineTo(px, py);
  }
  ctx.strokeStyle = 'hsla(' + ((180 + a * 35 + time * 20) % 360) + ', 95%, 70%, 0.8)';
  ctx.lineWidth = 2.0;
  ctx.stroke();
}`,

  // 9. Atmospheric Tornado
  'atmospheric-tornado': `// Atmospheric Tornado Swirl
ctx.fillStyle = 'rgba(3, 4, 8, 0.18)';
ctx.fillRect(0, 0, width, height);

const cx = width * 0.5;
const t = time * 2.5;
const rings = 45;

for (let r = 0; r < rings; r++) {
  const normY = r / (rings - 1);
  const cy = height * (0.12 + normY * 0.78);
  const radius = Math.min(width, height) * (0.04 + Math.pow(1 - normY, 1.8) * 0.38);
  const wobble = Math.sin(t * 1.2 + normY * 4) * (25 * normY);

  ctx.beginPath();
  const steps = 36;
  for (let i = 0; i <= steps; i++) {
    const theta = (i / steps) * Math.PI * 2 + t * (4 - normY * 2.5);
    const rip = Math.sin(theta * 3 + t * 4) * (radius * 0.15);
    const px = cx + wobble + Math.cos(theta) * (radius + rip);
    const py = cy + Math.sin(theta) * (radius * 0.3);
    if (i === 0) ctx.moveTo(px, py);
    else ctx.lineTo(px, py);
  }
  ctx.closePath();
  ctx.strokeStyle = 'hsla(' + ((195 + normY * 60) % 360) + ', 85%, 68%, ' + (0.15 + (1 - normY) * 0.5) + ')';
  ctx.lineWidth = 1.4;
  ctx.stroke();
}`,

  // 10. Water Splash
  'water-splash': `// Worthington Water Splash Crown
ctx.fillStyle = '#03060d';
ctx.fillRect(0, 0, width, height);

const cx = width * 0.5;
const cy = height * 0.55;
const crownR = Math.min(width, height) * 0.28;
const t = time * 1.5;
const SPIKES = 16;

ctx.beginPath();
for (let i = 0; i <= 360; i++) {
  const phi = (i / 360) * Math.PI * 2;
  const spike = Math.pow(Math.max(0, Math.sin(phi * SPIKES + t)), 4) * 55;
  const r = crownR + Math.sin(t * 3) * 10;
  const px = cx + Math.cos(phi) * r;
  const py = cy + Math.sin(phi) * (r * 0.45) - spike;
  if (i === 0) ctx.moveTo(px, py);
  else ctx.lineTo(px, py);
}
ctx.closePath();
ctx.fillStyle = 'rgba(56, 189, 248, 0.25)';
ctx.fill();
ctx.strokeStyle = '#38bdf8';
ctx.lineWidth = 2.4;
ctx.stroke();`,

  // 11. Rain Effect
  'rain-effect': `// Rainstorm Precipitation
ctx.fillStyle = 'rgba(3, 6, 12, 0.3)';
ctx.fillRect(0, 0, width, height);

const drops = 120;
for (let d = 0; d < drops; d++) {
  const seed = d * 137.5;
  const speed = 450 + (d % 10) * 40;
  const rx = (seed * 3) % width;
  const ry = ((time * speed + seed * 7) % (height + 60)) - 30;
  const len = 18 + (d % 5) * 6;

  ctx.beginPath();
  ctx.moveTo(rx, ry);
  ctx.lineTo(rx - 3, ry + len);
  ctx.strokeStyle = 'rgba(186, 230, 253, 0.7)';
  ctx.lineWidth = 1.3;
  ctx.stroke();
}`,

  // 12. Gravitational Swarm
  'gravitational-swarm': `// N-Body Gravitational Swarm
ctx.fillStyle = 'rgba(2, 3, 6, 0.2)';
ctx.fillRect(0, 0, width, height);

const cx = width * 0.5;
const cy = height * 0.5;
const t = time * 0.9;
const bodies = 180;

for (let b = 0; b < bodies; b++) {
  const theta = (b / bodies) * Math.PI * 2 + t * 0.3;
  const r = Math.min(width, height) * 0.32 * (0.3 + 0.7 * Math.sin(b * 0.15 + t));
  const px = cx + Math.cos(theta) * r + Math.sin(t * 3 + b) * 15;
  const py = cy + Math.sin(theta) * r + Math.cos(t * 2 + b) * 15;

  ctx.fillStyle = 'hsla(' + ((b * 2 + time * 30) % 360) + ', 95%, 72%, 0.85)';
  ctx.beginPath();
  ctx.arc(px, py, 2.2, 0, Math.PI * 2);
  ctx.fill();
}`,

  // 13. Lissajous Web
  'lissajous-web': `// Lissajous Knot Web
ctx.fillStyle = 'rgba(5, 7, 12, 0.15)';
ctx.fillRect(0, 0, width, height);

const cx = width * 0.5;
const cy = height * 0.5;
const scale = Math.min(width, height) * 0.4;
const t = time * 1.1;

const wx = 3;
const wy = 4;
const delta = t * 0.8;

ctx.beginPath();
const steps = 400;
for (let i = 0; i <= steps; i++) {
  const theta = (i / steps) * Math.PI * 2;
  const px = cx + Math.sin(wx * theta + delta) * scale;
  const py = cy + Math.sin(wy * theta) * scale;
  if (i === 0) ctx.moveTo(px, py);
  else ctx.lineTo(px, py);
}
const hue = (time * 30 + 170) % 360;
ctx.strokeStyle = 'hsla(' + hue + ', 95%, 70%, 0.9)';
ctx.lineWidth = 2.4;
ctx.stroke();`,

  // 14. Brownian Constellation
  'brownian-constellation': `// Brownian Motion Constellation
ctx.fillStyle = 'rgba(4, 6, 12, 0.18)';
ctx.fillRect(0, 0, width, height);

const nodes = 45;
const pts = [];
for (let i = 0; i < nodes; i++) {
  const seed = i * 23.45;
  const px = (width * 0.5) + Math.sin(time * 0.8 + seed) * (width * 0.35);
  const py = (height * 0.5) + Math.cos(time * 0.7 + seed * 1.3) * (height * 0.35);
  pts.push({ x: px, y: py });
}

// Distance connection graph
for (let i = 0; i < nodes; i++) {
  for (let j = i + 1; j < nodes; j++) {
    const dist = Math.hypot(pts[i].x - pts[j].x, pts[i].y - pts[j].y);
    if (dist < 110) {
      ctx.beginPath();
      ctx.moveTo(pts[i].x, pts[i].y);
      ctx.lineTo(pts[j].x, pts[j].y);
      ctx.strokeStyle = 'rgba(56, 189, 248, ' + (1 - dist / 110) * 0.6 + ')';
      ctx.lineWidth = 1.0;
      ctx.stroke();
    }
  }
}
for (let i = 0; i < nodes; i++) {
  ctx.fillStyle = '#f0f9ff';
  ctx.beginPath();
  ctx.arc(pts[i].x, pts[i].y, 2.5, 0, Math.PI * 2);
  ctx.fill();
}`,

  // 15. Boids Flocking
  'boids-flocking': `// Craig Reynolds Boids Emergence
ctx.fillStyle = 'rgba(2, 4, 8, 0.2)';
ctx.fillRect(0, 0, width, height);

const count = 75;
const t = time * 1.2;

for (let b = 0; b < count; b++) {
  const theta = (b / count) * Math.PI * 2 + t * 0.6;
  const r = Math.min(width, height) * 0.32 + Math.sin(t * 2 + b * 0.3) * 45;
  const bx = (width * 0.5) + Math.cos(theta) * r;
  const by = (height * 0.5) + Math.sin(theta) * r;
  const heading = theta + Math.PI / 2;

  ctx.save();
  ctx.translate(bx, by);
  ctx.rotate(heading);
  ctx.beginPath();
  ctx.moveTo(0, -7);
  ctx.lineTo(-4, 6);
  ctx.lineTo(0, 4);
  ctx.lineTo(4, 6);
  ctx.closePath();
  ctx.fillStyle = 'hsla(' + ((b * 4 + time * 30) % 360) + ', 95%, 75%, 0.85)';
  ctx.fill();
  ctx.restore();
}`,

  // 16. Hyperbolic Tessellation
  'hyperbolic-tessellation': `// Poincaré Hyperbolic Disk Tessellation
ctx.fillStyle = '#03050a';
ctx.fillRect(0, 0, width, height);

const cx = width * 0.5;
const cy = height * 0.5;
const diskR = Math.min(width, height) * 0.42;

ctx.beginPath();
ctx.arc(cx, cy, diskR, 0, Math.PI * 2);
ctx.strokeStyle = '#38bdf8';
ctx.lineWidth = 2.4;
ctx.stroke();

const t = time * 0.5;
for (let k = 1; k <= 12; k++) {
  const theta = (k / 12) * Math.PI * 2 + t;
  ctx.beginPath();
  const ox = cx + Math.cos(theta) * (diskR * 0.6);
  const oy = cy + Math.sin(theta) * (diskR * 0.6);
  ctx.arc(ox, oy, diskR * 0.4, 0, Math.PI * 2);
  ctx.strokeStyle = 'hsla(' + ((k * 30 + time * 20) % 360) + ', 90%, 70%, 0.55)';
  ctx.lineWidth = 1.4;
  ctx.stroke();
}`,

  // 17. Sacred Mandala
  'sacred-mandala': `// Sacred Geometry Mandala
ctx.fillStyle = '#030408';
ctx.fillRect(0, 0, width, height);

const cx = width * 0.5;
const cy = height * 0.5;
const maxR = Math.min(width, height) * 0.4;
const t = time * 0.8;
const folds = 8;

for (let ring = 1; ring <= 6; ring++) {
  const r = (ring / 6) * maxR;
  for (let f = 0; f < folds; f++) {
    const angle = (f / folds) * Math.PI * 2 + (ring % 2 === 0 ? t : -t);
    const px = cx + Math.cos(angle) * r;
    const py = cy + Math.sin(angle) * r;

    ctx.beginPath();
    ctx.arc(px, py, r * 0.35, 0, Math.PI * 2);
    ctx.strokeStyle = 'hsla(' + ((ring * 40 + f * 15 + time * 20) % 360) + ', 95%, 72%, 0.75)';
    ctx.lineWidth = 1.6;
    ctx.stroke();
  }
}`,

  // 18. Moiré Interference
  'moire-interference': `// Moiré Interference Pattern
ctx.fillStyle = '#05070d';
ctx.fillRect(0, 0, width, height);

const cx = width * 0.5;
const cy = height * 0.5;
const t = time * 0.9;
const rings = 65;
const spacing = 7.5;

ctx.lineWidth = 1.6;
ctx.strokeStyle = 'rgba(56, 189, 248, 0.75)';
for (let r = 1; r <= rings; r++) {
  ctx.beginPath();
  ctx.arc(cx - Math.sin(t) * 45, cy - Math.cos(t) * 25, r * spacing, 0, Math.PI * 2);
  ctx.stroke();
}

ctx.strokeStyle = 'rgba(244, 114, 182, 0.75)';
for (let r = 1; r <= rings; r++) {
  ctx.beginPath();
  ctx.arc(cx + Math.sin(t * 1.3) * 45, cy + Math.cos(t * 1.3) * 25, r * spacing, 0, Math.PI * 2);
  ctx.stroke();
}`,

  // 19. Penrose Subdivision
  'penrose-subdivision': `// Aperiodic Penrose Tiling
ctx.fillStyle = '#030509';
ctx.fillRect(0, 0, width, height);

const cx = width * 0.5;
const cy = height * 0.5;
const maxR = Math.min(width, height) * 0.42;
const t = time * 0.6;

for (let layer = 1; layer <= 5; layer++) {
  const normL = layer / 5;
  const k = 10;
  for (let i = 0; i < k; i++) {
    const angle = (i / k) * Math.PI * 2 + t * (layer % 2 === 0 ? 0.3 : -0.3);
    const r1 = maxR * normL;
    const r2 = maxR * (normL - 0.18);

    ctx.beginPath();
    ctx.moveTo(cx + Math.cos(angle) * r1, cy + Math.sin(angle) * r1);
    ctx.lineTo(cx + Math.cos(angle + 0.2) * r2, cy + Math.sin(angle + 0.2) * r2);
    ctx.lineTo(cx + Math.cos(angle - 0.2) * r2, cy + Math.sin(angle - 0.2) * r2);
    ctx.closePath();
    ctx.strokeStyle = 'hsla(' + ((layer * 50 + i * 20 + time * 15) % 360) + ', 95%, 72%, 0.8)';
    ctx.lineWidth = 1.4;
    ctx.stroke();
  }
}`,

  // 20. Microscopic Snowflake Crystal
  'microscopic-ice-crystal': `// Microscopic Snowflake Hexagonal Dendrite
ctx.fillStyle = '#020408';
ctx.fillRect(0, 0, width, height);

const cx = width * 0.5;
const cy = height * 0.5;
const scale = Math.min(width, height) * 0.38;
const t = time * 0.8;

for (let arm = 0; arm < 6; arm++) {
  const angle = (arm / 6) * Math.PI * 2 + t * 0.2;
  const cosA = Math.cos(angle);
  const sinA = Math.sin(angle);

  // Main Spine
  ctx.beginPath();
  ctx.moveTo(cx, cy);
  ctx.lineTo(cx + cosA * scale, cy + sinA * scale);
  ctx.strokeStyle = '#e0f2fe';
  ctx.lineWidth = 2.4;
  ctx.stroke();

  // Lateral Dendrite Branches
  for (let b = 1; b <= 6; b++) {
    const d = (b / 6.5) * scale;
    const bx = cx + cosA * d;
    const by = cy + sinA * d;
    const bLen = (scale * 0.35) * (1 - b / 7);

    for (let s = -1; s <= 1; s += 2) {
      const bAngle = angle + s * (Math.PI / 3);
      ctx.beginPath();
      ctx.moveTo(bx, by);
      ctx.lineTo(bx + Math.cos(bAngle) * bLen, by + Math.sin(bAngle) * bLen);
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.85)';
      ctx.lineWidth = 1.6;
      ctx.stroke();
    }
  }
}`,

  // 21. Fourier Harmonics
  'fourier-harmonics': `// Fourier Harmonic Decomposition
ctx.fillStyle = 'rgba(6, 8, 14, 0.15)';
ctx.fillRect(0, 0, width, height);

const cx = width * 0.5;
const cy = height * 0.5;
const t = time * 1.5;
const baseR = Math.min(width, height) * 0.36;

ctx.beginPath();
const steps = 360;
for (let i = 0; i <= steps; i++) {
  const theta = (i / steps) * Math.PI * 2;
  let r = baseR * 0.6;
  for (let n = 1; n <= 7; n += 2) {
    r += (baseR * 0.35 / n) * Math.sin(theta * n + t * n * 0.8);
  }
  const px = cx + Math.cos(theta) * r;
  const py = cy + Math.sin(theta) * r;
  if (i === 0) ctx.moveTo(px, py);
  else ctx.lineTo(px, py);
}
ctx.closePath();
const hue = (time * 35 + 210) % 360;
ctx.strokeStyle = 'hsla(' + hue + ', 95%, 68%, 0.9)';
ctx.lineWidth = 2.5;
ctx.stroke();`,

  // 22. Standing Wave Grid
  'standing-wave-grid': `// Standing Wave 2D Interference Grid
ctx.fillStyle = 'rgba(4, 6, 10, 0.2)';
ctx.fillRect(0, 0, width, height);

const cx = width * 0.5;
const cy = height * 0.5;
const t = time * 2.0;
const N = 20;
const step = Math.min(width, height) * 0.8 / N;

for (let x = -N / 2; x <= N / 2; x++) {
  for (let y = -N / 2; y <= N / 2; y++) {
    const px = cx + x * step;
    const py = cy + y * step;
    const amp = Math.sin(x * 0.4 + t) * Math.cos(y * 0.4 - t);
    const r = Math.abs(amp) * 8 + 1.5;

    ctx.fillStyle = amp > 0 ? 'hsla(190, 95%, 70%, 0.85)' : 'hsla(340, 95%, 70%, 0.85)';
    ctx.beginPath();
    ctx.arc(px, py, r, 0, Math.PI * 2);
    ctx.fill();
  }
}`,

  // 23. Soliton Pulse
  'soliton-pulse': `// Korteweg-de Vries Soliton Wave Collision
ctx.fillStyle = 'rgba(3, 5, 10, 0.2)';
ctx.fillRect(0, 0, width, height);

const cy = height * 0.5;
const t = time * 2.0;

ctx.beginPath();
for (let x = 0; x <= width; x += 3) {
  const normX = (x / width - 0.5) * 20;
  // Two colliding sech^2 solitons
  const s1 = 1 / Math.cosh(normX - t * 3);
  const s2 = 1 / Math.cosh(normX + t * 2);
  const y = cy - (s1 * s1 * 80 + s2 * s2 * 50);

  if (x === 0) ctx.moveTo(x, y);
  else ctx.lineTo(x, y);
}
ctx.strokeStyle = '#38bdf8';
ctx.lineWidth = 3.0;
ctx.stroke();`,

  // 24. Circular Ripples
  'circular-ripples': `// Concentric Circular Wave Ripples
ctx.fillStyle = 'rgba(2, 4, 8, 0.15)';
ctx.fillRect(0, 0, width, height);

const cx = width * 0.5;
const cy = height * 0.5;
const t = time * 2.5;
const count = 35;

for (let i = 0; i < count; i++) {
  const r = ((i * 12 + t * 30) % (Math.min(width, height) * 0.45));
  const alpha = Math.max(0, 1 - r / (Math.min(width, height) * 0.45));

  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.strokeStyle = 'rgba(56, 189, 248, ' + alpha * 0.8 + ')';
  ctx.lineWidth = 2.0;
  ctx.stroke();
}`,

  // 25. Black Hole Lensing
  'black-hole-lensing': `// Schwarzschild Black Hole Gravitational Lensing
ctx.fillStyle = '#010204';
ctx.fillRect(0, 0, width, height);

const cx = width * 0.5;
const cy = height * 0.5;
const rs = 45; // Event horizon
const t = time * 1.2;

// Accretion Disk Beams
for (let r = rs * 1.2; r < rs * 3.5; r += 3) {
  const normR = r / (rs * 3.5);
  ctx.beginPath();
  ctx.ellipse(cx, cy, r, r * 0.35, t * 0.2, 0, Math.PI * 2);
  const hue = 30 + normR * 40;
  ctx.strokeStyle = 'hsla(' + hue + ', 100%, 65%, ' + (1 - normR) * 0.8 + ')';
  ctx.lineWidth = 2.0;
  ctx.stroke();
}

// Event Horizon Shadow
ctx.fillStyle = '#000000';
ctx.beginPath();
ctx.arc(cx, cy, rs, 0, Math.PI * 2);
ctx.fill();
ctx.strokeStyle = '#f59e0b';
ctx.lineWidth = 3.0;
ctx.stroke();`,

  // 26. Kepler Orbits
  'kepler-orbits': `// Elliptical Keplerian Planetary Orbits
ctx.fillStyle = '#020307';
ctx.fillRect(0, 0, width, height);

const cx = width * 0.5;
const cy = height * 0.5;

// Central Star
ctx.fillStyle = '#fbbf24';
ctx.beginPath();
ctx.arc(cx, cy, 10, 0, Math.PI * 2);
ctx.fill();

const planets = 5;
for (let p = 1; p <= planets; p++) {
  const a = p * 32; // semi-major
  const e = 0.25; // eccentricity
  const b = a * Math.sqrt(1 - e * e);
  const speed = 1 / Math.pow(p, 1.5);
  const M = time * speed * 2.5;

  ctx.beginPath();
  ctx.ellipse(cx - a * e, cy, a, b, 0, 0, Math.PI * 2);
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
  ctx.lineWidth = 1.0;
  ctx.stroke();

  // Planet body
  const px = cx - a * e + Math.cos(M) * a;
  const py = cy + Math.sin(M) * b;
  ctx.fillStyle = 'hsla(' + (p * 60) + ', 95%, 70%, 0.95)';
  ctx.beginPath();
  ctx.arc(px, py, 4, 0, Math.PI * 2);
  ctx.fill();
}`,

  // 27. Galaxy Spiral Density
  'galaxy-spiral-density': `// Logarithmic Spiral Galaxy Density Wave
ctx.fillStyle = 'rgba(2, 3, 6, 0.2)';
ctx.fillRect(0, 0, width, height);

const cx = width * 0.5;
const cy = height * 0.5;
const stars = 350;
const t = time * 0.5;

for (let s = 0; s < stars; s++) {
  const normS = s / stars;
  const arm = s % 2 === 0 ? 0 : Math.PI;
  const theta = normS * Math.PI * 4 + arm + t;
  const r = Math.pow(normS, 0.8) * Math.min(width, height) * 0.42;

  const px = cx + Math.cos(theta) * r + (Math.random() - 0.5) * 8;
  const py = cy + Math.sin(theta) * (r * 0.6) + (Math.random() - 0.5) * 8;

  ctx.fillStyle = 'hsla(' + ((200 + normS * 120 + time * 10) % 360) + ', 95%, 80%, ' + (1 - normS * 0.5) + ')';
  ctx.fillRect(px, py, 1.8, 1.8);
}`,

  // 28. Continuous Cellular Automata
  'continuous-cellular-automata': `// SmoothLife Continuous Automata Wave
ctx.fillStyle = 'rgba(3, 4, 8, 0.18)';
ctx.fillRect(0, 0, width, height);

const cx = width * 0.5;
const cy = height * 0.5;
const t = time * 1.5;

for (let ring = 1; ring <= 15; ring++) {
  const r = ring * 12;
  ctx.beginPath();
  const steps = 60;
  for (let i = 0; i <= steps; i++) {
    const phi = (i / steps) * Math.PI * 2;
    const wave = Math.sin(phi * 5 + t * 2 + ring * 0.4) * 8;
    const px = cx + Math.cos(phi) * (r + wave);
    const py = cy + Math.sin(phi) * (r + wave);
    if (i === 0) ctx.moveTo(px, py);
    else ctx.lineTo(px, py);
  }
  ctx.closePath();
  ctx.strokeStyle = 'hsla(' + ((ring * 20 + time * 25) % 360) + ', 90%, 70%, 0.6)';
  ctx.lineWidth = 1.4;
  ctx.stroke();
}`,

  // 29. Julia Morph
  'julia-morph': `// Julia Set Fractal Morphism
ctx.fillStyle = 'rgba(4, 5, 10, 0.2)';
ctx.fillRect(0, 0, width, height);

const cx = width * 0.5;
const cy = height * 0.5;
const scale = Math.min(width, height) * 0.36;
const t = time * 0.8;

for (let k = 0; k < 20; k++) {
  const normK = k / 20;
  ctx.beginPath();
  const steps = 180;
  for (let i = 0; i <= steps; i++) {
    const phi = (i / steps) * Math.PI * 2;
    const r = scale * normK * (1 + 0.3 * Math.cos(phi * 3 + t) * Math.sin(phi * 2 - t));
    const px = cx + Math.cos(phi) * r;
    const py = cy + Math.sin(phi) * r;
    if (i === 0) ctx.moveTo(px, py);
    else ctx.lineTo(px, py);
  }
  ctx.closePath();
  ctx.strokeStyle = 'hsla(' + ((280 + k * 12 + time * 15) % 360) + ', 95%, 72%, 0.7)';
  ctx.lineWidth = 1.4;
  ctx.stroke();
}`,

  // 30. Bioluminescent Jellyfish
  'bioluminescent-jellyfish': `// Bioluminescent Jellyfish
ctx.fillStyle = '#020307';
ctx.fillRect(0, 0, width, height);

const cx = width * 0.5;
const cy = height * 0.42 + Math.sin(time * 1.4) * 12;
const baseR = Math.min(width, height) * 0.23;
const pulse = 1 + 0.22 * Math.sin(time * 2.8);

ctx.save();
ctx.translate(cx, cy);
ctx.globalCompositeOperation = 'screen';

for (let r = 1; r <= 36; r++) {
  const normR = r / 36;
  const curW = baseR * normR * (1.2 / pulse);
  const curH = baseR * normR * 1.1 * pulse;

  ctx.beginPath();
  for (let i = 0; i <= 60; i++) {
    const phi = (i / 60) * Math.PI;
    const rip = Math.sin(phi * 8 + time * 3) * (4 * normR);
    const px = Math.cos(phi) * curW;
    const py = -Math.sin(phi) * curH + rip;
    if (i === 0) ctx.moveTo(px, py);
    else ctx.lineTo(px, py);
  }
  ctx.strokeStyle = 'hsla(' + ((185 + normR * 35 + time * 15) % 360) + ', 95%, 70%, ' + (0.08 + normR * 0.35) + ')';
  ctx.lineWidth = normR > 0.85 ? 1.8 : 0.8;
  ctx.stroke();
}

for (let k = 0; k < 48; k++) {
  const phi = (k / 47) * Math.PI;
  const rx = Math.cos(phi) * (baseR * 1.18 / pulse);
  ctx.beginPath();
  ctx.moveTo(rx, 0);
  for (let n = 1; n <= 28; n++) {
    const nn = n / 28;
    const wave = Math.sin(time * 3.5 - nn * 8 + k * 0.4) * (24 * nn);
    ctx.lineTo(rx + wave, nn * 200);
  }
  ctx.strokeStyle = 'hsla(' + ((170 + k * 4 + time * 20) % 360) + ', 95%, 75%, 0.4)';
  ctx.lineWidth = 0.9;
  ctx.stroke();
}
ctx.restore();`,

  // 31. Mathematical Crab
  'mathematical-crab': `// Mathematical Crab (Brachyura 3D Kinematics)
ctx.fillStyle = '#020409';
ctx.fillRect(0, 0, width, height);

const cx = width * 0.5;
const cy = height * 0.52;
const scale = Math.min(width, height) / 520;
const t = time * 1.4;

// Carapace
ctx.beginPath();
ctx.ellipse(cx, cy, 75 * scale, 52 * scale, 0, 0, Math.PI * 2);
ctx.fillStyle = '#b45309';
ctx.fill();
ctx.strokeStyle = '#f59e0b';
ctx.lineWidth = 2.5;
ctx.stroke();

// 8 Walking Legs
for (let s = -1; s <= 1; s += 2) {
  for (let leg = 0; leg < 4; leg++) {
    const phase = t * 4 + leg * 0.9 + (s === 1 ? Math.PI : 0);
    const coxaX = cx + s * (45 * scale);
    const coxaY = cy + (leg - 1.5) * (18 * scale);
    const kneeX = coxaX + s * (75 * scale);
    const kneeY = coxaY - 35 * scale + Math.sin(phase) * 18 * scale;
    const tipX = kneeX + s * (45 * scale) + Math.cos(phase) * 20 * scale;
    const tipY = cy + 95 * scale;

    ctx.beginPath();
    ctx.moveTo(coxaX, coxaY);
    ctx.lineTo(kneeX, kneeY);
    ctx.lineTo(tipX, tipY);
    ctx.strokeStyle = '#f97316';
    ctx.lineWidth = 3.2 * scale;
    ctx.stroke();
  }
}`,

  // 32. Deep Sea Prawn
  'deep-sea-prawn': `// Deep Sea Prawn (Caridea Anatomy)
ctx.fillStyle = '#04060b';
ctx.fillRect(0, 0, width, height);

const cx = width * 0.48;
const cy = height * 0.48;
const scale = Math.min(width, height) / 500;
const t = time * 1.3;

// Abdomen Somites
let curX = cx;
let curY = cy;
for (let s = 0; s < 6; s++) {
  const angle = 0.35 + Math.sin(t * 2) * 0.15;
  const nx = curX + Math.cos(angle * s * 0.4) * 25 * scale;
  const ny = curY + Math.sin(angle * s * 0.4) * 22 * scale;

  ctx.beginPath();
  ctx.ellipse((curX + nx) / 2, (curY + ny) / 2, (28 - s * 3) * scale, (32 - s * 3) * scale, angle * s * 0.35, 0, Math.PI * 2);
  ctx.fillStyle = '#ea580c';
  ctx.fill();
  ctx.strokeStyle = '#fdba74';
  ctx.lineWidth = 1.8;
  ctx.stroke();

  curX = nx;
  curY = ny;
}`,

  // 33. Manta Ray Glide
  'manta-ray-glide': `// Manta Ray Glide (Traveling Wave Pectoral Wings)
ctx.fillStyle = '#020409';
ctx.fillRect(0, 0, width, height);

const cx = width * 0.5 + Math.sin(time * 0.5) * (width * 0.08);
const cy = height * 0.48 + Math.sin(time * 1.5) * 12;
const wingSpan = Math.min(width, height) * 0.4;

ctx.save();
ctx.translate(cx, cy);
ctx.globalCompositeOperation = 'screen';

for (let r = 1; r <= 32; r++) {
  const normR = r / 32;
  const curSpan = wingSpan * normR;
  const flap = Math.sin(time * 2.8 - normR * 1.5) * (34 * Math.pow(normR, 1.4));

  ctx.beginPath();
  ctx.moveTo(0, -60 * normR);
  ctx.bezierCurveTo(-curSpan * 0.4, -45 * normR, -curSpan * 0.85, -15 * normR + flap * 0.6, -curSpan, -5 * normR + flap);
  ctx.bezierCurveTo(-curSpan * 0.8, 25 * normR + flap * 0.5, -curSpan * 0.35, 45 * normR, 0, 65 * normR);
  ctx.bezierCurveTo(curSpan * 0.35, 45 * normR, curSpan * 0.8, 25 * normR + flap * 0.5, curSpan, -5 * normR + flap);
  ctx.bezierCurveTo(curSpan * 0.85, -15 * normR + flap * 0.6, curSpan * 0.4, -45 * normR, 0, -60 * normR);
  ctx.closePath();

  ctx.strokeStyle = 'hsla(' + ((200 + normR * 30 + time * 10) % 360) + ', 95%, 68%, ' + (0.08 + normR * 0.35) + ')';
  ctx.lineWidth = normR > 0.88 ? 1.8 : 0.8;
  ctx.stroke();
}
ctx.restore();`,

  // 34. Nautilus Shell Spiral
  'nautilus-spiral': `// Nautilus Shell Spiral
ctx.fillStyle = '#020307';
ctx.fillRect(0, 0, width, height);

const cx = width * 0.48;
const cy = height * 0.52;
const scale = Math.min(width, height) * 0.38;
const b = 0.175;
const maxTheta = Math.PI * 4.4;

ctx.save();
ctx.translate(cx, cy);
ctx.rotate(time * 0.2);
ctx.globalCompositeOperation = 'screen';

for (let s = 1; s <= 28; s++) {
  const normS = s / 28;
  const a = scale * 0.035 * (0.4 + normS * 0.75);

  ctx.beginPath();
  for (let i = 0; i <= 100; i++) {
    const theta = (i / 100) * maxTheta;
    const r = a * Math.exp(b * theta);
    const px = r * Math.cos(theta);
    const py = r * Math.sin(theta);
    if (i === 0) ctx.moveTo(px, py);
    else ctx.lineTo(px, py);
  }
  ctx.strokeStyle = 'hsla(' + ((25 + normS * 35 + time * 10) % 360) + ', 95%, 72%, ' + (0.08 + normS * 0.32) + ')';
  ctx.lineWidth = normS > 0.88 ? 1.6 : 0.8;
  ctx.stroke();
}
ctx.restore();`,

  // 35. Deep Sea Anglerfish
  'deep-sea-anglerfish': `// Deep Sea Anglerfish (Ceratioidei)
ctx.fillStyle = '#020306';
ctx.fillRect(0, 0, width, height);

const cx = width * 0.48;
const cy = height * 0.52;
const scale = Math.min(width, height) / 500;
const t = time * 1.2;

ctx.save();
ctx.translate(cx, cy);

// Dark Melanocetus Body
ctx.beginPath();
ctx.ellipse(-20 * scale, 0, 80 * scale, 65 * scale, -0.1, 0, Math.PI * 2);
ctx.fillStyle = '#0a0d18';
ctx.fill();
ctx.strokeStyle = '#38bdf8';
ctx.lineWidth = 2.0;
ctx.stroke();

// Esca Photophore Lure
const escaX = (90 + Math.sin(t * 2.5) * 22) * scale;
const escaY = (-100 + Math.cos(t * 2.0) * 16) * scale;

ctx.beginPath();
ctx.moveTo(14 * scale, -50 * scale);
ctx.quadraticCurveTo(20 * scale, -115 * scale, escaX, escaY);
ctx.strokeStyle = '#38bdf8';
ctx.lineWidth = 2.2;
ctx.stroke();

const grad = ctx.createRadialGradient(escaX, escaY, 2, escaX, escaY, 32 * scale);
grad.addColorStop(0, 'rgba(56, 189, 248, 0.95)');
grad.addColorStop(0.4, 'rgba(56, 189, 248, 0.4)');
grad.addColorStop(1, 'rgba(56, 189, 248, 0)');
ctx.fillStyle = grad;
ctx.beginPath();
ctx.arc(escaX, escaY, 32 * scale, 0, Math.PI * 2);
ctx.fill();

ctx.restore();`,

  // 36. Giant Siphonophore
  'giant-siphonophore': `// Giant Praya Siphonophore
ctx.fillStyle = '#020306';
ctx.fillRect(0, 0, width, height);

const cx = width * 0.5;
const cy = height * 0.5;
const scale = Math.min(width, height) * 0.42;
const t = time * 0.9;

ctx.save();
ctx.globalCompositeOperation = 'screen';

for (let f = 0; f < 30; f++) {
  const normF = f / 29;
  ctx.beginPath();
  for (let i = 0; i <= 60; i++) {
    const normI = i / 60;
    const theta = normI * Math.PI * 3.8 + t * 0.8 + normF * Math.PI * 2;
    const sx = cx + (normI - 0.5) * scale * 1.85;
    const sy = cy + Math.sin(theta) * (scale * 0.32);
    if (i === 0) ctx.moveTo(sx, sy);
    else ctx.lineTo(sx, sy);
  }
  ctx.strokeStyle = 'hsla(' + ((180 + normF * 45) % 360) + ', 95%, 70%, 0.3)';
  ctx.lineWidth = 1.0;
  ctx.stroke();
}
ctx.restore();`,

  // 37. Comb Jelly Ctenophore
  'comb-jelly-ctenophore': `// Bioluminescent Comb Jelly (Ctenophore)
ctx.fillStyle = '#020307';
ctx.fillRect(0, 0, width, height);

const cx = width * 0.5;
const cy = height * 0.46;
const bodyW = Math.min(width, height) * 0.24;
const bodyH = Math.min(width, height) * 0.35;
const t = time * 1.3;

ctx.save();
ctx.translate(cx, cy);
ctx.globalCompositeOperation = 'screen';

// 8 Ctene Comb Rows with Rainbow Diffraction
for (let r = 0; r < 8; r++) {
  const phi = (r / 8) * Math.PI * 2;
  const rx = Math.sin(phi) * (bodyW * 0.92);

  for (let p = 0; p < 30; p++) {
    const normP = p / 29;
    const pAngle = (normP - 0.5) * Math.PI * 0.88;
    const px = rx * Math.cos(pAngle);
    const py = Math.sin(pAngle) * (bodyH * 0.95);
    const wave = Math.sin(t * 4.5 - normP * 9 + r * 0.5);
    const hue = ((normP * 360) + (t * 4.5 - normP * 9) * 45) % 360;

    ctx.beginPath();
    ctx.moveTo(px, py);
    ctx.lineTo(px + Math.sin(phi) * 10, py);
    ctx.strokeStyle = 'hsla(' + hue + ', 100%, 72%, 0.85)';
    ctx.lineWidth = 2.0;
    ctx.stroke();
  }
}
ctx.restore();`,

  // 38. Vampire Squid
  'vampire-squid': `// Vampire Squid from Hell (Vampyroteuthis)
ctx.fillStyle = '#020306';
ctx.fillRect(0, 0, width, height);

const cx = width * 0.5;
const cy = height * 0.44;
const scale = Math.min(width, height) / 480;
const t = time * 1.1;

ctx.save();
ctx.translate(cx, cy);
ctx.globalCompositeOperation = 'screen';

// Webbed Umbrella Cloak
for (let layer = 1; layer <= 16; layer++) {
  const normL = layer / 16;
  const curR = 120 * normL * scale;

  ctx.beginPath();
  for (let i = 0; i <= 64; i++) {
    const phi = (i / 64) * Math.PI * 2;
    const armWave = Math.sin(t * 2.8 + phi * 8) * (18 * normL * scale);
    const px = Math.cos(phi) * (curR + armWave);
    const py = Math.sin(phi) * (curR * 0.7 + armWave);
    if (i === 0) ctx.moveTo(px, py);
    else ctx.lineTo(px, py);
  }
  ctx.strokeStyle = 'hsla(' + ((350 + normL * 25) % 360) + ', 90%, 65%, ' + (0.06 + normL * 0.3) + ')';
  ctx.lineWidth = layer === 16 ? 2.0 : 0.9;
  ctx.stroke();
}
ctx.restore();`,

  // 39. Dumbo Octopus
  'dumbo-octopus': `// Dumbo Octopus Flight (Grimpoteuthis)
ctx.fillStyle = '#020307';
ctx.fillRect(0, 0, width, height);

const cx = width * 0.5;
const cy = height * 0.45;
const scale = Math.min(width, height) / 480;
const t = time * 1.3;

ctx.save();
ctx.translate(cx, cy);
ctx.globalCompositeOperation = 'screen';

// Ear Fins
const earFlap = Math.sin(t * 3.2);
for (let s = -1; s <= 1; s += 2) {
  ctx.beginPath();
  ctx.moveTo(s * 25 * scale, -28 * scale);
  ctx.quadraticCurveTo(s * 75 * scale, -45 * scale + earFlap * 25 * scale, s * 65 * scale, -10 * scale);
  ctx.strokeStyle = '#f472b6';
  ctx.lineWidth = 2.4;
  ctx.stroke();
}

// Mantle Dome
ctx.beginPath();
ctx.ellipse(0, -10 * scale, 45 * scale, 48 * scale, 0, 0, Math.PI * 2);
ctx.fillStyle = 'rgba(244, 114, 182, 0.4)';
ctx.fill();
ctx.strokeStyle = '#f472b6';
ctx.lineWidth = 2.0;
ctx.stroke();

ctx.restore();`,

  // 40. Gulper Eel
  'gulper-eel': `// Gulper Pelican Eel (Volumetric Accordion Pouch & Whip-Tail)
ctx.fillStyle = '#020306';
ctx.fillRect(0, 0, width, height);

const cx = width * 0.42;
const cy = height * 0.46;
const scale = Math.min(width, height) / 520;
const t = time * 1.1;

ctx.save();
ctx.translate(cx, cy);
ctx.globalCompositeOperation = 'screen';

// 24 Volumetric Pouch Ribs
for (let r = 1; r <= 24; r++) {
  const normR = r / 24;
  const curScale = normR * scale;
  ctx.beginPath();
  ctx.moveTo(-15 * curScale, -15 * curScale);
  ctx.quadraticCurveTo(45 * curScale, -35 * curScale, 115 * curScale, -10 * curScale);
  ctx.bezierCurveTo(95 * curScale, 90 * curScale, -12 * curScale, 115 * curScale, -40 * curScale, 18 * curScale);
  ctx.closePath();
  ctx.strokeStyle = 'hsla(' + ((210 + normR * 30) % 360) + ', 95%, 68%, ' + (0.05 + normR * 0.38) + ')';
  ctx.lineWidth = r === 24 ? 2.2 : 0.9;
  ctx.stroke();
}

// Luminous Whip-Tail
ctx.beginPath();
ctx.moveTo(-40 * scale, 18 * scale);
for (let s = 1; s <= 50; s++) {
  const normS = s / 50;
  const wave = Math.sin(t * 3.5 - normS * 8) * (34 * normS * scale);
  ctx.lineTo(-40 * scale - normS * 200 * scale, 18 * scale - s * 3.4 * scale + wave);
}
ctx.strokeStyle = '#38bdf8';
ctx.lineWidth = 2.0;
ctx.stroke();
ctx.restore();`,

  // 41. Barreleye Fish
  'barreleye-fish': `// Pacific Barreleye Fish (Volumetric Glass Dome & Green Optics)
ctx.fillStyle = '#020408';
ctx.fillRect(0, 0, width, height);

const cx = width * 0.48;
const cy = height * 0.5;
const scale = Math.min(width, height) / 480;
const t = time * 0.8;

ctx.save();
ctx.translate(cx, cy);
ctx.globalCompositeOperation = 'screen';

// 20 Body Streamline Rings
for (let r = 1; r <= 20; r++) {
  const normR = r / 20;
  const curScale = normR * scale;
  ctx.beginPath();
  ctx.moveTo(-130 * curScale, 5 * curScale);
  ctx.quadraticCurveTo(-45 * curScale, -50 * curScale, 20 * curScale, -38 * curScale);
  ctx.lineTo(20 * curScale, 34 * curScale);
  ctx.quadraticCurveTo(-45 * curScale, 50 * curScale, -130 * curScale, 5 * curScale);
  ctx.closePath();
  ctx.strokeStyle = 'hsla(' + ((205 + normR * 25) % 360) + ', 90%, 65%, ' + (0.06 + normR * 0.35) + ')';
  ctx.lineWidth = r === 20 ? 2.2 * scale : 0.9;
  ctx.stroke();
}

// 18 Volumetric Transparent Cranial Dome Rings
for (let d = 1; d <= 18; d++) {
  const normD = d / 18;
  ctx.beginPath();
  ctx.ellipse(38 * scale, -26 * scale, 52 * normD * scale, 38 * normD * scale, -0.1, 0, Math.PI * 2);
  ctx.strokeStyle = 'hsla(' + ((185 + normD * 20) % 360) + ', 95%, 75%, ' + (0.08 + normD * 0.35) + ')';
  ctx.lineWidth = d === 18 ? 2.4 * scale : 0.9;
  ctx.stroke();
}

// Glowing Emerald Green Tubular Eyes
for (let s = -1; s <= 1; s += 2) {
  const ex = (32 + s * 16) * scale;
  ctx.fillStyle = '#10b981';
  ctx.beginPath();
  ctx.arc(ex, -28 * scale, 8 * scale, 0, Math.PI * 2);
  ctx.fill();
}
ctx.restore();`,

  // 42. Sea Angel Pteropod
  'sea-angel-pteropod': `// Pelagic Sea Angel (Gymnosome)
ctx.fillStyle = '#020306';
ctx.fillRect(0, 0, width, height);

const cx = width * 0.5;
const cy = height * 0.46;
const scale = Math.min(width, height) / 480;
const t = time * 1.4;

ctx.save();
ctx.translate(cx, cy);
ctx.globalCompositeOperation = 'screen';

// Translucent Torpedo Body
ctx.beginPath();
ctx.moveTo(0, -65 * scale);
ctx.quadraticCurveTo(28 * scale, -25 * scale, 20 * scale, 30 * scale);
ctx.quadraticCurveTo(8 * scale, 75 * scale, 0, 115 * scale);
ctx.quadraticCurveTo(-8 * scale, 75 * scale, -20 * scale, 30 * scale);
ctx.quadraticCurveTo(-28 * scale, -25 * scale, 0, -65 * scale);
ctx.closePath();
ctx.fillStyle = 'rgba(56, 189, 248, 0.15)';
ctx.fill();
ctx.strokeStyle = '#38bdf8';
ctx.lineWidth = 1.8;
ctx.stroke();

// Glowing Visceral Core Heart
ctx.fillStyle = '#f97316';
ctx.beginPath();
ctx.ellipse(0, 6 * scale, 12 * scale, 16 * scale, 0, 0, Math.PI * 2);
ctx.fill();

ctx.restore();`,

  // 43. Abyssal Tripod Fish
  'abyssal-tripod-fish': `// Abyssal Tripod Fish (Multi-Filament Cantilever Stilts)
ctx.fillStyle = '#020306';
ctx.fillRect(0, 0, width, height);

const cx = width * 0.5;
const seafloorY = height * 0.88;
const scale = Math.min(width, height) / 500;
const bodyY = seafloorY - 145 * scale;

ctx.save();
ctx.globalCompositeOperation = 'screen';

// Seafloor
ctx.beginPath();
ctx.moveTo(0, seafloorY);
ctx.lineTo(width, seafloorY);
ctx.strokeStyle = 'rgba(56, 189, 248, 0.4)';
ctx.lineWidth = 2.0;
ctx.stroke();

// Pelvic & Caudal Cantilever Stilt Rays
for (let s = -1; s <= 1; s += 2) {
  ctx.beginPath();
  ctx.moveTo(cx - 20 * scale + s * 24 * scale, bodyY + 14 * scale);
  ctx.quadraticCurveTo(cx + s * 18 * scale, (bodyY + seafloorY) * 0.5, cx + s * 105 * scale, seafloorY);
  ctx.strokeStyle = '#38bdf8';
  ctx.lineWidth = 2.2 * scale;
  ctx.stroke();
}

// 16 Volumetric Body Rings
for (let r = 1; r <= 16; r++) {
  const normR = r / 16;
  const curScale = normR * scale;
  ctx.beginPath();
  ctx.moveTo(cx - 20 * scale + 80 * curScale, bodyY - 5 * curScale);
  ctx.quadraticCurveTo(cx - 20 * scale + 20 * curScale, bodyY - 26 * curScale, cx - 20 * scale - 115 * curScale, bodyY - 5 * curScale);
  ctx.lineTo(cx - 20 * scale - 115 * curScale, bodyY + 12 * curScale);
  ctx.quadraticCurveTo(cx - 20 * scale + 20 * curScale, bodyY + 24 * curScale, cx - 20 * scale + 80 * curScale, bodyY - 5 * curScale);
  ctx.closePath();
  ctx.strokeStyle = 'hsla(' + ((200 + normR * 25) % 360) + ', 90%, 68%, ' + (0.08 + normR * 0.35) + ')';
  ctx.lineWidth = r === 16 ? 2.2 * scale : 0.9;
  ctx.stroke();
}
ctx.restore();`,

  // 44. Giant Spider Crab
  'giant-spider-crab': `// Japanese Giant Spider Crab (Articulated Multi-Joint Legs)
ctx.fillStyle = '#020306';
ctx.fillRect(0, 0, width, height);

const cx = width * 0.5;
const cy = height * 0.52;
const scale = Math.min(width, height) / 520;
const t = time * 1.1;

ctx.save();
ctx.globalCompositeOperation = 'screen';

// 8 Hyper-Elongated Chebyshev Walking Legs
for (let side = -1; side <= 1; side += 2) {
  for (let leg = 0; leg < 4; leg++) {
    const phase = t * 3.2 + leg * 0.9 + (side === 1 ? Math.PI : 0);
    const coxaX = cx + side * (35 * scale);
    const coxaY = cy + (leg - 1.5) * (14 * scale);
    const kneeX = coxaX + side * ((80 + leg * 14) * scale);
    const kneeY = coxaY - ((88 - leg * 10) * scale) + Math.sin(phase) * 22 * scale;
    const elbowX = kneeX + side * ((68 + leg * 14) * scale);
    const elbowY = coxaY + ((28 + leg * 14) * scale);
    const tipX = elbowX + side * (50 * scale);
    const tipY = cy + 130 * scale;

    ctx.beginPath();
    ctx.moveTo(coxaX, coxaY);
    ctx.lineTo(kneeX, kneeY);
    ctx.lineTo(elbowX, elbowY);
    ctx.lineTo(tipX, tipY);
    ctx.strokeStyle = '#f97316';
    ctx.lineWidth = 2.8 * scale;
    ctx.stroke();
  }
}

// 16 Carapace Rings
for (let r = 1; r <= 16; r++) {
  const normR = r / 16;
  ctx.beginPath();
  ctx.ellipse(cx, cy, 42 * normR * scale, 52 * normR * scale, 0, 0, Math.PI * 2);
  ctx.strokeStyle = 'hsla(' + ((18 + normR * 20) % 360) + ', 95%, 65%, ' + (0.08 + normR * 0.35) + ')';
  ctx.lineWidth = r === 16 ? 2.4 * scale : 1.0;
  ctx.stroke();
}
ctx.restore();`,

  // 45. Leafy Sea Dragon
  'leafy-sea-dragon': `// Leafy Sea Dragon (Lush Camouflage Appendages)
ctx.fillStyle = '#020307';
ctx.fillRect(0, 0, width, height);

const cx = width * 0.46;
const cy = height * 0.45;
const scale = Math.min(width, height) / 500;
const t = time * 1.1;

ctx.save();
ctx.translate(cx, cy);
ctx.globalCompositeOperation = 'screen';

// S-Curved Body
ctx.beginPath();
ctx.moveTo(-50 * scale, -55 * scale);
ctx.bezierCurveTo(-10 * scale, -15 * scale, 35 * scale, -5 * scale, 25 * scale, 45 * scale);
ctx.strokeStyle = '#eab308';
ctx.lineWidth = 10 * scale;
ctx.stroke();

// Prehensile Tail
ctx.beginPath();
ctx.moveTo(25 * scale, 45 * scale);
for (let s = 1; s <= 40; s++) {
  const normS = s / 40;
  const theta = normS * Math.PI * 3.6;
  const r = 55 * scale * Math.exp(-0.45 * theta);
  ctx.lineTo(25 * scale + 35 * scale - Math.cos(theta) * r, 45 * scale + 25 * scale + Math.sin(theta) * r);
}
ctx.strokeStyle = '#eab308';
ctx.lineWidth = 4.5 * scale;
ctx.stroke();
ctx.restore();`,

  // 46. Hammerhead Shark
  'hammerhead-shark': `// Great Hammerhead Shark (Luminous 3D Hydrodynamics)
ctx.fillStyle = '#020308';
ctx.fillRect(0, 0, width, height);

const cx = width * 0.5;
const cy = height * 0.5;
const scale = Math.min(width, height) / 520;
const t = time * 1.2;

ctx.save();
ctx.translate(cx, cy);
ctx.globalCompositeOperation = 'screen';

// 3D Longitudinal Streamlines & Serpentine S-Wave
const nodes = 36;
for (let str = 0; str < 16; str++) {
  const phi = (str / 16) * Math.PI * 2;
  ctx.beginPath();
  for (let s = 0; s < nodes; s++) {
    const normS = s / (nodes - 1);
    const x = (normS - 0.4) * (300 * scale);
    const wave = Math.sin(t * 3.2 - normS * 4.2) * (42 * Math.pow(normS, 1.4) * scale);
    const ty = Math.sin(normS * Math.PI) * (38 * scale);
    const y = Math.sin(phi) * ty + wave * 0.35;
    if (s === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.strokeStyle = 'hsla(' + ((195 + str * 6) % 360) + ', 95%, 72%, 0.45)';
  ctx.lineWidth = str % 4 === 0 ? 1.8 : 0.9;
  ctx.stroke();
}

// Iconic Cephalofoil T-Head Hammer
const headX = -0.4 * 300 * scale;
for (let h = -4; h <= 4; h++) {
  ctx.beginPath();
  ctx.moveTo(headX + h * 4 * scale, -95 * scale);
  ctx.lineTo(headX + h * 4 * scale, 95 * scale);
  ctx.strokeStyle = '#38bdf8';
  ctx.lineWidth = 1.6;
  ctx.stroke();
}

// Glowing Lateral Eyes
ctx.fillStyle = '#67e8f9';
ctx.beginPath();
ctx.arc(headX, -95 * scale, 5 * scale, 0, Math.PI * 2);
ctx.arc(headX, 95 * scale, 5 * scale, 0, Math.PI * 2);
ctx.fill();

ctx.restore();`,

  // 47. Fractal Tree
  'fractal-tree': `// L-System Fractal Branching Tree
ctx.fillStyle = '#020408';
ctx.fillRect(0, 0, width, height);

const startX = width * 0.5;
const startY = height * 0.88;
const t = time * 0.8;

function branch(x, y, len, angle, depth) {
  if (depth <= 0) return;
  const sway = Math.sin(t + depth * 0.5) * 0.05;
  const endX = x + Math.cos(angle + sway) * len;
  const endY = y - Math.sin(angle + sway) * len;

  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(endX, endY);
  ctx.strokeStyle = 'hsla(' + ((120 + depth * 20) % 360) + ', 90%, 65%, 0.85)';
  ctx.lineWidth = depth * 1.2;
  ctx.stroke();

  branch(endX, endY, len * 0.72, angle - 0.45, depth - 1);
  branch(endX, endY, len * 0.72, angle + 0.45, depth - 1);
}

branch(startX, startY, 95, Math.PI / 2, 7);`,

  // 48. Barnsley Fern
  'barnsley-fern': `// Barnsley Fern Iterated Function System
ctx.fillStyle = 'rgba(2, 4, 8, 0.2)';
ctx.fillRect(0, 0, width, height);

let x = 0, y = 0;
const cx = width * 0.5;
const cy = height * 0.92;
const scale = height * 0.085;

for (let i = 0; i < 4000; i++) {
  const r = Math.random();
  let nx, ny;
  if (r < 0.01) {
    nx = 0;
    ny = 0.16 * y;
  } else if (r < 0.86) {
    nx = 0.85 * x + 0.04 * y;
    ny = -0.04 * x + 0.85 * y + 1.6;
  } else if (r < 0.93) {
    nx = 0.2 * x - 0.26 * y;
    ny = 0.23 * x + 0.22 * y + 1.6;
  } else {
    nx = -0.15 * x + 0.28 * y;
    ny = 0.26 * x + 0.24 * y + 0.44;
  }
  x = nx;
  y = ny;

  const px = cx + x * scale;
  const py = cy - y * scale;
  ctx.fillStyle = '#34d399';
  ctx.fillRect(px, py, 1.4, 1.4);
}`,

  // 49. Gerstner Ocean Waves
  'gerstner-ocean-waves': `// Gerstner Trochoidal Ocean Waves
ctx.fillStyle = '#02050b';
ctx.fillRect(0, 0, width, height);

const t = time * 2.0;
const waveCount = 14;

for (let w = 0; w < waveCount; w++) {
  const normW = w / waveCount;
  const baseY = height * (0.35 + normW * 0.55);
  ctx.beginPath();

  for (let x = 0; x <= width; x += 4) {
    const k = 0.02;
    const phase = k * x - t + w * 0.5;
    const y = baseY - Math.sin(phase) * (18 * (1 - normW * 0.4));
    if (x === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.strokeStyle = 'hsla(' + ((190 + w * 8) % 360) + ', 95%, 70%, 0.7)';
  ctx.lineWidth = 2.0;
  ctx.stroke();
}`,

  // 50. Coral Polyp Growth
  'coral-polyp-growth': `// Fractal Coral Polyp Growth
ctx.fillStyle = '#030508';
ctx.fillRect(0, 0, width, height);

const cx = width * 0.5;
const cy = height * 0.5;
const t = time * 0.9;
const polyps = 32;

for (let p = 0; p < polyps; p++) {
  const theta = (p / polyps) * Math.PI * 2;
  const dist = 75 + Math.sin(t + p) * 15;
  const px = cx + Math.cos(theta) * dist;
  const py = cy + Math.sin(theta) * dist;

  ctx.beginPath();
  ctx.arc(px, py, 14, 0, Math.PI * 2);
  ctx.fillStyle = 'hsla(' + ((p * 12 + time * 20) % 360) + ', 95%, 68%, 0.6)';
  ctx.fill();
  ctx.strokeStyle = '#f0f9ff';
  ctx.lineWidth = 1.4;
  ctx.stroke();
}`,

  // 51. Snow Fall
  'snow-fall': `// Atmospheric Snowfall Flurry
ctx.fillStyle = 'rgba(2, 4, 8, 0.25)';
ctx.fillRect(0, 0, width, height);

const flakes = 100;
for (let f = 0; f < flakes; f++) {
  const seed = f * 17.3;
  const speed = 60 + (f % 5) * 20;
  const fx = ((seed * 7 + Math.sin(time + f) * 30) % width + width) % width;
  const fy = ((time * speed + seed * 9) % (height + 20)) - 10;
  const size = 1.5 + (f % 4);

  ctx.fillStyle = 'rgba(240, 249, 255, 0.85)';
  ctx.beginPath();
  ctx.arc(fx, fy, size, 0, Math.PI * 2);
  ctx.fill();
}`,

  // 52. Cardiac Pulse
  'cardiac-pulse': `// Cardiac Pulse & ECG Waveform
ctx.fillStyle = 'rgba(4, 5, 8, 0.15)';
ctx.fillRect(0, 0, width, height);

const cy = height * 0.5;
const t = time * 3.0;

ctx.beginPath();
for (let x = 0; x <= width; x += 2) {
  const normX = ((x * 0.015 - t) % 10 + 10) % 10;
  let ecg = 0;
  // P-Q-R-S-T wave spike
  if (normX > 4.8 && normX < 5.2) {
    ecg = -120 * Math.sin((normX - 4.8) / 0.4 * Math.PI);
  } else if (normX > 4.5 && normX < 4.8) {
    ecg = 15;
  }
  const y = cy + ecg;
  if (x === 0) ctx.moveTo(x, y);
  else ctx.lineTo(x, y);
}
ctx.strokeStyle = '#ef4444';
ctx.lineWidth = 2.8;
ctx.stroke();`,

  // 53. Neural Synapse
  'neural-synapse': `// Neural Synaptic Network Action Potential
ctx.fillStyle = '#020306';
ctx.fillRect(0, 0, width, height);

const nodes = 30;
const pts = [];
for (let i = 0; i < nodes; i++) {
  const seed = i * 45.2;
  const px = (width * 0.5) + Math.sin(seed + time * 0.2) * (width * 0.38);
  const py = (height * 0.5) + Math.cos(seed * 1.2 - time * 0.2) * (height * 0.38);
  pts.push({ x: px, y: py });
}

for (let i = 0; i < nodes; i++) {
  for (let j = i + 1; j < nodes; j++) {
    const dist = Math.hypot(pts[i].x - pts[j].x, pts[i].y - pts[j].y);
    if (dist < 130) {
      ctx.beginPath();
      ctx.moveTo(pts[i].x, pts[i].y);
      ctx.lineTo(pts[j].x, pts[j].y);
      ctx.strokeStyle = 'rgba(168, 85, 247, ' + (1 - dist / 130) * 0.7 + ')';
      ctx.lineWidth = 1.4;
      ctx.stroke();
    }
  }
}
for (let i = 0; i < nodes; i++) {
  ctx.fillStyle = '#38bdf8';
  ctx.beginPath();
  ctx.arc(pts[i].x, pts[i].y, 3.5, 0, Math.PI * 2);
  ctx.fill();
}`,

  // 54. DNA Double Helix
  'dna-double-helix': `// DNA Double Helix Base-Pair Lattice
ctx.fillStyle = '#020409';
ctx.fillRect(0, 0, width, height);

const cx = width * 0.5;
const t = time * 2.0;
const rungs = 40;

for (let r = 0; r < rungs; r++) {
  const py = (r / rungs) * height;
  const theta = (r / rungs) * Math.PI * 6 + t;
  const x1 = cx + Math.sin(theta) * 90;
  const x2 = cx - Math.sin(theta) * 90;
  const depth = Math.cos(theta);

  // Base pair hydrogen bond
  ctx.beginPath();
  ctx.moveTo(x1, py);
  ctx.lineTo(x2, py);
  ctx.strokeStyle = 'rgba(255, 255, 255, ' + (0.2 + (depth + 1) * 0.3) + ')';
  ctx.lineWidth = 1.6;
  ctx.stroke();

  // Nucleotide phosphate beads
  ctx.fillStyle = '#38bdf8';
  ctx.beginPath();
  ctx.arc(x1, py, 4.5, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#f472b6';
  ctx.beginPath();
  ctx.arc(x2, py, 4.5, 0, Math.PI * 2);
  ctx.fill();
}`,

  // 55. Retinal Iris
  'retinal-iris': `// Retinal Iris Trabecular Meshwork
ctx.fillStyle = '#010204';
ctx.fillRect(0, 0, width, height);

const cx = width * 0.5;
const cy = height * 0.5;
const outerR = Math.min(width, height) * 0.42;
const innerR = outerR * 0.3;
const strands = 120;
const t = time * 0.8;

for (let s = 0; s < strands; s++) {
  const theta = (s / strands) * Math.PI * 2;
  const r1 = innerR + Math.sin(theta * 6 + t) * 6;
  const r2 = outerR;

  ctx.beginPath();
  ctx.moveTo(cx + Math.cos(theta) * r1, cy + Math.sin(theta) * r1);
  ctx.lineTo(cx + Math.cos(theta + 0.1) * r2, cy + Math.sin(theta + 0.1) * r2);
  ctx.strokeStyle = 'hsla(' + ((180 + (s % 30) * 4) % 360) + ', 95%, 68%, 0.65)';
  ctx.lineWidth = 1.4;
  ctx.stroke();
}

// Pupil
ctx.fillStyle = '#000000';
ctx.beginPath();
ctx.arc(cx, cy, innerR * 0.8, 0, Math.PI * 2);
ctx.fill();`
};

export function getPresetCode(slug: string, title: string, category: string): string {
  if (presetCatalogMap[slug]) {
    return presetCatalogMap[slug];
  }

  // Fallback for any unmatched slug
  return `// ${title} (${category})
ctx.fillStyle = 'rgba(6, 8, 12, 0.18)';
ctx.fillRect(0, 0, width, height);

const cx = width * 0.5;
const cy = height * 0.5;
const maxR = Math.min(width, height) * 0.38;
const t = time * 1.2;

ctx.beginPath();
const steps = 360;
for (let i = 0; i <= steps; i++) {
  const phi = (i / steps) * Math.PI * 2;
  const r = maxR * (0.6 + 0.3 * Math.sin(phi * 6 + t * 2) * Math.cos(phi * 4 - t));
  const px = cx + Math.cos(phi) * r;
  const py = cy + Math.sin(phi) * r;
  if (i === 0) ctx.moveTo(px, py);
  else ctx.lineTo(px, py);
}
ctx.closePath();
ctx.strokeStyle = 'hsla(' + ((time * 30 + 195) % 360) + ', 95%, 68%, 0.85)';
ctx.lineWidth = 2.2;
ctx.stroke();`;
}
