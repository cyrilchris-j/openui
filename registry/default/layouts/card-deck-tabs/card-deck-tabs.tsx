"use client";

import { cn } from "@/lib/cn";

export interface CardDeckTabsProps extends React.HTMLAttributes<HTMLDivElement> {
  tabs?: React.ReactNode;
  children?: React.ReactNode;
}

export function CardDeckTabs({ tabs, children, className, ...props }: CardDeckTabsProps) {
  return (
    <div className={cn("max-w-xl mx-auto font-sans text-xs", className)} {...props}>
      <div className="flex gap-2 mb-2 px-2">{tabs}</div>
      <div className="p-6 rounded-2xl border border-line bg-paper shadow-sm">{children}</div>
    </div>
  );
}
