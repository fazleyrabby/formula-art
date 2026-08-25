import type { ArtRenderer, ParameterState, RenderContext, TimeState } from '../../types/engine';
import { hsla } from '../common/color';

// 069 - Bioluminescent Orchid (Zygomorphic Bilateral Floral Symmetry & Neon Nectar Spurs)
export function createBioluminescentOrchid(): ArtRenderer {
  return {
    setup() {},

    render(context: RenderContext, timeState: TimeState, params: ParameterState) {
      const { ctx, width, height } = context;
      const glow = Number(params.luminescence ?? 1.0);
      const pulseSpeed = Number(params.pulseSpeed ?? 0.5);
      const veinDensity = Math.max(3, Math.min(8, Math.round(Number(params.veinDensity ?? 5))));
      const t = timeState.time * pulseSpeed;

      // Deep abyssal night garden backdrop
      ctx.fillStyle = '#040308';
      ctx.fillRect(0, 0, width, height);

      const cx = width * 0.5;
      const cy = height * 0.52;
      const maxR = Math.min(width, height) * 0.42;

      ctx.save();
      ctx.translate(cx, cy);

      const cyanHue = 185;
      const violetHue = 285;
      const pulse = 1 + 0.08 * Math.sin(t * 2);

      // 1. Floating Bioluminescent Pollen Spores
      for (let s = 0; s < 25; s++) {
        const sSeed = s * 99.7;
        const sa = Math.sin(sSeed + t * 0.3) * Math.PI * 2;
        const sr = (maxR * 0.2) + ((s * 37) % Math.floor(maxR * 0.85));
        const px = Math.cos(sa) * sr;
        const py = Math.sin(sa) * sr - Math.sin(t + s) * 15;
        const sAlpha = 0.2 + 0.4 * Math.sin(t * 1.5 + s);

        ctx.fillStyle = hsla(cyanHue + (s % 3) * 30, 95, 75, sAlpha * glow);
        ctx.beginPath();
        ctx.arc(px, py, 1.2 + (s % 3) * 0.6, 0, Math.PI * 2);
        ctx.fill();
      }

      // Helper function for bilateral symmetric petal rendering
      function drawPetal(
        ctrl1X: number,
        ctrl1Y: number,
        tipX: number,
        tipY: number,
        ctrl2X: number,
        ctrl2Y: number,
        hue: number,
        alpha: number
      ) {
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.bezierCurveTo(ctrl1X, ctrl1Y, tipX * 0.7, tipY * 0.9, tipX, tipY);
        ctx.bezierCurveTo(tipX * 0.3, tipY * 0.9, ctrl2X, ctrl2Y, 0, 0);

        ctx.fillStyle = hsla(hue, 90, 60, alpha * 0.35 * glow);
        ctx.fill();
        ctx.strokeStyle = hsla(hue + 15, 95, 78, alpha * glow);
        ctx.lineWidth = 1.3;
        ctx.stroke();

        // Radiating bioluminescent veining
        for (let v = 1; v <= veinDensity; v++) {
          const vFrac = v / (veinDensity + 1);
          ctx.beginPath();
          ctx.moveTo(0, 0);
          const vx = tipX * vFrac + (ctrl1X + ctrl2X) * 0.25 * (1 - vFrac);
          const vy = tipY * vFrac;
          ctx.quadraticCurveTo(vx * 0.7, vy * 0.7, vx, vy);
          ctx.strokeStyle = hsla(cyanHue, 100, 85, 0.25 * glow);
          ctx.lineWidth = 0.75;
          ctx.stroke();
        }
      }

      // 2. Dorsal Sepal (Top Upright Petal)
      const dLen = maxR * 0.75 * pulse;
      const dWidth = dLen * 0.38;
      drawPetal(-dWidth, -dLen * 0.45, 0, -dLen, dWidth, -dLen * 0.45, violetHue, 0.85);

      // 3. Lower Lateral Sepals (Left & Right Bottom Pair)
      const latSepLen = maxR * 0.78 * pulse;
      const latSepWidth = latSepLen * 0.35;

      // Bottom Right Sepal
      ctx.save();
      ctx.rotate(Math.PI * 0.38 + Math.sin(t) * 0.03);
      drawPetal(-latSepWidth, latSepLen * 0.45, 0, latSepLen, latSepWidth, latSepLen * 0.45, violetHue + 15, 0.8);
      ctx.restore();

      // Bottom Left Sepal
      ctx.save();
      ctx.rotate(-Math.PI * 0.38 - Math.sin(t) * 0.03);
      drawPetal(-latSepWidth, latSepLen * 0.45, 0, latSepLen, latSepWidth, latSepLen * 0.45, violetHue + 15, 0.8);
      ctx.restore();

      // 4. Lateral Upper Petals (Flared Wide Wings)
      const wingLen = maxR * 0.88 * pulse;
      const wingWidth = wingLen * 0.45;

      // Right Wing
      ctx.save();
      ctx.rotate(Math.PI * 0.58 + Math.sin(t * 1.2) * 0.04);
      drawPetal(-wingWidth * 0.7, -wingLen * 0.3, 0, -wingLen, wingWidth * 0.7, -wingLen * 0.3, violetHue - 15, 0.9);
      ctx.restore();

      // Left Wing
      ctx.save();
      ctx.rotate(-Math.PI * 0.58 - Math.sin(t * 1.2) * 0.04);
      drawPetal(-wingWidth * 0.7, -wingLen * 0.3, 0, -wingLen, wingWidth * 0.7, -wingLen * 0.3, violetHue - 15, 0.9);
      ctx.restore();

      // 5. Orchid Labellum Lip & Nectar Spurs (Center Front)
      const lipLen = maxR * 0.55 * pulse;
      const lipWidth = lipLen * 0.65;

      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.bezierCurveTo(-lipWidth * 0.8, lipLen * 0.3, -lipWidth, lipLen * 0.8, 0, lipLen);
      ctx.bezierCurveTo(lipWidth, lipLen * 0.8, lipWidth * 0.8, lipLen * 0.3, 0, 0);
      ctx.fillStyle = hsla(cyanHue, 95, 55, 0.45 * glow);
      ctx.fill();
      ctx.strokeStyle = hsla(cyanHue + 15, 100, 85, 0.95 * glow);
      ctx.lineWidth = 1.6;
      ctx.stroke();

      // Labellum Nectar Crest
      for (let r = 1; r <= 3; r++) {
        ctx.beginPath();
        ctx.ellipse(0, lipLen * 0.45, lipWidth * (0.2 * r), lipLen * (0.15 * r), 0, 0, Math.PI * 2);
        ctx.strokeStyle = hsla(50, 100, 80, 0.5 * glow);
        ctx.lineWidth = 1.0;
        ctx.stroke();
      }

      // Central Pollinium Column Gland
      ctx.fillStyle = hsla(55, 100, 90, 0.95);
      ctx.beginPath();
      ctx.arc(0, 0, 3.5, 0, Math.PI * 2);
      ctx.fill();

      // Neon Core Glow Corona
      ctx.fillStyle = hsla(cyanHue, 100, 90, 0.4 * glow);
      ctx.beginPath();
      ctx.arc(0, 0, 9.0, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    },
  };
}
