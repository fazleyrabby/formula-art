import type { ArtRenderer, ParameterState, RenderContext, TimeState } from '../../types/engine';
import { hsla } from '../common/color';

// 064 - Damascene Star Tracery & Strapwork Filigree (Inlaid Gold & Emerald Lattice)
export function createDamasceneFiligrane(): ArtRenderer {
  return {
    setup() {},

    render(context: RenderContext, timeState: TimeState, params: ParameterState) {
      const { ctx, width, height } = context;
      const speed = Number(params.speed ?? 0.5);
      const symmetry = Math.max(4, Math.round(Number(params.symmetry ?? 8)));
      const weaveDepth = Number(params.weaveDepth ?? 0.8);
      const laceRings = Math.max(2, Math.min(6, Math.round(Number(params.laceRings ?? 4))));
      const t = timeState.time * speed;

      // Dark emerald/onyx inlaid stone ground
      ctx.fillStyle = '#030806';
      ctx.fillRect(0, 0, width, height);

      const cx = width * 0.5;
      const cy = height * 0.5;
      const maxR = Math.min(width, height) * 0.43;

      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(t * 0.04);

      // Gold and emerald color harmonies
      const goldHue = 44;
      const emeraldHue = 158;

      // 1. Concentric Radial Strapwork Filigree Rings
      for (let ring = 1; ring <= laceRings; ring++) {
        const ringFrac = ring / laceRings;
        const rOuter = maxR * ringFrac;
        const rInner = maxR * (ringFrac - (0.75 / laceRings) * weaveDepth);

        const ringPhase = t * (ring % 2 === 0 ? 0.25 : -0.2) + ring * 0.4;
        const isGold = ring % 2 === 1;
        const strokeHue = isGold ? goldHue + Math.sin(t + ring) * 8 : emeraldHue + Math.sin(t + ring) * 10;

        // Draw Interwoven Star Ribbon Petals
        for (let s = 0; s < symmetry; s++) {
          const a1 = (s / symmetry) * Math.PI * 2 + ringPhase;
          const a2 = ((s + 0.5) / symmetry) * Math.PI * 2 + ringPhase;
          const a3 = ((s + 1) / symmetry) * Math.PI * 2 + ringPhase;

          const p1x = Math.cos(a1) * rInner;
          const p1y = Math.sin(a1) * rInner;
          const p2x = Math.cos(a2) * rOuter;
          const p2y = Math.sin(a2) * rOuter;
          const p3x = Math.cos(a3) * rInner;
          const p3y = Math.sin(a3) * rInner;

          // Double-wire filigree strapwork ribbon
          for (const offset of [-1.8, 1.8]) {
            ctx.beginPath();
            ctx.moveTo(p1x, p1y);
            const ctrlX = (p1x + p2x) * 0.5 + Math.cos(a2 + Math.PI / 2) * offset;
            const ctrlY = (p1y + p2y) * 0.5 + Math.sin(a2 + Math.PI / 2) * offset;
            ctx.quadraticCurveTo(ctrlX, ctrlY, p2x, p2y);

            const ctrl2X = (p2x + p3x) * 0.5 + Math.cos(a2 - Math.PI / 2) * offset;
            const ctrl2Y = (p2y + p3y) * 0.5 + Math.sin(a2 - Math.PI / 2) * offset;
            ctx.quadraticCurveTo(ctrl2X, ctrl2Y, p3x, p3y);

            ctx.strokeStyle = hsla(strokeHue, 90, 72, 0.7);
            ctx.lineWidth = 1.1;
            ctx.stroke();
          }

          // Micro-filigree interior arch lace within each strapwork cell
          if (ring >= 2) {
            const archMidX = (p1x + p3x) * 0.5;
            const archMidY = (p1y + p3y) * 0.5;
            ctx.beginPath();
            ctx.moveTo(p1x, p1y);
            ctx.quadraticCurveTo(archMidX * 1.15, archMidY * 1.15, p3x, p3y);
            ctx.strokeStyle = hsla(strokeHue + 15, 80, 80, 0.35);
            ctx.lineWidth = 0.75;
            ctx.stroke();
          }

          // Jewel Inlay Cusp Pearl
          if (ring === laceRings || ring === Math.floor(laceRings / 2)) {
            ctx.fillStyle = hsla(isGold ? emeraldHue : goldHue, 100, 70, 0.95);
            ctx.beginPath();
            ctx.arc(p2x, p2y, 2.8, 0, Math.PI * 2);
            ctx.fill();

            // Diamond halo glint
            ctx.fillStyle = hsla(isGold ? emeraldHue : goldHue, 100, 92, 0.45);
            ctx.beginPath();
            ctx.arc(p2x, p2y, 5.5, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }

      // 2. Central 8/N-pointed Star Rosette Medallion
      const medR = maxR * 0.18;
      ctx.beginPath();
      for (let k = 0; k <= symmetry * 2; k++) {
        const theta = (k / (symmetry * 2)) * Math.PI * 2;
        const rad = k % 2 === 0 ? medR : medR * 0.55;
        const px = Math.cos(theta) * rad;
        const py = Math.sin(theta) * rad;
        if (k === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.closePath();
      ctx.fillStyle = 'rgba(16, 185, 129, 0.15)';
      ctx.fill();
      ctx.strokeStyle = hsla(goldHue, 95, 82, 0.95);
      ctx.lineWidth = 1.8;
      ctx.stroke();

      // Outer Medallion Border Cord
      ctx.beginPath();
      ctx.arc(0, 0, maxR * 0.98, 0, Math.PI * 2);
      ctx.strokeStyle = hsla(goldHue, 85, 75, 0.5);
      ctx.lineWidth = 1.2;
      ctx.stroke();

      ctx.restore();
    },
  };
}
