"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface FountainPenSignatureProps {
  /** Signer name rendered beneath, for context. */
  name?: string;
  ink?: string;
  className?: string;
}

export function FountainPenSignature({ name = "A. Signer", ink = "#1a2a4a", className }: FountainPenSignatureProps) {
  const [signature, setSignature] = useState(0);

  return (
    <div className={cn("flex flex-col items-center gap-3", className)}>
      <svg
        key={signature}
        aria-hidden
        width="220"
        height="80"
        viewBox="0 0 220 80"
        className="overflow-visible"
      >
        <path
          d="M12 52 C 30 10, 44 12, 40 34 C 36 58, 58 60, 74 30 C 82 15, 92 18, 88 36 C 84 56, 104 58, 120 34 C 130 20, 140 22, 136 38 C 133 50, 148 54, 162 40 C 172 30, 186 34, 208 28"
          fill="none"
          stroke={ink}
          strokeWidth="2.6"
          strokeLinecap="round"
          pathLength={1}
          style={{ strokeDasharray: 1, animation: "openui-sign 1.6s cubic-bezier(0.4, 0, 0.2, 1) forwards" }}
        />
        <path
          d="M12 53 C 30 11, 44 13, 40 35 C 36 59, 58 61, 74 31"
          fill="none"
          stroke={ink}
          strokeWidth="1.1"
          strokeLinecap="round"
          opacity={0.5}
          pathLength={1}
          style={{ strokeDasharray: 1, animation: "openui-sign 1.6s cubic-bezier(0.4, 0, 0.2, 1) forwards" }}
        />
      </svg>
      <p className="font-mono text-xs uppercase tracking-widest text-ink/50">{name}</p>
      <button
        type="button"
        onClick={() => setSignature((value) => value + 1)}
        className="rounded border border-line px-2 py-1 font-mono text-xs text-ink/70 hover:bg-line/20"
      >
        sign again
      </button>
      <style>{`@keyframes openui-sign { from { stroke-dashoffset: 1 } to { stroke-dashoffset: 0 } } @media (prefers-reduced-motion: reduce) { path { animation: none !important; stroke-dashoffset: 0 !important } }`}</style>
    </div>
  );
}

export default FountainPenSignature;
