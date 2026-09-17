"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface PageWipeTransitionProps {
  pages: Array<{ label: string; content: string }>;
  className?: string;
}

export function PageWipeTransition({ pages, className }: PageWipeTransitionProps) {
  const [current, setCurrent] = useState(0);
  const [wiping, setWiping] = useState<"idle" | "cover" | "reveal">("idle");
  const [next, setNext] = useState<number | null>(null);
  const reduced =
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

  const navigate = (index: number) => {
    if (index === current || wiping !== "idle") return;
    if (reduced) {
      setCurrent(index);
      return;
    }
    setNext(index);
    setWiping("cover");
    window.setTimeout(() => {
      setCurrent(index);
      setWiping("reveal");
      window.setTimeout(() => {
        setWiping("idle");
        setNext(null);
      }, 520);
    }, 380);
  };

  const page = pages[current]!;

  return (
    <div className={cn("relative overflow-hidden", className)}>
      <div className="flex min-h-[16rem] flex-col items-center justify-center gap-6 p-10">
        <p className="font-display text-2xl text-ink">{page.content}</p>
        <nav className="flex gap-2" aria-label="Pages">
          {pages.map((entry, index) => (
            <button
              key={entry.label}
              type="button"
              onClick={() => navigate(index)}
              aria-current={index === current}
              className={cn(
                "rounded-full border px-3 py-1 font-mono text-xs",
                index === current ? "border-ink bg-ink text-paper" : "border-line text-ink/70 hover:border-ink",
              )}
            >
              {entry.label}
            </button>
          ))}
        </nav>
      </div>
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 z-20 bg-ink"
        style={{
          transform: wiping === "cover" ? "translateY(0)" : wiping === "reveal" ? "translateY(-101%)" : "translateY(-101%)",
          transition:
            wiping === "cover"
              ? "transform 380ms cubic-bezier(0.6, 0, 0.8, 0.2)"
              : "transform 520ms cubic-bezier(0.2, 0, 0.1, 1)",
        }}
      />
    </div>
  );
}

export default PageWipeTransition;
