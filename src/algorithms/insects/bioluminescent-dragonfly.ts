import type { ArtRenderer, ParameterState, RenderContext, TimeState } from '../../types/engine';
import { hsla } from '../common/color';

// 074 - Bioluminescent Odonata Dragonfly (Counter-Phase 4-Wing Flight & Slender Abdomen)
export function createBioluminescentDragonfly(): ArtRenderer {
  return {
    setup() {},

    render(context: RenderContext, timeState: TimeState, params: ParameterState) {
      const { ctx, width, height } = context;
      const flapRate = Number(params.flapSpeed ?? 1.5);
      const glowLevel = Number(params.bioluminescence ?? 1.0);
      const wingVenation = Math.max(3, Math.min(8, Math.round(Number(params.wingCells ?? 5))));
      const t = timeState.time * flapRate;

      // Dark midnight pond reflection backdrop
      ctx.fillStyle = '#020508';
      ctx.fillRect(0, 0, width, height);

      const cx = width * 0.5;
      const cy = height * 0.48;
      const maxR = Math.min(width, height) * 0.44;

      const hoverY = Math.sin(t * 2.5) * 8;

      ctx.save();
      ctx.translate(cx, cy + hoverY);

      const cyanHue = 175; // Electric Emerald-Cyan

      // 1. Water Ripple Rings beneath dragonfly
      for (let r = 1; r <= 3; r++) {
        const rippleR = maxR * (0.5 + 0.3 * r) * (1 + 0.08 * Math.sin(t * 2 + r));
        ctx.beginPath();
        ctx.ellipse(0, maxR * 0.4, rippleR, rippleR * 0.25, 0, 0, Math.PI * 2);
        ctx.strokeStyle = hsla(cyanHue, 90, 65, (0.15 - r * 0.03) * glowLevel);
        ctx.lineWidth = 1.0;
        ctx.stroke();
      }

      // 2. Four Independent Wings (Counter-phase 90-degree lag)
      // Forewings: Phase 0, Hindwings: Phase PI/2
      for (const wSide of [-1, 1]) {
        // --- Forewing (Upper Wing) ---
        const forePhase = Math.sin(t * 8);
        const foreScale = 0.35 + 0.65 * Math.cos(t * 8);

        ctx.save();
        ctx.translate(wSide * (maxR * 0.05), -maxR * 0.06);
        ctx.rotate(wSide * (-Math.PI * 0.42 + forePhase * 0.15));
        ctx.scale(1, foreScale);

        const fwLen = maxR * 0.95;
        const fwWidth = fwLen * 0.22;

        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.bezierCurveTo(wSide * fwWidth * 0.5, -fwLen * 0.3, wSide * fwWidth, -fwLen * 0.7, 0, -fwLen);
        ctx.bezierCurveTo(-wSide * fwWidth * 0.5, -fwLen * 0.7, -wSide * fwWidth * 0.3, -fwLen * 0.3, 0, 0);

        ctx.fillStyle = hsla(cyanHue, 95, 60, 0.2 * glowLevel);
        ctx.fill();
        ctx.strokeStyle = hsla(cyanHue + 15, 100, 80, 0.85 * glowLevel);
        ctx.lineWidth = 1.3;
        ctx.stroke();

        // Pterostigma (Dense leading-edge wing marker)
        ctx.fillStyle = hsla(50, 100, 85, 0.95 * glowLevel);
        ctx.fillRect(wSide * (fwWidth * 0.55), -fwLen * 0.88, 4, 10);

        // Forewing Vein Cells
        for (let v = 1; v <= wingVenation; v++) {
          const vFrac = v / (wingVenation + 1);
          ctx.beginPath();
          ctx.moveTo(0, -fwLen * vFrac);
          ctx.lineTo(wSide * (fwWidth * 0.8 * (1 - Math.abs(vFrac - 0.5) * 1.2)), -fwLen * vFrac);
          ctx.strokeStyle = hsla(cyanHue + 30, 90, 85, 0.35 * glowLevel);
          ctx.lineWidth = 0.75;
          ctx.stroke();
        }

        ctx.restore();

        // --- Hindwing (Lower Wing, 90 deg counter-phase) ---
        const hindPhase = Math.sin(t * 8 - Math.PI * 0.5);
        const hindScale = 0.35 + 0.65 * Math.cos(t * 8 - Math.PI * 0.5);

        ctx.save();
        ctx.translate(wSide * (maxR * 0.05), maxR * 0.02);
        ctx.rotate(wSide * (-Math.PI * 0.55 + hindPhase * 0.15));
        ctx.scale(1, hindScale);

        const hwLen = maxR * 0.88;
        const hwWidth = hwLen * 0.26;

        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.bezierCurveTo(wSide * hwWidth * 0.6, -hwLen * 0.3, wSide * hwWidth, -hwLen * 0.65, 0, -hwLen);
        ctx.bezierCurveTo(-wSide * hwWidth * 0.4, -hwLen * 0.65, -wSide * hwWidth * 0.2, -hwLen * 0.3, 0, 0);

        ctx.fillStyle = hsla(cyanHue - 20, 95, 55, 0.18 * glowLevel);
        ctx.fill();
        ctx.strokeStyle = hsla(cyanHue, 100, 75, 0.75 * glowLevel);
        ctx.lineWidth = 1.2;
        ctx.stroke();

        ctx.restore();
      }

      // 3. Slender 10-Segmented Abdomen (S1 to S10)
      const abSegments = 10;
      for (let s = 1; s <= abSegments; s++) {
        const sNorm = s / abSegments;
        const sy = (sNorm * maxR * 0.62) + maxR * 0.05;
        const sw = Math.max(1.8, (maxR * 0.035) * (1 - sNorm * 0.4));
        const sh = (maxR * 0.055);

        ctx.beginPath();
        ctx.ellipse(0, sy, sw, sh * 0.5, 0, 0, Math.PI * 2);
        ctx.fillStyle = hsla(cyanHue + (s % 2) * 15, 90, 35 + s * 3, 0.95);
        ctx.fill();
        ctx.strokeStyle = hsla(cyanHue + 25, 100, 80, 0.8 * glowLevel);
        ctx.lineWidth = 1.0;
        ctx.stroke();

        // Bioluminescent Segment Node Dots
        ctx.fillStyle = hsla(cyanHue + 40, 100, 90, 0.95 * glowLevel);
        ctx.beginPath();
        ctx.arc(0, sy, 1.4, 0, Math.PI * 2);
        ctx.fill();
      }

      // Terminal Cerci Claspers
      for (const cSide of [-1, 1]) {
        ctx.beginPath();
        ctx.moveTo(0, maxR * 0.68);
        ctx.lineTo(cSide * 4, maxR * 0.74);
        ctx.strokeStyle = hsla(cyanHue + 20, 95, 80, 0.9 * glowLevel);
        ctx.lineWidth = 1.2;
        ctx.stroke();
      }

      // 4. Thorax (Pterothorax & Flight Muscle Block)
      ctx.beginPath();
      ctx.ellipse(0, -maxR * 0.02, maxR * 0.065, maxR * 0.085, 0, 0, Math.PI * 2);
      ctx.fillStyle = '#062024';
      ctx.fill();
      ctx.strokeStyle = hsla(cyanHue + 10, 95, 78, 0.95 * glowLevel);
      ctx.lineWidth = 1.6;
      ctx.stroke();

      // 5. Giant Hemispherical Compound Eyes (Globular Ommatidia)
      for (const eyeSide of [-1, 1]) {
        ctx.beginPath();
        ctx.arc(eyeSide * (maxR * 0.055), -maxR * 0.12, maxR * 0.05, 0, Math.PI * 2);
        ctx.fillStyle = hsla(cyanHue + 30, 95, 55, 0.95);
        ctx.fill();
        ctx.strokeStyle = hsla(cyanHue + 50, 100, 90, 0.95 * glowLevel);
        ctx.lineWidth = 1.4;
        ctx.stroke();

        // Eye Core Glint
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(eyeSide * (maxR * 0.06), -maxR * 0.13, 2.0, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();
    },
  };
}
