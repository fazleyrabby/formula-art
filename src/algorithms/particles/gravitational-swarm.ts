import type { ArtRenderer, ParameterState, RenderContext, TimeState } from '../../types/engine';
import { hsla } from '../common/color';

export function createGravitationalSwarm(): ArtRenderer {
  const MAX_PARTICLES = 2000;
  const px = new Float32Array(MAX_PARTICLES);
  const py = new Float32Array(MAX_PARTICLES);
  const vx = new Float32Array(MAX_PARTICLES);
  const vy = new Float32Array(MAX_PARTICLES);

  return {
    setup(context: RenderContext) {
      const cx = context.width * 0.5;
      const cy = context.height * 0.5;
      for (let i = 0; i < MAX_PARTICLES; i++) {
        const angle = Math.random() * Math.PI * 2;
        const r = 50 + Math.random() * (context.width * 0.35);
        px[i] = cx + Math.cos(angle) * r;
        py[i] = cy + Math.sin(angle) * r;

        // Tangential velocity for stable orbital swarm
        const vMag = Math.sqrt(800 / r);
        vx[i] = -Math.sin(angle) * vMag;
        vy[i] = Math.cos(angle) * vMag;
      }
    },

    render(context: RenderContext, timeState: TimeState, params: ParameterState) {
      const { ctx, width, height } = context;
      const count = Math.min(MAX_PARTICLES, Number(params.particleCount || 1500));
      const G = Number(params.gravity || 900);
      const damping = 0.999;
      const t = timeState.time;

      ctx.fillStyle = 'rgba(8, 9, 13, 0.15)';
      ctx.fillRect(0, 0, width, height);

      // Dual moving attractors
      const cx1 = width * 0.5 + Math.cos(t * 0.7) * (width * 0.15);
      const cy1 = height * 0.5 + Math.sin(t * 0.7) * (height * 0.15);
      const cx2 = width * 0.5 - Math.cos(t * 0.7) * (width * 0.15);
      const cy2 = height * 0.5 - Math.sin(t * 0.7) * (height * 0.15);

      for (let i = 0; i < count; i++) {
        // Attractor 1
        const dx1 = cx1 - px[i];
        const dy1 = cy1 - py[i];
        const d1Sq = dx1 * dx1 + dy1 * dy1 + 400;
        const f1 = G / (d1Sq * Math.sqrt(d1Sq));
        vx[i] += dx1 * f1;
        vy[i] += dy1 * f1;

        // Attractor 2
        const dx2 = cx2 - px[i];
        const dy2 = cy2 - py[i];
        const d2Sq = dx2 * dx2 + dy2 * dy2 + 400;
        const f2 = G / (d2Sq * Math.sqrt(d2Sq));
        vx[i] += dx2 * f2;
        vy[i] += dy2 * f2;

        vx[i] *= damping;
        vy[i] *= damping;

        const oldX = px[i];
        const oldY = py[i];

        px[i] += vx[i];
        py[i] += vy[i];

        const speed = Math.sqrt(vx[i] * vx[i] + vy[i] * vy[i]);
        const hue = (200 + speed * 25 + t * 15) % 360;

        ctx.strokeStyle = hsla(hue, 90, 65, Math.min(0.9, speed * 0.2 + 0.3));
        ctx.lineWidth = Math.min(2.5, speed * 0.4 + 0.8);
        ctx.beginPath();
        ctx.moveTo(oldX, oldY);
        ctx.lineTo(px[i], py[i]);
        ctx.stroke();
      }
    },
  };
}
