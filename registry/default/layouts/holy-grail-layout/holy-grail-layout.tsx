"use client";

import { cn } from "@/lib/cn";

export interface HolyGrailLayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  header?: React.ReactNode;
  nav?: React.ReactNode;
  main?: React.ReactNode;
  aside?: React.ReactNode;
  footer?: React.ReactNode;
  children?: React.ReactNode;
}

export function HolyGrailLayout({
  header,
  nav,
  main,
  aside,
  footer,
  children,
  className,
  ...props
}: HolyGrailLayoutProps) {
  return (
    <div className={cn("min-h-screen flex flex-col bg-paper text-ink font-sans", className)} {...props}>
      {header && <header className="border-b border-line p-4 shrink-0 bg-surface/50">{header}</header>}
      <div className="flex-1 flex flex-col md:flex-row">
        {nav && <nav className="w-full md:w-56 border-b md:border-b-0 md:border-r border-line p-4 shrink-0 bg-surface/20">{nav}</nav>}
        <main className="flex-1 p-6 min-w-0">{main || children}</main>
        {aside && <aside className="w-full md:w-64 border-t md:border-t-0 md:border-l border-line p-4 shrink-0 bg-surface/20">{aside}</aside>}
      </div>
      {footer && <footer className="border-t border-line p-4 shrink-0 bg-surface/50 text-xs text-ink/60">{footer}</footer>}
    </div>
  );
}
