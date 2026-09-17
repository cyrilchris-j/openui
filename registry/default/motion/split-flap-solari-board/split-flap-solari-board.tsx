"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface SplitFlapSolariBoardProps {
  className?: string;
}

export function SplitFlapSolariBoard({ className }: SplitFlapSolariBoardProps) {
  const [text, setText] = useState("BERLIN");
  const destinations = ["BERLIN", "TOKYO", "LONDON", "ZURICH"];

  const nextDest = () => {
    const nextIdx = (destinations.indexOf(text) + 1) % destinations.length;
    setText(destinations[nextIdx] ?? "BERLIN");
  };

  return (
    <div className={cn("inline-flex flex-col items-center gap-4 rounded-xl border border-line bg-paper p-6 shadow-sm", className)}>
      <div className="flex gap-1.5 bg-ink p-3 rounded-lg shadow-inner">
        {text.split("").map((char, i) => (
          <div key={i} className="relative flex h-14 w-10 flex-col items-center justify-center rounded bg-[#1e1e1e] font-mono text-2xl font-black text-paper shadow">
            <div className="absolute inset-x-0 top-1/2 h-[1px] bg-black/60 z-10" />
            <span>{char}</span>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={nextDest}
        className="rounded border border-line bg-paper px-4 py-1.5 font-mono text-xs font-semibold text-ink shadow-sm hover:bg-line/20"
      >
        Next Flight
      </button>
    </div>
  );
}

export default SplitFlapSolariBoard;
