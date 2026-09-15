import * as React from "react";

import { Button, EmptyState, TooltipProvider } from "@openui/ui";

import { AppErrorBoundary } from "../components/AppErrorBoundary.js";
import { AuthProvider } from "../lib/auth.js";
import { AppRouter } from "./router.js";

/**
 * The application root.
 *
 * Providers are ordered outermost-first by how much they can fail:
 *
 *  1. **The error boundary** wraps everything, so a failure in a provider still
 *     renders a usable page rather than a blank document.
 *  2. **`AuthProvider`** owns the session. It is above the router because the
 *     router must not remount it on navigation — a session looked up again on
 *     every route change would sign the visitor out during a slow request.
 *  3. **`TooltipProvider`** shares open/close timing across all tooltips, which
 *     only works if it is mounted once, near the root.
 *
 * `Suspense` sits around the router because routes are code-split. The fallback
 * is a skeleton rather than a spinner: it occupies the shape of the page that is
 * arriving, so nothing jumps when it does.
 */
export function App(): React.JSX.Element {
  return (
    <AppErrorBoundary>
      <AuthProvider>
        <TooltipProvider delayDuration={300} skipDelayDuration={200}>
          <React.Suspense fallback={<RouteFallback />}>
            <AppRouter />
          </React.Suspense>
        </TooltipProvider>
      </AuthProvider>
    </AppErrorBoundary>
  );
}

function RouteFallback(): React.JSX.Element {
  return (
    <div className="shell py-24" role="status" aria-live="polite">
      <p className="eyebrow">Loading…</p>
      <div className="mt-8 flex flex-col gap-3">
        <span aria-hidden className="h-3 w-2/3 animate-pulse bg-line/60 motion-reduce:animate-none" />
        <span aria-hidden className="h-3 w-1/2 animate-pulse bg-line/60 motion-reduce:animate-none" />
      </div>
    </div>
  );
}

/** Rendered when a route chunk fails to load — usually a stale deploy. */
export function ChunkErrorState({ onRetry }: { onRetry: () => void }): React.JSX.Element {
  return (
    <div className="shell py-24">
      <EmptyState
        eyebrow="Update available"
        title="This page could not be loaded."
        description="A new version of the site was deployed while you were using it. Reloading fetches the current one."
        action={<Button onClick={onRetry}>Reload</Button>}
      />
    </div>
  );
}
