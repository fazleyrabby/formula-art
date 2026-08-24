import type { ArtRenderer, ParameterState, RenderContext, TimeState } from '../../types/engine';
import { hsla } from '../common/color';

export function createBioluminescentJellyfish(): ArtRenderer {
  const TENTACLE_COUNT = 14;
  const NODES_PER_TENTACLE = 28;
  const tentacleNodesX = new Float32Array(TENTACLE_COUNT * NODES_PER_TENTACLE);
  const tentacleNodesY = new Float32Array(TENTACLE_COUNT * NODES_PER_TENTACLE);

  return {
    setup() {
      tentacleNodesX.fill(0);
      tentacleNodesY.fill(0);
    },

    render(context: RenderContext, timeState: TimeState, params: ParameterState) {
      const { ctx, width, height } = context;
      const speed = Number(params.pulseSpeed || 1.2);
      const tentacleLength = Number(params.tentacleLength || 160);
      const glowIntensity = Number(params.glowIntensity || 1.0);
      const t = timeState.time * speed;

      ctx.fillStyle = 'rgba(5, 6, 10, 0.22)';
      ctx.fillRect(0, 0, width, height);

      // Jellyfish center position swimming vertically
      const cx = width * 0.5 + Math.sin(t * 0.4) * (width * 0.08);
      const swimCycle = Math.sin(t * 1.5);
      const cy = height * 0.42 + swimCycle * (height * 0.04);

      const bellRadius = Math.min(width, height) * 0.18;
      // Contraction / Expansion stroke
      const pulse = 1 + 0.22 * Math.sin(t * 3);
      const contractionState = Math.max(0, -Math.sin(t * 3));

      // 1. Draw Bioluminescent Bell Umbrella
      const steps = 180;
      ctx.beginPath();
      for (let i = 0; i <= steps; i++) {
        const phi = (i / steps) * Math.PI; // Top dome hemisphere
        
        // Bell shape modulation + margin frills
        const marginFrill = 0.06 * Math.sin(phi * 12 + t * 4);
        const domeHeight = bellRadius * 1.1 * pulse;
        const domeWidth = bellRadius * (1.2 / pulse);

        const px = cx + Math.cos(phi) * domeWidth * (1 + marginFrill);
        const py = cy - Math.sin(phi) * domeHeight + marginFrill * 10;

        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }

      // Bell margin bottom curve
      for (let i = steps; i >= 0; i--) {
        const phi = (i / steps) * Math.PI;
        const scallop = Math.sin(phi * 8) * 8 * pulse;
        const px = cx + Math.cos(phi) * (bellRadius * (1.1 / pulse));
        const py = cy + scallop;
        ctx.lineTo(px, py);
      }
      ctx.closePath();

      // Outer Bell Gradient Fill
      const bellHue = (185 + Math.sin(t) * 25) % 360;
      ctx.fillStyle = hsla(bellHue, 90, 50, 0.15 + contractionState * 0.25 * glowIntensity);
      ctx.fill();
      ctx.strokeStyle = hsla(bellHue, 95, 75, 0.8 * glowIntensity);
      ctx.lineWidth = 2.2;
      ctx.stroke();

      // 2. Inner Bell Rhopalia & Organs (Radial Canals)
      for (let c = 1; c <= 6; c++) {
        const canalAngle = (c / 7) * Math.PI;
        ctx.beginPath();
        ctx.moveTo(cx, cy - bellRadius * 0.8 * pulse);
        const ctrlX = cx + Math.cos(canalAngle) * bellRadius * 0.9;
        const ctrlY = cy - Math.sin(canalAngle) * bellRadius * 0.4;
        const endX = cx + Math.cos(canalAngle) * (bellRadius * 0.95);
        const endY = cy;
        ctx.quadraticCurveTo(ctrlX, ctrlY, endX, endY);
        ctx.strokeStyle = hsla((bellHue + 40) % 360, 95, 70, 0.4);
        ctx.lineWidth = 1.2;
        ctx.stroke();
      }

      // 3. Trailing Kinematic Tentacles
      for (let k = 0; k < TENTACLE_COUNT; k++) {
        const normK = k / (TENTACLE_COUNT - 1);
        const rootOffset = (normK - 0.5) * (bellRadius * 1.8);
        const rootX = cx + rootOffset;
        const rootY = cy + Math.sin(normK * Math.PI) * 10;

        ctx.beginPath();
        ctx.moveTo(rootX, rootY);

        for (let n = 0; n < NODES_PER_TENTACLE; n++) {
          const normN = (n + 1) / NODES_PER_TENTACLE;
          const nodeDist = normN * tentacleLength * (1 + 0.1 * Math.sin(t + k));

          // Sinusoidal wave propagation down tentacle
          const wave = Math.sin(t * 3 - normN * 6 + k * 0.5) * (18 * normN);
          const nodeX = rootX + wave + Math.sin(t * 0.8) * (normN * 20);
          const nodeY = rootY + nodeDist;

          ctx.lineTo(nodeX, nodeY);
        }

        const tentacleHue = (170 + k * 8 + t * 20) % 360;
        const alpha = Math.max(0.15, (1 - (k % 3 === 0 ? 0.2 : 0.6)) * glowIntensity);
        ctx.strokeStyle = hsla(tentacleHue, 95, 70, alpha);
        ctx.lineWidth = k % 2 === 0 ? 1.6 : 0.9;
        ctx.stroke();
      }

      // 4. Central Oral Arms (Frilled Manubrium)
      for (let a = -1; a <= 1; a += 2) {
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        const armLength = tentacleLength * 0.75;
        for (let s = 0; s <= 40; s++) {
          const ns = s / 40;
          const ax = cx + a * (Math.sin(ns * 8 + t * 4) * 16 * ns + a * 12 * ns);
          const ay = cy + ns * armLength;
          ctx.lineTo(ax, ay);
        }
        ctx.strokeStyle = hsla((bellHue + 70) % 360, 90, 80, 0.7 * glowIntensity);
        ctx.lineWidth = 2.4;
        ctx.stroke();
      }
    },
  };
}
