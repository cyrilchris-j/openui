"use client";

import { cn } from "@/lib/cn";

export interface PinnedHeaderStickyFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  header?: React.ReactNode;
  footer?: React.ReactNode;
  children?: React.ReactNode;
}

export function PinnedHeaderStickyFooter({
  header,
  footer,
  children,
  className,
  ...props
}: PinnedHeaderStickyFooterProps) {
  return (
    <div className={cn("h-80 flex flex-col w-full border border-line rounded-xl overflow-hidden bg-paper text-ink font-sans", className)} {...props}>
      {header && <header className="p-3 border-b border-line bg-surface/30 shrink-0 font-bold text-xs">{header}</header>}
      <main className="flex-1 p-4 overflow-y-auto">{children}</main>
      {footer && <footer className="p-3 border-t border-line bg-surface/30 shrink-0 flex items-center justify-between text-xs">{footer}</footer>}
    </div>
  );
}
