import type { ArtRenderer, ParameterState, RenderContext, TimeState } from '../../types/engine';

// 085 - Stripe Kinetic Mesh Ribbon (Bézier Streamline Manifolds & Spectral Interpolation)
export function createStripeKineticRibbon(): ArtRenderer {
  // Stripe 5-Color Gradient Mesh Palette (RGBA tuples for ultra-fast interpolation)
  const PALETTE = [
    { r: 56, g: 189, b: 248 },  // 0.00: Cyan Sky
    { r: 99, g: 102, b: 241 },  // 0.25: Electric Indigo
    { r: 236, g: 72, b: 153 },  // 0.50: Vivid Magenta
    { r: 249, g: 115, b: 22 },  // 0.75: Sunset Orange
    { r: 251, g: 191, b: 36 },  // 1.00: Golden Amber
  ];

  function getStripeColor(val: number, alpha: number = 1.0): string {
    const wrapped = ((val % 1.0) + 1.0) % 1.0;
    const scaled = wrapped * (PALETTE.length - 1);
    const idx = Math.floor(scaled);
    const frac = scaled - idx;

    const c1 = PALETTE[idx];
    const c2 = PALETTE[Math.min(idx + 1, PALETTE.length - 1)];

    const r = Math.round(c1.r + (c2.r - c1.r) * frac);
    const g = Math.round(c1.g + (c2.g - c1.g) * frac);
    const b = Math.round(c1.b + (c2.b - c1.b) * frac);

    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }

  // Pre-allocated particle floating motes
  const MOTE_COUNT = 30;
  const motes: Array<{ x: number; y: number; vx: number; vy: number; size: number; phase: number }> = [];

  function initMotes() {
    motes.length = 0;
    for (let i = 0; i < MOTE_COUNT; i++) {
      motes.push({
        x: Math.random(),
        y: Math.random(),
        vx: 0.0003 + Math.random() * 0.0006,
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

    render(context: RenderContext, timeState: TimeState, params: ParameterState) {
      const { ctx, width, height } = context;
      const speed = Number(params.speed ?? 1.0);
      const ribbonTwist = Number(params.ribbonTwist ?? 1.1);
      const streamlineDensity = Number(params.streamlineDensity ?? 1.0);
      const colorShift = Number(params.colorShift ?? 1.0);
      const ribbonWidthScale = Number(params.ribbonWidth ?? 1.1);

      const t = timeState.time * speed * 0.6;

      if (motes.length === 0) initMotes();

      // 1. Sleek Modern Substrate Background (Stripe Clean Aesthetic with Ambient Glow)
      const bgGrad = ctx.createLinearGradient(0, 0, width, height);
      bgGrad.addColorStop(0, '#fcfdfd');
      bgGrad.addColorStop(0.5, '#f4f6fb');
      bgGrad.addColorStop(1.0, '#eef2f9');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // Subtle atmospheric colored ambient light bloom
      ctx.save();
      const glowGrad = ctx.createRadialGradient(
        width * 0.65, height * 0.45, width * 0.1,
        width * 0.65, height * 0.45, width * 0.65
      );
      glowGrad.addColorStop(0, 'rgba(236, 72, 153, 0.12)');
      glowGrad.addColorStop(0.4, 'rgba(99, 102, 241, 0.08)');
      glowGrad.addColorStop(0.8, 'rgba(56, 189, 248, 0.04)');
      glowGrad.addColorStop(1.0, 'rgba(255, 255, 255, 0)');
      ctx.fillStyle = glowGrad;
      ctx.fillRect(0, 0, width, height);
      ctx.restore();

      // 2. Ribbons Manifold Curve Generators
      // A ribbon is defined by two guiding 3D spine curves: Centerline and Orthogonal Normal Ribbon Width
      const EVAL_STEPS = 65;
      const totalStreamlines = Math.floor(450 * streamlineDensity);

      // Helper function to evaluate the primary ribbon spine at parameter u (0 <= u <= 1)
      function getSpinePoint(u: number, timeVal: number, layer: number = 0) {
        // Base diagonal path from top-center-left to bottom-right
        const startX = width * (0.08 - layer * 0.05);
        const startY = height * (-0.12 + layer * 0.08);

        const endX = width * (1.15 + layer * 0.06);
        const endY = height * (1.05 + layer * 0.04);

        // Cubic Bézier control points with harmonic wave distortion
        const p0x = startX;
        const p0y = startY;

        const p1x = width * (0.42 + Math.sin(timeVal * 1.2 + layer * 1.5) * 0.08 * ribbonTwist);
        const p1y = height * (0.15 + Math.cos(timeVal * 0.9 + layer * 1.2) * 0.06 * ribbonTwist);

        const p2x = width * (0.68 + Math.cos(timeVal * 1.1 + layer * 1.8) * 0.07 * ribbonTwist);
        const p2y = height * (0.58 + Math.sin(timeVal * 0.8 + layer * 1.4) * 0.07 * ribbonTwist);

        const p3x = endX;
        const p3y = endY;

        const u1 = 1 - u;
        const bx = u1 * u1 * u1 * p0x + 3 * u1 * u1 * u * p1x + 3 * u1 * u * u * p2x + u * u * u * p3x;
        const by = u1 * u1 * u1 * p0y + 3 * u1 * u1 * u * p1y + 3 * u1 * u * u * p2y + u * u * u * p3y;

        // Traveling harmonic wave modulation
        const wave = Math.sin(u * 5.2 - timeVal * 2.0 + layer) * (24 * ribbonTwist);
        const wave2 = Math.cos(u * 8.4 + timeVal * 1.6) * (12 * ribbonTwist);

        // Tangent vector derivative for surface normals
        const dx = 3 * u1 * u1 * (p1x - p0x) + 6 * u1 * u * (p2x - p1x) + 3 * u * u * (p3x - p2x);
        const dy = 3 * u1 * u1 * (p1y - p0y) + 6 * u1 * u * (p2y - p1y) + 3 * u * u * (p3y - p2y);
        const len = Math.hypot(dx, dy) || 1;
        const nx = -dy / len;
        const ny = dx / len;

        return {
          x: bx + nx * (wave + wave2),
          y: by + ny * (wave + wave2),
          nx,
          ny,
        };
      }

      // 3. Render 3 Layered Manifold Ribbons (Background, Mid-body, Foreground Fold)
      const layers = [
        { id: 0, widthCoeff: 0.38, alpha: 0.22, speedMult: 0.8, colorOffset: 0.3 }, // Soft Under-glow Ribbon
        { id: 1, widthCoeff: 0.52, alpha: 0.75, speedMult: 1.0, colorOffset: 0.0 }, // Main Vibrant Ribbon
        { id: 2, widthCoeff: 0.28, alpha: 0.95, speedMult: 1.15, colorOffset: 0.65 }, // Foreground Crisp Crest Fold
      ];

      for (const layer of layers) {
        const baseWidth = Math.min(width, height) * layer.widthCoeff * ribbonWidthScale;
        const layerTime = t * layer.speedMult;

        // Pre-compute spine trajectory
        const spinePts: Array<{ x: number; y: number; nx: number; ny: number }> = [];
        for (let s = 0; s <= EVAL_STEPS; s++) {
          const u = s / EVAL_STEPS;
          spinePts.push(getSpinePoint(u, layerTime, layer.id));
        }

        // 3a. Deep Ambient Drop Shadow underneath the Main Ribbon
        if (layer.id === 1) {
          ctx.save();
          ctx.beginPath();
          for (let s = 0; s <= EVAL_STEPS; s++) {
            const pt = spinePts[s];
            const u = s / EVAL_STEPS;
            const w = baseWidth * Math.sin(u * Math.PI) * 0.9;
            const sx = pt.x + pt.nx * w * 0.5 + 20;
            const sy = pt.y + pt.ny * w * 0.5 + 35;
            if (s === 0) ctx.moveTo(sx, sy);
            else ctx.lineTo(sx, sy);
          }
          for (let s = EVAL_STEPS; s >= 0; s--) {
            const pt = spinePts[s];
            const u = s / EVAL_STEPS;
            const w = baseWidth * Math.sin(u * Math.PI) * 0.9;
            const sx = pt.x - pt.nx * w * 0.5 + 20;
            const sy = pt.y - pt.ny * w * 0.5 + 35;
            ctx.lineTo(sx, sy);
          }
          ctx.closePath();
          ctx.fillStyle = 'rgba(70, 80, 110, 0.07)';
          ctx.filter = 'blur(16px)';
          ctx.fill();
          ctx.filter = 'none';
          ctx.restore();
        }

        // 3b. Render Flowline Streamlines (The iconic brushed silk striations)
        const linesInLayer = Math.floor((totalStreamlines / layers.length) * (layer.id === 1 ? 1.5 : 0.8));

        ctx.save();
        for (let i = 0; i < linesInLayer; i++) {
          const v = (i / (linesInLayer - 1) - 0.5) * 2; // -1 to 1 across ribbon width
          const vNorm = (v + 1) * 0.5; // 0 to 1

          // Micro-fluting harmonic frequency
          const fluteFreq = 12.0 + layer.id * 4.0;
          const flutePhase = i * 0.35;

          ctx.beginPath();

          for (let s = 0; s <= EVAL_STEPS; s++) {
            const u = s / EVAL_STEPS;
            const pt = spinePts[s];

            // Ribbon cross-section profile (bulbous middle, tapered tips)
            const profile = Math.sin(Math.pow(u, 0.75) * Math.PI);
            const rWidth = baseWidth * profile * (0.85 + 0.15 * Math.sin(u * 6.0 + layerTime));

            // Micro-striation jitter for iridescent fiber texture
            const microFlute = Math.sin(u * fluteFreq + flutePhase + layerTime * 1.5) * (3.5 * ribbonTwist);

            const px = pt.x + pt.nx * (v * rWidth * 0.5 + microFlute);
            const py = pt.y + pt.ny * (v * rWidth * 0.5 + microFlute);

            if (s === 0) ctx.moveTo(px, py);
            else ctx.lineTo(px, py);
          }

          // Dynamic Spectral Color Evaluation along Streamline
          const colorParam = (vNorm * 0.45 + layer.colorOffset + t * 0.15 * colorShift) % 1.0;
          const streamAlpha = layer.alpha * (0.45 + 0.55 * Math.sin(vNorm * Math.PI)) * (0.7 + 0.3 * Math.sin(i * 1.2));

          ctx.strokeStyle = getStripeColor(colorParam, streamAlpha);
          ctx.lineWidth = 1.1 + (1.0 - Math.abs(v)) * 0.8;
          ctx.stroke();
        }

        // 3c. Tubular Rim Highlight Edge Line
        ctx.beginPath();
        for (let s = 0; s <= EVAL_STEPS; s++) {
          const u = s / EVAL_STEPS;
          const pt = spinePts[s];
          const profile = Math.sin(Math.pow(u, 0.75) * Math.PI);
          const rWidth = baseWidth * profile;
          const rx = pt.x + pt.nx * (rWidth * 0.5);
          const ry = pt.y + pt.ny * (rWidth * 0.5);
          if (s === 0) ctx.moveTo(rx, ry);
          else ctx.lineTo(rx, ry);
        }
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.75)';
        ctx.lineWidth = 1.6;
        ctx.stroke();

        ctx.restore();
      }

      // 4. Subtle Ambient Floating Sparkles / Light Motes
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
          ? `rgba(99, 102, 241, ${0.45 * sparkle})`
          : `rgba(236, 72, 153, ${0.45 * sparkle})`;
        ctx.fill();
      }
      ctx.restore();
    },
  };
}
