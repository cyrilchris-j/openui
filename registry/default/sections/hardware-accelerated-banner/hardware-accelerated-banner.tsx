"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

export function HardwareAcceleratedBanner({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <section className={cn("w-full py-8 border-y border-neutral-800 bg-neutral-950 text-neutral-100 font-mono text-xs text-center", className)} {...props}>
      <span className="text-emerald-400 font-bold">⚡ GPU ACCELERATED:</span> 120 FPS buttery transforms with zero main-thread layout thrashing.
    </section>
  );
}
