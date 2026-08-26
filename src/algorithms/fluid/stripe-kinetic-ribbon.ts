import type { ArtRenderer, ParameterState, RenderContext, TimeState } from '../../types/engine';

// 085 - Authentic Stripe Kinetic Gradient Mesh & 3D Twisted Ribbon Loop
export function createStripeKineticRibbon(): ArtRenderer {
  // Stripe Exact Colormap (Hex to RGB interpolation)
  const COLOR_STOPS = [
    { pos: 0.00, r: 85,  g: 170, b: 255 }, // 0.00: Sky Blue
    { pos: 0.22, r: 120, g: 110, b: 245 }, // 0.22: Periwinkle Indigo
    { pos: 0.42, r: 215, g: 70,  b: 190 }, // 0.42: Rich Fuchsia
    { pos: 0.60, r: 245, g: 60,  b: 130 }, // 0.60: Hot Rose Pink
    { pos: 0.78, r: 255, g: 110, b: 50  }, // 0.78: Sunset Orange
    { pos: 0.92, r: 255, g: 175, b: 40  }, // 0.92: Golden Citron
    { pos: 1.00, r: 255, g: 215, b: 120 }, // 1.00: Soft Warm Light
  ];

  function evaluateColormap(val: number, alpha: number = 1.0): string {
    const v = Math.max(0, Math.min(1, val));
    let i = 0;
    while (i < COLOR_STOPS.length - 1 && COLOR_STOPS[i + 1].pos < v) {
      i++;
    }
    const c1 = COLOR_STOPS[i];
    const c2 = COLOR_STOPS[Math.min(i + 1, COLOR_STOPS.length - 1)];
    const range = (c2.pos - c1.pos) || 1;
    const frac = Math.max(0, Math.min(1, (v - c1.pos) / range));

    const r = Math.round(c1.r + (c2.r - c1.r) * frac);
    const g = Math.round(c1.g + (c2.g - c1.g) * frac);
    const b = Math.round(c1.b + (c2.b - c1.b) * frac);

    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }

  return {
    setup() {},

    render(context: RenderContext, timeState: TimeState, params: ParameterState) {
      const { ctx, width, height } = context;
      const speed = Number(params.speed ?? 1.0);
      const ribbonTwist = Number(params.ribbonTwist ?? 1.0);
      const streamlineDensity = Number(params.streamlineDensity ?? 1.2);
      const colorShift = Number(params.colorShift ?? 1.0);
      const ribbonWidthScale = Number(params.ribbonWidth ?? 1.0);

      const t = timeState.time * speed * 0.45;

      // 1. Pristine Stripe Light Canvas Background
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, width, height);

      // Soft ambient wash in the top-right quadrant
      ctx.save();
      const bgWash = ctx.createRadialGradient(
        width * 0.70, height * 0.35, width * 0.1,
        width * 0.70, height * 0.35, width * 0.85
      );
      bgWash.addColorStop(0, 'rgba(255, 120, 70, 0.18)');
      bgWash.addColorStop(0.35, 'rgba(235, 70, 160, 0.12)');
      bgWash.addColorStop(0.65, 'rgba(110, 100, 245, 0.06)');
      bgWash.addColorStop(1.0, 'rgba(255, 255, 255, 0)');
      ctx.fillStyle = bgWash;
      ctx.fillRect(0, 0, width, height);
      ctx.restore();

      // =========================================================================
      // LAYER 1: DIAGONAL FLOW FAN (Center-Left to Upper-Right Brushed Gradient)
      // =========================================================================
      ctx.save();
      const FAN_STEPS = 65;
      const fanLines = Math.floor(380 * streamlineDensity);

      // Fan origin (top-center, just like Stripe's header)
      const originX = width * 0.48 + Math.sin(t * 0.8) * 15 * ribbonTwist;
      const originY = height * -0.15;

      for (let i = 0; i < fanLines; i++) {
        const normI = i / (fanLines - 1); // 0 (left blue) to 1 (right orange)

        // Trajectory end point along the diagonal swath
        const endAngle = -Math.PI * 0.22 + normI * (Math.PI * 0.48) + Math.sin(normI * 3.5 + t * 0.9) * 0.06 * ribbonTwist;
        const endDist = Math.max(width, height) * 1.45;

        const endX = originX + Math.cos(endAngle) * endDist;
        const endY = originY + Math.sin(endAngle) * endDist;

        // Bézier curvature control points (creating the gentle diagonal S-flow)
        const ctrl1X = originX + (endX - originX) * 0.35 - (1 - normI) * (width * 0.15 * ribbonTwist);
        const ctrl1Y = originY + (endY - originY) * 0.35 + Math.sin(t * 1.2 + normI * 4.0) * (20 * ribbonTwist);

        const ctrl2X = originX + (endX - originX) * 0.65 + normI * (width * 0.12 * ribbonTwist);
        const ctrl2Y = originY + (endY - originY) * 0.65 + Math.cos(t * 1.0 + normI * 3.0) * (20 * ribbonTwist);

        // Micro-fluting wave
        const flutePhase = i * 0.42;

        ctx.beginPath();
        for (let s = 0; s <= FAN_STEPS; s++) {
          const u = s / FAN_STEPS;
          const u1 = 1 - u;

          const bx = u1 * u1 * u1 * originX + 3 * u1 * u1 * u * ctrl1X + 3 * u1 * u * u * ctrl2X + u * u * u * endX;
          const by = u1 * u1 * u1 * originY + 3 * u1 * u1 * u * ctrl1Y + 3 * u1 * u * u * ctrl2Y + u * u * u * endY;

          // Silk micro-harmonic striations
          const microJitter = Math.sin(u * 18.0 + flutePhase + t * 2.2) * (2.8 * ribbonTwist);

          // Normal displacement
          const nx = -(endY - originY) / endDist;
          const ny = (endX - originX) / endDist;

          const px = bx + nx * microJitter;
          const py = by + ny * microJitter;

          if (s === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }

        // Color mapping: 0.0 (Sky Blue) -> 0.4 (Magenta) -> 0.85 (Sunset Orange)
        const colorVal = (normI * 0.82 + Math.sin(t * 0.6) * 0.05 * colorShift);
        const lineAlpha = (0.35 + 0.65 * Math.sin(normI * Math.PI)) * (0.65 + 0.35 * Math.sin(i * 1.4));

        ctx.strokeStyle = evaluateColormap(colorVal, lineAlpha * 0.72);
        ctx.lineWidth = 1.25 + (1 - Math.abs(normI - 0.5) * 2) * 0.8;
        ctx.stroke();
      }
      ctx.restore();

      // =========================================================================
      // LAYER 2: THE ICONIC 3D TWISTED RIBBON ARCH (The Sculptural Stripe Curve)
      // =========================================================================
      // In the Stripe video, there is a giant 3D ribbon on the right that loops down,
      // twists 180° so you see the outer tubular peach rim in front, casting a shadow
      // onto the inner orange/fuchsia fan!
      ctx.save();
      const LOOP_STEPS = 90;

      // 2a. Define the 3D Centerline Spine of the Twisted Arch
      interface SpinePoint {
        x: number;
        y: number;
        nx: number;
        ny: number;
        tangentAngle: number;
        twistAngle: number;
        width: number;
      }

      const spine: SpinePoint[] = [];
      const loopWidthBase = width * 0.26 * ribbonWidthScale;

      // Spline Guide Nodes:
      // P0: Top-Right (near Header) -> P1: Arch Top Crest -> P2: Middle Twist Knee -> P3: Bottom Right Column
      const p0 = { x: width * 0.76 + Math.sin(t * 0.7) * 12, y: height * -0.12 };
      const p1 = { x: width * 0.94 + Math.sin(t * 1.1) * 16 * ribbonTwist, y: height * 0.22 };
      const p2 = { x: width * 0.84 + Math.cos(t * 0.9) * 18 * ribbonTwist, y: height * 0.60 };
      const p3 = { x: width * 0.96 + Math.sin(t * 0.8) * 14, y: height * 1.15 };

      for (let s = 0; s <= LOOP_STEPS; s++) {
        const u = s / LOOP_STEPS;
        const u1 = 1 - u;

        const bx = u1 * u1 * u1 * p0.x + 3 * u1 * u1 * u * p1.x + 3 * u1 * u * u * p2.x + u * u * u * p3.x;
        const by = u1 * u1 * u1 * p0.y + 3 * u1 * u1 * u * p1.y + 3 * u1 * u * u * p2.y + u * u * u * p3.y;

        const dx = 3 * u1 * u1 * (p1.x - p0.x) + 6 * u1 * u * (p2.x - p1.x) + 3 * u * u * (p3.x - p2.x);
        const dy = 3 * u1 * u1 * (p1.y - p0.y) + 6 * u1 * u * (p2.y - p1.y) + 3 * u * u * (p3.y - p2.y);
        const len = Math.hypot(dx, dy) || 1;
        const nx = -dy / len;
        const ny = dx / len;
        const tangentAngle = Math.atan2(dy, dx);

        // 3D Spatial Twist: Localized Möbius twist through the middle section
        const twistCenter = 0.52 + Math.sin(t * 0.8) * 0.05;
        const twistSigmoid = 1.0 / (1.0 + Math.exp(-14 * (u - twistCenter)));
        const twistAngle = twistSigmoid * Math.PI + Math.sin(u * 4.0 + t * 1.4) * 0.2;

        // Smooth width profile (bulbous top/middle, sleek column bottom)
        const wProfile = Math.sin(Math.pow(u, 0.65) * Math.PI) * loopWidthBase * (0.9 + 0.1 * Math.sin(u * 5.0 - t));

        spine.push({ x: bx, y: by, nx, ny, tangentAngle, twistAngle, width: wProfile });
      }

      // 2b. Ambient Drop Shadow (Cast by the 3D Twisted Loop onto the background canvas)
      ctx.save();
      ctx.beginPath();
      for (let s = 0; s <= LOOP_STEPS; s++) {
        const pt = spine[s];
        const sx = pt.x + pt.nx * (pt.width * 0.5) - 35;
        const sy = pt.y + pt.ny * (pt.width * 0.5) + 35;
        if (s === 0) ctx.moveTo(sx, sy);
        else ctx.lineTo(sx, sy);
      }
      for (let s = LOOP_STEPS; s >= 0; s--) {
        const pt = spine[s];
        const sx = pt.x - pt.nx * (pt.width * 0.5) - 35;
        const sy = pt.y - pt.ny * (pt.width * 0.5) + 35;
        ctx.lineTo(sx, sy);
      }
      ctx.closePath();
      ctx.fillStyle = 'rgba(40, 25, 60, 0.16)';
      ctx.filter = 'blur(24px)';
      ctx.fill();
      ctx.filter = 'none';
      ctx.restore();

      // 2c. Render Inner Fluted Body of the Loop (Golden Orange to Fuchsia Streamlines)
      const loopLines = Math.floor(280 * streamlineDensity);

      for (let i = 0; i < loopLines; i++) {
        const v = (i / (loopLines - 1) - 0.5) * 2; // -1 to 1 across width
        const vNorm = (v + 1) * 0.5;
        const flutePhase = i * 0.38;

        ctx.beginPath();
        for (let s = 0; s <= LOOP_STEPS; s++) {
          const u = s / LOOP_STEPS;
          const pt = spine[s];

          // 3D projected perspective width
          const projCos = Math.cos(pt.twistAngle);
          const zDepth = Math.sin(pt.twistAngle);

          const microFlute = Math.sin(u * 16.0 + flutePhase + t * 1.8) * (2.6 * ribbonTwist);
          const offsetDist = v * (pt.width * 0.5) * projCos + microFlute;

          const px = pt.x + pt.nx * offsetDist + (zDepth * 12);
          const py = pt.y + pt.ny * offsetDist - (zDepth * 8);

          if (s === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }

        // Color interpolation on the inner loop: Warm Orange (0.75) -> Golden Amber (0.95) -> Hot Pink (0.55)
        const cVal = 0.60 + vNorm * 0.36 + Math.sin(t * 0.8) * 0.04;
        const alpha = (0.75 + 0.25 * Math.sin(vNorm * Math.PI)) * (0.75 + 0.25 * Math.sin(i * 1.2));

        ctx.strokeStyle = evaluateColormap(cVal, alpha * 0.85);
        ctx.lineWidth = 1.3 + (1 - Math.abs(v)) * 0.7;
        ctx.stroke();
      }

      // =========================================================================
      // LAYER 3: THE HIGH-GLOSS TUBULAR RIM (The Glowing Peach/Coral Outer Edge)
      // =========================================================================
      // Look at the video: the outer rim of the twist is a bold, glowing, smooth,
      // 3D cylinder that frames the entire right edge with peach-to-pink radiance!
      ctx.save();
      const rimWidth = 14 * ribbonWidthScale;

      // Outer Rim Tube Path
      ctx.beginPath();
      for (let s = 0; s <= LOOP_STEPS; s++) {
        const u = s / LOOP_STEPS;
        const pt = spine[s];
        const projCos = Math.cos(pt.twistAngle);
        const rx = pt.x + pt.nx * (pt.width * 0.5 * Math.abs(projCos) + rimWidth * 0.5);
        const ry = pt.y + pt.ny * (pt.width * 0.5 * Math.abs(projCos) + rimWidth * 0.5);
        if (s === 0) ctx.moveTo(rx, ry);
        else ctx.lineTo(rx, ry);
      }
      ctx.strokeStyle = 'rgba(255, 160, 110, 0.45)';
      ctx.lineWidth = rimWidth * 2.2;
      ctx.filter = 'blur(8px)';
      ctx.stroke();
      ctx.filter = 'none';

      // Crisp Multi-Stop Shaded Rim Stroke
      ctx.beginPath();
      for (let s = 0; s <= LOOP_STEPS; s++) {
        const u = s / LOOP_STEPS;
        const pt = spine[s];
        const projCos = Math.cos(pt.twistAngle);
        const rx = pt.x + pt.nx * (pt.width * 0.5 * Math.abs(projCos));
        const ry = pt.y + pt.ny * (pt.width * 0.5 * Math.abs(projCos));
        if (s === 0) ctx.moveTo(rx, ry);
        else ctx.lineTo(rx, ry);
      }
      const rimGrad = ctx.createLinearGradient(width * 0.75, 0, width, height);
      rimGrad.addColorStop(0, 'rgba(255, 235, 200, 0.95)');
      rimGrad.addColorStop(0.35, 'rgba(255, 140, 90, 0.92)');
      rimGrad.addColorStop(0.70, 'rgba(240, 75, 150, 0.90)');
      rimGrad.addColorStop(1.0, 'rgba(130, 90, 240, 0.85)');

      ctx.strokeStyle = rimGrad;
      ctx.lineWidth = rimWidth;
      ctx.lineCap = 'round';
      ctx.stroke();

      // Specular Crest Highlight Wire (Thin bright light-glint along the tubular ridge)
      ctx.beginPath();
      for (let s = 0; s <= LOOP_STEPS; s++) {
        const u = s / LOOP_STEPS;
        const pt = spine[s];
        const projCos = Math.cos(pt.twistAngle);
        const rx = pt.x + pt.nx * (pt.width * 0.5 * Math.abs(projCos) - 2.5);
        const ry = pt.y + pt.ny * (pt.width * 0.5 * Math.abs(projCos) - 2.5);
        if (s === 0) ctx.moveTo(rx, ry);
        else ctx.lineTo(rx, ry);
      }
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.95)';
      ctx.lineWidth = 2.4;
      ctx.stroke();

      // Inner Crest Fold Line (Where the 3D twist turns inside-out in the middle)
      ctx.beginPath();
      for (let s = Math.floor(LOOP_STEPS * 0.25); s <= Math.floor(LOOP_STEPS * 0.85); s++) {
        const u = s / LOOP_STEPS;
        const pt = spine[s];
        const projCos = Math.cos(pt.twistAngle);
        const rx = pt.x - pt.nx * (pt.width * 0.45 * projCos);
        const ry = pt.y - pt.ny * (pt.width * 0.45 * projCos);
        if (s === Math.floor(LOOP_STEPS * 0.25)) ctx.moveTo(rx, ry);
        else ctx.lineTo(rx, ry);
      }
      ctx.strokeStyle = 'rgba(255, 240, 220, 0.85)';
      ctx.lineWidth = 2.2;
      ctx.stroke();
      ctx.restore();

      ctx.restore();
    },
  };
}
