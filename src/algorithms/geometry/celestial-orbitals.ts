import type { ArtRenderer, ParameterState, RenderContext, TimeState } from '../../types/engine';

interface WormSegment {
  x: number;
  y: number;
  z: number;
  screenX: number;
  screenY: number;
  radius: number;
}

interface Worm {
  baseAngle: number;
  phaseSpeed: number;
  coilRadius: number;
  coilSpeed: number;
  tiltX: number;
  tiltY: number;
  segments: WormSegment[];
}

interface Satellite {
  orbitRadius: number;
  speed: number;
  angle: number;
  size: number;
  hasTether: boolean;
}

interface WebNode {
  baseX: number;
  baseY: number;
  phase: number;
  speed: number;
  amp: number;
  currX: number;
  currY: number;
}

/**
 * Dominikus Baur (@dominikus) Homage: "Orbitals"
 * Generative monochromatic fine-art orbital system featuring:
 * - Entangled 3D tubular toroidal filament core with beaded lattices
 * - Architectural astrolabe dial rings with radial degree tick marks
 * - Sweeping parametric ribbon shells with isoline cross-hatching
 * - Floating harmonic satellite orbs with coordinate guideline tethers
 * - Distance-triangulated geometric constellation network
 * - High-contrast slicing black and luminous white orbital arcs
 */
export function createCelestialOrbitals(): ArtRenderer {
  const MAX_WORMS = 72;
  const SEGMENTS_PER_WORM = 28;
  const SATELLITE_COUNT = 12;
  const WEB_NODE_COUNT = 64;

  let worms: Worm[] = [];
  let satellites: Satellite[] = [];
  let webNodes: WebNode[] = [];

  let mouseX = 0;
  let mouseY = 0;
  let targetTiltX = 0;
  let targetTiltY = 0;
  let currTiltX = 0;
  let currTiltY = 0;

  // Flattened bead render list for depth-sorted rendering
  interface RenderBead {
    x: number;
    y: number;
    z: number;
    r: number;
    shade: number;
    isCore: boolean;
  }
  const beadPool: RenderBead[] = [];
  for (let i = 0; i < MAX_WORMS * SEGMENTS_PER_WORM; i++) {
    beadPool.push({ x: 0, y: 0, z: 0, r: 3, shade: 0.5, isCore: true });
  }

  function initStructures() {
    // 1. Initialize Filament Worms
    worms = [];
    for (let i = 0; i < MAX_WORMS; i++) {
      const segs: WormSegment[] = [];
      for (let s = 0; s < SEGMENTS_PER_WORM; s++) {
        segs.push({ x: 0, y: 0, z: 0, screenX: 0, screenY: 0, radius: 3.2 });
      }
      worms.push({
        baseAngle: (i / MAX_WORMS) * Math.PI * 2,
        phaseSpeed: 0.22 + (i % 6) * 0.07,
        coilRadius: 36 + (i % 5) * 16,
        coilSpeed: 1.1 + (i % 4) * 0.35,
        tiltX: ((i % 7) - 3) * 0.18,
        tiltY: ((i % 9) - 4) * 0.16,
        segments: segs,
      });
    }

    // 2. Initialize Floating Black Satellite Orbs
    satellites = [];
    const satSizes = [11, 8.5, 7, 13, 6.5, 9, 5.5, 10, 8, 12, 7.5, 9.5];
    const satRadii = [165, 192, 142, 215, 155, 230, 148, 180, 240, 172, 202, 222];
    for (let i = 0; i < SATELLITE_COUNT; i++) {
      satellites.push({
        orbitRadius: satRadii[i % satRadii.length],
        speed: (0.14 + (i % 4) * 0.065) * (i % 2 === 0 ? 1 : -1),
        angle: (i / SATELLITE_COUNT) * Math.PI * 2 + i * 0.28,
        size: satSizes[i % satSizes.length],
        hasTether: i % 2 === 0 || i % 3 === 0,
      });
    }

    // 3. Initialize Outer Geometric Web Nodes
    webNodes = [];
    for (let i = 0; i < WEB_NODE_COUNT; i++) {
      const a = (i / WEB_NODE_COUNT) * Math.PI * 2;
      const r = 115 + (i % 6) * 18 + Math.sin(i * 3.7) * 22;
      webNodes.push({
        baseX: Math.cos(a) * r,
        baseY: Math.sin(a) * r,
        phase: i * 0.85,
        speed: 0.45 + (i % 3) * 0.28,
        amp: 7 + (i % 4) * 4.5,
        currX: 0,
        currY: 0,
      });
    }
  }

  return {
    setup(_context: RenderContext, _params: ParameterState) {
      initStructures();
    },

    onPointerMove(x: number, y: number) {
      mouseX = x;
      mouseY = y;
    },

    render(context: RenderContext, timeState: TimeState, params: ParameterState) {
      const { ctx, width, height } = context;
      const speedMult = Number(params.speed ?? 1.0);
      const activeWormCount = Math.min(MAX_WORMS, Math.max(12, Math.round(Number(params.wormCount ?? 54))));
      const orbitalScale = Number(params.orbitalRadius ?? 1.0);
      const triDensity = Number(params.triangulationDensity ?? 1.0);
      const ribbonSpan = Number(params.ribbonSpread ?? 1.0);
      const isDark = Boolean(params.darkMode);

      const t = timeState.time * speedMult;
      const cx = width * 0.5;
      const cy = height * 0.5;
      const baseScale = (Math.min(width, height) / 480) * orbitalScale;

      // Smooth pointer parallax
      if (mouseX !== 0 || mouseY !== 0) {
        targetTiltX = ((mouseX - cx) / width) * 0.65;
        targetTiltY = ((mouseY - cy) / height) * 0.65;
      }
      currTiltX += (targetTiltX - currTiltX) * 0.06;
      currTiltY += (targetTiltY - currTiltY) * 0.06;

      // -------------------------------------------------------------
      // Background: Monochromatic Archival Paper or Obsidian Ink
      // -------------------------------------------------------------
      if (isDark) {
        ctx.fillStyle = '#0a0b10';
        ctx.fillRect(0, 0, width, height);

        // Subtle dark vignette
        const grad = ctx.createRadialGradient(cx, cy, 50 * baseScale, cx, cy, 260 * baseScale);
        grad.addColorStop(0, '#13151f');
        grad.addColorStop(1, '#08090d');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, width, height);
      } else {
        ctx.fillStyle = '#f3f3f5';
        ctx.fillRect(0, 0, width, height);

        // Warm subtle paper vignette
        const grad = ctx.createRadialGradient(cx, cy, 80 * baseScale, cx, cy, 270 * baseScale);
        grad.addColorStop(0, '#fafafc');
        grad.addColorStop(0.7, '#f1f1f4');
        grad.addColorStop(1, '#e5e5ea');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, width, height);
      }

      ctx.save();
      ctx.translate(cx, cy);
      ctx.scale(baseScale, baseScale);

      // Global subtle rotation and 3D parallax tilt
      const globalRot = t * 0.035 + currTiltX * 0.4;
      ctx.rotate(globalRot);

      // Rotation matrix for 3D projections
      const rotYAngle = t * 0.12 + currTiltX * 0.8;
      const rotXAngle = 0.42 + Math.sin(t * 0.08) * 0.12 + currTiltY * 0.8;
      const cosY = Math.cos(rotYAngle), sinY = Math.sin(rotYAngle);
      const cosX = Math.cos(rotXAngle), sinX = Math.sin(rotXAngle);

      // -------------------------------------------------------------
      // LAYER 1: Astrolabe Concentric Dial Rings & Radial Tick Marks
      // -------------------------------------------------------------
      ctx.lineWidth = 0.8;
      ctx.strokeStyle = isDark ? 'rgba(255, 255, 255, 0.18)' : 'rgba(25, 27, 34, 0.22)';
      ctx.beginPath();
      ctx.arc(0, 0, 142, 0, Math.PI * 2);
      ctx.arc(0, 0, 136, 0, Math.PI * 2);
      ctx.arc(0, 0, 105, 0, Math.PI * 2);
      ctx.arc(0, 0, 68, 0, Math.PI * 2);
      ctx.stroke();

      // Dashed Kepler orbit guidelines
      ctx.save();
      ctx.setLineDash([3, 4]);
      ctx.strokeStyle = isDark ? 'rgba(255, 255, 255, 0.12)' : 'rgba(25, 27, 34, 0.14)';
      ctx.beginPath();
      ctx.arc(0, 0, 185, 0, Math.PI * 2);
      ctx.arc(0, 0, 220, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();

      // Precision Astrolabe 360-degree ticks
      ctx.lineWidth = 1.0;
      ctx.strokeStyle = isDark ? 'rgba(255, 255, 255, 0.45)' : 'rgba(20, 22, 28, 0.55)';
      ctx.beginPath();
      for (let deg = 0; deg < 360; deg += 3) {
        const radA = (deg * Math.PI) / 180;
        const isMajor = deg % 30 === 0;
        const isMedium = deg % 15 === 0;
        const tickLen = isMajor ? 8.5 : isMedium ? 5.5 : 3.0;
        const r1 = 136;
        const r2 = r1 + tickLen;
        const cosA = Math.cos(radA);
        const sinA = Math.sin(radA);
        ctx.moveTo(cosA * r1, sinA * r1);
        ctx.lineTo(cosA * r2, sinA * r2);
      }
      ctx.stroke();

      // -------------------------------------------------------------
      // LAYER 2: Proximity-Triangulated Constellation Web
      // -------------------------------------------------------------
      for (let i = 0; i < webNodes.length; i++) {
        const wn = webNodes[i];
        const offset = Math.sin(t * wn.speed + wn.phase) * wn.amp;
        wn.currX = wn.baseX + (wn.baseX / 120) * offset;
        wn.currY = wn.baseY + (wn.baseY / 120) * offset;
      }

      const connectionDistSq = 3800 * triDensity;
      ctx.lineWidth = 0.6;
      ctx.strokeStyle = isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(35, 38, 48, 0.14)';
      ctx.beginPath();
      for (let i = 0; i < webNodes.length; i++) {
        const p1 = webNodes[i];
        for (let j = i + 1; j < webNodes.length; j++) {
          const p2 = webNodes[j];
          const dx = p2.currX - p1.currX;
          const dy = p2.currY - p1.currY;
          const dSq = dx * dx + dy * dy;
          if (dSq < connectionDistSq) {
            ctx.moveTo(p1.currX, p1.currY);
            ctx.lineTo(p2.currX, p2.currY);
          }
        }
      }
      ctx.stroke();

      // Vertex Open Ringlets
      ctx.fillStyle = isDark ? '#0e111a' : '#f8f8fa';
      ctx.strokeStyle = isDark ? 'rgba(255, 255, 255, 0.45)' : 'rgba(50, 55, 68, 0.45)';
      ctx.lineWidth = 0.8;
      for (let i = 0; i < webNodes.length; i += 2) {
        const wn = webNodes[i];
        ctx.beginPath();
        ctx.arc(wn.currX, wn.currY, 2.4, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
      }

      // -------------------------------------------------------------
      // LAYER 3: Eccentric Harmonic Satellite Orbs & Guide Rays
      // -------------------------------------------------------------
      for (let i = 0; i < satellites.length; i++) {
        const sat = satellites[i];
        const satAngle = sat.angle + t * sat.speed;
        const sx = Math.cos(satAngle) * sat.orbitRadius;
        const sy = Math.sin(satAngle) * sat.orbitRadius * 0.92;

        if (sat.hasTether) {
          ctx.strokeStyle = isDark ? 'rgba(255, 255, 255, 0.16)' : 'rgba(35, 38, 48, 0.20)';
          ctx.lineWidth = 0.75;
          ctx.beginPath();
          ctx.moveTo(0, 0);
          ctx.lineTo(sx, sy);
          ctx.stroke();
        }

        // Solid Black/White Planetary Orb
        ctx.fillStyle = isDark ? '#f4f5f8' : '#121318';
        ctx.beginPath();
        ctx.arc(sx, sy, sat.size * 0.5, 0, Math.PI * 2);
        ctx.fill();

        // Delicate inner core accent
        ctx.fillStyle = isDark ? '#121318' : '#ffffff';
        ctx.beginPath();
        ctx.arc(sx - sat.size * 0.12, sy - sat.size * 0.12, sat.size * 0.15, 0, Math.PI * 2);
        ctx.fill();
      }

      // -------------------------------------------------------------
      // LAYER 4: Sweeping Parametric Ribbon Shells (Architectural Wings)
      // -------------------------------------------------------------
      const ribbonConfigs = [
        { startA: -2.9, endA: -0.7, rIn: 68, rOut: 168 * ribbonSpan, fIn: 12, fOut: 24, tone: isDark ? 65 : 185 },
        { startA: -0.95, endA: 1.05, rIn: 62, rOut: 154 * ribbonSpan, fIn: 10, fOut: 20, tone: isDark ? 75 : 195 },
        { startA: 1.15, endA: 2.25, rIn: 55, rOut: 172 * ribbonSpan, fIn: 8, fOut: 18, tone: isDark ? 55 : 175 },
      ];

      for (let rIdx = 0; rIdx < ribbonConfigs.length; rIdx++) {
        const rc = ribbonConfigs[rIdx];
        const steps = 42;
        const stepA = (rc.endA - rc.startA) / steps;
        const innerPts: Array<{ x: number; y: number }> = [];
        const outerPts: Array<{ x: number; y: number }> = [];

        for (let s = 0; s <= steps; s++) {
          const a = rc.startA + s * stepA;
          const morph = Math.sin(a * 2.5 + t * 0.35 + rIdx * 1.8);
          const rI = rc.rIn + morph * rc.fIn;
          const rO = rc.rOut + Math.cos(a * 2.0 - t * 0.28) * rc.fOut;
          innerPts.push({ x: Math.cos(a) * rI, y: Math.sin(a) * rI });
          outerPts.push({ x: Math.cos(a) * rO, y: Math.sin(a) * rO });
        }

        // Shaded ribbon polygon
        ctx.beginPath();
        ctx.moveTo(innerPts[0].x, innerPts[0].y);
        for (let s = 1; s <= steps; s++) ctx.lineTo(innerPts[s].x, innerPts[s].y);
        for (let s = steps; s >= 0; s--) ctx.lineTo(outerPts[s].x, outerPts[s].y);
        ctx.closePath();

        ctx.fillStyle = isDark
          ? `rgba(${rc.tone}, ${rc.tone + 15}, ${rc.tone + 30}, 0.22)`
          : `rgba(${rc.tone}, ${rc.tone + 5}, ${rc.tone + 10}, 0.32)`;
        ctx.fill();

        // Architectural transverse isolines
        ctx.lineWidth = 0.55;
        ctx.strokeStyle = isDark ? 'rgba(255, 255, 255, 0.25)' : 'rgba(25, 28, 36, 0.28)';
        ctx.beginPath();
        for (let s = 0; s <= steps; s += 2) {
          ctx.moveTo(innerPts[s].x, innerPts[s].y);
          ctx.lineTo(outerPts[s].x, outerPts[s].y);
        }
        ctx.stroke();

        // Boundary perimeter curves
        ctx.lineWidth = 1.1;
        ctx.strokeStyle = isDark ? 'rgba(255, 255, 255, 0.65)' : 'rgba(18, 20, 26, 0.75)';
        ctx.beginPath();
        ctx.moveTo(innerPts[0].x, innerPts[0].y);
        for (let s = 1; s <= steps; s++) ctx.lineTo(innerPts[s].x, innerPts[s].y);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(outerPts[0].x, outerPts[0].y);
        for (let s = 1; s <= steps; s++) ctx.lineTo(outerPts[s].x, outerPts[s].y);
        ctx.stroke();

        // Fine boundary bead nodes
        ctx.fillStyle = isDark ? '#ffffff' : '#14161d';
        for (let s = 0; s <= steps; s += 4) {
          ctx.beginPath();
          ctx.arc(outerPts[s].x, outerPts[s].y, 1.8, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // -------------------------------------------------------------
      // LAYER 5: Entangled 3D Toroidal Filament Core Cluster
      // -------------------------------------------------------------
      let beadCount = 0;
      const R_major = 58; // Torus major radius
      const r_minor = 32; // Torus minor radius

      for (let w = 0; w < activeWormCount; w++) {
        const worm = worms[w];
        const wormPhase = t * worm.phaseSpeed + worm.baseAngle;

        for (let s = 0; s < SEGMENTS_PER_WORM; s++) {
          const u = (s / SEGMENTS_PER_WORM) * Math.PI * 2 + wormPhase;
          const v = u * worm.coilSpeed + worm.baseAngle * 3.0;

          // 3D Toroidal parametric coordinates
          const tx = (R_major + r_minor * Math.cos(v)) * Math.cos(u);
          const ty = (R_major + r_minor * Math.cos(v)) * Math.sin(u);
          const tz = r_minor * Math.sin(v) + Math.sin(u * 3.0 + t) * 14.0;

          // Apply 3D Rotation matrices (RotY then RotX)
          const x1 = tx * cosY + tz * sinY;
          const z1 = -tx * sinY + tz * cosY;
          const y2 = ty * cosX - z1 * sinX;
          const z2 = ty * sinX + z1 * cosX;

          // Projection scale based on depth
          const projDist = 320;
          const pers = projDist / (projDist + z2);
          const px = x1 * pers;
          const py = y2 * pers;

          if (beadCount < beadPool.length) {
            const bead = beadPool[beadCount++];
            bead.x = px;
            bead.y = py;
            bead.z = z2;
            bead.r = Math.max(1.2, 3.4 * pers);
            bead.shade = (z2 + 70) / 140; // Normalized 0..1 depth
            bead.isCore = s % 2 === 0;
          }
        }
      }

      // Depth sorting back-to-front (lowest z rendered first)
      const activeBeads = beadPool.slice(0, beadCount);
      activeBeads.sort((a, b) => a.z - b.z);

      // Render beaded filaments with depth shading & drop occlusion
      for (let i = 0; i < activeBeads.length; i++) {
        const b = activeBeads[i];
        const depthFactor = Math.max(0.1, Math.min(1.0, b.shade));

        if (isDark) {
          // Dark mode: luminous pearl beads
          const luma = Math.round(130 + depthFactor * 125);
          ctx.fillStyle = `rgb(${luma}, ${luma + 5}, ${luma + 15})`;
          ctx.beginPath();
          ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
          ctx.fill();

          if (b.r > 2.2) {
            // Core highlight
            ctx.fillStyle = '#ffffff';
            ctx.beginPath();
            ctx.arc(b.x - b.r * 0.25, b.y - b.r * 0.25, b.r * 0.35, 0, Math.PI * 2);
            ctx.fill();
          }
        } else {
          // Archival Paper mode: dense dark ink beads with white enamel highlights
          const ink = Math.round(18 + (1.0 - depthFactor) * 55);
          ctx.fillStyle = `rgb(${ink}, ${ink + 2}, ${ink + 6})`;
          ctx.beginPath();
          ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
          ctx.fill();

          if (b.r > 2.0 && b.isCore) {
            // Crisp white highlight
            ctx.fillStyle = '#ffffff';
            ctx.beginPath();
            ctx.arc(b.x - b.r * 0.28, b.y - b.r * 0.28, b.r * 0.35, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }

      // -------------------------------------------------------------
      // LAYER 6: High-Contrast Slicing Orbital Arcs
      // -------------------------------------------------------------
      // Slicing Bold Black Arc
      ctx.lineWidth = 3.6;
      ctx.strokeStyle = isDark ? '#ffffff' : '#101116';
      ctx.beginPath();
      ctx.arc(0, 0, 105, -2.4, 0.55);
      ctx.stroke();

      // Slicing Pure White Razor Arc
      ctx.lineWidth = 2.4;
      ctx.strokeStyle = isDark ? '#4f9fff' : '#ffffff';
      ctx.beginPath();
      ctx.arc(0, 0, 108, 0.75, 2.9);
      ctx.stroke();

      // Outer Thick Segment Arc
      ctx.lineWidth = 4.8;
      ctx.strokeStyle = isDark ? 'rgba(255, 255, 255, 0.85)' : '#181920';
      ctx.beginPath();
      ctx.arc(0, 0, 142, 1.4, 2.5);
      ctx.stroke();

      ctx.restore();
    },
  };
}
