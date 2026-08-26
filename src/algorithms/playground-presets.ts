// Auto-generated 1:1 Complete Standalone Executable Canvas 2D Recipes for all 78 Math Art Presets
// Exactly matching the rendering algorithms from src/algorithms/

export const presetCatalogMap: Record<string, string> = {
  // 001. Organic Wave
  'organic-wave': `// 001 - Organic Wave (organic)
// 1:1 Original algorithm engine source
function createOrganicWave() {
  let gridPointsX = 0;
  let gridPointsY = 0;
  const spacing = 14;
  return {
    setup(context) {
      gridPointsX = Math.ceil(context.width / spacing) + 2;
      gridPointsY = Math.ceil(context.height / spacing) + 2;
    },
    render(context, timeState, params) {
      const { ctx, width, height } = context;
      const t = timeState.time * Number(params.speed || 1);
      const freq = Number(params.frequency || 0.02);
      const amp = Number(params.amplitude || 35);
      const hueBase = Number(params.hue || 195);
      ctx.fillStyle = "rgba(8, 9, 13, 0.25)";
      ctx.fillRect(0, 0, width, height);
      const cx = width * 0.5;
      const cy = height * 0.5;
      for (let y = 0; y < gridPointsY; y++) {
        const py = (y - 1) * spacing;
        ctx.beginPath();
        for (let x = 0; x < gridPointsX; x++) {
          const px = (x - 1) * spacing;
          const dx = px - cx;
          const dy = py - cy;
          const d = Math.sqrt(dx * dx + dy * dy);
          const wave1 = Math.sin(px * freq + t) * Math.cos(py * freq * 0.7 + t * 0.5);
          const wave2 = Math.sin(d * freq * 1.5 - t * 2) * 0.5;
          const offset = (wave1 + wave2) * amp;
          const renderX = px + dx / (d + 1) * offset * 0.3;
          const renderY = py + offset;
          if (x === 0) {
            ctx.moveTo(renderX, renderY);
          } else {
            ctx.lineTo(renderX, renderY);
          }
        }
        const normY = y / gridPointsY;
        const hue = (hueBase + normY * 60 + Math.sin(t) * 20) % 360;
        ctx.strokeStyle = hsla(hue, 85, 60, 0.5);
        ctx.lineWidth = 1.2;
        ctx.stroke();
      }
    }
  };
}

// Default parameters from content metadata
const defaultParams = [
  {
    "key": "frequency",
    "label": "Spatial Frequency",
    "type": "range",
    "min": 0.005,
    "max": 0.05,
    "step": 0.001,
    "defaultValue": 0.02,
    "description": "Controls wavelength spacing"
  },
  {
    "key": "amplitude",
    "label": "Wave Amplitude",
    "type": "range",
    "min": 10,
    "max": 80,
    "step": 1,
    "defaultValue": 35,
    "description": "Height of the crests"
  },
  {
    "key": "speed",
    "label": "Oscillation Speed",
    "type": "range",
    "min": 0.2,
    "max": 3,
    "step": 0.1,
    "defaultValue": 1,
    "description": "Temporal propagation rate"
  },
  {
    "key": "hue",
    "label": "Base Hue",
    "type": "range",
    "min": 0,
    "max": 360,
    "step": 1,
    "defaultValue": 195,
    "description": "Base color spectrum"
  }
];

if (!window.__art_instances) window.__art_instances = {};
if (!window.__art_instances['organic-wave']) {
  const inst = typeof createOrganicWave === 'function' ? createOrganicWave() : null;
  if (inst && inst.setup) {
    inst.setup({ ctx, width, height, dpr: 1, aspectRatio: width / height }, defaultParams);
  }
  window.__art_instances['organic-wave'] = inst;
}

const instance = window.__art_instances['organic-wave'];
if (instance && instance.render) {
  instance.render(
    { ctx, width, height, dpr: 1, aspectRatio: width / height },
    { time, deltaTime: dt, frameCount: Math.floor(time * 60), fps: 60 },
    defaultParams
  );
}`,

  // 002. Phyllotaxis Spiral
  'phyllotaxis-spiral': `// 002 - Phyllotaxis Spiral (organic)
// 1:1 Original algorithm engine source
function createPhyllotaxisSpiral() {
  return {
    setup() {
    },
    render(context, timeState, params) {
      const { ctx, width, height } = context;
      const count = Number(params.pointCount || 1200);
      const c = Number(params.scaleFactor || 6);
      const speed = Number(params.rotationSpeed || 0.5);
      const divergence = Number(params.divergenceAngle || 137.508) * (Math.PI / 180);
      ctx.fillStyle = "#08090d";
      ctx.fillRect(0, 0, width, height);
      const cx = width * 0.5;
      const cy = height * 0.5;
      const t = timeState.time * speed;
      for (let n = 0; n < count; n++) {
        const theta = n * divergence + t * (1 + n * 2e-4);
        const r = c * Math.sqrt(n) * (1 + 0.05 * Math.sin(t * 2 + n * 0.02));
        const x = cx + r * Math.cos(theta);
        const y = cy + r * Math.sin(theta);
        if (x < -20 || x > width + 20 || y < -20 || y > height + 20) continue;
        const size = Math.max(1, r / (width * 0.5) * 4 + 1.2);
        const hue = (n * 0.35 + t * 40) % 360;
        ctx.fillStyle = hsla(hue, 90, 65, 0.85);
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  };
}

// Default parameters from content metadata
const defaultParams = [
  {
    "key": "divergenceAngle",
    "label": "Divergence Angle (°)",
    "type": "range",
    "min": 137,
    "max": 138,
    "step": 0.001,
    "defaultValue": 137.508,
    "description": "Golden ratio packing angle"
  },
  {
    "key": "scaleFactor",
    "label": "Scale Factor (c)",
    "type": "range",
    "min": 2,
    "max": 12,
    "step": 0.2,
    "defaultValue": 6,
    "description": "Radial distribution density"
  },
  {
    "key": "rotationSpeed",
    "label": "Rotation Speed",
    "type": "range",
    "min": 0.1,
    "max": 2,
    "step": 0.05,
    "defaultValue": 0.5,
    "description": "Temporal rotation multiplier"
  },
  {
    "key": "pointCount",
    "label": "Seed Count",
    "type": "range",
    "min": 300,
    "max": 2400,
    "step": 50,
    "defaultValue": 1200,
    "description": "Total seed floret points"
  }
];

if (!window.__art_instances) window.__art_instances = {};
if (!window.__art_instances['phyllotaxis-spiral']) {
  const inst = typeof createPhyllotaxisSpiral === 'function' ? createPhyllotaxisSpiral() : null;
  if (inst && inst.setup) {
    inst.setup({ ctx, width, height, dpr: 1, aspectRatio: width / height }, defaultParams);
  }
  window.__art_instances['phyllotaxis-spiral'] = inst;
}

const instance = window.__art_instances['phyllotaxis-spiral'];
if (instance && instance.render) {
  instance.render(
    { ctx, width, height, dpr: 1, aspectRatio: width / height },
    { time, deltaTime: dt, frameCount: Math.floor(time * 60), fps: 60 },
    defaultParams
  );
}`,

  // 003. Superformula Bloom
  'superformula-bloom': `// 003 - Superformula Bloom (organic)
// 1:1 Original algorithm engine source
function createSuperformulaBloom() {
  return {
    setup() {
    },
    render(context, timeState, params) {
      const { ctx, width, height } = context;
      const t = timeState.time * Number(params.speed || 0.8);
      const m = Number(params.symmetry || 6) + Math.sin(t * 0.5) * 2;
      const n1 = Number(params.form1 || 0.3) + Math.sin(t * 0.8) * 0.15;
      const n2 = Number(params.form2 || 1.7) + Math.cos(t * 0.6) * 0.5;
      const n3 = Number(params.form3 || 1.7) + Math.sin(t * 0.7) * 0.5;
      const a = 1;
      const b = 1;
      ctx.fillStyle = "rgba(8, 9, 13, 0.2)";
      ctx.fillRect(0, 0, width, height);
      const cx = width * 0.5;
      const cy = height * 0.5;
      const scale = Math.min(width, height) * 0.32;
      const steps = 720;
      for (let layer = 0; layer < 4; layer++) {
        const layerScale = scale * (1 - layer * 0.22);
        const layerOffset = layer * 0.4 + t * 0.3;
        ctx.beginPath();
        for (let i = 0; i <= steps; i++) {
          const phi = i / steps * Math.PI * 2;
          const part1 = Math.pow(Math.abs(Math.cos(m * phi / 4) / a), n2);
          const part2 = Math.pow(Math.abs(Math.sin(m * phi / 4) / b), n3);
          const r = Math.pow(part1 + part2, -1 / n1);
          const px = cx + r * layerScale * Math.cos(phi + layerOffset);
          const py = cy + r * layerScale * Math.sin(phi + layerOffset);
          if (i === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        ctx.closePath();
        const hue = (layer * 50 + t * 30 + 300) % 360;
        ctx.strokeStyle = hsla(hue, 85, 65, 0.7);
        ctx.lineWidth = 2 - layer * 0.3;
        ctx.stroke();
      }
    }
  };
}

// Default parameters from content metadata
const defaultParams = [
  {
    "key": "symmetry",
    "label": "Rotational Symmetry (m)",
    "type": "range",
    "min": 2,
    "max": 16,
    "step": 1,
    "defaultValue": 6,
    "description": "Number of morphological petals"
  },
  {
    "key": "form1",
    "label": "Curvature Exponent (n1)",
    "type": "range",
    "min": 0.1,
    "max": 1,
    "step": 0.05,
    "defaultValue": 0.3,
    "description": "Overall boundary sharpness"
  },
  {
    "key": "speed",
    "label": "Morph Speed",
    "type": "range",
    "min": 0.2,
    "max": 2,
    "step": 0.1,
    "defaultValue": 0.8,
    "description": "Rate of dimensional oscillation"
  }
];

if (!window.__art_instances) window.__art_instances = {};
if (!window.__art_instances['superformula-bloom']) {
  const inst = typeof createSuperformulaBloom === 'function' ? createSuperformulaBloom() : null;
  if (inst && inst.setup) {
    inst.setup({ ctx, width, height, dpr: 1, aspectRatio: width / height }, defaultParams);
  }
  window.__art_instances['superformula-bloom'] = inst;
}

const instance = window.__art_instances['superformula-bloom'];
if (instance && instance.render) {
  instance.render(
    { ctx, width, height, dpr: 1, aspectRatio: width / height },
    { time, deltaTime: dt, frameCount: Math.floor(time * 60), fps: 60 },
    defaultParams
  );
}`,

  // 004. Perlin Tendrils
  'perlin-tendrils': `// 004 - Perlin Tendrils (organic)
// 1:1 Original algorithm engine source
function createPerlinTendrils() {
  const MAX_PARTICLES = 1500;
  const posX = new Float32Array(MAX_PARTICLES);
  const posY = new Float32Array(MAX_PARTICLES);
  const life = new Float32Array(MAX_PARTICLES);
  const maxLife = new Float32Array(MAX_PARTICLES);
  return {
    setup(context) {
      for (let i = 0; i < MAX_PARTICLES; i++) {
        posX[i] = Math.random() * context.width;
        posY[i] = Math.random() * context.height;
        life[i] = Math.random() * 200;
        maxLife[i] = 100 + Math.random() * 200;
      }
    },
    render(context, timeState, params) {
      const { ctx, width, height } = context;
      const count = Math.min(MAX_PARTICLES, Number(params.particleCount || 1e3));
      const speed = Number(params.speed || 1.5);
      const noiseScale = Number(params.noiseScale || 3e-3);
      const t = timeState.time * 0.15;
      ctx.fillStyle = "rgba(8, 9, 13, 0.08)";
      ctx.fillRect(0, 0, width, height);
      for (let i = 0; i < count; i++) {
        const angle = fbm2D(posX[i] * noiseScale, posY[i] * noiseScale + t) * Math.PI * 4;
        const prevX = posX[i];
        const prevY = posY[i];
        posX[i] += Math.cos(angle) * speed;
        posY[i] += Math.sin(angle) * speed;
        life[i]++;
        if (life[i] > maxLife[i] || posX[i] < 0 || posX[i] > width || posY[i] < 0 || posY[i] > height) {
          posX[i] = Math.random() * width;
          posY[i] = Math.random() * height;
          life[i] = 0;
          continue;
        }
        const progress = life[i] / maxLife[i];
        const alpha = Math.sin(progress * Math.PI) * 0.6;
        const hue = (160 + angle * 25 + timeState.time * 10) % 360;
        ctx.beginPath();
        ctx.moveTo(prevX, prevY);
        ctx.lineTo(posX[i], posY[i]);
        ctx.strokeStyle = hsla(hue, 80, 60, alpha);
        ctx.lineWidth = 1.2;
        ctx.stroke();
      }
    }
  };
}

// Default parameters from content metadata
const defaultParams = [
  {
    "key": "particleCount",
    "label": "Tendril Particles",
    "type": "range",
    "min": 200,
    "max": 1500,
    "step": 50,
    "defaultValue": 1000,
    "description": "Total tracer filaments"
  },
  {
    "key": "noiseScale",
    "label": "Noise Zoom Scale",
    "type": "range",
    "min": 0.001,
    "max": 0.008,
    "step": 0.0005,
    "defaultValue": 0.003,
    "description": "Curvature granularity"
  },
  {
    "key": "speed",
    "label": "Advection Speed",
    "type": "range",
    "min": 0.5,
    "max": 4,
    "step": 0.1,
    "defaultValue": 1.5,
    "description": "Velocity along vector lines"
  }
];

if (!window.__art_instances) window.__art_instances = {};
if (!window.__art_instances['perlin-tendrils']) {
  const inst = typeof createPerlinTendrils === 'function' ? createPerlinTendrils() : null;
  if (inst && inst.setup) {
    inst.setup({ ctx, width, height, dpr: 1, aspectRatio: width / height }, defaultParams);
  }
  window.__art_instances['perlin-tendrils'] = inst;
}

const instance = window.__art_instances['perlin-tendrils'];
if (instance && instance.render) {
  instance.render(
    { ctx, width, height, dpr: 1, aspectRatio: width / height },
    { time, deltaTime: dt, frameCount: Math.floor(time * 60), fps: 60 },
    defaultParams
  );
}`,

  // 005. Vortex Filament Drift
  'vortex-filament': `// 005 - Vortex Filament Drift (fluid)
// 1:1 Original algorithm engine source
function createVortexFilament() {
  const MAX_PARTICLES = 2e3;
  const px = new Float32Array(MAX_PARTICLES);
  const py = new Float32Array(MAX_PARTICLES);
  const vortexX = new Float32Array(4);
  const vortexY = new Float32Array(4);
  const vortexGamma = new Float32Array([120, -140, 100, -110]);
  return {
    setup(context) {
      for (let i = 0; i < MAX_PARTICLES; i++) {
        px[i] = Math.random() * context.width;
        py[i] = Math.random() * context.height;
      }
    },
    render(context, timeState, params) {
      const { ctx, width, height } = context;
      const count = Math.min(MAX_PARTICLES, Number(params.particleCount || 1600));
      const coreR = Number(params.coreRadius || 20);
      const coreRSq = coreR * coreR;
      const t = timeState.time * 0.8;
      ctx.fillStyle = "rgba(8, 9, 13, 0.18)";
      ctx.fillRect(0, 0, width, height);
      const cx = width * 0.5;
      const cy = height * 0.5;
      const rOrb = Math.min(width, height) * 0.25;
      vortexX[0] = cx + Math.cos(t) * rOrb;
      vortexY[0] = cy + Math.sin(t) * rOrb;
      vortexX[1] = cx + Math.cos(t + Math.PI) * rOrb;
      vortexY[1] = cy + Math.sin(t + Math.PI) * rOrb;
      vortexX[2] = cx + Math.cos(-t * 1.3 + 1.2) * (rOrb * 0.6);
      vortexY[2] = cy + Math.sin(-t * 1.3 + 1.2) * (rOrb * 0.6);
      vortexX[3] = cx + Math.cos(-t * 1.3 - 1.2) * (rOrb * 0.6);
      vortexY[3] = cy + Math.sin(-t * 1.3 - 1.2) * (rOrb * 0.6);
      ctx.lineWidth = 1.1;
      for (let i = 0; i < count; i++) {
        let vx = 0;
        let vy = 0;
        for (let v = 0; v < 4; v++) {
          const dx = px[i] - vortexX[v];
          const dy = py[i] - vortexY[v];
          const dSq = dx * dx + dy * dy;
          const factor = vortexGamma[v] / (2 * Math.PI * (dSq + coreRSq)) * 12;
          vx += -dy * factor;
          vy += dx * factor;
        }
        const oldX = px[i];
        const oldY = py[i];
        px[i] += vx;
        py[i] += vy;
        if (px[i] < 0) px[i] += width;
        if (px[i] > width) px[i] -= width;
        if (py[i] < 0) py[i] += height;
        if (py[i] > height) py[i] -= height;
        const speed = Math.sqrt(vx * vx + vy * vy);
        const hue = (180 + speed * 15 + t * 20) % 360;
        ctx.strokeStyle = hsla(hue, 90, 60, Math.min(0.85, speed * 0.3 + 0.2));
        ctx.beginPath();
        ctx.moveTo(oldX, oldY);
        ctx.lineTo(px[i], py[i]);
        ctx.stroke();
      }
    }
  };
}

// Default parameters from content metadata
const defaultParams = [
  {
    "key": "particleCount",
    "label": "Tracer Count",
    "type": "range",
    "min": 500,
    "max": 2000,
    "step": 100,
    "defaultValue": 1600,
    "description": "Number of fluid tracers"
  },
  {
    "key": "coreRadius",
    "label": "Vortex Core Radius (rc)",
    "type": "range",
    "min": 5,
    "max": 40,
    "step": 1,
    "defaultValue": 20,
    "description": "Vortex core smoothing width"
  }
];

if (!window.__art_instances) window.__art_instances = {};
if (!window.__art_instances['vortex-filament']) {
  const inst = typeof createVortexFilament === 'function' ? createVortexFilament() : null;
  if (inst && inst.setup) {
    inst.setup({ ctx, width, height, dpr: 1, aspectRatio: width / height }, defaultParams);
  }
  window.__art_instances['vortex-filament'] = inst;
}

const instance = window.__art_instances['vortex-filament'];
if (instance && instance.render) {
  instance.render(
    { ctx, width, height, dpr: 1, aspectRatio: width / height },
    { time, deltaTime: dt, frameCount: Math.floor(time * 60), fps: 60 },
    defaultParams
  );
}`,

  // 006. Curl Vector Field
  'curl-vector-field': `// 006 - Curl Vector Field (fluid)
// 1:1 Original algorithm engine source
function createCurlVectorField() {
  const MAX_PARTICLES = 1800;
  const px = new Float32Array(MAX_PARTICLES);
  const py = new Float32Array(MAX_PARTICLES);
  const eps = 0.01;
  return {
    setup(context) {
      for (let i = 0; i < MAX_PARTICLES; i++) {
        px[i] = Math.random() * context.width;
        py[i] = Math.random() * context.height;
      }
    },
    render(context, timeState, params) {
      const { ctx, width, height } = context;
      const count = Math.min(MAX_PARTICLES, Number(params.particleCount || 1200));
      const scale = Number(params.fieldScale || 35e-4);
      const speed = Number(params.speed || 2.2);
      const t = timeState.time * 0.12;
      ctx.fillStyle = "rgba(8, 9, 13, 0.12)";
      ctx.fillRect(0, 0, width, height);
      for (let i = 0; i < count; i++) {
        const nx = px[i] * scale;
        const ny = py[i] * scale;
        const n1 = noise2D(nx, ny + eps + t);
        const n2 = noise2D(nx, ny - eps + t);
        const vx = (n1 - n2) / (2 * eps);
        const n3 = noise2D(nx + eps, ny + t);
        const n4 = noise2D(nx - eps, ny + t);
        const vy = -(n3 - n4) / (2 * eps);
        const prevX = px[i];
        const prevY = py[i];
        px[i] += vx * speed * 8;
        py[i] += vy * speed * 8;
        if (px[i] < 0) px[i] += width;
        if (px[i] > width) px[i] -= width;
        if (py[i] < 0) py[i] += height;
        if (py[i] > height) py[i] -= height;
        const velMag = Math.sqrt(vx * vx + vy * vy);
        const hue = (210 + velMag * 120 + t * 40) % 360;
        ctx.strokeStyle = hsla(hue, 85, 62, 0.6);
        ctx.lineWidth = 1.3;
        ctx.beginPath();
        ctx.moveTo(prevX, prevY);
        ctx.lineTo(px[i], py[i]);
        ctx.stroke();
      }
    }
  };
}

// Default parameters from content metadata
const defaultParams = [
  {
    "key": "particleCount",
    "label": "Streamline Particles",
    "type": "range",
    "min": 400,
    "max": 1800,
    "step": 100,
    "defaultValue": 1200,
    "description": "Particle density"
  },
  {
    "key": "speed",
    "label": "Flow Velocity",
    "type": "range",
    "min": 0.5,
    "max": 5,
    "step": 0.1,
    "defaultValue": 2.2,
    "description": "Particle advection speed"
  },
  {
    "key": "fieldScale",
    "label": "Field Scale",
    "type": "range",
    "min": 0.001,
    "max": 0.008,
    "step": 0.0005,
    "defaultValue": 0.0035,
    "description": "Vorticity wave scale"
  }
];

if (!window.__art_instances) window.__art_instances = {};
if (!window.__art_instances['curl-vector-field']) {
  const inst = typeof createCurlVectorField === 'function' ? createCurlVectorField() : null;
  if (inst && inst.setup) {
    inst.setup({ ctx, width, height, dpr: 1, aspectRatio: width / height }, defaultParams);
  }
  window.__art_instances['curl-vector-field'] = inst;
}

const instance = window.__art_instances['curl-vector-field'];
if (instance && instance.render) {
  instance.render(
    { ctx, width, height, dpr: 1, aspectRatio: width / height },
    { time, deltaTime: dt, frameCount: Math.floor(time * 60), fps: 60 },
    defaultParams
  );
}`,

  // 007. Smoke Lattice Drift
  'smoke-lattice': `// 007 - Smoke Lattice Drift (fluid)
// 1:1 Original algorithm engine source
function createSmokeLattice() {
  const GRID_SIZE = 40;
  const density = new Float32Array(GRID_SIZE * GRID_SIZE);
  return {
    setup() {
      density.fill(0);
    },
    render(context, timeState, params) {
      const { ctx, width, height } = context;
      const t = timeState.time * Number(params.speed || 1);
      const cellW = width / GRID_SIZE;
      const cellH = height / GRID_SIZE;
      ctx.fillStyle = "#08090d";
      ctx.fillRect(0, 0, width, height);
      const cx = GRID_SIZE / 2;
      const cy = GRID_SIZE / 2;
      for (let y = 1; y < GRID_SIZE - 1; y++) {
        for (let x = 1; x < GRID_SIZE - 1; x++) {
          const idx = y * GRID_SIZE + x;
          const dx = x - cx;
          const dy = y - cy;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const injection = Math.sin(dist * 0.4 - t * 3) * Math.cos(Math.atan2(dy, dx) * 4 + t * 2) * Math.exp(-dist * 0.1);
          density[idx] = Math.max(0, Math.min(1, density[idx] * 0.94 + injection * 0.15));
          if (density[idx] > 0.02) {
            const px = x * cellW;
            const py = y * cellH;
            const alpha = density[idx];
            const hue = (240 + alpha * 100 + t * 20) % 360;
            ctx.fillStyle = hsla(hue, 80, 60, alpha * 0.8);
            ctx.beginPath();
            ctx.arc(px + cellW * 0.5, py + cellH * 0.5, cellW * 0.7 * alpha, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }
    }
  };
}

// Default parameters from content metadata
const defaultParams = [
  {
    "key": "speed",
    "label": "Emission Speed",
    "type": "range",
    "min": 0.3,
    "max": 3,
    "step": 0.1,
    "defaultValue": 1,
    "description": "Turbulence oscillation rate"
  }
];

if (!window.__art_instances) window.__art_instances = {};
if (!window.__art_instances['smoke-lattice']) {
  const inst = typeof createSmokeLattice === 'function' ? createSmokeLattice() : null;
  if (inst && inst.setup) {
    inst.setup({ ctx, width, height, dpr: 1, aspectRatio: width / height }, defaultParams);
  }
  window.__art_instances['smoke-lattice'] = inst;
}

const instance = window.__art_instances['smoke-lattice'];
if (instance && instance.render) {
  instance.render(
    { ctx, width, height, dpr: 1, aspectRatio: width / height },
    { time, deltaTime: dt, frameCount: Math.floor(time * 60), fps: 60 },
    defaultParams
  );
}`,

  // 008. Viscous Gyre
  'viscous-gyre': `// 008 - Viscous Gyre (fluid)
// 1:1 Original algorithm engine source
function createViscousGyre() {
  const MAX_PARTICLES = 1600;
  const px = new Float32Array(MAX_PARTICLES);
  const py = new Float32Array(MAX_PARTICLES);
  return {
    setup() {
      for (let i = 0; i < MAX_PARTICLES; i++) {
        px[i] = Math.random();
        py[i] = Math.random();
      }
    },
    render(context, timeState, params) {
      const { ctx, width, height } = context;
      const count = Math.min(MAX_PARTICLES, Number(params.particleCount || 1200));
      const speed = Number(params.speed || 5e-3);
      const t = timeState.time * 0.5;
      ctx.fillStyle = "rgba(8, 9, 13, 0.15)";
      ctx.fillRect(0, 0, width, height);
      for (let i = 0; i < count; i++) {
        const x = px[i];
        const y = py[i];
        const u = 2 * Math.PI * Math.sin(Math.PI * x) * Math.cos(2 * Math.PI * y + Math.sin(t) * 0.4);
        const v = -Math.PI * Math.cos(Math.PI * x) * Math.sin(2 * Math.PI * y + Math.sin(t) * 0.4);
        const prevPx = px[i] * width;
        const prevPy = py[i] * height;
        px[i] += u * speed;
        py[i] += v * speed;
        if (px[i] < 0 || px[i] > 1 || py[i] < 0 || py[i] > 1) {
          px[i] = Math.random();
          py[i] = Math.random();
          continue;
        }
        const currPx = px[i] * width;
        const currPy = py[i] * height;
        const velMag = Math.sqrt(u * u + v * v);
        const hue = (160 + velMag * 15 + t * 20) % 360;
        ctx.strokeStyle = hsla(hue, 90, 60, Math.min(0.9, velMag * 0.15 + 0.3));
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.moveTo(prevPx, prevPy);
        ctx.lineTo(currPx, currPy);
        ctx.stroke();
      }
    }
  };
}

// Default parameters from content metadata
const defaultParams = [
  {
    "key": "particleCount",
    "label": "Current Tracers",
    "type": "range",
    "min": 400,
    "max": 1600,
    "step": 100,
    "defaultValue": 1200,
    "description": "Particle count"
  },
  {
    "key": "speed",
    "label": "Circulation Velocity",
    "type": "range",
    "min": 0.001,
    "max": 0.015,
    "step": 0.001,
    "defaultValue": 0.005,
    "description": "Advection timestep"
  }
];

if (!window.__art_instances) window.__art_instances = {};
if (!window.__art_instances['viscous-gyre']) {
  const inst = typeof createViscousGyre === 'function' ? createViscousGyre() : null;
  if (inst && inst.setup) {
    inst.setup({ ctx, width, height, dpr: 1, aspectRatio: width / height }, defaultParams);
  }
  window.__art_instances['viscous-gyre'] = inst;
}

const instance = window.__art_instances['viscous-gyre'];
if (instance && instance.render) {
  instance.render(
    { ctx, width, height, dpr: 1, aspectRatio: width / height },
    { time, deltaTime: dt, frameCount: Math.floor(time * 60), fps: 60 },
    defaultParams
  );
}`,

  // 009. Gravitational Swarm
  'gravitational-swarm': `// 009 - Gravitational Swarm (particles)
// 1:1 Original algorithm engine source
function createGravitationalSwarm() {
  const MAX_PARTICLES = 2e3;
  const px = new Float32Array(MAX_PARTICLES);
  const py = new Float32Array(MAX_PARTICLES);
  const vx = new Float32Array(MAX_PARTICLES);
  const vy = new Float32Array(MAX_PARTICLES);
  return {
    setup(context) {
      const cx = context.width * 0.5;
      const cy = context.height * 0.5;
      for (let i = 0; i < MAX_PARTICLES; i++) {
        const angle = Math.random() * Math.PI * 2;
        const r = 50 + Math.random() * (context.width * 0.35);
        px[i] = cx + Math.cos(angle) * r;
        py[i] = cy + Math.sin(angle) * r;
        const vMag = Math.sqrt(800 / r);
        vx[i] = -Math.sin(angle) * vMag;
        vy[i] = Math.cos(angle) * vMag;
      }
    },
    render(context, timeState, params) {
      const { ctx, width, height } = context;
      const count = Math.min(MAX_PARTICLES, Number(params.particleCount || 1500));
      const G = Number(params.gravity || 900);
      const damping = 0.999;
      const t = timeState.time;
      ctx.fillStyle = "rgba(8, 9, 13, 0.15)";
      ctx.fillRect(0, 0, width, height);
      const cx1 = width * 0.5 + Math.cos(t * 0.7) * (width * 0.15);
      const cy1 = height * 0.5 + Math.sin(t * 0.7) * (height * 0.15);
      const cx2 = width * 0.5 - Math.cos(t * 0.7) * (width * 0.15);
      const cy2 = height * 0.5 - Math.sin(t * 0.7) * (height * 0.15);
      for (let i = 0; i < count; i++) {
        const dx1 = cx1 - px[i];
        const dy1 = cy1 - py[i];
        const d1Sq = dx1 * dx1 + dy1 * dy1 + 400;
        const f1 = G / (d1Sq * Math.sqrt(d1Sq));
        vx[i] += dx1 * f1;
        vy[i] += dy1 * f1;
        const dx2 = cx2 - px[i];
        const dy2 = cy2 - py[i];
        const d2Sq = dx2 * dx2 + dy2 * dy2 + 400;
        const f2 = G / (d2Sq * Math.sqrt(d2Sq));
        vx[i] += dx2 * f2;
        vy[i] += dy2 * f2;
        vx[i] *= damping;
        vy[i] *= damping;
        const oldX = px[i];
        const oldY = py[i];
        px[i] += vx[i];
        py[i] += vy[i];
        const speed = Math.sqrt(vx[i] * vx[i] + vy[i] * vy[i]);
        const hue = (200 + speed * 25 + t * 15) % 360;
        ctx.strokeStyle = hsla(hue, 90, 65, Math.min(0.9, speed * 0.2 + 0.3));
        ctx.lineWidth = Math.min(2.5, speed * 0.4 + 0.8);
        ctx.beginPath();
        ctx.moveTo(oldX, oldY);
        ctx.lineTo(px[i], py[i]);
        ctx.stroke();
      }
    }
  };
}

// Default parameters from content metadata
const defaultParams = [
  {
    "key": "particleCount",
    "label": "Orbital Stars",
    "type": "range",
    "min": 500,
    "max": 2000,
    "step": 100,
    "defaultValue": 1500,
    "description": "Number of particles"
  },
  {
    "key": "gravity",
    "label": "Gravitational Constant (G)",
    "type": "range",
    "min": 300,
    "max": 2000,
    "step": 50,
    "defaultValue": 900,
    "description": "Mass attraction intensity"
  }
];

if (!window.__art_instances) window.__art_instances = {};
if (!window.__art_instances['gravitational-swarm']) {
  const inst = typeof createGravitationalSwarm === 'function' ? createGravitationalSwarm() : null;
  if (inst && inst.setup) {
    inst.setup({ ctx, width, height, dpr: 1, aspectRatio: width / height }, defaultParams);
  }
  window.__art_instances['gravitational-swarm'] = inst;
}

const instance = window.__art_instances['gravitational-swarm'];
if (instance && instance.render) {
  instance.render(
    { ctx, width, height, dpr: 1, aspectRatio: width / height },
    { time, deltaTime: dt, frameCount: Math.floor(time * 60), fps: 60 },
    defaultParams
  );
}`,

  // 010. Lissajous Web
  'lissajous-web': `// 010 - Lissajous Web (particles)
// 1:1 Original algorithm engine source
function createLissajousWeb() {
  return {
    setup() {
    },
    render(context, timeState, params) {
      const { ctx, width, height } = context;
      const t = timeState.time * Number(params.speed || 0.6);
      const a = Number(params.freqA || 3);
      const b = Number(params.freqB || 4);
      const c = Number(params.freqC || 5);
      const delta = Number(params.phaseDelta || Math.PI / 2) + t * 0.4;
      const points = 1200;
      ctx.fillStyle = "rgba(8, 9, 13, 0.15)";
      ctx.fillRect(0, 0, width, height);
      const cx = width * 0.5;
      const cy = height * 0.5;
      const rx = width * 0.38;
      const ry = height * 0.38;
      ctx.beginPath();
      for (let i = 0; i <= points; i++) {
        const phi = i / points * Math.PI * 2;
        const lx = Math.sin(a * phi + delta);
        const ly = Math.sin(b * phi);
        const lz = Math.cos(c * phi + t);
        const rotY = lx * Math.cos(t * 0.3) - lz * Math.sin(t * 0.3);
        const rotZ = lx * Math.sin(t * 0.3) + lz * Math.cos(t * 0.3);
        const depth = (rotZ + 2) / 3;
        const px = cx + rotY * rx * depth;
        const py = cy + ly * ry * depth;
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.strokeStyle = hsla((280 + t * 30) % 360, 85, 65, 0.8);
      ctx.lineWidth = 1.8;
      ctx.stroke();
      ctx.beginPath();
      for (let i = 0; i <= points; i += 4) {
        const phi = i / points * Math.PI * 2;
        const px = cx + Math.sin(a * phi + delta) * (rx * 0.75) * Math.cos(t * 0.5);
        const py = cy + Math.sin(b * phi + t) * (ry * 0.75);
        ctx.fillStyle = hsla((i * 0.5 + t * 50) % 360, 95, 70, 0.8);
        ctx.fillRect(px - 1.5, py - 1.5, 3, 3);
      }
    }
  };
}

// Default parameters from content metadata
const defaultParams = [
  {
    "key": "freqA",
    "label": "Frequency A",
    "type": "range",
    "min": 1,
    "max": 8,
    "step": 1,
    "defaultValue": 3,
    "description": "Harmonic X ratio"
  },
  {
    "key": "freqB",
    "label": "Frequency B",
    "type": "range",
    "min": 1,
    "max": 8,
    "step": 1,
    "defaultValue": 4,
    "description": "Harmonic Y ratio"
  },
  {
    "key": "speed",
    "label": "Rotation Speed",
    "type": "range",
    "min": 0.2,
    "max": 2,
    "step": 0.1,
    "defaultValue": 0.6,
    "description": "3D perspective rotation rate"
  }
];

if (!window.__art_instances) window.__art_instances = {};
if (!window.__art_instances['lissajous-web']) {
  const inst = typeof createLissajousWeb === 'function' ? createLissajousWeb() : null;
  if (inst && inst.setup) {
    inst.setup({ ctx, width, height, dpr: 1, aspectRatio: width / height }, defaultParams);
  }
  window.__art_instances['lissajous-web'] = inst;
}

const instance = window.__art_instances['lissajous-web'];
if (instance && instance.render) {
  instance.render(
    { ctx, width, height, dpr: 1, aspectRatio: width / height },
    { time, deltaTime: dt, frameCount: Math.floor(time * 60), fps: 60 },
    defaultParams
  );
}`,

  // 011. Brownian Constellation
  'brownian-constellation': `// 011 - Brownian Constellation (particles)
// 1:1 Original algorithm engine source
function createBrownianConstellation() {
  const MAX_NODES = 160;
  const px = new Float32Array(MAX_NODES);
  const py = new Float32Array(MAX_NODES);
  const vx = new Float32Array(MAX_NODES);
  const vy = new Float32Array(MAX_NODES);
  return {
    setup(context) {
      for (let i = 0; i < MAX_NODES; i++) {
        px[i] = Math.random() * context.width;
        py[i] = Math.random() * context.height;
        vx[i] = (Math.random() - 0.5) * 1.5;
        vy[i] = (Math.random() - 0.5) * 1.5;
      }
    },
    render(context, timeState, params) {
      const { ctx, width, height } = context;
      const count = Math.min(MAX_NODES, Number(params.nodeCount || 100));
      const maxDistance = Number(params.connectionRadius || 80);
      const maxDistSq = maxDistance * maxDistance;
      const t = timeState.time;
      ctx.fillStyle = "#08090d";
      ctx.fillRect(0, 0, width, height);
      for (let i = 0; i < count; i++) {
        px[i] += vx[i];
        py[i] += vy[i];
        if (px[i] < 0 || px[i] > width) vx[i] *= -1;
        if (py[i] < 0 || py[i] > height) vy[i] *= -1;
      }
      for (let i = 0; i < count; i++) {
        for (let j = i + 1; j < count; j++) {
          const dx = px[j] - px[i];
          const dy = py[j] - py[i];
          const dSq = dx * dx + dy * dy;
          if (dSq < maxDistSq) {
            const alpha = 1 - dSq / maxDistSq;
            const hue = (190 + alpha * 80 + t * 15) % 360;
            ctx.strokeStyle = hsla(hue, 85, 60, alpha * 0.5);
            ctx.lineWidth = alpha * 1.4;
            ctx.beginPath();
            ctx.moveTo(px[i], py[i]);
            ctx.lineTo(px[j], py[j]);
            ctx.stroke();
          }
        }
        ctx.fillStyle = hsla(200, 90, 70, 0.9);
        ctx.beginPath();
        ctx.arc(px[i], py[i], 2.2, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  };
}

// Default parameters from content metadata
const defaultParams = [
  {
    "key": "nodeCount",
    "label": "Constellation Nodes",
    "type": "range",
    "min": 40,
    "max": 160,
    "step": 10,
    "defaultValue": 100,
    "description": "Total walking points"
  },
  {
    "key": "connectionRadius",
    "label": "Connection Reach",
    "type": "range",
    "min": 40,
    "max": 140,
    "step": 5,
    "defaultValue": 80,
    "description": "Maximum proximity distance"
  }
];

if (!window.__art_instances) window.__art_instances = {};
if (!window.__art_instances['brownian-constellation']) {
  const inst = typeof createBrownianConstellation === 'function' ? createBrownianConstellation() : null;
  if (inst && inst.setup) {
    inst.setup({ ctx, width, height, dpr: 1, aspectRatio: width / height }, defaultParams);
  }
  window.__art_instances['brownian-constellation'] = inst;
}

const instance = window.__art_instances['brownian-constellation'];
if (instance && instance.render) {
  instance.render(
    { ctx, width, height, dpr: 1, aspectRatio: width / height },
    { time, deltaTime: dt, frameCount: Math.floor(time * 60), fps: 60 },
    defaultParams
  );
}`,

  // 012. Boids Emergence
  'boids-flocking': `// 012 - Boids Emergence (particles)
// 1:1 Original algorithm engine source
function createBoidsFlocking() {
  const MAX_BOIDS = 400;
  const px = new Float32Array(MAX_BOIDS);
  const py = new Float32Array(MAX_BOIDS);
  const vx = new Float32Array(MAX_BOIDS);
  const vy = new Float32Array(MAX_BOIDS);
  return {
    setup(context) {
      for (let i = 0; i < MAX_BOIDS; i++) {
        px[i] = Math.random() * context.width;
        py[i] = Math.random() * context.height;
        const a = Math.random() * Math.PI * 2;
        vx[i] = Math.cos(a) * 2;
        vy[i] = Math.sin(a) * 2;
      }
    },
    render(context, _timeState, params) {
      const { ctx, width, height } = context;
      const count = Math.min(MAX_BOIDS, Number(params.boidCount || 250));
      const visualRange = 45;
      const visualRangeSq = visualRange * visualRange;
      const minDistance = 14;
      const minDistSq = minDistance * minDistance;
      const maxSpeed = 3.5;
      ctx.fillStyle = "rgba(8, 9, 13, 0.2)";
      ctx.fillRect(0, 0, width, height);
      for (let i = 0; i < count; i++) {
        let alignX = 0;
        let alignY = 0;
        let cohereX = 0;
        let cohereY = 0;
        let separateX = 0;
        let separateY = 0;
        let neighbors = 0;
        for (let j = 0; j < count; j++) {
          if (i === j) continue;
          const dx = px[j] - px[i];
          const dy = py[j] - py[i];
          const dSq = dx * dx + dy * dy;
          if (dSq < visualRangeSq) {
            alignX += vx[j];
            alignY += vy[j];
            cohereX += px[j];
            cohereY += py[j];
            neighbors++;
            if (dSq < minDistSq) {
              separateX -= dx / (Math.sqrt(dSq) + 0.1);
              separateY -= dy / (Math.sqrt(dSq) + 0.1);
            }
          }
        }
        if (neighbors > 0) {
          alignX /= neighbors;
          alignY /= neighbors;
          cohereX = cohereX / neighbors - px[i];
          cohereY = cohereY / neighbors - py[i];
          vx[i] += alignX * 0.05 + cohereX * 5e-3 + separateX * 0.15;
          vy[i] += alignY * 0.05 + cohereY * 5e-3 + separateY * 0.15;
        }
        const toCenterX = width * 0.5 - px[i];
        const toCenterY = height * 0.5 - py[i];
        vx[i] += toCenterX * 3e-4;
        vy[i] += toCenterY * 3e-4;
        const speed = Math.sqrt(vx[i] * vx[i] + vy[i] * vy[i]);
        if (speed > maxSpeed) {
          vx[i] = vx[i] / speed * maxSpeed;
          vy[i] = vy[i] / speed * maxSpeed;
        }
        px[i] += vx[i];
        py[i] += vy[i];
        if (px[i] < 0) px[i] += width;
        if (px[i] > width) px[i] -= width;
        if (py[i] < 0) py[i] += height;
        if (py[i] > height) py[i] -= height;
        const heading = Math.atan2(vy[i], vx[i]);
        const hue = (160 + heading / Math.PI * 90 + 360) % 360;
        ctx.save();
        ctx.translate(px[i], py[i]);
        ctx.rotate(heading);
        ctx.fillStyle = hsla(hue, 90, 65, 0.85);
        ctx.beginPath();
        ctx.moveTo(6, 0);
        ctx.lineTo(-4, -3);
        ctx.lineTo(-2, 0);
        ctx.lineTo(-4, 3);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
      }
    }
  };
}

// Default parameters from content metadata
const defaultParams = [
  {
    "key": "boidCount",
    "label": "Boid Population",
    "type": "range",
    "min": 50,
    "max": 400,
    "step": 25,
    "defaultValue": 250,
    "description": "Total agent count"
  }
];

if (!window.__art_instances) window.__art_instances = {};
if (!window.__art_instances['boids-flocking']) {
  const inst = typeof createBoidsFlocking === 'function' ? createBoidsFlocking() : null;
  if (inst && inst.setup) {
    inst.setup({ ctx, width, height, dpr: 1, aspectRatio: width / height }, defaultParams);
  }
  window.__art_instances['boids-flocking'] = inst;
}

const instance = window.__art_instances['boids-flocking'];
if (instance && instance.render) {
  instance.render(
    { ctx, width, height, dpr: 1, aspectRatio: width / height },
    { time, deltaTime: dt, frameCount: Math.floor(time * 60), fps: 60 },
    defaultParams
  );
}`,

  // 013. Hyperbolic Poincaré
  'hyperbolic-tessellation': `// 013 - Hyperbolic Poincaré (geometry)
// 1:1 Original algorithm engine source
function createHyperbolicTessellation() {
  return {
    setup() {
    },
    render(context, timeState, params) {
      const { ctx, width, height } = context;
      const t = timeState.time * Number(params.speed || 0.4);
      const p = Number(params.symmetryP || 7);
      const radius = Math.min(width, height) * 0.44;
      ctx.fillStyle = "#08090d";
      ctx.fillRect(0, 0, width, height);
      const cx = width * 0.5;
      const cy = height * 0.5;
      ctx.strokeStyle = "rgba(56, 189, 248, 0.4)";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.stroke();
      const layers = 14;
      for (let l = 1; l <= layers; l++) {
        const hypRadius = radius * Math.tanh(l * 0.25 + Math.sin(t) * 0.1);
        const arcCount = p * l;
        for (let i = 0; i < arcCount; i++) {
          const angle = i / arcCount * Math.PI * 2 + t * (0.1 / l);
          const arcX = cx + Math.cos(angle) * hypRadius;
          const arcY = cy + Math.sin(angle) * hypRadius;
          const arcR = (radius - hypRadius) * 0.5;
          if (arcR <= 0.5) continue;
          const hue = (l * 25 + i * 10 + t * 20) % 360;
          ctx.strokeStyle = hsla(hue, 85, 60, 0.45);
          ctx.lineWidth = Math.max(0.8, 2.5 - l * 0.15);
          ctx.beginPath();
          ctx.arc(arcX, arcY, arcR, 0, Math.PI * 2);
          ctx.stroke();
        }
      }
    }
  };
}

// Default parameters from content metadata
const defaultParams = [
  {
    "key": "symmetryP",
    "label": "Tessellation Symmetry (p)",
    "type": "range",
    "min": 4,
    "max": 12,
    "step": 1,
    "defaultValue": 7,
    "description": "Hyperbolic polygonal order"
  },
  {
    "key": "speed",
    "label": "Rotation Drift",
    "type": "range",
    "min": 0.1,
    "max": 1.5,
    "step": 0.05,
    "defaultValue": 0.4,
    "description": "Non-Euclidean drift speed"
  }
];

if (!window.__art_instances) window.__art_instances = {};
if (!window.__art_instances['hyperbolic-tessellation']) {
  const inst = typeof createHyperbolicTessellation === 'function' ? createHyperbolicTessellation() : null;
  if (inst && inst.setup) {
    inst.setup({ ctx, width, height, dpr: 1, aspectRatio: width / height }, defaultParams);
  }
  window.__art_instances['hyperbolic-tessellation'] = inst;
}

const instance = window.__art_instances['hyperbolic-tessellation'];
if (instance && instance.render) {
  instance.render(
    { ctx, width, height, dpr: 1, aspectRatio: width / height },
    { time, deltaTime: dt, frameCount: Math.floor(time * 60), fps: 60 },
    defaultParams
  );
}`,

  // 014. Sacred Mandala
  'sacred-mandala': `// 014 - Sacred Mandala (geometry)
// 1:1 Original algorithm engine source
function createSacredMandala() {
  return {
    setup() {
    },
    render(context, timeState, params) {
      const { ctx, width, height } = context;
      const t = timeState.time * Number(params.speed || 0.5);
      const folds = Number(params.folds || 12);
      const maxR = Math.min(width, height) * 0.42;
      ctx.fillStyle = "rgba(8, 9, 13, 0.2)";
      ctx.fillRect(0, 0, width, height);
      const cx = width * 0.5;
      const cy = height * 0.5;
      const rings = 8;
      for (let r = 1; r <= rings; r++) {
        const ringRadius = r / rings * maxR;
        const ringOffset = t * (r % 2 === 0 ? 0.3 : -0.3) + r * 0.2;
        ctx.save();
        ctx.translate(cx, cy);
        for (let i = 0; i < folds; i++) {
          ctx.rotate(Math.PI * 2 / folds);
          const petalW = ringRadius * 0.35 * (1 + 0.2 * Math.sin(t * 2 + r));
          const petalH = maxR / rings * 1.4;
          ctx.beginPath();
          ctx.ellipse(0, ringRadius, petalW, petalH, ringOffset, 0, Math.PI * 2);
          const hue = (r * 35 + i * (360 / folds) + t * 20) % 360;
          ctx.strokeStyle = hsla(hue, 90, 65, 0.65);
          ctx.lineWidth = 1.2;
          ctx.stroke();
        }
        ctx.restore();
      }
    }
  };
}

// Default parameters from content metadata
const defaultParams = [
  {
    "key": "folds",
    "label": "Rotational Symmetry (Folds)",
    "type": "range",
    "min": 6,
    "max": 24,
    "step": 2,
    "defaultValue": 12,
    "description": "Kaleidoscopic sector count"
  },
  {
    "key": "speed",
    "label": "Spin Rate",
    "type": "range",
    "min": 0.1,
    "max": 2,
    "step": 0.1,
    "defaultValue": 0.5,
    "description": "Harmonic oscillation speed"
  }
];

if (!window.__art_instances) window.__art_instances = {};
if (!window.__art_instances['sacred-mandala']) {
  const inst = typeof createSacredMandala === 'function' ? createSacredMandala() : null;
  if (inst && inst.setup) {
    inst.setup({ ctx, width, height, dpr: 1, aspectRatio: width / height }, defaultParams);
  }
  window.__art_instances['sacred-mandala'] = inst;
}

const instance = window.__art_instances['sacred-mandala'];
if (instance && instance.render) {
  instance.render(
    { ctx, width, height, dpr: 1, aspectRatio: width / height },
    { time, deltaTime: dt, frameCount: Math.floor(time * 60), fps: 60 },
    defaultParams
  );
}`,

  // 015. Moiré Interference
  'moire-interference': `// 015 - Moiré Interference (geometry)
// 1:1 Original algorithm engine source
function createMoireInterference() {
  return {
    setup() {
    },
    render(context, timeState, params) {
      const { ctx, width, height } = context;
      const t = timeState.time * Number(params.speed || 0.5);
      const ringCount = Number(params.ringCount || 75);
      const separation = Number(params.separation || 40) + Math.sin(t * 0.8) * 30;
      ctx.fillStyle = "#08090d";
      ctx.fillRect(0, 0, width, height);
      const cx = width * 0.5;
      const cy = height * 0.5;
      const c1x = cx - separation;
      const c1y = cy;
      const c2x = cx + separation * Math.cos(t * 0.5);
      const c2y = cy + separation * Math.sin(t * 0.5);
      const maxR = Math.max(width, height) * 0.75;
      const step = maxR / ringCount;
      ctx.lineWidth = 1.3;
      for (let r = 5; r < maxR; r += step) {
        ctx.beginPath();
        ctx.arc(c1x, c1y, r, 0, Math.PI * 2);
        ctx.strokeStyle = hsla((180 + r / maxR * 60) % 360, 85, 60, 0.6);
        ctx.stroke();
      }
      for (let r = 5; r < maxR; r += step) {
        ctx.beginPath();
        ctx.arc(c2x, c2y, r, 0, Math.PI * 2);
        ctx.strokeStyle = hsla((280 + r / maxR * 60) % 360, 85, 65, 0.6);
        ctx.stroke();
      }
    }
  };
}

// Default parameters from content metadata
const defaultParams = [
  {
    "key": "ringCount",
    "label": "Ring Density",
    "type": "range",
    "min": 30,
    "max": 120,
    "step": 5,
    "defaultValue": 75,
    "description": "Concentric circle count"
  },
  {
    "key": "speed",
    "label": "Orbital Shift Speed",
    "type": "range",
    "min": 0.1,
    "max": 2,
    "step": 0.1,
    "defaultValue": 0.5,
    "description": "Phase drift speed"
  }
];

if (!window.__art_instances) window.__art_instances = {};
if (!window.__art_instances['moire-interference']) {
  const inst = typeof createMoireInterference === 'function' ? createMoireInterference() : null;
  if (inst && inst.setup) {
    inst.setup({ ctx, width, height, dpr: 1, aspectRatio: width / height }, defaultParams);
  }
  window.__art_instances['moire-interference'] = inst;
}

const instance = window.__art_instances['moire-interference'];
if (instance && instance.render) {
  instance.render(
    { ctx, width, height, dpr: 1, aspectRatio: width / height },
    { time, deltaTime: dt, frameCount: Math.floor(time * 60), fps: 60 },
    defaultParams
  );
}`,

  // 016. Penrose Subdivision
  'penrose-subdivision': `// 016 - Penrose Subdivision (geometry)
// 1:1 Original algorithm engine source
function createPenroseSubdivision() {
  const GOLDEN_RATIO = (1 + Math.sqrt(5)) / 2;
  function drawTriangle(ctx, x1, y1, x2, y2, x3, y3, depth, type, time) {
    if (depth <= 0) {
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.lineTo(x3, y3);
      ctx.closePath();
      const hue = (type === 0 ? 190 : 280) + depth * 20 + time * 15;
      ctx.fillStyle = hsla(hue, 80, 50, 0.4);
      ctx.fill();
      ctx.strokeStyle = hsla(hue, 90, 70, 0.8);
      ctx.lineWidth = 0.9;
      ctx.stroke();
      return;
    }
    if (type === 0) {
      const p4x = x1 + (x2 - x1) / GOLDEN_RATIO;
      const p4y = y1 + (y2 - y1) / GOLDEN_RATIO;
      drawTriangle(ctx, x3, y3, p4x, p4y, x1, y1, depth - 1, 0, time);
      drawTriangle(ctx, p4x, p4y, x3, y3, x2, y2, depth - 1, 1, time);
    } else {
      const p4x = x2 + (x3 - x2) / GOLDEN_RATIO;
      const p4y = y2 + (y3 - y2) / GOLDEN_RATIO;
      const p5x = x2 + (x1 - x2) / GOLDEN_RATIO;
      const p5y = y2 + (y1 - y2) / GOLDEN_RATIO;
      drawTriangle(ctx, p4x, p4y, p5x, p5y, x2, y2, depth - 1, 1, time);
      drawTriangle(ctx, p5x, p5y, p4x, p4y, x1, y1, depth - 1, 0, time);
      drawTriangle(ctx, x3, y3, p4x, p4y, x1, y1, depth - 1, 1, time);
    }
  }
  return {
    setup() {
    },
    render(context, timeState, params) {
      const { ctx, width, height } = context;
      const t = timeState.time * Number(params.speed || 0.4);
      const depth = Math.min(5, Number(params.subdivisionDepth || 4));
      const radius = Math.min(width, height) * 0.44;
      ctx.fillStyle = "#08090d";
      ctx.fillRect(0, 0, width, height);
      const cx = width * 0.5;
      const cy = height * 0.5;
      const folds = 10;
      for (let i = 0; i < folds; i++) {
        const a1 = i / folds * Math.PI * 2 + t * 0.1;
        const a2 = (i + 1) / folds * Math.PI * 2 + t * 0.1;
        const x1 = cx + Math.cos(a1) * radius;
        const y1 = cy + Math.sin(a1) * radius;
        const x2 = cx + Math.cos(a2) * radius;
        const y2 = cy + Math.sin(a2) * radius;
        drawTriangle(ctx, cx, cy, x1, y1, x2, y2, depth, i % 2, t);
      }
    }
  };
}

// Default parameters from content metadata
const defaultParams = [
  {
    "key": "subdivisionDepth",
    "label": "Recursion Depth",
    "type": "range",
    "min": 2,
    "max": 5,
    "step": 1,
    "defaultValue": 4,
    "description": "Fractal deflation resolution"
  },
  {
    "key": "speed",
    "label": "Rotation Drift",
    "type": "range",
    "min": 0.1,
    "max": 1.5,
    "step": 0.05,
    "defaultValue": 0.4,
    "description": "Aperiodic rotation speed"
  }
];

if (!window.__art_instances) window.__art_instances = {};
if (!window.__art_instances['penrose-subdivision']) {
  const inst = typeof createPenroseSubdivision === 'function' ? createPenroseSubdivision() : null;
  if (inst && inst.setup) {
    inst.setup({ ctx, width, height, dpr: 1, aspectRatio: width / height }, defaultParams);
  }
  window.__art_instances['penrose-subdivision'] = inst;
}

const instance = window.__art_instances['penrose-subdivision'];
if (instance && instance.render) {
  instance.render(
    { ctx, width, height, dpr: 1, aspectRatio: width / height },
    { time, deltaTime: dt, frameCount: Math.floor(time * 60), fps: 60 },
    defaultParams
  );
}`,

  // 017. Fourier Harmonics
  'fourier-harmonics': `// 017 - Fourier Harmonics (waves)
// 1:1 Original algorithm engine source
function createFourierHarmonics() {
  const MAX_HISTORY = 400;
  const historyY = new Float32Array(MAX_HISTORY);
  let historyCount = 0;
  return {
    setup() {
      historyCount = 0;
    },
    render(context, timeState, params) {
      const { ctx, width, height } = context;
      const t = timeState.time * Number(params.speed || 1.2);
      const harmonics = Math.min(15, Number(params.harmonicCount || 7));
      const waveType = params.waveType || "square";
      ctx.fillStyle = "#08090d";
      ctx.fillRect(0, 0, width, height);
      let x = width * 0.28;
      let y = height * 0.5;
      const baseRadius = Math.min(width, height) * 0.18;
      for (let i = 0; i < harmonics; i++) {
        const prevX = x;
        const prevY = y;
        const n = waveType === "square" ? i * 2 + 1 : i + 1;
        const radius = waveType === "square" ? baseRadius * (4 / (n * Math.PI)) : baseRadius * (2 / (n * Math.PI));
        x += radius * Math.cos(n * t);
        y += radius * Math.sin(n * t);
        ctx.strokeStyle = hsla((i * 35 + 200) % 360, 80, 60, 0.35);
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(prevX, prevY, radius, 0, Math.PI * 2);
        ctx.stroke();
        ctx.strokeStyle = hsla((i * 35 + 200) % 360, 90, 70, 0.7);
        ctx.beginPath();
        ctx.moveTo(prevX, prevY);
        ctx.lineTo(x, y);
        ctx.stroke();
      }
      if (historyCount < MAX_HISTORY) {
        historyY[historyCount++] = y;
      } else {
        for (let i = 0; i < MAX_HISTORY - 1; i++) {
          historyY[i] = historyY[i + 1];
        }
        historyY[MAX_HISTORY - 1] = y;
      }
      const waveStartX = width * 0.52;
      ctx.strokeStyle = "rgba(56, 189, 248, 0.5)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(waveStartX, y);
      ctx.stroke();
      ctx.beginPath();
      for (let i = 0; i < historyCount; i++) {
        const px = waveStartX + i / MAX_HISTORY * (width * 0.44);
        const py = historyY[historyCount - 1 - i];
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.strokeStyle = hsla((t * 20 + 190) % 360, 95, 65, 0.9);
      ctx.lineWidth = 2.2;
      ctx.stroke();
    }
  };
}

// Default parameters from content metadata
const defaultParams = [
  {
    "key": "harmonicCount",
    "label": "Harmonic Phasors (N)",
    "type": "range",
    "min": 1,
    "max": 15,
    "step": 1,
    "defaultValue": 7,
    "description": "Fourier series terms"
  },
  {
    "key": "speed",
    "label": "Phasor Rotation Speed",
    "type": "range",
    "min": 0.3,
    "max": 3,
    "step": 0.1,
    "defaultValue": 1.2,
    "description": "Fundamental frequency speed"
  }
];

if (!window.__art_instances) window.__art_instances = {};
if (!window.__art_instances['fourier-harmonics']) {
  const inst = typeof createFourierHarmonics === 'function' ? createFourierHarmonics() : null;
  if (inst && inst.setup) {
    inst.setup({ ctx, width, height, dpr: 1, aspectRatio: width / height }, defaultParams);
  }
  window.__art_instances['fourier-harmonics'] = inst;
}

const instance = window.__art_instances['fourier-harmonics'];
if (instance && instance.render) {
  instance.render(
    { ctx, width, height, dpr: 1, aspectRatio: width / height },
    { time, deltaTime: dt, frameCount: Math.floor(time * 60), fps: 60 },
    defaultParams
  );
}`,

  // 018. Standing Wave Grid
  'standing-wave-grid': `// 018 - Standing Wave Grid (waves)
// 1:1 Original algorithm engine source
function createStandingWaveGrid() {
  const MAX_SAND = 3e3;
  const px = new Float32Array(MAX_SAND);
  const py = new Float32Array(MAX_SAND);
  return {
    setup() {
      for (let i = 0; i < MAX_SAND; i++) {
        px[i] = Math.random();
        py[i] = Math.random();
      }
    },
    render(context, timeState, params) {
      const { ctx, width, height } = context;
      const count = Math.min(MAX_SAND, Number(params.sandCount || 2400));
      const n = Number(params.modeN || 3) + Math.sin(timeState.time * 0.3) * 0.5;
      const m = Number(params.modeM || 5) + Math.cos(timeState.time * 0.25) * 0.5;
      const t = timeState.time;
      ctx.fillStyle = "rgba(8, 9, 13, 0.2)";
      ctx.fillRect(0, 0, width, height);
      for (let i = 0; i < count; i++) {
        const x = px[i];
        const y = py[i];
        const val = Math.sin(n * Math.PI * x) * Math.sin(m * Math.PI * y) - Math.sin(m * Math.PI * x) * Math.sin(n * Math.PI * y);
        const eps = 0.01;
        const valDx = Math.sin(n * Math.PI * (x + eps)) * Math.sin(m * Math.PI * y) - Math.sin(m * Math.PI * (x + eps)) * Math.sin(n * Math.PI * y);
        const valDy = Math.sin(n * Math.PI * x) * Math.sin(m * Math.PI * (y + eps)) - Math.sin(m * Math.PI * x) * Math.sin(n * Math.PI * (y + eps));
        const gradX = (Math.abs(valDx) - Math.abs(val)) / eps;
        const gradY = (Math.abs(valDy) - Math.abs(val)) / eps;
        px[i] -= gradX * 6e-4 + (Math.random() - 0.5) * 2e-3;
        py[i] -= gradY * 6e-4 + (Math.random() - 0.5) * 2e-3;
        if (px[i] < 0) px[i] = Math.random();
        if (px[i] > 1) px[i] = Math.random();
        if (py[i] < 0) py[i] = Math.random();
        if (py[i] > 1) py[i] = Math.random();
        const renderX = px[i] * width;
        const renderY = py[i] * height;
        const hue = (210 + Math.abs(val) * 120 + t * 10) % 360;
        ctx.fillStyle = hsla(hue, 90, 70, 0.8);
        ctx.fillRect(renderX, renderY, 1.6, 1.6);
      }
    }
  };
}

// Default parameters from content metadata
const defaultParams = [
  {
    "key": "modeN",
    "label": "Eigenmode N",
    "type": "range",
    "min": 1,
    "max": 8,
    "step": 1,
    "defaultValue": 3,
    "description": "Horizontal harmonic mode"
  },
  {
    "key": "modeM",
    "label": "Eigenmode M",
    "type": "range",
    "min": 1,
    "max": 8,
    "step": 1,
    "defaultValue": 5,
    "description": "Vertical harmonic mode"
  }
];

if (!window.__art_instances) window.__art_instances = {};
if (!window.__art_instances['standing-wave-grid']) {
  const inst = typeof createStandingWaveGrid === 'function' ? createStandingWaveGrid() : null;
  if (inst && inst.setup) {
    inst.setup({ ctx, width, height, dpr: 1, aspectRatio: width / height }, defaultParams);
  }
  window.__art_instances['standing-wave-grid'] = inst;
}

const instance = window.__art_instances['standing-wave-grid'];
if (instance && instance.render) {
  instance.render(
    { ctx, width, height, dpr: 1, aspectRatio: width / height },
    { time, deltaTime: dt, frameCount: Math.floor(time * 60), fps: 60 },
    defaultParams
  );
}`,

  // 019. Soliton Collision
  'soliton-pulse': `// 019 - Soliton Collision (waves)
// 1:1 Original algorithm engine source
function createSolitonPulse() {
  const SAMPLES = 250;
  const LINES = 24;
  return {
    setup() {
    },
    render(context, timeState, params) {
      const { ctx, width, height } = context;
      const t = timeState.time * Number(params.speed || 1) % 10;
      const amp = Number(params.amplitude || 45);
      ctx.fillStyle = "#08090d";
      ctx.fillRect(0, 0, width, height);
      const cy = height * 0.5;
      for (let l = 0; l < LINES; l++) {
        const lineOffset = (l - LINES / 2) * 12;
        const phaseShift = l * 0.15;
        ctx.beginPath();
        for (let i = 0; i <= SAMPLES; i++) {
          const normX = i / SAMPLES * 20 - 10;
          const renderX = i / SAMPLES * width;
          const k1 = 0.8;
          const pos1 = k1 * (normX - 4 * k1 * k1 * (t * 0.8 - 4) + phaseShift);
          const sech1 = 1 / Math.cosh(pos1);
          const u1 = 2 * k1 * k1 * sech1 * sech1;
          const k2 = 0.6;
          const pos2 = -k2 * (normX + 4 * k2 * k2 * (t * 0.8 - 4) - phaseShift);
          const sech2 = 1 / Math.cosh(pos2);
          const u2 = 2 * k2 * k2 * sech2 * sech2;
          const totalWave = (u1 + u2) * amp;
          const renderY = cy + lineOffset - totalWave;
          if (i === 0) ctx.moveTo(renderX, renderY);
          else ctx.lineTo(renderX, renderY);
        }
        const hue = (175 + l * 6 + timeState.time * 20) % 360;
        ctx.strokeStyle = hsla(hue, 90, 65, 0.7);
        ctx.lineWidth = 1.4;
        ctx.stroke();
      }
    }
  };
}

// Default parameters from content metadata
const defaultParams = [
  {
    "key": "amplitude",
    "label": "Pulse Amplitude",
    "type": "range",
    "min": 15,
    "max": 80,
    "step": 2,
    "defaultValue": 45,
    "description": "Peak soliton height"
  },
  {
    "key": "speed",
    "label": "Propagation Velocity",
    "type": "range",
    "min": 0.3,
    "max": 3,
    "step": 0.1,
    "defaultValue": 1,
    "description": "Non-linear wave speed"
  }
];

if (!window.__art_instances) window.__art_instances = {};
if (!window.__art_instances['soliton-pulse']) {
  const inst = typeof createSolitonPulse === 'function' ? createSolitonPulse() : null;
  if (inst && inst.setup) {
    inst.setup({ ctx, width, height, dpr: 1, aspectRatio: width / height }, defaultParams);
  }
  window.__art_instances['soliton-pulse'] = inst;
}

const instance = window.__art_instances['soliton-pulse'];
if (instance && instance.render) {
  instance.render(
    { ctx, width, height, dpr: 1, aspectRatio: width / height },
    { time, deltaTime: dt, frameCount: Math.floor(time * 60), fps: 60 },
    defaultParams
  );
}`,

  // 020. Circular Ripples
  'circular-ripples': `// 020 - Circular Ripples (waves)
// 1:1 Original algorithm engine source
function createCircularRipples() {
  const GRID = 45;
  return {
    setup() {
    },
    render(context, timeState, params) {
      const { ctx, width, height } = context;
      const t = timeState.time * Number(params.speed || 1.8);
      const freq = Number(params.frequency || 0.04);
      const cellW = width / GRID;
      const cellH = height / GRID;
      ctx.fillStyle = "#08090d";
      ctx.fillRect(0, 0, width, height);
      const s1x = width * 0.35 + Math.cos(t * 0.5) * (width * 0.15);
      const s1y = height * 0.35 + Math.sin(t * 0.5) * (height * 0.15);
      const s2x = width * 0.65 + Math.cos(-t * 0.6) * (width * 0.15);
      const s2y = height * 0.65 + Math.sin(-t * 0.6) * (height * 0.15);
      const s3x = width * 0.5 + Math.sin(t * 0.7) * (width * 0.2);
      const s3y = height * 0.5 + Math.cos(t * 0.7) * (height * 0.2);
      for (let y = 0; y < GRID; y++) {
        const py = y * cellH;
        for (let x = 0; x < GRID; x++) {
          const px = x * cellW;
          const d1 = Math.sqrt((px - s1x) ** 2 + (py - s1y) ** 2);
          const d2 = Math.sqrt((px - s2x) ** 2 + (py - s2y) ** 2);
          const d3 = Math.sqrt((px - s3x) ** 2 + (py - s3y) ** 2);
          const w1 = Math.sin(d1 * freq - t * 2) / (Math.sqrt(d1) * 0.1 + 1);
          const w2 = Math.sin(d2 * freq - t * 2) / (Math.sqrt(d2) * 0.1 + 1);
          const w3 = Math.sin(d3 * freq - t * 2) / (Math.sqrt(d3) * 0.1 + 1);
          const wave = (w1 + w2 + w3) / 3;
          const radius = Math.max(0.8, (wave + 1) * 0.5 * (cellW * 0.45));
          const hue = (200 + wave * 90 + t * 15) % 360;
          ctx.fillStyle = hsla(hue, 90, 65, Math.min(1, Math.abs(wave) + 0.3));
          ctx.beginPath();
          ctx.arc(px + cellW * 0.5, py + cellH * 0.5, radius, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    }
  };
}

// Default parameters from content metadata
const defaultParams = [
  {
    "key": "frequency",
    "label": "Ripple Wavenumber (k)",
    "type": "range",
    "min": 0.01,
    "max": 0.08,
    "step": 0.005,
    "defaultValue": 0.04,
    "description": "Spatial ripple density"
  },
  {
    "key": "speed",
    "label": "Propagation Speed",
    "type": "range",
    "min": 0.5,
    "max": 4,
    "step": 0.2,
    "defaultValue": 1.8,
    "description": "Wave radiation rate"
  }
];

if (!window.__art_instances) window.__art_instances = {};
if (!window.__art_instances['circular-ripples']) {
  const inst = typeof createCircularRipples === 'function' ? createCircularRipples() : null;
  if (inst && inst.setup) {
    inst.setup({ ctx, width, height, dpr: 1, aspectRatio: width / height }, defaultParams);
  }
  window.__art_instances['circular-ripples'] = inst;
}

const instance = window.__art_instances['circular-ripples'];
if (instance && instance.render) {
  instance.render(
    { ctx, width, height, dpr: 1, aspectRatio: width / height },
    { time, deltaTime: dt, frameCount: Math.floor(time * 60), fps: 60 },
    defaultParams
  );
}`,

  // 021. Black Hole Lensing
  'black-hole-lensing': `// 021 - Black Hole Lensing (space)
// 1:1 Original algorithm engine source
function createBlackHoleLensing() {
  const PARTICLES = 2200;
  const rad = new Float32Array(PARTICLES);
  const ang = new Float32Array(PARTICLES);
  const speed = new Float32Array(PARTICLES);
  return {
    setup() {
      for (let i = 0; i < PARTICLES; i++) {
        rad[i] = 40 + Math.random() * 160;
        ang[i] = Math.random() * Math.PI * 2;
        speed[i] = 2.5 / Math.sqrt(rad[i]);
      }
    },
    render(context, _timeState, params) {
      const { ctx, width, height } = context;
      const rs = Number(params.schwarzschildRadius || 36);
      const cx = width * 0.5;
      const cy = height * 0.5;
      ctx.fillStyle = "rgba(8, 9, 13, 0.25)";
      ctx.fillRect(0, 0, width, height);
      for (let i = 0; i < PARTICLES; i++) {
        ang[i] += speed[i] * 0.04;
        const inclination = 0.45;
        const rawX = Math.cos(ang[i]) * rad[i];
        const rawY = Math.sin(ang[i]) * rad[i] * inclination;
        const d = Math.sqrt(rawX * rawX + rawY * rawY);
        let warpedX = rawX;
        let warpedY = rawY;
        if (d > rs && rawY < 0) {
          const bend = rs * 1.5 / d;
          warpedY = rawY - bend * 22;
        }
        const px = cx + warpedX;
        const py = cy + warpedY;
        const doppler = Math.sin(ang[i]);
        const hue = doppler > 0 ? 190 + doppler * 30 : 25 + Math.abs(doppler) * 20;
        const alpha = Math.min(1, Math.max(0.1, (1 + doppler * 0.6) * (1 - rad[i] / 220)));
        ctx.fillStyle = hsla(hue, 95, 65, alpha);
        ctx.fillRect(px, py, 1.8, 1.8);
      }
      ctx.beginPath();
      ctx.arc(cx, cy, rs * 1.5, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(56, 189, 248, 0.4)";
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.fillStyle = "#050608";
      ctx.beginPath();
      ctx.arc(cx, cy, rs, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = "rgba(255, 255, 255, 0.8)";
      ctx.lineWidth = 1;
      ctx.stroke();
    }
  };
}

// Default parameters from content metadata
const defaultParams = [
  {
    "key": "schwarzschildRadius",
    "label": "Schwarzschild Radius (rs)",
    "type": "range",
    "min": 15,
    "max": 60,
    "step": 1,
    "defaultValue": 36,
    "description": "Event horizon radius"
  }
];

if (!window.__art_instances) window.__art_instances = {};
if (!window.__art_instances['black-hole-lensing']) {
  const inst = typeof createBlackHoleLensing === 'function' ? createBlackHoleLensing() : null;
  if (inst && inst.setup) {
    inst.setup({ ctx, width, height, dpr: 1, aspectRatio: width / height }, defaultParams);
  }
  window.__art_instances['black-hole-lensing'] = inst;
}

const instance = window.__art_instances['black-hole-lensing'];
if (instance && instance.render) {
  instance.render(
    { ctx, width, height, dpr: 1, aspectRatio: width / height },
    { time, deltaTime: dt, frameCount: Math.floor(time * 60), fps: 60 },
    defaultParams
  );
}`,

  // 022. Keplerian Orbits
  'kepler-orbits': `// 022 - Keplerian Orbits (space)
// 1:1 Original algorithm engine source
function createKeplerOrbits() {
  const BODIES = 6;
  const a = [60, 95, 130, 165, 205, 250];
  const e = [0.2, 0.45, 0.15, 0.6, 0.3, 0.5];
  const incl = [0, 0.3, -0.4, 0.6, -0.2, 0.5];
  return {
    setup() {
    },
    render(context, timeState, params) {
      const { ctx, width, height } = context;
      const t = timeState.time * Number(params.speed || 0.8);
      const cx = width * 0.5;
      const cy = height * 0.5;
      ctx.fillStyle = "rgba(8, 9, 13, 0.18)";
      ctx.fillRect(0, 0, width, height);
      ctx.fillStyle = "#fde047";
      ctx.shadowColor = "#f59e0b";
      ctx.shadowBlur = 18;
      ctx.beginPath();
      ctx.arc(cx, cy, 7, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;
      for (let b = 0; b < BODIES; b++) {
        const semiA = a[b] * (Math.min(width, height) / 600);
        const ecc = e[b];
        const semiB = semiA * Math.sqrt(1 - ecc * ecc);
        const focusOffset = semiA * ecc;
        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(incl[b] + t * 0.05);
        ctx.beginPath();
        ctx.ellipse(-focusOffset, 0, semiA, semiB, 0, 0, Math.PI * 2);
        ctx.strokeStyle = hsla((b * 45 + 180) % 360, 70, 50, 0.25);
        ctx.lineWidth = 1;
        ctx.stroke();
        const orbitalPeriod = Math.pow(semiA / 50, 1.5);
        const meanAnomaly = t / orbitalPeriod * Math.PI * 2;
        let E = meanAnomaly;
        for (let iter = 0; iter < 4; iter++) {
          E = E - (E - ecc * Math.sin(E) - meanAnomaly) / (1 - ecc * Math.cos(E));
        }
        const planetX = semiA * Math.cos(E) - focusOffset;
        const planetY = semiB * Math.sin(E);
        const hue = (b * 50 + 190) % 360;
        ctx.fillStyle = hsla(hue, 95, 70, 0.95);
        ctx.shadowColor = hsla(hue, 95, 70, 0.8);
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.arc(planetX, planetY, 3.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
        ctx.restore();
      }
    }
  };
}

// Default parameters from content metadata
const defaultParams = [
  {
    "key": "speed",
    "label": "Orbital Time Scale",
    "type": "range",
    "min": 0.2,
    "max": 2.5,
    "step": 0.1,
    "defaultValue": 0.8,
    "description": "Planetary revolution rate"
  }
];

if (!window.__art_instances) window.__art_instances = {};
if (!window.__art_instances['kepler-orbits']) {
  const inst = typeof createKeplerOrbits === 'function' ? createKeplerOrbits() : null;
  if (inst && inst.setup) {
    inst.setup({ ctx, width, height, dpr: 1, aspectRatio: width / height }, defaultParams);
  }
  window.__art_instances['kepler-orbits'] = inst;
}

const instance = window.__art_instances['kepler-orbits'];
if (instance && instance.render) {
  instance.render(
    { ctx, width, height, dpr: 1, aspectRatio: width / height },
    { time, deltaTime: dt, frameCount: Math.floor(time * 60), fps: 60 },
    defaultParams
  );
}`,

  // 023. Spiral Galaxy Density
  'galaxy-spiral-density': `// 023 - Spiral Galaxy Density (space)
// 1:1 Original algorithm engine source
function createGalaxySpiralDensity() {
  const STARS = 2500;
  const starR = new Float32Array(STARS);
  const starTheta = new Float32Array(STARS);
  const starSpeed = new Float32Array(STARS);
  return {
    setup() {
      for (let i = 0; i < STARS; i++) {
        starR[i] = Math.pow(Math.random(), 1.6) * 220 + 8;
        starTheta[i] = Math.random() * Math.PI * 2;
        starSpeed[i] = 0.8 + 0.2 * (starR[i] / 220);
      }
    },
    render(context, timeState, params) {
      const { ctx, width, height } = context;
      const t = timeState.time * Number(params.speed || 0.6);
      const arms = Number(params.armCount || 2);
      const pitch = Number(params.pitchAngle || 0.22);
      const scale = Math.min(width, height) / 500;
      ctx.fillStyle = "rgba(8, 9, 13, 0.2)";
      ctx.fillRect(0, 0, width, height);
      const cx = width * 0.5;
      const cy = height * 0.5;
      ctx.fillStyle = "#ffffff";
      ctx.shadowColor = "#38bdf8";
      ctx.shadowBlur = 24;
      ctx.beginPath();
      ctx.arc(cx, cy, 6 * scale, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;
      for (let i = 0; i < STARS; i++) {
        starTheta[i] += starSpeed[i] / (starR[i] * 0.4 + 10) * 0.4;
        const armPhase = 1 / pitch * Math.log(starR[i] / 10) - t * 0.4;
        const distToArm = Math.sin(arms * (starTheta[i] - armPhase));
        const effectiveR = starR[i] * (1 - 0.12 * distToArm);
        const px = cx + Math.cos(starTheta[i]) * effectiveR * scale;
        const py = cy + Math.sin(starTheta[i]) * effectiveR * scale;
        const isArm = distToArm > 0.3;
        const hue = isArm ? (200 + starR[i] * 0.3) % 360 : (270 + starR[i] * 0.4) % 360;
        const alpha = Math.min(1, Math.max(0.15, (1 - starR[i] / 240) * (isArm ? 1 : 0.4)));
        ctx.fillStyle = hsla(hue, 90, 70, alpha);
        ctx.fillRect(px, py, 1.5 * scale, 1.5 * scale);
      }
    }
  };
}

// Default parameters from content metadata
const defaultParams = [
  {
    "key": "armCount",
    "label": "Spiral Arm Count (m)",
    "type": "range",
    "min": 1,
    "max": 6,
    "step": 1,
    "defaultValue": 2,
    "description": "Number of density wave spiral arms"
  },
  {
    "key": "pitchAngle",
    "label": "Arm Pitch Angle",
    "type": "range",
    "min": 0.1,
    "max": 0.5,
    "step": 0.02,
    "defaultValue": 0.22,
    "description": "Logarithmic winding tightness"
  },
  {
    "key": "speed",
    "label": "Pattern Speed (Ωp)",
    "type": "range",
    "min": 0.2,
    "max": 2,
    "step": 0.1,
    "defaultValue": 0.6,
    "description": "Rigid wave pattern rotation"
  }
];

if (!window.__art_instances) window.__art_instances = {};
if (!window.__art_instances['galaxy-spiral-density']) {
  const inst = typeof createGalaxySpiralDensity === 'function' ? createGalaxySpiralDensity() : null;
  if (inst && inst.setup) {
    inst.setup({ ctx, width, height, dpr: 1, aspectRatio: width / height }, defaultParams);
  }
  window.__art_instances['galaxy-spiral-density'] = inst;
}

const instance = window.__art_instances['galaxy-spiral-density'];
if (instance && instance.render) {
  instance.render(
    { ctx, width, height, dpr: 1, aspectRatio: width / height },
    { time, deltaTime: dt, frameCount: Math.floor(time * 60), fps: 60 },
    defaultParams
  );
}`,

  // 024. Continuous Life
  'continuous-cellular-automata': `// 024 - Continuous Life (experimental)
// 1:1 Original algorithm engine source
function createContinuousCellularAutomata() {
  const SIZE = 40;
  const state = new Float32Array(SIZE * SIZE);
  const nextState = new Float32Array(SIZE * SIZE);
  return {
    setup() {
      for (let i = 0; i < SIZE * SIZE; i++) {
        state[i] = Math.random() > 0.6 ? Math.random() : 0;
      }
    },
    render(context, timeState, _params) {
      const { ctx, width, height } = context;
      const cellW = width / SIZE;
      const cellH = height / SIZE;
      const t = timeState.time;
      ctx.fillStyle = "#08090d";
      ctx.fillRect(0, 0, width, height);
      for (let y = 0; y < SIZE; y++) {
        for (let x = 0; x < SIZE; x++) {
          const idx = y * SIZE + x;
          let sum = 0;
          let count = 0;
          for (let dy = -1; dy <= 1; dy++) {
            for (let dx = -1; dx <= 1; dx++) {
              if (dx === 0 && dy === 0) continue;
              const nx = (x + dx + SIZE) % SIZE;
              const ny = (y + dy + SIZE) % SIZE;
              sum += state[ny * SIZE + nx];
              count++;
            }
          }
          const avg = sum / count;
          const current = state[idx];
          if (avg >= 0.25 && avg <= 0.45) {
            nextState[idx] = Math.min(1, current + 0.08);
          } else {
            nextState[idx] = Math.max(0, current - 0.05);
          }
          if (Math.random() < 1e-3) {
            nextState[idx] = 1;
          }
        }
      }
      for (let y = 0; y < SIZE; y++) {
        for (let x = 0; x < SIZE; x++) {
          const idx = y * SIZE + x;
          state[idx] = nextState[idx];
          if (state[idx] > 0.05) {
            const px = x * cellW;
            const py = y * cellH;
            const val = state[idx];
            const hue = (160 + val * 120 + t * 15) % 360;
            ctx.fillStyle = hsla(hue, 90, 60, val * 0.9);
            ctx.beginPath();
            ctx.arc(px + cellW * 0.5, py + cellH * 0.5, cellW * 0.45 * val, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }
    }
  };
}

// Default parameters from content metadata
const defaultParams = [
  {
    "key": "kernelDecay",
    "label": "Decay Rate",
    "type": "range",
    "min": 0.01,
    "max": 0.15,
    "step": 0.01,
    "defaultValue": 0.05,
    "description": "Entropy dissipation rate"
  }
];

if (!window.__art_instances) window.__art_instances = {};
if (!window.__art_instances['continuous-cellular-automata']) {
  const inst = typeof createContinuousCellularAutomata === 'function' ? createContinuousCellularAutomata() : null;
  if (inst && inst.setup) {
    inst.setup({ ctx, width, height, dpr: 1, aspectRatio: width / height }, defaultParams);
  }
  window.__art_instances['continuous-cellular-automata'] = inst;
}

const instance = window.__art_instances['continuous-cellular-automata'];
if (instance && instance.render) {
  instance.render(
    { ctx, width, height, dpr: 1, aspectRatio: width / height },
    { time, deltaTime: dt, frameCount: Math.floor(time * 60), fps: 60 },
    defaultParams
  );
}`,

  // 025. Julia Morphism
  'julia-morph': `// 025 - Julia Morphism (experimental)
// 1:1 Original algorithm engine source
function createJuliaMorph() {
  const SAMPLES = 50;
  return {
    setup() {
    },
    render(context, timeState, params) {
      const { ctx, width, height } = context;
      const t = timeState.time * Number(params.speed || 0.4);
      const maxIter = Number(params.maxIter || 24);
      const cr = -0.8 + 0.15 * Math.cos(t * 0.7);
      const ci = 0.156 + 0.15 * Math.sin(t * 0.7);
      const stepX = width / SAMPLES;
      const stepY = height / SAMPLES;
      ctx.fillStyle = "#08090d";
      ctx.fillRect(0, 0, width, height);
      for (let y = 0; y < SAMPLES; y++) {
        const zy0 = y / SAMPLES * 2.8 - 1.4;
        for (let x = 0; x < SAMPLES; x++) {
          const zx0 = x / SAMPLES * 2.8 - 1.4;
          let zx = zx0;
          let zy = zy0;
          let iter = 0;
          while (zx * zx + zy * zy < 4 && iter < maxIter) {
            const tempX = zx * zx - zy * zy + cr;
            zy = 2 * zx * zy + ci;
            zx = tempX;
            iter++;
          }
          if (iter < maxIter) {
            const smoothIter = iter + 1 - Math.log(Math.log(Math.sqrt(zx * zx + zy * zy))) / Math.log(2);
            const hue = (smoothIter * 14 + t * 20) % 360;
            const px = x * stepX;
            const py = y * stepY;
            ctx.fillStyle = hsla(hue, 85, 60, 0.75);
            ctx.fillRect(px, py, stepX + 0.5, stepY + 0.5);
          }
        }
      }
    }
  };
}

// Default parameters from content metadata
const defaultParams = [
  {
    "key": "speed",
    "label": "Morph Velocity",
    "type": "range",
    "min": 0.1,
    "max": 1.5,
    "step": 0.05,
    "defaultValue": 0.4,
    "description": "Parameter space orbit speed"
  },
  {
    "key": "maxIter",
    "label": "Max Iterations",
    "type": "range",
    "min": 10,
    "max": 50,
    "step": 2,
    "defaultValue": 24,
    "description": "Fractal escape depth"
  }
];

if (!window.__art_instances) window.__art_instances = {};
if (!window.__art_instances['julia-morph']) {
  const inst = typeof createJuliaMorph === 'function' ? createJuliaMorph() : null;
  if (inst && inst.setup) {
    inst.setup({ ctx, width, height, dpr: 1, aspectRatio: width / height }, defaultParams);
  }
  window.__art_instances['julia-morph'] = inst;
}

const instance = window.__art_instances['julia-morph'];
if (instance && instance.render) {
  instance.render(
    { ctx, width, height, dpr: 1, aspectRatio: width / height },
    { time, deltaTime: dt, frameCount: Math.floor(time * 60), fps: 60 },
    defaultParams
  );
}`,

  // 026. Bioluminescent Jellyfish
  'bioluminescent-jellyfish': `// 026 - Bioluminescent Jellyfish (creatures)
// 1:1 Original algorithm engine source
function createBioluminescentJellyfish() {
  const BELL_RIBBONS = 48;
  const TENTACLES = 96;
  const NODES_PER_TENTACLE = 36;
  return {
    setup() {
    },
    render(context, timeState, params) {
      const { ctx, width, height } = context;
      const speed = Number(params.pulseSpeed || 1.1);
      const tentacleLength = Number(params.tentacleLength || 200);
      const glowIntensity = Number(params.glowIntensity || 1.3);
      const t = timeState.time * speed;
      ctx.fillStyle = "#020307";
      ctx.fillRect(0, 0, width, height);
      const cx = width * 0.5 + Math.sin(t * 0.4) * (width * 0.05);
      const cy = height * 0.4 + Math.sin(t * 1.4) * 12;
      const baseR = Math.min(width, height) * 0.23;
      const pulse = 1 + 0.22 * Math.sin(t * 2.8);
      const contraction = Math.max(0, -Math.sin(t * 2.8));
      ctx.save();
      ctx.translate(cx, cy);
      ctx.globalCompositeOperation = "screen";
      const baseHue = (185 + Math.sin(t * 0.6) * 25) % 360;
      for (let r = 0; r < BELL_RIBBONS; r++) {
        const normR = (r + 1) / BELL_RIBBONS;
        const ribbonR = baseR * normR;
        const domeH = ribbonR * 1.12 * pulse;
        const domeW = ribbonR * (1.22 / pulse);
        ctx.beginPath();
        const steps = 80;
        for (let i = 0; i <= steps; i++) {
          const phi = i / steps * Math.PI;
          const frill1 = Math.sin(phi * 8 + t * 3 + normR * 4) * (0.04 * normR);
          const frill2 = Math.cos(phi * 16 - t * 2) * (0.02 * normR);
          const scallop = Math.sin(phi * 8) * (8 * normR * pulse);
          const px = Math.cos(phi) * domeW * (1 + frill1 + frill2);
          const py = -Math.sin(phi) * domeH + scallop * (normR > 0.85 ? 1 : 0);
          if (i === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        const ribbonHue = (baseHue + normR * 35) % 360;
        const alpha = (0.08 + normR * 0.35 + contraction * 0.2) * glowIntensity;
        ctx.strokeStyle = hsla(ribbonHue, 95, 65 + normR * 15, alpha);
        ctx.lineWidth = normR > 0.9 ? 1.8 : 0.8;
        ctx.stroke();
      }
      for (let ring = 1; ring <= 12; ring++) {
        const normRing = ring / 12;
        const rw = baseR * 1.15 * normRing * (1 / pulse);
        const rh = baseR * 0.55 * normRing * pulse;
        const ry = -baseR * 0.9 * (1 - normRing) * pulse;
        ctx.beginPath();
        ctx.ellipse(0, ry, rw, rh, 0, 0, Math.PI * 2);
        ctx.strokeStyle = hsla((baseHue + 40) % 360, 90, 75, (0.12 + contraction * 0.25) * glowIntensity);
        ctx.lineWidth = 1;
        ctx.stroke();
      }
      for (let g = 0; g < 4; g++) {
        const gAngle = g / 4 * Math.PI * 2 + Math.PI * 0.25;
        const gDist = baseR * 0.42 * (1 / pulse);
        const gx = Math.cos(gAngle) * gDist;
        const gy = -baseR * 0.48 * pulse + Math.sin(gAngle) * (gDist * 0.5);
        ctx.save();
        ctx.translate(gx, gy);
        ctx.rotate(gAngle + Math.PI * 0.5);
        for (let h = 1; h <= 4; h++) {
          const hr = (4 + h * 3) * pulse;
          ctx.beginPath();
          ctx.arc(0, 0, hr, 0.2 * Math.PI, 1.8 * Math.PI);
          ctx.strokeStyle = hsla(325 + h * 8, 100, 75, (0.5 - h * 0.08) * glowIntensity);
          ctx.lineWidth = 1.4;
          ctx.stroke();
        }
        ctx.fillStyle = hsla(340, 100, 90, 0.95);
        ctx.beginPath();
        ctx.arc(0, 0, 3 * pulse, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
      for (let r = 0; r < 8; r++) {
        const rPhi = r / 8 * Math.PI;
        const rx = Math.cos(rPhi) * (baseR * 1.22 / pulse);
        const ry = Math.sin(rPhi * 8) * 8 * pulse;
        ctx.fillStyle = "#38bdf8";
        ctx.shadowColor = "#38bdf8";
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.arc(rx, ry, 2.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      }
      for (let a = 0; a < 32; a++) {
        const normA = a / 31;
        const armSide = (normA - 0.5) * 2;
        const armRootX = armSide * (baseR * 0.28);
        const armRootY = -baseR * 0.15;
        ctx.beginPath();
        ctx.moveTo(armRootX, armRootY);
        const armSteps = 45;
        const armLen = tentacleLength * 0.95;
        for (let s = 1; s <= armSteps; s++) {
          const ns = s / armSteps;
          const w1 = Math.sin(ns * 12 + t * 4 + a * 0.3) * (24 * ns * (1 + Math.abs(armSide)));
          const w2 = Math.cos(ns * 24 - t * 3 + a * 0.5) * (10 * ns);
          const w3 = Math.sin(t * 1.8 + ns * 6) * (32 * ns * armSide);
          const ax = armRootX + w1 + w2 + w3;
          const ay = armRootY + ns * armLen;
          ctx.lineTo(ax, ay);
        }
        const armHue = (baseHue + 50 + normA * 45) % 360;
        ctx.strokeStyle = hsla(armHue, 95, 78, 0.45 * glowIntensity);
        ctx.lineWidth = 1.1;
        ctx.stroke();
      }
      for (let k = 0; k < TENTACLES; k++) {
        const normK = k / (TENTACLES - 1);
        const phi = normK * Math.PI;
        const rootX = Math.cos(phi) * (baseR * 1.2 / pulse);
        const rootY = Math.sin(phi * 8) * 8 * pulse;
        ctx.beginPath();
        ctx.moveTo(rootX, rootY);
        for (let n = 1; n <= NODES_PER_TENTACLE; n++) {
          const normN = n / NODES_PER_TENTACLE;
          const dist = normN * tentacleLength * (1 + 0.2 * Math.sin(t * 1.8 + k * 0.2));
          const wave1 = Math.sin(t * 3.5 - normN * 8 + k * 0.35) * (26 * normN);
          const wave2 = Math.cos(t * 2 + normN * 14 - k * 0.2) * (12 * normN);
          const drift = Math.sin(t * 0.9) * (normN * 22);
          const tx = rootX + wave1 + wave2 + drift;
          const ty = rootY + dist;
          ctx.lineTo(tx, ty);
          if (n % 8 === 0 && k % 3 === 0) {
            ctx.fillStyle = hsla((baseHue + k * 4) % 360, 100, 88, 0.85 * glowIntensity);
            ctx.fillRect(tx - 1, ty - 1, 2.2, 2.2);
          }
        }
        const tentHue = (baseHue - 20 + normK * 50 + t * 15) % 360;
        const tentAlpha = (k % 4 === 0 ? 0.65 : 0.25) * glowIntensity;
        ctx.strokeStyle = hsla(tentHue, 95, 75, tentAlpha);
        ctx.lineWidth = k % 4 === 0 ? 1.4 : 0.7;
        ctx.stroke();
      }
      ctx.restore();
    }
  };
}

// Default parameters from content metadata
const defaultParams = [
  {
    "key": "pulseSpeed",
    "label": "Pulse Stroke Rate",
    "type": "range",
    "min": 0.5,
    "max": 2.5,
    "step": 0.1,
    "defaultValue": 1.2,
    "description": "Swimming bell contraction velocity"
  },
  {
    "key": "tentacleLength",
    "label": "Tentacle Reach",
    "type": "range",
    "min": 80,
    "max": 260,
    "step": 10,
    "defaultValue": 160,
    "description": "Length of trailing cnidocyte tentacles"
  },
  {
    "key": "glowIntensity",
    "label": "Bioluminescent Glow",
    "type": "range",
    "min": 0.2,
    "max": 2,
    "step": 0.1,
    "defaultValue": 1,
    "description": "Luciferin photonic emission level"
  }
];

if (!window.__art_instances) window.__art_instances = {};
if (!window.__art_instances['bioluminescent-jellyfish']) {
  const inst = typeof createBioluminescentJellyfish === 'function' ? createBioluminescentJellyfish() : null;
  if (inst && inst.setup) {
    inst.setup({ ctx, width, height, dpr: 1, aspectRatio: width / height }, defaultParams);
  }
  window.__art_instances['bioluminescent-jellyfish'] = inst;
}

const instance = window.__art_instances['bioluminescent-jellyfish'];
if (instance && instance.render) {
  instance.render(
    { ctx, width, height, dpr: 1, aspectRatio: width / height },
    { time, deltaTime: dt, frameCount: Math.floor(time * 60), fps: 60 },
    defaultParams
  );
}`,

  // 027. Mathematical Crab
  'mathematical-crab': `// 027 - Mathematical Crab (creatures)
// 1:1 Original algorithm engine source
function createMathematicalCrab() {
  return {
    setup() {
    },
    render(context, timeState, params) {
      const { ctx, width, height } = context;
      const speed = Number(params.gaitSpeed || 1.4);
      const clawPinch = Number(params.clawPinch || 1);
      const t = timeState.time * speed;
      ctx.fillStyle = "#020409";
      ctx.fillRect(0, 0, width, height);
      const cx = width * 0.5;
      const cy = height * 0.52;
      const crabScale = Math.min(width, height) / 520;
      const rotY = Math.sin(t * 0.5) * 0.25;
      const rotX = 0.55 + Math.sin(t * 0.7) * 0.12;
      const rotZ = Math.sin(t * 0.5) * 0.08;
      ctx.save();
      ctx.globalCompositeOperation = "screen";
      const baseHue = (20 + Math.sin(t * 0.6) * 15) % 360;
      ctx.beginPath();
      for (let gx = -300; gx <= 300; gx += 60) {
        const p1 = project3D(gx * crabScale, 110 * crabScale, -300 * crabScale, rotX, rotY, rotZ, cx, cy, 450, 520);
        const p2 = project3D(gx * crabScale, 110 * crabScale, 300 * crabScale, rotX, rotY, rotZ, cx, cy, 450, 520);
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
      }
      for (let gz = -300; gz <= 300; gz += 60) {
        const p1 = project3D(-300 * crabScale, 110 * crabScale, gz * crabScale, rotX, rotY, rotZ, cx, cy, 450, 520);
        const p2 = project3D(300 * crabScale, 110 * crabScale, gz * crabScale, rotX, rotY, rotZ, cx, cy, 450, 520);
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
      }
      ctx.strokeStyle = "rgba(56, 189, 248, 0.12)";
      ctx.lineWidth = 1;
      ctx.stroke();
      for (let side = -1; side <= 1; side += 2) {
        for (let leg = 0; leg < 4; leg++) {
          const legPhase = t * 4 + leg * 0.85 + (side === 1 ? Math.PI : 0);
          const baseAngle = side * 0.35 + (leg - 1.5) * 0.25;
          const coxaX = side * (Math.cos(baseAngle) * 55 * crabScale);
          const coxaY = 0;
          const coxaZ = (leg - 1.5) * (26 * crabScale);
          const kneeLift = Math.sin(legPhase) * (22 * crabScale);
          const kneeReach = Math.cos(legPhase) * (26 * crabScale);
          const merusX = coxaX + side * ((52 + leg * 6) * crabScale) + kneeReach;
          const merusY = coxaY - (38 - leg * 4) * crabScale + kneeLift;
          const merusZ = coxaZ + (leg - 1.5) * (14 * crabScale);
          const carpusX = merusX + side * ((32 + leg * 4) * crabScale);
          const carpusY = merusY + (22 + leg * 3) * crabScale;
          const carpusZ = merusZ + 10 * crabScale;
          const dactylX = carpusX + side * (24 * crabScale);
          const dactylY = 110 * crabScale;
          const dactylZ = carpusZ + 15 * crabScale;
          const p1 = project3D(coxaX, coxaY, coxaZ, rotX, rotY, rotZ, cx, cy, 450, 520);
          const p2 = project3D(merusX, merusY, merusZ, rotX, rotY, rotZ, cx, cy, 450, 520);
          const p3 = project3D(carpusX, carpusY, carpusZ, rotX, rotY, rotZ, cx, cy, 450, 520);
          const p4 = project3D(dactylX, dactylY, dactylZ, rotX, rotY, rotZ, cx, cy, 450, 520);
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.lineTo(p3.x, p3.y);
          ctx.lineTo(p4.x, p4.y);
          const legHue = (baseHue + leg * 8) % 360;
          ctx.strokeStyle = hsla(legHue, 90, 65, 0.75 * p2.depth);
          ctx.lineWidth = Math.max(0.8, 2.8 * p2.depth);
          ctx.stroke();
          ctx.fillStyle = hsla(legHue + 20, 95, 80, 0.95);
          ctx.beginPath();
          ctx.arc(p2.x, p2.y, 3.2 * p2.depth, 0, Math.PI * 2);
          ctx.arc(p3.x, p3.y, 2.6 * p3.depth, 0, Math.PI * 2);
          ctx.arc(p4.x, p4.y, 2 * p4.depth, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      for (let ring = 1; ring <= 10; ring++) {
        const normR = ring / 10;
        const curW = 75 * normR * crabScale;
        const curZ = 52 * normR * crabScale;
        const curY = -Math.sin(normR * Math.PI * 0.5) * (24 * crabScale);
        ctx.beginPath();
        const steps = 40;
        let avgDepth = 0;
        for (let i = 0; i <= steps; i++) {
          const theta = i / steps * Math.PI * 2;
          const rx = Math.cos(theta) * curW;
          const rz = Math.sin(theta) * curZ;
          const p = project3D(rx, curY, rz, rotX, rotY, rotZ, cx, cy, 450, 520);
          avgDepth += p.depth;
          if (i === 0) ctx.moveTo(p.x, p.y);
          else ctx.lineTo(p.x, p.y);
        }
        avgDepth /= steps + 1;
        ctx.strokeStyle = hsla(baseHue, 95, 68, (0.08 + normR * 0.3) * avgDepth);
        ctx.lineWidth = Math.max(0.8, (ring === 10 ? 2.2 : 1) * avgDepth);
        ctx.stroke();
      }
      for (let side = -1; side <= 1; side += 2) {
        const armBaseX = side * 50 * crabScale;
        const armBaseY = -5 * crabScale;
        const armBaseZ = -35 * crabScale;
        const merusX = armBaseX + side * (42 * crabScale);
        const merusY = armBaseY - 30 * crabScale;
        const merusZ = armBaseZ - 45 * crabScale;
        const clawX = merusX + side * (25 * crabScale);
        const clawY = merusY - 10 * crabScale;
        const clawZ = merusZ - 35 * crabScale;
        const pBase = project3D(armBaseX, armBaseY, armBaseZ, rotX, rotY, rotZ, cx, cy, 450, 520);
        const pMerus = project3D(merusX, merusY, merusZ, rotX, rotY, rotZ, cx, cy, 450, 520);
        const pClaw = project3D(clawX, clawY, clawZ, rotX, rotY, rotZ, cx, cy, 450, 520);
        ctx.beginPath();
        ctx.moveTo(pBase.x, pBase.y);
        ctx.lineTo(pMerus.x, pMerus.y);
        ctx.lineTo(pClaw.x, pClaw.y);
        ctx.strokeStyle = hsla(baseHue - 10, 95, 70, 0.85 * pClaw.depth);
        ctx.lineWidth = Math.max(1.2, 4.5 * pClaw.depth);
        ctx.stroke();
        const pinch = (0.35 + 0.25 * Math.sin(t * 3 + side)) * clawPinch;
        const pDactylTip = project3D(clawX + side * 15 * crabScale, clawY - 18 * pinch * crabScale, clawZ - 25 * crabScale, rotX, rotY, rotZ, cx, cy, 450, 520);
        const pPollexTip = project3D(clawX + side * 15 * crabScale, clawY + 18 * pinch * crabScale, clawZ - 25 * crabScale, rotX, rotY, rotZ, cx, cy, 450, 520);
        ctx.beginPath();
        ctx.moveTo(pClaw.x, pClaw.y);
        ctx.lineTo(pDactylTip.x, pDactylTip.y);
        ctx.moveTo(pClaw.x, pClaw.y);
        ctx.lineTo(pPollexTip.x, pPollexTip.y);
        ctx.strokeStyle = hsla(baseHue - 15, 100, 75, 0.95);
        ctx.lineWidth = Math.max(1, 3.2 * pClaw.depth);
        ctx.stroke();
      }
      ctx.restore();
    }
  };
}

// Default parameters from content metadata
const defaultParams = [
  {
    "key": "gaitSpeed",
    "label": "Gait Crawl Speed",
    "type": "range",
    "min": 0.5,
    "max": 3,
    "step": 0.1,
    "defaultValue": 1.4,
    "description": "Sideways walking cycle frequency"
  },
  {
    "key": "clawPinch",
    "label": "Claw Pinch Aperture",
    "type": "range",
    "min": 0.2,
    "max": 2,
    "step": 0.1,
    "defaultValue": 1,
    "description": "Chela finger opening amplitude"
  }
];

if (!window.__art_instances) window.__art_instances = {};
if (!window.__art_instances['mathematical-crab']) {
  const inst = typeof createMathematicalCrab === 'function' ? createMathematicalCrab() : null;
  if (inst && inst.setup) {
    inst.setup({ ctx, width, height, dpr: 1, aspectRatio: width / height }, defaultParams);
  }
  window.__art_instances['mathematical-crab'] = inst;
}

const instance = window.__art_instances['mathematical-crab'];
if (instance && instance.render) {
  instance.render(
    { ctx, width, height, dpr: 1, aspectRatio: width / height },
    { time, deltaTime: dt, frameCount: Math.floor(time * 60), fps: 60 },
    defaultParams
  );
}`,

  // 028. Deep Sea Prawn
  'deep-sea-prawn': `// 028 - Deep Sea Prawn (creatures)
// 1:1 Original algorithm engine source
function createDeepSeaPrawn() {
  return {
    setup() {
    },
    render(context, timeState, params) {
      const { ctx, width, height } = context;
      const speed = Number(params.swimSpeed || 1.3);
      const antennaLength = Number(params.antennaLength || 200);
      const t = timeState.time * speed;
      ctx.fillStyle = "#04060b";
      ctx.fillRect(0, 0, width, height);
      const cx = width * 0.48 + Math.cos(t * 0.7) * (width * 0.06);
      const cy = height * 0.48 + Math.sin(t * 1.2) * (height * 0.05);
      const prawnScale = Math.min(width, height) / 500;
      for (let side = -1; side <= 1; side += 2) {
        ctx.beginPath();
        const antRootX = cx - 35 * prawnScale;
        const antRootY = cy - 25 * prawnScale + side * 4;
        ctx.moveTo(antRootX, antRootY);
        const antSteps = 36;
        for (let i = 1; i <= antSteps; i++) {
          const normI = i / antSteps;
          const antX = antRootX - normI * antennaLength * prawnScale;
          const antWave = Math.sin(t * 3 - normI * 5 + side) * (20 * normI * prawnScale);
          const antY = antRootY - Math.pow(normI, 1.4) * (75 * prawnScale) + side * (normI * 38 * prawnScale) + antWave;
          ctx.lineTo(antX, antY);
        }
        ctx.strokeStyle = hsla(14, 95, 72, 0.85);
        ctx.lineWidth = 1.3;
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(antRootX, antRootY);
        ctx.lineTo(antRootX - 35 * prawnScale, antRootY - 14 * prawnScale);
        ctx.strokeStyle = "rgba(251, 146, 60, 0.6)";
        ctx.lineWidth = 2 * prawnScale;
        ctx.stroke();
      }
      const SEGMENTS = 6;
      let prevSegX = cx;
      let prevSegY = cy;
      for (let s = 0; s < SEGMENTS; s++) {
        const segmentArchAngle = 0.35 + Math.sin(t * 2) * 0.15;
        const segDist = 24 * prawnScale;
        const segX = prevSegX + Math.cos(segmentArchAngle * s * 0.4) * segDist;
        const segY = prevSegY + Math.sin(segmentArchAngle * s * 0.4) * segDist * 0.9;
        ctx.save();
        ctx.translate((prevSegX + segX) / 2, (prevSegY + segY) / 2);
        ctx.rotate(segmentArchAngle * s * 0.35);
        const segW = (28 - s * 2.8) * prawnScale;
        const segH = (34 - s * 3.5) * prawnScale;
        ctx.beginPath();
        ctx.ellipse(0, 0, segW, segH, 0.2, 0, Math.PI * 2);
        const somiteGrad = ctx.createRadialGradient(0, -segH * 0.3, 2, 0, 0, segW);
        somiteGrad.addColorStop(0, hsla(12 + s * 4, 92, 55, 0.9));
        somiteGrad.addColorStop(1, hsla(6 + s * 4, 90, 42, 0.9));
        ctx.fillStyle = somiteGrad;
        ctx.fill();
        ctx.strokeStyle = hsla(24 + s * 4, 95, 75, 0.9);
        ctx.lineWidth = 1.8;
        ctx.stroke();
        const paddlePhase = t * 6 - s * 0.8;
        const paddleAngle = Math.sin(paddlePhase) * 0.6 + 0.45;
        const padLen = 22 * prawnScale;
        const pad1X = Math.cos(paddleAngle) * padLen;
        const pad1Y = Math.sin(paddleAngle) * padLen;
        ctx.beginPath();
        ctx.moveTo(0, segH * 0.45);
        ctx.lineTo(pad1X, segH * 0.45 + pad1Y);
        ctx.strokeStyle = hsla(16, 95, 75, 0.85);
        ctx.lineWidth = 2.2 * prawnScale;
        ctx.stroke();
        const pad2X = Math.cos(paddleAngle + 0.25) * (padLen * 0.85);
        const pad2Y = Math.sin(paddleAngle + 0.25) * (padLen * 0.85);
        ctx.beginPath();
        ctx.moveTo(0, segH * 0.45);
        ctx.lineTo(pad2X, segH * 0.45 + pad2Y);
        ctx.strokeStyle = hsla(22, 95, 70, 0.7);
        ctx.lineWidth = 1.6 * prawnScale;
        ctx.stroke();
        ctx.restore();
        prevSegX = segX;
        prevSegY = segY;
      }
      ctx.save();
      ctx.translate(prevSegX, prevSegY);
      ctx.rotate(0.6 + Math.sin(t * 2) * 0.15);
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(38 * prawnScale, 0);
      ctx.strokeStyle = hsla(12, 100, 75, 0.95);
      ctx.lineWidth = 2.4 * prawnScale;
      ctx.stroke();
      for (let f = -2; f <= 2; f++) {
        if (f === 0) continue;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        const fanAngle = f * 0.28;
        const fanLen = 34 * prawnScale;
        ctx.lineTo(Math.cos(fanAngle) * fanLen, Math.sin(fanAngle) * fanLen);
        ctx.strokeStyle = hsla(18 + Math.abs(f) * 6, 95, 70, 0.9);
        ctx.lineWidth = 2.8 * prawnScale;
        ctx.stroke();
      }
      ctx.restore();
      ctx.save();
      ctx.translate(cx, cy);
      ctx.beginPath();
      ctx.ellipse(-15 * prawnScale, -5 * prawnScale, 40 * prawnScale, 30 * prawnScale, -0.15, 0, Math.PI * 2);
      ctx.fillStyle = hsla(8, 92, 48, 0.95);
      ctx.fill();
      ctx.strokeStyle = hsla(25, 95, 72, 0.95);
      ctx.lineWidth = 2.4;
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(-45 * prawnScale, -14 * prawnScale);
      ctx.lineTo(-105 * prawnScale, -32 * prawnScale);
      ctx.lineTo(-45 * prawnScale, -2 * prawnScale);
      ctx.fillStyle = hsla(10, 95, 55, 0.95);
      ctx.fill();
      ctx.strokeStyle = hsla(28, 100, 78, 0.95);
      ctx.lineWidth = 2;
      ctx.stroke();
      for (let tooth = 1; tooth <= 6; tooth++) {
        const normT = tooth / 7;
        const tx = (-48 - normT * 50) * prawnScale;
        const ty = (-15 - normT * 15) * prawnScale;
        ctx.beginPath();
        ctx.moveTo(tx, ty);
        ctx.lineTo(tx + 2, ty - 6 * prawnScale);
        ctx.strokeStyle = "#fef08a";
        ctx.lineWidth = 1.6;
        ctx.stroke();
      }
      ctx.fillStyle = "#05070d";
      ctx.beginPath();
      ctx.arc(-38 * prawnScale, -18 * prawnScale, 5.5 * prawnScale, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = "#38bdf8";
      ctx.lineWidth = 1.6;
      ctx.stroke();
      for (let p = 0; p < 5; p++) {
        const legAngle = -0.4 + p * 0.22 + Math.sin(t * 3 + p) * 0.15;
        const legBaseX = (-28 + p * 9) * prawnScale;
        const legBaseY = 20 * prawnScale;
        const legKneeX = legBaseX + Math.cos(legAngle) * (22 * prawnScale);
        const legKneeY = legBaseY + Math.sin(legAngle) * (26 * prawnScale);
        const legTipX = legKneeX + 14 * prawnScale;
        const legTipY = legKneeY + 22 * prawnScale;
        ctx.beginPath();
        ctx.moveTo(legBaseX, legBaseY);
        ctx.lineTo(legKneeX, legKneeY);
        ctx.lineTo(legTipX, legTipY);
        ctx.strokeStyle = hsla(18, 92, 65, 0.85);
        ctx.lineWidth = 2 * prawnScale;
        ctx.stroke();
      }
      ctx.restore();
    }
  };
}

// Default parameters from content metadata
const defaultParams = [
  {
    "key": "swimSpeed",
    "label": "Swimming Frequency",
    "type": "range",
    "min": 0.5,
    "max": 2.5,
    "step": 0.1,
    "defaultValue": 1.3,
    "description": "Pleopod metachronal beat speed"
  },
  {
    "key": "antennaLength",
    "label": "Antenna Span",
    "type": "range",
    "min": 100,
    "max": 320,
    "step": 20,
    "defaultValue": 200,
    "description": "Sensory whip extension length"
  }
];

if (!window.__art_instances) window.__art_instances = {};
if (!window.__art_instances['deep-sea-prawn']) {
  const inst = typeof createDeepSeaPrawn === 'function' ? createDeepSeaPrawn() : null;
  if (inst && inst.setup) {
    inst.setup({ ctx, width, height, dpr: 1, aspectRatio: width / height }, defaultParams);
  }
  window.__art_instances['deep-sea-prawn'] = inst;
}

const instance = window.__art_instances['deep-sea-prawn'];
if (instance && instance.render) {
  instance.render(
    { ctx, width, height, dpr: 1, aspectRatio: width / height },
    { time, deltaTime: dt, frameCount: Math.floor(time * 60), fps: 60 },
    defaultParams
  );
}`,

  // 029. Manta Ray Glide
  'manta-ray-glide': `// 029 - Manta Ray Glide (creatures)
// 1:1 Original algorithm engine source
function createMantaRayGlide() {
  const WING_RIBBONS = 36;
  const TAIL_NODES = 45;
  return {
    setup() {
    },
    render(context, timeState, params) {
      const { ctx, width, height } = context;
      const speed = Number(params.glideSpeed || 1.1);
      const wingSpan = Number(params.wingSpan || 190);
      const t = timeState.time * speed;
      ctx.fillStyle = "#020409";
      ctx.fillRect(0, 0, width, height);
      const cx = width * 0.5;
      const cy = height * 0.48;
      const rotY = Math.sin(t * 0.6) * 0.35;
      const rotX = 0.45 + Math.sin(t * 0.8) * 0.22;
      const rotZ = Math.sin(t * 0.6) * 0.25;
      ctx.save();
      ctx.globalCompositeOperation = "screen";
      const baseHue = (200 + Math.sin(t * 0.7) * 20) % 360;
      for (let r = 0; r < WING_RIBBONS; r++) {
        const normR = (r + 1) / WING_RIBBONS;
        const curSpan = wingSpan * normR;
        const wingFlap = Math.sin(t * 2.8 - normR * 1.6) * (36 * Math.pow(normR, 1.4));
        const wingCurl = Math.cos(t * 2.8 - normR * 1.6) * (20 * normR);
        const steps = 50;
        ctx.beginPath();
        let avgDepth = 0;
        for (let i = 0; i <= steps; i++) {
          const u = i / steps;
          const angle = u * Math.PI * 2;
          const rawX = Math.sin(angle) * curSpan;
          const rawY = -Math.cos(angle) * (65 * normR) + Math.abs(rawX) / curSpan * 25 * normR;
          const rawZ = Math.abs(rawX) / curSpan * wingFlap + rawY / 65 * wingCurl;
          const p = project3D(rawX, rawY, rawZ, rotX, rotY, rotZ, cx, cy, 460, 520);
          avgDepth += p.depth;
          if (i === 0) ctx.moveTo(p.x, p.y);
          else ctx.lineTo(p.x, p.y);
        }
        avgDepth /= steps + 1;
        const ribbonHue = (baseHue + normR * 32) % 360;
        const alpha = (0.05 + normR * 0.32) * avgDepth;
        ctx.strokeStyle = hsla(ribbonHue, 95, 68, alpha);
        ctx.lineWidth = Math.max(0.8, (normR > 0.88 ? 1.8 : 0.9) * avgDepth);
        ctx.stroke();
        if (r % 5 === 0) {
          ctx.fillStyle = hsla(ribbonHue, 90, 50, 0.035 * avgDepth);
          ctx.fill();
        }
      }
      for (let s = -1; s <= 1; s += 2) {
        for (let h = 0; h < 6; h++) {
          const normH = h / 5;
          ctx.beginPath();
          const hornSteps = 12;
          for (let st = 0; st <= hornSteps; st++) {
            const nst = st / hornSteps;
            const hx = s * (12 + normH * 10 + nst * 14);
            const hy = -50 - nst * 30;
            const hz = Math.sin(t * 3.5 + normH * 2 + s + nst * 3) * (8 * nst);
            const p = project3D(hx, hy, hz, rotX, rotY, rotZ, cx, cy, 460, 520);
            if (st === 0) ctx.moveTo(p.x, p.y);
            else ctx.lineTo(p.x, p.y);
          }
          ctx.strokeStyle = hsla((baseHue + 40) % 360, 95, 75, 0.5);
          ctx.lineWidth = 1.2;
          ctx.stroke();
        }
      }
      ctx.beginPath();
      const tailLen = 185;
      for (let n = 0; n <= TAIL_NODES; n++) {
        const normN = n / TAIL_NODES;
        const tx = Math.sin(t * 3.2 - normN * 5) * (26 * normN);
        const ty = 65 + normN * tailLen;
        const tz = Math.cos(t * 2.5 - normN * 6) * (32 * normN);
        const p = project3D(tx, ty, tz, rotX, rotY, rotZ, cx, cy, 460, 520);
        if (n === 0) ctx.moveTo(p.x, p.y);
        else ctx.lineTo(p.x, p.y);
      }
      ctx.strokeStyle = hsla((baseHue + 20) % 360, 95, 80, 0.85);
      ctx.lineWidth = 1.6;
      ctx.stroke();
      ctx.restore();
    }
  };
}

// Default parameters from content metadata
const defaultParams = [
  {
    "key": "glideSpeed",
    "label": "Gliding Rhythm",
    "type": "range",
    "min": 0.4,
    "max": 2.2,
    "step": 0.1,
    "defaultValue": 1.1,
    "description": "Wing flap oscillation cycle"
  },
  {
    "key": "wingSpan",
    "label": "Pectoral Wingspan",
    "type": "range",
    "min": 100,
    "max": 240,
    "step": 10,
    "defaultValue": 180,
    "description": "Hydrodynamic wing tip reach"
  }
];

if (!window.__art_instances) window.__art_instances = {};
if (!window.__art_instances['manta-ray-glide']) {
  const inst = typeof createMantaRayGlide === 'function' ? createMantaRayGlide() : null;
  if (inst && inst.setup) {
    inst.setup({ ctx, width, height, dpr: 1, aspectRatio: width / height }, defaultParams);
  }
  window.__art_instances['manta-ray-glide'] = inst;
}

const instance = window.__art_instances['manta-ray-glide'];
if (instance && instance.render) {
  instance.render(
    { ctx, width, height, dpr: 1, aspectRatio: width / height },
    { time, deltaTime: dt, frameCount: Math.floor(time * 60), fps: 60 },
    defaultParams
  );
}`,

  // 030. Nautilus Shell Spiral
  'nautilus-spiral': `// 030 - Nautilus Shell Spiral (creatures)
// 1:1 Original algorithm engine source
function createNautilusSpiral() {
  const SPIRAL_STRANDS = 32;
  const CHAMBERS = 24;
  return {
    setup() {
    },
    render(context, timeState, params) {
      const { ctx, width, height } = context;
      const speed = Number(params.growthRate || 0.8);
      const chambersCount = Number(params.chamberCount || 20);
      const t = timeState.time * speed;
      ctx.fillStyle = "#020307";
      ctx.fillRect(0, 0, width, height);
      const cx = width * 0.5;
      const cy = height * 0.5;
      const scale = Math.min(width, height) * 0.38;
      const rotY = t * 0.4;
      const rotX = 0.45 + Math.sin(t * 0.3) * 0.25;
      const rotZ = Math.sin(t * 0.2) * 0.15;
      ctx.save();
      ctx.globalCompositeOperation = "screen";
      const baseHue = (25 + Math.sin(t * 0.5) * 20) % 360;
      const b = 0.175;
      const maxTheta = Math.PI * 4.4;
      for (let s = 0; s < SPIRAL_STRANDS; s++) {
        const normS = (s + 1) / SPIRAL_STRANDS;
        const a = scale * 0.035 * (0.4 + normS * 0.75);
        ctx.beginPath();
        const steps = 120;
        let avgDepth = 0;
        for (let i = 0; i <= steps; i++) {
          const theta = i / steps * maxTheta;
          const r = a * Math.exp(b * theta);
          const rawX = r * Math.cos(theta);
          const rawY = r * Math.sin(theta);
          const rawZ = (theta / maxTheta - 0.5) * (scale * 0.4) * (1 - normS * 0.3);
          const p = project3D(rawX, rawY, rawZ, rotX, rotY, rotZ, cx, cy, 450, 520);
          avgDepth += p.depth;
          if (i === 0) ctx.moveTo(p.x, p.y);
          else ctx.lineTo(p.x, p.y);
        }
        avgDepth /= steps + 1;
        const strandHue = (baseHue + normS * 35) % 360;
        const alpha = (0.05 + normS * 0.3) * avgDepth;
        ctx.strokeStyle = hsla(strandHue, 95, 72, alpha);
        ctx.lineWidth = Math.max(0.7, (normS > 0.88 ? 1.6 : 0.8) * avgDepth);
        ctx.stroke();
      }
      for (let c = 1; c <= CHAMBERS; c++) {
        if (c > chambersCount) break;
        const normC = c / CHAMBERS;
        const thetaC = normC * maxTheta;
        const rOuter = scale * 0.035 * 1.15 * Math.exp(b * thetaC);
        const rInner = scale * 0.035 * 1.15 * Math.exp(b * (thetaC - Math.PI * 2));
        const zOuter = (thetaC / maxTheta - 0.5) * (scale * 0.4);
        const zInner = ((thetaC - Math.PI * 2) / maxTheta - 0.5) * (scale * 0.4);
        const p1 = project3D(
          rOuter * Math.cos(thetaC),
          rOuter * Math.sin(thetaC),
          zOuter,
          rotX,
          rotY,
          rotZ,
          cx,
          cy,
          450,
          520
        );
        const p2 = project3D(
          Math.max(0, rInner) * Math.cos(thetaC - Math.PI * 2),
          Math.max(0, rInner) * Math.sin(thetaC - Math.PI * 2),
          zInner,
          rotX,
          rotY,
          rotZ,
          cx,
          cy,
          450,
          520
        );
        ctx.beginPath();
        ctx.moveTo(p2.x, p2.y);
        ctx.lineTo(p1.x, p1.y);
        ctx.strokeStyle = hsla(190, 100, 80, 0.4 * p1.depth);
        ctx.lineWidth = Math.max(0.8, 1.2 * p1.depth);
        ctx.stroke();
      }
      ctx.beginPath();
      for (let i = 0; i <= 80; i++) {
        const theta = i / 80 * maxTheta;
        const r = scale * 0.035 * 0.65 * Math.exp(b * theta);
        const rawX = r * Math.cos(theta);
        const rawY = r * Math.sin(theta);
        const rawZ = (theta / maxTheta - 0.5) * (scale * 0.4) * 0.8;
        const p = project3D(rawX, rawY, rawZ, rotX, rotY, rotZ, cx, cy, 450, 520);
        if (i === 0) ctx.moveTo(p.x, p.y);
        else ctx.lineTo(p.x, p.y);
      }
      ctx.strokeStyle = "#38bdf8";
      ctx.shadowColor = "#38bdf8";
      ctx.shadowBlur = 10;
      ctx.lineWidth = 1.6;
      ctx.stroke();
      ctx.shadowBlur = 0;
      ctx.restore();
    }
  };
}

// Default parameters from content metadata
const defaultParams = [
  {
    "key": "spinSpeed",
    "label": "Iridescent Rotation",
    "type": "range",
    "min": 0.1,
    "max": 1.5,
    "step": 0.05,
    "defaultValue": 0.4,
    "description": "Shell rotation speed"
  },
  {
    "key": "chamberCount",
    "label": "Septa Chambers",
    "type": "range",
    "min": 12,
    "max": 48,
    "step": 2,
    "defaultValue": 36,
    "description": "Number of internal camera walls"
  }
];

if (!window.__art_instances) window.__art_instances = {};
if (!window.__art_instances['nautilus-spiral']) {
  const inst = typeof createNautilusSpiral === 'function' ? createNautilusSpiral() : null;
  if (inst && inst.setup) {
    inst.setup({ ctx, width, height, dpr: 1, aspectRatio: width / height }, defaultParams);
  }
  window.__art_instances['nautilus-spiral'] = inst;
}

const instance = window.__art_instances['nautilus-spiral'];
if (instance && instance.render) {
  instance.render(
    { ctx, width, height, dpr: 1, aspectRatio: width / height },
    { time, deltaTime: dt, frameCount: Math.floor(time * 60), fps: 60 },
    defaultParams
  );
}`,

  // 031. L-System Fractal Tree
  'fractal-tree': `// 031 - L-System Fractal Tree (botany)
// 1:1 Original algorithm engine source
function createFractalTree() {
  function drawBranch(ctx, x, y, length, angle, depth, branchRatio, wind, time) {
    if (depth <= 0) {
      const leafHue = (110 + Math.sin(time + x * 0.01) * 30) % 360;
      ctx.fillStyle = hsla(leafHue, 85, 60, 0.85);
      ctx.beginPath();
      ctx.arc(x, y, 3.5, 0, Math.PI * 2);
      ctx.fill();
      return;
    }
    const endX = x + Math.cos(angle) * length;
    const endY = y + Math.sin(angle) * length;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(endX, endY);
    const branchHue = depth > 5 ? 30 : 90 + depth * 8;
    ctx.strokeStyle = hsla(branchHue, 75, depth > 5 ? 35 : 55, 0.9);
    ctx.lineWidth = Math.max(1, depth * 1.5);
    ctx.stroke();
    const branchAngle = 0.42 + wind * 0.15;
    const nextLen = length * branchRatio;
    drawBranch(ctx, endX, endY, nextLen, angle - branchAngle + wind * 0.08, depth - 1, branchRatio, wind, time);
    drawBranch(ctx, endX, endY, nextLen, angle + branchAngle + wind * 0.08, depth - 1, branchRatio, wind, time);
  }
  return {
    setup() {
    },
    render(context, timeState, params) {
      const { ctx, width, height } = context;
      const depth = Math.min(9, Number(params.branchDepth || 8));
      const branchRatio = Number(params.branchRatio || 0.72);
      const windSpeed = Number(params.windSpeed || 1.2);
      const t = timeState.time * windSpeed;
      ctx.fillStyle = "#06090c";
      ctx.fillRect(0, 0, width, height);
      const trunkX = width * 0.5;
      const trunkY = height * 0.92;
      const trunkLength = height * 0.22;
      const wind = Math.sin(t * 1.8) * 0.35 + Math.sin(t * 0.7) * 0.2;
      drawBranch(ctx, trunkX, trunkY, trunkLength, -Math.PI / 2, depth, branchRatio, wind, t);
    }
  };
}

// Default parameters from content metadata
const defaultParams = [
  {
    "key": "branchDepth",
    "label": "Recursion Depth",
    "type": "range",
    "min": 4,
    "max": 9,
    "step": 1,
    "defaultValue": 8,
    "description": "Branching recursion levels"
  },
  {
    "key": "branchRatio",
    "label": "Branch Length Ratio",
    "type": "range",
    "min": 0.55,
    "max": 0.85,
    "step": 0.02,
    "defaultValue": 0.72,
    "description": "Child branch scaling factor"
  },
  {
    "key": "windSpeed",
    "label": "Wind Gust Turbulence",
    "type": "range",
    "min": 0.2,
    "max": 2.5,
    "step": 0.1,
    "defaultValue": 1.2,
    "description": "Harmonic wind velocity"
  }
];

if (!window.__art_instances) window.__art_instances = {};
if (!window.__art_instances['fractal-tree']) {
  const inst = typeof createFractalTree === 'function' ? createFractalTree() : null;
  if (inst && inst.setup) {
    inst.setup({ ctx, width, height, dpr: 1, aspectRatio: width / height }, defaultParams);
  }
  window.__art_instances['fractal-tree'] = inst;
}

const instance = window.__art_instances['fractal-tree'];
if (instance && instance.render) {
  instance.render(
    { ctx, width, height, dpr: 1, aspectRatio: width / height },
    { time, deltaTime: dt, frameCount: Math.floor(time * 60), fps: 60 },
    defaultParams
  );
}`,

  // 032. Barnsley Fern
  'barnsley-fern': `// 032 - Barnsley Fern (botany)
// 1:1 Original algorithm engine source
function createBarnsleyFern() {
  const SAMPLES_PER_FRAME = 3500;
  return {
    setup() {
    },
    render(context, timeState, params) {
      const { ctx, width, height } = context;
      const speed = Number(params.swaySpeed || 0.6);
      const t = timeState.time * speed;
      ctx.fillStyle = "rgba(6, 9, 10, 0.2)";
      ctx.fillRect(0, 0, width, height);
      let x = 0;
      let y = 0;
      const scale = Math.min(width, height) * 0.088;
      const cx = width * 0.5 + Math.sin(t * 1.2) * 12;
      const cy = height * 0.95;
      const sway = Math.sin(t * 1.5) * 0.04;
      for (let i = 0; i < SAMPLES_PER_FRAME; i++) {
        const r = Math.random();
        let nextX = 0;
        let nextY = 0;
        if (r < 0.01) {
          nextX = 0;
          nextY = 0.16 * y;
        } else if (r < 0.86) {
          nextX = 0.85 * x + (0.04 + sway) * y;
          nextY = -0.04 * x + 0.85 * y + 1.6;
        } else if (r < 0.93) {
          nextX = 0.2 * x - 0.26 * y;
          nextY = 0.23 * x + 0.22 * y + 1.6;
        } else {
          nextX = -0.15 * x + 0.28 * y;
          nextY = 0.26 * x + 0.24 * y + 0.44;
        }
        x = nextX;
        y = nextY;
        const px = cx + x * scale;
        const py = cy - y * scale;
        const hue = (115 + y / 10 * 45 + t * 10) % 360;
        ctx.fillStyle = hsla(hue, 90, 60, 0.7);
        ctx.fillRect(px, py, 1.2, 1.2);
      }
    }
  };
}

// Default parameters from content metadata
const defaultParams = [
  {
    "key": "swaySpeed",
    "label": "Stem Sway Speed",
    "type": "range",
    "min": 0.2,
    "max": 2,
    "step": 0.1,
    "defaultValue": 0.6,
    "description": "Harmonic leaf sway rate"
  }
];

if (!window.__art_instances) window.__art_instances = {};
if (!window.__art_instances['barnsley-fern']) {
  const inst = typeof createBarnsleyFern === 'function' ? createBarnsleyFern() : null;
  if (inst && inst.setup) {
    inst.setup({ ctx, width, height, dpr: 1, aspectRatio: width / height }, defaultParams);
  }
  window.__art_instances['barnsley-fern'] = inst;
}

const instance = window.__art_instances['barnsley-fern'];
if (instance && instance.render) {
  instance.render(
    { ctx, width, height, dpr: 1, aspectRatio: width / height },
    { time, deltaTime: dt, frameCount: Math.floor(time * 60), fps: 60 },
    defaultParams
  );
}`,

  // 033. Gerstner Ocean Waves
  'gerstner-ocean-waves': `// 033 - Gerstner Ocean Waves (botany)
// 1:1 Original algorithm engine source
function createGerstnerOceanWaves() {
  const WAVE_LINES = 32;
  const POINTS_PER_LINE = 160;
  return {
    setup() {
    },
    render(context, timeState, params) {
      const { ctx, width, height } = context;
      const speed = Number(params.waveSpeed || 1.2);
      const steepness = Number(params.steepness || 0.65);
      const t = timeState.time * speed;
      ctx.fillStyle = "#050a12";
      ctx.fillRect(0, 0, width, height);
      const waves = [
        { dx: 1, dy: 0.1, length: 140, amp: 26, s: 1 },
        { dx: 0.8, dy: 0.6, length: 85, amp: 14, s: 1.4 },
        { dx: 0.5, dy: -0.8, length: 50, amp: 8, s: 1.8 },
        { dx: -0.7, dy: 0.7, length: 30, amp: 4, s: 2.2 }
      ];
      for (let l = 0; l < WAVE_LINES; l++) {
        const normL = l / WAVE_LINES;
        const originY = height * 0.25 + normL * (height * 0.65);
        ctx.beginPath();
        for (let i = 0; i <= POINTS_PER_LINE; i++) {
          const normX = i / POINTS_PER_LINE;
          const x0 = normX * width;
          const y0 = originY;
          let displacedX = x0;
          let displacedY = y0;
          for (let w = 0; w < waves.length; w++) {
            const wv = waves[w];
            const k = 2 * Math.PI / wv.length;
            const wSpeed = Math.sqrt(9.8 * k) * wv.s;
            const phase = k * (wv.dx * x0 + wv.dy * y0) - wSpeed * t;
            const q = steepness / (k * wv.amp * waves.length);
            displacedX -= wv.dx / k * (q * Math.sin(phase));
            displacedY -= wv.amp * Math.cos(phase);
          }
          if (i === 0) ctx.moveTo(displacedX, displacedY);
          else ctx.lineTo(displacedX, displacedY);
        }
        const hue = (195 + normL * 35) % 360;
        const lightness = 40 + (1 - normL) * 35;
        ctx.strokeStyle = hsla(hue, 90, lightness, 0.75);
        ctx.lineWidth = 1.6 - normL * 0.6;
        ctx.stroke();
      }
    }
  };
}

// Default parameters from content metadata
const defaultParams = [
  {
    "key": "waveSpeed",
    "label": "Wave Swell Velocity",
    "type": "range",
    "min": 0.4,
    "max": 3,
    "step": 0.1,
    "defaultValue": 1.2,
    "description": "Ocean current propagation rate"
  },
  {
    "key": "steepness",
    "label": "Trochoidal Steepness (Q)",
    "type": "range",
    "min": 0.2,
    "max": 1,
    "step": 0.05,
    "defaultValue": 0.65,
    "description": "Crest sharpness & horizontal pinching"
  }
];

if (!window.__art_instances) window.__art_instances = {};
if (!window.__art_instances['gerstner-ocean-waves']) {
  const inst = typeof createGerstnerOceanWaves === 'function' ? createGerstnerOceanWaves() : null;
  if (inst && inst.setup) {
    inst.setup({ ctx, width, height, dpr: 1, aspectRatio: width / height }, defaultParams);
  }
  window.__art_instances['gerstner-ocean-waves'] = inst;
}

const instance = window.__art_instances['gerstner-ocean-waves'];
if (instance && instance.render) {
  instance.render(
    { ctx, width, height, dpr: 1, aspectRatio: width / height },
    { time, deltaTime: dt, frameCount: Math.floor(time * 60), fps: 60 },
    defaultParams
  );
}`,

  // 034. Coral Polyp Growth
  'coral-polyp-growth': `// 034 - Coral Polyp Growth (botany)
// 1:1 Original algorithm engine source
function createCoralPolypGrowth() {
  const POLYP_COUNT = 8;
  const TENTACLES_PER_POLYP = 12;
  return {
    setup() {
    },
    render(context, timeState, params) {
      const { ctx, width, height } = context;
      const speed = Number(params.flowSpeed || 0.8);
      const bloomScale = Number(params.bloomScale || 1.1);
      const t = timeState.time * speed;
      ctx.fillStyle = "#06080e";
      ctx.fillRect(0, 0, width, height);
      const cx = width * 0.5;
      const cy = height * 0.52;
      const baseR = Math.min(width, height) * 0.28;
      ctx.beginPath();
      const ridgeSteps = 120;
      for (let i = 0; i <= ridgeSteps; i++) {
        const phi = i / ridgeSteps * Math.PI * 2;
        const bump = Math.sin(phi * 6 + t * 0.5) * 12 + Math.cos(phi * 12 - t) * 6;
        const r = (baseR * 0.6 + bump) * bloomScale;
        const px = cx + Math.cos(phi) * r;
        const py = cy + Math.sin(phi) * r;
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.closePath();
      ctx.fillStyle = hsla(330, 85, 45, 0.4);
      ctx.fill();
      ctx.strokeStyle = hsla(340, 95, 70, 0.8);
      ctx.lineWidth = 2.2;
      ctx.stroke();
      for (let p = 0; p < POLYP_COUNT; p++) {
        const polypAngle = p / POLYP_COUNT * Math.PI * 2 + t * 0.1;
        const polypDist = baseR * (0.8 + 0.15 * Math.sin(t * 1.5 + p));
        const px = cx + Math.cos(polypAngle) * polypDist;
        const py = cy + Math.sin(polypAngle) * polypDist;
        ctx.beginPath();
        ctx.arc(px, py, 6 * bloomScale, 0, Math.PI * 2);
        ctx.fillStyle = hsla(50, 95, 75, 0.95);
        ctx.fill();
        for (let k = 0; k < TENTACLES_PER_POLYP; k++) {
          const tentAngle = k / TENTACLES_PER_POLYP * Math.PI * 2;
          const tentLen = (28 + Math.sin(t * 3 + p + k) * 8) * bloomScale;
          ctx.beginPath();
          ctx.moveTo(px, py);
          const wavePhase = t * 4 + k * 0.5 + p;
          const ctrlX = px + Math.cos(tentAngle) * (tentLen * 0.5) + Math.sin(wavePhase) * 6;
          const ctrlY = py + Math.sin(tentAngle) * (tentLen * 0.5) + Math.cos(wavePhase) * 6;
          const endX = px + Math.cos(tentAngle) * tentLen;
          const endY = py + Math.sin(tentAngle) * tentLen;
          ctx.quadraticCurveTo(ctrlX, ctrlY, endX, endY);
          const tentHue = (320 + p * 15 + k * 4) % 360;
          ctx.strokeStyle = hsla(tentHue, 95, 72, 0.85);
          ctx.lineWidth = 1.4;
          ctx.stroke();
        }
      }
    }
  };
}

// Default parameters from content metadata
const defaultParams = [
  {
    "key": "flowSpeed",
    "label": "Tidal Wave Flow",
    "type": "range",
    "min": 0.3,
    "max": 2.5,
    "step": 0.1,
    "defaultValue": 0.8,
    "description": "Tentacle wave oscillation rate"
  },
  {
    "key": "bloomScale",
    "label": "Colony Expansion",
    "type": "range",
    "min": 0.6,
    "max": 1.6,
    "step": 0.1,
    "defaultValue": 1.1,
    "description": "Radial polyp size multiplier"
  }
];

if (!window.__art_instances) window.__art_instances = {};
if (!window.__art_instances['coral-polyp-growth']) {
  const inst = typeof createCoralPolypGrowth === 'function' ? createCoralPolypGrowth() : null;
  if (inst && inst.setup) {
    inst.setup({ ctx, width, height, dpr: 1, aspectRatio: width / height }, defaultParams);
  }
  window.__art_instances['coral-polyp-growth'] = inst;
}

const instance = window.__art_instances['coral-polyp-growth'];
if (instance && instance.render) {
  instance.render(
    { ctx, width, height, dpr: 1, aspectRatio: width / height },
    { time, deltaTime: dt, frameCount: Math.floor(time * 60), fps: 60 },
    defaultParams
  );
}`,

  // 035. Cardiac Pulse & ECG
  'cardiac-pulse': `// 035 - Cardiac Pulse & ECG (anatomy)
// 1:1 Original algorithm engine source
function createCardiacPulse() {
  const MAX_HISTORY = 300;
  const ecgHistory = new Float32Array(MAX_HISTORY);
  let historyIdx = 0;
  function ecgWaveform(phase) {
    const p = phase % 1;
    const pWave = 0.18 * Math.exp(-Math.pow((p - 0.2) / 0.04, 2));
    const qWave = -0.15 * Math.exp(-Math.pow((p - 0.36) / 0.015, 2));
    const rWave = 1 * Math.exp(-Math.pow((p - 0.4) / 0.02, 2));
    const sWave = -0.3 * Math.exp(-Math.pow((p - 0.44) / 0.018, 2));
    const tWave = 0.35 * Math.exp(-Math.pow((p - 0.65) / 0.07, 2));
    return pWave + qWave + rWave + sWave + tWave;
  }
  return {
    setup() {
      ecgHistory.fill(0);
      historyIdx = 0;
    },
    render(context, timeState, params) {
      const { ctx, width, height } = context;
      const bpm = Number(params.heartRateBPM || 72);
      const freq = bpm / 60;
      const t = timeState.time;
      const beatPhase = t * freq % 1;
      ctx.fillStyle = "#06070a";
      ctx.fillRect(0, 0, width, height);
      const cx = width * 0.5;
      const cy = height * 0.45;
      const heartScale = Math.min(width, height) / 480;
      const ecgVal = ecgWaveform(beatPhase);
      ecgHistory[historyIdx] = ecgVal;
      historyIdx = (historyIdx + 1) % MAX_HISTORY;
      const pulseSize = 1 + ecgVal * 0.22;
      ctx.save();
      ctx.translate(cx, cy);
      ctx.scale(heartScale * pulseSize, heartScale * pulseSize);
      ctx.beginPath();
      const heartSteps = 100;
      for (let i = 0; i <= heartSteps; i++) {
        const phi = i / heartSteps * Math.PI * 2;
        const hx = 16 * Math.pow(Math.sin(phi), 3) * 6;
        const hy = -(13 * Math.cos(phi) - 5 * Math.cos(2 * phi) - 2 * Math.cos(3 * phi) - Math.cos(4 * phi)) * 6;
        if (i === 0) ctx.moveTo(hx, hy);
        else ctx.lineTo(hx, hy);
      }
      ctx.closePath();
      const heartHue = 350;
      ctx.fillStyle = hsla(heartHue, 90, 45, 0.3 + ecgVal * 0.4);
      ctx.fill();
      ctx.strokeStyle = hsla(355, 95, 70, 0.9);
      ctx.lineWidth = 3;
      ctx.stroke();
      for (let side = -1; side <= 1; side += 2) {
        ctx.beginPath();
        ctx.moveTo(0, -90);
        ctx.bezierCurveTo(side * 45, -135, side * 75, -95, side * 50, -45);
        ctx.strokeStyle = hsla(15, 95, 65, 0.85);
        ctx.lineWidth = 4;
        ctx.stroke();
      }
      ctx.restore();
      const ecgY = height * 0.84;
      const traceW = width * 0.88;
      const startX = width * 0.06;
      ctx.beginPath();
      for (let i = 0; i < MAX_HISTORY; i++) {
        const sampleIdx = (historyIdx + i) % MAX_HISTORY;
        const px = startX + i / MAX_HISTORY * traceW;
        const py = ecgY - ecgHistory[sampleIdx] * 48;
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.strokeStyle = "#34d399";
      ctx.lineWidth = 2.2;
      ctx.shadowColor = "#34d399";
      ctx.shadowBlur = 12;
      ctx.stroke();
      ctx.shadowBlur = 0;
      ctx.strokeStyle = "rgba(52, 211, 153, 0.15)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(startX, ecgY);
      ctx.lineTo(startX + traceW, ecgY);
      ctx.stroke();
    }
  };
}

// Default parameters from content metadata
const defaultParams = [
  {
    "key": "heartRateBPM",
    "label": "Heart Rate (BPM)",
    "type": "range",
    "min": 40,
    "max": 160,
    "step": 2,
    "defaultValue": 72,
    "description": "Beats per minute cardiac frequency"
  }
];

if (!window.__art_instances) window.__art_instances = {};
if (!window.__art_instances['cardiac-pulse']) {
  const inst = typeof createCardiacPulse === 'function' ? createCardiacPulse() : null;
  if (inst && inst.setup) {
    inst.setup({ ctx, width, height, dpr: 1, aspectRatio: width / height }, defaultParams);
  }
  window.__art_instances['cardiac-pulse'] = inst;
}

const instance = window.__art_instances['cardiac-pulse'];
if (instance && instance.render) {
  instance.render(
    { ctx, width, height, dpr: 1, aspectRatio: width / height },
    { time, deltaTime: dt, frameCount: Math.floor(time * 60), fps: 60 },
    defaultParams
  );
}`,

  // 036. Neural Synaptic Network
  'neural-synapse': `// 036 - Neural Synaptic Network (anatomy)
// 1:1 Original algorithm engine source
function createNeuralSynapse() {
  const NEURON_COUNT = 18;
  const neuronX = new Float32Array(NEURON_COUNT);
  const neuronY = new Float32Array(NEURON_COUNT);
  const spikeTimer = new Float32Array(NEURON_COUNT);
  return {
    setup(context) {
      for (let i = 0; i < NEURON_COUNT; i++) {
        neuronX[i] = context.width * 0.15 + Math.random() * (context.width * 0.7);
        neuronY[i] = context.height * 0.15 + Math.random() * (context.height * 0.7);
        spikeTimer[i] = Math.random() * 5;
      }
    },
    render(context, timeState, params) {
      const { ctx, width, height } = context;
      const speed = Number(params.firingRate || 1.2);
      const connectivity = Number(params.synapseReach || 150);
      const connectSq = connectivity * connectivity;
      const t = timeState.time * speed;
      ctx.fillStyle = "rgba(5, 7, 12, 0.22)";
      ctx.fillRect(0, 0, width, height);
      for (let i = 0; i < NEURON_COUNT; i++) {
        spikeTimer[i] += timeState.deltaTime * speed;
        const isSpiking = spikeTimer[i] % 2.5 < 0.25;
        for (let j = i + 1; j < NEURON_COUNT; j++) {
          const dx = neuronX[j] - neuronX[i];
          const dy = neuronY[j] - neuronY[i];
          const dSq = dx * dx + dy * dy;
          if (dSq < connectSq) {
            const dist = Math.sqrt(dSq);
            const alpha = 1 - dist / connectivity;
            ctx.beginPath();
            ctx.moveTo(neuronX[i], neuronY[i]);
            ctx.lineTo(neuronX[j], neuronY[j]);
            ctx.strokeStyle = hsla(210, 85, 55, alpha * 0.4);
            ctx.lineWidth = 1.2;
            ctx.stroke();
            const pulsePhase = (t * 2 + i * 0.3) % 1;
            const px = neuronX[i] + dx * pulsePhase;
            const py = neuronY[i] + dy * pulsePhase;
            ctx.fillStyle = hsla(185, 95, 80, 0.95);
            ctx.beginPath();
            ctx.arc(px, py, 2.5, 0, Math.PI * 2);
            ctx.fill();
          }
        }
        const somaRadius = isSpiking ? 9 : 6;
        const somaHue = isSpiking ? 50 : 200;
        ctx.fillStyle = hsla(somaHue, 95, isSpiking ? 85 : 65, isSpiking ? 1 : 0.8);
        ctx.shadowColor = hsla(somaHue, 95, 75, 0.8);
        ctx.shadowBlur = isSpiking ? 18 : 6;
        ctx.beginPath();
        ctx.arc(neuronX[i], neuronY[i], somaRadius, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
        for (let d = 0; d < 6; d++) {
          const dendAngle = d / 6 * Math.PI * 2 + t * 0.2;
          const dendLen = 14 + Math.sin(t * 3 + i + d) * 4;
          const ex = neuronX[i] + Math.cos(dendAngle) * dendLen;
          const ey = neuronY[i] + Math.sin(dendAngle) * dendLen;
          ctx.beginPath();
          ctx.moveTo(neuronX[i], neuronY[i]);
          ctx.lineTo(ex, ey);
          ctx.strokeStyle = hsla(210, 80, 60, 0.5);
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
    }
  };
}

// Default parameters from content metadata
const defaultParams = [
  {
    "key": "firingRate",
    "label": "Spike Firing Rate",
    "type": "range",
    "min": 0.4,
    "max": 3,
    "step": 0.1,
    "defaultValue": 1.2,
    "description": "Neuronal action potential frequency"
  },
  {
    "key": "synapseReach",
    "label": "Synaptic Reach",
    "type": "range",
    "min": 80,
    "max": 240,
    "step": 10,
    "defaultValue": 150,
    "description": "Axon connection radius threshold"
  }
];

if (!window.__art_instances) window.__art_instances = {};
if (!window.__art_instances['neural-synapse']) {
  const inst = typeof createNeuralSynapse === 'function' ? createNeuralSynapse() : null;
  if (inst && inst.setup) {
    inst.setup({ ctx, width, height, dpr: 1, aspectRatio: width / height }, defaultParams);
  }
  window.__art_instances['neural-synapse'] = inst;
}

const instance = window.__art_instances['neural-synapse'];
if (instance && instance.render) {
  instance.render(
    { ctx, width, height, dpr: 1, aspectRatio: width / height },
    { time, deltaTime: dt, frameCount: Math.floor(time * 60), fps: 60 },
    defaultParams
  );
}`,

  // 037. DNA Double Helix
  'dna-double-helix': `// 037 - DNA Double Helix (anatomy)
// 1:1 Original algorithm engine source
function createDNADoubleHelix() {
  const BASE_PAIRS = 40;
  return {
    setup() {
    },
    render(context, timeState, params) {
      const { ctx, width, height } = context;
      const speed = Number(params.rotationSpeed || 1);
      const helixRadius = Number(params.helixRadius || 85);
      const t = timeState.time * speed;
      ctx.fillStyle = "#05060a";
      ctx.fillRect(0, 0, width, height);
      const cx = width * 0.5;
      const cy = height * 0.5;
      const helixHeight = height * 0.85;
      const startY = cy - helixHeight * 0.5;
      const nodes = [];
      for (let i = 0; i < BASE_PAIRS; i++) {
        const normY = i / (BASE_PAIRS - 1);
        const y = startY + normY * helixHeight;
        const theta = normY * Math.PI * 4 + t * 2;
        const x1 = Math.cos(theta) * helixRadius;
        const z1 = Math.sin(theta) * helixRadius;
        const x2 = Math.cos(theta + Math.PI) * helixRadius;
        const z2 = Math.sin(theta + Math.PI) * helixRadius;
        nodes.push({ y, x1, z1, x2, z2, pairType: i % 4 });
      }
      nodes.sort((a, b) => (a.z1 + a.z2) / 2 - (b.z1 + b.z2) / 2);
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        const px1 = cx + n.x1;
        const py1 = n.y;
        const depth1 = (n.z1 + helixRadius) / (helixRadius * 2);
        const px2 = cx + n.x2;
        const py2 = n.y;
        const depth2 = (n.z2 + helixRadius) / (helixRadius * 2);
        ctx.beginPath();
        ctx.moveTo(px1, py1);
        ctx.lineTo(px2, py2);
        const baseHue = n.pairType < 2 ? 190 : 340;
        const avgDepth = (depth1 + depth2) * 0.5;
        ctx.strokeStyle = hsla(baseHue, 85, 60, 0.4 + avgDepth * 0.5);
        ctx.lineWidth = 1.8 + avgDepth * 1.5;
        ctx.stroke();
        ctx.fillStyle = hsla(185, 95, 70, 0.6 + depth1 * 0.4);
        ctx.beginPath();
        ctx.arc(px1, py1, 3.5 + depth1 * 3.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = hsla(280, 95, 75, 0.6 + depth2 * 0.4);
        ctx.beginPath();
        ctx.arc(px2, py2, 3.5 + depth2 * 3.5, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  };
}

// Default parameters from content metadata
const defaultParams = [
  {
    "key": "rotationSpeed",
    "label": "Axial Spin Speed",
    "type": "range",
    "min": 0.2,
    "max": 3,
    "step": 0.1,
    "defaultValue": 1,
    "description": "Molecular helical revolution rate"
  },
  {
    "key": "helixRadius",
    "label": "Strand Major Radius",
    "type": "range",
    "min": 40,
    "max": 130,
    "step": 5,
    "defaultValue": 85,
    "description": "Sugar-phosphate backbone width"
  }
];

if (!window.__art_instances) window.__art_instances = {};
if (!window.__art_instances['dna-double-helix']) {
  const inst = typeof createDNADoubleHelix === 'function' ? createDNADoubleHelix() : null;
  if (inst && inst.setup) {
    inst.setup({ ctx, width, height, dpr: 1, aspectRatio: width / height }, defaultParams);
  }
  window.__art_instances['dna-double-helix'] = inst;
}

const instance = window.__art_instances['dna-double-helix'];
if (instance && instance.render) {
  instance.render(
    { ctx, width, height, dpr: 1, aspectRatio: width / height },
    { time, deltaTime: dt, frameCount: Math.floor(time * 60), fps: 60 },
    defaultParams
  );
}`,

  // 038. Retinal Iris Trabeculae
  'retinal-iris': `// 038 - Retinal Iris Trabeculae (anatomy)
// 1:1 Original algorithm engine source
function createRetinalIris() {
  const TRABECULAE_COUNT = 360;
  return {
    setup() {
    },
    render(context, timeState, params) {
      const { ctx, width, height } = context;
      const speed = Number(params.pupilSpeed || 0.8);
      const irisRadius = Math.min(width, height) * 0.42;
      const t = timeState.time * speed;
      ctx.fillStyle = "#040508";
      ctx.fillRect(0, 0, width, height);
      const cx = width * 0.5;
      const cy = height * 0.5;
      const pupilConstriction = 0.28 + 0.12 * Math.sin(t * 1.5);
      const pupilRadius = irisRadius * pupilConstriction;
      ctx.beginPath();
      ctx.arc(cx, cy, irisRadius, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(56, 189, 248, 0.5)";
      ctx.lineWidth = 3;
      ctx.stroke();
      for (let i = 0; i < TRABECULAE_COUNT; i++) {
        const phi = i / TRABECULAE_COUNT * Math.PI * 2;
        const fiberWobble = Math.sin(phi * 18 + t * 2) * (irisRadius * 0.05);
        const startR = pupilRadius;
        const endR = irisRadius + fiberWobble;
        const x1 = cx + Math.cos(phi) * startR;
        const y1 = cy + Math.sin(phi) * startR;
        const midR = (startR + endR) * 0.52;
        const midAngle = phi + Math.sin(phi * 6 + t) * 0.04;
        const xMid = cx + Math.cos(midAngle) * midR;
        const yMid = cy + Math.sin(midAngle) * midR;
        const x2 = cx + Math.cos(phi) * endR;
        const y2 = cy + Math.sin(phi) * endR;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.quadraticCurveTo(xMid, yMid, x2, y2);
        const normR = i / TRABECULAE_COUNT;
        const fiberHue = (180 + Math.sin(normR * Math.PI * 4) * 40 + t * 10) % 360;
        ctx.strokeStyle = hsla(fiberHue, 85, 60, 0.45);
        ctx.lineWidth = 1.1;
        ctx.stroke();
      }
      const collaretteR = (pupilRadius + irisRadius) * 0.48;
      ctx.beginPath();
      const cSteps = 72;
      for (let i = 0; i <= cSteps; i++) {
        const a = i / cSteps * Math.PI * 2;
        const r = collaretteR + (i % 2 === 0 ? 6 : -6);
        const px = cx + Math.cos(a) * r;
        const py = cy + Math.sin(a) * r;
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.closePath();
      ctx.strokeStyle = hsla(45, 95, 70, 0.7);
      ctx.lineWidth = 1.6;
      ctx.stroke();
      ctx.fillStyle = "#020305";
      ctx.beginPath();
      ctx.arc(cx, cy, pupilRadius, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = hsla(38, 90, 60, 0.9);
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.fillStyle = "rgba(255, 255, 255, 0.85)";
      ctx.beginPath();
      ctx.arc(cx - pupilRadius * 0.35, cy - pupilRadius * 0.35, 5, 0, Math.PI * 2);
      ctx.fill();
    }
  };
}

// Default parameters from content metadata
const defaultParams = [
  {
    "key": "pupilSpeed",
    "label": "Light Reflex Speed",
    "type": "range",
    "min": 0.2,
    "max": 2.5,
    "step": 0.1,
    "defaultValue": 0.8,
    "description": "Pupillary dilation / constriction rate"
  }
];

if (!window.__art_instances) window.__art_instances = {};
if (!window.__art_instances['retinal-iris']) {
  const inst = typeof createRetinalIris === 'function' ? createRetinalIris() : null;
  if (inst && inst.setup) {
    inst.setup({ ctx, width, height, dpr: 1, aspectRatio: width / height }, defaultParams);
  }
  window.__art_instances['retinal-iris'] = inst;
}

const instance = window.__art_instances['retinal-iris'];
if (instance && instance.render) {
  instance.render(
    { ctx, width, height, dpr: 1, aspectRatio: width / height },
    { time, deltaTime: dt, frameCount: Math.floor(time * 60), fps: 60 },
    defaultParams
  );
}`,

  // 039. Atmospheric Tornado
  'atmospheric-tornado': `// 039 - Atmospheric Tornado (fluid)
// 1:1 Original algorithm engine source
function createAtmosphericTornado() {
  const PARTICLE_COUNT = 1200;
  const px = new Float32Array(PARTICLE_COUNT);
  const py = new Float32Array(PARTICLE_COUNT);
  const pz = new Float32Array(PARTICLE_COUNT);
  const pAngle = new Float32Array(PARTICLE_COUNT);
  const pRadius = new Float32Array(PARTICLE_COUNT);
  const pSpeed = new Float32Array(PARTICLE_COUNT);
  return {
    setup() {
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        pz[i] = Math.random();
        pAngle[i] = Math.random() * Math.PI * 2;
        pRadius[i] = 0.2 + Math.random() * 0.8;
        pSpeed[i] = 1.5 + Math.random() * 2.5;
      }
    },
    render(context, timeState, params) {
      const { ctx, width, height } = context;
      const swirlSpeed = Number(params.swirlSpeed || 1.4);
      const funnelWidth = Number(params.funnelWidth || 1);
      const dt = Math.min(timeState.deltaTime, 0.05) * swirlSpeed;
      const t = timeState.time * swirlSpeed;
      ctx.fillStyle = "rgba(5, 7, 12, 0.22)";
      ctx.fillRect(0, 0, width, height);
      const groundX = width * 0.5 + Math.sin(t * 0.6) * (width * 0.06);
      const groundY = height * 0.92;
      const cloudY = height * 0.08;
      const totalH = groundY - cloudY;
      ctx.beginPath();
      const funnelSlices = 40;
      for (let s = 0; s <= funnelSlices; s++) {
        const normZ = s / funnelSlices;
        const curY = groundY - normZ * totalH;
        const curR = (18 + Math.pow(normZ, 2.2) * 160) * funnelWidth;
        const sway = Math.sin(t * 1.5 + normZ * 3) * (40 * normZ);
        const curX = groundX + sway;
        const leftX = curX - curR;
        if (s === 0) ctx.moveTo(leftX, curY);
        else ctx.lineTo(leftX, curY);
      }
      for (let s = funnelSlices; s >= 0; s--) {
        const normZ = s / funnelSlices;
        const curY = groundY - normZ * totalH;
        const curR = (18 + Math.pow(normZ, 2.2) * 160) * funnelWidth;
        const sway = Math.sin(t * 1.5 + normZ * 3) * (40 * normZ);
        const curX = groundX + sway;
        const rightX = curX + curR;
        ctx.lineTo(rightX, curY);
      }
      ctx.closePath();
      ctx.fillStyle = "rgba(14, 25, 45, 0.2)";
      ctx.fill();
      ctx.strokeStyle = "rgba(56, 189, 248, 0.3)";
      ctx.lineWidth = 1.2;
      ctx.stroke();
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        pz[i] += dt * (0.35 + pz[i] * 0.4);
        if (pz[i] > 1) {
          pz[i] = 0;
          pAngle[i] = Math.random() * Math.PI * 2;
          pRadius[i] = 0.2 + Math.random() * 0.8;
        }
        const rNorm = pRadius[i];
        const angularVel = pSpeed[i] / (0.3 + rNorm * 0.7) * 4;
        pAngle[i] += angularVel * dt;
        const funnelR = (20 + Math.pow(pz[i], 2.2) * 170) * funnelWidth;
        const radius = funnelR * rNorm;
        const sway = Math.sin(t * 1.5 + pz[i] * 3) * (40 * pz[i]);
        const centerX = groundX + sway;
        const posY = groundY - pz[i] * totalH;
        const posX = centerX + Math.cos(pAngle[i]) * radius;
        const depth = Math.sin(pAngle[i]);
        const pyDepth = posY + depth * (radius * 0.2);
        px[i] = posX;
        py[i] = pyDepth;
        const depthAlpha = 0.2 + (depth + 1) * 0.35;
        const hue = (195 + pz[i] * 30 + depth * 15) % 360;
        const size = (1.2 + (depth + 1) * 0.8) * (1 + (1 - pz[i]) * 0.6);
        ctx.fillStyle = hsla(hue, 85, 65 + depth * 15, depthAlpha);
        ctx.fillRect(posX - size * 0.5, pyDepth - size * 0.5, size, size);
      }
    }
  };
}

// Default parameters from content metadata
const defaultParams = [
  {
    "key": "swirlSpeed",
    "label": "Vortex Rotation Rate",
    "type": "range",
    "min": 0.5,
    "max": 3,
    "step": 0.1,
    "defaultValue": 1.4,
    "description": "Angular vortex velocity multiplier"
  },
  {
    "key": "funnelWidth",
    "label": "Funnel Cone Aperture",
    "type": "range",
    "min": 0.5,
    "max": 2,
    "step": 0.1,
    "defaultValue": 1,
    "description": "Hyperbolic cone boundary scaling"
  }
];

if (!window.__art_instances) window.__art_instances = {};
if (!window.__art_instances['atmospheric-tornado']) {
  const inst = typeof createAtmosphericTornado === 'function' ? createAtmosphericTornado() : null;
  if (inst && inst.setup) {
    inst.setup({ ctx, width, height, dpr: 1, aspectRatio: width / height }, defaultParams);
  }
  window.__art_instances['atmospheric-tornado'] = inst;
}

const instance = window.__art_instances['atmospheric-tornado'];
if (instance && instance.render) {
  instance.render(
    { ctx, width, height, dpr: 1, aspectRatio: width / height },
    { time, deltaTime: dt, frameCount: Math.floor(time * 60), fps: 60 },
    defaultParams
  );
}`,

  // 040. Worthington Water Splash
  'water-splash': `// 040 - Worthington Water Splash (fluid)
// 1:1 Original algorithm engine source
function createWaterSplash() {
  const CROWN_POINTS = 16;
  const DROPLET_COUNT = 32;
  const dropX = new Float32Array(DROPLET_COUNT);
  const dropY = new Float32Array(DROPLET_COUNT);
  const dropVx = new Float32Array(DROPLET_COUNT);
  const dropVy = new Float32Array(DROPLET_COUNT);
  const dropSize = new Float32Array(DROPLET_COUNT);
  const dropLife = new Float32Array(DROPLET_COUNT);
  return {
    setup() {
      for (let i = 0; i < DROPLET_COUNT; i++) {
        dropLife[i] = -1;
      }
    },
    render(context, timeState, params) {
      const { ctx, width, height } = context;
      const speed = Number(params.splashRate || 1.1);
      const splashHeight = Number(params.splashScale || 1.2);
      const dt = Math.min(timeState.deltaTime, 0.05) * speed;
      const t = timeState.time * speed;
      ctx.fillStyle = "rgba(5, 8, 14, 0.22)";
      ctx.fillRect(0, 0, width, height);
      const cx = width * 0.5;
      const waterLineY = height * 0.65;
      const splashCycle = t * 0.9 % 2.5;
      const rippleCount = 5;
      for (let r = 1; r <= rippleCount; r++) {
        const ripplePhase = (splashCycle + r * 0.4) % 2.5;
        const rippleRadius = ripplePhase * 160;
        const rippleAlpha = Math.max(0, 1 - ripplePhase / 2.5) * 0.6;
        ctx.beginPath();
        ctx.ellipse(cx, waterLineY, rippleRadius, rippleRadius * 0.28, 0, 0, Math.PI * 2);
        ctx.strokeStyle = hsla(195, 90, 65, rippleAlpha);
        ctx.lineWidth = 1.4;
        ctx.stroke();
      }
      if (splashCycle < 1.4) {
        const crownAge = splashCycle / 1.4;
        const crownRadius = (25 + crownAge * 95) * splashHeight;
        const crownH = Math.sin(crownAge * Math.PI) * (110 * splashHeight);
        ctx.beginPath();
        for (let i = 0; i <= CROWN_POINTS; i++) {
          const phi = i / CROWN_POINTS * Math.PI * 2;
          const cuspHeight = crownH * (1 + 0.35 * Math.sin(phi * 8));
          const px = cx + Math.cos(phi) * crownRadius;
          const py = waterLineY - cuspHeight + Math.sin(phi) * (crownRadius * 0.25);
          if (i === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        ctx.closePath();
        ctx.fillStyle = hsla(190, 85, 55, 0.25);
        ctx.fill();
        ctx.strokeStyle = hsla(185, 95, 75, 0.85);
        ctx.lineWidth = 2.2;
        ctx.stroke();
        for (let i = 0; i < CROWN_POINTS; i++) {
          const phi = i / CROWN_POINTS * Math.PI * 2;
          const cuspHeight = crownH * (1 + 0.35 * Math.sin(phi * 8));
          const px = cx + Math.cos(phi) * crownRadius;
          const py = waterLineY - cuspHeight + Math.sin(phi) * (crownRadius * 0.25);
          ctx.fillStyle = hsla(180, 100, 85, 0.95);
          ctx.beginPath();
          ctx.arc(px, py, 2.5, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      if (splashCycle > 0.4 && splashCycle < 2.2) {
        const jetAge = (splashCycle - 0.4) / 1.8;
        const jetH = Math.sin(jetAge * Math.PI) * (160 * splashHeight);
        const jetW = Math.max(3, (1 - jetAge) * 16);
        ctx.beginPath();
        ctx.moveTo(cx - jetW * 1.5, waterLineY);
        ctx.quadraticCurveTo(cx - jetW * 0.4, waterLineY - jetH * 0.6, cx, waterLineY - jetH);
        ctx.quadraticCurveTo(cx + jetW * 0.4, waterLineY - jetH * 0.6, cx + jetW * 1.5, waterLineY);
        ctx.fillStyle = hsla(195, 90, 50, 0.45);
        ctx.fill();
        ctx.strokeStyle = hsla(185, 95, 78, 0.9);
        ctx.lineWidth = 2;
        ctx.stroke();
        const topDropY = waterLineY - jetH - 18 * Math.sin(jetAge * Math.PI * 1.5);
        ctx.fillStyle = hsla(180, 95, 82, 0.95);
        ctx.beginPath();
        ctx.arc(cx, topDropY, 5.5 * splashHeight, 0, Math.PI * 2);
        ctx.fill();
      }
      if (splashCycle < 0.1) {
        for (let i = 0; i < DROPLET_COUNT; i++) {
          const angle = Math.random() * Math.PI * 2;
          const v = 80 + Math.random() * 140;
          dropX[i] = cx;
          dropY[i] = waterLineY - 10;
          dropVx[i] = Math.cos(angle) * (v * 0.7);
          dropVy[i] = -Math.abs(Math.sin(angle)) * v - 40;
          dropSize[i] = 1.5 + Math.random() * 3;
          dropLife[i] = 1;
        }
      }
      for (let i = 0; i < DROPLET_COUNT; i++) {
        if (dropLife[i] > 0) {
          dropLife[i] -= dt * 0.7;
          dropVy[i] += 260 * dt;
          dropX[i] += dropVx[i] * dt;
          dropY[i] += dropVy[i] * dt;
          if (dropY[i] > waterLineY) {
            dropLife[i] = 0;
          }
          ctx.fillStyle = hsla(190, 95, 75, dropLife[i]);
          ctx.beginPath();
          ctx.arc(dropX[i], dropY[i], dropSize[i], 0, Math.PI * 2);
          ctx.fill();
        }
      }
    }
  };
}

// Default parameters from content metadata
const defaultParams = [
  {
    "key": "splashRate",
    "label": "Impact Cycle Speed",
    "type": "range",
    "min": 0.4,
    "max": 2.5,
    "step": 0.1,
    "defaultValue": 1.1,
    "description": "Water impact repetition frequency"
  },
  {
    "key": "splashScale",
    "label": "Splash Amplitude",
    "type": "range",
    "min": 0.6,
    "max": 1.8,
    "step": 0.1,
    "defaultValue": 1.2,
    "description": "Crown height & jet ejection reach"
  }
];

if (!window.__art_instances) window.__art_instances = {};
if (!window.__art_instances['water-splash']) {
  const inst = typeof createWaterSplash === 'function' ? createWaterSplash() : null;
  if (inst && inst.setup) {
    inst.setup({ ctx, width, height, dpr: 1, aspectRatio: width / height }, defaultParams);
  }
  window.__art_instances['water-splash'] = inst;
}

const instance = window.__art_instances['water-splash'];
if (instance && instance.render) {
  instance.render(
    { ctx, width, height, dpr: 1, aspectRatio: width / height },
    { time, deltaTime: dt, frameCount: Math.floor(time * 60), fps: 60 },
    defaultParams
  );
}`,

  // 041. Rainstorm Precipitation
  'rain-effect': `// 041 - Rainstorm Precipitation (fluid)
// 1:1 Original algorithm engine source
function createRainEffect() {
  const MAX_DROPS = 600;
  const MAX_RIPPLES = 48;
  const dropX = new Float32Array(MAX_DROPS);
  const dropY = new Float32Array(MAX_DROPS);
  const dropSpeed = new Float32Array(MAX_DROPS);
  const dropLength = new Float32Array(MAX_DROPS);
  const ripX = new Float32Array(MAX_RIPPLES);
  const ripY = new Float32Array(MAX_RIPPLES);
  const ripRadius = new Float32Array(MAX_RIPPLES);
  const ripLife = new Float32Array(MAX_RIPPLES);
  let nextRipIdx = 0;
  return {
    setup(context) {
      for (let i = 0; i < MAX_DROPS; i++) {
        dropX[i] = Math.random() * context.width;
        dropY[i] = Math.random() * context.height;
        dropSpeed[i] = 400 + Math.random() * 500;
        dropLength[i] = 12 + Math.random() * 18;
      }
      ripLife.fill(-1);
    },
    render(context, timeState, params) {
      const { ctx, width, height } = context;
      const intensity = Number(params.rainDensity || 450);
      const windAngle = Number(params.windShear || 0.15);
      const dt = Math.min(timeState.deltaTime, 0.05);
      const groundY = height * 0.88;
      ctx.fillStyle = "rgba(4, 6, 12, 0.25)";
      ctx.fillRect(0, 0, width, height);
      const activeCount = Math.min(MAX_DROPS, intensity);
      const windDx = Math.sin(windAngle);
      const windDy = Math.cos(windAngle);
      for (let i = 0; i < activeCount; i++) {
        dropY[i] += dropSpeed[i] * dt;
        dropX[i] += dropSpeed[i] * windDx * dt;
        if (dropY[i] >= groundY) {
          dropY[i] = 0;
          dropX[i] = Math.random() * (width + 200) - 100;
          ripX[nextRipIdx] = dropX[i];
          ripY[nextRipIdx] = groundY + (Math.random() - 0.5) * 20;
          ripRadius[nextRipIdx] = 2;
          ripLife[nextRipIdx] = 1;
          nextRipIdx = (nextRipIdx + 1) % MAX_RIPPLES;
        }
        const headX = dropX[i];
        const headY = dropY[i];
        const tailX = headX - windDx * dropLength[i];
        const tailY = headY - windDy * dropLength[i];
        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(headX, headY);
        ctx.strokeStyle = "rgba(186, 230, 253, 0.55)";
        ctx.lineWidth = 1.1;
        ctx.stroke();
      }
      for (let r = 0; r < MAX_RIPPLES; r++) {
        if (ripLife[r] > 0) {
          ripLife[r] -= dt * 2.2;
          ripRadius[r] += dt * 45;
          ctx.beginPath();
          ctx.ellipse(ripX[r], ripY[r], ripRadius[r], ripRadius[r] * 0.35, 0, 0, Math.PI * 2);
          ctx.strokeStyle = hsla(195, 90, 75, ripLife[r] * 0.7);
          ctx.lineWidth = 1.2;
          ctx.stroke();
        }
      }
      ctx.fillStyle = "rgba(56, 189, 248, 0.04)";
      ctx.fillRect(0, groundY - 15, width, height - groundY + 15);
    }
  };
}

// Default parameters from content metadata
const defaultParams = [
  {
    "key": "rainDensity",
    "label": "Rainfall Intensity",
    "type": "range",
    "min": 100,
    "max": 600,
    "step": 20,
    "defaultValue": 450,
    "description": "Active precipitation streak count"
  },
  {
    "key": "windShear",
    "label": "Wind Shear Slant",
    "type": "range",
    "min": -0.5,
    "max": 0.5,
    "step": 0.05,
    "defaultValue": 0.15,
    "description": "Horizontal gale deflection angle"
  }
];

if (!window.__art_instances) window.__art_instances = {};
if (!window.__art_instances['rain-effect']) {
  const inst = typeof createRainEffect === 'function' ? createRainEffect() : null;
  if (inst && inst.setup) {
    inst.setup({ ctx, width, height, dpr: 1, aspectRatio: width / height }, defaultParams);
  }
  window.__art_instances['rain-effect'] = inst;
}

const instance = window.__art_instances['rain-effect'];
if (instance && instance.render) {
  instance.render(
    { ctx, width, height, dpr: 1, aspectRatio: width / height },
    { time, deltaTime: dt, frameCount: Math.floor(time * 60), fps: 60 },
    defaultParams
  );
}`,

  // 042. Atmospheric Snowfall
  'snow-fall': `// 042 - Atmospheric Snowfall (botany)
// 1:1 Original algorithm engine source
function createSnowFall() {
  const FLAKE_COUNT = 450;
  const fx = new Float32Array(FLAKE_COUNT);
  const fy = new Float32Array(FLAKE_COUNT);
  const fRadius = new Float32Array(FLAKE_COUNT);
  const fSpeed = new Float32Array(FLAKE_COUNT);
  const fWobblePhase = new Float32Array(FLAKE_COUNT);
  const fWobbleFreq = new Float32Array(FLAKE_COUNT);
  const fRotation = new Float32Array(FLAKE_COUNT);
  return {
    setup(context) {
      for (let i = 0; i < FLAKE_COUNT; i++) {
        fx[i] = Math.random() * context.width;
        fy[i] = Math.random() * context.height;
        const depth = Math.pow(Math.random(), 2);
        fRadius[i] = 1 + depth * 4.5;
        fSpeed[i] = 25 + depth * 70;
        fWobblePhase[i] = Math.random() * Math.PI * 2;
        fWobbleFreq[i] = 1 + Math.random() * 2.5;
        fRotation[i] = Math.random() * Math.PI * 2;
      }
    },
    render(context, timeState, params) {
      const { ctx, width, height } = context;
      const windForce = Number(params.windDrift || 0.4);
      const flakeDensity = Number(params.flakeDensity || 380);
      const dt = Math.min(timeState.deltaTime, 0.05);
      const t = timeState.time;
      ctx.fillStyle = "#05070e";
      ctx.fillRect(0, 0, width, height);
      const activeCount = Math.min(FLAKE_COUNT, flakeDensity);
      for (let i = 0; i < activeCount; i++) {
        fWobblePhase[i] += fWobbleFreq[i] * dt;
        const drift = Math.sin(fWobblePhase[i]) * 1.2 + windForce * (fRadius[i] * 0.8);
        fRotation[i] += dt * (fWobbleFreq[i] * 0.5);
        fy[i] += fSpeed[i] * dt;
        fx[i] += drift;
        if (fy[i] > height + 10) {
          fy[i] = -10;
          fx[i] = Math.random() * (width + 100) - 50;
        }
        if (fx[i] > width + 20) fx[i] = -20;
        if (fx[i] < -20) fx[i] = width + 20;
        const posX = fx[i];
        const posY = fy[i];
        const r = fRadius[i];
        if (r > 3.2) {
          ctx.save();
          ctx.translate(posX, posY);
          ctx.rotate(fRotation[i]);
          ctx.beginPath();
          for (let k = 0; k < 6; k++) {
            const angle = k / 6 * Math.PI * 2;
            const armLen = r * 1.5;
            ctx.moveTo(0, 0);
            ctx.lineTo(Math.cos(angle) * armLen, Math.sin(angle) * armLen);
            const subAngle1 = angle + 0.5;
            const subAngle2 = angle - 0.5;
            const midX = Math.cos(angle) * (armLen * 0.55);
            const midY = Math.sin(angle) * (armLen * 0.55);
            ctx.moveTo(midX, midY);
            ctx.lineTo(midX + Math.cos(subAngle1) * (r * 0.5), midY + Math.sin(subAngle1) * (r * 0.5));
            ctx.moveTo(midX, midY);
            ctx.lineTo(midX + Math.cos(subAngle2) * (r * 0.5), midY + Math.sin(subAngle2) * (r * 0.5));
          }
          ctx.strokeStyle = "rgba(240, 249, 255, 0.9)";
          ctx.lineWidth = 1;
          ctx.stroke();
          ctx.restore();
        } else {
          const alpha = 0.35 + r / 3.2 * 0.55;
          ctx.fillStyle = hsla(210, 80, 92, alpha);
          ctx.beginPath();
          ctx.arc(posX, posY, r, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    }
  };
}

// Default parameters from content metadata
const defaultParams = [
  {
    "key": "windDrift",
    "label": "Breeze Drift Force",
    "type": "range",
    "min": -1,
    "max": 1.5,
    "step": 0.1,
    "defaultValue": 0.4,
    "description": "Lateral wind flutter velocity"
  },
  {
    "key": "flakeDensity",
    "label": "Snowflake Density",
    "type": "range",
    "min": 100,
    "max": 450,
    "step": 25,
    "defaultValue": 380,
    "description": "Atmospheric snowflake count"
  }
];

if (!window.__art_instances) window.__art_instances = {};
if (!window.__art_instances['snow-fall']) {
  const inst = typeof createSnowFall === 'function' ? createSnowFall() : null;
  if (inst && inst.setup) {
    inst.setup({ ctx, width, height, dpr: 1, aspectRatio: width / height }, defaultParams);
  }
  window.__art_instances['snow-fall'] = inst;
}

const instance = window.__art_instances['snow-fall'];
if (instance && instance.render) {
  instance.render(
    { ctx, width, height, dpr: 1, aspectRatio: width / height },
    { time, deltaTime: dt, frameCount: Math.floor(time * 60), fps: 60 },
    defaultParams
  );
}`,

  // 043. Microscopic Snowflake Crystal
  'microscopic-ice-crystal': `// 043 - Microscopic Snowflake Crystal (geometry)
// 1:1 Original algorithm engine source
function createMicroscopicIceCrystal() {
  return {
    setup() {
    },
    render(context, timeState, params) {
      const { ctx, width, height } = context;
      const freezeSpeed = Number(params.freezeRate || 0.6);
      const complexity = Number(params.dendriteBranches || 5);
      const t = timeState.time * freezeSpeed;
      ctx.fillStyle = "#03050a";
      ctx.fillRect(0, 0, width, height);
      const cx = width * 0.5;
      const cy = height * 0.5;
      const crystalRadius = Math.min(width, height) * 0.42;
      const growthCycle = t * 0.4 % 1;
      const growth = Math.sin(growthCycle * Math.PI);
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(t * 0.1);
      for (let a = 0; a < 6; a++) {
        const armAngle = a / 6 * Math.PI * 2;
        const mainArmLen = crystalRadius * (0.3 + 0.7 * growth);
        ctx.save();
        ctx.rotate(armAngle);
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(mainArmLen, 0);
        ctx.strokeStyle = hsla(195, 95, 80, 0.9);
        ctx.lineWidth = 2.4;
        ctx.stroke();
        for (let b = 1; b <= complexity; b++) {
          const branchPos = b / (complexity + 1) * mainArmLen;
          const branchGrowth = Math.max(0, (growth - b * 0.12) / (1 - b * 0.12));
          const branchLen = crystalRadius * 0.28 * (1 - b / (complexity + 1)) * branchGrowth;
          if (branchLen > 0) {
            ctx.beginPath();
            ctx.moveTo(branchPos, 0);
            const ux = branchPos + Math.cos(Math.PI / 3) * branchLen;
            const uy = -Math.sin(Math.PI / 3) * branchLen;
            ctx.lineTo(ux, uy);
            if (b <= 3 && branchGrowth > 0.6) {
              const subLen = branchLen * 0.4;
              ctx.moveTo(ux * 0.65 + branchPos * 0.35, uy * 0.65);
              ctx.lineTo(
                ux * 0.65 + branchPos * 0.35 + Math.cos(Math.PI / 3) * subLen,
                uy * 0.65 + Math.sin(Math.PI / 3) * subLen
              );
            }
            ctx.moveTo(branchPos, 0);
            const lx = branchPos + Math.cos(-Math.PI / 3) * branchLen;
            const ly = -Math.sin(-Math.PI / 3) * branchLen;
            ctx.lineTo(lx, ly);
            if (b <= 3 && branchGrowth > 0.6) {
              const subLen = branchLen * 0.4;
              ctx.moveTo(lx * 0.65 + branchPos * 0.35, ly * 0.65);
              ctx.lineTo(
                lx * 0.65 + branchPos * 0.35 + Math.cos(-Math.PI / 3) * subLen,
                ly * 0.65 - Math.sin(-Math.PI / 3) * subLen
              );
            }
            const branchHue = (185 + b * 10 + t * 20) % 360;
            ctx.strokeStyle = hsla(branchHue, 90, 75, 0.8);
            ctx.lineWidth = Math.max(1, 1.8 - b * 0.2);
            ctx.stroke();
            ctx.fillStyle = hsla(180, 100, 92, 0.95);
            ctx.beginPath();
            ctx.arc(ux, uy, 1.8, 0, Math.PI * 2);
            ctx.arc(lx, ly, 1.8, 0, Math.PI * 2);
            ctx.fill();
          }
        }
        ctx.fillStyle = hsla(190, 100, 95, 0.95);
        ctx.beginPath();
        ctx.arc(mainArmLen, 0, 2.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
      ctx.beginPath();
      const coreRadius = (16 + 12 * Math.sin(t * 2)) * Math.min(1, growth * 1.5);
      for (let k = 0; k <= 6; k++) {
        const a = k / 6 * Math.PI * 2;
        const px = Math.cos(a) * coreRadius;
        const py = Math.sin(a) * coreRadius;
        if (k === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.closePath();
      ctx.fillStyle = "rgba(56, 189, 248, 0.2)";
      ctx.fill();
      ctx.strokeStyle = hsla(190, 95, 80, 0.95);
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.beginPath();
      const outerHexR = coreRadius * 2.2;
      for (let k = 0; k <= 6; k++) {
        const a = k / 6 * Math.PI * 2;
        const px = Math.cos(a) * outerHexR;
        const py = Math.sin(a) * outerHexR;
        if (k === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.closePath();
      ctx.strokeStyle = hsla(210, 85, 65, 0.4);
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.restore();
    }
  };
}

// Default parameters from content metadata
const defaultParams = [
  {
    "key": "freezeRate",
    "label": "Crystallization Speed",
    "type": "range",
    "min": 0.2,
    "max": 2,
    "step": 0.1,
    "defaultValue": 0.6,
    "description": "Stefan phase-change growth cycle rate"
  },
  {
    "key": "dendriteBranches",
    "label": "Dendrite Branching Order",
    "type": "range",
    "min": 2,
    "max": 8,
    "step": 1,
    "defaultValue": 5,
    "description": "Number of secondary side-prong pairs"
  }
];

if (!window.__art_instances) window.__art_instances = {};
if (!window.__art_instances['microscopic-ice-crystal']) {
  const inst = typeof createMicroscopicIceCrystal === 'function' ? createMicroscopicIceCrystal() : null;
  if (inst && inst.setup) {
    inst.setup({ ctx, width, height, dpr: 1, aspectRatio: width / height }, defaultParams);
  }
  window.__art_instances['microscopic-ice-crystal'] = inst;
}

const instance = window.__art_instances['microscopic-ice-crystal'];
if (instance && instance.render) {
  instance.render(
    { ctx, width, height, dpr: 1, aspectRatio: width / height },
    { time, deltaTime: dt, frameCount: Math.floor(time * 60), fps: 60 },
    defaultParams
  );
}`,

  // 044. Deep Sea Anglerfish
  'deep-sea-anglerfish': `// 044 - Deep Sea Anglerfish (creatures)
// 1:1 Original algorithm engine source
function createDeepSeaAnglerfish() {
  const BACTERIA_PARTICLES = 36;
  const bacX = new Float32Array(BACTERIA_PARTICLES);
  const bacY = new Float32Array(BACTERIA_PARTICLES);
  const bacZ = new Float32Array(BACTERIA_PARTICLES);
  const bacLife = new Float32Array(BACTERIA_PARTICLES);
  return {
    setup() {
      bacLife.fill(0);
    },
    render(context, timeState, params) {
      const { ctx, width, height } = context;
      const lureSpeed = Number(params.lureSpeed || 1.2);
      const glowScale = Number(params.lureGlow || 1.3);
      const dt = Math.min(timeState.deltaTime, 0.05) * lureSpeed;
      const t = timeState.time * lureSpeed;
      ctx.fillStyle = "#020306";
      ctx.fillRect(0, 0, width, height);
      const cx = width * 0.46;
      const cy = height * 0.52;
      const fishScale = Math.min(width, height) / 500;
      const rotY = Math.sin(t * 0.4) * 0.35 - 0.25;
      const rotX = 0.28 + Math.sin(t * 0.7) * 0.14;
      const rotZ = Math.sin(t * 0.5) * 0.06;
      ctx.save();
      ctx.globalCompositeOperation = "screen";
      const baseHue = (210 + Math.sin(t * 0.5) * 15) % 360;
      const BODY_RIBBONS = 28;
      for (let r = 1; r <= BODY_RIBBONS; r++) {
        const normR = r / BODY_RIBBONS;
        const curScale = normR * fishScale;
        ctx.beginPath();
        const steps = 48;
        let avgDepth = 0;
        for (let i = 0; i <= steps; i++) {
          const phi = i / steps * Math.PI * 2;
          const cosP = Math.cos(phi);
          const sinP = Math.sin(phi);
          const rx = (-20 + cosP * 85 + (cosP < 0 ? cosP * 25 : 0)) * curScale;
          const ry = (sinP * 68 + Math.sin(phi * 2) * 8) * curScale;
          const rz = Math.sin(phi) * 58 * curScale;
          const p = project3D(rx, ry, rz, rotX, rotY, rotZ, cx, cy, 450, 520);
          avgDepth += p.depth;
          if (i === 0) ctx.moveTo(p.x, p.y);
          else ctx.lineTo(p.x, p.y);
        }
        ctx.closePath();
        avgDepth /= steps + 1;
        const rHue = (baseHue + normR * 25) % 360;
        ctx.strokeStyle = hsla(rHue, 95, 68, (0.06 + normR * 0.35) * avgDepth);
        ctx.lineWidth = r === BODY_RIBBONS ? 2.2 * fishScale : 0.9;
        ctx.stroke();
        if (r % 5 === 0) {
          ctx.fillStyle = hsla(rHue, 85, 45, 0.04 * avgDepth);
          ctx.fill();
        }
      }
      for (let str = 0; str < 16; str++) {
        const phi = str / 16 * Math.PI * 2;
        const sinPhi = Math.sin(phi);
        const cosPhi = Math.cos(phi);
        ctx.beginPath();
        for (let s = 0; s <= 30; s++) {
          const normS = s / 30;
          const x = (normS - 0.4) * (240 * fishScale);
          const bodyW = Math.sin(normS * Math.PI) * (70 * fishScale);
          const y = sinPhi * bodyW;
          const z = cosPhi * (bodyW * 0.85);
          const p = project3D(x, y, z, rotX, rotY, rotZ, cx, cy, 450, 520);
          if (s === 0) ctx.moveTo(p.x, p.y);
          else ctx.lineTo(p.x, p.y);
        }
        ctx.strokeStyle = hsla((baseHue + str * 6) % 360, 95, 75, 0.25);
        ctx.lineWidth = str % 4 === 0 ? 1.4 : 0.8;
        ctx.stroke();
      }
      const tailWave = Math.sin(t * 2.8) * (18 * fishScale);
      for (let ray = -5; ray <= 5; ray++) {
        const normRay = ray / 5;
        const pTailBase = project3D(-110 * fishScale, 0, 0, rotX, rotY, rotZ, cx, cy, 450, 520);
        const pTailTip = project3D(-165 * fishScale, normRay * (45 * fishScale) + tailWave, normRay * (20 * fishScale), rotX, rotY, rotZ, cx, cy, 450, 520);
        ctx.beginPath();
        ctx.moveTo(pTailBase.x, pTailBase.y);
        ctx.lineTo(pTailTip.x, pTailTip.y);
        ctx.strokeStyle = hsla((baseHue + 20) % 360, 95, 75, 0.65 * pTailTip.depth);
        ctx.lineWidth = 1.6;
        ctx.stroke();
      }
      for (let p = 0; p < 8; p++) {
        const normP = p / 7;
        const pecFlap = Math.sin(t * 3.2 + p * 0.3) * (14 * fishScale);
        const pBase = project3D(-25 * fishScale, 20 * fishScale, 45 * fishScale, rotX, rotY, rotZ, cx, cy, 450, 520);
        const pTip = project3D(
          (-45 + normP * 25) * fishScale,
          (55 + normP * 12) * fishScale + pecFlap,
          (65 + normP * 10) * fishScale,
          rotX,
          rotY,
          rotZ,
          cx,
          cy,
          450,
          520
        );
        ctx.beginPath();
        ctx.moveTo(pBase.x, pBase.y);
        ctx.lineTo(pTip.x, pTip.y);
        ctx.strokeStyle = "rgba(56, 189, 248, 0.55)";
        ctx.lineWidth = 1.4;
        ctx.stroke();
      }
      const jawGape = 0.35 + 0.22 * Math.sin(t * 1.6);
      const TEETH_COUNT = 28;
      ctx.beginPath();
      for (let i = 0; i <= 20; i++) {
        const theta = i / 20 * Math.PI;
        const jx = (35 + Math.cos(theta) * 38) * fishScale;
        const jy = (-22 + Math.sin(theta) * 18) * fishScale;
        const jz = Math.sin(theta) * 48 * fishScale;
        const p = project3D(jx, jy, jz, rotX, rotY, rotZ, cx, cy, 450, 520);
        if (i === 0) ctx.moveTo(p.x, p.y);
        else ctx.lineTo(p.x, p.y);
      }
      ctx.strokeStyle = "#38bdf8";
      ctx.lineWidth = 3 * fishScale;
      ctx.stroke();
      ctx.beginPath();
      for (let i = 0; i <= 20; i++) {
        const theta = i / 20 * Math.PI;
        const jx = (38 + Math.cos(theta) * 42) * fishScale;
        const jy = (18 + Math.sin(theta) * 22 + jawGape * 32) * fishScale;
        const jz = Math.sin(theta) * 52 * fishScale;
        const p = project3D(jx, jy, jz, rotX, rotY, rotZ, cx, cy, 450, 520);
        if (i === 0) ctx.moveTo(p.x, p.y);
        else ctx.lineTo(p.x, p.y);
      }
      ctx.strokeStyle = "#38bdf8";
      ctx.lineWidth = 3 * fishScale;
      ctx.stroke();
      for (let i = 0; i < TEETH_COUNT; i++) {
        const theta = i / TEETH_COUNT * Math.PI;
        const toothLen = (18 + i % 5 * 5) * fishScale;
        const utX = (35 + Math.cos(theta) * 36) * fishScale;
        const utY = (-20 + Math.sin(theta) * 16) * fishScale;
        const utZ = Math.sin(theta) * 46 * fishScale;
        const pUBase = project3D(utX, utY, utZ, rotX, rotY, rotZ, cx, cy, 450, 520);
        const pUMid = project3D(utX + 2 * fishScale, utY + toothLen * 0.6, utZ, rotX, rotY, rotZ, cx, cy, 450, 520);
        const pUTip = project3D(utX - 4 * fishScale, utY + toothLen, utZ, rotX, rotY, rotZ, cx, cy, 450, 520);
        ctx.beginPath();
        ctx.moveTo(pUBase.x, pUBase.y);
        ctx.quadraticCurveTo(pUMid.x, pUMid.y, pUTip.x, pUTip.y);
        ctx.strokeStyle = hsla(200, 100, 95, 0.9 * pUBase.depth);
        ctx.lineWidth = Math.max(1, 1.8 * pUBase.depth);
        ctx.stroke();
        const ltX = (38 + Math.cos(theta) * 40) * fishScale;
        const ltY = (16 + Math.sin(theta) * 20 + jawGape * 32) * fishScale;
        const ltZ = Math.sin(theta) * 50 * fishScale;
        const pLBase = project3D(ltX, ltY, ltZ, rotX, rotY, rotZ, cx, cy, 450, 520);
        const pLMid = project3D(ltX + 2 * fishScale, ltY - toothLen * 0.6, ltZ, rotX, rotY, rotZ, cx, cy, 450, 520);
        const pLTip = project3D(ltX - 4 * fishScale, ltY - toothLen * 1.15, ltZ, rotX, rotY, rotZ, cx, cy, 450, 520);
        ctx.beginPath();
        ctx.moveTo(pLBase.x, pLBase.y);
        ctx.quadraticCurveTo(pLMid.x, pLMid.y, pLTip.x, pLTip.y);
        ctx.strokeStyle = hsla(200, 100, 95, 0.9 * pLBase.depth);
        ctx.lineWidth = Math.max(1, 1.8 * pLBase.depth);
        ctx.stroke();
      }
      for (let lp = 0; lp < 18; lp++) {
        const normLP = lp / 17;
        const lx = (-90 + normLP * 115) * fishScale;
        const ly = Math.sin(normLP * Math.PI) * (14 * fishScale);
        const lz = 52 * fishScale;
        const pL = project3D(lx, ly, lz, rotX, rotY, rotZ, cx, cy, 450, 520);
        ctx.fillStyle = "#67e8f9";
        ctx.beginPath();
        ctx.arc(pL.x, pL.y, 2.2 * pL.depth, 0, Math.PI * 2);
        ctx.fill();
      }
      const illiciumRoot = { x: 22 * fishScale, y: -58 * fishScale, z: 0 };
      const escaRawX = (105 + Math.sin(t * 2.5) * 28) * fishScale;
      const escaRawY = (-118 + Math.cos(t * 2) * 22) * fishScale;
      const escaRawZ = Math.sin(t * 1.8) * 65 * fishScale;
      const rodSteps = 24;
      ctx.beginPath();
      for (let st = 0; st <= rodSteps; st++) {
        const nst = st / rodSteps;
        const rx = illiciumRoot.x + (escaRawX - illiciumRoot.x) * nst;
        const ry = illiciumRoot.y + (escaRawY - illiciumRoot.y) * nst - Math.sin(nst * Math.PI) * (26 * fishScale);
        const rz = illiciumRoot.z + (escaRawZ - illiciumRoot.z) * nst;
        const p = project3D(rx, ry, rz, rotX, rotY, rotZ, cx, cy, 450, 520);
        if (st === 0) ctx.moveTo(p.x, p.y);
        else ctx.lineTo(p.x, p.y);
      }
      ctx.strokeStyle = "#38bdf8";
      ctx.lineWidth = 2.4;
      ctx.stroke();
      const pEsca = project3D(escaRawX, escaRawY, escaRawZ, rotX, rotY, rotZ, cx, cy, 450, 520);
      const pulse = 1 + 0.35 * Math.sin(t * 4);
      const glowR = 18 * fishScale * pulse * glowScale * pEsca.depth;
      const grad = ctx.createRadialGradient(pEsca.x, pEsca.y, 2, pEsca.x, pEsca.y, glowR * 3.8);
      grad.addColorStop(0, "rgba(56, 189, 248, 0.98)");
      grad.addColorStop(0.35, "rgba(56, 189, 248, 0.45)");
      grad.addColorStop(1, "rgba(56, 189, 248, 0)");
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(pEsca.x, pEsca.y, glowR * 3.8, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#ffffff";
      ctx.beginPath();
      ctx.arc(pEsca.x, pEsca.y, 5 * pEsca.depth * fishScale, 0, Math.PI * 2);
      ctx.fill();
      for (let b = 0; b < BACTERIA_PARTICLES; b++) {
        bacLife[b] -= dt * 1.5;
        if (bacLife[b] <= 0) {
          bacX[b] = escaRawX + (Math.random() - 0.5) * 12;
          bacY[b] = escaRawY + (Math.random() - 0.5) * 12;
          bacZ[b] = escaRawZ + (Math.random() - 0.5) * 12;
          bacLife[b] = 1;
        }
        bacX[b] -= dt * 28;
        bacY[b] += (Math.random() - 0.5) * 2;
        bacZ[b] += (Math.random() - 0.5) * 2;
        const pB = project3D(bacX[b], bacY[b], bacZ[b], rotX, rotY, rotZ, cx, cy, 450, 520);
        ctx.fillStyle = hsla(190, 100, 80, bacLife[b] * 0.75 * pB.depth);
        ctx.fillRect(pB.x, pB.y, 2.2 * pB.depth, 2.2 * pB.depth);
      }
      ctx.restore();
    }
  };
}

// Default parameters from content metadata
const defaultParams = [
  {
    "key": "lureSpeed",
    "label": "Esca Lure Oscillation",
    "type": "range",
    "min": 0.4,
    "max": 2.5,
    "step": 0.1,
    "defaultValue": 1.2,
    "description": "Photophore lure wave frequency"
  },
  {
    "key": "lureGlow",
    "label": "Bioluminescence Intensity",
    "type": "range",
    "min": 0.5,
    "max": 2.2,
    "step": 0.1,
    "defaultValue": 1.3,
    "description": "Luciferin photonic emission radius"
  }
];

if (!window.__art_instances) window.__art_instances = {};
if (!window.__art_instances['deep-sea-anglerfish']) {
  const inst = typeof createDeepSeaAnglerfish === 'function' ? createDeepSeaAnglerfish() : null;
  if (inst && inst.setup) {
    inst.setup({ ctx, width, height, dpr: 1, aspectRatio: width / height }, defaultParams);
  }
  window.__art_instances['deep-sea-anglerfish'] = inst;
}

const instance = window.__art_instances['deep-sea-anglerfish'];
if (instance && instance.render) {
  instance.render(
    { ctx, width, height, dpr: 1, aspectRatio: width / height },
    { time, deltaTime: dt, frameCount: Math.floor(time * 60), fps: 60 },
    defaultParams
  );
}`,

  // 045. Giant Praya Siphonophore
  'giant-siphonophore': `// 045 - Giant Praya Siphonophore (creatures)
// 1:1 Original algorithm engine source
function createGiantSiphonophore() {
  const STEM_FILAMENTS = 36;
  const TENTILLA_COUNT = 80;
  return {
    setup() {
    },
    render(context, timeState, params) {
      const { ctx, width, height } = context;
      const waveSpeed = Number(params.flowSpeed || 0.9);
      const chainLength = Number(params.chainSpread || 1.1);
      const t = timeState.time * waveSpeed;
      ctx.fillStyle = "#020306";
      ctx.fillRect(0, 0, width, height);
      const cx = width * 0.5;
      const cy = height * 0.5;
      const scale = Math.min(width, height) * 0.42 * chainLength;
      ctx.save();
      ctx.globalCompositeOperation = "screen";
      for (let f = 0; f < STEM_FILAMENTS; f++) {
        const normF = f / (STEM_FILAMENTS - 1);
        const phaseOffset = normF * Math.PI * 2;
        const stemRadius = scale * 0.32 * (0.8 + 0.4 * Math.sin(normF * Math.PI));
        ctx.beginPath();
        const steps = 65;
        for (let i = 0; i <= steps; i++) {
          const normI = i / steps;
          const theta = normI * Math.PI * 3.8 + t * 0.8 + phaseOffset;
          const waveX = Math.sin(t * 1.4 + normI * 5 + normF * 2) * 22;
          const sx = cx + (normI - 0.5) * scale * 1.85 + waveX;
          const sy = cy + Math.sin(theta) * stemRadius;
          if (i === 0) ctx.moveTo(sx, sy);
          else ctx.lineTo(sx, sy);
        }
        const stemHue = (180 + normF * 45 + Math.sin(t * 0.5) * 20) % 360;
        ctx.strokeStyle = hsla(stemHue, 95, 70, 0.25);
        ctx.lineWidth = f % 4 === 0 ? 1.6 : 0.8;
        ctx.stroke();
      }
      const NODE_COUNT = 18;
      const stemNodes = [];
      for (let n = 0; n < NODE_COUNT; n++) {
        const normN = n / (NODE_COUNT - 1);
        const theta = normN * Math.PI * 3.8 + t * 0.8;
        const nx = cx + (normN - 0.5) * scale * 1.85 + Math.sin(t * 1.4 + normN * 5) * 22;
        const ny = cy + Math.sin(theta) * (scale * 0.32);
        stemNodes.push({ x: nx, y: ny });
        const pulse = 1 + 0.28 * Math.sin(t * 3.5 - n * 0.4);
        for (let ring = 1; ring <= 3; ring++) {
          ctx.beginPath();
          ctx.arc(nx, ny, (4 + ring * 3.5) * pulse, 0, Math.PI * 2);
          ctx.strokeStyle = hsla(185 + ring * 10, 95, 75, 0.5 - ring * 0.1);
          ctx.lineWidth = 1;
          ctx.stroke();
        }
        const isRed = n % 3 === 0;
        const pColor = isRed ? "#ef4444" : "#38bdf8";
        ctx.fillStyle = pColor;
        ctx.shadowColor = pColor;
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.arc(nx, ny, 2.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      }
      for (let k = 0; k < TENTILLA_COUNT; k++) {
        const normK = k / (TENTILLA_COUNT - 1);
        const parentIdx = Math.floor(normK * (stemNodes.length - 1));
        const root = stemNodes[parentIdx];
        ctx.beginPath();
        ctx.moveTo(root.x, root.y);
        const tentSteps = 32;
        const maxDrop = 160 * chainLength;
        for (let s = 1; s <= tentSteps; s++) {
          const ns = s / tentSteps;
          const w1 = Math.sin(t * 2.8 - ns * 7 + k * 0.3) * (20 * ns);
          const w2 = Math.cos(t * 1.8 + ns * 14 - k * 0.2) * (10 * ns);
          const tx = root.x + w1 + w2;
          const ty = root.y + ns * maxDrop;
          ctx.lineTo(tx, ty);
          if (s % 6 === 0) {
            const isRedSpark = (k + s) % 4 === 0;
            ctx.fillStyle = isRedSpark ? "rgba(239, 68, 68, 0.85)" : "rgba(56, 189, 248, 0.85)";
            ctx.fillRect(tx - 1, ty - 1, 2, 2);
          }
        }
        const tentHue = (180 + normK * 50 + t * 15) % 360;
        ctx.strokeStyle = hsla(tentHue, 95, 75, k % 3 === 0 ? 0.55 : 0.22);
        ctx.lineWidth = k % 3 === 0 ? 1.2 : 0.7;
        ctx.stroke();
      }
      ctx.restore();
    }
  };
}

// Default parameters from content metadata
const defaultParams = [
  {
    "key": "flowSpeed",
    "label": "Abyssal Drift Velocity",
    "type": "range",
    "min": 0.3,
    "max": 2.5,
    "step": 0.1,
    "defaultValue": 0.9,
    "description": "Colony swimming undulation speed"
  },
  {
    "key": "chainSpread",
    "label": "Colony Extension",
    "type": "range",
    "min": 0.6,
    "max": 1.6,
    "step": 0.1,
    "defaultValue": 1.1,
    "description": "Coenosarc stem span scaling"
  }
];

if (!window.__art_instances) window.__art_instances = {};
if (!window.__art_instances['giant-siphonophore']) {
  const inst = typeof createGiantSiphonophore === 'function' ? createGiantSiphonophore() : null;
  if (inst && inst.setup) {
    inst.setup({ ctx, width, height, dpr: 1, aspectRatio: width / height }, defaultParams);
  }
  window.__art_instances['giant-siphonophore'] = inst;
}

const instance = window.__art_instances['giant-siphonophore'];
if (instance && instance.render) {
  instance.render(
    { ctx, width, height, dpr: 1, aspectRatio: width / height },
    { time, deltaTime: dt, frameCount: Math.floor(time * 60), fps: 60 },
    defaultParams
  );
}`,

  // 046. Bioluminescent Comb Jelly
  'comb-jelly-ctenophore': `// 046 - Bioluminescent Comb Jelly (creatures)
// 1:1 Original algorithm engine source
function createCombJellyCtenophore() {
  const BODY_LOOPS = 36;
  const COMB_ROWS = 8;
  const PLATES_PER_ROW = 36;
  return {
    setup() {
    },
    render(context, timeState, params) {
      const { ctx, width, height } = context;
      const beatSpeed = Number(params.ciliaSpeed || 1.3);
      const glowScale = Number(params.glowBoost || 1.2);
      const t = timeState.time * beatSpeed;
      ctx.fillStyle = "#020307";
      ctx.fillRect(0, 0, width, height);
      const cx = width * 0.5;
      const cy = height * 0.46 + Math.sin(t * 0.8) * 10;
      const bodyW = Math.min(width, height) * 0.24;
      const bodyH = Math.min(width, height) * 0.35;
      ctx.save();
      ctx.translate(cx, cy);
      ctx.globalCompositeOperation = "screen";
      for (let l = 0; l < BODY_LOOPS; l++) {
        const normL = (l + 1) / BODY_LOOPS;
        const curW = bodyW * normL;
        const curH = bodyH * Math.pow(normL, 0.85);
        ctx.beginPath();
        const steps = 60;
        for (let i = 0; i <= steps; i++) {
          const theta = i / steps * Math.PI * 2;
          const rip = Math.sin(theta * 6 + t * 2 + normL * 3) * (3 * normL);
          const px = Math.cos(theta) * (curW + rip);
          const py = Math.sin(theta) * (curH + rip * 0.5);
          if (i === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        ctx.closePath();
        const loopHue = (185 + normL * 40 + Math.sin(t) * 15) % 360;
        const loopAlpha = (0.04 + normL * 0.28) * glowScale;
        ctx.strokeStyle = hsla(loopHue, 95, 70, loopAlpha);
        ctx.lineWidth = normL > 0.9 ? 1.6 : 0.8;
        ctx.stroke();
      }
      ctx.beginPath();
      ctx.arc(0, -bodyH * 0.96, 4.5, 0, Math.PI * 2);
      ctx.fillStyle = "#f0f9ff";
      ctx.shadowColor = "#38bdf8";
      ctx.shadowBlur = 14;
      ctx.fill();
      ctx.shadowBlur = 0;
      for (let r = 0; r < COMB_ROWS; r++) {
        const phi = r / COMB_ROWS * Math.PI * 2;
        const rowXOffset = Math.sin(phi) * (bodyW * 0.92);
        const depth = Math.cos(phi);
        const depthAlpha = 0.35 + (depth + 1) * 0.35;
        for (let p = 0; p < PLATES_PER_ROW; p++) {
          const normP = p / (PLATES_PER_ROW - 1);
          const plateAngle = (normP - 0.5) * Math.PI * 0.88;
          const px = rowXOffset * Math.cos(plateAngle);
          const py = Math.sin(plateAngle) * (bodyH * 0.95);
          const wavePhase = t * 4.5 - normP * 9 + r * 0.5;
          const beatAmplitude = Math.sin(wavePhase);
          const spectralHue = (normP * 360 + wavePhase * 45) % 360;
          const plateLen = (8 + Math.abs(beatAmplitude) * 7) * (depth > 0 ? 1 : 0.6);
          ctx.beginPath();
          ctx.moveTo(px, py);
          ctx.lineTo(px + Math.sin(phi) * plateLen, py + depth * 2);
          ctx.strokeStyle = hsla(spectralHue, 100, 72, depthAlpha * glowScale);
          ctx.lineWidth = 2.2;
          ctx.stroke();
          if (Math.abs(beatAmplitude) > 0.65) {
            ctx.fillStyle = hsla(spectralHue, 100, 90, depthAlpha);
            ctx.fillRect(px - 1, py - 1, 3, 3);
          }
        }
      }
      for (let side = -1; side <= 1; side += 2) {
        for (let th = 0; th < 24; th++) {
          const normTh = th / 23;
          const rootX = side * (bodyW * (0.3 + normTh * 0.25));
          const rootY = bodyH * 0.25;
          ctx.beginPath();
          ctx.moveTo(rootX, rootY);
          const tentSteps = 40;
          const tentLen = bodyH * 1.6;
          for (let s = 1; s <= tentSteps; s++) {
            const ns = s / tentSteps;
            const w1 = Math.sin(t * 3.5 - ns * 6 + th * 0.3 + side) * (28 * ns);
            const w2 = Math.cos(t * 2.2 + ns * 12 - th * 0.2) * (14 * ns);
            const tx = rootX + side * (ns * 35) + w1 + w2;
            const ty = rootY + ns * tentLen;
            ctx.lineTo(tx, ty);
          }
          const thHue = (175 + normTh * 50 + t * 15) % 360;
          ctx.strokeStyle = hsla(thHue, 95, 75, (th % 3 === 0 ? 0.6 : 0.22) * glowScale);
          ctx.lineWidth = th % 3 === 0 ? 1.4 : 0.8;
          ctx.stroke();
        }
      }
      ctx.restore();
    }
  };
}

// Default parameters from content metadata
const defaultParams = [
  {
    "key": "ciliaSpeed",
    "label": "Ciliary Beat Frequency",
    "type": "range",
    "min": 0.4,
    "max": 3,
    "step": 0.1,
    "defaultValue": 1.3,
    "description": "Metachronal wave transmission rate"
  },
  {
    "key": "glowBoost",
    "label": "Iridescent Diffraction",
    "type": "range",
    "min": 0.5,
    "max": 2,
    "step": 0.1,
    "defaultValue": 1.2,
    "description": "Spectral rainbow intensity multiplier"
  }
];

if (!window.__art_instances) window.__art_instances = {};
if (!window.__art_instances['comb-jelly-ctenophore']) {
  const inst = typeof createCombJellyCtenophore === 'function' ? createCombJellyCtenophore() : null;
  if (inst && inst.setup) {
    inst.setup({ ctx, width, height, dpr: 1, aspectRatio: width / height }, defaultParams);
  }
  window.__art_instances['comb-jelly-ctenophore'] = inst;
}

const instance = window.__art_instances['comb-jelly-ctenophore'];
if (instance && instance.render) {
  instance.render(
    { ctx, width, height, dpr: 1, aspectRatio: width / height },
    { time, deltaTime: dt, frameCount: Math.floor(time * 60), fps: 60 },
    defaultParams
  );
}`,

  // 047. Vampire Squid from Hell
  'vampire-squid': `// 047 - Vampire Squid from Hell (creatures)
// 1:1 Original algorithm engine source
function createVampireSquid() {
  const ARM_COUNT = 8;
  const WEB_LAYERS = 18;
  return {
    setup() {
    },
    render(context, timeState, params) {
      const { ctx, width, height } = context;
      const pulseSpeed = Number(params.swimSpeed || 1);
      const t = timeState.time * pulseSpeed;
      ctx.fillStyle = "#020306";
      ctx.fillRect(0, 0, width, height);
      const cx = width * 0.5;
      const cy = height * 0.46;
      const squidScale = Math.min(width, height) / 480;
      const rotY = Math.sin(t * 0.5) * 0.45;
      const rotX = 0.55 + Math.sin(t * 0.7) * 0.25;
      const rotZ = Math.sin(t * 0.4) * 0.15;
      ctx.save();
      ctx.globalCompositeOperation = "screen";
      const baseHue = (350 + Math.sin(t * 0.6) * 15) % 360;
      for (let layer = 1; layer <= WEB_LAYERS; layer++) {
        const normL = layer / WEB_LAYERS;
        const curR = 120 * normL * squidScale;
        const mantleConeZ = (1 - normL) * (75 * squidScale);
        ctx.beginPath();
        const steps = 64;
        let avgDepth = 0;
        for (let i = 0; i <= steps; i++) {
          const phi = i / steps * Math.PI * 2;
          const armIndex = phi / (Math.PI * 2) * ARM_COUNT;
          const armWave = Math.sin(t * 2.8 + armIndex * 0.8) * (18 * normL * squidScale);
          const rawX = Math.cos(phi) * (curR + armWave);
          const rawY = Math.sin(phi) * (curR * 0.7 + armWave) + 20 * normL * squidScale;
          const rawZ = -mantleConeZ + Math.sin(phi * ARM_COUNT) * (12 * normL * squidScale);
          const p = project3D(rawX, rawY, rawZ, rotX, rotY, rotZ, cx, cy, 450, 520);
          avgDepth += p.depth;
          if (i === 0) ctx.moveTo(p.x, p.y);
          else ctx.lineTo(p.x, p.y);
        }
        avgDepth /= steps + 1;
        const layerHue = (baseHue + normL * 25) % 360;
        const alpha = (0.06 + normL * 0.32) * avgDepth;
        ctx.strokeStyle = hsla(layerHue, 90, 65, alpha);
        ctx.lineWidth = Math.max(0.8, (layer === WEB_LAYERS ? 2 : 0.9) * avgDepth);
        ctx.stroke();
      }
      for (let a = 0; a < ARM_COUNT; a++) {
        const phi = a / ARM_COUNT * Math.PI * 2;
        const armWave = Math.sin(t * 2.8 + a * 0.8) * (18 * squidScale);
        const armR = (120 + armWave) * squidScale;
        const tipX = Math.cos(phi) * armR;
        const tipY = Math.sin(phi) * (armR * 0.7) + 20 * squidScale;
        const tipZ = Math.sin(phi * ARM_COUNT) * (12 * squidScale);
        const pOrigin = project3D(0, -35 * squidScale, -60 * squidScale, rotX, rotY, rotZ, cx, cy, 450, 520);
        const pTip = project3D(tipX, tipY, tipZ, rotX, rotY, rotZ, cx, cy, 450, 520);
        ctx.beginPath();
        ctx.moveTo(pOrigin.x, pOrigin.y);
        ctx.lineTo(pTip.x, pTip.y);
        ctx.strokeStyle = hsla(350, 80, 50, 0.45 * pTip.depth);
        ctx.lineWidth = Math.max(0.8, 1.4 * pTip.depth);
        ctx.stroke();
        const pulse = 1 + 0.35 * Math.sin(t * 4 + a);
        const glowR = 5.5 * pulse * squidScale * pTip.depth;
        ctx.fillStyle = hsla(190, 100, 75, 0.95);
        ctx.shadowColor = "#38bdf8";
        ctx.shadowBlur = 12 * pTip.depth;
        ctx.beginPath();
        ctx.arc(pTip.x, pTip.y, glowR, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      }
      for (let s = -1; s <= 1; s += 2) {
        ctx.beginPath();
        const filSteps = 30;
        const maxDrop = 190 * squidScale;
        for (let st = 0; st <= filSteps; st++) {
          const nst = st / filSteps;
          const fx = s * (16 * squidScale) + Math.sin(t * 2.2 - nst * 6 + s) * (22 * nst * squidScale);
          const fy = (20 + nst * maxDrop) * squidScale;
          const fz = Math.cos(t * 1.8 + nst * 8 + s) * (35 * nst * squidScale);
          const p = project3D(fx, fy, fz, rotX, rotY, rotZ, cx, cy, 450, 520);
          if (st === 0) ctx.moveTo(p.x, p.y);
          else ctx.lineTo(p.x, p.y);
        }
        ctx.strokeStyle = "rgba(244, 114, 182, 0.65)";
        ctx.lineWidth = 1.2;
        ctx.stroke();
      }
      ctx.restore();
    }
  };
}

// Default parameters from content metadata
const defaultParams = [
  {
    "key": "swimSpeed",
    "label": "Mantle Pulse Velocity",
    "type": "range",
    "min": 0.4,
    "max": 2.2,
    "step": 0.1,
    "defaultValue": 1,
    "description": "Cloaked umbrella contraction rate"
  },
  {
    "key": "cloakInversion",
    "label": "Web Flaring Angle",
    "type": "range",
    "min": 0.2,
    "max": 1.5,
    "step": 0.1,
    "defaultValue": 0.5,
    "description": "Interbrachial webbing spread"
  }
];

if (!window.__art_instances) window.__art_instances = {};
if (!window.__art_instances['vampire-squid']) {
  const inst = typeof createVampireSquid === 'function' ? createVampireSquid() : null;
  if (inst && inst.setup) {
    inst.setup({ ctx, width, height, dpr: 1, aspectRatio: width / height }, defaultParams);
  }
  window.__art_instances['vampire-squid'] = inst;
}

const instance = window.__art_instances['vampire-squid'];
if (instance && instance.render) {
  instance.render(
    { ctx, width, height, dpr: 1, aspectRatio: width / height },
    { time, deltaTime: dt, frameCount: Math.floor(time * 60), fps: 60 },
    defaultParams
  );
}`,

  // 048. Dumbo Octopus Flight
  'dumbo-octopus': `// 048 - Dumbo Octopus Flight (creatures)
// 1:1 Original algorithm engine source
function createDumboOctopus() {
  const MANTLE_RIBBONS = 28;
  const EAR_FILAMENTS = 20;
  return {
    setup() {
    },
    render(context, timeState, params) {
      const { ctx, width, height } = context;
      const flapSpeed = Number(params.flapRate || 1.3);
      const earSpan = Number(params.earSpread || 1.2);
      const t = timeState.time * flapSpeed;
      ctx.fillStyle = "#020307";
      ctx.fillRect(0, 0, width, height);
      const cx = width * 0.5 + Math.sin(t * 0.5) * (width * 0.08);
      const cy = height * 0.45 + Math.sin(t * 1.6) * 12;
      const dumboScale = Math.min(width, height) / 480;
      ctx.save();
      ctx.translate(cx, cy);
      ctx.globalCompositeOperation = "screen";
      const baseHue = (330 + Math.sin(t * 0.6) * 20) % 360;
      for (let r = 0; r < MANTLE_RIBBONS; r++) {
        const normR = (r + 1) / MANTLE_RIBBONS;
        const curW = 46 * normR * dumboScale;
        const curH = 48 * normR * dumboScale;
        ctx.beginPath();
        ctx.ellipse(0, -10 * dumboScale, curW, curH, 0, 0, Math.PI * 2);
        const mHue = (baseHue + normR * 25) % 360;
        ctx.strokeStyle = hsla(mHue, 90, 70, 0.06 + normR * 0.3);
        ctx.lineWidth = normR > 0.88 ? 1.6 : 0.8;
        ctx.stroke();
      }
      const earFlap = Math.sin(t * 3.2);
      const earCurl = Math.cos(t * 3.2);
      for (let s = -1; s <= 1; s += 2) {
        for (let ef = 0; ef < EAR_FILAMENTS; ef++) {
          const normE = ef / (EAR_FILAMENTS - 1);
          const rootX = s * (22 + normE * 14) * dumboScale;
          const rootY = (-34 + normE * 12) * dumboScale;
          const curSpan = (55 + normE * 22) * earSpan * dumboScale;
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
          const earHue = (baseHue - 15 + normE * 30) % 360;
          ctx.strokeStyle = hsla(earHue, 95, 78, 0.08 + normE * 0.35);
          ctx.lineWidth = ef % 4 === 0 ? 1.6 : 0.8;
          ctx.stroke();
        }
      }
      for (let s = -1; s <= 1; s += 2) {
        const eyeX = s * 24 * dumboScale;
        const eyeY = 0;
        ctx.fillStyle = "#0284c7";
        ctx.beginPath();
        ctx.arc(eyeX, eyeY, 8 * dumboScale, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = "#e0f2fe";
        ctx.lineWidth = 1.4;
        ctx.stroke();
        ctx.fillStyle = "#ffffff";
        ctx.beginPath();
        ctx.arc(eyeX - 2.5, eyeY - 2.5, 3 * dumboScale, 0, Math.PI * 2);
        ctx.fill();
      }
      const ARM_COUNT = 8;
      for (let layer = 0; layer < 6; layer++) {
        const normL = (layer + 1) / 6;
        const skirtTips = [];
        for (let a = 0; a < ARM_COUNT; a++) {
          const normA = (a / (ARM_COUNT - 1) - 0.5) * Math.PI * 0.82;
          const armWave = Math.sin(t * 2.8 + a * 0.7 + layer * 0.3) * 8 * dumboScale;
          const armLen = (65 + (4 - Math.abs(a - 3.5)) * 8) * normL * dumboScale;
          const ax = Math.sin(normA) * (45 * normL * dumboScale) + armWave;
          const ay = 22 * dumboScale + Math.cos(normA) * armLen;
          skirtTips.push({ x: ax, y: ay });
        }
        ctx.beginPath();
        ctx.moveTo(skirtTips[0].x, skirtTips[0].y);
        for (let a = 1; a < ARM_COUNT; a++) {
          const prev = skirtTips[a - 1];
          const cur = skirtTips[a];
          const midX = (prev.x + cur.x) * 0.5;
          const midY = (prev.y + cur.y) * 0.5 - 10 * normL * dumboScale;
          ctx.quadraticCurveTo(midX, midY, cur.x, cur.y);
        }
        ctx.lineTo(25 * normL * dumboScale, 20 * dumboScale);
        ctx.lineTo(-25 * normL * dumboScale, 20 * dumboScale);
        ctx.closePath();
        const sHue = (baseHue + layer * 10) % 360;
        ctx.strokeStyle = hsla(sHue, 90, 75, 0.1 + normL * 0.35);
        ctx.lineWidth = layer === 5 ? 1.8 : 0.8;
        ctx.stroke();
      }
      ctx.restore();
    }
  };
}

// Default parameters from content metadata
const defaultParams = [
  {
    "key": "flapRate",
    "label": "Ear Flap Rhythm",
    "type": "range",
    "min": 0.5,
    "max": 2.5,
    "step": 0.1,
    "defaultValue": 1.3,
    "description": "Pectoral fin flapping frequency"
  },
  {
    "key": "earSpread",
    "label": "Pectoral Fin Wingspan",
    "type": "range",
    "min": 0.7,
    "max": 1.8,
    "step": 0.1,
    "defaultValue": 1.2,
    "description": "Ear-like fin extension scaling"
  }
];

if (!window.__art_instances) window.__art_instances = {};
if (!window.__art_instances['dumbo-octopus']) {
  const inst = typeof createDumboOctopus === 'function' ? createDumboOctopus() : null;
  if (inst && inst.setup) {
    inst.setup({ ctx, width, height, dpr: 1, aspectRatio: width / height }, defaultParams);
  }
  window.__art_instances['dumbo-octopus'] = inst;
}

const instance = window.__art_instances['dumbo-octopus'];
if (instance && instance.render) {
  instance.render(
    { ctx, width, height, dpr: 1, aspectRatio: width / height },
    { time, deltaTime: dt, frameCount: Math.floor(time * 60), fps: 60 },
    defaultParams
  );
}`,

  // 049. Gulper Pelican Eel
  'gulper-eel': `// 049 - Gulper Pelican Eel (creatures)
// 1:1 Original algorithm engine source
function createGulperEel() {
  const POUCH_RIBS = 32;
  const TAIL_NODES = 65;
  return {
    setup() {
    },
    render(context, timeState, params) {
      const { ctx, width, height } = context;
      const swimSpeed = Number(params.swimSpeed || 1.1);
      const jawExpansion = Number(params.jawInflation || 1);
      const t = timeState.time * swimSpeed;
      ctx.fillStyle = "#020306";
      ctx.fillRect(0, 0, width, height);
      const cx = width * 0.42;
      const cy = height * 0.46 + Math.sin(t * 1.2) * 8;
      const eelScale = Math.min(width, height) / 520;
      ctx.save();
      ctx.translate(cx, cy);
      ctx.globalCompositeOperation = "screen";
      const baseHue = (210 + Math.sin(t * 0.5) * 15) % 360;
      const gapePulse = 1 + 0.28 * Math.sin(t * 2.2) * jawExpansion;
      for (let r = 1; r <= POUCH_RIBS; r++) {
        const normR = r / POUCH_RIBS;
        const curScale = normR * eelScale;
        ctx.beginPath();
        ctx.moveTo(-15 * curScale, -15 * curScale);
        ctx.quadraticCurveTo(45 * curScale, -35 * curScale, 115 * curScale, -10 * curScale);
        ctx.bezierCurveTo(
          (95 + Math.sin(r * 0.4 + t * 3) * 6) * curScale,
          90 * gapePulse * curScale,
          (-12 + Math.cos(r * 0.3 - t * 2) * 6) * curScale,
          115 * gapePulse * curScale,
          -40 * curScale,
          18 * curScale
        );
        ctx.closePath();
        const ribHue = (baseHue + normR * 30) % 360;
        ctx.strokeStyle = hsla(ribHue, 95, 68, 0.05 + normR * 0.38);
        ctx.lineWidth = r === POUCH_RIBS ? 2.2 : 0.9;
        ctx.stroke();
        if (r % 6 === 0) {
          ctx.fillStyle = hsla(ribHue, 85, 45, 0.04);
          ctx.fill();
        }
      }
      for (let s = 1; s <= 12; s++) {
        const normS = s / 12;
        ctx.beginPath();
        ctx.moveTo(10 * eelScale, -10 * eelScale);
        ctx.quadraticCurveTo(
          (20 + s * 8) * eelScale,
          (15 + s * 8 * gapePulse) * eelScale,
          (-35 + s * 12) * eelScale,
          65 * gapePulse * eelScale
        );
        ctx.strokeStyle = hsla(190, 100, 75, 0.35);
        ctx.lineWidth = 1;
        ctx.stroke();
      }
      ctx.beginPath();
      ctx.moveTo(-20 * eelScale, -18 * eelScale);
      ctx.quadraticCurveTo(48 * eelScale, -38 * eelScale, 118 * eelScale, -10 * eelScale);
      ctx.strokeStyle = "#38bdf8";
      ctx.lineWidth = 2.4 * eelScale;
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(-40 * eelScale, 18 * eelScale);
      ctx.quadraticCurveTo(40 * eelScale, 85 * gapePulse * eelScale, 118 * eelScale, -10 * eelScale);
      ctx.strokeStyle = "#38bdf8";
      ctx.lineWidth = 2.4 * eelScale;
      ctx.stroke();
      for (let tooth = 0; tooth < 18; tooth++) {
        const normT = tooth / 17;
        const tx = (-15 + normT * 130) * eelScale;
        const ty = (-25 + normT * 15) * eelScale;
        ctx.fillStyle = "#f0f9ff";
        ctx.fillRect(tx, ty, 1.5, 3.5 * eelScale);
      }
      ctx.fillStyle = "#0f172a";
      ctx.beginPath();
      ctx.arc(105 * eelScale, -16 * eelScale, 4.5 * eelScale, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = "#38bdf8";
      ctx.lineWidth = 1.2;
      ctx.stroke();
      ctx.fillStyle = "#38bdf8";
      ctx.beginPath();
      ctx.arc(106 * eelScale, -16 * eelScale, 2 * eelScale, 0, Math.PI * 2);
      ctx.fill();
      const tailRoots = [-40 * eelScale, -35 * eelScale, -30 * eelScale];
      for (let tr = 0; tr < 3; tr++) {
        ctx.beginPath();
        let prevX = tailRoots[tr];
        let prevY = (15 + tr * 4) * eelScale;
        ctx.moveTo(prevX, prevY);
        for (let s = 1; s <= TAIL_NODES; s++) {
          const normS = s / TAIL_NODES;
          const w1 = Math.sin(t * 3.5 - normS * 8 + tr * 0.3) * (34 * Math.pow(normS, 1.2) * eelScale);
          const w2 = Math.cos(t * 2.2 - normS * 14) * (12 * normS * eelScale);
          const curX = prevX - 200 * normS * eelScale;
          const curY = prevY - s * 3.4 * eelScale + w1 + w2;
          ctx.lineTo(curX, curY);
          if (s % 6 === 0 && tr === 1) {
            ctx.fillStyle = hsla(190, 100, 80, 0.85);
            ctx.fillRect(curX - 1, curY - 1, 2.5, 2.5);
          }
          if (s === TAIL_NODES && tr === 1) {
            const pulse = 1 + 0.35 * Math.sin(t * 5);
            const glowR = 16 * pulse * eelScale;
            const glowGrad = ctx.createRadialGradient(curX, curY, 2, curX, curY, glowR * 3.5);
            glowGrad.addColorStop(0, "rgba(239, 68, 68, 0.95)");
            glowGrad.addColorStop(0.4, "rgba(239, 68, 68, 0.45)");
            glowGrad.addColorStop(1, "rgba(239, 68, 68, 0)");
            ctx.fillStyle = glowGrad;
            ctx.beginPath();
            ctx.arc(curX, curY, glowR * 3.5, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillStyle = "#fee2e2";
            ctx.beginPath();
            ctx.arc(curX, curY, 4.5 * eelScale, 0, Math.PI * 2);
            ctx.fill();
          }
        }
        ctx.strokeStyle = hsla((baseHue + tr * 15) % 360, 95, 75, 0.7 - tr * 0.18);
        ctx.lineWidth = tr === 1 ? 2.2 * eelScale : 1.2 * eelScale;
        ctx.stroke();
      }
      ctx.restore();
    }
  };
}

// Default parameters from content metadata
const defaultParams = [
  {
    "key": "swimSpeed",
    "label": "Tail Wave Frequency",
    "type": "range",
    "min": 0.4,
    "max": 2.5,
    "step": 0.1,
    "defaultValue": 1.1,
    "description": "Ribbon whip-tail undulation rate"
  },
  {
    "key": "jawInflation",
    "label": "Gape Distension",
    "type": "range",
    "min": 0.4,
    "max": 2,
    "step": 0.1,
    "defaultValue": 1,
    "description": "Pelican pouch volume expansion"
  }
];

if (!window.__art_instances) window.__art_instances = {};
if (!window.__art_instances['gulper-eel']) {
  const inst = typeof createGulperEel === 'function' ? createGulperEel() : null;
  if (inst && inst.setup) {
    inst.setup({ ctx, width, height, dpr: 1, aspectRatio: width / height }, defaultParams);
  }
  window.__art_instances['gulper-eel'] = inst;
}

const instance = window.__art_instances['gulper-eel'];
if (instance && instance.render) {
  instance.render(
    { ctx, width, height, dpr: 1, aspectRatio: width / height },
    { time, deltaTime: dt, frameCount: Math.floor(time * 60), fps: 60 },
    defaultParams
  );
}`,

  // 050. Pacific Barreleye Fish
  'barreleye-fish': `// 050 - Pacific Barreleye Fish (creatures)
// 1:1 Original algorithm engine source
function createBarreleyeFish() {
  const DOME_RINGS = 24;
  const BODY_RIBBONS = 28;
  return {
    setup() {
    },
    render(context, timeState, params) {
      const { ctx, width, height } = context;
      const eyeRotateSpeed = Number(params.eyeScanSpeed || 0.8);
      const domeGlow = Number(params.domeClarity || 1.2);
      const t = timeState.time * eyeRotateSpeed;
      ctx.fillStyle = "#020408";
      ctx.fillRect(0, 0, width, height);
      const cx = width * 0.48 + Math.sin(t * 0.4) * (width * 0.04);
      const cy = height * 0.5 + Math.sin(t * 1.3) * 6;
      const fishScale = Math.min(width, height) / 480;
      ctx.save();
      ctx.translate(cx, cy);
      ctx.globalCompositeOperation = "screen";
      const baseHue = (205 + Math.sin(t * 0.6) * 15) % 360;
      for (let r = 1; r <= BODY_RIBBONS; r++) {
        const normR = r / BODY_RIBBONS;
        const curScale = normR * fishScale;
        ctx.beginPath();
        ctx.moveTo(-130 * curScale, 5 * curScale);
        ctx.quadraticCurveTo(-45 * curScale, -50 * curScale, 20 * curScale, -38 * curScale);
        ctx.lineTo(20 * curScale, 34 * curScale);
        ctx.quadraticCurveTo(-45 * curScale, 50 * curScale, -130 * curScale, 5 * curScale);
        ctx.closePath();
        const bHue = (baseHue + normR * 25) % 360;
        ctx.strokeStyle = hsla(bHue, 90, 65, 0.06 + normR * 0.35);
        ctx.lineWidth = r === BODY_RIBBONS ? 2.2 * fishScale : 0.9;
        ctx.stroke();
        if (r % 6 === 0) {
          ctx.fillStyle = hsla(bHue, 80, 45, 0.04);
          ctx.fill();
        }
      }
      for (let sc = 0; sc < 20; sc++) {
        const normSc = sc / 19;
        const sx = (-115 + normSc * 125) * fishScale;
        const sy = Math.sin(sc * 1.4) * (20 * fishScale);
        ctx.beginPath();
        ctx.arc(sx, sy, 7 * fishScale, 0.2 * Math.PI, 1.2 * Math.PI);
        ctx.strokeStyle = "rgba(56, 189, 248, 0.45)";
        ctx.lineWidth = 1.2;
        ctx.stroke();
      }
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
        ctx.quadraticCurveTo(
          (5 + normP * 12) * fishScale,
          (50 + normP * 10) * fishScale,
          (-45 + normP * 25) * fishScale,
          (72 + normP * 8) * fishScale
        );
        ctx.strokeStyle = "rgba(56, 189, 248, 0.6)";
        ctx.lineWidth = 1.4;
        ctx.stroke();
      }
      ctx.beginPath();
      ctx.moveTo(20 * fishScale, -28 * fishScale);
      ctx.quadraticCurveTo(82 * fishScale, -12 * fishScale, 88 * fishScale, 10 * fishScale);
      ctx.lineTo(20 * fishScale, 34 * fishScale);
      ctx.closePath();
      ctx.strokeStyle = "#38bdf8";
      ctx.lineWidth = 2 * fishScale;
      ctx.stroke();
      ctx.fillStyle = "#334155";
      ctx.beginPath();
      ctx.arc(74 * fishScale, -4 * fishScale, 3.5 * fishScale, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = "#64748b";
      ctx.lineWidth = 1.2;
      ctx.stroke();
      for (let d = 1; d <= DOME_RINGS; d++) {
        const normD = d / DOME_RINGS;
        const dw = 52 * normD * fishScale;
        const dh = 38 * normD * fishScale;
        ctx.beginPath();
        ctx.ellipse(38 * fishScale, -26 * fishScale, dw, dh, -0.1, 0, Math.PI * 2);
        const domeHue = (185 + normD * 20) % 360;
        ctx.strokeStyle = hsla(domeHue, 95, 75, (0.08 + normD * 0.35) * domeGlow);
        ctx.lineWidth = d === DOME_RINGS ? 2.4 * fishScale : 0.9;
        ctx.stroke();
        if (d % 5 === 0) {
          ctx.fillStyle = hsla(domeHue, 90, 60, 0.05 * domeGlow);
          ctx.fill();
        }
      }
      ctx.beginPath();
      ctx.arc(38 * fishScale, -48 * fishScale, 30 * fishScale, 0.2 * Math.PI, 0.8 * Math.PI);
      ctx.strokeStyle = "#ffffff";
      ctx.lineWidth = 2;
      ctx.stroke();
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
        lensGrad.addColorStop(0, "#ffffff");
        lensGrad.addColorStop(0.3, "#34d399");
        lensGrad.addColorStop(0.8, "#059669");
        lensGrad.addColorStop(1, "rgba(5, 150, 105, 0)");
        ctx.fillStyle = lensGrad;
        ctx.beginPath();
        ctx.arc(0, -25 * fishScale, 12 * fishScale, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "#10b981";
        ctx.shadowColor = "#34d399";
        ctx.shadowBlur = 14;
        ctx.beginPath();
        ctx.arc(0, -25 * fishScale, 7.5 * fishScale, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
        ctx.fillStyle = "#f0fdf4";
        ctx.beginPath();
        ctx.arc(-2 * fishScale, -27 * fishScale, 2.8 * fishScale, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
      ctx.restore();
    }
  };
}

// Default parameters from content metadata
const defaultParams = [
  {
    "key": "eyeScanSpeed",
    "label": "Tubular Eye Scanning",
    "type": "range",
    "min": 0.3,
    "max": 2,
    "step": 0.1,
    "defaultValue": 0.8,
    "description": "Green optic lens rotation rate"
  },
  {
    "key": "domeClarity",
    "label": "Dome Transparency Glow",
    "type": "range",
    "min": 0.5,
    "max": 1.8,
    "step": 0.1,
    "defaultValue": 1.1,
    "description": "Cranial fluid-filled shield brightness"
  }
];

if (!window.__art_instances) window.__art_instances = {};
if (!window.__art_instances['barreleye-fish']) {
  const inst = typeof createBarreleyeFish === 'function' ? createBarreleyeFish() : null;
  if (inst && inst.setup) {
    inst.setup({ ctx, width, height, dpr: 1, aspectRatio: width / height }, defaultParams);
  }
  window.__art_instances['barreleye-fish'] = inst;
}

const instance = window.__art_instances['barreleye-fish'];
if (instance && instance.render) {
  instance.render(
    { ctx, width, height, dpr: 1, aspectRatio: width / height },
    { time, deltaTime: dt, frameCount: Math.floor(time * 60), fps: 60 },
    defaultParams
  );
}`,

  // 051. Pelagic Sea Angel
  'sea-angel-pteropod': `// 051 - Pelagic Sea Angel (creatures)
// 1:1 Original algorithm engine source
function createSeaAngelPteropod() {
  const BODY_RIBBONS = 28;
  const WING_FILAMENTS = 24;
  return {
    setup() {
    },
    render(context, timeState, params) {
      const { ctx, width, height } = context;
      const wingSpeed = Number(params.wingSpeed || 1.4);
      const wingSpan = Number(params.wingSpan || 1.2);
      const t = timeState.time * wingSpeed;
      ctx.fillStyle = "#020306";
      ctx.fillRect(0, 0, width, height);
      const cx = width * 0.5 + Math.sin(t * 0.6) * (width * 0.05);
      const cy = height * 0.46 + Math.sin(t * 1.8) * 14;
      const angelScale = Math.min(width, height) / 480;
      ctx.save();
      ctx.translate(cx, cy);
      ctx.globalCompositeOperation = "screen";
      const baseHue = (195 + Math.sin(t * 0.8) * 20) % 360;
      for (let r = 0; r < BODY_RIBBONS; r++) {
        const normR = (r + 1) / BODY_RIBBONS;
        const curW = 28 * normR * angelScale;
        const curH = 115 * normR * angelScale;
        ctx.beginPath();
        ctx.moveTo(0, -65 * normR * angelScale);
        ctx.quadraticCurveTo(curW, -25 * normR * angelScale, curW * 0.7, 30 * normR * angelScale);
        ctx.quadraticCurveTo(curW * 0.3, 75 * normR * angelScale, 0, curH);
        ctx.quadraticCurveTo(-curW * 0.3, 75 * normR * angelScale, -curW * 0.7, 30 * normR * angelScale);
        ctx.quadraticCurveTo(-curW, -25 * normR * angelScale, 0, -65 * normR * angelScale);
        ctx.closePath();
        const bodyHue = (baseHue + normR * 25) % 360;
        ctx.strokeStyle = hsla(bodyHue, 95, 72, 0.06 + normR * 0.28);
        ctx.lineWidth = normR > 0.85 ? 1.6 : 0.8;
        ctx.stroke();
      }
      for (let visc = 1; visc <= 6; visc++) {
        const vR = (3 + visc * 3) * angelScale;
        ctx.beginPath();
        ctx.ellipse(0, 6 * angelScale, vR, vR * 1.3, 0, 0, Math.PI * 2);
        ctx.strokeStyle = hsla(15 + visc * 8, 100, 68, 0.6 - visc * 0.08);
        ctx.lineWidth = 1.6;
        ctx.stroke();
      }
      ctx.fillStyle = "#fee2e2";
      ctx.shadowColor = "#f97316";
      ctx.shadowBlur = 16;
      ctx.beginPath();
      ctx.arc(0, 6 * angelScale, 3 * angelScale, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;
      const wingWave = Math.sin(t * 3.5);
      const wingCurl = Math.cos(t * 3.5);
      for (let s = -1; s <= 1; s += 2) {
        for (let wf = 0; wf < WING_FILAMENTS; wf++) {
          const normW = wf / (WING_FILAMENTS - 1);
          const rootX = s * (8 + normW * 14) * angelScale;
          const rootY = (-20 + normW * 12) * angelScale;
          const curSpan = (70 + normW * 25) * wingSpan * angelScale;
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
            rootY + 25 * angelScale,
            rootX,
            rootY + 12 * angelScale
          );
          ctx.closePath();
          const wingHue = (baseHue - 15 + normW * 35) % 360;
          ctx.strokeStyle = hsla(wingHue, 100, 78, 0.08 + normW * 0.35);
          ctx.lineWidth = wf % 4 === 0 ? 1.6 : 0.8;
          ctx.stroke();
        }
      }
      ctx.restore();
    }
  };
}

// Default parameters from content metadata
const defaultParams = [
  {
    "key": "wingSpeed",
    "label": "Parapodia Stroke Rate",
    "type": "range",
    "min": 0.5,
    "max": 2.5,
    "step": 0.1,
    "defaultValue": 1.4,
    "description": "Wing flap swimming frequency"
  },
  {
    "key": "wingSpan",
    "label": "Parapodia Wingspan",
    "type": "range",
    "min": 0.7,
    "max": 1.8,
    "step": 0.1,
    "defaultValue": 1.2,
    "description": "Flapping wing amplitude scaling"
  }
];

if (!window.__art_instances) window.__art_instances = {};
if (!window.__art_instances['sea-angel-pteropod']) {
  const inst = typeof createSeaAngelPteropod === 'function' ? createSeaAngelPteropod() : null;
  if (inst && inst.setup) {
    inst.setup({ ctx, width, height, dpr: 1, aspectRatio: width / height }, defaultParams);
  }
  window.__art_instances['sea-angel-pteropod'] = inst;
}

const instance = window.__art_instances['sea-angel-pteropod'];
if (instance && instance.render) {
  instance.render(
    { ctx, width, height, dpr: 1, aspectRatio: width / height },
    { time, deltaTime: dt, frameCount: Math.floor(time * 60), fps: 60 },
    defaultParams
  );
}`,

  // 052. Abyssal Tripod Fish
  'abyssal-tripod-fish': `// 052 - Abyssal Tripod Fish (creatures)
// 1:1 Original algorithm engine source
function createAbyssalTripodFish() {
  const BODY_RIBBONS = 20;
  const PARTICLE_COUNT = 60;
  return {
    setup() {
    },
    render(context, timeState, params) {
      const { ctx, width, height } = context;
      const currentSpeed = Number(params.currentRate || 1);
      const stiltHeight = Number(params.stiltLength || 1.2);
      const t = timeState.time * currentSpeed;
      ctx.fillStyle = "#020306";
      ctx.fillRect(0, 0, width, height);
      const cx = width * 0.5;
      const seafloorY = height * 0.88;
      const fishScale = Math.min(width, height) / 500;
      ctx.save();
      ctx.globalCompositeOperation = "screen";
      const baseHue = (200 + Math.sin(t * 0.4) * 15) % 360;
      for (let p = 0; p < PARTICLE_COUNT; p++) {
        const seed = p * 41.7;
        const px = (seed * 5 + t * 45) % (width + 60) - 30;
        const py = seafloorY - 220 + seed * 9 % 200;
        const alpha = 0.2 + p % 5 * 0.15;
        ctx.fillStyle = "rgba(56, 189, 248, " + alpha + ")";
        ctx.fillRect(px, py, 1.8, 1.8);
      }
      ctx.beginPath();
      ctx.moveTo(0, seafloorY);
      ctx.lineTo(width, seafloorY);
      ctx.strokeStyle = "rgba(56, 189, 248, 0.4)";
      ctx.lineWidth = 2;
      ctx.stroke();
      for (let gx = -6; gx <= 6; gx++) {
        const xFloor = cx + gx * 80 * fishScale;
        ctx.beginPath();
        ctx.moveTo(xFloor, seafloorY);
        ctx.lineTo(cx + gx * 140 * fishScale, height);
        ctx.strokeStyle = "rgba(56, 189, 248, 0.12)";
        ctx.lineWidth = 1;
        ctx.stroke();
      }
      const bodyX = cx - 20 * fishScale;
      const bodyY = seafloorY - 145 * stiltHeight * fishScale + Math.sin(t * 0.8) * 3;
      for (let s = -1; s <= 1; s += 2) {
        const rootX = bodyX + s * 24 * fishScale;
        const rootY = bodyY + 14 * fishScale;
        const groundX = cx + s * (105 * fishScale);
        const groundY = seafloorY;
        for (let str = 0; str < 4; str++) {
          const normStr = str / 3;
          ctx.beginPath();
          ctx.moveTo(rootX + str * 2, rootY);
          ctx.quadraticCurveTo(
            rootX + s * (18 + normStr * 6) * fishScale,
            (rootY + groundY) * 0.5,
            groundX + str * 2,
            groundY
          );
          ctx.strokeStyle = hsla(190, 95, 75, 0.4 + normStr * 0.45);
          ctx.lineWidth = str === 3 ? 2 : 1;
          ctx.stroke();
        }
        ctx.fillStyle = "#38bdf8";
        ctx.shadowColor = "#38bdf8";
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.arc(groundX, groundY, 4.5 * fishScale, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      }
      const tailRootX = bodyX - 115 * fishScale;
      const tailRootY = bodyY + 6 * fishScale;
      const tailGroundX = cx - 145 * fishScale;
      const tailGroundY = seafloorY;
      for (let str = 0; str < 4; str++) {
        const normStr = str / 3;
        ctx.beginPath();
        ctx.moveTo(tailRootX, tailRootY + str * 2);
        ctx.quadraticCurveTo(
          tailRootX - (22 + normStr * 6) * fishScale,
          (tailRootY + tailGroundY) * 0.5,
          tailGroundX,
          tailGroundY
        );
        ctx.strokeStyle = hsla(190, 95, 75, 0.4 + normStr * 0.45);
        ctx.lineWidth = str === 3 ? 2 : 1;
        ctx.stroke();
      }
      ctx.fillStyle = "#38bdf8";
      ctx.beginPath();
      ctx.arc(tailGroundX, tailGroundY, 4.5 * fishScale, 0, Math.PI * 2);
      ctx.fill();
      for (let r = 1; r <= BODY_RIBBONS; r++) {
        const normR = r / BODY_RIBBONS;
        const curScale = normR * fishScale;
        ctx.beginPath();
        ctx.moveTo(bodyX + 80 * curScale, bodyY - 5 * curScale);
        ctx.quadraticCurveTo(bodyX + 20 * curScale, bodyY - 26 * curScale, bodyX - 115 * curScale, bodyY - 5 * curScale);
        ctx.lineTo(bodyX - 115 * curScale, bodyY + 12 * curScale);
        ctx.quadraticCurveTo(bodyX + 20 * curScale, bodyY + 24 * curScale, bodyX + 80 * curScale, bodyY - 5 * curScale);
        ctx.closePath();
        const bHue = (baseHue + normR * 25) % 360;
        ctx.strokeStyle = hsla(bHue, 90, 68, 0.08 + normR * 0.35);
        ctx.lineWidth = r === BODY_RIBBONS ? 2.2 * fishScale : 0.9;
        ctx.stroke();
        if (r % 5 === 0) {
          ctx.fillStyle = hsla(bHue, 80, 45, 0.04);
          ctx.fill();
        }
      }
      ctx.fillStyle = "#38bdf8";
      ctx.beginPath();
      ctx.arc(bodyX + 64 * fishScale, bodyY - 8 * fishScale, 3.5 * fishScale, 0, Math.PI * 2);
      ctx.fill();
      for (let s = -1; s <= 1; s += 2) {
        const pecRootX = bodyX + 38 * fishScale;
        const pecRootY = bodyY - 14 * fishScale;
        for (let str = 0; str < 5; str++) {
          const normStr = str / 4;
          ctx.beginPath();
          ctx.moveTo(pecRootX, pecRootY);
          const pecWave = Math.sin(t * 2.5 + str + s) * (14 * fishScale);
          const tipX = pecRootX + (110 + normStr * 25) * fishScale;
          const tipY = bodyY - (130 + normStr * 20) * fishScale + pecWave;
          ctx.bezierCurveTo(
            pecRootX + (25 + normStr * 10) * fishScale,
            bodyY - 65 * fishScale,
            pecRootX + (80 + normStr * 15) * fishScale,
            bodyY - 105 * fishScale + pecWave,
            tipX,
            tipY
          );
          ctx.strokeStyle = hsla((baseHue + 30 + str * 8) % 360, 95, 75, 0.35 + normStr * 0.5);
          ctx.lineWidth = str === 4 ? 2 : 1;
          ctx.stroke();
          if (str === 4) {
            ctx.fillStyle = "#ffffff";
            ctx.beginPath();
            ctx.arc(tipX, tipY, 2.5 * fishScale, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }
      ctx.restore();
    }
  };
}

// Default parameters from content metadata
const defaultParams = [
  {
    "key": "currentRate",
    "label": "Benthic Current Velocity",
    "type": "range",
    "min": 0.4,
    "max": 2.2,
    "step": 0.1,
    "defaultValue": 1,
    "description": "Abyssal current particle drift speed"
  },
  {
    "key": "stiltLength",
    "label": "Stilt Fin Height",
    "type": "range",
    "min": 0.8,
    "max": 1.6,
    "step": 0.1,
    "defaultValue": 1.2,
    "description": "Elevation above seafloor ooze"
  }
];

if (!window.__art_instances) window.__art_instances = {};
if (!window.__art_instances['abyssal-tripod-fish']) {
  const inst = typeof createAbyssalTripodFish === 'function' ? createAbyssalTripodFish() : null;
  if (inst && inst.setup) {
    inst.setup({ ctx, width, height, dpr: 1, aspectRatio: width / height }, defaultParams);
  }
  window.__art_instances['abyssal-tripod-fish'] = inst;
}

const instance = window.__art_instances['abyssal-tripod-fish'];
if (instance && instance.render) {
  instance.render(
    { ctx, width, height, dpr: 1, aspectRatio: width / height },
    { time, deltaTime: dt, frameCount: Math.floor(time * 60), fps: 60 },
    defaultParams
  );
}`,

  // 053. Japanese Giant Spider Crab
  'giant-spider-crab': `// 053 - Japanese Giant Spider Crab (creatures)
// 1:1 Original algorithm engine source
function createGiantSpiderCrab() {
  const SHELL_RINGS = 20;
  return {
    setup() {
    },
    render(context, timeState, params) {
      const { ctx, width, height } = context;
      const crawlSpeed = Number(params.gaitSpeed || 1.1);
      const legSpread = Number(params.legReach || 1.2);
      const t = timeState.time * crawlSpeed;
      ctx.fillStyle = "#020306";
      ctx.fillRect(0, 0, width, height);
      const cx = width * 0.5;
      const cy = height * 0.52 + Math.sin(t * 1.2) * 4;
      const crabScale = Math.min(width, height) / 520;
      ctx.save();
      ctx.globalCompositeOperation = "screen";
      const baseHue = (18 + Math.sin(t * 0.5) * 15) % 360;
      const seafloorY = cy + 130 * crabScale;
      ctx.beginPath();
      ctx.moveTo(0, seafloorY);
      ctx.lineTo(width, seafloorY);
      ctx.strokeStyle = "rgba(249, 115, 22, 0.25)";
      ctx.lineWidth = 1.6;
      ctx.stroke();
      for (let side = -1; side <= 1; side += 2) {
        for (let leg = 0; leg < 4; leg++) {
          const legPhase = t * 3.2 + leg * 0.9 + (side === 1 ? Math.PI : 0);
          const coxaX = cx + side * (35 * crabScale);
          const coxaY = cy + (leg - 1.5) * (14 * crabScale);
          const kneeLift = Math.sin(legPhase) * (24 * crabScale);
          const kneeX = coxaX + side * ((80 + leg * 14) * legSpread * crabScale);
          const kneeY = coxaY - (88 - leg * 12) * legSpread * crabScale + kneeLift;
          const elbowX = kneeX + side * ((68 + leg * 14) * legSpread * crabScale);
          const elbowY = coxaY + (28 + leg * 14) * legSpread * crabScale;
          const propX = elbowX + side * (32 * legSpread * crabScale);
          const propY = elbowY + 45 * crabScale;
          const groundReach = Math.cos(legPhase) * (20 * crabScale);
          const tipX = propX + side * (18 * legSpread * crabScale) + groundReach;
          const tipY = seafloorY;
          for (let str = -1; str <= 1; str++) {
            ctx.beginPath();
            ctx.moveTo(coxaX, coxaY);
            ctx.lineTo(kneeX + str * 2, kneeY);
            ctx.lineTo(elbowX + str * 2, elbowY);
            ctx.lineTo(propX, propY);
            ctx.lineTo(tipX, tipY);
            const legHue = (baseHue + leg * 8) % 360;
            ctx.strokeStyle = hsla(legHue, 95, 65, str === 0 ? 0.85 : 0.4);
            ctx.lineWidth = str === 0 ? 2.8 * crabScale : 1.2;
            ctx.stroke();
          }
          ctx.fillStyle = "#fde047";
          ctx.beginPath();
          ctx.arc(kneeX, kneeY, 3.8 * crabScale, 0, Math.PI * 2);
          ctx.arc(elbowX, elbowY, 3.2 * crabScale, 0, Math.PI * 2);
          ctx.arc(propX, propY, 2.6 * crabScale, 0, Math.PI * 2);
          ctx.arc(tipX, tipY, 2 * crabScale, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      for (let r = 1; r <= SHELL_RINGS; r++) {
        const normR = r / SHELL_RINGS;
        const curW = 42 * normR * crabScale;
        const curH = 52 * normR * crabScale;
        ctx.beginPath();
        const steps = 48;
        for (let i = 0; i <= steps; i++) {
          const phi = i / steps * Math.PI * 2;
          const spine = Math.sin(phi * 8) > 0.6 ? 1.08 : 1;
          const px = cx + Math.cos(phi) * curW * spine;
          const py = cy + Math.sin(phi) * curH * spine;
          if (i === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        ctx.closePath();
        const sHue = (baseHue + normR * 20) % 360;
        ctx.strokeStyle = hsla(sHue, 95, 65, 0.08 + normR * 0.35);
        ctx.lineWidth = r === SHELL_RINGS ? 2.4 * crabScale : 1;
        ctx.stroke();
        if (r % 4 === 0) {
          ctx.fillStyle = hsla(sHue, 90, 50, 0.05);
          ctx.fill();
        }
      }
      for (let side = -1; side <= 1; side += 2) {
        const armBaseX = cx + side * (20 * crabScale);
        const armBaseY = cy - 38 * crabScale;
        const clawReach = 78 * legSpread * crabScale;
        const elbowAngle = -Math.PI / 2 + side * 0.35 + Math.sin(t * 2 + side) * 0.18;
        const armElbowX = armBaseX + Math.cos(elbowAngle) * clawReach;
        const armElbowY = armBaseY + Math.sin(elbowAngle) * clawReach;
        const clawTipX = armElbowX + side * (38 * crabScale);
        const clawTipY = armElbowY - 45 * crabScale;
        ctx.beginPath();
        ctx.moveTo(armBaseX, armBaseY);
        ctx.lineTo(armElbowX, armElbowY);
        ctx.lineTo(clawTipX, clawTipY);
        ctx.strokeStyle = hsla(baseHue - 10, 100, 70, 0.9);
        ctx.lineWidth = 4.2 * crabScale;
        ctx.stroke();
        ctx.fillStyle = "#f87171";
        ctx.beginPath();
        ctx.arc(clawTipX, clawTipY, 5 * crabScale, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    }
  };
}

// Default parameters from content metadata
const defaultParams = [
  {
    "key": "gaitSpeed",
    "label": "Deep Floor Stride Speed",
    "type": "range",
    "min": 0.4,
    "max": 2.2,
    "step": 0.1,
    "defaultValue": 1.1,
    "description": "8-legged walking gait tempo"
  },
  {
    "key": "legReach",
    "label": "Leg Span Reach",
    "type": "range",
    "min": 0.8,
    "max": 1.6,
    "step": 0.1,
    "defaultValue": 1.2,
    "description": "Arthropod leg length scaling"
  }
];

if (!window.__art_instances) window.__art_instances = {};
if (!window.__art_instances['giant-spider-crab']) {
  const inst = typeof createGiantSpiderCrab === 'function' ? createGiantSpiderCrab() : null;
  if (inst && inst.setup) {
    inst.setup({ ctx, width, height, dpr: 1, aspectRatio: width / height }, defaultParams);
  }
  window.__art_instances['giant-spider-crab'] = inst;
}

const instance = window.__art_instances['giant-spider-crab'];
if (instance && instance.render) {
  instance.render(
    { ctx, width, height, dpr: 1, aspectRatio: width / height },
    { time, deltaTime: dt, frameCount: Math.floor(time * 60), fps: 60 },
    defaultParams
  );
}`,

  // 054. Leafy Sea Dragon
  'leafy-sea-dragon': `// 054 - Leafy Sea Dragon (creatures)
// 1:1 Original algorithm engine source
function createLeafySeaDragon() {
  return {
    setup() {
    },
    render(context, timeState, params) {
      const { ctx, width, height } = context;
      const swellSpeed = Number(params.swellSpeed || 1.1);
      const leafFlutter = Number(params.foliageSway || 1.2);
      const t = timeState.time * swellSpeed;
      ctx.fillStyle = "#020307";
      ctx.fillRect(0, 0, width, height);
      const cx = width * 0.46 + Math.sin(t * 0.4) * (width * 0.04);
      const cy = height * 0.45 + Math.sin(t * 1.4) * 10;
      const dragonScale = Math.min(width, height) / 500;
      ctx.save();
      ctx.translate(cx, cy);
      ctx.globalCompositeOperation = "screen";
      const baseHue = (45 + Math.sin(t * 0.4) * 15) % 360;
      function drawLushLeafAppendage(rootX, rootY, angle, length, phase) {
        const wave = Math.sin(t * 2.8 + phase) * (18 * leafFlutter * dragonScale);
        const tipX = rootX + Math.cos(angle) * length + wave;
        const tipY = rootY + Math.sin(angle) * length + wave;
        for (let str = -1; str <= 1; str++) {
          ctx.beginPath();
          ctx.moveTo(rootX + str * 2, rootY);
          ctx.quadraticCurveTo((rootX + tipX) * 0.5 + wave, (rootY + tipY) * 0.5 - 12, tipX + str * 2, tipY);
          ctx.strokeStyle = hsla(baseHue, 95, 75, str === 0 ? 0.9 : 0.4);
          ctx.lineWidth = str === 0 ? 2.2 * dragonScale : 1;
          ctx.stroke();
        }
        for (let lobe = 1; lobe <= 4; lobe++) {
          const normL = lobe / 4.5;
          const lx = rootX + (tipX - rootX) * normL;
          const ly = rootY + (tipY - rootY) * normL;
          for (let s = -1; s <= 1; s += 2) {
            const lobeAngle = angle + s * 0.85 + Math.sin(t * 3.2 + lobe + s) * 0.25;
            const lobeLen = (22 - lobe * 3.5) * leafFlutter * dragonScale;
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
              ctx.strokeStyle = hsla(110 + lobe * 12, 90, 65, 0.2 + normLF * 0.6);
              ctx.lineWidth = lf === 4 ? 1.6 : 0.8;
              ctx.stroke();
            }
          }
        }
      }
      ctx.beginPath();
      ctx.moveTo(-50 * dragonScale, -65 * dragonScale);
      ctx.lineTo(-145 * dragonScale, -100 * dragonScale);
      ctx.lineTo(-142 * dragonScale, -90 * dragonScale);
      ctx.lineTo(-45 * dragonScale, -50 * dragonScale);
      ctx.closePath();
      ctx.fillStyle = "rgba(234, 179, 8, 0.4)";
      ctx.fill();
      ctx.strokeStyle = hsla(baseHue, 95, 75, 0.95);
      ctx.lineWidth = 2.4 * dragonScale;
      ctx.stroke();
      ctx.fillStyle = "#0f172a";
      ctx.beginPath();
      ctx.arc(-55 * dragonScale, -60 * dragonScale, 5.5 * dragonScale, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = "#38bdf8";
      ctx.lineWidth = 1.6;
      ctx.stroke();
      ctx.fillStyle = "#38bdf8";
      ctx.beginPath();
      ctx.arc(-56 * dragonScale, -61 * dragonScale, 2.5 * dragonScale, 0, Math.PI * 2);
      ctx.fill();
      for (let r = 0; r < 12; r++) {
        const normR = r / 11;
        const rx = -45 * dragonScale + normR * (75 * dragonScale);
        const ry = -50 * dragonScale + Math.sin(normR * Math.PI) * (45 * dragonScale) + normR * (65 * dragonScale);
        ctx.beginPath();
        ctx.ellipse(rx, ry, (16 - normR * 4) * dragonScale, (22 - normR * 4) * dragonScale, normR * 0.5, 0, Math.PI * 2);
        ctx.strokeStyle = hsla(baseHue, 95, 72, 0.6);
        ctx.lineWidth = 1.4;
        ctx.stroke();
        ctx.fillStyle = "#fde047";
        ctx.beginPath();
        ctx.arc(rx, ry - 14 * dragonScale, 2.5 * dragonScale, 0, Math.PI * 2);
        ctx.fill();
      }
      const tailRoots = [25 * dragonScale, 28 * dragonScale, 31 * dragonScale];
      for (let tr = 0; tr < 3; tr++) {
        ctx.beginPath();
        ctx.moveTo(tailRoots[tr], (45 + tr * 3) * dragonScale);
        const tailSteps = 45;
        for (let s = 1; s <= tailSteps; s++) {
          const normS = s / tailSteps;
          const theta = normS * Math.PI * 3.6;
          const r = (55 - tr * 4) * dragonScale * Math.exp(-0.45 * theta);
          const tx = 25 * dragonScale + 35 * dragonScale - Math.cos(theta) * r;
          const ty = 45 * dragonScale + 25 * dragonScale + Math.sin(theta) * r;
          ctx.lineTo(tx, ty);
        }
        ctx.strokeStyle = hsla(baseHue, 95, 75, 0.9 - tr * 0.25);
        ctx.lineWidth = tr === 1 ? 2.6 * dragonScale : 1.2 * dragonScale;
        ctx.stroke();
      }
      drawLushLeafAppendage(-40 * dragonScale, -65 * dragonScale, -Math.PI * 0.7, 75 * dragonScale, 0);
      drawLushLeafAppendage(0, -35 * dragonScale, -Math.PI * 0.42, 92 * dragonScale, 1.2);
      drawLushLeafAppendage(28 * dragonScale, 12 * dragonScale, -Math.PI * 0.22, 105 * dragonScale, 2.4);
      drawLushLeafAppendage(38 * dragonScale, 65 * dragonScale, Math.PI * 0.12, 85 * dragonScale, 3.6);
      ctx.restore();
    }
  };
}

// Default parameters from content metadata
const defaultParams = [
  {
    "key": "swellSpeed",
    "label": "Ocean Swell Rhythm",
    "type": "range",
    "min": 0.4,
    "max": 2.5,
    "step": 0.1,
    "defaultValue": 1.1,
    "description": "Camouflage foliage sway rate"
  },
  {
    "key": "foliageSway",
    "label": "Foliage Lobe Span",
    "type": "range",
    "min": 0.6,
    "max": 1.8,
    "step": 0.1,
    "defaultValue": 1.2,
    "description": "Leafy appendage elongation"
  }
];

if (!window.__art_instances) window.__art_instances = {};
if (!window.__art_instances['leafy-sea-dragon']) {
  const inst = typeof createLeafySeaDragon === 'function' ? createLeafySeaDragon() : null;
  if (inst && inst.setup) {
    inst.setup({ ctx, width, height, dpr: 1, aspectRatio: width / height }, defaultParams);
  }
  window.__art_instances['leafy-sea-dragon'] = inst;
}

const instance = window.__art_instances['leafy-sea-dragon'];
if (instance && instance.render) {
  instance.render(
    { ctx, width, height, dpr: 1, aspectRatio: width / height },
    { time, deltaTime: dt, frameCount: Math.floor(time * 60), fps: 60 },
    defaultParams
  );
}`,

  // 055. Great Hammerhead Shark
  'hammerhead-shark': `// 055 - Great Hammerhead Shark (creatures)
// 1:1 Original algorithm engine source
function createHammerheadShark() {
  const SPINE_NODES = 42;
  const LONGITUDINAL_STRANDS = 24;
  const BODY_RINGS = 30;
  return {
    setup() {
    },
    render(context, timeState, params) {
      const { ctx, width, height } = context;
      const cruiseSpeed = Number(params.swimSpeed || 1.2);
      const cephalofoilWidth = Number(params.headSpan || 1.2);
      const t = timeState.time * cruiseSpeed;
      ctx.fillStyle = "#020308";
      ctx.fillRect(0, 0, width, height);
      const cx = width * 0.5;
      const cy = height * 0.5;
      const sharkScale = Math.min(width, height) / 520;
      const rotY = Math.sin(t * 0.5) * 0.45 + 0.2;
      const rotX = 0.35 + Math.sin(t * 0.8) * 0.18;
      const rotZ = Math.sin(t * 0.6) * 0.15;
      ctx.save();
      ctx.globalCompositeOperation = "screen";
      const baseHue = (195 + Math.sin(t * 0.5) * 20) % 360;
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
      for (let str = 0; str < LONGITUDINAL_STRANDS; str++) {
        const phi = str / LONGITUDINAL_STRANDS * Math.PI * 2;
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
        const strHue = (baseHue + str % 6 * 8) % 360;
        const isDorsal = sinPhi < 0;
        const alpha = isDorsal ? 0.45 * avgDepth : 0.25 * avgDepth;
        ctx.strokeStyle = hsla(strHue, 95, 72, alpha);
        ctx.lineWidth = str % 4 === 0 ? 1.6 : 0.9;
        ctx.stroke();
      }
      for (let r = 0; r < BODY_RINGS; r++) {
        const normR = r / (BODY_RINGS - 1);
        const nodeIdx = Math.floor(normR * (SPINE_NODES - 1));
        const center = spineNodes[nodeIdx];
        if (center.thicknessY < 2) continue;
        ctx.beginPath();
        const steps = 32;
        let avgDepth = 0;
        for (let i = 0; i <= steps; i++) {
          const theta = i / steps * Math.PI * 2;
          const ry = center.y + Math.sin(theta) * center.thicknessY;
          const rz = center.z + Math.cos(theta) * center.thicknessZ;
          const p = project3D(center.x, ry, rz, rotX, rotY, rotZ, cx, cy, 460, 520);
          avgDepth += p.depth;
          if (i === 0) ctx.moveTo(p.x, p.y);
          else ctx.lineTo(p.x, p.y);
        }
        avgDepth /= steps + 1;
        const ringHue = (baseHue + normR * 35) % 360;
        ctx.strokeStyle = hsla(ringHue, 95, 70, (0.15 + normR * 0.45) * avgDepth);
        ctx.lineWidth = Math.max(0.8, (normR > 0.3 && normR < 0.7 ? 1.8 : 1) * avgDepth);
        ctx.stroke();
        if (r % 4 === 0) {
          ctx.fillStyle = hsla(ringHue, 90, 55, 0.05 * avgDepth);
          ctx.fill();
        }
      }
      const head = spineNodes[0];
      const headSpan = 110 * cephalofoilWidth * sharkScale;
      const headRibs = 14;
      for (let hr = 0; hr < headRibs; hr++) {
        const normHR = hr / (headRibs - 1);
        const headXOffset = (normHR - 0.5) * (36 * sharkScale);
        ctx.beginPath();
        for (let s = -1; s <= 1; s += 2) {
          const pWingTip = project3D(
            head.x + headXOffset - 12 * sharkScale,
            head.y,
            head.z + s * headSpan * (1 - Math.abs(normHR - 0.5) * 0.2),
            rotX,
            rotY,
            rotZ,
            cx,
            cy,
            460,
            520
          );
          const pHeadCenter = project3D(
            head.x + headXOffset - 42 * sharkScale,
            head.y,
            head.z,
            rotX,
            rotY,
            rotZ,
            cx,
            cy,
            460,
            520
          );
          if (s === -1) {
            ctx.moveTo(pWingTip.x, pWingTip.y);
            ctx.lineTo(pHeadCenter.x, pHeadCenter.y);
          } else {
            ctx.lineTo(pWingTip.x, pWingTip.y);
          }
        }
        ctx.strokeStyle = hsla((baseHue + 30) % 360, 95, 78, 0.55);
        ctx.lineWidth = hr === 0 || hr === headRibs - 1 ? 2 : 1;
        ctx.stroke();
      }
      for (let s = -1; s <= 1; s += 2) {
        const pEye = project3D(
          head.x - 14 * sharkScale,
          head.y,
          head.z + s * (headSpan - 6 * sharkScale),
          rotX,
          rotY,
          rotZ,
          cx,
          cy,
          460,
          520
        );
        ctx.fillStyle = "#38bdf8";
        ctx.shadowColor = "#38bdf8";
        ctx.shadowBlur = 14 * pEye.depth;
        ctx.beginPath();
        ctx.arc(pEye.x, pEye.y, 6 * pEye.depth * sharkScale, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
        ctx.fillStyle = "#ffffff";
        ctx.beginPath();
        ctx.arc(pEye.x, pEye.y, 2.5 * pEye.depth * sharkScale, 0, Math.PI * 2);
        ctx.fill();
      }
      for (let p = 0; p < 16; p++) {
        const normP = (p / 15 - 0.5) * 2;
        const poreZ = head.z + normP * (headSpan * 0.85);
        const poreX = head.x - (38 - Math.abs(normP) * 12) * sharkScale;
        const pPore = project3D(poreX, head.y, poreZ, rotX, rotY, rotZ, cx, cy, 460, 520);
        ctx.fillStyle = "#67e8f9";
        ctx.beginPath();
        ctx.arc(pPore.x, pPore.y, 1.8 * pPore.depth, 0, Math.PI * 2);
        ctx.fill();
      }
      const dorsalIdx = Math.floor(SPINE_NODES * 0.32);
      const dBase = spineNodes[dorsalIdx];
      const dorsalRibs = 10;
      for (let dr = 0; dr < dorsalRibs; dr++) {
        const normDR = dr / (dorsalRibs - 1);
        const dXBase = dBase.x + (normDR - 0.5) * (45 * sharkScale);
        const dYBase = dBase.y - dBase.thicknessY;
        const p1 = project3D(dXBase, dYBase, dBase.z, rotX, rotY, rotZ, cx, cy, 460, 520);
        const p2 = project3D(dBase.x + 18 * sharkScale, dBase.y - 92 * sharkScale, dBase.z, rotX, rotY, rotZ, cx, cy, 460, 520);
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.strokeStyle = hsla(baseHue, 95, 75, (0.2 + normDR * 0.5) * p2.depth);
        ctx.lineWidth = dr === 0 ? 2.2 : 1.2;
        ctx.stroke();
      }
      const tail = spineNodes[SPINE_NODES - 1];
      const tailRibs = 12;
      for (let tr = 0; tr < tailRibs; tr++) {
        const normTR = tr / (tailRibs - 1);
        const pTBase = project3D(tail.x, tail.y, tail.z, rotX, rotY, rotZ, cx, cy, 460, 520);
        const pTUpper = project3D(
          tail.x + (45 + normTR * 30) * sharkScale,
          tail.y - (45 + normTR * 35) * sharkScale,
          tail.z,
          rotX,
          rotY,
          rotZ,
          cx,
          cy,
          460,
          520
        );
        const pTLower = project3D(
          tail.x + (30 + normTR * 22) * sharkScale,
          tail.y + (25 + normTR * 25) * sharkScale,
          tail.z,
          rotX,
          rotY,
          rotZ,
          cx,
          cy,
          460,
          520
        );
        ctx.beginPath();
        ctx.moveTo(pTBase.x, pTBase.y);
        ctx.lineTo(pTUpper.x, pTUpper.y);
        ctx.moveTo(pTBase.x, pTBase.y);
        ctx.lineTo(pTLower.x, pTLower.y);
        ctx.strokeStyle = hsla((baseHue + 20) % 360, 95, 80, 0.65 * pTUpper.depth);
        ctx.lineWidth = tr === tailRibs - 1 ? 2 : 1.2;
        ctx.stroke();
      }
      ctx.beginPath();
      for (let s = 2; s < SPINE_NODES - 2; s++) {
        const node = spineNodes[s];
        const p = project3D(node.x, node.y, node.z + node.thicknessZ, rotX, rotY, rotZ, cx, cy, 460, 520);
        if (s === 2) ctx.moveTo(p.x, p.y);
        else ctx.lineTo(p.x, p.y);
      }
      ctx.strokeStyle = "#38bdf8";
      ctx.shadowColor = "#38bdf8";
      ctx.shadowBlur = 10;
      ctx.lineWidth = 1.8;
      ctx.stroke();
      ctx.shadowBlur = 0;
      ctx.restore();
    }
  };
}

// Default parameters from content metadata
const defaultParams = [
  {
    "key": "swimSpeed",
    "label": "Cruising Speed",
    "type": "range",
    "min": 0.5,
    "max": 2.5,
    "step": 0.1,
    "defaultValue": 1.2,
    "description": "Serpentine undulation tempo"
  },
  {
    "key": "headSpan",
    "label": "Cephalofoil Wingspan",
    "type": "range",
    "min": 0.8,
    "max": 1.6,
    "step": 0.1,
    "defaultValue": 1.2,
    "description": "T-head width multiplier"
  }
];

if (!window.__art_instances) window.__art_instances = {};
if (!window.__art_instances['hammerhead-shark']) {
  const inst = typeof createHammerheadShark === 'function' ? createHammerheadShark() : null;
  if (inst && inst.setup) {
    inst.setup({ ctx, width, height, dpr: 1, aspectRatio: width / height }, defaultParams);
  }
  window.__art_instances['hammerhead-shark'] = inst;
}

const instance = window.__art_instances['hammerhead-shark'];
if (instance && instance.render) {
  instance.render(
    { ctx, width, height, dpr: 1, aspectRatio: width / height },
    { time, deltaTime: dt, frameCount: Math.floor(time * 60), fps: 60 },
    defaultParams
  );
}`,

  // 056. Quantum Hydrogen Orbital
  'quantum-hydrogen-orbital': `// 056 - Quantum Hydrogen Orbital (physics)
// 1:1 Original algorithm engine source
function createQuantumHydrogenOrbital() {
  const POINT_COUNT = 800;
  const samples = [];
  for (let i = 0; i < POINT_COUNT; i++) {
    samples.push({
      u: Math.random() * Math.PI * 2,
      v: Math.acos(2 * Math.random() - 1),
      radMod: 0.2 + Math.random() * 0.8,
      phase: Math.random() * Math.PI * 2
    });
  }
  return {
    setup() {
    },
    render(context, timeState, params) {
      const { ctx, width, height } = context;
      const quantumN = Math.floor(Number(params.principalN || 3));
      const quantumL = Math.min(quantumN - 1, Math.floor(Number(params.angularL || 2)));
      const t = timeState.time * 0.8;
      ctx.fillStyle = "#020307";
      ctx.fillRect(0, 0, width, height);
      const cx = width * 0.5;
      const cy = height * 0.5;
      const scale = Math.min(width, height) * 0.38;
      const rotY = t * 0.35;
      const rotX = 0.45 + Math.sin(t * 0.25) * 0.15;
      const rotZ = 0;
      ctx.save();
      ctx.globalCompositeOperation = "screen";
      for (let i = 0; i < POINT_COUNT; i++) {
        const s = samples[i];
        const theta = s.v;
        const phi = s.u;
        let angularFactor = 1;
        if (quantumL === 1) {
          angularFactor = Math.abs(Math.cos(theta)) * 1.8;
        } else if (quantumL === 2) {
          angularFactor = Math.abs(3 * Math.pow(Math.cos(theta), 2) - 1) * 0.9;
        } else if (quantumL === 3) {
          const ct = Math.cos(theta);
          angularFactor = Math.abs(5 * Math.pow(ct, 3) - 3 * ct) * 0.7;
        }
        const rNorm = s.radMod * (1 + 0.12 * Math.sin(s.phase + t * 2));
        const radialProb = Math.pow(rNorm * quantumN, quantumL) * Math.exp(-rNorm * 2.2);
        const radius = scale * (0.2 + radialProb * angularFactor * 1.6);
        const rawX = radius * Math.sin(theta) * Math.cos(phi);
        const rawY = radius * Math.cos(theta);
        const rawZ = radius * Math.sin(theta) * Math.sin(phi);
        const p = project3D(rawX, rawY, rawZ, rotX, rotY, rotZ, cx, cy, 450, 520);
        const phaseHue = (phi / (Math.PI * 2) * 360 + t * 30) % 360;
        const probAlpha = Math.min(1, (0.2 + angularFactor * 0.45) * p.depth);
        ctx.fillStyle = hsla(phaseHue, 95, 70, probAlpha);
        ctx.beginPath();
        ctx.arc(p.x, p.y, (1.2 + angularFactor * 1.6) * p.depth, 0, Math.PI * 2);
        ctx.fill();
      }
      const nodalRings = 16;
      for (let nr = 0; nr < nodalRings; nr++) {
        const normNR = (nr / nodalRings - 0.5) * 2;
        const ringZ = normNR * (scale * 0.65);
        const thetaRing = Math.acos(Math.max(-1, Math.min(1, normNR)));
        let ringAmp = 1;
        if (quantumL === 1) ringAmp = Math.abs(Math.cos(thetaRing)) * 1.5;
        else if (quantumL === 2) ringAmp = Math.abs(3 * Math.pow(Math.cos(thetaRing), 2) - 1) * 0.8;
        else if (quantumL === 3) ringAmp = Math.abs(5 * Math.pow(Math.cos(thetaRing), 3) - 3 * Math.cos(thetaRing)) * 0.6;
        const ringR = Math.sin(thetaRing) * scale * 0.7 * ringAmp;
        if (ringR < 2) continue;
        ctx.beginPath();
        const steps = 40;
        for (let j = 0; j <= steps; j++) {
          const phiJ = j / steps * Math.PI * 2;
          const px = ringR * Math.cos(phiJ);
          const py = ringZ;
          const pz = ringR * Math.sin(phiJ);
          const proj = project3D(px, py, pz, rotX, rotY, rotZ, cx, cy, 450, 520);
          if (j === 0) ctx.moveTo(proj.x, proj.y);
          else ctx.lineTo(proj.x, proj.y);
        }
        ctx.closePath();
        ctx.strokeStyle = hsla((190 + nr * 8) % 360, 95, 75, 0.45);
        ctx.lineWidth = 1;
        ctx.stroke();
      }
      const pCore = project3D(0, 0, 0, rotX, rotY, rotZ, cx, cy, 450, 520);
      const coreGrad = ctx.createRadialGradient(pCore.x, pCore.y, 1, pCore.x, pCore.y, 14 * pCore.depth);
      coreGrad.addColorStop(0, "#ffffff");
      coreGrad.addColorStop(0.3, "#38bdf8");
      coreGrad.addColorStop(1, "rgba(56, 189, 248, 0)");
      ctx.fillStyle = coreGrad;
      ctx.beginPath();
      ctx.arc(pCore.x, pCore.y, 14 * pCore.depth, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
      ctx.save();
      ctx.font = "11px monospace";
      ctx.fillStyle = "rgba(56, 189, 248, 0.9)";
      ctx.fillText(\`\\u03C8_nlm(r,\\u03B8,\\u03C6) \\u2014 Hydrogen Orbital State\`, 20, 28);
      ctx.fillStyle = "#94a3b8";
      ctx.fillText(\`Principal (n): \${quantumN} | Angular (l): \${quantumL} (\${["s", "p", "d", "f"][quantumL] || "s"}) | Magnetic (m): 0\`, 20, 44);
      ctx.fillText(\`P(r,\\u03B8,\\u03C6) = |R_nl(r)|^2 \\xB7 |Y_l^m(\\u03B8,\\u03C6)|^2\`, 20, 60);
      ctx.restore();
    }
  };
}

// Default parameters from content metadata
const defaultParams = [
  {
    "key": "principalN",
    "label": "Principal (n)",
    "type": "range",
    "min": 1,
    "max": 4,
    "step": 1,
    "defaultValue": 3,
    "description": "Principal quantum energy level n"
  },
  {
    "key": "angularL",
    "label": "Angular (l)",
    "type": "range",
    "min": 0,
    "max": 3,
    "step": 1,
    "defaultValue": 2,
    "description": "Orbital angular momentum quantum number (0=s, 1=p, 2=d, 3=f)"
  }
];

if (!window.__art_instances) window.__art_instances = {};
if (!window.__art_instances['quantum-hydrogen-orbital']) {
  const inst = typeof createQuantumHydrogenOrbital === 'function' ? createQuantumHydrogenOrbital() : null;
  if (inst && inst.setup) {
    inst.setup({ ctx, width, height, dpr: 1, aspectRatio: width / height }, defaultParams);
  }
  window.__art_instances['quantum-hydrogen-orbital'] = inst;
}

const instance = window.__art_instances['quantum-hydrogen-orbital'];
if (instance && instance.render) {
  instance.render(
    { ctx, width, height, dpr: 1, aspectRatio: width / height },
    { time, deltaTime: dt, frameCount: Math.floor(time * 60), fps: 60 },
    defaultParams
  );
}`,

  // 057. Lorenz Strange Attractor
  'lorenz-attractor-chaos': `// 057 - Lorenz Strange Attractor (physics)
// 1:1 Original algorithm engine source
function createLorenzAttractor() {
  const TRAIL_LENGTH = 1200;
  let trailA = [];
  let trailB = [];
  let stateA = { x: 0.1, y: 0, z: 0 };
  let stateB = { x: 0.10001, y: 0, z: 0 };
  return {
    setup() {
      trailA = [];
      trailB = [];
      stateA = { x: 0.1, y: 0, z: 0 };
      stateB = { x: 0.10001, y: 0, z: 0 };
    },
    render(context, timeState, params) {
      const { ctx, width, height } = context;
      const sigma = Number(params.sigma || 10);
      const rho = Number(params.rho || 28);
      const beta = Number(params.beta || 8 / 3);
      const t = timeState.time;
      ctx.fillStyle = "rgba(2, 3, 7, 0.25)";
      ctx.fillRect(0, 0, width, height);
      const cx = width * 0.5;
      const cy = height * 0.52;
      const scale = Math.min(width, height) * 0.016;
      const dt = 8e-3;
      const subSteps = 6;
      function lorenzDerivs(s) {
        return {
          dx: sigma * (s.y - s.x),
          dy: s.x * (rho - s.z) - s.y,
          dz: s.x * s.y - beta * s.z
        };
      }
      for (let step = 0; step < subSteps; step++) {
        const dA1 = lorenzDerivs(stateA);
        const kA2 = {
          x: stateA.x + dA1.dx * dt * 0.5,
          y: stateA.y + dA1.dy * dt * 0.5,
          z: stateA.z + dA1.dz * dt * 0.5
        };
        const dA2 = lorenzDerivs(kA2);
        const kA3 = {
          x: stateA.x + dA2.dx * dt * 0.5,
          y: stateA.y + dA2.dy * dt * 0.5,
          z: stateA.z + dA2.dz * dt * 0.5
        };
        const dA3 = lorenzDerivs(kA3);
        const kA4 = {
          x: stateA.x + dA3.dx * dt,
          y: stateA.y + dA3.dy * dt,
          z: stateA.z + dA3.dz * dt
        };
        const dA4 = lorenzDerivs(kA4);
        stateA.x += (dA1.dx + 2 * dA2.dx + 2 * dA3.dx + dA4.dx) * (dt / 6);
        stateA.y += (dA1.dy + 2 * dA2.dy + 2 * dA3.dy + dA4.dy) * (dt / 6);
        stateA.z += (dA1.dz + 2 * dA2.dz + 2 * dA3.dz + dA4.dz) * (dt / 6);
        const dB1 = lorenzDerivs(stateB);
        stateB.x += dB1.dx * dt;
        stateB.y += dB1.dy * dt;
        stateB.z += dB1.dz * dt;
        trailA.push({ ...stateA });
        trailB.push({ ...stateB });
        if (trailA.length > TRAIL_LENGTH) trailA.shift();
        if (trailB.length > TRAIL_LENGTH) trailB.shift();
      }
      const rotY = t * 0.4;
      const rotX = 0.45;
      const rotZ = 0;
      ctx.save();
      ctx.globalCompositeOperation = "screen";
      if (trailA.length > 2) {
        ctx.beginPath();
        for (let i = 0; i < trailA.length; i++) {
          const pt = trailA[i];
          const rawX = pt.x * scale * 25;
          const rawY = -(pt.z - 25) * scale * 25;
          const rawZ = pt.y * scale * 25;
          const p = project3D(rawX, rawY, rawZ, rotX, rotY, rotZ, cx, cy, 450, 520);
          if (i === 0) ctx.moveTo(p.x, p.y);
          else ctx.lineTo(p.x, p.y);
        }
        ctx.strokeStyle = "#38bdf8";
        ctx.lineWidth = 1.6;
        ctx.stroke();
      }
      if (trailB.length > 2) {
        ctx.beginPath();
        for (let i = 0; i < trailB.length; i++) {
          const pt = trailB[i];
          const rawX = pt.x * scale * 25;
          const rawY = -(pt.z - 25) * scale * 25;
          const rawZ = pt.y * scale * 25;
          const p = project3D(rawX, rawY, rawZ, rotX, rotY, rotZ, cx, cy, 450, 520);
          if (i === 0) ctx.moveTo(p.x, p.y);
          else ctx.lineTo(p.x, p.y);
        }
        ctx.strokeStyle = "#f43f5e";
        ctx.lineWidth = 1.4;
        ctx.stroke();
      }
      const pA = project3D(stateA.x * scale * 25, -(stateA.z - 25) * scale * 25, stateA.y * scale * 25, rotX, rotY, rotZ, cx, cy, 450, 520);
      ctx.fillStyle = "#ffffff";
      ctx.beginPath();
      ctx.arc(pA.x, pA.y, 4.5, 0, Math.PI * 2);
      ctx.fill();
      const pB = project3D(stateB.x * scale * 25, -(stateB.z - 25) * scale * 25, stateB.y * scale * 25, rotX, rotY, rotZ, cx, cy, 450, 520);
      ctx.fillStyle = "#f43f5e";
      ctx.beginPath();
      ctx.arc(pB.x, pB.y, 4.5, 0, Math.PI * 2);
      ctx.fill();
      const divergenceDist = Math.hypot(stateA.x - stateB.x, stateA.y - stateB.y, stateA.z - stateB.z);
      ctx.restore();
      ctx.save();
      ctx.font = "11px monospace";
      ctx.fillStyle = "rgba(56, 189, 248, 0.9)";
      ctx.fillText(\`Lorenz Strange Attractor \\u2014 Chaos Theory\`, 20, 28);
      ctx.fillStyle = "#94a3b8";
      ctx.fillText(\`dx/dt = \\u03C3(y - x) | dy/dt = x(\\u03C1 - z) - y | dz/dt = xy - \\u03B2z\`, 20, 44);
      ctx.fillText(\`Parameters: \\u03C3=\${sigma.toFixed(1)}, \\u03C1=\${rho.toFixed(1)}, \\u03B2=\${beta.toFixed(2)}\`, 20, 60);
      ctx.fillStyle = divergenceDist > 1 ? "#f43f5e" : "#34d399";
      ctx.fillText(\`Lyapunov Divergence \\u0394(t): \${divergenceDist.toFixed(4)} (Initial \\u0394\\u2080 = 10\\u207B\\u2075)\`, 20, 76);
      ctx.restore();
    }
  };
}

// Default parameters from content metadata
const defaultParams = [
  {
    "key": "sigma",
    "label": "Prandtl (σ)",
    "type": "range",
    "min": 5,
    "max": 20,
    "step": 0.5,
    "defaultValue": 10,
    "description": "Prandtl number representing fluid viscosity"
  },
  {
    "key": "rho",
    "label": "Rayleigh (ρ)",
    "type": "range",
    "min": 10,
    "max": 50,
    "step": 1,
    "defaultValue": 28,
    "description": "Rayleigh number representing convective driving force"
  }
];

if (!window.__art_instances) window.__art_instances = {};
if (!window.__art_instances['lorenz-attractor-chaos']) {
  const inst = typeof createLorenzAttractor === 'function' ? createLorenzAttractor() : null;
  if (inst && inst.setup) {
    inst.setup({ ctx, width, height, dpr: 1, aspectRatio: width / height }, defaultParams);
  }
  window.__art_instances['lorenz-attractor-chaos'] = inst;
}

const instance = window.__art_instances['lorenz-attractor-chaos'];
if (instance && instance.render) {
  instance.render(
    { ctx, width, height, dpr: 1, aspectRatio: width / height },
    { time, deltaTime: dt, frameCount: Math.floor(time * 60), fps: 60 },
    defaultParams
  );
}`,

  // 058. Double Pendulum Mechanics
  'double-pendulum-chaos': `// 058 - Double Pendulum Mechanics (physics)
// 1:1 Original algorithm engine source
function createDoublePendulum() {
  let th1 = Math.PI / 2;
  let th2 = Math.PI / 2;
  let w1 = 0;
  let w2 = 0;
  const g = 9.81;
  const l1 = 120;
  const l2 = 100;
  const m1 = 1.5;
  const m2 = 1;
  const TRAIL_MAX = 450;
  const trail = [];
  const phaseSpace = [];
  return {
    setup() {
      th1 = Math.PI / 2;
      th2 = Math.PI / 2;
      w1 = 0;
      w2 = 0;
      trail.length = 0;
      phaseSpace.length = 0;
    },
    render(context, timeState, params) {
      const { ctx, width, height } = context;
      const subSteps = 10;
      const dt = 0.02 / subSteps;
      ctx.fillStyle = "rgba(2, 3, 7, 0.22)";
      ctx.fillRect(0, 0, width, height);
      const cx = width * 0.5;
      const cy = height * 0.38;
      const scale = Math.min(width, height) / 500;
      const curL1 = l1 * scale;
      const curL2 = l2 * scale;
      for (let step = 0; step < subSteps; step++) {
        const delta = th1 - th2;
        const num1 = -g * (2 * m1 + m2) * Math.sin(th1) - m2 * g * Math.sin(th1 - 2 * th2) - 2 * Math.sin(delta) * m2 * (w2 * w2 * curL2 + w1 * w1 * curL1 * Math.cos(delta));
        const den1 = curL1 * (2 * m1 + m2 - m2 * Math.cos(2 * th1 - 2 * th2));
        const alpha1 = num1 / den1;
        const num2 = 2 * Math.sin(delta) * (w1 * w1 * curL1 * (m1 + m2) + g * (m1 + m2) * Math.cos(th1) + w2 * w2 * curL2 * m2 * Math.cos(delta));
        const den2 = curL2 * (2 * m1 + m2 - m2 * Math.cos(2 * th1 - 2 * th2));
        const alpha2 = num2 / den2;
        w1 += alpha1 * dt;
        w2 += alpha2 * dt;
        w1 *= 0.99995;
        w2 *= 0.99995;
        th1 += w1 * dt;
        th2 += w2 * dt;
      }
      const x1 = cx + curL1 * Math.sin(th1);
      const y1 = cy + curL1 * Math.cos(th1);
      const x2 = x1 + curL2 * Math.sin(th2);
      const y2 = y1 + curL2 * Math.cos(th2);
      trail.push({ x: x2, y: y2, energy: Math.abs(w1) + Math.abs(w2) });
      if (trail.length > TRAIL_MAX) trail.shift();
      phaseSpace.push({ th1: th1 % (Math.PI * 2), w1 });
      if (phaseSpace.length > 250) phaseSpace.shift();
      ctx.save();
      ctx.globalCompositeOperation = "screen";
      if (trail.length > 2) {
        ctx.beginPath();
        for (let i = 0; i < trail.length; i++) {
          const pt = trail[i];
          if (i === 0) ctx.moveTo(pt.x, pt.y);
          else ctx.lineTo(pt.x, pt.y);
        }
        ctx.strokeStyle = "#38bdf8";
        ctx.lineWidth = 1.6;
        ctx.stroke();
      }
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(x1, y1);
      ctx.strokeStyle = "#64748b";
      ctx.lineWidth = 3;
      ctx.stroke();
      ctx.fillStyle = "#0284c7";
      ctx.beginPath();
      ctx.arc(x1, y1, 8 * scale, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.strokeStyle = "#94a3b8";
      ctx.lineWidth = 2.4;
      ctx.stroke();
      ctx.fillStyle = "#38bdf8";
      ctx.shadowColor = "#38bdf8";
      ctx.shadowBlur = 14;
      ctx.beginPath();
      ctx.arc(x2, y2, 10 * scale, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;
      ctx.fillStyle = "#ffffff";
      ctx.beginPath();
      ctx.arc(cx, cy, 4, 0, Math.PI * 2);
      ctx.fill();
      const insetX = width - 150;
      const insetY = height - 120;
      const insetW = 130;
      const insetH = 100;
      ctx.restore();
      ctx.save();
      ctx.fillStyle = "rgba(15, 23, 42, 0.85)";
      ctx.strokeStyle = "rgba(56, 189, 248, 0.3)";
      ctx.lineWidth = 1;
      ctx.strokeRect(insetX, insetY, insetW, insetH);
      ctx.fillRect(insetX, insetY, insetW, insetH);
      ctx.font = "9px monospace";
      ctx.fillStyle = "#94a3b8";
      ctx.fillText("Phase Space (\\u03B8\\u2081, \\u03C9\\u2081)", insetX + 8, insetY + 14);
      if (phaseSpace.length > 2) {
        ctx.beginPath();
        for (let i = 0; i < phaseSpace.length; i++) {
          const pt = phaseSpace[i];
          const px = insetX + insetW * 0.5 + pt.th1 / Math.PI * (insetW * 0.38);
          const py = insetY + insetH * 0.5 - pt.w1 * 5;
          if (i === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        ctx.strokeStyle = "#f43f5e";
        ctx.lineWidth = 1.2;
        ctx.stroke();
      }
      ctx.font = "11px monospace";
      ctx.fillStyle = "rgba(56, 189, 248, 0.9)";
      ctx.fillText(\`Double Pendulum \\u2014 Lagrangian Mechanics\`, 20, 28);
      ctx.fillStyle = "#94a3b8";
      ctx.fillText(\`L = T - V = 1/2(m\\u2081+m\\u2082)l\\u2081\\xB2\\u03B8\\u0307\\u2081\\xB2 + 1/2m\\u2082l\\u2082\\xB2\\u03B8\\u0307\\u2082\\xB2 + m\\u2082l\\u2081l\\u2082\\u03B8\\u0307\\u2081\\u03B8\\u0307\\u2082cos(\\u03B8\\u2081-\\u03B8\\u2082) + (m\\u2081+m\\u2082)gl\\u2081cos\\u03B8\\u2081 + m\\u2082gl\\u2082cos\\u03B8\\u2082\`, 20, 44);
      ctx.fillText(\`\\u03B8\\u2081: \${(th1 % (Math.PI * 2)).toFixed(2)} rad | \\u03B8\\u2082: \${(th2 % (Math.PI * 2)).toFixed(2)} rad | Total E \\u2248 Constant\`, 20, 60);
      ctx.restore();
    }
  };
}

// Default parameters from content metadata
const defaultParams = [
  {
    "key": "massRatio",
    "label": "Mass Ratio (m₂/m₁)",
    "type": "range",
    "min": 0.2,
    "max": 3,
    "step": 0.1,
    "defaultValue": 1,
    "description": "Ratio of bob 2 mass to bob 1 mass"
  }
];

if (!window.__art_instances) window.__art_instances = {};
if (!window.__art_instances['double-pendulum-chaos']) {
  const inst = typeof createDoublePendulum === 'function' ? createDoublePendulum() : null;
  if (inst && inst.setup) {
    inst.setup({ ctx, width, height, dpr: 1, aspectRatio: width / height }, defaultParams);
  }
  window.__art_instances['double-pendulum-chaos'] = inst;
}

const instance = window.__art_instances['double-pendulum-chaos'];
if (instance && instance.render) {
  instance.render(
    { ctx, width, height, dpr: 1, aspectRatio: width / height },
    { time, deltaTime: dt, frameCount: Math.floor(time * 60), fps: 60 },
    defaultParams
  );
}`,

  // 059. Fourier Epicycles Transform
  'fourier-epicycles-transform': `// 059 - Fourier Epicycles Transform (physics)
// 1:1 Original algorithm engine source
function createFourierEpicycles() {
  const N_MAX = 24;
  const harmonics = [];
  for (let k = 1; k <= N_MAX; k++) {
    const freq = k % 2 === 1 ? k : -k;
    const r = 110 / Math.abs(freq) * (1 / (1 + Math.abs(freq) * 0.05));
    harmonics.push({ k: freq, radius: r, phase: k * 0.4 });
  }
  harmonics.sort((a, b) => b.radius - a.radius);
  const drawnTrail = [];
  return {
    setup() {
      drawnTrail.length = 0;
    },
    render(context, timeState, params) {
      const { ctx, width, height } = context;
      const terms = Math.min(harmonics.length, Math.floor(Number(params.termsCount || 16)));
      const rotSpeed = Number(params.cycleSpeed || 0.6);
      const t = timeState.time * rotSpeed;
      ctx.fillStyle = "#020409";
      ctx.fillRect(0, 0, width, height);
      const cx = width * 0.46;
      const cy = height * 0.5;
      let curX = cx;
      let curY = cy;
      ctx.save();
      ctx.globalCompositeOperation = "screen";
      for (let i = 0; i < terms; i++) {
        const h = harmonics[i];
        const prevX = curX;
        const prevY = curY;
        const theta = h.k * t + h.phase;
        curX += h.radius * Math.cos(theta);
        curY += h.radius * Math.sin(theta);
        ctx.beginPath();
        ctx.arc(prevX, prevY, h.radius, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(56, 189, 248, 0.2)";
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(prevX, prevY);
        ctx.lineTo(curX, curY);
        ctx.strokeStyle = "rgba(56, 189, 248, 0.7)";
        ctx.lineWidth = 1.4;
        ctx.stroke();
        ctx.fillStyle = "#38bdf8";
        ctx.beginPath();
        ctx.arc(curX, curY, 2.5, 0, Math.PI * 2);
        ctx.fill();
      }
      drawnTrail.push({ x: curX, y: curY });
      if (drawnTrail.length > 550) drawnTrail.shift();
      if (drawnTrail.length > 2) {
        ctx.beginPath();
        for (let i = 0; i < drawnTrail.length; i++) {
          const pt = drawnTrail[i];
          if (i === 0) ctx.moveTo(pt.x, pt.y);
          else ctx.lineTo(pt.x, pt.y);
        }
        ctx.strokeStyle = "#f43f5e";
        ctx.shadowColor = "#f43f5e";
        ctx.shadowBlur = 12;
        ctx.lineWidth = 2.4;
        ctx.stroke();
        ctx.shadowBlur = 0;
      }
      const specX = width - 150;
      const specY = height - 120;
      const specW = 130;
      const specH = 95;
      ctx.restore();
      ctx.save();
      ctx.fillStyle = "rgba(15, 23, 42, 0.85)";
      ctx.strokeStyle = "rgba(56, 189, 248, 0.3)";
      ctx.lineWidth = 1;
      ctx.strokeRect(specX, specY, specW, specH);
      ctx.fillRect(specX, specY, specW, specH);
      ctx.font = "9px monospace";
      ctx.fillStyle = "#94a3b8";
      ctx.fillText("Fourier Spectrum |c_k|", specX + 8, specY + 14);
      const barWidth = Math.max(3, (specW - 20) / terms);
      for (let k = 0; k < terms; k++) {
        const barH = harmonics[k].radius / harmonics[0].radius * 60;
        const bx = specX + 10 + k * barWidth;
        const by = specY + specH - 10 - barH;
        ctx.fillStyle = "#38bdf8";
        ctx.fillRect(bx, by, barWidth - 1, barH);
      }
      ctx.font = "11px monospace";
      ctx.fillStyle = "rgba(56, 189, 248, 0.9)";
      ctx.fillText(\`Fourier Transform & Epicycles \\u2014 Complex Analysis\`, 20, 28);
      ctx.fillStyle = "#94a3b8";
      ctx.fillText(\`f(t) = \\u2211_{k=-N}^N c_k e^{i k \\u03C9 t} | c_k = 1/T \\u222B_0^T f(t) e^{-i k \\u03C9 t} dt\`, 20, 44);
      ctx.fillText(\`Active Epicycle Phasors: \${terms} harmonic modes | Reconstruction Error \\u2192 0\`, 20, 60);
      ctx.restore();
    }
  };
}

// Default parameters from content metadata
const defaultParams = [
  {
    "key": "termsCount",
    "label": "Harmonic Terms (N)",
    "type": "range",
    "min": 2,
    "max": 24,
    "step": 1,
    "defaultValue": 16,
    "description": "Number of active Fourier epicycle phasor modes"
  },
  {
    "key": "cycleSpeed",
    "label": "Rotation Speed",
    "type": "range",
    "min": 0.2,
    "max": 2,
    "step": 0.1,
    "defaultValue": 0.6,
    "description": "Fundamental angular frequency ω"
  }
];

if (!window.__art_instances) window.__art_instances = {};
if (!window.__art_instances['fourier-epicycles-transform']) {
  const inst = typeof createFourierEpicycles === 'function' ? createFourierEpicycles() : null;
  if (inst && inst.setup) {
    inst.setup({ ctx, width, height, dpr: 1, aspectRatio: width / height }, defaultParams);
  }
  window.__art_instances['fourier-epicycles-transform'] = inst;
}

const instance = window.__art_instances['fourier-epicycles-transform'];
if (instance && instance.render) {
  instance.render(
    { ctx, width, height, dpr: 1, aspectRatio: width / height },
    { time, deltaTime: dt, frameCount: Math.floor(time * 60), fps: 60 },
    defaultParams
  );
}`,

  // 060. Maxwell's EM Wave Propagation
  'maxwell-em-wave': `// 060 - Maxwell's EM Wave Propagation (physics)
// 1:1 Original algorithm engine source
function createMaxwellEMWave() {
  const NODE_COUNT = 38;
  return {
    setup() {
    },
    render(context, timeState, params) {
      const { ctx, width, height } = context;
      const waveFreq = Number(params.frequency || 1.2);
      const waveAmp = Number(params.amplitude || 1);
      const t = timeState.time * waveFreq;
      ctx.fillStyle = "#020308";
      ctx.fillRect(0, 0, width, height);
      const cx = width * 0.5;
      const cy = height * 0.52;
      const scale = Math.min(width, height) / 480;
      const rotY = 0.55 + Math.sin(t * 0.2) * 0.1;
      const rotX = 0.38;
      const rotZ = 0;
      ctx.save();
      ctx.globalCompositeOperation = "screen";
      const totalLength = 360 * scale;
      const k = 0.025;
      const pAxisStart = project3D(-totalLength * 0.5, 0, 0, rotX, rotY, rotZ, cx, cy, 450, 520);
      const pAxisEnd = project3D(totalLength * 0.5, 0, 0, rotX, rotY, rotZ, cx, cy, 450, 520);
      ctx.beginPath();
      ctx.moveTo(pAxisStart.x, pAxisStart.y);
      ctx.lineTo(pAxisEnd.x, pAxisEnd.y);
      ctx.strokeStyle = "rgba(255, 255, 255, 0.4)";
      ctx.lineWidth = 1.6;
      ctx.stroke();
      ctx.fillStyle = "#fbbf24";
      ctx.beginPath();
      ctx.arc(pAxisEnd.x, pAxisEnd.y, 5 * scale, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      for (let i = 0; i < NODE_COUNT; i++) {
        const normI = i / (NODE_COUNT - 1);
        const xPos = (normI - 0.5) * totalLength;
        const eField = Math.sin(xPos * k - t * 3.5) * (70 * waveAmp * scale);
        const pBase = project3D(xPos, 0, 0, rotX, rotY, rotZ, cx, cy, 450, 520);
        const pTip = project3D(xPos, eField, 0, rotX, rotY, rotZ, cx, cy, 450, 520);
        ctx.moveTo(pBase.x, pBase.y);
        ctx.lineTo(pTip.x, pTip.y);
        ctx.fillStyle = "#38bdf8";
        ctx.fillRect(pTip.x - 1.5, pTip.y - 1.5, 3, 3);
      }
      ctx.strokeStyle = "#38bdf8";
      ctx.lineWidth = 1.6;
      ctx.stroke();
      ctx.beginPath();
      for (let x = -totalLength * 0.5; x <= totalLength * 0.5; x += 4) {
        const eField = Math.sin(x * k - t * 3.5) * (70 * waveAmp * scale);
        const p = project3D(x, eField, 0, rotX, rotY, rotZ, cx, cy, 450, 520);
        if (x === -totalLength * 0.5) ctx.moveTo(p.x, p.y);
        else ctx.lineTo(p.x, p.y);
      }
      ctx.strokeStyle = "#38bdf8";
      ctx.shadowColor = "#38bdf8";
      ctx.shadowBlur = 10;
      ctx.lineWidth = 2.2;
      ctx.stroke();
      ctx.shadowBlur = 0;
      ctx.beginPath();
      for (let i = 0; i < NODE_COUNT; i++) {
        const normI = i / (NODE_COUNT - 1);
        const xPos = (normI - 0.5) * totalLength;
        const bField = Math.sin(xPos * k - t * 3.5) * (70 * waveAmp * scale);
        const pBase = project3D(xPos, 0, 0, rotX, rotY, rotZ, cx, cy, 450, 520);
        const pTip = project3D(xPos, 0, bField, rotX, rotY, rotZ, cx, cy, 450, 520);
        ctx.moveTo(pBase.x, pBase.y);
        ctx.lineTo(pTip.x, pTip.y);
        ctx.fillStyle = "#f43f5e";
        ctx.fillRect(pTip.x - 1.5, pTip.y - 1.5, 3, 3);
      }
      ctx.strokeStyle = "#f43f5e";
      ctx.lineWidth = 1.6;
      ctx.stroke();
      ctx.beginPath();
      for (let x = -totalLength * 0.5; x <= totalLength * 0.5; x += 4) {
        const bField = Math.sin(x * k - t * 3.5) * (70 * waveAmp * scale);
        const p = project3D(x, 0, bField, rotX, rotY, rotZ, cx, cy, 450, 520);
        if (x === -totalLength * 0.5) ctx.moveTo(p.x, p.y);
        else ctx.lineTo(p.x, p.y);
      }
      ctx.strokeStyle = "#f43f5e";
      ctx.shadowColor = "#f43f5e";
      ctx.shadowBlur = 10;
      ctx.lineWidth = 2.2;
      ctx.stroke();
      ctx.shadowBlur = 0;
      ctx.restore();
      ctx.save();
      ctx.font = "11px monospace";
      ctx.fillStyle = "rgba(56, 189, 248, 0.9)";
      ctx.fillText(\`Maxwell's Equations \\u2014 Electromagnetic Wave Propagation\`, 20, 28);
      ctx.fillStyle = "#94a3b8";
      ctx.fillText(\`\\u2207 \\xD7 E = -\\u2202B/\\u2202t  |  \\u2207 \\xD7 B = \\u03BC\\u2080\\u03B5\\u2080 \\u2202E/\\u2202t  |  c = 1/\\u221A(\\u03BC\\u2080\\u03B5\\u2080)\`, 20, 44);
      ctx.fillText(\`Electric Vector E(x,t) [Cyan] \\u22A5 Magnetic Vector B(x,t) [Rose] \\u22A5 Poynting Vector S [Gold]\`, 20, 60);
      ctx.restore();
    }
  };
}

// Default parameters from content metadata
const defaultParams = [
  {
    "key": "frequency",
    "label": "Wave Frequency (ω)",
    "type": "range",
    "min": 0.5,
    "max": 2.5,
    "step": 0.1,
    "defaultValue": 1.2,
    "description": "Angular frequency of the electromagnetic oscillation"
  },
  {
    "key": "amplitude",
    "label": "Field Amplitude (E₀)",
    "type": "range",
    "min": 0.4,
    "max": 1.8,
    "step": 0.1,
    "defaultValue": 1,
    "description": "Peak electric and magnetic field amplitude"
  }
];

if (!window.__art_instances) window.__art_instances = {};
if (!window.__art_instances['maxwell-em-wave']) {
  const inst = typeof createMaxwellEMWave === 'function' ? createMaxwellEMWave() : null;
  if (inst && inst.setup) {
    inst.setup({ ctx, width, height, dpr: 1, aspectRatio: width / height }, defaultParams);
  }
  window.__art_instances['maxwell-em-wave'] = inst;
}

const instance = window.__art_instances['maxwell-em-wave'];
if (instance && instance.render) {
  instance.render(
    { ctx, width, height, dpr: 1, aspectRatio: width / height },
    { time, deltaTime: dt, frameCount: Math.floor(time * 60), fps: 60 },
    defaultParams
  );
}`,

  // 061. Spacetime Curvature & Geodesics
  'spacetime-curvature-geodesic': `// 061 - Spacetime Curvature & Geodesics (physics)
// 1:1 Original algorithm engine source
function createSpacetimeCurvature() {
  const GRID_RADIAL = 22;
  const GRID_ANGULAR = 32;
  const photons = [
    { startY: -120, speed: 180 },
    { startY: -75, speed: 180 },
    { startY: -45, speed: 180 },
    { startY: 45, speed: 180 },
    { startY: 75, speed: 180 },
    { startY: 120, speed: 180 }
  ];
  return {
    setup() {
    },
    render(context, timeState, params) {
      const { ctx, width, height } = context;
      const massStrength = Number(params.massDensity || 1.2);
      const t = timeState.time;
      ctx.fillStyle = "#010205";
      ctx.fillRect(0, 0, width, height);
      const cx = width * 0.5;
      const cy = height * 0.52;
      const scale = Math.min(width, height) / 480;
      const rotY = t * 0.15;
      const rotX = 0.65;
      const rotZ = 0;
      ctx.save();
      ctx.globalCompositeOperation = "screen";
      const maxR = 210 * scale;
      const rs = 28 * massStrength * scale;
      function getSpacetimeDepth(r) {
        if (r < rs) return 130 * scale;
        return 130 * scale - 2 * Math.sqrt(Math.max(0, rs * (r - rs))) * 4.2;
      }
      for (let r = 1; r <= GRID_RADIAL; r++) {
        const normR = r / GRID_RADIAL;
        const curR = rs + Math.pow(normR, 1.4) * (maxR - rs);
        const depthZ = getSpacetimeDepth(curR);
        ctx.beginPath();
        for (let a = 0; a <= GRID_ANGULAR; a++) {
          const phi = a / GRID_ANGULAR * Math.PI * 2;
          const px = curR * Math.cos(phi);
          const py = curR * Math.sin(phi);
          const proj = project3D(px, depthZ, py, rotX, rotY, rotZ, cx, cy, 450, 520);
          if (a === 0) ctx.moveTo(proj.x, proj.y);
          else ctx.lineTo(proj.x, proj.y);
        }
        ctx.closePath();
        const ringHue = (200 + normR * 45) % 360;
        ctx.strokeStyle = hsla(ringHue, 90, 68, 0.08 + (1 - normR) * 0.45);
        ctx.lineWidth = r === 1 ? 2 : 1;
        ctx.stroke();
      }
      for (let a = 0; a < GRID_ANGULAR; a += 2) {
        const phi = a / GRID_ANGULAR * Math.PI * 2;
        ctx.beginPath();
        for (let r = 1; r <= GRID_RADIAL; r++) {
          const normR = r / GRID_RADIAL;
          const curR = rs + Math.pow(normR, 1.4) * (maxR - rs);
          const depthZ = getSpacetimeDepth(curR);
          const px = curR * Math.cos(phi);
          const py = curR * Math.sin(phi);
          const proj = project3D(px, depthZ, py, rotX, rotY, rotZ, cx, cy, 450, 520);
          if (r === 1) ctx.moveTo(proj.x, proj.y);
          else ctx.lineTo(proj.x, proj.y);
        }
        ctx.strokeStyle = "rgba(56, 189, 248, 0.2)";
        ctx.lineWidth = 1;
        ctx.stroke();
      }
      const pSingularity = project3D(0, 130 * scale, 0, rotX, rotY, rotZ, cx, cy, 450, 520);
      const massGrad = ctx.createRadialGradient(pSingularity.x, pSingularity.y, 2, pSingularity.x, pSingularity.y, 24 * scale);
      massGrad.addColorStop(0, "#ffffff");
      massGrad.addColorStop(0.3, "#f59e0b");
      massGrad.addColorStop(0.7, "#ea580c");
      massGrad.addColorStop(1, "rgba(234, 88, 12, 0)");
      ctx.fillStyle = massGrad;
      ctx.beginPath();
      ctx.arc(pSingularity.x, pSingularity.y, 24 * scale, 0, Math.PI * 2);
      ctx.fill();
      const orbitTheta = t * 1.8;
      const orbitR = 95 * scale;
      const orbitZ = getSpacetimeDepth(orbitR);
      const pOrb = project3D(orbitR * Math.cos(orbitTheta), orbitZ, orbitR * Math.sin(orbitTheta), rotX, rotY, rotZ, cx, cy, 450, 520);
      ctx.fillStyle = "#38bdf8";
      ctx.shadowColor = "#38bdf8";
      ctx.shadowBlur = 12;
      ctx.beginPath();
      ctx.arc(pOrb.x, pOrb.y, 5 * scale, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;
      for (let p = 0; p < photons.length; p++) {
        const ph = photons[p];
        ctx.beginPath();
        const steps = 40;
        for (let i = 0; i <= steps; i++) {
          const normX = (i / steps - 0.5) * (maxR * 2.2);
          const impactB = ph.startY * scale;
          const dist = Math.hypot(normX, impactB);
          const defAmount = 4 * rs / (dist + rs * 0.5);
          const yDef = impactB + Math.sign(impactB) * defAmount * (normX > 0 ? 1 : -1) * 8;
          const zDepth = getSpacetimeDepth(Math.max(rs + 5, dist));
          const proj = project3D(normX, zDepth, yDef, rotX, rotY, rotZ, cx, cy, 450, 520);
          if (i === 0) ctx.moveTo(proj.x, proj.y);
          else ctx.lineTo(proj.x, proj.y);
        }
        ctx.strokeStyle = "#fbbf24";
        ctx.lineWidth = 1.4;
        ctx.stroke();
      }
      ctx.restore();
      ctx.save();
      ctx.font = "11px monospace";
      ctx.fillStyle = "rgba(56, 189, 248, 0.9)";
      ctx.fillText(\`General Relativity \\u2014 Spacetime Curvature & Geodesics\`, 20, 28);
      ctx.fillStyle = "#94a3b8";
      ctx.fillText(\`G_\\u03BC\\u03BD = (8\\u03C0G/c\\u2074) T_\\u03BC\\u03BD  |  Schwarzschild Metric: ds\\xB2 = -(1-r_s/r)c\\xB2dt\\xB2 + (1-r_s/r)\\u207B\\xB9dr\\xB2 + r\\xB2d\\u03A9\\xB2\`, 20, 44);
      ctx.fillText(\`Gravitational Lensing Deflection: \\u0394\\u03C6 \\u2248 4GM/(c\\xB2b) | Photon Null Geodesics [Gold]\`, 20, 60);
      ctx.restore();
    }
  };
}

// Default parameters from content metadata
const defaultParams = [
  {
    "key": "massDensity",
    "label": "Central Mass (M)",
    "type": "range",
    "min": 0.5,
    "max": 2.5,
    "step": 0.1,
    "defaultValue": 1.2,
    "description": "Mass determining Schwarzschild radius r_s = 2GM/c²"
  }
];

if (!window.__art_instances) window.__art_instances = {};
if (!window.__art_instances['spacetime-curvature-geodesic']) {
  const inst = typeof createSpacetimeCurvature === 'function' ? createSpacetimeCurvature() : null;
  if (inst && inst.setup) {
    inst.setup({ ctx, width, height, dpr: 1, aspectRatio: width / height }, defaultParams);
  }
  window.__art_instances['spacetime-curvature-geodesic'] = inst;
}

const instance = window.__art_instances['spacetime-curvature-geodesic'];
if (instance && instance.render) {
  instance.render(
    { ctx, width, height, dpr: 1, aspectRatio: width / height },
    { time, deltaTime: dt, frameCount: Math.floor(time * 60), fps: 60 },
    defaultParams
  );
}`,

  // 062. Baroque Golden Arabesque Filigree
  'baroque-filigrane': `// 062 - Baroque Golden Arabesque Filigree (geometry)
// 1:1 Original algorithm engine source
function createBaroqueFiligrane() {
  return {
    setup() {
    },
    render(context, timeState, params) {
      const { ctx, width, height } = context;
      const speed = Number(params.shimmerSpeed ?? 0.6);
      const folds = Math.max(3, Math.round(Number(params.folds ?? 8)));
      const tightness = Number(params.curlTightness ?? 1.2);
      const webDensity = Math.max(3, Math.round(Number(params.webDensity ?? 8)));
      const t = timeState.time * speed;
      ctx.fillStyle = "#050608";
      ctx.fillRect(0, 0, width, height);
      const cx = width * 0.5;
      const cy = height * 0.5;
      const maxR = Math.min(width, height) * 0.44;
      ctx.save();
      ctx.translate(cx, cy);
      const baseHue = 42;
      const coreR = maxR * 0.16;
      for (let ring = 1; ring <= 3; ring++) {
        const rr = ring / 3 * coreR;
        ctx.beginPath();
        for (let i = 0; i <= folds * 2; i++) {
          const a = i / (folds * 2) * Math.PI * 2 + t * (ring % 2 === 0 ? 0.2 : -0.2);
          const rMod = rr * (1 + 0.18 * Math.sin(a * folds + t * 2));
          const px = Math.cos(a) * rMod;
          const py = Math.sin(a) * rMod;
          if (i === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        ctx.closePath();
        ctx.strokeStyle = hsla(baseHue + ring * 5, 90, 72, 0.75);
        ctx.lineWidth = 1.4 - ring * 0.2;
        ctx.stroke();
      }
      for (let f = 0; f < folds; f++) {
        const baseAngle = f / folds * Math.PI * 2;
        ctx.save();
        ctx.rotate(baseAngle + t * 0.05);
        ctx.beginPath();
        const armSteps = 70;
        const armPoints = [];
        for (let i = 0; i <= armSteps; i++) {
          const u = i / armSteps;
          const theta = u * Math.PI * 1.8 * tightness;
          const r = coreR + (maxR - coreR) * Math.pow(u, 0.88) * (1 + 0.08 * Math.sin(t * 1.5 + f));
          const curlOffset = Math.sin(theta) * (maxR * 0.14 * (1 - u) * tightness);
          const px = Math.cos(theta * 0.45) * r + curlOffset;
          const py = Math.sin(theta * 0.45) * r;
          armPoints.push({ x: px, y: py });
          if (i === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        const shimmer = Math.sin(t * 3 + f * 0.8) * 10;
        ctx.strokeStyle = hsla(baseHue + shimmer, 92, 70, 0.85);
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.beginPath();
        const cSteps = 45;
        const cPoints = [];
        const midAnchor = armPoints[Math.floor(armSteps * 0.52)];
        for (let j = 0; j <= cSteps; j++) {
          const v = j / cSteps;
          const phi = -v * Math.PI * 1.6 * tightness + Math.PI * 0.35;
          const cr = maxR * 0.28 * Math.pow(v, 0.9);
          const cx_p = midAnchor.x + Math.cos(phi) * cr;
          const cy_p = midAnchor.y + Math.sin(phi) * cr;
          cPoints.push({ x: cx_p, y: cy_p });
          if (j === 0) ctx.moveTo(cx_p, cy_p);
          else ctx.lineTo(cx_p, cy_p);
        }
        ctx.strokeStyle = hsla(baseHue + 8, 85, 76, 0.7);
        ctx.lineWidth = 1.3;
        ctx.stroke();
        for (let w = 1; w <= webDensity; w++) {
          const frac = w / (webDensity + 1);
          const pA = armPoints[Math.min(armPoints.length - 1, Math.floor(frac * armSteps * 0.85))];
          const pB = cPoints[Math.min(cPoints.length - 1, Math.floor((1 - frac) * cSteps))];
          ctx.beginPath();
          ctx.moveTo(pA.x, pA.y);
          const midX = (pA.x + pB.x) * 0.5 + Math.sin(t * 2 + w) * 6;
          const midY = (pA.y + pB.y) * 0.5 + Math.cos(t * 2 + w) * 6;
          ctx.quadraticCurveTo(midX, midY, pB.x, pB.y);
          ctx.strokeStyle = hsla(baseHue - 4 + w % 3 * 6, 80, 78, 0.35);
          ctx.lineWidth = 0.75;
          ctx.stroke();
        }
        const tipA = armPoints[armPoints.length - 1];
        const tipB = cPoints[cPoints.length - 1];
        ctx.fillStyle = hsla(baseHue + 15, 100, 88, 0.95);
        ctx.beginPath();
        ctx.arc(tipA.x, tipA.y, 3.2, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = hsla(baseHue + 20, 100, 95, 0.4);
        ctx.beginPath();
        ctx.arc(tipA.x, tipA.y, 6, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = hsla(baseHue + 10, 95, 84, 0.9);
        ctx.beginPath();
        ctx.arc(tipB.x, tipB.y, 2.4, 0, Math.PI * 2);
        ctx.fill();
        for (let b = 1; b <= 4; b++) {
          const pt = armPoints[Math.floor(b * 14)];
          ctx.fillStyle = hsla(baseHue, 95, 78, 0.75);
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, 1.5, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      }
      ctx.beginPath();
      const outerSteps = folds * 16;
      for (let k = 0; k <= outerSteps; k++) {
        const theta = k / outerSteps * Math.PI * 2;
        const scallop = Math.abs(Math.sin(theta * (folds * 0.5) + t * 0.2)) * (maxR * 0.08);
        const ro = maxR * 0.92 + scallop;
        const px = Math.cos(theta) * ro;
        const py = Math.sin(theta) * ro;
        if (k === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.closePath();
      ctx.strokeStyle = hsla(baseHue + 4, 85, 74, 0.45);
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.restore();
    }
  };
}

// Default parameters from content metadata
const defaultParams = [
  {
    "key": "folds",
    "label": "Symmetry Folds",
    "type": "range",
    "min": 4,
    "max": 16,
    "step": 1,
    "defaultValue": 8,
    "description": "Radial rotational symmetry order"
  },
  {
    "key": "curlTightness",
    "label": "Volute Tightness",
    "type": "range",
    "min": 0.6,
    "max": 2.2,
    "step": 0.1,
    "defaultValue": 1.2,
    "description": "Logarithmic spiral coiling factor"
  },
  {
    "key": "webDensity",
    "label": "Lace Web Density",
    "type": "range",
    "min": 3,
    "max": 14,
    "step": 1,
    "defaultValue": 8,
    "description": "Filigree wire infill bridging count"
  },
  {
    "key": "shimmerSpeed",
    "label": "Shimmer Speed",
    "type": "range",
    "min": 0.2,
    "max": 2,
    "step": 0.1,
    "defaultValue": 0.6,
    "description": "24K metallic luster cycling rate"
  }
];

if (!window.__art_instances) window.__art_instances = {};
if (!window.__art_instances['baroque-filigrane']) {
  const inst = typeof createBaroqueFiligrane === 'function' ? createBaroqueFiligrane() : null;
  if (inst && inst.setup) {
    inst.setup({ ctx, width, height, dpr: 1, aspectRatio: width / height }, defaultParams);
  }
  window.__art_instances['baroque-filigrane'] = inst;
}

const instance = window.__art_instances['baroque-filigrane'];
if (instance && instance.render) {
  instance.render(
    { ctx, width, height, dpr: 1, aspectRatio: width / height },
    { time, deltaTime: dt, frameCount: Math.floor(time * 60), fps: 60 },
    defaultParams
  );
}`,

  // 063. Guilloché Horology Lace Filigree
  'guilloche-filigrane': `// 063 - Guilloché Horology Lace Filigree (geometry)
// 1:1 Original algorithm engine source
function createGuillocheFiligrane() {
  return {
    setup() {
    },
    render(context, timeState, params) {
      const { ctx, width, height } = context;
      const speed = Number(params.speed ?? 0.4);
      const gearRatio = Number(params.gearRatio ?? 7);
      const eccentricity = Number(params.eccentricity ?? 0.75);
      const waveMod = Number(params.waveModulation ?? 12);
      const t = timeState.time * speed;
      ctx.fillStyle = "#04060c";
      ctx.fillRect(0, 0, width, height);
      const cx = width * 0.5;
      const cy = height * 0.5;
      const baseR = Math.min(width, height) * 0.42;
      ctx.save();
      ctx.translate(cx, cy);
      const layers = 5;
      const totalSteps = 480;
      for (let layer = 0; layer < layers; layer++) {
        const layerFrac = (layer + 1) / layers;
        const R = baseR * (0.35 + 0.65 * layerFrac);
        const r = R / gearRatio * (1 + 0.05 * Math.sin(t * 0.8 + layer));
        const d = r * eccentricity * (1 + 0.15 * Math.cos(t * 1.2 + layer));
        const layerPhase = t * (layer % 2 === 0 ? 0.35 : -0.28) + layer * Math.PI / layers;
        const baseHue = (210 + layer * 22 + t * 15) % 360;
        ctx.beginPath();
        for (let i = 0; i <= totalSteps; i++) {
          const theta = i / totalSteps * Math.PI * 2 * gearRatio;
          const diff = R - r;
          const k = diff / r;
          const modHarmonic = Math.sin(theta * (waveMod / gearRatio) + layerPhase) * (baseR * 0.04 * layerFrac);
          const x = diff * Math.cos(theta) + (d + modHarmonic) * Math.cos(k * theta + layerPhase);
          const y = diff * Math.sin(theta) - (d + modHarmonic) * Math.sin(k * theta + layerPhase);
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.strokeStyle = hsla(baseHue, 92, 74, 0.55 + layer * 0.08);
        ctx.lineWidth = 1;
        ctx.stroke();
        if (layer % 2 === 1) {
          ctx.beginPath();
          for (let j = 0; j <= totalSteps; j += 6) {
            const theta = j / totalSteps * Math.PI * 2 * gearRatio;
            const diff = R - r;
            const k = diff / r;
            const x = diff * Math.cos(theta) + d * Math.cos(k * theta + layerPhase);
            const y = diff * Math.sin(theta) - d * Math.sin(k * theta + layerPhase);
            const nx = x * (1 + 0.08 * Math.sin(theta * 3 + t * 2));
            const ny = y * (1 + 0.08 * Math.sin(theta * 3 + t * 2));
            ctx.moveTo(x, y);
            ctx.lineTo(nx, ny);
          }
          ctx.strokeStyle = hsla(baseHue + 40, 95, 82, 0.28);
          ctx.lineWidth = 0.6;
          ctx.stroke();
        }
      }
      ctx.beginPath();
      ctx.arc(0, 0, baseR * 0.07, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(14, 165, 233, 0.25)";
      ctx.fill();
      ctx.strokeStyle = hsla(195, 100, 85, 0.9);
      ctx.lineWidth = 1.6;
      ctx.stroke();
      const ticks = 72;
      for (let k = 0; k < ticks; k++) {
        const a = k / ticks * Math.PI * 2 + t * 0.05;
        const rInner = baseR * (k % 6 === 0 ? 0.94 : 0.97);
        const rOuter = baseR;
        ctx.beginPath();
        ctx.moveTo(Math.cos(a) * rInner, Math.sin(a) * rInner);
        ctx.lineTo(Math.cos(a) * rOuter, Math.sin(a) * rOuter);
        ctx.strokeStyle = hsla(200, 80, 75, k % 6 === 0 ? 0.7 : 0.35);
        ctx.lineWidth = k % 6 === 0 ? 1.4 : 0.75;
        ctx.stroke();
      }
      ctx.restore();
    }
  };
}

// Default parameters from content metadata
const defaultParams = [
  {
    "key": "gearRatio",
    "label": "Rosette Ratio",
    "type": "range",
    "min": 3,
    "max": 15,
    "step": 1,
    "defaultValue": 7,
    "description": "Hypotrochoid petal count ratio"
  },
  {
    "key": "eccentricity",
    "label": "Lace Eccentricity",
    "type": "range",
    "min": 0.2,
    "max": 1.4,
    "step": 0.05,
    "defaultValue": 0.75,
    "description": "Cycloid loop extension depth"
  },
  {
    "key": "waveModulation",
    "label": "Moiré Wave",
    "type": "range",
    "min": 4,
    "max": 24,
    "step": 2,
    "defaultValue": 12,
    "description": "Harmonic interference frequency"
  },
  {
    "key": "speed",
    "label": "Precession Rate",
    "type": "range",
    "min": 0.1,
    "max": 1.5,
    "step": 0.05,
    "defaultValue": 0.4,
    "description": "Continuous phase rotation speed"
  }
];

if (!window.__art_instances) window.__art_instances = {};
if (!window.__art_instances['guilloche-filigrane']) {
  const inst = typeof createGuillocheFiligrane === 'function' ? createGuillocheFiligrane() : null;
  if (inst && inst.setup) {
    inst.setup({ ctx, width, height, dpr: 1, aspectRatio: width / height }, defaultParams);
  }
  window.__art_instances['guilloche-filigrane'] = inst;
}

const instance = window.__art_instances['guilloche-filigrane'];
if (instance && instance.render) {
  instance.render(
    { ctx, width, height, dpr: 1, aspectRatio: width / height },
    { time, deltaTime: dt, frameCount: Math.floor(time * 60), fps: 60 },
    defaultParams
  );
}`,

  // 064. Damascene Star Tracery Filigree
  'damascene-filigrane': `// 064 - Damascene Star Tracery Filigree (geometry)
// 1:1 Original algorithm engine source
function createDamasceneFiligrane() {
  return {
    setup() {
    },
    render(context, timeState, params) {
      const { ctx, width, height } = context;
      const speed = Number(params.speed ?? 0.5);
      const symmetry = Math.max(4, Math.round(Number(params.symmetry ?? 8)));
      const weaveDepth = Number(params.weaveDepth ?? 0.8);
      const laceRings = Math.max(2, Math.min(6, Math.round(Number(params.laceRings ?? 4))));
      const t = timeState.time * speed;
      ctx.fillStyle = "#030806";
      ctx.fillRect(0, 0, width, height);
      const cx = width * 0.5;
      const cy = height * 0.5;
      const maxR = Math.min(width, height) * 0.43;
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(t * 0.04);
      const goldHue = 44;
      const emeraldHue = 158;
      for (let ring = 1; ring <= laceRings; ring++) {
        const ringFrac = ring / laceRings;
        const rOuter = maxR * ringFrac;
        const rInner = maxR * (ringFrac - 0.75 / laceRings * weaveDepth);
        const ringPhase = t * (ring % 2 === 0 ? 0.25 : -0.2) + ring * 0.4;
        const isGold = ring % 2 === 1;
        const strokeHue = isGold ? goldHue + Math.sin(t + ring) * 8 : emeraldHue + Math.sin(t + ring) * 10;
        for (let s = 0; s < symmetry; s++) {
          const a1 = s / symmetry * Math.PI * 2 + ringPhase;
          const a2 = (s + 0.5) / symmetry * Math.PI * 2 + ringPhase;
          const a3 = (s + 1) / symmetry * Math.PI * 2 + ringPhase;
          const p1x = Math.cos(a1) * rInner;
          const p1y = Math.sin(a1) * rInner;
          const p2x = Math.cos(a2) * rOuter;
          const p2y = Math.sin(a2) * rOuter;
          const p3x = Math.cos(a3) * rInner;
          const p3y = Math.sin(a3) * rInner;
          for (const offset of [-1.8, 1.8]) {
            ctx.beginPath();
            ctx.moveTo(p1x, p1y);
            const ctrlX = (p1x + p2x) * 0.5 + Math.cos(a2 + Math.PI / 2) * offset;
            const ctrlY = (p1y + p2y) * 0.5 + Math.sin(a2 + Math.PI / 2) * offset;
            ctx.quadraticCurveTo(ctrlX, ctrlY, p2x, p2y);
            const ctrl2X = (p2x + p3x) * 0.5 + Math.cos(a2 - Math.PI / 2) * offset;
            const ctrl2Y = (p2y + p3y) * 0.5 + Math.sin(a2 - Math.PI / 2) * offset;
            ctx.quadraticCurveTo(ctrl2X, ctrl2Y, p3x, p3y);
            ctx.strokeStyle = hsla(strokeHue, 90, 72, 0.7);
            ctx.lineWidth = 1.1;
            ctx.stroke();
          }
          if (ring >= 2) {
            const archMidX = (p1x + p3x) * 0.5;
            const archMidY = (p1y + p3y) * 0.5;
            ctx.beginPath();
            ctx.moveTo(p1x, p1y);
            ctx.quadraticCurveTo(archMidX * 1.15, archMidY * 1.15, p3x, p3y);
            ctx.strokeStyle = hsla(strokeHue + 15, 80, 80, 0.35);
            ctx.lineWidth = 0.75;
            ctx.stroke();
          }
          if (ring === laceRings || ring === Math.floor(laceRings / 2)) {
            ctx.fillStyle = hsla(isGold ? emeraldHue : goldHue, 100, 70, 0.95);
            ctx.beginPath();
            ctx.arc(p2x, p2y, 2.8, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillStyle = hsla(isGold ? emeraldHue : goldHue, 100, 92, 0.45);
            ctx.beginPath();
            ctx.arc(p2x, p2y, 5.5, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }
      const medR = maxR * 0.18;
      ctx.beginPath();
      for (let k = 0; k <= symmetry * 2; k++) {
        const theta = k / (symmetry * 2) * Math.PI * 2;
        const rad = k % 2 === 0 ? medR : medR * 0.55;
        const px = Math.cos(theta) * rad;
        const py = Math.sin(theta) * rad;
        if (k === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.closePath();
      ctx.fillStyle = "rgba(16, 185, 129, 0.15)";
      ctx.fill();
      ctx.strokeStyle = hsla(goldHue, 95, 82, 0.95);
      ctx.lineWidth = 1.8;
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(0, 0, maxR * 0.98, 0, Math.PI * 2);
      ctx.strokeStyle = hsla(goldHue, 85, 75, 0.5);
      ctx.lineWidth = 1.2;
      ctx.stroke();
      ctx.restore();
    }
  };
}

// Default parameters from content metadata
const defaultParams = [
  {
    "key": "symmetry",
    "label": "Star Symmetry",
    "type": "range",
    "min": 4,
    "max": 16,
    "step": 2,
    "defaultValue": 8,
    "description": "Star polygon radial symmetry order"
  },
  {
    "key": "weaveDepth",
    "label": "Weave Interlace Depth",
    "type": "range",
    "min": 0.4,
    "max": 1.4,
    "step": 0.1,
    "defaultValue": 0.8,
    "description": "Radial strapwork nesting overlap"
  },
  {
    "key": "laceRings",
    "label": "Concentric Rings",
    "type": "range",
    "min": 2,
    "max": 6,
    "step": 1,
    "defaultValue": 4,
    "description": "Number of concentric filigree strapwork layers"
  },
  {
    "key": "speed",
    "label": "Bloom Speed",
    "type": "range",
    "min": 0.1,
    "max": 1.5,
    "step": 0.1,
    "defaultValue": 0.5,
    "description": "Harmonic pulsation and rotation cadence"
  }
];

if (!window.__art_instances) window.__art_instances = {};
if (!window.__art_instances['damascene-filigrane']) {
  const inst = typeof createDamasceneFiligrane === 'function' ? createDamasceneFiligrane() : null;
  if (inst && inst.setup) {
    inst.setup({ ctx, width, height, dpr: 1, aspectRatio: width / height }, defaultParams);
  }
  window.__art_instances['damascene-filigrane'] = inst;
}

const instance = window.__art_instances['damascene-filigrane'];
if (instance && instance.render) {
  instance.render(
    { ctx, width, height, dpr: 1, aspectRatio: width / height },
    { time, deltaTime: dt, frameCount: Math.floor(time * 60), fps: 60 },
    defaultParams
  );
}`,

  // 065. Victorian Botanical Vine Filigree
  'botanical-filigrane': `// 065 - Victorian Botanical Vine Filigree (botany)
// 1:1 Original algorithm engine source
function createBotanicalFiligrane() {
  return {
    setup() {
    },
    render(context, timeState, params) {
      const { ctx, width, height } = context;
      const growthSpeed = Number(params.growthSpeed ?? 0.5);
      const tendrils = Math.max(3, Math.min(12, Math.round(Number(params.leafTendrils ?? 6))));
      const budCoils = Math.max(2, Math.min(8, Math.round(Number(params.spiralBuds ?? 4))));
      const wireGlow = Number(params.wireGlow ?? 0.9);
      const t = timeState.time * growthSpeed;
      ctx.fillStyle = "#060706";
      ctx.fillRect(0, 0, width, height);
      const cx = width * 0.5;
      const cy = height * 0.5;
      const maxR = Math.min(width, height) * 0.44;
      ctx.save();
      ctx.translate(cx, cy);
      const goldHue = 46;
      const leafHue = 92;
      const coreR = maxR * 0.14;
      for (let p = 0; p < tendrils; p++) {
        const ang = p / tendrils * Math.PI * 2 + t * 0.1;
        const pLeafLen = coreR * (1.2 + 0.3 * Math.sin(t * 2 + p));
        ctx.beginPath();
        ctx.moveTo(0, 0);
        const cpx1 = Math.cos(ang - 0.25) * pLeafLen;
        const cpy1 = Math.sin(ang - 0.25) * pLeafLen;
        const cpx2 = Math.cos(ang + 0.25) * pLeafLen;
        const cpy2 = Math.sin(ang + 0.25) * pLeafLen;
        const tipX = Math.cos(ang) * (pLeafLen * 1.3);
        const tipY = Math.sin(ang) * (pLeafLen * 1.3);
        ctx.quadraticCurveTo(cpx1, cpy1, tipX, tipY);
        ctx.quadraticCurveTo(cpx2, cpy2, 0, 0);
        ctx.fillStyle = hsla(goldHue, 85, 65, 0.25);
        ctx.fill();
        ctx.strokeStyle = hsla(goldHue + 5, 90, 75, 0.85);
        ctx.lineWidth = 1.3;
        ctx.stroke();
      }
      for (let tr = 0; tr < tendrils; tr++) {
        const baseAngle = tr / tendrils * Math.PI * 2;
        ctx.save();
        ctx.rotate(baseAngle + t * 0.06);
        const vinePoints = [];
        const vineSteps = 60;
        ctx.beginPath();
        for (let i = 0; i <= vineSteps; i++) {
          const u = i / vineSteps;
          const arcAngle = u * Math.PI * 1.25;
          const r = coreR + (maxR - coreR) * Math.pow(u, 0.9);
          const lateralWarp = Math.sin(u * Math.PI * 2 + t) * (maxR * 0.12 * (1 - u));
          const vx = Math.cos(arcAngle * 0.6) * r + lateralWarp;
          const vy = Math.sin(arcAngle * 0.6) * r;
          vinePoints.push({ x: vx, y: vy });
          if (i === 0) ctx.moveTo(vx, vy);
          else ctx.lineTo(vx, vy);
        }
        ctx.strokeStyle = hsla(goldHue + Math.sin(t * 2 + tr) * 6, 92, 70, 0.85 * wireGlow);
        ctx.lineWidth = 2.2;
        ctx.stroke();
        for (let s = 1; s <= 5; s++) {
          const stemIdx = Math.floor(s / 6 * vineSteps);
          const stemPt = vinePoints[stemIdx];
          const side = s % 2 === 0 ? 1 : -1;
          const leafLen = maxR * 0.22 * (1 - s / 7);
          const leafAngle = Math.PI * 0.45 * side + s * 0.2;
          const lx = stemPt.x + Math.cos(leafAngle) * leafLen;
          const ly = stemPt.y + Math.sin(leafAngle) * leafLen;
          ctx.beginPath();
          ctx.moveTo(stemPt.x, stemPt.y);
          const ctrlX = stemPt.x + Math.cos(leafAngle - 0.3 * side) * (leafLen * 0.7);
          const ctrlY = stemPt.y + Math.sin(leafAngle - 0.3 * side) * (leafLen * 0.7);
          ctx.quadraticCurveTo(ctrlX, ctrlY, lx, ly);
          const ctrl2X = stemPt.x + Math.cos(leafAngle + 0.3 * side) * (leafLen * 0.7);
          const ctrl2Y = stemPt.y + Math.sin(leafAngle + 0.3 * side) * (leafLen * 0.7);
          ctx.quadraticCurveTo(ctrl2X, ctrl2Y, stemPt.x, stemPt.y);
          ctx.fillStyle = hsla(leafHue, 60, 50, 0.15);
          ctx.fill();
          ctx.strokeStyle = hsla(goldHue - 6 + s * 4, 85, 75, 0.7);
          ctx.lineWidth = 1.1;
          ctx.stroke();
          for (let v = 1; v <= 3; v++) {
            const vFrac = v / 4;
            const vxStart = stemPt.x + (lx - stemPt.x) * vFrac;
            const vyStart = stemPt.y + (ly - stemPt.y) * vFrac;
            ctx.beginPath();
            ctx.moveTo(vxStart, vyStart);
            ctx.lineTo(
              vxStart + Math.cos(leafAngle + 0.8 * side) * (leafLen * 0.25 * (1 - vFrac)),
              vyStart + Math.sin(leafAngle + 0.8 * side) * (leafLen * 0.25 * (1 - vFrac))
            );
            ctx.strokeStyle = hsla(goldHue + 12, 75, 78, 0.4);
            ctx.lineWidth = 0.75;
            ctx.stroke();
          }
          ctx.fillStyle = hsla(goldHue + 20, 100, 88, 0.95);
          ctx.beginPath();
          ctx.arc(lx, ly, 1.8, 0, Math.PI * 2);
          ctx.fill();
        }
        const tip = vinePoints[vinePoints.length - 1];
        ctx.beginPath();
        const budSteps = budCoils * 18;
        for (let b = 0; b <= budSteps; b++) {
          const bt = b / budSteps;
          const theta = -bt * Math.PI * 2 * (budCoils * 0.85);
          const br = maxR * 0.16 * Math.pow(1 - bt, 1.4);
          const bx = tip.x + Math.cos(theta) * br;
          const by = tip.y + Math.sin(theta) * br;
          if (b === 0) ctx.moveTo(bx, by);
          else ctx.lineTo(bx, by);
        }
        ctx.strokeStyle = hsla(goldHue + 10, 95, 82, 0.9);
        ctx.lineWidth = 1.4;
        ctx.stroke();
        ctx.fillStyle = hsla(goldHue + 15, 100, 92, 0.95);
        ctx.beginPath();
        ctx.arc(tip.x, tip.y, 3.2, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = hsla(goldHue + 15, 100, 95, 0.35);
        ctx.beginPath();
        ctx.arc(tip.x, tip.y, 7, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
      ctx.restore();
    }
  };
}

// Default parameters from content metadata
const defaultParams = [
  {
    "key": "leafTendrils",
    "label": "Tendril Arms",
    "type": "range",
    "min": 3,
    "max": 10,
    "step": 1,
    "defaultValue": 6,
    "description": "Number of radial vine stems"
  },
  {
    "key": "spiralBuds",
    "label": "Bud Coil Revolutions",
    "type": "range",
    "min": 2,
    "max": 6,
    "step": 1,
    "defaultValue": 4,
    "description": "Fibonacci spiral revolutions per terminus"
  },
  {
    "key": "growthSpeed",
    "label": "Growth Rate",
    "type": "range",
    "min": 0.2,
    "max": 1.8,
    "step": 0.1,
    "defaultValue": 0.5,
    "description": "Organic breathing and swaying rate"
  },
  {
    "key": "wireGlow",
    "label": "Gold Wire Sheen",
    "type": "range",
    "min": 0.4,
    "max": 1.4,
    "step": 0.1,
    "defaultValue": 0.9,
    "description": "Luster intensity of gold filaments"
  }
];

if (!window.__art_instances) window.__art_instances = {};
if (!window.__art_instances['botanical-filigrane']) {
  const inst = typeof createBotanicalFiligrane === 'function' ? createBotanicalFiligrane() : null;
  if (inst && inst.setup) {
    inst.setup({ ctx, width, height, dpr: 1, aspectRatio: width / height }, defaultParams);
  }
  window.__art_instances['botanical-filigrane'] = inst;
}

const instance = window.__art_instances['botanical-filigrane'];
if (instance && instance.render) {
  instance.render(
    { ctx, width, height, dpr: 1, aspectRatio: width / height },
    { time, deltaTime: dt, frameCount: Math.floor(time * 60), fps: 60 },
    defaultParams
  );
}`,

  // 066. Maurer Rhodonea Rose
  'rhodonea-rose': `// 066 - Maurer Rhodonea Rose (botany)
// 1:1 Original algorithm engine source
function createRhodoneaRose() {
  return {
    setup() {
    },
    render(context, timeState, params) {
      const { ctx, width, height } = context;
      const petals = Math.max(3, Math.min(16, Math.round(Number(params.petals ?? 6))));
      const maurerD = Number(params.maurerStep ?? 71);
      const speed = Number(params.bloomSpeed ?? 0.5);
      const layers = Math.max(2, Math.min(6, Math.round(Number(params.petalLayers ?? 4))));
      const t = timeState.time * speed;
      ctx.fillStyle = "#060305";
      ctx.fillRect(0, 0, width, height);
      const cx = width * 0.5;
      const cy = height * 0.5;
      const maxR = Math.min(width, height) * 0.43;
      ctx.save();
      ctx.translate(cx, cy);
      const baseHue = 345;
      for (let layer = 1; layer <= layers; layer++) {
        const lFrac = layer / layers;
        const layerR = maxR * (0.25 + 0.75 * lFrac) * (1 + 0.05 * Math.sin(t * 0.6 + layer));
        const k = petals;
        const stepAngle = maurerD;
        const layerRotation = t * 0.08 * (layer % 2 === 0 ? 1 : -0.7) + layer * Math.PI / layers;
        ctx.save();
        ctx.rotate(layerRotation);
        ctx.beginPath();
        const chordSteps = 360;
        for (let i = 0; i <= chordSteps; i++) {
          const theta = i * stepAngle * Math.PI / 180;
          const r = layerR * Math.sin(k * theta);
          const px = Math.cos(theta) * r;
          const py = Math.sin(theta) * r;
          if (i === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        ctx.strokeStyle = hsla(baseHue + layer * 12 + Math.sin(t * 0.8) * 6, 85, 75, 0.2 + lFrac * 0.22);
        ctx.lineWidth = 0.85;
        ctx.stroke();
        ctx.beginPath();
        const smoothSteps = 360;
        for (let j = 0; j <= smoothSteps; j++) {
          const phi = j / smoothSteps * Math.PI * 2;
          const rSmooth = layerR * Math.sin(k * phi);
          const sx = Math.cos(phi) * rSmooth;
          const sy = Math.sin(phi) * rSmooth;
          if (j === 0) ctx.moveTo(sx, sy);
          else ctx.lineTo(sx, sy);
        }
        ctx.closePath();
        ctx.strokeStyle = hsla(baseHue - 8 + layer * 8, 92, 68, 0.7);
        ctx.lineWidth = 1.5;
        ctx.stroke();
        ctx.restore();
      }
      const coreR = maxR * 0.12;
      const stamenCount = petals * 4;
      for (let s = 0; s < stamenCount; s++) {
        const sAngle = s / stamenCount * Math.PI * 2 + t * 0.2;
        const stamenLen = coreR * (1.2 + 0.4 * Math.sin(s * 3 + t * 3));
        const sx = Math.cos(sAngle) * stamenLen;
        const sy = Math.sin(sAngle) * stamenLen;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.quadraticCurveTo(
          Math.cos(sAngle + 0.2) * (stamenLen * 0.6),
          Math.sin(sAngle + 0.2) * (stamenLen * 0.6),
          sx,
          sy
        );
        ctx.strokeStyle = hsla(45, 95, 72, 0.6);
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.fillStyle = hsla(48, 100, 85, 0.95);
        ctx.beginPath();
        ctx.arc(sx, sy, 1.8, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.fillStyle = hsla(baseHue, 100, 85, 0.9);
      ctx.beginPath();
      ctx.arc(0, 0, 3.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = hsla(baseHue, 100, 92, 0.4);
      ctx.beginPath();
      ctx.arc(0, 0, 8, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  };
}

// Default parameters from content metadata
const defaultParams = [
  {
    "key": "petals",
    "label": "Petal Count (k)",
    "type": "range",
    "min": 3,
    "max": 12,
    "step": 1,
    "defaultValue": 6,
    "description": "Grandi rose harmonic frequency"
  },
  {
    "key": "maurerStep",
    "label": "Maurer Angular Step (d)",
    "type": "range",
    "min": 29,
    "max": 97,
    "step": 2,
    "defaultValue": 71,
    "description": "Chord progression angle in degrees"
  },
  {
    "key": "petalLayers",
    "label": "Concentric Whorls",
    "type": "range",
    "min": 2,
    "max": 6,
    "step": 1,
    "defaultValue": 4,
    "description": "Number of nested crystalline petal layers"
  },
  {
    "key": "bloomSpeed",
    "label": "Bloom Speed",
    "type": "range",
    "min": 0.2,
    "max": 1.8,
    "step": 0.1,
    "defaultValue": 0.5,
    "description": "Harmonic unfolding and rotation cadence"
  }
];

if (!window.__art_instances) window.__art_instances = {};
if (!window.__art_instances['rhodonea-rose']) {
  const inst = typeof createRhodoneaRose === 'function' ? createRhodoneaRose() : null;
  if (inst && inst.setup) {
    inst.setup({ ctx, width, height, dpr: 1, aspectRatio: width / height }, defaultParams);
  }
  window.__art_instances['rhodonea-rose'] = inst;
}

const instance = window.__art_instances['rhodonea-rose'];
if (instance && instance.render) {
  instance.render(
    { ctx, width, height, dpr: 1, aspectRatio: width / height },
    { time, deltaTime: dt, frameCount: Math.floor(time * 60), fps: 60 },
    defaultParams
  );
}`,

  // 067. Sacred Water Lotus Bloom
  'sacred-lotus': `// 067 - Sacred Water Lotus Bloom (botany)
// 1:1 Original algorithm engine source
function createSacredLotus() {
  return {
    setup() {
    },
    render(context, timeState, params) {
      const { ctx, width, height } = context;
      const petals = Math.max(6, Math.min(20, Math.round(Number(params.petalsPerWhorl ?? 12))));
      const whorls = Math.max(2, Math.min(6, Math.round(Number(params.whorlLayers ?? 4))));
      const bloomDepth = Number(params.bloomOpenness ?? 1);
      const speed = Number(params.breathSpeed ?? 0.4);
      const t = timeState.time * speed;
      ctx.fillStyle = "#03060a";
      ctx.fillRect(0, 0, width, height);
      const cx = width * 0.5;
      const cy = height * 0.5;
      const maxR = Math.min(width, height) * 0.44;
      ctx.save();
      ctx.translate(cx, cy);
      for (let r = 1; r <= 3; r++) {
        const rippleR = maxR * (0.85 + 0.15 * r) * (1 + 0.05 * Math.sin(t * 1.5 + r));
        ctx.beginPath();
        ctx.ellipse(0, 0, rippleR, rippleR * 0.92, t * 0.05, 0, Math.PI * 2);
        ctx.strokeStyle = hsla(185, 80, 60, 0.12 - r * 0.02);
        ctx.lineWidth = 1.2;
        ctx.stroke();
      }
      for (let w = whorls; w >= 1; w--) {
        const wFrac = w / whorls;
        const petalLen = maxR * (0.35 + 0.65 * wFrac) * bloomDepth;
        const petalWidth = petalLen * (0.42 - wFrac * 0.1);
        const whorlOffset = w * Math.PI / petals + Math.sin(t * 0.8 + w) * 0.06;
        const baseHue = 330 - (whorls - w) * 14;
        for (let p = 0; p < petals; p++) {
          const angle = p / petals * Math.PI * 2 + whorlOffset;
          ctx.save();
          ctx.rotate(angle);
          ctx.beginPath();
          ctx.moveTo(0, 0);
          const c1x = -petalWidth * (0.8 + 0.1 * Math.sin(t * 2 + p));
          const c1y = petalLen * 0.45;
          const tipX = 0;
          const tipY = petalLen;
          const c2x = petalWidth * (0.8 + 0.1 * Math.sin(t * 2 + p));
          const c2y = petalLen * 0.45;
          ctx.bezierCurveTo(c1x, c1y, -petalWidth * 0.3, petalLen * 0.85, tipX, tipY);
          ctx.bezierCurveTo(petalWidth * 0.3, petalLen * 0.85, c2x, c2y, 0, 0);
          ctx.fillStyle = hsla(baseHue + p % 2 * 8, 85, 65 + (whorls - w) * 6, 0.22);
          ctx.fill();
          ctx.strokeStyle = hsla(baseHue + 15, 90, 80, 0.65);
          ctx.lineWidth = 1.2;
          ctx.stroke();
          ctx.beginPath();
          ctx.moveTo(0, 0);
          ctx.lineTo(0, petalLen * 0.9);
          ctx.strokeStyle = hsla(baseHue + 25, 95, 88, 0.4);
          ctx.lineWidth = 0.8;
          ctx.stroke();
          ctx.restore();
        }
      }
      const podR = maxR * 0.15;
      const stamens = petals * 3;
      for (let s = 0; s < stamens; s++) {
        const sAng = s / stamens * Math.PI * 2 + t * 0.15;
        const sLen = podR * (1.1 + 0.3 * Math.sin(s * 4 + t * 3));
        const px = Math.cos(sAng) * sLen;
        const py = Math.sin(sAng) * sLen;
        ctx.beginPath();
        ctx.moveTo(Math.cos(sAng) * (podR * 0.7), Math.sin(sAng) * (podR * 0.7));
        ctx.lineTo(px, py);
        ctx.strokeStyle = hsla(45, 95, 75, 0.7);
        ctx.lineWidth = 1.2;
        ctx.stroke();
        ctx.fillStyle = hsla(50, 100, 85, 0.95);
        ctx.beginPath();
        ctx.arc(px, py, 1.6, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.beginPath();
      ctx.arc(0, 0, podR * 0.75, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(234, 179, 8, 0.35)";
      ctx.fill();
      ctx.strokeStyle = hsla(48, 95, 80, 0.9);
      ctx.lineWidth = 1.6;
      ctx.stroke();
      const seedRings = 2;
      for (let sr = 1; sr <= seedRings; sr++) {
        const seeds = sr * 6;
        const sRadius = sr / (seedRings + 1) * (podR * 0.65);
        for (let i = 0; i < seeds; i++) {
          const sa = i / seeds * Math.PI * 2 + t * 0.05;
          const sx = Math.cos(sa) * sRadius;
          const sy = Math.sin(sa) * sRadius;
          ctx.fillStyle = hsla(42, 90, 45, 0.9);
          ctx.beginPath();
          ctx.arc(sx, sy, 2, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      ctx.restore();
    }
  };
}

// Default parameters from content metadata
const defaultParams = [
  {
    "key": "petalsPerWhorl",
    "label": "Petals Per Whorl",
    "type": "range",
    "min": 6,
    "max": 18,
    "step": 2,
    "defaultValue": 12,
    "description": "Number of petals in each concentric layer"
  },
  {
    "key": "whorlLayers",
    "label": "Layer Count",
    "type": "range",
    "min": 2,
    "max": 5,
    "step": 1,
    "defaultValue": 4,
    "description": "Number of overlapping petal whorls"
  },
  {
    "key": "bloomOpenness",
    "label": "Bloom Flare",
    "type": "range",
    "min": 0.6,
    "max": 1.4,
    "step": 0.1,
    "defaultValue": 1,
    "description": "Radial flare opening factor"
  },
  {
    "key": "breathSpeed",
    "label": "Breathing Rate",
    "type": "range",
    "min": 0.2,
    "max": 1.5,
    "step": 0.1,
    "defaultValue": 0.4,
    "description": "Organic expansion and ripple pulsation rate"
  }
];

if (!window.__art_instances) window.__art_instances = {};
if (!window.__art_instances['sacred-lotus']) {
  const inst = typeof createSacredLotus === 'function' ? createSacredLotus() : null;
  if (inst && inst.setup) {
    inst.setup({ ctx, width, height, dpr: 1, aspectRatio: width / height }, defaultParams);
  }
  window.__art_instances['sacred-lotus'] = inst;
}

const instance = window.__art_instances['sacred-lotus'];
if (instance && instance.render) {
  instance.render(
    { ctx, width, height, dpr: 1, aspectRatio: width / height },
    { time, deltaTime: dt, frameCount: Math.floor(time * 60), fps: 60 },
    defaultParams
  );
}`,

  // 068. Chrysanthemum Polar Blossom
  'chrysanthemum-bloom': `// 068 - Chrysanthemum Polar Blossom (botany)
// 1:1 Original algorithm engine source
function createChrysanthemumBloom() {
  return {
    setup() {
    },
    render(context, timeState, params) {
      const { ctx, width, height } = context;
      const speed = Number(params.bloomRate ?? 0.5);
      const petalDensity = Number(params.petalDensity ?? 11);
      const curlIntensity = Number(params.curlIntensity ?? 4);
      const layers = Math.max(2, Math.min(5, Math.round(Number(params.spiralLayers ?? 3))));
      const t = timeState.time * speed;
      ctx.fillStyle = "#060504";
      ctx.fillRect(0, 0, width, height);
      const cx = width * 0.5;
      const cy = height * 0.5;
      const maxR = Math.min(width, height) * 0.42;
      ctx.save();
      ctx.translate(cx, cy);
      const baseHue = 38;
      const totalSteps = 1200;
      const totalTurns = 16 * Math.PI;
      for (let layer = 1; layer <= layers; layer++) {
        const lFrac = layer / layers;
        const scale = maxR / 11 * (0.4 + 0.6 * lFrac);
        const pMod = petalDensity + Math.sin(t * 0.5 + layer) * 0.4;
        const layerPhase = t * (layer % 2 === 0 ? 0.35 : -0.28) + layer * Math.PI / layers;
        ctx.beginPath();
        for (let i = 0; i <= totalSteps; i++) {
          const u = i / totalSteps;
          const theta = u * totalTurns;
          const p1 = 5 * (1 + Math.sin(pMod * theta / 5 + layerPhase));
          const p2 = curlIntensity * Math.pow(Math.sin(17 * theta / 3 - t * 0.8), 4);
          const p3 = Math.pow(Math.sin(9 * theta - Math.PI * 0.5 + layerPhase * 0.5), 8);
          const r = Math.max(0.1, p1 - p2 * p3) * scale;
          const px = Math.cos(theta) * r;
          const py = Math.sin(theta) * r;
          if (i === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        const layerHue = (baseHue + (layer - 1) * 14 + Math.sin(t * 2) * 6) % 360;
        ctx.strokeStyle = hsla(layerHue, 92, 68 + layer * 4, 0.45 + lFrac * 0.35);
        ctx.lineWidth = 1.2;
        ctx.stroke();
      }
      const coreR = maxR * 0.12;
      const diskFlorets = 60;
      for (let f = 0; f < diskFlorets; f++) {
        const theta = f * 137.508 * (Math.PI / 180) + t * 0.1;
        const fr = coreR * Math.sqrt(f / diskFlorets);
        const fx = Math.cos(theta) * fr;
        const fy = Math.sin(theta) * fr;
        ctx.fillStyle = hsla(baseHue - 15 + f % 10 * 2, 95, 78, 0.85);
        ctx.beginPath();
        ctx.arc(fx, fy, 1.8, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.fillStyle = hsla(baseHue + 15, 100, 90, 0.95);
      ctx.beginPath();
      ctx.arc(0, 0, 3.2, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  };
}

// Default parameters from content metadata
const defaultParams = [
  {
    "key": "petalDensity",
    "label": "Harmonic Petal Pitch",
    "type": "range",
    "min": 7,
    "max": 19,
    "step": 2,
    "defaultValue": 11,
    "description": "Harmonic frequency of primary petal oscillations"
  },
  {
    "key": "curlIntensity",
    "label": "Petal Curl Depth",
    "type": "range",
    "min": 2,
    "max": 6,
    "step": 0.5,
    "defaultValue": 4,
    "description": "High-order sine power curl amplitude"
  },
  {
    "key": "spiralLayers",
    "label": "Nested Layers",
    "type": "range",
    "min": 2,
    "max": 5,
    "step": 1,
    "defaultValue": 3,
    "description": "Number of concentric foliation passes"
  },
  {
    "key": "bloomRate",
    "label": "Unfurling Speed",
    "type": "range",
    "min": 0.2,
    "max": 1.5,
    "step": 0.1,
    "defaultValue": 0.5,
    "description": "Angular rotation and dynamic curl rate"
  }
];

if (!window.__art_instances) window.__art_instances = {};
if (!window.__art_instances['chrysanthemum-bloom']) {
  const inst = typeof createChrysanthemumBloom === 'function' ? createChrysanthemumBloom() : null;
  if (inst && inst.setup) {
    inst.setup({ ctx, width, height, dpr: 1, aspectRatio: width / height }, defaultParams);
  }
  window.__art_instances['chrysanthemum-bloom'] = inst;
}

const instance = window.__art_instances['chrysanthemum-bloom'];
if (instance && instance.render) {
  instance.render(
    { ctx, width, height, dpr: 1, aspectRatio: width / height },
    { time, deltaTime: dt, frameCount: Math.floor(time * 60), fps: 60 },
    defaultParams
  );
}`,

  // 069. Bioluminescent Orchid Epiphyte
  'bioluminescent-orchid': `// 069 - Bioluminescent Orchid Epiphyte (botany)
// 1:1 Original algorithm engine source
function createBioluminescentOrchid() {
  return {
    setup() {
    },
    render(context, timeState, params) {
      const { ctx, width, height } = context;
      const glow = Number(params.luminescence ?? 1);
      const pulseSpeed = Number(params.pulseSpeed ?? 0.5);
      const veinDensity = Math.max(3, Math.min(8, Math.round(Number(params.veinDensity ?? 5))));
      const t = timeState.time * pulseSpeed;
      ctx.fillStyle = "#040308";
      ctx.fillRect(0, 0, width, height);
      const cx = width * 0.5;
      const cy = height * 0.52;
      const maxR = Math.min(width, height) * 0.42;
      ctx.save();
      ctx.translate(cx, cy);
      const cyanHue = 185;
      const violetHue = 285;
      const pulse = 1 + 0.08 * Math.sin(t * 2);
      for (let s = 0; s < 25; s++) {
        const sSeed = s * 99.7;
        const sa = Math.sin(sSeed + t * 0.3) * Math.PI * 2;
        const sr = maxR * 0.2 + s * 37 % Math.floor(maxR * 0.85);
        const px = Math.cos(sa) * sr;
        const py = Math.sin(sa) * sr - Math.sin(t + s) * 15;
        const sAlpha = 0.2 + 0.4 * Math.sin(t * 1.5 + s);
        ctx.fillStyle = hsla(cyanHue + s % 3 * 30, 95, 75, sAlpha * glow);
        ctx.beginPath();
        ctx.arc(px, py, 1.2 + s % 3 * 0.6, 0, Math.PI * 2);
        ctx.fill();
      }
      function drawPetal(ctrl1X, ctrl1Y, tipX, tipY, ctrl2X, ctrl2Y, hue, alpha) {
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.bezierCurveTo(ctrl1X, ctrl1Y, tipX * 0.7, tipY * 0.9, tipX, tipY);
        ctx.bezierCurveTo(tipX * 0.3, tipY * 0.9, ctrl2X, ctrl2Y, 0, 0);
        ctx.fillStyle = hsla(hue, 90, 60, alpha * 0.35 * glow);
        ctx.fill();
        ctx.strokeStyle = hsla(hue + 15, 95, 78, alpha * glow);
        ctx.lineWidth = 1.3;
        ctx.stroke();
        for (let v = 1; v <= veinDensity; v++) {
          const vFrac = v / (veinDensity + 1);
          ctx.beginPath();
          ctx.moveTo(0, 0);
          const vx = tipX * vFrac + (ctrl1X + ctrl2X) * 0.25 * (1 - vFrac);
          const vy = tipY * vFrac;
          ctx.quadraticCurveTo(vx * 0.7, vy * 0.7, vx, vy);
          ctx.strokeStyle = hsla(cyanHue, 100, 85, 0.25 * glow);
          ctx.lineWidth = 0.75;
          ctx.stroke();
        }
      }
      const dLen = maxR * 0.75 * pulse;
      const dWidth = dLen * 0.38;
      drawPetal(-dWidth, -dLen * 0.45, 0, -dLen, dWidth, -dLen * 0.45, violetHue, 0.85);
      const latSepLen = maxR * 0.78 * pulse;
      const latSepWidth = latSepLen * 0.35;
      ctx.save();
      ctx.rotate(Math.PI * 0.38 + Math.sin(t) * 0.03);
      drawPetal(-latSepWidth, latSepLen * 0.45, 0, latSepLen, latSepWidth, latSepLen * 0.45, violetHue + 15, 0.8);
      ctx.restore();
      ctx.save();
      ctx.rotate(-Math.PI * 0.38 - Math.sin(t) * 0.03);
      drawPetal(-latSepWidth, latSepLen * 0.45, 0, latSepLen, latSepWidth, latSepLen * 0.45, violetHue + 15, 0.8);
      ctx.restore();
      const wingLen = maxR * 0.88 * pulse;
      const wingWidth = wingLen * 0.45;
      ctx.save();
      ctx.rotate(Math.PI * 0.58 + Math.sin(t * 1.2) * 0.04);
      drawPetal(-wingWidth * 0.7, -wingLen * 0.3, 0, -wingLen, wingWidth * 0.7, -wingLen * 0.3, violetHue - 15, 0.9);
      ctx.restore();
      ctx.save();
      ctx.rotate(-Math.PI * 0.58 - Math.sin(t * 1.2) * 0.04);
      drawPetal(-wingWidth * 0.7, -wingLen * 0.3, 0, -wingLen, wingWidth * 0.7, -wingLen * 0.3, violetHue - 15, 0.9);
      ctx.restore();
      const lipLen = maxR * 0.55 * pulse;
      const lipWidth = lipLen * 0.65;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.bezierCurveTo(-lipWidth * 0.8, lipLen * 0.3, -lipWidth, lipLen * 0.8, 0, lipLen);
      ctx.bezierCurveTo(lipWidth, lipLen * 0.8, lipWidth * 0.8, lipLen * 0.3, 0, 0);
      ctx.fillStyle = hsla(cyanHue, 95, 55, 0.45 * glow);
      ctx.fill();
      ctx.strokeStyle = hsla(cyanHue + 15, 100, 85, 0.95 * glow);
      ctx.lineWidth = 1.6;
      ctx.stroke();
      for (let r = 1; r <= 3; r++) {
        ctx.beginPath();
        ctx.ellipse(0, lipLen * 0.45, lipWidth * (0.2 * r), lipLen * (0.15 * r), 0, 0, Math.PI * 2);
        ctx.strokeStyle = hsla(50, 100, 80, 0.5 * glow);
        ctx.lineWidth = 1;
        ctx.stroke();
      }
      ctx.fillStyle = hsla(55, 100, 90, 0.95);
      ctx.beginPath();
      ctx.arc(0, 0, 3.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = hsla(cyanHue, 100, 90, 0.4 * glow);
      ctx.beginPath();
      ctx.arc(0, 0, 9, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  };
}

// Default parameters from content metadata
const defaultParams = [
  {
    "key": "luminescence",
    "label": "Glow Intensity",
    "type": "range",
    "min": 0.4,
    "max": 1.6,
    "step": 0.1,
    "defaultValue": 1,
    "description": "Bioluminescent emission strength"
  },
  {
    "key": "veinDensity",
    "label": "Vein Strands",
    "type": "range",
    "min": 3,
    "max": 8,
    "step": 1,
    "defaultValue": 5,
    "description": "Number of radiant petal vein filaments"
  },
  {
    "key": "pulseSpeed",
    "label": "Pulse Cadence",
    "type": "range",
    "min": 0.2,
    "max": 1.5,
    "step": 0.1,
    "defaultValue": 0.5,
    "description": "Luminous breathing rate"
  }
];

if (!window.__art_instances) window.__art_instances = {};
if (!window.__art_instances['bioluminescent-orchid']) {
  const inst = typeof createBioluminescentOrchid === 'function' ? createBioluminescentOrchid() : null;
  if (inst && inst.setup) {
    inst.setup({ ctx, width, height, dpr: 1, aspectRatio: width / height }, defaultParams);
  }
  window.__art_instances['bioluminescent-orchid'] = inst;
}

const instance = window.__art_instances['bioluminescent-orchid'];
if (instance && instance.render) {
  instance.render(
    { ctx, width, height, dpr: 1, aspectRatio: width / height },
    { time, deltaTime: dt, frameCount: Math.floor(time * 60), fps: 60 },
    defaultParams
  );
}`,

  // 070. Fibonacci Sunflower Florets
  'fibonacci-sunflower': `// 070 - Fibonacci Sunflower Florets (botany)
// 1:1 Original algorithm engine source
function createFibonacciSunflower() {
  return {
    setup() {
    },
    render(context, timeState, params) {
      const { ctx, width, height } = context;
      const florets = Math.max(150, Math.min(900, Math.round(Number(params.floretCount ?? 450))));
      const divAngleDeg = Number(params.goldenAngleOffset ?? 137.507764);
      const rayCount = Math.max(13, Math.min(55, Math.round(Number(params.rayPetals ?? 21))));
      const speed = Number(params.swaySpeed ?? 0.5);
      const t = timeState.time * speed;
      ctx.fillStyle = "#060503";
      ctx.fillRect(0, 0, width, height);
      const cx = width * 0.5;
      const cy = height * 0.5;
      const maxR = Math.min(width, height) * 0.44;
      ctx.save();
      ctx.translate(cx, cy);
      const diskR = maxR * 0.55;
      const divAngleRad = divAngleDeg * Math.PI / 180;
      for (let layer = 0; layer < 2; layer++) {
        const layerRayCount = layer === 0 ? rayCount : Math.round(rayCount * 1.2);
        const lOffset = layer === 0 ? 0 : Math.PI / layerRayCount;
        const petalLen = maxR * (0.85 + 0.15 * layer) * (1 + 0.03 * Math.sin(t * 1.5 + layer));
        const petalW = (petalLen - diskR) * 0.42;
        for (let p = 0; p < layerRayCount; p++) {
          const baseAngle = p / layerRayCount * Math.PI * 2 + lOffset;
          const sway = Math.sin(t * 1.8 + p * 0.4) * 0.04;
          ctx.save();
          ctx.rotate(baseAngle + sway);
          ctx.beginPath();
          ctx.moveTo(0, diskR * 0.85);
          const ctrl1X = -petalW * (0.8 + 0.1 * Math.sin(t + p));
          const ctrl1Y = diskR + (petalLen - diskR) * 0.45;
          const tipX = 0;
          const tipY = petalLen;
          const ctrl2X = petalW * (0.8 + 0.1 * Math.sin(t + p));
          const ctrl2Y = diskR + (petalLen - diskR) * 0.45;
          ctx.bezierCurveTo(ctrl1X, ctrl1Y, -petalW * 0.25, petalLen * 0.9, tipX, tipY);
          ctx.bezierCurveTo(petalW * 0.25, petalLen * 0.9, ctrl2X, ctrl2Y, 0, diskR * 0.85);
          const petalHue = layer === 0 ? 44 + p % 3 * 3 : 40 + p % 3 * 2;
          ctx.fillStyle = hsla(petalHue, 95, layer === 0 ? 64 : 56, 0.85);
          ctx.fill();
          ctx.strokeStyle = hsla(petalHue + 8, 95, 78, 0.9);
          ctx.lineWidth = 1.2;
          ctx.stroke();
          ctx.beginPath();
          ctx.moveTo(0, diskR * 0.9);
          ctx.lineTo(0, petalLen * 0.88);
          ctx.strokeStyle = hsla(36, 90, 52, 0.45);
          ctx.lineWidth = 0.8;
          ctx.stroke();
          ctx.restore();
        }
      }
      const c = diskR / Math.sqrt(florets);
      for (let n = 1; n <= florets; n++) {
        const theta = n * divAngleRad + t * 0.03;
        const r = c * Math.sqrt(n);
        const px = Math.cos(theta) * r;
        const py = Math.sin(theta) * r;
        const nNorm = n / florets;
        const seedHue = 26 + nNorm * 22;
        const seedLight = 24 + nNorm * 48 + Math.sin(t * 2 + n * 0.1) * 4;
        const seedRadius = Math.max(1.4, 1.2 + nNorm * 2.2);
        ctx.fillStyle = hsla(seedHue, 90, seedLight, 0.95);
        ctx.beginPath();
        ctx.arc(px, py, seedRadius, 0, Math.PI * 2);
        ctx.fill();
        if (nNorm > 0.6) {
          ctx.strokeStyle = hsla(45, 95, 82, 0.5);
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
      for (let s = 0; s < 20; s++) {
        const seed = s * 73.1;
        const sa = (seed + t * 0.2) % (Math.PI * 2);
        const sr = maxR * (0.4 + 0.55 * Math.sin(seed * 2 + t * 0.4));
        const px = Math.cos(sa) * sr;
        const py = Math.sin(sa) * sr - Math.sin(t + s) * 12;
        const sAlpha = 0.3 + 0.4 * Math.sin(t * 2 + s);
        ctx.fillStyle = hsla(48, 100, 80, sAlpha);
        ctx.beginPath();
        ctx.arc(px, py, 1.4, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    }
  };
}

// Default parameters from content metadata
const defaultParams = [
  {
    "key": "floretCount",
    "label": "Floret Seed Count",
    "type": "range",
    "min": 150,
    "max": 800,
    "step": 25,
    "defaultValue": 450,
    "description": "Total number of Fermat spiral seed florets"
  },
  {
    "key": "goldenAngleOffset",
    "label": "Divergence Angle (°)",
    "type": "range",
    "min": 137,
    "max": 138,
    "step": 0.02,
    "defaultValue": 137.508,
    "description": "Phyllotaxis angular divergence (137.508° is optimal)"
  },
  {
    "key": "rayPetals",
    "label": "Ray Petal Count",
    "type": "range",
    "min": 13,
    "max": 55,
    "step": 1,
    "defaultValue": 21,
    "description": "Fibonacci number of outer golden ray petals"
  },
  {
    "key": "swaySpeed",
    "label": "Sunburst Sway Speed",
    "type": "range",
    "min": 0.2,
    "max": 1.8,
    "step": 0.1,
    "defaultValue": 0.5,
    "description": "Gentle meadow breeze swaying cadence"
  }
];

if (!window.__art_instances) window.__art_instances = {};
if (!window.__art_instances['fibonacci-sunflower']) {
  const inst = typeof createFibonacciSunflower === 'function' ? createFibonacciSunflower() : null;
  if (inst && inst.setup) {
    inst.setup({ ctx, width, height, dpr: 1, aspectRatio: width / height }, defaultParams);
  }
  window.__art_instances['fibonacci-sunflower'] = inst;
}

const instance = window.__art_instances['fibonacci-sunflower'];
if (instance && instance.render) {
  instance.render(
    { ctx, width, height, dpr: 1, aspectRatio: width / height },
    { time, deltaTime: dt, frameCount: Math.floor(time * 60), fps: 60 },
    defaultParams
  );
}`,

  // 071. Temple Fay Mathematical Butterfly
  'mathematical-butterfly': `// 071 - Temple Fay Mathematical Butterfly (insects)
// 1:1 Original algorithm engine source
function createMathematicalButterfly() {
  return {
    setup() {
    },
    render(context, timeState, params) {
      const { ctx, width, height } = context;
      const flapSpeed = Number(params.flapSpeed ?? 1.2);
      const wingIridescence = Number(params.iridescence ?? 1);
      const venationDensity = Math.max(3, Math.min(8, Math.round(Number(params.venationDensity ?? 5))));
      const t = timeState.time * flapSpeed;
      ctx.fillStyle = "#040308";
      ctx.fillRect(0, 0, width, height);
      const cx = width * 0.5;
      const cy = height * 0.5;
      const maxR = Math.min(width, height) * 0.44;
      const flapAngle = Math.sin(t * 3.5);
      const flapScaleX = 0.35 + 0.65 * Math.cos(t * 3.5);
      const hoverY = Math.sin(t * 2) * 10;
      ctx.save();
      ctx.translate(cx, cy + hoverY);
      const baseHue = 195;
      for (let s = 0; s < 25; s++) {
        const seed = s * 89.3;
        const sa = Math.sin(seed + t * 0.5) * Math.PI * 2;
        const sr = maxR * (0.3 + 0.6 * Math.sin(seed * 3 + t * 0.4));
        const px = Math.cos(sa) * (sr * flapScaleX);
        const py = Math.sin(sa) * sr + Math.sin(t * 2 + s) * 12;
        const sAlpha = 0.2 + 0.4 * Math.sin(t * 3 + s);
        ctx.fillStyle = hsla(baseHue + s % 3 * 35, 95, 75, sAlpha * wingIridescence);
        ctx.beginPath();
        ctx.arc(px, py, 1.2 + s % 3 * 0.6, 0, Math.PI * 2);
        ctx.fill();
      }
      for (const side of [-1, 1]) {
        ctx.save();
        ctx.scale(side * flapScaleX, 1);
        ctx.beginPath();
        const fPoints = [];
        const fSteps = 70;
        for (let i = 0; i <= fSteps; i++) {
          const u = i / fSteps;
          const theta = u * Math.PI * 0.75 - Math.PI * 0.15;
          const r = maxR * (0.3 + 0.68 * Math.pow(Math.sin(u * Math.PI), 0.7));
          const fx = Math.sin(theta) * r * 1.2;
          const fy = -Math.cos(theta) * r * 0.95;
          fPoints.push({ x: fx, y: fy });
          if (i === 0) ctx.moveTo(fx, fy);
          else ctx.lineTo(fx, fy);
        }
        ctx.closePath();
        const fHue = baseHue + flapAngle * 15;
        ctx.fillStyle = hsla(fHue, 90, 52, 0.45 * wingIridescence);
        ctx.fill();
        ctx.strokeStyle = hsla(fHue + 25, 95, 80, 0.85);
        ctx.lineWidth = 1.4;
        ctx.stroke();
        for (let v = 1; v <= venationDensity; v++) {
          const vFrac = v / (venationDensity + 1);
          const targetPt = fPoints[Math.floor(vFrac * fSteps)];
          ctx.beginPath();
          ctx.moveTo(0, -maxR * 0.08);
          ctx.quadraticCurveTo(targetPt.x * 0.4, targetPt.y * 0.6, targetPt.x, targetPt.y);
          ctx.strokeStyle = hsla(fHue + 35, 90, 85, 0.35);
          ctx.lineWidth = 0.8;
          ctx.stroke();
          ctx.beginPath();
          ctx.moveTo(targetPt.x * 0.5, targetPt.y * 0.5);
          ctx.lineTo(targetPt.x * 0.85, targetPt.y * 0.75);
          ctx.strokeStyle = hsla(fHue + 15, 85, 78, 0.25);
          ctx.lineWidth = 0.6;
          ctx.stroke();
        }
        const eyeX = fPoints[Math.floor(fSteps * 0.55)].x * 0.65;
        const eyeY = fPoints[Math.floor(fSteps * 0.55)].y * 0.65;
        ctx.fillStyle = hsla(fHue + 70, 95, 85, 0.9);
        ctx.beginPath();
        ctx.arc(eyeX, eyeY, 4.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = "#05040a";
        ctx.lineWidth = 1.6;
        ctx.stroke();
        ctx.beginPath();
        const hSteps = 50;
        const hPoints = [];
        for (let j = 0; j <= hSteps; j++) {
          const v = j / hSteps;
          const phi = v * Math.PI * 0.8 + Math.PI * 0.4;
          const scallop = Math.sin(v * Math.PI * 4) * (maxR * 0.04);
          const hr = maxR * (0.25 + 0.48 * Math.sin(v * Math.PI)) + scallop;
          const hx = Math.sin(phi) * hr * 0.9;
          const hy = -Math.cos(phi) * hr * 0.9;
          hPoints.push({ x: hx, y: hy });
          if (j === 0) ctx.moveTo(hx, hy);
          else ctx.lineTo(hx, hy);
        }
        ctx.closePath();
        ctx.fillStyle = hsla(fHue - 20, 90, 48, 0.4 * wingIridescence);
        ctx.fill();
        ctx.strokeStyle = hsla(fHue + 15, 95, 76, 0.8);
        ctx.lineWidth = 1.3;
        ctx.stroke();
        for (let w = 1; w <= 3; w++) {
          const target = hPoints[Math.floor(w / 4 * hSteps)];
          ctx.beginPath();
          ctx.moveTo(0, maxR * 0.05);
          ctx.quadraticCurveTo(target.x * 0.45, target.y * 0.5, target.x, target.y);
          ctx.strokeStyle = hsla(fHue + 40, 85, 82, 0.3);
          ctx.lineWidth = 0.75;
          ctx.stroke();
        }
        ctx.restore();
      }
      const segCount = 8;
      for (let s = 0; s < segCount; s++) {
        const sNorm = s / segCount;
        const sy = sNorm * maxR * 0.42 - maxR * 0.05;
        const sw = maxR * 0.045 * (1 - sNorm * 0.6);
        const sh = maxR * 0.048;
        ctx.beginPath();
        ctx.ellipse(0, sy, sw, sh * 0.5, 0, 0, Math.PI * 2);
        ctx.fillStyle = hsla(220, 80, 20 + s * 3, 0.95);
        ctx.fill();
        ctx.strokeStyle = hsla(baseHue, 90, 65, 0.7);
        ctx.lineWidth = 1;
        ctx.stroke();
      }
      ctx.beginPath();
      ctx.ellipse(0, -maxR * 0.1, maxR * 0.052, maxR * 0.06, 0, 0, Math.PI * 2);
      ctx.fillStyle = "#0f172a";
      ctx.fill();
      ctx.strokeStyle = hsla(baseHue + 20, 95, 75, 0.9);
      ctx.lineWidth = 1.4;
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(0, -maxR * 0.18, maxR * 0.038, 0, Math.PI * 2);
      ctx.fillStyle = "#020617";
      ctx.fill();
      ctx.strokeStyle = hsla(baseHue, 90, 75, 0.95);
      ctx.lineWidth = 1.2;
      ctx.stroke();
      for (const eyeSide of [-1, 1]) {
        ctx.fillStyle = hsla(baseHue + 45, 100, 85, 0.95);
        ctx.beginPath();
        ctx.arc(eyeSide * (maxR * 0.028), -maxR * 0.185, 2.2, 0, Math.PI * 2);
        ctx.fill();
      }
      for (const antSide of [-1, 1]) {
        const antSway = Math.sin(t * 3 + antSide) * 0.08;
        ctx.beginPath();
        ctx.moveTo(antSide * 2, -maxR * 0.2);
        const tipX = antSide * (maxR * 0.18) + antSway * 10;
        const tipY = -maxR * 0.38;
        ctx.quadraticCurveTo(antSide * (maxR * 0.06), -maxR * 0.32, tipX, tipY);
        ctx.strokeStyle = hsla(baseHue + 30, 95, 85, 0.85);
        ctx.lineWidth = 1.2;
        ctx.stroke();
        ctx.fillStyle = hsla(baseHue + 40, 100, 90, 0.95);
        ctx.beginPath();
        ctx.arc(tipX, tipY, 2.5, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    }
  };
}

// Default parameters from content metadata
const defaultParams = [
  {
    "key": "flapSpeed",
    "label": "Flapping Rate",
    "type": "range",
    "min": 0.4,
    "max": 2.2,
    "step": 0.1,
    "defaultValue": 1.2,
    "description": "Wing flap oscillation cadence"
  },
  {
    "key": "iridescence",
    "label": "Wing Iridescence",
    "type": "range",
    "min": 0.4,
    "max": 1.6,
    "step": 0.1,
    "defaultValue": 1,
    "description": "Structural color reflection intensity"
  },
  {
    "key": "venationDensity",
    "label": "Venation Cells",
    "type": "range",
    "min": 3,
    "max": 8,
    "step": 1,
    "defaultValue": 5,
    "description": "Fractal wing vein branching density"
  }
];

if (!window.__art_instances) window.__art_instances = {};
if (!window.__art_instances['mathematical-butterfly']) {
  const inst = typeof createMathematicalButterfly === 'function' ? createMathematicalButterfly() : null;
  if (inst && inst.setup) {
    inst.setup({ ctx, width, height, dpr: 1, aspectRatio: width / height }, defaultParams);
  }
  window.__art_instances['mathematical-butterfly'] = inst;
}

const instance = window.__art_instances['mathematical-butterfly'];
if (instance && instance.render) {
  instance.render(
    { ctx, width, height, dpr: 1, aspectRatio: width / height },
    { time, deltaTime: dt, frameCount: Math.floor(time * 60), fps: 60 },
    defaultParams
  );
}`,

  // 072. Iridescent Jewel Scarab Beetle
  'scarab-beetle': `// 072 - Iridescent Jewel Scarab Beetle (insects)
// 1:1 Original algorithm engine source
function createScarabBeetle() {
  return {
    setup() {
    },
    render(context, timeState, params) {
      const { ctx, width, height } = context;
      const crawlSpeed = Number(params.gaitSpeed ?? 0.8);
      const sheenIntensity = Number(params.iridescentLuster ?? 1);
      const elytraSpread = Number(params.elytraFlare ?? 0.25);
      const t = timeState.time * crawlSpeed;
      ctx.fillStyle = "#030504";
      ctx.fillRect(0, 0, width, height);
      const cx = width * 0.5;
      const cy = height * 0.5;
      const maxR = Math.min(width, height) * 0.42;
      const bobY = Math.sin(t * 2) * 4;
      ctx.save();
      ctx.translate(cx, cy + bobY);
      const baseHue = (145 + Math.sin(t * 0.8) * 35) % 360;
      for (const side of [-1, 1]) {
        for (let leg = 0; leg < 3; leg++) {
          const legPhase = t * 3 + leg * 1.2 + (side === 1 ? Math.PI : 0);
          const reach = Math.sin(legPhase) * 12;
          const lift = Math.cos(legPhase) * 6;
          const baseAngle = (leg - 1) * 0.45 + side * 0.35;
          const coxaX = side * (maxR * 0.15);
          const coxaY = (leg - 1) * (maxR * 0.14);
          const femurLen = maxR * (0.28 + leg * 0.04);
          const kneeAngle = (leg === 0 ? -Math.PI * 0.25 : leg === 1 ? 0 : Math.PI * 0.28) + side * 0.2;
          const kneeX = coxaX + side * Math.cos(kneeAngle) * femurLen + reach * 0.5;
          const kneeY = coxaY + Math.sin(kneeAngle) * femurLen + lift;
          const tibiaLen = maxR * 0.24;
          const ankleAngle = kneeAngle + side * 0.45;
          const footX = kneeX + side * Math.cos(ankleAngle) * tibiaLen + reach;
          const footY = kneeY + Math.sin(ankleAngle) * tibiaLen;
          ctx.beginPath();
          ctx.moveTo(coxaX, coxaY);
          ctx.lineTo(kneeX, kneeY);
          ctx.lineTo(footX, footY);
          ctx.strokeStyle = hsla(baseHue - 30, 85, 45, 0.9);
          ctx.lineWidth = 2.4 - leg * 0.2;
          ctx.stroke();
          for (let sp = 1; sp <= 3; sp++) {
            const spFrac = sp / 4;
            const sx = kneeX + (footX - kneeX) * spFrac;
            const sy = kneeY + (footY - kneeY) * spFrac;
            ctx.beginPath();
            ctx.moveTo(sx, sy);
            ctx.lineTo(sx + side * 4, sy - 3);
            ctx.strokeStyle = hsla(45, 95, 75, 0.7);
            ctx.lineWidth = 1;
            ctx.stroke();
          }
          ctx.fillStyle = hsla(45, 100, 85, 0.95);
          ctx.beginPath();
          ctx.arc(footX, footY, 2, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      if (elytraSpread > 0.05) {
        for (const wingSide of [-1, 1]) {
          const wFlare = elytraSpread * (0.8 + 0.1 * Math.sin(t * 12));
          ctx.save();
          ctx.rotate(wingSide * wFlare * 0.6);
          ctx.beginPath();
          ctx.moveTo(0, 0);
          ctx.bezierCurveTo(wingSide * (maxR * 0.45), maxR * 0.2, wingSide * (maxR * 0.55), maxR * 0.6, wingSide * (maxR * 0.2), maxR * 0.75);
          ctx.bezierCurveTo(wingSide * (maxR * 0.1), maxR * 0.5, 0, maxR * 0.3, 0, 0);
          ctx.fillStyle = hsla(200, 90, 70, 0.25 * sheenIntensity);
          ctx.fill();
          ctx.strokeStyle = hsla(190, 95, 80, 0.6);
          ctx.lineWidth = 1;
          ctx.stroke();
          ctx.restore();
        }
      }
      const elytraLen = maxR * 0.58;
      const elytraWidth = maxR * 0.28;
      for (const eSide of [-1, 1]) {
        ctx.save();
        ctx.rotate(eSide * elytraSpread * (0.4 + 0.05 * Math.sin(t * 2)));
        ctx.beginPath();
        ctx.moveTo(0, -maxR * 0.02);
        ctx.bezierCurveTo(
          eSide * elytraWidth * 1.3,
          -maxR * 0.02,
          eSide * elytraWidth * 1.3,
          elytraLen * 0.85,
          eSide * 2,
          elytraLen
        );
        ctx.lineTo(0, -maxR * 0.02);
        ctx.closePath();
        const eHue = (baseHue + eSide * 15 + Math.sin(t * 2) * 10) % 360;
        ctx.fillStyle = hsla(eHue, 88, 42, 0.9 * sheenIntensity);
        ctx.fill();
        ctx.strokeStyle = hsla(eHue + 30, 95, 78, 0.95);
        ctx.lineWidth = 1.6;
        ctx.stroke();
        for (let g = 1; g <= 4; g++) {
          const gFrac = g / 5;
          ctx.beginPath();
          ctx.moveTo(eSide * (elytraWidth * gFrac * 0.7), 0);
          ctx.quadraticCurveTo(
            eSide * (elytraWidth * gFrac * 1.2),
            elytraLen * 0.5,
            eSide * (elytraWidth * gFrac * 0.5),
            elytraLen * 0.92
          );
          ctx.strokeStyle = hsla(eHue + 50, 90, 72, 0.45);
          ctx.lineWidth = 0.9;
          ctx.stroke();
        }
        ctx.restore();
      }
      const pWidth = maxR * 0.26;
      const pHeight = maxR * 0.18;
      ctx.beginPath();
      ctx.moveTo(-pWidth * 0.7, -maxR * 0.22);
      ctx.bezierCurveTo(-pWidth, -maxR * 0.14, -pWidth, -maxR * 0.04, -pWidth * 0.85, -maxR * 0.02);
      ctx.lineTo(pWidth * 0.85, -maxR * 0.02);
      ctx.bezierCurveTo(pWidth, -maxR * 0.04, pWidth, -maxR * 0.14, pWidth * 0.7, -maxR * 0.22);
      ctx.closePath();
      ctx.fillStyle = hsla(baseHue + 20, 85, 38, 0.95);
      ctx.fill();
      ctx.strokeStyle = hsla(baseHue + 50, 95, 80, 0.9);
      ctx.lineWidth = 1.6;
      ctx.stroke();
      const hWidth = maxR * 0.16;
      ctx.beginPath();
      ctx.arc(0, -maxR * 0.26, hWidth, -Math.PI * 0.85, -Math.PI * 0.15);
      ctx.lineTo(hWidth * 0.8, -maxR * 0.22);
      ctx.lineTo(-hWidth * 0.8, -maxR * 0.22);
      ctx.closePath();
      ctx.fillStyle = "#06130b";
      ctx.fill();
      ctx.strokeStyle = hsla(baseHue + 10, 90, 70, 0.9);
      ctx.lineWidth = 1.4;
      ctx.stroke();
      for (const hSide of [-1, 1]) {
        ctx.beginPath();
        ctx.moveTo(hSide * (hWidth * 0.6), -maxR * 0.3);
        ctx.lineTo(hSide * (hWidth * 0.9), -maxR * 0.38);
        ctx.lineTo(hSide * (hWidth * 0.3), -maxR * 0.34);
        ctx.strokeStyle = hsla(45, 95, 75, 0.95);
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }
      for (const eyeSide of [-1, 1]) {
        ctx.fillStyle = hsla(baseHue + 60, 100, 85, 0.95);
        ctx.beginPath();
        ctx.arc(eyeSide * (hWidth * 0.85), -maxR * 0.26, 2.8, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    }
  };
}

// Default parameters from content metadata
const defaultParams = [
  {
    "key": "gaitSpeed",
    "label": "Gait Cycle Speed",
    "type": "range",
    "min": 0.2,
    "max": 2,
    "step": 0.1,
    "defaultValue": 0.8,
    "description": "Hexapod leg crawling oscillation cadence"
  },
  {
    "key": "iridescentLuster",
    "label": "Chitin Luster",
    "type": "range",
    "min": 0.4,
    "max": 1.6,
    "step": 0.1,
    "defaultValue": 1,
    "description": "Metallic emerald/gold thin-film interference sheen"
  },
  {
    "key": "elytraFlare",
    "label": "Elytra Shell Opening",
    "type": "range",
    "min": 0,
    "max": 0.6,
    "step": 0.05,
    "defaultValue": 0.25,
    "description": "Wing case split opening revealing flight wings"
  }
];

if (!window.__art_instances) window.__art_instances = {};
if (!window.__art_instances['scarab-beetle']) {
  const inst = typeof createScarabBeetle === 'function' ? createScarabBeetle() : null;
  if (inst && inst.setup) {
    inst.setup({ ctx, width, height, dpr: 1, aspectRatio: width / height }, defaultParams);
  }
  window.__art_instances['scarab-beetle'] = inst;
}

const instance = window.__art_instances['scarab-beetle'];
if (instance && instance.render) {
  instance.render(
    { ctx, width, height, dpr: 1, aspectRatio: width / height },
    { time, deltaTime: dt, frameCount: Math.floor(time * 60), fps: 60 },
    defaultParams
  );
}`,

  // 073. Golden Mathematical Honeybee
  'golden-honeybee': `// 073 - Golden Mathematical Honeybee (insects)
// 1:1 Original algorithm engine source
function createGoldenHoneybee() {
  return {
    setup() {
    },
    render(context, timeState, params) {
      const { ctx, width, height } = context;
      const wingFrequency = Number(params.wingBeatSpeed ?? 1.4);
      const honeycombRadius = Number(params.combRadius ?? 1);
      const pollenDensity = Math.max(10, Math.min(40, Math.round(Number(params.pollenCount ?? 20))));
      const t = timeState.time * wingFrequency;
      ctx.fillStyle = "#060402";
      ctx.fillRect(0, 0, width, height);
      const cx = width * 0.5;
      const cy = height * 0.52;
      const maxR = Math.min(width, height) * 0.42;
      ctx.save();
      ctx.translate(cx, cy);
      const goldHue = 42;
      const hexSize = maxR * 0.14 * honeycombRadius;
      const hexRings = 2;
      for (let hr = 1; hr <= hexRings; hr++) {
        const count = hr * 6;
        for (let i = 0; i < count; i++) {
          const a = i / count * Math.PI * 2 + t * 0.05;
          const hDist = maxR * (0.65 + 0.28 * (hr / hexRings));
          const hx = Math.cos(a) * hDist;
          const hy = Math.sin(a) * hDist;
          ctx.beginPath();
          for (let k = 0; k < 6; k++) {
            const ha = k / 6 * Math.PI * 2 + Math.PI / 6;
            const px = hx + Math.cos(ha) * hexSize;
            const py = hy + Math.sin(ha) * hexSize;
            if (k === 0) ctx.moveTo(px, py);
            else ctx.lineTo(px, py);
          }
          ctx.closePath();
          ctx.strokeStyle = hsla(goldHue, 90, 70, 0.25);
          ctx.lineWidth = 1;
          ctx.stroke();
          if ((i + hr) % 3 === 0) {
            ctx.fillStyle = hsla(38, 95, 60, 0.15 + 0.1 * Math.sin(t * 2 + i));
            ctx.fill();
          }
        }
      }
      const strokePhase = Math.sin(t * 18);
      const strokePitch = Math.cos(t * 18) * 0.25;
      for (const wSide of [-1, 1]) {
        ctx.save();
        const baseWingAngle = -Math.PI * 0.48 * wSide + strokePhase * 0.35 * wSide;
        ctx.rotate(baseWingAngle);
        ctx.scale(1, 0.4 + 0.6 * Math.abs(strokePhase));
        const wLen = maxR * 0.82;
        const wWidth = wLen * 0.36;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.bezierCurveTo(wSide * wWidth * 0.8, -wLen * 0.3, wSide * wWidth * 0.9, -wLen * 0.8, 0, -wLen);
        ctx.bezierCurveTo(-wSide * wWidth * 0.3, -wLen * 0.7, -wSide * wWidth * 0.2, -wLen * 0.2, 0, 0);
        ctx.fillStyle = "rgba(254, 240, 138, 0.2)";
        ctx.fill();
        ctx.strokeStyle = hsla(50, 100, 85, 0.85);
        ctx.lineWidth = 1.4;
        ctx.stroke();
        for (let wv = 1; wv <= 4; wv++) {
          const wvFrac = wv / 5;
          ctx.beginPath();
          ctx.moveTo(0, -wLen * 0.15);
          ctx.quadraticCurveTo(wSide * wWidth * 0.6 * wvFrac, -wLen * 0.5 * wvFrac, wSide * (wWidth * 0.45 * wvFrac), -wLen * wvFrac);
          ctx.strokeStyle = hsla(45, 95, 80, 0.45);
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
        const hwLen = wLen * 0.65;
        const hwWidth = wWidth * 0.75;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.bezierCurveTo(wSide * hwWidth, -hwLen * 0.2, wSide * hwWidth * 0.8, -hwLen * 0.75, 0, -hwLen);
        ctx.bezierCurveTo(0, -hwLen * 0.5, 0, -hwLen * 0.2, 0, 0);
        ctx.fillStyle = "rgba(253, 224, 71, 0.15)";
        ctx.fill();
        ctx.strokeStyle = hsla(48, 90, 80, 0.6);
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.restore();
      }
      const segments = 6;
      for (let s = 0; s < segments; s++) {
        const sFrac = s / segments;
        const sy = sFrac * maxR * 0.48 + maxR * 0.04;
        const sw = maxR * 0.18 * Math.sin((sFrac + 0.15) * Math.PI);
        const sh = maxR * 0.08;
        ctx.beginPath();
        ctx.ellipse(0, sy, sw, sh * 0.5, 0, 0, Math.PI * 2);
        const isGoldStripe = s % 2 === 0;
        if (isGoldStripe) {
          ctx.fillStyle = hsla(goldHue + 4, 95, 62, 0.95);
          ctx.fill();
          ctx.strokeStyle = hsla(goldHue + 15, 100, 80, 0.9);
        } else {
          ctx.fillStyle = "#0a0806";
          ctx.fill();
          ctx.strokeStyle = hsla(goldHue - 10, 80, 40, 0.7);
        }
        ctx.lineWidth = 1.2;
        ctx.stroke();
      }
      ctx.beginPath();
      ctx.moveTo(-3, maxR * 0.52);
      ctx.lineTo(0, maxR * 0.58);
      ctx.lineTo(3, maxR * 0.52);
      ctx.fillStyle = "#f59e0b";
      ctx.fill();
      ctx.beginPath();
      ctx.ellipse(0, -maxR * 0.06, maxR * 0.15, maxR * 0.14, 0, 0, Math.PI * 2);
      ctx.fillStyle = "#1c1308";
      ctx.fill();
      ctx.strokeStyle = hsla(goldHue, 95, 75, 0.9);
      ctx.lineWidth = 1.8;
      ctx.stroke();
      const setaeCount = 20;
      for (let f = 0; f < setaeCount; f++) {
        const fa = f / setaeCount * Math.PI * 2;
        const fx = Math.cos(fa) * (maxR * 0.15);
        const fy = -maxR * 0.06 + Math.sin(fa) * (maxR * 0.14);
        ctx.beginPath();
        ctx.moveTo(fx, fy);
        ctx.lineTo(fx * 1.12, fy * 1.12);
        ctx.strokeStyle = hsla(goldHue + 10, 100, 78, 0.6);
        ctx.lineWidth = 0.9;
        ctx.stroke();
      }
      ctx.beginPath();
      ctx.arc(0, -maxR * 0.22, maxR * 0.1, 0, Math.PI * 2);
      ctx.fillStyle = "#0f0a04";
      ctx.fill();
      ctx.strokeStyle = hsla(goldHue, 90, 70, 0.85);
      ctx.lineWidth = 1.4;
      ctx.stroke();
      for (const eSide of [-1, 1]) {
        ctx.beginPath();
        ctx.ellipse(eSide * (maxR * 0.08), -maxR * 0.23, maxR * 0.045, maxR * 0.07, eSide * 0.25, 0, Math.PI * 2);
        ctx.fillStyle = "#291807";
        ctx.fill();
        ctx.strokeStyle = hsla(goldHue + 20, 100, 85, 0.95);
        ctx.lineWidth = 1.2;
        ctx.stroke();
      }
      for (const aSide of [-1, 1]) {
        const aSway = Math.sin(t * 4 + aSide) * 0.06;
        ctx.beginPath();
        ctx.moveTo(aSide * 4, -maxR * 0.28);
        const tipX = aSide * (maxR * 0.14) + aSway * 8;
        const tipY = -maxR * 0.44;
        ctx.quadraticCurveTo(aSide * (maxR * 0.04), -maxR * 0.38, tipX, tipY);
        ctx.strokeStyle = hsla(goldHue + 15, 95, 80, 0.85);
        ctx.lineWidth = 1.3;
        ctx.stroke();
      }
      for (let p = 0; p < pollenDensity; p++) {
        const pSeed = p * 61.7;
        const pa = (pSeed + t * 0.3) % (Math.PI * 2);
        const pr = maxR * (0.35 + 0.55 * Math.sin(pSeed * 2 + t * 0.5));
        const px = Math.cos(pa) * pr;
        const py = Math.sin(pa) * pr;
        const pAlpha = 0.3 + 0.5 * Math.sin(t * 3 + p);
        ctx.fillStyle = hsla(45, 100, 82, pAlpha);
        ctx.beginPath();
        ctx.arc(px, py, 1.4, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    }
  };
}

// Default parameters from content metadata
const defaultParams = [
  {
    "key": "wingBeatSpeed",
    "label": "Wingbeat Speed",
    "type": "range",
    "min": 0.5,
    "max": 2.5,
    "step": 0.1,
    "defaultValue": 1.4,
    "description": "High-frequency stroke oscillation rate"
  },
  {
    "key": "combRadius",
    "label": "Honeycomb Scale",
    "type": "range",
    "min": 0.6,
    "max": 1.4,
    "step": 0.1,
    "defaultValue": 1,
    "description": "Scale of surrounding hexagonal honeycomb tessellation"
  },
  {
    "key": "pollenCount",
    "label": "Pollen Motes",
    "type": "range",
    "min": 10,
    "max": 40,
    "step": 5,
    "defaultValue": 20,
    "description": "Number of floating glowing pollen dust motes"
  }
];

if (!window.__art_instances) window.__art_instances = {};
if (!window.__art_instances['golden-honeybee']) {
  const inst = typeof createGoldenHoneybee === 'function' ? createGoldenHoneybee() : null;
  if (inst && inst.setup) {
    inst.setup({ ctx, width, height, dpr: 1, aspectRatio: width / height }, defaultParams);
  }
  window.__art_instances['golden-honeybee'] = inst;
}

const instance = window.__art_instances['golden-honeybee'];
if (instance && instance.render) {
  instance.render(
    { ctx, width, height, dpr: 1, aspectRatio: width / height },
    { time, deltaTime: dt, frameCount: Math.floor(time * 60), fps: 60 },
    defaultParams
  );
}`,

  // 074. Bioluminescent Odonata Dragonfly
  'bioluminescent-dragonfly': `// 074 - Bioluminescent Odonata Dragonfly (insects)
// 1:1 Original algorithm engine source
function createBioluminescentDragonfly() {
  return {
    setup() {
    },
    render(context, timeState, params) {
      const { ctx, width, height } = context;
      const flapRate = Number(params.flapSpeed ?? 1.5);
      const glowLevel = Number(params.bioluminescence ?? 1);
      const wingVenation = Math.max(3, Math.min(8, Math.round(Number(params.wingCells ?? 5))));
      const t = timeState.time * flapRate;
      ctx.fillStyle = "#020508";
      ctx.fillRect(0, 0, width, height);
      const cx = width * 0.5;
      const cy = height * 0.48;
      const maxR = Math.min(width, height) * 0.44;
      const hoverY = Math.sin(t * 2.5) * 8;
      ctx.save();
      ctx.translate(cx, cy + hoverY);
      const cyanHue = 175;
      for (let r = 1; r <= 3; r++) {
        const rippleR = maxR * (0.5 + 0.3 * r) * (1 + 0.08 * Math.sin(t * 2 + r));
        ctx.beginPath();
        ctx.ellipse(0, maxR * 0.4, rippleR, rippleR * 0.25, 0, 0, Math.PI * 2);
        ctx.strokeStyle = hsla(cyanHue, 90, 65, (0.15 - r * 0.03) * glowLevel);
        ctx.lineWidth = 1;
        ctx.stroke();
      }
      for (const wSide of [-1, 1]) {
        const forePhase = Math.sin(t * 8);
        const foreScale = 0.35 + 0.65 * Math.cos(t * 8);
        ctx.save();
        ctx.translate(wSide * (maxR * 0.05), -maxR * 0.06);
        ctx.rotate(wSide * (-Math.PI * 0.42 + forePhase * 0.15));
        ctx.scale(1, foreScale);
        const fwLen = maxR * 0.95;
        const fwWidth = fwLen * 0.22;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.bezierCurveTo(wSide * fwWidth * 0.5, -fwLen * 0.3, wSide * fwWidth, -fwLen * 0.7, 0, -fwLen);
        ctx.bezierCurveTo(-wSide * fwWidth * 0.5, -fwLen * 0.7, -wSide * fwWidth * 0.3, -fwLen * 0.3, 0, 0);
        ctx.fillStyle = hsla(cyanHue, 95, 60, 0.2 * glowLevel);
        ctx.fill();
        ctx.strokeStyle = hsla(cyanHue + 15, 100, 80, 0.85 * glowLevel);
        ctx.lineWidth = 1.3;
        ctx.stroke();
        ctx.fillStyle = hsla(50, 100, 85, 0.95 * glowLevel);
        ctx.fillRect(wSide * (fwWidth * 0.55), -fwLen * 0.88, 4, 10);
        for (let v = 1; v <= wingVenation; v++) {
          const vFrac = v / (wingVenation + 1);
          ctx.beginPath();
          ctx.moveTo(0, -fwLen * vFrac);
          ctx.lineTo(wSide * (fwWidth * 0.8 * (1 - Math.abs(vFrac - 0.5) * 1.2)), -fwLen * vFrac);
          ctx.strokeStyle = hsla(cyanHue + 30, 90, 85, 0.35 * glowLevel);
          ctx.lineWidth = 0.75;
          ctx.stroke();
        }
        ctx.restore();
        const hindPhase = Math.sin(t * 8 - Math.PI * 0.5);
        const hindScale = 0.35 + 0.65 * Math.cos(t * 8 - Math.PI * 0.5);
        ctx.save();
        ctx.translate(wSide * (maxR * 0.05), maxR * 0.02);
        ctx.rotate(wSide * (-Math.PI * 0.55 + hindPhase * 0.15));
        ctx.scale(1, hindScale);
        const hwLen = maxR * 0.88;
        const hwWidth = hwLen * 0.26;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.bezierCurveTo(wSide * hwWidth * 0.6, -hwLen * 0.3, wSide * hwWidth, -hwLen * 0.65, 0, -hwLen);
        ctx.bezierCurveTo(-wSide * hwWidth * 0.4, -hwLen * 0.65, -wSide * hwWidth * 0.2, -hwLen * 0.3, 0, 0);
        ctx.fillStyle = hsla(cyanHue - 20, 95, 55, 0.18 * glowLevel);
        ctx.fill();
        ctx.strokeStyle = hsla(cyanHue, 100, 75, 0.75 * glowLevel);
        ctx.lineWidth = 1.2;
        ctx.stroke();
        ctx.restore();
      }
      const abSegments = 10;
      for (let s = 1; s <= abSegments; s++) {
        const sNorm = s / abSegments;
        const sy = sNorm * maxR * 0.62 + maxR * 0.05;
        const sw = Math.max(1.8, maxR * 0.035 * (1 - sNorm * 0.4));
        const sh = maxR * 0.055;
        ctx.beginPath();
        ctx.ellipse(0, sy, sw, sh * 0.5, 0, 0, Math.PI * 2);
        ctx.fillStyle = hsla(cyanHue + s % 2 * 15, 90, 35 + s * 3, 0.95);
        ctx.fill();
        ctx.strokeStyle = hsla(cyanHue + 25, 100, 80, 0.8 * glowLevel);
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.fillStyle = hsla(cyanHue + 40, 100, 90, 0.95 * glowLevel);
        ctx.beginPath();
        ctx.arc(0, sy, 1.4, 0, Math.PI * 2);
        ctx.fill();
      }
      for (const cSide of [-1, 1]) {
        ctx.beginPath();
        ctx.moveTo(0, maxR * 0.68);
        ctx.lineTo(cSide * 4, maxR * 0.74);
        ctx.strokeStyle = hsla(cyanHue + 20, 95, 80, 0.9 * glowLevel);
        ctx.lineWidth = 1.2;
        ctx.stroke();
      }
      ctx.beginPath();
      ctx.ellipse(0, -maxR * 0.02, maxR * 0.065, maxR * 0.085, 0, 0, Math.PI * 2);
      ctx.fillStyle = "#062024";
      ctx.fill();
      ctx.strokeStyle = hsla(cyanHue + 10, 95, 78, 0.95 * glowLevel);
      ctx.lineWidth = 1.6;
      ctx.stroke();
      for (const eyeSide of [-1, 1]) {
        ctx.beginPath();
        ctx.arc(eyeSide * (maxR * 0.055), -maxR * 0.12, maxR * 0.05, 0, Math.PI * 2);
        ctx.fillStyle = hsla(cyanHue + 30, 95, 55, 0.95);
        ctx.fill();
        ctx.strokeStyle = hsla(cyanHue + 50, 100, 90, 0.95 * glowLevel);
        ctx.lineWidth = 1.4;
        ctx.stroke();
        ctx.fillStyle = "#ffffff";
        ctx.beginPath();
        ctx.arc(eyeSide * (maxR * 0.06), -maxR * 0.13, 2, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    }
  };
}

// Default parameters from content metadata
const defaultParams = [
  {
    "key": "flapSpeed",
    "label": "Flight Frequency",
    "type": "range",
    "min": 0.5,
    "max": 2.5,
    "step": 0.1,
    "defaultValue": 1.5,
    "description": "Wing stroke cadence"
  },
  {
    "key": "bioluminescence",
    "label": "Cyan Glow Intensity",
    "type": "range",
    "min": 0.4,
    "max": 1.6,
    "step": 0.1,
    "defaultValue": 1,
    "description": "Bioluminescent emission strength"
  },
  {
    "key": "wingCells",
    "label": "Wing Cell Tracery",
    "type": "range",
    "min": 3,
    "max": 8,
    "step": 1,
    "defaultValue": 5,
    "description": "Number of delicate venation cross-cells"
  }
];

if (!window.__art_instances) window.__art_instances = {};
if (!window.__art_instances['bioluminescent-dragonfly']) {
  const inst = typeof createBioluminescentDragonfly === 'function' ? createBioluminescentDragonfly() : null;
  if (inst && inst.setup) {
    inst.setup({ ctx, width, height, dpr: 1, aspectRatio: width / height }, defaultParams);
  }
  window.__art_instances['bioluminescent-dragonfly'] = inst;
}

const instance = window.__art_instances['bioluminescent-dragonfly'];
if (instance && instance.render) {
  instance.render(
    { ctx, width, height, dpr: 1, aspectRatio: width / height },
    { time, deltaTime: dt, frameCount: Math.floor(time * 60), fps: 60 },
    defaultParams
  );
}`,

  // 075. Royal Siamese Betta Splendens
  'siamese-betta': `// 075 - Royal Siamese Betta Splendens (creatures)
// 1:1 Original algorithm engine source
function createSiameseBetta() {
  return {
    setup() {
    },
    render(context, timeState, params) {
      const { ctx, width, height } = context;
      const swimSpeed = Number(params.swimCadence ?? 0.85);
      const finFlow = Number(params.veilSpread ?? 1.1);
      const iridescence = Number(params.iridescenceSheen ?? 1);
      const t = timeState.time * swimSpeed;
      ctx.fillStyle = "#02060d";
      ctx.fillRect(0, 0, width, height);
      const cx = width * 0.48;
      const cy = height * 0.5;
      const maxR = Math.min(width, height) * 0.44;
      ctx.save();
      ctx.translate(cx, cy);
      const royalHue = 215;
      const magentaHue = 325;
      for (let p = 0; p < 16; p++) {
        const pa = (p * 45 + t * 20) * (Math.PI / 180);
        const pr = maxR * (0.3 + 0.6 * (p * 37 % 100) / 100);
        const px = Math.cos(pa) * pr;
        const py = Math.sin(pa * 1.5) * (pr * 0.45);
        ctx.fillStyle = hsla(royalHue + 20, 80, 75, 0.15);
        ctx.beginPath();
        ctx.arc(px, py, 1.2, 0, Math.PI * 2);
        ctx.fill();
      }
      const spineJoints = 20;
      const spinePoints = [];
      const bodyLen = maxR * 0.95;
      for (let j = 0; j <= spineJoints; j++) {
        const frac = j / spineJoints;
        const amp = Math.pow(frac, 1.5) * (maxR * 0.16);
        const wave = Math.sin(t * 3.2 - frac * Math.PI * 2.2);
        const sx = -bodyLen * 0.45 + frac * bodyLen * 0.8;
        const sy = wave * amp;
        let bWidth = 0;
        if (frac < 0.25) {
          bWidth = Math.sin(frac / 0.25 * (Math.PI * 0.5)) * (maxR * 0.13);
        } else {
          bWidth = Math.cos((frac - 0.25) / 0.75 * (Math.PI * 0.5)) * (maxR * 0.13);
        }
        spinePoints.push({ x: sx, y: sy, angle: 0, width: Math.max(2, bWidth) });
      }
      for (let j = 0; j <= spineJoints; j++) {
        const next = spinePoints[Math.min(spineJoints, j + 1)];
        const prev = spinePoints[Math.max(0, j - 1)];
        spinePoints[j].angle = Math.atan2(next.y - prev.y, next.x - prev.x);
      }
      const tailRoot = spinePoints[spineJoints];
      const finRays = 32;
      const tailLen = maxR * 0.85 * finFlow;
      for (let layer = 0; layer < 3; layer++) {
        const layerAlpha = (0.2 + layer * 0.18) * iridescence;
        const layerOffset = (layer - 1) * 0.15;
        for (let r = 0; r < finRays; r++) {
          const rFrac = r / (finRays - 1);
          const fanAngle = tailRoot.angle + (rFrac - 0.5) * Math.PI * 0.85 + layerOffset;
          const rayLag = rFrac * 0.8;
          const rayWave1 = Math.sin(t * 3.5 - rayLag * 2.5) * (maxR * 0.12);
          const rayWave2 = Math.cos(t * 2.8 - rayLag * 1.8) * (maxR * 0.08);
          const rLen = tailLen * (0.7 + 0.3 * Math.sin(rFrac * Math.PI)) * (1 + 0.1 * Math.sin(t * 2 + r));
          const p1x = tailRoot.x;
          const p1y = tailRoot.y;
          const cp1x = p1x + Math.cos(fanAngle) * (rLen * 0.4) + rayWave1;
          const cp1y = p1y + Math.sin(fanAngle) * (rLen * 0.4) + rayWave2;
          const p2x = p1x + Math.cos(fanAngle) * rLen + rayWave1 * 1.6;
          const p2y = p1y + Math.sin(fanAngle) * rLen + rayWave2 * 1.6;
          ctx.beginPath();
          ctx.moveTo(p1x, p1y);
          ctx.quadraticCurveTo(cp1x, cp1y, p2x, p2y);
          const finHue = royalHue + rFrac * 80 + layer * 25;
          ctx.strokeStyle = hsla(finHue, 95, 62, layerAlpha);
          ctx.lineWidth = 1.2 + (1 - rFrac) * 1.5;
          ctx.stroke();
          if (r % 2 === 0) {
            ctx.fillStyle = hsla(magentaHue - rFrac * 60, 90, 55, 0.04 * iridescence);
            ctx.fill();
          }
        }
      }
      const dorsalStart = Math.floor(spineJoints * 0.3);
      const dorsalEnd = Math.floor(spineJoints * 0.85);
      for (let i = dorsalStart; i <= dorsalEnd; i++) {
        const pt = spinePoints[i];
        const dFrac = (i - dorsalStart) / (dorsalEnd - dorsalStart);
        const dLen = maxR * 0.55 * Math.sin(dFrac * Math.PI) * finFlow;
        const dAng = pt.angle - Math.PI * 0.55 + Math.sin(t * 3 - i * 0.3) * 0.25;
        const tipX = pt.x + Math.cos(dAng) * dLen;
        const tipY = pt.y + Math.sin(dAng) * dLen;
        ctx.beginPath();
        ctx.moveTo(pt.x, pt.y - pt.width * 0.8);
        ctx.quadraticCurveTo(pt.x + Math.cos(dAng) * (dLen * 0.5), pt.y + Math.sin(dAng) * (dLen * 0.5) - 10, tipX, tipY);
        ctx.strokeStyle = hsla(royalHue + dFrac * 60, 90, 65, 0.35 * iridescence);
        ctx.lineWidth = 1.2;
        ctx.stroke();
      }
      const analStart = Math.floor(spineJoints * 0.35);
      const analEnd = Math.floor(spineJoints * 0.95);
      for (let i = analStart; i <= analEnd; i++) {
        const pt = spinePoints[i];
        const aFrac = (i - analStart) / (analEnd - analStart);
        const aLen = maxR * 0.62 * Math.sin(aFrac * Math.PI) * finFlow;
        const aAng = pt.angle + Math.PI * 0.55 + Math.sin(t * 3 - i * 0.3) * 0.25;
        const tipX = pt.x + Math.cos(aAng) * aLen;
        const tipY = pt.y + Math.sin(aAng) * aLen;
        ctx.beginPath();
        ctx.moveTo(pt.x, pt.y + pt.width * 0.8);
        ctx.quadraticCurveTo(pt.x + Math.cos(aAng) * (aLen * 0.5), pt.y + Math.sin(aAng) * (aLen * 0.5) + 10, tipX, tipY);
        ctx.strokeStyle = hsla(magentaHue - aFrac * 50, 92, 60, 0.35 * iridescence);
        ctx.lineWidth = 1.2;
        ctx.stroke();
      }
      ctx.beginPath();
      const headPt = spinePoints[0];
      ctx.moveTo(headPt.x, headPt.y);
      for (let j = 1; j <= spineJoints; j++) {
        const pt = spinePoints[j];
        const normX = -Math.sin(pt.angle);
        const normY = Math.cos(pt.angle);
        ctx.lineTo(pt.x + normX * pt.width, pt.y + normY * pt.width);
      }
      for (let j = spineJoints; j >= 0; j--) {
        const pt = spinePoints[j];
        const normX = -Math.sin(pt.angle);
        const normY = Math.cos(pt.angle);
        ctx.lineTo(pt.x - normX * pt.width, pt.y - normY * pt.width);
      }
      ctx.closePath();
      const bodyGrad = ctx.createLinearGradient(spinePoints[0].x, 0, spinePoints[spineJoints].x, 0);
      bodyGrad.addColorStop(0, "#0c1a38");
      bodyGrad.addColorStop(0.3, hsla(royalHue, 90, 35, 0.95));
      bodyGrad.addColorStop(0.7, hsla(magentaHue, 85, 30, 0.95));
      bodyGrad.addColorStop(1, "#050a17");
      ctx.fillStyle = bodyGrad;
      ctx.fill();
      ctx.strokeStyle = hsla(royalHue + 20, 100, 75, 0.85 * iridescence);
      ctx.lineWidth = 1.4;
      ctx.stroke();
      for (let j = 2; j < spineJoints - 4; j += 2) {
        const pt = spinePoints[j];
        const scX = pt.x;
        const scY = pt.y - pt.width * 0.3;
        ctx.beginPath();
        ctx.ellipse(scX, scY, 3.5, 2, pt.angle, 0, Math.PI * 2);
        ctx.fillStyle = hsla(royalHue + 40, 100, 80, 0.5 * iridescence);
        ctx.fill();
      }
      const pelvicPt = spinePoints[3];
      const pelvLen = maxR * 0.7 * finFlow;
      const pelvWave = Math.sin(t * 3.5) * 12;
      ctx.beginPath();
      ctx.moveTo(pelvicPt.x, pelvicPt.y + pelvicPt.width * 0.7);
      ctx.bezierCurveTo(pelvicPt.x + 10, pelvicPt.y + pelvLen * 0.4, pelvicPt.x - 15 + pelvWave, pelvicPt.y + pelvLen * 0.7, pelvicPt.x - 5 + pelvWave, pelvicPt.y + pelvLen);
      ctx.strokeStyle = hsla(magentaHue + 20, 100, 80, 0.85);
      ctx.lineWidth = 1.6;
      ctx.stroke();
      const pectPt = spinePoints[2];
      const pectAngle = pectPt.angle - 0.4 + Math.sin(t * 5) * 0.35;
      const pectLen = maxR * 0.28;
      ctx.save();
      ctx.translate(pectPt.x, pectPt.y);
      ctx.rotate(pectAngle);
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.bezierCurveTo(pectLen * 0.5, -pectLen * 0.4, pectLen * 0.9, -pectLen * 0.3, pectLen, 0);
      ctx.bezierCurveTo(pectLen * 0.8, pectLen * 0.3, pectLen * 0.4, pectLen * 0.3, 0, 0);
      ctx.fillStyle = "rgba(56, 189, 248, 0.25)";
      ctx.fill();
      ctx.strokeStyle = hsla(royalHue + 20, 95, 80, 0.75);
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.restore();
      const eyePt = spinePoints[1];
      const eyeX = eyePt.x - 4;
      const eyeY = eyePt.y - 3;
      ctx.beginPath();
      ctx.arc(eyeX, eyeY, 4.2, 0, Math.PI * 2);
      ctx.fillStyle = "#020610";
      ctx.fill();
      ctx.strokeStyle = hsla(45, 100, 65, 0.9);
      ctx.lineWidth = 1.2;
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(eyeX, eyeY, 2.4, 0, Math.PI * 2);
      ctx.fillStyle = "#f59e0b";
      ctx.fill();
      ctx.beginPath();
      ctx.arc(eyeX, eyeY, 1.2, 0, Math.PI * 2);
      ctx.fillStyle = "#000000";
      ctx.fill();
      ctx.fillStyle = "#ffffff";
      ctx.beginPath();
      ctx.arc(eyeX - 0.8, eyeY - 0.8, 0.7, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  };
}

// Default parameters from content metadata
const defaultParams = [
  {
    "key": "swimCadence",
    "label": "Swimming Cadence",
    "type": "range",
    "min": 0.4,
    "max": 1.8,
    "step": 0.05,
    "defaultValue": 0.85,
    "description": "Carangiform body undulation speed"
  },
  {
    "key": "veilSpread",
    "label": "Veil Fin Volume",
    "type": "range",
    "min": 0.6,
    "max": 1.6,
    "step": 0.1,
    "defaultValue": 1.1,
    "description": "Flowing caudal and dorsal fin veil amplitude"
  },
  {
    "key": "iridescenceSheen",
    "label": "Scales Iridescence",
    "type": "range",
    "min": 0.4,
    "max": 1.6,
    "step": 0.1,
    "defaultValue": 1,
    "description": "Structural color reflection intensity"
  }
];

if (!window.__art_instances) window.__art_instances = {};
if (!window.__art_instances['siamese-betta']) {
  const inst = typeof createSiameseBetta === 'function' ? createSiameseBetta() : null;
  if (inst && inst.setup) {
    inst.setup({ ctx, width, height, dpr: 1, aspectRatio: width / height }, defaultParams);
  }
  window.__art_instances['siamese-betta'] = inst;
}

const instance = window.__art_instances['siamese-betta'];
if (instance && instance.render) {
  instance.render(
    { ctx, width, height, dpr: 1, aspectRatio: width / height },
    { time, deltaTime: dt, frameCount: Math.floor(time * 60), fps: 60 },
    defaultParams
  );
}`,

  // 076. Imperial Japanese Nishikigoi
  'japanese-koi': `// 076 - Imperial Japanese Nishikigoi (creatures)
// 1:1 Original algorithm engine source
function createJapaneseKoi() {
  return {
    setup() {
    },
    render(context, timeState, params) {
      const { ctx, width, height } = context;
      const swimRate = Number(params.swimSpeed ?? 0.75);
      const rippleLuster = Number(params.pondRipples ?? 1);
      const patternColor = Number(params.kohakuHue ?? 12);
      const t = timeState.time * swimRate;
      ctx.fillStyle = "#03080d";
      ctx.fillRect(0, 0, width, height);
      const cx = width * 0.5;
      const cy = height * 0.5;
      const maxR = Math.min(width, height) * 0.44;
      ctx.save();
      ctx.translate(cx, cy);
      if (rippleLuster > 0.1) {
        for (let r = 1; r <= 4; r++) {
          const rRadius = maxR * (0.4 + 0.22 * r) * (1 + 0.05 * Math.sin(t * 1.5 + r));
          ctx.beginPath();
          ctx.ellipse(0, 0, rRadius, rRadius * 0.7, 0.4, 0, Math.PI * 2);
          ctx.strokeStyle = hsla(190, 80, 65, (0.12 - r * 0.02) * rippleLuster);
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
      const spineJoints = 22;
      const spinePoints = [];
      const bodyLen = maxR * 1.1;
      for (let j = 0; j <= spineJoints; j++) {
        const frac = j / spineJoints;
        const amp = Math.pow(frac, 1.4) * (maxR * 0.18);
        const wave = Math.sin(t * 3 - frac * Math.PI * 2.4);
        const sx = -bodyLen * 0.48 + frac * bodyLen * 0.9;
        const sy = wave * amp;
        let bWidth = 0;
        if (frac < 0.3) {
          bWidth = Math.sin(frac / 0.3 * (Math.PI * 0.5)) * (maxR * 0.16);
        } else {
          bWidth = Math.cos((frac - 0.3) / 0.7 * (Math.PI * 0.5)) * (maxR * 0.16);
        }
        spinePoints.push({ x: sx, y: sy, angle: 0, width: Math.max(2, bWidth) });
      }
      for (let j = 0; j <= spineJoints; j++) {
        const next = spinePoints[Math.min(spineJoints, j + 1)];
        const prev = spinePoints[Math.max(0, j - 1)];
        spinePoints[j].angle = Math.atan2(next.y - prev.y, next.x - prev.x);
      }
      const tailPt = spinePoints[spineJoints];
      const tailRays = 18;
      const tailLen = maxR * 0.48;
      for (let r = 0; r < tailRays; r++) {
        const rFrac = r / (tailRays - 1);
        const fanAng = tailPt.angle + (rFrac - 0.5) * Math.PI * 0.65;
        const rWave = Math.sin(t * 3.5 - rFrac * 2) * 12;
        const tipX = tailPt.x + Math.cos(fanAng) * tailLen + rWave;
        const tipY = tailPt.y + Math.sin(fanAng) * tailLen + rWave * 0.5;
        ctx.beginPath();
        ctx.moveTo(tailPt.x, tailPt.y);
        ctx.quadraticCurveTo(tailPt.x + Math.cos(fanAng) * (tailLen * 0.5), tailPt.y + Math.sin(fanAng) * (tailLen * 0.5), tipX, tipY);
        ctx.strokeStyle = hsla(40, 90, 85, 0.4);
        ctx.lineWidth = 1.4;
        ctx.stroke();
      }
      const pectPt = spinePoints[3];
      for (const pSide of [-1, 1]) {
        const pPhase = Math.sin(t * 3.2 + (pSide === 1 ? 0 : Math.PI * 0.2)) * 0.3;
        const pBaseAngle = pectPt.angle + pSide * (Math.PI * 0.55 + pPhase);
        const pLen = maxR * 0.38;
        ctx.save();
        const startX = pectPt.x - Math.sin(pectPt.angle) * (pSide * pectPt.width * 0.8);
        const startY = pectPt.y + Math.cos(pectPt.angle) * (pSide * pectPt.width * 0.8);
        ctx.translate(startX, startY);
        ctx.rotate(pBaseAngle);
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.bezierCurveTo(pLen * 0.6, -pLen * 0.3, pLen, -pLen * 0.1, pLen, 0);
        ctx.bezierCurveTo(pLen * 0.8, pLen * 0.3, pLen * 0.4, pLen * 0.2, 0, 0);
        ctx.fillStyle = "rgba(254, 243, 199, 0.3)";
        ctx.fill();
        ctx.strokeStyle = hsla(45, 95, 80, 0.85);
        ctx.lineWidth = 1.2;
        ctx.stroke();
        for (let ray = 1; ray <= 5; ray++) {
          const rayF = ray / 6;
          ctx.beginPath();
          ctx.moveTo(0, 0);
          ctx.lineTo(pLen * 0.85 * rayF, (rayF - 0.5) * pLen * 0.3);
          ctx.strokeStyle = hsla(40, 90, 85, 0.35);
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
        ctx.restore();
      }
      ctx.beginPath();
      const headPt = spinePoints[0];
      ctx.moveTo(headPt.x, headPt.y);
      for (let j = 1; j <= spineJoints; j++) {
        const pt = spinePoints[j];
        const normX = -Math.sin(pt.angle);
        const normY = Math.cos(pt.angle);
        ctx.lineTo(pt.x + normX * pt.width, pt.y + normY * pt.width);
      }
      for (let j = spineJoints; j >= 0; j--) {
        const pt = spinePoints[j];
        const normX = -Math.sin(pt.angle);
        const normY = Math.cos(pt.angle);
        ctx.lineTo(pt.x - normX * pt.width, pt.y - normY * pt.width);
      }
      ctx.closePath();
      const koiSkin = ctx.createLinearGradient(spinePoints[0].x, 0, spinePoints[spineJoints].x, 0);
      koiSkin.addColorStop(0, "#fef9c3");
      koiSkin.addColorStop(0.5, "#fffbeb");
      koiSkin.addColorStop(1, "#fef08a");
      ctx.fillStyle = koiSkin;
      ctx.fill();
      ctx.strokeStyle = "#f59e0b";
      ctx.lineWidth = 1.5;
      ctx.stroke();
      const crownPt = spinePoints[2];
      ctx.beginPath();
      ctx.ellipse(crownPt.x, crownPt.y, maxR * 0.11, maxR * 0.08, crownPt.angle, 0, Math.PI * 2);
      ctx.fillStyle = hsla(patternColor, 95, 52, 0.95);
      ctx.fill();
      const saddlePt = spinePoints[7];
      ctx.beginPath();
      ctx.ellipse(saddlePt.x, saddlePt.y - 2, maxR * 0.15, maxR * 0.11, saddlePt.angle, 0, Math.PI * 2);
      ctx.fillStyle = hsla(patternColor + 4, 92, 48, 0.95);
      ctx.fill();
      const sumiPt = spinePoints[13];
      ctx.beginPath();
      ctx.ellipse(sumiPt.x, sumiPt.y + 4, maxR * 0.08, maxR * 0.06, sumiPt.angle, 0, Math.PI * 2);
      ctx.fillStyle = "#090a0f";
      ctx.fill();
      const hiPt = spinePoints[16];
      ctx.beginPath();
      ctx.ellipse(hiPt.x, hiPt.y, maxR * 0.09, maxR * 0.05, hiPt.angle, 0, Math.PI * 2);
      ctx.fillStyle = hsla(patternColor - 3, 95, 50, 0.95);
      ctx.fill();
      for (const bSide of [-1, 1]) {
        const bSway = Math.sin(t * 4 + bSide) * 4;
        ctx.beginPath();
        ctx.moveTo(headPt.x + 2, headPt.y + bSide * 5);
        ctx.quadraticCurveTo(headPt.x - 12, headPt.y + bSide * 16 + bSway, headPt.x - 22, headPt.y + bSide * 20 + bSway);
        ctx.strokeStyle = "#fef08a";
        ctx.lineWidth = 1.3;
        ctx.stroke();
      }
      for (const eSide of [-1, 1]) {
        const eyeX = headPt.x + 8;
        const eyeY = headPt.y + eSide * (headPt.width * 0.75);
        ctx.beginPath();
        ctx.arc(eyeX, eyeY, 3.2, 0, Math.PI * 2);
        ctx.fillStyle = "#0f172a";
        ctx.fill();
        ctx.strokeStyle = "#f59e0b";
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.fillStyle = "#ffffff";
        ctx.beginPath();
        ctx.arc(eyeX - 0.7, eyeY - 0.7, 0.8, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    }
  };
}

// Default parameters from content metadata
const defaultParams = [
  {
    "key": "swimSpeed",
    "label": "Carp Swimming Rate",
    "type": "range",
    "min": 0.3,
    "max": 1.6,
    "step": 0.05,
    "defaultValue": 0.75,
    "description": "S-curve spinal propulsion frequency"
  },
  {
    "key": "pondRipples",
    "label": "Pond Water Caustics",
    "type": "range",
    "min": 0,
    "max": 1.6,
    "step": 0.1,
    "defaultValue": 1,
    "description": "Concentric water surface wave intensity"
  },
  {
    "key": "kohakuHue",
    "label": "Kohaku Vermilion Hue",
    "type": "range",
    "min": 0,
    "max": 45,
    "step": 2,
    "defaultValue": 12,
    "description": "Hue of traditional cinnabar red carp patches"
  }
];

if (!window.__art_instances) window.__art_instances = {};
if (!window.__art_instances['japanese-koi']) {
  const inst = typeof createJapaneseKoi === 'function' ? createJapaneseKoi() : null;
  if (inst && inst.setup) {
    inst.setup({ ctx, width, height, dpr: 1, aspectRatio: width / height }, defaultParams);
  }
  window.__art_instances['japanese-koi'] = inst;
}

const instance = window.__art_instances['japanese-koi'];
if (instance && instance.render) {
  instance.render(
    { ctx, width, height, dpr: 1, aspectRatio: width / height },
    { time, deltaTime: dt, frameCount: Math.floor(time * 60), fps: 60 },
    defaultParams
  );
}`,

  // 077. Royal Symphysodon Discus
  'symphysodon-discus': `// 077 - Royal Symphysodon Discus (creatures)
// 1:1 Original algorithm engine source
function createSymphysodonDiscus() {
  return {
    setup() {
    },
    render(context, timeState, params) {
      const { ctx, width, height } = context;
      const hoverSpeed = Number(params.hoverRate ?? 0.8);
      const neonGlow = Number(params.striationLuster ?? 1.1);
      const verticalBars = Math.max(5, Math.min(11, Math.round(Number(params.stressBars ?? 7))));
      const t = timeState.time * hoverSpeed;
      ctx.fillStyle = "#050403";
      ctx.fillRect(0, 0, width, height);
      const cx = width * 0.5;
      const cy = height * 0.5;
      const maxR = Math.min(width, height) * 0.44;
      const hoverY = Math.sin(t * 2.2) * 5;
      ctx.save();
      ctx.translate(cx, cy + hoverY);
      const turquoiseHue = 185;
      const baseAmberHue = 28;
      const finRays = 40;
      for (const fSide of [-1, 1]) {
        for (let r = 0; r < finRays; r++) {
          const rFrac = r / (finRays - 1);
          const rAngle = -Math.PI * 0.6 + rFrac * Math.PI * 1.2;
          const rBaseX = Math.sin(rAngle) * (maxR * 0.52);
          const rBaseY = fSide * (Math.cos(rAngle) * (maxR * 0.52));
          const wave = Math.sin(t * 3.5 - rFrac * 4) * 8;
          const finHeight = maxR * 0.22 * Math.sin(rFrac * Math.PI) * (1 + 0.08 * Math.sin(t * 2 + r));
          const tipX = rBaseX + wave * 0.4;
          const tipY = rBaseY + fSide * finHeight;
          ctx.beginPath();
          ctx.moveTo(rBaseX, rBaseY);
          ctx.lineTo(tipX, tipY);
          ctx.strokeStyle = hsla(turquoiseHue + rFrac * 30, 95, 65, 0.45 * neonGlow);
          ctx.lineWidth = 1.4;
          ctx.stroke();
          if (r % 3 === 0) {
            ctx.fillStyle = hsla(turquoiseHue + 40, 100, 85, 0.7 * neonGlow);
            ctx.beginPath();
            ctx.arc(tipX, tipY, 1.2, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }
      const tailLen = maxR * 0.35;
      const tailWave = Math.sin(t * 3.5) * 6;
      ctx.beginPath();
      ctx.moveTo(maxR * 0.5, 0);
      ctx.bezierCurveTo(maxR * 0.65, -maxR * 0.2, maxR * 0.85 + tailWave, -maxR * 0.25, maxR * 0.5 + tailLen + tailWave, 0);
      ctx.bezierCurveTo(maxR * 0.85 + tailWave, maxR * 0.25, maxR * 0.65, maxR * 0.2, maxR * 0.5, 0);
      ctx.fillStyle = "rgba(56, 189, 248, 0.2)";
      ctx.fill();
      ctx.strokeStyle = hsla(turquoiseHue, 95, 75, 0.7 * neonGlow);
      ctx.lineWidth = 1.2;
      ctx.stroke();
      ctx.beginPath();
      ctx.ellipse(0, 0, maxR * 0.52, maxR * 0.54, 0, 0, Math.PI * 2);
      const discGrad = ctx.createRadialGradient(0, 0, maxR * 0.1, 0, 0, maxR * 0.54);
      discGrad.addColorStop(0, hsla(baseAmberHue + 15, 95, 52, 0.98));
      discGrad.addColorStop(0.65, hsla(baseAmberHue, 90, 36, 0.95));
      discGrad.addColorStop(1, hsla(turquoiseHue - 20, 85, 25, 0.95));
      ctx.fillStyle = discGrad;
      ctx.fill();
      ctx.strokeStyle = hsla(turquoiseHue, 100, 80, 0.9 * neonGlow);
      ctx.lineWidth = 1.8;
      ctx.stroke();
      for (let b = 1; b <= verticalBars; b++) {
        const bFrac = b / (verticalBars + 1);
        const bx = -maxR * 0.42 + bFrac * (maxR * 0.84);
        const bHalfH = Math.sqrt(Math.max(0, Math.pow(maxR * 0.52, 2) - bx * bx)) * 0.92;
        ctx.beginPath();
        ctx.moveTo(bx, -bHalfH);
        ctx.lineTo(bx, bHalfH);
        const isCenterBar = Math.abs(b - verticalBars / 2) < 1;
        ctx.strokeStyle = isCenterBar ? "rgba(8, 6, 4, 0.75)" : "rgba(15, 10, 6, 0.45)";
        ctx.lineWidth = isCenterBar ? 3.5 : 2;
        ctx.stroke();
      }
      for (let w = 1; w <= 9; w++) {
        const wy = -maxR * 0.38 + w * (maxR * 0.08);
        ctx.beginPath();
        const steps = 30;
        for (let s = 0; s <= steps; s++) {
          const sFrac = s / steps;
          const sx = -maxR * 0.42 + sFrac * (maxR * 0.84);
          const limitH = Math.sqrt(Math.max(0, Math.pow(maxR * 0.5, 2) - sx * sx));
          if (Math.abs(wy) < limitH) {
            const waveY = wy + Math.sin(sx * 0.08 + t * 2 + w) * 3;
            if (s === 0) ctx.moveTo(sx, waveY);
            else ctx.lineTo(sx, waveY);
          }
        }
        ctx.strokeStyle = hsla(turquoiseHue + w * 4, 100, 75, 0.75 * neonGlow);
        ctx.lineWidth = 1.3;
        ctx.stroke();
      }
      ctx.beginPath();
      ctx.ellipse(-maxR * 0.12, maxR * 0.08, maxR * 0.15, maxR * 0.08, 0.5 + Math.sin(t * 4) * 0.2, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(254, 240, 138, 0.25)";
      ctx.fill();
      ctx.strokeStyle = hsla(45, 95, 80, 0.85);
      ctx.lineWidth = 1.1;
      ctx.stroke();
      const eyeX = -maxR * 0.32;
      const eyeY = -maxR * 0.12;
      ctx.beginPath();
      ctx.arc(eyeX, eyeY, 5.5, 0, Math.PI * 2);
      ctx.fillStyle = "#b91c1c";
      ctx.fill();
      ctx.strokeStyle = hsla(45, 100, 75, 0.9);
      ctx.lineWidth = 1.4;
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(eyeX, eyeY, 2.5, 0, Math.PI * 2);
      ctx.fillStyle = "#000000";
      ctx.fill();
      ctx.fillStyle = "#ffffff";
      ctx.beginPath();
      ctx.arc(eyeX - 1.2, eyeY - 1.2, 1.1, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  };
}

// Default parameters from content metadata
const defaultParams = [
  {
    "key": "hoverRate",
    "label": "Hovering Dynamics",
    "type": "range",
    "min": 0.3,
    "max": 1.6,
    "step": 0.05,
    "defaultValue": 0.8,
    "description": "Slow buoyant hovering cycle speed"
  },
  {
    "key": "striationLuster",
    "label": "Neon Cyan Striations",
    "type": "range",
    "min": 0.4,
    "max": 1.8,
    "step": 0.1,
    "defaultValue": 1.1,
    "description": "Electric turquoise striation brightness"
  },
  {
    "key": "stressBars",
    "label": "Vertical Heckel Bars",
    "type": "range",
    "min": 5,
    "max": 11,
    "step": 2,
    "defaultValue": 7,
    "description": "Number of dark vertical melanin stress bars"
  }
];

if (!window.__art_instances) window.__art_instances = {};
if (!window.__art_instances['symphysodon-discus']) {
  const inst = typeof createSymphysodonDiscus === 'function' ? createSymphysodonDiscus() : null;
  if (inst && inst.setup) {
    inst.setup({ ctx, width, height, dpr: 1, aspectRatio: width / height }, defaultParams);
  }
  window.__art_instances['symphysodon-discus'] = inst;
}

const instance = window.__art_instances['symphysodon-discus'];
if (instance && instance.render) {
  instance.render(
    { ctx, width, height, dpr: 1, aspectRatio: width / height },
    { time, deltaTime: dt, frameCount: Math.floor(time * 60), fps: 60 },
    defaultParams
  );
}`,

  // 078. Electric Radiant Lionfish
  'electric-lionfish': `// 078 - Electric Radiant Lionfish (creatures)
// 1:1 Original algorithm engine source
function createElectricLionfish() {
  return {
    setup() {
    },
    render(context, timeState, params) {
      const { ctx, width, height } = context;
      const spineSpread = Number(params.spineLength ?? 1.1);
      const fanAgility = Number(params.pectoralWave ?? 0.85);
      const electricLuster = Number(params.bioluminescence ?? 1);
      const t = timeState.time * fanAgility;
      ctx.fillStyle = "#020509";
      ctx.fillRect(0, 0, width, height);
      const cx = width * 0.46;
      const cy = height * 0.5;
      const maxR = Math.min(width, height) * 0.44;
      const driftY = Math.sin(t * 1.8) * 6;
      const driftRot = Math.sin(t * 1.2) * 0.05;
      ctx.save();
      ctx.translate(cx, cy + driftY);
      ctx.rotate(driftRot);
      const amberHue = 24;
      const cyanGlowHue = 180;
      const spineCount = 13;
      for (let s = 0; s < spineCount; s++) {
        const sFrac = s / (spineCount - 1);
        const sAngle = -Math.PI * 0.65 + sFrac * Math.PI * 0.55;
        const sLen = maxR * (0.8 + 0.35 * Math.sin(sFrac * Math.PI)) * spineSpread;
        const sRootX = -maxR * 0.2 + sFrac * (maxR * 0.45);
        const sRootY = -maxR * 0.12;
        const sWave = Math.sin(t * 2.8 - s * 0.4) * (maxR * 0.08);
        const sTipX = sRootX + Math.cos(sAngle) * sLen + sWave;
        const sTipY = sRootY + Math.sin(sAngle) * sLen;
        ctx.beginPath();
        ctx.moveTo(sRootX, sRootY);
        ctx.quadraticCurveTo(sRootX + Math.cos(sAngle) * (sLen * 0.5), sRootY + Math.sin(sAngle) * (sLen * 0.5) - 10, sTipX, sTipY);
        ctx.strokeStyle = hsla(amberHue + s * 3, 90, 68, 0.95);
        ctx.lineWidth = 1.6;
        ctx.stroke();
        for (let b = 1; b <= 4; b++) {
          const bFrac = b / 5;
          const bx = sRootX + (sTipX - sRootX) * bFrac;
          const by = sRootY + (sTipY - sRootY) * bFrac;
          ctx.beginPath();
          ctx.arc(bx, by, 1.8, 0, Math.PI * 2);
          ctx.fillStyle = b % 2 === 0 ? "#ffffff" : "#080503";
          ctx.fill();
        }
        ctx.fillStyle = hsla(cyanGlowHue, 100, 85, 0.95 * electricLuster);
        ctx.beginPath();
        ctx.arc(sTipX, sTipY, 1.4, 0, Math.PI * 2);
        ctx.fill();
      }
      const tailLen = maxR * 0.42;
      const tailWave = Math.sin(t * 3.2) * 8;
      ctx.beginPath();
      ctx.moveTo(maxR * 0.35, 0);
      ctx.bezierCurveTo(maxR * 0.5, -maxR * 0.18, maxR * 0.7 + tailWave, -maxR * 0.18, maxR * 0.35 + tailLen + tailWave, 0);
      ctx.bezierCurveTo(maxR * 0.7 + tailWave, maxR * 0.18, maxR * 0.5, maxR * 0.18, maxR * 0.35, 0);
      ctx.fillStyle = "rgba(249, 115, 22, 0.2)";
      ctx.fill();
      ctx.strokeStyle = hsla(amberHue, 95, 70, 0.85);
      ctx.lineWidth = 1.2;
      ctx.stroke();
      const pectRays = 10;
      for (let pr = 0; pr < pectRays; pr++) {
        const prFrac = pr / (pectRays - 1);
        const pAng = Math.PI * 0.25 + prFrac * Math.PI * 0.65;
        const pWave = Math.sin(t * 3.5 - prFrac * 2.5) * 15;
        const pLen = maxR * (0.65 + 0.25 * Math.sin(prFrac * Math.PI)) * spineSpread;
        const rootX = -maxR * 0.05;
        const rootY = maxR * 0.05;
        const tipX = rootX + Math.cos(pAng) * pLen + pWave;
        const tipY = rootY + Math.sin(pAng) * pLen + pWave * 0.5;
        ctx.beginPath();
        ctx.moveTo(rootX, rootY);
        ctx.quadraticCurveTo(rootX + Math.cos(pAng) * (pLen * 0.5), rootY + Math.sin(pAng) * (pLen * 0.5), tipX, tipY);
        ctx.strokeStyle = hsla(amberHue, 95, 62, 0.9);
        ctx.lineWidth = 1.5;
        ctx.stroke();
        ctx.fillStyle = hsla(amberHue + pr * 5, 90, 50, 0.08 * electricLuster);
        ctx.fill();
        ctx.fillStyle = hsla(cyanGlowHue, 100, 85, 0.85 * electricLuster);
        ctx.beginPath();
        ctx.arc(tipX, tipY, 1.3, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.beginPath();
      ctx.moveTo(-maxR * 0.35, -maxR * 0.02);
      ctx.bezierCurveTo(-maxR * 0.2, -maxR * 0.22, maxR * 0.15, -maxR * 0.18, maxR * 0.35, 0);
      ctx.bezierCurveTo(maxR * 0.15, maxR * 0.18, -maxR * 0.2, maxR * 0.22, -maxR * 0.35, -maxR * 0.02);
      ctx.closePath();
      const bodyGrad = ctx.createLinearGradient(-maxR * 0.35, 0, maxR * 0.35, 0);
      bodyGrad.addColorStop(0, "#1c0803");
      bodyGrad.addColorStop(0.4, "#c2410c");
      bodyGrad.addColorStop(0.8, "#7c2d12");
      bodyGrad.addColorStop(1, "#1c0803");
      ctx.fillStyle = bodyGrad;
      ctx.fill();
      ctx.strokeStyle = "#fb923c";
      ctx.lineWidth = 1.6;
      ctx.stroke();
      for (let s = 1; s <= 7; s++) {
        const sx = -maxR * 0.28 + s * (maxR * 0.08);
        ctx.beginPath();
        ctx.moveTo(sx, -maxR * 0.12);
        ctx.quadraticCurveTo(sx + 6, 0, sx, maxR * 0.12);
        ctx.strokeStyle = "#fff7ed";
        ctx.lineWidth = 2;
        ctx.stroke();
      }
      for (const hSide of [-1, 1]) {
        const hSway = Math.sin(t * 3.5 + hSide) * 3;
        ctx.beginPath();
        ctx.moveTo(-maxR * 0.28, -maxR * 0.06);
        ctx.quadraticCurveTo(-maxR * 0.34 + hSway, -maxR * 0.22, -maxR * 0.32 + hSway, -maxR * 0.28);
        ctx.strokeStyle = "#fdba74";
        ctx.lineWidth = 1.4;
        ctx.stroke();
      }
      const eyeX = -maxR * 0.26;
      const eyeY = -maxR * 0.03;
      ctx.beginPath();
      ctx.arc(eyeX, eyeY, 4.5, 0, Math.PI * 2);
      ctx.fillStyle = "#451a03";
      ctx.fill();
      ctx.strokeStyle = "#f97316";
      ctx.lineWidth = 1.2;
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(eyeX, eyeY, 2, 0, Math.PI * 2);
      ctx.fillStyle = "#000000";
      ctx.fill();
      ctx.fillStyle = "#ffffff";
      ctx.beginPath();
      ctx.arc(eyeX - 0.9, eyeY - 0.9, 0.8, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  };
}

// Default parameters from content metadata
const defaultParams = [
  {
    "key": "spineLength",
    "label": "Dorsal Spines Spread",
    "type": "range",
    "min": 0.6,
    "max": 1.5,
    "step": 0.1,
    "defaultValue": 1.1,
    "description": "Elongated venomous spine length and arc"
  },
  {
    "key": "pectoralWave",
    "label": "Pectoral Fan Motion",
    "type": "range",
    "min": 0.4,
    "max": 1.8,
    "step": 0.05,
    "defaultValue": 0.85,
    "description": "Pectoral fin ray oscillation cadence"
  },
  {
    "key": "bioluminescence",
    "label": "Needle Tip Glow",
    "type": "range",
    "min": 0.3,
    "max": 1.6,
    "step": 0.1,
    "defaultValue": 1,
    "description": "Cyan glow luminescence at spine tips"
  }
];

if (!window.__art_instances) window.__art_instances = {};
if (!window.__art_instances['electric-lionfish']) {
  const inst = typeof createElectricLionfish === 'function' ? createElectricLionfish() : null;
  if (inst && inst.setup) {
    inst.setup({ ctx, width, height, dpr: 1, aspectRatio: width / height }, defaultParams);
  }
  window.__art_instances['electric-lionfish'] = inst;
}

const instance = window.__art_instances['electric-lionfish'];
if (instance && instance.render) {
  instance.render(
    { ctx, width, height, dpr: 1, aspectRatio: width / height },
    { time, deltaTime: dt, frameCount: Math.floor(time * 60), fps: 60 },
    defaultParams
  );
}`,

  // 079. Crepuscular Sunset Rays
  'crepuscular-sunset-rays': `// 079 - Crepuscular Sunset Rays (physics)
// 1:1 Original algorithm engine source
function createCrepuscularSunsetRays() {
  const DUST_COUNT = 85;
  const dustParticles = [];

  function initDust() {
    dustParticles.length = 0;
    for (let i = 0; i < DUST_COUNT; i++) {
      dustParticles.push({
        x: Math.random(),
        y: Math.random(),
        vx: (Math.random() - 0.5) * 0.0004,
        vy: -0.0002 - Math.random() * 0.0006,
        size: 0.8 + Math.random() * 1.8,
        phase: Math.random() * Math.PI * 2,
      });
    }
  }

  return {
    setup() {
      initDust();
    },
    render(context, timeState, params) {
      const { ctx, width, height } = context;
      const speed = Number(params.speed ?? 1.0);
      const rayIntensity = Number(params.rayIntensity ?? 1.2);
      const cloudDensity = Number(params.cloudDensity ?? 1.0);
      const glitterSpread = Number(params.glitterSpread ?? 1.0);
      const sunHeightRatio = Number(params.sunHeight ?? 0.38);

      const t = timeState.time * speed;
      if (dustParticles.length === 0) initDust();

      const sunX = width * 0.5;
      const sunY = height * sunHeightRatio;
      const horizonY = height * 0.64;

      // 1. Dusk-to-Sunset Atmospheric Sky Gradient
      const skyGrad = ctx.createLinearGradient(0, 0, 0, horizonY);
      skyGrad.addColorStop(0, '#070612');
      skyGrad.addColorStop(0.28, '#1b1228');
      skyGrad.addColorStop(0.55, '#5c1e28');
      skyGrad.addColorStop(0.80, '#b84e1b');
      skyGrad.addColorStop(1.0, '#f2a63b');
      ctx.fillStyle = skyGrad;
      ctx.fillRect(0, 0, width, horizonY);

      // 2. Solar Core & Atmospheric Corona Glow
      ctx.save();
      const coronaGrad = ctx.createRadialGradient(sunX, sunY, 0, sunX, sunY, width * 0.5);
      coronaGrad.addColorStop(0, 'rgba(255, 255, 245, 1.0)');
      coronaGrad.addColorStop(0.08, 'rgba(255, 220, 130, 0.9)');
      coronaGrad.addColorStop(0.22, 'rgba(255, 140, 50, 0.45)');
      coronaGrad.addColorStop(0.55, 'rgba(190, 60, 20, 0.15)');
      coronaGrad.addColorStop(1.0, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = coronaGrad;
      ctx.beginPath();
      ctx.arc(sunX, sunY, width * 0.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // 3. Volumetric Crepuscular Ray Beams (Mie Forward Scattering & Cloudbreak Occlusion)
      ctx.save();
      ctx.globalCompositeOperation = 'screen';
      const RAY_COUNT = 32;
      const maxRayLen = Math.hypot(width, height) * 0.95;

      for (let i = 0; i < RAY_COUNT; i++) {
        const normI = i / RAY_COUNT;
        const baseAngle = Math.PI * 0.08 + normI * (Math.PI * 0.84);
        const gapWarp = Math.sin(baseAngle * 6.0 + t * 0.3) * 0.06 +
                        Math.cos(baseAngle * 11.0 - t * 0.4) * 0.04;
        const rayAngle = baseAngle + gapWarp * cloudDensity;

        const angleDiff = Math.abs(rayAngle - Math.PI * 0.5);
        const centralFactor = Math.pow(Math.max(0, 1 - angleDiff / (Math.PI * 0.46)), 1.5);
        const beamPulse = 0.7 + 0.3 * Math.sin(i * 1.9 + t * 1.2);
        const beamAlpha = Math.min(0.38, 0.18 * centralFactor * beamPulse * rayIntensity);

        if (beamAlpha > 0.01) {
          const spreadWidth = 0.05 + (1 - centralFactor) * 0.035;
          const leftAngle = rayAngle - spreadWidth;
          const rightAngle = rayAngle + spreadWidth;

          const rayGrad = ctx.createRadialGradient(sunX, sunY, width * 0.05, sunX, sunY, maxRayLen);
          rayGrad.addColorStop(0, \`rgba(255, 245, 205, \${beamAlpha * 1.2})\`);
          rayGrad.addColorStop(0.2, \`rgba(255, 195, 100, \${beamAlpha * 0.85})\`);
          rayGrad.addColorStop(0.55, \`rgba(220, 100, 35, \${beamAlpha * 0.35})\`);
          rayGrad.addColorStop(1.0, 'rgba(140, 30, 10, 0)');

          ctx.beginPath();
          ctx.moveTo(sunX, sunY);
          ctx.lineTo(sunX + Math.cos(leftAngle) * maxRayLen, sunY + Math.sin(leftAngle) * maxRayLen);
          ctx.lineTo(sunX + Math.cos(rightAngle) * maxRayLen, sunY + Math.sin(rightAngle) * maxRayLen);
          ctx.closePath();
          ctx.fillStyle = rayGrad;
          ctx.fill();
        }
      }
      ctx.restore();

      // 4. Layered Mountain Ranges / Atmospheric Ridges (Closing seamlessly at horizonY)
      ctx.save();
      const RIDGES = [
        { baseY: sunY + 15, amp: 28, freq: 4.5, color: 'rgba(58, 22, 42, 0.85)', rimGlow: true },
        { baseY: sunY + 42, amp: 35, freq: 3.2, color: 'rgba(32, 14, 30, 0.92)', rimGlow: true },
        { baseY: sunY + 70, amp: 42, freq: 2.2, color: 'rgba(14, 8, 20, 0.98)', rimGlow: false },
      ];

      for (let r = 0; r < RIDGES.length; r++) {
        const ridge = RIDGES[r];
        ctx.beginPath();
        ctx.moveTo(0, horizonY);

        const steps = 90;
        for (let s = 0; s <= steps; s++) {
          const nx = s / steps;
          const x = nx * width;
          const p1 = Math.sin(nx * ridge.freq * Math.PI + r * 2.1 + t * 0.05) * ridge.amp;
          const p2 = Math.cos(nx * (ridge.freq * 2.3) - r * 1.5) * (ridge.amp * 0.4);
          const p3 = Math.sin(nx * (ridge.freq * 4.1) + t * 0.02) * (ridge.amp * 0.15);

          const distToSun = Math.abs(x - sunX) / (width * 0.35);
          const sunDip = Math.max(0, 1 - distToSun * distToSun) * (r === 0 ? 30 : 15);

          const y = Math.min(horizonY, ridge.baseY + p1 + p2 + p3 + (r === 0 ? sunDip : 0));
          ctx.lineTo(x, y);
        }

        ctx.lineTo(width, horizonY);
        ctx.lineTo(0, horizonY);
        ctx.closePath();
        ctx.fillStyle = ridge.color;
        ctx.fill();

        if (ridge.rimGlow) {
          ctx.strokeStyle = \`rgba(255, 185, 95, \${0.35 - r * 0.15})\`;
          ctx.lineWidth = 1.2;
          ctx.stroke();
        }
      }
      ctx.restore();

      // 5. Ocean Water & Sunset Horizon
      const oceanH = height - horizonY;
      const oceanGrad = ctx.createLinearGradient(0, horizonY, 0, height);
      oceanGrad.addColorStop(0, '#0c0712');
      oceanGrad.addColorStop(0.3, '#160d1b');
      oceanGrad.addColorStop(0.65, '#0e0714');
      oceanGrad.addColorStop(1.0, '#050308');
      ctx.fillStyle = oceanGrad;
      ctx.fillRect(0, horizonY, width, oceanH);

      // 5a. Soft Golden Sunset Sheen across water
      ctx.save();
      ctx.globalCompositeOperation = 'screen';
      const seaWash = ctx.createRadialGradient(sunX, horizonY, 0, sunX, horizonY + oceanH * 0.35, width * 0.7);
      seaWash.addColorStop(0, \`rgba(215, 120, 35, \${0.22 * glitterSpread})\`);
      seaWash.addColorStop(0.4, \`rgba(140, 60, 18, \${0.10 * glitterSpread})\`);
      seaWash.addColorStop(1.0, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = seaWash;
      ctx.fillRect(0, horizonY, width, oceanH);
      ctx.restore();

      // 5b. Gentle Ocean Wave Crests & Subtle Specular Shimmer
      const WAVE_LINES = 26;
      for (let w = 0; w < WAVE_LINES; w++) {
        const normW = w / WAVE_LINES;
        const lineY = horizonY + Math.pow(normW, 1.4) * oceanH;
        const waveAmp = (0.6 + normW * 3.6);
        const waveFreq = 0.035 - normW * 0.02;

        ctx.beginPath();
        const pts = 80;
        for (let p = 0; p <= pts; p++) {
          const nx = p / pts;
          const x = nx * width;
          const waveOffset = Math.sin(x * waveFreq + t * (0.32 + normW * 0.45) + w * 1.3) * waveAmp +
                             Math.cos(x * waveFreq * 1.8 - t * 0.25) * (waveAmp * 0.3);
          const y = lineY + waveOffset;
          if (p === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.strokeStyle = \`rgba(40, 22, 48, \${0.28 + normW * 0.28})\`;
        ctx.lineWidth = 0.8 + normW * 1.2;
        ctx.stroke();

        // Subtle, Smooth Golden Specular Shimmer on Wave Crests
        const glitterCount = Math.floor(16 + normW * 26);
        const spread = (width * 0.12 + normW * width * 0.40) * glitterSpread;

        for (let g = 0; g < glitterCount; g++) {
          const u = (Math.random() - 0.5) * 2;
          const gx = sunX + u * spread * (Math.random() * 0.7 + 0.3);
          const gy = lineY + (Math.random() - 0.5) * (waveAmp * 1.2);

          const dist = Math.abs(gx - sunX) / spread;
          const gaussianFalloff = Math.exp(-dist * dist * 1.4);

          const shimmer = Math.sin(t * 0.8 + g * 1.7 + normW * 4.2);
          if (shimmer > 0.15) {
            const alpha = Math.pow((shimmer - 0.15) / 0.85, 1.6) * gaussianFalloff * (0.42 - normW * 0.10);
            const size = (0.75 + (1 - normW) * 1.4) * (shimmer * 0.6 + 0.4);

            ctx.fillStyle = \`rgba(255, 220, 145, \${alpha * 0.8})\`;
            ctx.beginPath();
            ctx.arc(gx, gy, size, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }
    }
  };
}

const defaultParams = [
  { key: "speed", label: "Sunset Animation Speed", type: "range", min: 0.2, max: 2.5, step: 0.1, defaultValue: 1.0 },
  { key: "rayIntensity", label: "Crepuscular Ray Intensity", type: "range", min: 0.4, max: 2.5, step: 0.1, defaultValue: 1.2 },
  { key: "cloudDensity", label: "Cloud Occlusion Turbulence", type: "range", min: 0.2, max: 2.0, step: 0.1, defaultValue: 1.0 },
  { key: "glitterSpread", label: "Ocean Glitter Path Width", type: "range", min: 0.5, max: 2.0, step: 0.1, defaultValue: 1.0 },
  { key: "sunHeight", label: "Solar Elevation Ratio", type: "range", min: 0.2, max: 0.55, step: 0.02, defaultValue: 0.38 }
];

if (!window.__art_instances) window.__art_instances = {};
if (!window.__art_instances['crepuscular-sunset-rays']) {
  const inst = typeof createCrepuscularSunsetRays === 'function' ? createCrepuscularSunsetRays() : null;
  if (inst && inst.setup) {
    inst.setup({ ctx, width, height, dpr: 1, aspectRatio: width / height }, defaultParams);
  }
  window.__art_instances['crepuscular-sunset-rays'] = inst;
}

const instance = window.__art_instances['crepuscular-sunset-rays'];
if (instance && instance.render) {
  instance.render(
    { ctx, width, height, dpr: 1, aspectRatio: width / height },
    { time, deltaTime: dt, frameCount: Math.floor(time * 60), fps: 60 },
    defaultParams
  );
}`,

  // 080. Underwater Oceanic Sunbeams
  'underwater-oceanic-sunbeams': `// 080 - Underwater Oceanic Sunbeams (physics)
// 1:1 Original algorithm engine source
function createUnderwaterOceanicSunbeams() {
  const MARINE_SNOW_COUNT = 90;
  const FISH_COUNT = 45;
  const marineSnow = [];
  const fishSchool = [];

  function initOcean() {
    marineSnow.length = 0;
    for (let i = 0; i < MARINE_SNOW_COUNT; i++) {
      marineSnow.push({
        x: Math.random(),
        y: Math.random(),
        vx: (Math.random() - 0.5) * 0.0006,
        vy: 0.0003 + Math.random() * 0.0007,
        size: 0.8 + Math.random() * 2.0,
        phase: Math.random() * Math.PI * 2,
      });
    }

    fishSchool.length = 0;
    for (let i = 0; i < FISH_COUNT; i++) {
      const randType = Math.random();
      let fSize;
      let isLarge = false;
      if (randType < 0.18) {
        fSize = 16.0 + Math.random() * 10.0;
        isLarge = true;
      } else if (randType < 0.5) {
        fSize = 8.5 + Math.random() * 6.5;
      } else {
        fSize = 3.8 + Math.random() * 4.2;
      }
      fishSchool.push({
        x: Math.random(),
        y: 0.32 + Math.random() * 0.54,
        speed: (0.0006 + Math.random() * 0.0012) * (isLarge ? 0.75 : 1.1),
        size: fSize,
        phase: Math.random() * Math.PI * 2,
        depth: Math.random(),
        isLarge,
      });
    }
  }

  return {
    setup() {
      initOcean();
    },
    render(context, timeState, params) {
      const { ctx, width, height } = context;
      const speed = Number(params.speed ?? 1.0);
      const shaftIntensity = Number(params.shaftIntensity ?? 1.2);
      const waterClarity = Number(params.waterClarity ?? 1.0);
      const causticSpeed = Number(params.causticSpeed ?? 1.3);
      const kelpHeight = Number(params.kelpHeight ?? 1.0);

      const t = timeState.time * speed;
      if (marineSnow.length === 0) initOcean();

      // Deep Ocean Water
      const waterGrad = ctx.createLinearGradient(0, 0, 0, height);
      waterGrad.addColorStop(0, '#044368');
      waterGrad.addColorStop(0.25, '#022949');
      waterGrad.addColorStop(0.6, '#01162d');
      waterGrad.addColorStop(1.0, '#000814');
      ctx.fillStyle = waterGrad;
      ctx.fillRect(0, 0, width, height);

      const lightX = width * 0.5 + Math.sin(t * 0.3) * (width * 0.04);
      const lightY = height * 0.08;

      // 2. Surface Caustics & Water Ripple Band (Soft, Gentle Refraction)
      ctx.save();
      ctx.globalCompositeOperation = 'screen';
      const CAUSTIC_CURVES = 14;
      for (let c = 0; c < CAUSTIC_CURVES; c++) {
        const normC = c / CAUSTIC_CURVES;
        const cy0 = normC * (height * 0.10);
        ctx.beginPath();
        const steps = 60;
        for (let s = 0; s <= steps; s++) {
          const nx = s / steps;
          const x = nx * width;
          const wave1 = Math.sin(nx * 14 + t * causticSpeed * 0.7 + c) * 5;
          const wave2 = Math.cos(nx * 24 - t * causticSpeed * 0.5) * 3;
          const y = cy0 + wave1 + wave2;
          if (s === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        const causticAlpha = (1 - normC) * 0.18 * waterClarity;
        ctx.strokeStyle = \`rgba(160, 230, 255, \${causticAlpha})\`;
        ctx.lineWidth = 1.0 + (1 - normC) * 1.5;
        ctx.stroke();
      }
      ctx.restore();

      // Volumetric Sun Shafts
      ctx.save();
      ctx.globalCompositeOperation = 'screen';
      const SHAFT_COUNT = 38;
      const maxShaftLen = height * 1.25;

      for (let i = 0; i < SHAFT_COUNT; i++) {
        const normI = i / SHAFT_COUNT;
        const baseAngle = Math.PI * 0.18 + normI * (Math.PI * 0.64);
        const waveWarp = Math.sin(baseAngle * 7 + t * 0.8) * 0.05 + Math.cos(baseAngle * 13 - t * 1.1) * 0.03;
        const shaftAngle = baseAngle + waveWarp;
        const distFromCenter = Math.abs(normI - 0.5) * 2;
        const beamIntensity = Math.pow(Math.max(0, 1 - distFromCenter * 0.8), 1.8);
        const pulse = 0.65 + 0.35 * Math.sin(i * 2.3 + t * 1.8);
        const alpha = Math.min(0.65, 0.32 * beamIntensity * pulse * shaftIntensity);

        if (alpha > 0.02) {
          const beamWidth = 0.035 + (1 - beamIntensity) * 0.02;
          const shaftGrad = ctx.createRadialGradient(lightX, lightY, 0, lightX, lightY, maxShaftLen);
          shaftGrad.addColorStop(0, \`rgba(255, 255, 255, \${alpha * 1.4})\`);
          shaftGrad.addColorStop(0.12, \`rgba(190, 245, 255, \${alpha})\`);
          shaftGrad.addColorStop(0.45, \`rgba(40, 180, 230, \${alpha * 0.45})\`);
          shaftGrad.addColorStop(0.85, \`rgba(10, 80, 150, \${alpha * 0.15})\`);
          shaftGrad.addColorStop(1.0, 'rgba(0, 30, 80, 0)');

          ctx.beginPath();
          ctx.moveTo(lightX, lightY);
          ctx.lineTo(lightX + Math.cos(shaftAngle - beamWidth) * maxShaftLen, lightY + Math.sin(shaftAngle - beamWidth) * maxShaftLen);
          ctx.lineTo(lightX + Math.cos(shaftAngle + beamWidth) * maxShaftLen, lightY + Math.sin(shaftAngle + beamWidth) * maxShaftLen);
          ctx.closePath();
          ctx.fillStyle = shaftGrad;
          ctx.fill();
        }
      }
      ctx.restore();

      // Core Glare
      ctx.save();
      ctx.globalCompositeOperation = 'screen';
      const sunCoreGrad = ctx.createRadialGradient(lightX, lightY, 0, lightX, lightY, width * 0.4);
      sunCoreGrad.addColorStop(0, 'rgba(255, 255, 255, 1.0)');
      sunCoreGrad.addColorStop(0.08, 'rgba(220, 250, 255, 0.9)');
      sunCoreGrad.addColorStop(0.28, 'rgba(80, 210, 255, 0.45)');
      sunCoreGrad.addColorStop(1.0, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = sunCoreGrad;
      ctx.beginPath();
      ctx.arc(lightX, lightY, width * 0.4, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // Fish School
      for (let f = 0; f < fishSchool.length; f++) {
        const fish = fishSchool[f];
        fish.x = (fish.x + fish.speed + 1) % 1;
        const fx = fish.x * width;
        const fy = fish.y * height + Math.sin(t * 2.2 + fish.phase) * (fish.isLarge ? 8 : 4);
        const distFromLight = Math.abs(fx - lightX) / (width * 0.45);
        const inBeamFactor = Math.max(0, 1 - distFromLight);
        const hue = inBeamFactor > 0.35 ? 42 + (1 - inBeamFactor) * 55 : 188;

        ctx.save();
        ctx.fillStyle = \`hsla(\${hue}, 95%, \${inBeamFactor > 0.35 ? 65 : 35}%, 0.85)\`;
        ctx.beginPath();
        ctx.ellipse(fx, fy, fish.size, fish.size * 0.42, 0, 0, Math.PI * 2);
        ctx.fill();

        const tailWag = Math.sin(t * (fish.isLarge ? 9 : 15) + fish.phase) * (fish.size * 0.35);
        ctx.beginPath();
        ctx.moveTo(fx - fish.size * 0.75, fy);
        ctx.lineTo(fx - fish.size * 1.6, fy - fish.size * 0.45 + tailWag);
        ctx.lineTo(fx - fish.size * 1.6, fy + fish.size * 0.45 + tailWag);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
      }
    }
  };
}

const defaultParams = [
  { key: "speed", label: "Ocean Current Cadence", type: "range", min: 0.2, max: 2.5, step: 0.1, defaultValue: 1.0 },
  { key: "shaftIntensity", label: "Cathedral Sunbeam Intensity", type: "range", min: 0.4, max: 2.2, step: 0.1, defaultValue: 1.2 },
  { key: "waterClarity", label: "Water Optical Clarity", type: "range", min: 0.3, max: 2.0, step: 0.1, defaultValue: 1.0 },
  { key: "causticSpeed", label: "Surface Caustic Refraction", type: "range", min: 0.4, max: 2.5, step: 0.1, defaultValue: 1.3 },
  { key: "kelpHeight", label: "Kelp Canopy Elevation", type: "range", min: 0.4, max: 1.6, step: 0.1, defaultValue: 1.0 }
];

if (!window.__art_instances) window.__art_instances = {};
if (!window.__art_instances['underwater-oceanic-sunbeams']) {
  const inst = typeof createUnderwaterOceanicSunbeams === 'function' ? createUnderwaterOceanicSunbeams() : null;
  if (inst && inst.setup) {
    inst.setup({ ctx, width, height, dpr: 1, aspectRatio: width / height }, defaultParams);
  }
  window.__art_instances['underwater-oceanic-sunbeams'] = inst;
}

const instance = window.__art_instances['underwater-oceanic-sunbeams'];
if (instance && instance.render) {
  instance.render(
    { ctx, width, height, dpr: 1, aspectRatio: width / height },
    { time, deltaTime: dt, frameCount: Math.floor(time * 60), fps: 60 },
    defaultParams
  );
}`,

  // 081. Atmospheric Cloudbreak God Rays
  'atmospheric-cloudbreak-godrays': `// 081 - Atmospheric Cloudbreak God Rays (physics)
// 1:1 Original algorithm engine source
function createAtmosphericCloudbreakGodrays() {
  const AEROSOL_COUNT = 100;
  const aerosols = [];

  function initAerosols() {
    aerosols.length = 0;
    for (let i = 0; i < AEROSOL_COUNT; i++) {
      aerosols.push({
        x: Math.random(),
        y: Math.random(),
        vx: (Math.random() - 0.5) * 0.0008,
        vy: -0.0003 - Math.random() * 0.0006,
        r: 0.6 + Math.random() * 2.2,
        phase: Math.random() * Math.PI * 2,
      });
    }
  }

  return {
    setup() {
      initAerosols();
    },
    render(context, timeState, params) {
      const { ctx, width, height } = context;
      const speed = Number(params.speed ?? 1.0);
      const beamSharpness = Number(params.beamSharpness ?? 1.3);
      const cloudContrast = Number(params.cloudContrast ?? 1.1);
      const sunAngle = Number(params.sunAngle ?? 0.0);
      const scatteringAerosol = Number(params.scatteringAerosol ?? 1.0);

      const t = timeState.time * speed;
      if (aerosols.length === 0) initAerosols();

      const sunX = width * 0.5 + Math.sin(sunAngle) * (width * 0.25);
      const sunY = height * 0.35;

      // Sky Background
      const skyGrad = ctx.createRadialGradient(sunX, sunY, 0, sunX, sunY, Math.hypot(width, height));
      skyGrad.addColorStop(0, '#5a3d1b');
      skyGrad.addColorStop(0.25, '#2e2528');
      skyGrad.addColorStop(0.55, '#191924');
      skyGrad.addColorStop(1.0, '#0c0d14');
      ctx.fillStyle = skyGrad;
      ctx.fillRect(0, 0, width, height);

      // Sun Halo
      ctx.save();
      const sunFlare = ctx.createRadialGradient(sunX, sunY, 0, sunX, sunY, width * 0.55);
      sunFlare.addColorStop(0, 'rgba(255, 255, 250, 1.0)');
      sunFlare.addColorStop(0.06, 'rgba(255, 240, 180, 0.9)');
      sunFlare.addColorStop(0.2, 'rgba(255, 180, 70, 0.45)');
      sunFlare.addColorStop(0.5, 'rgba(180, 80, 20, 0.15)');
      sunFlare.addColorStop(1.0, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = sunFlare;
      ctx.beginPath();
      ctx.arc(sunX, sunY, width * 0.55, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // Mie Godrays
      ctx.save();
      ctx.globalCompositeOperation = 'screen';
      const RAY_BEAMS = 54;
      const maxRayDist = Math.hypot(width, height) * 0.95;

      for (let i = 0; i < RAY_BEAMS; i++) {
        const normI = i / RAY_BEAMS;
        const baseTheta = normI * Math.PI * 2;
        const downwardFactor = Math.sin(baseTheta);
        if (downwardFactor < -0.2) continue;

        const gap1 = Math.sin(baseTheta * 8.0 + t * 0.5) * 0.06;
        const gap2 = Math.cos(baseTheta * 15.0 - t * 0.8) * 0.04;
        const theta = baseTheta + (gap1 + gap2) * (2.0 - cloudContrast);
        const forwardWeight = Math.pow(Math.max(0, (downwardFactor + 0.2) / 1.2), 1.4);
        const dynamicIntensity = 0.6 + 0.4 * Math.sin(i * 3.7 + t * 2.0);
        const rayAlpha = Math.min(0.7, 0.42 * forwardWeight * dynamicIntensity * beamSharpness);

        if (rayAlpha > 0.02) {
          const halfWidth = 0.04 / beamSharpness;
          const beamGrad = ctx.createRadialGradient(sunX, sunY, 0, sunX, sunY, maxRayDist);
          beamGrad.addColorStop(0, \`rgba(255, 255, 240, \${rayAlpha * 1.4})\`);
          beamGrad.addColorStop(0.15, \`rgba(255, 225, 140, \${rayAlpha})\`);
          beamGrad.addColorStop(0.5, \`rgba(240, 140, 50, \${rayAlpha * 0.45})\`);
          beamGrad.addColorStop(1.0, 'rgba(100, 30, 10, 0)');

          ctx.beginPath();
          ctx.moveTo(sunX, sunY);
          ctx.lineTo(sunX + Math.cos(theta - halfWidth) * maxRayDist, sunY + Math.sin(theta - halfWidth) * maxRayDist);
          ctx.lineTo(sunX + Math.cos(theta + halfWidth) * maxRayDist, sunY + Math.sin(theta + halfWidth) * maxRayDist);
          ctx.closePath();
          ctx.fillStyle = beamGrad;
          ctx.fill();
        }
      }
      ctx.restore();

      // Cloud Clusters
      ctx.save();
      for (let c = 0; c < 5; c++) {
        const cxCenter = width * (0.2 + (c / 5) * 0.6) + Math.sin(t * 0.2 + c) * 30;
        const cyCenter = height * (0.2 + (c % 3) * 0.18);
        for (let p = 0; p < 12; p++) {
          const pAng = (p / 12) * Math.PI * 2;
          const pDist = 35 + Math.sin(p * 3 + t * 0.4) * 15;
          const px = cxCenter + Math.cos(pAng) * pDist * 1.8;
          const py = cyCenter + Math.sin(pAng) * pDist * 0.9;
          const pRadius = 45 + Math.cos(p * 2 + c) * 18;
          const distToSun = Math.hypot(px - sunX, py - sunY);
          const rimFactor = Math.max(0, 1 - distToSun / (width * 0.45));

          const cloudGrad = ctx.createRadialGradient(px, py, pRadius * 0.2, px, py, pRadius);
          cloudGrad.addColorStop(0, \`rgba(32, 26, 36, \${0.9 * cloudContrast})\`);
          cloudGrad.addColorStop(0.7, \`rgba(20, 16, 25, \${0.95 * cloudContrast})\`);
          cloudGrad.addColorStop(1.0, \`rgba(255, 200, 100, \${rimFactor * 0.45})\`);

          ctx.fillStyle = cloudGrad;
          ctx.beginPath();
          ctx.arc(px, py, pRadius, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      ctx.restore();
    }
  };
}

const defaultParams = [
  { key: "speed", label: "Atmospheric Cloud Motion", type: "range", min: 0.2, max: 2.5, step: 0.1, defaultValue: 1.0 },
  { key: "beamSharpness", label: "Ray Collimation Sharpness", type: "range", min: 0.5, max: 2.5, step: 0.1, defaultValue: 1.3 },
  { key: "cloudContrast", label: "Cumulus Edge Rim Glow", type: "range", min: 0.4, max: 1.8, step: 0.1, defaultValue: 1.1 },
  { key: "sunAngle", label: "Solar Zenith Inclination", type: "range", min: -0.6, max: 0.6, step: 0.05, defaultValue: 0.0 },
  { key: "scatteringAerosol", label: "Atmospheric Mote Density", type: "range", min: 0.3, max: 2.2, step: 0.1, defaultValue: 1.0 }
];

if (!window.__art_instances) window.__art_instances = {};
if (!window.__art_instances['atmospheric-cloudbreak-godrays']) {
  const inst = typeof createAtmosphericCloudbreakGodrays === 'function' ? createAtmosphericCloudbreakGodrays() : null;
  if (inst && inst.setup) {
    inst.setup({ ctx, width, height, dpr: 1, aspectRatio: width / height }, defaultParams);
  }
  window.__art_instances['atmospheric-cloudbreak-godrays'] = inst;
}

const instance = window.__art_instances['atmospheric-cloudbreak-godrays'];
if (instance && instance.render) {
  instance.render(
    { ctx, width, height, dpr: 1, aspectRatio: width / height },
    { time, deltaTime: dt, frameCount: Math.floor(time * 60), fps: 60 },
    defaultParams
  );
}`,

  // 082. Solar Corona & Flare Prominence
  'solar-corona-flare': `// 082 - Solar Corona & Flare Prominence (physics)
// 1:1 Original algorithm engine source
function createSolarCoronaFlare() {
  const PROMINENCE_LOOPS = 28;
  const loopPhases = [];

  function initLoops() {
    loopPhases.length = 0;
    for (let i = 0; i < PROMINENCE_LOOPS; i++) {
      loopPhases.push({
        angle: (i / PROMINENCE_LOOPS) * Math.PI * 2 + (Math.random() - 0.5) * 0.2,
        span: 0.15 + Math.random() * 0.35,
        height: 25 + Math.random() * 65,
        speed: 0.4 + Math.random() * 0.8,
        phase: Math.random() * Math.PI * 2,
      });
    }
  }

  return {
    setup() {
      initLoops();
    },
    render(context, timeState, params) {
      const { ctx, width, height } = context;
      const speed = Number(params.speed ?? 1.0);
      const solarActivity = Number(params.solarActivity ?? 1.2);
      const loopDensity = Number(params.loopDensity ?? 1.0);
      const coronaRadiusParam = Number(params.coronaRadius ?? 1.0);
      const flareIntensity = Number(params.flareIntensity ?? 1.3);

      const t = timeState.time * speed;
      if (loopPhases.length === 0) initLoops();

      const cx = width * 0.5;
      const cy = height * 0.5;
      const baseR = Math.min(width, height) * 0.19 * coronaRadiusParam;

      ctx.fillStyle = '#050407';
      ctx.fillRect(0, 0, width, height);

      // Extended Outer Solar Corona Streamers
      ctx.save();
      ctx.globalCompositeOperation = 'screen';
      const STREAMER_RAYS = 64;
      const maxStreamerLen = Math.min(width, height) * 0.48;

      for (let i = 0; i < STREAMER_RAYS; i++) {
        const theta = (i / STREAMER_RAYS) * Math.PI * 2;
        const rayAngle = theta + Math.sin(theta * 6.0 + t * 1.5) * 0.08 + Math.cos(theta * 14.0 - t * 2.2) * 0.04;
        const pulse = 0.6 + 0.4 * Math.sin(i * 3.1 + t * 2.5 * solarActivity);
        const rayLen = baseR + (maxStreamerLen - baseR) * (0.6 + 0.4 * Math.sin(theta * 3 + t));
        const alpha = Math.min(0.55, 0.28 * pulse * flareIntensity);

        const streamerGrad = ctx.createRadialGradient(cx, cy, baseR * 0.8, cx, cy, rayLen);
        streamerGrad.addColorStop(0, \`rgba(255, 235, 160, \${alpha * 1.3})\`);
        streamerGrad.addColorStop(0.25, \`rgba(255, 140, 40, \${alpha})\`);
        streamerGrad.addColorStop(0.65, \`rgba(210, 50, 15, \${alpha * 0.35})\`);
        streamerGrad.addColorStop(1.0, 'rgba(80, 10, 5, 0)');

        ctx.beginPath();
        ctx.moveTo(cx + Math.cos(rayAngle - 0.045) * baseR, cy + Math.sin(rayAngle - 0.045) * baseR);
        ctx.lineTo(cx + Math.cos(rayAngle) * rayLen, cy + Math.sin(rayAngle) * rayLen);
        ctx.lineTo(cx + Math.cos(rayAngle + 0.045) * baseR, cy + Math.sin(rayAngle + 0.045) * baseR);
        ctx.closePath();
        ctx.fillStyle = streamerGrad;
        ctx.fill();
      }
      ctx.restore();

      // Magnetic Coronal Plasma Loops
      ctx.save();
      ctx.globalCompositeOperation = 'screen';
      const activeLoops = Math.floor(PROMINENCE_LOOPS * loopDensity);
      for (let l = 0; l < activeLoops; l++) {
        const loop = loopPhases[l];
        const a1 = loop.angle - loop.span * 0.5;
        const a2 = loop.angle + loop.span * 0.5;
        const loopHeightDynamic = loop.height * (0.75 + 0.25 * Math.sin(t * loop.speed + loop.phase)) * solarActivity;

        const p1x = cx + Math.cos(a1) * baseR;
        const p1y = cy + Math.sin(a1) * baseR;
        const p2x = cx + Math.cos(a2) * baseR;
        const p2y = cy + Math.sin(a2) * baseR;

        const apexR = baseR + loopHeightDynamic;
        const cpx = cx + Math.cos(loop.angle) * (apexR * 1.25);
        const cpy = cy + Math.sin(loop.angle) * (apexR * 1.25);

        ctx.beginPath();
        ctx.moveTo(p1x, p1y);
        ctx.quadraticCurveTo(cpx, cpy, p2x, p2y);
        ctx.strokeStyle = \`hsla(\${20 + Math.sin(t + l) * 15}, 95%, 60%, 0.75)\`;
        ctx.lineWidth = 1.8;
        ctx.stroke();
      }
      ctx.restore();

      // Photosphere Core
      ctx.save();
      const coreGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, baseR * 1.3);
      coreGrad.addColorStop(0, '#ffffff');
      coreGrad.addColorStop(0.35, '#fff0a0');
      coreGrad.addColorStop(0.7, '#ff8010');
      coreGrad.addColorStop(1.0, 'rgba(200, 30, 0, 0)');
      ctx.fillStyle = coreGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, baseR * 1.3, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  };
}

const defaultParams = [
  { key: "speed", label: "Solar Dynamic Cadence", type: "range", min: 0.2, max: 2.5, step: 0.1, defaultValue: 1.0 },
  { key: "solarActivity", label: "MHD Prominence Activity", type: "range", min: 0.4, max: 2.2, step: 0.1, defaultValue: 1.2 },
  { key: "loopDensity", label: "Magnetic Arc Loop Count", type: "range", min: 0.3, max: 1.8, step: 0.1, defaultValue: 1.0 },
  { key: "coronaRadius", label: "Photosphere Core Scale", type: "range", min: 0.6, max: 1.5, step: 0.05, defaultValue: 1.0 },
  { key: "flareIntensity", label: "Streamer Glow Luminance", type: "range", min: 0.5, max: 2.5, step: 0.1, defaultValue: 1.3 }
];

if (!window.__art_instances) window.__art_instances = {};
if (!window.__art_instances['solar-corona-flare']) {
  const inst = typeof createSolarCoronaFlare === 'function' ? createSolarCoronaFlare() : null;
  if (inst && inst.setup) {
    inst.setup({ ctx, width, height, dpr: 1, aspectRatio: width / height }, defaultParams);
  }
  window.__art_instances['solar-corona-flare'] = inst;
}

const instance = window.__art_instances['solar-corona-flare'];
if (instance && instance.render) {
  instance.render(
    { ctx, width, height, dpr: 1, aspectRatio: width / height },
    { time, deltaTime: dt, frameCount: Math.floor(time * 60), fps: 60 },
    defaultParams
  );
}`,

  // 083. Moonlit Ocean & Lunar Rays
  'moonlit-ocean-rays': `// 083 - Moonlit Ocean & Lunar Rays (physics)
// 1:1 Original algorithm engine source
function createMoonlitOceanRays() {
  const STAR_COUNT = 130;
  const BIOLUM_COUNT = 55;
  const stars = [];
  const biolumParticles = [];

  function initNightSky() {
    stars.length = 0;
    for (let i = 0; i < STAR_COUNT; i++) {
      stars.push({
        x: Math.random(),
        y: Math.random() * 0.62,
        r: 0.4 + Math.random() * 1.4,
        phase: Math.random() * Math.PI * 2,
        isBright: Math.random() < 0.12,
      });
    }
    biolumParticles.length = 0;
    for (let i = 0; i < BIOLUM_COUNT; i++) {
      biolumParticles.push({
        x: Math.random(),
        y: 0.64 + Math.random() * 0.35,
        vx: (Math.random() - 0.5) * 0.0006,
        vy: (Math.random() - 0.5) * 0.0004,
        r: 0.8 + Math.random() * 2.0,
        phase: Math.random() * Math.PI * 2,
      });
    }
  }

  return {
    setup() {
      initNightSky();
    },
    render(context, timeState, params) {
      const { ctx, width, height } = context;
      const speed = Number(params.speed ?? 1.0);
      const beamIntensity = Number(params.beamIntensity ?? 1.2);
      const moonGlow = Number(params.moonGlow ?? 1.1);
      const oceanGlitter = Number(params.oceanGlitter ?? 1.2);
      const bioluminescence = Number(params.bioluminescence ?? 1.0);

      const t = timeState.time * speed;
      if (stars.length === 0) initNightSky();

      const moonX = width * 0.22;
      const moonY = height * 0.21;
      const moonR = Math.min(width, height) * 0.082;
      const horizonY = height * 0.62;

      // 1. Sky Gradient
      const skyGrad = ctx.createLinearGradient(0, 0, 0, horizonY);
      skyGrad.addColorStop(0, '#010308');
      skyGrad.addColorStop(0.35, '#030818');
      skyGrad.addColorStop(0.7, '#06132c');
      skyGrad.addColorStop(1.0, '#0a1d3d');
      ctx.fillStyle = skyGrad;
      ctx.fillRect(0, 0, width, horizonY);

      // 2. Stars
      ctx.save();
      for (let s = 0; s < stars.length; s++) {
        const star = stars[s];
        const sx = star.x * width;
        const sy = star.y * horizonY;
        if (Math.hypot(sx - moonX, sy - moonY) < moonR * 1.8) continue;
        const twinkle = 0.35 + 0.65 * Math.pow(Math.sin(t * 2.2 + star.phase), 2);
        ctx.fillStyle = \`rgba(220, 240, 255, \${twinkle * (star.isBright ? 0.95 : 0.65)})\`;
        ctx.beginPath();
        ctx.arc(sx, sy, star.r * (star.isBright ? 1.2 : 0.8), 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();

      // 3. Subtle & Dreamy Atmospheric Moonbeams
      ctx.save();
      ctx.globalCompositeOperation = 'screen';
      const RAY_COUNT = 12;
      const maxRayDist = Math.hypot(width, height) * 1.15;

      for (let i = 0; i < RAY_COUNT; i++) {
        const normI = i / RAY_COUNT;
        const baseAngle = -Math.PI * 0.02 + normI * (Math.PI * 0.44);
        const waveMod = Math.sin(baseAngle * 4.0 + t * 0.2) * 0.05;
        const rayAngle = baseAngle + waveMod;
        const angleDiff = Math.abs(rayAngle - Math.PI * 0.20);
        const centralFactor = Math.pow(Math.max(0, 1 - angleDiff / (Math.PI * 0.3)), 1.4);
        const pulse = 0.75 + 0.25 * Math.sin(i * 1.8 + t * 0.9);
        const beamAlpha = Math.min(0.18, 0.08 * centralFactor * pulse * beamIntensity);

        if (beamAlpha > 0.008) {
          const spreadWidth = 0.085 + (1 - centralFactor) * 0.045;
          const moonbeamGrad = ctx.createRadialGradient(moonX, moonY, moonR * 0.8, moonX, moonY, maxRayDist);
          moonbeamGrad.addColorStop(0, \`rgba(215, 238, 255, \${beamAlpha * 1.1})\`);
          moonbeamGrad.addColorStop(0.25, \`rgba(130, 195, 255, \${beamAlpha * 0.7})\`);
          moonbeamGrad.addColorStop(0.65, \`rgba(40, 110, 190, \${beamAlpha * 0.25})\`);
          moonbeamGrad.addColorStop(1.0, 'rgba(0, 10, 30, 0)');

          ctx.beginPath();
          ctx.moveTo(moonX, moonY);
          ctx.lineTo(moonX + Math.cos(rayAngle - spreadWidth) * maxRayDist, moonY + Math.sin(rayAngle - spreadWidth) * maxRayDist);
          ctx.lineTo(moonX + Math.cos(rayAngle + spreadWidth) * maxRayDist, moonY + Math.sin(rayAngle + spreadWidth) * maxRayDist);
          ctx.closePath();
          ctx.fillStyle = moonbeamGrad;
          ctx.fill();
        }
      }
      ctx.restore();

      // 4. Lunar Atmospheric Halo
      ctx.save();
      ctx.globalCompositeOperation = 'screen';
      const haloGrad = ctx.createRadialGradient(moonX, moonY, moonR * 0.9, moonX, moonY, width * 0.38);
      haloGrad.addColorStop(0, \`rgba(215, 238, 255, \${0.28 * moonGlow})\`);
      haloGrad.addColorStop(0.2, \`rgba(130, 190, 250, \${0.14 * moonGlow})\`);
      haloGrad.addColorStop(0.5, \`rgba(30, 85, 160, \${0.04 * moonGlow})\`);
      haloGrad.addColorStop(1.0, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = haloGrad;
      ctx.beginPath();
      ctx.arc(moonX, moonY, width * 0.38, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // 5. Realistic Moon Disk
      ctx.save();
      ctx.beginPath();
      ctx.arc(moonX, moonY, moonR, 0, Math.PI * 2);
      ctx.clip();
      const baseMoonGrad = ctx.createRadialGradient(moonX - moonR * 0.3, moonY - moonR * 0.3, moonR * 0.1, moonX, moonY, moonR);
      baseMoonGrad.addColorStop(0, '#ffffff');
      baseMoonGrad.addColorStop(0.3, '#f0f5fa');
      baseMoonGrad.addColorStop(0.55, '#dbe4ee');
      baseMoonGrad.addColorStop(0.85, '#b4c4d6');
      baseMoonGrad.addColorStop(1.0, '#7f93a8');
      ctx.fillStyle = baseMoonGrad;
      ctx.fillRect(moonX - moonR, moonY - moonR, moonR * 2, moonR * 2);
      ctx.restore();

      // 6. Night Ocean & Gentle Shimmering Reflection
      const oceanH = height - horizonY;
      const oceanGrad = ctx.createLinearGradient(0, horizonY, 0, height);
      oceanGrad.addColorStop(0, '#030a17');
      oceanGrad.addColorStop(0.3, '#040d20');
      oceanGrad.addColorStop(0.65, '#020714');
      oceanGrad.addColorStop(1.0, '#010308');
      ctx.fillStyle = oceanGrad;
      ctx.fillRect(0, horizonY, width, oceanH);

      const WAVE_LINES = 28;
      for (let w = 0; w < WAVE_LINES; w++) {
        const normW = w / WAVE_LINES;
        const lineY = horizonY + Math.pow(normW, 1.4) * oceanH;
        const waveAmp = 0.6 + normW * 4.0;
        const waveFreq = 0.028 - normW * 0.015;

        ctx.beginPath();
        for (let p = 0; p <= 80; p++) {
          const nx = p / 80;
          const x = nx * width;
          const waveOffset = Math.sin(x * waveFreq + t * (0.32 + normW * 0.45) + w * 1.2) * waveAmp;
          const y = lineY + waveOffset;
          if (p === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.strokeStyle = \`rgba(20, 52, 95, \${0.3 + normW * 0.3})\`;
        ctx.lineWidth = 0.8 + normW * 1.2;
        ctx.stroke();

        const glitterCount = Math.floor(18 + normW * 26);
        const wakeCenterX = moonX + normW * (width * 0.20);
        const spreadWidth = (width * 0.24 + normW * width * 0.54) * oceanGlitter;

        for (let g = 0; g < glitterCount; g++) {
          const u = (Math.random() - 0.5) * 2;
          const gx = wakeCenterX + u * spreadWidth * (Math.random() * 0.7 + 0.3);
          const gy = lineY + (Math.random() - 0.5) * (waveAmp * 1.2);
          const dist = Math.abs(gx - wakeCenterX) / spreadWidth;
          const gaussianFalloff = Math.exp(-dist * dist * 1.3);

          const shimmer = Math.sin(t * 0.75 + g * 1.7 + normW * 4.2);
          if (shimmer > 0.15) {
            const alpha = Math.pow((shimmer - 0.15) / 0.85, 1.6) * gaussianFalloff * (0.42 - normW * 0.10);
            ctx.fillStyle = \`rgba(215, 238, 255, \${alpha * 0.75})\`;
            ctx.beginPath();
            ctx.arc(gx, gy, (0.7 + (1 - normW) * 1.3) * (shimmer * 0.5 + 0.5), 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }
    }
  };
}

const defaultParams = [
  { key: "speed", label: "Night Sky Cadence", type: "range", min: 0.2, max: 2.5, step: 0.1, defaultValue: 1.0 },
  { key: "beamIntensity", label: "Volumetric Moonbeam Alpha", type: "range", min: 0.3, max: 2.2, step: 0.1, defaultValue: 1.2 },
  { key: "moonGlow", label: "Lunar Corona Dispersion", type: "range", min: 0.4, max: 2.0, step: 0.1, defaultValue: 1.1 },
  { key: "oceanGlitter", label: "Ocean Silver Reflection Path", type: "range", min: 0.4, max: 2.2, step: 0.1, defaultValue: 1.2 },
  { key: "bioluminescence", label: "Nocturnal Plankton Glow", type: "range", min: 0.2, max: 2.0, step: 0.1, defaultValue: 1.0 }
];

if (!window.__art_instances) window.__art_instances = {};
if (!window.__art_instances['moonlit-ocean-rays']) {
  const inst = typeof createMoonlitOceanRays === 'function' ? createMoonlitOceanRays() : null;
  if (inst && inst.setup) {
    inst.setup({ ctx, width, height, dpr: 1, aspectRatio: width / height }, defaultParams);
  }
  window.__art_instances['moonlit-ocean-rays'] = inst;
}

const instance = window.__art_instances['moonlit-ocean-rays'];
if (instance && instance.render) {
  instance.render(
    { ctx, width, height, dpr: 1, aspectRatio: width / height },
    { time, deltaTime: dt, frameCount: Math.floor(time * 60), fps: 60 },
    defaultParams
  );
}`,

  // 084. Zen Bonsai Tree
  'zen-bonsai-tree': `// 084 - Masterpiece Zen Bonsai Tree (botany)
// 1:1 Original algorithm engine source
function createZenBonsaiTree() {
  const PETAL_COUNT = 50;
  const petals = [];

  function initPetals() {
    petals.length = 0;
    for (let i = 0; i < PETAL_COUNT; i++) {
      petals.push({
        x: Math.random(),
        y: Math.random(),
        vx: 0.0002 + Math.random() * 0.0005,
        vy: 0.0004 + Math.random() * 0.0008,
        rot: Math.random() * Math.PI * 2,
        rotV: (Math.random() - 0.5) * 0.025,
        size: 1.5 + Math.random() * 2.5,
        phase: Math.random() * Math.PI * 2,
      });
    }
  }

  let branchNodes = [];
  let foliageClouds = [];

  function buildBonsaiModel() {
    branchNodes = [];
    foliageClouds = [];

    // Trunk
    branchNodes.push({
      start: { x: 0.50, y: 0.81 },
      ctrl1: { x: 0.49, y: 0.74 },
      ctrl2: { x: 0.44, y: 0.68 },
      end: { x: 0.43, y: 0.61 },
      thicknessStart: 38,
      thicknessEnd: 28,
      depth: 0.1,
      phase: 0.0,
    });
    branchNodes.push({
      start: { x: 0.43, y: 0.61 },
      ctrl1: { x: 0.42, y: 0.54 },
      ctrl2: { x: 0.48, y: 0.48 },
      end: { x: 0.51, y: 0.43 },
      thicknessStart: 28,
      thicknessEnd: 20,
      depth: 0.1,
      phase: 0.4,
    });
    branchNodes.push({
      start: { x: 0.51, y: 0.43 },
      ctrl1: { x: 0.54, y: 0.37 },
      ctrl2: { x: 0.50, y: 0.31 },
      end: { x: 0.47, y: 0.25 },
      thicknessStart: 20,
      thicknessEnd: 12,
      depth: 0.1,
      phase: 0.8,
    });
    branchNodes.push({
      start: { x: 0.47, y: 0.25 },
      ctrl1: { x: 0.45, y: 0.20 },
      ctrl2: { x: 0.49, y: 0.17 },
      end: { x: 0.50, y: 0.14 },
      thicknessStart: 12,
      thicknessEnd: 5,
      depth: 0.0,
      phase: 1.2,
    });

    // Sashi-eda Left Wings
    branchNodes.push({
      start: { x: 0.43, y: 0.60 },
      ctrl1: { x: 0.36, y: 0.62 },
      ctrl2: { x: 0.28, y: 0.65 },
      end: { x: 0.24, y: 0.63 },
      thicknessStart: 18,
      thicknessEnd: 8,
      depth: 0.15,
      phase: 0.5,
    });
    branchNodes.push({
      start: { x: 0.33, y: 0.63 },
      ctrl1: { x: 0.28, y: 0.58 },
      ctrl2: { x: 0.22, y: 0.56 },
      end: { x: 0.18, y: 0.55 },
      thicknessStart: 9,
      thicknessEnd: 4,
      depth: 0.2,
      phase: 0.8,
    });
    branchNodes.push({
      start: { x: 0.26, y: 0.64 },
      ctrl1: { x: 0.22, y: 0.68 },
      ctrl2: { x: 0.17, y: 0.69 },
      end: { x: 0.14, y: 0.68 },
      thicknessStart: 7,
      thicknessEnd: 3,
      depth: 0.1,
      phase: 1.1,
    });

    // Uke-eda Right Wings
    branchNodes.push({
      start: { x: 0.50, y: 0.48 },
      ctrl1: { x: 0.58, y: 0.49 },
      ctrl2: { x: 0.66, y: 0.53 },
      end: { x: 0.72, y: 0.51 },
      thicknessStart: 16,
      thicknessEnd: 7,
      depth: 0.2,
      phase: 1.3,
    });
    branchNodes.push({
      start: { x: 0.62, y: 0.50 },
      ctrl1: { x: 0.68, y: 0.45 },
      ctrl2: { x: 0.74, y: 0.43 },
      end: { x: 0.80, y: 0.42 },
      thicknessStart: 8,
      thicknessEnd: 4,
      depth: 0.25,
      phase: 1.6,
    });
    branchNodes.push({
      start: { x: 0.69, y: 0.52 },
      ctrl1: { x: 0.76, y: 0.56 },
      ctrl2: { x: 0.82, y: 0.56 },
      end: { x: 0.86, y: 0.54 },
      thicknessStart: 6,
      thicknessEnd: 3,
      depth: 0.15,
      phase: 1.9,
    });

    // Ushiro-eda Back Depth
    branchNodes.push({
      start: { x: 0.47, y: 0.52 },
      ctrl1: { x: 0.41, y: 0.46 },
      ctrl2: { x: 0.35, y: 0.43 },
      end: { x: 0.31, y: 0.42 },
      thicknessStart: 12,
      thicknessEnd: 5,
      depth: 0.7,
      phase: 2.2,
    });
    branchNodes.push({
      start: { x: 0.38, y: 0.45 },
      ctrl1: { x: 0.34, y: 0.38 },
      ctrl2: { x: 0.28, y: 0.36 },
      end: { x: 0.24, y: 0.37 },
      thicknessStart: 6,
      thicknessEnd: 3,
      depth: 0.75,
      phase: 2.5,
    });

    // Mid-Upper Tiers
    branchNodes.push({
      start: { x: 0.52, y: 0.37 },
      ctrl1: { x: 0.59, y: 0.34 },
      ctrl2: { x: 0.65, y: 0.32 },
      end: { x: 0.70, y: 0.30 },
      thicknessStart: 11,
      thicknessEnd: 5,
      depth: 0.3,
      phase: 2.8,
    });
    branchNodes.push({
      start: { x: 0.62, y: 0.33 },
      ctrl1: { x: 0.68, y: 0.27 },
      ctrl2: { x: 0.73, y: 0.25 },
      end: { x: 0.77, y: 0.24 },
      thicknessStart: 6,
      thicknessEnd: 3,
      depth: 0.35,
      phase: 3.1,
    });
    branchNodes.push({
      start: { x: 0.49, y: 0.32 },
      ctrl1: { x: 0.43, y: 0.29 },
      ctrl2: { x: 0.38, y: 0.27 },
      end: { x: 0.33, y: 0.26 },
      thicknessStart: 10,
      thicknessEnd: 4,
      depth: 0.3,
      phase: 3.4,
    });

    // Apex Crown
    branchNodes.push({
      start: { x: 0.48, y: 0.22 },
      ctrl1: { x: 0.42, y: 0.18 },
      ctrl2: { x: 0.39, y: 0.15 },
      end: { x: 0.38, y: 0.13 },
      thicknessStart: 7,
      thicknessEnd: 3,
      depth: 0.2,
      phase: 3.7,
    });
    branchNodes.push({
      start: { x: 0.49, y: 0.20 },
      ctrl1: { x: 0.55, y: 0.17 },
      ctrl2: { x: 0.60, y: 0.15 },
      end: { x: 0.62, y: 0.14 },
      thicknessStart: 7,
      thicknessEnd: 3,
      depth: 0.2,
      phase: 4.0,
    });

    function generateTufts(count, rx, ry) {
      const tufts = [];
      for (let i = 0; i < count; i++) {
        const u = (Math.random() - 0.5) * 2;
        const v = (Math.random() - 0.5) * 1.5;
        tufts.push({
          dx: u * rx * 0.75,
          dy: v * ry * 0.65 - ry * 0.15,
          scale: 0.7 + Math.random() * 0.55,
          angle: (Math.random() - 0.5) * 0.5,
        });
      }
      return tufts;
    }

    const cloudDefs = [
      { cx: 0.14, cy: 0.68, rx: 0.085, ry: 0.045, depth: 0.1, density: 1.2, phase: 1.1, count: 12 },
      { cx: 0.18, cy: 0.55, rx: 0.095, ry: 0.050, depth: 0.2, density: 1.3, phase: 0.8, count: 14 },
      { cx: 0.24, cy: 0.63, rx: 0.090, ry: 0.048, depth: 0.15, density: 1.25, phase: 0.5, count: 13 },
      { cx: 0.86, cy: 0.54, rx: 0.080, ry: 0.042, depth: 0.15, density: 1.15, phase: 1.9, count: 11 },
      { cx: 0.80, cy: 0.42, rx: 0.090, ry: 0.048, depth: 0.25, density: 1.3, phase: 1.6, count: 13 },
      { cx: 0.72, cy: 0.51, rx: 0.095, ry: 0.052, depth: 0.2, density: 1.35, phase: 1.3, count: 14 },
      { cx: 0.24, cy: 0.37, rx: 0.080, ry: 0.042, depth: 0.75, density: 1.1, phase: 2.5, count: 10 },
      { cx: 0.31, cy: 0.42, rx: 0.085, ry: 0.045, depth: 0.7, density: 1.15, phase: 2.2, count: 11 },
      { cx: 0.33, cy: 0.26, rx: 0.090, ry: 0.048, depth: 0.3, density: 1.25, phase: 3.4, count: 12 },
      { cx: 0.70, cy: 0.30, rx: 0.085, ry: 0.045, depth: 0.3, density: 1.2, phase: 2.8, count: 12 },
      { cx: 0.77, cy: 0.24, rx: 0.080, ry: 0.042, depth: 0.35, density: 1.15, phase: 3.1, count: 11 },
      { cx: 0.38, cy: 0.13, rx: 0.075, ry: 0.040, depth: 0.2, density: 1.2, phase: 3.7, count: 10 },
      { cx: 0.62, cy: 0.14, rx: 0.075, ry: 0.040, depth: 0.2, density: 1.2, phase: 4.0, count: 10 },
      { cx: 0.50, cy: 0.11, rx: 0.110, ry: 0.055, depth: 0.05, density: 1.45, phase: 1.2, count: 18 },
    ];

    for (const cd of cloudDefs) {
      foliageClouds.push({
        center: { x: cd.cx, y: cd.cy },
        radiusX: cd.rx,
        radiusY: cd.ry,
        depth: cd.depth,
        density: cd.density,
        phase: cd.phase,
        tufts: generateTufts(cd.count, cd.rx, cd.ry),
      });
    }
  }

  return {
    setup() {
      initPetals();
      buildBonsaiModel();
    },
    render(context, timeState, params) {
      const { ctx, width, height } = context;
      const speed = Number(params.speed ?? 0.8);
      const windSway = Number(params.windSway ?? 1.0);
      const foliageDensity = Number(params.foliageDensity ?? 1.3);
      const trunkThickness = Number(params.trunkThickness ?? 1.15);
      const sunGlow = Number(params.sunGlow ?? 1.1);

      const t = timeState.time * speed;
      if (petals.length === 0) initPetals();
      if (branchNodes.length === 0) buildBonsaiModel();

      // Background
      const bgGrad = ctx.createRadialGradient(
        width * 0.5, height * 0.42, 0,
        width * 0.5, height * 0.5, Math.hypot(width, height) * 0.7
      );
      bgGrad.addColorStop(0, '#19151e');
      bgGrad.addColorStop(0.45, '#100e16');
      bgGrad.addColorStop(0.85, '#07060a');
      bgGrad.addColorStop(1.0, '#030305');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // Sun Halo
      ctx.save();
      const sunX = width * 0.52;
      const sunY = height * 0.38;
      const sunRadius = Math.min(width, height) * 0.32;
      const sunAura = ctx.createRadialGradient(sunX, sunY, sunRadius * 0.1, sunX, sunY, sunRadius * 1.6);
      sunAura.addColorStop(0, \`rgba(220, 60, 30, \${0.42 * sunGlow})\`);
      sunAura.addColorStop(0.35, \`rgba(180, 40, 25, \${0.22 * sunGlow})\`);
      sunAura.addColorStop(0.7, \`rgba(120, 20, 20, \${0.08 * sunGlow})\`);
      sunAura.addColorStop(1.0, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = sunAura;
      ctx.beginPath();
      ctx.arc(sunX, sunY, sunRadius * 1.6, 0, Math.PI * 2);
      ctx.fill();

      const coreGrad = ctx.createRadialGradient(sunX, sunY, 0, sunX, sunY, sunRadius);
      coreGrad.addColorStop(0, \`rgba(255, 120, 60, \${0.45 * sunGlow})\`);
      coreGrad.addColorStop(0.65, \`rgba(210, 50, 30, \${0.28 * sunGlow})\`);
      coreGrad.addColorStop(0.95, \`rgba(150, 25, 20, \${0.05 * sunGlow})\`);
      coreGrad.addColorStop(1.0, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = coreGrad;
      ctx.beginPath();
      ctx.arc(sunX, sunY, sunRadius, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // Pot & Moss
      const potBaseY = height * 0.88;
      const potTopY = height * 0.81;
      const potWidth = width * 0.58;
      const potLeft = (width - potWidth) * 0.5;
      const potRight = potLeft + potWidth;

      // Shadow
      ctx.save();
      const shadowGrad = ctx.createRadialGradient(width * 0.5, potBaseY + 14, 0, width * 0.5, potBaseY + 14, potWidth * 0.65);
      shadowGrad.addColorStop(0, 'rgba(0, 0, 0, 0.85)');
      shadowGrad.addColorStop(0.5, 'rgba(0, 0, 0, 0.45)');
      shadowGrad.addColorStop(1.0, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = shadowGrad;
      ctx.beginPath();
      ctx.ellipse(width * 0.5, potBaseY + 12, potWidth * 0.56, 16, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // Pot Body
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(potLeft + 16, potTopY);
      ctx.lineTo(potRight - 16, potTopY);
      ctx.quadraticCurveTo(potRight, potTopY, potRight - 8, potTopY + 14);
      ctx.lineTo(potRight - 26, potBaseY);
      ctx.quadraticCurveTo(potRight - 32, potBaseY + 6, potRight - 44, potBaseY + 6);
      ctx.lineTo(potLeft + 44, potBaseY + 6);
      ctx.quadraticCurveTo(potLeft + 32, potBaseY + 6, potLeft + 26, potBaseY);
      ctx.lineTo(potLeft + 8, potTopY + 14);
      ctx.quadraticCurveTo(potLeft, potTopY, potLeft + 16, potTopY);
      ctx.closePath();

      const potGrad = ctx.createLinearGradient(potLeft, potTopY, potRight, potBaseY);
      potGrad.addColorStop(0, '#221f26');
      potGrad.addColorStop(0.25, '#352e3c');
      potGrad.addColorStop(0.5, '#443c4d');
      potGrad.addColorStop(0.75, '#2c2532');
      potGrad.addColorStop(1.0, '#16141a');
      ctx.fillStyle = potGrad;
      ctx.fill();
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
      ctx.lineWidth = 1.2;
      ctx.stroke();

      ctx.beginPath();
      ctx.ellipse(width * 0.5, potTopY + 2, potWidth * 0.51, 9, 0, 0, Math.PI * 2);
      ctx.fillStyle = '#3c3543';
      ctx.fill();
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.25)';
      ctx.lineWidth = 1.2;
      ctx.stroke();

      ctx.fillStyle = '#151318';
      ctx.fillRect(potLeft + 36, potBaseY + 6, 20, 9);
      ctx.fillRect(potRight - 56, potBaseY + 6, 20, 9);
      ctx.restore();

      // Moss Mound
      ctx.save();
      ctx.beginPath();
      ctx.ellipse(width * 0.5, potTopY, potWidth * 0.46, 24, 0, Math.PI, 0);
      const mossGrad = ctx.createRadialGradient(width * 0.5, potTopY - 6, 12, width * 0.5, potTopY, potWidth * 0.48);
      mossGrad.addColorStop(0, '#53823d');
      mossGrad.addColorStop(0.35, '#355c27');
      mossGrad.addColorStop(0.7, '#1f3816');
      mossGrad.addColorStop(1.0, '#101e0a');
      ctx.fillStyle = mossGrad;
      ctx.fill();

      // River Stones
      const stones = [
        { x: width * 0.38, y: potTopY - 2, rx: 14, ry: 7, rot: -0.2, c: '#484440' },
        { x: width * 0.62, y: potTopY - 1, rx: 18, ry: 9, rot: 0.15, c: '#363432' },
        { x: width * 0.43, y: potTopY + 3, rx: 11, ry: 5, rot: 0.3, c: '#5a5652' },
      ];
      for (const s of stones) {
        ctx.save();
        ctx.translate(s.x, s.y);
        ctx.rotate(s.rot);
        ctx.beginPath();
        ctx.ellipse(0, 0, s.rx, s.ry, 0, 0, Math.PI * 2);
        ctx.fillStyle = s.c;
        ctx.fill();
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
        ctx.lineWidth = 0.8;
        ctx.stroke();
        ctx.restore();
      }
      ctx.restore();

      // Nebari Roots
      ctx.save();
      const rootBaseX = width * 0.50;
      const rootBaseY = potTopY - 8;
      const roots = [
        { endDx: -75, endDy: 16, ctrlDx: -45, ctrlDy: -4, w: 16 },
        { endDx: -48, endDy: 14, ctrlDx: -28, ctrlDy: -2, w: 14 },
        { endDx: -22, endDy: 12, ctrlDx: -12, ctrlDy: 0, w: 12 },
        { endDx: 18, endDy: 12, ctrlDx: 10, ctrlDy: 0, w: 12 },
        { endDx: 42, endDy: 14, ctrlDx: 25, ctrlDy: -2, w: 14 },
        { endDx: 70, endDy: 16, ctrlDx: 42, ctrlDy: -4, w: 16 },
        { endDx: -95, endDy: 18, ctrlDx: -65, ctrlDy: 2, w: 10 },
        { endDx: 90, endDy: 18, ctrlDx: 62, ctrlDy: 2, w: 10 },
      ];
      for (const r of roots) {
        ctx.beginPath();
        ctx.moveTo(rootBaseX + r.ctrlDx * 0.35, rootBaseY - 18);
        ctx.quadraticCurveTo(rootBaseX + r.ctrlDx, rootBaseY + r.ctrlDy, rootBaseX + r.endDx, rootBaseY + r.endDy);
        ctx.strokeStyle = '#22140d';
        ctx.lineWidth = r.w * trunkThickness;
        ctx.lineCap = 'round';
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(rootBaseX + r.ctrlDx * 0.35 - 2, rootBaseY - 16);
        ctx.quadraticCurveTo(rootBaseX + r.ctrlDx - 2, rootBaseY + r.ctrlDy, rootBaseX + r.endDx - 2, rootBaseY + r.endDy);
        ctx.strokeStyle = '#5a3b29';
        ctx.lineWidth = r.w * 0.38 * trunkThickness;
        ctx.stroke();
      }
      ctx.restore();

      // Trunk & Branches
      function evalBranchPoint(node, u) {
        const u1 = 1 - u;
        const sway = Math.sin(t * 1.4 + node.phase) * (4 * u * windSway);
        const swayY = Math.cos(t * 1.1 + node.phase) * (2 * u * windSway);
        const x = (u1 * u1 * u1 * node.start.x + 3 * u1 * u1 * u * node.ctrl1.x + 3 * u1 * u * u * node.ctrl2.x + u * u * u * node.end.x) * width + sway;
        const y = (u1 * u1 * u1 * node.start.y + 3 * u1 * u1 * u * node.ctrl1.y + 3 * u1 * u * u * node.ctrl2.y + u * u * u * node.end.y) * height + swayY;
        return { x, y };
      }

      const sortedBranches = [...branchNodes].sort((a, b) => b.depth - a.depth);
      ctx.save();
      for (const node of sortedBranches) {
        let prevPt = evalBranchPoint(node, 0);
        for (let s = 1; s <= 30; s++) {
          const u = s / 30;
          const curPt = evalBranchPoint(node, u);
          const w = (node.thicknessStart * (1 - u) + node.thicknessEnd * u) * trunkThickness;

          ctx.beginPath();
          ctx.moveTo(prevPt.x, prevPt.y);
          ctx.lineTo(curPt.x, curPt.y);
          ctx.strokeStyle = node.depth > 0.5 ? '#150d09' : '#22140d';
          ctx.lineWidth = w;
          ctx.lineCap = 'round';
          ctx.stroke();

          if (node.depth < 0.5) {
            ctx.beginPath();
            ctx.moveTo(prevPt.x - w * 0.18, prevPt.y - w * 0.18);
            ctx.lineTo(curPt.x - w * 0.18, curPt.y - w * 0.18);
            ctx.strokeStyle = '#5a3d2a';
            ctx.lineWidth = w * 0.35;
            ctx.stroke();
          }
          prevPt = curPt;
        }
      }

      // Shari deadwood vein
      if (branchNodes[1]) {
        ctx.beginPath();
        for (let s = 0; s <= 25; s++) {
          const u = s / 25;
          const pt = evalBranchPoint(branchNodes[1], u);
          const shariX = pt.x + (Math.sin(s * 0.8) * 3) + 2;
          const shariY = pt.y;
          if (s === 0) ctx.moveTo(shariX, shariY);
          else ctx.lineTo(shariX, shariY);
        }
        ctx.strokeStyle = 'rgba(215, 205, 190, 0.65)';
        ctx.lineWidth = 3.5 * trunkThickness;
        ctx.lineCap = 'round';
        ctx.stroke();
      }
      ctx.restore();

      // Foliage Clouds
      const sortedClouds = [...foliageClouds].sort((a, b) => b.depth - a.depth);
      for (const cloud of sortedClouds) {
        const sway = Math.sin(t * 1.4 + cloud.phase) * (4 * windSway);
        const swayY = Math.cos(t * 1.1 + cloud.phase) * (2 * windSway);
        const cx = cloud.center.x * width + sway;
        const cy = cloud.center.y * height + swayY;
        const rx = cloud.radiusX * width * (0.85 + foliageDensity * 0.15);
        const ry = cloud.radiusY * height * (0.85 + foliageDensity * 0.15);

        ctx.save();
        ctx.beginPath();
        ctx.ellipse(cx, cy + ry * 0.15, rx * 1.05, ry * 0.95, 0, 0, Math.PI * 2);
        ctx.fillStyle = cloud.depth > 0.5 ? 'rgba(5, 18, 10, 0.95)' : 'rgba(8, 28, 15, 0.95)';
        ctx.fill();

        for (const tuft of cloud.tufts) {
          const tx = cx + tuft.dx * width;
          const ty = cy + tuft.dy * height;
          const tuftScale = tuft.scale * (0.9 + foliageDensity * 0.1);
          const NEEDLES_PER_TUFT = Math.floor(32 * cloud.density * foliageDensity);

          for (let n = 0; n < NEEDLES_PER_TUFT; n++) {
            const normN = n / NEEDLES_PER_TUFT;
            const angle = -Math.PI * 0.25 + normN * (Math.PI * 1.5) + tuft.angle + (Math.sin(n * 5.3) * 0.12);
            const rDist = (0.2 + 0.8 * Math.sqrt(Math.random())) * 14 * tuftScale;
            const nx0 = tx + Math.cos(angle) * (rDist * 0.4);
            const ny0 = ty + Math.sin(angle) * (rDist * 0.4);
            const needleLen = (7 + Math.sin(n * 3.7) * 4.5) * tuftScale * (1 - cloud.depth * 0.25);
            const nx1 = nx0 + Math.cos(angle) * needleLen;
            const ny1 = ny0 + Math.sin(angle) * needleLen;

            let needleColor = cloud.depth > 0.5
              ? (n % 3 === 0 ? '#0f381f' : n % 3 === 1 ? '#164d2b' : '#0a2615')
              : (ny1 < cy - ry * 0.15
                  ? (n % 4 === 0 ? '#7fd674' : n % 4 === 1 ? '#4db857' : n % 4 === 2 ? '#a4f092' : '#308c45')
                  : (n % 3 === 0 ? '#26733a' : n % 3 === 1 ? '#1a542a' : '#123d1e'));

            ctx.beginPath();
            ctx.moveTo(nx0, ny0);
            ctx.lineTo(nx1, ny1);
            ctx.strokeStyle = needleColor;
            ctx.lineWidth = 1.15;
            ctx.stroke();
          }
        }
        ctx.restore();
      }

      // Petals
      ctx.save();
      for (let i = 0; i < petals.length; i++) {
        const pt = petals[i];
        pt.x = (pt.x + pt.vx + 1) % 1;
        pt.y = (pt.y + pt.vy + 1) % 1;
        pt.rot += pt.rotV;
        const px = pt.x * width;
        const py = pt.y * height;
        const sway = Math.sin(t * 1.8 + pt.phase) * 7;

        ctx.save();
        ctx.translate(px + sway, py);
        ctx.rotate(pt.rot);
        ctx.beginPath();
        ctx.ellipse(0, 0, pt.size * 1.9, pt.size * 0.95, 0, 0, Math.PI * 2);
        ctx.fillStyle = i % 3 === 0 ? 'rgba(255, 185, 200, 0.75)' : i % 3 === 1 ? 'rgba(255, 220, 145, 0.7)' : 'rgba(255, 245, 248, 0.85)';
        ctx.fill();
        ctx.restore();
      }
      ctx.restore();
    }
  };
}

const defaultParams = [
  { key: "windSway", label: "Breeze Sway Amplitude", type: "range", min: 0.2, max: 2.5, step: 0.1, defaultValue: 1.0 },
  { key: "foliageDensity", label: "Pine Needle Cloud Density", type: "range", min: 0.5, max: 2.2, step: 0.1, defaultValue: 1.3 },
  { key: "trunkThickness", label: "Trunk & Limb Caliber", type: "range", min: 0.5, max: 1.8, step: 0.1, defaultValue: 1.15 },
  { key: "sunGlow", label: "Zen Solar Aura Dispersion", type: "range", min: 0.3, max: 2.0, step: 0.1, defaultValue: 1.1 },
  { key: "speed", label: "Breeze Cadence", type: "range", min: 0.2, max: 2.5, step: 0.1, defaultValue: 0.8 }
];

if (!window.__art_instances) window.__art_instances = {};
if (!window.__art_instances['zen-bonsai-tree']) {
  const inst = typeof createZenBonsaiTree === 'function' ? createZenBonsaiTree() : null;
  if (inst && inst.setup) {
    inst.setup({ ctx, width, height, dpr: 1, aspectRatio: width / height }, defaultParams);
  }
  window.__art_instances['zen-bonsai-tree'] = inst;
}

const instance = window.__art_instances['zen-bonsai-tree'];
if (instance && instance.render) {
  instance.render(
    { ctx, width, height, dpr: 1, aspectRatio: width / height },
    { time, deltaTime: dt, frameCount: Math.floor(time * 60), fps: 60 },
    defaultParams
  );
}`,

  // 085. Stripe Kinetic Mesh Ribbon
  'stripe-kinetic-ribbon': `// 085 - Stripe Kinetic Mesh Ribbon (fluid)
// 1:1 Original algorithm engine source
function createStripeKineticRibbon() {
  const PALETTE = [
    { r: 56, g: 189, b: 248 },
    { r: 99, g: 102, b: 241 },
    { r: 236, g: 72, b: 153 },
    { r: 249, g: 115, b: 22 },
    { r: 251, g: 191, b: 36 },
  ];

  function getStripeColor(val, alpha = 1.0) {
    const wrapped = ((val % 1.0) + 1.0) % 1.0;
    const scaled = wrapped * (PALETTE.length - 1);
    const idx = Math.floor(scaled);
    const frac = scaled - idx;
    const c1 = PALETTE[idx];
    const c2 = PALETTE[Math.min(idx + 1, PALETTE.length - 1)];
    const r = Math.round(c1.r + (c2.r - c1.r) * frac);
    const g = Math.round(c1.g + (c2.g - c1.g) * frac);
    const b = Math.round(c1.b + (c2.b - c1.b) * frac);
    return \`rgba(\${r}, \${g}, \${b}, \${alpha})\`;
  }

  const MOTE_COUNT = 32;
  const motes = [];

  function initMotes() {
    motes.length = 0;
    for (let i = 0; i < MOTE_COUNT; i++) {
      motes.push({
        x: Math.random(),
        y: Math.random(),
        vx: 0.0002 + Math.random() * 0.0005,
        vy: 0.0002 + Math.random() * 0.0004,
        size: 1.2 + Math.random() * 2.2,
        phase: Math.random() * Math.PI * 2,
      });
    }
  }

  return {
    setup() {
      initMotes();
    },
    render(context, timeState, params) {
      const { ctx, width, height } = context;
      const speed = Number(params.speed ?? 1.0);
      const ribbonTwist = Number(params.ribbonTwist ?? 1.2);
      const streamlineDensity = Number(params.streamlineDensity ?? 1.1);
      const colorShift = Number(params.colorShift ?? 1.0);
      const ribbonWidthScale = Number(params.ribbonWidth ?? 1.1);

      const t = timeState.time * speed * 0.55;
      if (motes.length === 0) initMotes();

      // Clean Light Substrate Background
      const bgGrad = ctx.createLinearGradient(0, 0, width, height);
      bgGrad.addColorStop(0, '#fdfdfe');
      bgGrad.addColorStop(0.5, '#f6f8fc');
      bgGrad.addColorStop(1.0, '#edf1f8');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // Ambient Light Halo
      ctx.save();
      const glowGrad = ctx.createRadialGradient(
        width * 0.62, height * 0.42, width * 0.08,
        width * 0.62, height * 0.42, width * 0.7
      );
      glowGrad.addColorStop(0, 'rgba(236, 72, 153, 0.16)');
      glowGrad.addColorStop(0.35, 'rgba(99, 102, 241, 0.10)');
      glowGrad.addColorStop(0.75, 'rgba(56, 189, 248, 0.05)');
      glowGrad.addColorStop(1.0, 'rgba(255, 255, 255, 0)');
      ctx.fillStyle = glowGrad;
      ctx.fillRect(0, 0, width, height);
      ctx.restore();

      const EVAL_STEPS = 75;

      // Layer 1: Background Flow Field Streamlines
      const bgSpinePts = [];
      const bgWidth = Math.min(width, height) * 0.65 * ribbonWidthScale;

      for (let s = 0; s <= EVAL_STEPS; s++) {
        const u = s / EVAL_STEPS;
        const u1 = 1 - u;
        const p0x = width * 0.05;
        const p0y = height * -0.15;
        const p1x = width * (0.35 + Math.sin(t * 1.1) * 0.05 * ribbonTwist);
        const p1y = height * (0.18 + Math.cos(t * 0.8) * 0.04 * ribbonTwist);
        const p2x = width * (0.62 + Math.cos(t * 0.9) * 0.05 * ribbonTwist);
        const p2y = height * (0.55 + Math.sin(t * 1.0) * 0.05 * ribbonTwist);
        const p3x = width * 1.18;
        const p3y = height * 1.08;

        const bx = u1 * u1 * u1 * p0x + 3 * u1 * u1 * u * p1x + 3 * u1 * u * u * p2x + u * u * u * p3x;
        const by = u1 * u1 * u1 * p0y + 3 * u1 * u1 * u * p1y + 3 * u1 * u * u * p2y + u * u * u * p3y;
        const wave = Math.sin(u * 4.8 - t * 1.8) * (20 * ribbonTwist);
        const dx = 3 * u1 * u1 * (p1x - p0x) + 6 * u1 * u * (p2x - p1x) + 3 * u * u * (p3x - p2x);
        const dy = 3 * u1 * u1 * (p1y - p0y) + 6 * u1 * u * (p2y - p1y) + 3 * u * u * (p3y - p2y);
        const len = Math.hypot(dx, dy) || 1;
        const nx = -dy / len;
        const ny = dx / len;

        bgSpinePts.push({ x: bx + nx * wave, y: by + ny * wave, nx, ny });
      }

      const bgLines = Math.floor(320 * streamlineDensity);
      ctx.save();
      for (let i = 0; i < bgLines; i++) {
        const v = (i / (bgLines - 1) - 0.5) * 2;
        const vNorm = (v + 1) * 0.5;
        const flutePhase = i * 0.28;

        ctx.beginPath();
        for (let s = 0; s <= EVAL_STEPS; s++) {
          const u = s / EVAL_STEPS;
          const pt = bgSpinePts[s];
          const profile = Math.sin(Math.pow(u, 0.7) * Math.PI);
          const rW = bgWidth * profile * (0.9 + 0.1 * Math.sin(u * 5.0 + t));
          const microFlute = Math.sin(u * 14.0 + flutePhase + t * 1.6) * (3.0 * ribbonTwist);

          const px = pt.x + pt.nx * (v * rW * 0.5 + microFlute);
          const py = pt.y + pt.ny * (v * rW * 0.5 + microFlute);

          if (s === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }

        const colorParam = (vNorm * 0.55 + (i / bgLines) * 0.25 + t * 0.12 * colorShift) % 1.0;
        const alpha = 0.55 * (0.35 + 0.65 * Math.sin(vNorm * Math.PI)) * (0.75 + 0.25 * Math.sin(i * 1.1));

        ctx.strokeStyle = getStripeColor(colorParam, alpha);
        ctx.lineWidth = 1.15 + (1 - Math.abs(v)) * 0.6;
        ctx.stroke();
      }
      ctx.restore();

      // Layer 2: Foreground 3D Twisted Ribbon Arch (The Stripe Loop)
      const twistSpinePts = [];
      const fgWidth = Math.min(width, height) * 0.36 * ribbonWidthScale;

      for (let s = 0; s <= EVAL_STEPS; s++) {
        const u = s / EVAL_STEPS;
        const u1 = 1 - u;
        const p0x = width * (0.86 + Math.sin(t * 0.7) * 0.03);
        const p0y = height * -0.10;
        const p1x = width * (0.64 + Math.sin(t * 1.2) * 0.05 * ribbonTwist);
        const p1y = height * (0.28 + Math.cos(t * 0.9) * 0.04 * ribbonTwist);
        const p2x = width * (0.72 + Math.cos(t * 1.0) * 0.05 * ribbonTwist);
        const p2y = height * (0.68 + Math.sin(t * 1.1) * 0.04 * ribbonTwist);
        const p3x = width * (0.94 + Math.sin(t * 0.8) * 0.03);
        const p3y = height * 1.15;

        const bx = u1 * u1 * u1 * p0x + 3 * u1 * u1 * u * p1x + 3 * u1 * u * u * p2x + u * u * u * p3x;
        const by = u1 * u1 * u1 * p0y + 3 * u1 * u1 * u * p1y + 3 * u1 * u * u * p2y + u * u * u * p3y;
        const dx = 3 * u1 * u1 * (p1x - p0x) + 6 * u1 * u * (p2x - p1x) + 3 * u * u * (p3x - p2x);
        const dy = 3 * u1 * u1 * (p1y - p0y) + 6 * u1 * u * (p2y - p1y) + 3 * u * u * (p3y - p2y);
        const len = Math.hypot(dx, dy) || 1;
        const nx = -dy / len;
        const ny = dx / len;

        const twistCenter = 0.48 + Math.sin(t * 0.9) * 0.06;
        const twistSigmoid = 1.0 / (1.0 + Math.exp(-12 * (u - twistCenter)));
        const twistAngle = twistSigmoid * Math.PI + Math.sin(u * 3.5 + t * 1.5) * 0.25;
        const widthProfile = Math.sin(Math.pow(u, 0.8) * Math.PI) * (0.85 + 0.15 * Math.sin(u * 4.0 - t));

        twistSpinePts.push({ x: bx, y: by, nx, ny, twistAngle, widthProfile });
      }

      // Drop Shadow for Twisted Arch
      ctx.save();
      ctx.beginPath();
      for (let s = 0; s <= EVAL_STEPS; s++) {
        const pt = twistSpinePts[s];
        const w = fgWidth * pt.widthProfile * Math.abs(Math.cos(pt.twistAngle * 0.8));
        const sx = pt.x + pt.nx * (w * 0.5) - 25;
        const sy = pt.y + pt.ny * (w * 0.5) + 35;
        if (s === 0) ctx.moveTo(sx, sy);
        else ctx.lineTo(sx, sy);
      }
      for (let s = EVAL_STEPS; s >= 0; s--) {
        const pt = twistSpinePts[s];
        const w = fgWidth * pt.widthProfile * Math.abs(Math.cos(pt.twistAngle * 0.8));
        const sx = pt.x - pt.nx * (w * 0.5) - 25;
        const sy = pt.y - pt.ny * (w * 0.5) + 35;
        ctx.lineTo(sx, sy);
      }
      ctx.closePath();
      ctx.fillStyle = 'rgba(50, 40, 70, 0.14)';
      ctx.filter = 'blur(20px)';
      ctx.fill();
      ctx.filter = 'none';
      ctx.restore();

      // Foreground Twisted Streamlines
      const twistLines = Math.floor(360 * streamlineDensity);
      ctx.save();
      for (let i = 0; i < twistLines; i++) {
        const v = (i / (twistLines - 1) - 0.5) * 2;
        const vNorm = (v + 1) * 0.5;
        const flutePhase = i * 0.32;

        ctx.beginPath();
        for (let s = 0; s <= EVAL_STEPS; s++) {
          const u = s / EVAL_STEPS;
          const pt = twistSpinePts[s];
          const projectedScale = Math.cos(pt.twistAngle);
          const zDepth = Math.sin(pt.twistAngle);
          const rW = fgWidth * pt.widthProfile;
          const microFlute = Math.sin(u * 16.0 + flutePhase + t * 2.0) * (2.8 * ribbonTwist);

          const offsetDist = v * (rW * 0.5) * projectedScale + microFlute;
          const px = pt.x + pt.nx * offsetDist + (zDepth * 8);
          const py = pt.y + pt.ny * offsetDist - (zDepth * 6);

          if (s === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }

        const baseColorVal = 0.65 + vNorm * 0.35 + (t * 0.12 * colorShift);
        const streamAlpha = (0.75 + 0.25 * Math.sin(vNorm * Math.PI)) * (0.8 + 0.2 * Math.sin(i * 1.3));

        ctx.strokeStyle = getStripeColor(baseColorVal, streamAlpha);
        ctx.lineWidth = 1.25 + (1 - Math.abs(v)) * 0.7;
        ctx.stroke();
      }

      // Specular Crest Rim Highlight
      ctx.beginPath();
      for (let s = 0; s <= EVAL_STEPS; s++) {
        const u = s / EVAL_STEPS;
        const pt = twistSpinePts[s];
        const projectedScale = Math.cos(pt.twistAngle);
        const rW = fgWidth * pt.widthProfile;
        const px = pt.x + pt.nx * (rW * 0.5 * projectedScale);
        const py = pt.y + pt.ny * (rW * 0.5 * projectedScale);
        if (s === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.85)';
      ctx.lineWidth = 2.0;
      ctx.stroke();

      ctx.beginPath();
      for (let s = 0; s <= EVAL_STEPS; s++) {
        const u = s / EVAL_STEPS;
        const pt = twistSpinePts[s];
        const projectedScale = Math.cos(pt.twistAngle);
        const rW = fgWidth * pt.widthProfile;
        const px = pt.x - pt.nx * (rW * 0.5 * projectedScale);
        const py = pt.y - pt.ny * (rW * 0.5 * projectedScale);
        if (s === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.strokeStyle = 'rgba(255, 240, 225, 0.65)';
      ctx.lineWidth = 1.4;
      ctx.stroke();
      ctx.restore();

      // Motes
      ctx.save();
      for (let i = 0; i < motes.length; i++) {
        const m = motes[i];
        m.x = (m.x + m.vx + 1) % 1;
        m.y = (m.y + m.vy + 1) % 1;
        const mx = m.x * width;
        const my = m.y * height;
        const sparkle = 0.5 + 0.5 * Math.sin(t * 2.5 + m.phase);

        ctx.beginPath();
        ctx.arc(mx, my, m.size * (0.8 + sparkle * 0.5), 0, Math.PI * 2);
        ctx.fillStyle = i % 2 === 0
          ? \`rgba(99, 102, 241, \${0.5 * sparkle})\`
          : \`rgba(249, 115, 22, \${0.5 * sparkle})\`;
        ctx.fill();
      }
      ctx.restore();
    }
  };
}

const defaultParams = [
  { key: "ribbonTwist", label: "3D Manifold S-Curve Twist", type: "range", min: 0.4, max: 2.2, step: 0.1, defaultValue: 1.2 },
  { key: "streamlineDensity", label: "Flowline Micro-Striation Density", type: "range", min: 0.4, max: 2.0, step: 0.1, defaultValue: 1.1 },
  { key: "ribbonWidth", label: "Ribbon Swath Caliber", type: "range", min: 0.5, max: 1.8, step: 0.1, defaultValue: 1.1 },
  { key: "colorShift", label: "Spectral Wave Velocity", type: "range", min: 0.2, max: 2.5, step: 0.1, defaultValue: 1.0 },
  { key: "speed", label: "Harmonic Flow Cadence", type: "range", min: 0.2, max: 2.5, step: 0.1, defaultValue: 1.0 }
];

if (!window.__art_instances) window.__art_instances = {};
if (!window.__art_instances['stripe-kinetic-ribbon']) {
  const inst = typeof createStripeKineticRibbon === 'function' ? createStripeKineticRibbon() : null;
  if (inst && inst.setup) {
    inst.setup({ ctx, width, height, dpr: 1, aspectRatio: width / height }, defaultParams);
  }
  window.__art_instances['stripe-kinetic-ribbon'] = inst;
}

const instance = window.__art_instances['stripe-kinetic-ribbon'];
if (instance && instance.render) {
  instance.render(
    { ctx, width, height, dpr: 1, aspectRatio: width / height },
    { time, deltaTime: dt, frameCount: Math.floor(time * 60), fps: 60 },
    defaultParams
  );
}`
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
