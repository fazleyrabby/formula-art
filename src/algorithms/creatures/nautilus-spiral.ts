import type { ArtRenderer, ParameterState, RenderContext, TimeState } from '../../types/engine';
import { hsla } from '../common/color';

// Yuruyurau-Style Luminous Nautilus Shell Spiral (Nautilus Pompilius)
// Built with 36 concentric logarithmic equiangular spiral streamlines, additive alpha glow,
// 24 radiant septal chamber septa, and an axial siphuncle vascular cord.
export function createNautilusSpiral(): ArtRenderer {
  const SPIRAL_STRANDS = 32;
  const CHAMBERS = 24;

  return {
    setup() {},

    render(context: RenderContext, timeState: TimeState, params: ParameterState) {
      const { ctx, width, height } = context;
      const speed = Number(params.growthRate || 0.8);
      const chambersCount = Number(params.chamberCount || 20);
      const t = timeState.time * speed;

      ctx.fillStyle = '#020307';
      ctx.fillRect(0, 0, width, height);

      const cx = width * 0.46;
      const cy = height * 0.52;
      const scale = Math.min(width, height) * 0.38;

      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(t * 0.2);

      ctx.globalCompositeOperation = 'screen';

      const baseHue = (25 + Math.sin(t * 0.5) * 20) % 360;

      // 1. Yuruyurau 32 Concentric Logarithmic Equiangular Spiral Streamlines
      const b = 0.175; // Logarithmic growth constant (cotan of spiral angle)
      const maxTheta = Math.PI * 4.5;

      for (let s = 0; s < SPIRAL_STRANDS; s++) {
        const normS = (s + 1) / SPIRAL_STRANDS;
        const a = scale * 0.035 * (0.4 + normS * 0.75);

        ctx.beginPath();
        const steps = 140;
        for (let i = 0; i <= steps; i++) {
          const theta = (i / steps) * maxTheta;
          const r = a * Math.exp(b * theta);
          
          // Subtle undulating shell growth ripple
          const ripple = Math.sin(theta * 8 + t * 2 + normS * 3) * (1.5 * normS);
          const px = (r + ripple) * Math.cos(theta);
          const py = (r + ripple) * Math.sin(theta);

          if (i === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }

        const strandHue = (baseHue + normS * 35) % 360;
        ctx.strokeStyle = hsla(strandHue, 95, 72, (0.06 + normS * 0.3));
        ctx.lineWidth = normS > 0.88 ? 1.6 : 0.8;
        ctx.stroke();
      }

      // 2. Septa Chamber Walls (Curving Bio-Partitions)
      for (let c = 1; c <= CHAMBERS; c++) {
        if (c > chambersCount) break;
        const normC = c / CHAMBERS;
        const thetaC = normC * maxTheta;
        const rOuter = (scale * 0.035 * 1.15) * Math.exp(b * thetaC);
        const rInner = (scale * 0.035 * 1.15) * Math.exp(b * (thetaC - Math.PI * 2));

        const pOuterX = rOuter * Math.cos(thetaC);
        const pOuterY = rOuter * Math.sin(thetaC);
        const pInnerX = Math.max(0, rInner) * Math.cos(thetaC - Math.PI * 2);
        const pInnerY = Math.max(0, rInner) * Math.sin(thetaC - Math.PI * 2);

        // Curving hyperbolic septum
        ctx.beginPath();
        ctx.moveTo(pInnerX, pInnerY);
        const midX = (pInnerX + pOuterX) * 0.5 + Math.sin(thetaC) * 12;
        const midY = (pInnerY + pOuterY) * 0.5 - Math.cos(thetaC) * 12;
        ctx.quadraticCurveTo(midX, midY, pOuterX, pOuterY);

        ctx.strokeStyle = hsla(190, 100, 80, 0.45);
        ctx.lineWidth = 1.2;
        ctx.stroke();
      }

      // 3. Central Siphuncle Vascular Tube (Continuous umbilical line through all chambers)
      ctx.beginPath();
      for (let i = 0; i <= 100; i++) {
        const theta = (i / 100) * maxTheta;
        const r = (scale * 0.035 * 0.65) * Math.exp(b * theta);
        const px = r * Math.cos(theta);
        const py = r * Math.sin(theta);
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.strokeStyle = '#38bdf8';
      ctx.shadowColor = '#38bdf8';
      ctx.shadowBlur = 8;
      ctx.lineWidth = 1.4;
      ctx.stroke();
      ctx.shadowBlur = 0;

      ctx.restore();
    },
  };
}
