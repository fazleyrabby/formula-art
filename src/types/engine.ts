export interface RenderContext {
  ctx: CanvasRenderingContext2D;
  width: number;
  height: number;
  dpr: number;
  aspectRatio: number;
}

export interface TimeState {
  time: number;          // Elapsed time in seconds
  deltaTime: number;     // Delta time since last frame in seconds
  frameCount: number;    // Total frames rendered
  fps: number;           // Current moving average FPS
}

export type ParameterState = Record<string, number | string | boolean>;

export interface ArtRenderer {
  /**
   * Called once on canvas mount or when canvas size/DPR changes.
   * Allocate buffers, flat arrays, and spatial structures here.
   */
  setup(context: RenderContext, params: ParameterState): void;

  /**
   * Called on every animation frame.
   * Must NOT allocate new objects or arrays inside this function.
   */
  render(context: RenderContext, time: TimeState, params: ParameterState): void;

  /**
   * Optional pointer interaction handler (mouse / touch).
   */
  onPointerMove?(x: number, y: number, isDown: boolean): void;

  /**
   * Cleanup any memory, event listeners, or worker handles.
   */
  destroy?(): void;
}

export type AlgorithmFactory = () => ArtRenderer;
