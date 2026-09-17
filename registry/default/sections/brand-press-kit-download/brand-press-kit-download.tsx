"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

export interface BrandAsset {
  name: string;
  format: "SVG" | "PNG" | "PDF" | "ZIP";
  size: string;
  description: string;
}

export interface BrandPressKitDownloadProps extends React.HTMLAttributes<HTMLElement> {
  assets?: BrandAsset[];
}

const DEFAULT_ASSETS: BrandAsset[] = [
  { name: "Primary Wordmark (Dark & Light)", format: "SVG", size: "48 KB", description: "Standard vector wordmark for digital displays." },
  { name: "Brand Symbol Monogram", format: "SVG", size: "16 KB", description: "Square icon monogram for favicons and avatars." },
  { name: "Color Palette Guideline Sheet", format: "PDF", size: "1.2 MB", description: "Design DNA tokens, hex codes, and contrast ratios." },
  { name: "Complete Media Press Kit", format: "ZIP", size: "8.4 MB", description: "High-resolution mockups, badges, and founder headshots." },
];

export function BrandPressKitDownload({
  assets = DEFAULT_ASSETS,
  className,
  ...props
}: BrandPressKitDownloadProps) {
  return (
    <section className={cn("w-full py-16 px-4 md:px-8 max-w-5xl mx-auto", className)} {...props}>
      <div className="mb-10">
        <span className="text-xs font-mono uppercase tracking-widest text-neutral-400 font-bold">
          Media Assets
        </span>
        <h2 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100 mt-1">
          Brand Guidelines & Press Kit
        </h2>
        <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-2">
          Official assets for journalists, conference organizers, and partner publications.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {assets.map((asset) => (
          <div
            key={asset.name}
            className="p-5 border border-neutral-200 dark:border-neutral-800 rounded-xl bg-white dark:bg-neutral-950 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 font-bold">
                  {asset.format} • {asset.size}
                </span>
              </div>
              <h3 className="text-sm font-bold text-neutral-900 dark:text-neutral-100 mt-3">
                {asset.name}
              </h3>
              <p className="text-xs text-neutral-500 mt-1">
                {asset.description}
              </p>
            </div>
            <button
              type="button"
              className="mt-6 text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:underline text-left flex items-center gap-1"
            >
              Download Asset ↓
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
