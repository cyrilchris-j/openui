"use client";

import { cn } from "@/lib/cn";

export interface IsometricMeshProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: number;
  lineColor?: string;
  children?: React.ReactNode;
}

export function IsometricMesh({
  size = 40,
  lineColor = "currentColor",
  className,
  children,
  ...props
}: IsometricMeshProps) {
  return (
    <div className={cn("relative isolate w-full min-h-full bg-paper text-ink overflow-hidden", className)} {...props}>
      <svg className="absolute inset-0 w-full h-full opacity-15 pointer-events-none -z-10" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="iso-mesh-pat" width={size * 2} height={size * 1.154} patternUnits="userSpaceOnUse">
            <path
              d={`M0 ${size * 0.577} L${size} 0 L${size * 2} ${size * 0.577} L${size} ${size * 1.154} Z`}
              fill="none"
              stroke={lineColor}
              strokeWidth="1"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#iso-mesh-pat)" />
      </svg>
      {children}
    </div>
  );
}
