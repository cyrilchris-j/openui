"use client";

import { cn } from "@/lib/cn";

export interface VintageEngravingShadingProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export function VintageEngravingShading({ className, children, ...props }: VintageEngravingShadingProps) {
  return (
    <div className={cn("relative isolate w-full min-h-full bg-paper text-ink overflow-hidden", className)} {...props}>
      <svg className="absolute inset-0 w-full h-full opacity-15 pointer-events-none -z-10" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="engraving-pat" width="40" height="20" patternUnits="userSpaceOnUse">
            <path d="M0 5 Q20 0 40 5 M0 10 Q20 5 40 10 M0 15 Q20 10 40 15 M0 20 Q20 15 40 20" fill="none" stroke="currentColor" strokeWidth="0.75" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#engraving-pat)" />
      </svg>
      {children}
    </div>
  );
}
