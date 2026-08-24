import type { ArtRenderer, ParameterState, RenderContext, TimeState } from '../../types/engine';
import { hsla } from '../common/color';
import { noise2D } from '../common/math-utils';

// Solenoidal (incompressible) flow via finite difference curl of potential field
export function createCurlVectorField(): ArtRenderer {
  const MAX_PARTICLES = 1800;
  const px = new Float32Array(MAX_PARTICLES);
  const py = new Float32Array(MAX_PARTICLES);
  const eps = 0.01;

  return {
    setup(context: RenderContext) {
      for (let i = 0; i < MAX_PARTICLES; i++) {
        px[i] = Math.random() * context.width;
        py[i] = Math.random() * context.height;
      }
    },

    render(context: RenderContext, timeState: TimeState, params: ParameterState) {
      const { ctx, width, height } = context;
      const count = Math.min(MAX_PARTICLES, Number(params.particleCount || 1200));
      const scale = Number(params.fieldScale || 0.0035);
      const speed = Number(params.speed || 2.2);
      const t = timeState.time * 0.12;

      ctx.fillStyle = 'rgba(8, 9, 13, 0.12)';
      ctx.fillRect(0, 0, width, height);

      for (let i = 0; i < count; i++) {
        const nx = px[i] * scale;
        const ny = py[i] * scale;

        // Finite difference curl: v = (dPsi/dy, -dPsi/dx)
        const n1 = noise2D(nx, ny + eps + t);
        const n2 = noise2D(nx, ny - eps + t);
        const vx = (n1 - n2) / (2 * eps);

        const n3 = noise2D(nx + eps, ny + t);
        const n4 = noise2D(nx - eps, ny + t);
        const vy = -(n3 - n4) / (2 * eps);

        const prevX = px[i];
        const prevY = py[i];

        px[i] += vx * speed * 8;
        py[i] += vy * speed * 8;

        if (px[i] < 0) px[i] += width;
        if (px[i] > width) px[i] -= width;
        if (py[i] < 0) py[i] += height;
        if (py[i] > height) py[i] -= height;

        const velMag = Math.sqrt(vx * vx + vy * vy);
        const hue = (210 + velMag * 120 + t * 40) % 360;

        ctx.strokeStyle = hsla(hue, 85, 62, 0.6);
        ctx.lineWidth = 1.3;
        ctx.beginPath();
        ctx.moveTo(prevX, prevY);
        ctx.lineTo(px[i], py[i]);
        ctx.stroke();
      }
    },
  };
}
