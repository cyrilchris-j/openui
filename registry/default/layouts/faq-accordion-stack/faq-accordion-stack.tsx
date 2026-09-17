"use client";

import { cn } from "@/lib/cn";

export interface FAQAccordionStackProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export function FAQAccordionStack({ children, className, ...props }: FAQAccordionStackProps) {
  return (
    <div className={cn("max-w-2xl mx-auto p-6 space-y-3 font-sans", className)} {...props}>
      {children}
    </div>
  );
}
