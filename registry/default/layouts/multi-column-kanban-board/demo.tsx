"use client";

import { MultiColumnKanbanBoard } from "./multi-column-kanban-board";

export default function MultiColumnKanbanBoardDemo() {
  return (
    <MultiColumnKanbanBoard>
      {["Backlog", "In Review", "Done"].map((col) => (
        <div key={col} className="w-64 shrink-0 rounded-xl border border-line bg-paper p-3 flex flex-col gap-2">
          <div className="font-mono text-xs font-bold text-ink">{col}</div>
          <div className="p-2.5 rounded-lg border border-line bg-surface/40 text-xs">Sample Card A</div>
          <div className="p-2.5 rounded-lg border border-line bg-surface/40 text-xs">Sample Card B</div>
        </div>
      ))}
    </MultiColumnKanbanBoard>
  );
}
