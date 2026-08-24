import type { ArtRenderer, ParameterState, RenderContext, TimeState } from '../../types/engine';
import { hsla } from '../common/color';

// Ultra-Detailed Anatomical Abyssal Tripod Fish (Bathypterois Grallator)
// Features: Multi-filament cantilever ray stilts, 3D perspective benthic seafloor,
// 24 volumetric body streamline rings, arched sensory pectoral antenna rays, and drifting abyssal snow.
export function createAbyssalTripodFish(): ArtRenderer {
  const BODY_RIBBONS = 20;
  const PARTICLE_COUNT = 60;

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

      ctx.save();
      ctx.globalCompositeOperation = 'screen';

      const baseHue = (200 + Math.sin(t * 0.4) * 15) % 360;

      // 1. Drifting Abyssal Marine Snow Particles
      for (let p = 0; p < PARTICLE_COUNT; p++) {
        const seed = p * 41.7;
        const px = ((seed * 5 + t * 45) % (width + 60)) - 30;
        const py = seafloorY - 220 + ((seed * 9) % 200);
        const alpha = (0.2 + (p % 5) * 0.15);

        ctx.fillStyle = 'rgba(56, 189, 248, ' + alpha + ')';
        ctx.fillRect(px, py, 1.8, 1.8);
      }

      // 2. 3D Perspective Seafloor Grid Lines
      ctx.beginPath();
      ctx.moveTo(0, seafloorY);
      ctx.lineTo(width, seafloorY);
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.4)';
      ctx.lineWidth = 2.0;
      ctx.stroke();

      for (let gx = -6; gx <= 6; gx++) {
        const xFloor = cx + gx * 80 * fishScale;
        ctx.beginPath();
        ctx.moveTo(xFloor, seafloorY);
        ctx.lineTo(cx + gx * 140 * fishScale, height);
        ctx.strokeStyle = 'rgba(56, 189, 248, 0.12)';
        ctx.lineWidth = 1.0;
        ctx.stroke();
      }

      const bodyX = cx - 20 * fishScale;
      const bodyY = seafloorY - 145 * stiltHeight * fishScale + Math.sin(t * 0.8) * 3;

      // 3. Multi-Filament Pelvic & Caudal Cantilever Stilt Rays (The Tripod Stand)
      // Two Front Pelvic Stilt Struts
      for (let s = -1; s <= 1; s += 2) {
        const rootX = bodyX + s * 24 * fishScale;
        const rootY = bodyY + 14 * fishScale;
        const groundX = cx + s * (105 * fishScale);
        const groundY = seafloorY;

        for (let str = 0; str < 4; str++) {
          const normStr = str / 3;
          ctx.beginPath();
          ctx.moveTo(rootX + str * 2, rootY);
          ctx.quadraticCurveTo(
            rootX + s * (18 + normStr * 6) * fishScale,
            (rootY + groundY) * 0.5,
            groundX + str * 2,
            groundY
          );
          ctx.strokeStyle = hsla(190, 95, 75, (0.4 + normStr * 0.45));
          ctx.lineWidth = str === 3 ? 2.0 : 1.0;
          ctx.stroke();
        }

        // Ground Contact Anchor Foot Disc
        ctx.fillStyle = '#38bdf8';
        ctx.shadowColor = '#38bdf8';
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.arc(groundX, groundY, 4.5 * fishScale, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      // Third Caudal Tail Fin Stilt Strut (Back Leg)
      const tailRootX = bodyX - 115 * fishScale;
      const tailRootY = bodyY + 6 * fishScale;
      const tailGroundX = cx - 145 * fishScale;
      const tailGroundY = seafloorY;

      for (let str = 0; str < 4; str++) {
        const normStr = str / 3;
        ctx.beginPath();
        ctx.moveTo(tailRootX, tailRootY + str * 2);
        ctx.quadraticCurveTo(
          tailRootX - (22 + normStr * 6) * fishScale,
          (tailRootY + tailGroundY) * 0.5,
          tailGroundX,
          tailGroundY
        );
        ctx.strokeStyle = hsla(190, 95, 75, (0.4 + normStr * 0.45));
        ctx.lineWidth = str === 3 ? 2.0 : 1.0;
        ctx.stroke();
      }

      ctx.fillStyle = '#38bdf8';
      ctx.beginPath();
      ctx.arc(tailGroundX, tailGroundY, 4.5 * fishScale, 0, Math.PI * 2);
      ctx.fill();

      // 4. Volumetric Torpedo Fish Body (20 Concentric Streamline Rings)
      for (let r = 1; r <= BODY_RIBBONS; r++) {
        const normR = r / BODY_RIBBONS;
        const curScale = normR * fishScale;

        ctx.beginPath();
        ctx.moveTo(bodyX + 80 * curScale, bodyY - 5 * curScale); // Snout
        ctx.quadraticCurveTo(bodyX + 20 * curScale, bodyY - 26 * curScale, bodyX - 115 * curScale, bodyY - 5 * curScale);
        ctx.lineTo(bodyX - 115 * curScale, bodyY + 12 * curScale);
        ctx.quadraticCurveTo(bodyX + 20 * curScale, bodyY + 24 * curScale, bodyX + 80 * curScale, bodyY - 5 * curScale);
        ctx.closePath();

        const bHue = (baseHue + normR * 25) % 360;
        ctx.strokeStyle = hsla(bHue, 90, 68, (0.08 + normR * 0.35));
        ctx.lineWidth = r === BODY_RIBBONS ? 2.2 * fishScale : 0.9;
        ctx.stroke();

        if (r % 5 === 0) {
          ctx.fillStyle = hsla(bHue, 80, 45, 0.04);
          ctx.fill();
        }
      }

      // Vestigial Eye
      ctx.fillStyle = '#38bdf8';
      ctx.beginPath();
      ctx.arc(bodyX + 64 * fishScale, bodyY - 8 * fishScale, 3.5 * fishScale, 0, Math.PI * 2);
      ctx.fill();

      // 5. Arched Sensory Pectoral Antenna Rays (Feeler Rays with Vibrating Filaments)
      for (let s = -1; s <= 1; s += 2) {
        const pecRootX = bodyX + 38 * fishScale;
        const pecRootY = bodyY - 14 * fishScale;

        for (let str = 0; str < 5; str++) {
          const normStr = str / 4;
          ctx.beginPath();
          ctx.moveTo(pecRootX, pecRootY);

          const pecWave = Math.sin(t * 2.5 + str + s) * (14 * fishScale);
          const tipX = pecRootX + (110 + normStr * 25) * fishScale;
          const tipY = bodyY - (130 + normStr * 20) * fishScale + pecWave;

          ctx.bezierCurveTo(
            pecRootX + (25 + normStr * 10) * fishScale,
            bodyY - 65 * fishScale,
            pecRootX + (80 + normStr * 15) * fishScale,
            bodyY - 105 * fishScale + pecWave,
            tipX,
            tipY
          );

          ctx.strokeStyle = hsla((baseHue + 30 + str * 8) % 360, 95, 75, (0.35 + normStr * 0.5));
          ctx.lineWidth = str === 4 ? 2.0 : 1.0;
          ctx.stroke();

          // Sensory Photon Spark at tip
          if (str === 4) {
            ctx.fillStyle = '#ffffff';
            ctx.beginPath();
            ctx.arc(tipX, tipY, 2.5 * fishScale, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }

      ctx.restore();
    },
  };
}
