import type { ArtRenderer, ParameterState, RenderContext, TimeState } from '../../types/engine';
import { hsla } from '../common/color';

// Hexeosis (@hexeosis) Tribute: Kaleidoscopic Neon Tunnel
// Infinite psychedelic hyperspace tunnel with recursive sacred geometry,
// multi-order kaleidoscopic rosettes, and electric synthwave neon glow.
export function createKaleidoscopicNeonTunnel(): ArtRenderer {
  return {
    setup() {},

    render(context: RenderContext, timeState: TimeState, params: ParameterState) {
      const { ctx, width, height } = context;
      const speed = Number(params.zoomSpeed ?? 1.2);
      const folds = Math.floor(Number(params.symmetryFolds ?? 8));
      const ringCount = Math.floor(Number(params.tunnelRings ?? 30));
      const glow = Number(params.neonPulse ?? 1.5);
      const colorRate = Number(params.colorCycle ?? 1.0);
      const t = timeState.time * speed;

      // Deep void background
      ctx.fillStyle = '#030108';
      ctx.fillRect(0, 0, width, height);

      const cx = width * 0.5;
      const cy = height * 0.5;
      const maxRadius = Math.max(width, height) * 0.72;

      ctx.save();
      ctx.translate(cx, cy);

      // Additive screen blend for intense electric neon vibration
      ctx.globalCompositeOperation = 'screen';

      const baseHue = (t * 45 * colorRate) % 360;

      // 1. Radial Spoke Rays Connecting Infinite Center to Horizon
      ctx.lineWidth = 1.0 * glow;
      for (let s = 0; s < folds * 2; s++) {
        const spokeAngle = (s * Math.PI) / folds + Math.sin(t * 0.5) * 0.1;
        const spokeHue = (baseHue + s * (360 / (folds * 2))) % 360;

        ctx.beginPath();
        ctx.moveTo(0, 0);
        // Spiraling curved ray outward
        const curveOffset = Math.sin(t * 1.2 + s) * 0.35;
        const endX = Math.cos(spokeAngle + curveOffset) * maxRadius;
        const endY = Math.sin(spokeAngle + curveOffset) * maxRadius;
        ctx.lineTo(endX, endY);
        ctx.strokeStyle = hsla(spokeHue, 95, 60, 0.22 * glow);
        ctx.stroke();
      }

      // 2. Concentric Sacred Geometry Tunnel Rings Moving Toward Observer
      // Logarithmic / hyperbolic depth mapping
      for (let r = 0; r < ringCount; r++) {
        // Continuous z-shift with wrap-around
        const zNorm = ((r / ringCount) + (t * 0.2) % 1) % 1;
        if (zNorm < 0.02) continue;

        // Exponential perspective expansion
        const radius = Math.pow(zNorm, 2.2) * maxRadius;
        const alpha = Math.sin(zNorm * Math.PI) * (0.85 * glow);
        const ringRotation = t * 0.4 * (r % 2 === 0 ? 1 : -1) + r * 0.15;
        const ringHue = (baseHue + zNorm * 220) % 360;

        // Sacred rosette petals / star polygon vertices
        const points = folds * 2;
        ctx.beginPath();
        for (let p = 0; p <= points; p++) {
          const theta = (p / points) * Math.PI * 2 + ringRotation;
          // Star polygon alternating radius
          const isOuter = p % 2 === 0;
          const rMod = isOuter ? 1.0 : 0.62 + 0.15 * Math.sin(t * 3 + r);
          const currentR = radius * rMod;

          const px = Math.cos(theta) * currentR;
          const py = Math.sin(theta) * currentR;

          if (p === 0) {
            ctx.moveTo(px, py);
          } else {
            ctx.lineTo(px, py);
          }
        }
        ctx.closePath();

        // Outer glow contour
        ctx.strokeStyle = hsla(ringHue, 95, 65, alpha * 0.8);
        ctx.lineWidth = (1.2 + zNorm * 2.5) * glow;
        ctx.stroke();

        // Inner harmonic diamond web on every alternating ring
        if (r % 2 === 0 && radius > 15) {
          ctx.beginPath();
          for (let p = 0; p <= folds; p++) {
            const theta = (p / folds) * Math.PI * 2 - ringRotation * 1.5;
            const px = Math.cos(theta) * (radius * 0.78);
            const py = Math.sin(theta) * (radius * 0.78);
            if (p === 0) ctx.moveTo(px, py);
            else ctx.lineTo(px, py);
          }
          ctx.closePath();
          ctx.strokeStyle = hsla((ringHue + 60) % 360, 90, 75, alpha * 0.5);
          ctx.lineWidth = 1.0 * glow;
          ctx.stroke();
        }
      }

      // 3. Central Hyperspace Singularity / Sri Yantra Core
      const coreR = 18 + 6 * Math.sin(t * 4);
      const coreGrad = ctx.createRadialGradient(0, 0, 0, 0, 0, coreR * 3);
      coreGrad.addColorStop(0, hsla(baseHue, 100, 92, 0.95));
      coreGrad.addColorStop(0.3, hsla((baseHue + 40) % 360, 95, 65, 0.6 * glow));
      coreGrad.addColorStop(1, 'transparent');

      ctx.fillStyle = coreGrad;
      ctx.beginPath();
      ctx.arc(0, 0, coreR * 3, 0, Math.PI * 2);
      ctx.fill();

      // Central pulsing geometric glyph
      ctx.beginPath();
      for (let i = 0; i < folds; i++) {
        const a1 = (i * Math.PI * 2) / folds + t;
        const a2 = ((i + 0.5) * Math.PI * 2) / folds - t * 0.5;
        ctx.moveTo(Math.cos(a1) * coreR, Math.sin(a1) * coreR);
        ctx.lineTo(Math.cos(a2) * (coreR * 0.4), Math.sin(a2) * (coreR * 0.4));
      }
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      ctx.restore();
    },
  };
}
