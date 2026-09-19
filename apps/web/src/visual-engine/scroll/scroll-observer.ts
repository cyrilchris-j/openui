import * as React from "react";

export interface ScrollState {
  scrollY: number;
  scrollProgress: number; // 0 to 1
  velocity: number;       // px/s
  direction: "up" | "down" | "none";
}

/**
 * OpenUI Scroll Observer
 *
 * Lightweight, rAF-throttled scroll observer with passive listeners.
 */
export function useScrollObserver(): ScrollState {
  const [state, setState] = React.useState<ScrollState>({
    scrollY: 0,
    scrollProgress: 0,
    velocity: 0,
    direction: "none",
  });

  const lastScrollY = React.useRef(0);
  const lastTime = React.useRef(performance.now());
  const rafId = React.useRef<number | null>(null);

  React.useEffect(() => {
    if (typeof window === "undefined") return;

    const handleScroll = () => {
      if (rafId.current !== null) return;

      rafId.current = requestAnimationFrame(() => {
        const currentY = window.scrollY;
        const now = performance.now();
        const dt = Math.max((now - lastTime.current) / 1000, 0.001);

        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = docHeight > 0 ? Math.min(Math.max(currentY / docHeight, 0), 1) : 0;

        const deltaY = currentY - lastScrollY.current;
        const velocity = deltaY / dt;
        const direction = deltaY > 0 ? "down" : deltaY < 0 ? "up" : "none";

        lastScrollY.current = currentY;
        lastTime.current = now;
        rafId.current = null;

        setState({
          scrollY: currentY,
          scrollProgress: progress,
          velocity,
          direction,
        });
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafId.current !== null) cancelAnimationFrame(rafId.current);
    };
  }, []);

  return state;
}

/**
 * Hook for observing element visibility and scroll progress within its container
 */
export function useElementScrollProgress<T extends HTMLElement = HTMLDivElement>(): {
  ref: React.RefObject<T | null>;
  progress: number;
  inView: boolean;
} {
  const ref = React.useRef<T>(null);
  const [progress, setProgress] = React.useState(0);
  const [inView, setInView] = React.useState(false);

  React.useEffect(() => {
    const el = ref.current;
    if (!el || typeof window === "undefined") return;

    const calculate = () => {
      const rect = el.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const isVisible = rect.top < windowHeight && rect.bottom > 0;
      setInView(isVisible);

      if (isVisible) {
        const total = windowHeight + rect.height;
        const current = windowHeight - rect.top;
        const p = Math.min(Math.max(current / total, 0), 1);
        setProgress(p);
      }
    };

    window.addEventListener("scroll", calculate, { passive: true });
    window.addEventListener("resize", calculate, { passive: true });
    calculate();

    return () => {
      window.removeEventListener("scroll", calculate);
      window.removeEventListener("resize", calculate);
    };
  }, []);

  return { ref, progress, inView };
}
