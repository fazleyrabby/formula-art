import type { ArtRenderer, ParameterState, RenderContext, TimeState } from '../../types/engine';
import { hsla } from '../common/color';

export function createMoonlitOceanRays(): ArtRenderer {
  const STAR_COUNT = 130;
  const BIOLUM_COUNT = 55;

  const stars: Array<{ x: number; y: number; r: number; phase: number; isBright: boolean }> = [];
  const biolumParticles: Array<{ x: number; y: number; vx: number; vy: number; r: number; phase: number }> = [];

  function initNightSky() {
    stars.length = 0;
    for (let i = 0; i < STAR_COUNT; i++) {
      stars.push({
        x: Math.random(),
        y: Math.random() * 0.62, // Upper night sky down to horizon
        r: 0.4 + Math.random() * 1.4,
        phase: Math.random() * Math.PI * 2,
        isBright: Math.random() < 0.12,
      });
    }

    biolumParticles.length = 0;
    for (let i = 0; i < BIOLUM_COUNT; i++) {
      biolumParticles.push({
        x: Math.random(),
        y: 0.64 + Math.random() * 0.35,
        vx: (Math.random() - 0.5) * 0.0006,
        vy: (Math.random() - 0.5) * 0.0004,
        r: 0.8 + Math.random() * 2.0,
        phase: Math.random() * Math.PI * 2,
      });
    }
  }

  return {
    setup() {
      initNightSky();
    },

    render(context: RenderContext, timeState: TimeState, params: ParameterState) {
      const { ctx, width, height } = context;
      const speed = Number(params.speed ?? 1.0);
      const beamIntensity = Number(params.beamIntensity ?? 1.2);
      const moonGlow = Number(params.moonGlow ?? 1.1);
      const oceanGlitter = Number(params.oceanGlitter ?? 1.2);
      const bioluminescence = Number(params.bioluminescence ?? 1.0);

      const t = timeState.time * speed;

      if (stars.length === 0) {
        initNightSky();
      }

      // Moon position: Top-Left Celestial Corner
      const moonX = width * 0.22;
      const moonY = height * 0.21;
      const moonR = Math.min(width, height) * 0.082;
      const horizonY = height * 0.62;

      // 1. Midnight Sky Gradient (Deep Indigo Void to Atmospheric Horizon)
      const skyGrad = ctx.createLinearGradient(0, 0, 0, horizonY);
      skyGrad.addColorStop(0, '#010308');     // Deepest celestial black
      skyGrad.addColorStop(0.35, '#030818');  // Deep indigo
      skyGrad.addColorStop(0.7, '#06132c');   // Twilight haze
      skyGrad.addColorStop(1.0, '#0a1d3d');   // Ocean horizon glow
      ctx.fillStyle = skyGrad;
      ctx.fillRect(0, 0, width, horizonY);

      // Faint Milky Way / Celestial Dust Veil
      ctx.save();
      ctx.globalCompositeOperation = 'screen';
      const dustGrad = ctx.createLinearGradient(width * 0.4, 0, width * 0.9, horizonY);
      dustGrad.addColorStop(0, 'rgba(30, 60, 110, 0.0)');
      dustGrad.addColorStop(0.5, 'rgba(40, 80, 140, 0.12)');
      dustGrad.addColorStop(1.0, 'rgba(20, 50, 90, 0.0)');
      ctx.fillStyle = dustGrad;
      ctx.fillRect(0, 0, width, horizonY);
      ctx.restore();

      // 2. Twinkling Background Celestial Stars
      ctx.save();
      for (let s = 0; s < stars.length; s++) {
        const star = stars[s];
        const sx = star.x * width;
        const sy = star.y * horizonY;

        // Skip stars occluded by the moon disk
        if (Math.hypot(sx - moonX, sy - moonY) < moonR * 1.8) continue;

        const twinkle = 0.35 + 0.65 * Math.pow(Math.sin(t * 2.2 + star.phase), 2);
        ctx.fillStyle = `rgba(220, 240, 255, ${twinkle * (star.isBright ? 0.95 : 0.65)})`;
        ctx.beginPath();
        ctx.arc(sx, sy, star.r * (star.isBright ? 1.2 : 0.8), 0, Math.PI * 2);
        ctx.fill();

        // 4-point sparkle on prominent stars
        if (star.isBright && twinkle > 0.75) {
          ctx.strokeStyle = `rgba(190, 225, 255, ${twinkle * 0.45})`;
          ctx.lineWidth = 0.6;
          const spLen = star.r * 2.8;
          ctx.beginPath();
          ctx.moveTo(sx - spLen, sy);
          ctx.lineTo(sx + spLen, sy);
          ctx.moveTo(sx, sy - spLen);
          ctx.lineTo(sx, sy + spLen);
          ctx.stroke();
        }
      }
      ctx.restore();

      // 3. Volumetric Silver Moonbeams (Originating cleanly from Top-Left Moon)
      ctx.save();
      ctx.globalCompositeOperation = 'screen';
      const RAY_COUNT = 36;
      const maxRayDist = Math.hypot(width, height) * 1.1;

      for (let i = 0; i < RAY_COUNT; i++) {
        const normI = i / RAY_COUNT;
        // Angles sweeping from slightly above horizontal down across the sea (approx -5° to +75°)
        const baseAngle = -Math.PI * 0.03 + normI * (Math.PI * 0.45);

        // Sinusoidal light gap modulation simulating cloud wisps
        const cloudWarp = Math.sin(baseAngle * 7.0 + t * 0.25) * 0.06 +
                          Math.cos(baseAngle * 13.0 - t * 0.4) * 0.03;
        const rayAngle = baseAngle + cloudWarp;

        // Central focus pointing towards diagonal ocean center (~35°)
        const targetAngle = Math.PI * 0.20;
        const angleDiff = Math.abs(rayAngle - targetAngle);
        const centralFactor = Math.pow(Math.max(0, 1 - angleDiff / (Math.PI * 0.28)), 1.6);
        const pulse = 0.65 + 0.35 * Math.sin(i * 2.3 + t * 1.2);

        const beamAlpha = Math.min(0.48, 0.22 * centralFactor * pulse * beamIntensity);

        if (beamAlpha > 0.015) {
          const spreadWidth = 0.034 + (1 - centralFactor) * 0.018;
          const a1 = rayAngle - spreadWidth;
          const a2 = rayAngle + spreadWidth;

          const moonbeamGrad = ctx.createRadialGradient(moonX, moonY, moonR * 0.6, moonX, moonY, maxRayDist);
          moonbeamGrad.addColorStop(0, `rgba(235, 246, 255, ${beamAlpha * 1.25})`);
          moonbeamGrad.addColorStop(0.18, `rgba(175, 220, 255, ${beamAlpha * 0.85})`);
          moonbeamGrad.addColorStop(0.55, `rgba(60, 135, 210, ${beamAlpha * 0.3})`);
          moonbeamGrad.addColorStop(0.85, `rgba(15, 55, 115, ${beamAlpha * 0.08})`);
          moonbeamGrad.addColorStop(1.0, 'rgba(0, 15, 40, 0)');

          ctx.beginPath();
          ctx.moveTo(moonX, moonY);
          ctx.lineTo(moonX + Math.cos(a1) * maxRayDist, moonY + Math.sin(a1) * maxRayDist);
          ctx.lineTo(moonX + Math.cos(a2) * maxRayDist, moonY + Math.sin(a2) * maxRayDist);
          ctx.closePath();
          ctx.fillStyle = moonbeamGrad;
          ctx.fill();
        }
      }
      ctx.restore();

      // 4. Subtle Earth Atmospheric Lunar Halo (Soft, Translucent 22° Halo Ring)
      ctx.save();
      ctx.globalCompositeOperation = 'screen';
      const haloGrad = ctx.createRadialGradient(moonX, moonY, moonR * 0.9, moonX, moonY, width * 0.36);
      haloGrad.addColorStop(0, `rgba(215, 238, 255, ${0.32 * moonGlow})`);
      haloGrad.addColorStop(0.18, `rgba(140, 195, 250, ${0.16 * moonGlow})`);
      haloGrad.addColorStop(0.45, `rgba(40, 95, 175, ${0.05 * moonGlow})`);
      haloGrad.addColorStop(1.0, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = haloGrad;
      ctx.beginPath();
      ctx.arc(moonX, moonY, width * 0.36, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // 5. Photorealistic Lunar Disk (Spherical Regolith, Maria Basalt Seas & Crater Ejecta Rays)
      ctx.save();
      // Clip to crisp circular lunar limb
      ctx.beginPath();
      ctx.arc(moonX, moonY, moonR, 0, Math.PI * 2);
      ctx.clip();

      // 5a. Base Regolith Spherical Shading (Cool ashen-silver highlands)
      const baseMoonGrad = ctx.createRadialGradient(
        moonX - moonR * 0.22,
        moonY - moonR * 0.22,
        moonR * 0.05,
        moonX,
        moonY,
        moonR
      );
      baseMoonGrad.addColorStop(0, '#f8fafc');    // Bright highland anorthosite
      baseMoonGrad.addColorStop(0.55, '#dce5f0');
      baseMoonGrad.addColorStop(0.85, '#b4c5d8');
      baseMoonGrad.addColorStop(1.0, '#7f94aa');     // Subtle limb shading
      ctx.fillStyle = baseMoonGrad;
      ctx.fillRect(moonX - moonR, moonY - moonR, moonR * 2, moonR * 2);

      // 5b. Lunar Maria (Dark Basalt Lava Plains: Imbrium, Serenitatis, Tranquillitatis, Procellarum, Crisium)
      const mariaSeas = [
        { u: -0.32, v: -0.18, rx: 0.38, ry: 0.32, rot: 0.2, dark: 0.44 }, // Oceanus Procellarum
        { u: -0.16, v: -0.34, rx: 0.26, ry: 0.22, rot: -0.1, dark: 0.48 }, // Mare Imbrium
        { u: 0.14, v: -0.26, rx: 0.22, ry: 0.19, rot: 0.15, dark: 0.45 }, // Mare Serenitatis
        { u: 0.28, v: -0.06, rx: 0.24, ry: 0.20, rot: -0.2, dark: 0.46 }, // Mare Tranquillitatis
        { u: 0.46, v: -0.16, rx: 0.13, ry: 0.11, rot: 0.4, dark: 0.52 },  // Mare Crisium (isolated oval)
        { u: 0.32, v: 0.16, rx: 0.20, ry: 0.16, rot: 0.1, dark: 0.42 },  // Mare Fecunditatis
        { u: 0.18, v: 0.24, rx: 0.14, ry: 0.12, rot: -0.3, dark: 0.43 },  // Mare Nectaris
        { u: -0.12, v: 0.12, rx: 0.18, ry: 0.14, rot: 0.3, dark: 0.40 },  // Mare Nubium
        { u: -0.30, v: 0.22, rx: 0.15, ry: 0.12, rot: -0.1, dark: 0.38 },  // Mare Humorum
      ];

      for (let m = 0; m < mariaSeas.length; m++) {
        const sea = mariaSeas[m];
        const sx = moonX + sea.u * moonR;
        const sy = moonY + sea.v * moonR;
        const rx = sea.rx * moonR;
        const ry = sea.ry * moonR;

        ctx.save();
        ctx.translate(sx, sy);
        ctx.rotate(sea.rot);

        // Organic basalt perimeter
        ctx.beginPath();
        const steps = 32;
        for (let st = 0; st <= steps; st++) {
          const theta = (st / steps) * Math.PI * 2;
          const noise = 1.0 + Math.sin(theta * 3.0 + m) * 0.12 + Math.cos(theta * 5.0 - m) * 0.08;
          const px = Math.cos(theta) * rx * noise;
          const py = Math.sin(theta) * ry * noise;
          if (st === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        ctx.closePath();

        const seaGrad = ctx.createRadialGradient(0, 0, 0, 0, 0, rx * 1.2);
        seaGrad.addColorStop(0, `rgba(45, 62, 82, ${sea.dark})`);
        seaGrad.addColorStop(0.7, `rgba(55, 75, 98, ${sea.dark * 0.85})`);
        seaGrad.addColorStop(1.0, 'rgba(75, 100, 125, 0)');
        ctx.fillStyle = seaGrad;
        ctx.fill();
        ctx.restore();
      }

      // 5c. Tycho Crater & Radiating Bright Ejecta Rays (Southern Hemisphere)
      const tychoX = moonX + 0.06 * moonR;
      const tychoY = moonY + 0.54 * moonR;

      ctx.save();
      ctx.globalCompositeOperation = 'lighter';
      const RAY_STREAKS = 18;
      for (let r = 0; r < RAY_STREAKS; r++) {
        const rayAngle = (r / RAY_STREAKS) * Math.PI * 2 + (r % 3) * 0.15;
        const rayLen = moonR * (0.4 + (r % 4) * 0.22);
        const rayWidth = 0.04 + (r % 2) * 0.02;

        const rayGrad = ctx.createLinearGradient(
          tychoX,
          tychoY,
          tychoX + Math.cos(rayAngle) * rayLen,
          tychoY + Math.sin(rayAngle) * rayLen
        );
        rayGrad.addColorStop(0, 'rgba(255, 255, 255, 0.45)');
        rayGrad.addColorStop(0.3, 'rgba(240, 248, 255, 0.25)');
        rayGrad.addColorStop(1.0, 'rgba(210, 230, 250, 0)');

        ctx.beginPath();
        ctx.moveTo(tychoX, tychoY);
        ctx.lineTo(
          tychoX + Math.cos(rayAngle - rayWidth) * rayLen,
          tychoY + Math.sin(rayAngle - rayWidth) * rayLen
        );
        ctx.lineTo(
          tychoX + Math.cos(rayAngle + rayWidth) * rayLen,
          tychoY + Math.sin(rayAngle + rayWidth) * rayLen
        );
        ctx.closePath();
        ctx.fillStyle = rayGrad;
        ctx.fill();
      }
      ctx.restore();

      // Tycho crater rim and central peak
      ctx.fillStyle = 'rgba(255, 255, 255, 0.88)';
      ctx.beginPath();
      ctx.arc(tychoX, tychoY, moonR * 0.045, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = 'rgba(35, 50, 65, 0.6)';
      ctx.beginPath();
      ctx.arc(tychoX, tychoY, moonR * 0.028, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(tychoX - moonR * 0.006, tychoY - moonR * 0.006, moonR * 0.012, 0, Math.PI * 2);
      ctx.fill();

      // 5d. Copernicus & Kepler Impact Craters (Bright Halos)
      const brightCraters = [
        { u: -0.22, v: -0.08, r: 0.038 },
        { u: -0.38, v: -0.06, r: 0.024 },
        { u: -0.42, v: -0.24, r: 0.022 },
      ];

      for (let c = 0; c < brightCraters.length; c++) {
        const cr = brightCraters[c];
        const cx0 = moonX + cr.u * moonR;
        const cy0 = moonY + cr.v * moonR;
        const rad = moonR * cr.r;

        const crGrad = ctx.createRadialGradient(cx0, cy0, 0, cx0, cy0, rad * 2.8);
        crGrad.addColorStop(0, 'rgba(255, 255, 255, 0.72)');
        crGrad.addColorStop(0.35, 'rgba(240, 248, 255, 0.32)');
        crGrad.addColorStop(1.0, 'rgba(200, 220, 240, 0)');
        ctx.fillStyle = crGrad;
        ctx.beginPath();
        ctx.arc(cx0, cy0, rad * 2.8, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = 'rgba(45, 60, 75, 0.58)';
        ctx.beginPath();
        ctx.arc(cx0, cy0, rad * 0.65, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore(); // End lunar clip

      // 6. Soft Volumetric Cirrus Clouds (Delicate, Organic Clouds — No Hard Cutoff Bars!)
      ctx.save();
      const CLOUD_WISPS = 4;
      for (let c = 0; c < CLOUD_WISPS; c++) {
        const baseY = height * (0.34 + c * 0.08);
        const cloudSpeed = 0.08 + c * 0.04;
        const cloudAlpha = 0.18 + c * 0.08;

        ctx.beginPath();
        const steps = 80;
        ctx.moveTo(0, baseY + 40);

        for (let s = 0; s <= steps; s++) {
          const nx = s / steps;
          const x = nx * width;
          // Harmonic undulating wave
          const w1 = Math.sin(nx * 8.0 + t * cloudSpeed + c * 1.5) * 16;
          const w2 = Math.cos(nx * 15.0 - t * cloudSpeed * 1.2) * 9;
          const w3 = Math.sin(nx * 3.0 + t * 0.05) * 22;
          const y = baseY + w1 + w2 + w3;
          ctx.lineTo(x, y);
        }

        ctx.lineTo(width, baseY + 60);
        ctx.lineTo(0, baseY + 60);
        ctx.closePath();

        const cloudGrad = ctx.createLinearGradient(0, baseY - 20, 0, baseY + 60);
        cloudGrad.addColorStop(0, `rgba(8, 20, 42, ${cloudAlpha * 0.6})`);
        cloudGrad.addColorStop(0.4, `rgba(5, 14, 30, ${cloudAlpha})`);
        cloudGrad.addColorStop(1.0, `rgba(2, 6, 16, 0.0)`);
        ctx.fillStyle = cloudGrad;
        ctx.fill();

        // Silver rim-light on upper cloud fringe near the moon
        ctx.strokeStyle = `rgba(180, 220, 255, ${cloudAlpha * 0.4})`;
        ctx.lineWidth = 1.0;
        ctx.stroke();
      }
      ctx.restore();

      // 7. Night Ocean & Shimmering Lunar Wake (Silver Moon Track on Water)
      const oceanH = height - horizonY;
      const oceanGrad = ctx.createLinearGradient(0, horizonY, 0, height);
      oceanGrad.addColorStop(0, '#040b18');     // Horizon indigo
      oceanGrad.addColorStop(0.35, '#050e22');
      oceanGrad.addColorStop(0.7, '#030816');
      oceanGrad.addColorStop(1.0, '#01040a');     // Deep foreground
      ctx.fillStyle = oceanGrad;
      ctx.fillRect(0, horizonY, width, oceanH);

      // Ocean Wave Crests & Perspective Gerstner Wave Undulation
      const WAVE_LINES = 28;
      for (let w = 0; w < WAVE_LINES; w++) {
        const normW = w / WAVE_LINES;
        const lineY = horizonY + Math.pow(normW, 1.45) * oceanH;
        const waveAmp = 0.8 + normW * 4.5;
        const waveFreq = 0.032 - normW * 0.018;

        // Wave surface crest line
        ctx.beginPath();
        const pts = 80;
        for (let p = 0; p <= pts; p++) {
          const nx = p / pts;
          const x = nx * width;
          const waveOffset = Math.sin(x * waveFreq + t * (1.1 + normW * 1.6) + w * 1.3) * waveAmp +
                             Math.cos(x * waveFreq * 2.2 - t * 0.8) * (waveAmp * 0.35);
          const y = lineY + waveOffset;
          if (p === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.strokeStyle = `rgba(18, 48, 92, ${0.4 + normW * 0.45})`;
        ctx.lineWidth = 1.0 + normW * 1.5;
        ctx.stroke();

        // Silver Specular Shimmer on the Moon Wake (Originating directly under Top-Left Moon)
        const glitterCount = Math.floor(18 + normW * 34);
        // Wake center fans gently from moonX (0.22) at horizon towards 0.38 in foreground
        const wakeCenterX = moonX + normW * (width * 0.16);
        const spread = (width * 0.07 + normW * width * 0.28) * oceanGlitter;

        for (let g = 0; g < glitterCount; g++) {
          const u = (Math.random() - 0.5) * 2;
          const gx = wakeCenterX + u * spread * (Math.random() * 0.85 + 0.15);
          const gy = lineY + (Math.random() - 0.5) * (waveAmp * 1.6);

          const distFromAxis = Math.abs(gx - wakeCenterX) / spread;
          const gaussianFalloff = Math.exp(-distFromAxis * distFromAxis * 2.5);

          const shimmerPhase = Math.sin(t * 3.6 + g * 1.9 + normW * 6.0);
          if (shimmerPhase > 0.25) {
            const alpha = Math.pow((shimmerPhase - 0.25) / 0.75, 2.0) * gaussianFalloff * (1 - normW * 0.22);
            const size = (1.0 + (1 - normW) * 2.2) * (shimmerPhase * 0.8 + 0.2);

            ctx.fillStyle = `rgba(235, 248, 255, ${alpha * 0.96})`;
            ctx.beginPath();
            ctx.arc(gx, gy, size, 0, Math.PI * 2);
            ctx.fill();

            // Diamond twinkle lens cross on brightest reflections
            if (alpha > 0.65 && g % 4 === 0) {
              ctx.strokeStyle = `rgba(215, 242, 255, ${alpha * 0.55})`;
              ctx.lineWidth = 0.7;
              ctx.beginPath();
              ctx.moveTo(gx - size * 2.8, gy);
              ctx.lineTo(gx + size * 2.8, gy);
              ctx.moveTo(gx, gy - size * 2.4);
              ctx.lineTo(gx, gy + size * 2.4);
              ctx.stroke();
            }
          }
        }
      }

      // 8. Bioluminescent Marine Phytoplankton Particles (Glowing Cyan/Emerald)
      ctx.save();
      ctx.globalCompositeOperation = 'screen';
      for (let b = 0; b < biolumParticles.length; b++) {
        const bio = biolumParticles[b];
        bio.x = (bio.x + bio.vx + 1) % 1;
        bio.y = (bio.y + bio.vy + 1) % 1;

        const bx = bio.x * width;
        const by = horizonY + (bio.y - 0.62) * (oceanH * 1.35);

        if (by > horizonY + 5 && by < height) {
          const glowPhase = Math.sin(t * 2.2 + bio.phase);
          if (glowPhase > 0) {
            const bioAlpha = glowPhase * 0.65 * bioluminescence;
            ctx.fillStyle = `rgba(45, 235, 215, ${bioAlpha})`;
            ctx.beginPath();
            ctx.arc(bx, by, bio.r * (0.8 + glowPhase * 0.4), 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }
      ctx.restore();
    },
  };
}
