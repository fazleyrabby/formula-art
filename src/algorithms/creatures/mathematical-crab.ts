import type { ArtRenderer, ParameterState, RenderContext, TimeState } from '../../types/engine';
import { hsla } from '../common/color';

// Anatomically Enriched Mathematical Crab (Brachyura Anatomy)
// Features: Carapace regional sulci (gastric, cardiac, branchial), anterolateral denticles,
// 5-segmented pereiopods with articulated dactylar claws, toothed chelipeds, and flicking antennules.
export function createMathematicalCrab(): ArtRenderer {
  return {
    setup() {},

    render(context: RenderContext, timeState: TimeState, params: ParameterState) {
      const { ctx, width, height } = context;
      const speed = Number(params.gaitSpeed || 1.4);
      const clawPinch = Number(params.clawPinch || 1.0);
      const t = timeState.time * speed;

      ctx.fillStyle = '#05070c';
      ctx.fillRect(0, 0, width, height);

      const cx = width * 0.5 + Math.sin(t * 0.8) * (width * 0.1);
      const cy = height * 0.52 + Math.cos(t * 1.6) * 4;
      const crabScale = Math.min(width, height) / 520;

      // 1. Eight 5-Segmented Walking Pereiopods (4 Left, 4 Right)
      for (let side = -1; side <= 1; side += 2) {
        for (let leg = 0; leg < 4; leg++) {
          const legPhase = t * 4 + leg * 0.85 + (side === 1 ? Math.PI : 0);
          
          // Segment 1: Coxa base
          const baseAngle = (side * 0.35) + (leg - 1.5) * 0.22;
          const coxaX = cx + side * (Math.cos(baseAngle) * 55 * crabScale);
          const coxaY = cy + (leg - 1.5) * (16 * crabScale);

          // Segment 2: Merus High Knee Joint (Lift & Stride)
          const kneeLift = Math.sin(legPhase) * (16 * crabScale);
          const kneeReach = Math.cos(legPhase) * (20 * crabScale);
          const merusX = coxaX + side * ((48 + leg * 6) * crabScale) + kneeReach;
          const merusY = coxaY - ((25 - leg * 4) * crabScale) + kneeLift;

          // Segment 3: Carpus Elbow
          const carpusX = merusX + side * ((28 + leg * 4) * crabScale);
          const carpusY = merusY + ((18 + leg * 3) * crabScale);

          // Segment 4: Propodus Shin
          const propodusX = carpusX + side * (18 * crabScale);
          const propodusY = carpusY + ((24 + leg * 4) * crabScale);

          // Segment 5: Dactylus Pointed Claw (Ground contact)
          const dactylX = propodusX + side * (12 * crabScale);
          const dactylY = propodusY + ((18 + leg * 3) * crabScale);

          // Draw Segmented Leg Limbs
          ctx.beginPath();
          ctx.moveTo(coxaX, coxaY);
          ctx.lineTo(merusX, merusY);
          ctx.lineTo(carpusX, carpusY);
          ctx.lineTo(propodusX, propodusY);
          ctx.lineTo(dactylX, dactylY);

          const legHue = (18 + leg * 6) % 360;
          ctx.strokeStyle = hsla(legHue, 88, 52, 0.95);
          ctx.lineWidth = (4.5 - leg * 0.5) * crabScale;
          ctx.lineCap = 'round';
          ctx.lineJoin = 'round';
          ctx.stroke();

          // Articulation Condyle Nodes
          ctx.fillStyle = hsla(legHue + 15, 95, 75, 0.95);
          ctx.beginPath();
          ctx.arc(merusX, merusY, 3.2 * crabScale, 0, Math.PI * 2);
          ctx.arc(carpusX, carpusY, 2.8 * crabScale, 0, Math.PI * 2);
          ctx.arc(propodusX, propodusY, 2.2 * crabScale, 0, Math.PI * 2);
          ctx.fill();

          // Spiny Dactylus Tip Claw
          ctx.fillStyle = '#fde047';
          ctx.beginPath();
          ctx.arc(dactylX, dactylY, 1.8 * crabScale, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // 2. Carapace (Exoskeleton Anatomy with Regional Grooves & Spines)
      ctx.save();
      ctx.translate(cx, cy);

      // Carapace base with 5 anterolateral teeth per side
      ctx.beginPath();
      const shellW = 78 * crabScale;
      const shellH = 54 * crabScale;
      const spineSteps = 80;

      for (let i = 0; i <= spineSteps; i++) {
        const a = (i / spineSteps) * Math.PI * 2;
        // Anterolateral teeth spikes along side margins
        let spine = 1.0;
        if (Math.abs(Math.cos(a)) > 0.6 && Math.sin(a) < 0.2) {
          spine = 1.0 + 0.14 * Math.abs(Math.sin(a * 10));
        }
        const px = Math.cos(a) * shellW * spine;
        const py = Math.sin(a) * shellH;
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.closePath();

      // Carapace Dorsal Gradient
      const shellGrad = ctx.createRadialGradient(0, -10, 5, 0, 0, shellW);
      shellGrad.addColorStop(0, hsla(24, 90, 55, 0.95));
      shellGrad.addColorStop(0.7, hsla(16, 85, 45, 0.95));
      shellGrad.addColorStop(1, hsla(8, 90, 32, 0.95));

      ctx.fillStyle = shellGrad;
      ctx.fill();
      ctx.strokeStyle = hsla(28, 95, 72, 0.95);
      ctx.lineWidth = 2.8 * crabScale;
      ctx.stroke();

      // Cervical & Gastrocardiac Sulci Grooves (Anatomical shell boundaries)
      // Cardiac region U-groove
      ctx.beginPath();
      ctx.arc(0, 5 * crabScale, 18 * crabScale, 0.1 * Math.PI, 0.9 * Math.PI);
      ctx.strokeStyle = hsla(10, 85, 30, 0.85);
      ctx.lineWidth = 2.2 * crabScale;
      ctx.stroke();

      // Gastric region crest
      ctx.beginPath();
      ctx.moveTo(-25 * crabScale, -15 * crabScale);
      ctx.quadraticCurveTo(0, -32 * crabScale, 25 * crabScale, -15 * crabScale);
      ctx.strokeStyle = hsla(10, 85, 30, 0.85);
      ctx.lineWidth = 2.0 * crabScale;
      ctx.stroke();

      // Branchial region lateral grooves
      for (let s = -1; s <= 1; s += 2) {
        ctx.beginPath();
        ctx.moveTo(s * 35 * crabScale, -10 * crabScale);
        ctx.quadraticCurveTo(s * 48 * crabScale, 10 * crabScale, s * 28 * crabScale, 28 * crabScale);
        ctx.strokeStyle = hsla(10, 85, 30, 0.7);
        ctx.lineWidth = 1.8 * crabScale;
        ctx.stroke();
      }

      ctx.restore();

      // 3. Stalked Compound Eyes & Flicking Antennules
      for (let s = -1; s <= 1; s += 2) {
        const eyeBaseX = cx + s * (20 * crabScale);
        const eyeBaseY = cy - (44 * crabScale);
        const eyeTipX = eyeBaseX + s * (10 * crabScale) + Math.sin(t * 2 + s) * 2;
        const eyeTipY = eyeBaseY - (16 * crabScale);

        // Eyestalk
        ctx.beginPath();
        ctx.moveTo(eyeBaseX, eyeBaseY);
        ctx.lineTo(eyeTipX, eyeTipY);
        ctx.strokeStyle = hsla(20, 80, 50, 0.95);
        ctx.lineWidth = 3.5 * crabScale;
        ctx.stroke();

        // Compound Eye Dome
        ctx.fillStyle = '#090d16';
        ctx.beginPath();
        ctx.arc(eyeTipX, eyeTipY, 4.5 * crabScale, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#38bdf8';
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // Active Olfactory Antennules (flicking in water)
        const antAngle = -Math.PI / 2 + s * 0.2 + Math.sin(t * 8 + s) * 0.25;
        const antX = cx + s * (6 * crabScale);
        const antY = cy - (48 * crabScale);
        ctx.beginPath();
        ctx.moveTo(antX, antY);
        ctx.lineTo(antX + Math.cos(antAngle) * (18 * crabScale), antY + Math.sin(antAngle) * (18 * crabScale));
        ctx.strokeStyle = 'rgba(253, 224, 71, 0.85)';
        ctx.lineWidth = 1.2;
        ctx.stroke();
      }

      // 4. Chelipeds (Massive Front Claws with Toothed Dentition)
      for (let side = -1; side <= 1; side += 2) {
        const clawBaseX = cx + side * (52 * crabScale);
        const clawBaseY = cy - (25 * crabScale);

        // Merus segment
        const merusAngle = side * 0.9 + Math.sin(t * 2 + side) * 0.15;
        const merusX = clawBaseX + side * Math.cos(merusAngle) * (45 * crabScale);
        const merusY = clawBaseY - Math.sin(merusAngle) * (38 * crabScale);

        // Carpus wrist
        const carpusX = merusX + side * (26 * crabScale);
        const carpusY = merusY - (32 * crabScale);

        ctx.beginPath();
        ctx.moveTo(clawBaseX, clawBaseY);
        ctx.lineTo(merusX, merusY);
        ctx.lineTo(carpusX, carpusY);
        ctx.strokeStyle = hsla(15, 88, 52, 0.95);
        ctx.lineWidth = 7 * crabScale;
        ctx.stroke();

        // Propodus Palm
        ctx.save();
        ctx.translate(carpusX, carpusY);
        ctx.rotate(side * 0.4 + Math.sin(t * 2.5 + side) * 0.15);

        ctx.beginPath();
        ctx.ellipse(0, 0, 26 * crabScale, 16 * crabScale, 0, 0, Math.PI * 2);
        ctx.fillStyle = hsla(14, 92, 50, 0.95);
        ctx.fill();
        ctx.strokeStyle = hsla(28, 95, 70, 0.95);
        ctx.lineWidth = 2.4 * crabScale;
        ctx.stroke();

        // Movable Finger (Dactylus) with Interlocking Teeth
        const pinchAngle = (0.32 + 0.28 * Math.sin(t * 3 + side)) * clawPinch;
        ctx.beginPath();
        ctx.moveTo(12 * crabScale, -6 * crabScale);
        ctx.quadraticCurveTo(32 * crabScale, -22 * crabScale * pinchAngle, 44 * crabScale, -2 * crabScale);
        ctx.quadraticCurveTo(28 * crabScale, -4 * crabScale, 12 * crabScale, 0);
        ctx.fillStyle = hsla(6, 95, 54, 0.95);
        ctx.fill();

        // Fixed Finger (Pollex)
        ctx.beginPath();
        ctx.moveTo(12 * crabScale, 6 * crabScale);
        ctx.quadraticCurveTo(32 * crabScale, 22 * crabScale * pinchAngle, 44 * crabScale, 2 * crabScale);
        ctx.quadraticCurveTo(28 * crabScale, 4 * crabScale, 12 * crabScale, 0);
        ctx.fillStyle = hsla(6, 95, 54, 0.95);
        ctx.fill();

        // White Molariform Crushing Denticles along inner jaws
        for (let tooth = 1; tooth <= 4; tooth++) {
          const tx = (16 + tooth * 6) * crabScale;
          ctx.fillStyle = '#ffffff';
          ctx.fillRect(tx, -2 * crabScale * pinchAngle, 2, 2);
          ctx.fillRect(tx, 2 * crabScale * pinchAngle, 2, 2);
        }

        ctx.restore();
      }
    },
  };
}
