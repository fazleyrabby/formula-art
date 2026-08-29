import type { ParameterState } from '../types/engine';

export interface ShaderEngineOptions {
  canvas: HTMLCanvasElement;
  fragmentShader: string;
  vertexShader?: string;
  initialParams?: ParameterState;
  onFpsUpdate?: (fps: number) => void;
}

const DEFAULT_VERTEX_SHADER = `#version 300 es
in vec4 a_position;
out vec2 v_uv;
void main() {
  gl_Position = a_position;
  v_uv = a_position.xy * 0.5 + 0.5;
}
`;

export class ShaderEngine {
  private canvas: HTMLCanvasElement;
  private gl: WebGL2RenderingContext | null = null;
  private program: WebGLProgram | null = null;
  
  private params: ParameterState;
  
  private animationFrameId: number | null = null;
  private isRunning = false;
  
  private startTime = 0;
  private onFpsUpdate?: (fps: number) => void;
  
  private width = 400;
  private height = 400;
  private dpr = 1;
  private resizeObserver: ResizeObserver | null = null;
  
  // Uniform locations
  private uTimeLoc: WebGLUniformLocation | null = null;
  private uResolutionLoc: WebGLUniformLocation | null = null;
  private uMouseLoc: WebGLUniformLocation | null = null;
  
  private mouseX = 0;
  private mouseY = 0;
  
  constructor(options: ShaderEngineOptions) {
    this.canvas = options.canvas;
    this.params = { ...options.initialParams };
    this.onFpsUpdate = options.onFpsUpdate;
    this.init(options.vertexShader || DEFAULT_VERTEX_SHADER, options.fragmentShader);
  }

  private init(vsSource: string, fsSource: string) {
    this.updateDimensions();
    
    this.gl = this.canvas.getContext('webgl2', { alpha: false, antialias: false });
    if (!this.gl) {
      console.error('WebGL2 not supported');
      return;
    }
    
    const vertexShader = this.compileShader(this.gl.VERTEX_SHADER, vsSource);
    const fragmentShader = this.compileShader(this.gl.FRAGMENT_SHADER, fsSource);
    
    if (!vertexShader || !fragmentShader) return;
    
    this.program = this.gl.createProgram();
    if (!this.program) return;
    
    this.gl.attachShader(this.program, vertexShader);
    this.gl.attachShader(this.program, fragmentShader);
    this.gl.linkProgram(this.program);
    
    if (!this.gl.getProgramParameter(this.program, this.gl.LINK_STATUS)) {
      console.error(this.gl.getProgramInfoLog(this.program));
      return;
    }
    
    // Set up full screen quad
    const positionBuffer = this.gl.createBuffer();
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, positionBuffer);
    const positions = [
      -1.0, -1.0,
       1.0, -1.0,
      -1.0,  1.0,
      -1.0,  1.0,
       1.0, -1.0,
       1.0,  1.0,
    ];
    this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(positions), this.gl.STATIC_DRAW);
    
    const positionAttributeLocation = this.gl.getAttribLocation(this.program, 'a_position');
    this.gl.enableVertexAttribArray(positionAttributeLocation);
    this.gl.vertexAttribPointer(positionAttributeLocation, 2, this.gl.FLOAT, false, 0, 0);
    
    this.uTimeLoc = this.gl.getUniformLocation(this.program, 'u_time');
    this.uResolutionLoc = this.gl.getUniformLocation(this.program, 'u_resolution');
    this.uMouseLoc = this.gl.getUniformLocation(this.program, 'u_mouse');
    
    this.setupResizeObserver();
    this.setupMouseEvents();
  }

  private setupMouseEvents() {
    this.canvas.addEventListener('mousemove', (e) => {
      const rect = this.canvas.getBoundingClientRect();
      // Normalize to 0.0 - 1.0 (with y=0 at bottom usually in GLSL, but let's pass 0-1 from top-left and let shader handle it, or y-flip here: 1.0 - y/h)
      this.mouseX = (e.clientX - rect.left) / rect.width;
      this.mouseY = 1.0 - ((e.clientY - rect.top) / rect.height);
    });
    this.canvas.addEventListener('touchmove', (e) => {
      if (e.touches.length > 0) {
        const rect = this.canvas.getBoundingClientRect();
        this.mouseX = (e.touches[0].clientX - rect.left) / rect.width;
        this.mouseY = 1.0 - ((e.touches[0].clientY - rect.top) / rect.height);
      }
    }, { passive: true });
  }

  private compileShader(type: number, source: string) {
    if (!this.gl) return null;
    const shader = this.gl.createShader(type);
    if (!shader) return null;
    
    this.gl.shaderSource(shader, source);
    this.gl.compileShader(shader);
    
    if (!this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS)) {
      console.error(this.gl.getShaderInfoLog(shader));
      this.gl.deleteShader(shader);
      return null;
    }
    return shader;
  }

  private updateDimensions() {
    const rect = this.canvas.getBoundingClientRect();
    this.width = Math.max(10, Math.floor(rect.width));
    this.height = Math.max(10, Math.floor(rect.height));
    this.dpr = Math.min(window.devicePixelRatio || 1, 2);
    
    this.canvas.width = Math.floor(this.width * this.dpr);
    this.canvas.height = Math.floor(this.height * this.dpr);
    
    if (this.gl) {
      this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);
    }
  }

  private setupResizeObserver() {
    if (typeof ResizeObserver !== 'undefined') {
      this.resizeObserver = new ResizeObserver(() => {
        this.updateDimensions();
      });
      this.resizeObserver.observe(this.canvas);
    }
  }

  public start() {
    if (this.isRunning) return;
    this.isRunning = true;
    this.startTime = performance.now();
    this.loop(this.startTime);
  }

  public stop() {
    this.isRunning = false;
    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
  }

  private loop = (now: number) => {
    if (!this.isRunning) return;
    this.animationFrameId = requestAnimationFrame(this.loop);
    
    if (!this.gl || !this.program) return;
    
    const elapsedTime = (now - this.startTime) / 1000.0;
    
    this.gl.useProgram(this.program);
    this.gl.uniform1f(this.uTimeLoc, elapsedTime);
    this.gl.uniform2f(this.uResolutionLoc, this.canvas.width, this.canvas.height);
    this.gl.uniform2f(this.uMouseLoc, this.mouseX, this.mouseY);
    
    // Set custom params uniformly (assuming float for simplicity here)
    for (const [key, val] of Object.entries(this.params)) {
       if (typeof val === 'number') {
         const loc = this.gl.getUniformLocation(this.program, key);
         if (loc) this.gl.uniform1f(loc, val);
       }
    }
    
    this.gl.drawArrays(this.gl.TRIANGLES, 0, 6);
  };

  public setParams(newParams: ParameterState) {
    this.params = { ...this.params, ...newParams };
  }

  public getParams(): ParameterState {
    return { ...this.params };
  }

  public destroy() {
    this.stop();
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }
  }
}
