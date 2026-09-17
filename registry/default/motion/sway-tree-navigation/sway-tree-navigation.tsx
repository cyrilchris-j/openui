"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface SwayTreeNavigationProps {
  className?: string;
}

export function SwayTreeNavigation({ className }: SwayTreeNavigationProps) {
  const [openDirs, setOpenDirs] = useState<Record<string, boolean>>({ "src": true });

  const toggle = (key: string) => {
    setOpenDirs((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className={cn("w-full max-w-sm rounded-xl border border-line bg-paper p-5 shadow-sm font-mono text-xs", className)}>
      <div className="mb-3 font-semibold uppercase tracking-wider text-ink/50">WORKSPACE TREE</div>
      <div className="space-y-1">
        <div>
          <button
            type="button"
            onClick={() => toggle("src")}
            className="flex items-center gap-2 text-ink hover:opacity-75"
          >
            <span>{openDirs["src"] ? "▾" : "▸"}</span>
            <span className="font-bold">src/</span>
          </button>
          {openDirs["src"] && (
            <div className="ml-4 mt-1 border-l border-line pl-3 space-y-1 transition-all duration-200">
              <div className="text-ink/70 hover:translate-x-1 transition-transform">components/</div>
              <div className="text-ink/70 hover:translate-x-1 transition-transform">hooks/</div>
              <div className="text-ink/70 hover:translate-x-1 transition-transform">index.ts</div>
            </div>
          )}
        </div>
        <div className="text-ink/70 hover:translate-x-1 transition-transform pl-4">package.json</div>
        <div className="text-ink/70 hover:translate-x-1 transition-transform pl-4">tsconfig.json</div>
      </div>
    </div>
  );
}

export default SwayTreeNavigation;
