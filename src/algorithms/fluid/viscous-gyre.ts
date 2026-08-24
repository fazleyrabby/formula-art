import type { ArtRenderer, ParameterState, RenderContext, TimeState } from '../../types/engine';
import { hsla } from '../common/color';

// Stommel-Munk oceanic double gyre stream function: psi(x,y) = -sin(pi*x)*sin(2*pi*y)
export function createViscousGyre(): ArtRenderer {
  const MAX_PARTICLES = 1600;
  const px = new Float32Array(MAX_PARTICLES);
  const py = new Float32Array(MAX_PARTICLES);

  return {
    setup() {
      for (let i = 0; i < MAX_PARTICLES; i++) {
        px[i] = Math.random();
        py[i] = Math.random();
      }
    },

    render(context: RenderContext, timeState: TimeState, params: ParameterState) {
      const { ctx, width, height } = context;
      const count = Math.min(MAX_PARTICLES, Number(params.particleCount || 1200));
      const speed = Number(params.speed || 0.005);
      const t = timeState.time * 0.5;

      ctx.fillStyle = 'rgba(8, 9, 13, 0.15)';
      ctx.fillRect(0, 0, width, height);

      for (let i = 0; i < count; i++) {
        const x = px[i];
        const y = py[i];

        // Velocity components from stream function derivatives
        // u = -dPsi/dy, v = dPsi/dx
        const u = 2 * Math.PI * Math.sin(Math.PI * x) * Math.cos(2 * Math.PI * y + Math.sin(t) * 0.4);
        const v = -Math.PI * Math.cos(Math.PI * x) * Math.sin(2 * Math.PI * y + Math.sin(t) * 0.4);

        const prevPx = px[i] * width;
        const prevPy = py[i] * height;

        px[i] += u * speed;
        py[i] += v * speed;

        if (px[i] < 0 || px[i] > 1 || py[i] < 0 || py[i] > 1) {
          px[i] = Math.random();
          py[i] = Math.random();
          continue;
        }

        const currPx = px[i] * width;
        const currPy = py[i] * height;

        const velMag = Math.sqrt(u * u + v * v);
        const hue = (160 + velMag * 15 + t * 20) % 360;

        ctx.strokeStyle = hsla(hue, 90, 60, Math.min(0.9, velMag * 0.15 + 0.3));
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.moveTo(prevPx, prevPy);
        ctx.lineTo(currPx, currPy);
        ctx.stroke();
      }
    },
  };
}
