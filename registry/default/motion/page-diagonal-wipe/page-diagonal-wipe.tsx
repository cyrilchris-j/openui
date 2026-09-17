"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface PageDiagonalWipeProps {
  className?: string;
}

export function PageDiagonalWipe({ className }: PageDiagonalWipeProps) {
  const [active, setActive] = useState(false);

  return (
    <div className={cn("relative h-72 w-full max-w-md overflow-hidden rounded-xl border border-line bg-paper p-6", className)}>
      <div className="flex h-full flex-col items-center justify-center text-center">
        <h4 className="font-display font-bold text-ink">Diagonal Mask Transition</h4>
        <button
          type="button"
          onClick={() => setActive((a) => !a)}
          className="mt-4 rounded bg-ink px-4 py-2 font-mono text-xs text-paper"
        >
          {active ? "Reset Wipe" : "Trigger Wipe"}
        </button>
      </div>

      <div
        className="pointer-events-none absolute inset-0 bg-ink transition-transform duration-500 ease-in-out"
        style={{
          transform: active ? "translate(0, 0)" : "translate(100%, -100%)",
          clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
        }}
      />
    </div>
  );
}

export default PageDiagonalWipe;
