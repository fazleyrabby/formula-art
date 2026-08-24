import type { ArtRenderer, ParameterState, RenderContext, TimeState } from '../../types/engine';
import { hsla } from '../common/color';

export function createBoidsFlocking(): ArtRenderer {
  const MAX_BOIDS = 400;
  const px = new Float32Array(MAX_BOIDS);
  const py = new Float32Array(MAX_BOIDS);
  const vx = new Float32Array(MAX_BOIDS);
  const vy = new Float32Array(MAX_BOIDS);

  return {
    setup(context: RenderContext) {
      for (let i = 0; i < MAX_BOIDS; i++) {
        px[i] = Math.random() * context.width;
        py[i] = Math.random() * context.height;
        const a = Math.random() * Math.PI * 2;
        vx[i] = Math.cos(a) * 2;
        vy[i] = Math.sin(a) * 2;
      }
    },

    render(context: RenderContext, _timeState: TimeState, params: ParameterState) {
      const { ctx, width, height } = context;
      const count = Math.min(MAX_BOIDS, Number(params.boidCount || 250));
      const visualRange = 45;
      const visualRangeSq = visualRange * visualRange;
      const minDistance = 14;
      const minDistSq = minDistance * minDistance;
      const maxSpeed = 3.5;

      ctx.fillStyle = 'rgba(8, 9, 13, 0.2)';
      ctx.fillRect(0, 0, width, height);

      for (let i = 0; i < count; i++) {
        let alignX = 0;
        let alignY = 0;
        let cohereX = 0;
        let cohereY = 0;
        let separateX = 0;
        let separateY = 0;
        let neighbors = 0;

        for (let j = 0; j < count; j++) {
          if (i === j) continue;
          const dx = px[j] - px[i];
          const dy = py[j] - py[i];
          const dSq = dx * dx + dy * dy;

          if (dSq < visualRangeSq) {
            alignX += vx[j];
            alignY += vy[j];
            cohereX += px[j];
            cohereY += py[j];
            neighbors++;

            if (dSq < minDistSq) {
              separateX -= dx / (Math.sqrt(dSq) + 0.1);
              separateY -= dy / (Math.sqrt(dSq) + 0.1);
            }
          }
        }

        if (neighbors > 0) {
          alignX /= neighbors;
          alignY /= neighbors;
          cohereX = cohereX / neighbors - px[i];
          cohereY = cohereY / neighbors - py[i];

          vx[i] += alignX * 0.05 + cohereX * 0.005 + separateX * 0.15;
          vy[i] += alignY * 0.05 + cohereY * 0.005 + separateY * 0.15;
        }

        // Center attraction gently
        const toCenterX = width * 0.5 - px[i];
        const toCenterY = height * 0.5 - py[i];
        vx[i] += toCenterX * 0.0003;
        vy[i] += toCenterY * 0.0003;

        // Speed clamping
        const speed = Math.sqrt(vx[i] * vx[i] + vy[i] * vy[i]);
        if (speed > maxSpeed) {
          vx[i] = (vx[i] / speed) * maxSpeed;
          vy[i] = (vy[i] / speed) * maxSpeed;
        }

        px[i] += vx[i];
        py[i] += vy[i];

        if (px[i] < 0) px[i] += width;
        if (px[i] > width) px[i] -= width;
        if (py[i] < 0) py[i] += height;
        if (py[i] > height) py[i] -= height;

        const heading = Math.atan2(vy[i], vx[i]);
        const hue = (160 + (heading / Math.PI) * 90 + 360) % 360;

        ctx.save();
        ctx.translate(px[i], py[i]);
        ctx.rotate(heading);
        ctx.fillStyle = hsla(hue, 90, 65, 0.85);
        ctx.beginPath();
        ctx.moveTo(6, 0);
        ctx.lineTo(-4, -3);
        ctx.lineTo(-2, 0);
        ctx.lineTo(-4, 3);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
      }
    },
  };
}
