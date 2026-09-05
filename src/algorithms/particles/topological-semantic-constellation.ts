import type { ArtRenderer, ParameterState, RenderContext, TimeState } from '../../types/engine';
import { hsla } from '../common/color';

// Dominikus Baur (@dominikus) Tribute: Topological Semantic Constellation
// Interactive force-directed network graph with semantic clustering,
// curved edge bundling, real-time data packet propagation, and cursor perturbation physics.
export function createTopologicalSemanticConstellation(): ArtRenderer {
  interface Node {
    id: number;
    cluster: number;
    label: string;
    x: number;
    y: number;
    vx: number;
    vy: number;
    radius: number;
    isHub: boolean;
  }

  interface Edge {
    source: number;
    target: number;
    length: number;
  }

  interface Packet {
    edgeIndex: number;
    progress: number;
    speed: number;
    hue: number;
  }

  const nodes: Node[] = [];
  const edges: Edge[] = [];
  const packets: Packet[] = [];

  const CLUSTER_NAMES = ['AESTHETICS', 'KINEMATICS', 'TOPOLOGY', 'CAUSTICS', 'RESONANCE', 'ENTROPY'];
  const SUB_TERMS = [
    ['Form', 'Color', 'Balance', 'Harmony', 'Contrast', 'Rhythm'],
    ['Velocity', 'Inertia', 'Vector', 'Orbit', 'Vortex', 'Momentum'],
    ['Manifold', 'Graph', 'Simplex', 'Geodesic', 'Cluster', 'Lattice'],
    ['Refraction', 'Turbulence', 'Dispersion', 'Wavelet', 'Abyss', 'Current'],
    ['Fourier', 'Harmonic', 'Modulation', 'Phase', 'Octave', 'Frequency'],
    ['Stochastic', 'Attractor', 'Diffusion', 'Perturbation', 'Bifurcation', 'Swarm'],
  ];

  let pointerX = -9999;
  let pointerY = -9999;
  let isPointerActive = false;
  let initialized = false;

  function initGraph(width: number, height: number, clusterCount: number) {
    nodes.length = 0;
    edges.length = 0;
    packets.length = 0;

    const cx = width * 0.5;
    const cy = height * 0.5;
    const clusterRadius = Math.min(width, height) * 0.32;

    let nodeId = 0;

    for (let c = 0; c < clusterCount; c++) {
      const cAngle = (c / clusterCount) * Math.PI * 2 - Math.PI * 0.5;
      const hubX = cx + Math.cos(cAngle) * clusterRadius;
      const hubY = cy + Math.sin(cAngle) * clusterRadius;
      const hubIndex = nodeId++;

      // Hub node
      nodes.push({
        id: hubIndex,
        cluster: c,
        label: CLUSTER_NAMES[c % CLUSTER_NAMES.length],
        x: hubX,
        y: hubY,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: 7.5,
        isHub: true,
      });

      // Satellite sub-nodes
      const satCount = 4 + (c % 3);
      for (let s = 0; s < satCount; s++) {
        const satAngle = (s / satCount) * Math.PI * 2 + Math.random() * 0.4;
        const satDist = 45 + Math.random() * 55;
        const satX = hubX + Math.cos(satAngle) * satDist;
        const satY = hubY + Math.sin(satAngle) * satDist;
        const satIndex = nodeId++;

        const termList = SUB_TERMS[c % SUB_TERMS.length];
        const term = termList[s % termList.length];

        nodes.push({
          id: satIndex,
          cluster: c,
          label: term,
          x: satX,
          y: satY,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          radius: 3.8,
          isHub: false,
        });

        // Edge between hub and satellite
        edges.push({
          source: hubIndex,
          target: satIndex,
          length: satDist,
        });
      }

      // Cross-cluster bridge edges connecting adjacent hubs
      if (c > 0) {
        edges.push({
          source: (c - 1) * (satCount + 1), // Approximate previous hub
          target: hubIndex,
          length: clusterRadius * 1.05,
        });
      }
    }

    // Connect last hub to first hub
    if (clusterCount > 2) {
      edges.push({
        source: 0,
        target: nodes.findIndex((n, idx) => idx > 0 && n.isHub && n.cluster === clusterCount - 1),
        length: clusterRadius * 1.05,
      });
    }

    // Populate flowing data packets
    for (let i = 0; i < edges.length * 2; i++) {
      packets.push({
        edgeIndex: i % edges.length,
        progress: Math.random(),
        speed: 0.008 + Math.random() * 0.014,
        hue: 180 + Math.random() * 70,
      });
    }

    initialized = true;
  }

  return {
    setup(context: RenderContext, params: ParameterState) {
      const clusterCount = Math.floor(Number(params.clusterCount ?? 5));
      initGraph(context.width, context.height, clusterCount);
    },

    onPointerMove(x: number, y: number, isDown: boolean) {
      pointerX = x;
      pointerY = y;
      isPointerActive = isDown || (x > 0 && y > 0);
    },

    render(context: RenderContext, timeState: TimeState, params: ParameterState) {
      const { ctx, width, height } = context;
      const clusterCount = Math.floor(Number(params.clusterCount ?? 5));
      const springK = Number(params.springTension ?? 1.0) * 0.045;
      const packetSpeedMult = Number(params.packetFlowSpeed ?? 1.2);
      const interactRadius = Number(params.interactionRadius ?? 160);
      const t = timeState.time;

      if (!initialized || nodes.length === 0) {
        initGraph(width, height, clusterCount);
      }

      // Elegant deep tech background
      ctx.fillStyle = '#06080e';
      ctx.fillRect(0, 0, width, height);

      const cx = width * 0.5;
      const cy = height * 0.5;

      // 1. Force-Directed Physics Simulation Step
      const dt = 0.5;

      // Coulomb node repulsion
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const n1 = nodes[i];
          const n2 = nodes[j];
          const dx = n2.x - n1.x;
          const dy = n2.y - n1.y;
          const distSq = dx * dx + dy * dy + 100;
          const dist = Math.sqrt(distSq);

          const force = (n1.cluster === n2.cluster ? 280 : 450) / distSq;
          const fx = (dx / dist) * force;
          const fy = (dy / dist) * force;

          n1.vx -= fx;
          n1.vy -= fy;
          n2.vx += fx;
          n2.vy += fy;
        }
      }

      // Hooke Spring Edge Tension
      for (let e = 0; e < edges.length; e++) {
        const edge = edges[e];
        const n1 = nodes[edge.source];
        const n2 = nodes[edge.target];
        if (!n1 || !n2) continue;

        const dx = n2.x - n1.x;
        const dy = n2.y - n1.y;
        const dist = Math.sqrt(dx * dx + dy * dy) || 1;
        const displacement = dist - edge.length;
        const force = displacement * springK;

        const fx = (dx / dist) * force;
        const fy = (dy / dist) * force;

        n1.vx += fx;
        n1.vy += fy;
        n2.vx -= fx;
        n2.vy -= fy;
      }

      // Centering Gravitational Pull & Pointer Interaction
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];

        // Soft center anchor
        const dcx = cx - n.x;
        const dcy = cy - n.y;
        n.vx += dcx * 0.0007;
        n.vy += dcy * 0.0007;

        // Pointer gravitational repulsion / agitation
        if (isPointerActive && pointerX > 0 && pointerY > 0) {
          const pdx = n.x - pointerX;
          const pdy = n.y - pointerY;
          const pDist = Math.sqrt(pdx * pdx + pdy * pdy);
          if (pDist < interactRadius && pDist > 1) {
            const pForce = ((interactRadius - pDist) / interactRadius) * 2.5;
            n.vx += (pdx / pDist) * pForce;
            n.vy += (pdy / pDist) * pForce;
          }
        }

        // Damping and position update
        n.vx *= 0.90;
        n.vy *= 0.90;
        n.x += n.vx * dt;
        n.y += n.vy * dt;

        // Bounds constraint
        const pad = 40;
        if (n.x < pad) n.x = pad;
        if (n.x > width - pad) n.x = width - pad;
        if (n.y < pad) n.y = pad;
        if (n.y > height - pad) n.y = height - pad;
      }

      // 2. Render Graph Edges (with subtle Bézier curvature & alpha)
      ctx.lineWidth = 1.0;
      for (let e = 0; e < edges.length; e++) {
        const edge = edges[e];
        const n1 = nodes[edge.source];
        const n2 = nodes[edge.target];
        if (!n1 || !n2) continue;

        const isHubEdge = n1.isHub && n2.isHub;
        const hue = isHubEdge ? 210 : 180 + (n1.cluster * 40) % 180;
        const alpha = isHubEdge ? 0.28 : 0.16;

        ctx.strokeStyle = hsla(hue, 80, 65, alpha);
        ctx.beginPath();
        ctx.moveTo(n1.x, n1.y);

        // Curved edge control point
        const midX = (n1.x + n2.x) * 0.5;
        const midY = (n1.y + n2.y) * 0.5;
        const perpX = -(n2.y - n1.y) * 0.12;
        const perpY = (n2.x - n1.x) * 0.12;

        ctx.quadraticCurveTo(midX + perpX, midY + perpY, n2.x, n2.y);
        ctx.stroke();
      }

      // 3. Render Propagating Data Packets along Edges
      ctx.save();
      ctx.globalCompositeOperation = 'screen';
      for (let p = 0; p < packets.length; p++) {
        const packet = packets[p];
        packet.progress += packet.speed * packetSpeedMult;
        if (packet.progress >= 1) {
          packet.progress = 0;
          packet.edgeIndex = Math.floor(Math.random() * edges.length);
        }

        const edge = edges[packet.edgeIndex];
        if (!edge) continue;
        const n1 = nodes[edge.source];
        const n2 = nodes[edge.target];
        if (!n1 || !n2) continue;

        // Quadratic Bézier sample
        const prog = packet.progress;
        const midX = (n1.x + n2.x) * 0.5 - (n2.y - n1.y) * 0.12;
        const midY = (n1.y + n2.y) * 0.5 + (n2.x - n1.x) * 0.12;

        const px = (1 - prog) * (1 - prog) * n1.x + 2 * (1 - prog) * prog * midX + prog * prog * n2.x;
        const py = (1 - prog) * (1 - prog) * n1.y + 2 * (1 - prog) * prog * midY + prog * prog * n2.y;

        ctx.fillStyle = hsla(packet.hue, 95, 80, 0.85);
        ctx.beginPath();
        ctx.arc(px, py, 2.0, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();

      // 4. Render Nodes & Typographic Semantic Labels (Dominikus style)
      ctx.font = '10px "Geist Mono", monospace';
      ctx.textAlign = 'left';
      ctx.textBaseline = 'middle';

      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        const nodeHue = 180 + (n.cluster * 45) % 180;

        if (n.isHub) {
          // Hub outer pulsing aura
          const pulse = Math.sin(t * 2 + n.id) * 3;
          ctx.beginPath();
          ctx.arc(n.x, n.y, n.radius + pulse + 4, 0, Math.PI * 2);
          ctx.strokeStyle = hsla(nodeHue, 90, 70, 0.25);
          ctx.lineWidth = 1;
          ctx.stroke();

          // Hub core
          ctx.beginPath();
          ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
          ctx.fillStyle = hsla(nodeHue, 95, 75, 0.95);
          ctx.fill();

          // Hub Label with high-contrast text badge
          ctx.fillStyle = '#f1f5f9';
          ctx.fillText(`● ${n.label}`, n.x + n.radius + 6, n.y);
        } else {
          // Satellite node
          ctx.beginPath();
          ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
          ctx.fillStyle = hsla(nodeHue, 75, 60, 0.8);
          ctx.fill();

          // Satellite subtle label
          ctx.fillStyle = 'rgba(148, 163, 184, 0.7)';
          ctx.fillText(n.label, n.x + n.radius + 4, n.y);
        }
      }
    },
  };
}
