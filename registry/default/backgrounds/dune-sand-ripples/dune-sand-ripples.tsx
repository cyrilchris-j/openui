"use client";

import { cn } from "@/lib/cn";

export interface DuneSandRipplesProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export function DuneSandRipples({ className, children, ...props }: DuneSandRipplesProps) {
  return (
    <div className={cn("relative isolate w-full min-h-full bg-paper text-ink overflow-hidden", className)} {...props}>
      <svg className="absolute inset-0 w-full h-full opacity-15 pointer-events-none -z-10" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="dune-pat" width="100" height="24" patternUnits="userSpaceOnUse">
            <path d="M0 12 Q25 4 50 12 T100 12" fill="none" stroke="currentColor" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#dune-pat)" />
      </svg>
      {children}
    </div>
  );
}
