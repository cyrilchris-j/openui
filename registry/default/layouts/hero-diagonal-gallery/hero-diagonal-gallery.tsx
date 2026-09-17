"use client";

import { cn } from "@/lib/cn";

export interface HeroDiagonalGalleryProps extends React.HTMLAttributes<HTMLDivElement> {
  headline?: React.ReactNode;
  children?: React.ReactNode;
}

export function HeroDiagonalGallery({ headline, children, className, ...props }: HeroDiagonalGalleryProps) {
  return (
    <div className={cn("relative min-h-[360px] w-full rounded-2xl border border-line bg-paper overflow-hidden p-8 flex items-center font-sans", className)} {...props}>
      <div className="max-w-md z-10">{headline}</div>
      <div className="absolute right-0 top-0 bottom-0 w-1/2 flex gap-4 -rotate-12 translate-x-12 opacity-40 pointer-events-none">
        {children}
      </div>
    </div>
  );
}
