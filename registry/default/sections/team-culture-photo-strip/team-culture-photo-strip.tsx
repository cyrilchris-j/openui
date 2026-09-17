"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

export function TeamCulturePhotoStrip({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <section className={cn("w-full py-16 px-4 max-w-5xl mx-auto text-center", className)} {...props}>
      <h2 className="text-3xl font-serif text-neutral-900 dark:text-white">Crafted by Autonomous Thinkers</h2>
      <p className="text-xs text-neutral-500 mt-2 max-w-xl mx-auto">
        A globally distributed collective united by mathematical rigor, open source, and visual beauty.
      </p>
    </section>
  );
}
