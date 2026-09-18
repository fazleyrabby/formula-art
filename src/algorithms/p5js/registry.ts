export function getAlgorithm(slug: string) {
  
  if (slug === 'morphing-op-art') {
    return {
      sketch: (p: any) => {
        p.setup = () => {
          let w = p.container ? p.container.clientWidth : 400;
          let h = p.container ? p.container.clientHeight : 400;
          p.createCanvas(w, h);
          p.rectMode(p.CENTER);
          p.noStroke();
        };
        p.draw = () => {
          p.background(10, 14, 23);
          let gridSize = p.params?.gridSize || 30;
          let t = p.millis() * 0.001;
          
          for(let x = gridSize/2; x < p.width; x += gridSize) {
            for(let y = gridSize/2; y < p.height; y += gridSize) {
              let d = p.dist(x, y, p.width/2, p.height/2);
              let offset = d * 0.05;
              let wave = p.sin(t * 2.0 - offset);
              
              p.push();
              p.translate(x, y);
              p.rotate(wave * p.PI);
              
              p.fill(255, p.map(wave, -1, 1, 100, 255));
              
              let size = p.map(wave, -1, 1, gridSize*0.2, gridSize*0.8);
              if (wave > 0.5) {
                p.rect(0, 0, size, size, 4);
              } else if (wave > -0.5) {
                p.ellipse(0, 0, size, size);
              } else {
                p.rect(0, 0, size, size*0.1);
              }
              p.pop();
            }
          }
        };
        p.windowResized = () => {
          if (p.container) {
            p.resizeCanvas(p.container.clientWidth, p.container.clientHeight);
          }
        };
      }
    };
  }
    if (slug === "maze-automata-p5") return { sketch: (p: any) => { p.setup = () => {
  p.createCanvas(p.container.clientWidth, p.container.clientHeight);
  p.background(20);
  p.stroke(255);
};
let x = 0, y = 0, spacing = 20;
p.draw = () => {
  if (p.random(1) < 0.5) p.line(x, y, x + spacing, y + spacing);
  else p.line(x, y + spacing, x + spacing, y);
  x += spacing;
  if (x > p.width) { x = 0; y += spacing; }
  if (y > p.height) { p.background(20); x = 0; y = 0; }
};
p.windowResized = () => { if(p.container) p.resizeCanvas(p.container.clientWidth, p.container.clientHeight); }; } };
  if (slug === "blob-p5") return { sketch: (p: any) => { p.setup = () => {
  p.createCanvas(p.container.clientWidth, p.container.clientHeight);
};
p.draw = () => {
  p.background(15, 20, 30, 50);
  p.translate(p.width/2, p.height/2);
  let mx = (p.mouseX - p.width/2) * 0.1;
  let my = (p.mouseY - p.height/2) * 0.1;
  p.noStroke(); p.fill(100, 200, 255, 150);
  p.beginShape();
  for(let a=0; a<p.TWO_PI; a+=0.1) {
    let r = 150 + p.noise(p.cos(a)+p.frameCount*0.01 + mx, p.sin(a)+p.frameCount*0.01 + my) * 100;
    p.vertex(r*p.cos(a), r*p.sin(a));
  }
  p.endShape(p.CLOSE);
};
p.windowResized = () => { if(p.container) p.resizeCanvas(p.container.clientWidth, p.container.clientHeight); }; } };
  if (slug === "blade-morph-p5") return { sketch: (p: any) => { p.setup = () => {
  p.createCanvas(p.container.clientWidth, p.container.clientHeight);
  p.rectMode(p.CENTER);
  p.noFill();
  p.stroke(255);
};
p.draw = () => {
  p.background(0, 20);
  p.translate(p.width/2, p.height/2);
  let n = 20;
  for(let i=0; i<n; i++) {
    p.push();
    p.rotate(p.frameCount*0.01 + i*0.1 + (p.mouseX*0.01));
    p.scale(p.map(i, 0, n, 0.1, 2.0));
    let t = (p.sin(p.frameCount*0.02 + i*0.2)+1)/2;
    p.rect(0, 0, 100 + t*50, 100 - t*50, t*50);
    p.pop();
  }
};
p.windowResized = () => { if(p.container) p.resizeCanvas(p.container.clientWidth, p.container.clientHeight); }; } };
  if (slug === "harmonograph-p5") return { sketch: (p: any) => { p.setup = () => {
  p.createCanvas(p.container.clientWidth, p.container.clientHeight);
  p.background(10);
};
let t = 0;
p.draw = () => {
  p.translate(p.width/2, p.height/2);
  p.stroke(255, 100);
  let f1 = p.map(p.mouseX, 0, p.width, 1, 5) || 2;
  let f2 = p.map(p.mouseY, 0, p.height, 1, 5) || 3;
  let x = p.sin(t * f1) * p.exp(-0.001*t) * 150;
  let y = p.sin(t * f2 + p.PI/2) * p.exp(-0.001*t) * 150;
  p.point(x, y);
  t += 0.1;
  if (t > 1000) { t=0; p.background(10); }
};
p.windowResized = () => { if(p.container) p.resizeCanvas(p.container.clientWidth, p.container.clientHeight); }; } };
  if (slug === "celestial-orbitals-p5") {
    return {
      sketch: (p: any) => {
        // Dominikus Baur (@dominikus) Tribute: "Orbitals"
        // High-contrast monochromatic generative orbital system:
        // Entangled 3D tubular filament core, thick orbital arc tracks,
        // geometric constellation network, and eccentric satellite orbs.

        interface Worm {
          baseAngle: number;
          phaseSpeed: number;
          coilRadius: number;
          coilSpeed: number;
          tiltX: number;
          tiltY: number;
          segments: Array<{ x: number; y: number; z: number; r: number }>;
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
        }

        let worms: Worm[] = [];
        let satellites: Satellite[] = [];
        let webNodes: WebNode[] = [];
        const WORM_COUNT = 54;
        const SEGMENTS_PER_WORM = 28;
        const SATELLITE_COUNT = 11;
        const WEB_NODE_COUNT = 65;

        let mouseTiltX = 0;
        let mouseTiltY = 0;

        p.setup = () => {
          let w = p.container ? p.container.clientWidth : 400;
          let h = p.container ? p.container.clientHeight : 400;
          p.createCanvas(w, h);

          // 1. Initialize Entangled Filament Worms
          worms = [];
          for (let i = 0; i < WORM_COUNT; i++) {
            let segs = [];
            for (let s = 0; s < SEGMENTS_PER_WORM; s++) {
              segs.push({ x: 0, y: 0, z: 0, r: 3.5 });
            }
            worms.push({
              baseAngle: (i / WORM_COUNT) * p.TWO_PI,
              phaseSpeed: 0.25 + (i % 5) * 0.08,
              coilRadius: 40 + (i % 4) * 18,
              coilSpeed: 1.2 + (i % 3) * 0.4,
              tiltX: (i % 7) * 0.5,
              tiltY: (i % 9) * 0.4,
              segments: segs,
            });
          }

          // 2. Initialize Floating Black Satellite Orbs
          satellites = [];
          const satSizes = [12, 10, 8, 14, 7, 9, 6, 11, 8, 10, 7];
          const satRadii = [170, 195, 145, 210, 160, 225, 150, 185, 235, 175, 200];
          for (let i = 0; i < SATELLITE_COUNT; i++) {
            satellites.push({
              orbitRadius: satRadii[i % satRadii.length],
              speed: (0.15 + (i % 4) * 0.08) * (i % 2 === 0 ? 1 : -1),
              angle: (i / SATELLITE_COUNT) * p.TWO_PI + (i * 0.3),
              size: satSizes[i % satSizes.length],
              hasTether: i % 2 === 0 || i % 3 === 0,
            });
          }

          // 3. Initialize Outer Geometric Web Nodes
          webNodes = [];
          for (let i = 0; i < WEB_NODE_COUNT; i++) {
            let a = (i / WEB_NODE_COUNT) * p.TWO_PI;
            let r = 110 + (i % 6) * 16 + (Math.sin(i * 3.5) * 20);
            webNodes.push({
              baseX: Math.cos(a) * r,
              baseY: Math.sin(a) * r,
              phase: i * 0.8,
              speed: 0.5 + (i % 3) * 0.3,
              amp: 8 + (i % 4) * 5,
            });
          }
        };

        p.draw = () => {
          // Minimalist warm off-white / light paper background (Dominikus signature)
          p.background(243, 243, 245);

          let cx = p.width * 0.5;
          let cy = p.height * 0.5;
          let t = p.millis() * 0.001;

          // Responsive scale factor
          let scaleFactor = Math.min(p.width, p.height) / 460;

          // Smooth mouse tilt parallax
          let targetTiltX = p.mouseX ? (p.mouseX - cx) * 0.0012 : 0;
          let targetTiltY = p.mouseY ? (p.mouseY - cy) * 0.0012 : 0;
          mouseTiltX += (targetTiltX - mouseTiltX) * 0.06;
          mouseTiltY += (targetTiltY - mouseTiltY) * 0.06;

          p.push();
          p.translate(cx, cy);
          p.scale(scaleFactor);

          // Subtle overall 3D rotation
          let globalRot = t * 0.04;
          p.rotate(globalRot + mouseTiltX);

          // -------------------------------------------------------------
          // LAYER 1: Geometric Constellation Web (Fine Hairline Facets)
          // -------------------------------------------------------------
          let currentWebPts: Array<{ x: number; y: number }> = [];
          for (let i = 0; i < webNodes.length; i++) {
            let wn = webNodes[i];
            let offset = Math.sin(t * wn.speed + wn.phase) * wn.amp;
            currentWebPts.push({
              x: wn.baseX + (wn.baseX / 120) * offset,
              y: wn.baseY + (wn.baseY / 120) * offset,
            });
          }

          p.stroke(40, 42, 50, 38);
          p.strokeWeight(0.6);
          p.noFill();

          // Intersecting triangulation lines
          for (let i = 0; i < currentWebPts.length; i++) {
            let pt1 = currentWebPts[i];
            for (let j = i + 1; j < currentWebPts.length; j++) {
              let pt2 = currentWebPts[j];
              let dSq = (pt2.x - pt1.x) * (pt2.x - pt1.x) + (pt2.y - pt1.y) * (pt2.y - pt1.y);
              if (dSq < 3800) {
                p.line(pt1.x, pt1.y, pt2.x, pt2.y);
              }
            }
          }

          // Small open ring markers at web vertices
          p.fill(248, 248, 250);
          p.stroke(60, 65, 75, 120);
          p.strokeWeight(0.8);
          for (let i = 0; i < currentWebPts.length; i += 2) {
            p.circle(currentWebPts[i].x, currentWebPts[i].y, 3.2);
          }

          // -------------------------------------------------------------
          // LAYER 2: Satellite Tethers & Solid Black Orbs
          // -------------------------------------------------------------
          for (let i = 0; i < satellites.length; i++) {
            let sat = satellites[i];
            let satAngle = sat.angle + t * sat.speed;
            let sx = Math.cos(satAngle) * sat.orbitRadius;
            let sy = Math.sin(satAngle) * sat.orbitRadius * 0.92;

            if (sat.hasTether) {
              p.stroke(35, 38, 48, 55);
              p.strokeWeight(0.7);
              // Radial tether line into core
              p.line(0, 0, sx, sy);
            }

            // Bold Solid Black Planet Orb
            p.noStroke();
            p.fill(18, 19, 24);
            p.circle(sx, sy, sat.size);
          }

          // -------------------------------------------------------------
          // LAYER 2.5: Sweeping Parametric Architectural Ribbon Shells & Astrolabe
          // -------------------------------------------------------------
          // Astrolabe concentric circular ring with fine radial tick marks
          p.noFill();
          p.stroke(25, 27, 34, 190);
          p.strokeWeight(1.4);
          p.circle(0, 0, 284);
          p.stroke(40, 42, 50, 90);
          p.strokeWeight(0.8);
          p.circle(0, 0, 272);

          // Radial astrolabe tick marks around the ring
          p.stroke(20, 22, 28, 200);
          p.strokeWeight(1.1);
          for (let deg = 0; deg < 360; deg += 3) {
            let radA = (deg * p.PI) / 180;
            let tickLen = deg % 15 === 0 ? 9 : 4.5;
            let r1 = 136;
            let r2 = r1 + tickLen;
            p.line(Math.cos(radA) * r1, Math.sin(radA) * r1, Math.cos(radA) * r2, Math.sin(radA) * r2);
          }

          // Glowing pure white slicing arc
          p.stroke(255);
          p.strokeWeight(3.2);
          p.noFill();
          p.arc(0, 0, 210, 210, -2.1, 0.4);

          // Three Sweeping Parametric Ribbon Shells (Dominikus Signature Wings & Tail)
          const ribbonConfigs = [
            // Top-Left Broad Wing
            { startA: -2.9, endA: -0.7, rIn: 68, rOut: 172, fIn: 12, fOut: 24, darkTone: 155, lightTone: 215 },
            // Top-Right Curving Wing
            { startA: -0.95, endA: 1.05, rIn: 62, rOut: 158, fIn: 10, fOut: 20, darkTone: 165, lightTone: 225 },
            // Bottom Descending Tail
            { startA: 1.15, endA: 2.15, rIn: 55, rOut: 175, fIn: 8, fOut: 18, darkTone: 145, lightTone: 205 },
          ];

          for (let rIdx = 0; rIdx < ribbonConfigs.length; rIdx++) {
            let rc = ribbonConfigs[rIdx];
            let steps = 48;
            let stepA = (rc.endA - rc.startA) / steps;

            let innerPts: Array<{ x: number; y: number }> = [];
            let outerPts: Array<{ x: number; y: number }> = [];

            for (let s = 0; s <= steps; s++) {
              let a = rc.startA + s * stepA;
              let morph = Math.sin(a * 2.5 + t * 0.4 + rIdx);
              let rI = rc.rIn + morph * rc.fIn;
              let rO = rc.rOut + Math.cos(a * 2.0 - t * 0.3) * rc.fOut;

              innerPts.push({ x: Math.cos(a) * rI, y: Math.sin(a) * rI });
              outerPts.push({ x: Math.cos(a) * rO, y: Math.sin(a) * rO });
            }

            // Draw filled shaded ribbon surface
            for (let s = 0; s < steps; s++) {
              let prog = s / steps;
              let shade = p.lerp(rc.lightTone, rc.darkTone, Math.sin(prog * p.PI));
              p.fill(shade, shade + 2, shade + 5, 230);
              p.noStroke();

              p.beginShape();
              p.vertex(innerPts[s].x, innerPts[s].y);
              p.vertex(outerPts[s].x, outerPts[s].y);
              p.vertex(outerPts[s + 1].x, outerPts[s + 1].y);
              p.vertex(innerPts[s + 1].x, innerPts[s + 1].y);
              p.endShape(p.CLOSE);
            }

            // Fine wireframe cross-section isolines (Hatching)
            p.stroke(28, 30, 38, 175);
            p.strokeWeight(0.75);
            for (let s = 0; s <= steps; s += 2) {
              p.line(innerPts[s].x, innerPts[s].y, outerPts[s].x, outerPts[s].y);
            }

            // Outer boundary contour & pearl beads
            p.stroke(20, 22, 26, 220);
            p.strokeWeight(1.2);
            p.noFill();
            p.beginShape();
            for (let s = 0; s <= steps; s++) {
              p.vertex(outerPts[s].x, outerPts[s].y);
            }
            p.endShape();

            // Distinct white bead nodes along outer perimeter
            p.strokeWeight(0.9);
            for (let s = 0; s <= steps; s += 3) {
              p.fill(250, 250, 252);
              p.stroke(22, 24, 28);
              p.circle(outerPts[s].x, outerPts[s].y, 3.8);
            }
          }

          // -------------------------------------------------------------
          // LAYER 3: Dark Core Cavity Shadow
          // -------------------------------------------------------------
          p.noStroke();
          p.fill(25, 27, 34, 180);
          p.circle(0, 0, 48);
          p.fill(15, 16, 20, 240);
          p.circle(2, 4, 32);

          // -------------------------------------------------------------
          // LAYER 4: Dense Entangled Filament Worms / Noodles
          // -------------------------------------------------------------
          // Sort beads back-to-front in pseudo-3D
          let allBeads: Array<{ x: number; y: number; z: number; r: number; isDark: boolean }> = [];

          for (let i = 0; i < worms.length; i++) {
            let w = worms[i];
            let angle = w.baseAngle + t * w.phaseSpeed;

            for (let s = 0; s < SEGMENTS_PER_WORM; s++) {
              let segProg = s / SEGMENTS_PER_WORM;
              let coilAngle = angle + segProg * p.TWO_PI * 1.8 + t * w.coilSpeed;

              // 3D Toroidal coordinate formula
              let R = 52 + Math.sin(t * 0.8 + i) * 10;
              let r = w.coilRadius * (0.5 + 0.5 * Math.sin(segProg * p.PI + i));

              let x3d = (R + r * Math.cos(coilAngle * 2.0)) * Math.cos(coilAngle);
              let y3d = (R + r * Math.cos(coilAngle * 2.0)) * Math.sin(coilAngle);
              let z3d = r * Math.sin(coilAngle * 2.0);

              // 3D tilt transformation
              let yTilted = y3d * Math.cos(w.tiltX) - z3d * Math.sin(w.tiltX);
              let zTilted = y3d * Math.sin(w.tiltX) + z3d * Math.cos(w.tiltX);

              let xTilted = x3d * Math.cos(w.tiltY) + zTilted * Math.sin(w.tiltY);
              let zFinal = -x3d * Math.sin(w.tiltY) + zTilted * Math.cos(w.tiltY);

              let beadRadius = 2.4 + (1.0 - segProg) * 1.6;
              let isDark = (i % 6 === 0 && s < 12);

              allBeads.push({
                x: xTilted,
                y: yTilted,
                z: zFinal,
                r: beadRadius,
                isDark,
              });
            }
          }

          // Depth sort beads
          allBeads.sort((a, b) => a.z - b.z);

          // Draw beads with tactile shaded rim (Dominikus stippled bead look)
          p.strokeWeight(0.9);
          for (let i = 0; i < allBeads.length; i++) {
            let b = allBeads[i];
            if (b.isDark) {
              p.fill(28, 30, 36);
              p.stroke(15, 16, 20);
            } else {
              // Shaded white/silver bead with dark charcoal outline
              let lightVal = p.map(b.z, -50, 50, 220, 255);
              p.fill(lightVal, lightVal, lightVal + 3);
              p.stroke(45, 48, 55, 210);
            }
            p.circle(b.x, b.y, b.r * 2);
          }

          // -------------------------------------------------------------
          // LAYER 5: Thick Slicing Black Orbital Arcs
          // -------------------------------------------------------------
          const arcConfigs = [
            { r: 76, start: -0.8, len: 1.1, rotSpeed: 0.45, w: 9 },
            { r: 64, start: 2.1, len: 1.3, rotSpeed: -0.38, w: 8 },
            { r: 84, start: 0.5, len: 0.9, rotSpeed: 0.55, w: 7.5 },
            { r: 52, start: -2.3, len: 1.0, rotSpeed: -0.6, w: 7 },
          ];

          for (let i = 0; i < arcConfigs.length; i++) {
            let ac = arcConfigs[i];
            let arcRot = t * ac.rotSpeed + i * 1.2;

            p.push();
            p.rotate(arcRot);

            // Dense segmented black arc with textured tick marks
            p.stroke(14, 15, 18);
            p.strokeWeight(ac.w);
            p.strokeCap(p.ROUND);
            p.noFill();

            p.arc(0, 0, ac.r * 2, ac.r * 2, ac.start, ac.start + ac.len);

            // Accent white tip beads on the arcs
            let tipAngle = ac.start + ac.len;
            let tipX = Math.cos(tipAngle) * ac.r;
            let tipY = Math.sin(tipAngle) * ac.r;
            p.fill(245);
            p.stroke(20);
            p.strokeWeight(1.2);
            p.circle(tipX, tipY, 4.5);

            p.pop();
          }

          p.pop(); // restore translate
        };

        p.windowResized = () => {
          if (p.container) {
            p.resizeCanvas(p.container.clientWidth, p.container.clientHeight);
          }
        };
      },
    };
  }

  if (slug === "rain-ripples-p5") {
    return {
      sketch: (p: any) => {
        // Rain Ripples — colorful raindrops & expanding water ripples
        // Inspired by Okazz (@okazz_) — https://x.com/okazz_/status/2100938132002914437
        // Original p5.js implementation for Math Art.

        let drops: any[] = [];
        let ripples: any[] = [];
        let dots: Array<{ x: number; y: number }> = [];
        let cols = 0;
        let rows = 0;
        let curGrid = 16;
        let spawnAcc = 0;
        let baseHue = 0;
        const MAX_RIPPLES = 48;

        function param(key: string, fallback: number): number {
          const pr = p.getParams ? p.getParams() : null;
          const v = pr ? pr[key] : undefined;
          return typeof v === "number" ? v : fallback;
        }

        function buildGrid(g: number) {
          curGrid = g;
          cols = Math.ceil(p.width / g) + 2;
          rows = Math.ceil(p.height / g) + 2;
          dots = [];
          for (let j = 0; j < rows; j++) {
            for (let i = 0; i < cols; i++) {
              dots.push({ x: i * g, y: j * g });
            }
          }
        }

        function spawnDrop() {
          const hue = (baseHue + p.random(-45, 45) + 360) % 360;
          drops.push({
            x: p.random(p.width),
            y: p.random(-140, -20),
            vy: p.random(5, 9) * Math.max(0.7, p.height / 800),
            len: p.random(12, 34),
            target: p.random(p.height * 0.1, p.height * 0.98),
            hue: hue,
          });
        }

        function spawnRipple(x: number, y: number, hue: number) {
          const reach = param("rippleReach", 220);
          ripples.push({
            x: x,
            y: y,
            r: 0,
            life: 1,
            maxR: p.random(reach * 0.55, reach),
            hue: hue,
          });
          if (ripples.length > MAX_RIPPLES) ripples.shift();
        }

        p.setup = () => {
          const w = p.container ? p.container.clientWidth : 800;
          const h = p.container ? p.container.clientHeight : 800;
          p.createCanvas(w, h);
          p.colorMode(p.HSB, 360, 100, 100, 100);
          p.noStroke();
          buildGrid(param("gridSize", 16));
        };

        p.draw = () => {
          const speed = param("rippleSpeed", 90);
          const density = param("rainDensity", 9);
          const shift = param("colorShift", 0);
          const g = Math.max(8, Math.round(param("gridSize", 16)));

          if (g !== curGrid) buildGrid(g);

          baseHue = (baseHue + 0.35) % 360;
          const dt = Math.min(1 / 30, p.deltaTime / 1000);

          p.background(228, 55, 6);
          p.noStroke();

          // Spawn raindrops
          spawnAcc += density * dt;
          while (spawnAcc >= 1) {
            spawnAcc -= 1;
            spawnDrop();
          }

          // Falling raindrop streaks
          p.strokeWeight(1.4);
          p.stroke(200, 25, 96, 42);
          for (let i = drops.length - 1; i >= 0; i--) {
            const d = drops[i];
            d.y += d.vy;
            if (d.y >= d.target) {
              spawnRipple(d.x, d.target, d.hue);
              drops.splice(i, 1);
              continue;
            }
            p.line(d.x, d.y, d.x, d.y - d.len);
          }
          p.noStroke();

          // Expand ripples
          for (let i = ripples.length - 1; i >= 0; i--) {
            const rp = ripples[i];
            rp.r += speed * dt;
            rp.life = Math.max(0, 1 - rp.r / rp.maxR);
            if (rp.r >= rp.maxR) ripples.splice(i, 1);
          }

          // Dot field lit by passing ripple rings
          const band = curGrid * 1.9;
          for (let k = 0; k < dots.length; k++) {
            const dot = dots[k];
            let best = 0;
            let hue = 0;

            for (let i = 0; i < ripples.length; i++) {
              const rp = ripples[i];
              const dx = dot.x - rp.x;
              const dy = dot.y - rp.y;
              const dist2 = dx * dx + dy * dy;
              const inner = rp.r - band;
              const outer = rp.r + band;
              if (dist2 > outer * outer) continue;
              if (inner > 0 && dist2 < inner * inner) continue;
              const dist = Math.sqrt(dist2);
              const k2 = (1 - Math.abs(dist - rp.r) / band) * rp.life;
              if (k2 > best) {
                best = k2;
                hue = (rp.hue + dist * 0.7 + shift) % 360;
              }
            }

            if (best <= 0.02) {
              p.fill(220, 30, 13, 100);
              p.circle(dot.x, dot.y, Math.max(1.1, curGrid * 0.12));
            } else {
              p.fill(hue, 85, 100, 100);
              p.circle(dot.x, dot.y, curGrid * (0.16 + best * 0.66));
            }
          }

          // Additive glow band for each ripple
          p.blendMode(p.ADD);
          p.noFill();
          p.strokeWeight(curGrid * 0.8);
          for (let i = 0; i < ripples.length; i++) {
            const rp = ripples[i];
            p.stroke((rp.hue + shift + 360) % 360, 55, 100, 9 * rp.life);
            p.circle(rp.x, rp.y, rp.r * 2);
          }
          p.noStroke();
          p.blendMode(p.BLEND);
        };

        p.windowResized = () => {
          if (p.container) {
            p.resizeCanvas(p.container.clientWidth, p.container.clientHeight);
            buildGrid(curGrid);
          }
        };
      },
    };
  }

  return null;
}

