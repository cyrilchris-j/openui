"use client";

import { KanbanMiniColumn } from "./kanban-mini-column";

export default function KanbanMiniColumnDemo() {
  return (
    <div className="flex items-center justify-center p-8 bg-surface/20 min-h-[300px]">
      <KanbanMiniColumn />
    </div>
  );
}
