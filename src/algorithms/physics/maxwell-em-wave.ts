import type { ArtRenderer, ParameterState, RenderContext, TimeState } from '../../types/engine';
import { hsla } from '../common/color';
import { project3D } from '../common/projection3d';

// Maxwell's Electromagnetic Wave Propagation
// 3D Visualization of Transverse Orthogonal Electric (E) & Magnetic (B) Field Vectors
// and Poynting Energy Flow Vector S = 1/μ₀ (E × B) based on Maxwell's equations.
export function createMaxwellEMWave(): ArtRenderer {
  const NODE_COUNT = 38;

  return {
    setup() {},

    render(context: RenderContext, timeState: TimeState, params: ParameterState) {
      const { ctx, width, height } = context;
      const waveFreq = Number(params.frequency || 1.2);
      const waveAmp = Number(params.amplitude || 1.0);
      const t = timeState.time * waveFreq;

      ctx.fillStyle = '#020308';
      ctx.fillRect(0, 0, width, height);

      const cx = width * 0.5;
      const cy = height * 0.52;
      const scale = Math.min(width, height) / 480;

      // 3D Isometric View
      const rotY = 0.55 + Math.sin(t * 0.2) * 0.1;
      const rotX = 0.38;
      const rotZ = 0;

      ctx.save();
      ctx.globalCompositeOperation = 'screen';

      const totalLength = 360 * scale;
      const k = 0.025; // wave number

      // 1. Central Propagation Axis (z-axis / Poynting Vector S)
      const pAxisStart = project3D(-totalLength * 0.5, 0, 0, rotX, rotY, rotZ, cx, cy, 450, 520);
      const pAxisEnd = project3D(totalLength * 0.5, 0, 0, rotX, rotY, rotZ, cx, cy, 450, 520);

      ctx.beginPath();
      ctx.moveTo(pAxisStart.x, pAxisStart.y);
      ctx.lineTo(pAxisEnd.x, pAxisEnd.y);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
      ctx.lineWidth = 1.6;
      ctx.stroke();

      // Poynting Vector Arrow Head S at propagation tip
      ctx.fillStyle = '#fbbf24';
      ctx.beginPath();
      ctx.arc(pAxisEnd.x, pAxisEnd.y, 5 * scale, 0, Math.PI * 2);
      ctx.fill();

      // 2. Transverse E-Field (Electric Vectors, Cyan along y-axis)
      ctx.beginPath();
      for (let i = 0; i < NODE_COUNT; i++) {
        const normI = i / (NODE_COUNT - 1);
        const xPos = (normI - 0.5) * totalLength;
        const eField = Math.sin(xPos * k - t * 3.5) * (70 * waveAmp * scale);

        const pBase = project3D(xPos, 0, 0, rotX, rotY, rotZ, cx, cy, 450, 520);
        const pTip = project3D(xPos, eField, 0, rotX, rotY, rotZ, cx, cy, 450, 520);

        // Vector Arrow Line
        ctx.moveTo(pBase.x, pBase.y);
        ctx.lineTo(pTip.x, pTip.y);

        // Arrow tip node
        ctx.fillStyle = '#38bdf8';
        ctx.fillRect(pTip.x - 1.5, pTip.y - 1.5, 3, 3);
      }
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 1.6;
      ctx.stroke();

      // Continuous E-Field Envelope Sine Curve
      ctx.beginPath();
      for (let x = -totalLength * 0.5; x <= totalLength * 0.5; x += 4) {
        const eField = Math.sin(x * k - t * 3.5) * (70 * waveAmp * scale);
        const p = project3D(x, eField, 0, rotX, rotY, rotZ, cx, cy, 450, 520);
        if (x === -totalLength * 0.5) ctx.moveTo(p.x, p.y);
        else ctx.lineTo(p.x, p.y);
      }
      ctx.strokeStyle = '#38bdf8';
      ctx.shadowColor = '#38bdf8';
      ctx.shadowBlur = 10;
      ctx.lineWidth = 2.2;
      ctx.stroke();
      ctx.shadowBlur = 0;

      // 3. Transverse B-Field (Magnetic Vectors, Magenta along z-axis)
      ctx.beginPath();
      for (let i = 0; i < NODE_COUNT; i++) {
        const normI = i / (NODE_COUNT - 1);
        const xPos = (normI - 0.5) * totalLength;
        const bField = Math.sin(xPos * k - t * 3.5) * (70 * waveAmp * scale);

        const pBase = project3D(xPos, 0, 0, rotX, rotY, rotZ, cx, cy, 450, 520);
        const pTip = project3D(xPos, 0, bField, rotX, rotY, rotZ, cx, cy, 450, 520);

        ctx.moveTo(pBase.x, pBase.y);
        ctx.lineTo(pTip.x, pTip.y);

        ctx.fillStyle = '#f43f5e';
        ctx.fillRect(pTip.x - 1.5, pTip.y - 1.5, 3, 3);
      }
      ctx.strokeStyle = '#f43f5e';
      ctx.lineWidth = 1.6;
      ctx.stroke();

      // Continuous B-Field Envelope Sine Curve
      ctx.beginPath();
      for (let x = -totalLength * 0.5; x <= totalLength * 0.5; x += 4) {
        const bField = Math.sin(x * k - t * 3.5) * (70 * waveAmp * scale);
        const p = project3D(x, 0, bField, rotX, rotY, rotZ, cx, cy, 450, 520);
        if (x === -totalLength * 0.5) ctx.moveTo(p.x, p.y);
        else ctx.lineTo(p.x, p.y);
      }
      ctx.strokeStyle = '#f43f5e';
      ctx.shadowColor = '#f43f5e';
      ctx.shadowBlur = 10;
      ctx.lineWidth = 2.2;
      ctx.stroke();
      ctx.shadowBlur = 0;

      // 4. Study HUD Equations
      ctx.restore();
      ctx.save();
      ctx.font = '11px monospace';
      ctx.fillStyle = 'rgba(56, 189, 248, 0.9)';
      ctx.fillText(`Maxwell's Equations — Electromagnetic Wave Propagation`, 20, 28);
      ctx.fillStyle = '#94a3b8';
      ctx.fillText(`∇ × E = -∂B/∂t  |  ∇ × B = μ₀ε₀ ∂E/∂t  |  c = 1/√(μ₀ε₀)`, 20, 44);
      ctx.fillText(`Electric Vector E(x,t) [Cyan] ⊥ Magnetic Vector B(x,t) [Rose] ⊥ Poynting Vector S [Gold]`, 20, 60);
      ctx.restore();
    },
  };
}
