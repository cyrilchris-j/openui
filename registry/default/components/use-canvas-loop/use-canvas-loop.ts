import { useEffect, useRef } from "react";

/**
 * use-canvas-loop
 *
 * The one requestAnimationFrame loop every canvas background in the registry
 * shares. Contract:
 *
 *  - the callback receives (context, width, height, elapsed) each frame;
 *  - the loop **pauses** when the document is hidden and when the canvas is
 *    offscreen (via IntersectionObserver), because an invisible background
 *    that keeps burning frames is a bug, not an effect;
 *  - the loop **stops** entirely under `prefers-reduced-motion` — the caller
 *    draws one static frame instead;
 *  - device-pixel-ratio scaling is handled here, so resources never blur on
 *    retina screens or overdraw on 1x displays.
 */
export interface CanvasLoopOptions {
  /** Draw one frame and stop; used for static render modes. */
  static?: boolean;
  /** Cap the frame rate; undefined means uncapped. */
  maxFps?: number;
}

export type CanvasDraw = (
  context: CanvasRenderingContext2D,
  width: number,
  height: number,
  elapsedMs: number,
) => void;

export function useCanvasLoop(draw: CanvasDraw, options: CanvasLoopOptions = {}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawRef = useRef(draw);
  drawRef.current = draw;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;

    if (typeof window === "undefined") return;
    const reduced =
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;

    let width = 0;
    let height = 0;
    let dpr = 1;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = Math.max(1, Math.floor(rect.width));
      height = Math.max(1, Math.floor(rect.height));
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const resizeObserver = typeof ResizeObserver !== "undefined" ? new ResizeObserver(resize) : null;
    resizeObserver?.observe(canvas);

    let running = false;
    let onScreen = true;
    let raf: number | null = null;
    let lastTime = 0;
    let lastDraw = 0;
    const startEpoch = performance.now();

    const frame = (time: number) => {
      raf = null;
      const elapsed = time - startEpoch;
      if (options.maxFps !== undefined && time - lastDraw < 1000 / options.maxFps) {
        raf = requestAnimationFrame(frame);
        return;
      }
      lastDraw = time;
      drawRef.current(context, width, height, elapsed);
      lastTime = time;
      if (running) raf = requestAnimationFrame(frame);
    };

    const start = () => {
      if (running || (reduced && !options.static)) return;
      running = true;
      lastTime = performance.now();
      raf = requestAnimationFrame(frame);
    };

    const stop = () => {
      running = false;
      if (raf !== null) {
        cancelAnimationFrame(raf);
        raf = null;
      }
    };

    // Reduced motion: draw exactly one static frame, no loop.
    if (reduced) {
      drawRef.current(context, width, height, 0);
    } else if (options.static) {
      drawRef.current(context, width, height, 0);
    } else {
      start();
    }

    const intersection =
      typeof IntersectionObserver !== "undefined"
        ? new IntersectionObserver(([entry]) => {
            onScreen = Boolean(entry?.isIntersecting);
            if (onScreen && !document.hidden && !reduced && !options.static) start();
            if (!onScreen) stop();
          })
        : null;
    intersection?.observe(canvas);

    const visibility = () => {
      if (document.hidden) stop();
      else if (onScreen && !reduced && !options.static) start();
    };
    document.addEventListener("visibilitychange", visibility);

    return () => {
      stop();
      resizeObserver?.disconnect();
      intersection?.disconnect();
      document.removeEventListener("visibilitychange", visibility);
      void lastTime;
    };
  }, [options.static, options.maxFps]);

  return canvasRef;
}

export default useCanvasLoop;
