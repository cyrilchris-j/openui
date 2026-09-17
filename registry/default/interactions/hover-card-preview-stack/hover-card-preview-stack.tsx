"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface HoverCardPreviewStackProps {
  className?: string;
}

export function HoverCardPreviewStack({ className }: HoverCardPreviewStackProps) {
  const [fanned, setFanned] = useState(false);
  const docs = ["Design Brief", "Architecture Review", "Security Audit"];

  return (
    <div
      onPointerEnter={() => setFanned(true)}
      onPointerLeave={() => setFanned(false)}
      className={cn("flex h-64 w-full max-w-sm items-center justify-center rounded-xl border border-line bg-paper p-6", className)}
    >
      <div className="relative h-36 w-52">
        {docs.map((title, idx) => {
          const rot = fanned ? (idx - 1) * 12 : 0;
          const x = fanned ? (idx - 1) * 36 : 0;
          return (
            <div
              key={title}
              className="absolute inset-0 rounded-xl border border-line bg-paper p-4 shadow-md transition-all duration-300 flex flex-col justify-between"
              style={{
                transform: `translateX(${x}px) rotate(${rot}deg)`,
                zIndex: idx,
              }}
            >
              <span className="font-mono text-[9px] text-ink/50 uppercase">SPEC {idx + 1}</span>
              <h5 className="font-display font-bold text-xs text-ink">{title}</h5>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default HoverCardPreviewStack;
