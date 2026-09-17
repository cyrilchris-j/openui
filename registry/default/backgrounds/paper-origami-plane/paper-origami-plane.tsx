"use client";

import { cn } from "@/lib/cn";

export interface PaperOrigamiPlaneProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export function PaperOrigamiPlane({ className, children, ...props }: PaperOrigamiPlaneProps) {
  return (
    <div className={cn("relative isolate w-full min-h-full bg-paper text-ink overflow-hidden", className)} {...props}>
      <svg className="absolute inset-0 w-full h-full opacity-15 pointer-events-none -z-10" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="plane-pat" width="60" height="60" patternUnits="userSpaceOnUse">
            <polygon points="10,50 30,10 50,50 30,40" fill="none" stroke="currentColor" strokeWidth="1" />
            <line x1="30" y1="10" x2="30" y2="40" stroke="currentColor" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#plane-pat)" />
      </svg>
      {children}
    </div>
  );
}
