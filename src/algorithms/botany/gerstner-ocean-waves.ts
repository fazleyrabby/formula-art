import type { ArtRenderer, ParameterState, RenderContext, TimeState } from '../../types/engine';
import { hsla } from '../common/color';

// Trochoidal Gerstner Non-Linear Ocean Wave Superposition
export function createGerstnerOceanWaves(): ArtRenderer {
  const WAVE_LINES = 32;
  const POINTS_PER_LINE = 160;

  return {
    setup() {},

    render(context: RenderContext, timeState: TimeState, params: ParameterState) {
      const { ctx, width, height } = context;
      const speed = Number(params.waveSpeed || 1.2);
      const steepness = Number(params.steepness || 0.65);
      const t = timeState.time * speed;

      ctx.fillStyle = '#050a12';
      ctx.fillRect(0, 0, width, height);

      // 4 Directional Gerstner wave components (DirX, DirY, Wavelength, Amplitude, Speed)
      const waves = [
        { dx: 1.0, dy: 0.1, length: 140, amp: 26, s: 1.0 },
        { dx: 0.8, dy: 0.6, length: 85, amp: 14, s: 1.4 },
        { dx: 0.5, dy: -0.8, length: 50, amp: 8, s: 1.8 },
        { dx: -0.7, dy: 0.7, length: 30, amp: 4, s: 2.2 },
      ];

      for (let l = 0; l < WAVE_LINES; l++) {
        const normL = l / WAVE_LINES;
        const originY = height * 0.25 + normL * (height * 0.65);

        ctx.beginPath();
        for (let i = 0; i <= POINTS_PER_LINE; i++) {
          const normX = i / POINTS_PER_LINE;
          const x0 = normX * width;
          const y0 = originY;

          let displacedX = x0;
          let displacedY = y0;

          // Gerstner Displacement Sum
          for (let w = 0; w < waves.length; w++) {
            const wv = waves[w];
            const k = (2 * Math.PI) / wv.length;
            const wSpeed = Math.sqrt(9.8 * k) * wv.s;
            const phase = k * (wv.dx * x0 + wv.dy * y0) - wSpeed * t;

            // Trochoidal horizontal pinching & vertical crest peaking
            const q = steepness / (k * wv.amp * waves.length);
            displacedX -= (wv.dx / k) * (q * Math.sin(phase));
            displacedY -= wv.amp * Math.cos(phase);
          }

          if (i === 0) ctx.moveTo(displacedX, displacedY);
          else ctx.lineTo(displacedX, displacedY);
        }

        // Ocean depth color gradient: deep navy below, glowing turquoise crests
        const hue = (195 + normL * 35) % 360;
        const lightness = 40 + (1 - normL) * 35;
        ctx.strokeStyle = hsla(hue, 90, lightness, 0.75);
        ctx.lineWidth = 1.6 - normL * 0.6;
        ctx.stroke();
      }
    },
  };
}
