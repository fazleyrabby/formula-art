import type { ArtRenderer, ParameterState, RenderContext, TimeState } from '../../types/engine';
import { hsla } from '../common/color';

// Clione Limacina (Pelagic Sea Angel) Parapodia Wing Fluttering & Visceral Core
export function createSeaAngelPteropod(): ArtRenderer {
  return {
    setup() {},

    render(context: RenderContext, timeState: TimeState, params: ParameterState) {
      const { ctx, width, height } = context;
      const wingSpeed = Number(params.wingSpeed || 1.4);
      const wingSpan = Number(params.wingSpan || 1.2);
      const t = timeState.time * wingSpeed;

      ctx.fillStyle = '#03050a';
      ctx.fillRect(0, 0, width, height);

      // Swimming center with graceful hovering vertical motion
      const cx = width * 0.5 + Math.sin(t * 0.6) * (width * 0.05);
      const cy = height * 0.46 + Math.sin(t * 1.8) * 14;
      const angelScale = Math.min(width, height) / 480;

      ctx.save();
      ctx.translate(cx, cy);

      // 1. Translucent Gymnosome Torpedo Body
      ctx.beginPath();
      ctx.moveTo(0, -65 * angelScale); // Head apex
      ctx.quadraticCurveTo(28 * angelScale, -25 * angelScale, 20 * angelScale, 30 * angelScale);
      ctx.quadraticCurveTo(8 * angelScale, 75 * angelScale, 0, 115 * angelScale); // Tail tip
      ctx.quadraticCurveTo(-8 * angelScale, 75 * angelScale, -20 * angelScale, 30 * angelScale);
      ctx.quadraticCurveTo(-28 * angelScale, -25 * angelScale, 0, -65 * angelScale);
      ctx.closePath();

      ctx.fillStyle = 'rgba(56, 189, 248, 0.12)';
      ctx.fill();
      ctx.strokeStyle = 'rgba(186, 230, 253, 0.7)';
      ctx.lineWidth = 1.8 * angelScale;
      ctx.stroke();

      // 2. Glowing Visceral Mass Nucleus (Luminous Orange/Red Internal Organs)
      const viscGrad = ctx.createRadialGradient(
        0,
        5 * angelScale,
        2 * angelScale,
        0,
        5 * angelScale,
        22 * angelScale
      );
      viscGrad.addColorStop(0, 'rgba(239, 68, 68, 0.95)');
      viscGrad.addColorStop(0.5, 'rgba(249, 115, 22, 0.7)');
      viscGrad.addColorStop(1, 'rgba(249, 115, 22, 0)');

      ctx.fillStyle = viscGrad;
      ctx.beginPath();
      ctx.ellipse(0, 5 * angelScale, 14 * angelScale, 20 * angelScale, 0, 0, Math.PI * 2);
      ctx.fill();

      // Buccal Cones in Head
      ctx.fillStyle = 'rgba(239, 68, 68, 0.8)';
      ctx.beginPath();
      ctx.ellipse(0, -45 * angelScale, 6 * angelScale, 10 * angelScale, 0, 0, Math.PI * 2);
      ctx.fill();

      // 3. Head Sensory Tentacles
      for (let s = -1; s <= 1; s += 2) {
        ctx.beginPath();
        ctx.moveTo(s * 6 * angelScale, -60 * angelScale);
        ctx.lineTo(s * 15 * angelScale, -82 * angelScale + Math.sin(t * 3 + s) * 4);
        ctx.strokeStyle = 'rgba(224, 242, 254, 0.8)';
        ctx.lineWidth = 1.4 * angelScale;
        ctx.stroke();
      }

      // 4. Fluttering Wing-Like Parapodia (Rowing Aerodynamics)
      const wingWave = Math.sin(t * 3.5);
      const wingCurl = Math.cos(t * 3.5);

      for (let s = -1; s <= 1; s += 2) {
        const rootX = s * 16 * angelScale;
        const rootY = -15 * angelScale;

        const tipX = rootX + s * 85 * wingSpan * angelScale;
        const tipY = rootY - 15 * wingSpan * angelScale + wingWave * (28 * angelScale);

        ctx.beginPath();
        ctx.moveTo(rootX, rootY);
        ctx.bezierCurveTo(
          rootX + s * 45 * angelScale,
          rootY - 45 * angelScale + wingCurl * (18 * angelScale),
          tipX + s * 15 * angelScale,
          tipY - 25 * angelScale,
          tipX,
          tipY
        );
        ctx.bezierCurveTo(
          tipX - s * 25 * angelScale,
          tipY + 45 * angelScale,
          rootX + s * 30 * angelScale,
          rootY + 25 * angelScale,
          rootX,
          rootY + 15 * angelScale
        );
        ctx.closePath();

        ctx.fillStyle = hsla(195, 90, 75, 0.25);
        ctx.fill();
        ctx.strokeStyle = hsla(190, 100, 85, 0.85);
        ctx.lineWidth = 1.8 * angelScale;
        ctx.stroke();
      }

      ctx.restore();
    },
  };
}
