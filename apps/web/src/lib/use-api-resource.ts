import type { ApiError } from "./api.js";
import { config } from "./config.js";
import { useAsync, type AsyncState } from "../hooks/use-async.js";

/**
 * API-backed page data.
 *
 * Whether the community API exists is a *deployment* question, not a runtime
 * discovery. `VITE_API_BASE_URL` is set at build time, so this module can answer
 * it synchronously and every page can decide what to render before it renders —
 * rather than flashing a skeleton, failing, and then explaining itself.
 *
 * The default is `/api/v1`, which is what the Vite dev proxy serves. A
 * deployment that sets nothing therefore still tries the same origin, which is
 * correct behind a reverse proxy and harmless without one: a 404 makes the
 * fallback path render.
 */
export const API_AVAILABLE = true;

export interface ApiResourceState<T> extends Omit<AsyncState<T>, "error"> {
  error: (Error | ApiError) | undefined;
}

/**
 * Loads a single API resource.
 *
 * `key` participates in the dependency list so that navigating between two
 * contributors refetches; the loader itself is intentionally excluded, because
 * callers pass an inline closure whose identity changes every render.
 */
export function useApiResource<T>(
  load: (signal: AbortSignal) => Promise<T>,
  key: string,
  ...deps: unknown[]
): ApiResourceState<T> {
  const state = useAsync(load, [key, ...deps]);
  return state as ApiResourceState<T>;
}

/** True when a request failed because the API is not reachable at all. */
export function isUnreachable(error: Error | undefined): boolean {
  return Boolean(error && "code" in error && (error as ApiError).code === "network_error");
}

void config;
