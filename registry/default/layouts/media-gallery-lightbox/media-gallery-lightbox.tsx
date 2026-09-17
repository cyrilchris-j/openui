"use client";

import { cn } from "@/lib/cn";

export interface MediaGalleryLightboxProps extends React.HTMLAttributes<HTMLDivElement> {
  feature?: React.ReactNode;
  children?: React.ReactNode;
}

export function MediaGalleryLightbox({ feature, children, className, ...props }: MediaGalleryLightboxProps) {
  return (
    <div className={cn("max-w-4xl mx-auto p-4 space-y-4 font-sans", className)} {...props}>
      <div className="h-64 rounded-2xl border border-line bg-surface/40 flex items-center justify-center font-mono text-xs">{feature}</div>
      <div className="grid grid-cols-4 gap-3">{children}</div>
    </div>
  );
}
