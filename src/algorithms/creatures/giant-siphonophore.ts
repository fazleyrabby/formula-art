import type { ArtRenderer, ParameterState, RenderContext, TimeState } from '../../types/engine';
import { hsla } from '../common/color';

// Anatomically Enriched Giant Siphonophore (Physonect/Calycophoran Anatomy)
// Features: Apical pneumatophore gas float, nectosome swimming bells with radial canals,
// siphosome cormidia repeating units (gastrozooids, gonozooids, protective bracts, and coiled tentilla).
export function createGiantSiphonophore(): ArtRenderer {
  const CORMIDIA_COUNT = 24;

  return {
    setup() {},

    render(context: RenderContext, timeState: TimeState, params: ParameterState) {
      const { ctx, width, height } = context;
      const waveSpeed = Number(params.flowSpeed || 0.9);
      const chainLength = Number(params.chainSpread || 1.1);
      const t = timeState.time * waveSpeed;

      ctx.fillStyle = '#020307';
      ctx.fillRect(0, 0, width, height);

      const cx = width * 0.5;
      const cy = height * 0.5;
      const scale = Math.min(width, height) * 0.42 * chainLength;

      // 1. Primary Helical Coenosarc Stem (Stem Axis)
      const stemNodes: { x: number; y: number; z: number }[] = [];
      for (let i = 0; i < CORMIDIA_COUNT; i++) {
        const norm = i / (CORMIDIA_COUNT - 1);
        const theta = norm * Math.PI * 3.5 + t * 0.8;
        const stemX = cx + (norm - 0.5) * scale * 1.8 + Math.sin(t * 1.2 + norm * 4) * 22;
        const stemY = cy + Math.sin(theta) * (scale * 0.32);
        const stemZ = Math.cos(theta) * (scale * 0.32);
        stemNodes.push({ x: stemX, y: stemY, z: stemZ });
      }

      // Draw Main Coenosarc Filament (Translucent living pipeline)
      ctx.beginPath();
      for (let i = 0; i < stemNodes.length; i++) {
        if (i === 0) ctx.moveTo(stemNodes[i].x, stemNodes[i].y);
        else ctx.lineTo(stemNodes[i].x, stemNodes[i].y);
      }
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.45)';
      ctx.lineWidth = 2.0;
      ctx.stroke();

      // 2. Apical Pneumatophore (Gas-Filled Float at Anterior Tip)
      const apex = stemNodes[0];
      ctx.save();
      ctx.translate(apex.x, apex.y);

      // Gas float bladder
      ctx.beginPath();
      ctx.ellipse(-12, 0, 16, 10, -0.2, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(186, 230, 253, 0.35)';
      ctx.fill();
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 1.6;
      ctx.stroke();

      // Internal Gas Bubble Reflection & Pigment Pore
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(-14, -2, 3, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // 3. Nectosome Swimming Bells (Nectophores with Jet Propulsion Velum)
      for (let n = 1; n <= 3; n++) {
        const node = stemNodes[n];
        const pulse = 1 + 0.28 * Math.sin(t * 3.5 - n * 0.4);

        ctx.save();
        ctx.translate(node.x, node.y);

        // Hydrodynamic Muscular Bell Dome
        ctx.beginPath();
        ctx.ellipse(0, -10, 14 * pulse, 18 * pulse, 0.2, 0, Math.PI * 2);
        ctx.fillStyle = hsla(190, 85, 55, 0.2);
        ctx.fill();
        ctx.strokeStyle = hsla(185, 95, 75, 0.85);
        ctx.lineWidth = 1.4;
        ctx.stroke();

        // 4 Radial Canals in bell
        for (let c = 0; c < 4; c++) {
          const ca = (c / 4) * Math.PI * 2;
          ctx.beginPath();
          ctx.moveTo(0, -10);
          ctx.lineTo(Math.cos(ca) * 12 * pulse, -10 + Math.sin(ca) * 15 * pulse);
          ctx.strokeStyle = 'rgba(125, 211, 252, 0.5)';
          ctx.lineWidth = 1.0;
          ctx.stroke();
        }

        ctx.restore();
      }

      // 4. Siphosome Repeating Cormidia Groups (Gastrozooids, Gonozooids, Bracts, Tentilla)
      for (let i = 4; i < stemNodes.length; i++) {
        const node = stemNodes[i];
        const normI = i / (stemNodes.length - 1);

        // Gelatinous Leaf-like Protective Bract (Shielding the zooids)
        ctx.beginPath();
        ctx.ellipse(node.x, node.y - 8, 10, 6, 0.4, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(56, 189, 248, 0.12)';
        ctx.fill();
        ctx.strokeStyle = 'rgba(186, 230, 253, 0.4)';
        ctx.lineWidth = 1.0;
        ctx.stroke();

        // Gastrozooid (Feeding Polyp with Digestive Cavity)
        ctx.beginPath();
        ctx.moveTo(node.x, node.y);
        ctx.lineTo(node.x + 8, node.y + 12);
        ctx.strokeStyle = hsla(355, 90, 65, 0.8); // Bioluminescent red digestive organ
        ctx.lineWidth = 2.4;
        ctx.stroke();

        // Gonozooid (Reproductive Cluster Beads)
        ctx.fillStyle = hsla(280, 95, 75, 0.85);
        ctx.beginPath();
        ctx.arc(node.x - 6, node.y + 8, 2.5, 0, Math.PI * 2);
        ctx.arc(node.x - 3, node.y + 11, 2.0, 0, Math.PI * 2);
        ctx.fill();

        // 5. Coiled Helical Tentilla with Nematocyst Batteries (Fishing Filament)
        ctx.beginPath();
        ctx.moveTo(node.x, node.y);

        const tentSteps = 28;
        const maxDrop = 150 * chainLength;
        for (let s = 1; s <= tentSteps; s++) {
          const ns = s / tentSteps;
          // Spring-like micro-coils along tentacle
          const coil = Math.sin(ns * 18 + t * 4 + i) * 6;
          const wave = Math.sin(t * 2.5 - ns * 6 + i * 0.4) * (18 * ns);
          const tx = node.x + wave + coil;
          const ty = node.y + ns * maxDrop;
          ctx.lineTo(tx, ty);

          // Bioluminescent Red/Blue Nematocyst Battery Beads (Luciferin lures)
          if (s % 5 === 0) {
            const isRedLure = (i + s) % 3 === 0;
            ctx.fillStyle = isRedLure ? '#ef4444' : '#38bdf8';
            ctx.fillRect(tx - 1, ty - 1, 2.5, 2.5);
          }
        }

        const tentHue = (180 + normI * 40 + t * 15) % 360;
        ctx.strokeStyle = hsla(tentHue, 95, 70, 0.4);
        ctx.lineWidth = 0.9;
        ctx.stroke();
      }
    },
  };
}
