import type { ArtRenderer, ParameterState, RenderContext, TimeState } from '../../types/engine';
import { hsla } from '../common/color';
import { project3D } from '../common/projection3d';

// Ultra-Detailed Anatomical Deep Sea Anglerfish (Melanocetus Johnsonii / Ceratioidei)
// Features: 28 volumetric body contour ribbons, 20 longitudinal streamlines,
// articulated double-hinged jawbones with 28 curved needle fangs,
// glowing lateral line sensory pores, fan pectoral fins, and luminous 3D illicium lure.
export function createDeepSeaAnglerfish(): ArtRenderer {
  const BACTERIA_PARTICLES = 36;
  const bacX = new Float32Array(BACTERIA_PARTICLES);
  const bacY = new Float32Array(BACTERIA_PARTICLES);
  const bacZ = new Float32Array(BACTERIA_PARTICLES);
  const bacLife = new Float32Array(BACTERIA_PARTICLES);

  return {
    setup() {
      bacLife.fill(0);
    },

    render(context: RenderContext, timeState: TimeState, params: ParameterState) {
      const { ctx, width, height } = context;
      const lureSpeed = Number(params.lureSpeed || 1.2);
      const glowScale = Number(params.lureGlow || 1.3);
      const dt = Math.min(timeState.deltaTime, 0.05) * lureSpeed;
      const t = timeState.time * lureSpeed;

      ctx.fillStyle = '#020306';
      ctx.fillRect(0, 0, width, height);

      const cx = width * 0.46;
      const cy = height * 0.52;
      const fishScale = Math.min(width, height) / 500;

      // Dynamic 3D Camera Angles
      const rotY = Math.sin(t * 0.4) * 0.35 - 0.25; // Yaw
      const rotX = 0.28 + Math.sin(t * 0.7) * 0.14; // Pitch
      const rotZ = Math.sin(t * 0.5) * 0.06; // Roll

      ctx.save();
      ctx.globalCompositeOperation = 'screen';

      const baseHue = (210 + Math.sin(t * 0.5) * 15) % 360;

      // 1. Volumetric Globular Body Mesh (28 Concentric Contour Ribbons)
      const BODY_RIBBONS = 28;
      for (let r = 1; r <= BODY_RIBBONS; r++) {
        const normR = r / BODY_RIBBONS;
        const curScale = normR * fishScale;

        ctx.beginPath();
        const steps = 48;
        let avgDepth = 0;

        for (let i = 0; i <= steps; i++) {
          const phi = (i / steps) * Math.PI * 2;
          const cosP = Math.cos(phi);
          const sinP = Math.sin(phi);

          // Asymmetric globular ceratioid body shape (bulky head, tapering tail)
          const rx = (-20 + cosP * 85 + (cosP < 0 ? cosP * 25 : 0)) * curScale;
          const ry = (sinP * 68 + Math.sin(phi * 2) * 8) * curScale;
          const rz = (Math.sin(phi) * 58) * curScale;

          const p = project3D(rx, ry, rz, rotX, rotY, rotZ, cx, cy, 450, 520);
          avgDepth += p.depth;

          if (i === 0) ctx.moveTo(p.x, p.y);
          else ctx.lineTo(p.x, p.y);
        }
        ctx.closePath();

        avgDepth /= (steps + 1);
        const rHue = (baseHue + normR * 25) % 360;
        ctx.strokeStyle = hsla(rHue, 95, 68, (0.06 + normR * 0.35) * avgDepth);
        ctx.lineWidth = r === BODY_RIBBONS ? 2.2 * fishScale : 0.9;
        ctx.stroke();

        if (r % 5 === 0) {
          ctx.fillStyle = hsla(rHue, 85, 45, 0.04 * avgDepth);
          ctx.fill();
        }
      }

      // 2. 16 Longitudinal Body Streamlines (Snout to Caudal Fin)
      for (let str = 0; str < 16; str++) {
        const phi = (str / 16) * Math.PI * 2;
        const sinPhi = Math.sin(phi);
        const cosPhi = Math.cos(phi);

        ctx.beginPath();
        for (let s = 0; s <= 30; s++) {
          const normS = s / 30;
          const x = (normS - 0.4) * (240 * fishScale);
          const bodyW = Math.sin(normS * Math.PI) * (70 * fishScale);
          const y = sinPhi * bodyW;
          const z = cosPhi * (bodyW * 0.85);

          const p = project3D(x, y, z, rotX, rotY, rotZ, cx, cy, 450, 520);
          if (s === 0) ctx.moveTo(p.x, p.y);
          else ctx.lineTo(p.x, p.y);
        }
        ctx.strokeStyle = hsla((baseHue + str * 6) % 360, 95, 75, 0.25);
        ctx.lineWidth = str % 4 === 0 ? 1.4 : 0.8;
        ctx.stroke();
      }

      // 3. Caudal Tail & Fan Pectoral Fin Rays
      const tailWave = Math.sin(t * 2.8) * (18 * fishScale);
      for (let ray = -5; ray <= 5; ray++) {
        const normRay = ray / 5;
        const pTailBase = project3D(-110 * fishScale, 0, 0, rotX, rotY, rotZ, cx, cy, 450, 520);
        const pTailTip = project3D(-165 * fishScale, normRay * (45 * fishScale) + tailWave, normRay * (20 * fishScale), rotX, rotY, rotZ, cx, cy, 450, 520);

        ctx.beginPath();
        ctx.moveTo(pTailBase.x, pTailBase.y);
        ctx.lineTo(pTailTip.x, pTailTip.y);
        ctx.strokeStyle = hsla((baseHue + 20) % 360, 95, 75, 0.65 * pTailTip.depth);
        ctx.lineWidth = 1.6;
        ctx.stroke();
      }

      // Fan Pectoral Fin
      for (let p = 0; p < 8; p++) {
        const normP = p / 7;
        const pecFlap = Math.sin(t * 3.2 + p * 0.3) * (14 * fishScale);
        const pBase = project3D(-25 * fishScale, 20 * fishScale, 45 * fishScale, rotX, rotY, rotZ, cx, cy, 450, 520);
        const pTip = project3D(
          (-45 + normP * 25) * fishScale,
          (55 + normP * 12) * fishScale + pecFlap,
          (65 + normP * 10) * fishScale,
          rotX,
          rotY,
          rotZ,
          cx,
          cy,
          450,
          520
        );

        ctx.beginPath();
        ctx.moveTo(pBase.x, pBase.y);
        ctx.lineTo(pTip.x, pTip.y);
        ctx.strokeStyle = 'rgba(56, 189, 248, 0.55)';
        ctx.lineWidth = 1.4;
        ctx.stroke();
      }

      // 4. Double-Hinged Cavernous Jaws & 28 Recurved Needle Fangs
      const jawGape = 0.35 + 0.22 * Math.sin(t * 1.6);
      const TEETH_COUNT = 28;

      // Solid Upper Jaw Arch Bone
      ctx.beginPath();
      for (let i = 0; i <= 20; i++) {
        const theta = (i / 20) * Math.PI;
        const jx = (35 + Math.cos(theta) * 38) * fishScale;
        const jy = (-22 + Math.sin(theta) * 18) * fishScale;
        const jz = Math.sin(theta) * 48 * fishScale;
        const p = project3D(jx, jy, jz, rotX, rotY, rotZ, cx, cy, 450, 520);
        if (i === 0) ctx.moveTo(p.x, p.y);
        else ctx.lineTo(p.x, p.y);
      }
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 3.0 * fishScale;
      ctx.stroke();

      // Solid Lower Mandible Jaw Arch Bone
      ctx.beginPath();
      for (let i = 0; i <= 20; i++) {
        const theta = (i / 20) * Math.PI;
        const jx = (38 + Math.cos(theta) * 42) * fishScale;
        const jy = (18 + Math.sin(theta) * 22 + jawGape * 32) * fishScale;
        const jz = Math.sin(theta) * 52 * fishScale;
        const p = project3D(jx, jy, jz, rotX, rotY, rotZ, cx, cy, 450, 520);
        if (i === 0) ctx.moveTo(p.x, p.y);
        else ctx.lineTo(p.x, p.y);
      }
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 3.0 * fishScale;
      ctx.stroke();

      // Recurved Needle Fangs with Sharp Curved Tips
      for (let i = 0; i < TEETH_COUNT; i++) {
        const theta = (i / TEETH_COUNT) * Math.PI;
        const toothLen = (18 + (i % 5) * 5) * fishScale;

        // Upper Teeth
        const utX = (35 + Math.cos(theta) * 36) * fishScale;
        const utY = (-20 + Math.sin(theta) * 16) * fishScale;
        const utZ = Math.sin(theta) * 46 * fishScale;

        const pUBase = project3D(utX, utY, utZ, rotX, rotY, rotZ, cx, cy, 450, 520);
        const pUMid = project3D(utX + 2 * fishScale, utY + toothLen * 0.6, utZ, rotX, rotY, rotZ, cx, cy, 450, 520);
        const pUTip = project3D(utX - 4 * fishScale, utY + toothLen, utZ, rotX, rotY, rotZ, cx, cy, 450, 520);

        ctx.beginPath();
        ctx.moveTo(pUBase.x, pUBase.y);
        ctx.quadraticCurveTo(pUMid.x, pUMid.y, pUTip.x, pUTip.y);
        ctx.strokeStyle = hsla(200, 100, 95, 0.9 * pUBase.depth);
        ctx.lineWidth = Math.max(1.0, 1.8 * pUBase.depth);
        ctx.stroke();

        // Lower Teeth
        const ltX = (38 + Math.cos(theta) * 40) * fishScale;
        const ltY = (16 + Math.sin(theta) * 20 + jawGape * 32) * fishScale;
        const ltZ = Math.sin(theta) * 50 * fishScale;

        const pLBase = project3D(ltX, ltY, ltZ, rotX, rotY, rotZ, cx, cy, 450, 520);
        const pLMid = project3D(ltX + 2 * fishScale, ltY - toothLen * 0.6, ltZ, rotX, rotY, rotZ, cx, cy, 450, 520);
        const pLTip = project3D(ltX - 4 * fishScale, ltY - toothLen * 1.15, ltZ, rotX, rotY, rotZ, cx, cy, 450, 520);

        ctx.beginPath();
        ctx.moveTo(pLBase.x, pLBase.y);
        ctx.quadraticCurveTo(pLMid.x, pLMid.y, pLTip.x, pLTip.y);
        ctx.strokeStyle = hsla(200, 100, 95, 0.9 * pLBase.depth);
        ctx.lineWidth = Math.max(1.0, 1.8 * pLBase.depth);
        ctx.stroke();
      }

      // Bioluminescent Lateral Line Sensory Pores along flank
      for (let lp = 0; lp < 18; lp++) {
        const normLP = lp / 17;
        const lx = (-90 + normLP * 115) * fishScale;
        const ly = Math.sin(normLP * Math.PI) * (14 * fishScale);
        const lz = 52 * fishScale;

        const pL = project3D(lx, ly, lz, rotX, rotY, rotZ, cx, cy, 450, 520);
        ctx.fillStyle = '#67e8f9';
        ctx.beginPath();
        ctx.arc(pL.x, pL.y, 2.2 * pL.depth, 0, Math.PI * 2);
        ctx.fill();
      }

      // 5. 3D Illicium Rod & Glowing Esca Photophore
      const illiciumRoot = { x: 22 * fishScale, y: -58 * fishScale, z: 0 };
      const escaRawX = (105 + Math.sin(t * 2.5) * 28) * fishScale;
      const escaRawY = (-118 + Math.cos(t * 2.0) * 22) * fishScale;
      const escaRawZ = Math.sin(t * 1.8) * 65 * fishScale;

      const rodSteps = 24;
      ctx.beginPath();
      for (let st = 0; st <= rodSteps; st++) {
        const nst = st / rodSteps;
        const rx = illiciumRoot.x + (escaRawX - illiciumRoot.x) * nst;
        const ry = illiciumRoot.y + (escaRawY - illiciumRoot.y) * nst - Math.sin(nst * Math.PI) * (26 * fishScale);
        const rz = illiciumRoot.z + (escaRawZ - illiciumRoot.z) * nst;

        const p = project3D(rx, ry, rz, rotX, rotY, rotZ, cx, cy, 450, 520);
        if (st === 0) ctx.moveTo(p.x, p.y);
        else ctx.lineTo(p.x, p.y);
      }
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 2.4;
      ctx.stroke();

      // Glowing 3D Esca Photophore Lure
      const pEsca = project3D(escaRawX, escaRawY, escaRawZ, rotX, rotY, rotZ, cx, cy, 450, 520);
      const pulse = 1 + 0.35 * Math.sin(t * 4);
      const glowR = (18 * fishScale * pulse * glowScale) * pEsca.depth;

      const grad = ctx.createRadialGradient(pEsca.x, pEsca.y, 2, pEsca.x, pEsca.y, glowR * 3.8);
      grad.addColorStop(0, 'rgba(56, 189, 248, 0.98)');
      grad.addColorStop(0.35, 'rgba(56, 189, 248, 0.45)');
      grad.addColorStop(1, 'rgba(56, 189, 248, 0)');

      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(pEsca.x, pEsca.y, glowR * 3.8, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(pEsca.x, pEsca.y, 5.0 * pEsca.depth * fishScale, 0, Math.PI * 2);
      ctx.fill();

      // 6. Bioluminescent Symbiotic Bacterial Particle Swarm
      for (let b = 0; b < BACTERIA_PARTICLES; b++) {
        bacLife[b] -= dt * 1.5;
        if (bacLife[b] <= 0) {
          bacX[b] = escaRawX + (Math.random() - 0.5) * 12;
          bacY[b] = escaRawY + (Math.random() - 0.5) * 12;
          bacZ[b] = escaRawZ + (Math.random() - 0.5) * 12;
          bacLife[b] = 1.0;
        }

        bacX[b] -= dt * 28;
        bacY[b] += (Math.random() - 0.5) * 2;
        bacZ[b] += (Math.random() - 0.5) * 2;

        const pB = project3D(bacX[b], bacY[b], bacZ[b], rotX, rotY, rotZ, cx, cy, 450, 520);
        ctx.fillStyle = hsla(190, 100, 80, bacLife[b] * 0.75 * pB.depth);
        ctx.fillRect(pB.x, pB.y, 2.2 * pB.depth, 2.2 * pB.depth);
      }

      ctx.restore();
    },
  };
}
