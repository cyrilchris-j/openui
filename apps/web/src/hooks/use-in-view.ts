import * as React from "react";

/**
 * In-view detection for the web app.
 *
 * A thin, app-local wrapper over the same IntersectionObserver contract as the
 * registry's `use-in-view` hook item: `once` mode unobserves after the first
 * intersection, the observer disconnects on unmount, and the flag reads `false`
 * before mount so SSR and hydration agree. The web app cannot import the
 * registry item directly (it is authored for consumer projects), so the
 * contract is restated here and kept deliberately small.
 */
export interface UseInViewOptions {
  /** Stop observing after the first intersection. */
  once?: boolean;
  /** Fraction of the element that must be visible, 0–1. */
  threshold?: number;
  /** Margin around the viewport root, e.g. `"200px"`. */
  rootMargin?: string;
}

export function useInView<Element extends HTMLElement>(
  options: UseInViewOptions = {},
): { ref: React.RefObject<Element | null>; inView: boolean } {
  const { once = false, threshold = 0, rootMargin = "0px" } = options;
  const ref = React.useRef<Element>(null);
  const [inView, setInView] = React.useState(false);

  React.useEffect(() => {
    const element = ref.current;
    if (!element || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return;
        if (entry.isIntersecting) {
          setInView(true);
          if (once) observer.unobserve(element);
        } else if (!once) {
          setInView(false);
        }
      },
      { threshold, rootMargin },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [once, threshold, rootMargin]);

  return { ref, inView };
}
