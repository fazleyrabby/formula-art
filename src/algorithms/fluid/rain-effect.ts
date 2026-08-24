import type { ArtRenderer, ParameterState, RenderContext, TimeState } from '../../types/engine';
import { hsla } from '../common/color';

// Atmospheric Rainstorm Precipitation Vectors & Damped Ripple Impacts
export function createRainEffect(): ArtRenderer {
  const MAX_DROPS = 600;
  const MAX_RIPPLES = 48;

  const dropX = new Float32Array(MAX_DROPS);
  const dropY = new Float32Array(MAX_DROPS);
  const dropSpeed = new Float32Array(MAX_DROPS);
  const dropLength = new Float32Array(MAX_DROPS);

  const ripX = new Float32Array(MAX_RIPPLES);
  const ripY = new Float32Array(MAX_RIPPLES);
  const ripRadius = new Float32Array(MAX_RIPPLES);
  const ripLife = new Float32Array(MAX_RIPPLES);
  let nextRipIdx = 0;

  return {
    setup(context: RenderContext) {
      for (let i = 0; i < MAX_DROPS; i++) {
        dropX[i] = Math.random() * context.width;
        dropY[i] = Math.random() * context.height;
        dropSpeed[i] = 400 + Math.random() * 500;
        dropLength[i] = 12 + Math.random() * 18;
      }
      ripLife.fill(-1);
    },

    render(context: RenderContext, timeState: TimeState, params: ParameterState) {
      const { ctx, width, height } = context;
      const intensity = Number(params.rainDensity || 450);
      const windAngle = Number(params.windShear || 0.15); // Wind slant radians
      const dt = Math.min(timeState.deltaTime, 0.05);
      const groundY = height * 0.88;

      ctx.fillStyle = 'rgba(4, 6, 12, 0.25)';
      ctx.fillRect(0, 0, width, height);

      // 1. Falling Precipitation Streak Vectors
      const activeCount = Math.min(MAX_DROPS, intensity);
      const windDx = Math.sin(windAngle);
      const windDy = Math.cos(windAngle);

      for (let i = 0; i < activeCount; i++) {
        dropY[i] += dropSpeed[i] * dt;
        dropX[i] += dropSpeed[i] * windDx * dt;

        // Ground collision & ripple spawn
        if (dropY[i] >= groundY) {
          dropY[i] = 0;
          dropX[i] = Math.random() * (width + 200) - 100;

          // Spawn ground impact ripple
          ripX[nextRipIdx] = dropX[i];
          ripY[nextRipIdx] = groundY + (Math.random() - 0.5) * 20;
          ripRadius[nextRipIdx] = 2;
          ripLife[nextRipIdx] = 1.0;
          nextRipIdx = (nextRipIdx + 1) % MAX_RIPPLES;
        }

        const headX = dropX[i];
        const headY = dropY[i];
        const tailX = headX - windDx * dropLength[i];
        const tailY = headY - windDy * dropLength[i];

        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(headX, headY);
        ctx.strokeStyle = 'rgba(186, 230, 253, 0.55)';
        ctx.lineWidth = 1.1;
        ctx.stroke();
      }

      // 2. Damped Bessel Circular Expansion Ripples on Ground
      for (let r = 0; r < MAX_RIPPLES; r++) {
        if (ripLife[r] > 0) {
          ripLife[r] -= dt * 2.2;
          ripRadius[r] += dt * 45;

          ctx.beginPath();
          ctx.ellipse(ripX[r], ripY[r], ripRadius[r], ripRadius[r] * 0.35, 0, 0, Math.PI * 2);
          ctx.strokeStyle = hsla(195, 90, 75, ripLife[r] * 0.7);
          ctx.lineWidth = 1.2;
          ctx.stroke();
        }
      }

      // 3. Ground Mist Glow
      ctx.fillStyle = 'rgba(56, 189, 248, 0.04)';
      ctx.fillRect(0, groundY - 15, width, height - groundY + 15);
    },
  };
}
