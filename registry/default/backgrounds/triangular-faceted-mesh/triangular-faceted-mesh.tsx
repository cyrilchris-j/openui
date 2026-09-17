"use client";

import { cn } from "@/lib/cn";

export interface TriangularFacetedMeshProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export function TriangularFacetedMesh({ className, children, ...props }: TriangularFacetedMeshProps) {
  return (
    <div className={cn("relative isolate w-full min-h-full bg-paper text-ink overflow-hidden", className)} {...props}>
      <svg className="absolute inset-0 w-full h-full opacity-15 pointer-events-none -z-10" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="tri-mesh-pat" width="60" height="52" patternUnits="userSpaceOnUse">
            <path d="M0 0 L30 52 L60 0 Z" fill="none" stroke="currentColor" strokeWidth="1" />
            <path d="M30 52 L60 0 L90 52 Z" fill="none" stroke="currentColor" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#tri-mesh-pat)" />
      </svg>
      {children}
    </div>
  );
}
