import * as React from "react";

import { Button, EmptyState } from "@openui/ui";

/**
 * The application-level error boundary.
 *
 * React Router's `ErrorBoundary` handles a *route* that failed to render, but it
 * only exists inside a data router — a failure in a provider above the router
 * would escape it entirely and leave a blank document. This class component
 * wraps the providers so that even a broken auth session renders a usable page.
 *
 * It deliberately shows no message from the error. The detail is logged to the
 * console for a developer, and the visitor gets a sentence and a way forward.
 */
interface Props {
  children: React.ReactNode;
}

interface State {
  error: Error | null;
}

export class AppErrorBoundary extends React.Component<Props, State> {
  override state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  override componentDidCatch(error: Error, info: React.ErrorInfo): void {
    // A real deployment forwards this to Sentry; in development the console is
    // where a developer is actually looking.
    console.error("Unhandled application error:", error, info.componentStack);
  }

  private readonly reset = () => {
    // A full reload, not a state reset: whatever broke is usually a stale chunk
    // or a failed session, and both are fixed by fetching everything again.
    window.location.reload();
  };

  override render(): React.ReactNode {
    if (!this.state.error) return this.props.children;

    return (
      <div className="shell py-24">
        <EmptyState
          eyebrow="Error"
          title="OpenUI could not start."
          description="Something failed while the application was starting — often a network problem, or a stale version of the site kept open in a tab. Reloading almost always fixes it."
          action={<Button onClick={this.reset}>Reload the page</Button>}
        />
      </div>
    );
  }
}
