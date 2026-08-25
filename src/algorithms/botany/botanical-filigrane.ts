import type { ArtRenderer, ParameterState, RenderContext, TimeState } from '../../types/engine';
import { hsla } from '../common/color';

// 065 - Victorian Botanical Vine & Tendril Filigree (Curling Acanthus Scrolls & Golden Buds)
export function createBotanicalFiligrane(): ArtRenderer {
  return {
    setup() {},

    render(context: RenderContext, timeState: TimeState, params: ParameterState) {
      const { ctx, width, height } = context;
      const growthSpeed = Number(params.growthSpeed ?? 0.5);
      const tendrils = Math.max(3, Math.min(12, Math.round(Number(params.leafTendrils ?? 6))));
      const budCoils = Math.max(2, Math.min(8, Math.round(Number(params.spiralBuds ?? 4))));
      const wireGlow = Number(params.wireGlow ?? 0.9);
      const t = timeState.time * growthSpeed;

      // Deep antique bronze-tinted ground
      ctx.fillStyle = '#060706';
      ctx.fillRect(0, 0, width, height);

      const cx = width * 0.5;
      const cy = height * 0.5;
      const maxR = Math.min(width, height) * 0.44;

      ctx.save();
      ctx.translate(cx, cy);

      const goldHue = 46;
      const leafHue = 92;

      // 1. Central Floral Calyx Core
      const coreR = maxR * 0.14;
      for (let p = 0; p < tendrils; p++) {
        const ang = (p / tendrils) * Math.PI * 2 + t * 0.1;
        const pLeafLen = coreR * (1.2 + 0.3 * Math.sin(t * 2 + p));
        ctx.beginPath();
        ctx.moveTo(0, 0);
        const cpx1 = Math.cos(ang - 0.25) * pLeafLen;
        const cpy1 = Math.sin(ang - 0.25) * pLeafLen;
        const cpx2 = Math.cos(ang + 0.25) * pLeafLen;
        const cpy2 = Math.sin(ang + 0.25) * pLeafLen;
        const tipX = Math.cos(ang) * (pLeafLen * 1.3);
        const tipY = Math.sin(ang) * (pLeafLen * 1.3);

        ctx.quadraticCurveTo(cpx1, cpy1, tipX, tipY);
        ctx.quadraticCurveTo(cpx2, cpy2, 0, 0);
        ctx.fillStyle = hsla(goldHue, 85, 65, 0.25);
        ctx.fill();
        ctx.strokeStyle = hsla(goldHue + 5, 90, 75, 0.85);
        ctx.lineWidth = 1.3;
        ctx.stroke();
      }

      // 2. Main Botanical Scroll Vines (Sprouting Acanthus Tendrils)
      for (let tr = 0; tr < tendrils; tr++) {
        const baseAngle = (tr / tendrils) * Math.PI * 2;

        ctx.save();
        ctx.rotate(baseAngle + t * 0.06);

        const vinePoints: { x: number; y: number }[] = [];
        const vineSteps = 60;

        ctx.beginPath();
        for (let i = 0; i <= vineSteps; i++) {
          const u = i / vineSteps;
          // Graceful S-shaped botanical stem
          const arcAngle = u * Math.PI * 1.25;
          const r = coreR + (maxR - coreR) * Math.pow(u, 0.9);
          const lateralWarp = Math.sin(u * Math.PI * 2 + t) * (maxR * 0.12 * (1 - u));

          const vx = Math.cos(arcAngle * 0.6) * r + lateralWarp;
          const vy = Math.sin(arcAngle * 0.6) * r;
          vinePoints.push({ x: vx, y: vy });

          if (i === 0) ctx.moveTo(vx, vy);
          else ctx.lineTo(vx, vy);
        }

        // Primary Gold Stem Wire
        ctx.strokeStyle = hsla(goldHue + Math.sin(t * 2 + tr) * 6, 92, 70, 0.85 * wireGlow);
        ctx.lineWidth = 2.2;
        ctx.stroke();

        // 3. Curling Side Leaf Sprays & Filigree Veining
        for (let s = 1; s <= 5; s++) {
          const stemIdx = Math.floor((s / 6) * vineSteps);
          const stemPt = vinePoints[stemIdx];
          const side = s % 2 === 0 ? 1 : -1;
          const leafLen = maxR * 0.22 * (1 - s / 7);

          const leafAngle = Math.PI * 0.45 * side + (s * 0.2);
          const lx = stemPt.x + Math.cos(leafAngle) * leafLen;
          const ly = stemPt.y + Math.sin(leafAngle) * leafLen;

          // Arched filigree leaf outline
          ctx.beginPath();
          ctx.moveTo(stemPt.x, stemPt.y);
          const ctrlX = stemPt.x + Math.cos(leafAngle - 0.3 * side) * (leafLen * 0.7);
          const ctrlY = stemPt.y + Math.sin(leafAngle - 0.3 * side) * (leafLen * 0.7);
          ctx.quadraticCurveTo(ctrlX, ctrlY, lx, ly);

          const ctrl2X = stemPt.x + Math.cos(leafAngle + 0.3 * side) * (leafLen * 0.7);
          const ctrl2Y = stemPt.y + Math.sin(leafAngle + 0.3 * side) * (leafLen * 0.7);
          ctx.quadraticCurveTo(ctrl2X, ctrl2Y, stemPt.x, stemPt.y);

          ctx.fillStyle = hsla(leafHue, 60, 50, 0.15);
          ctx.fill();
          ctx.strokeStyle = hsla(goldHue - 6 + s * 4, 85, 75, 0.7);
          ctx.lineWidth = 1.1;
          ctx.stroke();

          // Internal filigree feather veins
          for (let v = 1; v <= 3; v++) {
            const vFrac = v / 4;
            const vxStart = stemPt.x + (lx - stemPt.x) * vFrac;
            const vyStart = stemPt.y + (ly - stemPt.y) * vFrac;
            ctx.beginPath();
            ctx.moveTo(vxStart, vyStart);
            ctx.lineTo(
              vxStart + Math.cos(leafAngle + 0.8 * side) * (leafLen * 0.25 * (1 - vFrac)),
              vyStart + Math.sin(leafAngle + 0.8 * side) * (leafLen * 0.25 * (1 - vFrac))
            );
            ctx.strokeStyle = hsla(goldHue + 12, 75, 78, 0.4);
            ctx.lineWidth = 0.75;
            ctx.stroke();
          }

          // Golden Dewdrop Pearl at leaf tip
          ctx.fillStyle = hsla(goldHue + 20, 100, 88, 0.95);
          ctx.beginPath();
          ctx.arc(lx, ly, 1.8, 0, Math.PI * 2);
          ctx.fill();
        }

        // 4. Terminal Fibonacci Spiral Bud Coil
        const tip = vinePoints[vinePoints.length - 1];
        ctx.beginPath();
        const budSteps = budCoils * 18;
        for (let b = 0; b <= budSteps; b++) {
          const bt = b / budSteps;
          const theta = -bt * Math.PI * 2 * (budCoils * 0.85);
          const br = (maxR * 0.16) * Math.pow(1 - bt, 1.4);
          const bx = tip.x + Math.cos(theta) * br;
          const by = tip.y + Math.sin(theta) * br;

          if (b === 0) ctx.moveTo(bx, by);
          else ctx.lineTo(bx, by);
        }
        ctx.strokeStyle = hsla(goldHue + 10, 95, 82, 0.9);
        ctx.lineWidth = 1.4;
        ctx.stroke();

        // Terminal bud jewel node
        ctx.fillStyle = hsla(goldHue + 15, 100, 92, 0.95);
        ctx.beginPath();
        ctx.arc(tip.x, tip.y, 3.2, 0, Math.PI * 2);
        ctx.fill();

        // Glowing corona
        ctx.fillStyle = hsla(goldHue + 15, 100, 95, 0.35);
        ctx.beginPath();
        ctx.arc(tip.x, tip.y, 7.0, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
      }

      ctx.restore();
    },
  };
}
