import type { ArtRenderer, ParameterState, RenderContext, TimeState } from '../../types/engine';
import { hsla } from '../common/color';

// Yuruyurau-Style Giant Siphonophore (Colonial Deep-Sea Entity)
// Built with 48 intertwined helical coenosarc stem filaments, additive glow,
// pulsating nectophore swimming bells, and a veil of 80 bioluminescent tentilla fishing threads.
export function createGiantSiphonophore(): ArtRenderer {
  const STEM_FILAMENTS = 36;
  const TENTILLA_COUNT = 80;

  return {
    setup() {},

    render(context: RenderContext, timeState: TimeState, params: ParameterState) {
      const { ctx, width, height } = context;
      const waveSpeed = Number(params.flowSpeed || 0.9);
      const chainLength = Number(params.chainSpread || 1.1);
      const t = timeState.time * waveSpeed;

      ctx.fillStyle = '#020306';
      ctx.fillRect(0, 0, width, height);

      const cx = width * 0.5;
      const cy = height * 0.5;
      const scale = Math.min(width, height) * 0.42 * chainLength;

      ctx.save();
      ctx.globalCompositeOperation = 'screen';

      // 1. Yuruyurau 36 Intertwined Helical Coenosarc Stem Filaments
      for (let f = 0; f < STEM_FILAMENTS; f++) {
        const normF = f / (STEM_FILAMENTS - 1);
        const phaseOffset = normF * Math.PI * 2;
        const stemRadius = (scale * 0.32) * (0.8 + 0.4 * Math.sin(normF * Math.PI));

        ctx.beginPath();
        const steps = 65;
        for (let i = 0; i <= steps; i++) {
          const normI = i / steps;
          const theta = normI * Math.PI * 3.8 + t * 0.8 + phaseOffset;

          // Compound harmonic helical waves
          const waveX = Math.sin(t * 1.4 + normI * 5 + normF * 2) * 22;
          const sx = cx + (normI - 0.5) * scale * 1.85 + waveX;
          const sy = cy + Math.sin(theta) * stemRadius;

          if (i === 0) ctx.moveTo(sx, sy);
          else ctx.lineTo(sx, sy);
        }

        const stemHue = (180 + normF * 45 + Math.sin(t * 0.5) * 20) % 360;
        ctx.strokeStyle = hsla(stemHue, 95, 70, 0.25);
        ctx.lineWidth = f % 4 === 0 ? 1.6 : 0.8;
        ctx.stroke();
      }

      // 2. Pulsating Nectophore Swimming Bells (Zooid Cluster Nodes)
      const NODE_COUNT = 18;
      const stemNodes: { x: number; y: number }[] = [];

      for (let n = 0; n < NODE_COUNT; n++) {
        const normN = n / (NODE_COUNT - 1);
        const theta = normN * Math.PI * 3.8 + t * 0.8;
        const nx = cx + (normN - 0.5) * scale * 1.85 + Math.sin(t * 1.4 + normN * 5) * 22;
        const ny = cy + Math.sin(theta) * (scale * 0.32);
        stemNodes.push({ x: nx, y: ny });

        // Concentric Bell Rings
        const pulse = 1 + 0.28 * Math.sin(t * 3.5 - n * 0.4);
        for (let ring = 1; ring <= 3; ring++) {
          ctx.beginPath();
          ctx.arc(nx, ny, (4 + ring * 3.5) * pulse, 0, Math.PI * 2);
          ctx.strokeStyle = hsla(185 + ring * 10, 95, 75, (0.5 - ring * 0.1));
          ctx.lineWidth = 1.0;
          ctx.stroke();
        }

        // Bioluminescent Red / Cyan Photophore Center
        const isRed = n % 3 === 0;
        const pColor = isRed ? '#ef4444' : '#38bdf8';
        ctx.fillStyle = pColor;
        ctx.shadowColor = pColor;
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.arc(nx, ny, 2.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      // 3. Cascade of 80 Yuruyurau-Style Bioluminescent Tentilla Silk Threads
      for (let k = 0; k < TENTILLA_COUNT; k++) {
        const normK = k / (TENTILLA_COUNT - 1);
        const parentIdx = Math.floor(normK * (stemNodes.length - 1));
        const root = stemNodes[parentIdx];

        ctx.beginPath();
        ctx.moveTo(root.x, root.y);

        const tentSteps = 32;
        const maxDrop = 160 * chainLength;
        for (let s = 1; s <= tentSteps; s++) {
          const ns = s / tentSteps;
          // Harmonic wave interference
          const w1 = Math.sin(t * 2.8 - ns * 7 + k * 0.3) * (20 * ns);
          const w2 = Math.cos(t * 1.8 + ns * 14 - k * 0.2) * (10 * ns);
          const tx = root.x + w1 + w2;
          const ty = root.y + ns * maxDrop;
          ctx.lineTo(tx, ty);

          // Microscopic Nematocyst Battery Sparks
          if (s % 6 === 0) {
            const isRedSpark = (k + s) % 4 === 0;
            ctx.fillStyle = isRedSpark ? 'rgba(239, 68, 68, 0.85)' : 'rgba(56, 189, 248, 0.85)';
            ctx.fillRect(tx - 1, ty - 1, 2, 2);
          }
        }

        const tentHue = (180 + normK * 50 + t * 15) % 360;
        ctx.strokeStyle = hsla(tentHue, 95, 75, k % 3 === 0 ? 0.55 : 0.22);
        ctx.lineWidth = k % 3 === 0 ? 1.2 : 0.7;
        ctx.stroke();
      }

      ctx.restore();
    },
  };
}
