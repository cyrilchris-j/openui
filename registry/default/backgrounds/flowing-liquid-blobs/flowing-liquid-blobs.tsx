"use client";

import { cn } from "@/lib/cn";

export interface FlowingLiquidBlobsProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export function FlowingLiquidBlobs({ className, children, ...props }: FlowingLiquidBlobsProps) {
  return (
    <div className={cn("relative isolate w-full min-h-full bg-paper text-ink overflow-hidden", className)} {...props}>
      <svg className="absolute -top-20 -left-20 w-96 h-96 opacity-20 pointer-events-none -z-10 text-accent" viewBox="0 0 200 200" fill="currentColor">
        <path d="M42.7,-62.9C53.9,-54.2,60.8,-40.4,66.1,-26.4C71.3,-12.4,74.9,1.8,72.4,15.4C70,29.1,61.4,42.2,50.1,51.8C38.8,61.4,24.8,67.5,9.6,71.2C-5.6,74.8,-22,76,-36.8,70.3C-51.6,64.6,-64.8,52,-72.1,36.8C-79.4,21.6,-80.8,3.9,-77,-12.3C-73.2,-28.5,-64.2,-43.2,-51.6,-51.7C-39,-60.2,-22.8,-62.5,-6.3,-64.5C10.2,-66.5,31.5,-71.6,42.7,-62.9Z" transform="translate(100 100)" />
      </svg>
      <svg className="absolute -bottom-20 -right-20 w-96 h-96 opacity-15 pointer-events-none -z-10 text-emerald-500" viewBox="0 0 200 200" fill="currentColor">
        <path d="M38.1,-52C49.1,-46.3,57.5,-34.5,63.1,-21.2C68.6,-7.9,71.3,7,67.7,20.4C64.2,33.8,54.4,45.8,42.4,53.2C30.4,60.7,16.2,63.6,1.4,61.7C-13.4,59.7,-28.9,53,-41.6,43.2C-54.3,33.4,-64.2,20.5,-67.2,5.8C-70.2,-8.9,-66.3,-25.4,-56.9,-36.6C-47.5,-47.8,-32.6,-53.7,-18.8,-57.4C-5,-61.1,7.1,-62.6,21.1,-58.5C35.1,-54.4,27.1,-57.7,38.1,-52Z" transform="translate(100 100)" />
      </svg>
      {children}
    </div>
  );
}
