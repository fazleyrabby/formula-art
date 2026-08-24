import type { ArtRenderer, ParameterState, RenderContext, TimeState } from '../../types/engine';
import { hsla } from '../common/color';

// Phycodurus Eques (Leafy Sea Dragon) Prehensile Logarithmic Tail & Foliaceous Camouflage
export function createLeafySeaDragon(): ArtRenderer {
  return {
    setup() {},

    render(context: RenderContext, timeState: TimeState, params: ParameterState) {
      const { ctx, width, height } = context;
      const swellSpeed = Number(params.swellSpeed || 1.1);
      const leafFlutter = Number(params.foliageSway || 1.2);
      const t = timeState.time * swellSpeed;

      ctx.fillStyle = '#03060a';
      ctx.fillRect(0, 0, width, height);

      const cx = width * 0.46 + Math.sin(t * 0.4) * (width * 0.04);
      const cy = height * 0.45 + Math.sin(t * 1.4) * 10;
      const dragonScale = Math.min(width, height) / 500;

      ctx.save();
      ctx.translate(cx, cy);

      // Function to render a leaf-like camouflage appendage
      function drawLeafAppendage(
        rootX: number,
        rootY: number,
        angle: number,
        length: number,
        phase: number
      ) {
        const wave = Math.sin(t * 2.5 + phase) * (14 * leafFlutter * dragonScale);
        const tipX = rootX + Math.cos(angle) * length + wave;
        const tipY = rootY + Math.sin(angle) * length + wave;

        // Central leaf stem rib
        ctx.beginPath();
        ctx.moveTo(rootX, rootY);
        ctx.quadraticCurveTo((rootX + tipX) * 0.5 + wave, (rootY + tipY) * 0.5 - 10, tipX, tipY);
        ctx.strokeStyle = hsla(45, 85, 55, 0.9);
        ctx.lineWidth = 2 * dragonScale;
        ctx.stroke();

        // Serrated foliar lobes along the leaf
        for (let lobe = 1; lobe <= 3; lobe++) {
          const normL = lobe / 3.5;
          const lx = rootX + (tipX - rootX) * normL;
          const ly = rootY + (tipY - rootY) * normL;

          for (let s = -1; s <= 1; s += 2) {
            const lobeAngle = angle + s * 0.8 + Math.sin(t * 3 + lobe + s) * 0.2;
            const lobeLen = (18 - lobe * 3) * leafFlutter * dragonScale;

            ctx.beginPath();
            ctx.moveTo(lx, ly);
            ctx.quadraticCurveTo(
              lx + Math.cos(lobeAngle) * lobeLen,
              ly + Math.sin(lobeAngle) * lobeLen,
              lx + Math.cos(lobeAngle + 0.3) * (lobeLen * 0.6),
              ly + Math.sin(lobeAngle + 0.3) * (lobeLen * 0.6)
            );
            ctx.fillStyle = hsla(110 + lobe * 15, 80, 50, 0.65);
            ctx.fill();
            ctx.strokeStyle = hsla(85, 90, 65, 0.85);
            ctx.lineWidth = 1.2;
            ctx.stroke();
          }
        }
      }

      // 1. Long Tubular Snout & Head
      ctx.beginPath();
      ctx.moveTo(-60 * dragonScale, -75 * dragonScale);
      ctx.lineTo(-145 * dragonScale, -105 * dragonScale); // Pipe snout tip
      ctx.lineTo(-142 * dragonScale, -95 * dragonScale);
      ctx.lineTo(-50 * dragonScale, -55 * dragonScale);
      ctx.closePath();
      ctx.fillStyle = hsla(38, 80, 48, 0.9);
      ctx.fill();
      ctx.strokeStyle = hsla(45, 90, 70, 0.9);
      ctx.lineWidth = 2.0 * dragonScale;
      ctx.stroke();

      // Eye
      ctx.fillStyle = '#0f172a';
      ctx.beginPath();
      ctx.arc(-55 * dragonScale, -68 * dragonScale, 5 * dragonScale, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // 2. S-Curved Armored Body Trunks
      ctx.beginPath();
      ctx.moveTo(-50 * dragonScale, -55 * dragonScale);
      ctx.bezierCurveTo(
        -10 * dragonScale,
        -15 * dragonScale,
        35 * dragonScale,
        -5 * dragonScale,
        25 * dragonScale,
        45 * dragonScale
      );
      ctx.strokeStyle = hsla(35, 85, 52, 0.95);
      ctx.lineWidth = 12 * dragonScale;
      ctx.stroke();

      // Body armor ring plates
      for (let r = 0; r < 7; r++) {
        const normR = r / 6;
        const rx = -40 * dragonScale + normR * (60 * dragonScale);
        const ry = -45 * dragonScale + normR * (85 * dragonScale);

        ctx.fillStyle = hsla(50, 95, 75, 0.9);
        ctx.beginPath();
        ctx.arc(rx, ry, 3.0 * dragonScale, 0, Math.PI * 2);
        ctx.fill();
      }

      // 3. Prehensile Logarithmic Curled Tail (Golden Spiral Archimedes Curl)
      ctx.beginPath();
      ctx.moveTo(25 * dragonScale, 45 * dragonScale);
      const tailSteps = 45;
      for (let s = 1; s <= tailSteps; s++) {
        const normS = s / tailSteps;
        const theta = normS * Math.PI * 3.5;
        const r = 55 * dragonScale * Math.exp(-0.45 * theta);
        const tx = 25 * dragonScale + 35 * dragonScale - Math.cos(theta) * r;
        const ty = 45 * dragonScale + 25 * dragonScale + Math.sin(theta) * r;
        ctx.lineTo(tx, ty);
      }
      ctx.strokeStyle = hsla(38, 85, 50, 0.95);
      ctx.lineWidth = 5.5 * dragonScale;
      ctx.stroke();

      // 4. Large Foliaceous Leaf Appendages (Dorsal, Neck, and Tail camouflage)
      drawLeafAppendage(-40 * dragonScale, -65 * dragonScale, -Math.PI * 0.7, 65 * dragonScale, 0);
      drawLeafAppendage(0, -35 * dragonScale, -Math.PI * 0.4, 80 * dragonScale, 1.2);
      drawLeafAppendage(25 * dragonScale, 10 * dragonScale, -Math.PI * 0.2, 95 * dragonScale, 2.4);
      drawLeafAppendage(35 * dragonScale, 60 * dragonScale, Math.PI * 0.1, 75 * dragonScale, 3.6);

      ctx.restore();
    },
  };
}
