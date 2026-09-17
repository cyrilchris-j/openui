"use client";

import { cn } from "@/lib/cn";

export interface VoronoiDiagramCellsProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export function VoronoiDiagramCells({ className, children, ...props }: VoronoiDiagramCellsProps) {
  return (
    <div className={cn("relative isolate w-full min-h-full bg-paper text-ink overflow-hidden", className)} {...props}>
      <svg className="absolute inset-0 w-full h-full opacity-15 pointer-events-none -z-10" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" viewBox="0 0 600 400">
        <polygon points="0,0 120,50 80,180 0,140" fill="none" stroke="currentColor" strokeWidth="1" />
        <polygon points="120,50 280,30 260,160 80,180" fill="none" stroke="currentColor" strokeWidth="1" />
        <polygon points="280,30 450,40 420,190 260,160" fill="none" stroke="currentColor" strokeWidth="1" />
        <polygon points="450,40 600,0 600,160 420,190" fill="none" stroke="currentColor" strokeWidth="1" />
        <polygon points="0,140 80,180 100,320 0,300" fill="none" stroke="currentColor" strokeWidth="1" />
        <polygon points="80,180 260,160 240,310 100,320" fill="none" stroke="currentColor" strokeWidth="1" />
        <polygon points="260,160 420,190 400,330 240,310" fill="none" stroke="currentColor" strokeWidth="1" />
        <polygon points="420,190 600,160 600,320 400,330" fill="none" stroke="currentColor" strokeWidth="1" />
        <polygon points="0,300 100,320 120,400 0,400" fill="none" stroke="currentColor" strokeWidth="1" />
        <polygon points="100,320 240,310 260,400 120,400" fill="none" stroke="currentColor" strokeWidth="1" />
        <polygon points="240,310 400,330 430,400 260,400" fill="none" stroke="currentColor" strokeWidth="1" />
        <polygon points="400,330 600,320 600,400 430,400" fill="none" stroke="currentColor" strokeWidth="1" />
      </svg>
      {children}
    </div>
  );
}
