import type { ArtRenderer, ParameterState, RenderContext, TimeState } from '../../types/engine';
import { hsla } from '../common/color';

// Ultra-Detailed Anatomical Gulper Pelican Eel (Eurypharynx Pelecanoides)
// Features: Volumetric accordion throat pouch (32 elastic filament ribs),
// hinged quadrate jaw bones, 65-node serpentine ribbon whip-tail, and glowing caudal photophore lure.
export function createGulperEel(): ArtRenderer {
  const POUCH_RIBS = 32;
  const TAIL_NODES = 65;

  return {
    setup() {},

    render(context: RenderContext, timeState: TimeState, params: ParameterState) {
      const { ctx, width, height } = context;
      const swimSpeed = Number(params.swimSpeed || 1.1);
      const jawExpansion = Number(params.jawInflation || 1.0);
      const t = timeState.time * swimSpeed;

      ctx.fillStyle = '#020306';
      ctx.fillRect(0, 0, width, height);

      const cx = width * 0.42;
      const cy = height * 0.46 + Math.sin(t * 1.2) * 8;
      const eelScale = Math.min(width, height) / 520;

      ctx.save();
      ctx.translate(cx, cy);
      ctx.globalCompositeOperation = 'screen';

      const baseHue = (210 + Math.sin(t * 0.5) * 15) % 360;

      // 1. Massive Volumetric Distensible Pelican Pouch (32 Elastic Filament Accordion Ribs)
      const gapePulse = 1 + 0.28 * Math.sin(t * 2.2) * jawExpansion;

      for (let r = 1; r <= POUCH_RIBS; r++) {
        const normR = r / POUCH_RIBS;
        const curScale = normR * eelScale;

        ctx.beginPath();
        // Upper Cranium Jaw Margin
        ctx.moveTo(-15 * curScale, -15 * curScale);
        ctx.quadraticCurveTo(45 * curScale, -35 * curScale, 115 * curScale, -10 * curScale);

        // Lower Expandable Accordion Envelope
        ctx.bezierCurveTo(
          (95 + Math.sin(r * 0.4 + t * 3) * 6) * curScale,
          (90 * gapePulse) * curScale,
          (-12 + Math.cos(r * 0.3 - t * 2) * 6) * curScale,
          (115 * gapePulse) * curScale,
          -40 * curScale,
          18 * curScale
        );
        ctx.closePath();

        const ribHue = (baseHue + normR * 30) % 360;
        ctx.strokeStyle = hsla(ribHue, 95, 68, (0.05 + normR * 0.38));
        ctx.lineWidth = r === POUCH_RIBS ? 2.2 : 0.9;
        ctx.stroke();

        if (r % 6 === 0) {
          ctx.fillStyle = hsla(ribHue, 85, 45, 0.04);
          ctx.fill();
        }
      }

      // Elastic Pouch Longitudinal Accordion Folds (Radial Struts)
      for (let s = 1; s <= 12; s++) {
        const normS = s / 12;
        ctx.beginPath();
        ctx.moveTo(10 * eelScale, -10 * eelScale);
        ctx.quadraticCurveTo(
          (20 + s * 8) * eelScale,
          (15 + s * 8 * gapePulse) * eelScale,
          (-35 + s * 12) * eelScale,
          (65 * gapePulse) * eelScale
        );
        ctx.strokeStyle = hsla(190, 100, 75, 0.35);
        ctx.lineWidth = 1.0;
        ctx.stroke();
      }

      // 2. Hinged Jaw Bones & Needle Teeth
      // Upper Cranium Arch
      ctx.beginPath();
      ctx.moveTo(-20 * eelScale, -18 * eelScale);
      ctx.quadraticCurveTo(48 * eelScale, -38 * eelScale, 118 * eelScale, -10 * eelScale);
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 2.4 * eelScale;
      ctx.stroke();

      // Lower Mandible Bone
      ctx.beginPath();
      ctx.moveTo(-40 * eelScale, 18 * eelScale);
      ctx.quadraticCurveTo(40 * eelScale, 85 * gapePulse * eelScale, 118 * eelScale, -10 * eelScale);
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 2.4 * eelScale;
      ctx.stroke();

      // Tiny Sharp Teeth Denticles along jaw
      for (let tooth = 0; tooth < 18; tooth++) {
        const normT = tooth / 17;
        const tx = (-15 + normT * 130) * eelScale;
        const ty = (-25 + normT * 15) * eelScale;
        ctx.fillStyle = '#f0f9ff';
        ctx.fillRect(tx, ty, 1.5, 3.5 * eelScale);
      }

      // Tiny Skull Eye Dome
      ctx.fillStyle = '#0f172a';
      ctx.beginPath();
      ctx.arc(105 * eelScale, -16 * eelScale, 4.5 * eelScale, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 1.2;
      ctx.stroke();

      ctx.fillStyle = '#38bdf8';
      ctx.beginPath();
      ctx.arc(106 * eelScale, -16 * eelScale, 2.0 * eelScale, 0, Math.PI * 2);
      ctx.fill();

      // 3. Ultra-Long Multi-Filament Ribbon Whip-Tail (65 Nodes)
      const tailRoots = [-40 * eelScale, -35 * eelScale, -30 * eelScale];
      for (let tr = 0; tr < 3; tr++) {
        ctx.beginPath();
        let prevX = tailRoots[tr];
        let prevY = (15 + tr * 4) * eelScale;
        ctx.moveTo(prevX, prevY);

        for (let s = 1; s <= TAIL_NODES; s++) {
          const normS = s / TAIL_NODES;
          // Harmonic wave interference
          const w1 = Math.sin(t * 3.5 - normS * 8 + tr * 0.3) * (34 * Math.pow(normS, 1.2) * eelScale);
          const w2 = Math.cos(t * 2.2 - normS * 14) * (12 * normS * eelScale);
          const curX = prevX - (200 * normS * eelScale);
          const curY = prevY - (s * 3.4 * eelScale) + w1 + w2;

          ctx.lineTo(curX, curY);

          // Glowing Lateral Photophore Beads along the tail
          if (s % 6 === 0 && tr === 1) {
            ctx.fillStyle = hsla(190, 100, 80, 0.85);
            ctx.fillRect(curX - 1, curY - 1, 2.5, 2.5);
          }

          // 4. Terminal Bioluminescent Photophore Organ at Tail Tip
          if (s === TAIL_NODES && tr === 1) {
            const pulse = 1 + 0.35 * Math.sin(t * 5);
            const glowR = (16 * pulse * eelScale);

            const glowGrad = ctx.createRadialGradient(curX, curY, 2, curX, curY, glowR * 3.5);
            glowGrad.addColorStop(0, 'rgba(239, 68, 68, 0.95)'); // Rare red lure
            glowGrad.addColorStop(0.4, 'rgba(239, 68, 68, 0.45)');
            glowGrad.addColorStop(1, 'rgba(239, 68, 68, 0)');

            ctx.fillStyle = glowGrad;
            ctx.beginPath();
            ctx.arc(curX, curY, glowR * 3.5, 0, Math.PI * 2);
            ctx.fill();

            ctx.fillStyle = '#fee2e2';
            ctx.beginPath();
            ctx.arc(curX, curY, 4.5 * eelScale, 0, Math.PI * 2);
            ctx.fill();
          }
        }

        ctx.strokeStyle = hsla((baseHue + tr * 15) % 360, 95, 75, (0.7 - tr * 0.18));
        ctx.lineWidth = tr === 1 ? 2.2 * eelScale : 1.2 * eelScale;
        ctx.stroke();
      }

      ctx.restore();
    },
  };
}
