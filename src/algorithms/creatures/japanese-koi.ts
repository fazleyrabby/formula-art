import type { ArtRenderer, ParameterState, RenderContext, TimeState } from '../../types/engine';
import { hsla } from '../common/color';

// 076 - Imperial Japanese Nishikigoi (Carangiform Serpentine Kinematics & Kohaku Patterns)
export function createJapaneseKoi(): ArtRenderer {
  return {
    setup() {},

    render(context: RenderContext, timeState: TimeState, params: ParameterState) {
      const { ctx, width, height } = context;
      const swimRate = Number(params.swimSpeed ?? 0.75);
      const rippleLuster = Number(params.pondRipples ?? 1.0);
      const patternColor = Number(params.kohakuHue ?? 12); // Vermilion red
      const t = timeState.time * swimRate;

      // Dark tranquil garden pond water backdrop
      ctx.fillStyle = '#03080d';
      ctx.fillRect(0, 0, width, height);

      const cx = width * 0.5;
      const cy = height * 0.5;
      const maxR = Math.min(width, height) * 0.44;

      ctx.save();
      ctx.translate(cx, cy);

      // 1. Water Caustic & Concentric Pond Ripples
      if (rippleLuster > 0.1) {
        for (let r = 1; r <= 4; r++) {
          const rRadius = maxR * (0.4 + 0.22 * r) * (1 + 0.05 * Math.sin(t * 1.5 + r));
          ctx.beginPath();
          ctx.ellipse(0, 0, rRadius, rRadius * 0.7, 0.4, 0, Math.PI * 2);
          ctx.strokeStyle = hsla(190, 80, 65, (0.12 - r * 0.02) * rippleLuster);
          ctx.lineWidth = 1.0;
          ctx.stroke();
        }
      }

      // 2. Spine Calculation with S-Curve Swimming Mechanics
      const spineJoints = 22;
      const spinePoints: { x: number; y: number; angle: number; width: number }[] = [];
      const bodyLen = maxR * 1.1;

      for (let j = 0; j <= spineJoints; j++) {
        const frac = j / spineJoints;
        // Non-linear amplitude increase towards tail
        const amp = Math.pow(frac, 1.4) * (maxR * 0.18);
        const wave = Math.sin(t * 3.0 - frac * Math.PI * 2.4);

        const sx = -bodyLen * 0.48 + frac * bodyLen * 0.9;
        const sy = wave * amp;

        // Realistic plump torpedo-like carp body profile
        let bWidth = 0;
        if (frac < 0.3) {
          bWidth = Math.sin((frac / 0.3) * (Math.PI * 0.5)) * (maxR * 0.16);
        } else {
          bWidth = Math.cos(((frac - 0.3) / 0.7) * (Math.PI * 0.5)) * (maxR * 0.16);
        }

        spinePoints.push({ x: sx, y: sy, angle: 0, width: Math.max(2, bWidth) });
      }

      // Tangent angles along spine
      for (let j = 0; j <= spineJoints; j++) {
        const next = spinePoints[Math.min(spineJoints, j + 1)];
        const prev = spinePoints[Math.max(0, j - 1)];
        spinePoints[j].angle = Math.atan2(next.y - prev.y, next.x - prev.x);
      }

      // 3. Flowing Caudal Tail Fin (Bifurcated Carp Fin)
      const tailPt = spinePoints[spineJoints];
      const tailRays = 18;
      const tailLen = maxR * 0.48;

      for (let r = 0; r < tailRays; r++) {
        const rFrac = r / (tailRays - 1);
        const fanAng = tailPt.angle + (rFrac - 0.5) * Math.PI * 0.65;
        const rWave = Math.sin(t * 3.5 - rFrac * 2.0) * 12;

        const tipX = tailPt.x + Math.cos(fanAng) * tailLen + rWave;
        const tipY = tailPt.y + Math.sin(fanAng) * tailLen + rWave * 0.5;

        ctx.beginPath();
        ctx.moveTo(tailPt.x, tailPt.y);
        ctx.quadraticCurveTo(tailPt.x + Math.cos(fanAng) * (tailLen * 0.5), tailPt.y + Math.sin(fanAng) * (tailLen * 0.5), tipX, tipY);
        ctx.strokeStyle = hsla(40, 90, 85, 0.4);
        ctx.lineWidth = 1.4;
        ctx.stroke();
      }

      // 4. Large Translucent Pectoral Fins (Left & Right Flapping)
      const pectPt = spinePoints[3];
      for (const pSide of [-1, 1]) {
        const pPhase = Math.sin(t * 3.2 + (pSide === 1 ? 0 : Math.PI * 0.2)) * 0.3;
        const pBaseAngle = pectPt.angle + pSide * (Math.PI * 0.55 + pPhase);
        const pLen = maxR * 0.38;

        ctx.save();
        const startX = pectPt.x - Math.sin(pectPt.angle) * (pSide * pectPt.width * 0.8);
        const startY = pectPt.y + Math.cos(pectPt.angle) * (pSide * pectPt.width * 0.8);
        ctx.translate(startX, startY);
        ctx.rotate(pBaseAngle);

        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.bezierCurveTo(pLen * 0.6, -pLen * 0.3, pLen, -pLen * 0.1, pLen, 0);
        ctx.bezierCurveTo(pLen * 0.8, pLen * 0.3, pLen * 0.4, pLen * 0.2, 0, 0);
        ctx.fillStyle = 'rgba(254, 243, 199, 0.3)';
        ctx.fill();
        ctx.strokeStyle = hsla(45, 95, 80, 0.85);
        ctx.lineWidth = 1.2;
        ctx.stroke();

        // Pectoral fin ray striations
        for (let ray = 1; ray <= 5; ray++) {
          const rayF = ray / 6;
          ctx.beginPath();
          ctx.moveTo(0, 0);
          ctx.lineTo(pLen * 0.85 * rayF, (rayF - 0.5) * pLen * 0.3);
          ctx.strokeStyle = hsla(40, 90, 85, 0.35);
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }

        ctx.restore();
      }

      // 5. Main Body Contour (Torpedo Shape)
      ctx.beginPath();
      const headPt = spinePoints[0];
      ctx.moveTo(headPt.x, headPt.y);

      for (let j = 1; j <= spineJoints; j++) {
        const pt = spinePoints[j];
        const normX = -Math.sin(pt.angle);
        const normY = Math.cos(pt.angle);
        ctx.lineTo(pt.x + normX * pt.width, pt.y + normY * pt.width);
      }

      for (let j = spineJoints; j >= 0; j--) {
        const pt = spinePoints[j];
        const normX = -Math.sin(pt.angle);
        const normY = Math.cos(pt.angle);
        ctx.lineTo(pt.x - normX * pt.width, pt.y - normY * pt.width);
      }
      ctx.closePath();

      // Base Pearlescent Ivory White Skin
      const koiSkin = ctx.createLinearGradient(spinePoints[0].x, 0, spinePoints[spineJoints].x, 0);
      koiSkin.addColorStop(0, '#fef9c3');
      koiSkin.addColorStop(0.5, '#fffbeb');
      koiSkin.addColorStop(1, '#fef08a');
      ctx.fillStyle = koiSkin;
      ctx.fill();
      ctx.strokeStyle = '#f59e0b';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // 6. Distinctive Kohaku (Cinnabar Red) & Sumi (Ink Black) Patches
      // Patch 1: Cranial Red Crown (Tancho / Head patch)
      const crownPt = spinePoints[2];
      ctx.beginPath();
      ctx.ellipse(crownPt.x, crownPt.y, maxR * 0.11, maxR * 0.08, crownPt.angle, 0, Math.PI * 2);
      ctx.fillStyle = hsla(patternColor, 95, 52, 0.95);
      ctx.fill();

      // Patch 2: Dorsal Saddle Patch
      const saddlePt = spinePoints[7];
      ctx.beginPath();
      ctx.ellipse(saddlePt.x, saddlePt.y - 2, maxR * 0.15, maxR * 0.11, saddlePt.angle, 0, Math.PI * 2);
      ctx.fillStyle = hsla(patternColor + 4, 92, 48, 0.95);
      ctx.fill();

      // Patch 3: Sumi-e Black Ink Spot
      const sumiPt = spinePoints[13];
      ctx.beginPath();
      ctx.ellipse(sumiPt.x, sumiPt.y + 4, maxR * 0.08, maxR * 0.06, sumiPt.angle, 0, Math.PI * 2);
      ctx.fillStyle = '#090a0f';
      ctx.fill();

      // Patch 4: Caudal Red Step (Hi marking)
      const hiPt = spinePoints[16];
      ctx.beginPath();
      ctx.ellipse(hiPt.x, hiPt.y, maxR * 0.09, maxR * 0.05, hiPt.angle, 0, Math.PI * 2);
      ctx.fillStyle = hsla(patternColor - 3, 95, 50, 0.95);
      ctx.fill();

      // 7. Sensual Barbels (Carp Whiskers)
      for (const bSide of [-1, 1]) {
        const bSway = Math.sin(t * 4 + bSide) * 4;
        ctx.beginPath();
        ctx.moveTo(headPt.x + 2, headPt.y + bSide * 5);
        ctx.quadraticCurveTo(headPt.x - 12, headPt.y + bSide * 16 + bSway, headPt.x - 22, headPt.y + bSide * 20 + bSway);
        ctx.strokeStyle = '#fef08a';
        ctx.lineWidth = 1.3;
        ctx.stroke();
      }

      // 8. Eyes & Glint
      for (const eSide of [-1, 1]) {
        const eyeX = headPt.x + 8;
        const eyeY = headPt.y + eSide * (headPt.width * 0.75);

        ctx.beginPath();
        ctx.arc(eyeX, eyeY, 3.2, 0, Math.PI * 2);
        ctx.fillStyle = '#0f172a';
        ctx.fill();
        ctx.strokeStyle = '#f59e0b';
        ctx.lineWidth = 1.0;
        ctx.stroke();

        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(eyeX - 0.7, eyeY - 0.7, 0.8, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();
    },
  };
}
