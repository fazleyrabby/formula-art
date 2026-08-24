import type { ArtRenderer, ParameterState, RenderContext, TimeState } from '../../types/engine';
import { hsla } from '../common/color';

export function createMoireInterference(): ArtRenderer {
  return {
    setup() {},

    render(context: RenderContext, timeState: TimeState, params: ParameterState) {
      const { ctx, width, height } = context;
      const t = timeState.time * Number(params.speed || 0.5);
      const ringCount = Number(params.ringCount || 75);
      const separation = Number(params.separation || 40) + Math.sin(t * 0.8) * 30;

      ctx.fillStyle = '#08090d';
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

      // Pattern 1
      for (let r = 5; r < maxR; r += step) {
        ctx.beginPath();
        ctx.arc(c1x, c1y, r, 0, Math.PI * 2);
        ctx.strokeStyle = hsla((180 + (r / maxR) * 60) % 360, 85, 60, 0.6);
        ctx.stroke();
      }

      // Pattern 2
      for (let r = 5; r < maxR; r += step) {
        ctx.beginPath();
        ctx.arc(c2x, c2y, r, 0, Math.PI * 2);
        ctx.strokeStyle = hsla((280 + (r / maxR) * 60) % 360, 85, 65, 0.6);
        ctx.stroke();
      }
    },
  };
}
