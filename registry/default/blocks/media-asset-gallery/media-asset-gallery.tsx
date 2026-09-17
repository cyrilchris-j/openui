"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

export function MediaAssetGallery({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const assets = [
    { title: "hero-poster.png", res: "3840x2160", size: "1.8 MB" },
    { title: "brand-symbol.svg", res: "Vector", size: "16 KB" },
    { title: "product-mockup.webp", res: "1920x1080", size: "420 KB" },
  ];

  return (
    <div className={cn("w-full max-w-4xl mx-auto p-6 bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-sm text-xs", className)} {...props}>
      <h3 className="text-base font-bold text-neutral-900 dark:text-white mb-4">Media Library</h3>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {assets.map((a) => (
          <div key={a.title} className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900">
            <div className="h-28 rounded-lg bg-neutral-200 dark:bg-neutral-800 flex items-center justify-center font-mono text-neutral-400 text-[10px]">
              [IMAGE PREVIEW]
            </div>
            <div className="font-semibold text-neutral-900 dark:text-white mt-2 truncate">{a.title}</div>
            <div className="flex justify-between text-neutral-400 text-[11px] mt-1">
              <span>{a.res}</span>
              <span>{a.size}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
