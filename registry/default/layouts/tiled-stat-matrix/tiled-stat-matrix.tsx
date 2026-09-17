"use client";

import { cn } from "@/lib/cn";

export interface TiledStatMatrixProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export function TiledStatMatrix({ children, className, ...props }: TiledStatMatrixProps) {
  return (
    <div className={cn("grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto p-4 font-sans", className)} {...props}>
      {children}
    </div>
  );
}
