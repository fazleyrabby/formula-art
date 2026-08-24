import type { ArtRenderer, ParameterState, RenderContext, TimeState } from '../../types/engine';
import { hsla } from '../common/color';

// Yuruyurau-Style Rainbow Ctenophore Comb Jelly
// Constructed with 36 volumetric meridional filament loops, additive diffraction interference,
// 8 prismatic ctene comb rows, and a cascade of 48 colloblast silk threads.
export function createCombJellyCtenophore(): ArtRenderer {
  const BODY_LOOPS = 36;
  const COMB_ROWS = 8;
  const PLATES_PER_ROW = 36;

  return {
    setup() {},

    render(context: RenderContext, timeState: TimeState, params: ParameterState) {
      const { ctx, width, height } = context;
      const beatSpeed = Number(params.ciliaSpeed || 1.3);
      const glowScale = Number(params.glowBoost || 1.2);
      const t = timeState.time * beatSpeed;

      ctx.fillStyle = '#020307';
      ctx.fillRect(0, 0, width, height);

      const cx = width * 0.5;
      const cy = height * 0.46 + Math.sin(t * 0.8) * 10;
      const bodyW = Math.min(width, height) * 0.24;
      const bodyH = Math.min(width, height) * 0.35;

      ctx.save();
      ctx.translate(cx, cy);

      ctx.globalCompositeOperation = 'screen';

      // 1. Yuruyurau 36 Concentric Volumetric Meridional Loops (Transparent Glass Mesoglea)
      for (let l = 0; l < BODY_LOOPS; l++) {
        const normL = (l + 1) / BODY_LOOPS;
        const curW = bodyW * normL;
        const curH = bodyH * Math.pow(normL, 0.85);

        ctx.beginPath();
        const steps = 60;
        for (let i = 0; i <= steps; i++) {
          const theta = (i / steps) * Math.PI * 2;
          // Harmonic undulating surface ripples
          const rip = Math.sin(theta * 6 + t * 2 + normL * 3) * (3 * normL);
          const px = Math.cos(theta) * (curW + rip);
          const py = Math.sin(theta) * (curH + rip * 0.5);
          if (i === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        ctx.closePath();

        const loopHue = (185 + normL * 40 + Math.sin(t) * 15) % 360;
        const loopAlpha = (0.04 + normL * 0.28) * glowScale;
        ctx.strokeStyle = hsla(loopHue, 95, 70, loopAlpha);
        ctx.lineWidth = normL > 0.9 ? 1.6 : 0.8;
        ctx.stroke();
      }

      // 2. Apical Statocyst & Ciliated Polar Sense Organs
      ctx.beginPath();
      ctx.arc(0, -bodyH * 0.96, 4.5, 0, Math.PI * 2);
      ctx.fillStyle = '#f0f9ff';
      ctx.shadowColor = '#38bdf8';
      ctx.shadowBlur = 14;
      ctx.fill();
      ctx.shadowBlur = 0;

      // 3. Eight Prismatic Ctene Comb Rows with Metachronal Rainbow Waves
      for (let r = 0; r < COMB_ROWS; r++) {
        const phi = (r / COMB_ROWS) * Math.PI * 2;
        const rowXOffset = Math.sin(phi) * (bodyW * 0.92);
        const depth = Math.cos(phi);
        const depthAlpha = 0.35 + (depth + 1) * 0.35;

        for (let p = 0; p < PLATES_PER_ROW; p++) {
          const normP = p / (PLATES_PER_ROW - 1);
          const plateAngle = (normP - 0.5) * Math.PI * 0.88;
          const px = rowXOffset * Math.cos(plateAngle);
          const py = Math.sin(plateAngle) * (bodyH * 0.95);

          // Traveling wave phase
          const wavePhase = t * 4.5 - normP * 9 + r * 0.5;
          const beatAmplitude = Math.sin(wavePhase);

          // Spectral optical diffraction spectrum
          const spectralHue = ((normP * 360) + wavePhase * 45) % 360;
          const plateLen = (8 + Math.abs(beatAmplitude) * 7) * (depth > 0 ? 1.0 : 0.6);

          ctx.beginPath();
          ctx.moveTo(px, py);
          ctx.lineTo(px + Math.sin(phi) * plateLen, py + (depth * 2));
          ctx.strokeStyle = hsla(spectralHue, 100, 72, depthAlpha * glowScale);
          ctx.lineWidth = 2.2;
          ctx.stroke();

          // Highlight diffraction spark node
          if (Math.abs(beatAmplitude) > 0.65) {
            ctx.fillStyle = hsla(spectralHue, 100, 90, depthAlpha);
            ctx.fillRect(px - 1, py - 1, 3.0, 3.0);
          }
        }
      }

      // 4. Cascade of 48 Yuruyurau-Style Colloblast Silk Threads
      for (let side = -1; side <= 1; side += 2) {
        for (let th = 0; th < 24; th++) {
          const normTh = th / 23;
          const rootX = side * (bodyW * (0.3 + normTh * 0.25));
          const rootY = bodyH * 0.25;

          ctx.beginPath();
          ctx.moveTo(rootX, rootY);

          const tentSteps = 40;
          const tentLen = bodyH * 1.6;
          for (let s = 1; s <= tentSteps; s++) {
            const ns = s / tentSteps;
            const w1 = Math.sin(t * 3.5 - ns * 6 + th * 0.3 + side) * (28 * ns);
            const w2 = Math.cos(t * 2.2 + ns * 12 - th * 0.2) * (14 * ns);
            const tx = rootX + side * (ns * 35) + w1 + w2;
            const ty = rootY + ns * tentLen;
            ctx.lineTo(tx, ty);
          }

          const thHue = (175 + normTh * 50 + t * 15) % 360;
          ctx.strokeStyle = hsla(thHue, 95, 75, (th % 3 === 0 ? 0.6 : 0.22) * glowScale);
          ctx.lineWidth = th % 3 === 0 ? 1.4 : 0.8;
          ctx.stroke();
        }
      }

      ctx.restore();
    },
  };
}
