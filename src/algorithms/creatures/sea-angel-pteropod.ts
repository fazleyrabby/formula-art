import type { ArtRenderer, ParameterState, RenderContext, TimeState } from '../../types/engine';
import { hsla } from '../common/color';

// Yuruyurau-Style Luminous Sea Angel (Clione Limacina)
// Rendered using 32 translucent body streamlines, 28 flapping wing filament ribbons,
// additive alpha glow, and a radiant glowing visceral heart nucleus.
export function createSeaAngelPteropod(): ArtRenderer {
  const BODY_RIBBONS = 28;
  const WING_FILAMENTS = 24;

  return {
    setup() {},

    render(context: RenderContext, timeState: TimeState, params: ParameterState) {
      const { ctx, width, height } = context;
      const wingSpeed = Number(params.wingSpeed || 1.4);
      const wingSpan = Number(params.wingSpan || 1.2);
      const t = timeState.time * wingSpeed;

      ctx.fillStyle = '#020306';
      ctx.fillRect(0, 0, width, height);

      const cx = width * 0.5 + Math.sin(t * 0.6) * (width * 0.05);
      const cy = height * 0.46 + Math.sin(t * 1.8) * 14;
      const angelScale = Math.min(width, height) / 480;

      ctx.save();
      ctx.translate(cx, cy);

      ctx.globalCompositeOperation = 'screen';

      const baseHue = (195 + Math.sin(t * 0.8) * 20) % 360;

      // 1. Yuruyurau 28 Concentric Gymnosome Body Streamline Ribbons
      for (let r = 0; r < BODY_RIBBONS; r++) {
        const normR = (r + 1) / BODY_RIBBONS;
        const curW = 28 * normR * angelScale;
        const curH = 115 * normR * angelScale;

        ctx.beginPath();
        // Head Apex
        ctx.moveTo(0, -65 * normR * angelScale);
        ctx.quadraticCurveTo(curW, -25 * normR * angelScale, curW * 0.7, 30 * normR * angelScale);
        ctx.quadraticCurveTo(curW * 0.3, 75 * normR * angelScale, 0, curH);
        ctx.quadraticCurveTo(-curW * 0.3, 75 * normR * angelScale, -curW * 0.7, 30 * normR * angelScale);
        ctx.quadraticCurveTo(-curW, -25 * normR * angelScale, 0, -65 * normR * angelScale);
        ctx.closePath();

        const bodyHue = (baseHue + normR * 25) % 360;
        ctx.strokeStyle = hsla(bodyHue, 95, 72, (0.06 + normR * 0.28));
        ctx.lineWidth = normR > 0.85 ? 1.6 : 0.8;
        ctx.stroke();
      }

      // 2. Radiant Glowing Visceral Mass Nucleus (Inner Orange-Red Heart)
      for (let visc = 1; visc <= 6; visc++) {
        const vR = (3 + visc * 3) * angelScale;
        ctx.beginPath();
        ctx.ellipse(0, 6 * angelScale, vR, vR * 1.3, 0, 0, Math.PI * 2);
        ctx.strokeStyle = hsla(15 + visc * 8, 100, 68, (0.6 - visc * 0.08));
        ctx.lineWidth = 1.6;
        ctx.stroke();
      }

      ctx.fillStyle = '#fee2e2';
      ctx.shadowColor = '#f97316';
      ctx.shadowBlur = 16;
      ctx.beginPath();
      ctx.arc(0, 6 * angelScale, 3 * angelScale, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;

      // 3. Yuruyurau-Style Fluttering Parapodia Wing Filaments (24 Strands per side)
      const wingWave = Math.sin(t * 3.5);
      const wingCurl = Math.cos(t * 3.5);

      for (let s = -1; s <= 1; s += 2) {
        for (let wf = 0; wf < WING_FILAMENTS; wf++) {
          const normW = wf / (WING_FILAMENTS - 1);
          const rootX = s * (8 + normW * 14) * angelScale;
          const rootY = (-20 + normW * 12) * angelScale;

          const curSpan = (70 + normW * 25) * wingSpan * angelScale;
          const tipX = rootX + s * curSpan;
          const tipY = rootY - (10 + normW * 10) * angelScale + wingWave * (28 * angelScale);

          ctx.beginPath();
          ctx.moveTo(rootX, rootY);
          ctx.bezierCurveTo(
            rootX + s * (35 + normW * 15) * angelScale,
            rootY - 45 * angelScale + wingCurl * (18 * angelScale),
            tipX + s * 15 * angelScale,
            tipY - 25 * angelScale,
            tipX,
            tipY
          );
          ctx.bezierCurveTo(
            tipX - s * 25 * angelScale,
            tipY + 45 * angelScale,
            rootX + s * 25 * angelScale,
            rootY + 25 * angelScale,
            rootX,
            rootY + 12 * angelScale
          );
          ctx.closePath();

          const wingHue = (baseHue - 15 + normW * 35) % 360;
          ctx.strokeStyle = hsla(wingHue, 100, 78, (0.08 + normW * 0.35));
          ctx.lineWidth = wf % 4 === 0 ? 1.6 : 0.8;
          ctx.stroke();
        }
      }

      ctx.restore();
    },
  };
}
