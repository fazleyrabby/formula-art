import type { ArtRenderer, ParameterState, RenderContext, TimeState } from '../../types/engine';
import { hsla } from '../common/color';

// Anatomically Enriched Deep Sea Prawn (Dendrobranchiata / Caridea Anatomy)
// Features: Serrated rostrum spine formula, overlapping pleon epimera plates,
// biramous swimmerets (endopodite + exopodite with setae), and parabolic sensory antennae.
export function createDeepSeaPrawn(): ArtRenderer {
  return {
    setup() {},

    render(context: RenderContext, timeState: TimeState, params: ParameterState) {
      const { ctx, width, height } = context;
      const speed = Number(params.swimSpeed || 1.3);
      const antennaLength = Number(params.antennaLength || 200);
      const t = timeState.time * speed;

      ctx.fillStyle = '#04060b';
      ctx.fillRect(0, 0, width, height);

      const cx = width * 0.48 + Math.cos(t * 0.7) * (width * 0.06);
      const cy = height * 0.48 + Math.sin(t * 1.2) * (height * 0.05);
      const prawnScale = Math.min(width, height) / 500;

      // 1. Long Curved Whiplike Sensory Antennae & Antennal Scales (Scaphocerites)
      for (let side = -1; side <= 1; side += 2) {
        ctx.beginPath();
        const antRootX = cx - 35 * prawnScale;
        const antRootY = cy - 25 * prawnScale + side * 4;
        ctx.moveTo(antRootX, antRootY);

        const antSteps = 36;
        for (let i = 1; i <= antSteps; i++) {
          const normI = i / antSteps;
          const antX = antRootX - normI * antennaLength * prawnScale;
          const antWave = Math.sin(t * 3 - normI * 5 + side) * (20 * normI * prawnScale);
          const antY = antRootY - Math.pow(normI, 1.4) * (75 * prawnScale) + side * (normI * 38 * prawnScale) + antWave;
          ctx.lineTo(antX, antY);
        }

        ctx.strokeStyle = hsla(14, 95, 72, 0.85);
        ctx.lineWidth = 1.3;
        ctx.stroke();

        // Antennal Scale Plate (Scaphocerite)
        ctx.beginPath();
        ctx.moveTo(antRootX, antRootY);
        ctx.lineTo(antRootX - 35 * prawnScale, antRootY - 14 * prawnScale);
        ctx.strokeStyle = 'rgba(251, 146, 60, 0.6)';
        ctx.lineWidth = 2.0 * prawnScale;
        ctx.stroke();
      }

      // 2. Six Articulated Abdomen Somites (Pleon with Overlapping Epimera Plates)
      const SEGMENTS = 6;
      let prevSegX = cx;
      let prevSegY = cy;

      for (let s = 0; s < SEGMENTS; s++) {
        const segmentArchAngle = 0.35 + Math.sin(t * 2) * 0.15;
        const segDist = 24 * prawnScale;
        
        const segX = prevSegX + Math.cos(segmentArchAngle * s * 0.4) * segDist;
        const segY = prevSegY + Math.sin(segmentArchAngle * s * 0.4) * segDist * 0.9;

        // Draw Somite Exoskeleton & Lateral Epimeron Flap
        ctx.save();
        ctx.translate((prevSegX + segX) / 2, (prevSegY + segY) / 2);
        ctx.rotate(segmentArchAngle * s * 0.35);

        const segW = (28 - s * 2.8) * prawnScale;
        const segH = (34 - s * 3.5) * prawnScale;

        // Dorsal shell ring
        ctx.beginPath();
        ctx.ellipse(0, 0, segW, segH, 0.2, 0, Math.PI * 2);
        
        const somiteGrad = ctx.createRadialGradient(0, -segH * 0.3, 2, 0, 0, segW);
        somiteGrad.addColorStop(0, hsla(12 + s * 4, 92, 55, 0.9));
        somiteGrad.addColorStop(1, hsla(6 + s * 4, 90, 42, 0.9));

        ctx.fillStyle = somiteGrad;
        ctx.fill();
        ctx.strokeStyle = hsla(24 + s * 4, 95, 75, 0.9);
        ctx.lineWidth = 1.8;
        ctx.stroke();

        // 3. Biramous Pleopods (Two-branched Swimmerets: Endopodite & Exopodite)
        const paddlePhase = t * 6 - s * 0.8;
        const paddleAngle = Math.sin(paddlePhase) * 0.6 + 0.45;
        const padLen = 22 * prawnScale;

        // Endopodite branch
        const pad1X = Math.cos(paddleAngle) * padLen;
        const pad1Y = Math.sin(paddleAngle) * padLen;
        ctx.beginPath();
        ctx.moveTo(0, segH * 0.45);
        ctx.lineTo(pad1X, segH * 0.45 + pad1Y);
        ctx.strokeStyle = hsla(16, 95, 75, 0.85);
        ctx.lineWidth = 2.2 * prawnScale;
        ctx.stroke();

        // Exopodite branch (+ fringe setae)
        const pad2X = Math.cos(paddleAngle + 0.25) * (padLen * 0.85);
        const pad2Y = Math.sin(paddleAngle + 0.25) * (padLen * 0.85);
        ctx.beginPath();
        ctx.moveTo(0, segH * 0.45);
        ctx.lineTo(pad2X, segH * 0.45 + pad2Y);
        ctx.strokeStyle = hsla(22, 95, 70, 0.7);
        ctx.lineWidth = 1.6 * prawnScale;
        ctx.stroke();

        ctx.restore();

        prevSegX = segX;
        prevSegY = segY;
      }

      // 4. Telson Spine & Uropod Tail Fan
      ctx.save();
      ctx.translate(prevSegX, prevSegY);
      ctx.rotate(0.6 + Math.sin(t * 2) * 0.15);

      // Central Sharp Telson
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(38 * prawnScale, 0);
      ctx.strokeStyle = hsla(12, 100, 75, 0.95);
      ctx.lineWidth = 2.4 * prawnScale;
      ctx.stroke();

      // Lateral Uropod Blades
      for (let f = -2; f <= 2; f++) {
        if (f === 0) continue;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        const fanAngle = f * 0.28;
        const fanLen = 34 * prawnScale;
        ctx.lineTo(Math.cos(fanAngle) * fanLen, Math.sin(fanAngle) * fanLen);
        ctx.strokeStyle = hsla(18 + Math.abs(f) * 6, 95, 70, 0.9);
        ctx.lineWidth = 2.8 * prawnScale;
        ctx.stroke();
      }
      ctx.restore();

      // 5. Cephalothorax with Rostrum Spines & Maxillipeds
      ctx.save();
      ctx.translate(cx, cy);

      // Main head carapace
      ctx.beginPath();
      ctx.ellipse(-15 * prawnScale, -5 * prawnScale, 40 * prawnScale, 30 * prawnScale, -0.15, 0, Math.PI * 2);
      ctx.fillStyle = hsla(8, 92, 48, 0.95);
      ctx.fill();
      ctx.strokeStyle = hsla(25, 95, 72, 0.95);
      ctx.lineWidth = 2.4;
      ctx.stroke();

      // Serrated Rostrum Spine with Dorsal Teeth
      ctx.beginPath();
      ctx.moveTo(-45 * prawnScale, -14 * prawnScale);
      ctx.lineTo(-105 * prawnScale, -32 * prawnScale); // Tip
      ctx.lineTo(-45 * prawnScale, -2 * prawnScale);
      ctx.fillStyle = hsla(10, 95, 55, 0.95);
      ctx.fill();
      ctx.strokeStyle = hsla(28, 100, 78, 0.95);
      ctx.lineWidth = 2.0;
      ctx.stroke();

      // Rostrum Dorsal Teeth Spikes
      for (let tooth = 1; tooth <= 6; tooth++) {
        const normT = tooth / 7;
        const tx = (-48 - normT * 50) * prawnScale;
        const ty = (-15 - normT * 15) * prawnScale;
        ctx.beginPath();
        ctx.moveTo(tx, ty);
        ctx.lineTo(tx + 2, ty - 6 * prawnScale);
        ctx.strokeStyle = '#fef08a';
        ctx.lineWidth = 1.6;
        ctx.stroke();
      }

      // Stalked Compound Eye
      ctx.fillStyle = '#05070d';
      ctx.beginPath();
      ctx.arc(-38 * prawnScale, -18 * prawnScale, 5.5 * prawnScale, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 1.6;
      ctx.stroke();

      // 5 Pairs of Walking Pereiopods with Micro-Claws
      for (let p = 0; p < 5; p++) {
        const legAngle = -0.4 + p * 0.22 + Math.sin(t * 3 + p) * 0.15;
        const legBaseX = (-28 + p * 9) * prawnScale;
        const legBaseY = 20 * prawnScale;
        const legKneeX = legBaseX + Math.cos(legAngle) * (22 * prawnScale);
        const legKneeY = legBaseY + Math.sin(legAngle) * (26 * prawnScale);
        const legTipX = legKneeX + (14 * prawnScale);
        const legTipY = legKneeY + (22 * prawnScale);

        ctx.beginPath();
        ctx.moveTo(legBaseX, legBaseY);
        ctx.lineTo(legKneeX, legKneeY);
        ctx.lineTo(legTipX, legTipY);
        ctx.strokeStyle = hsla(18, 92, 65, 0.85);
        ctx.lineWidth = 2.0 * prawnScale;
        ctx.stroke();
      }

      ctx.restore();
    },
  };
}
