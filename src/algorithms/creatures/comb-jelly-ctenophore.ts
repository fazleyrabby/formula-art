import type { ArtRenderer, ParameterState, RenderContext, TimeState } from '../../types/engine';
import { hsla } from '../common/color';

// Anatomically Enriched Comb Jelly (Ctenophora Anatomy)
// Features: Internal gastrovascular canal network, deep tentacle sheaths with branched colloblasts,
// apical statocyst with polar fields, and metachronal prismatic ctene plates.
export function createCombJellyCtenophore(): ArtRenderer {
  const COMB_ROWS = 8;
  const PLATES_PER_ROW = 32;

  return {
    setup() {},

    render(context: RenderContext, timeState: TimeState, params: ParameterState) {
      const { ctx, width, height } = context;
      const beatSpeed = Number(params.ciliaSpeed || 1.3);
      const glowScale = Number(params.glowBoost || 1.2);
      const t = timeState.time * beatSpeed;

      ctx.fillStyle = '#020408';
      ctx.fillRect(0, 0, width, height);

      const cx = width * 0.5;
      const cy = height * 0.48 + Math.sin(t * 0.8) * 10;
      const bodyW = Math.min(width, height) * 0.23;
      const bodyH = Math.min(width, height) * 0.34;

      ctx.save();
      ctx.translate(cx, cy);

      // 1. Translucent Ovoid Gelatinous Mesoglea Body Shell
      ctx.beginPath();
      ctx.ellipse(0, 0, bodyW, bodyH, 0, 0, Math.PI * 2);
      
      const bodyGrad = ctx.createRadialGradient(0, 0, 5, 0, 0, bodyW);
      bodyGrad.addColorStop(0, 'rgba(30, 41, 59, 0.25)');
      bodyGrad.addColorStop(0.8, 'rgba(15, 23, 42, 0.15)');
      bodyGrad.addColorStop(1, 'rgba(56, 189, 248, 0.35)');

      ctx.fillStyle = bodyGrad;
      ctx.fill();
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.5)';
      ctx.lineWidth = 1.8;
      ctx.stroke();

      // 2. Internal Gastrovascular Canal Network (Stomodeum & Meridional Canals)
      // Central Stomodeum (Pharynx)
      ctx.beginPath();
      ctx.moveTo(0, -bodyH * 0.85);
      ctx.lineTo(0, bodyH * 0.7);
      ctx.strokeStyle = 'rgba(125, 211, 252, 0.45)';
      ctx.lineWidth = 3.0;
      ctx.stroke();

      // Transverse Infundibular Canals branching out to each comb row
      for (let r = 0; r < COMB_ROWS; r++) {
        const phi = (r / COMB_ROWS) * Math.PI * 2;
        const targetX = Math.sin(phi) * (bodyW * 0.88);
        const targetY = Math.cos(phi) * 15;

        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.quadraticCurveTo(targetX * 0.5, targetY * 0.5 - 15, targetX, targetY);
        ctx.strokeStyle = 'rgba(56, 189, 248, 0.25)';
        ctx.lineWidth = 1.2;
        ctx.stroke();
      }

      // 3. Apical Statocyst & Ciliated Polar Fields (Aboral Pole)
      ctx.beginPath();
      ctx.arc(0, -bodyH * 0.96, 4.5, 0, Math.PI * 2);
      ctx.fillStyle = '#f0f9ff';
      ctx.shadowColor = '#38bdf8';
      ctx.shadowBlur = 10;
      ctx.fill();
      ctx.shadowBlur = 0;

      // Polar fields ciliary fringes
      for (let s = -1; s <= 1; s += 2) {
        ctx.beginPath();
        ctx.moveTo(0, -bodyH * 0.96);
        ctx.quadraticCurveTo(s * 15, -bodyH * 1.04, s * 22, -bodyH * 0.98);
        ctx.strokeStyle = 'rgba(186, 230, 253, 0.7)';
        ctx.lineWidth = 1.2;
        ctx.stroke();
      }

      // 4. Eight Longitudinal Meridional Comb Rows (Metachronal Ciliary Wave)
      for (let r = 0; r < COMB_ROWS; r++) {
        const phi = (r / COMB_ROWS) * Math.PI * 2;
        const rowXOffset = Math.sin(phi) * (bodyW * 0.92);
        const depth = Math.cos(phi);
        const depthAlpha = 0.35 + (depth + 1) * 0.35;

        // Meridional canal beneath the comb row
        ctx.beginPath();
        for (let p = 0; p < PLATES_PER_ROW; p++) {
          const normP = p / (PLATES_PER_ROW - 1);
          const plateAngle = (normP - 0.5) * Math.PI * 0.88;
          const px = rowXOffset * Math.cos(plateAngle);
          const py = Math.sin(plateAngle) * (bodyH * 0.94);
          if (p === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        ctx.strokeStyle = hsla((180 + r * 15) % 360, 85, 55, 0.3 * depthAlpha);
        ctx.lineWidth = 1.0;
        ctx.stroke();

        // Ctene Comb Plates
        for (let p = 0; p < PLATES_PER_ROW; p++) {
          const normP = p / (PLATES_PER_ROW - 1);
          const plateAngle = (normP - 0.5) * Math.PI * 0.88;
          const px = rowXOffset * Math.cos(plateAngle);
          const py = Math.sin(plateAngle) * (bodyH * 0.94);

          // Metachronal wave propagating aborally
          const wavePhase = t * 4.5 - normP * 9 + r * 0.5;
          const beatAmplitude = Math.sin(wavePhase);

          // Prismatic light diffraction rainbow spectrum
          const spectralHue = ((normP * 360) + wavePhase * 45) % 360;
          const plateLen = (7 + Math.abs(beatAmplitude) * 6) * (depth > 0 ? 1.0 : 0.6);

          ctx.beginPath();
          ctx.moveTo(px, py);
          ctx.lineTo(px + Math.sin(phi) * plateLen, py + (depth * 2));
          ctx.strokeStyle = hsla(spectralHue, 100, 72, depthAlpha * glowScale);
          ctx.lineWidth = 2.0;
          ctx.stroke();

          // Highlight diffraction spark
          if (Math.abs(beatAmplitude) > 0.7) {
            ctx.fillStyle = hsla(spectralHue, 100, 88, depthAlpha);
            ctx.fillRect(px - 1, py - 1, 2.8, 2.8);
          }
        }
      }

      // 5. Tentacular Sheaths & Branched Colloblast Tentacles
      for (let side = -1; side <= 1; side += 2) {
        const rootX = side * (bodyW * 0.5);
        const rootY = bodyH * 0.2;

        // Internal Sheath Pocket
        ctx.beginPath();
        ctx.ellipse(rootX * 0.8, rootY * 0.5, 8, 22, side * 0.2, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(56, 189, 248, 0.4)';
        ctx.lineWidth = 1.2;
        ctx.stroke();

        // Main Retractile Tentacle Filament
        ctx.beginPath();
        ctx.moveTo(rootX, rootY);

        const tentSteps = 45;
        const tentLen = bodyH * 1.5;
        for (let s = 1; s <= tentSteps; s++) {
          const ns = s / tentSteps;
          const tw = Math.sin(t * 3 - ns * 5 + side) * (25 * ns);
          const tx = rootX + side * (ns * 40) + tw;
          const ty = rootY + ns * tentLen;
          ctx.lineTo(tx, ty);

          // Lateral Colloblast Tentilla Branches (Sticky prey capture hairs)
          if (s % 4 === 0 && s > 8) {
            const sideAngle = side * 0.8 + Math.sin(t * 4 + s) * 0.3;
            const branchLen = 14 * (1 - ns * 0.3);
            ctx.moveTo(tx, ty);
            ctx.lineTo(tx + Math.cos(sideAngle) * branchLen, ty + Math.sin(sideAngle) * branchLen);
          }
        }

        ctx.strokeStyle = 'rgba(186, 230, 253, 0.65)';
        ctx.lineWidth = 1.2;
        ctx.stroke();
      }

      ctx.restore();
    },
  };
}
