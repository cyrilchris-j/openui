"use client";

import { cn } from "@/lib/cn";

export interface DappledForestCanopyProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export function DappledForestCanopy({ className, children, ...props }: DappledForestCanopyProps) {
  return (
    <div className={cn("relative isolate w-full min-h-full bg-paper text-ink overflow-hidden", className)} {...props}>
      <div
        className="absolute -top-32 left-1/3 w-[600px] h-[500px] pointer-events-none opacity-20 -z-10 rotate-12"
        style={{
          background: "radial-gradient(ellipse at top, rgba(245, 158, 11, 0.4) 0%, rgba(16, 185, 129, 0.15) 60%, transparent 80%)",
          filter: "blur(40px)",
        }}
      />
      {children}
    </div>
  );
}
