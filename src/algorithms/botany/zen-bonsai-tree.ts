import type { ArtRenderer, ParameterState, RenderContext, TimeState } from '../../types/engine';
import { hsla } from '../common/color';

// 084 - Zen Japanese Bonsai Tree (Leonardo Da Vinci Branching, Moyogi Trunk & Matsu Needle Clouds)
export function createZenBonsaiTree(): ArtRenderer {
  // Pre-allocated sakura petal & zen light particles
  const PETAL_COUNT = 45;
  const petals: Array<{ x: number; y: number; vx: number; vy: number; rot: number; rotV: number; size: number; phase: number }> = [];

  function initPetals() {
    petals.length = 0;
    for (let i = 0; i < PETAL_COUNT; i++) {
      petals.push({
        x: Math.random(),
        y: Math.random(),
        vx: 0.0003 + Math.random() * 0.0006,
        vy: 0.0004 + Math.random() * 0.0008,
        rot: Math.random() * Math.PI * 2,
        rotV: (Math.random() - 0.5) * 0.03,
        size: 1.5 + Math.random() * 2.5,
        phase: Math.random() * Math.PI * 2,
      });
    }
  }

  // Pre-computed branch hierarchy definitions (Moyogi Asymmetric Style)
  interface FoliageAnchor {
    xRatio: number;
    yRatio: number;
    radiusX: number;
    radiusY: number;
    density: number;
    depth: number; // 0 = foreground, 1 = background
    swayPhase: number;
  }

  const foliagePads: FoliageAnchor[] = [
    // Low sweeping Sashi-eda (Left Main Wing)
    { xRatio: 0.28, yRatio: 0.56, radiusX: 52, radiusY: 28, density: 1.1, depth: 0.2, swayPhase: 0.0 },
    { xRatio: 0.22, yRatio: 0.52, radiusX: 42, radiusY: 22, density: 0.9, depth: 0.3, swayPhase: 0.4 },
    { xRatio: 0.34, yRatio: 0.48, radiusX: 38, radiusY: 20, density: 0.85, depth: 0.1, swayPhase: 0.7 },

    // Counter Balance Uke-eda (Right Primary Wing)
    { xRatio: 0.72, yRatio: 0.48, radiusX: 58, radiusY: 30, density: 1.15, depth: 0.15, swayPhase: 1.2 },
    { xRatio: 0.78, yRatio: 0.44, radiusX: 44, radiusY: 24, density: 0.95, depth: 0.25, swayPhase: 1.6 },
    { xRatio: 0.65, yRatio: 0.42, radiusX: 40, radiusY: 22, density: 0.85, depth: 0.35, swayPhase: 2.0 },

    // Mid-tier Fillers & Depth Layers
    { xRatio: 0.38, yRatio: 0.38, radiusX: 46, radiusY: 24, density: 1.0, depth: 0.7, swayPhase: 2.3 },
    { xRatio: 0.58, yRatio: 0.34, radiusX: 48, radiusY: 26, density: 1.05, depth: 0.6, swayPhase: 2.8 },

    // Sub-Apex Clusters
    { xRatio: 0.44, yRatio: 0.28, radiusX: 45, radiusY: 25, density: 1.1, depth: 0.4, swayPhase: 3.2 },
    { xRatio: 0.54, yRatio: 0.24, radiusX: 50, radiusY: 26, density: 1.15, depth: 0.2, swayPhase: 3.6 },

    // Crown Dome (Atama Apex)
    { xRatio: 0.48, yRatio: 0.18, radiusX: 56, radiusY: 28, density: 1.25, depth: 0.1, swayPhase: 4.1 },
    { xRatio: 0.43, yRatio: 0.16, radiusX: 36, radiusY: 20, density: 0.85, depth: 0.45, swayPhase: 4.5 },
    { xRatio: 0.53, yRatio: 0.15, radiusX: 38, radiusY: 20, density: 0.9, depth: 0.3, swayPhase: 4.8 },
  ];

  return {
    setup() {
      initPetals();
    },

    render(context: RenderContext, timeState: TimeState, params: ParameterState) {
      const { ctx, width, height } = context;
      const speed = Number(params.speed ?? 0.8);
      const windSway = Number(params.windSway ?? 1.0);
      const foliageDensity = Number(params.foliageDensity ?? 1.2);
      const trunkThickness = Number(params.trunkThickness ?? 1.0);
      const sunGlow = Number(params.sunGlow ?? 1.1);

      const t = timeState.time * speed;

      if (petals.length === 0) {
        initPetals();
      }

      // 1. Zen Sumi-e Studio Atmospheric Background
      const bgGrad = ctx.createRadialGradient(width * 0.5, height * 0.45, 0, width * 0.5, height * 0.5, Math.hypot(width, height) * 0.65);
      bgGrad.addColorStop(0, '#15131b');
      bgGrad.addColorStop(0.5, '#0d0c12');
      bgGrad.addColorStop(1.0, '#060508');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // 2. Rising Sun Halo (Enso Sunburst Aesthetic)
      ctx.save();
      const sunX = width * 0.52;
      const sunY = height * 0.38;
      const sunRadius = Math.min(width, height) * 0.28;

      const sunAura = ctx.createRadialGradient(sunX, sunY, sunRadius * 0.2, sunX, sunY, sunRadius * 1.5);
      sunAura.addColorStop(0, `rgba(215, 65, 35, ${0.35 * sunGlow})`);
      sunAura.addColorStop(0.4, `rgba(180, 45, 25, ${0.18 * sunGlow})`);
      sunAura.addColorStop(0.8, `rgba(120, 25, 20, ${0.06 * sunGlow})`);
      sunAura.addColorStop(1.0, 'rgba(0, 0, 0, 0)');

      ctx.fillStyle = sunAura;
      ctx.beginPath();
      ctx.arc(sunX, sunY, sunRadius * 1.5, 0, Math.PI * 2);
      ctx.fill();

      // Soft sun core
      const coreGrad = ctx.createRadialGradient(sunX, sunY, 0, sunX, sunY, sunRadius);
      coreGrad.addColorStop(0, `rgba(245, 110, 60, ${0.28 * sunGlow})`);
      coreGrad.addColorStop(0.85, `rgba(195, 45, 30, ${0.15 * sunGlow})`);
      coreGrad.addColorStop(1.0, 'rgba(150, 30, 20, 0)');
      ctx.fillStyle = coreGrad;
      ctx.beginPath();
      ctx.arc(sunX, sunY, sunRadius, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // 3. Ceramic Tokoname Bonsai Pot & Moss Mound Soil
      const potBaseY = height * 0.86;
      const potTopY = height * 0.80;
      const potWidth = width * 0.52;
      const potLeft = (width - potWidth) * 0.5;
      const potRight = potLeft + potWidth;

      // 3a. Deep shadow underneath pot
      ctx.save();
      const shadowGrad = ctx.createRadialGradient(width * 0.5, potBaseY + 12, 0, width * 0.5, potBaseY + 12, potWidth * 0.65);
      shadowGrad.addColorStop(0, 'rgba(0, 0, 0, 0.7)');
      shadowGrad.addColorStop(0.6, 'rgba(0, 0, 0, 0.35)');
      shadowGrad.addColorStop(1.0, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = shadowGrad;
      ctx.beginPath();
      ctx.ellipse(width * 0.5, potBaseY + 10, potWidth * 0.58, 14, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // 3b. Bonsai Ceramic Pot Body (Glazed Charcoal Stoneware)
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(potLeft + 15, potTopY);
      ctx.lineTo(potRight - 15, potTopY);
      ctx.quadraticCurveTo(potRight, potTopY, potRight - 8, potTopY + 14);
      ctx.lineTo(potRight - 22, potBaseY);
      ctx.quadraticCurveTo(potRight - 26, potBaseY + 6, potRight - 36, potBaseY + 6);
      ctx.lineTo(potLeft + 36, potBaseY + 6);
      ctx.quadraticCurveTo(potLeft + 26, potBaseY + 6, potLeft + 22, potBaseY);
      ctx.lineTo(potLeft + 8, potTopY + 14);
      ctx.quadraticCurveTo(potLeft, potTopY, potLeft + 15, potTopY);
      ctx.closePath();

      const potGrad = ctx.createLinearGradient(potLeft, potTopY, potRight, potBaseY);
      potGrad.addColorStop(0, '#242128');
      potGrad.addColorStop(0.35, '#3a3440');
      potGrad.addColorStop(0.7, '#28232c');
      potGrad.addColorStop(1.0, '#19171d');
      ctx.fillStyle = potGrad;
      ctx.fill();
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
      ctx.lineWidth = 1.2;
      ctx.stroke();

      // Pot Rim Lip
      ctx.beginPath();
      ctx.ellipse(width * 0.5, potTopY + 2, potWidth * 0.51, 8, 0, 0, Math.PI * 2);
      ctx.fillStyle = '#3f3847';
      ctx.fill();
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
      ctx.lineWidth = 1.0;
      ctx.stroke();

      // Pot Feet / Stools
      const footW = 16;
      const footH = 8;
      // Left foot
      ctx.fillStyle = '#1c1920';
      ctx.fillRect(potLeft + 32, potBaseY + 6, footW, footH);
      // Right foot
      ctx.fillRect(potRight - 32 - footW, potBaseY + 6, footW, footH);
      ctx.restore();

      // 3c. Moss Mound Soil (Kokadachi Velvety Moss Bed)
      ctx.save();
      ctx.beginPath();
      ctx.ellipse(width * 0.5, potTopY, potWidth * 0.46, 20, 0, Math.PI, 0);
      const mossGrad = ctx.createRadialGradient(width * 0.5, potTopY - 4, 10, width * 0.5, potTopY, potWidth * 0.48);
      mossGrad.addColorStop(0, '#4b7538');
      mossGrad.addColorStop(0.4, '#2f5223');
      mossGrad.addColorStop(0.8, '#1b3314');
      mossGrad.addColorStop(1.0, '#101f0c');
      ctx.fillStyle = mossGrad;
      ctx.fill();

      // Moss texture stipples
      for (let m = 0; m < 55; m++) {
        const u = (Math.random() - 0.5) * 2;
        const mx = width * 0.5 + u * (potWidth * 0.42) * Math.sqrt(1 - Math.pow(Math.random(), 2));
        const my = potTopY - Math.sin(Math.acos(Math.abs(u) * 0.95)) * (14 * Math.random()) + (Math.random() - 0.5) * 4;
        const mR = 1.2 + Math.random() * 2.4;
        ctx.fillStyle = Math.random() > 0.4 ? 'rgba(105, 175, 75, 0.6)' : 'rgba(50, 95, 35, 0.5)';
        ctx.beginPath();
        ctx.arc(mx, my, mR, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();

      // 4. Exposed Root Flare (Nebari)
      ctx.save();
      const rootBaseX = width * 0.5;
      const rootBaseY = potTopY - 4;
      const rootCount = 7;

      for (let r = 0; r < rootCount; r++) {
        const normR = (r / (rootCount - 1) - 0.5) * 2; // -1 to 1
        const rx = rootBaseX + normR * 65 + (Math.sin(r * 2.4) * 8);
        const ry = rootBaseY + 6 + Math.abs(normR) * 4;

        ctx.beginPath();
        ctx.moveTo(rootBaseX + normR * 16, rootBaseY - 24);
        ctx.quadraticCurveTo(
          rootBaseX + normR * 38 + (r % 2 === 0 ? 8 : -8),
          rootBaseY - 6,
          rx,
          ry
        );
        ctx.strokeStyle = '#2b1c14';
        ctx.lineWidth = (10 - Math.abs(normR) * 4) * trunkThickness;
        ctx.lineCap = 'round';
        ctx.stroke();

        // Highlight ridge
        ctx.beginPath();
        ctx.moveTo(rootBaseX + normR * 15, rootBaseY - 22);
        ctx.quadraticCurveTo(
          rootBaseX + normR * 36,
          rootBaseY - 6,
          rx - 2,
          ry
        );
        ctx.strokeStyle = '#5a3d2c';
        ctx.lineWidth = (3.5 - Math.abs(normR) * 1.2) * trunkThickness;
        ctx.stroke();
      }
      ctx.restore();

      // 5. Main Moyogi Trunk & Primary Branch Splines
      // We evaluate multi-segmented Bézier curves with Leonardo's tapering rule
      ctx.save();
      const swayOffset = Math.sin(t * 1.2) * 5 * windSway;

      // Segment Points: Base -> Mid-Lower -> Mid-Upper -> Apex
      const P0 = { x: width * 0.50, y: potTopY - 20 };
      const P1 = { x: width * 0.44 + Math.sin(t * 0.9) * 2 * windSway, y: height * 0.62 };
      const P2 = { x: width * 0.58 + Math.cos(t * 1.1) * 3 * windSway, y: height * 0.44 };
      const P3 = { x: width * 0.47 + swayOffset, y: height * 0.22 };

      // Helper to evaluate cubic Bézier point
      function getBezierPoint(p0: any, p1: any, p2: any, p3: any, u: number) {
        const u1 = 1 - u;
        return {
          x: u1 * u1 * u1 * p0.x + 3 * u1 * u1 * u * p1.x + 3 * u1 * u * u * p2.x + u * u * u * p3.x,
          y: u1 * u1 * u1 * p0.y + 3 * u1 * u1 * u * p1.y + 3 * u1 * u * u * p2.y + u * u * u * p3.y,
        };
      }

      // Draw tapered trunk segments
      const TRUNK_STEPS = 50;
      let prevPt = P0;
      for (let s = 1; s <= TRUNK_STEPS; s++) {
        const u = s / TRUNK_STEPS;
        const curPt = getBezierPoint(P0, P1, P2, P3, u);

        // Leonardo's vascular tapering
        const taper = Math.pow(1 - u * 0.78, 1.4);
        const w = (28 * taper + 3) * trunkThickness;

        ctx.beginPath();
        ctx.moveTo(prevPt.x, prevPt.y);
        ctx.lineTo(curPt.x, curPt.y);
        ctx.strokeStyle = '#22150f';
        ctx.lineWidth = w;
        ctx.lineCap = 'round';
        ctx.stroke();

        // Bark highlights & Wood Grain Ribs
        ctx.beginPath();
        ctx.moveTo(prevPt.x - w * 0.18, prevPt.y);
        ctx.lineTo(curPt.x - w * 0.18, curPt.y);
        ctx.strokeStyle = '#4e3324';
        ctx.lineWidth = w * 0.35;
        ctx.stroke();

        // Sunlit edge ridge
        ctx.beginPath();
        ctx.moveTo(prevPt.x + w * 0.22, prevPt.y);
        ctx.lineTo(curPt.x + w * 0.22, curPt.y);
        ctx.strokeStyle = '#755038';
        ctx.lineWidth = w * 0.18;
        ctx.stroke();

        prevPt = curPt;
      }

      // 5b. Secondary & Tertiary Branches Reaching to Foliage Pads
      interface BranchPath {
        fromU: number; // point along trunk (0 to 1)
        toPadIdx: number;
        curvature: number;
      }

      const branchMappings: BranchPath[] = [
        { fromU: 0.30, toPadIdx: 0, curvature: -35 }, // Low Left Main Sashi-eda
        { fromU: 0.35, toPadIdx: 1, curvature: -42 },
        { fromU: 0.45, toPadIdx: 2, curvature: -25 },
        { fromU: 0.42, toPadIdx: 3, curvature: 45 },  // Right Uke-eda
        { fromU: 0.52, toPadIdx: 4, curvature: 50 },
        { fromU: 0.58, toPadIdx: 5, curvature: 30 },
        { fromU: 0.65, toPadIdx: 6, curvature: -28 }, // Mid-Fillers
        { fromU: 0.72, toPadIdx: 7, curvature: 32 },
        { fromU: 0.82, toPadIdx: 8, curvature: -18 }, // Sub-Apex
        { fromU: 0.88, toPadIdx: 9, curvature: 22 },
        { fromU: 0.96, toPadIdx: 10, curvature: 5 },  // Crown
      ];

      for (let b = 0; b < branchMappings.length; b++) {
        const bp = branchMappings[b];
        const pad = foliagePads[bp.toPadIdx];
        const startPt = getBezierPoint(P0, P1, P2, P3, bp.fromU);

        const padSwayX = Math.sin(t * 1.5 + pad.swayPhase) * 6 * windSway;
        const padSwayY = Math.cos(t * 1.2 + pad.swayPhase) * 3 * windSway;
        const endX = width * pad.xRatio + padSwayX;
        const endY = height * pad.yRatio + padSwayY;

        const ctrlX = (startPt.x + endX) * 0.5 + bp.curvature;
        const ctrlY = (startPt.y + endY) * 0.5 - 15;

        // Draw Branch Line
        ctx.beginPath();
        ctx.moveTo(startPt.x, startPt.y);
        ctx.quadraticCurveTo(ctrlX, ctrlY, endX, endY);
        ctx.strokeStyle = pad.depth > 0.5 ? '#1a100c' : '#2b1b13';
        ctx.lineWidth = (6.5 * (1 - bp.fromU * 0.5)) * trunkThickness;
        ctx.lineCap = 'round';
        ctx.stroke();

        // Branch Sunlit Highlight
        ctx.beginPath();
        ctx.moveTo(startPt.x, startPt.y - 1);
        ctx.quadraticCurveTo(ctrlX, ctrlY - 1, endX, endY);
        ctx.strokeStyle = pad.depth > 0.5 ? '#2c1e17' : '#573a2a';
        ctx.lineWidth = 2.0 * trunkThickness;
        ctx.stroke();
      }
      ctx.restore();

      // 6. Pine Needle Foliage Clouds (Matsu / Tamamono Pad Clusters)
      // Sorted by depth (background first, foreground last)
      const sortedPads = [...foliagePads].sort((a, b) => b.depth - a.depth);

      for (let p = 0; p < sortedPads.length; p++) {
        const pad = sortedPads[p];
        const padSwayX = Math.sin(t * 1.5 + pad.swayPhase) * 6 * windSway;
        const padSwayY = Math.cos(t * 1.2 + pad.swayPhase) * 3 * windSway;
        const cx = width * pad.xRatio + padSwayX;
        const cy = height * pad.yRatio + padSwayY;

        const rx = pad.radiusX * (0.85 + foliageDensity * 0.15);
        const ry = pad.radiusY * (0.85 + foliageDensity * 0.15);

        ctx.save();

        // 6a. Deep foliage shadow cushion
        ctx.beginPath();
        ctx.ellipse(cx, cy + 4, rx * 1.05, ry * 0.95, 0, 0, Math.PI * 2);
        ctx.fillStyle = pad.depth > 0.5 ? 'rgba(7, 24, 14, 0.85)' : 'rgba(10, 36, 20, 0.92)';
        ctx.fill();

        // 6b. Radial Pine Needles Fan Cluster
        const NEEDLE_COUNT = Math.floor(75 * pad.density * foliageDensity);
        for (let n = 0; n < NEEDLE_COUNT; n++) {
          const normN = n / NEEDLE_COUNT;
          // Radiate across an upward fan arc (-30° to 210°)
          const angle = -Math.PI * 0.15 + normN * (Math.PI * 1.3) + (Math.sin(n * 4.3) * 0.15);
          const rDist = (0.25 + 0.75 * Math.sqrt(Math.random())) * (1 + 0.12 * Math.sin(n * 7.1));
          
          const nx0 = cx + Math.cos(angle) * (rx * rDist * 0.5);
          const ny0 = cy + Math.sin(angle) * (ry * rDist * 0.5);

          const needleLen = (9 + Math.sin(n * 3.7) * 4.5) * (1 - pad.depth * 0.3);
          const nx1 = nx0 + Math.cos(angle) * needleLen;
          const ny1 = ny0 + Math.sin(angle) * needleLen;

          // Multi-tiered Pine Emerald & Spring Jade Colors
          let needleColor: string;
          if (pad.depth > 0.5) {
            needleColor = n % 3 === 0 ? '#113a21' : n % 3 === 1 ? '#184f2d' : '#0c2e19';
          } else {
            if (ny1 < cy - 2) {
              // Sunlit top needles
              needleColor = n % 4 === 0 ? '#78c46e' : n % 4 === 1 ? '#4ea355' : '#2d7a42';
            } else {
              // Mid & lower shaded needles
              needleColor = n % 3 === 0 ? '#236136' : n % 3 === 1 ? '#1a4a29' : '#10331c';
            }
          }

          ctx.beginPath();
          ctx.moveTo(nx0, ny0);
          ctx.lineTo(nx1, ny1);
          ctx.strokeStyle = needleColor;
          ctx.lineWidth = 1.1;
          ctx.lineCap = 'round';
          ctx.stroke();
        }

        // 6c. Soft Mossy Rim Highlight on Top of Foliage Cloud
        if (pad.depth < 0.4) {
          ctx.beginPath();
          ctx.ellipse(cx, cy - ry * 0.45, rx * 0.65, ry * 0.35, 0, Math.PI, Math.PI * 2);
          ctx.strokeStyle = 'rgba(145, 220, 130, 0.35)';
          ctx.lineWidth = 1.4;
          ctx.stroke();
        }

        ctx.restore();
      }

      // 7. Floating Sakura Blossom Petals & Zen Light Dust
      ctx.save();
      for (let i = 0; i < petals.length; i++) {
        const pt = petals[i];
        pt.x = (pt.x + pt.vx + 1) % 1;
        pt.y = (pt.y + pt.vy + 1) % 1;
        pt.rot += pt.rotV;

        const px = pt.x * width;
        const py = pt.y * height;

        const sway = Math.sin(t * 2.0 + pt.phase) * 6;

        ctx.save();
        ctx.translate(px + sway, py);
        ctx.rotate(pt.rot);

        // Render soft pink/gold translucent petal
        ctx.beginPath();
        ctx.ellipse(0, 0, pt.size * 1.8, pt.size * 0.9, 0, 0, Math.PI * 2);
        if (i % 3 === 0) {
          ctx.fillStyle = 'rgba(255, 185, 200, 0.7)'; // Soft Cherry Blossom
        } else if (i % 3 === 1) {
          ctx.fillStyle = 'rgba(255, 215, 140, 0.65)'; // Golden Sun Mote
        } else {
          ctx.fillStyle = 'rgba(255, 240, 245, 0.8)'; // Pure White Blossom
        }
        ctx.fill();
        ctx.restore();
      }
      ctx.restore();
    },
  };
}
