import type { ArtRenderer, ParameterState, RenderContext, TimeState } from '../../types/engine';
import { hsla } from '../common/color';

export function createVortexFilament(): ArtRenderer {
  const MAX_PARTICLES = 2000;
  const px = new Float32Array(MAX_PARTICLES);
  const py = new Float32Array(MAX_PARTICLES);

  // 4 dynamic vortex cores
  const vortexX = new Float32Array(4);
  const vortexY = new Float32Array(4);
  const vortexGamma = new Float32Array([120, -140, 100, -110]);

  return {
    setup(context: RenderContext) {
      for (let i = 0; i < MAX_PARTICLES; i++) {
        px[i] = Math.random() * context.width;
        py[i] = Math.random() * context.height;
      }
    },

    render(context: RenderContext, timeState: TimeState, params: ParameterState) {
      const { ctx, width, height } = context;
      const count = Math.min(MAX_PARTICLES, Number(params.particleCount || 1600));
      const coreR = Number(params.coreRadius || 20);
      const coreRSq = coreR * coreR;
      const t = timeState.time * 0.8;

      ctx.fillStyle = 'rgba(8, 9, 13, 0.18)';
      ctx.fillRect(0, 0, width, height);

      const cx = width * 0.5;
      const cy = height * 0.5;
      const rOrb = Math.min(width, height) * 0.25;

      // Orbiting vortex filament centers
      vortexX[0] = cx + Math.cos(t) * rOrb;
      vortexY[0] = cy + Math.sin(t) * rOrb;
      vortexX[1] = cx + Math.cos(t + Math.PI) * rOrb;
      vortexY[1] = cy + Math.sin(t + Math.PI) * rOrb;
      vortexX[2] = cx + Math.cos(-t * 1.3 + 1.2) * (rOrb * 0.6);
      vortexY[2] = cy + Math.sin(-t * 1.3 + 1.2) * (rOrb * 0.6);
      vortexX[3] = cx + Math.cos(-t * 1.3 - 1.2) * (rOrb * 0.6);
      vortexY[3] = cy + Math.sin(-t * 1.3 - 1.2) * (rOrb * 0.6);

      ctx.lineWidth = 1.1;

      for (let i = 0; i < count; i++) {
        let vx = 0;
        let vy = 0;

        // Biot-Savart 2D point vortex summation
        for (let v = 0; v < 4; v++) {
          const dx = px[i] - vortexX[v];
          const dy = py[i] - vortexY[v];
          const dSq = dx * dx + dy * dy;
          const factor = (vortexGamma[v] / (2 * Math.PI * (dSq + coreRSq))) * 12;

          vx += -dy * factor;
          vy += dx * factor;
        }

        const oldX = px[i];
        const oldY = py[i];

        px[i] += vx;
        py[i] += vy;

        // Wrap boundaries
        if (px[i] < 0) px[i] += width;
        if (px[i] > width) px[i] -= width;
        if (py[i] < 0) py[i] += height;
        if (py[i] > height) py[i] -= height;

        const speed = Math.sqrt(vx * vx + vy * vy);
        const hue = (180 + speed * 15 + t * 20) % 360;

        ctx.strokeStyle = hsla(hue, 90, 60, Math.min(0.85, speed * 0.3 + 0.2));
        ctx.beginPath();
        ctx.moveTo(oldX, oldY);
        ctx.lineTo(px[i], py[i]);
        ctx.stroke();
      }
    },
  };
}
