import type { ArtRenderer, ParameterState, RenderContext, TimeState } from '../../types/engine';
import { hsla } from '../common/color';
import { fbm2D } from '../common/math-utils';

export function createPerlinTendrils(): ArtRenderer {
  const MAX_PARTICLES = 1500;
  const posX = new Float32Array(MAX_PARTICLES);
  const posY = new Float32Array(MAX_PARTICLES);
  const life = new Float32Array(MAX_PARTICLES);
  const maxLife = new Float32Array(MAX_PARTICLES);

  return {
    setup(context: RenderContext) {
      for (let i = 0; i < MAX_PARTICLES; i++) {
        posX[i] = Math.random() * context.width;
        posY[i] = Math.random() * context.height;
        life[i] = Math.random() * 200;
        maxLife[i] = 100 + Math.random() * 200;
      }
    },

    render(context: RenderContext, timeState: TimeState, params: ParameterState) {
      const { ctx, width, height } = context;
      const count = Math.min(MAX_PARTICLES, Number(params.particleCount || 1000));
      const speed = Number(params.speed || 1.5);
      const noiseScale = Number(params.noiseScale || 0.003);
      const t = timeState.time * 0.15;

      ctx.fillStyle = 'rgba(8, 9, 13, 0.08)';
      ctx.fillRect(0, 0, width, height);

      for (let i = 0; i < count; i++) {
        const angle = fbm2D(posX[i] * noiseScale, posY[i] * noiseScale + t) * Math.PI * 4;

        const prevX = posX[i];
        const prevY = posY[i];

        posX[i] += Math.cos(angle) * speed;
        posY[i] += Math.sin(angle) * speed;
        life[i]++;

        if (
          life[i] > maxLife[i] ||
          posX[i] < 0 ||
          posX[i] > width ||
          posY[i] < 0 ||
          posY[i] > height
        ) {
          posX[i] = Math.random() * width;
          posY[i] = Math.random() * height;
          life[i] = 0;
          continue;
        }

        const progress = life[i] / maxLife[i];
        const alpha = Math.sin(progress * Math.PI) * 0.6;
        const hue = (160 + angle * 25 + timeState.time * 10) % 360;

        ctx.beginPath();
        ctx.moveTo(prevX, prevY);
        ctx.lineTo(posX[i], posY[i]);
        ctx.strokeStyle = hsla(hue, 80, 60, alpha);
        ctx.lineWidth = 1.2;
        ctx.stroke();
      }
    },
  };
}
