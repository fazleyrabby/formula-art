import type { ArtRenderer, ParameterState, RenderContext, TimeState } from '../../types/engine';
import { hsla } from '../common/color';

export function createCrepuscularSunsetRays(): ArtRenderer {
  // Pre-allocated particles for atmospheric dust motes
  const DUST_COUNT = 85;
  const dustParticles: Array<{ x: number; y: number; vx: number; vy: number; size: number; phase: number }> = [];

  function initDust() {
    dustParticles.length = 0;
    for (let i = 0; i < DUST_COUNT; i++) {
      dustParticles.push({
        x: Math.random(),
        y: Math.random(),
        vx: (Math.random() - 0.5) * 0.0004,
        vy: -0.0002 - Math.random() * 0.0006,
        size: 0.8 + Math.random() * 1.8,
        phase: Math.random() * Math.PI * 2,
      });
    }
  }

  return {
    setup() {
      initDust();
    },

    render(context: RenderContext, timeState: TimeState, params: ParameterState) {
      const { ctx, width, height } = context;
      const speed = Number(params.speed ?? 1.0);
      const rayIntensity = Number(params.rayIntensity ?? 1.2);
      const cloudDensity = Number(params.cloudDensity ?? 1.0);
      const glitterSpread = Number(params.glitterSpread ?? 1.0);
      const sunHeightRatio = Number(params.sunHeight ?? 0.38);

      const t = timeState.time * speed;

      if (dustParticles.length === 0) {
        initDust();
      }

      // Sun position
      const sunX = width * 0.5;
      const sunY = height * sunHeightRatio;
      const horizonY = height * 0.64;

      // 1. Dusk-to-Sunset Atmospheric Sky Gradient
      const skyGrad = ctx.createLinearGradient(0, 0, 0, horizonY);
      skyGrad.addColorStop(0, '#070612');      // Deep dusk indigo-black
      skyGrad.addColorStop(0.28, '#1b1228');   // Twilight purple
      skyGrad.addColorStop(0.55, '#5c1e28');   // Crimson dusk
      skyGrad.addColorStop(0.80, '#b84e1b');   // Fiery sunset amber
      skyGrad.addColorStop(1.0, '#f2a63b');    // Golden horizon glow
      ctx.fillStyle = skyGrad;
      ctx.fillRect(0, 0, width, horizonY);

      // 2. Solar Core & Atmospheric Corona Glow
      ctx.save();
      const coronaGrad = ctx.createRadialGradient(sunX, sunY, 0, sunX, sunY, width * 0.5);
      coronaGrad.addColorStop(0, 'rgba(255, 255, 245, 1.0)');
      coronaGrad.addColorStop(0.08, 'rgba(255, 220, 130, 0.9)');
      coronaGrad.addColorStop(0.22, 'rgba(255, 140, 50, 0.45)');
      coronaGrad.addColorStop(0.55, 'rgba(190, 60, 20, 0.15)');
      coronaGrad.addColorStop(1.0, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = coronaGrad;
      ctx.beginPath();
      ctx.arc(sunX, sunY, width * 0.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // 3. Volumetric Crepuscular Ray Beams (Mie Forward Scattering & Cloudbreak Occlusion)
      ctx.save();
      ctx.globalCompositeOperation = 'screen';
      const RAY_COUNT = 32;
      const maxRayLen = Math.hypot(width, height) * 0.95;

      for (let i = 0; i < RAY_COUNT; i++) {
        const normI = i / RAY_COUNT;
        // Sweep in a wide fan downward across the horizon (from ~15° to 165°)
        const baseAngle = Math.PI * 0.08 + normI * (Math.PI * 0.84);

        // Harmonic cloud gap modulation
        const gapWarp = Math.sin(baseAngle * 6.0 + t * 0.3) * 0.06 +
                        Math.cos(baseAngle * 11.0 - t * 0.4) * 0.04;
        const rayAngle = baseAngle + gapWarp * cloudDensity;

        // Soft intensity falloff away from central axis
        const angleDiff = Math.abs(rayAngle - Math.PI * 0.5);
        const centralFactor = Math.pow(Math.max(0, 1 - angleDiff / (Math.PI * 0.46)), 1.5);
        const beamPulse = 0.7 + 0.3 * Math.sin(i * 1.9 + t * 1.2);
        const beamAlpha = Math.min(0.38, 0.18 * centralFactor * beamPulse * rayIntensity);

        if (beamAlpha > 0.01) {
          const spreadWidth = 0.05 + (1 - centralFactor) * 0.035;
          const leftAngle = rayAngle - spreadWidth;
          const rightAngle = rayAngle + spreadWidth;

          const rayGrad = ctx.createRadialGradient(sunX, sunY, width * 0.05, sunX, sunY, maxRayLen);
          rayGrad.addColorStop(0, `rgba(255, 245, 205, ${beamAlpha * 1.2})`);
          rayGrad.addColorStop(0.2, `rgba(255, 195, 100, ${beamAlpha * 0.85})`);
          rayGrad.addColorStop(0.55, `rgba(220, 100, 35, ${beamAlpha * 0.35})`);
          rayGrad.addColorStop(1.0, 'rgba(140, 30, 10, 0)');

          ctx.beginPath();
          ctx.moveTo(sunX, sunY);
          ctx.lineTo(sunX + Math.cos(leftAngle) * maxRayLen, sunY + Math.sin(leftAngle) * maxRayLen);
          ctx.lineTo(sunX + Math.cos(rightAngle) * maxRayLen, sunY + Math.sin(rightAngle) * maxRayLen);
          ctx.closePath();
          ctx.fillStyle = rayGrad;
          ctx.fill();
        }
      }
      ctx.restore();

      // 4. Layered Mountain Ranges / Atmospheric Ridges (Closing seamlessly at horizonY)
      ctx.save();
      const RIDGES = [
        { baseY: sunY + 15, amp: 28, freq: 4.5, color: 'rgba(58, 22, 42, 0.85)', rimGlow: true },
        { baseY: sunY + 42, amp: 35, freq: 3.2, color: 'rgba(32, 14, 30, 0.92)', rimGlow: true },
        { baseY: sunY + 70, amp: 42, freq: 2.2, color: 'rgba(14, 8, 20, 0.98)', rimGlow: false },
      ];

      for (let r = 0; r < RIDGES.length; r++) {
        const ridge = RIDGES[r];
        ctx.beginPath();
        ctx.moveTo(0, horizonY);

        const steps = 90;
        for (let s = 0; s <= steps; s++) {
          const nx = s / steps;
          const x = nx * width;
          // Harmonic undulating ridge profile
          const p1 = Math.sin(nx * ridge.freq * Math.PI + r * 2.1 + t * 0.05) * ridge.amp;
          const p2 = Math.cos(nx * (ridge.freq * 2.3) - r * 1.5) * (ridge.amp * 0.4);
          const p3 = Math.sin(nx * (ridge.freq * 4.1) + t * 0.02) * (ridge.amp * 0.15);

          // Central saddle dip allowing sunset rays to burst through the mountains
          const distToSun = Math.abs(x - sunX) / (width * 0.35);
          const sunDip = Math.max(0, 1 - distToSun * distToSun) * (r === 0 ? 30 : 15);

          const y = Math.min(horizonY, ridge.baseY + p1 + p2 + p3 + (r === 0 ? sunDip : 0));
          ctx.lineTo(x, y);
        }

        ctx.lineTo(width, horizonY);
        ctx.lineTo(0, horizonY);
        ctx.closePath();
        ctx.fillStyle = ridge.color;
        ctx.fill();

        // Delicate Golden Sun Rim-Lighting along the ridge crest
        if (ridge.rimGlow) {
          ctx.strokeStyle = `rgba(255, 185, 95, ${0.35 - r * 0.15})`;
          ctx.lineWidth = 1.2;
          ctx.stroke();
        }
      }
      ctx.restore();

      // 5. Ocean Water & Sunset Horizon
      const oceanH = height - horizonY;
      const oceanGrad = ctx.createLinearGradient(0, horizonY, 0, height);
      oceanGrad.addColorStop(0, '#0c0712');
      oceanGrad.addColorStop(0.3, '#160d1b');
      oceanGrad.addColorStop(0.65, '#0e0714');
      oceanGrad.addColorStop(1.0, '#050308');
      ctx.fillStyle = oceanGrad;
      ctx.fillRect(0, horizonY, width, oceanH);

      // 5a. Soft Golden Sunset Sheen across water
      ctx.save();
      ctx.globalCompositeOperation = 'screen';
      const seaWash = ctx.createRadialGradient(sunX, horizonY, 0, sunX, horizonY + oceanH * 0.35, width * 0.7);
      seaWash.addColorStop(0, `rgba(215, 120, 35, ${0.22 * glitterSpread})`);
      seaWash.addColorStop(0.4, `rgba(140, 60, 18, ${0.10 * glitterSpread})`);
      seaWash.addColorStop(1.0, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = seaWash;
      ctx.fillRect(0, horizonY, width, oceanH);
      ctx.restore();

      // 5b. Gentle Ocean Wave Crests & Subtle Specular Shimmer
      const WAVE_LINES = 26;
      for (let w = 0; w < WAVE_LINES; w++) {
        const normW = w / WAVE_LINES;
        const lineY = horizonY + Math.pow(normW, 1.4) * oceanH;
        const waveAmp = (0.6 + normW * 3.6);
        const waveFreq = 0.035 - normW * 0.02;

        ctx.beginPath();
        const pts = 80;
        for (let p = 0; p <= pts; p++) {
          const nx = p / pts;
          const x = nx * width;
          const waveOffset = Math.sin(x * waveFreq + t * (0.32 + normW * 0.45) + w * 1.3) * waveAmp +
                             Math.cos(x * waveFreq * 1.8 - t * 0.25) * (waveAmp * 0.3);
          const y = lineY + waveOffset;
          if (p === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.strokeStyle = `rgba(40, 22, 48, ${0.28 + normW * 0.28})`;
        ctx.lineWidth = 0.8 + normW * 1.2;
        ctx.stroke();

        // Subtle, Smooth Golden Specular Shimmer on Wave Crests
        const glitterCount = Math.floor(16 + normW * 26);
        const spread = (width * 0.12 + normW * width * 0.40) * glitterSpread;

        for (let g = 0; g < glitterCount; g++) {
          const u = (Math.random() - 0.5) * 2;
          const gx = sunX + u * spread * (Math.random() * 0.7 + 0.3);
          const gy = lineY + (Math.random() - 0.5) * (waveAmp * 1.2);

          const dist = Math.abs(gx - sunX) / spread;
          const gaussianFalloff = Math.exp(-dist * dist * 1.4);

          const shimmer = Math.sin(t * 0.8 + g * 1.7 + normW * 4.2);
          if (shimmer > 0.15) {
            const alpha = Math.pow((shimmer - 0.15) / 0.85, 1.6) * gaussianFalloff * (0.42 - normW * 0.10);
            const size = (0.75 + (1 - normW) * 1.4) * (shimmer * 0.6 + 0.4);

            ctx.fillStyle = `rgba(255, 220, 145, ${alpha * 0.8})`;
            ctx.beginPath();
            ctx.arc(gx, gy, size, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }

      // 6. Floating Illuminated Dust Motes in Sky
      ctx.save();
      ctx.globalCompositeOperation = 'screen';
      for (let i = 0; i < dustParticles.length; i++) {
        const d = dustParticles[i];
        d.x = (d.x + d.vx + 1) % 1;
        d.y = (d.y + d.vy + 1) % 1;

        const px = d.x * width;
        const py = d.y * horizonY;

        const distToSun = Math.hypot(px - sunX, py - sunY);
        const illum = Math.max(0, 1 - distToSun / (width * 0.65));
        const twinkle = 0.4 + 0.6 * Math.sin(t * 1.8 + d.phase);

        if (illum > 0.05) {
          ctx.fillStyle = `rgba(255, 230, 160, ${illum * twinkle * 0.65})`;
          ctx.beginPath();
          ctx.arc(px, py, d.size * (0.8 + illum * 0.5), 0, Math.PI * 2);
          ctx.fill();
        }
      }
      ctx.restore();
    },
  };
}
