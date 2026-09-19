import * as React from "react";

export interface ResourceErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  name?: string;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
}

interface ResourceErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

/**
 * OpenUI Visual Engine — Resource Error Boundary
 *
 * Guarantees that any animation, gesture, or layout error inside a visual resource
 * is isolated and never brings down the surrounding page or application.
 */
export class ResourceErrorBoundary extends React.Component<
  ResourceErrorBoundaryProps,
  ResourceErrorBoundaryState
> {
  override state: ResourceErrorBoundaryState = {
    hasError: false,
    error: null,
  };

  static getDerivedStateFromError(error: Error): ResourceErrorBoundaryState {
    return { hasError: true, error };
  }

  override componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    this.props.onError?.(error, errorInfo);
    if (process.env.NODE_ENV !== "production") {
      console.warn(`[OpenUI Visual Engine] Error in "${this.props.name ?? "resource"}":`, error);
    }
  }

  reset = (): void => {
    this.setState({ hasError: false, error: null });
  };

  override render(): React.ReactNode {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }
      return (
        <div
          role="alert"
          className="flex flex-col items-center justify-center p-6 border border-line/30 rounded-lg bg-surface/50 text-center min-h-[12rem]"
        >
          <span className="font-mono text-[11px] uppercase tracking-widest text-oxide">
            Visual resource paused
          </span>
          <p className="mt-2 text-xs text-graphite max-w-sm">
            {this.props.name
              ? `The component “${this.props.name}” encountered an error.`
              : "This visual component encountered an error and was safely isolated."}
          </p>
          <button
            type="button"
            onClick={this.reset}
            className="mt-4 px-3 py-1 font-mono text-[11px] border border-line/40 rounded hover:bg-surface text-ink transition-colors"
          >
            Retry
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

export interface WebGLErrorBoundaryProps {
  children: React.ReactNode;
  fallback: React.ReactNode;
}

/**
 * WebGL Error Boundary
 * Catches WebGL initialization failures, context loss, or shader compilation errors
 * and falls back to a clean 2D Canvas or CSS version.
 */
export class WebGLErrorBoundary extends React.Component<
  WebGLErrorBoundaryProps,
  ResourceErrorBoundaryState
> {
  override state: ResourceErrorBoundaryState = {
    hasError: false,
    error: null,
  };

  static getDerivedStateFromError(error: Error): ResourceErrorBoundaryState {
    return { hasError: true, error };
  }

  override componentDidCatch(error: Error): void {
    if (process.env.NODE_ENV !== "production") {
      console.warn("[OpenUI Visual Engine] WebGL fallback activated:", error.message);
    }
  }

  override render(): React.ReactNode {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}
