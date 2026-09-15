import * as React from "react";

import { cn } from "@openui/utils";

/**
 * Skeleton.
 *
 * A loading placeholder that mimics the *shape* of the content it replaces, so
 * the layout does not jump when the real data arrives. That is the entire point:
 * a spinner in the middle of the page tells the user nothing about what is
 * coming, and then shifts everything when it does.
 *
 * The container is `aria-busy` with a polite live label, so the wait is
 * announced once rather than per placeholder — a screen reader should hear
 * "Loading resources", not twelve empty boxes.
 */
export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Number of placeholder rows to render. */
  lines?: number;
  className?: string;
}

export function Skeleton({ lines = 1, className, ...props }: SkeletonProps): React.JSX.Element {
  return (
    <div aria-hidden className={cn("flex flex-col gap-3", className)} {...props}>
      {Array.from({ length: lines }, (_, index) => (
        <div
          key={index}
          className={cn(
            "h-3 bg-line/60",
            // The last line is short, which is what makes a block read as text
            // rather than as a stack of bars.
            index === lines - 1 && lines > 1 ? "w-2/3" : "w-full",
          )}
        />
      ))}
    </div>
  );
}

/** Wraps a region that is waiting for data, announcing the wait once. */
export function LoadingRegion({
  label,
  children,
  className,
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}): React.JSX.Element {
  return (
    <div aria-busy="true" className={cn("relative", className)}>
      <span role="status" className="sr-only">
        {label}
      </span>
      {children}
    </div>
  );
}
