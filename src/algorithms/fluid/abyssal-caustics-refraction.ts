import type { ArtRenderer, ParameterState, RenderContext, TimeState } from '../../types/engine';
import { hsla } from '../common/color';

// Kelly Milligan (@kellymilligannz) Tribute: Abyssal Caustics Refraction
// Volumetric underwater caustic webs, chromatic dispersion (spectral RGB split),
// oceanic light shafts, and dancing bioluminescent marine snow.
export function createAbyssalCausticsRefraction(): ArtRenderer {
  interface Mote {
    x: number;
    y: number;
    vx: number;
    vy: number;
    size: number;
    hue: number;
    pulse: number;
  }

  const MAX_MOTES = 250;
  const motes: Mote[] = [];
  let initialized = false;

  function initMotes(width: number, height: number) {
    motes.length = 0;
    for (let i = 0; i < MAX_MOTES; i++) {
      motes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: -0.2 - Math.random() * 0.6,
        size: 0.8 + Math.random() * 2.2,
        hue: 175 + Math.random() * 35,
        pulse: Math.random() * Math.PI * 2,
      });
    }
    initialized = true;
  }

  return {
    setup(context: RenderContext) {
      initMotes(context.width, context.height);
    },

    render(context: RenderContext, timeState: TimeState, params: ParameterState) {
      const { ctx, width, height } = context;
      if (!initialized || motes.length === 0) {
        initMotes(width, height);
      }

      const turbulence = Number(params.waterTurbulence ?? 1.0);
      const intensity = Number(params.causticIntensity ?? 1.4);
      const dispersion = Number(params.chromaticDispersion ?? 1.2);
      const depthGlow = Number(params.depthGlow ?? 1.0);
      const activeMotes = Math.min(MAX_MOTES, Math.floor(Number(params.moteCount ?? 140)));
      const t = timeState.time * turbulence * 0.65;

      // Deep oceanic gradient (Midnight abyssal trench to deep cyan glow)
      const grad = ctx.createLinearGradient(0, 0, 0, height);
      grad.addColorStop(0, '#041324');
      grad.addColorStop(0.35, '#020c1a');
      grad.addColorStop(0.75, '#010810');
      grad.addColorStop(1, '#000408');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      // 1. Volumetric Godrays / Caustic Sunshafts (Kelly Milligan style)
      ctx.save();
      ctx.globalCompositeOperation = 'screen';
      const numBeams = 7;
      for (let b = 0; b < numBeams; b++) {
        const beamAngle = -0.18 + (b / numBeams) * 0.36 + Math.sin(t * 0.4 + b) * 0.04;
        const beamOriginX = width * (0.2 + (b / numBeams) * 0.6) + Math.sin(t * 0.8 + b * 1.5) * 40;
        const beamWidth = width * (0.08 + Math.sin(t * 1.2 + b * 2) * 0.03);

        const beamGrad = ctx.createRadialGradient(
          beamOriginX,
          -20,
          10,
          beamOriginX + Math.sin(beamAngle) * height,
          height,
          beamWidth * 3
        );
        const beamAlpha = (0.06 + 0.04 * Math.sin(t * 1.5 + b)) * depthGlow;
        beamGrad.addColorStop(0, hsla(185, 80, 75, beamAlpha * 1.8));
        beamGrad.addColorStop(0.5, hsla(195, 85, 55, beamAlpha));
        beamGrad.addColorStop(1, 'transparent');

        ctx.fillStyle = beamGrad;
        ctx.beginPath();
        ctx.moveTo(beamOriginX - beamWidth * 0.5, 0);
        ctx.lineTo(beamOriginX + beamWidth * 0.5, 0);
        ctx.lineTo(beamOriginX + Math.sin(beamAngle) * height + beamWidth * 2.2, height);
        ctx.lineTo(beamOriginX + Math.sin(beamAngle) * height - beamWidth * 2.2, height);
        ctx.closePath();
        ctx.fill();
      }
      ctx.restore();

      // 2. Procedural Caustic Mesh with Chromatic Dispersion (RGB Channel Separation)
      // We evaluate overlapping directional sinusoids:
      // wave(x, y, t) = sum( sin(k_i * (x cos theta_i + y sin theta_i) + w_i * t) )
      ctx.save();
      ctx.globalCompositeOperation = 'screen';

      const cols = 28;
      const rows = 28;
      const dx = width / cols;
      const dy = height / rows;

      // Render 3 passes for chromatic dispersion (Red/Orange, Green/Cyan, Blue/Violet)
      const passes = [
        { dHue: -18, dPhase: -0.15 * dispersion, alpha: 0.28 * intensity, lw: 1.2 },
        { dHue: 0, dPhase: 0, alpha: 0.45 * intensity, lw: 1.8 },
        { dHue: 22, dPhase: 0.15 * dispersion, alpha: 0.32 * intensity, lw: 1.4 },
      ];

      for (let p = 0; p < passes.length; p++) {
        const pass = passes[p];
        const hue = (182 + pass.dHue + 360) % 360;
        ctx.strokeStyle = hsla(hue, 92, 70, pass.alpha);
        ctx.lineWidth = pass.lw;

        // Draw horizontal caustic contours
        for (let j = 1; j < rows; j++) {
          ctx.beginPath();
          for (let i = 0; i <= cols; i++) {
            const px = i * dx;
            const py = j * dy;

            // Multi-frequency caustic formula
            const u = px * 0.0075;
            const v = py * 0.0075;
            const phaseT = t + pass.dPhase;

            const w1 = Math.sin(u * 1.8 + v * 0.9 + phaseT * 1.4);
            const w2 = Math.cos(u * 1.1 - v * 2.2 - phaseT * 1.1);
            const w3 = Math.sin((u + v) * 1.4 + phaseT * 2.0);
            const w4 = Math.sin(Math.sqrt(u * u + v * v) * 3.2 - phaseT * 1.6);

            const causticOffset = (w1 + w2 + w3 * 0.6 + w4 * 0.4) * (14 * intensity);
            const curveX = px + Math.cos(w2 * 2 + phaseT) * (6 * intensity);
            const curveY = py + causticOffset;

            if (i === 0) {
              ctx.moveTo(curveX, curveY);
            } else {
              ctx.lineTo(curveX, curveY);
            }
          }
          ctx.stroke();
        }

        // Draw intersecting diagonal caustic filaments
        for (let i = 1; i < cols; i += 2) {
          ctx.beginPath();
          for (let j = 0; j <= rows; j++) {
            const px = i * dx;
            const py = j * dy;
            const u = px * 0.0075;
            const v = py * 0.0075;
            const phaseT = t + pass.dPhase;

            const w1 = Math.cos(u * 2.2 - v * 1.3 + phaseT * 1.3);
            const w2 = Math.sin(u * 0.8 + v * 1.9 - phaseT * 1.7);
            const curveX = px + (w1 + w2) * (10 * intensity);
            const curveY = py + Math.sin(w1 * 2 - phaseT) * (5 * intensity);

            if (j === 0) {
              ctx.moveTo(curveX, curveY);
            } else {
              ctx.lineTo(curveX, curveY);
            }
          }
          ctx.stroke();
        }
      }
      ctx.restore();

      // 3. Bioluminescent Plankton & Marine Snow Swarm
      ctx.save();
      ctx.globalCompositeOperation = 'screen';
      for (let i = 0; i < activeMotes; i++) {
        const m = motes[i];

        // Micro-current turbulent advection
        m.x += m.vx + Math.sin(t * 1.5 + m.y * 0.015) * 0.6;
        m.y += m.vy + Math.cos(t * 1.2 + m.x * 0.015) * 0.2;
        m.pulse += 0.04 * turbulence;

        // Wrap around canvas
        if (m.y < -10) {
          m.y = height + 10;
          m.x = Math.random() * width;
        }
        if (m.x < -10) m.x = width + 10;
        if (m.x > width + 10) m.x = -10;

        const pAlpha = (0.4 + 0.45 * Math.sin(m.pulse)) * depthGlow;
        const currentSize = m.size * (0.8 + 0.3 * Math.sin(m.pulse));

        // Soft luminous particle aura
        const pGrad = ctx.createRadialGradient(m.x, m.y, 0, m.x, m.y, currentSize * 2.8);
        pGrad.addColorStop(0, hsla(m.hue, 95, 80, pAlpha));
        pGrad.addColorStop(0.4, hsla(m.hue, 90, 60, pAlpha * 0.5));
        pGrad.addColorStop(1, 'transparent');

        ctx.fillStyle = pGrad;
        ctx.beginPath();
        ctx.arc(m.x, m.y, currentSize * 2.8, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    },
  };
}
