import type { ArtRenderer, ParameterState, RenderContext, TimeState } from '../../types/engine';
import { hsla } from '../common/color';

// 075 - Royal Siamese Betta Splendens (Volumetric Veil Fins & Hydrodynamic Undulation)
export function createSiameseBetta(): ArtRenderer {
  return {
    setup() {},

    render(context: RenderContext, timeState: TimeState, params: ParameterState) {
      const { ctx, width, height } = context;
      const swimSpeed = Number(params.swimCadence ?? 0.85);
      const finFlow = Number(params.veilSpread ?? 1.1);
      const iridescence = Number(params.iridescenceSheen ?? 1.0);
      const t = timeState.time * swimSpeed;

      // Deep aquatic abyssal background
      ctx.fillStyle = '#02060d';
      ctx.fillRect(0, 0, width, height);

      const cx = width * 0.48;
      const cy = height * 0.5;
      const maxR = Math.min(width, height) * 0.44;

      ctx.save();
      ctx.translate(cx, cy);

      const royalHue = 215; // Cobalt / Violet / Magenta iridescent gradient
      const magentaHue = 325;

      // 1. Water Ambient Micro-current Particles
      for (let p = 0; p < 16; p++) {
        const pa = (p * 45 + t * 20) * (Math.PI / 180);
        const pr = maxR * (0.3 + 0.6 * ((p * 37) % 100) / 100);
        const px = Math.cos(pa) * pr;
        const py = Math.sin(pa * 1.5) * (pr * 0.45);
        ctx.fillStyle = hsla(royalHue + 20, 80, 75, 0.15);
        ctx.beginPath();
        ctx.arc(px, py, 1.2, 0, Math.PI * 2);
        ctx.fill();
      }

      // 2. Spine & Spinal Undulation Kinematics (Carangiform to Subcarangiform)
      const spineJoints = 20;
      const spinePoints: { x: number; y: number; angle: number; width: number }[] = [];
      const bodyLen = maxR * 0.95;

      for (let j = 0; j <= spineJoints; j++) {
        const frac = j / spineJoints;
        // Head is stable, amplitude grows non-linearly towards caudal peduncle
        const amp = Math.pow(frac, 1.5) * (maxR * 0.16);
        const wave = Math.sin(t * 3.2 - frac * Math.PI * 2.2);

        const sx = -bodyLen * 0.45 + frac * bodyLen * 0.8;
        const sy = wave * amp;

        // Tapering body profile
        let bWidth = 0;
        if (frac < 0.25) {
          bWidth = Math.sin((frac / 0.25) * (Math.PI * 0.5)) * (maxR * 0.13);
        } else {
          bWidth = Math.cos(((frac - 0.25) / 0.75) * (Math.PI * 0.5)) * (maxR * 0.13);
        }

        spinePoints.push({ x: sx, y: sy, angle: 0, width: Math.max(2, bWidth) });
      }

      // Calculate tangent angles along spine
      for (let j = 0; j <= spineJoints; j++) {
        const next = spinePoints[Math.min(spineJoints, j + 1)];
        const prev = spinePoints[Math.max(0, j - 1)];
        spinePoints[j].angle = Math.atan2(next.y - prev.y, next.x - prev.x);
      }

      // 3. Volumetric Flowing Veil Tail (Giant Caudal Fin)
      const tailRoot = spinePoints[spineJoints];
      const finRays = 32;
      const tailLen = maxR * 0.85 * finFlow;

      for (let layer = 0; layer < 3; layer++) {
        const layerAlpha = (0.2 + layer * 0.18) * iridescence;
        const layerOffset = (layer - 1) * 0.15;

        for (let r = 0; r < finRays; r++) {
          const rFrac = r / (finRays - 1);
          const fanAngle = tailRoot.angle + (rFrac - 0.5) * Math.PI * 0.85 + layerOffset;
          const rayLag = rFrac * 0.8;

          // Flowing sinuous harmonic wave along each ray
          const rayWave1 = Math.sin(t * 3.5 - rayLag * 2.5) * (maxR * 0.12);
          const rayWave2 = Math.cos(t * 2.8 - rayLag * 1.8) * (maxR * 0.08);

          const rLen = tailLen * (0.7 + 0.3 * Math.sin(rFrac * Math.PI)) * (1 + 0.1 * Math.sin(t * 2 + r));
          const p1x = tailRoot.x;
          const p1y = tailRoot.y;
          const cp1x = p1x + Math.cos(fanAngle) * (rLen * 0.4) + rayWave1;
          const cp1y = p1y + Math.sin(fanAngle) * (rLen * 0.4) + rayWave2;
          const p2x = p1x + Math.cos(fanAngle) * rLen + rayWave1 * 1.6;
          const p2y = p1y + Math.sin(fanAngle) * rLen + rayWave2 * 1.6;

          ctx.beginPath();
          ctx.moveTo(p1x, p1y);
          ctx.quadraticCurveTo(cp1x, cp1y, p2x, p2y);

          const finHue = royalHue + rFrac * 80 + layer * 25;
          ctx.strokeStyle = hsla(finHue, 95, 62, layerAlpha);
          ctx.lineWidth = 1.2 + (1 - rFrac) * 1.5;
          ctx.stroke();

          // Soft translucent veil webbing fill between adjacent rays
          if (r % 2 === 0) {
            ctx.fillStyle = hsla(magentaHue - rFrac * 60, 90, 55, 0.04 * iridescence);
            ctx.fill();
          }
        }
      }

      // 4. Flowing Dorsal Fin (Upper Veil)
      const dorsalStart = Math.floor(spineJoints * 0.3);
      const dorsalEnd = Math.floor(spineJoints * 0.85);

      for (let i = dorsalStart; i <= dorsalEnd; i++) {
        const pt = spinePoints[i];
        const dFrac = (i - dorsalStart) / (dorsalEnd - dorsalStart);
        const dLen = maxR * 0.55 * Math.sin(dFrac * Math.PI) * finFlow;
        const dAng = pt.angle - Math.PI * 0.55 + Math.sin(t * 3 - i * 0.3) * 0.25;

        const tipX = pt.x + Math.cos(dAng) * dLen;
        const tipY = pt.y + Math.sin(dAng) * dLen;

        ctx.beginPath();
        ctx.moveTo(pt.x, pt.y - pt.width * 0.8);
        ctx.quadraticCurveTo(pt.x + Math.cos(dAng) * (dLen * 0.5), pt.y + Math.sin(dAng) * (dLen * 0.5) - 10, tipX, tipY);
        ctx.strokeStyle = hsla(royalHue + dFrac * 60, 90, 65, 0.35 * iridescence);
        ctx.lineWidth = 1.2;
        ctx.stroke();
      }

      // 5. Flowing Ventral / Anal Fin (Lower Veil)
      const analStart = Math.floor(spineJoints * 0.35);
      const analEnd = Math.floor(spineJoints * 0.95);

      for (let i = analStart; i <= analEnd; i++) {
        const pt = spinePoints[i];
        const aFrac = (i - analStart) / (analEnd - analStart);
        const aLen = maxR * 0.62 * Math.sin(aFrac * Math.PI) * finFlow;
        const aAng = pt.angle + Math.PI * 0.55 + Math.sin(t * 3 - i * 0.3) * 0.25;

        const tipX = pt.x + Math.cos(aAng) * aLen;
        const tipY = pt.y + Math.sin(aAng) * aLen;

        ctx.beginPath();
        ctx.moveTo(pt.x, pt.y + pt.width * 0.8);
        ctx.quadraticCurveTo(pt.x + Math.cos(aAng) * (aLen * 0.5), pt.y + Math.sin(aAng) * (aLen * 0.5) + 10, tipX, tipY);
        ctx.strokeStyle = hsla(magentaHue - aFrac * 50, 92, 60, 0.35 * iridescence);
        ctx.lineWidth = 1.2;
        ctx.stroke();
      }

      // 6. Main Fish Torso (Hydrodynamic Carapace with Iridescent Scales)
      // Upper contour
      ctx.beginPath();
      const headPt = spinePoints[0];
      ctx.moveTo(headPt.x, headPt.y);

      for (let j = 1; j <= spineJoints; j++) {
        const pt = spinePoints[j];
        const normX = -Math.sin(pt.angle);
        const normY = Math.cos(pt.angle);
        ctx.lineTo(pt.x + normX * pt.width, pt.y + normY * pt.width);
      }

      // Lower contour
      for (let j = spineJoints; j >= 0; j--) {
        const pt = spinePoints[j];
        const normX = -Math.sin(pt.angle);
        const normY = Math.cos(pt.angle);
        ctx.lineTo(pt.x - normX * pt.width, pt.y - normY * pt.width);
      }
      ctx.closePath();

      // Deep iridescent gradient body fill
      const bodyGrad = ctx.createLinearGradient(spinePoints[0].x, 0, spinePoints[spineJoints].x, 0);
      bodyGrad.addColorStop(0, '#0c1a38');
      bodyGrad.addColorStop(0.3, hsla(royalHue, 90, 35, 0.95));
      bodyGrad.addColorStop(0.7, hsla(magentaHue, 85, 30, 0.95));
      bodyGrad.addColorStop(1, '#050a17');

      ctx.fillStyle = bodyGrad;
      ctx.fill();
      ctx.strokeStyle = hsla(royalHue + 20, 100, 75, 0.85 * iridescence);
      ctx.lineWidth = 1.4;
      ctx.stroke();

      // Diamond scale highlights on dorsal torso
      for (let j = 2; j < spineJoints - 4; j += 2) {
        const pt = spinePoints[j];
        const scX = pt.x;
        const scY = pt.y - pt.width * 0.3;
        ctx.beginPath();
        ctx.ellipse(scX, scY, 3.5, 2.0, pt.angle, 0, Math.PI * 2);
        ctx.fillStyle = hsla(royalHue + 40, 100, 80, 0.5 * iridescence);
        ctx.fill();
      }

      // 7. Extended Pelvic Fin Ribbon
      const pelvicPt = spinePoints[3];
      const pelvLen = maxR * 0.7 * finFlow;
      const pelvWave = Math.sin(t * 3.5) * 12;

      ctx.beginPath();
      ctx.moveTo(pelvicPt.x, pelvicPt.y + pelvicPt.width * 0.7);
      ctx.bezierCurveTo(pelvicPt.x + 10, pelvicPt.y + pelvLen * 0.4, pelvicPt.x - 15 + pelvWave, pelvicPt.y + pelvLen * 0.7, pelvicPt.x - 5 + pelvWave, pelvicPt.y + pelvLen);
      ctx.strokeStyle = hsla(magentaHue + 20, 100, 80, 0.85);
      ctx.lineWidth = 1.6;
      ctx.stroke();

      // 8. Delicate Pectoral Fin (Translucent Fan)
      const pectPt = spinePoints[2];
      const pectAngle = pectPt.angle - 0.4 + Math.sin(t * 5) * 0.35;
      const pectLen = maxR * 0.28;

      ctx.save();
      ctx.translate(pectPt.x, pectPt.y);
      ctx.rotate(pectAngle);

      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.bezierCurveTo(pectLen * 0.5, -pectLen * 0.4, pectLen * 0.9, -pectLen * 0.3, pectLen, 0);
      ctx.bezierCurveTo(pectLen * 0.8, pectLen * 0.3, pectLen * 0.4, pectLen * 0.3, 0, 0);
      ctx.fillStyle = 'rgba(56, 189, 248, 0.25)';
      ctx.fill();
      ctx.strokeStyle = hsla(royalHue + 20, 95, 80, 0.75);
      ctx.lineWidth = 1.0;
      ctx.stroke();
      ctx.restore();

      // 9. Operculum Gill Line & Piercing Amber Eye
      const eyePt = spinePoints[1];
      const eyeX = eyePt.x - 4;
      const eyeY = eyePt.y - 3;

      // Dark orbit
      ctx.beginPath();
      ctx.arc(eyeX, eyeY, 4.2, 0, Math.PI * 2);
      ctx.fillStyle = '#020610';
      ctx.fill();
      ctx.strokeStyle = hsla(45, 100, 65, 0.9);
      ctx.lineWidth = 1.2;
      ctx.stroke();

      // Golden Iris Core
      ctx.beginPath();
      ctx.arc(eyeX, eyeY, 2.4, 0, Math.PI * 2);
      ctx.fillStyle = '#f59e0b';
      ctx.fill();

      // Pupil & Specular Glint
      ctx.beginPath();
      ctx.arc(eyeX, eyeY, 1.2, 0, Math.PI * 2);
      ctx.fillStyle = '#000000';
      ctx.fill();

      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(eyeX - 0.8, eyeY - 0.8, 0.7, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    },
  };
}
