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
  return null;
}
