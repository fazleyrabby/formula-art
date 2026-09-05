export function getAlgorithm(slug: string) {
  
  if (slug === 'raymarch-shader') {
    return {
      fragmentShader: `#version 300 es
precision highp float;
uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;
out vec4 fragColor;

#define R u_resolution.xy

mat2 rot(float a) { float s=sin(a),c=cos(a); return mat2(c,-s,s,c); }

void main() {
    vec2 uv = (gl_FragCoord.xy - .5*R) / R.y;
    vec2 m = u_mouse * 2.0 - 1.0;
    vec3 ro = vec3(0, 0, -3);
    vec3 rd = normalize(vec3(uv, 1.0));
    
    rd.yz *= rot(m.y * 3.14);
    rd.xz *= rot(m.x * 3.14);
    ro.yz *= rot(m.y * 3.14);
    ro.xz *= rot(m.x * 3.14);
    
    float t = 0., d = 0.;
    for(int i=0; i<80; i++) {
        vec3 p = ro + rd * t;
        p.z += u_time;
        p = mod(p, 2.0) - 1.0;
        p.xy *= rot(p.z + u_time * 0.5);
        d = length(p.xy) - 0.2;
        if(d < 0.001 || t > 20.) break;
        t += d;
    }
    
    vec3 col = vec3(0);
    if (t < 20.) {
        float fog = 1.0 / (1.0 + t*t*0.1);
        col = vec3(0.5, 0.2, 0.8) * fog + vec3(0.2, 0.5, 0.9) * (t*0.05);
    }
    
    fragColor = vec4(col, 1.0);
}`
    };
  }
    if (slug === "menger-sponge-shader") return { fragmentShader: `#version 300 es
precision highp float; uniform vec2 u_resolution; uniform vec2 u_mouse; uniform float u_time; out vec4 f;
mat2 rot(float a){float s=sin(a),c=cos(a);return mat2(c,-s,s,c);}
float sdBox(vec3 p, vec3 b){vec3 d=abs(p)-b;return length(max(d,0.)) + min(max(d.x,max(d.y,d.z)),0.);}
float map(vec3 p) {
    float d = sdBox(p,vec3(1.));
    float s = 1.0;
    for(int m=0; m<4; m++){
        vec3 a = mod(p*s, 2.0)-1.0;
        s *= 3.0;
        vec3 r = abs(1.0 - 3.0*abs(a));
        float da = max(r.x,r.y);
        float db = max(r.y,r.z);
        float dc = max(r.z,r.x);
        float c = (min(da,min(db,dc))-1.0)/s;
        d = max(d,c);
    }
    return d;
}
void main() {
    vec2 uv = (gl_FragCoord.xy-.5*u_resolution)/u_resolution.y;
    vec3 ro = vec3(0,0,-2.5); vec3 rd = normalize(vec3(uv,1));
    vec2 m = (u_mouse-.5)*3.; rd.yz*=rot(m.y); rd.xz*=rot(m.x); ro.yz*=rot(m.y); ro.xz*=rot(m.x);
    float t=0.; for(int i=0;i<100;i++){float d=map(ro+rd*t);if(d<0.001||t>10.)break;t+=d;}
    f = vec4(vec3(1.-t*0.2)*vec3(0.8,0.9,1.0), 1.0);
}` };
  if (slug === "flow-field-shader") return { fragmentShader: `#version 300 es
precision highp float; uniform vec2 u_resolution; uniform vec2 u_mouse; uniform float u_time; out vec4 f;
vec2 hash(vec2 p) { p=vec2(dot(p,vec2(127.1,311.7)),dot(p,vec2(269.5,183.3))); return -1.+2.*fract(sin(p)*43758.5453123); }
float noise(vec2 p) {
    vec2 i = floor(p), f = fract(p), u = f*f*(3.-2.*f);
    return mix(mix(dot(hash(i+vec2(0,0)),f-vec2(0,0)),dot(hash(i+vec2(1,0)),f-vec2(1,0)),u.x),
               mix(dot(hash(i+vec2(0,1)),f-vec2(0,1)),dot(hash(i+vec2(1,1)),f-vec2(1,1)),u.x),u.y);
}
void main() {
    vec2 uv = gl_FragCoord.xy/u_resolution.y;
    vec2 m = u_mouse;
    vec2 p = uv * 3.0;
    for(int i=0; i<4; i++) {
        p += vec2(noise(p + u_time*0.1), noise(p.yx - u_time*0.1)) * 0.5;
    }
    float lines = sin(p.x * 20.0 + m.x*10.) * sin(p.y * 20.0 + m.y*10.);
    f = vec4(vec3(smoothstep(0.0, 0.1, abs(lines))), 1.0);
}` };
  if (slug === "cyber-lattice-shader") return { fragmentShader: `#version 300 es
precision highp float; uniform vec2 u_resolution; uniform vec2 u_mouse; uniform float u_time; out vec4 f;
mat2 rot(float a){return mat2(cos(a),-sin(a),sin(a),cos(a));}
void main() {
    vec2 uv = (gl_FragCoord.xy-.5*u_resolution)/u_resolution.y;
    vec3 ro = vec3(0,0,-3), rd = normalize(vec3(uv,1));
    rd.xz *= rot(u_time*.2 + u_mouse.x*2.); rd.yz *= rot(u_mouse.y*2.);
    float t=0.; vec3 c=vec3(0);
    for(int i=0; i<60; i++){
        vec3 p = ro + rd*t;
        p = mod(p, 2.0)-1.0;
        float d = min(min(length(p.xy), length(p.yz)), length(p.zx)) - 0.05;
        if(d<0.01) { c += vec3(0.1, 0.8, 0.5)*0.05; }
        t += max(d, 0.02);
    }
    f = vec4(c, 1.0);
}` };
  if (slug === "noise-terrain-shader") return { fragmentShader: `#version 300 es
precision highp float; uniform vec2 u_resolution; uniform vec2 u_mouse; uniform float u_time; out vec4 f;
float hash(vec2 p){return fract(sin(dot(p,vec2(12.9898,78.233)))*43758.5453);}
float noise(vec2 p){vec2 i=floor(p),f=fract(p),u=f*f*(3.-2.*f);return mix(mix(hash(i),hash(i+vec2(1,0)),u.x),mix(hash(i+vec2(0,1)),hash(i+vec2(1,1)),u.x),u.y);}
float fbm(vec2 p){float v=0.,a=.5;for(int i=0;i<5;i++){v+=a*noise(p);p*=2.;a*=.5;}return v;}
void main(){
    vec2 uv = gl_FragCoord.xy/u_resolution.y;
    float h = fbm(uv*5.0 + u_time*0.2);
    vec2 e = vec2(0.01,0);
    vec3 n = normalize(vec3(fbm(uv*5.+e.xy)-h, fbm(uv*5.+e.yx)-h, 0.05));
    vec3 l = normalize(vec3(u_mouse - gl_FragCoord.xy/u_resolution.xy, 0.5));
    float diff = max(dot(n,l), 0.0);
    f = vec4(vec3(0.2,0.6,0.3)*h + vec3(diff*0.5), 1.0);
}` };
  if (slug === "orbitals-shader") {
    return {
      fragmentShader: `#version 300 es
precision highp float;

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;
out vec4 fragColor;

#define PI 3.14159265358979323846
#define TWO_PI 6.28318530717958647692

mat2 rot(float a) {
    float c = cos(a), s = sin(a);
    return mat2(c, -s, s, c);
}

float sdRing(vec3 p, float rInner, float rOuter, float th) {
    float r = length(p.xz);
    float dRad = max(rInner - r, r - rOuter);
    return max(abs(p.y) - th, dRad);
}

float sdTorus(vec3 p, float R, float r) {
    vec2 q = vec2(length(p.xz) - R, p.y);
    return length(q) - r;
}

float dfLine(vec2 p, vec2 a, vec2 b) {
    vec2 pa = p - a, ba = b - a;
    float h = clamp(dot(pa, ba) / dot(ba, ba), 0.0, 1.0);
    return length(pa - ba * h);
}

vec4 map(vec3 p, float t) {
    float minDist = 1e5;
    float matId = 0.0;
    float u1 = 0.0;
    float u2 = 0.0;

    // 1. Black Satellite Orbs placed at orbital coordinates
    vec3 sats[6];
    sats[0] = vec3(0.92, 0.90, 0.22);
    sats[1] = vec3(-0.95, -0.78, 0.30);
    sats[2] = vec3(0.85, -0.85, -0.28);
    sats[3] = vec3(-0.40, 1.38, -0.15);
    sats[4] = vec3(0.12, -1.38, 0.35);
    sats[5] = vec3(-1.18, 0.42, -0.45);

    float dSph = 1e5;
    for(int i = 0; i < 6; i++) {
        float rSph = (i % 2 == 0) ? 0.052 : 0.042;
        dSph = min(dSph, length(p - sats[i]) - rSph);
    }
    if (dSph < minDist) {
        minDist = dSph;
        matId = 5.0;
    }

    // 2. Tilted 3D Orbital Rings
    vec3 pA = p;
    pA.yz *= rot(0.52);
    pA.xz *= rot(-0.38);
    float dRingA = sdRing(pA, 1.42, 1.48, 0.009);
    if (dRingA < minDist) {
        minDist = dRingA;
        matId = 3.0;
        u1 = atan(pA.z, pA.x);
        u2 = length(pA.xz);
    }

    vec3 pB = p;
    pB.xy *= rot(0.44);
    pB.yz *= rot(-0.62);
    float dRingB = sdRing(pB, 1.06, 1.15, 0.007);
    if (dRingB < minDist) {
        minDist = dRingB;
        matId = 3.0;
        u1 = atan(pB.z, pB.x) * 1.5;
        u2 = length(pB.xz);
    }

    vec3 pC = p;
    pC.xz *= rot(0.82);
    pC.yz *= rot(0.30);
    float dRingC = sdTorus(pC, 0.88, 0.017);
    float angC = atan(pC.z, pC.x);
    if (angC > -1.8 && angC < 1.4) {
        if (dRingC < minDist) {
            minDist = dRingC;
            matId = 4.0;
            u1 = angC;
        }
    }

    // 3. Sweeping Parametric Ribbon Shells (Architectural Wings)
    vec3 pRib = p;
    pRib.xz *= rot(t * 0.08);
    pRib.yz *= rot(sin(t * 0.06) * 0.14);

    float rRad = length(pRib.xz);
    float phi = atan(pRib.z, pRib.x);

    float fold = sin(phi * 3.0 + pRib.y * 1.8) * 0.38 + cos(phi * 2.0 - pRib.y * 2.2) * 0.26;
    float shellD = abs(rRad - (1.14 + fold)) - 0.026;
    shellD = max(shellD, abs(pRib.y) - 1.08);

    float cutMask = sin(phi * 2.0 + pRib.y * 0.8) - 0.12;
    shellD = max(shellD, -cutMask * 0.45);

    vec3 pRib2 = p;
    pRib2.xy *= rot(0.68 + t * 0.05);
    pRib2.yz *= rot(0.42);
    float gyroid = abs(dot(sin(pRib2 * 1.85), cos(pRib2.zxy * 1.85))) - 0.058;
    float shellGyroid = max(gyroid / 1.85, length(pRib2) - 1.44);

    float dRibbons = min(shellD, shellGyroid);
    if (dRibbons < minDist) {
        minDist = dRibbons;
        matId = 1.0;
        u1 = phi;
        u2 = pRib.y;
    }

    // 4. Dense Entangled Core Tubes
    vec3 pCore = p;
    pCore.xz *= rot(t * 0.12);
    pCore.xy *= rot(sin(t * 0.09) * 0.22);

    float coreBound = length(pCore) - 0.90;
    if (coreBound < minDist + 0.12) {
        vec3 pTw = pCore;
        pTw.xy *= rot(pTw.z * 1.6);
        pTw.yz *= rot(pTw.x * 1.6);

        float tubeSDF = abs(sin(pTw.x * 4.4) * cos(pTw.y * 4.4) + sin(pTw.y * 4.4) * cos(pTw.z * 4.4) + sin(pTw.z * 4.4) * cos(pTw.x * 4.4)) - 0.24;
        tubeSDF = max(tubeSDF / 4.4, coreBound);

        float rTor = length(pCore.xz) - 0.46;
        float coilAngle = atan(pCore.z, pCore.x) * 6.0 + t * 0.75;
        vec2 coilP = vec2(rTor, pCore.y) - vec2(cos(coilAngle), sin(coilAngle)) * 0.13;
        float dCoil = length(coilP) - 0.038;

        float dDenseTubes = min(tubeSDF, dCoil);
        if (dDenseTubes < minDist) {
            minDist = dDenseTubes;
            matId = 2.0;
            u1 = length(pCore);
            u2 = coilAngle;
        }
    }

    return vec4(minDist, matId, u1, u2);
}

vec3 calcNormal(vec3 p, float t) {
    const float eps = 0.0018;
    vec2 h = vec2(eps, 0.0);
    return normalize(vec3(
        map(p + h.xyy, t).x - map(p - h.xyy, t).x,
        map(p + h.yxy, t).x - map(p - h.yxy, t).x,
        map(p + h.yyx, t).x - map(p - h.yyx, t).x
    ));
}

float calcAO(vec3 p, vec3 n, float t) {
    float occ = 0.0;
    float sca = 1.0;
    for(int i = 0; i < 5; i++) {
        float h = 0.02 + 0.13 * float(i) / 4.0;
        float d = map(p + h * n, t).x;
        occ += (h - d) * sca;
        sca *= 0.70;
    }
    return clamp(1.0 - 2.9 * occ, 0.0, 1.0);
}

void main() {
    vec2 uv = (gl_FragCoord.xy - 0.5 * u_resolution.xy) / min(u_resolution.x, u_resolution.y);
    vec2 mouse = (u_mouse - 0.5) * 2.0;
    float time = u_time * 0.4;

    vec3 ro = vec3(0.0, 0.0, 3.25);
    vec3 rd = normalize(vec3(uv, -1.85));

    mat2 rotY = rot(mouse.x * 2.8 + sin(time * 0.25) * 0.35);
    mat2 rotX = rot(-mouse.y * 1.8 + cos(time * 0.2) * 0.2);
    ro.yz *= rotX; ro.xz *= rotY;
    rd.yz *= rotX; rd.xz *= rotY;

    float vignette = 1.0 - 0.22 * dot(uv, uv);
    vec3 paperCol = vec3(0.915, 0.915, 0.925) * vignette;

    float rUV = length(uv);
    float ringGuide1 = smoothstep(0.003, 0.0, abs(rUV - 0.42));
    float ringGuide2 = smoothstep(0.003, 0.0, abs(rUV - 0.48));
    float ringGuide3 = smoothstep(0.002, 0.0, abs(rUV - 0.25));
    paperCol = mix(paperCol, vec3(0.78, 0.80, 0.84), (ringGuide1 * 0.4 + ringGuide2 * 0.35 + ringGuide3 * 0.25));

    float uvAng = atan(uv.y, uv.x);
    if (rUV > 0.415 && rUV < 0.425) {
        if (fract(uvAng * 64.0 / TWO_PI) < 0.28) {
            paperCol = mix(paperCol, vec3(0.55, 0.58, 0.62), 0.6);
        }
    }

    vec2 cPts[6];
    cPts[0] = vec2(0.38, 0.36);
    cPts[1] = vec2(-0.39, -0.32);
    cPts[2] = vec2(0.35, -0.35);
    cPts[3] = vec2(-0.16, 0.44);
    cPts[4] = vec2(0.05, -0.45);
    cPts[5] = vec2(-0.44, 0.17);

    float lineAcc = 0.0;
    lineAcc += smoothstep(0.0018, 0.0, dfLine(uv, cPts[0], cPts[2]));
    lineAcc += smoothstep(0.0018, 0.0, dfLine(uv, cPts[2], cPts[4]));
    lineAcc += smoothstep(0.0018, 0.0, dfLine(uv, cPts[4], cPts[1]));
    lineAcc += smoothstep(0.0018, 0.0, dfLine(uv, cPts[1], cPts[5]));
    lineAcc += smoothstep(0.0018, 0.0, dfLine(uv, cPts[5], cPts[3]));
    lineAcc += smoothstep(0.0018, 0.0, dfLine(uv, cPts[3], cPts[0]));
    lineAcc += smoothstep(0.0015, 0.0, dfLine(uv, cPts[3], cPts[4]));
    paperCol = mix(paperCol, vec3(0.68, 0.70, 0.74), clamp(lineAcc * 0.5, 0.0, 1.0));

    for(int i = 0; i < 6; i++) {
        float dDot = length(uv - cPts[i]);
        if (dDot < 0.013) {
            paperCol = vec3(0.12, 0.13, 0.16);
            if (dDot < 0.004) paperCol = vec3(0.96);
        }
    }

    float tDist = 0.0;
    float maxDist = 7.0;
    vec4 hitData = vec4(0.0);
    bool hit = false;

    for(int i = 0; i < 85; i++) {
        vec3 p = ro + rd * tDist;
        hitData = map(p, time);
        float d = hitData.x;
        if (d < 0.002) {
            hit = true;
            break;
        }
        if (tDist > maxDist) break;
        tDist += d * 0.82;
    }

    vec3 col = paperCol;

    if (hit) {
        vec3 pos = ro + rd * tDist;
        vec3 nor = calcNormal(pos, time);
        float matId = hitData.y;
        float u1 = hitData.z;
        float u2 = hitData.w;

        vec3 keyLight = normalize(vec3(1.2, 2.0, 1.4));
        vec3 fillLight = normalize(vec3(-1.0, -1.2, -0.8));
        float diff1 = max(dot(nor, keyLight), 0.0);
        float diff2 = max(dot(nor, fillLight), 0.0) * 0.35;
        float diff = diff1 * 0.75 + diff2 + 0.15;

        float ao = calcAO(pos, nor, time);
        float fresnel = pow(1.0 - max(dot(-rd, nor), 0.0), 3.0);

        if (matId == 1.0) {
            vec3 basePlaster = vec3(0.86, 0.87, 0.89);
            float iso1 = abs(fract(pos.y * 32.0 + u1 * 4.0) - 0.5);
            float iso2 = abs(fract(u1 * 14.0 / PI) - 0.5);
            float wireLine1 = smoothstep(0.06, 0.11, iso1);
            float wireLine2 = smoothstep(0.05, 0.10, iso2);
            float wireMask = min(wireLine1, wireLine2);

            vec3 ribbonCol = mix(vec3(0.18, 0.20, 0.24), basePlaster, wireMask);
            float beadDist = length(vec2(iso1 - 0.5, iso2 - 0.5));
            if (beadDist < 0.22) {
                ribbonCol = vec3(0.98, 0.98, 1.0) * (diff1 * 0.4 + 0.65);
                if (beadDist > 0.17) ribbonCol = vec3(0.15, 0.16, 0.20);
            }
            col = ribbonCol * diff * ao + fresnel * vec3(0.15);
        }
        else if (matId == 2.0) {
            vec3 cordCol = vec3(0.24, 0.26, 0.30);
            vec3 beadP = fract(pos * 14.0) - 0.5;
            float pDist = length(beadP);
            if (pDist < 0.24) {
                cordCol = vec3(0.96, 0.97, 1.0) * (diff1 * 0.4 + 0.6);
                if (pDist > 0.19) cordCol = vec3(0.12, 0.14, 0.18);
            } else {
                float ribs = sin(pos.y * 50.0 + pos.x * 30.0);
                cordCol *= (0.8 + 0.2 * ribs);
            }
            col = cordCol * (diff * 0.8 + 0.2) * ao;
        }
        else if (matId == 3.0) {
            vec3 ringCol = vec3(0.10, 0.11, 0.14);
            float tickPattern = fract(u1 * 54.0 / TWO_PI);
            if (tickPattern < 0.32) ringCol = vec3(0.85, 0.88, 0.92);
            col = ringCol * diff * ao;
        }
        else if (matId == 4.0) {
            col = vec3(0.98, 0.98, 1.0);
        }
        else if (matId == 5.0) {
            vec3 spec = pow(max(dot(nor, normalize(keyLight - rd)), 0.0), 24.0) * vec3(0.6);
            col = vec3(0.08, 0.09, 0.11) * ao + spec;
        }

        float fog = smoothstep(2.5, 6.0, tDist);
        col = mix(col, paperCol, fog * 0.45);
    }

    fragColor = vec4(col, 1.0);
}
`
    };
  }

  if (slug === "tsubuyaki-fractal-shader") {
    return {
      fragmentShader: `#version 300 es
precision highp float;

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;
out vec4 fragColor;

mat2 rotate2D(float a) {
    float c = cos(a), s = sin(a);
    return mat2(c, -s, s, c);
}

mat3 rotate3D(float angle, vec3 axis) {
    vec3 a = normalize(axis);
    float s = sin(angle);
    float c = cos(angle);
    float oc = 1.0 - c;
    
    return mat3(
        oc * a.x * a.x + c,        oc * a.x * a.y - a.z * s,  oc * a.z * a.x + a.y * s,
        oc * a.x * a.y + a.z * s,  oc * a.y * a.y + c,        oc * a.y * a.z - a.x * s,
        oc * a.z * a.x - a.y * s,  oc * a.y * a.z + a.x * s,  oc * a.z * a.z + c
    );
}

void main() {
    vec2 r = u_resolution.xy;
    vec2 FC = gl_FragCoord.xy;
    float t = u_time;
    vec4 o = vec4(0.0);
    
    vec2 m = (u_mouse - 0.5) * 2.0;
    vec3 rotAxis = vec3(1.0, 1.5 * smoothstep(-1.0, 1.0, sin(t * 0.4)) - 0.5, 0.0);
    mat3 rotMat = rotate3D(1.5707963, rotAxis);
    mat2 rotZY = rotate2D(t * 0.2 + m.y * 1.2);
    mat2 rotXZ = rotate2D(m.x * 1.5);

    float g = 0.0;
    for (int i = 0; i < 45; i++) {
        vec3 p = vec3((FC - r * 0.5) / r.y * g, g - 4.3);
        p.zy *= rotZY;
        p.xz *= rotXZ;
        
        for (int j = 0; j < 6; j++) {
            p = rotMat * p;
            p = abs(p + p) - 2.0;
        }
        
        float e = (length(vec2(length(p.xz) - 2.0, (p.y - p.x) * 0.7)) - 0.6) / 800.0;
        g += max(e, 0.02);
        if (g > 10.0) break;
        
        float glow = exp(-max(e, 0.0) * 1800.0) / 35.0;
        vec3 tint = vec3(
            0.5 + 0.5 * cos(6.28318 * (0.0 + glow * 1.2 + t * 0.05)),
            0.5 + 0.5 * cos(6.28318 * (0.33 + glow * 1.2 + t * 0.05)),
            0.5 + 0.5 * cos(6.28318 * (0.67 + glow * 1.2 + t * 0.05))
        );
        o.rgb += glow * (vec3(0.8, 0.9, 1.2) + tint * 0.4);
    }
    
    vec2 uv = (FC - 0.5 * r) / r.y;
    o.rgb *= 1.0 - 0.22 * dot(uv, uv);
    o.rgb = o.rgb / (1.0 + o.rgb);
    o.a = 1.0;
    
    fragColor = o;
}
`
    };
  }

  return null;
}
