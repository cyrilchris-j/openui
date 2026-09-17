"use client";

import { useState } from "react";
import { ChevronRight, ChevronDown, Check } from "lucide-react";
import { cn } from "@/lib/cn";

export function TreeCheckboxSelector({ className }: { className?: string }) {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({ src: true });
  const [checked, setChecked] = useState<Record<string, boolean>>({ "src/components": true });

  const toggleExp = (k: string) => setExpanded((prev) => ({ ...prev, [k]: !prev[k] }));
  const toggleCheck = (k: string) => setChecked((prev) => ({ ...prev, [k]: !prev[k] }));

  return (
    <div className={cn("p-4 rounded-xl border border-line bg-paper max-w-xs w-full font-sans text-xs shadow-sm", className)}>
      <div className="text-xs font-semibold text-ink mb-2 font-mono">Module Selection</div>
      <div className="space-y-1">
        <div>
          <div className="flex items-center gap-1.5 py-1 px-1 rounded hover:bg-surface">
            <button type="button" onClick={() => toggleExp("src")} className="p-0.5 text-ink/50">
              {expanded.src ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
            </button>
            <button
              type="button"
              onClick={() => toggleCheck("src")}
              className={cn(
                "w-4 h-4 rounded border flex items-center justify-center transition-colors",
                checked.src ? "bg-accent border-accent text-white" : "border-line"
              )}
            >
              {checked.src && <Check className="w-3 h-3" />}
            </button>
            <span className="font-medium text-ink">src</span>
          </div>

          {expanded.src && (
            <div className="pl-6 space-y-1 border-l border-line/60 ml-3 mt-1">
              {["components", "lib", "hooks"].map((child) => {
                const k = `src/${child}`;
                const isChk = checked[k];
                return (
                  <div key={k} className="flex items-center gap-1.5 py-1 px-1 rounded hover:bg-surface">
                    <button
                      type="button"
                      onClick={() => toggleCheck(k)}
                      className={cn(
                        "w-4 h-4 rounded border flex items-center justify-center transition-colors",
                        isChk ? "bg-accent border-accent text-white" : "border-line"
                      )}
                    >
                      {isChk && <Check className="w-3 h-3" />}
                    </button>
                    <span className="text-ink/80">{child}</span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
