import type { ArtRenderer, ParameterState, RenderContext, TimeState } from '../../types/engine';
import { hsla } from '../common/color';
import { project3D } from '../common/projection3d';

// General Relativity: Spacetime Curvature & Geodesic Ray Deflection
// Visualizes Flamm's paraboloid embedding of the Schwarzschild metric (G_μν = 8πG/c⁴ T_μν),
// mass-induced gravitational funnel, orbiting test particles, and photon geodesic deflection.
export function createSpacetimeCurvature(): ArtRenderer {
  const GRID_RADIAL = 22;
  const GRID_ANGULAR = 32;

  // Multiple photon rays on deflected null geodesics
  const photons: { startY: number; speed: number }[] = [
    { startY: -120, speed: 180 },
    { startY: -75, speed: 180 },
    { startY: -45, speed: 180 },
    { startY: 45, speed: 180 },
    { startY: 75, speed: 180 },
    { startY: 120, speed: 180 },
  ];

  return {
    setup() {},

    render(context: RenderContext, timeState: TimeState, params: ParameterState) {
      const { ctx, width, height } = context;
      const massStrength = Number(params.massDensity || 1.2);
      const t = timeState.time;

      ctx.fillStyle = '#010205';
      ctx.fillRect(0, 0, width, height);

      const cx = width * 0.5;
      const cy = height * 0.52;
      const scale = Math.min(width, height) / 480;

      // 3D Perspective Angles looking down into gravitational well
      const rotY = t * 0.15;
      const rotX = 0.65;
      const rotZ = 0;

      ctx.save();
      ctx.globalCompositeOperation = 'screen';

      const maxR = 210 * scale;
      const rs = 28 * massStrength * scale; // Schwarzschild radius

      // Function to calculate Schwarzschild Funnel Depth z(r)
      function getSpacetimeDepth(r: number) {
        if (r < rs) return 130 * scale;
        // Flamm's paraboloid z(r) = 2√(rs (r - rs))
        return (130 * scale) - 2 * Math.sqrt(Math.max(0, rs * (r - rs))) * 4.2;
      }

      // 1. 3D Warped Spacetime Coordinate Grid (Concentric Rings & Radial Struts)
      // Concentric Rings
      for (let r = 1; r <= GRID_RADIAL; r++) {
        const normR = r / GRID_RADIAL;
        const curR = rs + Math.pow(normR, 1.4) * (maxR - rs);
        const depthZ = getSpacetimeDepth(curR);

        ctx.beginPath();
        for (let a = 0; a <= GRID_ANGULAR; a++) {
          const phi = (a / GRID_ANGULAR) * Math.PI * 2;
          const px = curR * Math.cos(phi);
          const py = curR * Math.sin(phi);

          const proj = project3D(px, depthZ, py, rotX, rotY, rotZ, cx, cy, 450, 520);
          if (a === 0) ctx.moveTo(proj.x, proj.y);
          else ctx.lineTo(proj.x, proj.y);
        }
        ctx.closePath();
        const ringHue = (200 + normR * 45) % 360;
        ctx.strokeStyle = hsla(ringHue, 90, 68, (0.08 + (1 - normR) * 0.45));
        ctx.lineWidth = r === 1 ? 2.0 : 1.0;
        ctx.stroke();
      }

      // Radial Struts
      for (let a = 0; a < GRID_ANGULAR; a += 2) {
        const phi = (a / GRID_ANGULAR) * Math.PI * 2;
        ctx.beginPath();
        for (let r = 1; r <= GRID_RADIAL; r++) {
          const normR = r / GRID_RADIAL;
          const curR = rs + Math.pow(normR, 1.4) * (maxR - rs);
          const depthZ = getSpacetimeDepth(curR);

          const px = curR * Math.cos(phi);
          const py = curR * Math.sin(phi);

          const proj = project3D(px, depthZ, py, rotX, rotY, rotZ, cx, cy, 450, 520);
          if (r === 1) ctx.moveTo(proj.x, proj.y);
          else ctx.lineTo(proj.x, proj.y);
        }
        ctx.strokeStyle = 'rgba(56, 189, 248, 0.2)';
        ctx.lineWidth = 1.0;
        ctx.stroke();
      }

      // 2. Massive Central Gravitational Mass Singularity (Black Hole / Neutron Star)
      const pSingularity = project3D(0, 130 * scale, 0, rotX, rotY, rotZ, cx, cy, 450, 520);
      const massGrad = ctx.createRadialGradient(pSingularity.x, pSingularity.y, 2, pSingularity.x, pSingularity.y, 24 * scale);
      massGrad.addColorStop(0, '#ffffff');
      massGrad.addColorStop(0.3, '#f59e0b');
      massGrad.addColorStop(0.7, '#ea580c');
      massGrad.addColorStop(1, 'rgba(234, 88, 12, 0)');
      ctx.fillStyle = massGrad;
      ctx.beginPath();
      ctx.arc(pSingularity.x, pSingularity.y, 24 * scale, 0, Math.PI * 2);
      ctx.fill();

      // 3. Orbiting Test Particle in Stable Geodesic
      const orbitTheta = t * 1.8;
      const orbitR = 95 * scale;
      const orbitZ = getSpacetimeDepth(orbitR);
      const pOrb = project3D(orbitR * Math.cos(orbitTheta), orbitZ, orbitR * Math.sin(orbitTheta), rotX, rotY, rotZ, cx, cy, 450, 520);

      ctx.fillStyle = '#38bdf8';
      ctx.shadowColor = '#38bdf8';
      ctx.shadowBlur = 12;
      ctx.beginPath();
      ctx.arc(pOrb.x, pOrb.y, 5.0 * scale, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;

      // 4. Deflected Light Photon Geodesic Rays
      for (let p = 0; p < photons.length; p++) {
        const ph = photons[p];
        ctx.beginPath();
        const steps = 40;
        for (let i = 0; i <= steps; i++) {
          const normX = (i / steps - 0.5) * (maxR * 2.2);
          const impactB = ph.startY * scale;
          const dist = Math.hypot(normX, impactB);

          // Gravitational light bending angle deflection: θ_def ≈ 4GM / (c² b)
          const defAmount = (4 * rs) / (dist + rs * 0.5);
          const yDef = impactB + Math.sign(impactB) * defAmount * (normX > 0 ? 1 : -1) * 8;
          const zDepth = getSpacetimeDepth(Math.max(rs + 5, dist));

          const proj = project3D(normX, zDepth, yDef, rotX, rotY, rotZ, cx, cy, 450, 520);
          if (i === 0) ctx.moveTo(proj.x, proj.y);
          else ctx.lineTo(proj.x, proj.y);
        }
        ctx.strokeStyle = '#fbbf24';
        ctx.lineWidth = 1.4;
        ctx.stroke();
      }

      // 5. Study HUD Equations
      ctx.restore();
      ctx.save();
      ctx.font = '11px monospace';
      ctx.fillStyle = 'rgba(56, 189, 248, 0.9)';
      ctx.fillText(`General Relativity — Spacetime Curvature & Geodesics`, 20, 28);
      ctx.fillStyle = '#94a3b8';
      ctx.fillText(`G_μν = (8πG/c⁴) T_μν  |  Schwarzschild Metric: ds² = -(1-r_s/r)c²dt² + (1-r_s/r)⁻¹dr² + r²dΩ²`, 20, 44);
      ctx.fillText(`Gravitational Lensing Deflection: Δφ ≈ 4GM/(c²b) | Photon Null Geodesics [Gold]`, 20, 60);
      ctx.restore();
    },
  };
}
