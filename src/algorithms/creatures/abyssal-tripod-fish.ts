import type { ArtRenderer, ParameterState, RenderContext, TimeState } from '../../types/engine';
import { hsla } from '../common/color';

// Bathypterois Grallator (Abyssal Tripod Fish) Benthic Stilt Fin Statics & Current Sensing
export function createAbyssalTripodFish(): ArtRenderer {
  return {
    setup() {},

    render(context: RenderContext, timeState: TimeState, params: ParameterState) {
      const { ctx, width, height } = context;
      const currentSpeed = Number(params.currentRate || 1.0);
      const stiltHeight = Number(params.stiltLength || 1.2);
      const t = timeState.time * currentSpeed;

      ctx.fillStyle = '#020306';
      ctx.fillRect(0, 0, width, height);

      const cx = width * 0.5;
      const seafloorY = height * 0.88;
      const fishScale = Math.min(width, height) / 500;

      // Abyssal current particles drifting across
      const driftPhase = t * 1.5;
      ctx.fillStyle = 'rgba(56, 189, 248, 0.25)';
      for (let p = 0; p < 40; p++) {
        const px = ((p * 23 + driftPhase * 40) % (width + 40)) - 20;
        const py = seafloorY - 180 + ((p * 37) % 170);
        ctx.fillRect(px, py, 1.5, 1.5);
      }

      // Seafloor Benthic Ooze Line
      ctx.beginPath();
      ctx.moveTo(0, seafloorY);
      ctx.lineTo(width, seafloorY);
      ctx.strokeStyle = 'rgba(71, 85, 105, 0.4)';
      ctx.lineWidth = 2;
      ctx.stroke();

      const bodyX = cx - 15 * fishScale;
      const bodyY = seafloorY - 140 * stiltHeight * fishScale + Math.sin(t * 0.8) * 3;

      ctx.save();
      ctx.translate(bodyX, bodyY);

      // 1. Two Elongated Pelvic Fin Stilts (Left & Right Front Legs)
      for (let s = -1; s <= 1; s += 2) {
        const rootX = s * 22 * fishScale;
        const rootY = 15 * fishScale;
        const groundContactX = (cx - bodyX) + s * 95 * fishScale;
        const groundContactY = seafloorY - bodyY;

        ctx.beginPath();
        ctx.moveTo(rootX, rootY);
        // Cantilever stilt strut
        ctx.quadraticCurveTo(
          rootX + s * 15 * fishScale,
          groundContactY * 0.5,
          groundContactX,
          groundContactY
        );
        ctx.strokeStyle = hsla(205, 75, 65, 0.85);
        ctx.lineWidth = 2.2 * fishScale;
        ctx.stroke();

        // Stilt ground foot anchor
        ctx.fillStyle = '#38bdf8';
        ctx.beginPath();
        ctx.arc(groundContactX, groundContactY, 3.5 * fishScale, 0, Math.PI * 2);
        ctx.fill();
      }

      // 2. Third Elongated Caudal Tail Fin Stilt (Back Leg)
      const tailRootX = -110 * fishScale;
      const tailRootY = 5 * fishScale;
      const tailGroundX = (cx - bodyX) - 140 * fishScale;
      const tailGroundY = seafloorY - bodyY;

      ctx.beginPath();
      ctx.moveTo(tailRootX, tailRootY);
      ctx.quadraticCurveTo(tailRootX - 20 * fishScale, tailGroundY * 0.5, tailGroundX, tailGroundY);
      ctx.strokeStyle = hsla(205, 75, 65, 0.85);
      ctx.lineWidth = 2.2 * fishScale;
      ctx.stroke();

      ctx.fillStyle = '#38bdf8';
      ctx.beginPath();
      ctx.arc(tailGroundX, tailGroundY, 3.5 * fishScale, 0, Math.PI * 2);
      ctx.fill();

      // 3. Slender Torpedo Fish Body Facing into Current
      ctx.beginPath();
      ctx.moveTo(75 * fishScale, -5 * fishScale); // Snout
      ctx.quadraticCurveTo(20 * fishScale, -25 * fishScale, -110 * fishScale, -5 * fishScale);
      ctx.lineTo(-110 * fishScale, 10 * fishScale);
      ctx.quadraticCurveTo(20 * fishScale, 22 * fishScale, 75 * fishScale, -5 * fishScale);
      ctx.closePath();

      ctx.fillStyle = '#0f172a';
      ctx.fill();
      ctx.strokeStyle = hsla(210, 60, 45, 0.9);
      ctx.lineWidth = 2.2 * fishScale;
      ctx.stroke();

      // Reduced Vestigial Eye
      ctx.fillStyle = '#64748b';
      ctx.beginPath();
      ctx.arc(60 * fishScale, -8 * fishScale, 3 * fishScale, 0, Math.PI * 2);
      ctx.fill();

      // 4. Extended Pectoral Fin Filaments (Antennae arched upward to detect drifting prey)
      for (let s = -1; s <= 1; s += 2) {
        const pecRootX = 35 * fishScale;
        const pecRootY = -12 * fishScale;

        ctx.beginPath();
        ctx.moveTo(pecRootX, pecRootY);
        const pecWave = Math.sin(t * 2 + s) * 12 * fishScale;
        ctx.bezierCurveTo(
          pecRootX + 25 * fishScale,
          -65 * fishScale,
          pecRootX + 85 * fishScale,
          -110 * fishScale + pecWave,
          pecRootX + 115 * fishScale,
          -135 * fishScale + pecWave
        );
        ctx.strokeStyle = hsla(190, 95, 75, 0.8);
        ctx.lineWidth = 1.4 * fishScale;
        ctx.stroke();
      }

      ctx.restore();
    },
  };
}
