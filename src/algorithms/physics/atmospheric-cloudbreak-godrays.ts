import type { ArtRenderer, ParameterState, RenderContext, TimeState } from '../../types/engine';
import { hsla } from '../common/color';

export function createAtmosphericCloudbreakGodrays(): ArtRenderer {
  const AEROSOL_COUNT = 100;
  const aerosols: Array<{ x: number; y: number; vx: number; vy: number; r: number; phase: number }> = [];

  function initAerosols() {
    aerosols.length = 0;
    for (let i = 0; i < AEROSOL_COUNT; i++) {
      aerosols.push({
        x: Math.random(),
        y: Math.random(),
        vx: (Math.random() - 0.5) * 0.0008,
        vy: -0.0003 - Math.random() * 0.0006,
        r: 0.6 + Math.random() * 2.2,
        phase: Math.random() * Math.PI * 2,
      });
    }
  }

  return {
    setup() {
      initAerosols();
    },

    render(context: RenderContext, timeState: TimeState, params: ParameterState) {
      const { ctx, width, height } = context;
      const speed = Number(params.speed ?? 1.0);
      const beamSharpness = Number(params.beamSharpness ?? 1.3);
      const cloudContrast = Number(params.cloudContrast ?? 1.1);
      const sunAngle = Number(params.sunAngle ?? 0.0);
      const scatteringAerosol = Number(params.scatteringAerosol ?? 1.0);

      const t = timeState.time * speed;

      if (aerosols.length === 0) {
        initAerosols();
      }

      // Sun source coordinates
      const sunX = width * 0.5 + Math.sin(sunAngle) * (width * 0.25);
      const sunY = height * 0.35;

      // 1. Deep Atmospheric Sky Background
      const skyGrad = ctx.createRadialGradient(sunX, sunY, 0, sunX, sunY, Math.hypot(width, height));
      skyGrad.addColorStop(0, '#5a3d1b');     // Warm radiant core
      skyGrad.addColorStop(0.25, '#2e2528');
      skyGrad.addColorStop(0.55, '#191924');  // Atmospheric haze
      skyGrad.addColorStop(1.0, '#0c0d14');   // Deep space dusk
      ctx.fillStyle = skyGrad;
      ctx.fillRect(0, 0, width, height);

      // 2. High-Intensity Sun Glare & Lens Halo
      ctx.save();
      const sunFlare = ctx.createRadialGradient(sunX, sunY, 0, sunX, sunY, width * 0.55);
      sunFlare.addColorStop(0, 'rgba(255, 255, 250, 1.0)');
      sunFlare.addColorStop(0.06, 'rgba(255, 240, 180, 0.9)');
      sunFlare.addColorStop(0.2, 'rgba(255, 180, 70, 0.45)');
      sunFlare.addColorStop(0.5, 'rgba(180, 80, 20, 0.15)');
      sunFlare.addColorStop(1.0, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = sunFlare;
      ctx.beginPath();
      ctx.arc(sunX, sunY, width * 0.55, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // 3. Volumetric Mie Forward Scattering Rays (Henyey-Greenstein Model)
      ctx.save();
      ctx.globalCompositeOperation = 'screen';
      const RAY_BEAMS = 54;
      const maxRayDist = Math.hypot(width, height) * 0.95;

      for (let i = 0; i < RAY_BEAMS; i++) {
        const normI = i / RAY_BEAMS;
        const baseTheta = normI * Math.PI * 2;

        // Henyey-Greenstein forward scattering phase: concentrated downward and diagonally
        const downwardFactor = Math.sin(baseTheta); // > 0 for downward rays
        if (downwardFactor < -0.2) continue; // Skip upward occluded rays

        // Harmonic cloud gap modulation
        const gap1 = Math.sin(baseTheta * 8.0 + t * 0.5) * 0.06;
        const gap2 = Math.cos(baseTheta * 15.0 - t * 0.8) * 0.04;
        const gap3 = Math.sin(baseTheta * 29.0 + t * 1.2) * 0.02;
        const theta = baseTheta + (gap1 + gap2 + gap3) * (2.0 - cloudContrast);

        // Beam intensity power sharpening
        const forwardWeight = Math.pow(Math.max(0, (downwardFactor + 0.2) / 1.2), 1.4);
        const turbulence = Math.sin(i * 3.7 + t * 2.0) * Math.cos(i * 1.9 - t * 1.3);
        const dynamicIntensity = 0.6 + 0.4 * turbulence;

        const rayAlpha = Math.min(0.7, 0.42 * forwardWeight * dynamicIntensity * beamSharpness);

        if (rayAlpha > 0.02) {
          const halfWidth = 0.04 / beamSharpness;
          const th1 = theta - halfWidth;
          const th2 = theta + halfWidth;

          const beamGrad = ctx.createRadialGradient(sunX, sunY, 0, sunX, sunY, maxRayDist);
          beamGrad.addColorStop(0, `rgba(255, 255, 240, ${rayAlpha * 1.4})`);
          beamGrad.addColorStop(0.15, `rgba(255, 225, 140, ${rayAlpha})`);
          beamGrad.addColorStop(0.5, `rgba(240, 140, 50, ${rayAlpha * 0.45})`);
          beamGrad.addColorStop(0.85, `rgba(180, 60, 15, ${rayAlpha * 0.15})`);
          beamGrad.addColorStop(1.0, 'rgba(100, 30, 10, 0)');

          ctx.beginPath();
          ctx.moveTo(sunX, sunY);
          ctx.lineTo(sunX + Math.cos(th1) * maxRayDist, sunY + Math.sin(th1) * maxRayDist);
          ctx.lineTo(sunX + Math.cos(th2) * maxRayDist, sunY + Math.sin(th2) * maxRayDist);
          ctx.closePath();
          ctx.fillStyle = beamGrad;
          ctx.fill();
        }
      }
      ctx.restore();

      // 4. Heavy Cumulus Cloud Formations (Edge Back-Lighting & Dramatic Occlusion)
      ctx.save();
      const CLOUD_CLUSTERS = 5;
      for (let c = 0; c < CLOUD_CLUSTERS; c++) {
        const normC = c / CLOUD_CLUSTERS;
        const cxCenter = width * (0.2 + normC * 0.6) + Math.sin(t * 0.2 + c) * 30;
        const cyCenter = height * (0.2 + (c % 3) * 0.18);

        // Draw cloud puff cluster
        const PUFFS = 12;
        for (let p = 0; p < PUFFS; p++) {
          const pNorm = p / PUFFS;
          const pAng = pNorm * Math.PI * 2;
          const pDist = 35 + Math.sin(p * 3 + t * 0.4) * 15;
          const px = cxCenter + Math.cos(pAng) * pDist * 1.8;
          const py = cyCenter + Math.sin(pAng) * pDist * 0.9;
          const pRadius = 45 + Math.cos(p * 2 + c) * 18;

          // Rim lighting: edges facing sun glow bright gold
          const distToSun = Math.hypot(px - sunX, py - sunY);
          const rimFactor = Math.max(0, 1 - distToSun / (width * 0.45));

          const cloudGrad = ctx.createRadialGradient(px, py, pRadius * 0.2, px, py, pRadius);
          cloudGrad.addColorStop(0, `rgba(32, 26, 36, ${0.9 * cloudContrast})`);
          cloudGrad.addColorStop(0.7, `rgba(20, 16, 25, ${0.95 * cloudContrast})`);
          cloudGrad.addColorStop(1.0, `rgba(255, 200, 100, ${rimFactor * 0.45})`);

          ctx.fillStyle = cloudGrad;
          ctx.beginPath();
          ctx.arc(px, py, pRadius, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      ctx.restore();

      // 5. Shimmering Atmospheric Aerosol Dust Particulates
      ctx.save();
      ctx.globalCompositeOperation = 'screen';
      for (let i = 0; i < aerosols.length; i++) {
        const a = aerosols[i];
        a.x = (a.x + a.vx + 1) % 1;
        a.y = (a.y + a.vy + 1) % 1;

        const ax = a.x * width;
        const ay = a.y * height;

        const dist = Math.hypot(ax - sunX, ay - sunY);
        const inBeamIntensity = Math.max(0, 1 - dist / (width * 0.7));
        const flicker = 0.5 + 0.5 * Math.sin(t * 3.5 + a.phase);

        if (inBeamIntensity > 0.05) {
          const alpha = inBeamIntensity * flicker * scatteringAerosol * 0.85;
          ctx.fillStyle = `rgba(255, 240, 190, ${alpha})`;
          ctx.beginPath();
          ctx.arc(ax, ay, a.r * (0.8 + inBeamIntensity * 0.6), 0, Math.PI * 2);
          ctx.fill();

          // Flare diamond on brightest aerosols
          if (alpha > 0.5 && i % 6 === 0) {
            ctx.strokeStyle = `rgba(255, 220, 150, ${alpha * 0.5})`;
            ctx.lineWidth = 0.75;
            ctx.beginPath();
            ctx.moveTo(ax - a.r * 3, ay);
            ctx.lineTo(ax + a.r * 3, ay);
            ctx.moveTo(ax, ay - a.r * 3);
            ctx.lineTo(ax, ay + a.r * 3);
            ctx.stroke();
          }
        }
      }
      ctx.restore();
    },
  };
}
