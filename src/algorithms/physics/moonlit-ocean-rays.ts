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

      // 3. Subtle & Dreamy Atmospheric Moonbeams (Soft, Wide, Ethereal Silvery-Cyan Haze)
      ctx.save();
      ctx.globalCompositeOperation = 'screen';
      const RAY_COUNT = 12; // Fewer, much broader, silky shafts
      const maxRayDist = Math.hypot(width, height) * 1.15;

      for (let i = 0; i < RAY_COUNT; i++) {
        const normI = i / RAY_COUNT;
        // Broad sweeping angle from top-left across the ocean
        const baseAngle = -Math.PI * 0.02 + normI * (Math.PI * 0.44);

        // Soft undulating atmospheric modulation
        const waveMod = Math.sin(baseAngle * 4.0 + t * 0.2) * 0.05 +
                        Math.cos(baseAngle * 8.0 - t * 0.3) * 0.03;
        const rayAngle = baseAngle + waveMod;

        const targetAngle = Math.PI * 0.20;
        const angleDiff = Math.abs(rayAngle - targetAngle);
        const centralFactor = Math.pow(Math.max(0, 1 - angleDiff / (Math.PI * 0.3)), 1.4);
        const pulse = 0.75 + 0.25 * Math.sin(i * 1.8 + t * 0.9);

        // Subtle, gentle, non-harsh alpha
        const beamAlpha = Math.min(0.18, 0.08 * centralFactor * pulse * beamIntensity);

        if (beamAlpha > 0.008) {
          // Broad, smooth fan width (soft diffuse shafts)
          const spreadWidth = 0.085 + (1 - centralFactor) * 0.045;
          const a1 = rayAngle - spreadWidth;
          const a2 = rayAngle + spreadWidth;

          const moonbeamGrad = ctx.createRadialGradient(moonX, moonY, moonR * 0.8, moonX, moonY, maxRayDist);
          moonbeamGrad.addColorStop(0, `rgba(215, 238, 255, ${beamAlpha * 1.1})`);
          moonbeamGrad.addColorStop(0.25, `rgba(130, 195, 255, ${beamAlpha * 0.7})`);
          moonbeamGrad.addColorStop(0.65, `rgba(40, 110, 190, ${beamAlpha * 0.25})`);
          moonbeamGrad.addColorStop(1.0, 'rgba(0, 10, 30, 0)');

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

      // 4. Soft Earth Atmospheric Lunar Corona (Gentle Optical Glow)
      ctx.save();
      ctx.globalCompositeOperation = 'screen';
      const haloGrad = ctx.createRadialGradient(moonX, moonY, moonR * 0.9, moonX, moonY, width * 0.38);
      haloGrad.addColorStop(0, `rgba(215, 238, 255, ${0.28 * moonGlow})`);
      haloGrad.addColorStop(0.2, `rgba(130, 190, 250, ${0.14 * moonGlow})`);
      haloGrad.addColorStop(0.5, `rgba(30, 85, 160, ${0.04 * moonGlow})`);
      haloGrad.addColorStop(1.0, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = haloGrad;
      ctx.beginPath();
      ctx.arc(moonX, moonY, width * 0.38, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // 5. Photorealistic Lunar Disk (Smooth Regolith & Organic Maria Basalt Seas)
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
      baseMoonGrad.addColorStop(0.55, '#dbe4ee');
      baseMoonGrad.addColorStop(0.85, '#b4c4d6');
      baseMoonGrad.addColorStop(1.0, '#7f93a8');     // Subtle limb shading
      ctx.fillStyle = baseMoonGrad;
      ctx.fillRect(moonX - moonR, moonY - moonR, moonR * 2, moonR * 2);

      // 5b. Lunar Maria (Dark Basalt Lava Plains: Smooth Organic Blends)
      const mariaSeas = [
        { u: -0.32, v: -0.18, rx: 0.38, ry: 0.32, rot: 0.2, dark: 0.38 }, // Oceanus Procellarum
        { u: -0.16, v: -0.34, rx: 0.26, ry: 0.22, rot: -0.1, dark: 0.42 }, // Mare Imbrium
        { u: 0.14, v: -0.26, rx: 0.22, ry: 0.19, rot: 0.15, dark: 0.40 }, // Mare Serenitatis
        { u: 0.28, v: -0.06, rx: 0.24, ry: 0.20, rot: -0.2, dark: 0.40 }, // Mare Tranquillitatis
        { u: 0.46, v: -0.16, rx: 0.13, ry: 0.11, rot: 0.4, dark: 0.46 },  // Mare Crisium
        { u: 0.32, v: 0.16, rx: 0.20, ry: 0.16, rot: 0.1, dark: 0.36 },  // Mare Fecunditatis
        { u: 0.18, v: 0.24, rx: 0.14, ry: 0.12, rot: -0.3, dark: 0.38 },  // Mare Nectaris
        { u: -0.12, v: 0.12, rx: 0.18, ry: 0.14, rot: 0.3, dark: 0.35 },  // Mare Nubium
        { u: -0.30, v: 0.22, rx: 0.15, ry: 0.12, rot: -0.1, dark: 0.34 },  // Mare Humorum
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

        const seaGrad = ctx.createRadialGradient(0, 0, 0, 0, 0, rx * 1.25);
        seaGrad.addColorStop(0, `rgba(50, 68, 88, ${sea.dark})`);
        seaGrad.addColorStop(0.65, `rgba(60, 80, 102, ${sea.dark * 0.7})`);
        seaGrad.addColorStop(1.0, 'rgba(80, 105, 130, 0)');
        ctx.fillStyle = seaGrad;
        ctx.fill();
        ctx.restore();
      }

      // 5c. Soft Natural Impact Craters (Tycho, Copernicus, Kepler with subtle soft halos)
      const craters = [
        { u: 0.06, v: 0.54, r: 0.038, glow: 0.45 },   // Tycho
        { u: -0.22, v: -0.08, r: 0.032, glow: 0.35 },  // Copernicus
        { u: -0.38, v: -0.06, r: 0.022, glow: 0.30 },  // Kepler
        { u: -0.42, v: -0.24, r: 0.020, glow: 0.35 },  // Aristarchus
      ];

      for (let c = 0; c < craters.length; c++) {
        const cr = craters[c];
        const cx0 = moonX + cr.u * moonR;
        const cy0 = moonY + cr.v * moonR;
        const rad = moonR * cr.r;

        // Soft circular ejecta glow
        const crGrad = ctx.createRadialGradient(cx0, cy0, 0, cx0, cy0, rad * 2.5);
        crGrad.addColorStop(0, `rgba(255, 255, 255, ${cr.glow})`);
        crGrad.addColorStop(0.4, `rgba(240, 248, 255, ${cr.glow * 0.4})`);
        crGrad.addColorStop(1.0, 'rgba(200, 220, 240, 0)');
        ctx.fillStyle = crGrad;
        ctx.beginPath();
        ctx.arc(cx0, cy0, rad * 2.5, 0, Math.PI * 2);
        ctx.fill();

        // Crater central depression
        ctx.fillStyle = 'rgba(55, 70, 88, 0.5)';
        ctx.beginPath();
        ctx.arc(cx0, cy0, rad * 0.7, 0, Math.PI * 2);
        ctx.fill();

        // Bright rim glint
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(cx0 - rad * 0.25, cy0 - rad * 0.25, rad * 0.35, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore(); // End lunar clip

      // 6. Soft Volumetric Cirrus Clouds (Delicate, Organic Clouds)
      ctx.save();
      const CLOUD_WISPS = 3;
      for (let c = 0; c < CLOUD_WISPS; c++) {
        const baseY = height * (0.35 + c * 0.08);
        const cloudSpeed = 0.06 + c * 0.03;
        const cloudAlpha = 0.14 + c * 0.06;

        ctx.beginPath();
        const steps = 80;
        ctx.moveTo(0, baseY + 45);

        for (let s = 0; s <= steps; s++) {
          const nx = s / steps;
          const x = nx * width;
          const w1 = Math.sin(nx * 7.0 + t * cloudSpeed + c * 1.5) * 14;
          const w2 = Math.cos(nx * 13.0 - t * cloudSpeed * 1.1) * 8;
          const w3 = Math.sin(nx * 2.5 + t * 0.04) * 18;
          const y = baseY + w1 + w2 + w3;
          ctx.lineTo(x, y);
        }

        ctx.lineTo(width, baseY + 60);
        ctx.lineTo(0, baseY + 60);
        ctx.closePath();

        const cloudGrad = ctx.createLinearGradient(0, baseY - 15, 0, baseY + 60);
        cloudGrad.addColorStop(0, `rgba(8, 20, 42, ${cloudAlpha * 0.5})`);
        cloudGrad.addColorStop(0.5, `rgba(4, 12, 28, ${cloudAlpha})`);
        cloudGrad.addColorStop(1.0, `rgba(2, 6, 16, 0.0)`);
        ctx.fillStyle = cloudGrad;
        ctx.fill();
      }
      ctx.restore();

      // 7. Night Ocean & Well-Spread Shimmering Lunar Wake
      const oceanH = height - horizonY;
      const oceanGrad = ctx.createLinearGradient(0, horizonY, 0, height);
      oceanGrad.addColorStop(0, '#030a17');     // Horizon dark indigo
      oceanGrad.addColorStop(0.3, '#040d20');
      oceanGrad.addColorStop(0.65, '#020714');
      oceanGrad.addColorStop(1.0, '#010308');     // Foreground
      ctx.fillStyle = oceanGrad;
      ctx.fillRect(0, horizonY, width, oceanH);

      // 7a. Broad Moonlight Wash / Ambient Sea Sheen across the water
      ctx.save();
      ctx.globalCompositeOperation = 'screen';
      const seaWash = ctx.createRadialGradient(
        moonX + width * 0.15,
        horizonY + oceanH * 0.2,
        0,
        moonX + width * 0.25,
        horizonY + oceanH * 0.5,
        width * 0.8
      );
      seaWash.addColorStop(0, `rgba(80, 150, 220, ${0.18 * oceanGlitter})`);
      seaWash.addColorStop(0.35, `rgba(35, 80, 140, ${0.09 * oceanGlitter})`);
      seaWash.addColorStop(0.75, `rgba(12, 35, 75, ${0.03 * oceanGlitter})`);
      seaWash.addColorStop(1.0, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = seaWash;
      ctx.fillRect(0, horizonY, width, oceanH);
      ctx.restore();

      // 7b. Full-Width Ocean Waves & Well-Spread Specular Glitter Path
      const WAVE_LINES = 32;
      for (let w = 0; w < WAVE_LINES; w++) {
        const normW = w / WAVE_LINES;
        const lineY = horizonY + Math.pow(normW, 1.4) * oceanH;
        const waveAmp = 0.6 + normW * 4.0;
        const waveFreq = 0.028 - normW * 0.015;

        // Wave crest illumination line across full width
        ctx.beginPath();
        const pts = 90;
        for (let p = 0; p <= pts; p++) {
          const nx = p / pts;
          const x = nx * width;
          const waveOffset = Math.sin(x * waveFreq + t * (1.0 + normW * 1.5) + w * 1.2) * waveAmp +
                             Math.cos(x * waveFreq * 2.0 - t * 0.7) * (waveAmp * 0.3);
          const y = lineY + waveOffset;
          if (p === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }

        // Soft ambient wave crest tint
        ctx.strokeStyle = `rgba(22, 55, 100, ${0.35 + normW * 0.35})`;
        ctx.lineWidth = 0.9 + normW * 1.3;
        ctx.stroke();

        // 7c. Broad, Well-Spread Silver Specular Shimmer across the sea
        const glitterCount = Math.floor(25 + normW * 45);
        // Wake center fans smoothly from moonX (0.22) across towards the center (0.42)
        const wakeCenterX = moonX + normW * (width * 0.20);
        // Much wider, graceful spread (spanning across ~70-80% of the sea width in foreground)
        const spreadWidth = (width * 0.22 + normW * width * 0.52) * oceanGlitter;

        for (let g = 0; g < glitterCount; g++) {
          // Broad natural distribution across the full spread
          const u = (Math.random() - 0.5) * 2;
          const gx = wakeCenterX + u * spreadWidth * (Math.random() * 0.7 + 0.3);
          const gy = lineY + (Math.random() - 0.5) * (waveAmp * 1.5);

          // Gentle smooth Gaussian falloff from the reflection axis
          const distFromAxis = Math.abs(gx - wakeCenterX) / spreadWidth;
          const gaussianFalloff = Math.exp(-distFromAxis * distFromAxis * 1.2);

          const shimmerPhase = Math.sin(t * 3.2 + g * 1.7 + normW * 5.2);
          if (shimmerPhase > 0.15) {
            const alpha = Math.pow((shimmerPhase - 0.15) / 0.85, 1.8) * gaussianFalloff * (0.85 - normW * 0.15);
            const size = (0.9 + (1 - normW) * 1.9) * (shimmerPhase * 0.7 + 0.3);

            ctx.fillStyle = `rgba(230, 245, 255, ${alpha * 0.9})`;
            ctx.beginPath();
            ctx.arc(gx, gy, size, 0, Math.PI * 2);
            ctx.fill();

            // Diamond twinkle lens cross on brightest sparkles
            if (alpha > 0.55 && g % 5 === 0) {
              ctx.strokeStyle = `rgba(210, 240, 255, ${alpha * 0.5})`;
              ctx.lineWidth = 0.6;
              ctx.beginPath();
              ctx.moveTo(gx - size * 2.5, gy);
              ctx.lineTo(gx + size * 2.5, gy);
              ctx.moveTo(gx, gy - size * 2.0);
              ctx.lineTo(gx, gy + size * 2.0);
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
