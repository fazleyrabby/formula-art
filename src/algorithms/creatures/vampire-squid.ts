import type { ArtRenderer, ParameterState, RenderContext, TimeState } from '../../types/engine';
import { hsla } from '../common/color';

// Anatomically Enriched Vampyroteuthis Infernalis (Vampire Squid)
// Features: Inner arm cirri fringe rows, basal fin eyelid photophores, dermal light organs,
// respiratory hyponome siphon, and velar filament pocket kinematics.
export function createVampireSquid(): ArtRenderer {
  const ARM_COUNT = 8;
  const CIRRI_PER_ARM = 12;

  return {
    setup() {},

    render(context: RenderContext, timeState: TimeState, params: ParameterState) {
      const { ctx, width, height } = context;
      const pulseSpeed = Number(params.swimSpeed || 1.0);
      const t = timeState.time * pulseSpeed;

      ctx.fillStyle = '#020306';
      ctx.fillRect(0, 0, width, height);

      const cx = width * 0.5;
      const cy = height * 0.44 + Math.sin(t * 1.2) * 8;
      const squidScale = Math.min(width, height) / 480;

      ctx.save();
      ctx.translate(cx, cy);

      // 1. Webbed Umbrella Mantle (Deep Crimson-Black Velvety Texture)
      const armTips: { x: number; y: number; angle: number }[] = [];

      for (let a = 0; a < ARM_COUNT; a++) {
        const normA = a / ARM_COUNT;
        const baseAngle = normA * Math.PI * 2;
        const armWave = Math.sin(t * 2.5 + a * 0.8) * 0.15;
        const curAngle = baseAngle + armWave;

        const armR = (115 + 22 * Math.sin(t * 2 + a)) * squidScale;
        const tx = Math.cos(curAngle) * armR;
        const ty = Math.sin(curAngle) * armR * 0.7 + 25 * squidScale;
        armTips.push({ x: tx, y: ty, angle: curAngle });
      }

      // Draw Interbrachial Webbing Cloak
      ctx.beginPath();
      for (let a = 0; a < ARM_COUNT; a++) {
        const nextA = (a + 1) % ARM_COUNT;
        const p1 = armTips[a];
        const p2 = armTips[nextA];

        if (a === 0) ctx.moveTo(p1.x, p1.y);

        const midX = (p1.x + p2.x) * 0.46;
        const midY = (p1.y + p2.y) * 0.46;
        ctx.quadraticCurveTo(midX, midY, p2.x, p2.y);
      }
      ctx.closePath();

      // Deep Red-Black Velvety Fill
      const cloakGrad = ctx.createRadialGradient(0, 0, 10, 0, 10, 130 * squidScale);
      cloakGrad.addColorStop(0, hsla(355, 80, 22, 0.95));
      cloakGrad.addColorStop(0.7, hsla(350, 75, 14, 0.95));
      cloakGrad.addColorStop(1, hsla(345, 85, 8, 0.95));

      ctx.fillStyle = cloakGrad;
      ctx.fill();
      ctx.strokeStyle = hsla(355, 85, 45, 0.85);
      ctx.lineWidth = 2.4 * squidScale;
      ctx.stroke();

      // Microscopic Dermal Photophore Dots scattered across the cloak
      for (let dot = 0; dot < 36; dot++) {
        const da = (dot / 36) * Math.PI * 2 + t * 0.2;
        const dr = (25 + (dot % 5) * 16) * squidScale;
        const dx = Math.cos(da) * dr;
        const dy = Math.sin(da) * dr * 0.7 + 20 * squidScale;

        ctx.fillStyle = 'rgba(56, 189, 248, 0.55)';
        ctx.fillRect(dx, dy, 1.2, 1.2);
      }

      // 2. Eight Arms with Double Rows of Sensory Cirri
      for (let a = 0; a < ARM_COUNT; a++) {
        const tip = armTips[a];
        
        // Main Arm Spine
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(tip.x, tip.y);
        ctx.strokeStyle = hsla(350, 65, 32, 0.85);
        ctx.lineWidth = 3.5 * squidScale;
        ctx.stroke();

        // Finger-like Cirri projecting from inner arm surface
        for (let c = 1; c <= CIRRI_PER_ARM; c++) {
          const normC = c / (CIRRI_PER_ARM + 1);
          const cx_pos = tip.x * normC;
          const cy_pos = tip.y * normC;

          // Double rows (+/- normal to arm)
          const normAngle = tip.angle + Math.PI / 2;
          const cirriLen = (6 + (c % 3) * 3) * squidScale;

          for (let s = -1; s <= 1; s += 2) {
            const cirriWave = Math.sin(t * 4 + c + a) * (2 * squidScale);
            const ex = cx_pos + Math.cos(normAngle) * (s * cirriLen) + cirriWave;
            const ey = cy_pos + Math.sin(normAngle) * (s * cirriLen);

            ctx.beginPath();
            ctx.moveTo(cx_pos, cy_pos);
            ctx.lineTo(ex, ey);
            ctx.strokeStyle = 'rgba(251, 113, 133, 0.75)';
            ctx.lineWidth = 1.0;
            ctx.stroke();
          }
        }

        // Bioluminescent Photophore Organs at Arm Tips
        const pulse = 1 + 0.35 * Math.sin(t * 4 + a);
        ctx.fillStyle = hsla(190, 100, 75, 0.95);
        ctx.shadowColor = '#38bdf8';
        ctx.shadowBlur = 12 * pulse;
        ctx.beginPath();
        ctx.arc(tip.x, tip.y, 4.0 * pulse * squidScale, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      // 3. Central Mantle Dome, Hyponome Siphon, and Fin Base Photophores
      ctx.beginPath();
      ctx.ellipse(0, -35 * squidScale, 40 * squidScale, 52 * squidScale, 0, 0, Math.PI * 2);
      ctx.fillStyle = hsla(345, 85, 20, 0.95);
      ctx.fill();
      ctx.strokeStyle = hsla(355, 90, 48, 0.9);
      ctx.lineWidth = 2.2 * squidScale;
      ctx.stroke();

      // Mantle Fins (Pectoral Paddles)
      for (let s = -1; s <= 1; s += 2) {
        const finWave = Math.sin(t * 3.5 + s) * 16 * squidScale;
        const finRootX = s * 26 * squidScale;
        const finRootY = -55 * squidScale;

        ctx.beginPath();
        ctx.moveTo(finRootX, finRootY);
        ctx.quadraticCurveTo(s * 80 * squidScale, -78 * squidScale + finWave, s * 48 * squidScale, -32 * squidScale);
        ctx.closePath();
        ctx.fillStyle = hsla(350, 75, 26, 0.85);
        ctx.fill();
        ctx.strokeStyle = hsla(355, 85, 55, 0.85);
        ctx.lineWidth = 1.6;
        ctx.stroke();

        // Large Circular Glowing Eyelid Photophores at Fin Base
        const finPhotoPulse = 1 + 0.3 * Math.sin(t * 3 + s);
        ctx.fillStyle = hsla(195, 100, 78, 0.95);
        ctx.shadowColor = '#38bdf8';
        ctx.shadowBlur = 14 * finPhotoPulse;
        ctx.beginPath();
        ctx.arc(finRootX, finRootY + 8 * squidScale, 5 * finPhotoPulse * squidScale, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;

        // Dark Pigmented Eyelid Ring
        ctx.strokeStyle = '#0f172a';
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }

      // 4. Large Blue/Clear Deep Sea Globular Eyes
      for (let s = -1; s <= 1; s += 2) {
        const eyeX = s * 24 * squidScale;
        const eyeY = -10 * squidScale;
        ctx.fillStyle = '#0284c7';
        ctx.beginPath();
        ctx.arc(eyeX, eyeY, 7.5 * squidScale, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#e0f2fe';
        ctx.lineWidth = 1.6;
        ctx.stroke();

        // Crystalline Lens & Pupil Glint
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(eyeX - 2, eyeY - 2, 2.5 * squidScale, 0, Math.PI * 2);
        ctx.fill();
      }

      // 5. Two Retractile Velar Sensory Filaments (Trailing into abyss)
      for (let s = -1; s <= 1; s += 2) {
        ctx.beginPath();
        ctx.moveTo(s * 10 * squidScale, 20 * squidScale);
        const filSteps = 35;
        for (let i = 1; i <= filSteps; i++) {
          const ni = i / filSteps;
          const fw = Math.sin(t * 2 - ni * 6 + s) * (20 * ni * squidScale);
          const fx = s * (16 * squidScale) + fw;
          const fy = 20 * squidScale + ni * 190 * squidScale;
          ctx.lineTo(fx, fy);
        }
        ctx.strokeStyle = 'rgba(244, 114, 182, 0.55)';
        ctx.lineWidth = 1.2;
        ctx.stroke();
      }

      ctx.restore();
    },
  };
}
