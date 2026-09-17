"use client";

import { cn } from "@/lib/cn";

export interface PanoramicHeroBannerProps extends React.HTMLAttributes<HTMLDivElement> {
  overlay?: React.ReactNode;
  children?: React.ReactNode;
}

export function PanoramicHeroBanner({ overlay, children, className, ...props }: PanoramicHeroBannerProps) {
  return (
    <div className={cn("relative w-full aspect-[21/9] min-h-[240px] rounded-3xl border border-line bg-surface/50 overflow-hidden flex items-center justify-center p-8 font-sans", className)} {...props}>
      <div className="absolute inset-0 flex items-center justify-center -z-10">{children}</div>
      {overlay && <div className="p-6 rounded-2xl border border-line bg-paper/90 backdrop-blur-md shadow-xl max-w-md text-center">{overlay}</div>}
    </div>
  );
}
