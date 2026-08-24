import type { ArtRenderer, ParameterState, RenderContext, TimeState } from '../types/engine';

export interface CanvasEngineOptions {
  canvas: HTMLCanvasElement;
  renderer: ArtRenderer;
  initialParams?: ParameterState;
  onFpsUpdate?: (fps: number) => void;
  interactive?: boolean;
}

export class CanvasEngine {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private renderer: ArtRenderer;
  private params: ParameterState;
  
  private animationFrameId: number | null = null;
  private isRunning = false;
  private isVisible = true;
  
  // Timing
  private startTime = 0;
  private lastTime = 0;
  private frameCount = 0;
  private fps = 60;
  private fpsBuffer: number[] = [];
  private onFpsUpdate?: (fps: number) => void;
  
  // Resize & DPR
  private resizeObserver: ResizeObserver | null = null;
  private width = 400;
  private height = 400;
  private dpr = 1;

  // Pointer
  private interactive = false;
  private pointerMoveHandler: ((e: PointerEvent) => void) | null = null;
  private pointerDownHandler: ((e: PointerEvent) => void) | null = null;
  private pointerUpHandler: ((e: PointerEvent) => void) | null = null;

  constructor(options: CanvasEngineOptions) {
    this.canvas = options.canvas;
    const context = this.canvas.getContext('2d', { alpha: false, desynchronized: true });
    if (!context) {
      throw new Error('Failed to obtain 2D rendering context');
    }
    this.ctx = context;
    this.renderer = options.renderer;
    this.params = { ...options.initialParams };
    this.onFpsUpdate = options.onFpsUpdate;
    this.interactive = !!options.interactive;

    this.init();
  }

  private init() {
    this.updateDimensions();
    this.setupResizeObserver();
    if (this.interactive) {
      this.setupPointerListeners();
    }
    this.renderer.setup(this.getRenderContext(), this.params);
  }

  private updateDimensions() {
    const rect = this.canvas.getBoundingClientRect();
    this.width = Math.max(10, Math.floor(rect.width || this.canvas.width || 400));
    this.height = Math.max(10, Math.floor(rect.height || this.canvas.height || 400));
    
    // Clamp DPR to max 2.0 to protect mobile GPUs & battery
    this.dpr = Math.min(window.devicePixelRatio || 1, 2);
    
    const displayWidth = Math.floor(this.width * this.dpr);
    const displayHeight = Math.floor(this.height * this.dpr);

    if (this.canvas.width !== displayWidth || this.canvas.height !== displayHeight) {
      this.canvas.width = displayWidth;
      this.canvas.height = displayHeight;
    }
  }

  private setupResizeObserver() {
    if (typeof ResizeObserver !== 'undefined') {
      this.resizeObserver = new ResizeObserver(() => {
        this.updateDimensions();
        this.renderer.setup(this.getRenderContext(), this.params);
      });
      this.resizeObserver.observe(this.canvas);
    }
  }

  private setupPointerListeners() {
    const getPos = (e: PointerEvent) => {
      const rect = this.canvas.getBoundingClientRect();
      const x = (e.clientX - rect.left) / (rect.width || 1);
      const y = (e.clientY - rect.top) / (rect.height || 1);
      return { x, y };
    };

    this.pointerMoveHandler = (e: PointerEvent) => {
      if (this.renderer.onPointerMove) {
        const { x, y } = getPos(e);
        this.renderer.onPointerMove(x, y, e.buttons > 0);
      }
    };

    this.pointerDownHandler = (e: PointerEvent) => {
      if (this.renderer.onPointerMove) {
        const { x, y } = getPos(e);
        this.renderer.onPointerMove(x, y, true);
      }
    };

    this.pointerUpHandler = (e: PointerEvent) => {
      if (this.renderer.onPointerMove) {
        const { x, y } = getPos(e);
        this.renderer.onPointerMove(x, y, false);
      }
    };

    this.canvas.addEventListener('pointermove', this.pointerMoveHandler);
    this.canvas.addEventListener('pointerdown', this.pointerDownHandler);
    window.addEventListener('pointerup', this.pointerUpHandler);
  }

  private getRenderContext(): RenderContext {
    return {
      ctx: this.ctx,
      width: this.canvas.width,
      height: this.canvas.height,
      dpr: this.dpr,
      aspectRatio: this.width / this.height,
    };
  }

  public setParams(newParams: ParameterState) {
    this.params = { ...this.params, ...newParams };
  }

  public getParams(): ParameterState {
    return { ...this.params };
  }

  public start() {
    if (this.isRunning) return;
    this.isRunning = true;
    this.startTime = performance.now();
    this.lastTime = this.startTime;
    this.loop(this.startTime);
  }

  public stop() {
    this.isRunning = false;
    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
  }

  public setVisible(visible: boolean) {
    this.isVisible = visible;
    if (!visible) {
      this.stop();
    } else {
      this.start();
    }
  }

  public renderSingleFrame(t = 1.0) {
    const timeState: TimeState = {
      time: t,
      deltaTime: 0.016,
      frameCount: 1,
      fps: 60,
    };
    this.renderer.render(this.getRenderContext(), timeState, this.params);
  }

  private loop = (currentTime: number) => {
    if (!this.isRunning) return;

    const deltaMs = currentTime - this.lastTime;
    this.lastTime = currentTime;

    // Delta time in seconds, clamped to avoid huge jumps
    const deltaTime = Math.min(deltaMs / 1000, 0.1);
    const elapsedTime = (currentTime - this.startTime) / 1000;

    this.frameCount++;

    // Calculate moving average FPS
    if (deltaMs > 0) {
      const currentFps = 1000 / deltaMs;
      this.fpsBuffer.push(currentFps);
      if (this.fpsBuffer.length > 20) this.fpsBuffer.shift();
      const avgFps = Math.round(
        this.fpsBuffer.reduce((a, b) => a + b, 0) / this.fpsBuffer.length
      );
      if (avgFps !== this.fps) {
        this.fps = avgFps;
        if (this.onFpsUpdate) this.onFpsUpdate(this.fps);
      }
    }

    const timeState: TimeState = {
      time: elapsedTime,
      deltaTime,
      frameCount: this.frameCount,
      fps: this.fps,
    };

    // Execute render frame
    this.renderer.render(this.getRenderContext(), timeState, this.params);

    this.animationFrameId = requestAnimationFrame(this.loop);
  };

  public destroy() {
    this.stop();
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
      this.resizeObserver = null;
    }
    if (this.pointerMoveHandler) {
      this.canvas.removeEventListener('pointermove', this.pointerMoveHandler);
    }
    if (this.pointerDownHandler) {
      this.canvas.removeEventListener('pointerdown', this.pointerDownHandler);
    }
    if (this.pointerUpHandler) {
      window.removeEventListener('pointerup', this.pointerUpHandler);
    }
    if (this.renderer.destroy) {
      this.renderer.destroy();
    }
  }
}
