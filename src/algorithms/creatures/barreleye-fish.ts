import type { ArtRenderer, ParameterState, RenderContext, TimeState } from '../../types/engine';
import { hsla } from '../common/color';

// Anatomically Enriched Pacific Barreleye (Macropinna Microstoma)
// Features: 3D fluid-filled transparent cranial dome, upward/forward scanning cylindrical tubular eyes
// with emerald green retinal filters, accessory retina, and breathing opercular gill slits.
export function createBarreleyeFish(): ArtRenderer {
  return {
    setup() {},

    render(context: RenderContext, timeState: TimeState, params: ParameterState) {
      const { ctx, width, height } = context;
      const eyeRotateSpeed = Number(params.eyeScanSpeed || 0.8);
      const domeGlow = Number(params.domeClarity || 1.1);
      const t = timeState.time * eyeRotateSpeed;

      ctx.fillStyle = '#020408';
      ctx.fillRect(0, 0, width, height);

      const cx = width * 0.48 + Math.sin(t * 0.4) * (width * 0.04);
      const cy = height * 0.5 + Math.sin(t * 1.3) * 6;
      const fishScale = Math.min(width, height) / 480;

      ctx.save();
      ctx.translate(cx, cy);

      // 1. Dark Scaled Fusiform Body (Dark Charcoal-Brown with Reflective Scales)
      ctx.beginPath();
      ctx.moveTo(-125 * fishScale, 5 * fishScale);
      ctx.quadraticCurveTo(-45 * fishScale, -48 * fishScale, 20 * fishScale, -38 * fishScale);
      ctx.lineTo(20 * fishScale, 32 * fishScale);
      ctx.quadraticCurveTo(-45 * fishScale, 48 * fishScale, -125 * fishScale, 5 * fishScale);
      ctx.closePath();

      const bodyGrad = ctx.createLinearGradient(-125 * fishScale, 0, 20 * fishScale, 0);
      bodyGrad.addColorStop(0, '#090d16');
      bodyGrad.addColorStop(0.5, '#111827');
      bodyGrad.addColorStop(1, '#080a12');

      ctx.fillStyle = bodyGrad;
      ctx.fill();
      ctx.strokeStyle = hsla(215, 30, 32, 0.95);
      ctx.lineWidth = 2.4 * fishScale;
      ctx.stroke();

      // Reflective Large Scale Pockets along flank
      for (let sc = 0; sc < 14; sc++) {
        const normSc = sc / 13;
        const sx = (-110 + normSc * 115) * fishScale;
        const sy = (Math.sin(sc * 1.2) * 16) * fishScale;

        ctx.beginPath();
        ctx.arc(sx, sy, 5.5 * fishScale, 0.2 * Math.PI, 1.2 * Math.PI);
        ctx.strokeStyle = 'rgba(71, 85, 105, 0.4)';
        ctx.lineWidth = 1.0;
        ctx.stroke();
      }

      // 2. Operculum Gill Cover with Breathing Respiration
      const gillBreathe = Math.sin(t * 2.5) * (4 * fishScale);
      ctx.beginPath();
      ctx.moveTo(10 * fishScale, -28 * fishScale);
      ctx.quadraticCurveTo((20 + gillBreathe) * fishScale, 0, 10 * fishScale, 24 * fishScale);
      ctx.strokeStyle = hsla(200, 40, 50, 0.85);
      ctx.lineWidth = 2.0 * fishScale;
      ctx.stroke();

      // 3. Caudal & Pectoral Fin Rays
      const tailWave = Math.sin(t * 2.8) * (14 * fishScale);
      ctx.beginPath();
      ctx.moveTo(-125 * fishScale, 5 * fishScale);
      ctx.lineTo(-170 * fishScale, -30 * fishScale + tailWave);
      ctx.lineTo(-155 * fishScale, 5 * fishScale + tailWave * 0.5);
      ctx.lineTo(-170 * fishScale, 40 * fishScale + tailWave);
      ctx.closePath();
      ctx.fillStyle = 'rgba(15, 23, 42, 0.75)';
      ctx.fill();
      ctx.strokeStyle = hsla(200, 40, 48, 0.75);
      ctx.lineWidth = 1.6;
      ctx.stroke();

      // Large Translucent Fan Pectoral Fin
      ctx.beginPath();
      ctx.moveTo(-15 * fishScale, 18 * fishScale);
      ctx.quadraticCurveTo(5 * fishScale, 58 * fishScale, -42 * fishScale, 70 * fishScale);
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.55)';
      ctx.lineWidth = 2.0;
      ctx.stroke();

      // 4. Snout Rostrum with Olfactory Nares (The false eye-spots)
      ctx.beginPath();
      ctx.moveTo(20 * fishScale, -28 * fishScale);
      ctx.quadraticCurveTo(82 * fishScale, -12 * fishScale, 88 * fishScale, 10 * fishScale);
      ctx.lineTo(20 * fishScale, 32 * fishScale);
      ctx.closePath();
      ctx.fillStyle = '#0a0d16';
      ctx.fill();
      ctx.strokeStyle = hsla(215, 30, 32, 0.95);
      ctx.lineWidth = 2.0 * fishScale;
      ctx.stroke();

      // Olfactory Nares Cavities (Pigmented sensory pits)
      ctx.fillStyle = '#334155';
      ctx.beginPath();
      ctx.arc(74 * fishScale, -4 * fishScale, 3.5 * fishScale, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#64748b';
      ctx.lineWidth = 1.0;
      ctx.stroke();

      // 5. Transparent Fluid-Filled Cranial Dome Shield (The Glass Helmet)
      ctx.beginPath();
      ctx.ellipse(38 * fishScale, -26 * fishScale, 50 * fishScale, 36 * fishScale, -0.1, 0, Math.PI * 2);
      
      const domeGrad = ctx.createRadialGradient(
        35 * fishScale,
        -35 * fishScale,
        5,
        38 * fishScale,
        -26 * fishScale,
        52 * fishScale
      );
      domeGrad.addColorStop(0, hsla(190, 85, 65, 0.28 * domeGlow));
      domeGrad.addColorStop(0.7, hsla(195, 90, 50, 0.15 * domeGlow));
      domeGrad.addColorStop(1, hsla(185, 95, 75, 0.75 * domeGlow));

      ctx.fillStyle = domeGrad;
      ctx.fill();
      ctx.strokeStyle = hsla(185, 95, 80, 0.85 * domeGlow);
      ctx.lineWidth = 2.2 * fishScale;
      ctx.stroke();

      // Cranial Fluid Meniscus Highlight
      ctx.beginPath();
      ctx.arc(38 * fishScale, -48 * fishScale, 28 * fishScale, 0.2 * Math.PI, 0.8 * Math.PI);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.55)';
      ctx.lineWidth = 1.4;
      ctx.stroke();

      // 6. Internal Emerald Green Tubular Eyes (Scanning Upward / Forward)
      const eyeAngle = -Math.PI / 2 + Math.sin(t * 1.5) * 0.38;

      for (let s = -1; s <= 1; s += 2) {
        const eyeBaseX = (32 + s * 15) * fishScale;
        const eyeBaseY = -18 * fishScale;

        ctx.save();
        ctx.translate(eyeBaseX, eyeBaseY);
        ctx.rotate(eyeAngle);

        // Tubular Eye Body Cylinder (Main sclerotic ring)
        ctx.beginPath();
        ctx.ellipse(0, -14 * fishScale, 10 * fishScale, 16 * fishScale, 0, 0, Math.PI * 2);
        ctx.fillStyle = '#064e3b';
        ctx.fill();
        ctx.strokeStyle = hsla(150, 85, 45, 0.9);
        ctx.lineWidth = 1.8;
        ctx.stroke();

        // Glowing Emerald Green Retinal Filter Lens
        ctx.fillStyle = hsla(150, 95, 65, 0.95);
        ctx.shadowColor = '#34d399';
        ctx.shadowBlur = 14;
        ctx.beginPath();
        ctx.arc(0, -24 * fishScale, 7.0 * fishScale, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;

        // Accessory Lateral Retina & Pupil Glint
        ctx.fillStyle = '#a7f3d0';
        ctx.beginPath();
        ctx.arc(-2 * fishScale, -26 * fishScale, 2.5 * fishScale, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
      }

      ctx.restore();
    },
  };
}
