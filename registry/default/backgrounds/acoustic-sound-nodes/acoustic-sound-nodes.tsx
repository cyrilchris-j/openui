"use client";

import { cn } from "@/lib/cn";

export interface AcousticSoundNodesProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export function AcousticSoundNodes({ className, children, ...props }: AcousticSoundNodesProps) {
  return (
    <div className={cn("relative isolate w-full min-h-full bg-paper text-ink overflow-hidden", className)} {...props}>
      <svg className="absolute inset-0 w-full h-full opacity-15 pointer-events-none -z-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400">
        <circle cx="300" cy="200" r="140" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="4 2" />
        <line x1="160" y1="200" x2="440" y2="200" stroke="currentColor" strokeWidth="1" />
        <line x1="300" y1="60" x2="300" y2="340" stroke="currentColor" strokeWidth="1" />
        <path d="M200 100 Q300 200 400 100" fill="none" stroke="currentColor" strokeWidth="1" />
        <path d="M200 300 Q300 200 400 300" fill="none" stroke="currentColor" strokeWidth="1" />
      </svg>
      {children}
    </div>
  );
}
