import { useEffect, useRef, useState } from "react";

/**
 * use-in-view
 *
 * An IntersectionObserver hook with three properties the registry relies on:
 *
 *  - `once` mode unobserves after the first intersection, which is what the
 *    catalogue's lazy previews use to stop paying for offscreen work;
 *  - the observer is disconnected on unmount and when the element changes;
 *  - it reports `false` before mount so SSR and hydration agree.
 */
export interface UseInViewOptions {
  /** Stop observing after the first intersection. */
  once?: boolean;
  /** Fraction of the element that must be visible, 0–1. */
  threshold?: number;
  /** Margin around the viewport root, e.g. `"100px"`. */
  rootMargin?: string;
}

export function useInView<Element extends HTMLElement>(
  options: UseInViewOptions = {},
): { ref: React.RefObject<Element | null>; inView: boolean } {
  const { once = false, threshold = 0, rootMargin = "0px" } = options;
  const ref = useRef<Element>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
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

export default useInView;
