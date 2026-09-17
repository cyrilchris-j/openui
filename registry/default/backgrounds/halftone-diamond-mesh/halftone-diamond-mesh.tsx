"use client";

import { cn } from "@/lib/cn";

export interface HalftoneDiamondMeshProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export function HalftoneDiamondMesh({ className, children, ...props }: HalftoneDiamondMeshProps) {
  return (
    <div className={cn("relative isolate w-full min-h-full bg-paper text-ink overflow-hidden", className)} {...props}>
      <svg className="absolute inset-0 w-full h-full opacity-15 pointer-events-none -z-10" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="dia-half-pat" width="24" height="24" patternUnits="userSpaceOnUse">
            <polygon points="12,6 18,12 12,18 6,12" fill="currentColor" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#dia-half-pat)" />
      </svg>
      {children}
    </div>
  );
}
