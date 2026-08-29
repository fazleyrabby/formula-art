import type { ArtRenderer, ParameterState, RenderContext, TimeState } from '../../types/engine';
import { hsla } from '../common/color';

export function createDigitTunnel(): ArtRenderer {
  return {
    setup(context: RenderContext) {
      // Any one-time initialization
    },
    
    render(context: RenderContext, time: TimeState, params: ParameterState) {
      const { ctx, width, height } = context;
      
      const speed = params.speed !== undefined ? Number(params.speed) : 1.0;
      const curve = params.curve !== undefined ? Number(params.curve) : 1.0;
      const density = params.density !== undefined ? Number(params.density) : 1.0;
      const rotationSpeed = params.rotation !== undefined ? Number(params.rotation) : 0.5;
      const charset = params.charset !== undefined ? Number(params.charset) : 0; // 0=Decimal, 1=Binary, 2=Hex

      // Background
      ctx.fillStyle = '#050608';
      ctx.fillRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;
      
      // Calculate responsive FOV and depth
      const fov = Math.min(width, height) * 0.8;
      const radius = 250;
      const maxDepth = 2000;
      const zStep = 40 / density;
      const angularStep = (Math.PI * 2) / (30 * density);

      // Time calculations
      // Time calculations
      const t = (time as any).time !== undefined ? (time as any).time : (time as any).elapsed || 0;
      const moveZ = (t * speed * 200) % zStep;
      const baseRot = t * rotationSpeed * 0.2;

      const pointsToDraw: any[] = [];

      // Character sets
      const decChars = '0123456789';
      const binChars = '01';
      const hexChars = '0123456789ABCDEF';
      const charPool = charset === 1 ? binChars : charset === 2 ? hexChars : decChars;

      // Deterministic PRNG to map chars consistently to the "walls"
      const randomSeed = (seed: number) => {
        let s = seed += 0x6D2B79F5;
        s = Math.imul(s ^ s >>> 15, s | 1);
        s ^= s + Math.imul(s ^ s >>> 7, s | 61);
        return ((s ^ s >>> 14) >>> 0) / 4294967296;
      };

      for (let z = zStep - moveZ; z < maxDepth; z += zStep) {
        if (z <= 0) continue;

        const fade = Math.max(0, 1 - (z / maxDepth));
        if (fade <= 0) continue;

        const curveX = Math.sin(z * 0.002 * curve + t * 0.5) * 400 * curve;
        const curveY = Math.cos(z * 0.0015 * curve + t * 0.4) * 300 * curve;

        const ringRot = baseRot + Math.sin(z * 0.001) * 2;

        for (let a = 0; a < Math.PI * 2; a += angularStep) {
          const ringId = Math.floor((z + moveZ) / zStep);
          const angleId = Math.floor(a / angularStep);
          const seed = ringId * 1000 + angleId;
          const charIdx = Math.floor(randomSeed(seed) * charPool.length);
          const char = charPool[charIdx];

          let x = Math.cos(a + ringRot) * radius + curveX;
          let y = Math.sin(a + ringRot) * radius + curveY;

          const scale = fov / z;
          const screenX = cx + x * scale;
          const screenY = cy + y * scale;

          const fontSize = Math.floor(Math.max(2, 24 * scale));
          
          if (screenX < -500 || screenX > width + 500 || screenY < -500 || screenY > height + 500) {
             continue;
          }

          pointsToDraw.push({
            x: screenX,
            y: screenY,
            z: z,
            char: char,
            fontSize: fontSize,
            alpha: fade
          });
        }
      }

      // Painter's algorithm
      pointsToDraw.sort((a, b) => b.z - a.z);

      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      
      for (let i = 0; i < pointsToDraw.length; i++) {
        const p = pointsToDraw[i];
        
        ctx.fillStyle = `rgba(255, 255, 255, ${p.alpha})`;
        ctx.font = `bold ${p.fontSize}px monospace`;
        ctx.fillText(p.char, p.x, p.y);
      }
    }
  };
}
