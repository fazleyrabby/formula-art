import type { ArtRenderer, ParameterState, RenderContext, TimeState } from '../../types/engine';
import { hsla } from '../common/color';

export function createSacredMandala(): ArtRenderer {
  return {
    setup() {},

    render(context: RenderContext, timeState: TimeState, params: ParameterState) {
      const { ctx, width, height } = context;
      const t = timeState.time * Number(params.speed || 0.5);
      const folds = Number(params.folds || 12);
      const maxR = Math.min(width, height) * 0.42;

      ctx.fillStyle = 'rgba(8, 9, 13, 0.2)';
      ctx.fillRect(0, 0, width, height);

      const cx = width * 0.5;
      const cy = height * 0.5;

      const rings = 8;
      for (let r = 1; r <= rings; r++) {
        const ringRadius = (r / rings) * maxR;
        const ringOffset = t * (r % 2 === 0 ? 0.3 : -0.3) + r * 0.2;

        ctx.save();
        ctx.translate(cx, cy);

        for (let i = 0; i < folds; i++) {
          ctx.rotate((Math.PI * 2) / folds);

          const petalW = ringRadius * 0.35 * (1 + 0.2 * Math.sin(t * 2 + r));
          const petalH = (maxR / rings) * 1.4;

          ctx.beginPath();
          ctx.ellipse(0, ringRadius, petalW, petalH, ringOffset, 0, Math.PI * 2);
          
          const hue = (r * 35 + i * (360 / folds) + t * 20) % 360;
          ctx.strokeStyle = hsla(hue, 90, 65, 0.65);
          ctx.lineWidth = 1.2;
          ctx.stroke();
        }

        ctx.restore();
      }
    },
  };
}
