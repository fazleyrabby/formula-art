import type { CanvasEngine } from './CanvasEngine';

/**
 * VisibilityManager pauses and resumes canvas engines based on:
 * 1. IntersectionObserver (element in viewport)
 * 2. contentvisibilityautostatechange (browser skipped rendering state)
 * 3. document.visibilityState (tab active vs inactive)
 * 4. prefers-reduced-motion (rendering single static frame instead of continuous rAF)
 */
export class VisibilityManager {
  private static instance: VisibilityManager;
  private observer: IntersectionObserver | null = null;
  private engineMap = new Map<Element, CanvasEngine>();
  private isTabVisible = true;
  private prefersReducedMotion = false;

  private constructor() {
    if (typeof window === 'undefined') return;

    this.isTabVisible = !document.hidden;
    this.prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Listen to tab visibility
    document.addEventListener('visibilitychange', () => {
      this.isTabVisible = !document.hidden;
      this.updateAllEngines();
    });

    // Listen to reduced motion changes
    window.matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change', (e) => {
      this.prefersReducedMotion = e.matches;
      this.updateAllEngines();
    });

    // Initialize IntersectionObserver with generous rootMargin
    if ('IntersectionObserver' in window) {
      this.observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            const engine = this.engineMap.get(entry.target);
            if (engine) {
              const shouldRun = entry.isIntersecting && this.isTabVisible && !this.prefersReducedMotion;
              engine.setVisible(shouldRun);
              if (this.prefersReducedMotion && entry.isIntersecting) {
                engine.renderSingleFrame(1.0);
              }
            }
          });
        },
        { rootMargin: '150px' }
      );
    }
  }

  public static getInstance(): VisibilityManager {
    if (!VisibilityManager.instance) {
      VisibilityManager.instance = new VisibilityManager();
    }
    return VisibilityManager.instance;
  }

  public register(element: Element, engine: CanvasEngine) {
    this.engineMap.set(element, engine);

    // If browser supports content-visibility auto state change
    element.addEventListener('contentvisibilityautostatechange', ((e: Event & { skipped?: boolean }) => {
      if (e.skipped) {
        engine.setVisible(false);
      } else if (this.isTabVisible && !this.prefersReducedMotion) {
        engine.setVisible(true);
      }
    }) as EventListener);

    if (this.observer) {
      this.observer.observe(element);
    } else {
      // Fallback
      if (this.prefersReducedMotion) {
        engine.renderSingleFrame(1.0);
      } else {
        engine.start();
      }
    }
  }

  public unregister(element: Element) {
    const engine = this.engineMap.get(element);
    if (engine) {
      engine.destroy();
      this.engineMap.delete(element);
    }
    if (this.observer) {
      this.observer.unobserve(element);
    }
  }

  private updateAllEngines() {
    this.engineMap.forEach((engine) => {
      if (!this.isTabVisible || this.prefersReducedMotion) {
        engine.setVisible(false);
        if (this.prefersReducedMotion) {
          engine.renderSingleFrame(1.0);
        }
      } else {
        // Let intersection observer dictate visibility
      }
    });
  }
}
