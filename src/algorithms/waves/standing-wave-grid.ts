import type { ArtRenderer, ParameterState, RenderContext, TimeState } from '../../types/engine';
import { hsla } from '../common/color';

// 2D Chladni Resonance Pattern: w = a*sin(n*pi*x)*sin(m*pi*y) - b*sin(m*pi*x)*sin(n*pi*y)
export function createStandingWaveGrid(): ArtRenderer {
  const MAX_SAND = 3000;
  const px = new Float32Array(MAX_SAND);
  const py = new Float32Array(MAX_SAND);

  return {
    setup() {
      for (let i = 0; i < MAX_SAND; i++) {
        px[i] = Math.random();
        py[i] = Math.random();
      }
    },

    render(context: RenderContext, timeState: TimeState, params: ParameterState) {
      const { ctx, width, height } = context;
      const count = Math.min(MAX_SAND, Number(params.sandCount || 2400));
      const n = Number(params.modeN || 3) + Math.sin(timeState.time * 0.3) * 0.5;
      const m = Number(params.modeM || 5) + Math.cos(timeState.time * 0.25) * 0.5;
      const t = timeState.time;

      ctx.fillStyle = 'rgba(8, 9, 13, 0.2)';
      ctx.fillRect(0, 0, width, height);

      for (let i = 0; i < count; i++) {
        const x = px[i];
        const y = py[i];

        // Chladni nodal plate equation
        const val =
          Math.sin(n * Math.PI * x) * Math.sin(m * Math.PI * y) -
          Math.sin(m * Math.PI * x) * Math.sin(n * Math.PI * y);

        // Particles drift toward nodal lines where vibration is zero
        const eps = 0.01;
        const valDx =
          Math.sin(n * Math.PI * (x + eps)) * Math.sin(m * Math.PI * y) -
          Math.sin(m * Math.PI * (x + eps)) * Math.sin(n * Math.PI * y);
        const valDy =
          Math.sin(n * Math.PI * x) * Math.sin(m * Math.PI * (y + eps)) -
          Math.sin(m * Math.PI * x) * Math.sin(n * Math.PI * (y + eps));

        const gradX = (Math.abs(valDx) - Math.abs(val)) / eps;
        const gradY = (Math.abs(valDy) - Math.abs(val)) / eps;

        px[i] -= gradX * 0.0006 + (Math.random() - 0.5) * 0.002;
        py[i] -= gradY * 0.0006 + (Math.random() - 0.5) * 0.002;

        if (px[i] < 0) px[i] = Math.random();
        if (px[i] > 1) px[i] = Math.random();
        if (py[i] < 0) py[i] = Math.random();
        if (py[i] > 1) py[i] = Math.random();

        const renderX = px[i] * width;
        const renderY = py[i] * height;
        const hue = (210 + Math.abs(val) * 120 + t * 10) % 360;

        ctx.fillStyle = hsla(hue, 90, 70, 0.8);
        ctx.fillRect(renderX, renderY, 1.6, 1.6);
      }
    },
  };
}
