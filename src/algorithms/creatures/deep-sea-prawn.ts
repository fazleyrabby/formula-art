import type { ArtRenderer, ParameterState, RenderContext, TimeState } from '../../types/engine';
import { hsla } from '../common/color';

export function createDeepSeaPrawn(): ArtRenderer {
  return {
    setup() {},

    render(context: RenderContext, timeState: TimeState, params: ParameterState) {
      const { ctx, width, height } = context;
      const speed = Number(params.swimSpeed || 1.3);
      const antennaLength = Number(params.antennaLength || 200);
      const t = timeState.time * speed;

      ctx.fillStyle = 'rgba(6, 7, 12, 0.22)';
      ctx.fillRect(0, 0, width, height);

      // Swimming center with graceful hovering motion
      const cx = width * 0.48 + Math.cos(t * 0.7) * (width * 0.06);
      const cy = height * 0.48 + Math.sin(t * 1.2) * (height * 0.05);
      const prawnScale = Math.min(width, height) / 500;

      // 1. Long Curved Sensory Antennae
      for (let side = -1; side <= 1; side += 2) {
        ctx.beginPath();
        const antRootX = cx - 35 * prawnScale;
        const antRootY = cy - 25 * prawnScale + side * 4;
        ctx.moveTo(antRootX, antRootY);

        const antSteps = 30;
        for (let i = 1; i <= antSteps; i++) {
          const normI = i / antSteps;
          const antX = antRootX - normI * antennaLength * prawnScale;
          // Undulating wave traveling down the antenna
          const antWave = Math.sin(t * 3 - normI * 5 + side) * (18 * normI * prawnScale);
          const antY = antRootY - Math.pow(normI, 1.4) * (70 * prawnScale) + side * (normI * 35 * prawnScale) + antWave;
          ctx.lineTo(antX, antY);
        }

        ctx.strokeStyle = hsla(12, 95, 70, 0.75);
        ctx.lineWidth = 1.2;
        ctx.stroke();
      }

      // 2. Six Segmented Abdomen Somites (Arching Body)
      const SEGMENTS = 6;
      let prevSegX = cx;
      let prevSegY = cy;

      for (let s = 0; s < SEGMENTS; s++) {
        const segmentArchAngle = 0.35 + Math.sin(t * 2) * 0.15;
        const segDist = 24 * prawnScale;
        
        const segX = prevSegX + Math.cos(segmentArchAngle * s * 0.4) * segDist;
        const segY = prevSegY + Math.sin(segmentArchAngle * s * 0.4) * segDist * 0.9;

        // Draw exoskeleton segment shell
        ctx.save();
        ctx.translate((prevSegX + segX) / 2, (prevSegY + segY) / 2);
        ctx.rotate(segmentArchAngle * s * 0.35);

        const segW = (26 - s * 2.8) * prawnScale;
        const segH = (32 - s * 3.5) * prawnScale;

        ctx.beginPath();
        ctx.ellipse(0, 0, segW, segH, 0.2, 0, Math.PI * 2);
        ctx.fillStyle = hsla(8 + s * 4, 90, 52, 0.85);
        ctx.fill();
        ctx.strokeStyle = hsla(24 + s * 4, 95, 72, 0.9);
        ctx.lineWidth = 1.6;
        ctx.stroke();

        // Rhythmic Pleopod Swimmerets (Swimming Paddles under abdomen)
        const paddlePhase = t * 6 - s * 0.8;
        const paddleAngle = Math.sin(paddlePhase) * 0.6 + 0.4;
        const padX = Math.cos(paddleAngle) * (20 * prawnScale);
        const padY = Math.sin(paddleAngle) * (20 * prawnScale);

        ctx.beginPath();
        ctx.moveTo(0, segH * 0.5);
        ctx.lineTo(padX, segH * 0.5 + padY);
        ctx.strokeStyle = hsla(15, 95, 75, 0.8);
        ctx.lineWidth = 2 * prawnScale;
        ctx.stroke();

        ctx.restore();

        prevSegX = segX;
        prevSegY = segY;
      }

      // 3. Telson & Uropod Tail Fan (End of abdomen)
      ctx.save();
      ctx.translate(prevSegX, prevSegY);
      ctx.rotate(0.6 + Math.sin(t * 2) * 0.15);

      for (let f = -2; f <= 2; f++) {
        ctx.beginPath();
        ctx.moveTo(0, 0);
        const fanAngle = f * 0.25;
        const fanLen = 32 * prawnScale;
        ctx.lineTo(Math.cos(fanAngle) * fanLen, Math.sin(fanAngle) * fanLen);
        ctx.strokeStyle = hsla(18 + Math.abs(f) * 6, 95, 68, 0.9);
        ctx.lineWidth = 3 * prawnScale;
        ctx.stroke();
      }
      ctx.restore();

      // 4. Cephalothorax (Head Shell & Rostrum Spine)
      ctx.save();
      ctx.translate(cx, cy);

      // Main head carapace
      ctx.beginPath();
      ctx.ellipse(-15 * prawnScale, -5 * prawnScale, 38 * prawnScale, 28 * prawnScale, -0.15, 0, Math.PI * 2);
      ctx.fillStyle = hsla(6, 92, 48, 0.95);
      ctx.fill();
      ctx.strokeStyle = hsla(25, 95, 70, 0.95);
      ctx.lineWidth = 2.2;
      ctx.stroke();

      // Serrated Rostrum Spine (Front forward beak)
      ctx.beginPath();
      ctx.moveTo(-45 * prawnScale, -12 * prawnScale);
      ctx.lineTo(-95 * prawnScale, -28 * prawnScale);
      ctx.lineTo(-45 * prawnScale, -2 * prawnScale);
      ctx.fillStyle = hsla(8, 95, 55, 0.95);
      ctx.fill();
      ctx.strokeStyle = hsla(28, 100, 75, 0.95);
      ctx.lineWidth = 1.8;
      ctx.stroke();

      // Eye
      ctx.fillStyle = '#050608';
      ctx.beginPath();
      ctx.arc(-36 * prawnScale, -16 * prawnScale, 5 * prawnScale, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Walking Pereiopods (Legs)
      for (let p = 0; p < 4; p++) {
        const legAngle = -0.4 + p * 0.25 + Math.sin(t * 3 + p) * 0.15;
        const legBaseX = (-25 + p * 10) * prawnScale;
        const legBaseY = 18 * prawnScale;
        const legKneeX = legBaseX + Math.cos(legAngle) * (20 * prawnScale);
        const legKneeY = legBaseY + Math.sin(legAngle) * (25 * prawnScale);
        const legTipX = legKneeX + (12 * prawnScale);
        const legTipY = legKneeY + (20 * prawnScale);

        ctx.beginPath();
        ctx.moveTo(legBaseX, legBaseY);
        ctx.lineTo(legKneeX, legKneeY);
        ctx.lineTo(legTipX, legTipY);
        ctx.strokeStyle = hsla(18, 90, 65, 0.8);
        ctx.lineWidth = 1.8;
        ctx.stroke();
      }

      ctx.restore();
    },
  };
}
