export function getAlgorithm(slug: string) {
  
  if (slug === 'caustics-webgpu') {
    return {
      wgslCode: `struct Uniforms { resolution: vec2f, time: f32, padding: f32, mouse: vec2f, speed: f32, scale: f32, }
@group(0) @binding(0) var<uniform> u: Uniforms;
@vertex
fn vs_main(@builtin(vertex_index) vertexIndex: u32) -> @builtin(position) vec4f {
  let pos = array(vec2f(-1.0, -1.0), vec2f( 3.0, -1.0), vec2f(-1.0,  3.0));
  return vec4f(pos[vertexIndex], 0.0, 1.0);
}
fn hash22(p: vec2f) -> vec2f {
  var p3 = fract(vec3f(p.xyx) * vec3f(0.1031, 0.1030, 0.0973));
  p3 = p3 + dot(p3, p3.yzx + 33.33);
  return fract((p3.xx + p3.yz) * p3.zy);
}
fn voronoi(x: vec2f, time: f32) -> vec2f {
  let n = floor(x);
  let f = fract(x);
  var m = vec2f(8.0);
  for(var j = -1; j <= 1; j++) {
    for(var i = -1; i <= 1; i++) {
      let g = vec2f(f32(i), f32(j));
      let o = hash22(n + g);
      let pos = 0.5 + 0.5 * sin(time + 6.2831 * o);
      let d = length(g - f + pos);
      if(d < m.x) { m.x = d; m.y = o.x; }
    }
  }
  return m;
}
@fragment
fn fs_main(@builtin(position) fragCoord: vec4f) -> @location(0) vec4f {
  let uv = fragCoord.xy / u.resolution;
  let t = u.time * u.speed * 0.5;
  let mouseOffset = (u.mouse - 0.5) * 2.0;
  var p = (uv - 0.5) * u.scale + mouseOffset;
  p.x *= u.resolution.x / u.resolution.y;
  var v1 = voronoi(p * 2.0 + t, t);
  var v2 = voronoi(p * 4.0 - t * 1.5, t * 1.2);
  var v3 = voronoi(p * 8.0 + vec2f(sin(t), cos(t)), t * 0.8);
  let caustics = pow(1.0 - v1.x, 3.0) + pow(1.0 - v2.x, 2.0) * 0.5 + pow(1.0 - v3.x, 2.0) * 0.25;
  let baseColor = vec3f(0.05, 0.1, 0.2);
  let lightColor = vec3f(0.3, 0.7, 1.0) * caustics;
  let finalColor = baseColor + lightColor;
  return vec4f(finalColor, 1.0);
}`
    };
  }

  if (slug === 'glass-orbs-webgpu') {
    return {
      wgslCode: `struct Uniforms { resolution: vec2f, time: f32, padding: f32, mouse: vec2f, blend: f32, }
@group(0) @binding(0) var<uniform> u: Uniforms;
@vertex
fn vs_main(@builtin(vertex_index) vi: u32) -> @builtin(position) vec4f {
  let pos = array(vec2f(-1.0,-1.0), vec2f(3.0,-1.0), vec2f(-1.0,3.0));
  return vec4f(pos[vi], 0.0, 1.0);
}
fn smin(a: f32, b: f32, k: f32) -> f32 {
  let h = clamp(0.5 + 0.5*(b-a)/k, 0.0, 1.0);
  return mix(b, a, h) - k*h*(1.0-h);
}
fn map(p: vec3f) -> f32 {
  let t = u.time * 0.5;
  let p1 = vec3f(sin(t*1.1)*1.5, cos(t*1.3)*1.5, sin(t*1.5)*1.5);
  let p2 = vec3f(cos(t*1.2)*1.5, sin(t*1.4)*1.5, cos(t*1.6)*1.5);
  let d1 = length(p - p1) - 1.0;
  let d2 = length(p - p2) - 1.0;
  let d3 = length(p) - 1.2;
  return smin(smin(d1, d2, u.blend), d3, u.blend);
}
fn getNormal(p: vec3f) -> vec3f {
  let e = vec2f(0.01, 0.0);
  return normalize(vec3f(
    map(p+e.xyy) - map(p-e.xyy),
    map(p+e.yxy) - map(p-e.yxy),
    map(p+e.yyx) - map(p-e.yyx)
  ));
}
@fragment
fn fs_main(@builtin(position) fragCoord: vec4f) -> @location(0) vec4f {
  let uv = (fragCoord.xy - 0.5*u.resolution) / u.resolution.y;
  var ro = vec3f(0.0, 0.0, -5.0);
  var rd = normalize(vec3f(uv, 1.0));
  
  let mx = (u.mouse.x - 0.5) * 6.28;
  let my = (u.mouse.y - 0.5) * 6.28;
  
  let cx = cos(mx); let sx = sin(mx);
  let cy = cos(my); let sy = sin(my);
  rd = vec3f(rd.x*cx - rd.z*sx, rd.y, rd.x*sx + rd.z*cx);
  ro = vec3f(ro.x*cx - ro.z*sx, ro.y, ro.x*sx + ro.z*cx);
  
  var t = 0.0;
  for(var i=0; i<80; i++) {
    let p = ro + rd * t;
    let d = map(p);
    if(d < 0.001 || t > 20.0) { break; }
    t += d;
  }
  
  var col = vec3f(0.0);
  if(t < 20.0) {
    let p = ro + rd * t;
    let n = getNormal(p);
    let r = reflect(rd, n);
    let env = vec3f(0.5) + vec3f(0.5) * cos(r.xyx * 5.0 + vec3f(u.time));
    let fresnel = pow(1.0 - max(dot(n, -rd), 0.0), 3.0);
    col = mix(vec3f(0.1, 0.3, 0.5), env, fresnel * 0.8 + 0.2);
  }
  
  return vec4f(col, 1.0);
}`
    };
  }
    if (slug === "cosmic-dust-webgpu") return { wgslCode: `struct Uniforms { resolution: vec2f, time: f32, padding: f32, mouse: vec2f, density: f32, }
@group(0) @binding(0) var<uniform> u: Uniforms;
@vertex fn vs_main(@builtin(vertex_index) vi: u32) -> @builtin(position) vec4f {
  let pos = array(vec2f(-1.0,-1.0), vec2f(3.0,-1.0), vec2f(-1.0,3.0));
  return vec4f(pos[vi], 0.0, 1.0);
}
fn hash3(p: vec3f) -> f32 {
  var p3 = fract(p * 0.1031);
  p3 = p3 + dot(p3, p3.zyx + 31.32);
  return fract((p3.x + p3.y) * p3.z);
}
@fragment fn fs_main(@builtin(position) fc: vec4f) -> @location(0) vec4f {
  var uv = (fc.xy - 0.5*u.resolution) / u.resolution.y;
  uv = uv + (u.mouse - 0.5)*0.5;
  var col = vec3f(0.0);
  for(var i=0.0; i<60.0; i+=1.0) {
    let z = fract(i/60.0 - u.time*0.1);
    let size = mix(15.0, 0.1, z);
    let fade = smoothstep(0.0, 0.1, z) * smoothstep(1.0, 0.8, z);
    var p = uv * size;
    let h = hash3(vec3f(floor(p), i));
    if (h > (1.0 - u.density*0.01)) {
      let d = length(fract(p) - 0.5);
      col = col + vec3f(0.5+0.5*sin(i), 0.6+0.4*cos(i*2.0), 1.0) * smoothstep(0.3, 0.0, d) * fade;
    }
  }
  return vec4f(col, 1.0);
}` };
  if (slug === "hyperspace-webgpu") return { wgslCode: `struct Uniforms { resolution: vec2f, time: f32, padding: f32, mouse: vec2f, speed: f32, }
@group(0) @binding(0) var<uniform> u: Uniforms;
@vertex fn vs_main(@builtin(vertex_index) vi: u32) -> @builtin(position) vec4f {
  let pos = array(vec2f(-1.0,-1.0), vec2f(3.0,-1.0), vec2f(-1.0,3.0)); return vec4f(pos[vi], 0.0, 1.0);
}
@fragment fn fs_main(@builtin(position) fc: vec4f) -> @location(0) vec4f {
  let uv = (fc.xy - 0.5*u.resolution) / u.resolution.y + (u.mouse-0.5)*0.2;
  let r = length(uv);
  let a = atan2(uv.y, uv.x);
  let t = u.time * u.speed;
  let streak = sin(a * 20.0 + sin(a*5.0)) * sin(a * 43.0);
  let z = fract(1.0/r + t + streak);
  let col = vec3f(0.5, 0.8, 1.0) * smoothstep(0.9, 1.0, z) * r;
  return vec4f(col, 1.0);
}` };
  if (slug === "voronoi-crystals-webgpu") return { wgslCode: `struct Uniforms { resolution: vec2f, time: f32, padding: f32, mouse: vec2f, }
@group(0) @binding(0) var<uniform> u: Uniforms;
@vertex fn vs_main(@builtin(vertex_index) vi: u32) -> @builtin(position) vec4f {
  let pos = array(vec2f(-1.0,-1.0), vec2f(3.0,-1.0), vec2f(-1.0,3.0)); return vec4f(pos[vi], 0.0, 1.0);
}
fn hash2(p: vec2f) -> vec2f {
  var q = vec2f(dot(p, vec2f(127.1,311.7)), dot(p, vec2f(269.5,183.3)));
  return fract(sin(q)*43758.5453);
}
@fragment fn fs_main(@builtin(position) fc: vec4f) -> @location(0) vec4f {
  var uv = (fc.xy - 0.5*u.resolution) / u.resolution.y;
  uv = uv * 5.0 + u.mouse * 2.0;
  var m = 1.0;
  for(var j=-1; j<=1; j++) {
    for(var i=-1; i<=1; i++) {
      let g = vec2f(f32(i), f32(j));
      let o = hash2(floor(uv) + g);
      let p = g + 0.5 + 0.5*sin(u.time + 6.2831*o) - fract(uv);
      let d = dot(p,p);
      if(d < m) { m = d; }
    }
  }
  let c = sqrt(m);
  return vec4f(c*0.4, c*0.8, c*1.2, 1.0);
}` };

  if (slug === "poseidon-ocean") {
    return {
      wgslCode: `struct Uniforms { resolution: vec2f, time: f32, padding: f32, mouse: vec2f, waveHeight: f32, choppiness: f32, windSpeed: f32, sunElevation: f32, pad1: f32, pad2: f32, }
@group(0) @binding(0) var<uniform> u: Uniforms;

@vertex 
fn vs_main(@builtin(vertex_index) vi: u32) -> @builtin(position) vec4f {
  let pos = array(vec2f(-1.0,-1.0), vec2f(3.0,-1.0), vec2f(-1.0,3.0)); 
  return vec4f(pos[vi], 0.0, 1.0);
}

fn hash21(p: vec2f) -> f32 {
  var p3 = fract(vec3f(p.xyx) * 0.1031);
  p3 += dot(p3, p3.yzx + 33.33);
  return fract((p3.x + p3.y) * p3.z);
}

fn noise(p: vec2f) -> f32 {
  let i = floor(p);
  let f = fract(p);
  let u_smooth = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash21(i + vec2f(0.0, 0.0)), hash21(i + vec2f(1.0, 0.0)), u_smooth.x),
    mix(hash21(i + vec2f(0.0, 1.0)), hash21(i + vec2f(1.0, 1.0)), u_smooth.x),
    u_smooth.y
  );
}

fn sea_octave(uv_in: vec2f, choppy: f32) -> f32 {
  let n = vec2f(noise(uv_in), noise(uv_in + vec2f(1.2, 3.4)));
  var uv = uv_in + n;
  var wv = 1.0 - abs(sin(uv));
  var swv = abs(cos(uv));
  wv = mix(wv, swv, wv);
  return pow(1.0 - pow(wv.x * wv.y, 0.65), choppy);
}

fn map(p: vec3f) -> f32 {
  var freq = 0.16;
  var amp = u.waveHeight * 0.8;
  var choppy = 4.0 * u.choppiness;
  var uv = p.xz;
  var h = 0.0;
  
  let t = u.time * u.windSpeed * 0.8;
  let octMat = mat2x2f(1.6, 1.2, -1.2, 1.6);
  
  for (var i = 0; i < 4; i++) {
    var d = sea_octave((uv + vec2f(t)) * freq, choppy);
    d += sea_octave((uv - vec2f(t)) * freq, choppy);
    h += d * amp;
    uv = octMat * uv;
    freq *= 1.9;
    amp *= 0.22;
    choppy = mix(choppy, 1.0, 0.2);
  }
  return p.y - h;
}

fn map_detailed(p: vec3f) -> f32 {
  var freq = 0.16;
  var amp = u.waveHeight * 0.8;
  var choppy = 4.0 * u.choppiness;
  var uv = p.xz;
  var h = 0.0;
  
  let t = u.time * u.windSpeed * 0.8;
  let octMat = mat2x2f(1.6, 1.2, -1.2, 1.6);
  
  for (var i = 0; i < 7; i++) {
    var d = sea_octave((uv + vec2f(t)) * freq, choppy);
    d += sea_octave((uv - vec2f(t)) * freq, choppy);
    h += d * amp;
    uv = octMat * uv;
    freq *= 1.9;
    amp *= 0.22;
    choppy = mix(choppy, 1.0, 0.2);
  }
  return p.y - h;
}

fn getNormal(p: vec3f, eps: f32) -> vec3f {
  let e = vec2f(eps, 0.0);
  return normalize(vec3f(
    map_detailed(p + e.xyy) - map_detailed(p - e.xyy),
    map_detailed(p + e.yxy) - map_detailed(p - e.yxy),
    map_detailed(p + e.yyx) - map_detailed(p - e.yyx)
  ));
}

fn getSkyColor(rd: vec3f, sunDir: vec3f) -> vec3f {
  let sunDot = max(dot(rd, sunDir), 0.0);
  var sky = vec3f(0.35, 0.6, 0.85) - rd.y * 0.3;
  let horizonHaze = pow(1.0 - max(rd.y, 0.0), 3.0);
  sky = mix(sky, vec3f(0.75, 0.82, 0.92), horizonHaze * 0.8);
  // Sun bloom
  sky += vec3f(1.0, 0.85, 0.6) * pow(sunDot, 500.0) * 3.0;
  sky += vec3f(0.8, 0.6, 0.4) * pow(sunDot, 20.0) * 0.5;
  return max(sky, vec3f(0.0));
}

@fragment 
fn fs_main(@builtin(position) fc: vec4f) -> @location(0) vec4f {
  var uv = (fc.xy - 0.5 * u.resolution) / u.resolution.y;
  uv.y = -uv.y;
  
  let mouseOffset = (u.mouse - 0.5) * 2.0;
  var ro = vec3f(0.0, 4.5, u.time * 2.0 * u.windSpeed);
  var rd = normalize(vec3f(uv.x, uv.y - 0.3 + mouseOffset.y * 0.4, 1.2));
  
  let mx = mouseOffset.x * 0.5;
  let cx = cos(mx); let sx = sin(mx);
  rd = vec3f(rd.x * cx - rd.z * sx, rd.y, rd.x * sx + rd.z * cx);
  
  let sunElevation = clamp(u.sunElevation, 0.05, 0.95);
  let sunDir = normalize(vec3f(0.0, sunElevation, 1.0));
  let skyCol = getSkyColor(rd, sunDir);
  var col = skyCol;
  
  // Raymarch
  var t = 0.0;
  var p = vec3f(0.0);
  for (var i = 0; i < 90; i++) {
    p = ro + rd * t;
    let d = map(p);
    if (d < 0.005 || t > 140.0) { break; }
    t += d * 0.4;
  }
  
  if (t < 140.0) {
    let n = getNormal(p, 0.003 + t * 0.0008);
    let viewDir = -rd;
    let refl = reflect(rd, n);
    
    // Fresnel
    let fresnel = 0.02 + 0.98 * pow(1.0 - max(dot(n, viewDir), 0.0), 5.0);
    
    // Water scattering
    let deepSea = vec3f(0.03, 0.09, 0.18);
    let waveCrestColor = vec3f(0.08, 0.45, 0.55);
    
    // SSS (Translucent wave ridges)
    let sss = pow(max(dot(viewDir, -sunDir + n * 0.5), 0.0), 2.5) * pow(clamp(1.0 - n.y, 0.0, 1.0), 2.0);
    let waterColor = mix(deepSea, waveCrestColor, sss * 0.9 + 0.15 * n.y);
    
    // Sky reflection
    let refSky = getSkyColor(refl, sunDir);
    
    // Sun specular glints
    let halfVec = normalize(viewDir + sunDir);
    let NdotH = max(dot(n, halfVec), 0.0);
    let specular = pow(NdotH, 400.0) * 3.5 + pow(NdotH, 40.0) * 0.4;
    let sunSpecular = vec3f(1.0, 0.95, 0.85) * specular;
    
    // White foam on sharp peaks
    let foam = smoothstep(0.6 * u.waveHeight, 1.1 * u.waveHeight, p.y) * smoothstep(0.55, 0.85, 1.0 - n.y);
    let foamColor = vec3f(0.9, 0.95, 1.0) * foam * 0.8;
    
    col = mix(waterColor, refSky, fresnel) + sunSpecular + foamColor;
    
    // Distance fog fade
    let fog = exp(-pow(t * 0.012, 1.4));
    col = mix(skyCol, col, fog);
  }
  
  // Filmic curve
  col = (col * (2.51 * col + vec3f(0.03))) / (col * (2.43 * col + vec3f(0.59)) + vec3f(0.14));
  col = clamp(col, vec3f(0.0), vec3f(1.0));
  
  let vignette = 1.0 - smoothstep(0.6, 1.5, length(uv));
  col = col * vignette;
  
  return vec4f(col, 1.0);
}`
    };
  }

  return null;
}
