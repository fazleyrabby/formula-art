import type { ArtRenderer, ParameterState, RenderContext, TimeState } from '../../types/engine';
import { hsla } from '../common/color';

// 072 - Iridescent Jewel Scarab Beetle (Superellipse Chitinous Elytra & Articulated Legs)
export function createScarabBeetle(): ArtRenderer {
  return {
    setup() {},

    render(context: RenderContext, timeState: TimeState, params: ParameterState) {
      const { ctx, width, height } = context;
      const crawlSpeed = Number(params.gaitSpeed ?? 0.8);
      const sheenIntensity = Number(params.iridescentLuster ?? 1.0);
      const elytraSpread = Number(params.elytraFlare ?? 0.25);
      const t = timeState.time * crawlSpeed;

      // Dark obsidian jungle floor backdrop
      ctx.fillStyle = '#030504';
      ctx.fillRect(0, 0, width, height);

      const cx = width * 0.5;
      const cy = height * 0.5;
      const maxR = Math.min(width, height) * 0.42;

      // Micro-bobbing breath
      const bobY = Math.sin(t * 2) * 4;

      ctx.save();
      ctx.translate(cx, cy + bobY);

      const baseHue = (145 + Math.sin(t * 0.8) * 35) % 360; // Emerald to Sapphire to Gold

      // 1. Six Articulated Arthropod Legs (Prothoracic, Mesothoracic, Metathoracic)
      for (const side of [-1, 1]) {
        for (let leg = 0; leg < 3; leg++) {
          const legPhase = t * 3 + leg * 1.2 + (side === 1 ? Math.PI : 0);
          const reach = Math.sin(legPhase) * 12;
          const lift = Math.cos(legPhase) * 6;

          const baseAngle = (leg - 1) * 0.45 + (side * 0.35);
          const coxaX = side * (maxR * 0.15);
          const coxaY = (leg - 1) * (maxR * 0.14);

          // Femur Knee Joint
          const femurLen = maxR * (0.28 + leg * 0.04);
          const kneeAngle = (leg === 0 ? -Math.PI * 0.25 : leg === 1 ? 0 : Math.PI * 0.28) + (side * 0.2);
          const kneeX = coxaX + side * Math.cos(kneeAngle) * femurLen + reach * 0.5;
          const kneeY = coxaY + Math.sin(kneeAngle) * femurLen + lift;

          // Tibia Ankle Joint
          const tibiaLen = maxR * 0.24;
          const ankleAngle = kneeAngle + (side * 0.45);
          const footX = kneeX + side * Math.cos(ankleAngle) * tibiaLen + reach;
          const footY = kneeY + Math.sin(ankleAngle) * tibiaLen;

          // Draw Leg Segments
          ctx.beginPath();
          ctx.moveTo(coxaX, coxaY);
          ctx.lineTo(kneeX, kneeY);
          ctx.lineTo(footX, footY);
          ctx.strokeStyle = hsla(baseHue - 30, 85, 45, 0.9);
          ctx.lineWidth = 2.4 - leg * 0.2;
          ctx.stroke();

          // Tibial Serrated Spines
          for (let sp = 1; sp <= 3; sp++) {
            const spFrac = sp / 4;
            const sx = kneeX + (footX - kneeX) * spFrac;
            const sy = kneeY + (footY - kneeY) * spFrac;
            ctx.beginPath();
            ctx.moveTo(sx, sy);
            ctx.lineTo(sx + side * 4, sy - 3);
            ctx.strokeStyle = hsla(45, 95, 75, 0.7);
            ctx.lineWidth = 1.0;
            ctx.stroke();
          }

          // Tarsus Claw Tip
          ctx.fillStyle = hsla(45, 100, 85, 0.95);
          ctx.beginPath();
          ctx.arc(footX, footY, 2.0, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // 2. Underwing Membrane (Translucent Flight Wings exposed if elytra spread)
      if (elytraSpread > 0.05) {
        for (const wingSide of [-1, 1]) {
          const wFlare = elytraSpread * (0.8 + 0.1 * Math.sin(t * 12));
          ctx.save();
          ctx.rotate(wingSide * wFlare * 0.6);

          ctx.beginPath();
          ctx.moveTo(0, 0);
          ctx.bezierCurveTo(wingSide * (maxR * 0.45), maxR * 0.2, wingSide * (maxR * 0.55), maxR * 0.6, wingSide * (maxR * 0.2), maxR * 0.75);
          ctx.bezierCurveTo(wingSide * (maxR * 0.1), maxR * 0.5, 0, maxR * 0.3, 0, 0);

          ctx.fillStyle = hsla(200, 90, 70, 0.25 * sheenIntensity);
          ctx.fill();
          ctx.strokeStyle = hsla(190, 95, 80, 0.6);
          ctx.lineWidth = 1.0;
          ctx.stroke();

          ctx.restore();
        }
      }

      // 3. Main Split Elytra (Iridescent Hard Shell Wing Cases)
      const elytraLen = maxR * 0.58;
      const elytraWidth = maxR * 0.28;

      for (const eSide of [-1, 1]) {
        ctx.save();
        ctx.rotate(eSide * elytraSpread * (0.4 + 0.05 * Math.sin(t * 2)));

        ctx.beginPath();
        // Superelliptic curved shell
        ctx.moveTo(0, -maxR * 0.02);
        ctx.bezierCurveTo(
          eSide * elytraWidth * 1.3,
          -maxR * 0.02,
          eSide * elytraWidth * 1.3,
          elytraLen * 0.85,
          eSide * 2,
          elytraLen
        );
        ctx.lineTo(0, -maxR * 0.02);
        ctx.closePath();

        // Multi-spectral Chitinous Interference Sheen
        const eHue = (baseHue + eSide * 15 + Math.sin(t * 2) * 10) % 360;
        ctx.fillStyle = hsla(eHue, 88, 42, 0.9 * sheenIntensity);
        ctx.fill();

        ctx.strokeStyle = hsla(eHue + 30, 95, 78, 0.95);
        ctx.lineWidth = 1.6;
        ctx.stroke();

        // Longitudinal Striated Grooves (Punctate ridges)
        for (let g = 1; g <= 4; g++) {
          const gFrac = g / 5;
          ctx.beginPath();
          ctx.moveTo(eSide * (elytraWidth * gFrac * 0.7), 0);
          ctx.quadraticCurveTo(
            eSide * (elytraWidth * gFrac * 1.2),
            elytraLen * 0.5,
            eSide * (elytraWidth * gFrac * 0.5),
            elytraLen * 0.92
          );
          ctx.strokeStyle = hsla(eHue + 50, 90, 72, 0.45);
          ctx.lineWidth = 0.9;
          ctx.stroke();
        }

        ctx.restore();
      }

      // 4. Pronotum Shield (Thorax Plate)
      const pWidth = maxR * 0.26;
      const pHeight = maxR * 0.18;
      ctx.beginPath();
      ctx.moveTo(-pWidth * 0.7, -maxR * 0.22);
      ctx.bezierCurveTo(-pWidth, -maxR * 0.14, -pWidth, -maxR * 0.04, -pWidth * 0.85, -maxR * 0.02);
      ctx.lineTo(pWidth * 0.85, -maxR * 0.02);
      ctx.bezierCurveTo(pWidth, -maxR * 0.04, pWidth, -maxR * 0.14, pWidth * 0.7, -maxR * 0.22);
      ctx.closePath();

      ctx.fillStyle = hsla(baseHue + 20, 85, 38, 0.95);
      ctx.fill();
      ctx.strokeStyle = hsla(baseHue + 50, 95, 80, 0.9);
      ctx.lineWidth = 1.6;
      ctx.stroke();

      // 5. Clypeus Head Plate & Serrated Mandibular Horns
      const hWidth = maxR * 0.16;
      ctx.beginPath();
      ctx.arc(0, -maxR * 0.26, hWidth, -Math.PI * 0.85, -Math.PI * 0.15);
      ctx.lineTo(hWidth * 0.8, -maxR * 0.22);
      ctx.lineTo(-hWidth * 0.8, -maxR * 0.22);
      ctx.closePath();

      ctx.fillStyle = '#06130b';
      ctx.fill();
      ctx.strokeStyle = hsla(baseHue + 10, 90, 70, 0.9);
      ctx.lineWidth = 1.4;
      ctx.stroke();

      // Serrated Frontal Horn Cusp
      for (const hSide of [-1, 1]) {
        ctx.beginPath();
        ctx.moveTo(hSide * (hWidth * 0.6), -maxR * 0.3);
        ctx.lineTo(hSide * (hWidth * 0.9), -maxR * 0.38);
        ctx.lineTo(hSide * (hWidth * 0.3), -maxR * 0.34);
        ctx.strokeStyle = hsla(45, 95, 75, 0.95);
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }

      // Compound Eyes
      for (const eyeSide of [-1, 1]) {
        ctx.fillStyle = hsla(baseHue + 60, 100, 85, 0.95);
        ctx.beginPath();
        ctx.arc(eyeSide * (hWidth * 0.85), -maxR * 0.26, 2.8, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();
    },
  };
}
