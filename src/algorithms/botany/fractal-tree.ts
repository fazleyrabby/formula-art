import type { ArtRenderer, ParameterState, RenderContext, TimeState } from '../../types/engine';
import { hsla } from '../common/color';

export function createFractalTree(): ArtRenderer {
  function drawBranch(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    length: number,
    angle: number,
    depth: number,
    branchRatio: number,
    wind: number,
    time: number
  ) {
    if (depth <= 0) {
      // Draw terminal leaf cluster bud
      const leafHue = (110 + Math.sin(time + x * 0.01) * 30) % 360;
      ctx.fillStyle = hsla(leafHue, 85, 60, 0.85);
      ctx.beginPath();
      ctx.arc(x, y, 3.5, 0, Math.PI * 2);
      ctx.fill();
      return;
    }

    const endX = x + Math.cos(angle) * length;
    const endY = y + Math.sin(angle) * length;

    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(endX, endY);
    
    // Bark gradient from brown/amber at trunk to vibrant emerald at twigs
    const branchHue = depth > 5 ? 30 : 90 + depth * 8;
    ctx.strokeStyle = hsla(branchHue, 75, depth > 5 ? 35 : 55, 0.9);
    ctx.lineWidth = Math.max(1, depth * 1.5);
    ctx.stroke();

    const branchAngle = 0.42 + wind * 0.15;
    const nextLen = length * branchRatio;

    // Left branch
    drawBranch(ctx, endX, endY, nextLen, angle - branchAngle + wind * 0.08, depth - 1, branchRatio, wind, time);
    // Right branch
    drawBranch(ctx, endX, endY, nextLen, angle + branchAngle + wind * 0.08, depth - 1, branchRatio, wind, time);
  }

  return {
    setup() {},

    render(context: RenderContext, timeState: TimeState, params: ParameterState) {
      const { ctx, width, height } = context;
      const depth = Math.min(9, Number(params.branchDepth || 8));
      const branchRatio = Number(params.branchRatio || 0.72);
      const windSpeed = Number(params.windSpeed || 1.2);
      const t = timeState.time * windSpeed;

      ctx.fillStyle = '#06090c';
      ctx.fillRect(0, 0, width, height);

      const trunkX = width * 0.5;
      const trunkY = height * 0.92;
      const trunkLength = height * 0.22;

      // Harmonic wind gust oscillation
      const wind = Math.sin(t * 1.8) * 0.35 + Math.sin(t * 0.7) * 0.2;

      drawBranch(ctx, trunkX, trunkY, trunkLength, -Math.PI / 2, depth, branchRatio, wind, t);
    },
  };
}
