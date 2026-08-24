import type { ArtRenderer, ParameterState, RenderContext, TimeState } from '../../types/engine';
import { hsla } from '../common/color';

// Worthington Water Splash Crown & Rayleigh-Plateau Capillary Jet Dynamics
export function createWaterSplash(): ArtRenderer {
  const CROWN_POINTS = 16;
  const DROPLET_COUNT = 32;

  const dropX = new Float32Array(DROPLET_COUNT);
  const dropY = new Float32Array(DROPLET_COUNT);
  const dropVx = new Float32Array(DROPLET_COUNT);
  const dropVy = new Float32Array(DROPLET_COUNT);
  const dropSize = new Float32Array(DROPLET_COUNT);
  const dropLife = new Float32Array(DROPLET_COUNT);

  return {
    setup() {
      for (let i = 0; i < DROPLET_COUNT; i++) {
        dropLife[i] = -1; // Dead
      }
    },

    render(context: RenderContext, timeState: TimeState, params: ParameterState) {
      const { ctx, width, height } = context;
      const speed = Number(params.splashRate || 1.1);
      const splashHeight = Number(params.splashScale || 1.2);
      const dt = Math.min(timeState.deltaTime, 0.05) * speed;
      const t = timeState.time * speed;

      ctx.fillStyle = 'rgba(5, 8, 14, 0.22)';
      ctx.fillRect(0, 0, width, height);

      const cx = width * 0.5;
      const waterLineY = height * 0.65;
      const splashCycle = (t * 0.9) % 2.5; // 2.5s cyclical impact loop

      // 1. Concentric Capillary Ripple Waves Spreading on Surface
      const rippleCount = 5;
      for (let r = 1; r <= rippleCount; r++) {
        const ripplePhase = (splashCycle + r * 0.4) % 2.5;
        const rippleRadius = ripplePhase * 160;
        const rippleAlpha = Math.max(0, 1 - ripplePhase / 2.5) * 0.6;

        ctx.beginPath();
        ctx.ellipse(cx, waterLineY, rippleRadius, rippleRadius * 0.28, 0, 0, Math.PI * 2);
        ctx.strokeStyle = hsla(195, 90, 65, rippleAlpha);
        ctx.lineWidth = 1.4;
        ctx.stroke();
      }

      // 2. Worthington Splash Crown (Elevated circular sheet with crenellated droplet cusps)
      if (splashCycle < 1.4) {
        const crownAge = splashCycle / 1.4; // 0 to 1
        const crownRadius = (25 + crownAge * 95) * splashHeight;
        const crownH = Math.sin(crownAge * Math.PI) * (110 * splashHeight);

        ctx.beginPath();
        for (let i = 0; i <= CROWN_POINTS; i++) {
          const phi = (i / CROWN_POINTS) * Math.PI * 2;
          // Spikes at crown rim tips
          const cuspHeight = crownH * (1 + 0.35 * Math.sin(phi * 8));
          const px = cx + Math.cos(phi) * crownRadius;
          const py = waterLineY - cuspHeight + Math.sin(phi) * (crownRadius * 0.25);

          if (i === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        ctx.closePath();

        // Sheet translucent fill
        ctx.fillStyle = hsla(190, 85, 55, 0.25);
        ctx.fill();
        ctx.strokeStyle = hsla(185, 95, 75, 0.85);
        ctx.lineWidth = 2.2;
        ctx.stroke();

        // Crown Cusp Droplets
        for (let i = 0; i < CROWN_POINTS; i++) {
          const phi = (i / CROWN_POINTS) * Math.PI * 2;
          const cuspHeight = crownH * (1 + 0.35 * Math.sin(phi * 8));
          const px = cx + Math.cos(phi) * crownRadius;
          const py = waterLineY - cuspHeight + Math.sin(phi) * (crownRadius * 0.25);

          ctx.fillStyle = hsla(180, 100, 85, 0.95);
          ctx.beginPath();
          ctx.arc(px, py, 2.5, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // 3. Central Rayleigh-Plateau Capillary Water Jet (Erupting vertically)
      if (splashCycle > 0.4 && splashCycle < 2.2) {
        const jetAge = (splashCycle - 0.4) / 1.8;
        const jetH = Math.sin(jetAge * Math.PI) * (160 * splashHeight);
        const jetW = Math.max(3, (1 - jetAge) * 16);

        ctx.beginPath();
        ctx.moveTo(cx - jetW * 1.5, waterLineY);
        ctx.quadraticCurveTo(cx - jetW * 0.4, waterLineY - jetH * 0.6, cx, waterLineY - jetH);
        ctx.quadraticCurveTo(cx + jetW * 0.4, waterLineY - jetH * 0.6, cx + jetW * 1.5, waterLineY);
        ctx.fillStyle = hsla(195, 90, 50, 0.45);
        ctx.fill();
        ctx.strokeStyle = hsla(185, 95, 78, 0.9);
        ctx.lineWidth = 2.0;
        ctx.stroke();

        // Big Primary Ejected Top Droplet (Pinch-off)
        const topDropY = waterLineY - jetH - 18 * Math.sin(jetAge * Math.PI * 1.5);
        ctx.fillStyle = hsla(180, 95, 82, 0.95);
        ctx.beginPath();
        ctx.arc(cx, topDropY, 5.5 * splashHeight, 0, Math.PI * 2);
        ctx.fill();
      }

      // 4. Parabolic Ballistic Droplets Simulation
      if (splashCycle < 0.1) {
        // Spawn ballistic droplets at impact moment
        for (let i = 0; i < DROPLET_COUNT; i++) {
          const angle = Math.random() * Math.PI * 2;
          const v = 80 + Math.random() * 140;
          dropX[i] = cx;
          dropY[i] = waterLineY - 10;
          dropVx[i] = Math.cos(angle) * (v * 0.7);
          dropVy[i] = -Math.abs(Math.sin(angle)) * v - 40;
          dropSize[i] = 1.5 + Math.random() * 3.0;
          dropLife[i] = 1.0;
        }
      }

      for (let i = 0; i < DROPLET_COUNT; i++) {
        if (dropLife[i] > 0) {
          dropLife[i] -= dt * 0.7;
          dropVy[i] += 260 * dt; // Gravity
          dropX[i] += dropVx[i] * dt;
          dropY[i] += dropVy[i] * dt;

          if (dropY[i] > waterLineY) {
            dropLife[i] = 0; // Hit water
          }

          ctx.fillStyle = hsla(190, 95, 75, dropLife[i]);
          ctx.beginPath();
          ctx.arc(dropX[i], dropY[i], dropSize[i], 0, Math.PI * 2);
          ctx.fill();
        }
      }
    },
  };
}
