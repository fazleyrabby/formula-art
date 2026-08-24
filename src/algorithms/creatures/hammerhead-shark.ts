import type { ArtRenderer, ParameterState, RenderContext, TimeState } from '../../types/engine';
import { hsla } from '../common/color';

// Sphyrna Mokarran (Great Hammerhead Shark) Cephalofoil Hydrodynamics & Serpentine Waves
export function createHammerheadShark(): ArtRenderer {
  return {
    setup() {},

    render(context: RenderContext, timeState: TimeState, params: ParameterState) {
      const { ctx, width, height } = context;
      const cruiseSpeed = Number(params.swimSpeed || 1.2);
      const cephalofoilWidth = Number(params.headSpan || 1.2);
      const t = timeState.time * cruiseSpeed;

      ctx.fillStyle = '#03070e';
      ctx.fillRect(0, 0, width, height);

      const cx = width * 0.52 + Math.cos(t * 0.4) * (width * 0.06);
      const cy = height * 0.5 + Math.sin(t * 1.5) * 8;
      const sharkScale = Math.min(width, height) / 520;

      ctx.save();
      ctx.translate(cx, cy);

      // 1. Serpentine Body Spine (Harmonic traveling wave from head to tail)
      const SPINE_NODES = 50;
      const spineX: number[] = [];
      const spineY: number[] = [];

      for (let s = 0; s < SPINE_NODES; s++) {
        const normS = s / (SPINE_NODES - 1);
        const x = (normS - 0.35) * (260 * sharkScale);
        // Serpentine sinusoidal wave increasing toward caudal fin
        const waveAmp = Math.pow(normS, 1.6) * (36 * sharkScale);
        const y = Math.sin(t * 3.2 - normS * 4) * waveAmp;

        spineX.push(x);
        spineY.push(y);
      }

      // 2. Hydrodynamic Shark Fusiform Body Outline
      ctx.beginPath();
      // Dorsal / Upper profile
      for (let s = 0; s < SPINE_NODES; s++) {
        const normS = s / (SPINE_NODES - 1);
        const bodyThickness = Math.sin(normS * Math.PI) * (34 * sharkScale);
        const px = spineX[s];
        const py = spineY[s] - bodyThickness;
        if (s === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }

      // Ventral / Lower profile
      for (let s = SPINE_NODES - 1; s >= 0; s--) {
        const normS = s / (SPINE_NODES - 1);
        const bodyThickness = Math.sin(normS * Math.PI) * (34 * sharkScale);
        const px = spineX[s];
        const py = spineY[s] + bodyThickness;
        ctx.lineTo(px, py);
      }
      ctx.closePath();

      // Slate Navy/Charcoal Shark Skin
      ctx.fillStyle = '#0f172a';
      ctx.fill();
      ctx.strokeStyle = hsla(210, 50, 45, 0.9);
      ctx.lineWidth = 2.4 * sharkScale;
      ctx.stroke();

      // 3. Iconic T-Shaped Cephalofoil "Hammer" Head (Front)
      const headX = spineX[0];
      const headY = spineY[0];

      ctx.save();
      ctx.translate(headX, headY);

      const headSpan = 95 * cephalofoilWidth * sharkScale;
      ctx.beginPath();
      ctx.moveTo(-15 * sharkScale, -headSpan);
      ctx.quadraticCurveTo(-45 * sharkScale, 0, -15 * sharkScale, headSpan);
      ctx.lineTo(5 * sharkScale, headSpan * 0.85);
      ctx.quadraticCurveTo(-15 * sharkScale, 0, 5 * sharkScale, -headSpan * 0.85);
      ctx.closePath();

      ctx.fillStyle = '#090d18';
      ctx.fill();
      ctx.strokeStyle = hsla(210, 55, 52, 0.95);
      ctx.lineWidth = 2.4 * sharkScale;
      ctx.stroke();

      // Stereoscopic Wide-Set Lateral Eyes at Wing Tips
      for (let s = -1; s <= 1; s += 2) {
        ctx.fillStyle = '#0284c7';
        ctx.beginPath();
        ctx.arc(-14 * sharkScale, s * (headSpan - 6 * sharkScale), 4.5 * sharkScale, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#e0f2fe';
        ctx.lineWidth = 1.2;
        ctx.stroke();
      }
      ctx.restore();

      // 4. Tall Sickle-Shaped First Dorsal Fin
      const dorsalIdx = Math.floor(SPINE_NODES * 0.35);
      const dX = spineX[dorsalIdx];
      const dY = spineY[dorsalIdx] - (32 * sharkScale);

      ctx.beginPath();
      ctx.moveTo(dX - 25 * sharkScale, dY);
      ctx.quadraticCurveTo(dX - 10 * sharkScale, dY - 75 * sharkScale, dX + 15 * sharkScale, dY - 80 * sharkScale);
      ctx.quadraticCurveTo(dX + 5 * sharkScale, dY - 30 * sharkScale, dX + 30 * sharkScale, dY + 5 * sharkScale);
      ctx.closePath();
      ctx.fillStyle = '#090d18';
      ctx.fill();
      ctx.strokeStyle = hsla(215, 60, 50, 0.9);
      ctx.lineWidth = 2.0 * sharkScale;
      ctx.stroke();

      // 5. Heterocercal Caudal Tail Fin (Upper long lobe + lower short lobe)
      const tailIdx = SPINE_NODES - 1;
      const tX = spineX[tailIdx];
      const tY = spineY[tailIdx];

      ctx.beginPath();
      ctx.moveTo(tX, tY);
      // Tall upper lobe
      ctx.lineTo(tX + 55 * sharkScale, tY - 60 * sharkScale);
      ctx.lineTo(tX + 42 * sharkScale, tY - 45 * sharkScale);
      ctx.lineTo(tX + 20 * sharkScale, tY);
      // Lower lobe
      ctx.lineTo(tX + 40 * sharkScale, tY + 38 * sharkScale);
      ctx.lineTo(tX, tY);
      ctx.closePath();

      ctx.fillStyle = '#0f172a';
      ctx.fill();
      ctx.strokeStyle = hsla(210, 55, 48, 0.9);
      ctx.lineWidth = 2.0 * sharkScale;
      ctx.stroke();

      ctx.restore();
    },
  };
}
