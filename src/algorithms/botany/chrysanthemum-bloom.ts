import type { ArtRenderer, ParameterState, RenderContext, TimeState } from '../../types/engine';
import { hsla } from '../common/color';

// 068 - Chrysanthemum Polar Blossom (Paul Bourke High-Harmonic Foliation Curve)
export function createChrysanthemumBloom(): ArtRenderer {
  return {
    setup() {},

    render(context: RenderContext, timeState: TimeState, params: ParameterState) {
      const { ctx, width, height } = context;
      const speed = Number(params.bloomRate ?? 0.5);
      const petalDensity = Number(params.petalDensity ?? 11);
      const curlIntensity = Number(params.curlIntensity ?? 4);
      const layers = Math.max(2, Math.min(5, Math.round(Number(params.spiralLayers ?? 3))));
      const t = timeState.time * speed;

      // Dark midnight bronze ground
      ctx.fillStyle = '#060504';
      ctx.fillRect(0, 0, width, height);

      const cx = width * 0.5;
      const cy = height * 0.5;
      const maxR = Math.min(width, height) * 0.42;

      ctx.save();
      ctx.translate(cx, cy);

      const baseHue = 38; // Rich Chrysanthemum Golden Amber

      // 1. Multi-Layer Chrysanthemum Harmonic Petal Curves
      const totalSteps = 1200;
      const totalTurns = 16 * Math.PI;

      for (let layer = 1; layer <= layers; layer++) {
        const lFrac = layer / layers;
        const scale = (maxR / 11) * (0.4 + 0.6 * lFrac);
        const pMod = petalDensity + Math.sin(t * 0.5 + layer) * 0.4;
        const layerPhase = t * (layer % 2 === 0 ? 0.35 : -0.28) + (layer * Math.PI) / layers;

        ctx.beginPath();
        for (let i = 0; i <= totalSteps; i++) {
          const u = i / totalSteps;
          const theta = u * totalTurns;

          // Paul Bourke Chrysanthemum Polar Formula
          const p1 = 5 * (1 + Math.sin((pMod * theta) / 5 + layerPhase));
          const p2 = curlIntensity * Math.pow(Math.sin((17 * theta) / 3 - t * 0.8), 4);
          const p3 = Math.pow(Math.sin(9 * theta - Math.PI * 0.5 + layerPhase * 0.5), 8);

          const r = Math.max(0.1, (p1 - p2 * p3)) * scale;
          const px = Math.cos(theta) * r;
          const py = Math.sin(theta) * r;

          if (i === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }

        const layerHue = (baseHue + (layer - 1) * 14 + Math.sin(t * 2) * 6) % 360;
        ctx.strokeStyle = hsla(layerHue, 92, 68 + layer * 4, 0.45 + lFrac * 0.35);
        ctx.lineWidth = 1.2;
        ctx.stroke();
      }

      // 2. Central Dense Core Disk Florets
      const coreR = maxR * 0.12;
      const diskFlorets = 60;
      for (let f = 0; f < diskFlorets; f++) {
        const theta = f * 137.508 * (Math.PI / 180) + t * 0.1; // Golden angle
        const fr = coreR * Math.sqrt(f / diskFlorets);
        const fx = Math.cos(theta) * fr;
        const fy = Math.sin(theta) * fr;

        ctx.fillStyle = hsla(baseHue - 15 + (f % 10) * 2, 95, 78, 0.85);
        ctx.beginPath();
        ctx.arc(fx, fy, 1.8, 0, Math.PI * 2);
        ctx.fill();
      }

      // Glowing Center Stamen Crown
      ctx.fillStyle = hsla(baseHue + 15, 100, 90, 0.95);
      ctx.beginPath();
      ctx.arc(0, 0, 3.2, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    },
  };
}
