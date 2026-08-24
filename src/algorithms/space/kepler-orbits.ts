import type { ArtRenderer, ParameterState, RenderContext, TimeState } from '../../types/engine';
import { hsla } from '../common/color';

// Multi-body Keplerian Elliptical Orbit Conic Trajectories
export function createKeplerOrbits(): ArtRenderer {
  const BODIES = 6;
  const a = [60, 95, 130, 165, 205, 250]; // Semi-major axes
  const e = [0.2, 0.45, 0.15, 0.6, 0.3, 0.5]; // Eccentricities
  const incl = [0, 0.3, -0.4, 0.6, -0.2, 0.5];

  return {
    setup() {},

    render(context: RenderContext, timeState: TimeState, params: ParameterState) {
      const { ctx, width, height } = context;
      const t = timeState.time * Number(params.speed || 0.8);
      const cx = width * 0.5;
      const cy = height * 0.5;

      ctx.fillStyle = 'rgba(8, 9, 13, 0.18)';
      ctx.fillRect(0, 0, width, height);

      // Central Star
      ctx.fillStyle = '#fde047';
      ctx.shadowColor = '#f59e0b';
      ctx.shadowBlur = 18;
      ctx.beginPath();
      ctx.arc(cx, cy, 7, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;

      for (let b = 0; b < BODIES; b++) {
        const semiA = a[b] * (Math.min(width, height) / 600);
        const ecc = e[b];
        const semiB = semiA * Math.sqrt(1 - ecc * ecc);
        const focusOffset = semiA * ecc;

        // Draw full elliptical orbit track
        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(incl[b] + t * 0.05);
        ctx.beginPath();
        ctx.ellipse(-focusOffset, 0, semiA, semiB, 0, 0, Math.PI * 2);
        ctx.strokeStyle = hsla((b * 45 + 180) % 360, 70, 50, 0.25);
        ctx.lineWidth = 1;
        ctx.stroke();

        // Kepler's 3rd Law: T^2 = a^3 -> Period ~ a^1.5
        const orbitalPeriod = Math.pow(semiA / 50, 1.5);
        const meanAnomaly = (t / orbitalPeriod) * Math.PI * 2;

        // Approximate eccentric anomaly solve: E - e*sin(E) = M
        let E = meanAnomaly;
        for (let iter = 0; iter < 4; iter++) {
          E = E - (E - ecc * Math.sin(E) - meanAnomaly) / (1 - ecc * Math.cos(E));
        }

        const planetX = semiA * Math.cos(E) - focusOffset;
        const planetY = semiB * Math.sin(E);

        const hue = (b * 50 + 190) % 360;
        ctx.fillStyle = hsla(hue, 95, 70, 0.95);
        ctx.shadowColor = hsla(hue, 95, 70, 0.8);
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.arc(planetX, planetY, 3.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;

        ctx.restore();
      }
    },
  };
}
