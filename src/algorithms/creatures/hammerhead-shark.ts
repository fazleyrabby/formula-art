import type { ArtRenderer, ParameterState, RenderContext, TimeState } from '../../types/engine';
import { hsla } from '../common/color';

// Anatomically Enriched Great Hammerhead Shark (Sphyrna Mokarran)
// Features: Cephalofoil with Ampullae of Lorenzini electroreceptors, 5 branchial gill slits,
// acoustic lateral line canal, tall falcate first dorsal fin, and heterocercal caudal fin.
export function createHammerheadShark(): ArtRenderer {
  return {
    setup() {},

    render(context: RenderContext, timeState: TimeState, params: ParameterState) {
      const { ctx, width, height } = context;
      const cruiseSpeed = Number(params.swimSpeed || 1.2);
      const cephalofoilWidth = Number(params.headSpan || 1.2);
      const t = timeState.time * cruiseSpeed;

      ctx.fillStyle = '#02050b';
      ctx.fillRect(0, 0, width, height);

      const cx = width * 0.52 + Math.cos(t * 0.4) * (width * 0.06);
      const cy = height * 0.5 + Math.sin(t * 1.5) * 8;
      const sharkScale = Math.min(width, height) / 520;

      ctx.save();
      ctx.translate(cx, cy);

      // 1. Serpentine Body Spine (Kinematic harmonic wave from head to tail)
      const SPINE_NODES = 50;
      const spineX: number[] = [];
      const spineY: number[] = [];

      for (let s = 0; s < SPINE_NODES; s++) {
        const normS = s / (SPINE_NODES - 1);
        const x = (normS - 0.35) * (270 * sharkScale);
        const waveAmp = Math.pow(normS, 1.6) * (38 * sharkScale);
        const y = Math.sin(t * 3.2 - normS * 4.2) * waveAmp;

        spineX.push(x);
        spineY.push(y);
      }

      // 2. Hydrodynamic Fusiform Shark Body Outline
      ctx.beginPath();
      // Dorsal upper profile
      for (let s = 0; s < SPINE_NODES; s++) {
        const normS = s / (SPINE_NODES - 1);
        const bodyThickness = Math.sin(normS * Math.PI) * (36 * sharkScale);
        const px = spineX[s];
        const py = spineY[s] - bodyThickness;
        if (s === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }

      // Ventral lower profile
      for (let s = SPINE_NODES - 1; s >= 0; s--) {
        const normS = s / (SPINE_NODES - 1);
        const bodyThickness = Math.sin(normS * Math.PI) * (36 * sharkScale);
        const px = spineX[s];
        const py = spineY[s] + bodyThickness;
        ctx.lineTo(px, py);
      }
      ctx.closePath();

      // Countershaded Shark Skin (Slate Grey-Navy above, White below)
      const skinGrad = ctx.createLinearGradient(0, -40 * sharkScale, 0, 40 * sharkScale);
      skinGrad.addColorStop(0, '#0f172a');
      skinGrad.addColorStop(0.6, '#1e293b');
      skinGrad.addColorStop(1, '#334155');

      ctx.fillStyle = skinGrad;
      ctx.fill();
      ctx.strokeStyle = hsla(210, 50, 48, 0.95);
      ctx.lineWidth = 2.4 * sharkScale;
      ctx.stroke();

      // 3. Acoustic Lateral Line Sensory Canal (Gold/Cyan streak)
      ctx.beginPath();
      for (let s = 8; s < SPINE_NODES - 2; s++) {
        const px = spineX[s];
        const py = spineY[s];
        if (s === 8) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.45)';
      ctx.lineWidth = 1.4;
      ctx.stroke();

      // 4. Five Anatomical Branchial Gill Slits
      const gillStartX = spineX[10];
      const gillStartY = spineY[10];
      for (let g = 0; g < 5; g++) {
        const gx = gillStartX + g * (5 * sharkScale);
        const gy = gillStartY + (g % 2 === 0 ? 0 : 2);
        ctx.beginPath();
        ctx.moveTo(gx, gy - 14 * sharkScale);
        ctx.quadraticCurveTo(gx + 3 * sharkScale, gy, gx, gy + 14 * sharkScale);
        ctx.strokeStyle = hsla(215, 60, 25, 0.9);
        ctx.lineWidth = 1.6;
        ctx.stroke();
      }

      // 5. Iconic Cephalofoil T-Head with Ampullae of Lorenzini Pores
      const headX = spineX[0];
      const headY = spineY[0];

      ctx.save();
      ctx.translate(headX, headY);

      const headSpan = 98 * cephalofoilWidth * sharkScale;
      ctx.beginPath();
      ctx.moveTo(-16 * sharkScale, -headSpan);
      ctx.quadraticCurveTo(-48 * sharkScale, 0, -16 * sharkScale, headSpan);
      ctx.lineTo(6 * sharkScale, headSpan * 0.85);
      ctx.quadraticCurveTo(-16 * sharkScale, 0, 6 * sharkScale, -headSpan * 0.85);
      ctx.closePath();

      ctx.fillStyle = '#090e1a';
      ctx.fill();
      ctx.strokeStyle = hsla(210, 55, 55, 0.95);
      ctx.lineWidth = 2.6 * sharkScale;
      ctx.stroke();

      // Ampullae of Lorenzini Electroreceptor Pore Clusters along cephalofoil leading edge
      for (let p = 0; p < 24; p++) {
        const normP = (p / 23 - 0.5) * 2; // -1 to 1
        const poreY = normP * (headSpan * 0.9);
        const poreX = -32 * sharkScale * (1 - Math.abs(normP) * 0.5);

        ctx.fillStyle = 'rgba(56, 189, 248, 0.65)';
        ctx.fillRect(poreX, poreY, 1.4, 1.4);
      }

      // Stereoscopic Wide-Set Lateral Eyes at Wing Tips
      for (let s = -1; s <= 1; s += 2) {
        ctx.fillStyle = '#0284c7';
        ctx.beginPath();
        ctx.arc(-15 * sharkScale, s * (headSpan - 6 * sharkScale), 5.0 * sharkScale, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#e0f2fe';
        ctx.lineWidth = 1.4;
        ctx.stroke();

        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(-16 * sharkScale, s * (headSpan - 6 * sharkScale) - 1.5, 2.0 * sharkScale, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();

      // 6. Tall Falcate First Dorsal Fin
      const dorsalIdx = Math.floor(SPINE_NODES * 0.35);
      const dX = spineX[dorsalIdx];
      const dY = spineY[dorsalIdx] - (34 * sharkScale);

      ctx.beginPath();
      ctx.moveTo(dX - 28 * sharkScale, dY);
      ctx.quadraticCurveTo(dX - 12 * sharkScale, dY - 80 * sharkScale, dX + 16 * sharkScale, dY - 85 * sharkScale);
      ctx.quadraticCurveTo(dX + 5 * sharkScale, dY - 32 * sharkScale, dX + 32 * sharkScale, dY + 6 * sharkScale);
      ctx.closePath();
      ctx.fillStyle = '#090d18';
      ctx.fill();
      ctx.strokeStyle = hsla(215, 60, 50, 0.9);
      ctx.lineWidth = 2.0 * sharkScale;
      ctx.stroke();

      // 7. Heterocercal Caudal Tail Fin (Upper long lobe + lower short lobe)
      const tailIdx = SPINE_NODES - 1;
      const tX = spineX[tailIdx];
      const tY = spineY[tailIdx];

      ctx.beginPath();
      ctx.moveTo(tX, tY);
      // Tall upper lobe
      ctx.lineTo(tX + 60 * sharkScale, tY - 65 * sharkScale);
      ctx.lineTo(tX + 46 * sharkScale, tY - 48 * sharkScale);
      ctx.lineTo(tX + 22 * sharkScale, tY);
      // Lower lobe
      ctx.lineTo(tX + 44 * sharkScale, tY + 42 * sharkScale);
      ctx.lineTo(tX, tY);
      ctx.closePath();

      ctx.fillStyle = '#0f172a';
      ctx.fill();
      ctx.strokeStyle = hsla(210, 55, 50, 0.95);
      ctx.lineWidth = 2.2 * sharkScale;
      ctx.stroke();

      ctx.restore();
    },
  };
}
