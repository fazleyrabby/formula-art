import type { ArtRenderer, ParameterState, RenderContext, TimeState } from '../../types/engine';

// 085 - Stripe Kinetic Mesh Ribbon (Bézier Manifold Streamlines with 3D Foreground Twisted Arch)
export function createStripeKineticRibbon(): ArtRenderer {
  // Stripe 5-Color Gradient Mesh Palette (RGBA tuples for interpolation)
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

  // Floating particles
  const MOTE_COUNT = 32;
  const motes: Array<{ x: number; y: number; vx: number; vy: number; size: number; phase: number }> = [];

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

    render(context: RenderContext, timeState: TimeState, params: ParameterState) {
      const { ctx, width, height } = context;
      const speed = Number(params.speed ?? 1.0);
      const ribbonTwist = Number(params.ribbonTwist ?? 1.2);
      const streamlineDensity = Number(params.streamlineDensity ?? 1.1);
      const colorShift = Number(params.colorShift ?? 1.0);
      const ribbonWidthScale = Number(params.ribbonWidth ?? 1.1);

      const t = timeState.time * speed * 0.55;

      if (motes.length === 0) initMotes();

      // 1. Clean Modern Substrate Background
      const bgGrad = ctx.createLinearGradient(0, 0, width, height);
      bgGrad.addColorStop(0, '#fdfdfe');
      bgGrad.addColorStop(0.5, '#f6f8fc');
      bgGrad.addColorStop(1.0, '#edf1f8');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // Ambient Spectral Light Halo
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

      // ====================================================================
      // LAYER 1: WIDE DIAGONAL BACKGROUND FLOW FIELD (Brushed Silk Streamlines)
      // ====================================================================
      const bgSpinePts: Array<{ x: number; y: number; nx: number; ny: number }> = [];
      const bgWidth = Math.min(width, height) * 0.65 * ribbonWidthScale;

      for (let s = 0; s <= EVAL_STEPS; s++) {
        const u = s / EVAL_STEPS;
        const u1 = 1 - u;

        // Broad diagonal sweep from top-left (x: 0.05) to bottom-right (x: 1.15)
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

      // Render Background Streamlines
      const bgLines = Math.floor(320 * streamlineDensity);
      ctx.save();
      for (let i = 0; i < bgLines; i++) {
        const v = (i / (bgLines - 1) - 0.5) * 2; // -1 to 1
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

        const colorParam = (vNorm * 0.55 + u_colorOffset(i, bgLines) + t * 0.12 * colorShift) % 1.0;
        const alpha = 0.55 * (0.35 + 0.65 * Math.sin(vNorm * Math.PI)) * (0.75 + 0.25 * Math.sin(i * 1.1));

        ctx.strokeStyle = getStripeColor(colorParam, alpha);
        ctx.lineWidth = 1.15 + (1 - Math.abs(v)) * 0.6;
        ctx.stroke();
      }
      ctx.restore();

      function u_colorOffset(idx: number, total: number) {
        return (idx / total) * 0.25;
      }

      // ====================================================================
      // LAYER 2: THE ICONIC FOREGROUND 3D TWISTED RIBBON ARCH (The Stripe Loop)
      // ====================================================================
      // This ribbon loops from upper right, swoops inwards, performs a 3D Möbius twist in the middle, and curves down
      const twistSpinePts: Array<{ x: number; y: number; nx: number; ny: number; twistAngle: number; widthProfile: number }> = [];
      const fgWidth = Math.min(width, height) * 0.36 * ribbonWidthScale;

      for (let s = 0; s <= EVAL_STEPS; s++) {
        const u = s / EVAL_STEPS;
        const u1 = 1 - u;

        // Loop Curve: Upper Right -> Mid Center (Twist Knee) -> Lower Right
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

        // Tangent & Normal
        const dx = 3 * u1 * u1 * (p1x - p0x) + 6 * u1 * u * (p2x - p1x) + 3 * u * u * (p3x - p2x);
        const dy = 3 * u1 * u1 * (p1y - p0y) + 6 * u1 * u * (p2y - p1y) + 3 * u * u * (p3y - p2y);
        const len = Math.hypot(dx, dy) || 1;
        const nx = -dy / len;
        const ny = dx / len;

        // 3D Twist Angle: Smoothly inverts from 0 rad to PI rad across the mid-section
        const twistCenter = 0.48 + Math.sin(t * 0.9) * 0.06;
        const twistSigmoid = 1.0 / (1.0 + Math.exp(-12 * (u - twistCenter)));
        const twistAngle = twistSigmoid * Math.PI + Math.sin(u * 3.5 + t * 1.5) * 0.25;

        // Tapered Width Profile
        const widthProfile = Math.sin(Math.pow(u, 0.8) * Math.PI) * (0.85 + 0.15 * Math.sin(u * 4.0 - t));

        twistSpinePts.push({ x: bx, y: by, nx, ny, twistAngle, widthProfile });
      }

      // 2a. Deep Soft Drop Shadow cast by the Twisted Ribbon onto the background
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

      // 2b. Render Foreground 3D Twisted Streamlines
      const twistLines = Math.floor(360 * streamlineDensity);
      ctx.save();

      for (let i = 0; i < twistLines; i++) {
        const v = (i / (twistLines - 1) - 0.5) * 2; // -1 to 1 across ribbon
        const vNorm = (v + 1) * 0.5;

        const flutePhase = i * 0.32;
        ctx.beginPath();

        for (let s = 0; s <= EVAL_STEPS; s++) {
          const u = s / EVAL_STEPS;
          const pt = twistSpinePts[s];

          // 3D projected width accounting for twist rotation
          const projectedScale = Math.cos(pt.twistAngle);
          const zDepth = Math.sin(pt.twistAngle); // -1 (back) to +1 (front)

          const rW = fgWidth * pt.widthProfile;
          const microFlute = Math.sin(u * 16.0 + flutePhase + t * 2.0) * (2.8 * ribbonTwist);

          // Position displaced along 3D rotated normal
          const offsetDist = v * (rW * 0.5) * projectedScale + microFlute;

          const px = pt.x + pt.nx * offsetDist + (zDepth * 8);
          const py = pt.y + pt.ny * offsetDist - (zDepth * 6);

          if (s === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }

        // Kinetic Color Evaluation on the Twisted Arch (Golden Amber -> Hot Orange -> Magenta -> Violet)
        const baseColorVal = 0.65 + vNorm * 0.35 + (t * 0.12 * colorShift);
        const streamAlpha = (0.75 + 0.25 * Math.sin(vNorm * Math.PI)) * (0.8 + 0.2 * Math.sin(i * 1.3));

        ctx.strokeStyle = getStripeColor(baseColorVal, streamAlpha);
        ctx.lineWidth = 1.25 + (1 - Math.abs(v)) * 0.7;
        ctx.stroke();
      }

      // 2c. Glowing Specular Rim Highlights along the Crest Edge of the Twisted Arch
      // Outer rim
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

      // Inner crest ridge
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

      // 3. Floating Light Motes / Subtle Sparkle Particles
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
          ? `rgba(99, 102, 241, ${0.5 * sparkle})`
          : `rgba(249, 115, 22, ${0.5 * sparkle})`;
        ctx.fill();
      }
      ctx.restore();
    },
  };
}
