"use client";

import { cn } from "@/lib/cn";

export interface CyberneticHexShieldProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export function CyberneticHexShield({ className, children, ...props }: CyberneticHexShieldProps) {
  return (
    <div className={cn("relative isolate w-full min-h-full bg-slate-950 text-cyan-400 overflow-hidden", className)} {...props}>
      <svg className="absolute inset-0 w-full h-full opacity-25 pointer-events-none -z-10" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="shield-hex" width="40" height="34.64" patternUnits="userSpaceOnUse">
            <polygon points="10,0 30,0 40,17.32 30,34.64 10,34.64 0,17.32" fill="none" stroke="currentColor" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#shield-hex)" />
      </svg>
      {children}
    </div>
  );
}
