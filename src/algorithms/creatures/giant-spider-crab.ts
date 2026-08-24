import type { ArtRenderer, ParameterState, RenderContext, TimeState } from '../../types/engine';
import { hsla } from '../common/color';

// Macrocheira Kaempferi (Japanese Giant Spider Crab) Multi-Joint Linkage Stride
export function createGiantSpiderCrab(): ArtRenderer {
  return {
    setup() {},

    render(context: RenderContext, timeState: TimeState, params: ParameterState) {
      const { ctx, width, height } = context;
      const crawlSpeed = Number(params.gaitSpeed || 1.1);
      const legSpread = Number(params.legReach || 1.2);
      const t = timeState.time * crawlSpeed;

      ctx.fillStyle = '#030508';
      ctx.fillRect(0, 0, width, height);

      const cx = width * 0.5;
      const cy = height * 0.52 + Math.sin(t * 1.2) * 4;
      const crabScale = Math.min(width, height) / 520;

      // 1. Eight Hyper-Elongated Multi-Joint Walking Legs (4 Left, 4 Right)
      for (let side = -1; side <= 1; side += 2) {
        for (let leg = 0; leg < 4; leg++) {
          const legPhase = t * 3 + leg * 0.9 + (side === 1 ? Math.PI : 0);
          
          // Joint 1: Coxa base on small carapace
          const baseAngle = (side * 0.4) + (leg - 1.5) * 0.28;
          const coxaX = cx + side * (Math.cos(baseAngle) * 32 * crabScale);
          const coxaY = cy + (leg - 1.5) * (14 * crabScale);

          // Joint 2: High Merus Knee Arch
          const kneeLift = Math.sin(legPhase) * (18 * crabScale);
          const kneeX = coxaX + side * ((75 + leg * 12) * legSpread * crabScale);
          const kneeY = coxaY - ((80 - leg * 10) * legSpread * crabScale) + kneeLift;

          // Joint 3: Carpus Elbow
          const elbowX = kneeX + side * ((65 + leg * 14) * legSpread * crabScale);
          const elbowY = coxaY + ((25 + leg * 12) * legSpread * crabScale);

          // Joint 4: Dactyl Ground Tip
          const groundReach = Math.cos(legPhase) * (18 * crabScale);
          const tipX = elbowX + side * (35 * legSpread * crabScale) + groundReach;
          const tipY = cy + ((110 + leg * 18) * legSpread * crabScale);

          ctx.beginPath();
          ctx.moveTo(coxaX, coxaY);
          ctx.lineTo(kneeX, kneeY);
          ctx.lineTo(elbowX, elbowY);
          ctx.lineTo(tipX, tipY);

          const legHue = (18 + leg * 6) % 360;
          ctx.strokeStyle = hsla(legHue, 90, 52, 0.9);
          ctx.lineWidth = Math.max(1.5, 3.2 * crabScale);
          ctx.stroke();

          // Joint Node Nodes
          ctx.fillStyle = hsla(legHue + 15, 95, 75, 0.95);
          ctx.beginPath();
          ctx.arc(kneeX, kneeY, 3.2 * crabScale, 0, Math.PI * 2);
          ctx.arc(elbowX, elbowY, 2.6 * crabScale, 0, Math.PI * 2);
          ctx.arc(tipX, tipY, 2.0 * crabScale, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // 2. Compact Spiny Carapace (Central Pear-Shaped Body)
      ctx.save();
      ctx.translate(cx, cy);

      ctx.beginPath();
      const shellW = 38 * crabScale;
      const shellH = 46 * crabScale;
      ctx.ellipse(0, 0, shellW, shellH, 0, 0, Math.PI * 2);
      ctx.fillStyle = hsla(12, 92, 42, 0.95);
      ctx.fill();
      ctx.strokeStyle = hsla(24, 95, 68, 0.95);
      ctx.lineWidth = 2.4 * crabScale;
      ctx.stroke();

      // Carapace Nodules & Spines
      for (let s = 0; s < 12; s++) {
        const sa = (s / 12) * Math.PI * 2;
        const sr = 24 * crabScale;
        ctx.fillStyle = hsla(28, 95, 72, 0.9);
        ctx.beginPath();
        ctx.arc(Math.cos(sa) * sr, Math.sin(sa) * sr, 2.2 * crabScale, 0, Math.PI * 2);
        ctx.fill();
      }

      // 3. Two Long Articulated Chelipeds (Claws)
      for (let side = -1; side <= 1; side += 2) {
        const armBaseX = side * 18 * crabScale;
        const armBaseY = -35 * crabScale;

        const clawReach = 70 * legSpread * crabScale;
        const elbowAngle = -Math.PI / 2 + side * 0.35 + Math.sin(t * 2 + side) * 0.15;
        const armElbowX = armBaseX + Math.cos(elbowAngle) * clawReach;
        const armElbowY = armBaseY + Math.sin(elbowAngle) * clawReach;

        const clawTipX = armElbowX + side * (35 * crabScale);
        const clawTipY = armElbowY - (40 * crabScale);

        ctx.beginPath();
        ctx.moveTo(armBaseX, armBaseY);
        ctx.lineTo(armElbowX, armElbowY);
        ctx.lineTo(clawTipX, clawTipY);
        ctx.strokeStyle = hsla(8, 95, 55, 0.95);
        ctx.lineWidth = 3.6 * crabScale;
        ctx.stroke();

        // Chela Pincer
        ctx.fillStyle = hsla(4, 100, 65, 0.95);
        ctx.beginPath();
        ctx.arc(clawTipX, clawTipY, 4 * crabScale, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();
    },
  };
}
