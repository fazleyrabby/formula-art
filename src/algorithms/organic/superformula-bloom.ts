import type { ArtRenderer, ParameterState, RenderContext, TimeState } from '../../types/engine';
import { hsla } from '../common/color';

// Gielis Superformula: r(phi) = ( |cos(m*phi/4)/a|^n2 + |sin(m*phi/4)/b|^n3 )^(-1/n1)
export function createSuperformulaBloom(): ArtRenderer {
  return {
    setup() {},

    render(context: RenderContext, timeState: TimeState, params: ParameterState) {
      const { ctx, width, height } = context;
      const t = timeState.time * Number(params.speed || 0.8);
      const m = Number(params.symmetry || 6) + Math.sin(t * 0.5) * 2;
      const n1 = Number(params.form1 || 0.3) + Math.sin(t * 0.8) * 0.15;
      const n2 = Number(params.form2 || 1.7) + Math.cos(t * 0.6) * 0.5;
      const n3 = Number(params.form3 || 1.7) + Math.sin(t * 0.7) * 0.5;
      const a = 1;
      const b = 1;

      ctx.fillStyle = 'rgba(8, 9, 13, 0.2)';
      ctx.fillRect(0, 0, width, height);

      const cx = width * 0.5;
      const cy = height * 0.5;
      const scale = Math.min(width, height) * 0.32;
      const steps = 720;

      for (let layer = 0; layer < 4; layer++) {
        const layerScale = scale * (1 - layer * 0.22);
        const layerOffset = layer * 0.4 + t * 0.3;

        ctx.beginPath();
        for (let i = 0; i <= steps; i++) {
          const phi = (i / steps) * Math.PI * 2;
          
          const part1 = Math.pow(Math.abs(Math.cos((m * phi) / 4) / a), n2);
          const part2 = Math.pow(Math.abs(Math.sin((m * phi) / 4) / b), n3);
          const r = Math.pow(part1 + part2, -1 / n1);

          const px = cx + r * layerScale * Math.cos(phi + layerOffset);
          const py = cy + r * layerScale * Math.sin(phi + layerOffset);

          if (i === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }

        ctx.closePath();
        const hue = (layer * 50 + t * 30 + 300) % 360;
        ctx.strokeStyle = hsla(hue, 85, 65, 0.7);
        ctx.lineWidth = 2 - layer * 0.3;
        ctx.stroke();
      }
    },
  };
}
