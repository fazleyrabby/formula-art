import type { ArtRenderer, ParameterState, RenderContext, TimeState } from '../../types/engine';
import { hsla } from '../common/color';

export function createPhyllotaxisSpiral(): ArtRenderer {
  return {
    setup() {},

    render(context: RenderContext, timeState: TimeState, params: ParameterState) {
      const { ctx, width, height } = context;
      const count = Number(params.pointCount || 1200);
      const c = Number(params.scaleFactor || 6.0);
      const speed = Number(params.rotationSpeed || 0.5);
      const divergence = Number(params.divergenceAngle || 137.508) * (Math.PI / 180);

      ctx.fillStyle = '#08090d';
      ctx.fillRect(0, 0, width, height);

      const cx = width * 0.5;
      const cy = height * 0.5;
      const t = timeState.time * speed;

      for (let n = 0; n < count; n++) {
        const theta = n * divergence + t * (1 + n * 0.0002);
        const r = c * Math.sqrt(n) * (1 + 0.05 * Math.sin(t * 2 + n * 0.02));

        const x = cx + r * Math.cos(theta);
        const y = cy + r * Math.sin(theta);

        if (x < -20 || x > width + 20 || y < -20 || y > height + 20) continue;

        const size = Math.max(1, (r / (width * 0.5)) * 4 + 1.2);
        const hue = (n * 0.35 + t * 40) % 360;

        ctx.fillStyle = hsla(hue, 90, 65, 0.85);
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fill();
      }
    },
  };
}
