import type { ArtRenderer, ParameterState, RenderContext, TimeState } from '../../types/engine';
import { hsla } from '../common/color';

// Continuous SmoothLife-inspired multi-ring cellular automata kernel
export function createContinuousCellularAutomata(): ArtRenderer {
  const SIZE = 40;
  const state = new Float32Array(SIZE * SIZE);
  const nextState = new Float32Array(SIZE * SIZE);

  return {
    setup() {
      for (let i = 0; i < SIZE * SIZE; i++) {
        state[i] = Math.random() > 0.6 ? Math.random() : 0;
      }
    },

    render(context: RenderContext, timeState: TimeState, _params: ParameterState) {
      const { ctx, width, height } = context;
      const cellW = width / SIZE;
      const cellH = height / SIZE;
      const t = timeState.time;

      ctx.fillStyle = '#08090d';
      ctx.fillRect(0, 0, width, height);

      // Transition step
      for (let y = 0; y < SIZE; y++) {
        for (let x = 0; x < SIZE; x++) {
          const idx = y * SIZE + x;
          let sum = 0;
          let count = 0;

          for (let dy = -1; dy <= 1; dy++) {
            for (let dx = -1; dx <= 1; dx++) {
              if (dx === 0 && dy === 0) continue;
              const nx = (x + dx + SIZE) % SIZE;
              const ny = (y + dy + SIZE) % SIZE;
              sum += state[ny * SIZE + nx];
              count++;
            }
          }

          const avg = sum / count;
          const current = state[idx];

          // Continuous smooth transition function
          if (avg >= 0.25 && avg <= 0.45) {
            nextState[idx] = Math.min(1, current + 0.08);
          } else {
            nextState[idx] = Math.max(0, current - 0.05);
          }

          // Spontaneous quantum perturbation
          if (Math.random() < 0.001) {
            nextState[idx] = 1;
          }
        }
      }

      // Render & swap
      for (let y = 0; y < SIZE; y++) {
        for (let x = 0; x < SIZE; x++) {
          const idx = y * SIZE + x;
          state[idx] = nextState[idx];

          if (state[idx] > 0.05) {
            const px = x * cellW;
            const py = y * cellH;
            const val = state[idx];
            const hue = (160 + val * 120 + t * 15) % 360;

            ctx.fillStyle = hsla(hue, 90, 60, val * 0.9);
            ctx.beginPath();
            ctx.arc(px + cellW * 0.5, py + cellH * 0.5, (cellW * 0.45) * val, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }
    },
  };
}
