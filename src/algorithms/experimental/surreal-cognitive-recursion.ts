import type { ArtRenderer, ParameterState, RenderContext, TimeState } from '../../types/engine';

// A. L. Crego (@ALCrego_) Tribute: Surreal Cognitive Recursion
// Stark monochrome optical surrealism featuring recursive contemplation silhouettes,
// an impossible Escher staircase loop, rotating thought cogs with moiré hatching,
// and perpetual harmonic sphere recursion.
export function createSurrealCognitiveRecursion(): ArtRenderer {
  return {
    setup() {},

    render(context: RenderContext, timeState: TimeState, params: ParameterState) {
      const { ctx, width, height } = context;
      const speed = Number(params.recursionSpeed ?? 0.8);
      const moireDensity = Number(params.moireDensity ?? 1.2);
      const stairSteps = Math.floor(Number(params.stairCycles ?? 12));
      const cogSpeed = Number(params.cogRotation ?? 1.0);
      const t = timeState.time * speed;

      // Stark monochrome void
      ctx.fillStyle = '#050507';
      ctx.fillRect(0, 0, width, height);

      const cx = width * 0.5;
      const cy = height * 0.5;
      const minDim = Math.min(width, height);
      const scale = minDim * 0.42;

      ctx.save();
      ctx.translate(cx, cy);

      // 1. Recursive Architectural Impossible Staircase (Center)
      const stairRadius = scale * 0.85;
      ctx.lineWidth = 1.2;

      for (let s = 0; s < stairSteps; s++) {
        const normStep = ((s / stairSteps) + (t * 0.15) % 1) % 1;
        const rInner = stairRadius * Math.pow(normStep, 1.6);
        const rOuter = stairRadius * Math.pow(Math.min(1, normStep + 1 / stairSteps), 1.6);

        if (rInner < 6) continue;

        const angleStart = normStep * Math.PI * 4;
        const angleEnd = angleStart + (Math.PI * 2) / stairSteps;

        // Stair tread polygon
        ctx.beginPath();
        ctx.arc(0, 0, rOuter, angleStart, angleEnd);
        ctx.lineTo(Math.cos(angleEnd) * rInner, Math.sin(angleEnd) * rInner);
        ctx.arc(0, 0, rInner, angleEnd, angleStart, true);
        ctx.closePath();

        const isEven = s % 2 === 0;
        ctx.fillStyle = isEven ? '#f1f5f9' : '#0f172a';
        ctx.fill();
        ctx.strokeStyle = '#ffffff';
        ctx.stroke();

        // Moiré hatching on alternate steps (Crego signature optical texture)
        if (isEven && rOuter - rInner > 8) {
          ctx.save();
          ctx.clip();
          ctx.strokeStyle = '#050507';
          ctx.lineWidth = 1.0;
          const hatchCount = Math.floor(10 * moireDensity);
          for (let h = 0; h < hatchCount; h++) {
            const hR = rInner + (h / hatchCount) * (rOuter - rInner);
            ctx.beginPath();
            ctx.arc(0, 0, hR, angleStart, angleEnd);
            ctx.stroke();
          }
          ctx.restore();
        }
      }

      // 2. Rotating Clockwork Thought Gears (Left and Right Flanks)
      const gearX = scale * 0.65;
      const gearR = scale * 0.38;
      const gearTeeth = 16;

      for (const dir of [-1, 1]) {
        ctx.save();
        ctx.translate(dir * gearX, -scale * 0.15);
        ctx.rotate(t * cogSpeed * (dir * -0.6));

        // Draw gear perimeter
        ctx.beginPath();
        for (let g = 0; g < gearTeeth * 2; g++) {
          const a = (g * Math.PI) / gearTeeth;
          const r = g % 2 === 0 ? gearR : gearR * 0.84;
          const gx = Math.cos(a) * r;
          const gy = Math.sin(a) * r;
          if (g === 0) ctx.moveTo(gx, gy);
          else ctx.lineTo(gx, gy);
        }
        ctx.closePath();
        ctx.fillStyle = 'rgba(5, 5, 7, 0.88)';
        ctx.fill();
        ctx.strokeStyle = '#e2e8f0';
        ctx.lineWidth = 1.4;
        ctx.stroke();

        // Gear internal spokes & moiré concentric rings
        const innerSpokes = 8;
        for (let k = 0; k < innerSpokes; k++) {
          const sa = (k * Math.PI * 2) / innerSpokes;
          ctx.beginPath();
          ctx.moveTo(0, 0);
          ctx.lineTo(Math.cos(sa) * gearR * 0.84, Math.sin(sa) * gearR * 0.84);
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.6)';
          ctx.lineWidth = 1.0;
          ctx.stroke();
        }

        // Concentric optical moiré circles
        const cRings = Math.floor(6 * moireDensity);
        for (let cr = 1; cr <= cRings; cr++) {
          ctx.beginPath();
          ctx.arc(0, 0, (cr / cRings) * gearR * 0.65, 0, Math.PI * 2);
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.35)';
          ctx.stroke();
        }

        ctx.restore();
      }

      // 3. Contemplative Human Silhouette Profile Contours (High Contrast Negative Space)
      // Smooth bezier curves defining philosophical head profiles facing inward
      ctx.lineWidth = 1.8;
      for (const side of [-1, 1]) {
        ctx.save();
        ctx.scale(side, 1);

        ctx.beginPath();
        // Forehead down to chin and neck
        const headW = scale * 1.05;
        ctx.moveTo(headW * 0.2, -scale * 0.95);
        ctx.bezierCurveTo(headW * 0.75, -scale * 0.9, headW * 0.85, -scale * 0.5, headW * 0.75, -scale * 0.25);
        // Brow & nose
        ctx.lineTo(headW * 0.92, -scale * 0.08);
        ctx.lineTo(headW * 0.78, 0.0);
        // Lips & chin
        ctx.bezierCurveTo(headW * 0.82, scale * 0.08, headW * 0.84, scale * 0.16, headW * 0.76, scale * 0.25);
        ctx.lineTo(headW * 0.82, scale * 0.38);
        // Jaw & neck
        ctx.bezierCurveTo(headW * 0.65, scale * 0.45, headW * 0.45, scale * 0.65, headW * 0.45, scale * 0.95);

        ctx.strokeStyle = '#ffffff';
        ctx.stroke();

        ctx.restore();
      }

      // 4. Perpetual Orbiting Thought Spheres (Philosophical Harmonic Cascade)
      const sphereCount = 5;
      for (let i = 0; i < sphereCount; i++) {
        const sphereProg = ((i / sphereCount) + (t * 0.25)) % 1;
        const sphereAngle = sphereProg * Math.PI * 4;
        const sphereDist = stairRadius * Math.pow(sphereProg, 1.5);
        const sx = Math.cos(sphereAngle) * sphereDist;
        const sy = Math.sin(sphereAngle) * sphereDist;
        const sRadius = 3 + sphereProg * 8;

        // Stark white sphere with black shadow crescent
        ctx.beginPath();
        ctx.arc(sx, sy, sRadius, 0, Math.PI * 2);
        ctx.fillStyle = '#ffffff';
        ctx.fill();

        // Shadow side
        ctx.beginPath();
        ctx.arc(sx - sRadius * 0.25, sy, sRadius * 0.85, 0, Math.PI * 2);
        ctx.fillStyle = '#050507';
        ctx.fill();

        // Delicate white outline
        ctx.beginPath();
        ctx.arc(sx, sy, sRadius, 0, Math.PI * 2);
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // 5. Subtle CRT / Analog Scanline Texture Overlay (Crego Vintage Screen Aesthetic)
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.035)';
      ctx.lineWidth = 1.0;
      for (let y = -height * 0.5; y < height * 0.5; y += 4) {
        ctx.beginPath();
        ctx.moveTo(-width * 0.5, y);
        ctx.lineTo(width * 0.5, y);
        ctx.stroke();
      }

      ctx.restore();
    },
  };
}
