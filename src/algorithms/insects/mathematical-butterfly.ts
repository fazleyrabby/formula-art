import type { ArtRenderer, ParameterState, RenderContext, TimeState } from '../../types/engine';
import { hsla } from '../common/color';

// 071 - Temple Fay Mathematical Butterfly (Transcendental Curve & Iridescent Wing Venation)
export function createMathematicalButterfly(): ArtRenderer {
  return {
    setup() {},

    render(context: RenderContext, timeState: TimeState, params: ParameterState) {
      const { ctx, width, height } = context;
      const flapSpeed = Number(params.flapSpeed ?? 1.2);
      const wingIridescence = Number(params.iridescence ?? 1.0);
      const venationDensity = Math.max(3, Math.min(8, Math.round(Number(params.venationDensity ?? 5))));
      const t = timeState.time * flapSpeed;

      // Deep twilight garden obsidian canvas
      ctx.fillStyle = '#040308';
      ctx.fillRect(0, 0, width, height);

      const cx = width * 0.5;
      const cy = height * 0.5;
      const maxR = Math.min(width, height) * 0.44;

      // 3D Flapping Angle (Cosine foreshortening on X-axis)
      const flapAngle = Math.sin(t * 3.5);
      const flapScaleX = 0.35 + 0.65 * Math.cos(t * 3.5);
      const hoverY = Math.sin(t * 2) * 10;

      ctx.save();
      ctx.translate(cx, cy + hoverY);

      const baseHue = 195; // Electric Blue Morpho

      // 1. Floating Iridescent Wing Dust Scales
      for (let s = 0; s < 25; s++) {
        const seed = s * 89.3;
        const sa = Math.sin(seed + t * 0.5) * Math.PI * 2;
        const sr = maxR * (0.3 + 0.6 * Math.sin(seed * 3 + t * 0.4));
        const px = Math.cos(sa) * (sr * flapScaleX);
        const py = Math.sin(sa) * sr + Math.sin(t * 2 + s) * 12;
        const sAlpha = 0.2 + 0.4 * Math.sin(t * 3 + s);

        ctx.fillStyle = hsla(baseHue + (s % 3) * 35, 95, 75, sAlpha * wingIridescence);
        ctx.beginPath();
        ctx.arc(px, py, 1.2 + (s % 3) * 0.6, 0, Math.PI * 2);
        ctx.fill();
      }

      // 2. Bilateral Wings (Left side = -1, Right side = 1)
      for (const side of [-1, 1]) {
        ctx.save();
        ctx.scale(side * flapScaleX, 1);

        // --- Major Forewing (Upper Wing) ---
        ctx.beginPath();
        const fPoints: { x: number; y: number }[] = [];
        const fSteps = 70;
        for (let i = 0; i <= fSteps; i++) {
          const u = i / fSteps;
          const theta = u * Math.PI * 0.75 - Math.PI * 0.15;
          // Temple Fay forewing envelope
          const r = maxR * (0.3 + 0.68 * Math.pow(Math.sin(u * Math.PI), 0.7));
          const fx = Math.sin(theta) * r * 1.2;
          const fy = -Math.cos(theta) * r * 0.95;
          fPoints.push({ x: fx, y: fy });
          if (i === 0) ctx.moveTo(fx, fy);
          else ctx.lineTo(fx, fy);
        }
        ctx.closePath();

        // Iridescent morpho blue gradient wash
        const fHue = baseHue + flapAngle * 15;
        ctx.fillStyle = hsla(fHue, 90, 52, 0.45 * wingIridescence);
        ctx.fill();
        ctx.strokeStyle = hsla(fHue + 25, 95, 80, 0.85);
        ctx.lineWidth = 1.4;
        ctx.stroke();

        // Forewing Venation Filaments & Marginal Vein Cells
        for (let v = 1; v <= venationDensity; v++) {
          const vFrac = v / (venationDensity + 1);
          const targetPt = fPoints[Math.floor(vFrac * fSteps)];
          ctx.beginPath();
          ctx.moveTo(0, -maxR * 0.08);
          ctx.quadraticCurveTo(targetPt.x * 0.4, targetPt.y * 0.6, targetPt.x, targetPt.y);
          ctx.strokeStyle = hsla(fHue + 35, 90, 85, 0.35);
          ctx.lineWidth = 0.8;
          ctx.stroke();

          // Inter-vein Sub-Branchlet
          ctx.beginPath();
          ctx.moveTo(targetPt.x * 0.5, targetPt.y * 0.5);
          ctx.lineTo(targetPt.x * 0.85, targetPt.y * 0.75);
          ctx.strokeStyle = hsla(fHue + 15, 85, 78, 0.25);
          ctx.lineWidth = 0.6;
          ctx.stroke();
        }

        // Forewing Ocellus Eye-Spot
        const eyeX = fPoints[Math.floor(fSteps * 0.55)].x * 0.65;
        const eyeY = fPoints[Math.floor(fSteps * 0.55)].y * 0.65;
        ctx.fillStyle = hsla(fHue + 70, 95, 85, 0.9);
        ctx.beginPath();
        ctx.arc(eyeX, eyeY, 4.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#05040a';
        ctx.lineWidth = 1.6;
        ctx.stroke();

        // --- Minor Hindwing (Lower Wing with Tail Scallop) ---
        ctx.beginPath();
        const hSteps = 50;
        const hPoints: { x: number; y: number }[] = [];
        for (let j = 0; j <= hSteps; j++) {
          const v = j / hSteps;
          const phi = v * Math.PI * 0.8 + Math.PI * 0.4;
          const scallop = Math.sin(v * Math.PI * 4) * (maxR * 0.04);
          const hr = maxR * (0.25 + 0.48 * Math.sin(v * Math.PI)) + scallop;
          const hx = Math.sin(phi) * hr * 0.9;
          const hy = -Math.cos(phi) * hr * 0.9;
          hPoints.push({ x: hx, y: hy });
          if (j === 0) ctx.moveTo(hx, hy);
          else ctx.lineTo(hx, hy);
        }
        ctx.closePath();

        ctx.fillStyle = hsla(fHue - 20, 90, 48, 0.4 * wingIridescence);
        ctx.fill();
        ctx.strokeStyle = hsla(fHue + 15, 95, 76, 0.8);
        ctx.lineWidth = 1.3;
        ctx.stroke();

        // Hindwing Venation Arcs
        for (let w = 1; w <= 3; w++) {
          const target = hPoints[Math.floor((w / 4) * hSteps)];
          ctx.beginPath();
          ctx.moveTo(0, maxR * 0.05);
          ctx.quadraticCurveTo(target.x * 0.45, target.y * 0.5, target.x, target.y);
          ctx.strokeStyle = hsla(fHue + 40, 85, 82, 0.3);
          ctx.lineWidth = 0.75;
          ctx.stroke();
        }

        ctx.restore();
      }

      // 3. Central Arthropod Anatomy (Head, Thorax, Abdomen & Antennae)
      // Segmented Abdomen
      const segCount = 8;
      for (let s = 0; s < segCount; s++) {
        const sNorm = s / segCount;
        const sy = (sNorm * maxR * 0.42) - maxR * 0.05;
        const sw = (maxR * 0.045) * (1 - sNorm * 0.6);
        const sh = (maxR * 0.048);

        ctx.beginPath();
        ctx.ellipse(0, sy, sw, sh * 0.5, 0, 0, Math.PI * 2);
        ctx.fillStyle = hsla(220, 80, 20 + s * 3, 0.95);
        ctx.fill();
        ctx.strokeStyle = hsla(baseHue, 90, 65, 0.7);
        ctx.lineWidth = 1.0;
        ctx.stroke();
      }

      // Thorax Dome
      ctx.beginPath();
      ctx.ellipse(0, -maxR * 0.1, maxR * 0.052, maxR * 0.06, 0, 0, Math.PI * 2);
      ctx.fillStyle = '#0f172a';
      ctx.fill();
      ctx.strokeStyle = hsla(baseHue + 20, 95, 75, 0.9);
      ctx.lineWidth = 1.4;
      ctx.stroke();

      // Head & Compound Eyes
      ctx.beginPath();
      ctx.arc(0, -maxR * 0.18, maxR * 0.038, 0, Math.PI * 2);
      ctx.fillStyle = '#020617';
      ctx.fill();
      ctx.strokeStyle = hsla(baseHue, 90, 75, 0.95);
      ctx.lineWidth = 1.2;
      ctx.stroke();

      for (const eyeSide of [-1, 1]) {
        ctx.fillStyle = hsla(baseHue + 45, 100, 85, 0.95);
        ctx.beginPath();
        ctx.arc(eyeSide * (maxR * 0.028), -maxR * 0.185, 2.2, 0, Math.PI * 2);
        ctx.fill();
      }

      // Feathery Clubbed Antennae
      for (const antSide of [-1, 1]) {
        const antSway = Math.sin(t * 3 + antSide) * 0.08;
        ctx.beginPath();
        ctx.moveTo(antSide * 2, -maxR * 0.2);
        const tipX = antSide * (maxR * 0.18) + antSway * 10;
        const tipY = -maxR * 0.38;
        ctx.quadraticCurveTo(antSide * (maxR * 0.06), -maxR * 0.32, tipX, tipY);
        ctx.strokeStyle = hsla(baseHue + 30, 95, 85, 0.85);
        ctx.lineWidth = 1.2;
        ctx.stroke();

        // Clubbed Antenna Terminus Bead
        ctx.fillStyle = hsla(baseHue + 40, 100, 90, 0.95);
        ctx.beginPath();
        ctx.arc(tipX, tipY, 2.5, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();
    },
  };
}
