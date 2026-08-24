import type { ArtRenderer, ParameterState, RenderContext, TimeState } from '../../types/engine';
import { hsla } from '../common/color';

// Ultra-Detailed Anatomical Japanese Giant Spider Crab (Macrocheira Kaempferi)
// Features: 8 hyper-elongated 5-segmented Chebyshev linkage walking legs,
// 20 volumetric carapace contour rings with tuberculate spines, and articulated toothed chelipeds.
export function createGiantSpiderCrab(): ArtRenderer {
  const SHELL_RINGS = 20;

  return {
    setup() {},

    render(context: RenderContext, timeState: TimeState, params: ParameterState) {
      const { ctx, width, height } = context;
      const crawlSpeed = Number(params.gaitSpeed || 1.1);
      const legSpread = Number(params.legReach || 1.2);
      const t = timeState.time * crawlSpeed;

      ctx.fillStyle = '#020306';
      ctx.fillRect(0, 0, width, height);

      const cx = width * 0.5;
      const cy = height * 0.52 + Math.sin(t * 1.2) * 4;
      const crabScale = Math.min(width, height) / 520;

      ctx.save();
      ctx.globalCompositeOperation = 'screen';

      const baseHue = (18 + Math.sin(t * 0.5) * 15) % 360;

      // 1. 3D Perspective Seafloor Grid
      const seafloorY = cy + 130 * crabScale;
      ctx.beginPath();
      ctx.moveTo(0, seafloorY);
      ctx.lineTo(width, seafloorY);
      ctx.strokeStyle = 'rgba(249, 115, 22, 0.25)';
      ctx.lineWidth = 1.6;
      ctx.stroke();

      // 2. Eight Hyper-Elongated 5-Segmented Chebyshev Walking Legs
      for (let side = -1; side <= 1; side += 2) {
        for (let leg = 0; leg < 4; leg++) {
          const legPhase = t * 3.2 + leg * 0.9 + (side === 1 ? Math.PI : 0);

          // Joint 1: Coxa Base on Carapace
          const coxaX = cx + side * (35 * crabScale);
          const coxaY = cy + (leg - 1.5) * (14 * crabScale);

          // Joint 2: High Merus Knee Arch (Lift & Stride)
          const kneeLift = Math.sin(legPhase) * (24 * crabScale);
          const kneeX = coxaX + side * ((80 + leg * 14) * legSpread * crabScale);
          const kneeY = coxaY - ((88 - leg * 12) * legSpread * crabScale) + kneeLift;

          // Joint 3: Carpus Elbow
          const elbowX = kneeX + side * ((68 + leg * 14) * legSpread * crabScale);
          const elbowY = coxaY + ((28 + leg * 14) * legSpread * crabScale);

          // Joint 4: Propodus
          const propX = elbowX + side * (32 * legSpread * crabScale);
          const propY = elbowY + (45 * crabScale);

          // Joint 5: Dactylus Ground Tip (Contacting Seafloor)
          const groundReach = Math.cos(legPhase) * (20 * crabScale);
          const tipX = propX + side * (18 * legSpread * crabScale) + groundReach;
          const tipY = seafloorY;

          // Render multi-strand leg segments for volumetric thickness
          for (let str = -1; str <= 1; str++) {
            ctx.beginPath();
            ctx.moveTo(coxaX, coxaY);
            ctx.lineTo(kneeX + str * 2, kneeY);
            ctx.lineTo(elbowX + str * 2, elbowY);
            ctx.lineTo(propX, propY);
            ctx.lineTo(tipX, tipY);

            const legHue = (baseHue + leg * 8) % 360;
            ctx.strokeStyle = hsla(legHue, 95, 65, str === 0 ? 0.85 : 0.4);
            ctx.lineWidth = str === 0 ? 2.8 * crabScale : 1.2;
            ctx.stroke();
          }

          // Articulation Condyle Nodes
          ctx.fillStyle = '#fde047';
          ctx.beginPath();
          ctx.arc(kneeX, kneeY, 3.8 * crabScale, 0, Math.PI * 2);
          ctx.arc(elbowX, elbowY, 3.2 * crabScale, 0, Math.PI * 2);
          ctx.arc(propX, propY, 2.6 * crabScale, 0, Math.PI * 2);
          ctx.arc(tipX, tipY, 2.0 * crabScale, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // 3. Volumetric Spiny Carapace Dome (20 Concentric Pear-Shaped Shell Rings)
      for (let r = 1; r <= SHELL_RINGS; r++) {
        const normR = r / SHELL_RINGS;
        const curW = 42 * normR * crabScale;
        const curH = 52 * normR * crabScale;

        ctx.beginPath();
        const steps = 48;
        for (let i = 0; i <= steps; i++) {
          const phi = (i / steps) * Math.PI * 2;
          const spine = (Math.sin(phi * 8) > 0.6) ? 1.08 : 1.0;
          const px = cx + Math.cos(phi) * curW * spine;
          const py = cy + Math.sin(phi) * curH * spine;
          if (i === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        ctx.closePath();

        const sHue = (baseHue + normR * 20) % 360;
        ctx.strokeStyle = hsla(sHue, 95, 65, (0.08 + normR * 0.35));
        ctx.lineWidth = r === SHELL_RINGS ? 2.4 * crabScale : 1.0;
        ctx.stroke();

        if (r % 4 === 0) {
          ctx.fillStyle = hsla(sHue, 90, 50, 0.05);
          ctx.fill();
        }
      }

      // 4. Two Long Articulated Chelipeds (Forward-Reaching Claws)
      for (let side = -1; side <= 1; side += 2) {
        const armBaseX = cx + side * (20 * crabScale);
        const armBaseY = cy - (38 * crabScale);

        const clawReach = 78 * legSpread * crabScale;
        const elbowAngle = -Math.PI / 2 + side * 0.35 + Math.sin(t * 2 + side) * 0.18;
        const armElbowX = armBaseX + Math.cos(elbowAngle) * clawReach;
        const armElbowY = armBaseY + Math.sin(elbowAngle) * clawReach;

        const clawTipX = armElbowX + side * (38 * crabScale);
        const clawTipY = armElbowY - (45 * crabScale);

        ctx.beginPath();
        ctx.moveTo(armBaseX, armBaseY);
        ctx.lineTo(armElbowX, armElbowY);
        ctx.lineTo(clawTipX, clawTipY);
        ctx.strokeStyle = hsla(baseHue - 10, 100, 70, 0.9);
        ctx.lineWidth = 4.2 * crabScale;
        ctx.stroke();

        // Chela Pincer
        ctx.fillStyle = '#f87171';
        ctx.beginPath();
        ctx.arc(clawTipX, clawTipY, 5.0 * crabScale, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();
    },
  };
}
