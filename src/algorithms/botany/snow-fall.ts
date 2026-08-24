import type { ArtRenderer, ParameterState, RenderContext, TimeState } from '../../types/engine';
import { hsla } from '../common/color';

// Atmospheric Brownian Snowfall Flutter & Depth Parallax
export function createSnowFall(): ArtRenderer {
  const FLAKE_COUNT = 450;
  const fx = new Float32Array(FLAKE_COUNT);
  const fy = new Float32Array(FLAKE_COUNT);
  const fRadius = new Float32Array(FLAKE_COUNT);
  const fSpeed = new Float32Array(FLAKE_COUNT);
  const fWobblePhase = new Float32Array(FLAKE_COUNT);
  const fWobbleFreq = new Float32Array(FLAKE_COUNT);
  const fRotation = new Float32Array(FLAKE_COUNT);

  return {
    setup(context: RenderContext) {
      for (let i = 0; i < FLAKE_COUNT; i++) {
        fx[i] = Math.random() * context.width;
        fy[i] = Math.random() * context.height;
        // Depth distribution: small distant flakes vs large foreground flakes
        const depth = Math.pow(Math.random(), 2.0); // Bias toward background
        fRadius[i] = 1.0 + depth * 4.5;
        fSpeed[i] = 25 + depth * 70; // Stokes settling velocity
        fWobblePhase[i] = Math.random() * Math.PI * 2;
        fWobbleFreq[i] = 1.0 + Math.random() * 2.5;
        fRotation[i] = Math.random() * Math.PI * 2;
      }
    },

    render(context: RenderContext, timeState: TimeState, params: ParameterState) {
      const { ctx, width, height } = context;
      const windForce = Number(params.windDrift || 0.4);
      const flakeDensity = Number(params.flakeDensity || 380);
      const dt = Math.min(timeState.deltaTime, 0.05);
      const t = timeState.time;

      ctx.fillStyle = '#05070e';
      ctx.fillRect(0, 0, width, height);

      const activeCount = Math.min(FLAKE_COUNT, flakeDensity);

      for (let i = 0; i < activeCount; i++) {
        // Brownian horizontal flutter + global wind wave
        fWobblePhase[i] += fWobbleFreq[i] * dt;
        const drift = Math.sin(fWobblePhase[i]) * 1.2 + windForce * (fRadius[i] * 0.8);
        fRotation[i] += dt * (fWobbleFreq[i] * 0.5);

        fy[i] += fSpeed[i] * dt;
        fx[i] += drift;

        // Wrap around screen boundaries
        if (fy[i] > height + 10) {
          fy[i] = -10;
          fx[i] = Math.random() * (width + 100) - 50;
        }
        if (fx[i] > width + 20) fx[i] = -20;
        if (fx[i] < -20) fx[i] = width + 20;

        const posX = fx[i];
        const posY = fy[i];
        const r = fRadius[i];

        // Foreground large flakes render delicate 6-pointed hexagonal crystallites
        if (r > 3.2) {
          ctx.save();
          ctx.translate(posX, posY);
          ctx.rotate(fRotation[i]);

          ctx.beginPath();
          for (let k = 0; k < 6; k++) {
            const angle = (k / 6) * Math.PI * 2;
            const armLen = r * 1.5;
            ctx.moveTo(0, 0);
            ctx.lineTo(Math.cos(angle) * armLen, Math.sin(angle) * armLen);

            // Side dendrite branches
            const subAngle1 = angle + 0.5;
            const subAngle2 = angle - 0.5;
            const midX = Math.cos(angle) * (armLen * 0.55);
            const midY = Math.sin(angle) * (armLen * 0.55);
            ctx.moveTo(midX, midY);
            ctx.lineTo(midX + Math.cos(subAngle1) * (r * 0.5), midY + Math.sin(subAngle1) * (r * 0.5));
            ctx.moveTo(midX, midY);
            ctx.lineTo(midX + Math.cos(subAngle2) * (r * 0.5), midY + Math.sin(subAngle2) * (r * 0.5));
          }
          ctx.strokeStyle = 'rgba(240, 249, 255, 0.9)';
          ctx.lineWidth = 1.0;
          ctx.stroke();
          ctx.restore();
        } else {
          // Soft glowing bokeh circular snow particles
          const alpha = 0.35 + (r / 3.2) * 0.55;
          ctx.fillStyle = hsla(210, 80, 92, alpha);
          ctx.beginPath();
          ctx.arc(posX, posY, r, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    },
  };
}
