import type { ArtRenderer, ParameterState, RenderContext, TimeState } from '../../types/engine';
import { hsla } from '../common/color';
import { project3D } from '../common/projection3d';

// Full 3D Volumetric Mathematical Crab (Brachyura 3D Kinematics)
// Features: 3D perspective seafloor, 3D 5-segmented pereiopod walking kinematics,
// 3D carapace dome mesh with regional sulci, and 3D toothed chelipeds reaching out.
export function createMathematicalCrab(): ArtRenderer {
  return {
    setup() {},

    render(context: RenderContext, timeState: TimeState, params: ParameterState) {
      const { ctx, width, height } = context;
      const speed = Number(params.gaitSpeed || 1.4);
      const clawPinch = Number(params.clawPinch || 1.0);
      const t = timeState.time * speed;

      ctx.fillStyle = '#020409';
      ctx.fillRect(0, 0, width, height);

      const cx = width * 0.5;
      const cy = height * 0.52;
      const crabScale = Math.min(width, height) / 520;

      // Dynamic 3D Camera Angles (Looking down at crab on the seafloor)
      const rotY = Math.sin(t * 0.5) * 0.25; // Yaw
      const rotX = 0.55 + Math.sin(t * 0.7) * 0.12; // Pitch
      const rotZ = Math.sin(t * 0.5) * 0.08; // Roll

      ctx.save();
      ctx.globalCompositeOperation = 'screen';

      const baseHue = (20 + Math.sin(t * 0.6) * 15) % 360;

      // 1. 3D Perspective Seafloor Grid Lines
      ctx.beginPath();
      for (let gx = -300; gx <= 300; gx += 60) {
        const p1 = project3D(gx * crabScale, 110 * crabScale, -300 * crabScale, rotX, rotY, rotZ, cx, cy, 450, 520);
        const p2 = project3D(gx * crabScale, 110 * crabScale, 300 * crabScale, rotX, rotY, rotZ, cx, cy, 450, 520);
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
      }
      for (let gz = -300; gz <= 300; gz += 60) {
        const p1 = project3D(-300 * crabScale, 110 * crabScale, gz * crabScale, rotX, rotY, rotZ, cx, cy, 450, 520);
        const p2 = project3D(300 * crabScale, 110 * crabScale, gz * crabScale, rotX, rotY, rotZ, cx, cy, 450, 520);
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
      }
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.12)';
      ctx.lineWidth = 1.0;
      ctx.stroke();

      // 2. Eight 3D 5-Segmented Walking Legs
      for (let side = -1; side <= 1; side += 2) {
        for (let leg = 0; leg < 4; leg++) {
          const legPhase = t * 4 + leg * 0.85 + (side === 1 ? Math.PI : 0);

          // Joint 1: Coxa base on 3D carapace
          const baseAngle = (side * 0.35) + (leg - 1.5) * 0.25;
          const coxaX = side * (Math.cos(baseAngle) * 55 * crabScale);
          const coxaY = 0;
          const coxaZ = (leg - 1.5) * (26 * crabScale);

          // Joint 2: Merus High Knee Joint (Lifted in 3D Y-axis)
          const kneeLift = Math.sin(legPhase) * (22 * crabScale);
          const kneeReach = Math.cos(legPhase) * (26 * crabScale);
          const merusX = coxaX + side * ((52 + leg * 6) * crabScale) + kneeReach;
          const merusY = coxaY - ((38 - leg * 4) * crabScale) + kneeLift;
          const merusZ = coxaZ + (leg - 1.5) * (14 * crabScale);

          // Joint 3: Carpus Elbow
          const carpusX = merusX + side * ((32 + leg * 4) * crabScale);
          const carpusY = merusY + ((22 + leg * 3) * crabScale);
          const carpusZ = merusZ + 10 * crabScale;

          // Joint 4 & 5: Dactylus Tip (Ground Contact at Y = 110)
          const dactylX = carpusX + side * (24 * crabScale);
          const dactylY = 110 * crabScale;
          const dactylZ = carpusZ + 15 * crabScale;

          const p1 = project3D(coxaX, coxaY, coxaZ, rotX, rotY, rotZ, cx, cy, 450, 520);
          const p2 = project3D(merusX, merusY, merusZ, rotX, rotY, rotZ, cx, cy, 450, 520);
          const p3 = project3D(carpusX, carpusY, carpusZ, rotX, rotY, rotZ, cx, cy, 450, 520);
          const p4 = project3D(dactylX, dactylY, dactylZ, rotX, rotY, rotZ, cx, cy, 450, 520);

          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.lineTo(p3.x, p3.y);
          ctx.lineTo(p4.x, p4.y);

          const legHue = (baseHue + leg * 8) % 360;
          ctx.strokeStyle = hsla(legHue, 90, 65, 0.75 * p2.depth);
          ctx.lineWidth = Math.max(0.8, 2.8 * p2.depth);
          ctx.stroke();

          // 3D Condyle Nodes
          ctx.fillStyle = hsla(legHue + 20, 95, 80, 0.95);
          ctx.beginPath();
          ctx.arc(p2.x, p2.y, 3.2 * p2.depth, 0, Math.PI * 2);
          ctx.arc(p3.x, p3.y, 2.6 * p3.depth, 0, Math.PI * 2);
          ctx.arc(p4.x, p4.y, 2.0 * p4.depth, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // 3. 3D Carapace Dome Rings (Volumetric Shell Contour Rings)
      for (let ring = 1; ring <= 10; ring++) {
        const normR = ring / 10;
        const curW = 75 * normR * crabScale;
        const curZ = 52 * normR * crabScale;
        const curY = -Math.sin(normR * Math.PI * 0.5) * (24 * crabScale); // Dome elevation

        ctx.beginPath();
        const steps = 40;
        let avgDepth = 0;

        for (let i = 0; i <= steps; i++) {
          const theta = (i / steps) * Math.PI * 2;
          const rx = Math.cos(theta) * curW;
          const rz = Math.sin(theta) * curZ;

          const p = project3D(rx, curY, rz, rotX, rotY, rotZ, cx, cy, 450, 520);
          avgDepth += p.depth;

          if (i === 0) ctx.moveTo(p.x, p.y);
          else ctx.lineTo(p.x, p.y);
        }

        avgDepth /= (steps + 1);

        ctx.strokeStyle = hsla(baseHue, 95, 68, (0.08 + normR * 0.3) * avgDepth);
        ctx.lineWidth = Math.max(0.8, (ring === 10 ? 2.2 : 1.0) * avgDepth);
        ctx.stroke();
      }

      // 4. Two 3D Chelipeds (Claws reaching forward in 3D space)
      for (let side = -1; side <= 1; side += 2) {
        const armBaseX = side * 50 * crabScale;
        const armBaseY = -5 * crabScale;
        const armBaseZ = -35 * crabScale;

        const merusX = armBaseX + side * (42 * crabScale);
        const merusY = armBaseY - (30 * crabScale);
        const merusZ = armBaseZ - (45 * crabScale); // Reaching forward

        const clawX = merusX + side * (25 * crabScale);
        const clawY = merusY - (10 * crabScale);
        const clawZ = merusZ - (35 * crabScale);

        const pBase = project3D(armBaseX, armBaseY, armBaseZ, rotX, rotY, rotZ, cx, cy, 450, 520);
        const pMerus = project3D(merusX, merusY, merusZ, rotX, rotY, rotZ, cx, cy, 450, 520);
        const pClaw = project3D(clawX, clawY, clawZ, rotX, rotY, rotZ, cx, cy, 450, 520);

        ctx.beginPath();
        ctx.moveTo(pBase.x, pBase.y);
        ctx.lineTo(pMerus.x, pMerus.y);
        ctx.lineTo(pClaw.x, pClaw.y);
        ctx.strokeStyle = hsla(baseHue - 10, 95, 70, 0.85 * pClaw.depth);
        ctx.lineWidth = Math.max(1.2, 4.5 * pClaw.depth);
        ctx.stroke();

        // 3D Chela Palm & Movable Fingers
        const pinch = (0.35 + 0.25 * Math.sin(t * 3 + side)) * clawPinch;
        const pDactylTip = project3D(clawX + side * 15 * crabScale, clawY - 18 * pinch * crabScale, clawZ - 25 * crabScale, rotX, rotY, rotZ, cx, cy, 450, 520);
        const pPollexTip = project3D(clawX + side * 15 * crabScale, clawY + 18 * pinch * crabScale, clawZ - 25 * crabScale, rotX, rotY, rotZ, cx, cy, 450, 520);

        ctx.beginPath();
        ctx.moveTo(pClaw.x, pClaw.y);
        ctx.lineTo(pDactylTip.x, pDactylTip.y);
        ctx.moveTo(pClaw.x, pClaw.y);
        ctx.lineTo(pPollexTip.x, pPollexTip.y);
        ctx.strokeStyle = hsla(baseHue - 15, 100, 75, 0.95);
        ctx.lineWidth = Math.max(1.0, 3.2 * pClaw.depth);
        ctx.stroke();
      }

      ctx.restore();
    },
  };
}
