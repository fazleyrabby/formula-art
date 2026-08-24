import type { ArtRenderer, ParameterState, RenderContext, TimeState } from '../../types/engine';
import { hsla } from '../common/color';

export function createNeuralSynapse(): ArtRenderer {
  const NEURON_COUNT = 18;
  const neuronX = new Float32Array(NEURON_COUNT);
  const neuronY = new Float32Array(NEURON_COUNT);
  const spikeTimer = new Float32Array(NEURON_COUNT);

  return {
    setup(context: RenderContext) {
      for (let i = 0; i < NEURON_COUNT; i++) {
        neuronX[i] = context.width * 0.15 + Math.random() * (context.width * 0.7);
        neuronY[i] = context.height * 0.15 + Math.random() * (context.height * 0.7);
        spikeTimer[i] = Math.random() * 5;
      }
    },

    render(context: RenderContext, timeState: TimeState, params: ParameterState) {
      const { ctx, width, height } = context;
      const speed = Number(params.firingRate || 1.2);
      const connectivity = Number(params.synapseReach || 150);
      const connectSq = connectivity * connectivity;
      const t = timeState.time * speed;

      ctx.fillStyle = 'rgba(5, 7, 12, 0.22)';
      ctx.fillRect(0, 0, width, height);

      // 1. Axonal & Dendritic Synaptic Connections
      for (let i = 0; i < NEURON_COUNT; i++) {
        spikeTimer[i] += timeState.deltaTime * speed;
        const isSpiking = (spikeTimer[i] % 2.5) < 0.25;

        for (let j = i + 1; j < NEURON_COUNT; j++) {
          const dx = neuronX[j] - neuronX[i];
          const dy = neuronY[j] - neuronY[i];
          const dSq = dx * dx + dy * dy;

          if (dSq < connectSq) {
            const dist = Math.sqrt(dSq);
            const alpha = 1 - dist / connectivity;

            // Axon line
            ctx.beginPath();
            ctx.moveTo(neuronX[i], neuronY[i]);
            ctx.lineTo(neuronX[j], neuronY[j]);
            ctx.strokeStyle = hsla(210, 85, 55, alpha * 0.4);
            ctx.lineWidth = 1.2;
            ctx.stroke();

            // Traveling Action Potential Spike Pulse
            const pulsePhase = (t * 2 + i * 0.3) % 1.0;
            const px = neuronX[i] + dx * pulsePhase;
            const py = neuronY[i] + dy * pulsePhase;

            ctx.fillStyle = hsla(185, 95, 80, 0.95);
            ctx.beginPath();
            ctx.arc(px, py, 2.5, 0, Math.PI * 2);
            ctx.fill();
          }
        }

        // 2. Neuronal Soma (Cell Body) with Membrane Action Potential Glow
        const somaRadius = isSpiking ? 9 : 6;
        const somaHue = isSpiking ? 50 : 200;

        ctx.fillStyle = hsla(somaHue, 95, isSpiking ? 85 : 65, isSpiking ? 1.0 : 0.8);
        ctx.shadowColor = hsla(somaHue, 95, 75, 0.8);
        ctx.shadowBlur = isSpiking ? 18 : 6;
        ctx.beginPath();
        ctx.arc(neuronX[i], neuronY[i], somaRadius, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;

        // Dendritic micro-arborization radiating from soma
        for (let d = 0; d < 6; d++) {
          const dendAngle = (d / 6) * Math.PI * 2 + t * 0.2;
          const dendLen = 14 + Math.sin(t * 3 + i + d) * 4;
          const ex = neuronX[i] + Math.cos(dendAngle) * dendLen;
          const ey = neuronY[i] + Math.sin(dendAngle) * dendLen;

          ctx.beginPath();
          ctx.moveTo(neuronX[i], neuronY[i]);
          ctx.lineTo(ex, ey);
          ctx.strokeStyle = hsla(210, 80, 60, 0.5);
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
    },
  };
}
