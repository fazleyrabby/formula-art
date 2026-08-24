import type { ArtRenderer, ParameterState, RenderContext, TimeState } from '../../types/engine';
import { hsla } from '../common/color';

// Recursive Golden Triangle subdivision (Aperiodic Penrose P2/P3 tiling basis)
export function createPenroseSubdivision(): ArtRenderer {
  const GOLDEN_RATIO = (1 + Math.sqrt(5)) / 2;

  function drawTriangle(
    ctx: CanvasRenderingContext2D,
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    x3: number,
    y3: number,
    depth: number,
    type: number,
    time: number
  ) {
    if (depth <= 0) {
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.lineTo(x3, y3);
      ctx.closePath();

      const hue = (type === 0 ? 190 : 280) + depth * 20 + time * 15;
      ctx.fillStyle = hsla(hue, 80, 50, 0.4);
      ctx.fill();
      ctx.strokeStyle = hsla(hue, 90, 70, 0.8);
      ctx.lineWidth = 0.9;
      ctx.stroke();
      return;
    }

    if (type === 0) {
      // Robinson Triangle 0
      const p4x = x1 + (x2 - x1) / GOLDEN_RATIO;
      const p4y = y1 + (y2 - y1) / GOLDEN_RATIO;
      drawTriangle(ctx, x3, y3, p4x, p4y, x1, y1, depth - 1, 0, time);
      drawTriangle(ctx, p4x, p4y, x3, y3, x2, y2, depth - 1, 1, time);
    } else {
      // Robinson Triangle 1
      const p4x = x2 + (x3 - x2) / GOLDEN_RATIO;
      const p4y = y2 + (y3 - y2) / GOLDEN_RATIO;
      const p5x = x2 + (x1 - x2) / GOLDEN_RATIO;
      const p5y = y2 + (y1 - y2) / GOLDEN_RATIO;
      drawTriangle(ctx, p4x, p4y, p5x, p5y, x2, y2, depth - 1, 1, time);
      drawTriangle(ctx, p5x, p5y, p4x, p4y, x1, y1, depth - 1, 0, time);
      drawTriangle(ctx, x3, y3, p4x, p4y, x1, y1, depth - 1, 1, time);
    }
  }

  return {
    setup() {},

    render(context: RenderContext, timeState: TimeState, params: ParameterState) {
      const { ctx, width, height } = context;
      const t = timeState.time * Number(params.speed || 0.4);
      const depth = Math.min(5, Number(params.subdivisionDepth || 4));
      const radius = Math.min(width, height) * 0.44;

      ctx.fillStyle = '#08090d';
      ctx.fillRect(0, 0, width, height);

      const cx = width * 0.5;
      const cy = height * 0.5;
      const folds = 10;

      for (let i = 0; i < folds; i++) {
        const a1 = (i / folds) * Math.PI * 2 + t * 0.1;
        const a2 = ((i + 1) / folds) * Math.PI * 2 + t * 0.1;

        const x1 = cx + Math.cos(a1) * radius;
        const y1 = cy + Math.sin(a1) * radius;
        const x2 = cx + Math.cos(a2) * radius;
        const y2 = cy + Math.sin(a2) * radius;

        drawTriangle(ctx, cx, cy, x1, y1, x2, y2, depth, i % 2, t);
      }
    },
  };
}
