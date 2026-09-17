"use client";

import { cn } from "@/lib/cn";

export interface FeedStreamLayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  nav?: React.ReactNode;
  feed?: React.ReactNode;
  aside?: React.ReactNode;
}

export function FeedStreamLayout({ nav, feed, aside, className, ...props }: FeedStreamLayoutProps) {
  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-12 gap-6 max-w-6xl mx-auto p-4 font-sans items-start", className)} {...props}>
      {nav && <nav className="md:col-span-3 border-r border-line p-3 hidden md:block">{nav}</nav>}
      <main className="md:col-span-6 space-y-4">{feed}</main>
      {aside && <aside className="md:col-span-3 border-l border-line p-3 hidden lg:block">{aside}</aside>}
    </div>
  );
}
