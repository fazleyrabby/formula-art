import type { ArtRenderer, ParameterState, RenderContext, TimeState } from '../../types/engine';
import { hsla } from '../common/color';

// Ctenophore Comb Jelly with Rainbow Ciliary Diffraction Interference
export function createCombJellyCtenophore(): ArtRenderer {
  const COMB_ROWS = 8;
  const PLATES_PER_ROW = 28;

  return {
    setup() {},

    render(context: RenderContext, timeState: TimeState, params: ParameterState) {
      const { ctx, width, height } = context;
      const beatSpeed = Number(params.ciliaSpeed || 1.3);
      const glowScale = Number(params.glowBoost || 1.2);
      const t = timeState.time * beatSpeed;

      ctx.fillStyle = '#03050a';
      ctx.fillRect(0, 0, width, height);

      const cx = width * 0.5;
      const cy = height * 0.48 + Math.sin(t * 0.8) * 10;
      const bodyW = Math.min(width, height) * 0.22;
      const bodyH = Math.min(width, height) * 0.32;

      // 1. Translucent Ovoid Gelatinous Body Shell
      ctx.beginPath();
      ctx.ellipse(cx, cy, bodyW, bodyH, 0, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(15, 23, 42, 0.2)';
      ctx.fill();
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.4)';
      ctx.lineWidth = 1.6;
      ctx.stroke();

      // 2. Apical Statocyst Sense Organ (Top Pole)
      ctx.fillStyle = '#38bdf8';
      ctx.beginPath();
      ctx.arc(cx, cy - bodyH * 0.95, 3.5, 0, Math.PI * 2);
      ctx.fill();

      // 3. Eight Longitudinal Ctene Comb Rows (Metachronal Cilia Waves)
      for (let r = 0; r < COMB_ROWS; r++) {
        const phi = (r / COMB_ROWS) * Math.PI * 2;
        const rowXOffset = Math.sin(phi) * (bodyW * 0.92);
        const depth = Math.cos(phi); // 3D depth perspective

        // Only draw visible surface rows with depth opacity
        const depthAlpha = 0.3 + (depth + 1) * 0.35;

        for (let p = 0; p < PLATES_PER_ROW; p++) {
          const normP = p / (PLATES_PER_ROW - 1);
          // Longitudinal meridian curve along body ellipse
          const plateAngle = (normP - 0.5) * Math.PI * 0.88;
          const px = cx + rowXOffset * Math.cos(plateAngle);
          const py = cy + Math.sin(plateAngle) * (bodyH * 0.95);

          // Metachronal Ciliary Wave phase traveling from aboral to oral pole
          const wavePhase = t * 4 - normP * 8 + r * 0.5;
          const beatAmplitude = Math.sin(wavePhase);

          // Rainbow Optical Diffraction Spectrum (Spectral iridescence as cilia scatter light)
          const spectralHue = ((normP * 360) + wavePhase * 40) % 360;
          const plateLen = (6 + Math.abs(beatAmplitude) * 5) * (depth > 0 ? 1.0 : 0.6);

          ctx.beginPath();
          ctx.moveTo(px, py);
          ctx.lineTo(px + Math.sin(phi) * plateLen, py);
          ctx.strokeStyle = hsla(spectralHue, 100, 70, depthAlpha * glowScale);
          ctx.lineWidth = 1.8;
          ctx.stroke();

          // Glowing iridescent photon nodes
          if (Math.abs(beatAmplitude) > 0.6) {
            ctx.fillStyle = hsla(spectralHue, 100, 85, depthAlpha);
            ctx.fillRect(px - 1, py - 1, 2.5, 2.5);
          }
        }
      }

      // 4. Two Long Sensory Tentacles Trailing from Tentacle Sheaths
      for (let side = -1; side <= 1; side += 2) {
        ctx.beginPath();
        const rootX = cx + side * (bodyW * 0.5);
        const rootY = cy + bodyH * 0.3;
        ctx.moveTo(rootX, rootY);

        const tentSteps = 40;
        const tentLen = bodyH * 1.4;
        for (let s = 1; s <= tentSteps; s++) {
          const ns = s / tentSteps;
          const tw = Math.sin(t * 3 - ns * 5 + side) * (22 * ns);
          const tx = rootX + side * (ns * 35) + tw;
          const ty = rootY + ns * tentLen;
          ctx.lineTo(tx, ty);
        }

        ctx.strokeStyle = 'rgba(125, 211, 252, 0.55)';
        ctx.lineWidth = 1.2;
        ctx.stroke();
      }
    },
  };
}
