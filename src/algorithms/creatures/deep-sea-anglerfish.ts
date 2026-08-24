import type { ArtRenderer, ParameterState, RenderContext, TimeState } from '../../types/engine';
import { hsla } from '../common/color';

// Anatomically Enriched Deep Sea Anglerfish (Ceratioidei Morphology)
// Features: Dermal spinules, lateral line neuromasts, depressible pharyngeal & maxillary fangs,
// silver reflector cup inside the glowing esca photophore, and bony fin rays.
export function createDeepSeaAnglerfish(): ArtRenderer {
  const BACTERIA_PARTICLES = 24;
  const bacX = new Float32Array(BACTERIA_PARTICLES);
  const bacY = new Float32Array(BACTERIA_PARTICLES);
  const bacLife = new Float32Array(BACTERIA_PARTICLES);

  return {
    setup() {
      bacLife.fill(0);
    },

    render(context: RenderContext, timeState: TimeState, params: ParameterState) {
      const { ctx, width, height } = context;
      const lureSpeed = Number(params.lureSpeed || 1.2);
      const glowScale = Number(params.lureGlow || 1.3);
      const dt = Math.min(timeState.deltaTime, 0.05) * lureSpeed;
      const t = timeState.time * lureSpeed;

      ctx.fillStyle = '#020306';
      ctx.fillRect(0, 0, width, height);

      const cx = width * 0.48 + Math.sin(t * 0.4) * (width * 0.04);
      const cy = height * 0.54 + Math.sin(t * 1.1) * 8;
      const fishScale = Math.min(width, height) / 500;

      ctx.save();
      ctx.translate(cx, cy);

      // 1. Bulbous Abyssal Body (Dark Melanocetus Shape with Dermal Spinules)
      ctx.beginPath();
      ctx.ellipse(-20 * fishScale, 0, 80 * fishScale, 64 * fishScale, -0.1, 0, Math.PI * 2);
      
      const bodyGrad = ctx.createRadialGradient(-10 * fishScale, -15 * fishScale, 10, -20 * fishScale, 0, 85 * fishScale);
      bodyGrad.addColorStop(0, '#111827');
      bodyGrad.addColorStop(0.7, '#070913');
      bodyGrad.addColorStop(1, '#030408');

      ctx.fillStyle = bodyGrad;
      ctx.fill();
      ctx.strokeStyle = hsla(215, 30, 28, 0.9);
      ctx.lineWidth = 2.4 * fishScale;
      ctx.stroke();

      // Dermal Spinules & Lateral Line Neuromast Sensory Pores
      for (let p = 0; p < 18; p++) {
        const normP = p / 17;
        const poreX = (-90 + normP * 140) * fishScale;
        const poreY = Math.sin(normP * Math.PI * 1.5) * (18 * fishScale);

        // Glowing blue neuromast pore dot
        ctx.fillStyle = 'rgba(56, 189, 248, 0.6)';
        ctx.beginPath();
        ctx.arc(poreX, poreY, 1.4 * fishScale, 0, Math.PI * 2);
        ctx.fill();
      }

      // 2. Cavernous Hinged Gape with Depressible Double-Row Needle Teeth
      const jawOpen = 0.35 + 0.18 * Math.sin(t * 1.5);
      
      // Upper Maxillary Bone
      ctx.beginPath();
      ctx.moveTo(-10 * fishScale, -48 * fishScale);
      ctx.quadraticCurveTo(48 * fishScale, -42 * fishScale, 74 * fishScale, -14 * fishScale);
      ctx.strokeStyle = hsla(220, 25, 40, 0.95);
      ctx.lineWidth = 3.2 * fishScale;
      ctx.stroke();

      // Lower Hinged Dentary Mandible
      ctx.beginPath();
      ctx.moveTo(-12 * fishScale, 26 * fishScale);
      ctx.quadraticCurveTo(42 * fishScale, 60 * fishScale, 78 * fishScale, 22 * fishScale * (1 + jawOpen));
      ctx.strokeStyle = hsla(220, 25, 40, 0.95);
      ctx.lineWidth = 3.2 * fishScale;
      ctx.stroke();

      // Translucent Razor-Sharp Curved Fangs (Long + Short alternating)
      const teethCount = 18;
      for (let i = 0; i < teethCount; i++) {
        const normI = i / (teethCount - 1);
        const toothLen = (14 + (i % 4) * 5) * fishScale;

        // Upper fangs (recurved inward)
        const utX = (12 + normI * 58) * fishScale;
        const utY = (-34 + normI * 18) * fishScale;

        ctx.beginPath();
        ctx.moveTo(utX, utY);
        ctx.quadraticCurveTo(utX - 4 * fishScale, utY + toothLen * 0.5, utX + 2, utY + toothLen);
        ctx.strokeStyle = 'rgba(240, 249, 255, 0.9)';
        ctx.lineWidth = 1.4 * fishScale;
        ctx.stroke();

        // Lower fangs (curving backward to trap prey)
        const ltX = (16 + normI * 60) * fishScale;
        const ltY = (38 - normI * 14 + jawOpen * 22) * fishScale;

        ctx.beginPath();
        ctx.moveTo(ltX, ltY);
        ctx.quadraticCurveTo(ltX - 5 * fishScale, ltY - toothLen * 0.5, ltX - 2, ltY - toothLen * 1.15);
        ctx.strokeStyle = 'rgba(240, 249, 255, 0.9)';
        ctx.lineWidth = 1.4 * fishScale;
        ctx.stroke();
      }

      // 3. Vestigial Milky Eye
      ctx.fillStyle = '#0f172a';
      ctx.beginPath();
      ctx.arc(35 * fishScale, -30 * fishScale, 5 * fishScale, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 1.2;
      ctx.stroke();

      // 4. Bony Ray Caudal & Pectoral Fins
      const tailWave = Math.sin(t * 3.2) * (18 * fishScale);
      for (let ray = 0; ray < 6; ray++) {
        const rayAngle = (ray / 5 - 0.5) * 0.8;
        const rLen = (48 + Math.sin(ray) * 10) * fishScale;
        ctx.beginPath();
        ctx.moveTo(-95 * fishScale, -5 * fishScale);
        ctx.lineTo(-95 * fishScale - Math.cos(rayAngle) * rLen, Math.sin(rayAngle) * rLen + tailWave);
        ctx.strokeStyle = 'rgba(56, 189, 248, 0.5)';
        ctx.lineWidth = 1.6;
        ctx.stroke();
      }

      // 5. Modified Dorsal Spine (Illicium) & Glowing Esca Photophore Lure
      const illiciumRootX = 14 * fishScale;
      const illiciumRootY = -50 * fishScale;
      
      const lureWaveX = Math.sin(t * 2.5) * 24;
      const lureWaveY = Math.cos(t * 2.0) * 18;
      const escaX = 90 * fishScale + lureWaveX;
      const escaY = -100 * fishScale + lureWaveY;

      // Illicium Stem
      ctx.beginPath();
      ctx.moveTo(illiciumRootX, illiciumRootY);
      ctx.quadraticCurveTo(22 * fishScale, -118 * fishScale, escaX, escaY);
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.85)';
      ctx.lineWidth = 2.4 * fishScale;
      ctx.stroke();

      // Esca Internal Reflector Cup & Photophore Chamber
      const pulse = 1 + 0.3 * Math.sin(t * 4);
      const glowR = 14 * fishScale * pulse * glowScale;

      // Light Emission Halo
      const grad = ctx.createRadialGradient(escaX, escaY, 2, escaX, escaY, glowR * 3.5);
      grad.addColorStop(0, 'rgba(56, 189, 248, 0.95)');
      grad.addColorStop(0.35, 'rgba(56, 189, 248, 0.45)');
      grad.addColorStop(1, 'rgba(56, 189, 248, 0)');

      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(escaX, escaY, glowR * 3.5, 0, Math.PI * 2);
      ctx.fill();

      // Silvered Reflector Cup (posterior half of bulb)
      ctx.beginPath();
      ctx.arc(escaX - 2, escaY - 2, 6 * fishScale, 0.5 * Math.PI, 1.5 * Math.PI);
      ctx.fillStyle = '#94a3b8';
      ctx.fill();

      // Luminous Glandular Core
      ctx.fillStyle = '#f0f9ff';
      ctx.beginPath();
      ctx.arc(escaX, escaY, 4.5 * fishScale, 0, Math.PI * 2);
      ctx.fill();

      // Bioluminescent Symbiotic Bacterial Trails Ejected into Water
      for (let b = 0; b < BACTERIA_PARTICLES; b++) {
        bacLife[b] -= dt * 1.5;
        if (bacLife[b] <= 0) {
          bacX[b] = escaX + (Math.random() - 0.5) * 6;
          bacY[b] = escaY + (Math.random() - 0.5) * 6;
          bacLife[b] = 1.0;
        }

        bacX[b] -= dt * 18;
        bacY[b] += (Math.random() - 0.5) * 1.5;

        ctx.fillStyle = hsla(190, 100, 80, bacLife[b] * 0.7);
        ctx.fillRect(bacX[b], bacY[b], 1.5, 1.5);
      }

      ctx.restore();
    },
  };
}
