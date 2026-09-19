import * as React from "react";
import { useReducedMotion } from "../core/device.js";

export interface ProceduralCanvasProps extends React.CanvasHTMLAttributes<HTMLCanvasElement> {
  onDraw: (ctx: CanvasRenderingContext2D, width: number, height: number, time: number) => void;
  fpsTarget?: number;
  staticFrameOnReducedMotion?: boolean;
}

/**
 * OpenUI Procedural Canvas
 *
 * High-performance 2D Canvas framework for procedural effects.
 * Automatically handles:
 *   - Device pixel ratio compensation (retina screens)
 *   - IntersectionObserver (pauses automatically offscreen)
 *   - Tab visibility change (pauses when document is hidden)
 *   - Reduced motion (draws single static frame and sleeps)
 */
export function ProceduralCanvas({
  onDraw,
  fpsTarget = 60,
  staticFrameOnReducedMotion = true,
  className = "",
  style,
  ...rest
}: ProceduralCanvasProps): React.JSX.Element {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const onDrawRef = React.useRef(onDraw);
  onDrawRef.current = onDraw;

  const reduced = useReducedMotion();

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let rafId: number | null = null;
    let isVisible = true;
    let startTime = performance.now();
    let lastDrawTime = startTime;
    const frameInterval = 1000 / fpsTarget;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = Math.max(1, Math.floor(rect.width));
      height = Math.max(1, Math.floor(rect.height));

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      if (reduced && staticFrameOnReducedMotion) {
        onDrawRef.current(ctx, width, height, 0);
      }
    };

    resize();
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);

    const render = (now: number) => {
      if (!isVisible || (reduced && staticFrameOnReducedMotion)) return;

      const elapsed = now - lastDrawTime;
      if (elapsed >= frameInterval) {
        lastDrawTime = now - (elapsed % frameInterval);
        ctx.clearRect(0, 0, width, height);
        onDrawRef.current(ctx, width, height, now - startTime);
      }

      rafId = requestAnimationFrame(render);
    };

    if (reduced && staticFrameOnReducedMotion) {
      onDrawRef.current(ctx, width, height, 0);
    } else {
      rafId = requestAnimationFrame(render);
    }

    const intersectionObserver = new IntersectionObserver(([entry]) => {
      isVisible = Boolean(entry?.isIntersecting);
      if (isVisible && !document.hidden && !reduced && rafId === null) {
        lastDrawTime = performance.now();
        rafId = requestAnimationFrame(render);
      } else if (!isVisible && rafId !== null) {
        cancelAnimationFrame(rafId);
        rafId = null;
      }
    });
    intersectionObserver.observe(canvas);

    const handleVisibility = () => {
      if (document.hidden && rafId !== null) {
        cancelAnimationFrame(rafId);
        rafId = null;
      } else if (!document.hidden && isVisible && !reduced && rafId === null) {
        lastDrawTime = performance.now();
        rafId = requestAnimationFrame(render);
      }
    };
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, [fpsTarget, reduced, staticFrameOnReducedMotion]);

  return (
    <canvas
      ref={canvasRef}
      className={`w-full h-full block ${className}`}
      style={style}
      {...rest}
    />
  );
}
