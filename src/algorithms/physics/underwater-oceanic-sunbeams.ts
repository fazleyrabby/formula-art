import type { ArtRenderer, ParameterState, RenderContext, TimeState } from '../../types/engine';
import { hsla } from '../common/color';

export function createUnderwaterOceanicSunbeams(): ArtRenderer {
  const MARINE_SNOW_COUNT = 90;
  const FISH_COUNT = 32;

  const marineSnow: Array<{ x: number; y: number; vy: number; vx: number; size: number; phase: number }> = [];
  const fishSchool: Array<{ x: number; y: number; speed: number; size: number; phase: number; depth: number }> = [];

  function initOcean() {
    marineSnow.length = 0;
    for (let i = 0; i < MARINE_SNOW_COUNT; i++) {
      marineSnow.push({
        x: Math.random(),
        y: Math.random(),
        vx: (Math.random() - 0.5) * 0.0006,
        vy: 0.0003 + Math.random() * 0.0007,
        size: 0.8 + Math.random() * 2.0,
        phase: Math.random() * Math.PI * 2,
      });
    }

    fishSchool.length = 0;
    for (let i = 0; i < FISH_COUNT; i++) {
      fishSchool.push({
        x: Math.random(),
        y: 0.35 + Math.random() * 0.5,
        speed: 0.0008 + Math.random() * 0.0014,
        size: 3.5 + Math.random() * 4.5,
        phase: Math.random() * Math.PI * 2,
        depth: Math.random(),
      });
    }
  }

  return {
    setup() {
      initOcean();
    },

    render(context: RenderContext, timeState: TimeState, params: ParameterState) {
      const { ctx, width, height } = context;
      const speed = Number(params.speed ?? 1.0);
      const shaftIntensity = Number(params.shaftIntensity ?? 1.2);
      const waterClarity = Number(params.waterClarity ?? 1.0);
      const causticSpeed = Number(params.causticSpeed ?? 1.3);
      const kelpHeight = Number(params.kelpHeight ?? 1.0);

      const t = timeState.time * speed;

      if (marineSnow.length === 0) {
        initOcean();
      }

      // 1. Deep Ocean Water Gradient (Exponential Light Absorption)
      const waterGrad = ctx.createLinearGradient(0, 0, 0, height);
      waterGrad.addColorStop(0, '#044368');     // Luminous surface turquoise
      waterGrad.addColorStop(0.25, '#022949');
      waterGrad.addColorStop(0.6, '#01162d');   // Deep abyss indigo
      waterGrad.addColorStop(1.0, '#000814');   // Floor black-blue
      ctx.fillStyle = waterGrad;
      ctx.fillRect(0, 0, width, height);

      // Light Origin at water surface
      const lightX = width * 0.5 + Math.sin(t * 0.3) * (width * 0.04);
      const lightY = height * 0.08;

      // 2. Surface Caustics & Water Ripple Band
      ctx.save();
      ctx.globalCompositeOperation = 'screen';
      const CAUSTIC_CURVES = 16;
      for (let c = 0; c < CAUSTIC_CURVES; c++) {
        const normC = c / CAUSTIC_CURVES;
        const cy0 = normC * (height * 0.12);
        ctx.beginPath();
        const steps = 60;
        for (let s = 0; s <= steps; s++) {
          const nx = s / steps;
          const x = nx * width;
          const wave1 = Math.sin(nx * 18 + t * causticSpeed * 2.0 + c) * 7;
          const wave2 = Math.cos(nx * 32 - t * causticSpeed * 1.5) * 4;
          const y = cy0 + wave1 + wave2;
          if (s === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        const causticAlpha = (1 - normC) * 0.35 * waterClarity;
        ctx.strokeStyle = `rgba(180, 240, 255, ${causticAlpha})`;
        ctx.lineWidth = 1.5 + (1 - normC) * 2.0;
        ctx.stroke();
      }
      ctx.restore();

      // 3. Volumetric Downward Sun Shafts (Cathedral God Rays in Water)
      ctx.save();
      ctx.globalCompositeOperation = 'screen';
      const SHAFT_COUNT = 38;
      const maxShaftLen = height * 1.25;

      for (let i = 0; i < SHAFT_COUNT; i++) {
        const normI = i / SHAFT_COUNT;
        // Angles spreading from ~20° to 160° pointing downwards
        const baseAngle = Math.PI * 0.18 + normI * (Math.PI * 0.64);
        // Water wave refraction displacement
        const waveWarp = Math.sin(baseAngle * 7 + t * 0.8) * 0.05 +
                         Math.cos(baseAngle * 13 - t * 1.1) * 0.03;

        const shaftAngle = baseAngle + waveWarp;
        const distFromCenter = Math.abs(normI - 0.5) * 2;
        const beamIntensity = Math.pow(Math.max(0, 1 - distFromCenter * 0.8), 1.8);
        const pulse = 0.65 + 0.35 * Math.sin(i * 2.3 + t * 1.8);

        const alpha = Math.min(0.65, 0.32 * beamIntensity * pulse * shaftIntensity);

        if (alpha > 0.02) {
          const beamWidth = 0.035 + (1 - beamIntensity) * 0.02;
          const a1 = shaftAngle - beamWidth;
          const a2 = shaftAngle + beamWidth;

          const shaftGrad = ctx.createRadialGradient(lightX, lightY, 0, lightX, lightY, maxShaftLen);
          shaftGrad.addColorStop(0, `rgba(255, 255, 255, ${alpha * 1.4})`);
          shaftGrad.addColorStop(0.12, `rgba(190, 245, 255, ${alpha})`);
          shaftGrad.addColorStop(0.45, `rgba(40, 180, 230, ${alpha * 0.45})`);
          shaftGrad.addColorStop(0.85, `rgba(10, 80, 150, ${alpha * 0.15})`);
          shaftGrad.addColorStop(1.0, 'rgba(0, 30, 80, 0)');

          ctx.beginPath();
          ctx.moveTo(lightX, lightY);
          ctx.lineTo(lightX + Math.cos(a1) * maxShaftLen, lightY + Math.sin(a1) * maxShaftLen);
          ctx.lineTo(lightX + Math.cos(a2) * maxShaftLen, lightY + Math.sin(a2) * maxShaftLen);
          ctx.closePath();
          ctx.fillStyle = shaftGrad;
          ctx.fill();
        }
      }
      ctx.restore();

      // 4. Primary Sun Core Glare at Ocean Surface
      ctx.save();
      ctx.globalCompositeOperation = 'screen';
      const sunCoreGrad = ctx.createRadialGradient(lightX, lightY, 0, lightX, lightY, width * 0.4);
      sunCoreGrad.addColorStop(0, 'rgba(255, 255, 255, 1.0)');
      sunCoreGrad.addColorStop(0.08, 'rgba(220, 250, 255, 0.9)');
      sunCoreGrad.addColorStop(0.28, 'rgba(80, 210, 255, 0.45)');
      sunCoreGrad.addColorStop(0.6, 'rgba(15, 120, 200, 0.15)');
      sunCoreGrad.addColorStop(1.0, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = sunCoreGrad;
      ctx.beginPath();
      ctx.arc(lightX, lightY, width * 0.4, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // 5. Swaying Kelp / Marine Forest Silhouettes (Flanking Left & Right)
      ctx.save();
      const KELP_STRANDS = 14;
      for (let k = 0; k < KELP_STRANDS; k++) {
        const isLeft = k < 7;
        const sideIdx = isLeft ? k : k - 7;
        const baseX = isLeft ? (sideIdx * 18 + 10) : (width - sideIdx * 18 - 10);
        const baseY = height + 10;
        const targetH = height * (0.65 + (sideIdx % 3) * 0.12) * kelpHeight;

        ctx.beginPath();
        ctx.moveTo(baseX, baseY);

        const nodes = 24;
        for (let n = 1; n <= nodes; n++) {
          const normN = n / nodes;
          const currY = baseY - normN * targetH;
          const sway = Math.sin(t * 1.2 + normN * 3.5 + k) * (18 * normN * normN);
          const currX = baseX + (isLeft ? sway : -sway);
          ctx.lineTo(currX, currY);

          // Kelp blade leaf appendages
          if (n % 3 === 0 && normN < 0.85) {
            const bladeLen = (12 + (1 - normN) * 16);
            const bladeDir = isLeft ? 1 : -1;
            const bx = currX + bladeDir * bladeLen;
            const by = currY - 8 + Math.sin(t * 1.8 + n) * 4;
            ctx.lineTo(bx, by);
            ctx.lineTo(currX, currY);
          }
        }

        ctx.strokeStyle = isLeft
          ? `rgba(6, 32, 28, ${0.85 - sideIdx * 0.08})`
          : `rgba(8, 38, 30, ${0.85 - sideIdx * 0.08})`;
        ctx.lineWidth = 4 + (1 - sideIdx / 7) * 4;
        ctx.lineCap = 'round';
        ctx.stroke();
      }
      ctx.restore();

      // 6. School of Shimmering Mathematical Fish
      ctx.save();
      for (let f = 0; f < fishSchool.length; f++) {
        const fish = fishSchool[f];
        fish.x = (fish.x + fish.speed + 1) % 1;

        const fx = fish.x * width;
        const fy = fish.y * height + Math.sin(t * 2.0 + fish.phase) * 6;

        // Fish lighting: illumination increases when crossing central sun shafts
        const distToCenter = Math.abs(fx - lightX) / (width * 0.45);
        const inLightBeam = Math.max(0, 1 - distToCenter);
        const fishAlpha = 0.5 + inLightBeam * 0.5;

        // Body: Glowing golden/yellow if inside sunbeam, teal silhouette outside
        const bodyHue = inLightBeam > 0.4 ? 45 + (1 - inLightBeam) * 50 : 185;
        const bodyLightness = inLightBeam > 0.4 ? 50 + inLightBeam * 35 : 35;

        ctx.fillStyle = hsla(bodyHue, 95, bodyLightness, fishAlpha);
        ctx.beginPath();
        // Streamlined fish ellipse
        ctx.ellipse(fx, fy, fish.size, fish.size * 0.45, 0, 0, Math.PI * 2);
        ctx.fill();

        // Oscillating caudal fin
        const tailWag = Math.sin(t * 12.0 + fish.phase) * (fish.size * 0.4);
        ctx.beginPath();
        ctx.moveTo(fx - fish.size * 0.8, fy);
        ctx.lineTo(fx - fish.size * 1.7, fy - fish.size * 0.5 + tailWag);
        ctx.lineTo(fx - fish.size * 1.7, fy + fish.size * 0.5 + tailWag);
        ctx.closePath();
        ctx.fill();
      }
      ctx.restore();

      // 7. Drifting Marine Snow & Plankton Motes
      ctx.save();
      ctx.globalCompositeOperation = 'screen';
      for (let m = 0; m < marineSnow.length; m++) {
        const p = marineSnow[m];
        p.x = (p.x + p.vx + 1) % 1;
        p.y = (p.y + p.vy + 1) % 1;

        const px = p.x * width;
        const py = p.y * height;

        // Proximity to sunbeams amplifies mote radiance
        const distFromAxis = Math.abs(px - lightX) / (width * 0.4);
        const inBeam = Math.max(0, 1 - distFromAxis);
        const sparkle = 0.5 + 0.5 * Math.sin(t * 3.0 + p.phase);

        if (inBeam > 0.05) {
          ctx.fillStyle = `rgba(220, 250, 255, ${inBeam * sparkle * 0.8})`;
          ctx.beginPath();
          ctx.arc(px, py, p.size * (0.7 + inBeam * 0.6), 0, Math.PI * 2);
          ctx.fill();
        }
      }
      ctx.restore();
    },
  };
}
