import type { ArtRenderer, ParameterState, RenderContext, TimeState } from '../../types/engine';
import { hsla } from '../common/color';
import { project3D } from '../common/projection3d';

// Full 3D Volumetric Vampire Squid (Vampyroteuthis Infernalis)
// Features: 3D conical mantle and 8-arm radial umbrella in 3D space,
// 3D pitch/yaw tumbling rotation, glowing 3D photophores, and 3D velar sensory filaments.
export function createVampireSquid(): ArtRenderer {
  const ARM_COUNT = 8;
  const WEB_LAYERS = 18;

  return {
    setup() {},

    render(context: RenderContext, timeState: TimeState, params: ParameterState) {
      const { ctx, width, height } = context;
      const pulseSpeed = Number(params.swimSpeed || 1.0);
      const t = timeState.time * pulseSpeed;

      ctx.fillStyle = '#020306';
      ctx.fillRect(0, 0, width, height);

      const cx = width * 0.5;
      const cy = height * 0.46;
      const squidScale = Math.min(width, height) / 480;

      // Dynamic 3D Camera Angles
      const rotY = Math.sin(t * 0.5) * 0.45; // Tumbling Yaw
      const rotX = 0.55 + Math.sin(t * 0.7) * 0.25; // Tilted Pitch
      const rotZ = Math.sin(t * 0.4) * 0.15; // Roll

      ctx.save();
      ctx.globalCompositeOperation = 'screen';

      const baseHue = (350 + Math.sin(t * 0.6) * 15) % 360;

      // 1. 3D Webbed Umbrella Mantle (18 Nested 3D Conical Ribbons)
      for (let layer = 1; layer <= WEB_LAYERS; layer++) {
        const normL = layer / WEB_LAYERS;
        const curR = (120 * normL) * squidScale;
        const mantleConeZ = (1 - normL) * (75 * squidScale); // Cone depth

        ctx.beginPath();
        const steps = 64;
        let avgDepth = 0;

        for (let i = 0; i <= steps; i++) {
          const phi = (i / steps) * Math.PI * 2;
          const armIndex = (phi / (Math.PI * 2)) * ARM_COUNT;
          const armWave = Math.sin(t * 2.8 + armIndex * 0.8) * (18 * normL * squidScale);

          // 3D Umbrella Web Coordinates
          const rawX = Math.cos(phi) * (curR + armWave);
          const rawY = Math.sin(phi) * (curR * 0.7 + armWave) + (20 * normL * squidScale);
          const rawZ = -mantleConeZ + Math.sin(phi * ARM_COUNT) * (12 * normL * squidScale);

          const p = project3D(rawX, rawY, rawZ, rotX, rotY, rotZ, cx, cy, 450, 520);
          avgDepth += p.depth;

          if (i === 0) ctx.moveTo(p.x, p.y);
          else ctx.lineTo(p.x, p.y);
        }

        avgDepth /= (steps + 1);

        const layerHue = (baseHue + normL * 25) % 360;
        const alpha = (0.06 + normL * 0.32) * avgDepth;
        ctx.strokeStyle = hsla(layerHue, 90, 65, alpha);
        ctx.lineWidth = Math.max(0.8, (layer === WEB_LAYERS ? 2.0 : 0.9) * avgDepth);
        ctx.stroke();
      }

      // 2. Eight 3D Arm Spines with Arm Tip Photophores
      for (let a = 0; a < ARM_COUNT; a++) {
        const phi = (a / ARM_COUNT) * Math.PI * 2;
        const armWave = Math.sin(t * 2.8 + a * 0.8) * (18 * squidScale);
        const armR = (120 + armWave) * squidScale;

        const tipX = Math.cos(phi) * armR;
        const tipY = Math.sin(phi) * (armR * 0.7) + (20 * squidScale);
        const tipZ = Math.sin(phi * ARM_COUNT) * (12 * squidScale);

        const pOrigin = project3D(0, -35 * squidScale, -60 * squidScale, rotX, rotY, rotZ, cx, cy, 450, 520);
        const pTip = project3D(tipX, tipY, tipZ, rotX, rotY, rotZ, cx, cy, 450, 520);

        ctx.beginPath();
        ctx.moveTo(pOrigin.x, pOrigin.y);
        ctx.lineTo(pTip.x, pTip.y);
        ctx.strokeStyle = hsla(350, 80, 50, 0.45 * pTip.depth);
        ctx.lineWidth = Math.max(0.8, 1.4 * pTip.depth);
        ctx.stroke();

        // 3D Glowing Bioluminescent Photophore Organs
        const pulse = 1 + 0.35 * Math.sin(t * 4 + a);
        const glowR = (5.5 * pulse * squidScale) * pTip.depth;

        ctx.fillStyle = hsla(190, 100, 75, 0.95);
        ctx.shadowColor = '#38bdf8';
        ctx.shadowBlur = 12 * pTip.depth;
        ctx.beginPath();
        ctx.arc(pTip.x, pTip.y, glowR, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      // 3. Two Long 3D Retractile Velar Sensory Filaments
      for (let s = -1; s <= 1; s += 2) {
        ctx.beginPath();
        const filSteps = 30;
        const maxDrop = 190 * squidScale;

        for (let st = 0; st <= filSteps; st++) {
          const nst = st / filSteps;
          const fx = s * (16 * squidScale) + Math.sin(t * 2.2 - nst * 6 + s) * (22 * nst * squidScale);
          const fy = (20 + nst * maxDrop) * squidScale;
          const fz = Math.cos(t * 1.8 + nst * 8 + s) * (35 * nst * squidScale);

          const p = project3D(fx, fy, fz, rotX, rotY, rotZ, cx, cy, 450, 520);
          if (st === 0) ctx.moveTo(p.x, p.y);
          else ctx.lineTo(p.x, p.y);
        }

        ctx.strokeStyle = 'rgba(244, 114, 182, 0.65)';
        ctx.lineWidth = 1.2;
        ctx.stroke();
      }

      ctx.restore();
    },
  };
}
