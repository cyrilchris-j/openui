"use client";

import { useRef, useState } from "react";
import { cn } from "@/lib/cn";

export interface DragSnapGridProps {
  labels: string[];
  columns?: number;
  className?: string;
}

export function DragSnapGrid({ labels, columns = 3, className }: DragSnapGridProps) {
  const [order, setOrder] = useState(labels.map((_, index) => index));
  const dragIndex = useRef<number | null>(null);
  const cellRefs = useRef<Array<HTMLDivElement | null>>([]);
  const reduced =
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

  const handleDrop = (event: React.DragEvent, cell: number) => {
    event.preventDefault();
    const from = dragIndex.current;
    dragIndex.current = null;
    if (from === null || from === cell) return;
    setOrder((current) => {
      const next = [...current];
      const [moved] = next.splice(from, 1);
      next.splice(cell, 0, moved!);
      return next;
    });
  };

  return (
    <div
      className={cn("grid gap-2", className)}
      style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}
    >
      {order.map((labelIndex, cell) => (
        <div
          key={cell}
          ref={(node) => {
            cellRefs.current[cell] = node;
          }}
          onDragOver={(event) => event.preventDefault()}
          onDrop={(event) => handleDrop(event, cell)}
          className={cn(
            "flex h-16 cursor-grab items-center justify-center rounded-xl border font-display text-ink transition-colors active:cursor-grabbing",
            cell % 2 === 0 ? "border-line bg-paper" : "border-line bg-line/20",
          )}
          draggable={!reduced}
          onDragStart={() => {
            dragIndex.current = cell;
          }}
        >
          {labels[labelIndex]}
        </div>
      ))}
    </div>
  );
}

export default DragSnapGrid;
