import type { ArtRenderer, ParameterState, RenderContext, TimeState } from '../../types/engine';
import { hsla } from '../common/color';

// Grimpoteuthis (Dumbo Octopus) Ear-Fin Flapping Kinematics & Cirrate Bell Mantle
export function createDumboOctopus(): ArtRenderer {
  return {
    setup() {},

    render(context: RenderContext, timeState: TimeState, params: ParameterState) {
      const { ctx, width, height } = context;
      const flapSpeed = Number(params.flapRate || 1.3);
      const earSpan = Number(params.earSpread || 1.2);
      const t = timeState.time * flapSpeed;

      ctx.fillStyle = '#04060b';
      ctx.fillRect(0, 0, width, height);

      // Swimming center with graceful hovering motion
      const cx = width * 0.5 + Math.sin(t * 0.5) * (width * 0.08);
      const cy = height * 0.45 + Math.sin(t * 1.6) * 12;
      const dumboScale = Math.min(width, height) / 480;

      ctx.save();
      ctx.translate(cx, cy);

      // 1. Ear-Like Prominent Pectoral Fins ("Dumbo Ears" Flapping Wave)
      const earFlap = Math.sin(t * 3.2);
      const earCurl = Math.cos(t * 3.2);

      for (let s = -1; s <= 1; s += 2) {
        const rootX = s * 32 * dumboScale;
        const rootY = -28 * dumboScale;

        ctx.beginPath();
        ctx.moveTo(rootX, rootY);

        const tipX = rootX + s * 65 * earSpan * dumboScale;
        const tipY = rootY - 18 * earSpan * dumboScale + earFlap * (26 * dumboScale);

        ctx.bezierCurveTo(
          rootX + s * 40 * dumboScale,
          rootY - 45 * dumboScale + earCurl * (15 * dumboScale),
          tipX + s * 10 * dumboScale,
          tipY - 20 * dumboScale,
          tipX,
          tipY
        );
        ctx.bezierCurveTo(
          tipX - s * 15 * dumboScale,
          tipY + 35 * dumboScale,
          rootX + s * 25 * dumboScale,
          rootY + 15 * dumboScale,
          rootX,
          rootY
        );
        ctx.closePath();

        ctx.fillStyle = hsla(330, 80, 70, 0.85);
        ctx.fill();
        ctx.strokeStyle = hsla(340, 90, 85, 0.9);
        ctx.lineWidth = 2.0;
        ctx.stroke();
      }

      // 2. Bell Mantle Body (Cute gelatinous dome)
      ctx.beginPath();
      ctx.ellipse(0, -10 * dumboScale, 45 * dumboScale, 48 * dumboScale, 0, 0, Math.PI * 2);
      ctx.fillStyle = hsla(335, 75, 58, 0.95);
      ctx.fill();
      ctx.strokeStyle = hsla(345, 85, 75, 0.9);
      ctx.lineWidth = 2.4;
      ctx.stroke();

      // 3. Wide Expressive Eyes
      for (let s = -1; s <= 1; s += 2) {
        const eyeX = s * 24 * dumboScale;
        const eyeY = 0;

        ctx.fillStyle = '#0f172a';
        ctx.beginPath();
        ctx.arc(eyeX, eyeY, 8.5 * dumboScale, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#38bdf8';
        ctx.lineWidth = 1.6;
        ctx.stroke();

        // Eye glint
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(eyeX - 2.5, eyeY - 2.5, 3.0 * dumboScale, 0, Math.PI * 2);
        ctx.fill();
      }

      // 4. Webbed Umbrella Skirt & Curled Arm Tips (Cirri Underneath)
      const ARM_COUNT = 8;
      const skirtTips: { x: number; y: number }[] = [];

      for (let a = 0; a < ARM_COUNT; a++) {
        const normA = (a / (ARM_COUNT - 1) - 0.5) * Math.PI * 0.8;
        const armWave = Math.sin(t * 2.8 + a * 0.7) * 8 * dumboScale;
        const armLen = (65 + (4 - Math.abs(a - 3.5)) * 8) * dumboScale;

        const ax = Math.sin(normA) * (45 * dumboScale) + armWave;
        const ay = 25 * dumboScale + Math.cos(normA) * armLen;

        skirtTips.push({ x: ax, y: ay });
      }

      // Webbing Skirt
      ctx.beginPath();
      ctx.moveTo(skirtTips[0].x, skirtTips[0].y);
      for (let a = 1; a < ARM_COUNT; a++) {
        const prev = skirtTips[a - 1];
        const cur = skirtTips[a];
        const midX = (prev.x + cur.x) * 0.5;
        const midY = (prev.y + cur.y) * 0.5 - 10 * dumboScale;
        ctx.quadraticCurveTo(midX, midY, cur.x, cur.y);
      }
      ctx.lineTo(25 * dumboScale, 20 * dumboScale);
      ctx.lineTo(-25 * dumboScale, 20 * dumboScale);
      ctx.closePath();

      ctx.fillStyle = hsla(330, 70, 45, 0.7);
      ctx.fill();
      ctx.strokeStyle = hsla(340, 85, 68, 0.85);
      ctx.lineWidth = 2.0;
      ctx.stroke();

      // Curling Arm Tips
      for (let a = 0; a < ARM_COUNT; a++) {
        const tip = skirtTips[a];
        ctx.beginPath();
        ctx.arc(tip.x, tip.y, 3 * dumboScale, 0, Math.PI * 2);
        ctx.fillStyle = hsla(45, 95, 75, 0.9);
        ctx.fill();
      }

      ctx.restore();
    },
  };
}
