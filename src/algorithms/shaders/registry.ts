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
  return null;
}
