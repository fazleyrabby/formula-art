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
  'deep-sea-anglerfish': `// Deep Sea Anglerfish (Full 3D Volumetric Mesh & Jaws)
ctx.fillStyle = '#020306';
ctx.fillRect(0, 0, width, height);

const cx = width * 0.46;
const cy = height * 0.52;
const fishScale = Math.min(width, height) / 500;
const t = time * 1.2;

const rotY = Math.sin(t * 0.4) * 0.35 - 0.25;
const rotX = 0.28 + Math.sin(t * 0.7) * 0.14;
const rotZ = Math.sin(t * 0.5) * 0.06;

ctx.save();
ctx.globalCompositeOperation = 'screen';
const baseHue = (210 + Math.sin(t * 0.5) * 15) % 360;

// 28 Concentric Body Contour Ribbons
for (let r = 1; r <= 28; r++) {
  const normR = r / 28;
  const curScale = normR * fishScale;
  ctx.beginPath();
  const steps = 40;
  let avgDepth = 0;
  for (let i = 0; i <= steps; i++) {
    const phi = (i / steps) * Math.PI * 2;
    const cosP = Math.cos(phi);
    const sinP = Math.sin(phi);
    const rx = (-20 + cosP * 85 + (cosP < 0 ? cosP * 25 : 0)) * curScale;
    const ry = (sinP * 68 + Math.sin(phi * 2) * 8) * curScale;
    const rz = (Math.sin(phi) * 58) * curScale;
    const p = project3D(rx, ry, rz, rotX, rotY, rotZ, cx, cy, 450, 520);
    avgDepth += p.depth;
    if (i === 0) ctx.moveTo(p.x, p.y);
    else ctx.lineTo(p.x, p.y);
  }
  ctx.closePath();
  avgDepth /= (steps + 1);
  const rHue = (baseHue + normR * 25) % 360;
  ctx.strokeStyle = hsla(rHue, 95, 68, (0.06 + normR * 0.35) * avgDepth);
  ctx.lineWidth = r === 28 ? 2.2 * fishScale : 0.9;
  ctx.stroke();
}

// 16 Longitudinal Streamlines
for (let str = 0; str < 16; str++) {
  const phi = (str / 16) * Math.PI * 2;
  ctx.beginPath();
  for (let s = 0; s <= 25; s++) {
    const normS = s / 25;
    const x = (normS - 0.4) * (240 * fishScale);
    const bodyW = Math.sin(normS * Math.PI) * (70 * fishScale);
    const y = Math.sin(phi) * bodyW;
    const z = Math.cos(phi) * (bodyW * 0.85);
    const p = project3D(x, y, z, rotX, rotY, rotZ, cx, cy, 450, 520);
    if (s === 0) ctx.moveTo(p.x, p.y);
    else ctx.lineTo(p.x, p.y);
  }
  ctx.strokeStyle = hsla((baseHue + str * 6) % 360, 95, 75, 0.25);
  ctx.lineWidth = str % 4 === 0 ? 1.4 : 0.8;
  ctx.stroke();
}

// Solid Jaws & 28 Recurved Needle Teeth
const jawGape = 0.35 + 0.22 * Math.sin(t * 1.6);
for (let i = 0; i < 28; i++) {
  const theta = (i / 28) * Math.PI;
  const toothLen = (18 + (i % 5) * 5) * fishScale;
  const utX = (35 + Math.cos(theta) * 36) * fishScale;
  const utY = (-20 + Math.sin(theta) * 16) * fishScale;
  const utZ = Math.sin(theta) * 46 * fishScale;
  const pU = project3D(utX, utY, utZ, rotX, rotY, rotZ, cx, cy, 450, 520);
  const pUTip = project3D(utX - 4 * fishScale, utY + toothLen, utZ, rotX, rotY, rotZ, cx, cy, 450, 520);
  ctx.beginPath();
  ctx.moveTo(pU.x, pU.y);
  ctx.lineTo(pUTip.x, pUTip.y);
  ctx.strokeStyle = hsla(200, 100, 95, 0.9 * pU.depth);
  ctx.lineWidth = 1.6 * pU.depth;
  ctx.stroke();

  const ltX = (38 + Math.cos(theta) * 40) * fishScale;
  const ltY = (16 + Math.sin(theta) * 20 + jawGape * 32) * fishScale;
  const ltZ = Math.sin(theta) * 50 * fishScale;
  const pL = project3D(ltX, ltY, ltZ, rotX, rotY, rotZ, cx, cy, 450, 520);
  const pLTip = project3D(ltX - 4 * fishScale, ltY - toothLen * 1.15, ltZ, rotX, rotY, rotZ, cx, cy, 450, 520);
  ctx.beginPath();
  ctx.moveTo(pL.x, pL.y);
  ctx.lineTo(pLTip.x, pLTip.y);
  ctx.strokeStyle = hsla(200, 100, 95, 0.9 * pL.depth);
  ctx.lineWidth = 1.6 * pL.depth;
  ctx.stroke();
}

// 3D Illicium & Glowing Esca Photophore Lure
const escaX = (105 + Math.sin(t * 2.5) * 28) * fishScale;
const escaY = (-118 + Math.cos(t * 2.0) * 22) * fishScale;
const escaZ = Math.sin(t * 1.8) * 65 * fishScale;

ctx.beginPath();
for (let st = 0; st <= 20; st++) {
  const nst = st / 20;
  const rx = 22 * fishScale + (escaX - 22 * fishScale) * nst;
  const ry = -58 * fishScale + (escaY - -58 * fishScale) * nst - Math.sin(nst * Math.PI) * (26 * fishScale);
  const rz = escaZ * nst;
  const p = project3D(rx, ry, rz, rotX, rotY, rotZ, cx, cy, 450, 520);
  if (st === 0) ctx.moveTo(p.x, p.y);
  else ctx.lineTo(p.x, p.y);
}
ctx.strokeStyle = '#38bdf8';
ctx.lineWidth = 2.4;
ctx.stroke();

const pEsca = project3D(escaX, escaY, escaZ, rotX, rotY, rotZ, cx, cy, 450, 520);
const pulse = 1 + 0.35 * Math.sin(t * 4);
const glowR = (18 * fishScale * pulse) * pEsca.depth;
const grad = ctx.createRadialGradient(pEsca.x, pEsca.y, 2, pEsca.x, pEsca.y, glowR * 3.8);
grad.addColorStop(0, 'rgba(56, 189, 248, 0.98)');
grad.addColorStop(0.35, 'rgba(56, 189, 248, 0.45)');
grad.addColorStop(1, 'rgba(56, 189, 248, 0)');
ctx.fillStyle = grad;
ctx.beginPath();
ctx.arc(pEsca.x, pEsca.y, glowR * 3.8, 0, Math.PI * 2);
ctx.fill();

ctx.fillStyle = '#ffffff';
ctx.beginPath();
ctx.arc(pEsca.x, pEsca.y, 5 * pEsca.depth * fishScale, 0, Math.PI * 2);
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
  'vampire-squid': `// Vampire Squid (3D Tumbling Conical Umbrella & Tip Photophores)
ctx.fillStyle = '#020306';
ctx.fillRect(0, 0, width, height);

const cx = width * 0.5;
const cy = height * 0.46;
const squidScale = Math.min(width, height) / 480;
const t = time * 1.0;

const rotY = Math.sin(t * 0.5) * 0.45;
const rotX = 0.55 + Math.sin(t * 0.7) * 0.25;
const rotZ = Math.sin(t * 0.4) * 0.15;

ctx.save();
ctx.globalCompositeOperation = 'screen';
const baseHue = (350 + Math.sin(t * 0.6) * 15) % 360;

// 18 Nested 3D Conical Web Ribbons
for (let layer = 1; layer <= 18; layer++) {
  const normL = layer / 18;
  const curR = (120 * normL) * squidScale;
  const mantleConeZ = (1 - normL) * (75 * squidScale);
  ctx.beginPath();
  const steps = 64;
  let avgDepth = 0;
  for (let i = 0; i <= steps; i++) {
    const phi = (i / steps) * Math.PI * 2;
    const armIndex = (phi / (Math.PI * 2)) * 8;
    const armWave = Math.sin(t * 2.8 + armIndex * 0.8) * (18 * normL * squidScale);
    const rawX = Math.cos(phi) * (curR + armWave);
    const rawY = Math.sin(phi) * (curR * 0.7 + armWave) + (20 * normL * squidScale);
    const rawZ = -mantleConeZ + Math.sin(phi * 8) * (12 * normL * squidScale);
    const p = project3D(rawX, rawY, rawZ, rotX, rotY, rotZ, cx, cy, 450, 520);
    avgDepth += p.depth;
    if (i === 0) ctx.moveTo(p.x, p.y);
    else ctx.lineTo(p.x, p.y);
  }
  avgDepth /= (steps + 1);
  ctx.strokeStyle = hsla((baseHue + normL * 25) % 360, 90, 65, (0.06 + normL * 0.32) * avgDepth);
  ctx.lineWidth = Math.max(0.8, (layer === 18 ? 2.0 : 0.9) * avgDepth);
  ctx.stroke();
}

// 8 Arm Spines & Luminous Photophore Tips
for (let a = 0; a < 8; a++) {
  const phi = (a / 8) * Math.PI * 2;
  const armWave = Math.sin(t * 2.8 + a * 0.8) * (18 * squidScale);
  const armR = (120 + armWave) * squidScale;
  const tipX = Math.cos(phi) * armR;
  const tipY = Math.sin(phi) * (armR * 0.7) + (20 * squidScale);
  const tipZ = Math.sin(phi * 8) * (12 * squidScale);
  const pOrigin = project3D(0, -35 * squidScale, -60 * squidScale, rotX, rotY, rotZ, cx, cy, 450, 520);
  const pTip = project3D(tipX, tipY, tipZ, rotX, rotY, rotZ, cx, cy, 450, 520);
  ctx.beginPath();
  ctx.moveTo(pOrigin.x, pOrigin.y);
  ctx.lineTo(pTip.x, pTip.y);
  ctx.strokeStyle = hsla(350, 80, 50, 0.45 * pTip.depth);
  ctx.lineWidth = Math.max(0.8, 1.4 * pTip.depth);
  ctx.stroke();

  // Arm-tip Photophore Glow
  const pulse = 1 + 0.35 * Math.sin(t * 4 + a);
  const glowR = (8 * squidScale * pulse) * pTip.depth;
  const grad = ctx.createRadialGradient(pTip.x, pTip.y, 1, pTip.x, pTip.y, glowR * 3.5);
  grad.addColorStop(0, '#38bdf8');
  grad.addColorStop(0.4, 'rgba(56, 189, 248, 0.5)');
  grad.addColorStop(1, 'rgba(56, 189, 248, 0)');
  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.arc(pTip.x, pTip.y, glowR * 3.5, 0, Math.PI * 2);
  ctx.fill();
}
ctx.restore();`,

  // 39. Dumbo Octopus
  'dumbo-octopus': `// Dumbo Octopus (28 Mantle Streamline Ribbons & Flapping Pectoral Ear-Fins)
ctx.fillStyle = '#020307';
ctx.fillRect(0, 0, width, height);

const cx = width * 0.5 + Math.sin(time * 0.5) * (width * 0.08);
const cy = height * 0.45 + Math.sin(time * 1.6) * 12;
const dumboScale = Math.min(width, height) / 480;
const t = time * 1.3;

ctx.save();
ctx.translate(cx, cy);
ctx.globalCompositeOperation = 'screen';
const baseHue = (330 + Math.sin(t * 0.6) * 20) % 360;

// 28 Concentric Bell Mantle Ribbons
for (let r = 0; r < 28; r++) {
  const normR = (r + 1) / 28;
  const curW = 46 * normR * dumboScale;
  const curH = 48 * normR * dumboScale;
  ctx.beginPath();
  ctx.ellipse(0, -10 * dumboScale, curW, curH, 0, 0, Math.PI * 2);
  ctx.strokeStyle = hsla((baseHue + normR * 25) % 360, 90, 70, 0.06 + normR * 0.3);
  ctx.lineWidth = normR > 0.88 ? 1.6 : 0.8;
  ctx.stroke();
}

// 20 Layered Flapping Ear-Fin Filaments
const earFlap = Math.sin(t * 3.2);
const earCurl = Math.cos(t * 3.2);
for (let s = -1; s <= 1; s += 2) {
  for (let ef = 0; ef < 20; ef++) {
    const normE = ef / 19;
    const rootX = s * (22 + normE * 14) * dumboScale;
    const rootY = (-34 + normE * 12) * dumboScale;
    const curSpan = (55 + normE * 22) * 1.2 * dumboScale;
    const tipX = rootX + s * curSpan;
    const tipY = rootY - (14 + normE * 8) * dumboScale + earFlap * (26 * dumboScale);

    ctx.beginPath();
    ctx.moveTo(rootX, rootY);
    ctx.bezierCurveTo(
      rootX + s * (35 + normE * 10) * dumboScale,
      rootY - 45 * dumboScale + earCurl * (16 * dumboScale),
      tipX + s * 10 * dumboScale,
      tipY - 20 * dumboScale,
      tipX,
      tipY
    );
    ctx.bezierCurveTo(
      tipX - s * 15 * dumboScale,
      tipY + 35 * dumboScale,
      rootX + s * 22 * dumboScale,
      rootY + 15 * dumboScale,
      rootX,
      rootY
    );
    ctx.closePath();
    ctx.strokeStyle = hsla((baseHue - 15 + normE * 30) % 360, 95, 78, 0.08 + normE * 0.35);
    ctx.lineWidth = ef % 4 === 0 ? 1.6 : 0.8;
    ctx.stroke();
  }
}

// Large Expressive Eyes
for (let s = -1; s <= 1; s += 2) {
  const eyeX = s * 20 * dumboScale;
  const eyeY = 2 * dumboScale;
  ctx.fillStyle = '#0f172a';
  ctx.beginPath();
  ctx.arc(eyeX, eyeY, 8.5 * dumboScale, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = '#38bdf8';
  ctx.lineWidth = 1.6;
  ctx.stroke();

  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.arc(eyeX - s * 2 * dumboScale, eyeY - 2 * dumboScale, 3.2 * dumboScale, 0, Math.PI * 2);
  ctx.fill();
}

// 8 Undulating Cirrate Arm Filaments
for (let a = 0; a < 8; a++) {
  const normA = (a / 7 - 0.5) * 2;
  const rootX = normA * (38 * dumboScale);
  const rootY = 32 * dumboScale;
  ctx.beginPath();
  ctx.moveTo(rootX, rootY);
  for (let seg = 1; seg <= 25; seg++) {
    const normSeg = seg / 25;
    const wave = Math.sin(t * 3.5 + a * 0.8 - normSeg * 6) * (18 * normSeg * dumboScale);
    ctx.lineTo(rootX + wave + normA * (12 * normSeg * dumboScale), rootY + normSeg * (70 * dumboScale));
  }
  ctx.strokeStyle = hsla((baseHue + 15) % 360, 90, 72, 0.6);
  ctx.lineWidth = 1.4;
  ctx.stroke();
}
ctx.restore();`,

  // 40. Gulper Eel
  'gulper-eel': `// Gulper Pelican Eel (32 Elastic Accordion Filament Ribs & Photophore)
ctx.fillStyle = '#020306';
ctx.fillRect(0, 0, width, height);

const cx = width * 0.42;
const cy = height * 0.46 + Math.sin(time * 1.2) * 8;
const eelScale = Math.min(width, height) / 520;
const t = time * 1.1;

ctx.save();
ctx.translate(cx, cy);
ctx.globalCompositeOperation = 'screen';
const baseHue = (210 + Math.sin(t * 0.5) * 15) % 360;
const gapePulse = 1 + 0.28 * Math.sin(t * 2.2);

for (let r = 1; r <= 32; r++) {
  const normR = r / 32;
  const curScale = normR * eelScale;
  ctx.beginPath();
  ctx.moveTo(-15 * curScale, -15 * curScale);
  ctx.quadraticCurveTo(45 * curScale, -35 * curScale, 115 * curScale, -10 * curScale);
  ctx.bezierCurveTo(
    (95 + Math.sin(r * 0.4 + t * 3) * 6) * curScale,
    (90 * gapePulse) * curScale,
    (-12 + Math.cos(r * 0.3 - t * 2) * 6) * curScale,
    (115 * gapePulse) * curScale,
    -40 * curScale,
    18 * curScale
  );
  ctx.closePath();
  const ribHue = (baseHue + normR * 30) % 360;
  ctx.strokeStyle = hsla(ribHue, 95, 68, 0.05 + normR * 0.38);
  ctx.lineWidth = r === 32 ? 2.2 : 0.9;
  ctx.stroke();
  if (r % 6 === 0) {
    ctx.fillStyle = hsla(ribHue, 85, 45, 0.04);
    ctx.fill();
  }
}

// 12 Elastic Accordion Radial Folds
for (let s = 1; s <= 12; s++) {
  ctx.beginPath();
  ctx.moveTo(10 * eelScale, -10 * eelScale);
  ctx.quadraticCurveTo((20 + s * 8) * eelScale, (15 + s * 8 * gapePulse) * eelScale, (-35 + s * 12) * eelScale, (65 * gapePulse) * eelScale);
  ctx.strokeStyle = hsla(190, 100, 75, 0.35);
  ctx.lineWidth = 1.0;
  ctx.stroke();
}

// Jaws
ctx.beginPath();
ctx.moveTo(-20 * eelScale, -18 * eelScale);
ctx.quadraticCurveTo(48 * eelScale, -38 * eelScale, 118 * eelScale, -10 * eelScale);
ctx.strokeStyle = '#38bdf8';
ctx.lineWidth = 2.4 * eelScale;
ctx.stroke();

ctx.beginPath();
ctx.moveTo(-40 * eelScale, 18 * eelScale);
ctx.quadraticCurveTo(40 * eelScale, 85 * gapePulse * eelScale, 118 * eelScale, -10 * eelScale);
ctx.strokeStyle = '#38bdf8';
ctx.lineWidth = 2.4 * eelScale;
ctx.stroke();

// 65-Node Serpentine Whip-Tail
ctx.beginPath();
ctx.moveTo(-40 * eelScale, 18 * eelScale);
let tailEndX = -40 * eelScale;
let tailEndY = 18 * eelScale;
for (let s = 1; s <= 65; s++) {
  const normS = s / 65;
  const wave = Math.sin(t * 3.8 - normS * 9.5) * (38 * Math.pow(normS, 1.3) * eelScale);
  const tx = -40 * eelScale - normS * (280 * eelScale);
  const ty = 18 * eelScale - s * (3.8 * eelScale) + wave;
  ctx.lineTo(tx, ty);
  if (s === 65) { tailEndX = tx; tailEndY = ty; }
}
ctx.strokeStyle = hsla(baseHue, 95, 75, 0.75);
ctx.lineWidth = 2.2;
ctx.stroke();

// Luminous Caudal Photophore Lure
const lureGlow = ctx.createRadialGradient(tailEndX, tailEndY, 1, tailEndX, tailEndY, 24 * eelScale);
lureGlow.addColorStop(0, '#f43f5e');
lureGlow.addColorStop(0.4, 'rgba(244, 63, 94, 0.5)');
lureGlow.addColorStop(1, 'rgba(244, 63, 94, 0)');
ctx.fillStyle = lureGlow;
ctx.beginPath();
ctx.arc(tailEndX, tailEndY, 24 * eelScale, 0, Math.PI * 2);
ctx.fill();

ctx.restore();`,

  // 41. Barreleye Fish
  'barreleye-fish': `// Pacific Barreleye Fish (Transparent Cranial Dome & Rotating Emerald Optics)
ctx.fillStyle = '#020408';
ctx.fillRect(0, 0, width, height);

const cx = width * 0.48 + Math.sin(time * 0.4) * (width * 0.04);
const cy = height * 0.5 + Math.sin(time * 1.3) * 6;
const fishScale = Math.min(width, height) / 480;
const t = time * 0.8;

ctx.save();
ctx.translate(cx, cy);
ctx.globalCompositeOperation = 'screen';
const baseHue = (205 + Math.sin(t * 0.6) * 15) % 360;

// 1. 28 Volumetric Scaled Body Contour Ribbons
for (let r = 1; r <= 28; r++) {
  const normR = r / 28;
  const curScale = normR * fishScale;
  ctx.beginPath();
  ctx.moveTo(-130 * curScale, 5 * curScale);
  ctx.quadraticCurveTo(-45 * curScale, -50 * curScale, 20 * curScale, -38 * curScale);
  ctx.lineTo(20 * curScale, 34 * curScale);
  ctx.quadraticCurveTo(-45 * curScale, 50 * curScale, -130 * curScale, 5 * curScale);
  ctx.closePath();
  const bHue = (baseHue + normR * 25) % 360;
  ctx.strokeStyle = hsla(bHue, 90, 65, 0.06 + normR * 0.35);
  ctx.lineWidth = r === 28 ? 2.2 * fishScale : 0.9;
  ctx.stroke();
  if (r % 6 === 0) {
    ctx.fillStyle = hsla(bHue, 80, 45, 0.04);
    ctx.fill();
  }
}

// Reflective Scale Pockets
for (let sc = 0; sc < 20; sc++) {
  const normSc = sc / 19;
  const sx = (-115 + normSc * 125) * fishScale;
  const sy = Math.sin(sc * 1.4) * (20 * fishScale);
  ctx.beginPath();
  ctx.arc(sx, sy, 7 * fishScale, 0.2 * Math.PI, 1.2 * Math.PI);
  ctx.strokeStyle = 'rgba(56, 189, 248, 0.45)';
  ctx.lineWidth = 1.2;
  ctx.stroke();
}

// Caudal & Pectoral Fin Rays
const tailWave = Math.sin(t * 2.8) * (16 * fishScale);
for (let ray = -5; ray <= 5; ray++) {
  const normRay = ray / 5;
  ctx.beginPath();
  ctx.moveTo(-130 * fishScale, 5 * fishScale);
  ctx.lineTo(-175 * fishScale, normRay * (42 * fishScale) + tailWave);
  ctx.strokeStyle = hsla((baseHue + 15) % 360, 95, 75, 0.65);
  ctx.lineWidth = 1.4;
  ctx.stroke();
}

for (let p = 0; p < 8; p++) {
  const normP = p / 7;
  ctx.beginPath();
  ctx.moveTo(-15 * fishScale, 18 * fishScale);
  ctx.quadraticCurveTo((5 + normP * 12) * fishScale, (50 + normP * 10) * fishScale, (-45 + normP * 25) * fishScale, (72 + normP * 8) * fishScale);
  ctx.strokeStyle = 'rgba(56, 189, 248, 0.6)';
  ctx.lineWidth = 1.4;
  ctx.stroke();
}

// Snout Rostrum & Olfactory Nares
ctx.beginPath();
ctx.moveTo(20 * fishScale, -28 * fishScale);
ctx.quadraticCurveTo(82 * fishScale, -12 * fishScale, 88 * fishScale, 10 * fishScale);
ctx.lineTo(20 * fishScale, 34 * fishScale);
ctx.closePath();
ctx.strokeStyle = '#38bdf8';
ctx.lineWidth = 2.0 * fishScale;
ctx.stroke();

ctx.fillStyle = '#334155';
ctx.beginPath();
ctx.arc(74 * fishScale, -4 * fishScale, 3.5 * fishScale, 0, Math.PI * 2);
ctx.fill();

// 24 Volumetric Cranial Dome Rings
for (let d = 1; d <= 24; d++) {
  const normD = d / 24;
  const dw = 52 * normD * fishScale;
  const dh = 38 * normD * fishScale;
  ctx.beginPath();
  ctx.ellipse(38 * fishScale, -26 * fishScale, dw, dh, -0.1, 0, Math.PI * 2);
  const domeHue = (185 + normD * 20) % 360;
  ctx.strokeStyle = hsla(domeHue, 95, 75, (0.08 + normD * 0.35) * 1.2);
  ctx.lineWidth = d === 24 ? 2.4 * fishScale : 0.9;
  ctx.stroke();
  if (d % 5 === 0) {
    ctx.fillStyle = hsla(domeHue, 90, 60, 0.05);
    ctx.fill();
  }
}

// Glass Meniscus Caustic Spark
ctx.beginPath();
ctx.arc(38 * fishScale, -48 * fishScale, 30 * fishScale, 0.2 * Math.PI, 0.8 * Math.PI);
ctx.strokeStyle = '#ffffff';
ctx.lineWidth = 2.0;
ctx.stroke();

// Rotating Emerald-Green Tubular Optics
const eyeAngle = -Math.PI / 2 + Math.sin(t * 1.5) * 0.38;
for (let s = -1; s <= 1; s += 2) {
  const eyeBaseX = (32 + s * 16) * fishScale;
  const eyeBaseY = -18 * fishScale;
  ctx.save();
  ctx.translate(eyeBaseX, eyeBaseY);
  ctx.rotate(eyeAngle);

  for (let er = 1; er <= 4; er++) {
    const normER = er / 4;
    ctx.beginPath();
    ctx.ellipse(0, -14 * fishScale, 10 * normER * fishScale, 16 * normER * fishScale, 0, 0, Math.PI * 2);
    ctx.strokeStyle = hsla(160, 90, 50, 0.3 + normER * 0.5);
    ctx.lineWidth = 1.4;
    ctx.stroke();
  }

  const lensGrad = ctx.createRadialGradient(0, -25 * fishScale, 2, 0, -25 * fishScale, 12 * fishScale);
  lensGrad.addColorStop(0, '#ffffff');
  lensGrad.addColorStop(0.3, '#34d399');
  lensGrad.addColorStop(0.8, '#059669');
  lensGrad.addColorStop(1, 'rgba(5, 150, 105, 0)');
  ctx.fillStyle = lensGrad;
  ctx.beginPath();
  ctx.arc(0, -25 * fishScale, 12 * fishScale, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#10b981';
  ctx.shadowColor = '#34d399';
  ctx.shadowBlur = 14;
  ctx.beginPath();
  ctx.arc(0, -25 * fishScale, 7.5 * fishScale, 0, Math.PI * 2);
  ctx.fill();
  ctx.shadowBlur = 0;

  ctx.fillStyle = '#f0fdf4';
  ctx.beginPath();
  ctx.arc(-2 * fishScale, -27 * fishScale, 2.8 * fishScale, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

ctx.restore();`,

  // 42. Sea Angel Pteropod
  'sea-angel-pteropod': `// Pelagic Sea Angel (28 Translucent Ribbons & Fluttering Parapodia Wings)
ctx.fillStyle = '#020306';
ctx.fillRect(0, 0, width, height);

const cx = width * 0.5 + Math.sin(time * 0.6) * (width * 0.05);
const cy = height * 0.46 + Math.sin(time * 1.8) * 14;
const angelScale = Math.min(width, height) / 480;
const t = time * 1.4;

ctx.save();
ctx.translate(cx, cy);
ctx.globalCompositeOperation = 'screen';
const baseHue = (195 + Math.sin(t * 0.8) * 20) % 360;

// 28 Concentric Body Streamline Ribbons
for (let r = 0; r < 28; r++) {
  const normR = (r + 1) / 28;
  const curW = 28 * normR * angelScale;
  const curH = 115 * normR * angelScale;
  ctx.beginPath();
  ctx.moveTo(0, -65 * normR * angelScale);
  ctx.quadraticCurveTo(curW, -25 * normR * angelScale, curW * 0.7, 30 * normR * angelScale);
  ctx.quadraticCurveTo(curW * 0.3, 75 * normR * angelScale, 0, curH);
  ctx.quadraticCurveTo(-curW * 0.3, 75 * normR * angelScale, -curW * 0.7, 30 * normR * angelScale);
  ctx.quadraticCurveTo(-curW, -25 * normR * angelScale, 0, -65 * normR * angelScale);
  ctx.closePath();
  ctx.strokeStyle = hsla((baseHue + normR * 25) % 360, 95, 72, 0.06 + normR * 0.28);
  ctx.lineWidth = normR > 0.85 ? 1.6 : 0.8;
  ctx.stroke();
}

// Glowing Visceral Core Heart
for (let visc = 1; visc <= 6; visc++) {
  const vR = (3 + visc * 3) * angelScale;
  ctx.beginPath();
  ctx.ellipse(0, 6 * angelScale, vR, vR * 1.3, 0, 0, Math.PI * 2);
  ctx.strokeStyle = hsla(15 + visc * 8, 100, 68, 0.6 - visc * 0.08);
  ctx.lineWidth = 1.6;
  ctx.stroke();
}

ctx.fillStyle = '#fee2e2';
ctx.shadowColor = '#f97316';
ctx.shadowBlur = 16;
ctx.beginPath();
ctx.arc(0, 6 * angelScale, 3 * angelScale, 0, Math.PI * 2);
ctx.fill();
ctx.shadowBlur = 0;

// 24 Fluttering Parapodia Wings
const wingWave = Math.sin(t * 3.5);
const wingCurl = Math.cos(t * 3.5);
for (let s = -1; s <= 1; s += 2) {
  for (let wf = 0; wf < 24; wf++) {
    const normW = wf / 23;
    const rootX = s * (8 + normW * 14) * angelScale;
    const rootY = (-20 + normW * 12) * angelScale;
    const curSpan = (70 + normW * 25) * 1.2 * angelScale;
    const tipX = rootX + s * curSpan;
    const tipY = rootY - (10 + normW * 10) * angelScale + wingWave * (28 * angelScale);

    ctx.beginPath();
    ctx.moveTo(rootX, rootY);
    ctx.bezierCurveTo(
      rootX + s * (35 + normW * 15) * angelScale,
      rootY - 45 * angelScale + wingCurl * (18 * angelScale),
      tipX + s * 15 * angelScale,
      tipY - 25 * angelScale,
      tipX,
      tipY
    );
    ctx.bezierCurveTo(
      tipX - s * 25 * angelScale,
      tipY + 45 * angelScale,
      rootX + s * 25 * angelScale,
      rootY + 30 * angelScale,
      rootX,
      rootY
    );
    ctx.strokeStyle = hsla((baseHue + 25 + normW * 35) % 360, 95, 75, 0.08 + normW * 0.3);
    ctx.lineWidth = 1.0;
    ctx.stroke();
  }
}
ctx.restore();`,

  // 43. Abyssal Tripod Fish
  'abyssal-tripod-fish': `// Abyssal Tripod Fish (Multi-Filament Cantilever Stilts & Marine Snow)
ctx.fillStyle = '#020306';
ctx.fillRect(0, 0, width, height);

const cx = width * 0.5;
const seafloorY = height * 0.88;
const fishScale = Math.min(width, height) / 500;
const t = time * 1.0;

ctx.save();
ctx.globalCompositeOperation = 'screen';
const baseHue = (200 + Math.sin(t * 0.4) * 15) % 360;

// Marine Snow
for (let p = 0; p < 60; p++) {
  const seed = p * 41.7;
  const px = ((seed * 5 + t * 45) % (width + 60)) - 30;
  const py = seafloorY - 220 + ((seed * 9) % 200);
  ctx.fillStyle = 'rgba(56, 189, 248, ' + (0.2 + (p % 5) * 0.15) + ')';
  ctx.fillRect(px, py, 1.8, 1.8);
}

// 3D Perspective Seafloor Grid
ctx.beginPath();
ctx.moveTo(0, seafloorY);
ctx.lineTo(width, seafloorY);
ctx.strokeStyle = 'rgba(56, 189, 248, 0.4)';
ctx.lineWidth = 2.0;
ctx.stroke();

for (let gx = -6; gx <= 6; gx++) {
  ctx.beginPath();
  ctx.moveTo(cx + gx * 80 * fishScale, seafloorY);
  ctx.lineTo(cx + gx * 140 * fishScale, height);
  ctx.strokeStyle = 'rgba(56, 189, 248, 0.12)';
  ctx.lineWidth = 1.0;
  ctx.stroke();
}

const bodyX = cx - 20 * fishScale;
const bodyY = seafloorY - 145 * 1.2 * fishScale + Math.sin(t * 0.8) * 3;

// Cantilever Stilts
for (let s = -1; s <= 1; s += 2) {
  const rootX = bodyX + s * 24 * fishScale;
  const rootY = bodyY + 14 * fishScale;
  const groundX = cx + s * (105 * fishScale);
  for (let str = 0; str < 4; str++) {
    const normStr = str / 3;
    ctx.beginPath();
    ctx.moveTo(rootX + str * 2, rootY);
    ctx.quadraticCurveTo(rootX + s * (18 + normStr * 6) * fishScale, (rootY + seafloorY) * 0.5, groundX + str * 2, seafloorY);
    ctx.strokeStyle = hsla(190, 95, 75, 0.4 + normStr * 0.45);
    ctx.lineWidth = str === 3 ? 2.0 : 1.0;
    ctx.stroke();
  }
}

// Tail Stilt
const tailRootX = bodyX - 115 * fishScale;
const tailGroundX = cx - 145 * fishScale;
ctx.beginPath();
ctx.moveTo(tailRootX, bodyY + 6 * fishScale);
ctx.quadraticCurveTo(cx - 165 * fishScale, (bodyY + seafloorY) * 0.5, tailGroundX, seafloorY);
ctx.strokeStyle = '#38bdf8';
ctx.lineWidth = 2.4 * fishScale;
ctx.stroke();

// 20 Body Rings
for (let r = 1; r <= 20; r++) {
  const normR = r / 20;
  const curScale = normR * fishScale;
  ctx.beginPath();
  ctx.moveTo(bodyX + 80 * curScale, bodyY - 5 * curScale);
  ctx.quadraticCurveTo(bodyX + 20 * curScale, bodyY - 26 * curScale, bodyX - 115 * curScale, bodyY - 5 * curScale);
  ctx.lineTo(bodyX - 115 * curScale, bodyY + 12 * curScale);
  ctx.quadraticCurveTo(bodyX + 20 * curScale, bodyY + 24 * curScale, bodyX + 80 * curScale, bodyY - 5 * curScale);
  ctx.closePath();
  ctx.strokeStyle = hsla((baseHue + normR * 25) % 360, 90, 68, 0.08 + normR * 0.35);
  ctx.lineWidth = r === 20 ? 2.2 * fishScale : 0.9;
  ctx.stroke();
}
ctx.restore();`,

  // 44. Giant Spider Crab
  'giant-spider-crab': `// Japanese Giant Spider Crab (8 Articulated Chebyshev Walking Legs & Carapace Spines)
ctx.fillStyle = '#020306';
ctx.fillRect(0, 0, width, height);

const cx = width * 0.5;
const cy = height * 0.52 + Math.sin(time * 1.2) * 4;
const crabScale = Math.min(width, height) / 520;
const t = time * 1.1;

ctx.save();
ctx.globalCompositeOperation = 'screen';
const baseHue = (18 + Math.sin(t * 0.5) * 15) % 360;
const seafloorY = cy + 130 * crabScale;

// 8 Hyper-Elongated Walking Legs
for (let side = -1; side <= 1; side += 2) {
  for (let leg = 0; leg < 4; leg++) {
    const legPhase = t * 3.2 + leg * 0.9 + (side === 1 ? Math.PI : 0);
    const coxaX = cx + side * (35 * crabScale);
    const coxaY = cy + (leg - 1.5) * (14 * crabScale);
    const kneeLift = Math.sin(legPhase) * (24 * crabScale);
    const kneeX = coxaX + side * ((80 + leg * 14) * 1.2 * crabScale);
    const kneeY = coxaY - ((88 - leg * 12) * 1.2 * crabScale) + kneeLift;
    const elbowX = kneeX + side * ((68 + leg * 14) * 1.2 * crabScale);
    const elbowY = coxaY + ((28 + leg * 14) * 1.2 * crabScale);
    const propX = elbowX + side * (32 * 1.2 * crabScale);
    const propY = elbowY + (45 * crabScale);
    const tipX = propX + side * (18 * 1.2 * crabScale) + Math.cos(legPhase) * (20 * crabScale);
    const tipY = seafloorY;

    for (let str = -1; str <= 1; str++) {
      ctx.beginPath();
      ctx.moveTo(coxaX, coxaY);
      ctx.lineTo(kneeX + str * 2, kneeY);
      ctx.lineTo(elbowX + str * 2, elbowY);
      ctx.lineTo(propX, propY);
      ctx.lineTo(tipX, tipY);
      ctx.strokeStyle = hsla((baseHue + leg * 8) % 360, 95, 65, str === 0 ? 0.85 : 0.4);
      ctx.lineWidth = str === 0 ? 2.8 * crabScale : 1.2;
      ctx.stroke();
    }

    ctx.fillStyle = '#fde047';
    ctx.beginPath();
    ctx.arc(kneeX, kneeY, 3.8 * crabScale, 0, Math.PI * 2);
    ctx.arc(elbowX, elbowY, 3.2 * crabScale, 0, Math.PI * 2);
    ctx.arc(propX, propY, 2.6 * crabScale, 0, Math.PI * 2);
    ctx.fill();
  }
}

// 20 Concentric Pear-Shaped Shell Rings
for (let r = 1; r <= 20; r++) {
  const normR = r / 20;
  const curW = 42 * normR * crabScale;
  const curH = 52 * normR * crabScale;
  ctx.beginPath();
  const steps = 48;
  for (let i = 0; i <= steps; i++) {
    const phi = (i / steps) * Math.PI * 2;
    const px = cx + Math.sin(phi) * curW * (1 + 0.15 * Math.cos(phi * 2));
    const py = cy - Math.cos(phi) * curH + (Math.cos(phi) > 0 ? Math.cos(phi) * 12 * crabScale : 0);
    if (i === 0) ctx.moveTo(px, py);
    else ctx.lineTo(px, py);
  }
  ctx.closePath();
  ctx.strokeStyle = hsla((baseHue + normR * 20) % 360, 95, 65, 0.08 + normR * 0.35);
  ctx.lineWidth = r === 20 ? 2.4 * crabScale : 1.0;
  ctx.stroke();
}
ctx.restore();`,

  // 45. Leafy Sea Dragon
  'leafy-sea-dragon': `// Leafy Sea Dragon (36 Lush Foliar Camouflage Appendages)
ctx.fillStyle = '#020307';
ctx.fillRect(0, 0, width, height);

const cx = width * 0.46 + Math.sin(time * 0.4) * (width * 0.04);
const cy = height * 0.45 + Math.sin(time * 1.4) * 10;
const dragonScale = Math.min(width, height) / 500;
const t = time * 1.1;

ctx.save();
ctx.translate(cx, cy);
ctx.globalCompositeOperation = 'screen';
const baseHue = (45 + Math.sin(t * 0.4) * 15) % 360;

function drawLushLeaf(rootX, rootY, angle, length, phase) {
  const wave = Math.sin(t * 2.8 + phase) * (18 * dragonScale);
  const tipX = rootX + Math.cos(angle) * length + wave;
  const tipY = rootY + Math.sin(angle) * length + wave;

  for (let str = -1; str <= 1; str++) {
    ctx.beginPath();
    ctx.moveTo(rootX + str * 2, rootY);
    ctx.quadraticCurveTo((rootX + tipX) * 0.5 + wave, (rootY + tipY) * 0.5 - 12, tipX + str * 2, tipY);
    ctx.strokeStyle = hsla(baseHue, 95, 75, str === 0 ? 0.9 : 0.4);
    ctx.lineWidth = str === 0 ? 2.2 * dragonScale : 1.0;
    ctx.stroke();
  }

  for (let lobe = 1; lobe <= 4; lobe++) {
    const normL = lobe / 4.5;
    const lx = rootX + (tipX - rootX) * normL;
    const ly = rootY + (tipY - rootY) * normL;
    for (let s = -1; s <= 1; s += 2) {
      const lobeAngle = angle + s * 0.85 + Math.sin(t * 3.2 + lobe + s) * 0.25;
      const lobeLen = (22 - lobe * 3.5) * dragonScale;
      for (let lf = 1; lf <= 4; lf++) {
        const normLF = lf / 4;
        ctx.beginPath();
        ctx.moveTo(lx, ly);
        ctx.quadraticCurveTo(
          lx + Math.cos(lobeAngle) * (lobeLen * normLF),
          ly + Math.sin(lobeAngle) * (lobeLen * normLF),
          lx + Math.cos(lobeAngle + 0.35) * (lobeLen * 0.6 * normLF),
          ly + Math.sin(lobeAngle + 0.35) * (lobeLen * 0.6 * normLF)
        );
        ctx.strokeStyle = hsla(110 + lobe * 12, 90, 65, (0.2 + normLF * 0.6));
        ctx.lineWidth = lf === 4 ? 1.6 : 0.8;
        ctx.stroke();
      }
    }
  }
}

// Snout & Eye
ctx.beginPath();
ctx.moveTo(-50 * dragonScale, -65 * dragonScale);
ctx.lineTo(-145 * dragonScale, -100 * dragonScale);
ctx.lineTo(-142 * dragonScale, -90 * dragonScale);
ctx.lineTo(-45 * dragonScale, -50 * dragonScale);
ctx.closePath();
ctx.fillStyle = 'rgba(234, 179, 8, 0.4)';
ctx.fill();
ctx.strokeStyle = hsla(baseHue, 95, 75, 0.95);
ctx.lineWidth = 2.4 * dragonScale;
ctx.stroke();

ctx.fillStyle = '#0f172a';
ctx.beginPath();
ctx.arc(-55 * dragonScale, -60 * dragonScale, 5.5 * dragonScale, 0, Math.PI * 2);
ctx.fill();
ctx.strokeStyle = '#38bdf8';
ctx.lineWidth = 1.6;
ctx.stroke();

// 12 Armored Body Rings
for (let r = 0; r < 12; r++) {
  const normR = r / 11;
  const rx = -45 * dragonScale + normR * (75 * dragonScale);
  const ry = -50 * dragonScale + Math.sin(normR * Math.PI) * (45 * dragonScale) + normR * (65 * dragonScale);
  ctx.beginPath();
  ctx.ellipse(rx, ry, (16 - normR * 4) * dragonScale, (22 - normR * 4) * dragonScale, normR * 0.5, 0, Math.PI * 2);
  ctx.strokeStyle = hsla(baseHue, 95, 72, 0.6);
  ctx.lineWidth = 1.4;
  ctx.stroke();
}

// Prehensile Tail Spiral
for (let tr = 0; tr < 3; tr++) {
  ctx.beginPath();
  ctx.moveTo(25 * dragonScale, (45 + tr * 3) * dragonScale);
  for (let s = 1; s <= 40; s++) {
    const normS = s / 40;
    const theta = normS * Math.PI * 3.6;
    const r = (55 - tr * 4) * dragonScale * Math.exp(-0.45 * theta);
    const tx = 25 * dragonScale + 35 * dragonScale - Math.cos(theta) * r;
    const ty = 45 * dragonScale + 25 * dragonScale + Math.sin(theta) * r;
    ctx.lineTo(tx, ty);
  }
  ctx.strokeStyle = hsla(baseHue, 95, 70, 0.85);
  ctx.lineWidth = 2.2;
  ctx.stroke();
}

// 6 Lush Branching Foliage Clusters
drawLushLeaf(-45 * dragonScale, -65 * dragonScale, -Math.PI * 0.65, 80 * dragonScale, 0);
drawLushLeaf(-20 * dragonScale, -45 * dragonScale, -Math.PI * 0.55, 110 * dragonScale, 1.2);
drawLushLeaf(15 * dragonScale, -15 * dragonScale, -Math.PI * 0.45, 95 * dragonScale, 2.4);
drawLushLeaf(-10 * dragonScale, 20 * dragonScale, Math.PI * 0.65, 85 * dragonScale, 3.1);
drawLushLeaf(10 * dragonScale, 45 * dragonScale, Math.PI * 0.55, 105 * dragonScale, 4.2);
drawLushLeaf(35 * dragonScale, 65 * dragonScale, -Math.PI * 0.25, 75 * dragonScale, 5.0);

ctx.restore();`,

  // 46. Hammerhead Shark
  'hammerhead-shark': `// Great Hammerhead Shark (Full 3D Hydrodynamics, Dorsal Fin & Heterocercal Tail)
ctx.fillStyle = '#020308';
ctx.fillRect(0, 0, width, height);

const cx = width * 0.5;
const cy = height * 0.5;
const sharkScale = Math.min(width, height) / 520;
const t = time * 1.2;

const rotY = Math.sin(t * 0.5) * 0.45 + 0.2;
const rotX = 0.35 + Math.sin(t * 0.8) * 0.18;
const rotZ = Math.sin(t * 0.6) * 0.15;

ctx.save();
ctx.globalCompositeOperation = 'screen';
const baseHue = (195 + Math.sin(t * 0.5) * 20) % 360;

// 1. 3D Spine Nodes
const SPINE_NODES = 42;
const spineNodes = [];
for (let s = 0; s < SPINE_NODES; s++) {
  const normS = s / (SPINE_NODES - 1);
  const x = (normS - 0.4) * (300 * sharkScale);
  const waveAmp = Math.pow(normS, 1.4) * (46 * sharkScale);
  const y = Math.sin(t * 3.2 - normS * 4.2) * (waveAmp * 0.35);
  const z = Math.cos(t * 3.2 - normS * 4.2) * waveAmp;
  const thicknessY = Math.sin(normS * Math.PI) * (42 * sharkScale);
  const thicknessZ = Math.sin(normS * Math.PI) * (32 * sharkScale);
  spineNodes.push({ x, y, z, thicknessY, thicknessZ });
}

// 2. 24 Volumetric Longitudinal Skin Streamlines
for (let str = 0; str < 24; str++) {
  const phi = (str / 24) * Math.PI * 2;
  const cosPhi = Math.cos(phi);
  const sinPhi = Math.sin(phi);
  ctx.beginPath();
  let avgDepth = 0;
  for (let s = 0; s < SPINE_NODES; s++) {
    const node = spineNodes[s];
    const rawX = node.x;
    const rawY = node.y + sinPhi * node.thicknessY;
    const rawZ = node.z + cosPhi * node.thicknessZ;
    const p = project3D(rawX, rawY, rawZ, rotX, rotY, rotZ, cx, cy, 460, 520);
    avgDepth += p.depth;
    if (s === 0) ctx.moveTo(p.x, p.y);
    else ctx.lineTo(p.x, p.y);
  }
  avgDepth /= SPINE_NODES;
  const strHue = (baseHue + (str % 6) * 8) % 360;
  ctx.strokeStyle = hsla(strHue, 95, 72, (sinPhi < 0 ? 0.45 : 0.25) * avgDepth);
  ctx.lineWidth = str % 4 === 0 ? 1.6 : 0.9;
  ctx.stroke();
}

// 3. 30 Volumetric Transverse Body Rib Rings
for (let r = 0; r < 30; r++) {
  const normR = r / 29;
  const nodeIdx = Math.floor(normR * (SPINE_NODES - 1));
  const center = spineNodes[nodeIdx];
  if (center.thicknessY < 2) continue;
  ctx.beginPath();
  const steps = 32;
  let avgDepth = 0;
  for (let i = 0; i <= steps; i++) {
    const theta = (i / steps) * Math.PI * 2;
    const ry = center.y + Math.sin(theta) * center.thicknessY;
    const rz = center.z + Math.cos(theta) * center.thicknessZ;
    const p = project3D(center.x, ry, rz, rotX, rotY, rotZ, cx, cy, 460, 520);
    avgDepth += p.depth;
    if (i === 0) ctx.moveTo(p.x, p.y);
    else ctx.lineTo(p.x, p.y);
  }
  avgDepth /= (steps + 1);
  const ringHue = (baseHue + normR * 35) % 360;
  ctx.strokeStyle = hsla(ringHue, 95, 70, (0.15 + normR * 0.45) * avgDepth);
  ctx.lineWidth = Math.max(0.8, (normR > 0.3 && normR < 0.7 ? 1.8 : 1.0) * avgDepth);
  ctx.stroke();
}

// 4. Volumetric 3D Cephalofoil T-Head Hammer
const head = spineNodes[0];
const headSpan = 110 * 1.2 * sharkScale;
const headRibs = 14;
for (let hr = 0; hr < headRibs; hr++) {
  const normHR = hr / (headRibs - 1);
  const headXOffset = (normHR - 0.5) * (36 * sharkScale);
  ctx.beginPath();
  for (let s = -1; s <= 1; s += 2) {
    const pWingTip = project3D(head.x + headXOffset - 12 * sharkScale, head.y, head.z + s * headSpan * (1 - Math.abs(normHR - 0.5) * 0.2), rotX, rotY, rotZ, cx, cy, 460, 520);
    const pHeadCenter = project3D(head.x + headXOffset - 42 * sharkScale, head.y, head.z, rotX, rotY, rotZ, cx, cy, 460, 520);
    if (s === -1) {
      ctx.moveTo(pWingTip.x, pWingTip.y);
      ctx.lineTo(pHeadCenter.x, pHeadCenter.y);
    } else {
      ctx.lineTo(pWingTip.x, pWingTip.y);
    }
  }
  ctx.strokeStyle = hsla((baseHue + 30) % 360, 95, 78, 0.55);
  ctx.lineWidth = hr === 0 || hr === headRibs - 1 ? 2.0 : 1.0;
  ctx.stroke();
}

// Stereoscopic Eyes at Cephalofoil Tips
for (let s = -1; s <= 1; s += 2) {
  const pEye = project3D(head.x - 14 * sharkScale, head.y, head.z + s * (headSpan - 6 * sharkScale), rotX, rotY, rotZ, cx, cy, 460, 520);
  ctx.fillStyle = '#38bdf8';
  ctx.shadowColor = '#38bdf8';
  ctx.shadowBlur = 14 * pEye.depth;
  ctx.beginPath();
  ctx.arc(pEye.x, pEye.y, 6.0 * pEye.depth * sharkScale, 0, Math.PI * 2);
  ctx.fill();
  ctx.shadowBlur = 0;
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.arc(pEye.x, pEye.y, 2.5 * pEye.depth * sharkScale, 0, Math.PI * 2);
  ctx.fill();
}

// Ampullae of Lorenzini Electroreceptor Clusters
for (let p = 0; p < 16; p++) {
  const normP = (p / 15 - 0.5) * 2;
  const poreZ = head.z + normP * (headSpan * 0.85);
  const poreX = head.x - (38 - Math.abs(normP) * 12) * sharkScale;
  const pPore = project3D(poreX, head.y, poreZ, rotX, rotY, rotZ, cx, cy, 460, 520);
  ctx.fillStyle = '#67e8f9';
  ctx.beginPath();
  ctx.arc(pPore.x, pPore.y, 1.8 * pPore.depth, 0, Math.PI * 2);
  ctx.fill();
}

// 5. Tall Sickle Dorsal Fin
const dorsalIdx = Math.floor(SPINE_NODES * 0.32);
const dBase = spineNodes[dorsalIdx];
for (let dr = 0; dr < 10; dr++) {
  const normDR = dr / 9;
  const dXBase = dBase.x + (normDR - 0.5) * (45 * sharkScale);
  const dYBase = dBase.y - dBase.thicknessY;
  const p1 = project3D(dXBase, dYBase, dBase.z, rotX, rotY, rotZ, cx, cy, 460, 520);
  const p2 = project3D(dBase.x + 18 * sharkScale, dBase.y - (92 * sharkScale), dBase.z, rotX, rotY, rotZ, cx, cy, 460, 520);
  ctx.beginPath();
  ctx.moveTo(p1.x, p1.y);
  ctx.lineTo(p2.x, p2.y);
  ctx.strokeStyle = hsla(baseHue, 95, 75, (0.2 + normDR * 0.5) * p2.depth);
  ctx.lineWidth = dr === 0 ? 2.2 : 1.2;
  ctx.stroke();
}

// 6. Heterocercal Caudal Tail Fin
const tail = spineNodes[SPINE_NODES - 1];
for (let tr = 0; tr < 12; tr++) {
  const normTR = tr / 11;
  const pTBase = project3D(tail.x, tail.y, tail.z, rotX, rotY, rotZ, cx, cy, 460, 520);
  const pTUpper = project3D(tail.x + (45 + normTR * 30) * sharkScale, tail.y - (45 + normTR * 35) * sharkScale, tail.z, rotX, rotY, rotZ, cx, cy, 460, 520);
  const pTLower = project3D(tail.x + (30 + normTR * 22) * sharkScale, tail.y + (25 + normTR * 25) * sharkScale, tail.z, rotX, rotY, rotZ, cx, cy, 460, 520);
  ctx.beginPath();
  ctx.moveTo(pTBase.x, pTBase.y);
  ctx.lineTo(pTUpper.x, pTUpper.y);
  ctx.moveTo(pTBase.x, pTBase.y);
  ctx.lineTo(pTLower.x, pTLower.y);
  ctx.strokeStyle = hsla((baseHue + 20) % 360, 95, 80, 0.65 * pTUpper.depth);
  ctx.lineWidth = tr === 11 ? 2.0 : 1.2;
  ctx.stroke();
}

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
ctx.fill();`,

  // 56. Quantum Hydrogen Orbital
  'quantum-hydrogen-orbital': `// Quantum Hydrogen Orbital Wavefunction (|ψ_nlm|^2)
ctx.fillStyle = '#020307';
ctx.fillRect(0, 0, width, height);

const cx = width * 0.5;
const cy = height * 0.5;
const scale = Math.min(width, height) * 0.38;
const t = time * 0.8;

ctx.save();
ctx.globalCompositeOperation = 'screen';

// Probability Density Cloud
for (let i = 0; i < 400; i++) {
  const theta = (i / 400) * Math.PI;
  const phi = (i * 137.5) * (Math.PI / 180) + t;
  // 3d orbital factor
  const angular = Math.abs(3 * Math.cos(theta) * Math.cos(theta) - 1);
  const r = scale * (0.3 + angular * 0.5) * (1 + 0.1 * Math.sin(phi * 4 + t));

  const px = cx + r * Math.sin(theta) * Math.cos(phi);
  const py = cy + r * Math.cos(theta);

  ctx.fillStyle = 'hsla(' + ((phi * 40 + t * 30) % 360) + ', 95%, 72%, 0.85)';
  ctx.fillRect(px, py, 2.2, 2.2);
}

// Central Proton Core
ctx.fillStyle = '#ffffff';
ctx.beginPath();
ctx.arc(cx, cy, 5, 0, Math.PI * 2);
ctx.fill();
ctx.restore();`,

  // 57. Lorenz Strange Attractor
  'lorenz-attractor-chaos': `// Lorenz Strange Attractor (Chaos Theory)
ctx.fillStyle = 'rgba(2, 3, 7, 0.25)';
ctx.fillRect(0, 0, width, height);

const cx = width * 0.5;
const cy = height * 0.52;
const scale = Math.min(width, height) * 0.018;
const t = time;

let x = 0.1, y = 0.0, z = 0.0;
const sigma = 10, rho = 28, beta = 8/3;
const dt = 0.008;

ctx.beginPath();
for (let i = 0; i < 600; i++) {
  const dx = sigma * (y - x);
  const dy = x * (rho - z) - y;
  const dz = x * y - beta * z;
  x += dx * dt;
  y += dy * dt;
  z += dz * dt;

  const rotAngle = t * 0.4;
  const rx = (x * Math.cos(rotAngle) - y * Math.sin(rotAngle)) * scale * 22;
  const ry = -(z - 25) * scale * 22;

  const px = cx + rx;
  const py = cy + ry;

  if (i === 0) ctx.moveTo(px, py);
  else ctx.lineTo(px, py);
}
ctx.strokeStyle = '#38bdf8';
ctx.lineWidth = 1.6;
ctx.stroke();`,

  // 58. Double Pendulum
  'double-pendulum-chaos': `// Double Pendulum (Lagrangian Mechanics)
ctx.fillStyle = 'rgba(2, 3, 7, 0.22)';
ctx.fillRect(0, 0, width, height);

const cx = width * 0.5;
const cy = height * 0.38;
const l1 = 110, l2 = 90;
const t = time * 2.0;

const th1 = Math.sin(t) * 1.5;
const th2 = Math.sin(t * 1.4) * 2.2;

const x1 = cx + l1 * Math.sin(th1);
const y1 = cy + l1 * Math.cos(th1);
const x2 = x1 + l2 * Math.sin(th2);
const y2 = y1 + l2 * Math.cos(th2);

// Rods
ctx.beginPath();
ctx.moveTo(cx, cy);
ctx.lineTo(x1, y1);
ctx.lineTo(x2, y2);
ctx.strokeStyle = '#64748b';
ctx.lineWidth = 2.8;
ctx.stroke();

// Bobs
ctx.fillStyle = '#0284c7';
ctx.beginPath();
ctx.arc(x1, y1, 8, 0, Math.PI * 2);
ctx.fill();

ctx.fillStyle = '#38bdf8';
ctx.beginPath();
ctx.arc(x2, y2, 10, 0, Math.PI * 2);
ctx.fill();`,

  // 59. Fourier Epicycles Transform
  'fourier-epicycles-transform': `// Fourier Transform & Epicycles Decomposition
ctx.fillStyle = '#020409';
ctx.fillRect(0, 0, width, height);

const cx = width * 0.5;
const cy = height * 0.5;
const t = time * 0.8;
const terms = 12;

let curX = cx;
let curY = cy;

for (let k = 1; k <= terms; k++) {
  const prevX = curX;
  const prevY = curY;
  const freq = (k % 2 === 1) ? k : -k;
  const radius = (100 / Math.abs(freq));
  const theta = freq * t;

  curX += radius * Math.cos(theta);
  curY += radius * Math.sin(theta);

  ctx.beginPath();
  ctx.arc(prevX, prevY, radius, 0, Math.PI * 2);
  ctx.strokeStyle = 'rgba(56, 189, 248, 0.2)';
  ctx.lineWidth = 1.0;
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(prevX, prevY);
  ctx.lineTo(curX, curY);
  ctx.strokeStyle = 'rgba(56, 189, 248, 0.7)';
  ctx.lineWidth = 1.4;
  ctx.stroke();
}

ctx.fillStyle = '#f43f5e';
ctx.beginPath();
ctx.arc(curX, curY, 5, 0, Math.PI * 2);
ctx.fill();`,

  // 60. Maxwell's EM Wave
  'maxwell-em-wave': `// Maxwell's Electromagnetic Wave Propagation (E ⊥ B ⊥ S)
ctx.fillStyle = '#020308';
ctx.fillRect(0, 0, width, height);

const cy = height * 0.5;
const t = time * 2.5;
const nodes = 30;

for (let i = 0; i < nodes; i++) {
  const x = (i / (nodes - 1)) * (width * 0.8) + (width * 0.1);
  const phase = (i * 0.3) - t;
  const eVal = Math.sin(phase) * 65;
  const bVal = Math.cos(phase) * 45;

  // E-Field Vector (Cyan vertical)
  ctx.beginPath();
  ctx.moveTo(x, cy);
  ctx.lineTo(x, cy - eVal);
  ctx.strokeStyle = '#38bdf8';
  ctx.lineWidth = 2.0;
  ctx.stroke();

  // B-Field Vector (Magenta oblique)
  ctx.beginPath();
  ctx.moveTo(x, cy);
  ctx.lineTo(x + bVal * 0.6, cy + bVal * 0.4);
  ctx.strokeStyle = '#f43f5e';
  ctx.lineWidth = 1.6;
  ctx.stroke();
}`,

  // 61. Spacetime Curvature & Geodesics
  'spacetime-curvature-geodesic': `// General Relativity: Spacetime Curvature Funnel
ctx.fillStyle = '#010205';
ctx.fillRect(0, 0, width, height);

const cx = width * 0.5;
const cy = height * 0.52;
const scale = Math.min(width, height) * 0.4;
const t = time * 0.8;

// Warped Coordinate Rings
for (let r = 1; r <= 16; r++) {
  const normR = r / 16;
  const rad = normR * scale;
  const depth = (1 - normR) * 85;

  ctx.beginPath();
  ctx.ellipse(cx, cy + depth, rad, rad * 0.4, 0, 0, Math.PI * 2);
  ctx.strokeStyle = 'hsla(' + ((200 + normR * 40) % 360) + ', 90%, 68%, ' + (0.1 + (1 - normR) * 0.5) + ')';
  ctx.lineWidth = 1.2;
  ctx.stroke();
}

// Central Mass
ctx.fillStyle = '#f59e0b';
ctx.beginPath();
ctx.arc(cx, cy + 85, 14, 0, Math.PI * 2);
ctx.fill();`,

  // 62. Baroque Golden Arabesque Filigree
  'baroque-filigrane': `// 062 - Baroque Golden Arabesque Filigree
ctx.fillStyle = '#050608';
ctx.fillRect(0, 0, width, height);

const cx = width * 0.5;
const cy = height * 0.5;
const maxR = Math.min(width, height) * 0.44;
const folds = 8;
const t = time * 0.6;

ctx.save();
ctx.translate(cx, cy);

// Rosette Core
for (let r = 1; r <= 3; r++) {
  ctx.beginPath();
  const rad = (r / 3) * (maxR * 0.16);
  for (let i = 0; i <= folds * 2; i++) {
    const a = (i / (folds * 2)) * Math.PI * 2 + t * 0.2;
    const px = Math.cos(a) * rad * (1 + 0.15 * Math.sin(a * folds));
    const py = Math.sin(a) * rad * (1 + 0.15 * Math.sin(a * folds));
    if (i === 0) ctx.moveTo(px, py);
    else ctx.lineTo(px, py);
  }
  ctx.closePath();
  ctx.strokeStyle = 'hsla(45, 90%, 75%, 0.8)';
  ctx.lineWidth = 1.2;
  ctx.stroke();
}

// S-Scroll Volute Arms
for (let f = 0; f < folds; f++) {
  ctx.save();
  ctx.rotate((f / folds) * Math.PI * 2 + t * 0.05);

  ctx.beginPath();
  const steps = 50;
  for (let i = 0; i <= steps; i++) {
    const u = i / steps;
    const theta = u * Math.PI * 2.2;
    const r = (maxR * 0.16) + (maxR * 0.84) * Math.pow(u, 0.9);
    const curl = Math.sin(theta) * (maxR * 0.14 * (1 - u));
    const px = Math.cos(theta * 0.45) * r + curl;
    const py = Math.sin(theta * 0.45) * r;
    if (i === 0) ctx.moveTo(px, py);
    else ctx.lineTo(px, py);
  }
  ctx.strokeStyle = 'hsla(' + ((42 + Math.sin(t * 3 + f) * 8) % 360) + ', 92%, 70%, 0.85)';
  ctx.lineWidth = 1.8;
  ctx.stroke();

  ctx.restore();
}
ctx.restore();`,

  // 63. Guilloché Horology Lace Filigree
  'guilloche-filigrane': `// 063 - Guilloché Horology & Banknote Lace Filigree
ctx.fillStyle = '#04060c';
ctx.fillRect(0, 0, width, height);

const cx = width * 0.5;
const cy = height * 0.5;
const baseR = Math.min(width, height) * 0.42;
const gearRatio = 7;
const t = time * 0.4;

ctx.save();
ctx.translate(cx, cy);

for (let layer = 0; layer < 4; layer++) {
  const layerFrac = (layer + 1) / 4;
  const R = baseR * (0.35 + 0.65 * layerFrac);
  const r = R / gearRatio;
  const d = r * 0.75;
  const phase = t * (layer % 2 === 0 ? 0.35 : -0.28) + (layer * Math.PI) / 4;

  ctx.beginPath();
  const steps = 360;
  for (let i = 0; i <= steps; i++) {
    const theta = (i / steps) * Math.PI * 2 * gearRatio;
    const diff = R - r;
    const k = diff / r;
    const wave = Math.sin(theta * 1.7 + phase) * (baseR * 0.04);
    const x = diff * Math.cos(theta) + (d + wave) * Math.cos(k * theta + phase);
    const y = diff * Math.sin(theta) - (d + wave) * Math.sin(k * theta + phase);
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.closePath();
  ctx.strokeStyle = 'hsla(' + ((205 + layer * 25 + time * 15) % 360) + ', 95%, 75%, 0.65)';
  ctx.lineWidth = 1.1;
  ctx.stroke();
}
ctx.restore();`,

  // 64. Damascene Star Tracery Filigree
  'damascene-filigrane': `// 064 - Damascene Islamic Star Tracery Filigree
ctx.fillStyle = '#030806';
ctx.fillRect(0, 0, width, height);

const cx = width * 0.5;
const cy = height * 0.5;
const maxR = Math.min(width, height) * 0.43;
const sym = 8;
const t = time * 0.5;

ctx.save();
ctx.translate(cx, cy);
ctx.rotate(t * 0.05);

for (let ring = 1; ring <= 3; ring++) {
  const rOuter = maxR * (ring / 3);
  const rInner = maxR * ((ring - 0.7) / 3);
  const isGold = ring % 2 === 1;

  for (let s = 0; s < sym; s++) {
    const a1 = (s / sym) * Math.PI * 2 + ring * 0.3;
    const a2 = ((s + 0.5) / sym) * Math.PI * 2 + ring * 0.3;
    const a3 = ((s + 1) / sym) * Math.PI * 2 + ring * 0.3;

    const p1x = Math.cos(a1) * rInner;
    const p1y = Math.sin(a1) * rInner;
    const p2x = Math.cos(a2) * rOuter;
    const p2y = Math.sin(a2) * rOuter;
    const p3x = Math.cos(a3) * rInner;
    const p3y = Math.sin(a3) * rInner;

    ctx.beginPath();
    ctx.moveTo(p1x, p1y);
    ctx.quadraticCurveTo((p1x + p2x) * 0.5, (p1y + p2y) * 0.5, p2x, p2y);
    ctx.quadraticCurveTo((p2x + p3x) * 0.5, (p2y + p3y) * 0.5, p3x, p3y);

    ctx.strokeStyle = isGold ? 'hsla(44, 95%, 72%, 0.8)' : 'hsla(158, 90%, 68%, 0.8)';
    ctx.lineWidth = 1.4;
    ctx.stroke();
  }
}
ctx.restore();`,

  // 65. Victorian Botanical Vine Filigree
  'botanical-filigrane': `// 065 - Victorian Botanical Vine & Acanthus Filigree
ctx.fillStyle = '#060706';
ctx.fillRect(0, 0, width, height);

const cx = width * 0.5;
const cy = height * 0.5;
const maxR = Math.min(width, height) * 0.44;
const tendrils = 6;
const t = time * 0.5;

ctx.save();
ctx.translate(cx, cy);

for (let tr = 0; tr < tendrils; tr++) {
  ctx.save();
  ctx.rotate((tr / tendrils) * Math.PI * 2 + t * 0.06);

  ctx.beginPath();
  const steps = 40;
  for (let i = 0; i <= steps; i++) {
    const u = i / steps;
    const r = (maxR * 0.12) + (maxR * 0.88) * Math.pow(u, 0.9);
    const arc = u * Math.PI * 1.2;
    const vx = Math.cos(arc * 0.6) * r;
    const vy = Math.sin(arc * 0.6) * r;
    if (i === 0) ctx.moveTo(vx, vy);
    else ctx.lineTo(vx, vy);
  }
  ctx.strokeStyle = 'hsla(46, 92%, 70%, 0.9)';
  ctx.lineWidth = 2.0;
  ctx.stroke();

  ctx.restore();
}
ctx.restore();`,

  // 66. Maurer Rhodonea Rose
  'rhodonea-rose': `// 066 - Maurer Rhodonea Rose
ctx.fillStyle = '#060305';
ctx.fillRect(0, 0, width, height);

const cx = width * 0.5;
const cy = height * 0.5;
const maxR = Math.min(width, height) * 0.43;
const k = 6;
const d = 71;
const t = time * 0.4;

ctx.save();
ctx.translate(cx, cy);

// Maurer Chords
for (let layer = 1; layer <= 3; layer++) {
  const layerR = maxR * (0.3 + 0.7 * (layer / 3)) * (1 + 0.05 * Math.sin(t * 0.8 + layer));
  ctx.save();
  ctx.rotate(t * 0.08 * (layer % 2 === 0 ? 1 : -0.7) + (layer * Math.PI) / 3);

  ctx.beginPath();
  for (let i = 0; i <= 360; i++) {
    const theta = ((i * d) * Math.PI) / 180;
    const r = layerR * Math.sin(k * theta);
    const px = Math.cos(theta) * r;
    const py = Math.sin(theta) * r;
    if (i === 0) ctx.moveTo(px, py);
    else ctx.lineTo(px, py);
  }
  ctx.strokeStyle = 'hsla(' + ((345 + layer * 15) % 360) + ', 85%, 72%, 0.35)';
  ctx.lineWidth = 0.9;
  ctx.stroke();
  ctx.restore();
}

// Center Stamens
for (let s = 0; s < 24; s++) {
  const sa = (s / 24) * Math.PI * 2 + t * 0.2;
  const sx = Math.cos(sa) * 18;
  const sy = Math.sin(sa) * 18;
  ctx.fillStyle = '#fbbf24';
  ctx.beginPath();
  ctx.arc(sx, sy, 1.8, 0, Math.PI * 2);
  ctx.fill();
}
ctx.restore();`,

  // 67. Sacred Water Lotus
  'sacred-lotus': `// 067 - Sacred Water Lotus Bloom
ctx.fillStyle = '#03060a';
ctx.fillRect(0, 0, width, height);

const cx = width * 0.5;
const cy = height * 0.5;
const maxR = Math.min(width, height) * 0.44;
const petals = 12;
const t = time * 0.4;

ctx.save();
ctx.translate(cx, cy);

for (let w = 3; w >= 1; w--) {
  const pLen = maxR * (0.4 + 0.6 * (w / 3));
  const pWidth = pLen * 0.38;
  const whorlOff = (w * Math.PI) / petals + t * 0.1;

  for (let p = 0; p < petals; p++) {
    ctx.save();
    ctx.rotate((p / petals) * Math.PI * 2 + whorlOff);

    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.bezierCurveTo(-pWidth, pLen * 0.45, -pWidth * 0.3, pLen * 0.85, 0, pLen);
    ctx.bezierCurveTo(pWidth * 0.3, pLen * 0.85, pWidth, pLen * 0.45, 0, 0);

    ctx.fillStyle = 'hsla(' + (330 - (3 - w) * 15) + ', 85%, 68%, 0.25)';
    ctx.fill();
    ctx.strokeStyle = 'hsla(345, 90%, 80%, 0.7)';
    ctx.lineWidth = 1.2;
    ctx.stroke();

    ctx.restore();
  }
}

// Golden Receptacle Pod
ctx.beginPath();
ctx.arc(0, 0, maxR * 0.12, 0, Math.PI * 2);
ctx.fillStyle = '#eab308';
ctx.fill();
ctx.restore();`,

  // 68. Chrysanthemum Polar Blossom
  'chrysanthemum-bloom': `// 068 - Chrysanthemum Polar Blossom
ctx.fillStyle = '#060504';
ctx.fillRect(0, 0, width, height);

const cx = width * 0.5;
const cy = height * 0.5;
const scale = Math.min(width, height) * 0.038;
const t = time * 0.5;

ctx.save();
ctx.translate(cx, cy);

for (let layer = 1; layer <= 3; layer++) {
  const lScale = scale * (0.5 + 0.5 * (layer / 3));
  ctx.beginPath();
  const steps = 900;
  for (let i = 0; i <= steps; i++) {
    const theta = (i / steps) * 16 * Math.PI;
    const p1 = 5 * (1 + Math.sin((11 * theta) / 5 + t * 0.3));
    const p2 = 4 * Math.pow(Math.sin((17 * theta) / 3 - t * 0.5), 4);
    const p3 = Math.pow(Math.sin(9 * theta - Math.PI * 0.5), 8);
    const r = Math.max(0.1, p1 - p2 * p3) * lScale;

    const px = Math.cos(theta) * r;
    const py = Math.sin(theta) * r;
    if (i === 0) ctx.moveTo(px, py);
    else ctx.lineTo(px, py);
  }
  ctx.strokeStyle = 'hsla(' + ((38 + layer * 15) % 360) + ', 92%, 70%, 0.55)';
  ctx.lineWidth = 1.2;
  ctx.stroke();
}
ctx.restore();`,

  // 69. Bioluminescent Orchid
  'bioluminescent-orchid': `// 069 - Bioluminescent Orchid Epiphyte
ctx.fillStyle = '#040308';
ctx.fillRect(0, 0, width, height);

const cx = width * 0.5;
const cy = height * 0.52;
const maxR = Math.min(width, height) * 0.42;
const t = time * 0.5;

ctx.save();
ctx.translate(cx, cy);

// Dorsal Sepal
ctx.beginPath();
ctx.moveTo(0, 0);
ctx.bezierCurveTo(-maxR * 0.28, -maxR * 0.35, 0, -maxR * 0.7, 0, -maxR * 0.75);
ctx.bezierCurveTo(0, -maxR * 0.7, maxR * 0.28, -maxR * 0.35, 0, 0);
ctx.fillStyle = 'hsla(285, 90%, 60%, 0.35)';
ctx.fill();
ctx.strokeStyle = '#c084fc';
ctx.lineWidth = 1.4;
ctx.stroke();

// Flared Wings
for (const side of [-1, 1]) {
  ctx.save();
  ctx.rotate(side * Math.PI * 0.58);
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.bezierCurveTo(-maxR * 0.2, -maxR * 0.3, 0, -maxR * 0.8, 0, -maxR * 0.85);
  ctx.bezierCurveTo(0, -maxR * 0.8, maxR * 0.2, -maxR * 0.3, 0, 0);
  ctx.fillStyle = 'hsla(270, 90%, 65%, 0.3)';
  ctx.fill();
  ctx.strokeStyle = '#a855f7';
  ctx.lineWidth = 1.4;
  ctx.stroke();
  ctx.restore();
}

// Cyan Labellum Lip
ctx.beginPath();
ctx.moveTo(0, 0);
ctx.bezierCurveTo(-maxR * 0.35, maxR * 0.2, -maxR * 0.4, maxR * 0.45, 0, maxR * 0.55);
ctx.bezierCurveTo(maxR * 0.4, maxR * 0.45, maxR * 0.35, maxR * 0.2, 0, 0);
ctx.fillStyle = 'hsla(185, 95%, 55%, 0.45)';
ctx.fill();
ctx.strokeStyle = '#38bdf8';
ctx.lineWidth = 1.8;
ctx.stroke();

// Glowing Core
ctx.fillStyle = '#fef08a';
ctx.beginPath();
ctx.arc(0, 0, 4, 0, Math.PI * 2);
ctx.fill();
ctx.restore();`,

  // 70. Fibonacci Sunflower Florets
  'fibonacci-sunflower': `// 070 - Fibonacci Sunflower Florets
ctx.fillStyle = '#060503';
ctx.fillRect(0, 0, width, height);

const cx = width * 0.5;
const cy = height * 0.5;
const maxR = Math.min(width, height) * 0.44;
const florets = 400;
const divAngle = (137.507764 * Math.PI) / 180;
const t = time * 0.5;

ctx.save();
ctx.translate(cx, cy);

const diskR = maxR * 0.55;

// Ray Petals
const rayPetals = 21;
for (let p = 0; p < rayPetals; p++) {
  const ang = (p / rayPetals) * Math.PI * 2 + Math.sin(t * 1.5 + p * 0.4) * 0.04;
  ctx.save();
  ctx.rotate(ang);

  ctx.beginPath();
  ctx.moveTo(0, diskR * 0.85);
  ctx.bezierCurveTo(-22, diskR + 25, -6, maxR * 0.95, 0, maxR);
  ctx.bezierCurveTo(6, maxR * 0.95, 22, diskR + 25, 0, diskR * 0.85);

  ctx.fillStyle = '#facc15';
  ctx.fill();
  ctx.strokeStyle = '#f59e0b';
  ctx.lineWidth = 1.2;
  ctx.stroke();

  ctx.restore();
}

// Vogel Seed Disk
const c = diskR / Math.sqrt(florets);
for (let n = 1; n <= florets; n++) {
  const theta = n * divAngle + t * 0.03;
  const r = c * Math.sqrt(n);
  const px = Math.cos(theta) * r;
  const py = Math.sin(theta) * r;

  const nNorm = n / florets;
  ctx.fillStyle = 'hsla(' + (26 + nNorm * 22) + ', 90%, ' + (24 + nNorm * 48) + '%, 0.95)';
  ctx.beginPath();
  ctx.arc(px, py, 1.2 + nNorm * 2.2, 0, Math.PI * 2);
  ctx.fill();
}
ctx.restore();`,

  // 71. Temple Fay Mathematical Butterfly
  'mathematical-butterfly': `// 071 - Temple Fay Mathematical Butterfly
ctx.fillStyle = '#040308';
ctx.fillRect(0, 0, width, height);

const cx = width * 0.5;
const cy = height * 0.5;
const maxR = Math.min(width, height) * 0.44;
const flapX = 0.35 + 0.65 * Math.cos(time * 4.2);

ctx.save();
ctx.translate(cx, cy + Math.sin(time * 2.5) * 8);

for (const side of [-1, 1]) {
  ctx.save();
  ctx.scale(side * flapX, 1);

  // Forewing
  ctx.beginPath();
  const fSteps = 50;
  for (let i = 0; i <= fSteps; i++) {
    const u = i / fSteps;
    const theta = u * Math.PI * 0.75 - Math.PI * 0.15;
    const r = maxR * (0.3 + 0.68 * Math.pow(Math.sin(u * Math.PI), 0.7));
    const fx = Math.sin(theta) * r * 1.2;
    const fy = -Math.cos(theta) * r * 0.95;
    if (i === 0) ctx.moveTo(fx, fy);
    else ctx.lineTo(fx, fy);
  }
  ctx.fillStyle = 'hsla(195, 90%, 52%, 0.5)';
  ctx.fill();
  ctx.strokeStyle = '#38bdf8';
  ctx.lineWidth = 1.4;
  ctx.stroke();

  // Hindwing
  ctx.beginPath();
  const hSteps = 40;
  for (let j = 0; j <= hSteps; j++) {
    const v = j / hSteps;
    const phi = v * Math.PI * 0.8 + Math.PI * 0.4;
    const hr = maxR * (0.25 + 0.48 * Math.sin(v * Math.PI));
    const hx = Math.sin(phi) * hr * 0.9;
    const hy = -Math.cos(phi) * hr * 0.9;
    if (j === 0) ctx.moveTo(hx, hy);
    else ctx.lineTo(hx, hy);
  }
  ctx.fillStyle = 'hsla(180, 90%, 45%, 0.45)';
  ctx.fill();
  ctx.strokeStyle = '#22d3ee';
  ctx.lineWidth = 1.2;
  ctx.stroke();

  ctx.restore();
}

// Abdomen & Antennae
ctx.beginPath();
ctx.ellipse(0, 0, 5, 25, 0, 0, Math.PI * 2);
ctx.fillStyle = '#0f172a';
ctx.fill();
ctx.strokeStyle = '#38bdf8';
ctx.stroke();
ctx.restore();`,

  // 72. Iridescent Jewel Scarab Beetle
  'scarab-beetle': `// 072 - Iridescent Jewel Scarab Beetle
ctx.fillStyle = '#030504';
ctx.fillRect(0, 0, width, height);

const cx = width * 0.5;
const cy = height * 0.5;
const maxR = Math.min(width, height) * 0.42;
const t = time * 0.8;

ctx.save();
ctx.translate(cx, cy + Math.sin(t * 2) * 4);

const baseHue = (145 + Math.sin(t * 0.8) * 35) % 360;

// Elytra Shells
for (const eSide of [-1, 1]) {
  ctx.save();
  ctx.rotate(eSide * 0.15);

  ctx.beginPath();
  ctx.moveTo(0, -maxR * 0.02);
  ctx.bezierCurveTo(eSide * maxR * 0.35, -maxR * 0.02, eSide * maxR * 0.35, maxR * 0.5, eSide * 2, maxR * 0.58);
  ctx.lineTo(0, -maxR * 0.02);
  ctx.fillStyle = 'hsla(' + baseHue + ', 88%, 42%, 0.95)';
  ctx.fill();
  ctx.strokeStyle = 'hsla(' + (baseHue + 40) + ', 95%, 80%, 0.95)';
  ctx.lineWidth = 1.6;
  ctx.stroke();

  ctx.restore();
}

// Pronotum Shield
ctx.beginPath();
ctx.ellipse(0, -maxR * 0.12, maxR * 0.22, maxR * 0.1, 0, 0, Math.PI * 2);
ctx.fillStyle = 'hsla(' + (baseHue + 20) + ', 85%, 36%, 0.95)';
ctx.fill();
ctx.strokeStyle = '#fbbf24';
ctx.lineWidth = 1.5;
ctx.stroke();

// Head & Horns
ctx.beginPath();
ctx.arc(0, -maxR * 0.24, maxR * 0.1, 0, Math.PI * 2);
ctx.fillStyle = '#06130b';
ctx.fill();
ctx.restore();`,

  // 73. Golden Mathematical Honeybee
  'golden-honeybee': `// 073 - Golden Mathematical Honeybee
ctx.fillStyle = '#060402';
ctx.fillRect(0, 0, width, height);

const cx = width * 0.5;
const cy = height * 0.52;
const maxR = Math.min(width, height) * 0.42;
const strokePhase = Math.sin(time * 25);

ctx.save();
ctx.translate(cx, cy);

// Rapid Wings
for (const wSide of [-1, 1]) {
  ctx.save();
  ctx.rotate(-Math.PI * 0.48 * wSide + strokePhase * 0.35 * wSide);
  ctx.scale(1, 0.4 + 0.6 * Math.abs(strokePhase));

  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.bezierCurveTo(wSide * 35, -30, wSide * 40, -80, 0, -maxR * 0.8);
  ctx.bezierCurveTo(-wSide * 15, -70, -wSide * 10, -20, 0, 0);
  ctx.fillStyle = 'rgba(254, 240, 138, 0.25)';
  ctx.fill();
  ctx.strokeStyle = '#fef08a';
  ctx.lineWidth = 1.2;
  ctx.stroke();

  ctx.restore();
}

// Striped Abdomen
for (let s = 0; s < 6; s++) {
  const sy = s * 14 + 10;
  ctx.beginPath();
  ctx.ellipse(0, sy, (6 - s * 0.8) * 4, 8, 0, 0, Math.PI * 2);
  ctx.fillStyle = s % 2 === 0 ? '#f59e0b' : '#0a0806';
  ctx.fill();
  ctx.strokeStyle = '#fbbf24';
  ctx.lineWidth = 1.0;
  ctx.stroke();
}

// Thorax & Head
ctx.beginPath();
ctx.arc(0, -10, 18, 0, Math.PI * 2);
ctx.fillStyle = '#1c1308';
ctx.fill();
ctx.strokeStyle = '#f59e0b';
ctx.lineWidth = 1.6;
ctx.stroke();

ctx.beginPath();
ctx.arc(0, -30, 12, 0, Math.PI * 2);
ctx.fillStyle = '#0f0a04';
ctx.fill();
ctx.restore();`,

  // 74. Bioluminescent Odonata Dragonfly
  'bioluminescent-dragonfly': `// 074 - Bioluminescent Odonata Dragonfly
ctx.fillStyle = '#020508';
ctx.fillRect(0, 0, width, height);

const cx = width * 0.5;
const cy = height * 0.48;
const maxR = Math.min(width, height) * 0.44;
const t = time * 1.5;

ctx.save();
ctx.translate(cx, cy + Math.sin(t * 2.5) * 8);

// 4 Counter-Phase Wings
for (const wSide of [-1, 1]) {
  // Forewing
  ctx.save();
  ctx.translate(wSide * 6, -10);
  ctx.rotate(wSide * (-Math.PI * 0.42 + Math.sin(t * 8) * 0.15));
  ctx.scale(1, 0.35 + 0.65 * Math.cos(t * 8));

  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.bezierCurveTo(wSide * 20, -30, wSide * 25, -70, 0, -maxR * 0.95);
  ctx.bezierCurveTo(-wSide * 15, -70, -wSide * 10, -30, 0, 0);
  ctx.fillStyle = 'rgba(56, 189, 248, 0.2)';
  ctx.fill();
  ctx.strokeStyle = '#38bdf8';
  ctx.lineWidth = 1.2;
  ctx.stroke();
  ctx.restore();

  // Hindwing
  ctx.save();
  ctx.translate(wSide * 6, 8);
  ctx.rotate(wSide * (-Math.PI * 0.55 + Math.sin(t * 8 - Math.PI * 0.5) * 0.15));
  ctx.scale(1, 0.35 + 0.65 * Math.cos(t * 8 - Math.PI * 0.5));

  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.bezierCurveTo(wSide * 22, -25, wSide * 26, -60, 0, -maxR * 0.88);
  ctx.bezierCurveTo(-wSide * 16, -60, -wSide * 10, -25, 0, 0);
  ctx.fillStyle = 'rgba(34, 211, 238, 0.18)';
  ctx.fill();
  ctx.strokeStyle = '#22d3ee';
  ctx.lineWidth = 1.1;
  ctx.stroke();
  ctx.restore();
}

// Slender Abdomen
for (let s = 1; s <= 10; s++) {
  ctx.beginPath();
  ctx.ellipse(0, s * 14 + 10, 3.5, 6, 0, 0, Math.PI * 2);
  ctx.fillStyle = '#062024';
  ctx.fill();
  ctx.strokeStyle = '#38bdf8';
  ctx.stroke();
}

// Head & Glowing Eyes
ctx.beginPath();
ctx.arc(0, -18, 12, 0, Math.PI * 2);
ctx.fillStyle = '#062024';
ctx.fill();
ctx.strokeStyle = '#22d3ee';
ctx.stroke();
ctx.restore();`,

  // 75. Royal Siamese Betta Splendens
  'siamese-betta': `// 075 - Royal Siamese Betta Splendens
ctx.fillStyle = '#02060d';
ctx.fillRect(0, 0, width, height);

const cx = width * 0.48;
const cy = height * 0.5;
const maxR = Math.min(width, height) * 0.44;
const t = time * 0.85;

ctx.save();
ctx.translate(cx, cy);

// Volumetric Veil Fin Rays
const rays = 24;
for (let r = 0; r < rays; r++) {
  const u = r / (rays - 1);
  const ang = (u - 0.5) * Math.PI * 0.85;
  const wave = Math.sin(t * 3.5 - u * 2.5) * (maxR * 0.12);
  const len = maxR * 0.85 * (0.7 + 0.3 * Math.sin(u * Math.PI));

  ctx.beginPath();
  ctx.moveTo(maxR * 0.1, 0);
  ctx.quadraticCurveTo(maxR * 0.4 + wave, Math.sin(ang) * (len * 0.5), Math.cos(ang) * len + wave * 1.5, Math.sin(ang) * len);
  ctx.strokeStyle = 'hsla(' + (215 + u * 80) + ', 95%, 62%, 0.4)';
  ctx.lineWidth = 1.6;
  ctx.stroke();
}

// Torpedo Body & Head
ctx.beginPath();
ctx.moveTo(-maxR * 0.35, 0);
ctx.bezierCurveTo(-maxR * 0.2, -maxR * 0.14, maxR * 0.05, -maxR * 0.12, maxR * 0.12, 0);
ctx.bezierCurveTo(maxR * 0.05, maxR * 0.12, -maxR * 0.2, maxR * 0.14, -maxR * 0.35, 0);
ctx.fillStyle = '#0c1a38';
ctx.fill();
ctx.strokeStyle = '#38bdf8';
ctx.lineWidth = 1.4;
ctx.stroke();

// Golden Eye
ctx.beginPath();
ctx.arc(-maxR * 0.26, -3, 3.5, 0, Math.PI * 2);
ctx.fillStyle = '#f59e0b';
ctx.fill();
ctx.restore();`,

  // 76. Imperial Japanese Nishikigoi
  'japanese-koi': `// 076 - Imperial Japanese Nishikigoi
ctx.fillStyle = '#03080d';
ctx.fillRect(0, 0, width, height);

const cx = width * 0.5;
const cy = height * 0.5;
const maxR = Math.min(width, height) * 0.44;
const t = time * 0.75;

ctx.save();
ctx.translate(cx, cy);

// S-Curve Torpedo Body
ctx.beginPath();
ctx.moveTo(-maxR * 0.45, 0);
ctx.bezierCurveTo(-maxR * 0.2, -maxR * 0.16, maxR * 0.1, -maxR * 0.12, maxR * 0.4, 0);
ctx.bezierCurveTo(maxR * 0.1, maxR * 0.12, -maxR * 0.2, maxR * 0.16, -maxR * 0.45, 0);
ctx.fillStyle = '#fffbeb';
ctx.fill();
ctx.strokeStyle = '#f59e0b';
ctx.lineWidth = 1.5;
ctx.stroke();

// Kohaku Cinnabar Red Pattern
ctx.beginPath();
ctx.ellipse(-maxR * 0.28, 0, 16, 12, 0, 0, Math.PI * 2);
ctx.fillStyle = '#dc2626';
ctx.fill();

ctx.beginPath();
ctx.ellipse(-maxR * 0.05, -2, 22, 14, 0, 0, Math.PI * 2);
ctx.fillStyle = '#ea580c';
ctx.fill();

// Barbels
ctx.beginPath();
ctx.moveTo(-maxR * 0.44, 4);
ctx.quadraticCurveTo(-maxR * 0.5, 12, -maxR * 0.54, 16);
ctx.strokeStyle = '#fef08a';
ctx.lineWidth = 1.2;
ctx.stroke();
ctx.restore();`,

  // 77. Royal Symphysodon Discus
  'symphysodon-discus': `// 077 - Royal Symphysodon Discus
ctx.fillStyle = '#050403';
ctx.fillRect(0, 0, width, height);

const cx = width * 0.5;
const cy = height * 0.5;
const maxR = Math.min(width, height) * 0.44;

ctx.save();
ctx.translate(cx, cy + Math.sin(time * 2) * 5);

// Disc Torso
ctx.beginPath();
ctx.ellipse(0, 0, maxR * 0.52, maxR * 0.54, 0, 0, Math.PI * 2);
ctx.fillStyle = '#451a03';
ctx.fill();
ctx.strokeStyle = '#22d3ee';
ctx.lineWidth = 1.8;
ctx.stroke();

// Heckel Melanin Bars
for (let b = -2; b <= 2; b++) {
  const bx = b * 22;
  ctx.beginPath();
  ctx.moveTo(bx, -maxR * 0.48);
  ctx.lineTo(bx, maxR * 0.48);
  ctx.strokeStyle = 'rgba(15, 10, 6, 0.45)';
  ctx.lineWidth = b === 0 ? 3.5 : 2.0;
  ctx.stroke();
}

// Ruby Red Eye
ctx.beginPath();
ctx.arc(-maxR * 0.32, -maxR * 0.12, 5, 0, Math.PI * 2);
ctx.fillStyle = '#dc2626';
ctx.fill();
ctx.restore();`,

  // 78. Electric Radiant Lionfish
  'electric-lionfish': `// 078 - Electric Radiant Lionfish
ctx.fillStyle = '#020509';
ctx.fillRect(0, 0, width, height);

const cx = width * 0.46;
const cy = height * 0.5;
const maxR = Math.min(width, height) * 0.44;
const t = time * 0.85;

ctx.save();
ctx.translate(cx, cy + Math.sin(t * 1.8) * 6);

// 13 Venomous Spines
for (let s = 0; s < 13; s++) {
  const u = s / 12;
  const ang = -Math.PI * 0.65 + u * Math.PI * 0.55;
  const len = maxR * (0.8 + 0.35 * Math.sin(u * Math.PI));
  const sWave = Math.sin(t * 2.8 - s * 0.4) * (maxR * 0.08);

  ctx.beginPath();
  ctx.moveTo(-maxR * 0.2 + u * maxR * 0.45, -maxR * 0.12);
  ctx.lineTo(-maxR * 0.2 + u * maxR * 0.45 + Math.cos(ang) * len + sWave, -maxR * 0.12 + Math.sin(ang) * len);
  ctx.strokeStyle = '#ea580c';
  ctx.lineWidth = 1.5;
  ctx.stroke();
}

// Zebra Body
ctx.beginPath();
ctx.ellipse(0, 0, maxR * 0.32, maxR * 0.18, 0, 0, Math.PI * 2);
ctx.fillStyle = '#7c2d12';
ctx.fill();
ctx.strokeStyle = '#fb923c';
ctx.lineWidth = 1.6;
ctx.stroke();
ctx.restore();`
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
