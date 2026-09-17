"use client";

import { cn } from "@/lib/cn";

export interface MatrixBinaryCurtainProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export function MatrixBinaryCurtain({ className, children, ...props }: MatrixBinaryCurtainProps) {
  return (
    <div className={cn("relative isolate w-full min-h-full bg-slate-950 text-emerald-400 overflow-hidden font-mono", className)} {...props}>
      <div className="absolute inset-0 flex justify-around pointer-events-none opacity-20 -z-10 text-[10px] leading-tight select-none">
        {Array.from({ length: 12 }).map((_, col) => (
          <div key={col} className="flex flex-col">
            {Array.from({ length: 24 }).map((_, row) => (
              <span key={row}>{(col + row) % 2 === 0 ? "1" : "0"}</span>
            ))}
          </div>
        ))}
      </div>
      {children}
    </div>
  );
}
