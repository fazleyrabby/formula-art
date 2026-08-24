import type { ArtRenderer, ParameterState, RenderContext, TimeState } from '../../types/engine';
import { hsla } from '../common/color';

export function createCardiacPulse(): ArtRenderer {
  const MAX_HISTORY = 300;
  const ecgHistory = new Float32Array(MAX_HISTORY);
  let historyIdx = 0;

  // Synthesize standard P-QRS-T cardiac electrocardiogram pulse
  function ecgWaveform(phase: number): number {
    const p = phase % 1.0;
    // P wave (atrial depolarization)
    const pWave = 0.18 * Math.exp(-Math.pow((p - 0.2) / 0.04, 2));
    // Q wave
    const qWave = -0.15 * Math.exp(-Math.pow((p - 0.36) / 0.015, 2));
    // R wave (ventricular depolarization spike)
    const rWave = 1.0 * Math.exp(-Math.pow((p - 0.4) / 0.02, 2));
    // S wave
    const sWave = -0.3 * Math.exp(-Math.pow((p - 0.44) / 0.018, 2));
    // T wave (ventricular repolarization)
    const tWave = 0.35 * Math.exp(-Math.pow((p - 0.65) / 0.07, 2));

    return pWave + qWave + rWave + sWave + tWave;
  }

  return {
    setup() {
      ecgHistory.fill(0);
      historyIdx = 0;
    },

    render(context: RenderContext, timeState: TimeState, params: ParameterState) {
      const { ctx, width, height } = context;
      const bpm = Number(params.heartRateBPM || 72);
      const freq = bpm / 60; // Beats per second
      const t = timeState.time;
      const beatPhase = (t * freq) % 1.0;

      ctx.fillStyle = '#06070a';
      ctx.fillRect(0, 0, width, height);

      const cx = width * 0.5;
      const cy = height * 0.45;
      const heartScale = Math.min(width, height) / 480;

      // Current ECG voltage value
      const ecgVal = ecgWaveform(beatPhase);
      ecgHistory[historyIdx] = ecgVal;
      historyIdx = (historyIdx + 1) % MAX_HISTORY;

      // 1. Pulsing Heart Geometry (Cardioid Contraction)
      const pulseSize = 1 + ecgVal * 0.22;
      ctx.save();
      ctx.translate(cx, cy);
      ctx.scale(heartScale * pulseSize, heartScale * pulseSize);

      ctx.beginPath();
      const heartSteps = 100;
      for (let i = 0; i <= heartSteps; i++) {
        const phi = (i / heartSteps) * Math.PI * 2;
        // Classic mathematical 2D heart parametric curve
        const hx = 16 * Math.pow(Math.sin(phi), 3) * 6;
        const hy = -(13 * Math.cos(phi) - 5 * Math.cos(2 * phi) - 2 * Math.cos(3 * phi) - Math.cos(4 * phi)) * 6;

        if (i === 0) ctx.moveTo(hx, hy);
        else ctx.lineTo(hx, hy);
      }
      ctx.closePath();

      // Diastolic / Systolic contraction glow
      const heartHue = 350;
      ctx.fillStyle = hsla(heartHue, 90, 45, 0.3 + ecgVal * 0.4);
      ctx.fill();
      ctx.strokeStyle = hsla(355, 95, 70, 0.9);
      ctx.lineWidth = 3;
      ctx.stroke();

      // Aortic Arch & Coronary Arteries branching
      for (let side = -1; side <= 1; side += 2) {
        ctx.beginPath();
        ctx.moveTo(0, -90);
        ctx.bezierCurveTo(side * 45, -135, side * 75, -95, side * 50, -45);
        ctx.strokeStyle = hsla(15, 95, 65, 0.85);
        ctx.lineWidth = 4;
        ctx.stroke();
      }

      ctx.restore();

      // 2. Real-Time Lead-II Electrocardiogram (ECG) Monitor Trace
      const ecgY = height * 0.84;
      const traceW = width * 0.88;
      const startX = width * 0.06;

      ctx.beginPath();
      for (let i = 0; i < MAX_HISTORY; i++) {
        const sampleIdx = (historyIdx + i) % MAX_HISTORY;
        const px = startX + (i / MAX_HISTORY) * traceW;
        const py = ecgY - ecgHistory[sampleIdx] * 48;

        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }

      ctx.strokeStyle = '#34d399';
      ctx.lineWidth = 2.2;
      ctx.shadowColor = '#34d399';
      ctx.shadowBlur = 12;
      ctx.stroke();
      ctx.shadowBlur = 0;

      // Monitor grid lines
      ctx.strokeStyle = 'rgba(52, 211, 153, 0.15)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(startX, ecgY);
      ctx.lineTo(startX + traceW, ecgY);
      ctx.stroke();
    },
  };
}
