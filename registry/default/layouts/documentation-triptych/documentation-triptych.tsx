"use client";

import { cn } from "@/lib/cn";

export interface DocumentationTriptychProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "content"> {
  sidebar?: React.ReactNode;
  content?: React.ReactNode;
  toc?: React.ReactNode;
  children?: React.ReactNode;
}

export function DocumentationTriptych({
  sidebar,
  content,
  toc,
  children,
  className,
  ...props
}: DocumentationTriptychProps) {
  return (
    <div className={cn("min-h-[400px] flex w-full bg-paper text-ink font-sans", className)} {...props}>
      {sidebar && <nav className="w-56 border-r border-line p-4 shrink-0 hidden md:block">{sidebar}</nav>}
      <article className="flex-1 p-8 max-w-3xl min-w-0">{content || children}</article>
      {toc && <aside className="w-56 border-l border-line p-4 shrink-0 hidden lg:block text-xs font-mono">{toc}</aside>}
    </div>
  );
}
