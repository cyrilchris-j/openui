"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface HoverExpandAccordionRowProps {
  className?: string;
}

export function HoverExpandAccordionRow({ className }: HoverExpandAccordionRowProps) {
  const [hovered, setHovered] = useState<number | null>(0);
  const rows = [
    { title: "Deterministic Build Graph", body: "Every package resolves immutable content addresses." },
    { title: "Zero-Overhead Bundler", body: "Shared ES module trees deduplicated at boundary." },
  ];

  return (
    <div className={cn("w-full max-w-sm rounded-xl border border-line bg-paper p-4 shadow-sm divide-y divide-line", className)}>
      {rows.map((row, i) => (
        <div
          key={row.title}
          onPointerEnter={() => setHovered(i)}
          className="py-3 cursor-pointer"
        >
          <h5 className="font-display font-bold text-sm text-ink">{row.title}</h5>
          {hovered === i && (
            <p className="mt-1 font-mono text-xs text-ink/70">{row.body}</p>
          )}
        </div>
      ))}
    </div>
  );
}

export default HoverExpandAccordionRow;
