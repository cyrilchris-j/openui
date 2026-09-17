"use client";

import { cn } from "@/lib/cn";

export interface EditorialChapterOpenerProps extends React.HTMLAttributes<HTMLDivElement> {
  numeral?: string;
  title?: string;
  children?: React.ReactNode;
}

export function EditorialChapterOpener({
  numeral = "IV",
  title = "The Architecture of Clean Interfaces",
  children,
  className,
  ...props
}: EditorialChapterOpenerProps) {
  return (
    <div className={cn("max-w-4xl mx-auto p-8 font-serif text-ink space-y-8", className)} {...props}>
      <div className="border-b-2 border-ink pb-6">
        <div className="text-4xl font-bold font-mono text-accent">{numeral}</div>
        <h1 className="text-2xl font-bold mt-2">{title}</h1>
      </div>
      <div className="columns-1 md:columns-2 gap-8 text-sm leading-relaxed text-ink/90 space-y-4">
        {children}
      </div>
    </div>
  );
}
