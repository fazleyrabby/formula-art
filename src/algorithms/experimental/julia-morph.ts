import type { ArtRenderer, ParameterState, RenderContext, TimeState } from '../../types/engine';
import { hsla } from '../common/color';

// Dynamic Complex Julia Orbit Morph: z -> z^2 + c(t)
export function createJuliaMorph(): ArtRenderer {
  const SAMPLES = 50;

  return {
    setup() {},

    render(context: RenderContext, timeState: TimeState, params: ParameterState) {
      const { ctx, width, height } = context;
      const t = timeState.time * Number(params.speed || 0.4);
      const maxIter = Number(params.maxIter || 24);

      // Complex parameter c(t) traversing circle in complex plane
      const cr = -0.8 + 0.15 * Math.cos(t * 0.7);
      const ci = 0.156 + 0.15 * Math.sin(t * 0.7);

      const stepX = width / SAMPLES;
      const stepY = height / SAMPLES;

      ctx.fillStyle = '#08090d';
      ctx.fillRect(0, 0, width, height);

      for (let y = 0; y < SAMPLES; y++) {
        const zy0 = ((y / SAMPLES) * 2.8 - 1.4);
        for (let x = 0; x < SAMPLES; x++) {
          const zx0 = ((x / SAMPLES) * 2.8 - 1.4);

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
    },
  };
}
