import type { ArtRenderer, ParameterState, RenderContext, TimeState } from '../../types/engine';
import { hsla } from '../common/color';
import { project3D } from '../common/projection3d';

// Lorenz Strange Attractor & Chaos Theory (dx/dt, dy/dt, dz/dt)
// Demonstrates sensitive dependence on initial conditions (Butterfly Effect),
// dual-wing orbital manifolds, Lyapunov divergence, and Runge-Kutta numerical integration.
export function createLorenzAttractor(): ArtRenderer {
  const TRAIL_LENGTH = 1200;
  let trailA: { x: number; y: number; z: number }[] = [];
  let trailB: { x: number; y: number; z: number }[] = [];

  let stateA = { x: 0.1, y: 0.0, z: 0.0 };
  let stateB = { x: 0.10001, y: 0.0, z: 0.0 }; // Epsilon perturbation 10^-5

  return {
    setup() {
      trailA = [];
      trailB = [];
      stateA = { x: 0.1, y: 0.0, z: 0.0 };
      stateB = { x: 0.10001, y: 0.0, z: 0.0 };
    },

    render(context: RenderContext, timeState: TimeState, params: ParameterState) {
      const { ctx, width, height } = context;
      const sigma = Number(params.sigma || 10.0);
      const rho = Number(params.rho || 28.0);
      const beta = Number(params.beta || 8 / 3);
      const t = timeState.time;

      ctx.fillStyle = 'rgba(2, 3, 7, 0.25)';
      ctx.fillRect(0, 0, width, height);

      const cx = width * 0.5;
      const cy = height * 0.52;
      const scale = Math.min(width, height) * 0.016;

      // Integrate multiple sub-steps per frame for smooth chaotic evolution
      const dt = 0.008;
      const subSteps = 6;

      function lorenzDerivs(s: { x: number; y: number; z: number }) {
        return {
          dx: sigma * (s.y - s.x),
          dy: s.x * (rho - s.z) - s.y,
          dz: s.x * s.y - beta * s.z,
        };
      }

      for (let step = 0; step < subSteps; step++) {
        // RK4 Integration for Particle A
        const dA1 = lorenzDerivs(stateA);
        const kA2 = {
          x: stateA.x + dA1.dx * dt * 0.5,
          y: stateA.y + dA1.dy * dt * 0.5,
          z: stateA.z + dA1.dz * dt * 0.5,
        };
        const dA2 = lorenzDerivs(kA2);
        const kA3 = {
          x: stateA.x + dA2.dx * dt * 0.5,
          y: stateA.y + dA2.dy * dt * 0.5,
          z: stateA.z + dA2.dz * dt * 0.5,
        };
        const dA3 = lorenzDerivs(kA3);
        const kA4 = {
          x: stateA.x + dA3.dx * dt,
          y: stateA.y + dA3.dy * dt,
          z: stateA.z + dA3.dz * dt,
        };
        const dA4 = lorenzDerivs(kA4);

        stateA.x += (dA1.dx + 2 * dA2.dx + 2 * dA3.dx + dA4.dx) * (dt / 6);
        stateA.y += (dA1.dy + 2 * dA2.dy + 2 * dA3.dy + dA4.dy) * (dt / 6);
        stateA.z += (dA1.dz + 2 * dA2.dz + 2 * dA3.dz + dA4.dz) * (dt / 6);

        // Particle B
        const dB1 = lorenzDerivs(stateB);
        stateB.x += dB1.dx * dt;
        stateB.y += dB1.dy * dt;
        stateB.z += dB1.dz * dt;

        trailA.push({ ...stateA });
        trailB.push({ ...stateB });

        if (trailA.length > TRAIL_LENGTH) trailA.shift();
        if (trailB.length > TRAIL_LENGTH) trailB.shift();
      }

      // Camera Rotation in 3D Phase Space
      const rotY = t * 0.4;
      const rotX = 0.45;
      const rotZ = 0;

      ctx.save();
      ctx.globalCompositeOperation = 'screen';

      // 1. Particle A Trajectory Ribbon (Cyan Butterfly Lobe)
      if (trailA.length > 2) {
        ctx.beginPath();
        for (let i = 0; i < trailA.length; i++) {
          const pt = trailA[i];
          const rawX = pt.x * scale * 25;
          const rawY = -(pt.z - 25) * scale * 25; // center z
          const rawZ = pt.y * scale * 25;

          const p = project3D(rawX, rawY, rawZ, rotX, rotY, rotZ, cx, cy, 450, 520);
          if (i === 0) ctx.moveTo(p.x, p.y);
          else ctx.lineTo(p.x, p.y);
        }
        ctx.strokeStyle = '#38bdf8';
        ctx.lineWidth = 1.6;
        ctx.stroke();
      }

      // 2. Particle B Trajectory Ribbon (Magenta Divergence Probe)
      if (trailB.length > 2) {
        ctx.beginPath();
        for (let i = 0; i < trailB.length; i++) {
          const pt = trailB[i];
          const rawX = pt.x * scale * 25;
          const rawY = -(pt.z - 25) * scale * 25;
          const rawZ = pt.y * scale * 25;

          const p = project3D(rawX, rawY, rawZ, rotX, rotY, rotZ, cx, cy, 450, 520);
          if (i === 0) ctx.moveTo(p.x, p.y);
          else ctx.lineTo(p.x, p.y);
        }
        ctx.strokeStyle = '#f43f5e';
        ctx.lineWidth = 1.4;
        ctx.stroke();
      }

      // Current Particle Positions
      const pA = project3D(stateA.x * scale * 25, -(stateA.z - 25) * scale * 25, stateA.y * scale * 25, rotX, rotY, rotZ, cx, cy, 450, 520);
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(pA.x, pA.y, 4.5, 0, Math.PI * 2);
      ctx.fill();

      const pB = project3D(stateB.x * scale * 25, -(stateB.z - 25) * scale * 25, stateB.y * scale * 25, rotX, rotY, rotZ, cx, cy, 450, 520);
      ctx.fillStyle = '#f43f5e';
      ctx.beginPath();
      ctx.arc(pB.x, pB.y, 4.5, 0, Math.PI * 2);
      ctx.fill();

      // Current Divergence Distance Δx(t)
      const divergenceDist = Math.hypot(stateA.x - stateB.x, stateA.y - stateB.y, stateA.z - stateB.z);

      // 3. Educational Study HUD
      ctx.restore();
      ctx.save();
      ctx.font = '11px monospace';
      ctx.fillStyle = 'rgba(56, 189, 248, 0.9)';
      ctx.fillText(`Lorenz Strange Attractor — Chaos Theory`, 20, 28);
      ctx.fillStyle = '#94a3b8';
      ctx.fillText(`dx/dt = σ(y - x) | dy/dt = x(ρ - z) - y | dz/dt = xy - βz`, 20, 44);
      ctx.fillText(`Parameters: σ=${sigma.toFixed(1)}, ρ=${rho.toFixed(1)}, β=${beta.toFixed(2)}`, 20, 60);

      // Divergence metric
      ctx.fillStyle = divergenceDist > 1.0 ? '#f43f5e' : '#34d399';
      ctx.fillText(`Lyapunov Divergence Δ(t): ${divergenceDist.toFixed(4)} (Initial Δ₀ = 10⁻⁵)`, 20, 76);
      ctx.restore();
    },
  };
}
