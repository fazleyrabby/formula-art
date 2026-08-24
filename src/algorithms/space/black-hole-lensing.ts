import type { ArtRenderer, ParameterState, RenderContext, TimeState } from '../../types/engine';
import { hsla } from '../common/color';

// Schwarzschild gravitational light deflection & relativistic accretion disk
export function createBlackHoleLensing(): ArtRenderer {
  const PARTICLES = 2200;
  const rad = new Float32Array(PARTICLES);
  const ang = new Float32Array(PARTICLES);
  const speed = new Float32Array(PARTICLES);

  return {
    setup() {
      for (let i = 0; i < PARTICLES; i++) {
        rad[i] = 40 + Math.random() * 160;
        ang[i] = Math.random() * Math.PI * 2;
        // Keplerian orbital speed v ~ 1/sqrt(r)
        speed[i] = 2.5 / Math.sqrt(rad[i]);
      }
    },

    render(context: RenderContext, _timeState: TimeState, params: ParameterState) {
      const { ctx, width, height } = context;
      const rs = Number(params.schwarzschildRadius || 36);
      const cx = width * 0.5;
      const cy = height * 0.5;

      ctx.fillStyle = 'rgba(8, 9, 13, 0.25)';
      ctx.fillRect(0, 0, width, height);

      // Accretion disk particles
      for (let i = 0; i < PARTICLES; i++) {
        ang[i] += speed[i] * 0.04;

        // Relativistic disk inclination & gravitational lensing warping
        const inclination = 0.45;
        const rawX = Math.cos(ang[i]) * rad[i];
        const rawY = Math.sin(ang[i]) * rad[i] * inclination;

        // Lensing bending: light rays bent around photon sphere
        const d = Math.sqrt(rawX * rawX + rawY * rawY);
        let warpedX = rawX;
        let warpedY = rawY;

        if (d > rs && rawY < 0) {
          // Einstein ring upper projection
          const bend = (rs * 1.5) / d;
          warpedY = rawY - bend * 22;
        }

        const px = cx + warpedX;
        const py = cy + warpedY;

        // Relativistic Doppler beaming (approaching side is brighter/bluer)
        const doppler = Math.sin(ang[i]);
        const hue = doppler > 0 ? 190 + doppler * 30 : 25 + Math.abs(doppler) * 20;
        const alpha = Math.min(1, Math.max(0.1, (1 + doppler * 0.6) * (1 - rad[i] / 220)));

        ctx.fillStyle = hsla(hue, 95, 65, alpha);
        ctx.fillRect(px, py, 1.8, 1.8);
      }

      // Event Horizon & Photon Sphere Glow
      ctx.beginPath();
      ctx.arc(cx, cy, rs * 1.5, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.4)';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Absolute Event Horizon shadow
      ctx.fillStyle = '#050608';
      ctx.beginPath();
      ctx.arc(cx, cy, rs, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
      ctx.lineWidth = 1;
      ctx.stroke();
    },
  };
}
