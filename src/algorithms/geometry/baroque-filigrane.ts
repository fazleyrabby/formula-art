import type { ArtRenderer, ParameterState, RenderContext, TimeState } from '../../types/engine';
import { hsla } from '../common/color';

// 062 - Baroque Golden Arabesque Filigree (Fine Wire Volutes & Granulated Lace)
export function createBaroqueFiligrane(): ArtRenderer {
  return {
    setup() {},

    render(context: RenderContext, timeState: TimeState, params: ParameterState) {
      const { ctx, width, height } = context;
      const speed = Number(params.shimmerSpeed ?? 0.6);
      const folds = Math.max(3, Math.round(Number(params.folds ?? 8)));
      const tightness = Number(params.curlTightness ?? 1.2);
      const webDensity = Math.max(3, Math.round(Number(params.webDensity ?? 8)));
      const t = timeState.time * speed;

      // Dark velvet obsidian canvas background
      ctx.fillStyle = '#050608';
      ctx.fillRect(0, 0, width, height);

      const cx = width * 0.5;
      const cy = height * 0.5;
      const maxR = Math.min(width, height) * 0.44;

      ctx.save();
      ctx.translate(cx, cy);

      const baseHue = 42; // Rich 24K Gold base

      // 1. Central Granulated Rosette Filigree Core
      const coreR = maxR * 0.16;
      for (let ring = 1; ring <= 3; ring++) {
        const rr = (ring / 3) * coreR;
        ctx.beginPath();
        for (let i = 0; i <= folds * 2; i++) {
          const a = (i / (folds * 2)) * Math.PI * 2 + t * (ring % 2 === 0 ? 0.2 : -0.2);
          const rMod = rr * (1 + 0.18 * Math.sin(a * folds + t * 2));
          const px = Math.cos(a) * rMod;
          const py = Math.sin(a) * rMod;
          if (i === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        ctx.closePath();
        ctx.strokeStyle = hsla(baseHue + ring * 5, 90, 72, 0.75);
        ctx.lineWidth = 1.4 - ring * 0.2;
        ctx.stroke();
      }

      // 2. Radial Baroque S-Scroll Volutes & Filigree Tendrils
      for (let f = 0; f < folds; f++) {
        const baseAngle = (f / folds) * Math.PI * 2;

        ctx.save();
        ctx.rotate(baseAngle + t * 0.05);

        // --- Major Primary S-Scroll Arm ---
        ctx.beginPath();
        const armSteps = 70;
        const armPoints: { x: number; y: number }[] = [];

        for (let i = 0; i <= armSteps; i++) {
          const u = i / armSteps;
          // Logarithmic spiral coil blend
          const theta = u * Math.PI * 1.8 * tightness;
          const r = coreR + (maxR - coreR) * Math.pow(u, 0.88) * (1 + 0.08 * Math.sin(t * 1.5 + f));
          const curlOffset = Math.sin(theta) * (maxR * 0.14 * (1 - u) * tightness);

          const px = Math.cos(theta * 0.45) * r + curlOffset;
          const py = Math.sin(theta * 0.45) * r;
          armPoints.push({ x: px, y: py });

          if (i === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }

        // Gold filament gradient
        const shimmer = Math.sin(t * 3 + f * 0.8) * 10;
        ctx.strokeStyle = hsla(baseHue + shimmer, 92, 70, 0.85);
        ctx.lineWidth = 2.0;
        ctx.stroke();

        // --- Minor Counter-Curling C-Scroll Fluke ---
        ctx.beginPath();
        const cSteps = 45;
        const cPoints: { x: number; y: number }[] = [];
        const midAnchor = armPoints[Math.floor(armSteps * 0.52)];

        for (let j = 0; j <= cSteps; j++) {
          const v = j / cSteps;
          const phi = -v * Math.PI * 1.6 * tightness + Math.PI * 0.35;
          const cr = (maxR * 0.28) * Math.pow(v, 0.9);
          const cx_p = midAnchor.x + Math.cos(phi) * cr;
          const cy_p = midAnchor.y + Math.sin(phi) * cr;
          cPoints.push({ x: cx_p, y: cy_p });

          if (j === 0) ctx.moveTo(cx_p, cy_p);
          else ctx.lineTo(cx_p, cy_p);
        }

        ctx.strokeStyle = hsla(baseHue + 8, 85, 76, 0.7);
        ctx.lineWidth = 1.3;
        ctx.stroke();

        // --- Fine Wire Filigree Webbing (Lace infill between scrolls) ---
        for (let w = 1; w <= webDensity; w++) {
          const frac = w / (webDensity + 1);
          const pA = armPoints[Math.min(armPoints.length - 1, Math.floor(frac * armSteps * 0.85))];
          const pB = cPoints[Math.min(cPoints.length - 1, Math.floor((1 - frac) * cSteps))];

          // Delicate curved wire bridge
          ctx.beginPath();
          ctx.moveTo(pA.x, pA.y);
          const midX = (pA.x + pB.x) * 0.5 + Math.sin(t * 2 + w) * 6;
          const midY = (pA.y + pB.y) * 0.5 + Math.cos(t * 2 + w) * 6;
          ctx.quadraticCurveTo(midX, midY, pB.x, pB.y);

          ctx.strokeStyle = hsla(baseHue - 4 + (w % 3) * 6, 80, 78, 0.35);
          ctx.lineWidth = 0.75;
          ctx.stroke();
        }

        // --- Golden Granulation Beads (Jeweled Pearl Nodes) ---
        const tipA = armPoints[armPoints.length - 1];
        const tipB = cPoints[cPoints.length - 1];

        // Terminal bud pearl on major volute
        ctx.fillStyle = hsla(baseHue + 15, 100, 88, 0.95);
        ctx.beginPath();
        ctx.arc(tipA.x, tipA.y, 3.2, 0, Math.PI * 2);
        ctx.fill();

        // Halo glint
        ctx.fillStyle = hsla(baseHue + 20, 100, 95, 0.4);
        ctx.beginPath();
        ctx.arc(tipA.x, tipA.y, 6.0, 0, Math.PI * 2);
        ctx.fill();

        // Secondary bud pearl
        ctx.fillStyle = hsla(baseHue + 10, 95, 84, 0.9);
        ctx.beginPath();
        ctx.arc(tipB.x, tipB.y, 2.4, 0, Math.PI * 2);
        ctx.fill();

        // Intermediate granulation row along main spine
        for (let b = 1; b <= 4; b++) {
          const pt = armPoints[Math.floor(b * 14)];
          ctx.fillStyle = hsla(baseHue, 95, 78, 0.75);
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, 1.5, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.restore();
      }

      // 3. Outermost Filigree Crown Scallops
      ctx.beginPath();
      const outerSteps = folds * 16;
      for (let k = 0; k <= outerSteps; k++) {
        const theta = (k / outerSteps) * Math.PI * 2;
        const scallop = Math.abs(Math.sin(theta * (folds * 0.5) + t * 0.2)) * (maxR * 0.08);
        const ro = maxR * 0.92 + scallop;
        const px = Math.cos(theta) * ro;
        const py = Math.sin(theta) * ro;
        if (k === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.closePath();
      ctx.strokeStyle = hsla(baseHue + 4, 85, 74, 0.45);
      ctx.lineWidth = 1.0;
      ctx.stroke();

      ctx.restore();
    },
  };
}
