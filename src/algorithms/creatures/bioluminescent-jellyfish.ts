import type { ArtRenderer, ParameterState, RenderContext, TimeState } from '../../types/engine';
import { hsla } from '../common/color';

// Yuruyurau-Style Ultra-Detailed Bioluminescent Jellyfish
// Built with dense harmonic filament meshes, additive alpha blending,
// layered subumbrella muscle bands, cloverleaf gonads, and a swarm of 120 kinematic silk tentacles.
export function createBioluminescentJellyfish(): ArtRenderer {
  const BELL_RIBBONS = 48;
  const TENTACLES = 96;
  const NODES_PER_TENTACLE = 36;

  return {
    setup() {},

    render(context: RenderContext, timeState: TimeState, params: ParameterState) {
      const { ctx, width, height } = context;
      const speed = Number(params.pulseSpeed || 1.1);
      const tentacleLength = Number(params.tentacleLength || 200);
      const glowIntensity = Number(params.glowIntensity || 1.3);
      const t = timeState.time * speed;

      ctx.fillStyle = '#020307';
      ctx.fillRect(0, 0, width, height);

      // Swimming center with graceful hovering motion
      const cx = width * 0.5 + Math.sin(t * 0.4) * (width * 0.05);
      const cy = height * 0.40 + Math.sin(t * 1.4) * 12;

      const baseR = Math.min(width, height) * 0.23;
      const pulse = 1 + 0.22 * Math.sin(t * 2.8);
      const contraction = Math.max(0, -Math.sin(t * 2.8));

      ctx.save();
      ctx.translate(cx, cy);

      // Additive blending for ethereal luminous filament glow
      ctx.globalCompositeOperation = 'screen';

      const baseHue = (185 + Math.sin(t * 0.6) * 25) % 360;

      // 1. Yuruyurau Dense Bell Filament Mesh (48 Concentric Radial Ribbons)
      for (let r = 0; r < BELL_RIBBONS; r++) {
        const normR = (r + 1) / BELL_RIBBONS;
        const ribbonR = baseR * normR;
        const domeH = ribbonR * 1.12 * pulse;
        const domeW = ribbonR * (1.22 / pulse);

        ctx.beginPath();
        const steps = 80;
        for (let i = 0; i <= steps; i++) {
          const phi = (i / steps) * Math.PI;

          // Multi-frequency harmonic frill ripples
          const frill1 = Math.sin(phi * 8 + t * 3 + normR * 4) * (0.04 * normR);
          const frill2 = Math.cos(phi * 16 - t * 2) * (0.02 * normR);
          const scallop = Math.sin(phi * 8) * (8 * normR * pulse);

          const px = Math.cos(phi) * domeW * (1 + frill1 + frill2);
          const py = -Math.sin(phi) * domeH + scallop * (normR > 0.85 ? 1 : 0);

          if (i === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }

        const ribbonHue = (baseHue + normR * 35) % 360;
        const alpha = (0.08 + normR * 0.35 + contraction * 0.2) * glowIntensity;
        ctx.strokeStyle = hsla(ribbonHue, 95, 65 + normR * 15, alpha);
        ctx.lineWidth = normR > 0.9 ? 1.8 : 0.8;
        ctx.stroke();
      }

      // 2. Striated Coronal Muscle Bands (Concentric Transverse Rings)
      for (let ring = 1; ring <= 12; ring++) {
        const normRing = ring / 12;
        const rw = baseR * 1.15 * normRing * (1 / pulse);
        const rh = baseR * 0.55 * normRing * pulse;
        const ry = -baseR * 0.9 * (1 - normRing) * pulse;

        ctx.beginPath();
        ctx.ellipse(0, ry, rw, rh, 0, 0, Math.PI * 2);
        ctx.strokeStyle = hsla((baseHue + 40) % 360, 90, 75, (0.12 + contraction * 0.25) * glowIntensity);
        ctx.lineWidth = 1.0;
        ctx.stroke();
      }

      // 3. Four Glowing Horseshoe Gonads (Cloverleaf Starburst Nuclei)
      for (let g = 0; g < 4; g++) {
        const gAngle = (g / 4) * Math.PI * 2 + Math.PI * 0.25;
        const gDist = baseR * 0.42 * (1 / pulse);
        const gx = Math.cos(gAngle) * gDist;
        const gy = -baseR * 0.48 * pulse + Math.sin(gAngle) * (gDist * 0.5);

        ctx.save();
        ctx.translate(gx, gy);
        ctx.rotate(gAngle + Math.PI * 0.5);

        // Multi-layered nested horseshoe rings
        for (let h = 1; h <= 4; h++) {
          const hr = (4 + h * 3) * pulse;
          ctx.beginPath();
          ctx.arc(0, 0, hr, 0.2 * Math.PI, 1.8 * Math.PI);
          ctx.strokeStyle = hsla(325 + h * 8, 100, 75, (0.5 - h * 0.08) * glowIntensity);
          ctx.lineWidth = 1.4;
          ctx.stroke();
        }

        // Radiant gonad starburst core
        ctx.fillStyle = hsla(340, 100, 90, 0.95);
        ctx.beginPath();
        ctx.arc(0, 0, 3 * pulse, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
      }

      // 4. Eight Scalloped Rhopalia (Sensory Statolith Crystals)
      for (let r = 0; r < 8; r++) {
        const rPhi = (r / 8) * Math.PI;
        const rx = Math.cos(rPhi) * (baseR * 1.22 / pulse);
        const ry = Math.sin(rPhi * 8) * 8 * pulse;

        ctx.fillStyle = '#38bdf8';
        ctx.shadowColor = '#38bdf8';
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.arc(rx, ry, 2.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      // 5. Yuruyurau-Style Flowing Oral Arms (32 Layered Frilled Ribbons)
      for (let a = 0; a < 32; a++) {
        const normA = a / 31;
        const armSide = (normA - 0.5) * 2; // -1 to 1
        const armRootX = armSide * (baseR * 0.28);
        const armRootY = -baseR * 0.15;

        ctx.beginPath();
        ctx.moveTo(armRootX, armRootY);

        const armSteps = 45;
        const armLen = tentacleLength * 0.95;
        for (let s = 1; s <= armSteps; s++) {
          const ns = s / armSteps;
          // Complex Yuruyurau multi-sine harmonic lace wave
          const w1 = Math.sin(ns * 12 + t * 4 + a * 0.3) * (24 * ns * (1 + Math.abs(armSide)));
          const w2 = Math.cos(ns * 24 - t * 3 + a * 0.5) * (10 * ns);
          const w3 = Math.sin(t * 1.8 + ns * 6) * (32 * ns * armSide);

          const ax = armRootX + w1 + w2 + w3;
          const ay = armRootY + ns * armLen;
          ctx.lineTo(ax, ay);
        }

        const armHue = (baseHue + 50 + normA * 45) % 360;
        ctx.strokeStyle = hsla(armHue, 95, 78, 0.45 * glowIntensity);
        ctx.lineWidth = 1.1;
        ctx.stroke();
      }

      // 6. Swarm of 96 Trailing Bioluminescent Silk Tentacles
      for (let k = 0; k < TENTACLES; k++) {
        const normK = k / (TENTACLES - 1);
        const phi = normK * Math.PI;
        const rootX = Math.cos(phi) * (baseR * 1.20 / pulse);
        const rootY = Math.sin(phi * 8) * 8 * pulse;

        ctx.beginPath();
        ctx.moveTo(rootX, rootY);

        for (let n = 1; n <= NODES_PER_TENTACLE; n++) {
          const normN = n / NODES_PER_TENTACLE;
          const dist = normN * tentacleLength * (1 + 0.2 * Math.sin(t * 1.8 + k * 0.2));

          // Phased harmonic wave kinematics
          const wave1 = Math.sin(t * 3.5 - normN * 8 + k * 0.35) * (26 * normN);
          const wave2 = Math.cos(t * 2.0 + normN * 14 - k * 0.2) * (12 * normN);
          const drift = Math.sin(t * 0.9) * (normN * 22);

          const tx = rootX + wave1 + wave2 + drift;
          const ty = rootY + dist;

          ctx.lineTo(tx, ty);

          // Cnidocyte battery glowing photon beads
          if (n % 8 === 0 && k % 3 === 0) {
            ctx.fillStyle = hsla((baseHue + k * 4) % 360, 100, 88, 0.85 * glowIntensity);
            ctx.fillRect(tx - 1, ty - 1, 2.2, 2.2);
          }
        }

        const tentHue = (baseHue - 20 + normK * 50 + t * 15) % 360;
        const tentAlpha = (k % 4 === 0 ? 0.65 : 0.25) * glowIntensity;
        ctx.strokeStyle = hsla(tentHue, 95, 75, tentAlpha);
        ctx.lineWidth = k % 4 === 0 ? 1.4 : 0.7;
        ctx.stroke();
      }

      ctx.restore();
    },
  };
}
