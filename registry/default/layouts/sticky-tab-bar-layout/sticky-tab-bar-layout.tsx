"use client";

import { cn } from "@/lib/cn";

export interface StickyTabBarLayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  tabs?: React.ReactNode;
  children?: React.ReactNode;
}

export function StickyTabBarLayout({ tabs, children, className, ...props }: StickyTabBarLayoutProps) {
  return (
    <div className={cn("max-w-3xl mx-auto p-4 font-sans", className)} {...props}>
      <div className="sticky top-2 z-20 py-2 mb-4 bg-paper/90 backdrop-blur-md border-b border-line flex gap-4 text-xs font-mono">
        {tabs}
      </div>
      <div className="space-y-4">{children}</div>
    </div>
  );
}
