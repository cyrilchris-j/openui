"use client";

import { cn } from "@/lib/cn";

export interface CenteredReadingProseProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export function CenteredReadingProse({ children, className, ...props }: CenteredReadingProseProps) {
  return (
    <div className={cn("max-w-2xl mx-auto px-6 py-12 font-serif text-ink text-base leading-relaxed space-y-6", className)} {...props}>
      {children}
    </div>
  );
}
