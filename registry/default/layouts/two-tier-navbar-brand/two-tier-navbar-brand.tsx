"use client";

import { cn } from "@/lib/cn";

export interface TwoTierNavbarBrandProps extends React.HTMLAttributes<HTMLDivElement> {
  topStrip?: React.ReactNode;
  mainNav?: React.ReactNode;
  children?: React.ReactNode;
}

export function TwoTierNavbarBrand({ topStrip, mainNav, children, className, ...props }: TwoTierNavbarBrandProps) {
  return (
    <div className={cn("w-full border border-line rounded-xl overflow-hidden font-sans bg-paper", className)} {...props}>
      <div className="p-2 bg-surface/50 border-b border-line flex justify-between px-6 text-[11px] font-mono text-ink/60">{topStrip}</div>
      <header className="p-4 border-b border-line flex items-center justify-between px-6">{mainNav}</header>
      <main className="p-6">{children}</main>
    </div>
  );
}
