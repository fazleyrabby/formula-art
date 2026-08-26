import type { ArtRenderer, ParameterState, RenderContext, TimeState } from '../../types/engine';
import { hsla } from '../common/color';

export function createSolarCoronaFlare(): ArtRenderer {
  const PROMINENCE_LOOPS = 28;
  const loopPhases: Array<{ angle: number; span: number; height: number; speed: number; phase: number }> = [];

  function initLoops() {
    loopPhases.length = 0;
    for (let i = 0; i < PROMINENCE_LOOPS; i++) {
      loopPhases.push({
        angle: (i / PROMINENCE_LOOPS) * Math.PI * 2 + (Math.random() - 0.5) * 0.2,
        span: 0.15 + Math.random() * 0.35,
        height: 25 + Math.random() * 65,
        speed: 0.4 + Math.random() * 0.8,
        phase: Math.random() * Math.PI * 2,
      });
    }
  }

  return {
    setup() {
      initLoops();
    },

    render(context: RenderContext, timeState: TimeState, params: ParameterState) {
      const { ctx, width, height } = context;
      const speed = Number(params.speed ?? 1.0);
      const solarActivity = Number(params.solarActivity ?? 1.2);
      const loopDensity = Number(params.loopDensity ?? 1.0);
      const coronaRadiusParam = Number(params.coronaRadius ?? 1.0);
      const flareIntensity = Number(params.flareIntensity ?? 1.3);

      const t = timeState.time * speed;

      if (loopPhases.length === 0) {
        initLoops();
      }

      const cx = width * 0.5;
      const cy = height * 0.5;
      const baseR = Math.min(width, height) * 0.19 * coronaRadiusParam;

      // 1. Deep Space Stellar Background
      ctx.fillStyle = '#050407';
      ctx.fillRect(0, 0, width, height);

      // 2. Extended Outer Solar Corona (Astrophysical Magnetic Streamers)
      ctx.save();
      ctx.globalCompositeOperation = 'screen';
      const STREAMER_RAYS = 64;
      const maxStreamerLen = Math.min(width, height) * 0.48;

      for (let i = 0; i < STREAMER_RAYS; i++) {
        const normI = i / STREAMER_RAYS;
        const theta = normI * Math.PI * 2;

        // Magnetohydrodynamic turbulence
        const mhdWave1 = Math.sin(theta * 6.0 + t * 1.5) * 0.08;
        const mhdWave2 = Math.cos(theta * 14.0 - t * 2.2) * 0.04;
        const rayAngle = theta + mhdWave1 + mhdWave2;

        const pulse = 0.6 + 0.4 * Math.sin(i * 3.1 + t * 2.5 * solarActivity);
        const rayLen = baseR + (maxStreamerLen - baseR) * (0.6 + 0.4 * Math.sin(theta * 3 + t));
        const alpha = Math.min(0.55, 0.28 * pulse * flareIntensity);

        const streamerGrad = ctx.createRadialGradient(cx, cy, baseR * 0.8, cx, cy, rayLen);
        streamerGrad.addColorStop(0, `rgba(255, 235, 160, ${alpha * 1.3})`);
        streamerGrad.addColorStop(0.25, `rgba(255, 140, 40, ${alpha})`);
        streamerGrad.addColorStop(0.65, `rgba(210, 50, 15, ${alpha * 0.35})`);
        streamerGrad.addColorStop(1.0, 'rgba(80, 10, 5, 0)');

        const widthHalf = 0.045;
        ctx.beginPath();
        ctx.moveTo(cx + Math.cos(rayAngle - widthHalf) * baseR, cy + Math.sin(rayAngle - widthHalf) * baseR);
        ctx.lineTo(cx + Math.cos(rayAngle) * rayLen, cy + Math.sin(rayAngle) * rayLen);
        ctx.lineTo(cx + Math.cos(rayAngle + widthHalf) * baseR, cy + Math.sin(rayAngle + widthHalf) * baseR);
        ctx.closePath();
        ctx.fillStyle = streamerGrad;
        ctx.fill();
      }
      ctx.restore();

      // 3. Magnetic Coronal Plasma Loops (Prominences)
      ctx.save();
      ctx.globalCompositeOperation = 'screen';
      const activeLoops = Math.floor(PROMINENCE_LOOPS * loopDensity);
      for (let l = 0; l < activeLoops; l++) {
        const loop = loopPhases[l];
        const a1 = loop.angle - loop.span * 0.5;
        const a2 = loop.angle + loop.span * 0.5;

        const loopHeightDynamic = loop.height * (0.75 + 0.25 * Math.sin(t * loop.speed + loop.phase)) * solarActivity;

        // Bezier arch anchored on solar surface
        const p1x = cx + Math.cos(a1) * baseR;
        const p1y = cy + Math.sin(a1) * baseR;
        const p2x = cx + Math.cos(a2) * baseR;
        const p2y = cy + Math.sin(a2) * baseR;

        const midAngle = loop.angle;
        const apexR = baseR + loopHeightDynamic;
        const cpx = cx + Math.cos(midAngle) * (apexR * 1.25);
        const cpy = cy + Math.sin(midAngle) * (apexR * 1.25);

        ctx.beginPath();
        ctx.moveTo(p1x, p1y);
        ctx.quadraticCurveTo(cpx, cpy, p2x, p2y);

        const loopHue = 20 + Math.sin(t + l) * 15;
        ctx.strokeStyle = hsla(loopHue, 95, 60, 0.75);
        ctx.lineWidth = 1.8 + Math.sin(t * 2 + l) * 0.8;
        ctx.stroke();
      }
      ctx.restore();

      // 4. Photosphere Glow & Chromospheric Rim
      ctx.save();
      ctx.globalCompositeOperation = 'screen';
      const rimGrad = ctx.createRadialGradient(cx, cy, baseR * 0.75, cx, cy, baseR * 1.45);
      rimGrad.addColorStop(0, 'rgba(255, 255, 230, 1.0)');
      rimGrad.addColorStop(0.4, 'rgba(255, 190, 60, 0.85)');
      rimGrad.addColorStop(0.75, 'rgba(230, 80, 20, 0.4)');
      rimGrad.addColorStop(1.0, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = rimGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, baseR * 1.45, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // 5. Solid Thermonuclear Core with Convective Granulation
      ctx.save();
      const coreGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, baseR);
      coreGrad.addColorStop(0, '#ffffff');
      coreGrad.addColorStop(0.45, '#fff4b8');
      coreGrad.addColorStop(0.8, '#ff9e24');
      coreGrad.addColorStop(1.0, '#d64209');
      ctx.fillStyle = coreGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, baseR, 0, Math.PI * 2);
      ctx.fill();

      // Granulation harmonics
      const GRANULES = 36;
      for (let g = 0; g < GRANULES; g++) {
        const gn = g / GRANULES;
        const ga = gn * Math.PI * 2 + t * 0.15;
        const gr = (baseR * 0.25) + (baseR * 0.65) * Math.sin(g * 7 + t * 0.4);
        const gx = cx + Math.cos(ga) * gr;
        const gy = cy + Math.sin(ga) * gr;
        const gRad = 8 + Math.sin(g * 3 + t * 1.2) * 5;

        ctx.fillStyle = 'rgba(255, 255, 220, 0.45)';
        ctx.beginPath();
        ctx.arc(gx, gy, gRad, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();

      // 6. 4-Point Anamorphic Flare Diffraction Spikes
      ctx.save();
      ctx.globalCompositeOperation = 'screen';
      const spikeLen = Math.min(width, height) * 0.44 * flareIntensity;
      const spikeAngles = [0, Math.PI * 0.5, Math.PI, Math.PI * 1.5];

      for (let s = 0; s < spikeAngles.length; s++) {
        const sa = spikeAngles[s] + Math.PI * 0.25; // 45° cross
        const spkGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, spikeLen);
        spkGrad.addColorStop(0, 'rgba(255, 255, 255, 0.85)');
        spkGrad.addColorStop(0.3, 'rgba(255, 200, 100, 0.4)');
        spkGrad.addColorStop(1.0, 'rgba(255, 120, 30, 0)');

        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(cx + Math.cos(sa - 0.015) * spikeLen, cy + Math.sin(sa - 0.015) * spikeLen);
        ctx.lineTo(cx + Math.cos(sa) * (spikeLen * 1.15), cy + Math.sin(sa) * (spikeLen * 1.15));
        ctx.lineTo(cx + Math.cos(sa + 0.015) * spikeLen, cy + Math.sin(sa + 0.015) * spikeLen);
        ctx.closePath();
        ctx.fillStyle = spkGrad;
        ctx.fill();
      }
      ctx.restore();
    },
  };
}
