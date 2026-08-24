import type { ArtRenderer, ParameterState, RenderContext, TimeState } from '../../types/engine';
import { hsla } from '../common/color';

// Eurypharynx Pelecanoides (Gulper Pelican Eel) Cavernous Jaw & Luminous Whip-Tail
export function createGulperEel(): ArtRenderer {
  return {
    setup() {},

    render(context: RenderContext, timeState: TimeState, params: ParameterState) {
      const { ctx, width, height } = context;
      const swimSpeed = Number(params.swimSpeed || 1.1);
      const jawExpansion = Number(params.jawInflation || 1.0);
      const t = timeState.time * swimSpeed;

      ctx.fillStyle = '#020307';
      ctx.fillRect(0, 0, width, height);

      const cx = width * 0.38 + Math.sin(t * 0.5) * 15;
      const cy = height * 0.46 + Math.sin(t * 1.2) * 10;
      const eelScale = Math.min(width, height) / 520;

      ctx.save();
      ctx.translate(cx, cy);

      // 1. Cavernous Expandable Pelican Jaw & Pouch
      const gapePulse = 1 + 0.25 * Math.sin(t * 2) * jawExpansion;

      ctx.beginPath();
      // Upper Cranium Jaw Link
      ctx.moveTo(-15 * eelScale, -15 * eelScale);
      ctx.quadraticCurveTo(45 * eelScale, -35 * eelScale, 110 * eelScale, -10 * eelScale);

      // Massive Lower Distensible Pouch (Swallowing Envelope)
      ctx.bezierCurveTo(
        95 * eelScale,
        85 * gapePulse * eelScale,
        -10 * eelScale,
        110 * gapePulse * eelScale,
        -35 * eelScale,
        15 * eelScale
      );
      ctx.closePath();

      // Deep Inky Blue-Black Pouch
      ctx.fillStyle = '#080a14';
      ctx.fill();
      ctx.strokeStyle = hsla(215, 60, 35, 0.9);
      ctx.lineWidth = 2.4 * eelScale;
      ctx.stroke();

      // Jaw Elastic Pouch Striations (accordion folds)
      for (let s = 1; s <= 5; s++) {
        const normS = s / 6;
        ctx.beginPath();
        ctx.moveTo(10 * eelScale, -10 * eelScale);
        ctx.quadraticCurveTo(
          (30 + s * 10) * eelScale,
          (20 + s * 12 * gapePulse) * eelScale,
          (-10 + s * 18) * eelScale,
          (55 * gapePulse) * eelScale
        );
        ctx.strokeStyle = hsla(210, 45, 25, 0.5);
        ctx.lineWidth = 1.2;
        ctx.stroke();
      }

      // 2. Tiny Anterior Skull & Primitive Eyes
      ctx.beginPath();
      ctx.ellipse(95 * eelScale, -12 * eelScale, 14 * eelScale, 10 * eelScale, 0.2, 0, Math.PI * 2);
      ctx.fillStyle = '#0f172a';
      ctx.fill();

      // Tiny Eye
      ctx.fillStyle = '#38bdf8';
      ctx.beginPath();
      ctx.arc(102 * eelScale, -14 * eelScale, 2.5 * eelScale, 0, Math.PI * 2);
      ctx.fill();

      // 3. Long Tapering Serpentine Ribbon Whip-Tail
      const TAIL_SEGMENTS = 70;
      let prevX = -35 * eelScale;
      let prevY = 15 * eelScale;

      ctx.beginPath();
      ctx.moveTo(prevX, prevY);

      for (let s = 1; s <= TAIL_SEGMENTS; s++) {
        const normS = s / TAIL_SEGMENTS;
        const tailWave = Math.sin(t * 3.5 - normS * 7) * (32 * normS * eelScale);
        const curX = prevX - (180 * normS * eelScale) + (Math.sin(t * 0.8) * 5);
        const curY = prevY - (s * 3.2 * eelScale) + tailWave;

        ctx.lineTo(curX, curY);

        if (s === TAIL_SEGMENTS) {
          // Terminal Bioluminescent Photophore Organ (Glow Bulb at tail tip)
          ctx.save();
          ctx.translate(curX, curY);
          
          const pulse = 1 + 0.35 * Math.sin(t * 5);
          const glowGrad = ctx.createRadialGradient(0, 0, 1, 0, 0, 24 * pulse * eelScale);
          glowGrad.addColorStop(0, 'rgba(239, 68, 68, 0.95)'); // Rare red abyssal lure
          glowGrad.addColorStop(0.3, 'rgba(239, 68, 68, 0.4)');
          glowGrad.addColorStop(1, 'rgba(239, 68, 68, 0)');

          ctx.fillStyle = glowGrad;
          ctx.beginPath();
          ctx.arc(0, 0, 24 * pulse * eelScale, 0, Math.PI * 2);
          ctx.fill();

          ctx.fillStyle = '#fee2e2';
          ctx.beginPath();
          ctx.arc(0, 0, 3.5 * eelScale, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }
      }

      ctx.strokeStyle = hsla(210, 50, 45, 0.85);
      ctx.lineWidth = 2.0 * eelScale;
      ctx.stroke();

      ctx.restore();
    },
  };
}
