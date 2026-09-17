"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface GestureSwipeActionListProps {
  className?: string;
}

export function GestureSwipeActionList({ className }: GestureSwipeActionListProps) {
  const [items, setItems] = useState([
    { id: 1, text: "Verify DNA Schema Enums", status: "pending" },
    { id: 2, text: "Materialize Resource Batches", status: "pending" },
  ]);

  const toggleComplete = (id: number) => {
    setItems((prev) =>
      prev.map((it) => (it.id === id ? { ...it, status: it.status === "done" ? "pending" : "done" } : it))
    );
  };

  return (
    <div className={cn("w-full max-w-sm rounded-xl border border-line bg-paper p-4 shadow-sm", className)}>
      <span className="font-mono text-xs text-ink/60 uppercase mb-3 block">GESTURE ACTION LIST</span>

      <div className="space-y-2">
        {items.map((item) => (
          <div
            key={item.id}
            onClick={() => toggleComplete(item.id)}
            className="flex items-center justify-between rounded-lg border border-line bg-line/10 p-3 font-mono text-xs cursor-pointer hover:border-ink transition-all"
          >
            <span className={cn(item.status === "done" && "line-through text-ink/40")}>{item.text}</span>
            <span className="text-[10px] font-bold">{item.status === "done" ? "✓" : "○"}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default GestureSwipeActionList;
