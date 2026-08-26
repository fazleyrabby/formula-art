import type { ArtRenderer, ParameterState, RenderContext, TimeState } from '../../types/engine';

// 084 - Masterpiece Zen Bonsai Tree (Gnarled Moyogi Trunk, Da Vinci Branching & Dense Matsu Foliage Clouds)
export function createZenBonsaiTree(): ArtRenderer {
  // Pre-allocated sakura petals
  const PETAL_COUNT = 50;
  const petals: Array<{ x: number; y: number; vx: number; vy: number; rot: number; rotV: number; size: number; phase: number }> = [];

  function initPetals() {
    petals.length = 0;
    for (let i = 0; i < PETAL_COUNT; i++) {
      petals.push({
        x: Math.random(),
        y: Math.random(),
        vx: 0.0002 + Math.random() * 0.0005,
        vy: 0.0004 + Math.random() * 0.0008,
        rot: Math.random() * Math.PI * 2,
        rotV: (Math.random() - 0.5) * 0.025,
        size: 1.5 + Math.random() * 2.5,
        phase: Math.random() * Math.PI * 2,
      });
    }
  }

  // Pre-computed organic bonsai structure tree
  // Structure: Trunk nodes + Major Limbs + Sub-branches + Foliage Cloud Centers
  interface Point2D {
    x: number;
    y: number;
  }

  interface BranchNode {
    start: Point2D;
    ctrl1: Point2D;
    ctrl2: Point2D;
    end: Point2D;
    thicknessStart: number;
    thicknessEnd: number;
    depth: number; // 0 = fg, 1 = bg
    phase: number;
  }

  interface FoliageCloud {
    center: Point2D;
    radiusX: number;
    radiusY: number;
    depth: number;
    density: number;
    phase: number;
    tufts: Array<{ dx: number; dy: number; scale: number; angle: number }>;
  }

  // Generate deterministic realistic organic bonsai skeleton
  let branchNodes: BranchNode[] = [];
  let foliageClouds: FoliageCloud[] = [];

  function buildBonsaiModel() {
    branchNodes = [];
    foliageClouds = [];

    // Base coordinate system: relative 0..1 coordinates (rendered to canvas width/height)
    // 1. Trunk (Gnarled S-curve with thick heavy base)
    // Segment 1: Base to Lower Knee
    branchNodes.push({
      start: { x: 0.50, y: 0.81 },
      ctrl1: { x: 0.49, y: 0.74 },
      ctrl2: { x: 0.44, y: 0.68 },
      end: { x: 0.43, y: 0.61 },
      thicknessStart: 38,
      thicknessEnd: 28,
      depth: 0.1,
      phase: 0.0,
    });

    // Segment 2: Lower Knee to Mid-Burl
    branchNodes.push({
      start: { x: 0.43, y: 0.61 },
      ctrl1: { x: 0.42, y: 0.54 },
      ctrl2: { x: 0.48, y: 0.48 },
      end: { x: 0.51, y: 0.43 },
      thicknessStart: 28,
      thicknessEnd: 20,
      depth: 0.1,
      phase: 0.4,
    });

    // Segment 3: Mid-Burl to Upper Apex Neck
    branchNodes.push({
      start: { x: 0.51, y: 0.43 },
      ctrl1: { x: 0.54, y: 0.37 },
      ctrl2: { x: 0.50, y: 0.31 },
      end: { x: 0.47, y: 0.25 },
      thicknessStart: 20,
      thicknessEnd: 12,
      depth: 0.1,
      phase: 0.8,
    });

    // Segment 4: Apex Crown Top
    branchNodes.push({
      start: { x: 0.47, y: 0.25 },
      ctrl1: { x: 0.45, y: 0.20 },
      ctrl2: { x: 0.49, y: 0.17 },
      end: { x: 0.50, y: 0.14 },
      thicknessStart: 12,
      thicknessEnd: 5,
      depth: 0.0,
      phase: 1.2,
    });

    // 2. PRIMARY & SECONDARY BRANCHES (Asymmetric Moyogi Layout)
    // --- Branch 1: Main Left Sweeping Cascade (Sashi-eda - Massive & Dramatic) ---
    branchNodes.push({
      start: { x: 0.43, y: 0.60 },
      ctrl1: { x: 0.36, y: 0.62 },
      ctrl2: { x: 0.28, y: 0.65 },
      end: { x: 0.24, y: 0.63 },
      thicknessStart: 18,
      thicknessEnd: 8,
      depth: 0.15,
      phase: 0.5,
    });
    // Sub-branches off Sashi-eda
    branchNodes.push({
      start: { x: 0.33, y: 0.63 },
      ctrl1: { x: 0.28, y: 0.58 },
      ctrl2: { x: 0.22, y: 0.56 },
      end: { x: 0.18, y: 0.55 },
      thicknessStart: 9,
      thicknessEnd: 4,
      depth: 0.2,
      phase: 0.8,
    });
    branchNodes.push({
      start: { x: 0.26, y: 0.64 },
      ctrl1: { x: 0.22, y: 0.68 },
      ctrl2: { x: 0.17, y: 0.69 },
      end: { x: 0.14, y: 0.68 },
      thicknessStart: 7,
      thicknessEnd: 3,
      depth: 0.1,
      phase: 1.1,
    });

    // --- Branch 2: Right Counter Balance (Uke-eda) ---
    branchNodes.push({
      start: { x: 0.50, y: 0.48 },
      ctrl1: { x: 0.58, y: 0.49 },
      ctrl2: { x: 0.66, y: 0.53 },
      end: { x: 0.72, y: 0.51 },
      thicknessStart: 16,
      thicknessEnd: 7,
      depth: 0.2,
      phase: 1.3,
    });
    branchNodes.push({
      start: { x: 0.62, y: 0.50 },
      ctrl1: { x: 0.68, y: 0.45 },
      ctrl2: { x: 0.74, y: 0.43 },
      end: { x: 0.80, y: 0.42 },
      thicknessStart: 8,
      thicknessEnd: 4,
      depth: 0.25,
      phase: 1.6,
    });
    branchNodes.push({
      start: { x: 0.69, y: 0.52 },
      ctrl1: { x: 0.76, y: 0.56 },
      ctrl2: { x: 0.82, y: 0.56 },
      end: { x: 0.86, y: 0.54 },
      thicknessStart: 6,
      thicknessEnd: 3,
      depth: 0.15,
      phase: 1.9,
    });

    // --- Branch 3: Deep Back Branch for 3D Depth (Ushiro-eda) ---
    branchNodes.push({
      start: { x: 0.47, y: 0.52 },
      ctrl1: { x: 0.41, y: 0.46 },
      ctrl2: { x: 0.35, y: 0.43 },
      end: { x: 0.31, y: 0.42 },
      thicknessStart: 12,
      thicknessEnd: 5,
      depth: 0.7, // Shaded in background
      phase: 2.2,
    });
    branchNodes.push({
      start: { x: 0.38, y: 0.45 },
      ctrl1: { x: 0.34, y: 0.38 },
      ctrl2: { x: 0.28, y: 0.36 },
      end: { x: 0.24, y: 0.37 },
      thicknessStart: 6,
      thicknessEnd: 3,
      depth: 0.75,
      phase: 2.5,
    });

    // --- Branch 4: Mid-Upper Right Tier ---
    branchNodes.push({
      start: { x: 0.52, y: 0.37 },
      ctrl1: { x: 0.59, y: 0.34 },
      ctrl2: { x: 0.65, y: 0.32 },
      end: { x: 0.70, y: 0.30 },
      thicknessStart: 11,
      thicknessEnd: 5,
      depth: 0.3,
      phase: 2.8,
    });
    branchNodes.push({
      start: { x: 0.62, y: 0.33 },
      ctrl1: { x: 0.68, y: 0.27 },
      ctrl2: { x: 0.73, y: 0.25 },
      end: { x: 0.77, y: 0.24 },
      thicknessStart: 6,
      thicknessEnd: 3,
      depth: 0.35,
      phase: 3.1,
    });

    // --- Branch 5: Mid-Upper Left Tier ---
    branchNodes.push({
      start: { x: 0.49, y: 0.32 },
      ctrl1: { x: 0.43, y: 0.29 },
      ctrl2: { x: 0.38, y: 0.27 },
      end: { x: 0.33, y: 0.26 },
      thicknessStart: 10,
      thicknessEnd: 4,
      depth: 0.3,
      phase: 3.4,
    });

    // --- Branch 6: Apex Branchlets (Atama Dome) ---
    branchNodes.push({
      start: { x: 0.48, y: 0.22 },
      ctrl1: { x: 0.42, y: 0.18 },
      ctrl2: { x: 0.39, y: 0.15 },
      end: { x: 0.38, y: 0.13 },
      thicknessStart: 7,
      thicknessEnd: 3,
      depth: 0.2,
      phase: 3.7,
    });
    branchNodes.push({
      start: { x: 0.49, y: 0.20 },
      ctrl1: { x: 0.55, y: 0.17 },
      ctrl2: { x: 0.60, y: 0.15 },
      end: { x: 0.62, y: 0.14 },
      thicknessStart: 7,
      thicknessEnd: 3,
      depth: 0.2,
      phase: 4.0,
    });

    // 3. FOLIAGE CLOUDS (Dense Matsu Pine Needles Pads)
    // Helper to generate organic tuft sub-offsets
    function generateTufts(count: number, rx: number, ry: number) {
      const tufts = [];
      for (let i = 0; i < count; i++) {
        const u = (Math.random() - 0.5) * 2;
        const v = (Math.random() - 0.5) * 1.5;
        tufts.push({
          dx: u * rx * 0.75,
          dy: v * ry * 0.65 - ry * 0.15,
          scale: 0.7 + Math.random() * 0.55,
          angle: (Math.random() - 0.5) * 0.5,
        });
      }
      return tufts;
    }

    const cloudDefs = [
      // Sashi-eda Left Wings
      { cx: 0.14, cy: 0.68, rx: 0.085, ry: 0.045, depth: 0.1, density: 1.2, phase: 1.1, count: 12 },
      { cx: 0.18, cy: 0.55, rx: 0.095, ry: 0.050, depth: 0.2, density: 1.3, phase: 0.8, count: 14 },
      { cx: 0.24, cy: 0.63, rx: 0.090, ry: 0.048, depth: 0.15, density: 1.25, phase: 0.5, count: 13 },

      // Uke-eda Right Wings
      { cx: 0.86, cy: 0.54, rx: 0.080, ry: 0.042, depth: 0.15, density: 1.15, phase: 1.9, count: 11 },
      { cx: 0.80, cy: 0.42, rx: 0.090, ry: 0.048, depth: 0.25, density: 1.3, phase: 1.6, count: 13 },
      { cx: 0.72, cy: 0.51, rx: 0.095, ry: 0.052, depth: 0.2, density: 1.35, phase: 1.3, count: 14 },

      // Ushiro-eda Back Depths
      { cx: 0.24, cy: 0.37, rx: 0.080, ry: 0.042, depth: 0.75, density: 1.1, phase: 2.5, count: 10 },
      { cx: 0.31, cy: 0.42, rx: 0.085, ry: 0.045, depth: 0.7, density: 1.15, phase: 2.2, count: 11 },

      // Mid-Upper Tiers
      { cx: 0.33, cy: 0.26, rx: 0.090, ry: 0.048, depth: 0.3, density: 1.25, phase: 3.4, count: 12 },
      { cx: 0.70, cy: 0.30, rx: 0.085, ry: 0.045, depth: 0.3, density: 1.2, phase: 2.8, count: 12 },
      { cx: 0.77, cy: 0.24, rx: 0.080, ry: 0.042, depth: 0.35, density: 1.15, phase: 3.1, count: 11 },

      // Apex Crown (Atama Dome - Beautiful layered triangular summit)
      { cx: 0.38, cy: 0.13, rx: 0.075, ry: 0.040, depth: 0.2, density: 1.2, phase: 3.7, count: 10 },
      { cx: 0.62, cy: 0.14, rx: 0.075, ry: 0.040, depth: 0.2, density: 1.2, phase: 4.0, count: 10 },
      { cx: 0.50, cy: 0.11, rx: 0.110, ry: 0.055, depth: 0.05, density: 1.45, phase: 1.2, count: 18 },
    ];

    for (const cd of cloudDefs) {
      foliageClouds.push({
        center: { x: cd.cx, y: cd.cy },
        radiusX: cd.rx,
        radiusY: cd.ry,
        depth: cd.depth,
        density: cd.density,
        phase: cd.phase,
        tufts: generateTufts(cd.count, cd.rx, cd.ry),
      });
    }
  }

  return {
    setup() {
      initPetals();
      buildBonsaiModel();
    },

    render(context: RenderContext, timeState: TimeState, params: ParameterState) {
      const { ctx, width, height } = context;
      const speed = Number(params.speed ?? 0.8);
      const windSway = Number(params.windSway ?? 1.0);
      const foliageDensity = Number(params.foliageDensity ?? 1.3);
      const trunkThickness = Number(params.trunkThickness ?? 1.15);
      const sunGlow = Number(params.sunGlow ?? 1.1);

      const t = timeState.time * speed;

      if (petals.length === 0) initPetals();
      if (branchNodes.length === 0) buildBonsaiModel();

      // 1. Atmosphere: Deep Zen Twilight Gradient
      const bgGrad = ctx.createRadialGradient(
        width * 0.5, height * 0.42, 0,
        width * 0.5, height * 0.5, Math.hypot(width, height) * 0.7
      );
      bgGrad.addColorStop(0, '#19151e');
      bgGrad.addColorStop(0.45, '#100e16');
      bgGrad.addColorStop(0.85, '#07060a');
      bgGrad.addColorStop(1.0, '#030305');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // 2. Rising Sun Halo (Enso Sunburst)
      ctx.save();
      const sunX = width * 0.52;
      const sunY = height * 0.38;
      const sunRadius = Math.min(width, height) * 0.32;

      // Outer soft aura
      const sunAura = ctx.createRadialGradient(sunX, sunY, sunRadius * 0.1, sunX, sunY, sunRadius * 1.6);
      sunAura.addColorStop(0, `rgba(220, 60, 30, ${0.42 * sunGlow})`);
      sunAura.addColorStop(0.35, `rgba(180, 40, 25, ${0.22 * sunGlow})`);
      sunAura.addColorStop(0.7, `rgba(120, 20, 20, ${0.08 * sunGlow})`);
      sunAura.addColorStop(1.0, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = sunAura;
      ctx.beginPath();
      ctx.arc(sunX, sunY, sunRadius * 1.6, 0, Math.PI * 2);
      ctx.fill();

      // Dense glowing core
      const coreGrad = ctx.createRadialGradient(sunX, sunY, 0, sunX, sunY, sunRadius);
      coreGrad.addColorStop(0, `rgba(255, 120, 60, ${0.45 * sunGlow})`);
      coreGrad.addColorStop(0.65, `rgba(210, 50, 30, ${0.28 * sunGlow})`);
      coreGrad.addColorStop(0.95, `rgba(150, 25, 20, ${0.05 * sunGlow})`);
      coreGrad.addColorStop(1.0, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = coreGrad;
      ctx.beginPath();
      ctx.arc(sunX, sunY, sunRadius, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // 3. Ceramic Tokoname Bonsai Pot & Moss Mound Soil
      const potBaseY = height * 0.88;
      const potTopY = height * 0.81;
      const potWidth = width * 0.58;
      const potLeft = (width - potWidth) * 0.5;
      const potRight = potLeft + potWidth;

      // 3a. Deep shadow underneath pot
      ctx.save();
      const shadowGrad = ctx.createRadialGradient(width * 0.5, potBaseY + 14, 0, width * 0.5, potBaseY + 14, potWidth * 0.65);
      shadowGrad.addColorStop(0, 'rgba(0, 0, 0, 0.85)');
      shadowGrad.addColorStop(0.5, 'rgba(0, 0, 0, 0.45)');
      shadowGrad.addColorStop(1.0, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = shadowGrad;
      ctx.beginPath();
      ctx.ellipse(width * 0.5, potBaseY + 12, potWidth * 0.56, 16, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // 3b. Ceramic Pot Body (Glazed Charcoal Stoneware)
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(potLeft + 16, potTopY);
      ctx.lineTo(potRight - 16, potTopY);
      ctx.quadraticCurveTo(potRight, potTopY, potRight - 8, potTopY + 14);
      ctx.lineTo(potRight - 26, potBaseY);
      ctx.quadraticCurveTo(potRight - 32, potBaseY + 6, potRight - 44, potBaseY + 6);
      ctx.lineTo(potLeft + 44, potBaseY + 6);
      ctx.quadraticCurveTo(potLeft + 32, potBaseY + 6, potLeft + 26, potBaseY);
      ctx.lineTo(potLeft + 8, potTopY + 14);
      ctx.quadraticCurveTo(potLeft, potTopY, potLeft + 16, potTopY);
      ctx.closePath();

      const potGrad = ctx.createLinearGradient(potLeft, potTopY, potRight, potBaseY);
      potGrad.addColorStop(0, '#221f26');
      potGrad.addColorStop(0.25, '#352e3c');
      potGrad.addColorStop(0.5, '#443c4d');
      potGrad.addColorStop(0.75, '#2c2532');
      potGrad.addColorStop(1.0, '#16141a');
      ctx.fillStyle = potGrad;
      ctx.fill();
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
      ctx.lineWidth = 1.2;
      ctx.stroke();

      // Upper Rim Moulding
      ctx.beginPath();
      ctx.ellipse(width * 0.5, potTopY + 2, potWidth * 0.51, 9, 0, 0, Math.PI * 2);
      ctx.fillStyle = '#3c3543';
      ctx.fill();
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.25)';
      ctx.lineWidth = 1.2;
      ctx.stroke();

      // Foot Stools
      const footW = 20;
      const footH = 9;
      ctx.fillStyle = '#151318';
      ctx.fillRect(potLeft + 36, potBaseY + 6, footW, footH);
      ctx.fillRect(potRight - 36 - footW, potBaseY + 6, footW, footH);
      ctx.restore();

      // 3c. Velvety Moss Mound Soil (Kokadachi)
      ctx.save();
      ctx.beginPath();
      ctx.ellipse(width * 0.5, potTopY, potWidth * 0.46, 24, 0, Math.PI, 0);
      const mossGrad = ctx.createRadialGradient(width * 0.5, potTopY - 6, 12, width * 0.5, potTopY, potWidth * 0.48);
      mossGrad.addColorStop(0, '#53823d');
      mossGrad.addColorStop(0.35, '#355c27');
      mossGrad.addColorStop(0.7, '#1f3816');
      mossGrad.addColorStop(1.0, '#101e0a');
      ctx.fillStyle = mossGrad;
      ctx.fill();

      // Weathered Garden River Stones
      const stones = [
        { x: width * 0.38, y: potTopY - 2, rx: 14, ry: 7, rot: -0.2, c: '#484440' },
        { x: width * 0.62, y: potTopY - 1, rx: 18, ry: 9, rot: 0.15, c: '#363432' },
        { x: width * 0.43, y: potTopY + 3, rx: 11, ry: 5, rot: 0.3, c: '#5a5652' },
      ];
      for (const s of stones) {
        ctx.save();
        ctx.translate(s.x, s.y);
        ctx.rotate(s.rot);
        ctx.beginPath();
        ctx.ellipse(0, 0, s.rx, s.ry, 0, 0, Math.PI * 2);
        ctx.fillStyle = s.c;
        ctx.fill();
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
        ctx.lineWidth = 0.8;
        ctx.stroke();
        ctx.restore();
      }

      // Moss texture stipples
      for (let m = 0; m < 75; m++) {
        const u = (Math.random() - 0.5) * 2;
        const mx = width * 0.5 + u * (potWidth * 0.44) * Math.sqrt(1 - Math.pow(Math.random(), 2));
        const my = potTopY - Math.sin(Math.acos(Math.abs(u) * 0.96)) * (16 * Math.random()) + (Math.random() - 0.5) * 5;
        const mR = 1.2 + Math.random() * 2.8;
        ctx.fillStyle = Math.random() > 0.45 ? 'rgba(115, 195, 80, 0.65)' : 'rgba(55, 110, 40, 0.55)';
        ctx.beginPath();
        ctx.arc(mx, my, mR, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();

      // 4. Exposed Muscular Buttress Roots (Nebari)
      ctx.save();
      const rootBaseX = width * 0.50;
      const rootBaseY = potTopY - 8;
      const roots = [
        { endDx: -75, endDy: 16, ctrlDx: -45, ctrlDy: -4, w: 16 },
        { endDx: -48, endDy: 14, ctrlDx: -28, ctrlDy: -2, w: 14 },
        { endDx: -22, endDy: 12, ctrlDx: -12, ctrlDy: 0, w: 12 },
        { endDx: 18, endDy: 12, ctrlDx: 10, ctrlDy: 0, w: 12 },
        { endDx: 42, endDy: 14, ctrlDx: 25, ctrlDy: -2, w: 14 },
        { endDx: 70, endDy: 16, ctrlDx: 42, ctrlDy: -4, w: 16 },
        { endDx: -95, endDy: 18, ctrlDx: -65, ctrlDy: 2, w: 10 },
        { endDx: 90, endDy: 18, ctrlDx: 62, ctrlDy: 2, w: 10 },
      ];

      for (const r of roots) {
        ctx.beginPath();
        ctx.moveTo(rootBaseX + r.ctrlDx * 0.35, rootBaseY - 18);
        ctx.quadraticCurveTo(rootBaseX + r.ctrlDx, rootBaseY + r.ctrlDy, rootBaseX + r.endDx, rootBaseY + r.endDy);
        ctx.strokeStyle = '#22140d';
        ctx.lineWidth = r.w * trunkThickness;
        ctx.lineCap = 'round';
        ctx.stroke();

        // Bark highlight
        ctx.beginPath();
        ctx.moveTo(rootBaseX + r.ctrlDx * 0.35 - 2, rootBaseY - 16);
        ctx.quadraticCurveTo(rootBaseX + r.ctrlDx - 2, rootBaseY + r.ctrlDy, rootBaseX + r.endDx - 2, rootBaseY + r.endDy);
        ctx.strokeStyle = '#5a3b29';
        ctx.lineWidth = r.w * 0.38 * trunkThickness;
        ctx.stroke();
      }
      ctx.restore();

      // 5. Render Gnarled Trunk & Branch Architecture (Contoured Smooth Splines)
      // Helper to evaluate cubic Bézier point with wind sway
      function evalBranchPoint(node: BranchNode, u: number): Point2D {
        const u1 = 1 - u;
        const sway = Math.sin(t * 1.4 + node.phase) * (4 * u * windSway);
        const swayY = Math.cos(t * 1.1 + node.phase) * (2 * u * windSway);

        const x = (u1 * u1 * u1 * node.start.x +
          3 * u1 * u1 * u * node.ctrl1.x +
          3 * u1 * u * u * node.ctrl2.x +
          u * u * u * node.end.x) * width + sway;

        const y = (u1 * u1 * u1 * node.start.y +
          3 * u1 * u1 * u * node.ctrl1.y +
          3 * u1 * u * u * node.ctrl2.y +
          u * u * u * node.end.y) * height + swayY;

        return { x, y };
      }

      // Sort branch nodes: background branches first
      const sortedBranches = [...branchNodes].sort((a, b) => b.depth - a.depth);

      ctx.save();
      for (const node of sortedBranches) {
        const STEPS = 30;
        let prevPt = evalBranchPoint(node, 0);

        for (let s = 1; s <= STEPS; s++) {
          const u = s / STEPS;
          const curPt = evalBranchPoint(node, u);

          const w = (node.thicknessStart * (1 - u) + node.thicknessEnd * u) * trunkThickness;

          // Branch core fill
          ctx.beginPath();
          ctx.moveTo(prevPt.x, prevPt.y);
          ctx.lineTo(curPt.x, curPt.y);
          ctx.strokeStyle = node.depth > 0.5 ? '#150d09' : '#22140d';
          ctx.lineWidth = w;
          ctx.lineCap = 'round';
          ctx.stroke();

          // 3D Bark Shadow (Underbelly)
          ctx.beginPath();
          ctx.moveTo(prevPt.x, prevPt.y + w * 0.22);
          ctx.lineTo(curPt.x, curPt.y + w * 0.22);
          ctx.strokeStyle = '#100805';
          ctx.lineWidth = w * 0.45;
          ctx.stroke();

          // 3D Sunlit Bark Highlight (Top Ridge)
          if (node.depth < 0.5) {
            ctx.beginPath();
            ctx.moveTo(prevPt.x - w * 0.18, prevPt.y - w * 0.18);
            ctx.lineTo(curPt.x - w * 0.18, curPt.y - w * 0.18);
            ctx.strokeStyle = '#5a3d2a';
            ctx.lineWidth = w * 0.35;
            ctx.stroke();

            // Fine Golden Sunlit Wood Grain Edge
            ctx.beginPath();
            ctx.moveTo(prevPt.x - w * 0.24, prevPt.y - w * 0.24);
            ctx.lineTo(curPt.x - w * 0.24, curPt.y - w * 0.24);
            ctx.strokeStyle = '#855c42';
            ctx.lineWidth = w * 0.14;
            ctx.stroke();
          }

          prevPt = curPt;
        }
      }

      // Shari (Weathered Sun-bleached Deadwood Vein along main trunk)
      const trunkNode = branchNodes[1];
      if (trunkNode) {
        ctx.beginPath();
        for (let s = 0; s <= 25; s++) {
          const u = s / 25;
          const pt = evalBranchPoint(trunkNode, u);
          const shariX = pt.x + (Math.sin(s * 0.8) * 3) + 2;
          const shariY = pt.y;
          if (s === 0) ctx.moveTo(shariX, shariY);
          else ctx.lineTo(shariX, shariY);
        }
        ctx.strokeStyle = 'rgba(215, 205, 190, 0.65)';
        ctx.lineWidth = 3.5 * trunkThickness;
        ctx.lineCap = 'round';
        ctx.stroke();
      }
      ctx.restore();

      // 6. VOLUMETRIC PINE FOLIAGE CLOUDS (Dense Matsu Needles)
      // Sort clouds: background clouds first, foreground clouds last
      const sortedClouds = [...foliageClouds].sort((a, b) => b.depth - a.depth);

      for (const cloud of sortedClouds) {
        const sway = Math.sin(t * 1.4 + cloud.phase) * (4 * windSway);
        const swayY = Math.cos(t * 1.1 + cloud.phase) * (2 * windSway);

        const cx = cloud.center.x * width + sway;
        const cy = cloud.center.y * height + swayY;
        const rx = cloud.radiusX * width * (0.85 + foliageDensity * 0.15);
        const ry = cloud.radiusY * height * (0.85 + foliageDensity * 0.15);

        ctx.save();

        // 6a. Deep Volume Shadow Mass (Underbelly Foundation)
        ctx.beginPath();
        ctx.ellipse(cx, cy + ry * 0.15, rx * 1.05, ry * 0.95, 0, 0, Math.PI * 2);
        ctx.fillStyle = cloud.depth > 0.5 ? 'rgba(5, 18, 10, 0.95)' : 'rgba(8, 28, 15, 0.95)';
        ctx.fill();

        // 6b. Secondary Volume Body
        ctx.beginPath();
        ctx.ellipse(cx, cy - ry * 0.1, rx * 0.92, ry * 0.82, 0, 0, Math.PI * 2);
        ctx.fillStyle = cloud.depth > 0.5 ? 'rgba(10, 36, 20, 0.9)' : 'rgba(18, 56, 30, 0.9)';
        ctx.fill();

        // 6c. Render Dense Radial Micro-Needle Tufts across the pad
        for (const tuft of cloud.tufts) {
          const tx = cx + tuft.dx * width;
          const ty = cy + tuft.dy * height;
          const tuftScale = tuft.scale * (0.9 + foliageDensity * 0.1);

          const NEEDLES_PER_TUFT = Math.floor(32 * cloud.density * foliageDensity);

          for (let n = 0; n < NEEDLES_PER_TUFT; n++) {
            const normN = n / NEEDLES_PER_TUFT;
            // Radial fan arc: -45° to 225°
            const angle = -Math.PI * 0.25 + normN * (Math.PI * 1.5) + tuft.angle + (Math.sin(n * 5.3) * 0.12);
            const rDist = (0.2 + 0.8 * Math.sqrt(Math.random())) * 14 * tuftScale;

            const nx0 = tx + Math.cos(angle) * (rDist * 0.4);
            const ny0 = ty + Math.sin(angle) * (rDist * 0.4);

            const needleLen = (7 + Math.sin(n * 3.7) * 4.5) * tuftScale * (1 - cloud.depth * 0.25);
            const nx1 = nx0 + Math.cos(angle) * needleLen;
            const ny1 = ny0 + Math.sin(angle) * needleLen;

            // Multi-tier Pine Needle Color Shading
            let needleColor: string;
            if (cloud.depth > 0.5) {
              needleColor = n % 3 === 0 ? '#0f381f' : n % 3 === 1 ? '#164d2b' : '#0a2615';
            } else {
              if (ny1 < cy - ry * 0.15) {
                // Top sunlit needles
                needleColor = n % 4 === 0 ? '#7fd674' : n % 4 === 1 ? '#4db857' : n % 4 === 2 ? '#a4f092' : '#308c45';
              } else {
                // Lower body needles
                needleColor = n % 3 === 0 ? '#26733a' : n % 3 === 1 ? '#1a542a' : '#123d1e';
              }
            }

            ctx.beginPath();
            ctx.moveTo(nx0, ny0);
            ctx.lineTo(nx1, ny1);
            ctx.strokeStyle = needleColor;
            ctx.lineWidth = 1.15;
            ctx.lineCap = 'round';
            ctx.stroke();
          }
        }

        // 6d. Sunlit Mossy Edge Glow on Top of Foreground Clouds
        if (cloud.depth < 0.4) {
          ctx.beginPath();
          ctx.ellipse(cx, cy - ry * 0.48, rx * 0.7, ry * 0.32, 0, Math.PI, Math.PI * 2);
          ctx.strokeStyle = 'rgba(165, 245, 150, 0.45)';
          ctx.lineWidth = 1.5;
          ctx.stroke();
        }

        ctx.restore();
      }

      // 7. Drifting Sakura Petals & Zen Light Dust
      ctx.save();
      for (let i = 0; i < petals.length; i++) {
        const pt = petals[i];
        pt.x = (pt.x + pt.vx + 1) % 1;
        pt.y = (pt.y + pt.vy + 1) % 1;
        pt.rot += pt.rotV;

        const px = pt.x * width;
        const py = pt.y * height;
        const sway = Math.sin(t * 1.8 + pt.phase) * 7;

        ctx.save();
        ctx.translate(px + sway, py);
        ctx.rotate(pt.rot);

        ctx.beginPath();
        ctx.ellipse(0, 0, pt.size * 1.9, pt.size * 0.95, 0, 0, Math.PI * 2);
        if (i % 3 === 0) {
          ctx.fillStyle = 'rgba(255, 185, 200, 0.75)'; // Cherry Blossom Pink
        } else if (i % 3 === 1) {
          ctx.fillStyle = 'rgba(255, 220, 145, 0.7)'; // Golden Sun Mote
        } else {
          ctx.fillStyle = 'rgba(255, 245, 248, 0.85)'; // White Petal
        }
        ctx.fill();
        ctx.restore();
      }
      ctx.restore();
    },
  };
}
