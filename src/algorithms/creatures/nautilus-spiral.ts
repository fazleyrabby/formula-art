import type { ArtRenderer, ParameterState, RenderContext, TimeState } from '../../types/engine';
import { hsla } from '../common/color';
import { project3D } from '../common/projection3d';

// Full 3D Volumetric Nautilus Shell (Logarithmic Helico-Conical Spiral)
// Features: 3D conical helical growth, full 3D tumbling rotation, 3D curved septal partitions,
// depth-shaded growth streamlines, and an axial vascular siphuncle cord.
export function createNautilusSpiral(): ArtRenderer {
  const SPIRAL_STRANDS = 32;
  const CHAMBERS = 24;

  return {
    setup() {},

    render(context: RenderContext, timeState: TimeState, params: ParameterState) {
      const { ctx, width, height } = context;
      const speed = Number(params.growthRate || 0.8);
      const chambersCount = Number(params.chamberCount || 20);
      const t = timeState.time * speed;

      ctx.fillStyle = '#020307';
      ctx.fillRect(0, 0, width, height);

      const cx = width * 0.5;
      const cy = height * 0.5;
      const scale = Math.min(width, height) * 0.38;

      // Dynamic 3D Camera Orbit
      const rotY = t * 0.4; // 360 degree turntable yaw
      const rotX = 0.45 + Math.sin(t * 0.3) * 0.25; // Gentle pitch wobble
      const rotZ = Math.sin(t * 0.2) * 0.15;

      ctx.save();
      ctx.globalCompositeOperation = 'screen';

      const baseHue = (25 + Math.sin(t * 0.5) * 20) % 360;

      const b = 0.175; // Logarithmic spiral growth rate
      const maxTheta = Math.PI * 4.4;

      // 1. 3D Logarithmic Helico-Conical Spiral Streamlines
      for (let s = 0; s < SPIRAL_STRANDS; s++) {
        const normS = (s + 1) / SPIRAL_STRANDS;
        const a = scale * 0.035 * (0.4 + normS * 0.75);

        ctx.beginPath();
        const steps = 120;
        let avgDepth = 0;

        for (let i = 0; i <= steps; i++) {
          const theta = (i / steps) * maxTheta;
          const r = a * Math.exp(b * theta);
          
          // 3D Conical Spiral: z advances with coil expansion
          const rawX = r * Math.cos(theta);
          const rawY = r * Math.sin(theta);
          const rawZ = (theta / maxTheta - 0.5) * (scale * 0.4) * (1 - normS * 0.3);

          const p = project3D(rawX, rawY, rawZ, rotX, rotY, rotZ, cx, cy, 450, 520);
          avgDepth += p.depth;

          if (i === 0) ctx.moveTo(p.x, p.y);
          else ctx.lineTo(p.x, p.y);
        }

        avgDepth /= (steps + 1);

        const strandHue = (baseHue + normS * 35) % 360;
        const alpha = (0.05 + normS * 0.3) * avgDepth;
        ctx.strokeStyle = hsla(strandHue, 95, 72, alpha);
        ctx.lineWidth = Math.max(0.7, (normS > 0.88 ? 1.6 : 0.8) * avgDepth);
        ctx.stroke();
      }

      // 2. 3D Curved Septa Bio-Chamber Walls
      for (let c = 1; c <= CHAMBERS; c++) {
        if (c > chambersCount) break;
        const normC = c / CHAMBERS;
        const thetaC = normC * maxTheta;
        const rOuter = (scale * 0.035 * 1.15) * Math.exp(b * thetaC);
        const rInner = (scale * 0.035 * 1.15) * Math.exp(b * (thetaC - Math.PI * 2));

        const zOuter = (thetaC / maxTheta - 0.5) * (scale * 0.4);
        const zInner = ((thetaC - Math.PI * 2) / maxTheta - 0.5) * (scale * 0.4);

        const p1 = project3D(
          rOuter * Math.cos(thetaC),
          rOuter * Math.sin(thetaC),
          zOuter,
          rotX,
          rotY,
          rotZ,
          cx,
          cy,
          450,
          520
        );

        const p2 = project3D(
          Math.max(0, rInner) * Math.cos(thetaC - Math.PI * 2),
          Math.max(0, rInner) * Math.sin(thetaC - Math.PI * 2),
          zInner,
          rotX,
          rotY,
          rotZ,
          cx,
          cy,
          450,
          520
        );

        ctx.beginPath();
        ctx.moveTo(p2.x, p2.y);
        ctx.lineTo(p1.x, p1.y);

        ctx.strokeStyle = hsla(190, 100, 80, 0.4 * p1.depth);
        ctx.lineWidth = Math.max(0.8, 1.2 * p1.depth);
        ctx.stroke();
      }

      // 3. 3D Central Glowing Siphuncle Vascular Tube
      ctx.beginPath();
      for (let i = 0; i <= 80; i++) {
        const theta = (i / 80) * maxTheta;
        const r = (scale * 0.035 * 0.65) * Math.exp(b * theta);
        const rawX = r * Math.cos(theta);
        const rawY = r * Math.sin(theta);
        const rawZ = (theta / maxTheta - 0.5) * (scale * 0.4) * 0.8;

        const p = project3D(rawX, rawY, rawZ, rotX, rotY, rotZ, cx, cy, 450, 520);
        if (i === 0) ctx.moveTo(p.x, p.y);
        else ctx.lineTo(p.x, p.y);
      }
      ctx.strokeStyle = '#38bdf8';
      ctx.shadowColor = '#38bdf8';
      ctx.shadowBlur = 10;
      ctx.lineWidth = 1.6;
      ctx.stroke();
      ctx.shadowBlur = 0;

      ctx.restore();
    },
  };
}
