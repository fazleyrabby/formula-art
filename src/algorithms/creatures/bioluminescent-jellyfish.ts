import type { ArtRenderer, ParameterState, RenderContext, TimeState } from '../../types/engine';
import { hsla } from '../common/color';

// Anatomically Enriched Bioluminescent Jellyfish
// Features: Exumbrella/Subumbrella mesoglea, coronal muscle rings, 4 horseshoe gonads,
// scalloped rhopalia/lappets, velum shelf, manubrium oral arms, and multi-node cnidocyte tentacles.
export function createBioluminescentJellyfish(): ArtRenderer {
  const TENTACLE_COUNT = 18;
  const NODES_PER_TENTACLE = 32;

  return {
    setup() {},

    render(context: RenderContext, timeState: TimeState, params: ParameterState) {
      const { ctx, width, height } = context;
      const speed = Number(params.pulseSpeed || 1.2);
      const tentacleLength = Number(params.tentacleLength || 180);
      const glowIntensity = Number(params.glowIntensity || 1.2);
      const t = timeState.time * speed;

      ctx.fillStyle = '#03050a';
      ctx.fillRect(0, 0, width, height);

      // Swimming center with hydrodynamic surge
      const swimSurge = Math.max(0, -Math.sin(t * 2.8));
      const cx = width * 0.5 + Math.sin(t * 0.5) * (width * 0.06);
      const cy = height * 0.42 - swimSurge * 18 + Math.sin(t * 1.2) * 6;

      const bellRadius = Math.min(width, height) * 0.22;
      // Contraction / Expansion stroke
      const pulse = 1 + 0.24 * Math.sin(t * 2.8);
      const contraction = Math.max(0, -Math.sin(t * 2.8));

      ctx.save();
      ctx.translate(cx, cy);

      // 1. Outer Exumbrella Dome (Transparent Mesoglea Layer)
      const domeH = bellRadius * 1.15 * pulse;
      const domeW = bellRadius * (1.25 / pulse);

      ctx.beginPath();
      const steps = 120;
      for (let i = 0; i <= steps; i++) {
        const phi = (i / steps) * Math.PI;
        // Fine marginal frills
        const frill = 0.04 * Math.sin(phi * 16 + t * 3);
        const px = Math.cos(phi) * domeW * (1 + frill);
        const py = -Math.sin(phi) * domeH + frill * 8;
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }

      // Scalloped Marginal Lappets along the bell rim (8 rhopalial notches)
      for (let i = steps; i >= 0; i--) {
        const phi = (i / steps) * Math.PI;
        const scallop = Math.sin(phi * 16) * (6 * pulse);
        const px = Math.cos(phi) * (domeW * 0.96);
        const py = scallop;
        ctx.lineTo(px, py);
      }
      ctx.closePath();

      // Outer Mesoglea Translucent Gradient
      const bellHue = (185 + Math.sin(t * 0.8) * 20) % 360;
      const exoGrad = ctx.createRadialGradient(0, -domeH * 0.4, 10, 0, -domeH * 0.2, domeW * 1.1);
      exoGrad.addColorStop(0, hsla(bellHue + 20, 95, 60, 0.25 + contraction * 0.25));
      exoGrad.addColorStop(0.7, hsla(bellHue, 90, 45, 0.15));
      exoGrad.addColorStop(1, hsla(bellHue - 10, 95, 70, 0.4 * glowIntensity));

      ctx.fillStyle = exoGrad;
      ctx.fill();
      ctx.strokeStyle = hsla(bellHue, 95, 75, 0.85 * glowIntensity);
      ctx.lineWidth = 2.2;
      ctx.stroke();

      // 2. Inner Subumbrella Wall & Coronal Striated Muscular Rings
      for (let ring = 1; ring <= 4; ring++) {
        const rNorm = ring / 5;
        ctx.beginPath();
        ctx.ellipse(0, -domeH * 0.25 * (1 - rNorm), domeW * 0.85 * rNorm, domeH * 0.45 * rNorm, 0, 0, Math.PI * 2);
        ctx.strokeStyle = hsla(bellHue + 15, 85, 65, 0.25 + contraction * 0.3);
        ctx.lineWidth = 1.2;
        ctx.stroke();
      }

      // 3. Four Horseshoe-Shaped Gastrodermal Gonads (Aurelia Cloverleaf Organ)
      for (let g = 0; g < 4; g++) {
        const gAngle = (g / 4) * Math.PI * 2 + Math.PI * 0.25;
        const gDist = domeW * 0.38;
        const gx = Math.cos(gAngle) * gDist;
        const gy = -domeH * 0.45 + Math.sin(gAngle) * (gDist * 0.6);

        ctx.save();
        ctx.translate(gx, gy);
        ctx.rotate(gAngle + Math.PI * 0.5);

        // Horseshoe curve
        ctx.beginPath();
        ctx.arc(0, 0, 14 * pulse, 0.2 * Math.PI, 1.8 * Math.PI);
        ctx.strokeStyle = hsla(330 + g * 10, 95, 75, 0.85 * glowIntensity);
        ctx.lineWidth = 3.2;
        ctx.stroke();

        // Inner follicular luminescence
        ctx.fillStyle = hsla(340, 100, 85, 0.95);
        ctx.beginPath();
        ctx.arc(0, 0, 4 * pulse, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
      }

      // 4. Eight Marginal Rhopalia (Sensory Statolith & Ocellus Niches)
      for (let r = 0; r < 8; r++) {
        const rPhi = (r / 8) * Math.PI;
        const rx = Math.cos(rPhi) * (domeW * 0.98);
        const ry = Math.sin(rPhi * 16) * 4;

        // Rhopalia sensory bead
        ctx.fillStyle = '#38bdf8';
        ctx.shadowColor = '#38bdf8';
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.arc(rx, ry, 2.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      // 5. Four Long Lace-Frilled Oral Arms (Manubrium)
      for (let a = 0; a < 4; a++) {
        const side = a % 2 === 0 ? 1 : -1;
        const armDepth = a < 2 ? 1.0 : 0.7;
        const armRootX = (a - 1.5) * 12;
        const armRootY = -domeH * 0.15;

        ctx.beginPath();
        ctx.moveTo(armRootX, armRootY);

        const armSteps = 50;
        const armLen = tentacleLength * 0.9;
        for (let s = 1; s <= armSteps; s++) {
          const ns = s / armSteps;
          // Ribbed frill oscillations
          const frillW = Math.sin(ns * 14 + t * 4 + a) * (20 * ns * side);
          const curl = Math.sin(t * 2 + ns * 4) * (28 * ns);
          const ax = armRootX + curl + frillW;
          const ay = armRootY + ns * armLen;
          ctx.lineTo(ax, ay);
        }

        ctx.strokeStyle = hsla((bellHue + 45 + a * 15) % 360, 90, 78, 0.75 * armDepth * glowIntensity);
        ctx.lineWidth = 2.4 * armDepth;
        ctx.stroke();
      }

      // 6. Trailing Peripheral Marginal Tentacles with Cnidocyte Batteries
      for (let k = 0; k < TENTACLE_COUNT; k++) {
        const normK = k / (TENTACLE_COUNT - 1);
        const phi = normK * Math.PI;
        const rootX = Math.cos(phi) * (domeW * 0.94);
        const rootY = Math.sin(phi * 16) * 4;

        ctx.beginPath();
        ctx.moveTo(rootX, rootY);

        for (let n = 1; n <= NODES_PER_TENTACLE; n++) {
          const normN = n / NODES_PER_TENTACLE;
          const dist = normN * tentacleLength * (1 + 0.15 * Math.sin(t * 1.5 + k));

          // Kinematic sinusoidal wave traveling down tentacle
          const wave = Math.sin(t * 3.2 - normN * 7 + k * 0.4) * (24 * normN);
          const drift = Math.sin(t * 0.8) * (normN * 18);
          const tx = rootX + wave + drift;
          const ty = rootY + dist;

          ctx.lineTo(tx, ty);

          // Cnidocyte battery glowing bead nodes
          if (n % 6 === 0) {
            ctx.fillStyle = hsla((bellHue + k * 6) % 360, 100, 85, 0.8 * glowIntensity);
            ctx.fillRect(tx - 1, ty - 1, 2, 2);
          }
        }

        const tentHue = (bellHue - 15 + k * 5 + t * 15) % 360;
        ctx.strokeStyle = hsla(tentHue, 95, 72, (k % 2 === 0 ? 0.6 : 0.35) * glowIntensity);
        ctx.lineWidth = k % 3 === 0 ? 1.5 : 0.8;
        ctx.stroke();
      }

      ctx.restore();
    },
  };
}
