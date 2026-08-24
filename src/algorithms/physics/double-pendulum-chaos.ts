import type { ArtRenderer, ParameterState, RenderContext, TimeState } from '../../types/engine';
import { hsla } from '../common/color';

// Double Pendulum Lagrangian Mechanics & Chaos
// Euler-Lagrange coupled differential equations with real-time trajectory ribbon
// and live Phase Space (θ₁, dθ₁/dt) orbit study inset.
export function createDoublePendulum(): ArtRenderer {
  let th1 = Math.PI / 2;
  let th2 = Math.PI / 2;
  let w1 = 0;
  let w2 = 0;

  const g = 9.81;
  const l1 = 120;
  const l2 = 100;
  const m1 = 1.5;
  const m2 = 1.0;

  const TRAIL_MAX = 450;
  const trail: { x: number; y: number; energy: number }[] = [];
  const phaseSpace: { th1: number; w1: number }[] = [];

  return {
    setup() {
      th1 = Math.PI / 2;
      th2 = Math.PI / 2;
      w1 = 0;
      w2 = 0;
      trail.length = 0;
      phaseSpace.length = 0;
    },

    render(context: RenderContext, timeState: TimeState, params: ParameterState) {
      const { ctx, width, height } = context;
      const subSteps = 10;
      const dt = 0.02 / subSteps;

      ctx.fillStyle = 'rgba(2, 3, 7, 0.22)';
      ctx.fillRect(0, 0, width, height);

      const cx = width * 0.5;
      const cy = height * 0.38;
      const scale = Math.min(width, height) / 500;

      const curL1 = l1 * scale;
      const curL2 = l2 * scale;

      // Numerical integration of Euler-Lagrange equations
      for (let step = 0; step < subSteps; step++) {
        const delta = th1 - th2;

        const num1 = -g * (2 * m1 + m2) * Math.sin(th1) - m2 * g * Math.sin(th1 - 2 * th2) - 2 * Math.sin(delta) * m2 * (w2 * w2 * curL2 + w1 * w1 * curL1 * Math.cos(delta));
        const den1 = curL1 * (2 * m1 + m2 - m2 * Math.cos(2 * th1 - 2 * th2));
        const alpha1 = num1 / den1;

        const num2 = 2 * Math.sin(delta) * (w1 * w1 * curL1 * (m1 + m2) + g * (m1 + m2) * Math.cos(th1) + w2 * w2 * curL2 * m2 * Math.cos(delta));
        const den2 = curL2 * (2 * m1 + m2 - m2 * Math.cos(2 * th1 - 2 * th2));
        const alpha2 = num2 / den2;

        w1 += alpha1 * dt;
        w2 += alpha2 * dt;
        // Subtle damping
        w1 *= 0.99995;
        w2 *= 0.99995;
        th1 += w1 * dt;
        th2 += w2 * dt;
      }

      // Positions of Joint 1 and Tip 2
      const x1 = cx + curL1 * Math.sin(th1);
      const y1 = cy + curL1 * Math.cos(th1);

      const x2 = x1 + curL2 * Math.sin(th2);
      const y2 = y1 + curL2 * Math.cos(th2);

      trail.push({ x: x2, y: y2, energy: Math.abs(w1) + Math.abs(w2) });
      if (trail.length > TRAIL_MAX) trail.shift();

      phaseSpace.push({ th1: (th1 % (Math.PI * 2)), w1 });
      if (phaseSpace.length > 250) phaseSpace.shift();

      ctx.save();
      ctx.globalCompositeOperation = 'screen';

      // 1. Long Glowing Chaotic Tip Trajectory Ribbon
      if (trail.length > 2) {
        ctx.beginPath();
        for (let i = 0; i < trail.length; i++) {
          const pt = trail[i];
          if (i === 0) ctx.moveTo(pt.x, pt.y);
          else ctx.lineTo(pt.x, pt.y);
        }
        ctx.strokeStyle = '#38bdf8';
        ctx.lineWidth = 1.6;
        ctx.stroke();
      }

      // 2. Rigid Pendulum Rods & Bob Masses
      // Rod 1
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(x1, y1);
      ctx.strokeStyle = '#64748b';
      ctx.lineWidth = 3.0;
      ctx.stroke();

      // Bob 1
      ctx.fillStyle = '#0284c7';
      ctx.beginPath();
      ctx.arc(x1, y1, 8 * scale, 0, Math.PI * 2);
      ctx.fill();

      // Rod 2
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.strokeStyle = '#94a3b8';
      ctx.lineWidth = 2.4;
      ctx.stroke();

      // Bob 2 (Chaotic Tip)
      ctx.fillStyle = '#38bdf8';
      ctx.shadowColor = '#38bdf8';
      ctx.shadowBlur = 14;
      ctx.beginPath();
      ctx.arc(x2, y2, 10 * scale, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;

      // Anchor Pivot
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(cx, cy, 4, 0, Math.PI * 2);
      ctx.fill();

      // 3. Phase Space Inset Diagram (θ₁ vs dθ₁/dt)
      const insetX = width - 150;
      const insetY = height - 120;
      const insetW = 130;
      const insetH = 100;

      ctx.restore();
      ctx.save();
      ctx.fillStyle = 'rgba(15, 23, 42, 0.85)';
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.3)';
      ctx.lineWidth = 1;
      ctx.strokeRect(insetX, insetY, insetW, insetH);
      ctx.fillRect(insetX, insetY, insetW, insetH);

      ctx.font = '9px monospace';
      ctx.fillStyle = '#94a3b8';
      ctx.fillText('Phase Space (θ₁, ω₁)', insetX + 8, insetY + 14);

      if (phaseSpace.length > 2) {
        ctx.beginPath();
        for (let i = 0; i < phaseSpace.length; i++) {
          const pt = phaseSpace[i];
          const px = insetX + insetW * 0.5 + (pt.th1 / Math.PI) * (insetW * 0.38);
          const py = insetY + insetH * 0.5 - pt.w1 * 5;
          if (i === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        ctx.strokeStyle = '#f43f5e';
        ctx.lineWidth = 1.2;
        ctx.stroke();
      }

      // 4. Study HUD Equation Overlay
      ctx.font = '11px monospace';
      ctx.fillStyle = 'rgba(56, 189, 248, 0.9)';
      ctx.fillText(`Double Pendulum — Lagrangian Mechanics`, 20, 28);
      ctx.fillStyle = '#94a3b8';
      ctx.fillText(`L = T - V = 1/2(m₁+m₂)l₁²θ̇₁² + 1/2m₂l₂²θ̇₂² + m₂l₁l₂θ̇₁θ̇₂cos(θ₁-θ₂) + (m₁+m₂)gl₁cosθ₁ + m₂gl₂cosθ₂`, 20, 44);
      ctx.fillText(`θ₁: ${(th1 % (Math.PI * 2)).toFixed(2)} rad | θ₂: ${(th2 % (Math.PI * 2)).toFixed(2)} rad | Total E ≈ Constant`, 20, 60);
      ctx.restore();
    },
  };
}
