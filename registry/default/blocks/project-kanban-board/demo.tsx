"use client";

import { ProjectKanbanBoard } from "./project-kanban-board";

export default function Demo() {
  return (
    <div className="w-full min-h-[450px] p-4 flex items-center justify-center bg-neutral-100 dark:bg-neutral-900">
      <ProjectKanbanBoard />
    </div>
  );
}
