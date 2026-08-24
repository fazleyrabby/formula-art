import type { ArtRenderer, ParameterState, RenderContext, TimeState } from '../../types/engine';
import { hsla } from '../common/color';

// Vampyroteuthis Infernalis (Vampire Squid) Cloaking Web & Bioluminescent Organs
export function createVampireSquid(): ArtRenderer {
  const ARM_COUNT = 8;

  return {
    setup() {},

    render(context: RenderContext, timeState: TimeState, params: ParameterState) {
      const { ctx, width, height } = context;
      const pulseSpeed = Number(params.swimSpeed || 1.0);
      const cloakState = Number(params.cloakInversion || 0.5);
      const t = timeState.time * pulseSpeed;

      ctx.fillStyle = '#030408';
      ctx.fillRect(0, 0, width, height);

      const cx = width * 0.5;
      const cy = height * 0.44 + Math.sin(t * 1.2) * 8;
      const squidScale = Math.min(width, height) / 480;

      ctx.save();
      ctx.translate(cx, cy);

      // 1. Webbed Umbrella Mantle (Dark Velvety Red-Black Cloak)
      const armAngles: number[] = [];
      const armTips: { x: number; y: number }[] = [];

      for (let a = 0; a < ARM_COUNT; a++) {
        const normA = a / ARM_COUNT;
        const baseAngle = normA * Math.PI * 2;
        const armWave = Math.sin(t * 2.5 + a * 0.8) * 0.15;
        const curAngle = baseAngle + armWave;
        armAngles.push(curAngle);

        const armR = (110 + 20 * Math.sin(t * 2 + a)) * squidScale;
        const tx = Math.cos(curAngle) * armR;
        const ty = Math.sin(curAngle) * armR * 0.7 + 25 * squidScale;
        armTips.push({ x: tx, y: ty });
      }

      // Draw Webbing Interbrachial Membrane between adjacent arms
      ctx.beginPath();
      for (let a = 0; a < ARM_COUNT; a++) {
        const nextA = (a + 1) % ARM_COUNT;
        const p1 = armTips[a];
        const p2 = armTips[nextA];

        if (a === 0) ctx.moveTo(p1.x, p1.y);

        // Concave web arch
        const midX = (p1.x + p2.x) * 0.45;
        const midY = (p1.y + p2.y) * 0.45;
        ctx.quadraticCurveTo(midX, midY, p2.x, p2.y);
      }
      ctx.closePath();

      // Deep Red-Black Mantle Fill
      ctx.fillStyle = hsla(350, 75, 18, 0.9);
      ctx.fill();
      ctx.strokeStyle = hsla(355, 85, 40, 0.85);
      ctx.lineWidth = 2.4 * squidScale;
      ctx.stroke();

      // 2. Eight Arm Spines & Cirri Projections
      for (let a = 0; a < ARM_COUNT; a++) {
        const tip = armTips[a];
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(tip.x, tip.y);
        ctx.strokeStyle = hsla(350, 65, 30, 0.7);
        ctx.lineWidth = 3.0 * squidScale;
        ctx.stroke();

        // Glowing Bioluminescent Photophore Organs at Arm Tips
        const photophorePulse = 1 + 0.3 * Math.sin(t * 4 + a);
        ctx.fillStyle = hsla(190, 100, 75, 0.95);
        ctx.shadowColor = '#38bdf8';
        ctx.shadowBlur = 10 * photophorePulse;
        ctx.beginPath();
        ctx.arc(tip.x, tip.y, 3.5 * photophorePulse * squidScale, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      // 3. Central Mantle Dome & Ear-Like Fin Flaps
      ctx.beginPath();
      ctx.ellipse(0, -35 * squidScale, 38 * squidScale, 50 * squidScale, 0, 0, Math.PI * 2);
      ctx.fillStyle = hsla(345, 80, 22, 0.95);
      ctx.fill();
      ctx.strokeStyle = hsla(355, 90, 45, 0.9);
      ctx.lineWidth = 2 * squidScale;
      ctx.stroke();

      // Mantle Fins (Paddles)
      for (let s = -1; s <= 1; s += 2) {
        const finWave = Math.sin(t * 3.5 + s) * 14 * squidScale;
        ctx.beginPath();
        ctx.moveTo(s * 25 * squidScale, -55 * squidScale);
        ctx.quadraticCurveTo(s * 75 * squidScale, -75 * squidScale + finWave, s * 45 * squidScale, -35 * squidScale);
        ctx.closePath();
        ctx.fillStyle = hsla(350, 70, 28, 0.85);
        ctx.fill();
        ctx.strokeStyle = hsla(355, 85, 50, 0.8);
        ctx.lineWidth = 1.4;
        ctx.stroke();
      }

      // 4. Large Blue/Clear Deep Sea Globular Eyes
      for (let s = -1; s <= 1; s += 2) {
        const eyeX = s * 22 * squidScale;
        const eyeY = -12 * squidScale;
        ctx.fillStyle = '#0284c7';
        ctx.beginPath();
        ctx.arc(eyeX, eyeY, 7 * squidScale, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#e0f2fe';
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // Eye Glint
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(eyeX - 2, eyeY - 2, 2, 0, Math.PI * 2);
        ctx.fill();
      }

      // 5. Two Retractile Velar Sensory Filaments (Trailing into abyss)
      for (let s = -1; s <= 1; s += 2) {
        ctx.beginPath();
        ctx.moveTo(s * 10 * squidScale, 20 * squidScale);
        const filSteps = 30;
        for (let i = 1; i <= filSteps; i++) {
          const ni = i / filSteps;
          const fw = Math.sin(t * 2 - ni * 6 + s) * (18 * ni * squidScale);
          const fx = s * (15 * squidScale) + fw;
          const fy = 20 * squidScale + ni * 180 * squidScale;
          ctx.lineTo(fx, fy);
        }
        ctx.strokeStyle = 'rgba(244, 114, 182, 0.45)';
        ctx.lineWidth = 1.1;
        ctx.stroke();
      }

      ctx.restore();
    },
  };
}
