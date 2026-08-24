import type { ArtRenderer, ParameterState, RenderContext, TimeState } from '../../types/engine';
import { hsla } from '../common/color';

export function createMantaRayGlide(): ArtRenderer {
  const WAKE_PARTICLES = 300;
  const wakeX = new Float32Array(WAKE_PARTICLES);
  const wakeY = new Float32Array(WAKE_PARTICLES);
  const wakeAlpha = new Float32Array(WAKE_PARTICLES);

  return {
    setup(context: RenderContext) {
      for (let i = 0; i < WAKE_PARTICLES; i++) {
        wakeX[i] = Math.random() * context.width;
        wakeY[i] = Math.random() * context.height;
        wakeAlpha[i] = Math.random();
      }
    },

    render(context: RenderContext, timeState: TimeState, params: ParameterState) {
      const { ctx, width, height } = context;
      const speed = Number(params.glideSpeed || 1.1);
      const wingSpan = Number(params.wingSpan || 180);
      const t = timeState.time * speed;

      ctx.fillStyle = 'rgba(6, 9, 16, 0.22)';
      ctx.fillRect(0, 0, width, height);

      const cx = width * 0.5 + Math.sin(t * 0.5) * (width * 0.1);
      const cy = height * 0.48 + Math.sin(t * 1.5) * 12;

      // 1. Water Wake Particles
      for (let i = 0; i < WAKE_PARTICLES; i++) {
        wakeX[i] -= 1.2;
        wakeAlpha[i] -= 0.005;
        if (wakeX[i] < 0 || wakeAlpha[i] <= 0) {
          wakeX[i] = cx + (Math.random() - 0.5) * wingSpan * 1.8;
          wakeY[i] = cy + 50 + Math.random() * 40;
          wakeAlpha[i] = 0.6;
        }

        ctx.fillStyle = hsla(190, 85, 65, wakeAlpha[i] * 0.4);
        ctx.fillRect(wakeX[i], wakeY[i], 1.5, 1.5);
      }

      // 2. Trailing Cephalic Horns & Body Disk
      const wingWave = Math.sin(t * 2.8);
      const wingFlap = Math.cos(t * 2.8);

      ctx.save();
      ctx.translate(cx, cy);

      // Pectoral Fin Geometry (Left & Right Wings with 2D traveling wave curvature)
      ctx.beginPath();
      ctx.moveTo(0, -60); // Head snout

      // Cephalic horn left
      ctx.quadraticCurveTo(-15, -75, -22, -65);
      ctx.quadraticCurveTo(-12, -50, -25, -35);

      // Left wing tip (Flapping wave)
      const leftTipY = -10 + wingWave * 32;
      ctx.quadraticCurveTo(-wingSpan * 0.6, -20 - wingFlap * 15, -wingSpan, leftTipY);
      ctx.quadraticCurveTo(-wingSpan * 0.6, 25 + wingFlap * 15, -25, 55);

      // Tail base
      ctx.lineTo(0, 65);

      // Right wing (Flapping wave)
      const rightTipY = -10 + wingWave * 32;
      ctx.lineTo(25, 55);
      ctx.quadraticCurveTo(wingSpan * 0.6, 25 + wingFlap * 15, wingSpan, rightTipY);
      ctx.quadraticCurveTo(wingSpan * 0.6, -20 - wingFlap * 15, 25, -35);

      // Cephalic horn right
      ctx.quadraticCurveTo(12, -50, 22, -65);
      ctx.quadraticCurveTo(15, -75, 0, -60);
      ctx.closePath();

      // Dorsal Skin Gradient
      const mantaHue = (200 + Math.sin(t) * 15) % 360;
      ctx.fillStyle = hsla(mantaHue, 80, 25, 0.95);
      ctx.fill();
      ctx.strokeStyle = hsla(185, 95, 70, 0.85);
      ctx.lineWidth = 2.2;
      ctx.stroke();

      // Dorsal White Chevron Spots
      ctx.beginPath();
      ctx.ellipse(0, -10, 16, 28, 0, 0, Math.PI * 2);
      ctx.strokeStyle = hsla(180, 90, 80, 0.4);
      ctx.lineWidth = 1.4;
      ctx.stroke();

      // 3. Long Whiplike Caudal Tail
      ctx.beginPath();
      ctx.moveTo(0, 65);
      const tailLength = 160;
      for (let s = 1; s <= 30; s++) {
        const ns = s / 30;
        const tailWave = Math.sin(t * 3 - ns * 4) * (20 * ns);
        const tx = tailWave;
        const ty = 65 + ns * tailLength;
        ctx.lineTo(tx, ty);
      }
      ctx.strokeStyle = hsla(190, 95, 75, 0.7);
      ctx.lineWidth = 1.6;
      ctx.stroke();

      ctx.restore();
    },
  };
}
