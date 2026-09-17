"use client";

import { cn } from "@/lib/cn";

export interface SplitReadingNotesProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export function SplitReadingNotes({ children, className, ...props }: SplitReadingNotesProps) {
  return (
    <article className={cn("max-w-4xl mx-auto p-6 font-serif text-ink space-y-8", className)} {...props}>
      {children}
    </article>
  );
}
