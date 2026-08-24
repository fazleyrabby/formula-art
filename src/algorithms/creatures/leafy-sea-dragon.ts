import type { ArtRenderer, ParameterState, RenderContext, TimeState } from '../../types/engine';
import { hsla } from '../common/color';

// Ultra-Detailed Anatomical Leafy Sea Dragon (Phycodurus Eques)
// Features: Armored bony trunk plates, logarithmic Archimedean tail spiral,
// and 36 lush undulating foliar camouflage appendages with branching venation ribs.
export function createLeafySeaDragon(): ArtRenderer {
  return {
    setup() {},

    render(context: RenderContext, timeState: TimeState, params: ParameterState) {
      const { ctx, width, height } = context;
      const swellSpeed = Number(params.swellSpeed || 1.1);
      const leafFlutter = Number(params.foliageSway || 1.2);
      const t = timeState.time * swellSpeed;

      ctx.fillStyle = '#020307';
      ctx.fillRect(0, 0, width, height);

      const cx = width * 0.46 + Math.sin(t * 0.4) * (width * 0.04);
      const cy = height * 0.45 + Math.sin(t * 1.4) * 10;
      const dragonScale = Math.min(width, height) / 500;

      ctx.save();
      ctx.translate(cx, cy);
      ctx.globalCompositeOperation = 'screen';

      const baseHue = (45 + Math.sin(t * 0.4) * 15) % 360;

      // Function to render an ultra-dense, multi-lobed leafy appendage
      function drawLushLeafAppendage(
        rootX: number,
        rootY: number,
        angle: number,
        length: number,
        phase: number
      ) {
        const wave = Math.sin(t * 2.8 + phase) * (18 * leafFlutter * dragonScale);
        const tipX = rootX + Math.cos(angle) * length + wave;
        const tipY = rootY + Math.sin(angle) * length + wave;

        // Multi-strand central stem rib
        for (let str = -1; str <= 1; str++) {
          ctx.beginPath();
          ctx.moveTo(rootX + str * 2, rootY);
          ctx.quadraticCurveTo((rootX + tipX) * 0.5 + wave, (rootY + tipY) * 0.5 - 12, tipX + str * 2, tipY);
          ctx.strokeStyle = hsla(baseHue, 95, 75, str === 0 ? 0.9 : 0.4);
          ctx.lineWidth = str === 0 ? 2.2 * dragonScale : 1.0;
          ctx.stroke();
        }

        // 4 Pairs of Pinnate Serrated Foliar Lobes
        for (let lobe = 1; lobe <= 4; lobe++) {
          const normL = lobe / 4.5;
          const lx = rootX + (tipX - rootX) * normL;
          const ly = rootY + (tipY - rootY) * normL;

          for (let s = -1; s <= 1; s += 2) {
            const lobeAngle = angle + s * 0.85 + Math.sin(t * 3.2 + lobe + s) * 0.25;
            const lobeLen = (22 - lobe * 3.5) * leafFlutter * dragonScale;

            // Nested filament curves for volumetric leaf blade
            for (let lf = 1; lf <= 4; lf++) {
              const normLF = lf / 4;
              ctx.beginPath();
              ctx.moveTo(lx, ly);
              ctx.quadraticCurveTo(
                lx + Math.cos(lobeAngle) * (lobeLen * normLF),
                ly + Math.sin(lobeAngle) * (lobeLen * normLF),
                lx + Math.cos(lobeAngle + 0.35) * (lobeLen * 0.6 * normLF),
                ly + Math.sin(lobeAngle + 0.35) * (lobeLen * 0.6 * normLF)
              );
              ctx.strokeStyle = hsla(110 + lobe * 12, 90, 65, (0.2 + normLF * 0.6));
              ctx.lineWidth = lf === 4 ? 1.6 : 0.8;
              ctx.stroke();
            }
          }
        }
      }

      // 1. Armored Tubular Pipe Snout & Head Crest
      ctx.beginPath();
      ctx.moveTo(-50 * dragonScale, -65 * dragonScale);
      ctx.lineTo(-145 * dragonScale, -100 * dragonScale);
      ctx.lineTo(-142 * dragonScale, -90 * dragonScale);
      ctx.lineTo(-45 * dragonScale, -50 * dragonScale);
      ctx.closePath();
      ctx.fillStyle = 'rgba(234, 179, 8, 0.4)';
      ctx.fill();
      ctx.strokeStyle = hsla(baseHue, 95, 75, 0.95);
      ctx.lineWidth = 2.4 * dragonScale;
      ctx.stroke();

      // Expressive Eye
      ctx.fillStyle = '#0f172a';
      ctx.beginPath();
      ctx.arc(-55 * dragonScale, -60 * dragonScale, 5.5 * dragonScale, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 1.6;
      ctx.stroke();

      ctx.fillStyle = '#38bdf8';
      ctx.beginPath();
      ctx.arc(-56 * dragonScale, -61 * dragonScale, 2.5 * dragonScale, 0, Math.PI * 2);
      ctx.fill();

      // 2. S-Curved Armored Body Rings (12 Segmented Plates)
      for (let r = 0; r < 12; r++) {
        const normR = r / 11;
        const rx = -45 * dragonScale + normR * (75 * dragonScale);
        const ry = -50 * dragonScale + Math.sin(normR * Math.PI) * (45 * dragonScale) + normR * (65 * dragonScale);

        ctx.beginPath();
        ctx.ellipse(rx, ry, (16 - normR * 4) * dragonScale, (22 - normR * 4) * dragonScale, normR * 0.5, 0, Math.PI * 2);
        ctx.strokeStyle = hsla(baseHue, 95, 72, 0.6);
        ctx.lineWidth = 1.4;
        ctx.stroke();

        // Spine Nodule Node
        ctx.fillStyle = '#fde047';
        ctx.beginPath();
        ctx.arc(rx, ry - 14 * dragonScale, 2.5 * dragonScale, 0, Math.PI * 2);
        ctx.fill();
      }

      // 3. Multi-Strand Logarithmic Prehensile Tail Spiral
      const tailRoots = [25 * dragonScale, 28 * dragonScale, 31 * dragonScale];
      for (let tr = 0; tr < 3; tr++) {
        ctx.beginPath();
        ctx.moveTo(tailRoots[tr], (45 + tr * 3) * dragonScale);
        const tailSteps = 45;
        for (let s = 1; s <= tailSteps; s++) {
          const normS = s / tailSteps;
          const theta = normS * Math.PI * 3.6;
          const r = (55 - tr * 4) * dragonScale * Math.exp(-0.45 * theta);
          const tx = 25 * dragonScale + 35 * dragonScale - Math.cos(theta) * r;
          const ty = 45 * dragonScale + 25 * dragonScale + Math.sin(theta) * r;
          ctx.lineTo(tx, ty);
        }
        ctx.strokeStyle = hsla(baseHue, 95, 75, (0.9 - tr * 0.25));
        ctx.lineWidth = tr === 1 ? 2.6 * dragonScale : 1.2 * dragonScale;
        ctx.stroke();
      }

      // 4. Lush Foliaceous Camouflage Appendages (Neck, Dorsal, Flank, and Tail)
      drawLushLeafAppendage(-40 * dragonScale, -65 * dragonScale, -Math.PI * 0.7, 75 * dragonScale, 0);
      drawLushLeafAppendage(0, -35 * dragonScale, -Math.PI * 0.42, 92 * dragonScale, 1.2);
      drawLushLeafAppendage(28 * dragonScale, 12 * dragonScale, -Math.PI * 0.22, 105 * dragonScale, 2.4);
      drawLushLeafAppendage(38 * dragonScale, 65 * dragonScale, Math.PI * 0.12, 85 * dragonScale, 3.6);

      ctx.restore();
    },
  };
}
