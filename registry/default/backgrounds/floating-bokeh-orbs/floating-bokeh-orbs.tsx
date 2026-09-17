"use client";

import { cn } from "@/lib/cn";

export interface FloatingBokehOrbsProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export function FloatingBokehOrbs({ className, children, ...props }: FloatingBokehOrbsProps) {
  const orbs = [
    { size: 180, top: "10%", left: "15%", color: "bg-indigo-500/20" },
    { size: 240, top: "45%", left: "60%", color: "bg-fuchsia-500/20" },
    { size: 140, top: "70%", left: "25%", color: "bg-cyan-500/20" },
    { size: 200, top: "20%", left: "75%", color: "bg-amber-500/15" },
  ];

  return (
    <div className={cn("relative isolate w-full min-h-full bg-slate-950 text-white overflow-hidden", className)} {...props}>
      <div className="absolute inset-0 pointer-events-none -z-10">
        {orbs.map((orb, i) => (
          <div
            key={i}
            className={cn("absolute rounded-full blur-2xl transition-all duration-1000", orb.color)}
            style={{
              width: `${orb.size}px`,
              height: `${orb.size}px`,
              top: orb.top,
              left: orb.left,
            }}
          />
        ))}
      </div>
      {children}
    </div>
  );
}
