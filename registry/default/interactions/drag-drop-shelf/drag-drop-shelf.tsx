"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface DragDropShelfProps {
  className?: string;
}

export function DragDropShelf({ className }: DragDropShelfProps) {
  const [items, setItems] = useState(["Artifact A", "Shader B", "Geometry C", "Texture D"]);
  const [dragIdx, setDragIdx] = useState<number | null>(null);

  const handleDragStart = (idx: number) => {
    setDragIdx(idx);
  };

  const handleDragOver = (e: React.DragEvent, idx: number) => {
    e.preventDefault();
    if (dragIdx === null || dragIdx === idx) return;
    const next = [...items];
    const dragged = next[dragIdx];
    if (!dragged) return;
    next.splice(dragIdx, 1);
    next.splice(idx, 0, dragged);
    setDragIdx(idx);
    setItems(next);
  };

  return (
    <div className={cn("inline-flex flex-col gap-3 rounded-xl border border-line bg-paper p-5 shadow-sm", className)}>
      <span className="font-mono text-xs text-ink/60">INVENTORY SLOTS (DRAG TO REORDER)</span>
      <div className="flex gap-2.5">
        {items.map((item, idx) => (
          <div
            key={item}
            draggable
            onDragStart={() => handleDragStart(idx)}
            onDragOver={(e) => handleDragOver(e, idx)}
            onDragEnd={() => setDragIdx(null)}
            className={cn(
              "flex h-20 w-24 cursor-grab items-center justify-center rounded-lg border border-line bg-paper p-2 text-center font-mono text-xs font-bold text-ink shadow-sm transition-all select-none active:cursor-grabbing",
              dragIdx === idx ? "opacity-40 border-dashed border-ink scale-95" : "hover:border-ink hover:shadow"
            )}
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}

export default DragDropShelf;
