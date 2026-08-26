import type { ArtRenderer, ParameterState, RenderContext, TimeState } from '../../types/engine';
import { hsla } from '../common/color';

export function createMoonlitOceanRays(): ArtRenderer {
  const STAR_COUNT = 95;
  const BIOLUM_COUNT = 60;

  const stars: Array<{ x: number; y: number; r: number; phase: number }> = [];
  const biolumParticles: Array<{ x: number; y: number; vx: number; vy: number; r: number; phase: number }> = [];

  function initNightSky() {
    stars.length = 0;
    for (let i = 0; i < STAR_COUNT; i++) {
      stars.push({
        x: Math.random(),
        y: Math.random() * 0.6, // Upper night sky
        r: 0.5 + Math.random() * 1.5,
        phase: Math.random() * Math.PI * 2,
      });
    }

    biolumParticles.length = 0;
    for (let i = 0; i < BIOLUM_COUNT; i++) {
      biolumParticles.push({
        x: Math.random(),
        y: 0.65 + Math.random() * 0.35,
        vx: (Math.random() - 0.5) * 0.0008,
        vy: (Math.random() - 0.5) * 0.0005,
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
      const moonGlow = Number(params.moonGlow ?? 1.3);
      const oceanGlitter = Number(params.oceanGlitter ?? 1.1);
      const bioluminescence = Number(params.bioluminescence ?? 1.0);

      const t = timeState.time * speed;

      if (stars.length === 0) {
        initNightSky();
      }

      const moonX = width * 0.22;
      const moonY = height * 0.20;
      const moonR = Math.min(width, height) * 0.082;
      const horizonY = height * 0.63;

      // 1. Midnight Sky Gradient (Deep Abyss Navy & Charcoal)
      const skyGrad = ctx.createLinearGradient(0, 0, 0, horizonY);
      skyGrad.addColorStop(0, '#010309');     // Deepest celestial void
      skyGrad.addColorStop(0.4, '#030815');
      skyGrad.addColorStop(0.75, '#061328');   // Lunar atmospheric haze
      skyGrad.addColorStop(1.0, '#0a1a36');    // Horizon twilight
      ctx.fillStyle = skyGrad;
      ctx.fillRect(0, 0, width, horizonY);

      // 2. Twinkling Celestial Background Stars
      ctx.save();
      for (let s = 0; s < stars.length; s++) {
        const star = stars[s];
        const sx = star.x * width;
        const sy = star.y * horizonY;

        // Skip stars occluded by the moon disk
        if (Math.hypot(sx - moonX, sy - moonY) < moonR * 2.2) continue;

        const twinkle = 0.35 + 0.65 * Math.sin(t * 2.5 + star.phase);
        ctx.fillStyle = `rgba(215, 235, 255, ${twinkle * 0.85})`;
        ctx.beginPath();
        ctx.arc(sx, sy, star.r, 0, Math.PI * 2);
        ctx.fill();

        // 4-point sparkle on prominent stars
        if (star.r > 1.4 && twinkle > 0.8) {
          ctx.strokeStyle = `rgba(180, 220, 255, ${twinkle * 0.4})`;
          ctx.lineWidth = 0.6;
          ctx.beginPath();
          ctx.moveTo(sx - star.r * 2.5, sy);
          ctx.lineTo(sx + star.r * 2.5, sy);
          ctx.moveTo(sx, sy - star.r * 2.5);
          ctx.lineTo(sx, sy + star.r * 2.5);
          ctx.stroke();
        }
      }
      ctx.restore();

      // 3. Volumetric Lunar Silver Beams (Sweeping Diagonally from Top-Left Corner)
      ctx.save();
      ctx.globalCompositeOperation = 'screen';
      const RAY_COUNT = 40;
      const maxRayDist = Math.hypot(width, height) * 1.05;

      for (let i = 0; i < RAY_COUNT; i++) {
        const normI = i / RAY_COUNT;
        // Diagonal sweep pointing downwards and towards the ocean
        const baseAngle = -Math.PI * 0.04 + normI * (Math.PI * 0.62);

        // Nocturnal cloud gap modulation
        const cloudWarp = Math.sin(baseAngle * 6.0 + t * 0.3) * 0.07 +
                          Math.cos(baseAngle * 11.0 - t * 0.45) * 0.04;
        const rayAngle = baseAngle + cloudWarp;

        // Central focus towards ocean horizon (around 45°-55° diagonal)
        const targetDiagAngle = Math.PI * 0.28;
        const distFromCenter = Math.abs(rayAngle - targetDiagAngle);
        const centralFactor = Math.pow(Math.max(0, 1 - distFromCenter / (Math.PI * 0.35)), 1.5);
        const pulse = 0.6 + 0.4 * Math.sin(i * 2.1 + t * 1.4);

        const beamAlpha = Math.min(0.55, 0.26 * centralFactor * pulse * beamIntensity);

        if (beamAlpha > 0.015) {
          const spreadWidth = 0.036 + (1 - centralFactor) * 0.02;
          const a1 = rayAngle - spreadWidth;
          const a2 = rayAngle + spreadWidth;

          const moonbeamGrad = ctx.createRadialGradient(moonX, moonY, moonR * 0.5, moonX, moonY, maxRayDist);
          moonbeamGrad.addColorStop(0, `rgba(240, 248, 255, ${beamAlpha * 1.3})`);
          moonbeamGrad.addColorStop(0.18, `rgba(180, 225, 255, ${beamAlpha})`);
          moonbeamGrad.addColorStop(0.55, `rgba(70, 145, 215, ${beamAlpha * 0.35})`);
          moonbeamGrad.addColorStop(0.9, `rgba(20, 60, 120, ${beamAlpha * 0.1})`);
          moonbeamGrad.addColorStop(1.0, 'rgba(5, 20, 50, 0)');

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

      // 4. Subtle Earth Atmospheric Lunar Halo (Soft, Delicate 22° Ring Veil)
      ctx.save();
      ctx.globalCompositeOperation = 'screen';
      const haloGrad = ctx.createRadialGradient(moonX, moonY, moonR * 1.1, moonX, moonY, width * 0.38);
      haloGrad.addColorStop(0, `rgba(210, 235, 255, ${0.35 * moonGlow})`);
      haloGrad.addColorStop(0.15, `rgba(130, 190, 245, ${0.18 * moonGlow})`);
      haloGrad.addColorStop(0.4, `rgba(40, 100, 180, ${0.06 * moonGlow})`);
      haloGrad.addColorStop(1.0, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = haloGrad;
      ctx.beginPath();
      ctx.arc(moonX, moonY, width * 0.38, 0, Math.PI * 2);
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
      baseMoonGrad.addColorStop(0, '#f1f5f9');    // Bright highland anorthosite
      baseMoonGrad.addColorStop(0.55, '#dbe2ec');
      baseMoonGrad.addColorStop(0.85, '#b4c3d4');
      baseMoonGrad.addColorStop(1.0, '#7f93a8');     // Subtle limb shading
      ctx.fillStyle = baseMoonGrad;
      ctx.fillRect(moonX - moonR, moonY - moonR, moonR * 2, moonR * 2);

      // 5b. Lunar Maria (Dark Basalt Lava Plains: Imbrium, Serenitatis, Tranquillitatis, Procellarum, Crisium)
      const mariaSeas = [
        { u: -0.32, v: -0.18, rx: 0.38, ry: 0.32, rot: 0.2, dark: 0.42 }, // Oceanus Procellarum
        { u: -0.16, v: -0.34, rx: 0.26, ry: 0.22, rot: -0.1, dark: 0.46 }, // Mare Imbrium
        { u: 0.14, v: -0.26, rx: 0.22, ry: 0.19, rot: 0.15, dark: 0.44 }, // Mare Serenitatis
        { u: 0.28, v: -0.06, rx: 0.24, ry: 0.20, rot: -0.2, dark: 0.45 }, // Mare Tranquillitatis
        { u: 0.46, v: -0.16, rx: 0.13, ry: 0.11, rot: 0.4, dark: 0.52 },  // Mare Crisium (isolated oval)
        { u: 0.32, v: 0.16, rx: 0.20, ry: 0.16, rot: 0.1, dark: 0.40 },  // Mare Fecunditatis
        { u: 0.18, v: 0.24, rx: 0.14, ry: 0.12, rot: -0.3, dark: 0.42 },  // Mare Nectaris
        { u: -0.12, v: 0.12, rx: 0.18, ry: 0.14, rot: 0.3, dark: 0.38 },  // Mare Nubium
        { u: -0.30, v: 0.22, rx: 0.15, ry: 0.12, rot: -0.1, dark: 0.36 },  // Mare Humorum
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
        seaGrad.addColorStop(0, `rgba(50, 68, 88, ${sea.dark})`);
        seaGrad.addColorStop(0.7, `rgba(60, 80, 102, ${sea.dark * 0.85})`);
        seaGrad.addColorStop(1.0, 'rgba(80, 105, 130, 0)');
        ctx.fillStyle = seaGrad;
        ctx.fill();
        ctx.restore();
      }

      // 5c. Tycho Crater & Radiating Bright Ejecta Rays (Southern Hemisphere)
      const tychoX = moonX + 0.06 * moonR;
      const tychoY = moonY + 0.54 * moonR;

      ctx.save();
      ctx.globalCompositeOperation = 'lighter';
      // Long ejecta streaks spanning across the southern face
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
      ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
      ctx.beginPath();
      ctx.arc(tychoX, tychoY, moonR * 0.045, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = 'rgba(40, 55, 70, 0.6)';
      ctx.beginPath();
      ctx.arc(tychoX, tychoY, moonR * 0.028, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(tychoX - moonR * 0.006, tychoY - moonR * 0.006, moonR * 0.012, 0, Math.PI * 2);
      ctx.fill();

      // 5d. Copernicus & Kepler Impact Craters (Bright Halos)
      const brightCraters = [
        { u: -0.22, v: -0.08, r: 0.038, name: 'Copernicus' },
        { u: -0.38, v: -0.06, r: 0.024, name: 'Kepler' },
        { u: -0.42, v: -0.24, r: 0.022, name: 'Aristarchus' }, // Extremely high albedo
      ];

      for (let c = 0; c < brightCraters.length; c++) {
        const cr = brightCraters[c];
        const cx0 = moonX + cr.u * moonR;
        const cy0 = moonY + cr.v * moonR;
        const rad = moonR * cr.r;

        // Bright halo
        const crGrad = ctx.createRadialGradient(cx0, cy0, 0, cx0, cy0, rad * 2.8);
        crGrad.addColorStop(0, 'rgba(255, 255, 255, 0.7)');
        crGrad.addColorStop(0.35, 'rgba(240, 248, 255, 0.3)');
        crGrad.addColorStop(1.0, 'rgba(200, 220, 240, 0)');
        ctx.fillStyle = crGrad;
        ctx.beginPath();
        ctx.arc(cx0, cy0, rad * 2.8, 0, Math.PI * 2);
        ctx.fill();

        // Crater depression
        ctx.fillStyle = 'rgba(50, 65, 80, 0.55)';
        ctx.beginPath();
        ctx.arc(cx0, cy0, rad * 0.65, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore(); // End lunar clip

      // 6. Nocturnal Cirrus Cloud Silhouettes
      ctx.save();
      const CLOUDS = 3;
      for (let c = 0; c < CLOUDS; c++) {
        const cloudY = moonY - 30 + c * 32;
        ctx.fillStyle = c === 0 ? 'rgba(5, 12, 24, 0.7)' : c === 1 ? 'rgba(8, 18, 36, 0.82)' : 'rgba(3, 8, 18, 0.92)';
        ctx.beginPath();
        ctx.moveTo(0, cloudY + 45);

        const steps = 60;
        for (let s = 0; s <= steps; s++) {
          const nx = s / steps;
          const x = nx * width;
          const wave1 = Math.sin(nx * 14 + t * 0.12 + c * 2) * 14;
          const wave2 = Math.cos(nx * 26 - t * 0.2) * 8;
          const distToMoon = Math.abs(x - moonX) / (width * 0.3);
          const moonGap = Math.max(0, 1 - distToMoon * distToMoon) * (c === 0 ? 26 : 14);
          const y = cloudY + wave1 + wave2 - moonGap;
          ctx.lineTo(x, y);
        }
        ctx.lineTo(width, cloudY + 65);
        ctx.lineTo(0, cloudY + 65);
        ctx.closePath();
        ctx.fill();
      }
      ctx.restore();

      // 7. Night Ocean & Shimmering Lunar Wake (Silver Moon Track on Water)
      const oceanH = height - horizonY;
      const oceanGrad = ctx.createLinearGradient(0, horizonY, 0, height);
      oceanGrad.addColorStop(0, '#040b18');
      oceanGrad.addColorStop(0.35, '#061024');
      oceanGrad.addColorStop(0.7, '#040916');
      oceanGrad.addColorStop(1.0, '#02050c');
      ctx.fillStyle = oceanGrad;
      ctx.fillRect(0, horizonY, width, oceanH);

      // Ocean Wave Crests & Specular Silver Reflection
      const WAVE_LINES = 26;
      for (let w = 0; w < WAVE_LINES; w++) {
        const normW = w / WAVE_LINES;
        const lineY = horizonY + Math.pow(normW, 1.4) * oceanH;
        const waveAmp = (1 + normW * 4.2);
        const waveFreq = 0.038 - normW * 0.022;

        ctx.beginPath();
        const pts = 70;
        for (let p = 0; p <= pts; p++) {
          const nx = p / pts;
          const x = nx * width;
          const waveOffset = Math.sin(x * waveFreq + t * (1.2 + normW * 1.8) + w * 1.4) * waveAmp;
          const y = lineY + waveOffset;
          if (p === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.strokeStyle = `rgba(20, 50, 95, ${0.45 + normW * 0.4})`;
        ctx.lineWidth = 1 + normW * 1.4;
        ctx.stroke();

        // Silver Specular Shimmer on the Moon Wake (Originating below left-corner moon)
        const glitterCount = Math.floor(16 + normW * 30);
        const wakeCenterX = moonX + normW * (width * 0.14);
        for (let g = 0; g < glitterCount; g++) {
          const spread = (width * 0.06 + normW * width * 0.24) * oceanGlitter;
          const u = (Math.random() - 0.5) * 2;
          const gx = wakeCenterX + u * spread * (Math.random() * 0.85 + 0.15);
          const gy = lineY + (Math.random() - 0.5) * (waveAmp * 1.8);

          const shimmerPhase = Math.sin(t * 3.5 + g * 1.9 + normW * 5.5);
          if (shimmerPhase > 0.3) {
            const alpha = Math.pow((shimmerPhase - 0.3) / 0.7, 2.0) * (1 - normW * 0.25);
            const size = (1.0 + (1 - normW) * 2.2) * (shimmerPhase * 0.8 + 0.2);

            ctx.fillStyle = `rgba(235, 248, 255, ${alpha * 0.95})`;
            ctx.beginPath();
            ctx.arc(gx, gy, size, 0, Math.PI * 2);
            ctx.fill();

            // Diamond twinkle lens cross on brightest moon reflections
            if (alpha > 0.65 && g % 5 === 0) {
              ctx.strokeStyle = `rgba(210, 240, 255, ${alpha * 0.55})`;
              ctx.lineWidth = 0.75;
              ctx.beginPath();
              ctx.moveTo(gx - size * 3, gy);
              ctx.lineTo(gx + size * 3, gy);
              ctx.moveTo(gx, gy - size * 2.5);
              ctx.lineTo(gx, gy + size * 2.5);
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
        const by = horizonY + (bio.y - 0.6) * (oceanH * 1.4);

        if (by > horizonY && by < height) {
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
