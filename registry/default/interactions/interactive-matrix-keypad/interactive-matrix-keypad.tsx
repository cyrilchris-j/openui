"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface InteractiveMatrixKeypadProps {
  className?: string;
}

export function InteractiveMatrixKeypad({ className }: InteractiveMatrixKeypadProps) {
  const [code, setCode] = useState("");
  const keys = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "C", "0", "⏎"];

  const press = (k: string) => {
    if (k === "C") setCode("");
    else if (k === "⏎") {
      /* noop */
    } else if (code.length < 4) setCode((c) => c + k);
  };

  return (
    <div className={cn("inline-flex flex-col items-center gap-4 rounded-xl border border-line bg-paper p-6 shadow-sm", className)}>
      <div className="h-8 flex items-center gap-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className={cn(
              "h-3 w-3 rounded-full border border-line",
              i < code.length ? "bg-ink" : "bg-line/20"
            )}
          />
        ))}
      </div>

      <div className="grid grid-cols-3 gap-2 w-48">
        {keys.map((k) => (
          <button
            key={k}
            type="button"
            onClick={() => press(k)}
            className="flex h-12 items-center justify-center rounded-lg border border-line bg-paper font-mono text-sm font-bold text-ink shadow-sm hover:bg-line/20 active:scale-95"
          >
            {k}
          </button>
        ))}
      </div>
    </div>
  );
}

export default InteractiveMatrixKeypad;
