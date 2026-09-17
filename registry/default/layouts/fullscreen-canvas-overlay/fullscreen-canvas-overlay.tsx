"use client";

import { cn } from "@/lib/cn";

export interface FullscreenCanvasOverlayProps extends React.HTMLAttributes<HTMLDivElement> {
  topLeft?: React.ReactNode;
  topRight?: React.ReactNode;
  bottomLeft?: React.ReactNode;
  bottomRight?: React.ReactNode;
  children?: React.ReactNode;
}

export function FullscreenCanvasOverlay({
  topLeft,
  topRight,
  bottomLeft,
  bottomRight,
  children,
  className,
  ...props
}: FullscreenCanvasOverlayProps) {
  return (
    <div className={cn("relative w-full h-80 bg-paper text-ink overflow-hidden border border-line rounded-xl", className)} {...props}>
      <div className="absolute inset-0 flex items-center justify-center -z-10">{children}</div>
      {topLeft && <div className="absolute top-3 left-3 z-10">{topLeft}</div>}
      {topRight && <div className="absolute top-3 right-3 z-10">{topRight}</div>}
      {bottomLeft && <div className="absolute bottom-3 left-3 z-10">{bottomLeft}</div>}
      {bottomRight && <div className="absolute bottom-3 right-3 z-10">{bottomRight}</div>}
    </div>
  );
}
