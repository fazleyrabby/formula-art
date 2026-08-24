import type { ArtRenderer, ParameterState, RenderContext, TimeState } from '../../types/engine';
import { hsla } from '../common/color';

export function createCoralPolypGrowth(): ArtRenderer {
  const POLYP_COUNT = 8;
  const TENTACLES_PER_POLYP = 12;

  return {
    setup() {},

    render(context: RenderContext, timeState: TimeState, params: ParameterState) {
      const { ctx, width, height } = context;
      const speed = Number(params.flowSpeed || 0.8);
      const bloomScale = Number(params.bloomScale || 1.1);
      const t = timeState.time * speed;

      ctx.fillStyle = '#06080e';
      ctx.fillRect(0, 0, width, height);

      const cx = width * 0.5;
      const cy = height * 0.52;
      const baseR = Math.min(width, height) * 0.28;

      // 1. Central Coral Colony Ridge
      ctx.beginPath();
      const ridgeSteps = 120;
      for (let i = 0; i <= ridgeSteps; i++) {
        const phi = (i / ridgeSteps) * Math.PI * 2;
        const bump = Math.sin(phi * 6 + t * 0.5) * 12 + Math.cos(phi * 12 - t) * 6;
        const r = (baseR * 0.6 + bump) * bloomScale;
        const px = cx + Math.cos(phi) * r;
        const py = cy + Math.sin(phi) * r;
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.closePath();
      ctx.fillStyle = hsla(330, 85, 45, 0.4);
      ctx.fill();
      ctx.strokeStyle = hsla(340, 95, 70, 0.8);
      ctx.lineWidth = 2.2;
      ctx.stroke();

      // 2. Blooming Polyps around the ring
      for (let p = 0; p < POLYP_COUNT; p++) {
        const polypAngle = (p / POLYP_COUNT) * Math.PI * 2 + t * 0.1;
        const polypDist = baseR * (0.8 + 0.15 * Math.sin(t * 1.5 + p));
        const px = cx + Math.cos(polypAngle) * polypDist;
        const py = cy + Math.sin(polypAngle) * polypDist;

        // Polyp Mouth Disk
        ctx.beginPath();
        ctx.arc(px, py, 6 * bloomScale, 0, Math.PI * 2);
        ctx.fillStyle = hsla(50, 95, 75, 0.95);
        ctx.fill();

        // Radially radiating feather tentacles
        for (let k = 0; k < TENTACLES_PER_POLYP; k++) {
          const tentAngle = (k / TENTACLES_PER_POLYP) * Math.PI * 2;
          const tentLen = (28 + Math.sin(t * 3 + p + k) * 8) * bloomScale;

          ctx.beginPath();
          ctx.moveTo(px, py);

          // Undulating wave along polyp tentacle
          const wavePhase = t * 4 + k * 0.5 + p;
          const ctrlX = px + Math.cos(tentAngle) * (tentLen * 0.5) + Math.sin(wavePhase) * 6;
          const ctrlY = py + Math.sin(tentAngle) * (tentLen * 0.5) + Math.cos(wavePhase) * 6;
          const endX = px + Math.cos(tentAngle) * tentLen;
          const endY = py + Math.sin(tentAngle) * tentLen;

          ctx.quadraticCurveTo(ctrlX, ctrlY, endX, endY);

          const tentHue = (320 + p * 15 + k * 4) % 360;
          ctx.strokeStyle = hsla(tentHue, 95, 72, 0.85);
          ctx.lineWidth = 1.4;
          ctx.stroke();
        }
      }
    },
  };
}
