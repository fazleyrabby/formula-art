import type { ArtRenderer, ParameterState, RenderContext, TimeState } from '../../types/engine';
import { hsla } from '../common/color';

// Barnsley Fern Affine IFS: 4 probabilistic matrix transformations
export function createBarnsleyFern(): ArtRenderer {
  const SAMPLES_PER_FRAME = 3500;

  return {
    setup() {},

    render(context: RenderContext, timeState: TimeState, params: ParameterState) {
      const { ctx, width, height } = context;
      const speed = Number(params.swaySpeed || 0.6);
      const t = timeState.time * speed;

      ctx.fillStyle = 'rgba(6, 9, 10, 0.2)';
      ctx.fillRect(0, 0, width, height);

      let x = 0;
      let y = 0;

      const scale = Math.min(width, height) * 0.088;
      const cx = width * 0.5 + Math.sin(t * 1.2) * 12;
      const cy = height * 0.95;

      const sway = Math.sin(t * 1.5) * 0.04;

      for (let i = 0; i < SAMPLES_PER_FRAME; i++) {
        const r = Math.random();
        let nextX = 0;
        let nextY = 0;

        if (r < 0.01) {
          // 1. Stem
          nextX = 0;
          nextY = 0.16 * y;
        } else if (r < 0.86) {
          // 2. Successively smaller leaflets
          nextX = 0.85 * x + (0.04 + sway) * y;
          nextY = -0.04 * x + 0.85 * y + 1.6;
        } else if (r < 0.93) {
          // 3. Largest left leaflet
          nextX = 0.2 * x - 0.26 * y;
          nextY = 0.23 * x + 0.22 * y + 1.6;
        } else {
          // 4. Largest right leaflet
          nextX = -0.15 * x + 0.28 * y;
          nextY = 0.26 * x + 0.24 * y + 0.44;
        }

        x = nextX;
        y = nextY;

        const px = cx + x * scale;
        const py = cy - y * scale;

        const hue = (115 + (y / 10) * 45 + t * 10) % 360;
        ctx.fillStyle = hsla(hue, 90, 60, 0.7);
        ctx.fillRect(px, py, 1.2, 1.2);
      }
    },
  };
}
