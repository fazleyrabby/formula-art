import type { ArtRenderer, ParameterState, RenderContext, TimeState } from '../../types/engine';
import { hsla } from '../common/color';

// Bathypelagic Deep Sea Anglerfish with Glowing Esca Lure Kinematics
export function createDeepSeaAnglerfish(): ArtRenderer {
  return {
    setup() {},

    render(context: RenderContext, timeState: TimeState, params: ParameterState) {
      const { ctx, width, height } = context;
      const lureSpeed = Number(params.lureSpeed || 1.2);
      const glowScale = Number(params.lureGlow || 1.3);
      const t = timeState.time * lureSpeed;

      ctx.fillStyle = '#030408';
      ctx.fillRect(0, 0, width, height);

      const cx = width * 0.48 + Math.sin(t * 0.4) * (width * 0.04);
      const cy = height * 0.54 + Math.sin(t * 1.1) * 8;
      const fishScale = Math.min(width, height) / 500;

      ctx.save();
      ctx.translate(cx, cy);

      // 1. Bulbous Abyssal Body (Dark Melanocetus Shape)
      ctx.beginPath();
      ctx.ellipse(-20 * fishScale, 0, 75 * fishScale, 60 * fishScale, -0.1, 0, Math.PI * 2);
      ctx.fillStyle = '#070913';
      ctx.fill();
      ctx.strokeStyle = hsla(210, 30, 25, 0.9);
      ctx.lineWidth = 2.4;
      ctx.stroke();

      // 2. Cavernous Gape Jaw & Needle Teeth Array
      const jawOpen = 0.35 + 0.15 * Math.sin(t * 1.5);
      
      // Upper Jaw & Head Slope
      ctx.beginPath();
      ctx.moveTo(-10 * fishScale, -45 * fishScale);
      ctx.quadraticCurveTo(45 * fishScale, -40 * fishScale, 70 * fishScale, -15 * fishScale);
      ctx.strokeStyle = hsla(220, 20, 35, 0.9);
      ctx.lineWidth = 3;
      ctx.stroke();

      // Lower Hinged Jaw
      ctx.beginPath();
      ctx.moveTo(-10 * fishScale, 25 * fishScale);
      ctx.quadraticCurveTo(40 * fishScale, 55 * fishScale, 75 * fishScale, 20 * fishScale * (1 + jawOpen));
      ctx.strokeStyle = hsla(220, 20, 35, 0.9);
      ctx.lineWidth = 3;
      ctx.stroke();

      // Translucent Razor Needle Teeth
      const teethCount = 14;
      for (let i = 0; i < teethCount; i++) {
        const normI = i / (teethCount - 1);
        // Upper teeth
        const utX = (15 + normI * 50) * fishScale;
        const utY = (-30 + normI * 15) * fishScale;
        const toothLen = (12 + (i % 3) * 6) * fishScale;

        ctx.beginPath();
        ctx.moveTo(utX, utY);
        ctx.lineTo(utX + 2, utY + toothLen);
        ctx.strokeStyle = 'rgba(224, 242, 254, 0.85)';
        ctx.lineWidth = 1.4;
        ctx.stroke();

        // Lower teeth (pointing upward into mouth)
        const ltX = (18 + normI * 52) * fishScale;
        const ltY = (35 - normI * 12 + jawOpen * 20) * fishScale;

        ctx.beginPath();
        ctx.moveTo(ltX, ltY);
        ctx.lineTo(ltX - 3, ltY - toothLen * 1.2);
        ctx.strokeStyle = 'rgba(224, 242, 254, 0.85)';
        ctx.lineWidth = 1.4;
        ctx.stroke();
      }

      // 3. Small Vestigial Milky Eye
      ctx.fillStyle = '#1e293b';
      ctx.beginPath();
      ctx.arc(32 * fishScale, -28 * fishScale, 4.5 * fishScale, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 1.0;
      ctx.stroke();

      // 4. Oscillating Dorsal Fin & Caudal Tail
      const tailWave = Math.sin(t * 3) * (18 * fishScale);
      ctx.beginPath();
      ctx.moveTo(-90 * fishScale, -5 * fishScale);
      ctx.lineTo(-135 * fishScale, -35 * fishScale + tailWave);
      ctx.lineTo(-120 * fishScale, -5 * fishScale + tailWave * 0.5);
      ctx.lineTo(-135 * fishScale, 25 * fishScale + tailWave);
      ctx.closePath();
      ctx.fillStyle = 'rgba(15, 23, 42, 0.8)';
      ctx.fill();
      ctx.strokeStyle = hsla(200, 40, 40, 0.7);
      ctx.lineWidth = 1.6;
      ctx.stroke();

      // 5. Modified Dorsal Spine (Illicium) & Glowing Esca Photophore Lure
      const illiciumRootX = 15 * fishScale;
      const illiciumRootY = -48 * fishScale;
      
      // Undulating flexible lure rod
      const lureWaveX = Math.sin(t * 2.5) * 22;
      const lureWaveY = Math.cos(t * 2.0) * 16;
      const escaX = 85 * fishScale + lureWaveX;
      const escaY = -95 * fishScale + lureWaveY;

      ctx.beginPath();
      ctx.moveTo(illiciumRootX, illiciumRootY);
      ctx.quadraticCurveTo(20 * fishScale, -110 * fishScale, escaX, escaY);
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.75)';
      ctx.lineWidth = 2.2;
      ctx.stroke();

      // Glowing Esca Photophore (Luciferin Bulb)
      const pulse = 1 + 0.3 * Math.sin(t * 4);
      const glowR = 12 * fishScale * pulse * glowScale;

      // Radial light aura
      const grad = ctx.createRadialGradient(escaX, escaY, 2, escaX, escaY, glowR * 3);
      grad.addColorStop(0, 'rgba(56, 189, 248, 0.95)');
      grad.addColorStop(0.3, 'rgba(56, 189, 248, 0.4)');
      grad.addColorStop(1, 'rgba(56, 189, 248, 0)');

      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(escaX, escaY, glowR * 3, 0, Math.PI * 2);
      ctx.fill();

      // Core bulb
      ctx.fillStyle = '#f0f9ff';
      ctx.beginPath();
      ctx.arc(escaX, escaY, 4 * fishScale, 0, Math.PI * 2);
      ctx.fill();

      // Esca micro-tentacles / filaments
      for (let f = 0; f < 5; f++) {
        const fAngle = (f / 5) * Math.PI * 2 + t * 3;
        ctx.beginPath();
        ctx.moveTo(escaX, escaY);
        ctx.lineTo(escaX + Math.cos(fAngle) * (14 * fishScale), escaY + Math.sin(fAngle) * (14 * fishScale));
        ctx.strokeStyle = 'rgba(125, 211, 252, 0.6)';
        ctx.lineWidth = 1.0;
        ctx.stroke();
      }

      ctx.restore();
    },
  };
}
