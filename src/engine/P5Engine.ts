import type { ParameterState } from '../types/engine';

type P5Instance = any;
export type P5Sketch = (p: P5Instance) => void;

export interface P5EngineOptions {
  container: HTMLElement;
  sketch: P5Sketch;
  initialParams?: ParameterState;
  onFpsUpdate?: (fps: number) => void;
}

export class P5Engine {
  private container: HTMLElement;
  private p5Instance: P5Instance | null = null;
  private params: ParameterState;
  private onFpsUpdate?: (fps: number) => void;
  private sketch: P5Sketch;
  private resizeObserver: ResizeObserver | null = null;
  
  private isRunning = false;

  constructor(options: P5EngineOptions) {
    this.container = options.container;
    this.params = { ...options.initialParams };
    this.onFpsUpdate = options.onFpsUpdate;
    this.sketch = options.sketch;
  }

  public async start() {
    if (this.isRunning) return;
    this.isRunning = true;

    if (!this.p5Instance) {
      if (typeof window !== 'undefined' && !(window as any).p5) {
        await this.loadP5Script();
      }
      
      const p5 = (window as any).p5;
      
      this.p5Instance = new p5((p: any) => {
        p.getParams = () => this.params;
        p.container = this.container;
        
        let userDraw: any;
        Object.defineProperty(p, 'draw', {
          get: () => userDraw,
          set: (val) => {
            userDraw = () => {
              val();
              if (this.onFpsUpdate && p.frameCount % 10 === 0) {
                this.onFpsUpdate(Math.round(p.frameRate()));
              }
            };
          }
        });
        
        this.sketch(p);
      }, this.container);

      if (typeof ResizeObserver !== 'undefined') {
        this.resizeObserver = new ResizeObserver(() => {
          if (this.p5Instance && this.p5Instance.resizeCanvas) {
            this.p5Instance.resizeCanvas(this.container.clientWidth, this.container.clientHeight);
          }
        });
        this.resizeObserver.observe(this.container);
      }

    } else {
      this.p5Instance.loop();
    }
  }

  private async loadP5Script(): Promise<void> {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.9.0/p5.min.js';
      script.onload = () => resolve();
      script.onerror = reject;
      document.head.appendChild(script);
    });
  }

  public stop() {
    this.isRunning = false;
    if (this.p5Instance) {
      this.p5Instance.noLoop();
    }
  }

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
      this.resizeObserver = null;
    }
    if (this.p5Instance) {
      this.p5Instance.remove();
      this.p5Instance = null;
    }
  }
}
