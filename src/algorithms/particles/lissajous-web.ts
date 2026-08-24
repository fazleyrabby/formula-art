import type { ArtRenderer, ParameterState, RenderContext, TimeState } from '../../types/engine';
import { hsla } from '../common/color';

// 3D-projected parametric Lissajous bowditch knot curves
export function createLissajousWeb(): ArtRenderer {
  return {
    setup() {},

    render(context: RenderContext, timeState: TimeState, params: ParameterState) {
      const { ctx, width, height } = context;
      const t = timeState.time * Number(params.speed || 0.6);
      const a = Number(params.freqA || 3);
      const b = Number(params.freqB || 4);
      const c = Number(params.freqC || 5);
      const delta = Number(params.phaseDelta || Math.PI / 2) + t * 0.4;
      const points = 1200;

      ctx.fillStyle = 'rgba(8, 9, 13, 0.15)';
      ctx.fillRect(0, 0, width, height);

      const cx = width * 0.5;
      const cy = height * 0.5;
      const rx = width * 0.38;
      const ry = height * 0.38;

      ctx.beginPath();
      for (let i = 0; i <= points; i++) {
        const phi = (i / points) * Math.PI * 2;
        
        // 3D Lissajous knot
        const lx = Math.sin(a * phi + delta);
        const ly = Math.sin(b * phi);
        const lz = Math.cos(c * phi + t);

        // Simple perspective projection with rotation
        const rotY = lx * Math.cos(t * 0.3) - lz * Math.sin(t * 0.3);
        const rotZ = lx * Math.sin(t * 0.3) + lz * Math.cos(t * 0.3);
        const depth = (rotZ + 2) / 3;

        const px = cx + rotY * rx * depth;
        const py = cy + ly * ry * depth;

        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }

      ctx.strokeStyle = hsla((280 + t * 30) % 360, 85, 65, 0.8);
      ctx.lineWidth = 1.8;
      ctx.stroke();

      // Secondary nested harmonograph harmonic
      ctx.beginPath();
      for (let i = 0; i <= points; i += 4) {
        const phi = (i / points) * Math.PI * 2;
        const px = cx + Math.sin(a * phi + delta) * (rx * 0.75) * Math.cos(t * 0.5);
        const py = cy + Math.sin(b * phi + t) * (ry * 0.75);

        ctx.fillStyle = hsla((i * 0.5 + t * 50) % 360, 95, 70, 0.8);
        ctx.fillRect(px - 1.5, py - 1.5, 3, 3);
      }
    },
  };
}
