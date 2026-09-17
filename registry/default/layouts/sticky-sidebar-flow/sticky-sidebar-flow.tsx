"use client";

import { cn } from "@/lib/cn";

export interface StickySidebarFlowProps extends React.HTMLAttributes<HTMLDivElement> {
  sidebar?: React.ReactNode;
  children?: React.ReactNode;
}

export function StickySidebarFlow({ sidebar, children, className, ...props }: StickySidebarFlowProps) {
  return (
    <div className={cn("grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-5xl mx-auto p-6 font-sans items-start", className)} {...props}>
      <div className="lg:col-span-8 min-w-0">{children}</div>
      {sidebar && <aside className="lg:col-span-4 lg:sticky lg:top-6 space-y-4">{sidebar}</aside>}
    </div>
  );
}
