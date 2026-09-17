"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface DragDropKanbanBoardProps {
  className?: string;
}

export function DragDropKanbanBoard({ className }: DragDropKanbanBoardProps) {
  const [todo, setTodo] = useState(["Verify DNA", "Typecheck Registry"]);
  const [done, setDone] = useState(["Draft Batch Specs"]);

  const advance = (item: string) => {
    setTodo((t) => t.filter((i) => i !== item));
    setDone((d) => [...d, item]);
  };

  return (
    <div className={cn("grid grid-cols-2 gap-3 w-full max-w-md rounded-xl border border-line bg-paper p-4 shadow-sm", className)}>
      <div className="space-y-2">
        <span className="font-mono text-[10px] text-ink/50 uppercase">BACKLOG</span>
        {todo.map((item) => (
          <div
            key={item}
            onClick={() => advance(item)}
            className="rounded border border-line bg-line/10 p-2 font-mono text-xs cursor-pointer hover:border-ink"
          >
            {item} →
          </div>
        ))}
      </div>

      <div className="space-y-2 border-l border-line pl-3">
        <span className="font-mono text-[10px] text-emerald-600 font-bold uppercase">COMPLETED</span>
        {done.map((item) => (
          <div key={item} className="rounded border border-line bg-paper p-2 font-mono text-xs text-ink/60">
            ✓ {item}
          </div>
        ))}
      </div>
    </div>
  );
}

export default DragDropKanbanBoard;
