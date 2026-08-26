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

      // 1. Sky Background Gradient
      const skyGrad = ctx.createLinearGradient(0, 0, 0, horizonY);
      skyGrad.addColorStop(0, '#0a0d1a'); // Deep dusk navy
      skyGrad.addColorStop(0.35, '#1e1c2e');
      skyGrad.addColorStop(0.65, '#542d22'); // Warm amber
      skyGrad.addColorStop(0.9, '#a05c1b');  // Golden dusk
      skyGrad.addColorStop(1.0, '#d98a2b');
      ctx.fillStyle = skyGrad;
      ctx.fillRect(0, 0, width, horizonY);

      // 2. Sun Glow & Core Corona
      ctx.save();
      const coronaGrad = ctx.createRadialGradient(sunX, sunY, 0, sunX, sunY, width * 0.45);
      coronaGrad.addColorStop(0, 'rgba(255, 255, 240, 1.0)');
      coronaGrad.addColorStop(0.08, 'rgba(255, 230, 150, 0.85)');
      coronaGrad.addColorStop(0.22, 'rgba(255, 170, 60, 0.4)');
      coronaGrad.addColorStop(0.5, 'rgba(220, 100, 30, 0.15)');
      coronaGrad.addColorStop(1.0, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = coronaGrad;
      ctx.beginPath();
      ctx.arc(sunX, sunY, width * 0.45, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // 3. Volumetric Crepuscular Ray Beams (Mie Forward Scattering & Radial Occlusion)
      ctx.save();
      ctx.globalCompositeOperation = 'screen';
      const RAY_COUNT = 44;
      const maxRayLen = Math.hypot(width, height) * 0.85;

      for (let i = 0; i < RAY_COUNT; i++) {
        const baseAngle = (i / RAY_COUNT) * Math.PI + (Math.PI * 0.0); // Facing downward 180°
        // Cloud occlusion harmonic modulation
        const cloudWarp = Math.sin(baseAngle * 5.0 + t * 0.4) * 0.08 +
                          Math.cos(baseAngle * 9.0 - t * 0.6) * 0.05 +
                          Math.sin(baseAngle * 17.0 + t * 0.8) * 0.03;

        const rayAngle = baseAngle + cloudWarp * cloudDensity;
        
        // Intensity envelope: brightest directly below sun, soft at periphery
        const angleDiff = Math.abs(rayAngle - Math.PI * 0.5);
        const centralFactor = Math.pow(Math.max(0, 1 - angleDiff / (Math.PI * 0.45)), 1.6);
        
        // Temporal flicker & breathing
        const beamPulse = 0.6 + 0.4 * Math.sin(i * 1.7 + t * 1.5) * Math.cos(i * 3.1 - t * 0.9);
        const beamAlpha = Math.min(0.7, 0.35 * centralFactor * beamPulse * rayIntensity);

        if (beamAlpha > 0.02) {
          const spreadWidth = 0.045 + (1 - centralFactor) * 0.03;
          const leftAngle = rayAngle - spreadWidth;
          const rightAngle = rayAngle + spreadWidth;

          const rayGrad = ctx.createRadialGradient(sunX, sunY, 0, sunX, sunY, maxRayLen);
          rayGrad.addColorStop(0, `rgba(255, 245, 200, ${beamAlpha * 1.2})`);
          rayGrad.addColorStop(0.2, `rgba(255, 210, 120, ${beamAlpha})`);
          rayGrad.addColorStop(0.55, `rgba(235, 140, 50, ${beamAlpha * 0.4})`);
          rayGrad.addColorStop(1.0, 'rgba(180, 70, 20, 0)');

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

      // 4. Cloud Silhouette Formations (Blocking & Framing Sun)
      ctx.save();
      const CLOUD_LAYERS = 3;
      for (let c = 0; c < CLOUD_LAYERS; c++) {
        const cloudY = sunY - 45 + c * 38;
        ctx.fillStyle = c === 0 ? 'rgba(25, 20, 32, 0.75)' : c === 1 ? 'rgba(38, 25, 35, 0.85)' : 'rgba(18, 14, 24, 0.95)';
        ctx.beginPath();
        ctx.moveTo(0, cloudY + 50);

        const steps = 60;
        for (let s = 0; s <= steps; s++) {
          const nx = s / steps;
          const x = nx * width;
          const puff1 = Math.sin(nx * 12 + t * 0.15 + c * 2) * 16;
          const puff2 = Math.cos(nx * 24 - t * 0.25) * 9;
          const puff3 = Math.sin(nx * 42 + c) * 5;
          const distToSun = Math.abs(x - sunX) / (width * 0.35);
          // Central opening for sun rays to burst through
          const gapDip = Math.max(0, 1 - distToSun * distToSun) * (c === 0 ? 32 : 18);
          const y = cloudY + puff1 + puff2 + puff3 - gapDip;
          ctx.lineTo(x, y);
        }
        ctx.lineTo(width, cloudY + 70);
        ctx.lineTo(0, cloudY + 70);
        ctx.closePath();
        ctx.fill();
      }
      ctx.restore();

      // 5. Ocean Water & Ambient Sunset Glow
      const oceanH = height - horizonY;
      const oceanGrad = ctx.createLinearGradient(0, horizonY, 0, height);
      oceanGrad.addColorStop(0, '#100c14');
      oceanGrad.addColorStop(0.3, '#1c131a');
      oceanGrad.addColorStop(0.7, '#15101c');
      oceanGrad.addColorStop(1.0, '#0a0810');
      ctx.fillStyle = oceanGrad;
      ctx.fillRect(0, horizonY, width, oceanH);

      // 5a. Soft Golden Sunset Sheen across water
      ctx.save();
      ctx.globalCompositeOperation = 'screen';
      const seaWash = ctx.createRadialGradient(sunX, horizonY, 0, sunX, horizonY + oceanH * 0.4, width * 0.65);
      seaWash.addColorStop(0, `rgba(220, 130, 45, ${0.25 * glitterSpread})`);
      seaWash.addColorStop(0.4, `rgba(160, 75, 20, ${0.12 * glitterSpread})`);
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
          const waveOffset = Math.sin(x * waveFreq + t * (0.35 + normW * 0.45) + w * 1.3) * waveAmp +
                             Math.cos(x * waveFreq * 1.8 - t * 0.28) * (waveAmp * 0.3);
          const y = lineY + waveOffset;
          if (p === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.strokeStyle = `rgba(45, 30, 52, ${0.3 + normW * 0.3})`;
        ctx.lineWidth = 0.8 + normW * 1.2;
        ctx.stroke();

        // Subtle, Smooth Golden Glitter on Wave Crests
        const glitterCount = Math.floor(16 + normW * 26);
        const spread = (width * 0.12 + normW * width * 0.38) * glitterSpread;

        for (let g = 0; g < glitterCount; g++) {
          const u = (Math.random() - 0.5) * 2;
          const gx = sunX + u * spread * (Math.random() * 0.7 + 0.3);
          const gy = lineY + (Math.random() - 0.5) * (waveAmp * 1.2);

          const dist = Math.abs(gx - sunX) / spread;
          const gaussianFalloff = Math.exp(-dist * dist * 1.4);

          const shimmer = Math.sin(t * 0.8 + g * 1.7 + normW * 4.2);
          if (shimmer > 0.15) {
            const alpha = Math.pow((shimmer - 0.15) / 0.85, 1.6) * gaussianFalloff * (0.48 - normW * 0.12);
            const size = (0.75 + (1 - normW) * 1.5) * (shimmer * 0.6 + 0.4);

            ctx.fillStyle = `rgba(255, 225, 155, ${alpha * 0.85})`;
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
        const py = d.y * horizonY; // Sky area only

        // Proximity to sun / light beams increases mote luminosity
        const distToSun = Math.hypot(px - sunX, py - sunY);
        const illum = Math.max(0, 1 - distToSun / (width * 0.65));
        const twinkle = 0.4 + 0.6 * Math.sin(t * 2.0 + d.phase);

        if (illum > 0.05) {
          ctx.fillStyle = `rgba(255, 235, 170, ${illum * twinkle * 0.75})`;
          ctx.beginPath();
          ctx.arc(px, py, d.size * (0.8 + illum * 0.5), 0, Math.PI * 2);
          ctx.fill();
        }
      }
      ctx.restore();
    },
  };
}
