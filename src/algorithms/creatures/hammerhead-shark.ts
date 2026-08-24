import type { ArtRenderer, ParameterState, RenderContext, TimeState } from '../../types/engine';
import { hsla } from '../common/color';
import { project3D } from '../common/projection3d';

// Full 3D Volumetric Luminous Great Hammerhead Shark (Sphyrna Mokarran)
// Engineered with 36 longitudinal body streamlines, 28 glowing cross-sectional ribs,
// an illuminated 3D cephalofoil T-head, falcate dorsal fin, and heterocercal tail wave.
export function createHammerheadShark(): ArtRenderer {
  const SPINE_NODES = 42;
  const LONGITUDINAL_STRANDS = 24;
  const BODY_RINGS = 30;

  return {
    setup() {},

    render(context: RenderContext, timeState: TimeState, params: ParameterState) {
      const { ctx, width, height } = context;
      const cruiseSpeed = Number(params.swimSpeed || 1.2);
      const cephalofoilWidth = Number(params.headSpan || 1.2);
      const t = timeState.time * cruiseSpeed;

      ctx.fillStyle = '#020308';
      ctx.fillRect(0, 0, width, height);

      const cx = width * 0.5;
      const cy = height * 0.5;
      const sharkScale = Math.min(width, height) / 520;

      // Dynamic 3D Camera Angles (3D banking cruise)
      const rotY = Math.sin(t * 0.5) * 0.45 + 0.2; // Yaw
      const rotX = 0.35 + Math.sin(t * 0.8) * 0.18; // Pitch (tilted downward toward viewer)
      const rotZ = Math.sin(t * 0.6) * 0.15; // Roll (banking during serpentine turns)

      ctx.save();
      ctx.globalCompositeOperation = 'screen';

      const baseHue = (195 + Math.sin(t * 0.5) * 20) % 360;

      // 1. 3D Serpentine Body Spine (Harmonic Traveling S-Wave)
      const spineNodes: { x: number; y: number; z: number; thicknessY: number; thicknessZ: number }[] = [];
      for (let s = 0; s < SPINE_NODES; s++) {
        const normS = s / (SPINE_NODES - 1);
        const x = (normS - 0.4) * (300 * sharkScale);
        
        // Serpentine traveling wave increasing toward caudal tail
        const waveAmp = Math.pow(normS, 1.4) * (46 * sharkScale);
        const y = Math.sin(t * 3.2 - normS * 4.2) * (waveAmp * 0.35);
        const z = Math.cos(t * 3.2 - normS * 4.2) * waveAmp;

        const thicknessY = Math.sin(normS * Math.PI) * (42 * sharkScale);
        const thicknessZ = Math.sin(normS * Math.PI) * (32 * sharkScale);

        spineNodes.push({ x, y, z, thicknessY, thicknessZ });
      }

      // 2. 24 Volumetric Longitudinal Skin Streamlines (Head to Tail Ribbons)
      for (let str = 0; str < LONGITUDINAL_STRANDS; str++) {
        const phi = (str / LONGITUDINAL_STRANDS) * Math.PI * 2;
        const cosPhi = Math.cos(phi);
        const sinPhi = Math.sin(phi);

        ctx.beginPath();
        let avgDepth = 0;

        for (let s = 0; s < SPINE_NODES; s++) {
          const node = spineNodes[s];
          const rawX = node.x;
          const rawY = node.y + sinPhi * node.thicknessY;
          const rawZ = node.z + cosPhi * node.thicknessZ;

          const p = project3D(rawX, rawY, rawZ, rotX, rotY, rotZ, cx, cy, 460, 520);
          avgDepth += p.depth;

          if (s === 0) ctx.moveTo(p.x, p.y);
          else ctx.lineTo(p.x, p.y);
        }

        avgDepth /= SPINE_NODES;
        const strHue = (baseHue + (str % 6) * 8) % 360;
        const isDorsal = sinPhi < 0;
        const alpha = isDorsal ? 0.45 * avgDepth : 0.25 * avgDepth;

        ctx.strokeStyle = hsla(strHue, 95, 72, alpha);
        ctx.lineWidth = str % 4 === 0 ? 1.6 : 0.9;
        ctx.stroke();
      }

      // 3. 30 Volumetric Transverse Body Rib Rings
      for (let r = 0; r < BODY_RINGS; r++) {
        const normR = r / (BODY_RINGS - 1);
        const nodeIdx = Math.floor(normR * (SPINE_NODES - 1));
        const center = spineNodes[nodeIdx];

        if (center.thicknessY < 2) continue;

        ctx.beginPath();
        const steps = 32;
        let avgDepth = 0;

        for (let i = 0; i <= steps; i++) {
          const theta = (i / steps) * Math.PI * 2;
          const ry = center.y + Math.sin(theta) * center.thicknessY;
          const rz = center.z + Math.cos(theta) * center.thicknessZ;

          const p = project3D(center.x, ry, rz, rotX, rotY, rotZ, cx, cy, 460, 520);
          avgDepth += p.depth;

          if (i === 0) ctx.moveTo(p.x, p.y);
          else ctx.lineTo(p.x, p.y);
        }

        avgDepth /= (steps + 1);

        const ringHue = (baseHue + normR * 35) % 360;
        ctx.strokeStyle = hsla(ringHue, 95, 70, (0.15 + normR * 0.45) * avgDepth);
        ctx.lineWidth = Math.max(0.8, (normR > 0.3 && normR < 0.7 ? 1.8 : 1.0) * avgDepth);
        ctx.stroke();

        // Luminous Interior Body Shading
        if (r % 4 === 0) {
          ctx.fillStyle = hsla(ringHue, 90, 55, 0.05 * avgDepth);
          ctx.fill();
        }
      }

      // 4. Volumetric 3D Cephalofoil T-Head (The Iconic Hammer)
      const head = spineNodes[0];
      const headSpan = 110 * cephalofoilWidth * sharkScale;
      const headRibs = 14;

      for (let hr = 0; hr < headRibs; hr++) {
        const normHR = hr / (headRibs - 1);
        const headXOffset = (normHR - 0.5) * (36 * sharkScale);

        ctx.beginPath();
        for (let s = -1; s <= 1; s += 2) {
          const pWingTip = project3D(
            head.x + headXOffset - 12 * sharkScale,
            head.y,
            head.z + s * headSpan * (1 - Math.abs(normHR - 0.5) * 0.2),
            rotX,
            rotY,
            rotZ,
            cx,
            cy,
            460,
            520
          );

          const pHeadCenter = project3D(
            head.x + headXOffset - 42 * sharkScale,
            head.y,
            head.z,
            rotX,
            rotY,
            rotZ,
            cx,
            cy,
            460,
            520
          );

          if (s === -1) {
            ctx.moveTo(pWingTip.x, pWingTip.y);
            ctx.lineTo(pHeadCenter.x, pHeadCenter.y);
          } else {
            ctx.lineTo(pWingTip.x, pWingTip.y);
          }
        }

        ctx.strokeStyle = hsla((baseHue + 30) % 360, 95, 78, 0.55);
        ctx.lineWidth = hr === 0 || hr === headRibs - 1 ? 2.0 : 1.0;
        ctx.stroke();
      }

      // Stereoscopic Glowing Lateral Eyes at Cephalofoil Tips
      for (let s = -1; s <= 1; s += 2) {
        const pEye = project3D(
          head.x - 14 * sharkScale,
          head.y,
          head.z + s * (headSpan - 6 * sharkScale),
          rotX,
          rotY,
          rotZ,
          cx,
          cy,
          460,
          520
        );

        ctx.fillStyle = '#38bdf8';
        ctx.shadowColor = '#38bdf8';
        ctx.shadowBlur = 14 * pEye.depth;
        ctx.beginPath();
        ctx.arc(pEye.x, pEye.y, 6.0 * pEye.depth * sharkScale, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;

        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(pEye.x, pEye.y, 2.5 * pEye.depth * sharkScale, 0, Math.PI * 2);
        ctx.fill();
      }

      // Ampullae of Lorenzini Electroreceptor Clusters (Glowing cyan nodes along front head)
      for (let p = 0; p < 16; p++) {
        const normP = (p / 15 - 0.5) * 2;
        const poreZ = head.z + normP * (headSpan * 0.85);
        const poreX = head.x - (38 - Math.abs(normP) * 12) * sharkScale;

        const pPore = project3D(poreX, head.y, poreZ, rotX, rotY, rotZ, cx, cy, 460, 520);
        ctx.fillStyle = '#67e8f9';
        ctx.beginPath();
        ctx.arc(pPore.x, pPore.y, 1.8 * pPore.depth, 0, Math.PI * 2);
        ctx.fill();
      }

      // 5. 3D Tall Sickle First Dorsal Fin (Multi-Ribbed Aerodynamic Foil)
      const dorsalIdx = Math.floor(SPINE_NODES * 0.32);
      const dBase = spineNodes[dorsalIdx];
      const dorsalRibs = 10;

      for (let dr = 0; dr < dorsalRibs; dr++) {
        const normDR = dr / (dorsalRibs - 1);
        const dXBase = dBase.x + (normDR - 0.5) * (45 * sharkScale);
        const dYBase = dBase.y - dBase.thicknessY;

        const p1 = project3D(dXBase, dYBase, dBase.z, rotX, rotY, rotZ, cx, cy, 460, 520);
        const p2 = project3D(dBase.x + 18 * sharkScale, dBase.y - (92 * sharkScale), dBase.z, rotX, rotY, rotZ, cx, cy, 460, 520);

        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.strokeStyle = hsla(baseHue, 95, 75, (0.2 + normDR * 0.5) * p2.depth);
        ctx.lineWidth = dr === 0 ? 2.2 : 1.2;
        ctx.stroke();
      }

      // 6. 3D Heterocercal Caudal Tail Fin (Multi-Ribbed Swimming Propeller)
      const tail = spineNodes[SPINE_NODES - 1];
      const tailRibs = 12;

      for (let tr = 0; tr < tailRibs; tr++) {
        const normTR = tr / (tailRibs - 1);

        const pTBase = project3D(tail.x, tail.y, tail.z, rotX, rotY, rotZ, cx, cy, 460, 520);
        const pTUpper = project3D(
          tail.x + (45 + normTR * 30) * sharkScale,
          tail.y - (45 + normTR * 35) * sharkScale,
          tail.z,
          rotX,
          rotY,
          rotZ,
          cx,
          cy,
          460,
          520
        );
        const pTLower = project3D(
          tail.x + (30 + normTR * 22) * sharkScale,
          tail.y + (25 + normTR * 25) * sharkScale,
          tail.z,
          rotX,
          rotY,
          rotZ,
          cx,
          cy,
          460,
          520
        );

        ctx.beginPath();
        ctx.moveTo(pTBase.x, pTBase.y);
        ctx.lineTo(pTUpper.x, pTUpper.y);
        ctx.moveTo(pTBase.x, pTBase.y);
        ctx.lineTo(pTLower.x, pTLower.y);

        ctx.strokeStyle = hsla((baseHue + 20) % 360, 95, 80, 0.65 * pTUpper.depth);
        ctx.lineWidth = tr === tailRibs - 1 ? 2.0 : 1.2;
        ctx.stroke();
      }

      // 7. Radiant Acoustic Lateral Line Streak
      ctx.beginPath();
      for (let s = 2; s < SPINE_NODES - 2; s++) {
        const node = spineNodes[s];
        const p = project3D(node.x, node.y, node.z + node.thicknessZ, rotX, rotY, rotZ, cx, cy, 460, 520);
        if (s === 2) ctx.moveTo(p.x, p.y);
        else ctx.lineTo(p.x, p.y);
      }
      ctx.strokeStyle = '#38bdf8';
      ctx.shadowColor = '#38bdf8';
      ctx.shadowBlur = 10;
      ctx.lineWidth = 1.8;
      ctx.stroke();
      ctx.shadowBlur = 0;

      ctx.restore();
    },
  };
}
