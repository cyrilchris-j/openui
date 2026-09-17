"use client";

import { cn } from "@/lib/cn";

export interface MultiStepFormRailProps extends React.HTMLAttributes<HTMLDivElement> {
  rail?: React.ReactNode;
  children?: React.ReactNode;
}

export function MultiStepFormRail({ rail, children, className, ...props }: MultiStepFormRailProps) {
  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-12 gap-6 max-w-4xl mx-auto p-6 font-sans items-start", className)} {...props}>
      <aside className="md:col-span-4 border-r border-line p-4 space-y-2">{rail}</aside>
      <main className="md:col-span-8 p-4">{children}</main>
    </div>
  );
}
