import * as React from "react";

/**
 * `useAsync`.
 *
 * A deliberately small data-fetching hook: the platform's catalogue reads
 * immutable artifacts and its community calls are few, so a caching library
 * would be weight without benefit. What it *does* handle is the part that is
 * genuinely easy to get wrong:
 *
 *  - a resolved request never writes state after unmount or after the
 *    dependency has changed (the classic stale-response bug),
 *  - `reload()` re-runs the effect without changing the dependency identity,
 *  - the previous value is kept during a refetch (`isRefreshing`), so a filter
 *    change does not blank the page.
 */
export interface AsyncState<T> {
  data: T | undefined;
  error: Error | undefined;
  /** True only on the first load — i.e. there is nothing to show yet. */
  isLoading: boolean;
  /** True when a reload is in flight but `data` is still on screen. */
  isRefreshing: boolean;
  reload: () => void;
}

export function useAsync<T>(
  load: (signal: AbortSignal) => Promise<T>,
  deps: React.DependencyList,
): AsyncState<T> {
  const [data, setData] = React.useState<T | undefined>(undefined);
  const [error, setError] = React.useState<Error | undefined>(undefined);
  const [status, setStatus] = React.useState<"loading" | "refreshing" | "settled">("loading");
  const [nonce, setNonce] = React.useState(0);

  // The loader is intentionally not a dependency: callers pass an inline
  // closure, and depending on its identity would refetch on every render.
  const loadRef = React.useRef(load);
  loadRef.current = load;

  React.useEffect(() => {
    const controller = new AbortController();
    let active = true;

    setStatus((current) => (current === "settled" ? "refreshing" : "loading"));

    loadRef
      .current(controller.signal)
      .then((value) => {
        if (!active) return;
        setData(value);
        setError(undefined);
        setStatus("settled");
      })
      .catch((cause: unknown) => {
        if (!active) return;
        if (cause instanceof DOMException && cause.name === "AbortError") return;
        setError(cause instanceof Error ? cause : new Error(String(cause)));
        setStatus("settled");
      });

    return () => {
      active = false;
      controller.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...deps, nonce]);

  const reload = React.useCallback(() => setNonce((value) => value + 1), []);

  return {
    data,
    error,
    isLoading: status === "loading",
    isRefreshing: status === "refreshing",
    reload,
  };
}

/**
 * A debounced copy of a value.
 *
 * Used for the search field: typing should feel instant, but a request per
 * keystroke would hammer a rate-limited API and make results flicker.
 */
export function useDebounced<T>(value: T, delay = 250): T {
  const [debounced, setDebounced] = React.useState(value);

  React.useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debounced;
}

/** Tracks a media query, subscribing to changes rather than polling. */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = React.useState(() =>
    typeof window === "undefined" ? false : window.matchMedia(query).matches,
  );

  React.useEffect(() => {
    if (typeof window === "undefined") return;
    const list = window.matchMedia(query);
    const update = () => setMatches(list.matches);
    update();
    list.addEventListener("change", update);
    return () => list.removeEventListener("change", update);
  }, [query]);

  return matches;
}

/**
 * True when the visitor has asked for reduced motion.
 *
 * Components read this to *skip* an animation entirely rather than merely
 * shortening it — the CSS media query handles transitions, but a JS-driven
 * canvas or scroll effect has to opt out in code.
 */
export function usePrefersReducedMotion(): boolean {
  return useMediaQuery("(prefers-reduced-motion: reduce)");
}
