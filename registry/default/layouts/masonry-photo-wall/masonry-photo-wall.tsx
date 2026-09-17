"use client";

import { cn } from "@/lib/cn";

export interface MasonryPhotoWallProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export function MasonryPhotoWall({ children, className, ...props }: MasonryPhotoWallProps) {
  return (
    <div className={cn("grid grid-cols-2 md:grid-cols-4 max-w-5xl mx-auto rounded-2xl overflow-hidden border border-line", className)} {...props}>
      {children}
    </div>
  );
}
