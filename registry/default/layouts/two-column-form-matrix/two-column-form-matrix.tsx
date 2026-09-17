"use client";

import { cn } from "@/lib/cn";

export interface TwoColumnFormMatrixProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export function TwoColumnFormMatrix({ children, className, ...props }: TwoColumnFormMatrixProps) {
  return (
    <div className={cn("divide-y divide-line max-w-4xl mx-auto p-4 font-sans", className)} {...props}>
      {children}
    </div>
  );
}
