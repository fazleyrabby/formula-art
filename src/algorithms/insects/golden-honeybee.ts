import type { ArtRenderer, ParameterState, RenderContext, TimeState } from '../../types/engine';
import { hsla } from '../common/color';

// 073 - Golden Mathematical Honeybee (Apis Mellifera Kinematics & Hexagonal Honeycomb Matrix)
export function createGoldenHoneybee(): ArtRenderer {
  return {
    setup() {},

    render(context: RenderContext, timeState: TimeState, params: ParameterState) {
      const { ctx, width, height } = context;
      const wingFrequency = Number(params.wingBeatSpeed ?? 1.4);
      const honeycombRadius = Number(params.combRadius ?? 1.0);
      const pollenDensity = Math.max(10, Math.min(40, Math.round(Number(params.pollenCount ?? 20))));
      const t = timeState.time * wingFrequency;

      // Dark warm honeycomb hive ground
      ctx.fillStyle = '#060402';
      ctx.fillRect(0, 0, width, height);

      const cx = width * 0.5;
      const cy = height * 0.52;
      const maxR = Math.min(width, height) * 0.42;

      ctx.save();
      ctx.translate(cx, cy);

      const goldHue = 42;

      // 1. Surrounding Geometric Hexagonal Honeycomb Matrix
      const hexSize = maxR * 0.14 * honeycombRadius;
      const hexRings = 2;
      for (let hr = 1; hr <= hexRings; hr++) {
        const count = hr * 6;
        for (let i = 0; i < count; i++) {
          const a = (i / count) * Math.PI * 2 + t * 0.05;
          const hDist = maxR * (0.65 + 0.28 * (hr / hexRings));
          const hx = Math.cos(a) * hDist;
          const hy = Math.sin(a) * hDist;

          ctx.beginPath();
          for (let k = 0; k < 6; k++) {
            const ha = (k / 6) * Math.PI * 2 + Math.PI / 6;
            const px = hx + Math.cos(ha) * hexSize;
            const py = hy + Math.sin(ha) * hexSize;
            if (k === 0) ctx.moveTo(px, py);
            else ctx.lineTo(px, py);
          }
          ctx.closePath();
          ctx.strokeStyle = hsla(goldHue, 90, 70, 0.25);
          ctx.lineWidth = 1.0;
          ctx.stroke();

          // Honey Drop Glow Core in select cells
          if ((i + hr) % 3 === 0) {
            ctx.fillStyle = hsla(38, 95, 60, 0.15 + 0.1 * Math.sin(t * 2 + i));
            ctx.fill();
          }
        }
      }

      // 2. High-Frequency Rapid Wing Beat Stroke (Figure-8 Aerodynamic Plane)
      const strokePhase = Math.sin(t * 18); // 230 Hz visual representation
      const strokePitch = Math.cos(t * 18) * 0.25;

      for (const wSide of [-1, 1]) {
        ctx.save();
        const baseWingAngle = -Math.PI * 0.48 * wSide + strokePhase * 0.35 * wSide;
        ctx.rotate(baseWingAngle);
        ctx.scale(1, 0.4 + 0.6 * Math.abs(strokePhase));

        // Major Forewing (Translucent Prismatic Vein Lattice)
        const wLen = maxR * 0.82;
        const wWidth = wLen * 0.36;

        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.bezierCurveTo(wSide * wWidth * 0.8, -wLen * 0.3, wSide * wWidth * 0.9, -wLen * 0.8, 0, -wLen);
        ctx.bezierCurveTo(-wSide * wWidth * 0.3, -wLen * 0.7, -wSide * wWidth * 0.2, -wLen * 0.2, 0, 0);

        ctx.fillStyle = 'rgba(254, 240, 138, 0.2)';
        ctx.fill();
        ctx.strokeStyle = hsla(50, 100, 85, 0.85);
        ctx.lineWidth = 1.4;
        ctx.stroke();

        // Sub-costal Wing Veins & Marginal Cells
        for (let wv = 1; wv <= 4; wv++) {
          const wvFrac = wv / 5;
          ctx.beginPath();
          ctx.moveTo(0, -wLen * 0.15);
          ctx.quadraticCurveTo(wSide * wWidth * 0.6 * wvFrac, -wLen * 0.5 * wvFrac, wSide * (wWidth * 0.45 * wvFrac), -wLen * wvFrac);
          ctx.strokeStyle = hsla(45, 95, 80, 0.45);
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }

        // Minor Hindwing
        const hwLen = wLen * 0.65;
        const hwWidth = wWidth * 0.75;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.bezierCurveTo(wSide * hwWidth, -hwLen * 0.2, wSide * hwWidth * 0.8, -hwLen * 0.75, 0, -hwLen);
        ctx.bezierCurveTo(0, -hwLen * 0.5, 0, -hwLen * 0.2, 0, 0);
        ctx.fillStyle = 'rgba(253, 224, 71, 0.15)';
        ctx.fill();
        ctx.strokeStyle = hsla(48, 90, 80, 0.6);
        ctx.lineWidth = 1.0;
        ctx.stroke();

        ctx.restore();
      }

      // 3. Banded Golden/Black Velvet Abdomen Segments (Gaster Metasoma)
      const segments = 6;
      for (let s = 0; s < segments; s++) {
        const sFrac = s / segments;
        const sy = (sFrac * maxR * 0.48) + maxR * 0.04;
        const sw = (maxR * 0.18) * Math.sin((sFrac + 0.15) * Math.PI);
        const sh = (maxR * 0.08);

        ctx.beginPath();
        ctx.ellipse(0, sy, sw, sh * 0.5, 0, 0, Math.PI * 2);

        // Alternating Gold & Velvet Black stripes
        const isGoldStripe = s % 2 === 0;
        if (isGoldStripe) {
          ctx.fillStyle = hsla(goldHue + 4, 95, 62, 0.95);
          ctx.fill();
          ctx.strokeStyle = hsla(goldHue + 15, 100, 80, 0.9);
        } else {
          ctx.fillStyle = '#0a0806';
          ctx.fill();
          ctx.strokeStyle = hsla(goldHue - 10, 80, 40, 0.7);
        }
        ctx.lineWidth = 1.2;
        ctx.stroke();
      }

      // Stinger Terminus
      ctx.beginPath();
      ctx.moveTo(-3, maxR * 0.52);
      ctx.lineTo(0, maxR * 0.58);
      ctx.lineTo(3, maxR * 0.52);
      ctx.fillStyle = '#f59e0b';
      ctx.fill();

      // 4. Furry Thorax (Mesosoma)
      ctx.beginPath();
      ctx.ellipse(0, -maxR * 0.06, maxR * 0.15, maxR * 0.14, 0, 0, Math.PI * 2);
      ctx.fillStyle = '#1c1308';
      ctx.fill();
      ctx.strokeStyle = hsla(goldHue, 95, 75, 0.9);
      ctx.lineWidth = 1.8;
      ctx.stroke();

      // Thorax Golden Setae (Furry coat)
      const setaeCount = 20;
      for (let f = 0; f < setaeCount; f++) {
        const fa = (f / setaeCount) * Math.PI * 2;
        const fx = Math.cos(fa) * (maxR * 0.15);
        const fy = -maxR * 0.06 + Math.sin(fa) * (maxR * 0.14);
        ctx.beginPath();
        ctx.moveTo(fx, fy);
        ctx.lineTo(fx * 1.12, fy * 1.12);
        ctx.strokeStyle = hsla(goldHue + 10, 100, 78, 0.6);
        ctx.lineWidth = 0.9;
        ctx.stroke();
      }

      // 5. Head Plate & Massive Compound Ommatidia Eyes
      ctx.beginPath();
      ctx.arc(0, -maxR * 0.22, maxR * 0.1, 0, Math.PI * 2);
      ctx.fillStyle = '#0f0a04';
      ctx.fill();
      ctx.strokeStyle = hsla(goldHue, 90, 70, 0.85);
      ctx.lineWidth = 1.4;
      ctx.stroke();

      for (const eSide of [-1, 1]) {
        ctx.beginPath();
        ctx.ellipse(eSide * (maxR * 0.08), -maxR * 0.23, maxR * 0.045, maxR * 0.07, eSide * 0.25, 0, Math.PI * 2);
        ctx.fillStyle = '#291807';
        ctx.fill();
        ctx.strokeStyle = hsla(goldHue + 20, 100, 85, 0.95);
        ctx.lineWidth = 1.2;
        ctx.stroke();
      }

      // 6. Articulated Antennae
      for (const aSide of [-1, 1]) {
        const aSway = Math.sin(t * 4 + aSide) * 0.06;
        ctx.beginPath();
        ctx.moveTo(aSide * 4, -maxR * 0.28);
        const tipX = aSide * (maxR * 0.14) + aSway * 8;
        const tipY = -maxR * 0.44;
        ctx.quadraticCurveTo(aSide * (maxR * 0.04), -maxR * 0.38, tipX, tipY);
        ctx.strokeStyle = hsla(goldHue + 15, 95, 80, 0.85);
        ctx.lineWidth = 1.3;
        ctx.stroke();
      }

      // 7. Floating Pollen Grains
      for (let p = 0; p < pollenDensity; p++) {
        const pSeed = p * 61.7;
        const pa = (pSeed + t * 0.3) % (Math.PI * 2);
        const pr = maxR * (0.35 + 0.55 * Math.sin(pSeed * 2 + t * 0.5));
        const px = Math.cos(pa) * pr;
        const py = Math.sin(pa) * pr;
        const pAlpha = 0.3 + 0.5 * Math.sin(t * 3 + p);

        ctx.fillStyle = hsla(45, 100, 82, pAlpha);
        ctx.beginPath();
        ctx.arc(px, py, 1.4, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();
    },
  };
}
