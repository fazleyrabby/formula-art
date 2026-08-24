import type { ArtRenderer, ParameterState, RenderContext, TimeState } from '../../types/engine';
import { hsla } from '../common/color';

// Bessel-like 2D multi-source circular wave interference
export function createCircularRipples(): ArtRenderer {
  const GRID = 45;

  return {
    setup() {},

    render(context: RenderContext, timeState: TimeState, params: ParameterState) {
      const { ctx, width, height } = context;
      const t = timeState.time * Number(params.speed || 1.8);
      const freq = Number(params.frequency || 0.04);
      const cellW = width / GRID;
      const cellH = height / GRID;

      ctx.fillStyle = '#08090d';
      ctx.fillRect(0, 0, width, height);

      // 3 moving wave emitter centers
      const s1x = width * 0.35 + Math.cos(t * 0.5) * (width * 0.15);
      const s1y = height * 0.35 + Math.sin(t * 0.5) * (height * 0.15);
      const s2x = width * 0.65 + Math.cos(-t * 0.6) * (width * 0.15);
      const s2y = height * 0.65 + Math.sin(-t * 0.6) * (height * 0.15);
      const s3x = width * 0.5 + Math.sin(t * 0.7) * (width * 0.2);
      const s3y = height * 0.5 + Math.cos(t * 0.7) * (height * 0.2);

      for (let y = 0; y < GRID; y++) {
        const py = y * cellH;
        for (let x = 0; x < GRID; x++) {
          const px = x * cellW;

          const d1 = Math.sqrt((px - s1x) ** 2 + (py - s1y) ** 2);
          const d2 = Math.sqrt((px - s2x) ** 2 + (py - s2y) ** 2);
          const d3 = Math.sqrt((px - s3x) ** 2 + (py - s3y) ** 2);

          // Sum of radial Bessel spherical decays
          const w1 = (Math.sin(d1 * freq - t * 2) / (Math.sqrt(d1) * 0.1 + 1));
          const w2 = (Math.sin(d2 * freq - t * 2) / (Math.sqrt(d2) * 0.1 + 1));
          const w3 = (Math.sin(d3 * freq - t * 2) / (Math.sqrt(d3) * 0.1 + 1));

          const wave = (w1 + w2 + w3) / 3;
          const radius = Math.max(0.8, (wave + 1) * 0.5 * (cellW * 0.45));
          const hue = (200 + wave * 90 + t * 15) % 360;

          ctx.fillStyle = hsla(hue, 90, 65, Math.min(1, Math.abs(wave) + 0.3));
          ctx.beginPath();
          ctx.arc(px + cellW * 0.5, py + cellH * 0.5, radius, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    },
  };
}
