"use client";

import { cn } from "@/lib/cn";

export interface MosaicGalleryGridProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export function MosaicGalleryGrid({ children, className, ...props }: MosaicGalleryGridProps) {
  return (
    <div className={cn("grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto p-4 font-sans", className)} {...props}>
      {children}
    </div>
  );
}
