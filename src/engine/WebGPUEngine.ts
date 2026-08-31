import type { ParameterState } from '../types/engine';
import { getSharedWebGPUDevice } from './WebGPUContext';

export interface WebGPUEngineOptions {
  canvas: HTMLCanvasElement;
  wgslCode: string;
  initialParams?: ParameterState;
  onFpsUpdate?: (fps: number) => void;
  maxDpr?: number;
}

export class WebGPUEngine {
  private canvas: HTMLCanvasElement;
  private wgslCode: string;
  private params: ParameterState;
  
  private device: GPUDevice | null = null;
  private context: GPUCanvasContext | null = null;
  private pipeline: GPURenderPipeline | null = null;
  
  private uniformBuffer: GPUBuffer | null = null;
  private uniformBindGroup: GPUBindGroup | null = null;
  
  private animationFrameId: number | null = null;
  private isRunning = false;
  
  private startTime = 0;
  private frameCount = 0;
  private lastFrameTime = 0;
  private fpsBuffer: number[] = [];
  private onFpsUpdate?: (fps: number) => void;
  
  private width = 400;
  private height = 400;
  private dpr = 1;
  private maxDpr: number;
  private resizeObserver: ResizeObserver | null = null;
  
  private mouseX = 0;
  private mouseY = 0;

  private errorDiv: HTMLDivElement | null = null;
  private uniformData = new Float32Array(64);

  constructor(options: WebGPUEngineOptions) {
    this.canvas = options.canvas;
    this.wgslCode = options.wgslCode;
    this.params = { ...options.initialParams };
    this.onFpsUpdate = options.onFpsUpdate;
    this.maxDpr = options.maxDpr ?? 2;

    // Create an error overlay
    this.errorDiv = document.createElement('div');
    this.errorDiv.style.position = 'absolute';
    this.errorDiv.style.top = '0';
    this.errorDiv.style.left = '0';
    this.errorDiv.style.width = '100%';
    this.errorDiv.style.height = '100%';
    this.errorDiv.style.backgroundColor = 'rgba(255, 0, 0, 0.9)';
    this.errorDiv.style.color = 'white';
    this.errorDiv.style.padding = '20px';
    this.errorDiv.style.fontFamily = 'monospace';
    this.errorDiv.style.whiteSpace = 'pre-wrap';
    this.errorDiv.style.zIndex = '9999';
    this.errorDiv.style.display = 'none';
    this.errorDiv.style.overflow = 'auto';
    this.canvas.parentElement?.appendChild(this.errorDiv);

    // Listen for unhandled errors (often where WebGPU reports compilation failures)
    window.addEventListener('unhandledrejection', this.handleError);

    this.init();
  }

  private handleError = (event: PromiseRejectionEvent) => {
    if (this.errorDiv) {
      this.errorDiv.style.display = 'block';
      this.errorDiv.textContent += `\n[WebGPU Error]: ${event.reason?.message || event.reason}`;
    }
  };

  private async init() {
    this.updateDimensions();
    
    if (!navigator.gpu) {
      console.error('WebGPU not supported on this browser.');
      return;
    }
    
    this.device = await getSharedWebGPUDevice();
    if (!this.device) {
      this.showError('WebGPU could not initialize on this device.');
      return;
    }
    this.context = this.canvas.getContext('webgpu');
    if (!this.context) return;
    
    const presentationFormat = navigator.gpu.getPreferredCanvasFormat();
    this.context.configure({
      device: this.device,
      format: presentationFormat,
      alphaMode: 'premultiplied',
    });
    
    const shaderModule = this.device.createShaderModule({
      code: this.wgslCode,
    });
    
    const compilationInfo = await shaderModule.getCompilationInfo();
    if (compilationInfo.messages.length > 0) {
      let hasError = false;
      for (const msg of compilationInfo.messages) {
        if (msg.type === 'error') hasError = true;
        if (this.errorDiv) {
          this.errorDiv.style.display = 'block';
          this.errorDiv.textContent += `\\n[WGSL ${msg.type}] line ${msg.lineNum}: ${msg.message}`;
        }
      }
      if (hasError) return;
    }
    
    this.pipeline = this.device.createRenderPipeline({
      layout: 'auto',
      vertex: {
        module: shaderModule,
        entryPoint: 'vs_main',
      },
      fragment: {
        module: shaderModule,
        entryPoint: 'fs_main',
        targets: [{ format: presentationFormat }],
      },
      primitive: {
        topology: 'triangle-list',
      },
    });

    // Uniform buffer: resolution (vec2f), time (f32), params (up to 4 f32s for now) -> Total 8 floats (32 bytes)
    this.uniformBuffer = this.device.createBuffer({
      size: 256, // Up to 60 parameters
      usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
    });
    
    this.uniformBindGroup = this.device.createBindGroup({
      layout: this.pipeline.getBindGroupLayout(0),
      entries: [
        {
          binding: 0,
          resource: { buffer: this.uniformBuffer },
        },
      ],
    });

    this.setupResizeObserver();
    this.setupMouseEvents();
  }

  private showError(text: string) {
    if (this.errorDiv) {
      this.errorDiv.style.display = 'block';
      this.errorDiv.textContent = text;
    }
  }

  private setupMouseEvents() {
    this.canvas.addEventListener('mousemove', this.handleMouseMove);
    this.canvas.addEventListener('touchmove', this.handleTouchMove, { passive: true });
  }

  private handleMouseMove = (e: MouseEvent) => {
      const rect = this.canvas.getBoundingClientRect();
      this.mouseX = (e.clientX - rect.left) / rect.width;
      this.mouseY = 1.0 - ((e.clientY - rect.top) / rect.height);
  };

  private handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const rect = this.canvas.getBoundingClientRect();
        this.mouseX = (e.touches[0].clientX - rect.left) / rect.width;
        this.mouseY = 1.0 - ((e.touches[0].clientY - rect.top) / rect.height);
      }
  };

  private updateDimensions() {
    const rect = this.canvas.getBoundingClientRect();
    this.width = Math.max(10, Math.floor(rect.width));
    this.height = Math.max(10, Math.floor(rect.height));
    this.dpr = Math.min(window.devicePixelRatio || 1, this.maxDpr);
    
    this.canvas.width = Math.floor(this.width * this.dpr);
    this.canvas.height = Math.floor(this.height * this.dpr);
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
    
    if (!this.device || !this.context || !this.pipeline || !this.uniformBuffer || !this.uniformBindGroup) {
      return;
    }
    
    const elapsedTime = (now - this.startTime) / 1000;
    this.frameCount++;
    
    // FPS tracking
    const delta = now - (this.lastFrameTime || now);
    this.lastFrameTime = now;
    const fps = delta > 0 ? Math.round(1000 / delta) : 60;
    this.fpsBuffer.push(fps);
    if (this.fpsBuffer.length > 20) this.fpsBuffer.shift();
    const averageFps = Math.round(this.fpsBuffer.reduce((sum, value) => sum + value, 0) / this.fpsBuffer.length);
    if (this.onFpsUpdate && this.frameCount % 10 === 0) this.onFpsUpdate(averageFps);
    
    // Update Uniforms (vec2 resolution, f32 time, f32 padding, vec2 mouse, f32 params...)
    const uniformData = this.uniformData;
    uniformData.fill(0);
    uniformData[0] = this.canvas.width;
    uniformData[1] = this.canvas.height;
    uniformData[2] = elapsedTime;
    uniformData[3] = 0; // padding
    uniformData[4] = this.mouseX;
    uniformData[5] = this.mouseY;
    
    // Map all params dynamically
    const paramValues = Object.values(this.params).map(v => Number(v) || 0);
    for (let i = 0; i < paramValues.length; i++) {
        uniformData[6 + i] = paramValues[i];
    }
    
    this.device.queue.writeBuffer(this.uniformBuffer, 0, uniformData);

    const commandEncoder = this.device.createCommandEncoder();
    const textureView = this.context.getCurrentTexture().createView();
    
    const renderPass = commandEncoder.beginRenderPass({
      colorAttachments: [{
        view: textureView,
        clearValue: { r: 0.0, g: 0.0, b: 0.0, a: 1.0 },
        loadOp: 'clear',
        storeOp: 'store',
      }],
    });
    
    renderPass.setPipeline(this.pipeline);
    renderPass.setBindGroup(0, this.uniformBindGroup);
    // Draw full screen quad (3 vertices in vertex shader generated from built-in indices)
    renderPass.draw(3); 
    renderPass.end();
    
    this.device.queue.submit([commandEncoder.finish()]);
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
    window.removeEventListener('unhandledrejection', this.handleError);
    this.canvas.removeEventListener('mousemove', this.handleMouseMove);
    this.canvas.removeEventListener('touchmove', this.handleTouchMove);
    this.uniformBindGroup = null;
    this.uniformBuffer?.destroy();
    this.uniformBuffer = null;
    this.pipeline = null;
    this.context?.unconfigure();
    this.context = null;
    this.device = null;
    if (this.errorDiv && this.errorDiv.parentElement) {
      this.errorDiv.parentElement.removeChild(this.errorDiv);
    }
  }
}
