"use client";

import { cn } from "@/lib/cn";

export interface CommandCenterHUDProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export function CommandCenterHUD({ children, className, ...props }: CommandCenterHUDProps) {
  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-3 gap-3 p-4 max-w-5xl mx-auto font-mono text-xs bg-slate-950 text-emerald-400 rounded-2xl border border-emerald-500/30", className)} {...props}>
      {children}
    </div>
  );
}
