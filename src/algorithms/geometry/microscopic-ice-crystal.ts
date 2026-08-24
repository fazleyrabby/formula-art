import type { ArtRenderer, ParameterState, RenderContext, TimeState } from '../../types/engine';
import { hsla } from '../common/color';

// Microscopic Snowflake Freezing & Stefan Phase Change Dendritic Crystal Growth
export function createMicroscopicIceCrystal(): ArtRenderer {
  return {
    setup() {},

    render(context: RenderContext, timeState: TimeState, params: ParameterState) {
      const { ctx, width, height } = context;
      const freezeSpeed = Number(params.freezeRate || 0.6);
      const complexity = Number(params.dendriteBranches || 5);
      const t = timeState.time * freezeSpeed;

      ctx.fillStyle = '#03050a';
      ctx.fillRect(0, 0, width, height);

      const cx = width * 0.5;
      const cy = height * 0.5;
      const crystalRadius = Math.min(width, height) * 0.42;

      // Freezing growth cycle (0 to 1 with blooming thaw loop)
      const growthCycle = (t * 0.4) % 1.0;
      const growth = Math.sin(growthCycle * Math.PI);

      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(t * 0.1);

      // 1. Six Primary Basal Hexagonal Arms (60-degree symmetry)
      for (let a = 0; a < 6; a++) {
        const armAngle = (a / 6) * Math.PI * 2;
        const mainArmLen = crystalRadius * (0.3 + 0.7 * growth);

        ctx.save();
        ctx.rotate(armAngle);

        // Main primary crystalline spine
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(mainArmLen, 0);
        ctx.strokeStyle = hsla(195, 95, 80, 0.9);
        ctx.lineWidth = 2.4;
        ctx.stroke();

        // 2. Secondary 60-degree Dendritic Side-Branch Prongs
        for (let b = 1; b <= complexity; b++) {
          const branchPos = (b / (complexity + 1)) * mainArmLen;
          const branchGrowth = Math.max(0, (growth - b * 0.12) / (1 - b * 0.12));
          const branchLen = (crystalRadius * 0.28 * (1 - b / (complexity + 1))) * branchGrowth;

          if (branchLen > 0) {
            // Upper prong (+60 deg)
            ctx.beginPath();
            ctx.moveTo(branchPos, 0);
            const ux = branchPos + Math.cos(Math.PI / 3) * branchLen;
            const uy = -Math.sin(Math.PI / 3) * branchLen;
            ctx.lineTo(ux, uy);

            // Tertiary micro-spicules along upper prong
            if (b <= 3 && branchGrowth > 0.6) {
              const subLen = branchLen * 0.4;
              ctx.moveTo(ux * 0.65 + branchPos * 0.35, uy * 0.65);
              ctx.lineTo(
                ux * 0.65 + branchPos * 0.35 + Math.cos(Math.PI / 3) * subLen,
                uy * 0.65 + Math.sin(Math.PI / 3) * subLen
              );
            }

            // Lower prong (-60 deg)
            ctx.moveTo(branchPos, 0);
            const lx = branchPos + Math.cos(-Math.PI / 3) * branchLen;
            const ly = -Math.sin(-Math.PI / 3) * branchLen;
            ctx.lineTo(lx, ly);

            // Tertiary micro-spicules along lower prong
            if (b <= 3 && branchGrowth > 0.6) {
              const subLen = branchLen * 0.4;
              ctx.moveTo(lx * 0.65 + branchPos * 0.35, ly * 0.65);
              ctx.lineTo(
                lx * 0.65 + branchPos * 0.35 + Math.cos(-Math.PI / 3) * subLen,
                ly * 0.65 - Math.sin(-Math.PI / 3) * subLen
              );
            }

            const branchHue = (185 + b * 10 + t * 20) % 360;
            ctx.strokeStyle = hsla(branchHue, 90, 75, 0.8);
            ctx.lineWidth = Math.max(1.0, 1.8 - b * 0.2);
            ctx.stroke();

            // Diamond crystalline facet nodes at tips
            ctx.fillStyle = hsla(180, 100, 92, 0.95);
            ctx.beginPath();
            ctx.arc(ux, uy, 1.8, 0, Math.PI * 2);
            ctx.arc(lx, ly, 1.8, 0, Math.PI * 2);
            ctx.fill();
          }
        }

        // Diamond tip at main arm terminus
        ctx.fillStyle = hsla(190, 100, 95, 0.95);
        ctx.beginPath();
        ctx.arc(mainArmLen, 0, 2.5, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
      }

      // 3. Central Hexagonal Facet Core (Nucleation Seed)
      ctx.beginPath();
      const coreRadius = (16 + 12 * Math.sin(t * 2)) * Math.min(1.0, growth * 1.5);
      for (let k = 0; k <= 6; k++) {
        const a = (k / 6) * Math.PI * 2;
        const px = Math.cos(a) * coreRadius;
        const py = Math.sin(a) * coreRadius;
        if (k === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.closePath();
      ctx.fillStyle = 'rgba(56, 189, 248, 0.2)';
      ctx.fill();
      ctx.strokeStyle = hsla(190, 95, 80, 0.95);
      ctx.lineWidth = 2.0;
      ctx.stroke();

      // Outer concentric hexagonal growth boundary
      ctx.beginPath();
      const outerHexR = coreRadius * 2.2;
      for (let k = 0; k <= 6; k++) {
        const a = (k / 6) * Math.PI * 2;
        const px = Math.cos(a) * outerHexR;
        const py = Math.sin(a) * outerHexR;
        if (k === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.closePath();
      ctx.strokeStyle = hsla(210, 85, 65, 0.4);
      ctx.lineWidth = 1.0;
      ctx.stroke();

      ctx.restore();
    },
  };
}
