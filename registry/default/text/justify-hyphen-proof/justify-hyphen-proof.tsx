"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface JustifyHyphenProofProps {
  children: string;
  className?: string;
}

export function JustifyHyphenProof({ children, className }: JustifyHyphenProofProps) {
  const [justified, setJustified] = useState(true);
  const [showRivers, setShowRivers] = useState(false);
  const words = children.split(" ");

  return (
    <div className={cn("flex flex-col gap-4", className)}>
      <p
        className="max-w-prose text-base leading-relaxed"
        style={{
          textAlign: justified ? "justify" : "left",
          hyphens: justified ? "auto" : "manual",
          // River hint: slightly tint inter-word spaces when enabled.
          ...(showRivers ? { wordSpacing: "0.1em" } : {}),
        }}
        lang="en"
      >
        {words.map((word, index) => (
          <span key={index} className={showRivers && index % 7 === 3 ? "bg-amber-200/40 rounded-sm" : undefined}>
            {word}{" "}
          </span>
        ))}
      </p>
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => setJustified((value) => !value)}
          className="rounded border border-line px-2 py-1 font-mono text-xs text-ink/70 hover:bg-line/20"
        >
          {justified ? "justified" : "ragged right"}
        </button>
        <button
          type="button"
          onClick={() => setShowRivers((value) => !value)}
          className="rounded border border-line px-2 py-1 font-mono text-xs text-ink/70 hover:bg-line/20"
        >
          {showRivers ? "rivers: on" : "rivers: off"}
        </button>
      </div>
    </div>
  );
}

export default JustifyHyphenProof;
