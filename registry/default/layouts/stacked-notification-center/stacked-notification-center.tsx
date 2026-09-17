"use client";

import { cn } from "@/lib/cn";

export interface StackedNotificationCenterProps extends React.HTMLAttributes<HTMLDivElement> {
  header?: React.ReactNode;
  children?: React.ReactNode;
}

export function StackedNotificationCenter({ header, children, className, ...props }: StackedNotificationCenterProps) {
  return (
    <div className={cn("max-w-md mx-auto p-4 rounded-2xl border border-line bg-paper font-sans text-xs shadow-sm space-y-3", className)} {...props}>
      {header && <div className="flex items-center justify-between pb-2 border-b border-line">{header}</div>}
      <div className="space-y-2">{children}</div>
    </div>
  );
}
