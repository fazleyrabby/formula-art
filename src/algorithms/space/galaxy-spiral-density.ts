import type { ArtRenderer, ParameterState, RenderContext, TimeState } from '../../types/engine';
import { hsla } from '../common/color';

// Lin-Shu Spiral Density Wave Galaxy Theory
export function createGalaxySpiralDensity(): ArtRenderer {
  const STARS = 2500;
  const starR = new Float32Array(STARS);
  const starTheta = new Float32Array(STARS);
  const starSpeed = new Float32Array(STARS);

  return {
    setup() {
      for (let i = 0; i < STARS; i++) {
        // Density exponential distribution
        starR[i] = Math.pow(Math.random(), 1.6) * 220 + 8;
        starTheta[i] = Math.random() * Math.PI * 2;
        // Flat rotation curve v ~ const for dark matter halo
        starSpeed[i] = 0.8 + 0.2 * (starR[i] / 220);
      }
    },

    render(context: RenderContext, timeState: TimeState, params: ParameterState) {
      const { ctx, width, height } = context;
      const t = timeState.time * Number(params.speed || 0.6);
      const arms = Number(params.armCount || 2);
      const pitch = Number(params.pitchAngle || 0.22);
      const scale = Math.min(width, height) / 500;

      ctx.fillStyle = 'rgba(8, 9, 13, 0.2)';
      ctx.fillRect(0, 0, width, height);

      const cx = width * 0.5;
      const cy = height * 0.5;

      // Galaxy core
      ctx.fillStyle = '#ffffff';
      ctx.shadowColor = '#38bdf8';
      ctx.shadowBlur = 24;
      ctx.beginPath();
      ctx.arc(cx, cy, 6 * scale, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;

      for (let i = 0; i < STARS; i++) {
        starTheta[i] += (starSpeed[i] / (starR[i] * 0.4 + 10)) * 0.4;

        // Logarithmic spiral perturbation: theta_arm = (1/pitch) * ln(r/r0)
        const armPhase = (1 / pitch) * Math.log(starR[i] / 10) - t * 0.4;
        const distToArm = Math.sin(arms * (starTheta[i] - armPhase));

        // Density wave compression
        const effectiveR = starR[i] * (1 - 0.12 * distToArm);
        const px = cx + Math.cos(starTheta[i]) * effectiveR * scale;
        const py = cy + Math.sin(starTheta[i]) * effectiveR * scale;

        const isArm = distToArm > 0.3;
        const hue = isArm ? (200 + starR[i] * 0.3) % 360 : (270 + starR[i] * 0.4) % 360;
        const alpha = Math.min(1, Math.max(0.15, (1 - starR[i] / 240) * (isArm ? 1 : 0.4)));

        ctx.fillStyle = hsla(hue, 90, 70, alpha);
        ctx.fillRect(px, py, 1.5 * scale, 1.5 * scale);
      }
    },
  };
}
