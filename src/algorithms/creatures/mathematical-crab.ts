import type { ArtRenderer, ParameterState, RenderContext, TimeState } from '../../types/engine';
import { hsla } from '../common/color';

export function createMathematicalCrab(): ArtRenderer {
  return {
    setup() {},

    render(context: RenderContext, timeState: TimeState, params: ParameterState) {
      const { ctx, width, height } = context;
      const speed = Number(params.gaitSpeed || 1.4);
      const clawPinch = Number(params.clawPinch || 1.0);
      const t = timeState.time * speed;

      ctx.fillStyle = 'rgba(8, 9, 13, 0.2)';
      ctx.fillRect(0, 0, width, height);

      // Crab crawling sideways in sand coordinate space
      const cx = width * 0.5 + Math.sin(t * 0.8) * (width * 0.12);
      const cy = height * 0.52 + Math.cos(t * 1.6) * 4;
      const crabScale = Math.min(width, height) / 520;

      // 1. Eight Walking Legs (4 Left, 4 Right)
      for (let side = -1; side <= 1; side += 2) {
        for (let leg = 0; leg < 4; leg++) {
          const legPhase = t * 4 + leg * 0.8 + (side === 1 ? Math.PI : 0);
          
          // Joint 1: Coxa base on carapace
          const baseAngle = (side * 0.35) + (leg - 1.5) * 0.22;
          const coxaX = cx + side * (Math.cos(baseAngle) * 55 * crabScale);
          const coxaY = cy + (leg - 1.5) * (18 * crabScale);

          // Joint 2: Femur / Knee (Lift & Swing gait)
          const kneeLift = Math.sin(legPhase) * (14 * crabScale);
          const kneeReach = Math.cos(legPhase) * (22 * crabScale);
          const kneeX = coxaX + side * ((45 + leg * 6) * crabScale) + kneeReach;
          const kneeY = coxaY - ((20 - leg * 4) * crabScale) + kneeLift;

          // Joint 3: Dactyl (Tip touching ground)
          const tipX = kneeX + side * ((40 + leg * 8) * crabScale);
          const tipY = coxaY + ((45 + leg * 6) * crabScale);

          ctx.beginPath();
          ctx.moveTo(coxaX, coxaY);
          ctx.lineTo(kneeX, kneeY);
          ctx.lineTo(tipX, tipY);

          const legHue = (15 + leg * 8 + (side === 1 ? 10 : 0)) % 360;
          ctx.strokeStyle = hsla(legHue, 85, 55, 0.85);
          ctx.lineWidth = 3.5 * crabScale;
          ctx.lineCap = 'round';
          ctx.lineJoin = 'round';
          ctx.stroke();

          // Joint node circles
          ctx.fillStyle = hsla(legHue, 95, 75, 0.9);
          ctx.beginPath();
          ctx.arc(kneeX, kneeY, 2.8 * crabScale, 0, Math.PI * 2);
          ctx.arc(tipX, tipY, 2.0 * crabScale, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // 2. Carapace (Hard Exoskeleton Shell)
      ctx.save();
      ctx.translate(cx, cy);

      // Carapace base ellipse with side spine flares
      ctx.beginPath();
      const shellW = 75 * crabScale;
      const shellH = 50 * crabScale;

      for (let i = 0; i <= 60; i++) {
        const a = (i / 60) * Math.PI * 2;
        const spine = Math.abs(Math.cos(a)) > 0.7 ? 1 + 0.15 * Math.abs(Math.sin(a * 6)) : 1;
        const px = Math.cos(a) * shellW * spine;
        const py = Math.sin(a) * shellH;
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.closePath();

      ctx.fillStyle = hsla(18, 90, 48, 0.9);
      ctx.fill();
      ctx.strokeStyle = hsla(28, 95, 68, 0.9);
      ctx.lineWidth = 2.5 * crabScale;
      ctx.stroke();

      // Carapace dorsal groove ridges
      ctx.beginPath();
      ctx.arc(0, -5 * crabScale, 24 * crabScale, 0.2 * Math.PI, 0.8 * Math.PI);
      ctx.strokeStyle = hsla(10, 85, 35, 0.7);
      ctx.lineWidth = 2 * crabScale;
      ctx.stroke();
      ctx.restore();

      // 3. Eyestalks & Eyes (Top)
      for (let s = -1; s <= 1; s += 2) {
        const eyeBaseX = cx + s * (22 * crabScale);
        const eyeBaseY = cy - (42 * crabScale);
        const eyeTipX = eyeBaseX + s * (8 * crabScale) + Math.sin(t * 2 + s) * 2;
        const eyeTipY = eyeBaseY - (14 * crabScale);

        ctx.beginPath();
        ctx.moveTo(eyeBaseX, eyeBaseY);
        ctx.lineTo(eyeTipX, eyeTipY);
        ctx.strokeStyle = hsla(20, 80, 50, 0.9);
        ctx.lineWidth = 3 * crabScale;
        ctx.stroke();

        // Eye bead
        ctx.fillStyle = '#050608';
        ctx.beginPath();
        ctx.arc(eyeTipX, eyeTipY, 4 * crabScale, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#38bdf8';
        ctx.lineWidth = 1.2;
        ctx.stroke();
      }

      // 4. Chelipeds (Massive Front Claws)
      for (let side = -1; side <= 1; side += 2) {
        const clawBaseX = cx + side * (50 * crabScale);
        const clawBaseY = cy - (25 * crabScale);

        // Arm segment 1 (merus)
        const merusAngle = side * 0.9 + Math.sin(t * 2 + side) * 0.2;
        const merusX = clawBaseX + side * Math.cos(merusAngle) * (45 * crabScale);
        const merusY = clawBaseY - Math.sin(merusAngle) * (35 * crabScale);

        // Arm segment 2 (carpus)
        const carpusX = merusX + side * (25 * crabScale);
        const carpusY = merusY - (30 * crabScale);

        ctx.beginPath();
        ctx.moveTo(clawBaseX, clawBaseY);
        ctx.lineTo(merusX, merusY);
        ctx.lineTo(carpusX, carpusY);
        ctx.strokeStyle = hsla(15, 85, 55, 0.95);
        ctx.lineWidth = 6 * crabScale;
        ctx.stroke();

        // Claw Palm (propodus)
        ctx.save();
        ctx.translate(carpusX, carpusY);
        ctx.rotate(side * 0.4 + Math.sin(t * 2.5 + side) * 0.15);

        ctx.beginPath();
        ctx.ellipse(0, 0, 22 * crabScale, 14 * crabScale, 0, 0, Math.PI * 2);
        ctx.fillStyle = hsla(12, 90, 52, 0.95);
        ctx.fill();
        ctx.strokeStyle = hsla(28, 95, 70, 0.9);
        ctx.lineWidth = 2;
        ctx.stroke();

        // Movable Finger (Dactylus)
        const pinchAngle = (0.35 + 0.3 * Math.sin(t * 3 + side)) * clawPinch;
        ctx.beginPath();
        ctx.moveTo(10 * crabScale, -6 * crabScale);
        ctx.quadraticCurveTo(28 * crabScale, -18 * crabScale * pinchAngle, 38 * crabScale, -2 * crabScale);
        ctx.quadraticCurveTo(24 * crabScale, -4 * crabScale, 10 * crabScale, 0);
        ctx.fillStyle = hsla(5, 95, 55, 0.95);
        ctx.fill();

        // Fixed Finger (Pollex)
        ctx.beginPath();
        ctx.moveTo(10 * crabScale, 6 * crabScale);
        ctx.quadraticCurveTo(28 * crabScale, 18 * crabScale * pinchAngle, 38 * crabScale, 2 * crabScale);
        ctx.quadraticCurveTo(24 * crabScale, 4 * crabScale, 10 * crabScale, 0);
        ctx.fillStyle = hsla(5, 95, 55, 0.95);
        ctx.fill();

        ctx.restore();
      }
    },
  };
}
