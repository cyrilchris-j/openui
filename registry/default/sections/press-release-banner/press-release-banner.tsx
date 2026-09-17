"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

export interface PressReleaseBannerProps extends React.HTMLAttributes<HTMLElement> {
  tag?: string;
  message?: string;
  actionText?: string;
}

export function PressReleaseBanner({
  tag = "ANNOUNCEMENT",
  message = "OpenUI announces completion of 800 certified open-source resources with automated verification.",
  actionText = "Read the release →",
  className,
  ...props
}: PressReleaseBannerProps) {
  const [visible, setVisible] = React.useState(true);

  if (!visible) return null;

  return (
    <section
      className={cn(
        "w-full bg-neutral-900 text-white py-3 px-4 md:px-8 border-b border-neutral-800",
        className
      )}
      {...props}
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-4 text-xs">
        <div className="flex items-center gap-3 overflow-hidden">
          <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500 text-black shrink-0">
            {tag}
          </span>
          <span className="truncate text-neutral-300 font-medium">
            {message}
          </span>
          <a href="#press" className="text-emerald-400 font-semibold hover:underline shrink-0 hidden sm:inline">
            {actionText}
          </a>
        </div>
        <button
          type="button"
          onClick={() => setVisible(false)}
          className="text-neutral-400 hover:text-white text-sm shrink-0"
          aria-label="Dismiss banner"
        >
          ✕
        </button>
      </div>
    </section>
  );
}
