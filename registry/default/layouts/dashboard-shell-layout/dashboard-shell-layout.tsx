"use client";

import { cn } from "@/lib/cn";

export interface DashboardShellLayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  sidebar?: React.ReactNode;
  topbar?: React.ReactNode;
  children?: React.ReactNode;
}

export function DashboardShellLayout({
  sidebar,
  topbar,
  children,
  className,
  ...props
}: DashboardShellLayoutProps) {
  return (
    <div className={cn("min-h-[400px] flex bg-paper text-ink font-sans w-full", className)} {...props}>
      {sidebar && <aside className="w-60 border-r border-line p-4 shrink-0 bg-surface/30 hidden sm:block">{sidebar}</aside>}
      <div className="flex-1 flex flex-col min-w-0">
        {topbar && <header className="h-14 border-b border-line px-4 flex items-center shrink-0 bg-surface/20">{topbar}</header>}
        <main className="flex-1 p-6 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
