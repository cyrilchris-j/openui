"use client";

import { cn } from "@/lib/cn";

export interface TwoColumnHelpCenterProps extends React.HTMLAttributes<HTMLDivElement> {
  categories?: React.ReactNode;
  articles?: React.ReactNode;
}

export function TwoColumnHelpCenter({ categories, articles, className, ...props }: TwoColumnHelpCenterProps) {
  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-12 gap-8 max-w-5xl mx-auto p-6 font-sans items-start", className)} {...props}>
      <aside className="md:col-span-4 space-y-2">{categories}</aside>
      <main className="md:col-span-8 space-y-4">{articles}</main>
    </div>
  );
}
