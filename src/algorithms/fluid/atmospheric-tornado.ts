import type { ArtRenderer, ParameterState, RenderContext, TimeState } from '../../types/engine';
import { hsla } from '../common/color';

// Atmospheric Rankine Combined Vortex Tornado Dynamics
export function createAtmosphericTornado(): ArtRenderer {
  const PARTICLE_COUNT = 1200;
  const px = new Float32Array(PARTICLE_COUNT);
  const py = new Float32Array(PARTICLE_COUNT);
  const pz = new Float32Array(PARTICLE_COUNT); // Height from ground (0) to cloud base (1)
  const pAngle = new Float32Array(PARTICLE_COUNT);
  const pRadius = new Float32Array(PARTICLE_COUNT);
  const pSpeed = new Float32Array(PARTICLE_COUNT);

  return {
    setup() {
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        pz[i] = Math.random();
        pAngle[i] = Math.random() * Math.PI * 2;
        pRadius[i] = 0.2 + Math.random() * 0.8;
        pSpeed[i] = 1.5 + Math.random() * 2.5;
      }
    },

    render(context: RenderContext, timeState: TimeState, params: ParameterState) {
      const { ctx, width, height } = context;
      const swirlSpeed = Number(params.swirlSpeed || 1.4);
      const funnelWidth = Number(params.funnelWidth || 1.0);
      const dt = Math.min(timeState.deltaTime, 0.05) * swirlSpeed;
      const t = timeState.time * swirlSpeed;

      ctx.fillStyle = 'rgba(5, 7, 12, 0.22)';
      ctx.fillRect(0, 0, width, height);

      const groundX = width * 0.5 + Math.sin(t * 0.6) * (width * 0.06);
      const groundY = height * 0.92;
      const cloudY = height * 0.08;
      const totalH = groundY - cloudY;

      // 1. Draw Central Mesocyclone Funnel Core (Continuous Hyperbolic Curves)
      ctx.beginPath();
      const funnelSlices = 40;
      for (let s = 0; s <= funnelSlices; s++) {
        const normZ = s / funnelSlices;
        const curY = groundY - normZ * totalH;
        // Hyperbolic funnel expansion with altitude
        const curR = (18 + Math.pow(normZ, 2.2) * 160) * funnelWidth;
        const sway = Math.sin(t * 1.5 + normZ * 3) * (40 * normZ);
        const curX = groundX + sway;

        const leftX = curX - curR;
        if (s === 0) ctx.moveTo(leftX, curY);
        else ctx.lineTo(leftX, curY);
      }

      for (let s = funnelSlices; s >= 0; s--) {
        const normZ = s / funnelSlices;
        const curY = groundY - normZ * totalH;
        const curR = (18 + Math.pow(normZ, 2.2) * 160) * funnelWidth;
        const sway = Math.sin(t * 1.5 + normZ * 3) * (40 * normZ);
        const curX = groundX + sway;

        const rightX = curX + curR;
        ctx.lineTo(rightX, curY);
      }
      ctx.closePath();
      ctx.fillStyle = 'rgba(14, 25, 45, 0.2)';
      ctx.fill();
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.3)';
      ctx.lineWidth = 1.2;
      ctx.stroke();

      // 2. Swirling Rankine Vortex Debris & Condensation Particles
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        // Vertical updraft motion
        pz[i] += dt * (0.35 + pz[i] * 0.4);
        if (pz[i] > 1.0) {
          pz[i] = 0;
          pAngle[i] = Math.random() * Math.PI * 2;
          pRadius[i] = 0.2 + Math.random() * 0.8;
        }

        // Rankine angular velocity: faster spin near core, decaying with distance
        const rNorm = pRadius[i];
        const angularVel = (pSpeed[i] / (0.3 + rNorm * 0.7)) * 4.0;
        pAngle[i] += angularVel * dt;

        // Funnel boundary at height z
        const funnelR = (20 + Math.pow(pz[i], 2.2) * 170) * funnelWidth;
        const radius = funnelR * rNorm;

        const sway = Math.sin(t * 1.5 + pz[i] * 3) * (40 * pz[i]);
        const centerX = groundX + sway;
        const posY = groundY - pz[i] * totalH;

        const posX = centerX + Math.cos(pAngle[i]) * radius;
        // Tilting 3D perspective
        const depth = Math.sin(pAngle[i]); // -1 (back) to +1 (front)
        const pyDepth = posY + depth * (radius * 0.2);

        px[i] = posX;
        py[i] = pyDepth;

        // Particle size & luminescence based on depth and altitude
        const depthAlpha = 0.2 + (depth + 1) * 0.35;
        const hue = (195 + pz[i] * 30 + depth * 15) % 360;
        const size = (1.2 + (depth + 1) * 0.8) * (1 + (1 - pz[i]) * 0.6);

        ctx.fillStyle = hsla(hue, 85, 65 + depth * 15, depthAlpha);
        ctx.fillRect(posX - size * 0.5, pyDepth - size * 0.5, size, size);
      }
    },
  };
}
