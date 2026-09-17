"use client";

import { cn } from "@/lib/cn";

export interface MultiColumnKanbanBoardProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export function MultiColumnKanbanBoard({ children, className, ...props }: MultiColumnKanbanBoardProps) {
  return (
    <div className={cn("flex gap-4 overflow-x-auto p-4 min-h-[380px] w-full font-sans bg-surface/20 rounded-xl border border-line", className)} {...props}>
      {children}
    </div>
  );
}
