"use client";

import { cn } from "@/lib/cn";

export interface LiquidMarblingSwirlProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export function LiquidMarblingSwirl({ className, children, ...props }: LiquidMarblingSwirlProps) {
  return (
    <div className={cn("relative isolate w-full min-h-full bg-paper text-ink overflow-hidden", className)} {...props}>
      <div
        className="absolute inset-0 pointer-events-none opacity-20 -z-10"
        style={{
          background: `
            radial-gradient(circle at 20% 40%, rgba(244, 114, 182, 0.4) 0%, transparent 50%),
            radial-gradient(circle at 80% 60%, rgba(96, 165, 250, 0.4) 0%, transparent 50%),
            radial-gradient(circle at 50% 80%, rgba(52, 211, 153, 0.3) 0%, transparent 50%)
          `,
          filter: "blur(30px)",
        }}
      />
      {children}
    </div>
  );
}
