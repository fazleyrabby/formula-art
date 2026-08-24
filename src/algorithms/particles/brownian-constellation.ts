import type { ArtRenderer, ParameterState, RenderContext, TimeState } from '../../types/engine';
import { hsla } from '../common/color';

export function createBrownianConstellation(): ArtRenderer {
  const MAX_NODES = 160;
  const px = new Float32Array(MAX_NODES);
  const py = new Float32Array(MAX_NODES);
  const vx = new Float32Array(MAX_NODES);
  const vy = new Float32Array(MAX_NODES);

  return {
    setup(context: RenderContext) {
      for (let i = 0; i < MAX_NODES; i++) {
        px[i] = Math.random() * context.width;
        py[i] = Math.random() * context.height;
        vx[i] = (Math.random() - 0.5) * 1.5;
        vy[i] = (Math.random() - 0.5) * 1.5;
      }
    },

    render(context: RenderContext, timeState: TimeState, params: ParameterState) {
      const { ctx, width, height } = context;
      const count = Math.min(MAX_NODES, Number(params.nodeCount || 100));
      const maxDistance = Number(params.connectionRadius || 80);
      const maxDistSq = maxDistance * maxDistance;
      const t = timeState.time;

      ctx.fillStyle = '#08090d';
      ctx.fillRect(0, 0, width, height);

      // Update positions
      for (let i = 0; i < count; i++) {
        px[i] += vx[i];
        py[i] += vy[i];

        if (px[i] < 0 || px[i] > width) vx[i] *= -1;
        if (py[i] < 0 || py[i] > height) vy[i] *= -1;
      }

      // Draw connections
      for (let i = 0; i < count; i++) {
        for (let j = i + 1; j < count; j++) {
          const dx = px[j] - px[i];
          const dy = py[j] - py[i];
          const dSq = dx * dx + dy * dy;

          if (dSq < maxDistSq) {
            const alpha = 1 - dSq / maxDistSq;
            const hue = (190 + alpha * 80 + t * 15) % 360;

            ctx.strokeStyle = hsla(hue, 85, 60, alpha * 0.5);
            ctx.lineWidth = alpha * 1.4;
            ctx.beginPath();
            ctx.moveTo(px[i], py[i]);
            ctx.lineTo(px[j], py[j]);
            ctx.stroke();
          }
        }

        // Draw node dots
        ctx.fillStyle = hsla(200, 90, 70, 0.9);
        ctx.beginPath();
        ctx.arc(px[i], py[i], 2.2, 0, Math.PI * 2);
        ctx.fill();
      }
    },
  };
}
