"use client";

import { cn } from "@/lib/cn";

export interface StackedCardDeckProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export function StackedCardDeck({ children, className, ...props }: StackedCardDeckProps) {
  return (
    <div className={cn("space-y-6 max-w-2xl mx-auto p-4 font-sans", className)} {...props}>
      {children}
    </div>
  );
}
