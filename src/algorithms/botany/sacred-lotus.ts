import type { ArtRenderer, ParameterState, RenderContext, TimeState } from '../../types/engine';
import { hsla } from '../common/color';

// 067 - Sacred Water Lotus Bloom (Translucent Multi-Tier Petal Foliation & Golden Receptacle)
export function createSacredLotus(): ArtRenderer {
  return {
    setup() {},

    render(context: RenderContext, timeState: TimeState, params: ParameterState) {
      const { ctx, width, height } = context;
      const petals = Math.max(6, Math.min(20, Math.round(Number(params.petalsPerWhorl ?? 12))));
      const whorls = Math.max(2, Math.min(6, Math.round(Number(params.whorlLayers ?? 4))));
      const bloomDepth = Number(params.bloomOpenness ?? 1.0);
      const speed = Number(params.breathSpeed ?? 0.4);
      const t = timeState.time * speed;

      // Dark tranquil water pond background
      ctx.fillStyle = '#03060a';
      ctx.fillRect(0, 0, width, height);

      const cx = width * 0.5;
      const cy = height * 0.5;
      const maxR = Math.min(width, height) * 0.44;

      ctx.save();
      ctx.translate(cx, cy);

      // 1. Water Ripple Caustics underneath
      for (let r = 1; r <= 3; r++) {
        const rippleR = maxR * (0.85 + 0.15 * r) * (1 + 0.05 * Math.sin(t * 1.5 + r));
        ctx.beginPath();
        ctx.ellipse(0, 0, rippleR, rippleR * 0.92, t * 0.05, 0, Math.PI * 2);
        ctx.strokeStyle = hsla(185, 80, 60, 0.12 - r * 0.02);
        ctx.lineWidth = 1.2;
        ctx.stroke();
      }

      // 2. Layered Translucent Lotus Petal Whorls (Outer to Inner)
      for (let w = whorls; w >= 1; w--) {
        const wFrac = w / whorls;
        const petalLen = maxR * (0.35 + 0.65 * wFrac) * bloomDepth;
        const petalWidth = petalLen * (0.42 - wFrac * 0.1);
        const whorlOffset = (w * Math.PI) / petals + Math.sin(t * 0.8 + w) * 0.06;
        const baseHue = 330 - (whorls - w) * 14; // Magenta gradient towards inner soft pink/white

        for (let p = 0; p < petals; p++) {
          const angle = (p / petals) * Math.PI * 2 + whorlOffset;

          ctx.save();
          ctx.rotate(angle);

          // Individual Lotus Petal (Pointed Gothic / Ogee Arch Folium)
          ctx.beginPath();
          ctx.moveTo(0, 0);

          const c1x = -petalWidth * (0.8 + 0.1 * Math.sin(t * 2 + p));
          const c1y = petalLen * 0.45;
          const tipX = 0;
          const tipY = petalLen;
          const c2x = petalWidth * (0.8 + 0.1 * Math.sin(t * 2 + p));
          const c2y = petalLen * 0.45;

          ctx.bezierCurveTo(c1x, c1y, -petalWidth * 0.3, petalLen * 0.85, tipX, tipY);
          ctx.bezierCurveTo(petalWidth * 0.3, petalLen * 0.85, c2x, c2y, 0, 0);

          // Soft translucent watercolor petal wash
          ctx.fillStyle = hsla(baseHue + (p % 2) * 8, 85, 65 + (whorls - w) * 6, 0.22);
          ctx.fill();

          // Petal edge illumination
          ctx.strokeStyle = hsla(baseHue + 15, 90, 80, 0.65);
          ctx.lineWidth = 1.2;
          ctx.stroke();

          // Central Petal Vein
          ctx.beginPath();
          ctx.moveTo(0, 0);
          ctx.lineTo(0, petalLen * 0.9);
          ctx.strokeStyle = hsla(baseHue + 25, 95, 88, 0.4);
          ctx.lineWidth = 0.8;
          ctx.stroke();

          ctx.restore();
        }
      }

      // 3. Central Golden Lotus Seed Pod (Receptacle & Stamens)
      const podR = maxR * 0.15;
      const stamens = petals * 3;

      // Golden Stamen Ring
      for (let s = 0; s < stamens; s++) {
        const sAng = (s / stamens) * Math.PI * 2 + t * 0.15;
        const sLen = podR * (1.1 + 0.3 * Math.sin(s * 4 + t * 3));
        const px = Math.cos(sAng) * sLen;
        const py = Math.sin(sAng) * sLen;

        ctx.beginPath();
        ctx.moveTo(Math.cos(sAng) * (podR * 0.7), Math.sin(sAng) * (podR * 0.7));
        ctx.lineTo(px, py);
        ctx.strokeStyle = hsla(45, 95, 75, 0.7);
        ctx.lineWidth = 1.2;
        ctx.stroke();

        // Stamen golden anther tip
        ctx.fillStyle = hsla(50, 100, 85, 0.95);
        ctx.beginPath();
        ctx.arc(px, py, 1.6, 0, Math.PI * 2);
        ctx.fill();
      }

      // Receptacle Flat Disk
      ctx.beginPath();
      ctx.arc(0, 0, podR * 0.75, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(234, 179, 8, 0.35)';
      ctx.fill();
      ctx.strokeStyle = hsla(48, 95, 80, 0.9);
      ctx.lineWidth = 1.6;
      ctx.stroke();

      // Seed Pits inside receptacle
      const seedRings = 2;
      for (let sr = 1; sr <= seedRings; sr++) {
        const seeds = sr * 6;
        const sRadius = (sr / (seedRings + 1)) * (podR * 0.65);
        for (let i = 0; i < seeds; i++) {
          const sa = (i / seeds) * Math.PI * 2 + t * 0.05;
          const sx = Math.cos(sa) * sRadius;
          const sy = Math.sin(sa) * sRadius;
          ctx.fillStyle = hsla(42, 90, 45, 0.9);
          ctx.beginPath();
          ctx.arc(sx, sy, 2.0, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      ctx.restore();
    },
  };
}
