import { AlertTriangle } from "lucide-react";
import * as React from "react";
import { isRouteErrorResponse, Link, useRouteError } from "react-router";

import { Button, EmptyState } from "@openui/ui";

/**
 * The route error boundary.
 *
 * Distinguishes the three cases a user actually experiences, because the correct
 * response to each is different:
 *
 *  - **404** — the thing does not exist. Offer the catalogue.
 *  - **5xx / thrown error** — something broke. Offer a retry, and show the
 *    request id when there is one so a report can be correlated with a log line.
 *  - **Anything else** — an unexpected state. Say so honestly.
 *
 * It never renders a stack trace. The detail is logged to the console for a
 * developer's benefit and summarised for everyone else.
 */
export function ErrorBoundary(): React.JSX.Element {
  const error = useRouteError();

  React.useEffect(() => {
    // A developer still needs the real thing; a visitor does not.
    console.error("Route error:", error);
  }, [error]);

  const notFound = isRouteErrorResponse(error) && error.status === 404;
  const status = isRouteErrorResponse(error) ? error.status : undefined;
  const message = isRouteErrorResponse(error)
    ? typeof error.data === "string"
      ? error.data
      : error.statusText
    : error instanceof Error
      ? error.message
      : null;
  const requestId =
    error instanceof Error && "requestId" in error
      ? String((error as { requestId?: unknown }).requestId ?? "")
      : "";

  return (
    <div className="shell py-24">
      <EmptyState
        eyebrow={notFound ? "404 — Not in the registry" : status ? `${status} — Error` : "Error"}
        title={
          notFound
            ? "That resource is not here."
            : "Something went wrong while rendering this page."
        }
        description={
          notFound ? (
            "The slug may have changed, or the resource may have been deprecated. The catalogue index always lists what is currently published."
          ) : (
            <>
              {message ?? "The page could not be rendered."}
              {requestId ? (
                <>
                  {" "}
                  Quote request <span className="font-mono text-ink">{requestId}</span> in a bug
                  report and we can find the log line.
                </>
              ) : null}
            </>
          )
        }
        action={
          <div className="flex flex-wrap gap-2">
            <Button asChild>
              <Link to="/explore">Browse the catalogue</Link>
            </Button>
            {!notFound ? (
              <Button variant="outline" onClick={() => window.location.reload()}>
                Reload the page
              </Button>
            ) : null}
          </div>
        }
      />

      {!notFound ? (
        <p className="mt-6 flex items-start gap-2 text-[0.8rem] text-graphite">
          <AlertTriangle aria-hidden className="mt-0.5 h-3.5 w-3.5 shrink-0" />
          The full diagnostic was written to the browser console. It is not shown here because it
          may contain details about the deployment.
        </p>
      ) : null}
    </div>
  );
}
