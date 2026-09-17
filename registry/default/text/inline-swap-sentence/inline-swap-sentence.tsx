"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface InlineSwapSentenceProps {
  /** Split as [before, SWAP, after]; the middle is the cycling word. */
  before: string;
  after: string;
  options: string[];
  className?: string;
}

export function InlineSwapSentence({ before, after, options, className }: InlineSwapSentenceProps) {
  const [index, setIndex] = useState(0);
  const reduced =
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

  return (
    <p className={cn("max-w-prose text-lg", className)}>
      {before}{" "}
      <button
        type="button"
        onClick={() => setIndex((value) => (value + 1) % options.length)}
        className="relative inline-flex overflow-hidden border-0 bg-transparent p-0 font-semibold text-accent underline decoration-wavy underline-offset-4"
        aria-label={`Alternative for word: ${options.join(", ")}`}
      >
        <span
          aria-hidden
          key={index}
          style={{
            display: "inline-block",
            animation: reduced ? undefined : "openui-swap-in 280ms cubic-bezier(0.2, 0, 0, 1)",
          }}
        >
          {options[index]}
        </span>
      </button>{" "}
      {after}
      <style>{`@keyframes openui-swap-in { 0% { transform: translateY(0.7em); opacity: 0 } 100% { transform: translateY(0); opacity: 1 } }`}</style>
      <span className="sr-only">{options[index]}</span>
    </p>
  );
}

export default InlineSwapSentence;
