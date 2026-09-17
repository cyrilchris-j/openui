"use client";

import { cn } from "@/lib/cn";

export interface SplitScreenBillboardProps extends React.HTMLAttributes<HTMLDivElement> {
  visual?: React.ReactNode;
  narrative?: React.ReactNode;
  children?: React.ReactNode;
}

export function SplitScreenBillboard({
  visual,
  narrative,
  children,
  className,
  ...props
}: SplitScreenBillboardProps) {
  return (
    <div className={cn("grid grid-cols-1 lg:grid-cols-2 min-h-[400px] w-full bg-paper text-ink font-sans", className)} {...props}>
      <div className="lg:sticky lg:top-0 h-72 lg:h-auto border-b lg:border-b-0 lg:border-r border-line p-8 flex items-center justify-center bg-surface/30">
        {visual}
      </div>
      <div className="p-8 space-y-6 overflow-y-auto">
        {narrative || children}
      </div>
    </div>
  );
}
