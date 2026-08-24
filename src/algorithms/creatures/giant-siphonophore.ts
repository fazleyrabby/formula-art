import type { ArtRenderer, ParameterState, RenderContext, TimeState } from '../../types/engine';
import { hsla } from '../common/color';

// Giant Praya Dubia Siphonophore Colonial Helical Chain & Bioluminescent Net
export function createGiantSiphonophore(): ArtRenderer {
  const NECTOPHORE_COUNT = 36;
  const TENTILLA_COUNT = 72;

  return {
    setup() {},

    render(context: RenderContext, timeState: TimeState, params: ParameterState) {
      const { ctx, width, height } = context;
      const waveSpeed = Number(params.flowSpeed || 0.9);
      const chainLength = Number(params.chainSpread || 1.1);
      const t = timeState.time * waveSpeed;

      ctx.fillStyle = '#020409';
      ctx.fillRect(0, 0, width, height);

      const cx = width * 0.5;
      const cy = height * 0.5;
      const scale = Math.min(width, height) * 0.42 * chainLength;

      // 1. Primary Helical Stem (Coenosarc Stem Axis)
      const stemNodes: { x: number; y: number; z: number }[] = [];
      for (let i = 0; i < NECTOPHORE_COUNT; i++) {
        const norm = i / (NECTOPHORE_COUNT - 1);
        const theta = norm * Math.PI * 4 + t * 0.8;
        const stemX = cx + (norm - 0.5) * scale * 1.8 + Math.sin(t * 1.2 + norm * 4) * 25;
        const stemY = cy + Math.sin(theta) * (scale * 0.35);
        const stemZ = Math.cos(theta) * (scale * 0.35);
        stemNodes.push({ x: stemX, y: stemY, z: stemZ });
      }

      // Draw Main Coenosarc Filament
      ctx.beginPath();
      for (let i = 0; i < stemNodes.length; i++) {
        if (i === 0) ctx.moveTo(stemNodes[i].x, stemNodes[i].y);
        else ctx.lineTo(stemNodes[i].x, stemNodes[i].y);
      }
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.4)';
      ctx.lineWidth = 1.6;
      ctx.stroke();

      // 2. Pulsating Nectophore Swimming Bells (Zooids) along Stem
      for (let i = 0; i < stemNodes.length; i++) {
        const n = stemNodes[i];
        const pulse = 1 + 0.25 * Math.sin(t * 3 - i * 0.3);
        const bellR = (8 + (i % 3) * 3) * pulse;

        // Translucent Nectophore Bell
        ctx.beginPath();
        ctx.arc(n.x, n.y, bellR, 0, Math.PI * 2);
        ctx.fillStyle = hsla(185, 90, 60, 0.15);
        ctx.fill();
        ctx.strokeStyle = hsla(190, 95, 75, 0.7);
        ctx.lineWidth = 1.2;
        ctx.stroke();

        // Bioluminescent Red/Blue Photophore Center (Rare deep sea red luminescence)
        const isRed = i % 4 === 0;
        const photoHue = isRed ? 355 : 190;
        ctx.fillStyle = hsla(photoHue, 100, 75, 0.95);
        ctx.beginPath();
        ctx.arc(n.x, n.y, 2.2, 0, Math.PI * 2);
        ctx.fill();
      }

      // 3. Trailing Bioluminescent Tentilla Fishing Net Lattice
      for (let k = 0; k < TENTILLA_COUNT; k++) {
        const normK = k / (TENTILLA_COUNT - 1);
        const parentIdx = Math.floor(normK * (stemNodes.length - 1));
        const root = stemNodes[parentIdx];

        ctx.beginPath();
        ctx.moveTo(root.x, root.y);

        const tentSteps = 24;
        const maxDrop = 140 * chainLength;
        for (let s = 1; s <= tentSteps; s++) {
          const normS = s / tentSteps;
          // Sinusoidal wave down tentacle
          const wave = Math.sin(t * 2.5 - normS * 6 + k * 0.4) * (15 * normS);
          const tx = root.x + wave + Math.sin(t * 0.8) * (normS * 12);
          const ty = root.y + normS * maxDrop;
          ctx.lineTo(tx, ty);
        }

        const tentHue = (180 + k * 4 + t * 15) % 360;
        ctx.strokeStyle = hsla(tentHue, 95, 70, 0.45);
        ctx.lineWidth = 0.9;
        ctx.stroke();
      }
    },
  };
}
