import type { ArtRenderer, ParameterState, RenderContext, TimeState } from '../../types/engine';
import { hsla } from '../common/color';
import { project3D } from '../common/projection3d';

// Full 3D Volumetric Deep Sea Anglerfish (Melanocetidae 3D Mesh)
// Features: 3D ellipsoidal wireframe skull mesh, 3D jaw rim with front/back teeth depth occlusion,
// 3D illicium lure casting toward the viewer, and 3D caudal fin rays.
export function createDeepSeaAnglerfish(): ArtRenderer {
  const BACTERIA_PARTICLES = 24;
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

      const cx = width * 0.48;
      const cy = height * 0.52;
      const fishScale = Math.min(width, height) / 500;

      // 3D Camera Angles
      const rotY = Math.sin(t * 0.5) * 0.35 - 0.2; // Yaw
      const rotX = 0.25 + Math.sin(t * 0.8) * 0.15; // Pitch
      const rotZ = Math.sin(t * 0.4) * 0.08; // Roll

      ctx.save();
      ctx.globalCompositeOperation = 'screen';

      // 1. 3D Volumetric Skull Ribs (Latitude & Longitude Rings)
      const LAT_RINGS = 14;
      const LON_RINGS = 12;
      const radiusX = 85 * fishScale;
      const radiusY = 70 * fishScale;
      const radiusZ = 60 * fishScale;

      for (let lat = 1; lat < LAT_RINGS; lat++) {
        const phi = (lat / LAT_RINGS) * Math.PI;
        const ringY = -Math.cos(phi) * radiusY;
        const ringR = Math.sin(phi);

        ctx.beginPath();
        const steps = 40;
        let avgDepth = 0;

        for (let i = 0; i <= steps; i++) {
          const theta = (i / steps) * Math.PI * 2;
          const rx = -20 * fishScale + Math.cos(theta) * radiusX * ringR;
          const rz = Math.sin(theta) * radiusZ * ringR;

          const p = project3D(rx, ringY, rz, rotX, rotY, rotZ, cx, cy, 450, 520);
          avgDepth += p.depth;

          if (i === 0) ctx.moveTo(p.x, p.y);
          else ctx.lineTo(p.x, p.y);
        }

        avgDepth /= (steps + 1);
        ctx.strokeStyle = hsla(215, 45, 45, (0.08 + lat * 0.02) * avgDepth);
        ctx.lineWidth = Math.max(0.7, 1.2 * avgDepth);
        ctx.stroke();
      }

      // 2. 3D Cavernous Hinged Jaws & Recurved Needle Teeth
      const jawOpen = 0.35 + 0.18 * Math.sin(t * 1.5);
      const TEETH_COUNT = 24;

      for (let i = 0; i < TEETH_COUNT; i++) {
        const theta = (i / TEETH_COUNT) * Math.PI * 2;
        const toothLen = (16 + (i % 4) * 6) * fishScale;

        // Upper Jaw Arch
        const utX = (25 + Math.cos(theta) * 45) * fishScale;
        const utY = (-15 + Math.sin(theta) * 20) * fishScale;
        const utZ = Math.sin(theta) * 45 * fishScale;

        const pBase = project3D(utX, utY, utZ, rotX, rotY, rotZ, cx, cy, 450, 520);
        const pTip = project3D(utX - 4 * fishScale, utY + toothLen, utZ, rotX, rotY, rotZ, cx, cy, 450, 520);

        ctx.beginPath();
        ctx.moveTo(pBase.x, pBase.y);
        ctx.lineTo(pTip.x, pTip.y);
        ctx.strokeStyle = hsla(200, 100, 90, 0.85 * pBase.depth);
        ctx.lineWidth = Math.max(0.8, 1.6 * pBase.depth);
        ctx.stroke();

        // Lower Jaw Arch
        const ltX = (28 + Math.cos(theta) * 48) * fishScale;
        const ltY = (15 + Math.sin(theta) * 22 + jawOpen * 25) * fishScale;
        const ltZ = Math.sin(theta) * 48 * fishScale;

        const pLBase = project3D(ltX, ltY, ltZ, rotX, rotY, rotZ, cx, cy, 450, 520);
        const pLTip = project3D(ltX - 4 * fishScale, ltY - toothLen * 1.1, ltZ, rotX, rotY, rotZ, cx, cy, 450, 520);

        ctx.beginPath();
        ctx.moveTo(pLBase.x, pLBase.y);
        ctx.lineTo(pLTip.x, pLTip.y);
        ctx.strokeStyle = hsla(200, 100, 90, 0.85 * pLBase.depth);
        ctx.lineWidth = Math.max(0.8, 1.6 * pLBase.depth);
        ctx.stroke();
      }

      // 3. 3D Illicium Rod & Glowing Esca Photophore
      const illiciumRoot = { x: 14 * fishScale, y: -52 * fishScale, z: 0 };
      const escaRawX = (95 + Math.sin(t * 2.5) * 25) * fishScale;
      const escaRawY = (-110 + Math.cos(t * 2.0) * 20) * fishScale;
      const escaRawZ = Math.sin(t * 1.8) * 60 * fishScale; // Swings toward and away from viewer in 3D

      const rodSteps = 20;
      ctx.beginPath();
      for (let st = 0; st <= rodSteps; st++) {
        const nst = st / rodSteps;
        const rx = illiciumRoot.x + (escaRawX - illiciumRoot.x) * nst;
        const ry = illiciumRoot.y + (escaRawY - illiciumRoot.y) * nst - Math.sin(nst * Math.PI) * (20 * fishScale);
        const rz = illiciumRoot.z + (escaRawZ - illiciumRoot.z) * nst;

        const p = project3D(rx, ry, rz, rotX, rotY, rotZ, cx, cy, 450, 520);
        if (st === 0) ctx.moveTo(p.x, p.y);
        else ctx.lineTo(p.x, p.y);
      }
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.85)';
      ctx.lineWidth = 2.0;
      ctx.stroke();

      // Glowing 3D Esca Photophore
      const pEsca = project3D(escaRawX, escaRawY, escaRawZ, rotX, rotY, rotZ, cx, cy, 450, 520);
      const pulse = 1 + 0.3 * Math.sin(t * 4);
      const glowR = (16 * fishScale * pulse * glowScale) * pEsca.depth;

      const grad = ctx.createRadialGradient(pEsca.x, pEsca.y, 2, pEsca.x, pEsca.y, glowR * 3.5);
      grad.addColorStop(0, 'rgba(56, 189, 248, 0.95)');
      grad.addColorStop(0.35, 'rgba(56, 189, 248, 0.45)');
      grad.addColorStop(1, 'rgba(56, 189, 248, 0)');

      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(pEsca.x, pEsca.y, glowR * 3.5, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(pEsca.x, pEsca.y, 4.5 * pEsca.depth * fishScale, 0, Math.PI * 2);
      ctx.fill();

      // 4. 3D Bioluminescent Symbiotic Bacterial Sparks
      for (let b = 0; b < BACTERIA_PARTICLES; b++) {
        bacLife[b] -= dt * 1.5;
        if (bacLife[b] <= 0) {
          bacX[b] = escaRawX + (Math.random() - 0.5) * 10;
          bacY[b] = escaRawY + (Math.random() - 0.5) * 10;
          bacZ[b] = escaRawZ + (Math.random() - 0.5) * 10;
          bacLife[b] = 1.0;
        }

        bacX[b] -= dt * 25;
        bacY[b] += (Math.random() - 0.5) * 2;
        bacZ[b] += (Math.random() - 0.5) * 2;

        const pB = project3D(bacX[b], bacY[b], bacZ[b], rotX, rotY, rotZ, cx, cy, 450, 520);
        ctx.fillStyle = hsla(190, 100, 80, bacLife[b] * 0.7 * pB.depth);
        ctx.fillRect(pB.x, pB.y, 2 * pB.depth, 2 * pB.depth);
      }

      ctx.restore();
    },
  };
}
