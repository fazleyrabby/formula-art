import type { ArtRenderer, ParameterState, RenderContext, TimeState } from '../../types/engine';
import { hsla } from '../common/color';

export function createDNADoubleHelix(): ArtRenderer {
  const BASE_PAIRS = 40;

  return {
    setup() {},

    render(context: RenderContext, timeState: TimeState, params: ParameterState) {
      const { ctx, width, height } = context;
      const speed = Number(params.rotationSpeed || 1.0);
      const helixRadius = Number(params.helixRadius || 85);
      const t = timeState.time * speed;

      ctx.fillStyle = '#05060a';
      ctx.fillRect(0, 0, width, height);

      const cx = width * 0.5;
      const cy = height * 0.5;
      const helixHeight = height * 0.85;
      const startY = cy - helixHeight * 0.5;

      // Base pair nodes array for depth sorting
      const nodes: {
        y: number;
        x1: number;
        z1: number;
        x2: number;
        z2: number;
        pairType: number;
      }[] = [];

      for (let i = 0; i < BASE_PAIRS; i++) {
        const normY = i / (BASE_PAIRS - 1);
        const y = startY + normY * helixHeight;
        // Two full helical turns (4*pi)
        const theta = normY * Math.PI * 4 + t * 2;

        const x1 = Math.cos(theta) * helixRadius;
        const z1 = Math.sin(theta) * helixRadius;

        const x2 = Math.cos(theta + Math.PI) * helixRadius;
        const z2 = Math.sin(theta + Math.PI) * helixRadius;

        nodes.push({ y, x1, z1, x2, z2, pairType: i % 4 });
      }

      // Sort base pairs by depth (average z)
      nodes.sort((a, b) => (a.z1 + a.z2) / 2 - (b.z1 + b.z2) / 2);

      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];

        const px1 = cx + n.x1;
        const py1 = n.y;
        const depth1 = (n.z1 + helixRadius) / (helixRadius * 2); // 0 to 1

        const px2 = cx + n.x2;
        const py2 = n.y;
        const depth2 = (n.z2 + helixRadius) / (helixRadius * 2);

        // 1. Hydrogen Bond Horizontal Base Pair Rung
        ctx.beginPath();
        ctx.moveTo(px1, py1);
        ctx.lineTo(px2, py2);

        // Nucleotide color coding: A-T (Cyan/Indigo), G-C (Emerald/Rose)
        const baseHue = n.pairType < 2 ? 190 : 340;
        const avgDepth = (depth1 + depth2) * 0.5;
        ctx.strokeStyle = hsla(baseHue, 85, 60, 0.4 + avgDepth * 0.5);
        ctx.lineWidth = 1.8 + avgDepth * 1.5;
        ctx.stroke();

        // 2. Sugar-Phosphate Strand Nodes
        // Node 1
        ctx.fillStyle = hsla(185, 95, 70, 0.6 + depth1 * 0.4);
        ctx.beginPath();
        ctx.arc(px1, py1, 3.5 + depth1 * 3.5, 0, Math.PI * 2);
        ctx.fill();

        // Node 2
        ctx.fillStyle = hsla(280, 95, 75, 0.6 + depth2 * 0.4);
        ctx.beginPath();
        ctx.arc(px2, py2, 3.5 + depth2 * 3.5, 0, Math.PI * 2);
        ctx.fill();
      }
    },
  };
}
