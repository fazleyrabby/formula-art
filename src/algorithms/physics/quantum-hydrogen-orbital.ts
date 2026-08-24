import type { ArtRenderer, ParameterState, RenderContext, TimeState } from '../../types/engine';
import { hsla } from '../common/color';
import { project3D } from '../common/projection3d';

// Quantum Hydrogen Orbital Wavefunction (|ψ_nlm(r, θ, φ)|^2)
// Visualizes electron probability density cloud, spherical harmonics Y_l^m,
// nodal boundary surfaces, and quantum state transitions for educational study.
export function createQuantumHydrogenOrbital(): ArtRenderer {
  const POINT_COUNT = 800;

  // Pre-generate pseudo-random distribution points on unit spheres
  const samples: { u: number; v: number; radMod: number; phase: number }[] = [];
  for (let i = 0; i < POINT_COUNT; i++) {
    samples.push({
      u: Math.random() * Math.PI * 2,
      v: Math.acos(2 * Math.random() - 1),
      radMod: 0.2 + Math.random() * 0.8,
      phase: Math.random() * Math.PI * 2,
    });
  }

  return {
    setup() {},

    render(context: RenderContext, timeState: TimeState, params: ParameterState) {
      const { ctx, width, height } = context;
      const quantumN = Math.floor(Number(params.principalN || 3)); // n: 1, 2, 3, 4
      const quantumL = Math.min(quantumN - 1, Math.floor(Number(params.angularL || 2))); // l: 0=s, 1=p, 2=d, 3=f
      const t = timeState.time * 0.8;

      ctx.fillStyle = '#020307';
      ctx.fillRect(0, 0, width, height);

      const cx = width * 0.5;
      const cy = height * 0.5;
      const scale = Math.min(width, height) * 0.38;

      // Dynamic 3D Camera Angles
      const rotY = t * 0.35;
      const rotX = 0.45 + Math.sin(t * 0.25) * 0.15;
      const rotZ = 0;

      ctx.save();
      ctx.globalCompositeOperation = 'screen';

      // 1. Quantum State Probability Cloud Points
      for (let i = 0; i < POINT_COUNT; i++) {
        const s = samples[i];
        const theta = s.v;
        const phi = s.u;

        // Spherical Harmonic Angular Probability Factor Y_l^m
        let angularFactor = 1.0;
        if (quantumL === 1) {
          // p_z orbital ~ cos(θ)
          angularFactor = Math.abs(Math.cos(theta)) * 1.8;
        } else if (quantumL === 2) {
          // d_z2 orbital ~ (3 cos^2(θ) - 1)
          angularFactor = Math.abs(3 * Math.pow(Math.cos(theta), 2) - 1) * 0.9;
        } else if (quantumL === 3) {
          // f_z3 orbital ~ (5 cos^3(θ) - 3 cos(θ))
          const ct = Math.cos(theta);
          angularFactor = Math.abs(5 * Math.pow(ct, 3) - 3 * ct) * 0.7;
        }

        // Radial Laguerre Wavefunction Decay Factor
        const rNorm = s.radMod * (1 + 0.12 * Math.sin(s.phase + t * 2));
        const radialProb = Math.pow(rNorm * quantumN, quantumL) * Math.exp(-rNorm * 2.2);
        const radius = scale * (0.2 + radialProb * angularFactor * 1.6);

        // Spherical to Cartesian Coordinates
        const rawX = radius * Math.sin(theta) * Math.cos(phi);
        const rawY = radius * Math.cos(theta); // z-polar axis is oriented vertically
        const rawZ = radius * Math.sin(theta) * Math.sin(phi);

        const p = project3D(rawX, rawY, rawZ, rotX, rotY, rotZ, cx, cy, 450, 520);

        // Color mapped to Wavefunction Complex Phase Arg(ψ)
        const phaseHue = ((phi / (Math.PI * 2)) * 360 + t * 30) % 360;
        const probAlpha = Math.min(1.0, (0.2 + angularFactor * 0.45) * p.depth);

        ctx.fillStyle = hsla(phaseHue, 95, 70, probAlpha);
        ctx.beginPath();
        ctx.arc(p.x, p.y, (1.2 + angularFactor * 1.6) * p.depth, 0, Math.PI * 2);
        ctx.fill();
      }

      // 2. Volumetric Iso-Surface Nodal Contour Rings
      const nodalRings = 16;
      for (let nr = 0; nr < nodalRings; nr++) {
        const normNR = (nr / nodalRings - 0.5) * 2; // -1 to 1 along z-axis
        const ringZ = normNR * (scale * 0.65);
        const thetaRing = Math.acos(Math.max(-1, Math.min(1, normNR)));

        let ringAmp = 1.0;
        if (quantumL === 1) ringAmp = Math.abs(Math.cos(thetaRing)) * 1.5;
        else if (quantumL === 2) ringAmp = Math.abs(3 * Math.pow(Math.cos(thetaRing), 2) - 1) * 0.8;
        else if (quantumL === 3) ringAmp = Math.abs(5 * Math.pow(Math.cos(thetaRing), 3) - 3 * Math.cos(thetaRing)) * 0.6;

        const ringR = Math.sin(thetaRing) * scale * 0.7 * ringAmp;
        if (ringR < 2) continue;

        ctx.beginPath();
        const steps = 40;
        for (let j = 0; j <= steps; j++) {
          const phiJ = (j / steps) * Math.PI * 2;
          const px = ringR * Math.cos(phiJ);
          const py = ringZ;
          const pz = ringR * Math.sin(phiJ);

          const proj = project3D(px, py, pz, rotX, rotY, rotZ, cx, cy, 450, 520);
          if (j === 0) ctx.moveTo(proj.x, proj.y);
          else ctx.lineTo(proj.x, proj.y);
        }
        ctx.closePath();
        ctx.strokeStyle = hsla((190 + nr * 8) % 360, 95, 75, 0.45);
        ctx.lineWidth = 1.0;
        ctx.stroke();
      }

      // 3. Central Atomic Nucleus Proton Core
      const pCore = project3D(0, 0, 0, rotX, rotY, rotZ, cx, cy, 450, 520);
      const coreGrad = ctx.createRadialGradient(pCore.x, pCore.y, 1, pCore.x, pCore.y, 14 * pCore.depth);
      coreGrad.addColorStop(0, '#ffffff');
      coreGrad.addColorStop(0.3, '#38bdf8');
      coreGrad.addColorStop(1, 'rgba(56, 189, 248, 0)');
      ctx.fillStyle = coreGrad;
      ctx.beginPath();
      ctx.arc(pCore.x, pCore.y, 14 * pCore.depth, 0, Math.PI * 2);
      ctx.fill();

      // 4. Educational Study HUD Overlay (Quantum Numbers & State Vector)
      ctx.restore(); // Back to screen space for clean typography
      ctx.save();
      ctx.font = '11px monospace';
      ctx.fillStyle = 'rgba(56, 189, 248, 0.9)';
      ctx.fillText(`ψ_nlm(r,θ,φ) — Hydrogen Orbital State`, 20, 28);
      ctx.fillStyle = '#94a3b8';
      ctx.fillText(`Principal (n): ${quantumN} | Angular (l): ${quantumL} (${['s','p','d','f'][quantumL] || 's'}) | Magnetic (m): 0`, 20, 44);
      ctx.fillText(`P(r,θ,φ) = |R_nl(r)|^2 · |Y_l^m(θ,φ)|^2`, 20, 60);
      ctx.restore();
    },
  };
}
