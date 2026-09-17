"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface RedactionDeclassifierProps {
  /** Segments: plain strings or { secret: string } to redact. */
  segments: Array<string | { secret: string }>;
  className?: string;
}

export function RedactionDeclassifier({ segments, className }: RedactionDeclassifierProps) {
  const [revealed, setRevealed] = useState<number | null>(null);
  let secretIndex = -1;

  return (
    <p className={cn("max-w-prose font-mono text-sm leading-loose", className)}>
      {segments.map((segment, index) => {
        if (typeof segment === "string") return <span key={index}>{segment} </span>;
        secretIndex += 1;
        const mine = secretIndex;
        const open = revealed === mine;
        return (
          <span
            key={index}
            tabIndex={0}
            role="button"
            aria-label={open ? `declassified: ${segment.secret}` : "classified text, activate to reveal"}
            onMouseEnter={() => setRevealed(mine)}
            onMouseLeave={() => setRevealed(null)}
            onFocus={() => setRevealed(mine)}
            onBlur={() => setRevealed(null)}
            className="relative cursor-pointer select-none px-0.5"
          >
            <span aria-hidden={open ? undefined : true} className={open ? "text-ink" : "opacity-0"}>
              {segment.secret}
            </span>
            <span
              aria-hidden
              className="absolute inset-0 rounded-[2px] bg-ink transition-opacity duration-300"
              style={{
                opacity: open ? 0 : 1,
                clipPath: open ? "inset(0 0 0 100%)" : "inset(0 0 0 0)",
              }}
            />
            <span className="sr-only">{open ? segment.secret : "redacted"}</span>
          </span>
        );
      })}
    </p>
  );
}

export default RedactionDeclassifier;
