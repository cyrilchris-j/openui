"use client";

import { cn } from "@/lib/cn";

export interface PanAndZoomStageProps extends React.HTMLAttributes<HTMLDivElement> {
  minimap?: React.ReactNode;
  children?: React.ReactNode;
}

export function PanAndZoomStage({ minimap, children, className, ...props }: PanAndZoomStageProps) {
  return (
    <div className={cn("relative w-full h-80 bg-paper text-ink overflow-hidden border border-line rounded-xl", className)} {...props}>
      <div className="absolute inset-0 flex items-center justify-center -z-10">{children}</div>
      {minimap && <div className="absolute bottom-3 right-3 p-1.5 rounded-lg border border-line bg-paper/90 shadow-md">{minimap}</div>}
    </div>
  );
}
