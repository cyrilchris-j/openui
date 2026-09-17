import { useEffect, useState } from "react";

/**
 * use-reduced-motion
 *
 * Subscribes to `prefers-reduced-motion` and returns whether the user asked
 * for reduced motion. Resources use this to *replace* animation with a static
 * state change rather than only shortening durations.
 */
export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  return reduced;
}

export default useReducedMotion;
