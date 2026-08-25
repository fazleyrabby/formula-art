import type { ArtRenderer, ParameterState, RenderContext, TimeState } from '../../types/engine';
import { hsla } from '../common/color';

// 078 - Electric Radiant Lionfish (Pterois Radiata Spines & Fan Pectoral Kinematics)
export function createElectricLionfish(): ArtRenderer {
  return {
    setup() {},

    render(context: RenderContext, timeState: TimeState, params: ParameterState) {
      const { ctx, width, height } = context;
      const spineSpread = Number(params.spineLength ?? 1.1);
      const fanAgility = Number(params.pectoralWave ?? 0.85);
      const electricLuster = Number(params.bioluminescence ?? 1.0);
      const t = timeState.time * fanAgility;

      // Dark abyssal reef backdrop
      ctx.fillStyle = '#020509';
      ctx.fillRect(0, 0, width, height);

      const cx = width * 0.46;
      const cy = height * 0.5;
      const maxR = Math.min(width, height) * 0.44;

      const driftY = Math.sin(t * 1.8) * 6;
      const driftRot = Math.sin(t * 1.2) * 0.05;

      ctx.save();
      ctx.translate(cx, cy + driftY);
      ctx.rotate(driftRot);

      const amberHue = 24;
      const cyanGlowHue = 180;

      // 1. Thirteen Elongated Venomous Dorsal Spines (Radiating like radiant rays)
      const spineCount = 13;
      for (let s = 0; s < spineCount; s++) {
        const sFrac = s / (spineCount - 1);
        const sAngle = -Math.PI * 0.65 + sFrac * Math.PI * 0.55;
        const sLen = maxR * (0.8 + 0.35 * Math.sin(sFrac * Math.PI)) * spineSpread;

        const sRootX = -maxR * 0.2 + sFrac * (maxR * 0.45);
        const sRootY = -maxR * 0.12;

        const sWave = Math.sin(t * 2.8 - s * 0.4) * (maxR * 0.08);
        const sTipX = sRootX + Math.cos(sAngle) * sLen + sWave;
        const sTipY = sRootY + Math.sin(sAngle) * sLen;

        // Needle Spine Rod
        ctx.beginPath();
        ctx.moveTo(sRootX, sRootY);
        ctx.quadraticCurveTo(sRootX + Math.cos(sAngle) * (sLen * 0.5), sRootY + Math.sin(sAngle) * (sLen * 0.5) - 10, sTipX, sTipY);
        ctx.strokeStyle = hsla(amberHue + s * 3, 90, 68, 0.95);
        ctx.lineWidth = 1.6;
        ctx.stroke();

        // Alternating Zebra Bands on Spine
        for (let b = 1; b <= 4; b++) {
          const bFrac = b / 5;
          const bx = sRootX + (sTipX - sRootX) * bFrac;
          const by = sRootY + (sTipY - sRootY) * bFrac;
          ctx.beginPath();
          ctx.arc(bx, by, 1.8, 0, Math.PI * 2);
          ctx.fillStyle = b % 2 === 0 ? '#ffffff' : '#080503';
          ctx.fill();
        }

        // Luminous Needle Tip
        ctx.fillStyle = hsla(cyanGlowHue, 100, 85, 0.95 * electricLuster);
        ctx.beginPath();
        ctx.arc(sTipX, sTipY, 1.4, 0, Math.PI * 2);
        ctx.fill();
      }

      // 2. Caudal Tail Fin (Waving Flag)
      const tailLen = maxR * 0.42;
      const tailWave = Math.sin(t * 3.2) * 8;
      ctx.beginPath();
      ctx.moveTo(maxR * 0.35, 0);
      ctx.bezierCurveTo(maxR * 0.5, -maxR * 0.18, maxR * 0.7 + tailWave, -maxR * 0.18, maxR * 0.35 + tailLen + tailWave, 0);
      ctx.bezierCurveTo(maxR * 0.7 + tailWave, maxR * 0.18, maxR * 0.5, maxR * 0.18, maxR * 0.35, 0);
      ctx.fillStyle = 'rgba(249, 115, 22, 0.2)';
      ctx.fill();
      ctx.strokeStyle = hsla(amberHue, 95, 70, 0.85);
      ctx.lineWidth = 1.2;
      ctx.stroke();

      // 3. Huge Wing-Like Fan Pectoral Fin (Giant 10-Ray Wing)
      const pectRays = 10;
      for (let pr = 0; pr < pectRays; pr++) {
        const prFrac = pr / (pectRays - 1);
        const pAng = Math.PI * 0.25 + prFrac * Math.PI * 0.65;
        const pWave = Math.sin(t * 3.5 - prFrac * 2.5) * 15;
        const pLen = maxR * (0.65 + 0.25 * Math.sin(prFrac * Math.PI)) * spineSpread;

        const rootX = -maxR * 0.05;
        const rootY = maxR * 0.05;
        const tipX = rootX + Math.cos(pAng) * pLen + pWave;
        const tipY = rootY + Math.sin(pAng) * pLen + pWave * 0.5;

        // Fin Ray Rib
        ctx.beginPath();
        ctx.moveTo(rootX, rootY);
        ctx.quadraticCurveTo(rootX + Math.cos(pAng) * (pLen * 0.5), rootY + Math.sin(pAng) * (pLen * 0.5), tipX, tipY);
        ctx.strokeStyle = hsla(amberHue, 95, 62, 0.9);
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // Translucent Webbing Membrane between rays
        ctx.fillStyle = hsla(amberHue + pr * 5, 90, 50, 0.08 * electricLuster);
        ctx.fill();

        // Tip Glow Bead
        ctx.fillStyle = hsla(cyanGlowHue, 100, 85, 0.85 * electricLuster);
        ctx.beginPath();
        ctx.arc(tipX, tipY, 1.3, 0, Math.PI * 2);
        ctx.fill();
      }

      // 4. Main Body Torso (Zebra-Striped Predatory Body)
      ctx.beginPath();
      ctx.moveTo(-maxR * 0.35, -maxR * 0.02);
      ctx.bezierCurveTo(-maxR * 0.2, -maxR * 0.22, maxR * 0.15, -maxR * 0.18, maxR * 0.35, 0);
      ctx.bezierCurveTo(maxR * 0.15, maxR * 0.18, -maxR * 0.2, maxR * 0.22, -maxR * 0.35, -maxR * 0.02);
      ctx.closePath();

      // Rich Crimson/Amber body gradient
      const bodyGrad = ctx.createLinearGradient(-maxR * 0.35, 0, maxR * 0.35, 0);
      bodyGrad.addColorStop(0, '#1c0803');
      bodyGrad.addColorStop(0.4, '#c2410c');
      bodyGrad.addColorStop(0.8, '#7c2d12');
      bodyGrad.addColorStop(1, '#1c0803');
      ctx.fillStyle = bodyGrad;
      ctx.fill();
      ctx.strokeStyle = '#fb923c';
      ctx.lineWidth = 1.6;
      ctx.stroke();

      // Zebra Tiger Stripes across Body
      for (let s = 1; s <= 7; s++) {
        const sx = -maxR * 0.28 + s * (maxR * 0.08);
        ctx.beginPath();
        ctx.moveTo(sx, -maxR * 0.12);
        ctx.quadraticCurveTo(sx + 6, 0, sx, maxR * 0.12);
        ctx.strokeStyle = '#fff7ed';
        ctx.lineWidth = 2.0;
        ctx.stroke();
      }

      // 5. Supraocular Feathered Horns over Brow
      for (const hSide of [-1, 1]) {
        const hSway = Math.sin(t * 3.5 + hSide) * 3;
        ctx.beginPath();
        ctx.moveTo(-maxR * 0.28, -maxR * 0.06);
        ctx.quadraticCurveTo(-maxR * 0.34 + hSway, -maxR * 0.22, -maxR * 0.32 + hSway, -maxR * 0.28);
        ctx.strokeStyle = '#fdba74';
        ctx.lineWidth = 1.4;
        ctx.stroke();
      }

      // 6. Eye & Aggressive Predatory Glint
      const eyeX = -maxR * 0.26;
      const eyeY = -maxR * 0.03;

      ctx.beginPath();
      ctx.arc(eyeX, eyeY, 4.5, 0, Math.PI * 2);
      ctx.fillStyle = '#451a03';
      ctx.fill();
      ctx.strokeStyle = '#f97316';
      ctx.lineWidth = 1.2;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(eyeX, eyeY, 2.0, 0, Math.PI * 2);
      ctx.fillStyle = '#000000';
      ctx.fill();

      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(eyeX - 0.9, eyeY - 0.9, 0.8, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    },
  };
}
