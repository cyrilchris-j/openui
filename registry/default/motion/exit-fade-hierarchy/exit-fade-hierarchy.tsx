"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface ExitFadeHierarchyProps {
  /** Elements ordered by importance: last in the array exits first. */
  children: React.ReactNode[];
  className?: string;
}

export function ExitFadeHierarchy({ children, className }: ExitFadeHierarchyProps) {
  const [exiting, setExiting] = useState(false);
  const count = children.length;

  return (
    <div className={cn("flex flex-col gap-4", className)}>
      <div aria-hidden={exiting} style={{ opacity: exiting ? undefined : 1 }}>
        {children.map((child, index) => {
          // Importance = position; the most important (index 0) exits last.
          const delay = (count - 1 - index) * 140;
          return (
            <div
              key={index}
              className="mb-3"
              style={{
                opacity: exiting ? 0 : 1,
                transform: exiting ? "translateY(6px)" : "translateY(0)",
                transition: `opacity 420ms ease ${delay}ms, transform 420ms ease ${delay}ms`,
              }}
            >
              {child}
            </div>
          );
        })}
      </div>
      <button
        type="button"
        onClick={() => setExiting((value) => !value)}
        className="self-start rounded-md border border-line px-3 py-1.5 font-mono text-xs text-ink/70 hover:bg-line/20"
      >
        {exiting ? "restore" : "exit hierarchy"}
      </button>
    </div>
  );
}

export default ExitFadeHierarchy;
