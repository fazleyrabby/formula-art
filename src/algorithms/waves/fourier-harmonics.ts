import type { ArtRenderer, ParameterState, RenderContext, TimeState } from '../../types/engine';
import { hsla } from '../common/color';

// Fourier Series Epicycles: Square/Sawtooth wave reconstruction from harmonic circles
export function createFourierHarmonics(): ArtRenderer {
  const MAX_HISTORY = 400;
  const historyY = new Float32Array(MAX_HISTORY);
  let historyCount = 0;

  return {
    setup() {
      historyCount = 0;
    },

    render(context: RenderContext, timeState: TimeState, params: ParameterState) {
      const { ctx, width, height } = context;
      const t = timeState.time * Number(params.speed || 1.2);
      const harmonics = Math.min(15, Number(params.harmonicCount || 7));
      const waveType = params.waveType || 'square';

      ctx.fillStyle = '#08090d';
      ctx.fillRect(0, 0, width, height);

      let x = width * 0.28;
      let y = height * 0.5;

      const baseRadius = Math.min(width, height) * 0.18;

      for (let i = 0; i < harmonics; i++) {
        const prevX = x;
        const prevY = y;

        const n = waveType === 'square' ? i * 2 + 1 : i + 1;
        const radius = waveType === 'square' ? baseRadius * (4 / (n * Math.PI)) : baseRadius * (2 / (n * Math.PI));

        x += radius * Math.cos(n * t);
        y += radius * Math.sin(n * t);

        // Draw harmonic circle
        ctx.strokeStyle = hsla((i * 35 + 200) % 360, 80, 60, 0.35);
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(prevX, prevY, radius, 0, Math.PI * 2);
        ctx.stroke();

        // Draw radius arm
        ctx.strokeStyle = hsla((i * 35 + 200) % 360, 90, 70, 0.7);
        ctx.beginPath();
        ctx.moveTo(prevX, prevY);
        ctx.lineTo(x, y);
        ctx.stroke();
      }

      // Record point
      if (historyCount < MAX_HISTORY) {
        historyY[historyCount++] = y;
      } else {
        // Shift
        for (let i = 0; i < MAX_HISTORY - 1; i++) {
          historyY[i] = historyY[i + 1];
        }
        historyY[MAX_HISTORY - 1] = y;
      }

      // Draw connecting laser line
      const waveStartX = width * 0.52;
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.5)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(waveStartX, y);
      ctx.stroke();

      // Draw reconstructed waveform
      ctx.beginPath();
      for (let i = 0; i < historyCount; i++) {
        const px = waveStartX + (i / MAX_HISTORY) * (width * 0.44);
        const py = historyY[historyCount - 1 - i];

        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.strokeStyle = hsla((t * 20 + 190) % 360, 95, 65, 0.9);
      ctx.lineWidth = 2.2;
      ctx.stroke();
    },
  };
}
