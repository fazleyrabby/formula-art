import type { ArtRenderer, ParameterState, RenderContext, TimeState } from '../../types/engine';
import { hsla } from '../common/color';

export function createOrganicWave(): ArtRenderer {
  let gridPointsX = 0;
  let gridPointsY = 0;
  const spacing = 14;

  return {
    setup(context: RenderContext) {
      gridPointsX = Math.ceil(context.width / spacing) + 2;
      gridPointsY = Math.ceil(context.height / spacing) + 2;
    },

    render(context: RenderContext, timeState: TimeState, params: ParameterState) {
      const { ctx, width, height } = context;
      const t = timeState.time * Number(params.speed || 1.0);
      const freq = Number(params.frequency || 0.02);
      const amp = Number(params.amplitude || 35);
      const hueBase = Number(params.hue || 195);

      // Dark fade for trail effect
      ctx.fillStyle = 'rgba(8, 9, 13, 0.25)';
      ctx.fillRect(0, 0, width, height);

      const cx = width * 0.5;
      const cy = height * 0.5;

      for (let y = 0; y < gridPointsY; y++) {
        const py = (y - 1) * spacing;
        ctx.beginPath();

        for (let x = 0; x < gridPointsX; x++) {
          const px = (x - 1) * spacing;
          
          const dx = px - cx;
          const dy = py - cy;
          const d = Math.sqrt(dx * dx + dy * dy);

          // Combined wave mathematical transformation
          const wave1 = Math.sin(px * freq + t) * Math.cos(py * freq * 0.7 + t * 0.5);
          const wave2 = Math.sin(d * freq * 1.5 - t * 2.0) * 0.5;
          const offset = (wave1 + wave2) * amp;

          const renderX = px + (dx / (d + 1)) * offset * 0.3;
          const renderY = py + offset;

          if (x === 0) {
            ctx.moveTo(renderX, renderY);
          } else {
            ctx.lineTo(renderX, renderY);
          }
        }

        const normY = y / gridPointsY;
        const hue = (hueBase + normY * 60 + Math.sin(t) * 20) % 360;
        ctx.strokeStyle = hsla(hue, 85, 60, 0.5);
        ctx.lineWidth = 1.2;
        ctx.stroke();
      }
    },
  };
}
