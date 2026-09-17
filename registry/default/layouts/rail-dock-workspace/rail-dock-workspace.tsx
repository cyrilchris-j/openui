"use client";

import { cn } from "@/lib/cn";

export interface RailDockWorkspaceProps extends React.HTMLAttributes<HTMLDivElement> {
  rail?: React.ReactNode;
  drawer?: React.ReactNode;
  children?: React.ReactNode;
}

export function RailDockWorkspace({ rail, drawer, children, className, ...props }: RailDockWorkspaceProps) {
  return (
    <div className={cn("min-h-[380px] flex w-full bg-paper text-ink font-sans", className)} {...props}>
      {rail && <div className="w-12 border-r border-line flex flex-col items-center py-3 gap-3 shrink-0 bg-surface/40">{rail}</div>}
      {drawer && <div className="w-52 border-r border-line p-3 shrink-0 bg-surface/20 hidden sm:block">{drawer}</div>}
      <main className="flex-1 p-6 min-w-0">{children}</main>
    </div>
  );
}
