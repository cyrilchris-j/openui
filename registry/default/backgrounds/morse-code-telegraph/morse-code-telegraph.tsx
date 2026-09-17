"use client";

import { cn } from "@/lib/cn";

export interface MorseCodeTelegraphProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export function MorseCodeTelegraph({ className, children, ...props }: MorseCodeTelegraphProps) {
  return (
    <div className={cn("relative isolate w-full min-h-full bg-paper text-ink overflow-hidden", className)} {...props}>
      <svg className="absolute inset-0 w-full h-full opacity-15 pointer-events-none -z-10" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="morse-pat" width="80" height="24" patternUnits="userSpaceOnUse">
            <rect x="5" y="11" width="4" height="2" rx="1" fill="currentColor" />
            <rect x="15" y="11" width="14" height="2" rx="1" fill="currentColor" />
            <rect x="35" y="11" width="4" height="2" rx="1" fill="currentColor" />
            <rect x="45" y="11" width="4" height="2" rx="1" fill="currentColor" />
            <rect x="55" y="11" width="18" height="2" rx="1" fill="currentColor" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#morse-pat)" />
      </svg>
      {children}
    </div>
  );
}
