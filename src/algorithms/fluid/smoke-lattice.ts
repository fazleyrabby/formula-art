import type { ArtRenderer, ParameterState, RenderContext, TimeState } from '../../types/engine';
import { hsla } from '../common/color';

export function createSmokeLattice(): ArtRenderer {
  const GRID_SIZE = 40;
  const density = new Float32Array(GRID_SIZE * GRID_SIZE);

  return {
    setup() {
      density.fill(0);
    },

    render(context: RenderContext, timeState: TimeState, params: ParameterState) {
      const { ctx, width, height } = context;
      const t = timeState.time * Number(params.speed || 1.0);
      const cellW = width / GRID_SIZE;
      const cellH = height / GRID_SIZE;

      ctx.fillStyle = '#08090d';
      ctx.fillRect(0, 0, width, height);

      // Emitter in center with swirling dynamics
      const cx = GRID_SIZE / 2;
      const cy = GRID_SIZE / 2;

      for (let y = 1; y < GRID_SIZE - 1; y++) {
        for (let x = 1; x < GRID_SIZE - 1; x++) {
          const idx = y * GRID_SIZE + x;
          const dx = x - cx;
          const dy = y - cy;
          const dist = Math.sqrt(dx * dx + dy * dy);

          // Harmonic injection
          const injection =
            Math.sin(dist * 0.4 - t * 3) *
            Math.cos(Math.atan2(dy, dx) * 4 + t * 2) *
            Math.exp(-dist * 0.1);

          density[idx] = Math.max(0, Math.min(1, density[idx] * 0.94 + injection * 0.15));

          if (density[idx] > 0.02) {
            const px = x * cellW;
            const py = y * cellH;
            const alpha = density[idx];
            const hue = (240 + alpha * 100 + t * 20) % 360;

            ctx.fillStyle = hsla(hue, 80, 60, alpha * 0.8);
            ctx.beginPath();
            ctx.arc(px + cellW * 0.5, py + cellH * 0.5, (cellW * 0.7) * alpha, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }
    },
  };
}
