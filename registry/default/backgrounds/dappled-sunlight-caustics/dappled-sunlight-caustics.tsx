"use client";

import { cn } from "@/lib/cn";

export interface DappledSunlightCausticsProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export function DappledSunlightCaustics({ className, children, ...props }: DappledSunlightCausticsProps) {
  return (
    <div className={cn("relative isolate w-full min-h-full bg-paper text-ink overflow-hidden", className)} {...props}>
      <div className="absolute inset-0 pointer-events-none -z-10 opacity-20">
        <div
          className="w-full h-full"
          style={{
            background: "radial-gradient(circle at 30% 30%, currentColor 0%, transparent 60%), radial-gradient(circle at 70% 60%, currentColor 0%, transparent 50%)",
            filter: "blur(40px)",
          }}
        />
      </div>
      {children}
    </div>
  );
}
