import type { ArtRenderer, ParameterState, RenderContext, TimeState } from '../../types/engine';
import { hsla } from '../common/color';

// 070 - Fibonacci Sunflower Florets (Vogel's Golden Angle Seed Disk & Ray Petals)
export function createFibonacciSunflower(): ArtRenderer {
  return {
    setup() {},

    render(context: RenderContext, timeState: TimeState, params: ParameterState) {
      const { ctx, width, height } = context;
      const florets = Math.max(150, Math.min(900, Math.round(Number(params.floretCount ?? 450))));
      const divAngleDeg = Number(params.goldenAngleOffset ?? 137.507764);
      const rayCount = Math.max(13, Math.min(55, Math.round(Number(params.rayPetals ?? 21))));
      const speed = Number(params.swaySpeed ?? 0.5);
      const t = timeState.time * speed;

      // Dark sunlit meadow canvas background
      ctx.fillStyle = '#060503';
      ctx.fillRect(0, 0, width, height);

      const cx = width * 0.5;
      const cy = height * 0.5;
      const maxR = Math.min(width, height) * 0.44;

      ctx.save();
      ctx.translate(cx, cy);

      const diskR = maxR * 0.55;
      const divAngleRad = (divAngleDeg * Math.PI) / 180;

      // 1. Two-Layered Outer Golden Ray Petals (Sunburst Coronet)
      for (let layer = 0; layer < 2; layer++) {
        const layerRayCount = layer === 0 ? rayCount : Math.round(rayCount * 1.2);
        const lOffset = layer === 0 ? 0 : Math.PI / layerRayCount;
        const petalLen = maxR * (0.85 + 0.15 * layer) * (1 + 0.03 * Math.sin(t * 1.5 + layer));
        const petalW = (petalLen - diskR) * 0.42;

        for (let p = 0; p < layerRayCount; p++) {
          const baseAngle = (p / layerRayCount) * Math.PI * 2 + lOffset;
          // Wind sway wave modulation
          const sway = Math.sin(t * 1.8 + p * 0.4) * 0.04;

          ctx.save();
          ctx.rotate(baseAngle + sway);

          ctx.beginPath();
          ctx.moveTo(0, diskR * 0.85);

          const ctrl1X = -petalW * (0.8 + 0.1 * Math.sin(t + p));
          const ctrl1Y = diskR + (petalLen - diskR) * 0.45;
          const tipX = 0;
          const tipY = petalLen;
          const ctrl2X = petalW * (0.8 + 0.1 * Math.sin(t + p));
          const ctrl2Y = diskR + (petalLen - diskR) * 0.45;

          ctx.bezierCurveTo(ctrl1X, ctrl1Y, -petalW * 0.25, petalLen * 0.9, tipX, tipY);
          ctx.bezierCurveTo(petalW * 0.25, petalLen * 0.9, ctrl2X, ctrl2Y, 0, diskR * 0.85);

          // Golden-yellow sunburst gradient
          const petalHue = layer === 0 ? 44 + (p % 3) * 3 : 40 + (p % 3) * 2;
          ctx.fillStyle = hsla(petalHue, 95, layer === 0 ? 64 : 56, 0.85);
          ctx.fill();

          ctx.strokeStyle = hsla(petalHue + 8, 95, 78, 0.9);
          ctx.lineWidth = 1.2;
          ctx.stroke();

          // Longitudinal petal vein rib
          ctx.beginPath();
          ctx.moveTo(0, diskR * 0.9);
          ctx.lineTo(0, petalLen * 0.88);
          ctx.strokeStyle = hsla(36, 90, 52, 0.45);
          ctx.lineWidth = 0.8;
          ctx.stroke();

          ctx.restore();
        }
      }

      // 2. Vogel's Model Fibonacci Seed Disk (Parastichy Florets)
      const c = diskR / Math.sqrt(florets);
      for (let n = 1; n <= florets; n++) {
        const theta = n * divAngleRad + t * 0.03;
        const r = c * Math.sqrt(n);
        const px = Math.cos(theta) * r;
        const py = Math.sin(theta) * r;

        const nNorm = n / florets;
        // Inner chocolate/espresso center to outer golden-yellow mature seeds
        const seedHue = 26 + nNorm * 22;
        const seedLight = 24 + nNorm * 48 + Math.sin(t * 2 + n * 0.1) * 4;
        const seedRadius = Math.max(1.4, 1.2 + nNorm * 2.2);

        ctx.fillStyle = hsla(seedHue, 90, seedLight, 0.95);
        ctx.beginPath();
        ctx.arc(px, py, seedRadius, 0, Math.PI * 2);
        ctx.fill();

        // Seed highlights on outer ring
        if (nNorm > 0.6) {
          ctx.strokeStyle = hsla(45, 95, 82, 0.5);
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }

      // 3. Floating Sunlit Pollen Dust Motes
      for (let s = 0; s < 20; s++) {
        const seed = s * 73.1;
        const sa = (seed + t * 0.2) % (Math.PI * 2);
        const sr = maxR * (0.4 + 0.55 * Math.sin(seed * 2 + t * 0.4));
        const px = Math.cos(sa) * sr;
        const py = Math.sin(sa) * sr - Math.sin(t + s) * 12;
        const sAlpha = 0.3 + 0.4 * Math.sin(t * 2 + s);

        ctx.fillStyle = hsla(48, 100, 80, sAlpha);
        ctx.beginPath();
        ctx.arc(px, py, 1.4, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();
    },
  };
}
