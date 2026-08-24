// Standalone self-contained executable canvas recipes for all playground presets

export function getPresetCode(slug: string, title: string, category: string): string {
  // 1. Moiré Interference
  if (slug === 'moire-interference') {
    return `// Moiré Interference (${category})
ctx.fillStyle = '#05070d';
ctx.fillRect(0, 0, width, height);

const cx = width * 0.5;
const cy = height * 0.5;
const t = time * 0.9;
const rings = 65;
const spacing = 7.5;

// Layer 1: Center 1
ctx.lineWidth = 1.6;
ctx.strokeStyle = 'rgba(56, 189, 248, 0.75)';
for (let r = 1; r <= rings; r++) {
  ctx.beginPath();
  ctx.arc(cx - Math.sin(t) * 45, cy - Math.cos(t) * 25, r * spacing, 0, Math.PI * 2);
  ctx.stroke();
}

// Layer 2: Center 2 (Interference Fringe)
ctx.strokeStyle = 'rgba(244, 114, 182, 0.75)';
for (let r = 1; r <= rings; r++) {
  ctx.beginPath();
  ctx.arc(cx + Math.sin(t * 1.3) * 45, cy + Math.cos(t * 1.3) * 25, r * spacing, 0, Math.PI * 2);
  ctx.stroke();
}`;
  }

  // 2. Bioluminescent Jellyfish
  if (slug === 'bioluminescent-jellyfish') {
    return `// Bioluminescent Jellyfish (${category})
ctx.fillStyle = '#020307';
ctx.fillRect(0, 0, width, height);

const cx = width * 0.5;
const cy = height * 0.42 + Math.sin(time * 1.4) * 12;
const baseR = Math.min(width, height) * 0.23;
const pulse = 1 + 0.22 * Math.sin(time * 2.8);

ctx.save();
ctx.translate(cx, cy);
ctx.globalCompositeOperation = 'screen';

// 36 Concentric Volumetric Bell Ribbons
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
  const hue = (185 + normR * 35 + time * 15) % 360;
  ctx.strokeStyle = 'hsla(' + hue + ', 95%, 70%, ' + (0.08 + normR * 0.35) + ')';
  ctx.lineWidth = normR > 0.85 ? 1.8 : 0.8;
  ctx.stroke();
}

// Trailing Silk Tentacles
for (let k = 0; k < 48; k++) {
  const phi = (k / 47) * Math.PI;
  const rx = Math.cos(phi) * (baseR * 1.18 / pulse);
  const ry = 0;

  ctx.beginPath();
  ctx.moveTo(rx, ry);
  for (let n = 1; n <= 28; n++) {
    const nn = n / 28;
    const dist = nn * 200;
    const wave = Math.sin(time * 3.5 - nn * 8 + k * 0.4) * (24 * nn);
    ctx.lineTo(rx + wave, ry + dist);
  }
  const hue = (170 + k * 4 + time * 20) % 360;
  ctx.strokeStyle = 'hsla(' + hue + ', 95%, 75%, 0.4)';
  ctx.lineWidth = 0.9;
  ctx.stroke();
}
ctx.restore();`;
  }

  // 3. Manta Ray Glide
  if (slug === 'manta-ray-glide') {
    return `// Manta Ray Glide (${category})
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

  const hue = (200 + normR * 30 + time * 10) % 360;
  ctx.strokeStyle = 'hsla(' + hue + ', 95%, 68%, ' + (0.08 + normR * 0.35) + ')';
  ctx.lineWidth = normR > 0.88 ? 1.8 : 0.8;
  ctx.stroke();
}

// Whiplike Caudal Tail
ctx.beginPath();
ctx.moveTo(0, 65);
for (let n = 1; n <= 40; n++) {
  const nn = n / 40;
  const tx = Math.sin(time * 3.2 - nn * 5) * (24 * nn);
  ctx.lineTo(tx, 65 + nn * 180);
}
ctx.strokeStyle = 'hsla(215, 95%, 80%, 0.85)';
ctx.lineWidth = 1.6;
ctx.stroke();

ctx.restore();`;
  }

  // 4. Nautilus Shell Spiral
  if (slug === 'nautilus-spiral') {
    return `// Nautilus Shell Spiral (${category})
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

// 28 Concentric Equiangular Spiral Streamlines
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
  const hue = (25 + normS * 35 + time * 10) % 360;
  ctx.strokeStyle = 'hsla(' + hue + ', 95%, 72%, ' + (0.08 + normS * 0.32) + ')';
  ctx.lineWidth = normS > 0.88 ? 1.6 : 0.8;
  ctx.stroke();
}

// Septa Chambers
for (let c = 1; c <= 20; c++) {
  const thetaC = (c / 20) * maxTheta;
  const rOuter = (scale * 0.035 * 1.15) * Math.exp(b * thetaC);
  const rInner = (scale * 0.035 * 1.15) * Math.exp(b * (thetaC - Math.PI * 2));
  
  ctx.beginPath();
  ctx.moveTo(Math.max(0, rInner) * Math.cos(thetaC - Math.PI * 2), Math.max(0, rInner) * Math.sin(thetaC - Math.PI * 2));
  ctx.lineTo(rOuter * Math.cos(thetaC), rOuter * Math.sin(thetaC));
  ctx.strokeStyle = 'rgba(56, 189, 248, 0.5)';
  ctx.lineWidth = 1.2;
  ctx.stroke();
}
ctx.restore();`;
  }

  // 5. Deep Sea Anglerfish
  if (slug === 'deep-sea-anglerfish') {
    return `// Deep Sea Anglerfish (${category})
ctx.fillStyle = '#020306';
ctx.fillRect(0, 0, width, height);

const cx = width * 0.48;
const cy = height * 0.52;
const scale = Math.min(width, height) / 500;
const t = time * 1.2;

ctx.save();
ctx.translate(cx, cy);

// Melanocetus Dark Body
ctx.beginPath();
ctx.ellipse(-20 * scale, 0, 80 * scale, 65 * scale, -0.1, 0, Math.PI * 2);
ctx.fillStyle = '#0a0d18';
ctx.fill();
ctx.strokeStyle = '#38bdf8';
ctx.lineWidth = 2.0;
ctx.stroke();

// Needle Fangs
for (let i = 0; i < 14; i++) {
  const normI = i / 13;
  const tx = (15 + normI * 55) * scale;
  const ty = (-30 + normI * 16) * scale;
  ctx.beginPath();
  ctx.moveTo(tx, ty);
  ctx.lineTo(tx + 2, ty + 16 * scale);
  ctx.strokeStyle = '#f0f9ff';
  ctx.lineWidth = 1.4;
  ctx.stroke();
}

// Glowing Illicium Lure
const escaX = (90 + Math.sin(t * 2.5) * 22) * scale;
const escaY = (-100 + Math.cos(t * 2.0) * 16) * scale;

ctx.beginPath();
ctx.moveTo(14 * scale, -50 * scale);
ctx.quadraticCurveTo(20 * scale, -115 * scale, escaX, escaY);
ctx.strokeStyle = '#38bdf8';
ctx.lineWidth = 2.2;
ctx.stroke();

// Photophore Glow
const grad = ctx.createRadialGradient(escaX, escaY, 2, escaX, escaY, 32 * scale);
grad.addColorStop(0, 'rgba(56, 189, 248, 0.95)');
grad.addColorStop(0.4, 'rgba(56, 189, 248, 0.4)');
grad.addColorStop(1, 'rgba(56, 189, 248, 0)');
ctx.fillStyle = grad;
ctx.beginPath();
ctx.arc(escaX, escaY, 32 * scale, 0, Math.PI * 2);
ctx.fill();

ctx.restore();`;
  }

  // 6. Fourier Harmonics
  if (slug === 'fourier-harmonics') {
    return `// Fourier Harmonics (${category})
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
  
  // Fourier harmonic superposition: 1/1 sin(θ) + 1/3 sin(3θ) + 1/5 sin(5θ)...
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
ctx.stroke();`;
  }

  // 7. Atmospheric Tornado
  if (slug === 'atmospheric-tornado') {
    return `// Atmospheric Tornado (${category})
ctx.fillStyle = 'rgba(3, 4, 8, 0.2)';
ctx.fillRect(0, 0, width, height);

const cx = width * 0.5;
const t = time * 2.5;
const rings = 45;

for (let r = 0; r < rings; r++) {
  const normY = r / (rings - 1);
  const cy = height * (0.15 + normY * 0.75);
  // Funnel radius expands at top
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

  const hue = (195 + normY * 60) % 360;
  ctx.strokeStyle = 'hsla(' + hue + ', 85%, 65%, ' + (0.15 + (1 - normY) * 0.4) + ')';
  ctx.lineWidth = 1.4;
  ctx.stroke();
}`;
  }

  // 8. Superformula Bloom / Organic Wave / General Category Fallback
  return `// ${title} (${category})
// Parametric Formula Art Generation

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
  
  // Superformula / Harmonic modulation
  const m = 6; // symmetry
  const n1 = 0.5, n2 = 1.7, n3 = 1.7;
  const a = 1.0, b = 1.0;
  
  const t1 = Math.pow(Math.abs(Math.cos(m * phi / 4) / a), n2);
  const t2 = Math.pow(Math.abs(Math.sin(m * phi / 4) / b), n3);
  const rForm = Math.pow(t1 + t2, -1 / n1);
  
  const pulse = 1 + 0.2 * Math.sin(phi * 4 + t * 2);
  const r = Math.min(maxR * 1.1, maxR * rForm * 0.5 * pulse);

  const px = cx + Math.cos(phi) * r;
  const py = cy + Math.sin(phi) * r;

  if (i === 0) ctx.moveTo(px, py);
  else ctx.lineTo(px, py);
}
ctx.closePath();

const hue = (time * 30 + 195) % 360;
ctx.strokeStyle = 'hsla(' + hue + ', 95%, 68%, 0.85)';
ctx.lineWidth = 2.2;
ctx.stroke();`;
}
