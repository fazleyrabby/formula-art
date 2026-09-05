import type { ArtRenderer, ParameterState, RenderContext, TimeState } from '../../types/engine';
import { hsla } from '../common/color';

// Dave Whyte (@beesandbombs) Tribute: Harmonic Isometric Cube Wave
// Precision isometric 3D projection of oscillating hexahedra driven by radial harmonic phase delays.
// Depth-sorted back-to-front for flawless isometric occlusion with faceted geometric vector shading.
export function createHarmonicCubeWave(): ArtRenderer {
  return {
    setup() {},

    render(context: RenderContext, timeState: TimeState, params: ParameterState) {
      const { ctx, width, height } = context;
      const speed = Number(params.waveSpeed ?? 1.0);
      const freq = Number(params.frequency ?? 1.2);
      const amp = Number(params.amplitude ?? 48);
      const gridSize = Math.floor(Number(params.gridSize ?? 11));
      const colorScheme = Number(params.colorScheme ?? 0); // 0: Cyan/Magenta, 1: Solar/Gold, 2: Emerald, 3: Monochrome
      const t = timeState.time * speed;

      // Dark minimalist background
      ctx.fillStyle = '#06070a';
      ctx.fillRect(0, 0, width, height);

      const cx = width * 0.5;
      const cy = height * 0.52;

      // Isometric projection angles
      const cos30 = Math.cos(Math.PI / 6);
      const sin30 = Math.sin(Math.PI / 6);

      // Adaptive cube sizing to fit canvas viewport
      const maxSpan = Math.min(width, height) * 0.82;
      const spacing = maxSpan / (gridSize * 1.732);
      const cubeSize = spacing * 0.94;
      const cubeH = cubeSize * 0.85;

      const halfGrid = (gridSize - 1) * 0.5;

      ctx.save();
      ctx.translate(cx, cy);

      // Back-to-front painter's sorting in isometric space:
      // Depth metric is (gx + gy)
      const cubes: Array<{ gx: number; gy: number; depth: number; elev: number; dist: number }> = [];

      for (let gx = 0; gx < gridSize; gx++) {
        for (let gy = 0; gy < gridSize; gy++) {
          const dx = gx - halfGrid;
          const dy = gy - halfGrid;
          const dist = Math.sqrt(dx * dx + dy * dy);

          // Bees & Bombs signature harmonic wave equation:
          // Harmonic wave radiating outward with sinusoidal ease
          const phase = dist * freq - t * 2.5;
          const elev = Math.sin(phase) * amp;

          cubes.push({
            gx: dx,
            gy: dy,
            depth: dx + dy,
            elev,
            dist,
          });
        }
      }

      // Sort back-to-front (lowest depth first)
      cubes.sort((a, b) => a.depth - b.depth);

      for (let i = 0; i < cubes.length; i++) {
        const c = cubes[i];
        const { gx, gy, elev, dist } = c;

        // Isometric projection of the base position
        const isoX = (gx - gy) * spacing * cos30;
        const isoY = (gx + gy) * spacing * sin30 - elev;

        // Dynamic harmonic hue shift
        let baseHue = 190;
        if (colorScheme === 0) {
          baseHue = (185 + dist * 18 + Math.sin(t * 1.5) * 40) % 360;
        } else if (colorScheme === 1) {
          baseHue = (35 + dist * 15 + Math.sin(t * 1.5) * 25) % 360;
        } else if (colorScheme === 2) {
          baseHue = (145 + dist * 16 + Math.cos(t * 1.5) * 30) % 360;
        } else {
          baseHue = 210;
        }

        const isMono = colorScheme === 3;
        const sat = isMono ? 0 : 85;

        // Top face coordinates
        // Center: (isoX, isoY - cubeH)
        const topY = isoY - cubeH;
        const w = cubeSize * cos30;
        const h = cubeSize * sin30;

        // 1. Right Face: (isoX, topY) -> (isoX + w, topY + h) -> (isoX + w, isoY + h) -> (isoX, isoY)
        ctx.beginPath();
        ctx.moveTo(isoX, topY);
        ctx.lineTo(isoX + w, topY + h);
        ctx.lineTo(isoX + w, isoY + h);
        ctx.lineTo(isoX, isoY);
        ctx.closePath();
        ctx.fillStyle = isMono ? '#1e2430' : hsla(baseHue, sat, 35, 0.95);
        ctx.fill();
        ctx.strokeStyle = isMono ? '#334155' : hsla(baseHue, sat, 50, 0.4);
        ctx.lineWidth = 1;
        ctx.stroke();

        // 2. Left Face: (isoX, topY) -> (isoX - w, topY + h) -> (isoX - w, isoY + h) -> (isoX, isoY)
        ctx.beginPath();
        ctx.moveTo(isoX, topY);
        ctx.lineTo(isoX - w, topY + h);
        ctx.lineTo(isoX - w, isoY + h);
        ctx.lineTo(isoX, isoY);
        ctx.closePath();
        ctx.fillStyle = isMono ? '#2a3242' : hsla(baseHue, sat, 48, 0.95);
        ctx.fill();
        ctx.strokeStyle = isMono ? '#475569' : hsla(baseHue, sat, 60, 0.4);
        ctx.stroke();

        // 3. Top Face: (isoX, topY - h) -> (isoX + w, topY) -> (isoX, topY + h) -> (isoX - w, topY)
        ctx.beginPath();
        ctx.moveTo(isoX, topY - h);
        ctx.lineTo(isoX + w, topY);
        ctx.lineTo(isoX, topY + h);
        ctx.lineTo(isoX - w, topY);
        ctx.closePath();

        // Highlight illumination on top face
        const topLight = isMono ? 80 : 68 + Math.sin(dist * 0.8 - t * 2) * 12;
        ctx.fillStyle = isMono ? `hsl(215, 15%, ${topLight}%)` : hsla(baseHue, sat, topLight, 0.98);
        ctx.fill();
        ctx.strokeStyle = isMono ? '#94a3b8' : hsla((baseHue + 20) % 360, sat, 85, 0.7);
        ctx.lineWidth = 1.2;
        ctx.stroke();
      }

      ctx.restore();
    },
  };
}
