import type { ArtRenderer, ParameterState, RenderContext, TimeState } from '../../types/engine';
import { hsla } from '../common/color';
import { project3D } from '../common/projection3d';

// Full 3D Volumetric Manta Ray (Mobula Birostris)
// Features: 3D banking yaw/pitch/roll flight, 3D pectoral wing deflection,
// 42 volumetric 3D streamline ribbons, depth shading, and 3D whiplike tail.
export function createMantaRayGlide(): ArtRenderer {
  const WING_RIBBONS = 36;
  const TAIL_NODES = 45;

  return {
    setup() {},

    render(context: RenderContext, timeState: TimeState, params: ParameterState) {
      const { ctx, width, height } = context;
      const speed = Number(params.glideSpeed || 1.1);
      const wingSpan = Number(params.wingSpan || 190);
      const t = timeState.time * speed;

      ctx.fillStyle = '#020409';
      ctx.fillRect(0, 0, width, height);

      const cx = width * 0.5;
      const cy = height * 0.48;

      // Dynamic 3D Camera Angles (Continuous banking flight)
      const rotY = Math.sin(t * 0.6) * 0.35; // Yaw
      const rotX = 0.45 + Math.sin(t * 0.8) * 0.22; // Pitch (tilted downward toward viewer)
      const rotZ = Math.sin(t * 0.6) * 0.25; // Roll (banking during turns)

      ctx.save();
      ctx.globalCompositeOperation = 'screen';

      const baseHue = (200 + Math.sin(t * 0.7) * 20) % 360;

      // 1. 3D Volumetric Pectoral Wing Streamline Ribbons
      for (let r = 0; r < WING_RIBBONS; r++) {
        const normR = (r + 1) / WING_RIBBONS;
        const curSpan = wingSpan * normR;
        const wingFlap = Math.sin(t * 2.8 - normR * 1.6) * (36 * Math.pow(normR, 1.4));
        const wingCurl = Math.cos(t * 2.8 - normR * 1.6) * (20 * normR);

        const steps = 50;
        ctx.beginPath();

        let avgDepth = 0;

        for (let i = 0; i <= steps; i++) {
          const u = i / steps; // 0 to 1 around the wing loop
          const angle = u * Math.PI * 2;

          // 3D Parametric Wing Geometry
          const rawX = Math.sin(angle) * curSpan;
          const rawY = -Math.cos(angle) * (65 * normR) + (Math.abs(rawX) / curSpan) * 25 * normR;
          // Z-depth deformation during flapping wave
          const rawZ = (Math.abs(rawX) / curSpan) * wingFlap + (rawY / 65) * wingCurl;

          const p = project3D(rawX, rawY, rawZ, rotX, rotY, rotZ, cx, cy, 460, 520);
          avgDepth += p.depth;

          if (i === 0) ctx.moveTo(p.x, p.y);
          else ctx.lineTo(p.x, p.y);
        }

        avgDepth /= (steps + 1);

        const ribbonHue = (baseHue + normR * 32) % 360;
        const alpha = (0.05 + normR * 0.32) * avgDepth;
        ctx.strokeStyle = hsla(ribbonHue, 95, 68, alpha);
        ctx.lineWidth = Math.max(0.8, (normR > 0.88 ? 1.8 : 0.9) * avgDepth);
        ctx.stroke();

        // 3D Shading Fill
        if (r % 5 === 0) {
          ctx.fillStyle = hsla(ribbonHue, 90, 50, 0.035 * avgDepth);
          ctx.fill();
        }
      }

      // 2. 3D Curled Cephalic Horns (Feeding Funnels)
      for (let s = -1; s <= 1; s += 2) {
        for (let h = 0; h < 6; h++) {
          const normH = h / 5;
          ctx.beginPath();

          const hornSteps = 12;
          for (let st = 0; st <= hornSteps; st++) {
            const nst = st / hornSteps;
            const hx = s * (12 + normH * 10 + nst * 14);
            const hy = -50 - nst * 30;
            const hz = Math.sin(t * 3.5 + normH * 2 + s + nst * 3) * (8 * nst);

            const p = project3D(hx, hy, hz, rotX, rotY, rotZ, cx, cy, 460, 520);
            if (st === 0) ctx.moveTo(p.x, p.y);
            else ctx.lineTo(p.x, p.y);
          }

          ctx.strokeStyle = hsla((baseHue + 40) % 360, 95, 75, 0.5);
          ctx.lineWidth = 1.2;
          ctx.stroke();
        }
      }

      // 3. 3D Long Trailing Harmonic Whiplike Tail (45 Nodes in 3D Space)
      ctx.beginPath();
      const tailLen = 185;
      for (let n = 0; n <= TAIL_NODES; n++) {
        const normN = n / TAIL_NODES;
        // 3D Harmonic traveling wave
        const tx = Math.sin(t * 3.2 - normN * 5) * (26 * normN);
        const ty = 65 + normN * tailLen;
        const tz = Math.cos(t * 2.5 - normN * 6) * (32 * normN);

        const p = project3D(tx, ty, tz, rotX, rotY, rotZ, cx, cy, 460, 520);
        if (n === 0) ctx.moveTo(p.x, p.y);
        else ctx.lineTo(p.x, p.y);
      }
      ctx.strokeStyle = hsla((baseHue + 20) % 360, 95, 80, 0.85);
      ctx.lineWidth = 1.6;
      ctx.stroke();

      ctx.restore();
    },
  };
}
