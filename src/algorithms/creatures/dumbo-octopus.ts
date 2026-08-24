import type { ArtRenderer, ParameterState, RenderContext, TimeState } from '../../types/engine';
import { hsla } from '../common/color';

// Yuruyurau-Style Luminous Dumbo Octopus (Grimpoteuthis)
// Rendered using 32 concentric mantle streamline contours, 24 ear-fin flapping filaments,
// additive alpha glow, and an undulating 36-ribbon cirrate umbrella skirt.
export function createDumboOctopus(): ArtRenderer {
  const MANTLE_RIBBONS = 28;
  const EAR_FILAMENTS = 20;

  return {
    setup() {},

    render(context: RenderContext, timeState: TimeState, params: ParameterState) {
      const { ctx, width, height } = context;
      const flapSpeed = Number(params.flapRate || 1.3);
      const earSpan = Number(params.earSpread || 1.2);
      const t = timeState.time * flapSpeed;

      ctx.fillStyle = '#020307';
      ctx.fillRect(0, 0, width, height);

      const cx = width * 0.5 + Math.sin(t * 0.5) * (width * 0.08);
      const cy = height * 0.45 + Math.sin(t * 1.6) * 12;
      const dumboScale = Math.min(width, height) / 480;

      ctx.save();
      ctx.translate(cx, cy);

      ctx.globalCompositeOperation = 'screen';

      const baseHue = (330 + Math.sin(t * 0.6) * 20) % 360;

      // 1. Yuruyurau 28 Concentric Bell Mantle Streamline Ribbons
      for (let r = 0; r < MANTLE_RIBBONS; r++) {
        const normR = (r + 1) / MANTLE_RIBBONS;
        const curW = 46 * normR * dumboScale;
        const curH = 48 * normR * dumboScale;

        ctx.beginPath();
        ctx.ellipse(0, -10 * dumboScale, curW, curH, 0, 0, Math.PI * 2);
        
        const mHue = (baseHue + normR * 25) % 360;
        ctx.strokeStyle = hsla(mHue, 90, 70, (0.06 + normR * 0.3));
        ctx.lineWidth = normR > 0.88 ? 1.6 : 0.8;
        ctx.stroke();
      }

      // 2. Ear-Like Prominent Pectoral Fins (20 Layered Flapping Filaments)
      const earFlap = Math.sin(t * 3.2);
      const earCurl = Math.cos(t * 3.2);

      for (let s = -1; s <= 1; s += 2) {
        for (let ef = 0; ef < EAR_FILAMENTS; ef++) {
          const normE = ef / (EAR_FILAMENTS - 1);
          const rootX = s * (22 + normE * 14) * dumboScale;
          const rootY = (-34 + normE * 12) * dumboScale;

          const curSpan = (55 + normE * 22) * earSpan * dumboScale;
          const tipX = rootX + s * curSpan;
          const tipY = rootY - (14 + normE * 8) * dumboScale + earFlap * (26 * dumboScale);

          ctx.beginPath();
          ctx.moveTo(rootX, rootY);
          ctx.bezierCurveTo(
            rootX + s * (35 + normE * 10) * dumboScale,
            rootY - 45 * dumboScale + earCurl * (16 * dumboScale),
            tipX + s * 10 * dumboScale,
            tipY - 20 * dumboScale,
            tipX,
            tipY
          );
          ctx.bezierCurveTo(
            tipX - s * 15 * dumboScale,
            tipY + 35 * dumboScale,
            rootX + s * 22 * dumboScale,
            rootY + 15 * dumboScale,
            rootX,
            rootY
          );
          ctx.closePath();

          const earHue = (baseHue - 15 + normE * 30) % 360;
          ctx.strokeStyle = hsla(earHue, 95, 78, (0.08 + normE * 0.35));
          ctx.lineWidth = ef % 4 === 0 ? 1.6 : 0.8;
          ctx.stroke();
        }
      }

      // 3. Wide Expressive Eyes with Glowing Rings
      for (let s = -1; s <= 1; s += 2) {
        const eyeX = s * 24 * dumboScale;
        const eyeY = 0;

        ctx.fillStyle = '#0284c7';
        ctx.beginPath();
        ctx.arc(eyeX, eyeY, 8.0 * dumboScale, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#e0f2fe';
        ctx.lineWidth = 1.4;
        ctx.stroke();

        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(eyeX - 2.5, eyeY - 2.5, 3.0 * dumboScale, 0, Math.PI * 2);
        ctx.fill();
      }

      // 4. Undulating Cirrate Webbing Skirt (24 Layered Ribbons)
      const ARM_COUNT = 8;
      for (let layer = 0; layer < 6; layer++) {
        const normL = (layer + 1) / 6;
        const skirtTips: { x: number; y: number }[] = [];

        for (let a = 0; a < ARM_COUNT; a++) {
          const normA = (a / (ARM_COUNT - 1) - 0.5) * Math.PI * 0.82;
          const armWave = Math.sin(t * 2.8 + a * 0.7 + layer * 0.3) * 8 * dumboScale;
          const armLen = (65 + (4 - Math.abs(a - 3.5)) * 8) * normL * dumboScale;

          const ax = Math.sin(normA) * (45 * normL * dumboScale) + armWave;
          const ay = 22 * dumboScale + Math.cos(normA) * armLen;
          skirtTips.push({ x: ax, y: ay });
        }

        ctx.beginPath();
        ctx.moveTo(skirtTips[0].x, skirtTips[0].y);
        for (let a = 1; a < ARM_COUNT; a++) {
          const prev = skirtTips[a - 1];
          const cur = skirtTips[a];
          const midX = (prev.x + cur.x) * 0.5;
          const midY = (prev.y + cur.y) * 0.5 - 10 * normL * dumboScale;
          ctx.quadraticCurveTo(midX, midY, cur.x, cur.y);
        }
        ctx.lineTo(25 * normL * dumboScale, 20 * dumboScale);
        ctx.lineTo(-25 * normL * dumboScale, 20 * dumboScale);
        ctx.closePath();

        const sHue = (baseHue + layer * 10) % 360;
        ctx.strokeStyle = hsla(sHue, 90, 75, (0.1 + normL * 0.35));
        ctx.lineWidth = layer === 5 ? 1.8 : 0.8;
        ctx.stroke();
      }

      ctx.restore();
    },
  };
}
