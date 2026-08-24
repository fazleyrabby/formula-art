import type { ArtRenderer, ParameterState, RenderContext, TimeState } from '../../types/engine';
import { hsla } from '../common/color';

// Equiangular Logarithmic Spiral: r = a * exp(b * theta)
export function createNautilusSpiral(): ArtRenderer {
  return {
    setup() {},

    render(context: RenderContext, timeState: TimeState, params: ParameterState) {
      const { ctx, width, height } = context;
      const speed = Number(params.spinSpeed || 0.4);
      const b = Number(params.spiralGrowth || 0.1759); // Golden logarithmic constant
      const chamberCount = Number(params.chamberCount || 36);
      const t = timeState.time * speed;

      ctx.fillStyle = '#05070c';
      ctx.fillRect(0, 0, width, height);

      const cx = width * 0.52;
      const cy = height * 0.52;
      const a = 3.5;
      const totalRotations = 4.2;
      const maxTheta = totalRotations * Math.PI * 2;

      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(t * 0.2);

      // 1. Continuous Logarithmic Outer & Inner Shell Walls
      ctx.beginPath();
      const curveSteps = 400;
      for (let i = 0; i <= curveSteps; i++) {
        const theta = (i / curveSteps) * maxTheta;
        const r = a * Math.exp(b * theta);
        const px = r * Math.cos(theta);
        const py = r * Math.sin(theta);
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.strokeStyle = hsla(38, 90, 60, 0.85);
      ctx.lineWidth = 2.2;
      ctx.stroke();

      // 2. Internal Septa Partitions (Chamber Walls)
      for (let c = 1; c <= chamberCount; c++) {
        const theta1 = (c / chamberCount) * maxTheta;
        const theta2 = theta1 - Math.PI * 2; // Previous inner whorl

        const rOuter = a * Math.exp(b * theta1);
        const rInner = theta2 > 0 ? a * Math.exp(b * theta2) : 0;

        const outX = rOuter * Math.cos(theta1);
        const outY = rOuter * Math.sin(theta1);
        const inX = rInner * Math.cos(theta1 - 0.35);
        const inY = rInner * Math.sin(theta1 - 0.35);

        // Curved septum arch
        const midR = (rOuter + rInner) * 0.5;
        const ctrlX = midR * Math.cos(theta1 + 0.25);
        const ctrlY = midR * Math.sin(theta1 + 0.25);

        ctx.beginPath();
        ctx.moveTo(inX, inY);
        ctx.quadraticCurveTo(ctrlX, ctrlY, outX, outY);

        const chamberHue = (c * 8 + t * 25 + 175) % 360;
        ctx.strokeStyle = hsla(chamberHue, 85, 65, 0.65);
        ctx.lineWidth = 1.3;
        ctx.stroke();

        // Shimmering Mother-of-Pearl Chamber Fill
        if (c % 2 === 0) {
          ctx.fillStyle = hsla(chamberHue, 90, 50, 0.08);
          ctx.fill();
        }
      }

      // 3. Central Siphuncle Tube Canal
      ctx.beginPath();
      for (let i = 0; i <= curveSteps; i += 4) {
        const theta = (i / curveSteps) * maxTheta;
        const r = a * Math.exp(b * theta) * 0.55;
        const px = r * Math.cos(theta);
        const py = r * Math.sin(theta);
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.4)';
      ctx.lineWidth = 1.0;
      ctx.stroke();

      ctx.restore();
    },
  };
}
