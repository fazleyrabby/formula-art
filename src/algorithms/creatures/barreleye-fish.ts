import type { ArtRenderer, ParameterState, RenderContext, TimeState } from '../../types/engine';
import { hsla } from '../common/color';

// Ultra-Detailed Anatomical Pacific Barreleye (Macropinna Microstoma)
// Features: 32 volumetric transparent cranial dome rings, internal rotating emerald tubular eyes,
// 28 body streamline ribs with reflective scale pockets, and multi-filament bony ray fins.
export function createBarreleyeFish(): ArtRenderer {
  const DOME_RINGS = 24;
  const BODY_RIBBONS = 28;

  return {
    setup() {},

    render(context: RenderContext, timeState: TimeState, params: ParameterState) {
      const { ctx, width, height } = context;
      const eyeRotateSpeed = Number(params.eyeScanSpeed || 0.8);
      const domeGlow = Number(params.domeClarity || 1.2);
      const t = timeState.time * eyeRotateSpeed;

      ctx.fillStyle = '#020408';
      ctx.fillRect(0, 0, width, height);

      const cx = width * 0.48 + Math.sin(t * 0.4) * (width * 0.04);
      const cy = height * 0.5 + Math.sin(t * 1.3) * 6;
      const fishScale = Math.min(width, height) / 480;

      ctx.save();
      ctx.translate(cx, cy);
      ctx.globalCompositeOperation = 'screen';

      const baseHue = (205 + Math.sin(t * 0.6) * 15) % 360;

      // 1. Volumetric Scaled Fusiform Body (28 Concentric Contour Ribbons)
      for (let r = 1; r <= BODY_RIBBONS; r++) {
        const normR = r / BODY_RIBBONS;
        const curScale = normR * fishScale;

        ctx.beginPath();
        ctx.moveTo(-130 * curScale, 5 * curScale);
        ctx.quadraticCurveTo(-45 * curScale, -50 * curScale, 20 * curScale, -38 * curScale);
        ctx.lineTo(20 * curScale, 34 * curScale);
        ctx.quadraticCurveTo(-45 * curScale, 50 * curScale, -130 * curScale, 5 * curScale);
        ctx.closePath();

        const bHue = (baseHue + normR * 25) % 360;
        ctx.strokeStyle = hsla(bHue, 90, 65, (0.06 + normR * 0.35));
        ctx.lineWidth = r === BODY_RIBBONS ? 2.2 * fishScale : 0.9;
        ctx.stroke();

        if (r % 6 === 0) {
          ctx.fillStyle = hsla(bHue, 80, 45, 0.04);
          ctx.fill();
        }
      }

      // Reflective Large Scale Pockets along body
      for (let sc = 0; sc < 20; sc++) {
        const normSc = sc / 19;
        const sx = (-115 + normSc * 125) * fishScale;
        const sy = Math.sin(sc * 1.4) * (20 * fishScale);

        ctx.beginPath();
        ctx.arc(sx, sy, 7 * fishScale, 0.2 * Math.PI, 1.2 * Math.PI);
        ctx.strokeStyle = 'rgba(56, 189, 248, 0.45)';
        ctx.lineWidth = 1.2;
        ctx.stroke();
      }

      // 2. Multi-Filament Caudal & Pectoral Fin Rays
      const tailWave = Math.sin(t * 2.8) * (16 * fishScale);
      for (let ray = -5; ray <= 5; ray++) {
        const normRay = ray / 5;
        ctx.beginPath();
        ctx.moveTo(-130 * fishScale, 5 * fishScale);
        ctx.lineTo(-175 * fishScale, normRay * (42 * fishScale) + tailWave);
        ctx.strokeStyle = hsla((baseHue + 15) % 360, 95, 75, 0.65);
        ctx.lineWidth = 1.4;
        ctx.stroke();
      }

      // Large Fan Pectoral Fin Rays
      for (let p = 0; p < 8; p++) {
        const normP = p / 7;
        ctx.beginPath();
        ctx.moveTo(-15 * fishScale, 18 * fishScale);
        ctx.quadraticCurveTo(
          (5 + normP * 12) * fishScale,
          (50 + normP * 10) * fishScale,
          (-45 + normP * 25) * fishScale,
          (72 + normP * 8) * fishScale
        );
        ctx.strokeStyle = 'rgba(56, 189, 248, 0.6)';
        ctx.lineWidth = 1.4;
        ctx.stroke();
      }

      // 3. Snout Rostrum with Olfactory Nares Pits
      ctx.beginPath();
      ctx.moveTo(20 * fishScale, -28 * fishScale);
      ctx.quadraticCurveTo(82 * fishScale, -12 * fishScale, 88 * fishScale, 10 * fishScale);
      ctx.lineTo(20 * fishScale, 34 * fishScale);
      ctx.closePath();
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 2.0 * fishScale;
      ctx.stroke();

      // Olfactory Nares False Eye Pits
      ctx.fillStyle = '#334155';
      ctx.beginPath();
      ctx.arc(74 * fishScale, -4 * fishScale, 3.5 * fishScale, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#64748b';
      ctx.lineWidth = 1.2;
      ctx.stroke();

      // 4. Volumetric Transparent Fluid-Filled Cranial Dome (24 Concentric Glass Shells)
      for (let d = 1; d <= DOME_RINGS; d++) {
        const normD = d / DOME_RINGS;
        const dw = 52 * normD * fishScale;
        const dh = 38 * normD * fishScale;

        ctx.beginPath();
        ctx.ellipse(38 * fishScale, -26 * fishScale, dw, dh, -0.1, 0, Math.PI * 2);

        const domeHue = (185 + normD * 20) % 360;
        ctx.strokeStyle = hsla(domeHue, 95, 75, (0.08 + normD * 0.35) * domeGlow);
        ctx.lineWidth = d === DOME_RINGS ? 2.4 * fishScale : 0.9;
        ctx.stroke();

        if (d % 5 === 0) {
          ctx.fillStyle = hsla(domeHue, 90, 60, 0.05 * domeGlow);
          ctx.fill();
        }
      }

      // Glass Meniscus Caustic Spark Arc
      ctx.beginPath();
      ctx.arc(38 * fishScale, -48 * fishScale, 30 * fishScale, 0.2 * Math.PI, 0.8 * Math.PI);
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2.0;
      ctx.stroke();

      // 5. Highly Detailed Internal Rotating Emerald-Green Tubular Optics
      const eyeAngle = -Math.PI / 2 + Math.sin(t * 1.5) * 0.38;

      for (let s = -1; s <= 1; s += 2) {
        const eyeBaseX = (32 + s * 16) * fishScale;
        const eyeBaseY = -18 * fishScale;

        ctx.save();
        ctx.translate(eyeBaseX, eyeBaseY);
        ctx.rotate(eyeAngle);

        // Tubular Sclerotic Body Cylinder (Nested rings)
        for (let er = 1; er <= 4; er++) {
          const normER = er / 4;
          ctx.beginPath();
          ctx.ellipse(0, -14 * fishScale, 10 * normER * fishScale, 16 * normER * fishScale, 0, 0, Math.PI * 2);
          ctx.strokeStyle = hsla(160, 90, 50, (0.3 + normER * 0.5));
          ctx.lineWidth = 1.4;
          ctx.stroke();
        }

        // Luminous Emerald Green Retinal Lens Core
        const lensGrad = ctx.createRadialGradient(0, -25 * fishScale, 2, 0, -25 * fishScale, 12 * fishScale);
        lensGrad.addColorStop(0, '#ffffff');
        lensGrad.addColorStop(0.3, '#34d399');
        lensGrad.addColorStop(0.8, '#059669');
        lensGrad.addColorStop(1, 'rgba(5, 150, 105, 0)');

        ctx.fillStyle = lensGrad;
        ctx.beginPath();
        ctx.arc(0, -25 * fishScale, 12 * fishScale, 0, Math.PI * 2);
        ctx.fill();

        // Glowing Sclerotic Pupil Ring
        ctx.fillStyle = '#10b981';
        ctx.shadowColor = '#34d399';
        ctx.shadowBlur = 14;
        ctx.beginPath();
        ctx.arc(0, -25 * fishScale, 7.5 * fishScale, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;

        // Crystalline Lens Highlight
        ctx.fillStyle = '#f0fdf4';
        ctx.beginPath();
        ctx.arc(-2 * fishScale, -27 * fishScale, 2.8 * fishScale, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
      }

      ctx.restore();
    },
  };
}
