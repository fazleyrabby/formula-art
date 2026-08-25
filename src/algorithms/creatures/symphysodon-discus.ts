import type { ArtRenderer, ParameterState, RenderContext, TimeState } from '../../types/engine';
import { hsla } from '../common/color';

// 077 - Royal Symphysodon Discus (Disciform Geometry & Neon Striations)
export function createSymphysodonDiscus(): ArtRenderer {
  return {
    setup() {},

    render(context: RenderContext, timeState: TimeState, params: ParameterState) {
      const { ctx, width, height } = context;
      const hoverSpeed = Number(params.hoverRate ?? 0.8);
      const neonGlow = Number(params.striationLuster ?? 1.1);
      const verticalBars = Math.max(5, Math.min(11, Math.round(Number(params.stressBars ?? 7))));
      const t = timeState.time * hoverSpeed;

      // Dark warm Amazonian blackwater backdrop
      ctx.fillStyle = '#050403';
      ctx.fillRect(0, 0, width, height);

      const cx = width * 0.5;
      const cy = height * 0.5;
      const maxR = Math.min(width, height) * 0.44;

      const hoverY = Math.sin(t * 2.2) * 5;

      ctx.save();
      ctx.translate(cx, cy + hoverY);

      const turquoiseHue = 185;
      const baseAmberHue = 28;

      // 1. Continuous Panoramic Dorsal & Anal Fin Fringe
      const finRays = 40;
      for (const fSide of [-1, 1]) {
        // -1: Dorsal Fin (Top), 1: Anal Fin (Bottom)
        for (let r = 0; r < finRays; r++) {
          const rFrac = r / (finRays - 1);
          const rAngle = -Math.PI * 0.6 + rFrac * Math.PI * 1.2;
          const rBaseX = Math.sin(rAngle) * (maxR * 0.52);
          const rBaseY = fSide * (Math.cos(rAngle) * (maxR * 0.52));

          const wave = Math.sin(t * 3.5 - rFrac * 4.0) * 8;
          const finHeight = maxR * 0.22 * Math.sin(rFrac * Math.PI) * (1 + 0.08 * Math.sin(t * 2 + r));
          const tipX = rBaseX + wave * 0.4;
          const tipY = rBaseY + fSide * finHeight;

          ctx.beginPath();
          ctx.moveTo(rBaseX, rBaseY);
          ctx.lineTo(tipX, tipY);
          ctx.strokeStyle = hsla(turquoiseHue + rFrac * 30, 95, 65, 0.45 * neonGlow);
          ctx.lineWidth = 1.4;
          ctx.stroke();

          // Outer glowing margin rim
          if (r % 3 === 0) {
            ctx.fillStyle = hsla(turquoiseHue + 40, 100, 85, 0.7 * neonGlow);
            ctx.beginPath();
            ctx.arc(tipX, tipY, 1.2, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }

      // 2. Caudal Tail Fin (Fan Shape)
      const tailLen = maxR * 0.35;
      const tailWave = Math.sin(t * 3.5) * 6;
      ctx.beginPath();
      ctx.moveTo(maxR * 0.5, 0);
      ctx.bezierCurveTo(maxR * 0.65, -maxR * 0.2, maxR * 0.85 + tailWave, -maxR * 0.25, maxR * 0.5 + tailLen + tailWave, 0);
      ctx.bezierCurveTo(maxR * 0.85 + tailWave, maxR * 0.25, maxR * 0.65, maxR * 0.2, maxR * 0.5, 0);
      ctx.fillStyle = 'rgba(56, 189, 248, 0.2)';
      ctx.fill();
      ctx.strokeStyle = hsla(turquoiseHue, 95, 75, 0.7 * neonGlow);
      ctx.lineWidth = 1.2;
      ctx.stroke();

      // 3. Perfect Circular Disciform Torso
      ctx.beginPath();
      ctx.ellipse(0, 0, maxR * 0.52, maxR * 0.54, 0, 0, Math.PI * 2);

      // Amber/Crimson to Turquoise radial gradient
      const discGrad = ctx.createRadialGradient(0, 0, maxR * 0.1, 0, 0, maxR * 0.54);
      discGrad.addColorStop(0, hsla(baseAmberHue + 15, 95, 52, 0.98));
      discGrad.addColorStop(0.65, hsla(baseAmberHue, 90, 36, 0.95));
      discGrad.addColorStop(1, hsla(turquoiseHue - 20, 85, 25, 0.95));
      ctx.fillStyle = discGrad;
      ctx.fill();
      ctx.strokeStyle = hsla(turquoiseHue, 100, 80, 0.9 * neonGlow);
      ctx.lineWidth = 1.8;
      ctx.stroke();

      // 4. Vertical Melanin Stress Bars (Wild Heckel Bars)
      for (let b = 1; b <= verticalBars; b++) {
        const bFrac = b / (verticalBars + 1);
        const bx = -maxR * 0.42 + bFrac * (maxR * 0.84);
        const bHalfH = Math.sqrt(Math.max(0, Math.pow(maxR * 0.52, 2) - bx * bx)) * 0.92;

        ctx.beginPath();
        ctx.moveTo(bx, -bHalfH);
        ctx.lineTo(bx, bHalfH);
        // Center Heckel bar (bar 4/5) is darker
        const isCenterBar = Math.abs(b - verticalBars / 2) < 1;
        ctx.strokeStyle = isCenterBar ? 'rgba(8, 6, 4, 0.75)' : 'rgba(15, 10, 6, 0.45)';
        ctx.lineWidth = isCenterBar ? 3.5 : 2.0;
        ctx.stroke();
      }

      // 5. Electric Turquoise Labyrinthine Striation Waves (Flank Vermiculations)
      for (let w = 1; w <= 9; w++) {
        const wy = -maxR * 0.38 + w * (maxR * 0.08);
        ctx.beginPath();
        const steps = 30;
        for (let s = 0; s <= steps; s++) {
          const sFrac = s / steps;
          const sx = -maxR * 0.42 + sFrac * (maxR * 0.84);
          const limitH = Math.sqrt(Math.max(0, Math.pow(maxR * 0.5, 2) - sx * sx));
          if (Math.abs(wy) < limitH) {
            const waveY = wy + Math.sin(sx * 0.08 + t * 2 + w) * 3;
            if (s === 0) ctx.moveTo(sx, waveY);
            else ctx.lineTo(sx, waveY);
          }
        }
        ctx.strokeStyle = hsla(turquoiseHue + w * 4, 100, 75, 0.75 * neonGlow);
        ctx.lineWidth = 1.3;
        ctx.stroke();
      }

      // 6. Delicate Fan Pectoral Fin
      ctx.beginPath();
      ctx.ellipse(-maxR * 0.12, maxR * 0.08, maxR * 0.15, maxR * 0.08, 0.5 + Math.sin(t * 4) * 0.2, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(254, 240, 138, 0.25)';
      ctx.fill();
      ctx.strokeStyle = hsla(45, 95, 80, 0.85);
      ctx.lineWidth = 1.1;
      ctx.stroke();

      // 7. Ruby Red Eye & Glint
      const eyeX = -maxR * 0.32;
      const eyeY = -maxR * 0.12;

      ctx.beginPath();
      ctx.arc(eyeX, eyeY, 5.5, 0, Math.PI * 2);
      ctx.fillStyle = '#b91c1c'; // Ruby red iris
      ctx.fill();
      ctx.strokeStyle = hsla(45, 100, 75, 0.9);
      ctx.lineWidth = 1.4;
      ctx.stroke();

      // Pupil
      ctx.beginPath();
      ctx.arc(eyeX, eyeY, 2.5, 0, Math.PI * 2);
      ctx.fillStyle = '#000000';
      ctx.fill();

      // Catchlight
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(eyeX - 1.2, eyeY - 1.2, 1.1, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    },
  };
}
