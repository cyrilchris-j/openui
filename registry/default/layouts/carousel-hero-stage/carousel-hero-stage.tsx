"use client";

import { cn } from "@/lib/cn";

export interface CarouselHeroStageProps extends React.HTMLAttributes<HTMLDivElement> {
  controls?: React.ReactNode;
  children?: React.ReactNode;
}

export function CarouselHeroStage({ controls, children, className, ...props }: CarouselHeroStageProps) {
  return (
    <div className={cn("relative w-full h-72 rounded-3xl border border-line bg-surface/30 overflow-hidden flex flex-col justify-between p-8 font-sans", className)} {...props}>
      <div className="flex-1 flex items-center justify-center">{children}</div>
      {controls && <div className="flex justify-center">{controls}</div>}
    </div>
  );
}
