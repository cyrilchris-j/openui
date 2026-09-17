"use client";

import { cn } from "@/lib/cn";

export interface SearchResultsGridProps extends React.HTMLAttributes<HTMLDivElement> {
  filters?: React.ReactNode;
  children?: React.ReactNode;
}

export function SearchResultsGrid({ filters, children, className, ...props }: SearchResultsGridProps) {
  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-12 gap-6 max-w-5xl mx-auto p-4 font-sans items-start", className)} {...props}>
      {filters && <aside className="md:col-span-3 p-3 rounded-xl border border-line bg-surface/30 space-y-2">{filters}</aside>}
      <main className="md:col-span-9 grid grid-cols-1 sm:grid-cols-2 gap-4">{children}</main>
    </div>
  );
}
