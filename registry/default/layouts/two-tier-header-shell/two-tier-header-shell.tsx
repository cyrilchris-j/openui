"use client";

import { cn } from "@/lib/cn";

export interface TwoTierHeaderShellProps extends React.HTMLAttributes<HTMLDivElement> {
  brand?: React.ReactNode;
  utilities?: React.ReactNode;
  tabs?: React.ReactNode;
  children?: React.ReactNode;
}

export function TwoTierHeaderShell({
  brand,
  utilities,
  tabs,
  children,
  className,
  ...props
}: TwoTierHeaderShellProps) {
  return (
    <div className={cn("min-h-[360px] flex flex-col w-full bg-paper text-ink font-sans", className)} {...props}>
      <header className="border-b border-line shrink-0 bg-surface/30">
        <div className="flex items-center justify-between px-6 py-3 border-b border-line/60">
          <div className="font-bold text-sm">{brand}</div>
          <div className="flex items-center gap-2">{utilities}</div>
        </div>
        <div className="px-6 py-2 flex items-center gap-4 text-xs font-mono">{tabs}</div>
      </header>
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
