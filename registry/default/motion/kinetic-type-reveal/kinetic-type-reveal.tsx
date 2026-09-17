"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";

export interface KineticTypeRevealProps {
  phrase?: string;
  className?: string;
}

export function KineticTypeReveal({
  phrase = "SYSTEM_KERNEL_OK: INTEGRITY VERIFIED",
  className,
}: KineticTypeRevealProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index >= phrase.length) return;
    const timer = setTimeout(() => {
      setIndex((i) => i + 1);
    }, 60);
    return () => clearTimeout(timer);
  }, [index, phrase]);

  return (
    <div className={cn("rounded-xl border border-line bg-paper p-6 font-mono text-sm shadow-sm", className)}>
      <div className="flex items-center gap-2">
        <span className="text-ink">{phrase.slice(0, index)}</span>
        <span className="h-4 w-2 bg-ink animate-pulse" />
      </div>
      <button
        type="button"
        onClick={() => setIndex(0)}
        className="mt-4 rounded border border-line px-3 py-1 text-xs text-ink hover:bg-line/20"
      >
        Re-type
      </button>
    </div>
  );
}

export default KineticTypeReveal;
