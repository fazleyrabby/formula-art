import type { ArtRenderer, ParameterState, RenderContext, TimeState } from '../../types/engine';
import { hsla } from '../common/color';

// Yuruyurau-Style Luminous Manta Ray (Mobula Birostris)
// Rendered using 48 nested traveling wave streamline ribbons, additive alpha glow,
// curled cephalic food horns, and a 60-node whiplike harmonic tail.
export function createMantaRayGlide(): ArtRenderer {
  const WING_RIBBONS = 42;
  const TAIL_NODES = 55;

  return {
    setup() {},

    render(context: RenderContext, timeState: TimeState, params: ParameterState) {
      const { ctx, width, height } = context;
      const speed = Number(params.glideSpeed || 1.1);
      const wingSpan = Number(params.wingSpan || 190);
      const t = timeState.time * speed;

      ctx.fillStyle = '#020409';
      ctx.fillRect(0, 0, width, height);

      const cx = width * 0.5 + Math.sin(t * 0.5) * (width * 0.08);
      const cy = height * 0.48 + Math.sin(t * 1.5) * 12;

      ctx.save();
      ctx.translate(cx, cy);

      ctx.globalCompositeOperation = 'screen';

      const baseHue = (200 + Math.sin(t * 0.7) * 20) % 360;

      // 1. Yuruyurau Dense Pectoral Wing Streamline Ribbons (42 Nested Wave Contours)
      for (let r = 0; r < WING_RIBBONS; r++) {
        const normR = (r + 1) / WING_RIBBONS;
        const curSpan = wingSpan * normR;
        const wingFlap = Math.sin(t * 2.8 - normR * 1.5) * (34 * Math.pow(normR, 1.4));
        const wingCurl = Math.cos(t * 2.8 - normR * 1.5) * (18 * normR);

        ctx.beginPath();
        // Head Snout Origin
        ctx.moveTo(0, -60 * normR);

        // Left Wing Profile
        ctx.bezierCurveTo(
          -curSpan * 0.4,
          -45 * normR - wingCurl,
          -curSpan * 0.85,
          -15 * normR + wingFlap * 0.6,
          -curSpan,
          -5 * normR + wingFlap
        );
        ctx.bezierCurveTo(
          -curSpan * 0.8,
          25 * normR + wingFlap * 0.5,
          -curSpan * 0.35,
          45 * normR,
          0,
          65 * normR
        );

        // Right Wing Profile
        ctx.bezierCurveTo(
          curSpan * 0.35,
          45 * normR,
          curSpan * 0.8,
          25 * normR + wingFlap * 0.5,
          curSpan,
          -5 * normR + wingFlap
        );
        ctx.bezierCurveTo(
          curSpan * 0.85,
          -15 * normR + wingFlap * 0.6,
          curSpan * 0.4,
          -45 * normR - wingCurl,
          0,
          -60 * normR
        );
        ctx.closePath();

        const ribbonHue = (baseHue + normR * 30) % 360;
        const alpha = 0.08 + normR * 0.35;
        ctx.strokeStyle = hsla(ribbonHue, 95, 68, alpha);
        ctx.lineWidth = normR > 0.9 ? 1.8 : 0.8;
        ctx.stroke();

        // Subtle glowing disc fill
        if (r % 6 === 0) {
          ctx.fillStyle = hsla(ribbonHue, 90, 50, 0.04);
          ctx.fill();
        }
      }

      // 2. Curled Cephalic Horn Filaments (Feeding Funnels)
      for (let s = -1; s <= 1; s += 2) {
        for (let h = 0; h < 8; h++) {
          const normH = h / 7;
          ctx.beginPath();
          ctx.moveTo(s * (12 + normH * 10), -50);
          
          const hornWave = Math.sin(t * 3.5 + normH * 2 + s) * 6;
          const tipX = s * (22 + normH * 12) + hornWave;
          const tipY = -75 - normH * 10 + hornWave * 0.5;

          ctx.quadraticCurveTo(s * (16 + normH * 8), -70, tipX, tipY);
          ctx.strokeStyle = hsla((baseHue + 40) % 360, 95, 75, 0.6);
          ctx.lineWidth = 1.2;
          ctx.stroke();
        }
      }

      // 3. Dorsal Chevron Luminescent Bands
      for (let b = 1; b <= 6; b++) {
        const by = -20 + b * 10;
        const bw = 16 + (6 - b) * 4;
        ctx.beginPath();
        ctx.moveTo(-bw, by);
        ctx.lineTo(0, by - 6);
        ctx.lineTo(bw, by);
        ctx.strokeStyle = hsla(180, 100, 85, 0.65);
        ctx.lineWidth = 1.6;
        ctx.stroke();
      }

      // 4. Long Trailing Harmonic Whiplike Tail (55 Nodes)
      ctx.beginPath();
      ctx.moveTo(0, 65);
      const tailLen = 175;
      for (let n = 1; n <= TAIL_NODES; n++) {
        const normN = n / TAIL_NODES;
        // Phased harmonic traveling wave
        const w1 = Math.sin(t * 3.2 - normN * 5) * (24 * normN);
        const w2 = Math.cos(t * 2.0 - normN * 9) * (10 * normN);
        const tx = w1 + w2;
        const ty = 65 + normN * tailLen;
        ctx.lineTo(tx, ty);
      }
      ctx.strokeStyle = hsla((baseHue + 20) % 360, 95, 75, 0.85);
      ctx.lineWidth = 1.6;
      ctx.stroke();

      ctx.restore();
    },
  };
}
