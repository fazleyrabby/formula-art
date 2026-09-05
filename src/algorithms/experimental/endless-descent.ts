import type { ArtRenderer, ParameterState, RenderContext, TimeState } from '../../types/engine';

// A. L. Crego (@ALCrego_) Tribute: "· No land ·" (Endless Void Fall)
// A glowing human figure falls perpetually through a deep vertical abyss,
// holding onto two infinite parallel light rails while thousands of cosmic
// dust streaks and stars rush upward at terminal velocity.
export function createEndlessDescent(): ArtRenderer {
  interface Particle {
    x: number;
    y: number;
    speed: number;
    len: number;
    width: number;
    alpha: number;
    isInsideTrench: boolean;
  }

  const MAX_PARTICLES = 2500;
  const particles: Particle[] = [];
  let initialized = false;

  function initParticles(width: number, height: number, trenchHalfW: number) {
    particles.length = 0;
    const cx = width * 0.5;

    for (let i = 0; i < MAX_PARTICLES; i++) {
      const isInsideTrench = Math.random() < 0.04; // Rare fast streaks inside the void
      let x = 0;

      if (isInsideTrench) {
        x = cx + (Math.random() - 0.5) * (trenchHalfW * 1.6);
      } else {
        // High-density distribution clustered near the trench border, spreading outwards
        const side = Math.random() < 0.5 ? -1 : 1;
        // Exponential / power falloff to concentrate particles at trench wall
        const distFromBorder = Math.pow(Math.random(), 2.2) * (width * 0.5 - trenchHalfW);
        x = cx + side * (trenchHalfW + distFromBorder);
      }

      const speed = isInsideTrench
        ? 350 + Math.random() * 500
        : 180 + Math.random() * 420;

      particles.push({
        x,
        y: Math.random() * height,
        speed,
        len: isInsideTrench ? 15 + Math.random() * 35 : 4 + Math.random() * 18,
        width: isInsideTrench ? 1.0 : 0.8 + Math.random() * 1.5,
        alpha: isInsideTrench ? 0.35 + Math.random() * 0.45 : 0.2 + Math.random() * 0.75,
        isInsideTrench,
      });
    }
    initialized = true;
  }

  return {
    setup(context: RenderContext, params: ParameterState) {
      const trenchHalfW = Number(params.trenchWidth ?? 55);
      initParticles(context.width, context.height, trenchHalfW);
    },

    render(context: RenderContext, timeState: TimeState, params: ParameterState) {
      const { ctx, width, height } = context;
      const speedMult = Number(params.fallSpeed ?? 1.2);
      const trenchHalfW = Number(params.trenchWidth ?? 55);
      const beamGlow = Number(params.beamGlow ?? 1.5);
      const activeCount = Math.min(MAX_PARTICLES, Math.floor(Number(params.particleDensity ?? 1400)));
      const turbulence = Number(params.windTurbulence ?? 1.0);

      const dt = Math.min(timeState.deltaTime || 0.016, 0.05);
      const t = timeState.time;

      if (!initialized || particles.length === 0) {
        initParticles(width, height, trenchHalfW);
      }

      const cx = width * 0.5;

      // Pure Void Black
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, width, height);

      // 1. Cosmic Upward-Rushing Particle Rain & Stipple Wall
      ctx.save();
      ctx.lineCap = 'round';

      for (let i = 0; i < activeCount; i++) {
        const p = particles[i];

        // Move upward rapidly (downward falling observer perspective)
        p.y -= p.speed * speedMult * dt;

        // Wrap around bottom
        if (p.y < -p.len) {
          p.y = height + Math.random() * 40;
          if (p.isInsideTrench) {
            p.x = cx + (Math.random() - 0.5) * (trenchHalfW * 1.6);
          } else {
            const side = Math.random() < 0.5 ? -1 : 1;
            const distFromBorder = Math.pow(Math.random(), 2.2) * (width * 0.5 - trenchHalfW);
            p.x = cx + side * (trenchHalfW + distFromBorder);
          }
        }

        // Draw vertical velocity streak
        const streakLen = p.len * speedMult;
        ctx.strokeStyle = `rgba(255, 255, 255, ${p.alpha})`;
        ctx.lineWidth = p.width;

        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(p.x, p.y + streakLen);
        ctx.stroke();
      }
      ctx.restore();

      // 2. Central Trench Occlusion (Keeping the vertical center pure void)
      const trenchGradL = ctx.createLinearGradient(cx - trenchHalfW - 15, 0, cx - trenchHalfW, 0);
      trenchGradL.addColorStop(0, 'rgba(0, 0, 0, 0)');
      trenchGradL.addColorStop(1, '#000000');
      ctx.fillStyle = trenchGradL;
      ctx.fillRect(cx - trenchHalfW - 15, 0, 15, height);

      const trenchGradR = ctx.createLinearGradient(cx + trenchHalfW, 0, cx + trenchHalfW + 15, 0);
      trenchGradR.addColorStop(0, '#000000');
      trenchGradR.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = trenchGradR;
      ctx.fillRect(cx + trenchHalfW, 0, 15, height);

      // 3. The Twin Parallel White Light Beams / Laser Rails
      const railSpacing = 11; // spacing between the two light rails
      const railLeftX = cx - railSpacing * 0.5;
      const railRightX = cx + railSpacing * 0.5;

      // Figure position in the upper half
      const figureBaseY = height * 0.36;
      const figureSwayY = Math.sin(t * 3 * turbulence) * 2.5;
      const figureY = figureBaseY + figureSwayY;
      const figureHandsY = figureY - 26;

      ctx.save();
      ctx.globalCompositeOperation = 'screen';

      // Soft volumetric beam bloom
      ctx.strokeStyle = `rgba(255, 255, 255, ${0.18 * beamGlow})`;
      ctx.lineWidth = 6.0;
      ctx.beginPath();
      ctx.moveTo(railLeftX, 0);
      ctx.lineTo(railLeftX, figureHandsY + 5);
      ctx.moveTo(railRightX, 0);
      ctx.lineTo(railRightX, figureHandsY + 5);
      ctx.stroke();

      // Sharp core laser beams
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 1.8;
      ctx.beginPath();
      ctx.moveTo(railLeftX, 0);
      ctx.lineTo(railLeftX, figureHandsY + 5);
      ctx.moveTo(railRightX, 0);
      ctx.lineTo(railRightX, figureHandsY + 5);
      ctx.stroke();
      ctx.restore();

      // 4. The Glowing Falling Figure ("· No land ·")
      ctx.save();
      ctx.translate(cx, figureY);

      // Aerodynamic turbulence sway
      const swayAngle = Math.sin(t * 2.5 * turbulence) * 0.04;
      ctx.rotate(swayAngle);

      // Glowing ethereal aura surrounding the figure
      const auraGrad = ctx.createRadialGradient(0, -6, 4, 0, 4, 38);
      auraGrad.addColorStop(0, `rgba(255, 255, 255, ${0.85 * beamGlow})`);
      auraGrad.addColorStop(0.35, `rgba(255, 255, 255, ${0.45 * beamGlow})`);
      auraGrad.addColorStop(0.7, `rgba(255, 255, 255, ${0.12 * beamGlow})`);
      auraGrad.addColorStop(1, 'transparent');

      ctx.fillStyle = auraGrad;
      ctx.beginPath();
      ctx.ellipse(0, 2, 24, 42, 0, 0, Math.PI * 2);
      ctx.fill();

      // Hand grip points on the twin light rails
      const handLX = -railSpacing * 0.5;
      const handRX = railSpacing * 0.5;
      const handY = -26;

      // Radiant grip spark points
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(handLX, handY, 2.5, 0, Math.PI * 2);
      ctx.arc(handRX, handY, 2.5, 0, Math.PI * 2);
      ctx.fill();

      // Figure body drawn with crisp glowing white silhouette
      ctx.fillStyle = '#ffffff';
      ctx.strokeStyle = '#ffffff';
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      // --- ARMS (Stretched upward holding the rails) ---
      // Left arm (from shoulder to left rail)
      ctx.lineWidth = 2.8;
      ctx.beginPath();
      ctx.moveTo(-4, -13); // left shoulder
      ctx.lineTo(-5, -20);
      ctx.lineTo(handLX, handY);
      ctx.stroke();

      // Right arm (from shoulder to right rail)
      ctx.beginPath();
      ctx.moveTo(4, -13); // right shoulder
      ctx.lineTo(5, -20);
      ctx.lineTo(handRX, handY);
      ctx.stroke();

      // --- HEAD & NECK ---
      ctx.beginPath();
      ctx.ellipse(0, -16.5, 3.8, 5.0, 0, 0, Math.PI * 2);
      ctx.fill();

      // --- TORSO ---
      ctx.beginPath();
      ctx.ellipse(0, -4, 4.5, 9.5, 0, 0, Math.PI * 2);
      ctx.fill();

      // --- HIPS & PELVIS ---
      ctx.beginPath();
      ctx.ellipse(0, 4, 4.0, 4.2, 0, 0, Math.PI * 2);
      ctx.fill();

      // --- LEGS (Hanging vertically with wind flutter) ---
      const legFlutterL = Math.sin(t * 6 * turbulence) * 1.2;
      const legFlutterR = Math.cos(t * 5.5 * turbulence) * 1.2;

      // Left leg
      ctx.lineWidth = 3.2;
      ctx.beginPath();
      ctx.moveTo(-2.5, 6);
      ctx.lineTo(-2.8, 17); // knee
      ctx.lineTo(-2.0 + legFlutterL, 29); // ankle
      ctx.lineTo(-1.2 + legFlutterL, 33); // toes
      ctx.stroke();

      // Right leg
      ctx.beginPath();
      ctx.moveTo(2.5, 6);
      ctx.lineTo(2.8, 17); // knee
      ctx.lineTo(2.2 + legFlutterR, 29); // ankle
      ctx.lineTo(3.0 + legFlutterR, 33); // toes
      ctx.stroke();

      ctx.restore(); // end figure

      // 5. Subtle CRT Scanline Grain (A.L. Crego trademark gif texture)
      ctx.fillStyle = 'rgba(255, 255, 255, 0.025)';
      for (let y = 0; y < height; y += 4) {
        ctx.fillRect(0, y, width, 1.2);
      }
    },
  };
}
