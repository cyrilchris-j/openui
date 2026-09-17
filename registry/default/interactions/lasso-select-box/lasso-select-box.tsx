"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface LassoSelectBoxProps {
  className?: string;
}

export function LassoSelectBox({ className }: LassoSelectBoxProps) {
  const [selected, setSelected] = useState<number[]>([]);
  const nodes = [
    { id: 1, label: "Node A" },
    { id: 2, label: "Node B" },
    { id: 3, label: "Node C" },
    { id: 4, label: "Node D" },
  ];

  const toggleSelect = (id: number) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  return (
    <div className={cn("w-full max-w-sm rounded-xl border border-line bg-paper p-6 shadow-sm", className)}>
      <div className="flex justify-between items-center pb-3 border-b border-line mb-4">
        <span className="font-mono text-xs text-ink/60">SELECTED ({selected.length})</span>
        <button
          type="button"
          onClick={() => setSelected([1, 2, 3, 4])}
          className="font-mono text-[10px] text-ink hover:underline"
        >
          Select All
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {nodes.map((node) => {
          const isSelected = selected.includes(node.id);
          return (
            <div
              key={node.id}
              onClick={() => toggleSelect(node.id)}
              className={cn(
                "flex h-20 cursor-pointer flex-col items-center justify-center rounded-lg border font-mono text-xs font-bold transition-all",
                isSelected
                  ? "border-ink bg-ink text-paper shadow-md scale-95"
                  : "border-line bg-paper text-ink hover:border-ink/60"
              )}
            >
              <span>{node.label}</span>
              <span className="text-[10px] opacity-60">{isSelected ? "ACTIVE" : "IDLE"}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default LassoSelectBox;
