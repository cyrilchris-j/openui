"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface BannerAlertBoxProps {
  title?: string;
  description?: string;
  className?: string;
}

export function BannerAlertBox({
  title = "Registry Validation Warning",
  description = "4 legacy definitions require explicit subcategory assignment before compiling.",
  className,
}: BannerAlertBoxProps) {
  const [closed, setClosed] = useState(false);
  if (closed) return null;

  return (
    <div className={cn("flex w-full max-w-md items-start justify-between rounded-xl border border-amber-500/40 bg-amber-500/10 p-4 font-mono text-xs", className)}>
      <div>
        <h5 className="font-bold text-amber-800">⚠️ {title}</h5>
        <p className="mt-1 text-amber-900/80 leading-relaxed">{description}</p>
      </div>
      <button
        type="button"
        onClick={() => setClosed(true)}
        className="text-amber-800 hover:text-black ml-3 font-bold"
      >
        ✕
      </button>
    </div>
  );
}

export default BannerAlertBox;
