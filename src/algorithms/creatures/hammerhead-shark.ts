import type { ArtRenderer, ParameterState, RenderContext, TimeState } from '../../types/engine';
import { hsla } from '../common/color';
import { project3D } from '../common/projection3d';

// Full 3D Volumetric Great Hammerhead Shark (Sphyrna Mokarran)
// Features: 3D serpentine swimming spine kinematics, 3D cephalofoil T-head hydrodynamics,
// 3D cross-sectional body mesh rings, and 3D caudal/dorsal fin deflection.
export function createHammerheadShark(): ArtRenderer {
  const SPINE_NODES = 36;
  const BODY_RINGS = 24;

  return {
    setup() {},

    render(context: RenderContext, timeState: TimeState, params: ParameterState) {
      const { ctx, width, height } = context;
      const cruiseSpeed = Number(params.swimSpeed || 1.2);
      const cephalofoilWidth = Number(params.headSpan || 1.2);
      const t = timeState.time * cruiseSpeed;

      ctx.fillStyle = '#020409';
      ctx.fillRect(0, 0, width, height);

      const cx = width * 0.5;
      const cy = height * 0.5;
      const sharkScale = Math.min(width, height) / 520;

      // Dynamic 3D Camera Angles
      const rotY = Math.sin(t * 0.4) * 0.35 + 0.3; // Yaw angle showing side/front
      const rotX = 0.35 + Math.sin(t * 0.7) * 0.15; // Pitch
      const rotZ = Math.sin(t * 0.5) * 0.12; // Roll

      ctx.save();
      ctx.globalCompositeOperation = 'screen';

      // 1. 3D Serpentine Body Spine
      const spineNodes: { x: number; y: number; z: number }[] = [];
      for (let s = 0; s < SPINE_NODES; s++) {
        const normS = s / (SPINE_NODES - 1);
        const x = (normS - 0.35) * (280 * sharkScale);
        // 3D Traveling Serpentine S-Wave
        const waveAmp = Math.pow(normS, 1.5) * (42 * sharkScale);
        const y = Math.sin(t * 3.2 - normS * 4.2) * (waveAmp * 0.4);
        const z = Math.cos(t * 3.2 - normS * 4.2) * waveAmp;

        spineNodes.push({ x, y, z });
      }

      // 2. 3D Cross-Sectional Body Rings (Volumetric Wireframe Fusiform Mesh)
      for (let r = 0; r < BODY_RINGS; r++) {
        const normR = r / (BODY_RINGS - 1);
        const nodeIdx = Math.floor(normR * (SPINE_NODES - 1));
        const center = spineNodes[nodeIdx];

        const bodyThicknessY = Math.sin(normR * Math.PI) * (38 * sharkScale);
        const bodyThicknessZ = Math.sin(normR * Math.PI) * (28 * sharkScale);

        ctx.beginPath();
        const steps = 24;
        let avgDepth = 0;

        for (let i = 0; i <= steps; i++) {
          const theta = (i / steps) * Math.PI * 2;
          const ry = center.y + Math.sin(theta) * bodyThicknessY;
          const rz = center.z + Math.cos(theta) * bodyThicknessZ;

          const p = project3D(center.x, ry, rz, rotX, rotY, rotZ, cx, cy, 450, 520);
          avgDepth += p.depth;

          if (i === 0) ctx.moveTo(p.x, p.y);
          else ctx.lineTo(p.x, p.y);
        }

        avgDepth /= (steps + 1);

        const ringHue = (205 + normR * 30) % 360;
        ctx.strokeStyle = hsla(ringHue, 85, 65, (0.08 + normR * 0.28) * avgDepth);
        ctx.lineWidth = Math.max(0.8, 1.3 * avgDepth);
        ctx.stroke();
      }

      // 3. 3D Cephalofoil T-Head Wing Mesh
      const head = spineNodes[0];
      const headSpan = 98 * cephalofoilWidth * sharkScale;

      ctx.beginPath();
      for (let s = -1; s <= 1; s += 2) {
        const pWingTip = project3D(
          head.x - 14 * sharkScale,
          head.y,
          head.z + s * headSpan,
          rotX,
          rotY,
          rotZ,
          cx,
          cy,
          450,
          520
        );

        const pHeadCenter = project3D(
          head.x - 38 * sharkScale,
          head.y,
          head.z,
          rotX,
          rotY,
          rotZ,
          cx,
          cy,
          450,
          520
        );

        ctx.moveTo(pHeadCenter.x, pHeadCenter.y);
        ctx.lineTo(pWingTip.x, pWingTip.y);

        // Glowing 3D Lateral Eye
        ctx.fillStyle = '#0284c7';
        ctx.beginPath();
        ctx.arc(pWingTip.x, pWingTip.y, 4.5 * pWingTip.depth * sharkScale, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.strokeStyle = hsla(210, 90, 75, 0.85);
      ctx.lineWidth = 2.2;
      ctx.stroke();

      // 4. 3D Tall Falcate First Dorsal Fin
      const dorsalIdx = Math.floor(SPINE_NODES * 0.35);
      const dBase = spineNodes[dorsalIdx];

      const pDBase = project3D(dBase.x, dBase.y - 32 * sharkScale, dBase.z, rotX, rotY, rotZ, cx, cy, 450, 520);
      const pDTip = project3D(dBase.x + 18 * sharkScale, dBase.y - 88 * sharkScale, dBase.z, rotX, rotY, rotZ, cx, cy, 450, 520);
      const pDEnd = project3D(dBase.x + 35 * sharkScale, dBase.y, dBase.z, rotX, rotY, rotZ, cx, cy, 450, 520);

      ctx.beginPath();
      ctx.moveTo(pDBase.x, pDBase.y);
      ctx.lineTo(pDTip.x, pDTip.y);
      ctx.lineTo(pDEnd.x, pDEnd.y);
      ctx.strokeStyle = hsla(210, 95, 75, 0.75 * pDTip.depth);
      ctx.lineWidth = 1.8;
      ctx.stroke();

      // 5. 3D Heterocercal Caudal Tail Fin
      const tail = spineNodes[SPINE_NODES - 1];
      const pTBase = project3D(tail.x, tail.y, tail.z, rotX, rotY, rotZ, cx, cy, 450, 520);
      const pTUpper = project3D(tail.x + 60 * sharkScale, tail.y - 65 * sharkScale, tail.z, rotX, rotY, rotZ, cx, cy, 450, 520);
      const pTLower = project3D(tail.x + 44 * sharkScale, tail.y + 42 * sharkScale, tail.z, rotX, rotY, rotZ, cx, cy, 450, 520);

      ctx.beginPath();
      ctx.moveTo(pTBase.x, pTBase.y);
      ctx.lineTo(pTUpper.x, pTUpper.y);
      ctx.lineTo(pTBase.x + 20 * sharkScale, pTBase.y);
      ctx.lineTo(pTLower.x, pTLower.y);
      ctx.closePath();
      ctx.strokeStyle = hsla(210, 95, 80, 0.85 * pTUpper.depth);
      ctx.lineWidth = 2.0;
      ctx.stroke();

      ctx.restore();
    },
  };
}
