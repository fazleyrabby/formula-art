import type { ArtRenderer, ParameterState, RenderContext, TimeState } from '../../types/engine';
import { hsla } from '../common/color';

// 063 - Guilloché Clockwork Lace Filigree (Rose Engine Banknote & Horology Tracery)
export function createGuillocheFiligrane(): ArtRenderer {
  return {
    setup() {},

    render(context: RenderContext, timeState: TimeState, params: ParameterState) {
      const { ctx, width, height } = context;
      const speed = Number(params.speed ?? 0.4);
      const gearRatio = Number(params.gearRatio ?? 7);
      const eccentricity = Number(params.eccentricity ?? 0.75);
      const waveMod = Number(params.waveModulation ?? 12);
      const t = timeState.time * speed;

      // Deep horology midnight background
      ctx.fillStyle = '#04060c';
      ctx.fillRect(0, 0, width, height);

      const cx = width * 0.5;
      const cy = height * 0.5;
      const baseR = Math.min(width, height) * 0.42;

      ctx.save();
      ctx.translate(cx, cy);

      const layers = 5;
      const totalSteps = 480;

      // Nested multi-pass cycloid guilloché rosettes
      for (let layer = 0; layer < layers; layer++) {
        const layerFrac = (layer + 1) / layers;
        const R = baseR * (0.35 + 0.65 * layerFrac);
        const r = (R / gearRatio) * (1 + 0.05 * Math.sin(t * 0.8 + layer));
        const d = r * eccentricity * (1 + 0.15 * Math.cos(t * 1.2 + layer));

        const layerPhase = t * (layer % 2 === 0 ? 0.35 : -0.28) + (layer * Math.PI) / layers;
        const baseHue = (210 + layer * 22 + t * 15) % 360;

        ctx.beginPath();
        for (let i = 0; i <= totalSteps; i++) {
          const theta = (i / totalSteps) * Math.PI * 2 * gearRatio;

          // Multi-frequency hypotrochoid with harmonic wave modulation
          const diff = R - r;
          const k = diff / r;
          const modHarmonic = Math.sin(theta * (waveMod / gearRatio) + layerPhase) * (baseR * 0.04 * layerFrac);

          const x = (diff * Math.cos(theta) + (d + modHarmonic) * Math.cos(k * theta + layerPhase));
          const y = (diff * Math.sin(theta) - (d + modHarmonic) * Math.sin(k * theta + layerPhase));

          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.closePath();

        // Ultra-fine lace stroke with jewel luminescence
        ctx.strokeStyle = hsla(baseHue, 92, 74, 0.55 + layer * 0.08);
        ctx.lineWidth = 1.0;
        ctx.stroke();

        // Secondary cross-weave filigree web for moiré interference
        if (layer % 2 === 1) {
          ctx.beginPath();
          for (let j = 0; j <= totalSteps; j += 6) {
            const theta = (j / totalSteps) * Math.PI * 2 * gearRatio;
            const diff = R - r;
            const k = diff / r;
            const x = (diff * Math.cos(theta) + d * Math.cos(k * theta + layerPhase));
            const y = (diff * Math.sin(theta) - d * Math.sin(k * theta + layerPhase));

            const nx = x * (1 + 0.08 * Math.sin(theta * 3 + t * 2));
            const ny = y * (1 + 0.08 * Math.sin(theta * 3 + t * 2));

            ctx.moveTo(x, y);
            ctx.lineTo(nx, ny);
          }
          ctx.strokeStyle = hsla(baseHue + 40, 95, 82, 0.28);
          ctx.lineWidth = 0.6;
          ctx.stroke();
        }
      }

      // Central Horology Jewel Pivot Ring
      ctx.beginPath();
      ctx.arc(0, 0, baseR * 0.07, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(14, 165, 233, 0.25)';
      ctx.fill();
      ctx.strokeStyle = hsla(195, 100, 85, 0.9);
      ctx.lineWidth = 1.6;
      ctx.stroke();

      // Outer Fine Micrometer Bezel Ticks
      const ticks = 72;
      for (let k = 0; k < ticks; k++) {
        const a = (k / ticks) * Math.PI * 2 + t * 0.05;
        const rInner = baseR * (k % 6 === 0 ? 0.94 : 0.97);
        const rOuter = baseR;
        ctx.beginPath();
        ctx.moveTo(Math.cos(a) * rInner, Math.sin(a) * rInner);
        ctx.lineTo(Math.cos(a) * rOuter, Math.sin(a) * rOuter);
        ctx.strokeStyle = hsla(200, 80, 75, k % 6 === 0 ? 0.7 : 0.35);
        ctx.lineWidth = k % 6 === 0 ? 1.4 : 0.75;
        ctx.stroke();
      }

      ctx.restore();
    },
  };
}
