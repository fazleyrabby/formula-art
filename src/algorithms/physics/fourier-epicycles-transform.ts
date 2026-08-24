import type { ArtRenderer, ParameterState, RenderContext, TimeState } from '../../types/engine';
import { hsla } from '../common/color';

// Complex Fourier Transform & Epicycle Phasor Decomposition
// Demonstrates how any complex closed curve in C can be reconstructed
// as a sum of rotating complex exponential phasors: f(t) = ∑ c_k e^{i k ω t}.
export function createFourierEpicycles(): ArtRenderer {
  // Pre-calculated Fourier coefficients for an intricate closed mathematical loop
  const N_MAX = 24;
  const harmonics: { k: number; radius: number; phase: number }[] = [];

  // Generate odd-harmonic square/cardioid series
  for (let k = 1; k <= N_MAX; k++) {
    const freq = (k % 2 === 1) ? k : -k;
    const r = (110 / Math.abs(freq)) * (1 / (1 + Math.abs(freq) * 0.05));
    harmonics.push({ k: freq, radius: r, phase: (k * 0.4) });
  }

  // Sort by radius descending
  harmonics.sort((a, b) => b.radius - a.radius);

  const drawnTrail: { x: number; y: number }[] = [];

  return {
    setup() {
      drawnTrail.length = 0;
    },

    render(context: RenderContext, timeState: TimeState, params: ParameterState) {
      const { ctx, width, height } = context;
      const terms = Math.min(harmonics.length, Math.floor(Number(params.termsCount || 16)));
      const rotSpeed = Number(params.cycleSpeed || 0.6);
      const t = timeState.time * rotSpeed;

      ctx.fillStyle = '#020409';
      ctx.fillRect(0, 0, width, height);

      const cx = width * 0.46;
      const cy = height * 0.5;

      let curX = cx;
      let curY = cy;

      ctx.save();
      ctx.globalCompositeOperation = 'screen';

      // 1. Chain of Rotating Phasor Circles (Epicycle Gears)
      for (let i = 0; i < terms; i++) {
        const h = harmonics[i];
        const prevX = curX;
        const prevY = curY;

        const theta = h.k * t + h.phase;
        curX += h.radius * Math.cos(theta);
        curY += h.radius * Math.sin(theta);

        // Circular Epicycle Track
        ctx.beginPath();
        ctx.arc(prevX, prevY, h.radius, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(56, 189, 248, 0.2)';
        ctx.lineWidth = 1.0;
        ctx.stroke();

        // Phasor Vector Arrow
        ctx.beginPath();
        ctx.moveTo(prevX, prevY);
        ctx.lineTo(curX, curY);
        ctx.strokeStyle = 'rgba(56, 189, 248, 0.7)';
        ctx.lineWidth = 1.4;
        ctx.stroke();

        // Pivot Node
        ctx.fillStyle = '#38bdf8';
        ctx.beginPath();
        ctx.arc(curX, curY, 2.5, 0, Math.PI * 2);
        ctx.fill();
      }

      drawnTrail.push({ x: curX, y: curY });
      if (drawnTrail.length > 550) drawnTrail.shift();

      // 2. Reconstructed Continuous Fourier Curve
      if (drawnTrail.length > 2) {
        ctx.beginPath();
        for (let i = 0; i < drawnTrail.length; i++) {
          const pt = drawnTrail[i];
          if (i === 0) ctx.moveTo(pt.x, pt.y);
          else ctx.lineTo(pt.x, pt.y);
        }
        ctx.strokeStyle = '#f43f5e';
        ctx.shadowColor = '#f43f5e';
        ctx.shadowBlur = 12;
        ctx.lineWidth = 2.4;
        ctx.stroke();
        ctx.shadowBlur = 0;
      }

      // 3. Live Frequency Spectrum Amplitude Bars Inset
      const specX = width - 150;
      const specY = height - 120;
      const specW = 130;
      const specH = 95;

      ctx.restore();
      ctx.save();
      ctx.fillStyle = 'rgba(15, 23, 42, 0.85)';
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.3)';
      ctx.lineWidth = 1;
      ctx.strokeRect(specX, specY, specW, specH);
      ctx.fillRect(specX, specY, specW, specH);

      ctx.font = '9px monospace';
      ctx.fillStyle = '#94a3b8';
      ctx.fillText('Fourier Spectrum |c_k|', specX + 8, specY + 14);

      const barWidth = Math.max(3, (specW - 20) / terms);
      for (let k = 0; k < terms; k++) {
        const barH = (harmonics[k].radius / harmonics[0].radius) * 60;
        const bx = specX + 10 + k * barWidth;
        const by = specY + specH - 10 - barH;

        ctx.fillStyle = '#38bdf8';
        ctx.fillRect(bx, by, barWidth - 1, barH);
      }

      // 4. Study HUD Equations
      ctx.font = '11px monospace';
      ctx.fillStyle = 'rgba(56, 189, 248, 0.9)';
      ctx.fillText(`Fourier Transform & Epicycles — Complex Analysis`, 20, 28);
      ctx.fillStyle = '#94a3b8';
      ctx.fillText(`f(t) = ∑_{k=-N}^N c_k e^{i k ω t} | c_k = 1/T ∫_0^T f(t) e^{-i k ω t} dt`, 20, 44);
      ctx.fillText(`Active Epicycle Phasors: ${terms} harmonic modes | Reconstruction Error → 0`, 20, 60);
      ctx.restore();
    },
  };
}
