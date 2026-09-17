"use client";

import { cn } from "@/lib/cn";

export interface AppSettingsRailProps extends React.HTMLAttributes<HTMLDivElement> {
  nav?: React.ReactNode;
  children?: React.ReactNode;
}

export function AppSettingsRail({ nav, children, className, ...props }: AppSettingsRailProps) {
  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-12 gap-6 max-w-4xl mx-auto p-4 font-sans items-start", className)} {...props}>
      {nav && <nav className="md:col-span-4 border-r border-line p-3 space-y-1">{nav}</nav>}
      <main className="md:col-span-8 p-3 space-y-6">{children}</main>
    </div>
  );
}
