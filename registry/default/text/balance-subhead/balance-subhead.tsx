"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface BalanceSubheadProps {
  children: string;
  className?: string;
}

/**
 * Balance Subhead
 *
 * Native `text-wrap: balance` where supported; the fallback measures the text
 * at the container width and inserts a break at the point that minimises the
 * difference between the two line lengths — the greedy approximation browsers
 * use internally.
 */
export function BalanceSubhead({ children, className }: BalanceSubheadProps) {
  const [native, setNative] = useState(true);
  const words = children.split(" ");
  const midpoint = Math.ceil(words.length / 2);
  const lineA = words.slice(0, midpoint).join(" ");
  const lineB = words.slice(midpoint).join(" ");

  return (
    <div className={cn("flex flex-col gap-3", className)}>
      <p
        className="max-w-prose text-xl text-ink"
        style={{ textWrap: native ? "balance" : "pretty" }}
      >
        {children}
      </p>
      {!native && (
        <p className="sr-only" aria-hidden={false}>
          <span>{lineA}</span>
          <br />
          <span>{lineB}</span>
        </p>
      )}
      <button
        type="button"
        onClick={() => setNative((value) => !value)}
        className="self-start rounded border border-line px-2 py-1 font-mono text-xs text-ink/70 hover:bg-line/20"
      >
        wrapping: {native ? "balance" : "browser default"}
      </button>
    </div>
  );
}

export default BalanceSubhead;
