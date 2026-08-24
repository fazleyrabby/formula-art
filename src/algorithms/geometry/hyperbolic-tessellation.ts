import type { ArtRenderer, ParameterState, RenderContext, TimeState } from '../../types/engine';
import { hsla } from '../common/color';

// Poincaré disk conformal hyperbolic geometry transformation
export function createHyperbolicTessellation(): ArtRenderer {
  return {
    setup() {},

    render(context: RenderContext, timeState: TimeState, params: ParameterState) {
      const { ctx, width, height } = context;
      const t = timeState.time * Number(params.speed || 0.4);
      const p = Number(params.symmetryP || 7);
      const radius = Math.min(width, height) * 0.44;

      ctx.fillStyle = '#08090d';
      ctx.fillRect(0, 0, width, height);

      const cx = width * 0.5;
      const cy = height * 0.5;

      // Outer boundary of Poincaré disk
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.4)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.stroke();

      // Concentric hyperbolic geodesic arcs
      const layers = 14;
      for (let l = 1; l <= layers; l++) {
        const hypRadius = radius * Math.tanh((l * 0.25) + Math.sin(t) * 0.1);
        const arcCount = p * l;

        for (let i = 0; i < arcCount; i++) {
          const angle = (i / arcCount) * Math.PI * 2 + t * (0.1 / l);
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
    },
  };
}
