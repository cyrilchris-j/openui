"use client";

import { cn } from "@/lib/cn";

export interface ProfileHeaderTabsProps extends React.HTMLAttributes<HTMLDivElement> {
  banner?: React.ReactNode;
  avatar?: React.ReactNode;
  info?: React.ReactNode;
  tabs?: React.ReactNode;
  children?: React.ReactNode;
}

export function ProfileHeaderTabs({
  banner,
  avatar,
  info,
  tabs,
  children,
  className,
  ...props
}: ProfileHeaderTabsProps) {
  return (
    <div className={cn("max-w-4xl mx-auto rounded-2xl border border-line overflow-hidden bg-paper font-sans", className)} {...props}>
      <div className="h-32 bg-surface/60 border-b border-line">{banner}</div>
      <div className="px-6 pb-4">
        <div className="flex items-end justify-between -mt-10 mb-3">
          <div className="w-20 h-20 rounded-full border-4 border-paper bg-accent text-white flex items-center justify-center font-bold text-lg">
            {avatar}
          </div>
          <div>{info}</div>
        </div>
        <div className="border-b border-line pb-2 flex gap-4 text-xs font-mono">{tabs}</div>
      </div>
      <div className="p-6">{children}</div>
    </div>
  );
}
