import type { ArtRenderer, ParameterState, RenderContext, TimeState } from '../../types/engine';
import { hsla } from '../common/color';

// 066 - Maurer Rhodonea Rose (Harmonic Grandi Polar Flower & Crystalline Chords)
export function createRhodoneaRose(): ArtRenderer {
  return {
    setup() {},

    render(context: RenderContext, timeState: TimeState, params: ParameterState) {
      const { ctx, width, height } = context;
      const petals = Math.max(3, Math.min(16, Math.round(Number(params.petals ?? 6))));
      const maurerD = Number(params.maurerStep ?? 71);
      const speed = Number(params.bloomSpeed ?? 0.5);
      const layers = Math.max(2, Math.min(6, Math.round(Number(params.petalLayers ?? 4))));
      const t = timeState.time * speed;

      // Deep velvety crimson-obsidian backdrop
      ctx.fillStyle = '#060305';
      ctx.fillRect(0, 0, width, height);

      const cx = width * 0.5;
      const cy = height * 0.5;
      const maxR = Math.min(width, height) * 0.43;

      ctx.save();
      ctx.translate(cx, cy);

      const baseHue = 345; // Luxurious Rose/Ruby

      // 1. Concentric Maurer Crystalline Rose Petal Shells
      for (let layer = 1; layer <= layers; layer++) {
        const lFrac = layer / layers;
        const layerR = maxR * (0.25 + 0.75 * lFrac) * (1 + 0.05 * Math.sin(t * 0.6 + layer));
        const k = petals;
        const stepAngle = maurerD;
        const layerRotation = t * 0.08 * (layer % 2 === 0 ? 1 : -0.7) + (layer * Math.PI) / layers;

        ctx.save();
        ctx.rotate(layerRotation);

        // A. Maurer Chord Webbing (Fine crystalline wire mesh)
        ctx.beginPath();
        const chordSteps = 360;
        for (let i = 0; i <= chordSteps; i++) {
          const theta = ((i * stepAngle) * Math.PI) / 180;
          const r = layerR * Math.sin(k * theta);
          const px = Math.cos(theta) * r;
          const py = Math.sin(theta) * r;

          if (i === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        ctx.strokeStyle = hsla(baseHue + (layer * 12) + Math.sin(t * 0.8) * 6, 85, 75, 0.2 + lFrac * 0.22);
        ctx.lineWidth = 0.85;
        ctx.stroke();

        // B. Grandi Smooth Rhodonea Rose Boundary Envelope
        ctx.beginPath();
        const smoothSteps = 360;
        for (let j = 0; j <= smoothSteps; j++) {
          const phi = (j / smoothSteps) * Math.PI * 2;
          const rSmooth = layerR * Math.sin(k * phi);
          const sx = Math.cos(phi) * rSmooth;
          const sy = Math.sin(phi) * rSmooth;

          if (j === 0) ctx.moveTo(sx, sy);
          else ctx.lineTo(sx, sy);
        }
        ctx.closePath();
        ctx.strokeStyle = hsla(baseHue - 8 + layer * 8, 92, 68, 0.7);
        ctx.lineWidth = 1.5;
        ctx.stroke();

        ctx.restore();
      }

      // 2. Central Golden Pistil Core & Radiant Stamens
      const coreR = maxR * 0.12;
      const stamenCount = petals * 4;
      for (let s = 0; s < stamenCount; s++) {
        const sAngle = (s / stamenCount) * Math.PI * 2 + t * 0.2;
        const stamenLen = coreR * (1.2 + 0.4 * Math.sin(s * 3 + t * 3));
        const sx = Math.cos(sAngle) * stamenLen;
        const sy = Math.sin(sAngle) * stamenLen;

        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.quadraticCurveTo(
          Math.cos(sAngle + 0.2) * (stamenLen * 0.6),
          Math.sin(sAngle + 0.2) * (stamenLen * 0.6),
          sx,
          sy
        );
        ctx.strokeStyle = hsla(45, 95, 72, 0.6);
        ctx.lineWidth = 1.0;
        ctx.stroke();

        // Anther Gold Pollen Bead
        ctx.fillStyle = hsla(48, 100, 85, 0.95);
        ctx.beginPath();
        ctx.arc(sx, sy, 1.8, 0, Math.PI * 2);
        ctx.fill();
      }

      // Glowing Center Seed
      ctx.fillStyle = hsla(baseHue, 100, 85, 0.9);
      ctx.beginPath();
      ctx.arc(0, 0, 3.5, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = hsla(baseHue, 100, 92, 0.4);
      ctx.beginPath();
      ctx.arc(0, 0, 8.0, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    },
  };
}
