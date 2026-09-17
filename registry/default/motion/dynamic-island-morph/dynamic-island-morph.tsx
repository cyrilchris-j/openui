"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface DynamicIslandMorphProps {
  className?: string;
}

export function DynamicIslandMorph({ className }: DynamicIslandMorphProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className={cn("relative h-64 w-full max-w-md overflow-hidden rounded-2xl border border-line bg-paper p-6", className)}>
      <div className="flex justify-center">
        <div
          onClick={() => setExpanded((e) => !e)}
          className={cn(
            "cursor-pointer overflow-hidden rounded-full bg-ink text-paper transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] shadow-xl",
            expanded ? "h-16 w-80 rounded-2xl px-5 py-3" : "h-9 w-32 px-3 py-1.5"
          )}
        >
          {expanded ? (
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-bold">Incoming Call</p>
                <p className="font-mono text-[10px] opacity-70">Sarah Lin (Engineering)</p>
              </div>
              <div className="flex gap-2">
                <span className="h-6 w-6 rounded-full bg-red-500 flex items-center justify-center text-[10px]">✕</span>
                <span className="h-6 w-6 rounded-full bg-emerald-500 flex items-center justify-center text-[10px]">✓</span>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-between text-xs">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-mono text-[10px]">Connected</span>
            </div>
          )}
        </div>
      </div>
      <p className="mt-8 text-center font-mono text-xs text-ink/50">Click pill to toggle island state</p>
    </div>
  );
}

export default DynamicIslandMorph;
