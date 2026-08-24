import type { ArtRenderer, ParameterState, RenderContext, TimeState } from '../../types/engine';
import { hsla } from '../common/color';

// Macropinna Microstoma (Pacific Barreleye Fish) Transparent Cranial Shield & Tubular Eyes
export function createBarreleyeFish(): ArtRenderer {
  return {
    setup() {},

    render(context: RenderContext, timeState: TimeState, params: ParameterState) {
      const { ctx, width, height } = context;
      const eyeRotateSpeed = Number(params.eyeScanSpeed || 0.8);
      const domeGlow = Number(params.domeClarity || 1.1);
      const t = timeState.time * eyeRotateSpeed;

      ctx.fillStyle = '#030509';
      ctx.fillRect(0, 0, width, height);

      const cx = width * 0.48 + Math.sin(t * 0.4) * (width * 0.04);
      const cy = height * 0.5 + Math.sin(t * 1.3) * 6;
      const fishScale = Math.min(width, height) / 480;

      ctx.save();
      ctx.translate(cx, cy);

      // 1. Dark Scaled Abyssal Fish Body (Dark Charcoal-Brown Torpedo)
      ctx.beginPath();
      ctx.moveTo(-120 * fishScale, 5 * fishScale);
      ctx.quadraticCurveTo(-40 * fishScale, -45 * fishScale, 20 * fishScale, -35 * fishScale);
      ctx.lineTo(20 * fishScale, 30 * fishScale);
      ctx.quadraticCurveTo(-40 * fishScale, 45 * fishScale, -120 * fishScale, 5 * fishScale);
      ctx.closePath();

      ctx.fillStyle = '#0a0d16';
      ctx.fill();
      ctx.strokeStyle = hsla(215, 30, 30, 0.9);
      ctx.lineWidth = 2.4 * fishScale;
      ctx.stroke();

      // Caudal & Pectoral Fins
      const tailWave = Math.sin(t * 2.5) * (14 * fishScale);
      ctx.beginPath();
      ctx.moveTo(-120 * fishScale, 5 * fishScale);
      ctx.lineTo(-165 * fishScale, -28 * fishScale + tailWave);
      ctx.lineTo(-150 * fishScale, 5 * fishScale + tailWave * 0.5);
      ctx.lineTo(-165 * fishScale, 38 * fishScale + tailWave);
      ctx.closePath();
      ctx.fillStyle = 'rgba(15, 23, 42, 0.7)';
      ctx.fill();
      ctx.strokeStyle = hsla(200, 40, 45, 0.7);
      ctx.lineWidth = 1.6;
      ctx.stroke();

      // Large Fan Pectoral Fin
      ctx.beginPath();
      ctx.moveTo(-20 * fishScale, 15 * fishScale);
      ctx.quadraticCurveTo(0, 55 * fishScale, -45 * fishScale, 65 * fishScale);
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.5)';
      ctx.lineWidth = 1.8;
      ctx.stroke();

      // 2. Small Snout with Nares (Scent pits that resemble false eyes)
      ctx.beginPath();
      ctx.moveTo(20 * fishScale, -25 * fishScale);
      ctx.quadraticCurveTo(80 * fishScale, -10 * fishScale, 85 * fishScale, 10 * fishScale);
      ctx.lineTo(20 * fishScale, 30 * fishScale);
      ctx.closePath();
      ctx.fillStyle = '#080a12';
      ctx.fill();
      ctx.strokeStyle = hsla(215, 30, 30, 0.9);
      ctx.lineWidth = 2;
      ctx.stroke();

      // Olfactory Nares Dots
      ctx.fillStyle = '#334155';
      ctx.beginPath();
      ctx.arc(72 * fishScale, -2 * fishScale, 3 * fishScale, 0, Math.PI * 2);
      ctx.fill();

      // 3. Transparent Fluid-Filled Cranial Dome Shield (The Glass Helmet)
      ctx.beginPath();
      ctx.ellipse(35 * fishScale, -25 * fishScale, 48 * fishScale, 34 * fishScale, -0.1, 0, Math.PI * 2);
      
      // Glass Shield Fill
      ctx.fillStyle = hsla(190, 85, 55, 0.18 * domeGlow);
      ctx.fill();
      ctx.strokeStyle = hsla(185, 95, 75, 0.75 * domeGlow);
      ctx.lineWidth = 2.2 * fishScale;
      ctx.stroke();

      // 4. Internal Glowing Emerald Green Cylindrical Tubular Eyes
      const eyeAngle = -Math.PI / 2 + Math.sin(t * 1.5) * 0.35; // Scanning upward / forward

      for (let s = -1; s <= 1; s += 2) {
        const eyeBaseX = (30 + s * 14) * fishScale;
        const eyeBaseY = -18 * fishScale;

        // Tubular Eye Body Cylinder
        ctx.save();
        ctx.translate(eyeBaseX, eyeBaseY);
        ctx.rotate(eyeAngle);

        ctx.beginPath();
        ctx.ellipse(0, -12 * fishScale, 9 * fishScale, 15 * fishScale, 0, 0, Math.PI * 2);
        ctx.fillStyle = '#065f46';
        ctx.fill();
        ctx.strokeStyle = hsla(150, 90, 50, 0.9);
        ctx.lineWidth = 1.6;
        ctx.stroke();

        // Glowing Vivid Green Lens Orb (Filters sunlight & catches siphonophore bioluminescence)
        ctx.fillStyle = hsla(150, 95, 65, 0.95);
        ctx.shadowColor = '#34d399';
        ctx.shadowBlur = 12;
        ctx.beginPath();
        ctx.arc(0, -22 * fishScale, 6.5 * fishScale, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;

        // Lens Iris Ring
        ctx.strokeStyle = '#a7f3d0';
        ctx.lineWidth = 1.4;
        ctx.beginPath();
        ctx.arc(0, -22 * fishScale, 4.5 * fishScale, 0, Math.PI * 2);
        ctx.stroke();

        ctx.restore();
      }

      ctx.restore();
    },
  };
}
