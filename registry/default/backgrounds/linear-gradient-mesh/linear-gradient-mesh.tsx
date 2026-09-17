"use client";

import { cn } from "@/lib/cn";

export interface LinearGradientMeshProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export function LinearGradientMesh({ className, children, ...props }: LinearGradientMeshProps) {
  return (
    <div className={cn("relative isolate w-full min-h-full bg-paper text-ink overflow-hidden", className)} {...props}>
      <div
        className="absolute inset-0 pointer-events-none opacity-25 -z-10"
        style={{
          background: `
            radial-gradient(at 0% 0%, rgba(59, 130, 246, 0.4) 0px, transparent 50%),
            radial-gradient(at 100% 0%, rgba(236, 72, 153, 0.4) 0px, transparent 50%),
            radial-gradient(at 100% 100%, rgba(16, 185, 129, 0.4) 0px, transparent 50%),
            radial-gradient(at 0% 100%, rgba(245, 158, 11, 0.4) 0px, transparent 50%)
          `,
        }}
      />
      {children}
    </div>
  );
}
