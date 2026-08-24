import type { ArtRenderer, ParameterState, RenderContext, TimeState } from '../../types/engine';
import { hsla } from '../common/color';

// Korteweg-de Vries (KdV) Soliton wave packet collision: u(x,t) = 2*k^2 * sech^2(k*(x - 4*k^2*t))
export function createSolitonPulse(): ArtRenderer {
  const SAMPLES = 250;
  const LINES = 24;

  return {
    setup() {},

    render(context: RenderContext, timeState: TimeState, params: ParameterState) {
      const { ctx, width, height } = context;
      const t = (timeState.time * Number(params.speed || 1.0)) % 10;
      const amp = Number(params.amplitude || 45);

      ctx.fillStyle = '#08090d';
      ctx.fillRect(0, 0, width, height);

      const cy = height * 0.5;

      for (let l = 0; l < LINES; l++) {
        const lineOffset = (l - LINES / 2) * 12;
        const phaseShift = l * 0.15;

        ctx.beginPath();
        for (let i = 0; i <= SAMPLES; i++) {
          const normX = (i / SAMPLES) * 20 - 10; // -10 to +10
          const renderX = (i / SAMPLES) * width;

          // Soliton 1 (traveling right)
          const k1 = 0.8;
          const pos1 = k1 * (normX - 4 * k1 * k1 * (t * 0.8 - 4) + phaseShift);
          const sech1 = 1 / Math.cosh(pos1);
          const u1 = 2 * k1 * k1 * sech1 * sech1;

          // Soliton 2 (traveling left)
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
    },
  };
}
