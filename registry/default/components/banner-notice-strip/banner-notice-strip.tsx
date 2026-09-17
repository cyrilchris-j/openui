"use client";

import { cn } from "@/lib/cn";

export interface BannerNoticeStripProps {
  message?: string;
  className?: string;
}

export function BannerNoticeStrip({
  message = "OpenUI 800 Master Catalog expansion currently compiling.",
  className,
}: BannerNoticeStripProps) {
  return (
    <div className={cn("flex w-full items-center justify-between rounded-lg border border-line bg-line/10 px-4 py-2.5 font-mono text-xs shadow-sm", className)}>
      <span className="text-ink font-semibold">📢 {message}</span>
      <button type="button" className="rounded bg-ink px-3 py-1 font-bold text-paper text-[10px]">
        Learn More
      </button>
    </div>
  );
}

export default BannerNoticeStrip;
