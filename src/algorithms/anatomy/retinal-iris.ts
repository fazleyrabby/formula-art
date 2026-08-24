import type { ArtRenderer, ParameterState, RenderContext, TimeState } from '../../types/engine';
import { hsla } from '../common/color';

export function createRetinalIris(): ArtRenderer {
  const TRABECULAE_COUNT = 360;

  return {
    setup() {},

    render(context: RenderContext, timeState: TimeState, params: ParameterState) {
      const { ctx, width, height } = context;
      const speed = Number(params.pupilSpeed || 0.8);
      const irisRadius = Math.min(width, height) * 0.42;
      const t = timeState.time * speed;

      ctx.fillStyle = '#040508';
      ctx.fillRect(0, 0, width, height);

      const cx = width * 0.5;
      const cy = height * 0.5;

      // Pupillary Light Reflex: dynamic pupil constriction & dilation
      const pupilConstriction = 0.28 + 0.12 * Math.sin(t * 1.5);
      const pupilRadius = irisRadius * pupilConstriction;

      // 1. Scleral Limbus Outer Border
      ctx.beginPath();
      ctx.arc(cx, cy, irisRadius, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.5)';
      ctx.lineWidth = 3;
      ctx.stroke();

      // 2. Radial Trabecular Meshwork Collagen Fibers
      for (let i = 0; i < TRABECULAE_COUNT; i++) {
        const phi = (i / TRABECULAE_COUNT) * Math.PI * 2;
        
        // Fiber undulation & crypts of Fuchs
        const fiberWobble = Math.sin(phi * 18 + t * 2) * (irisRadius * 0.05);
        const startR = pupilRadius;
        const endR = irisRadius + fiberWobble;

        const x1 = cx + Math.cos(phi) * startR;
        const y1 = cy + Math.sin(phi) * startR;

        // Ciliary zone contraction furrow control point
        const midR = (startR + endR) * 0.52;
        const midAngle = phi + Math.sin(phi * 6 + t) * 0.04;
        const xMid = cx + Math.cos(midAngle) * midR;
        const yMid = cy + Math.sin(midAngle) * midR;

        const x2 = cx + Math.cos(phi) * endR;
        const y2 = cy + Math.sin(phi) * endR;

        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.quadraticCurveTo(xMid, yMid, x2, y2);

        // Heterochromia gradient: warm amber near collarette to turquoise at periphery
        const normR = i / TRABECULAE_COUNT;
        const fiberHue = (180 + Math.sin(normR * Math.PI * 4) * 40 + t * 10) % 360;
        ctx.strokeStyle = hsla(fiberHue, 85, 60, 0.45);
        ctx.lineWidth = 1.1;
        ctx.stroke();
      }

      // 3. Iris Collarette (Zig-Zag circular ridge)
      const collaretteR = (pupilRadius + irisRadius) * 0.48;
      ctx.beginPath();
      const cSteps = 72;
      for (let i = 0; i <= cSteps; i++) {
        const a = (i / cSteps) * Math.PI * 2;
        const r = collaretteR + (i % 2 === 0 ? 6 : -6);
        const px = cx + Math.cos(a) * r;
        const py = cy + Math.sin(a) * r;
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.closePath();
      ctx.strokeStyle = hsla(45, 95, 70, 0.7);
      ctx.lineWidth = 1.6;
      ctx.stroke();

      // 4. Central Pupil (Deep Aperture Void)
      ctx.fillStyle = '#020305';
      ctx.beginPath();
      ctx.arc(cx, cy, pupilRadius, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = hsla(38, 90, 60, 0.9);
      ctx.lineWidth = 2.0;
      ctx.stroke();

      // Cornea Corneal Glint Reflection
      ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
      ctx.beginPath();
      ctx.arc(cx - pupilRadius * 0.35, cy - pupilRadius * 0.35, 5, 0, Math.PI * 2);
      ctx.fill();
    },
  };
}
