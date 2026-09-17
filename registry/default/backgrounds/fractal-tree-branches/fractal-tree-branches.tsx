"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/cn";

export interface FractalTreeBranchesProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export function FractalTreeBranches({ className, children, ...props }: FractalTreeBranchesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
    canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = "rgba(100, 116, 139, 0.25)";
    ctx.lineWidth = 1;

    const drawBranch = (x: number, y: number, len: number, angle: number, depth: number) => {
      if (depth === 0) return;
      const x2 = x + len * Math.sin(angle);
      const y2 = y - len * Math.cos(angle);

      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x2, y2);
      ctx.stroke();

      drawBranch(x2, y2, len * 0.75, angle - 0.35, depth - 1);
      drawBranch(x2, y2, len * 0.75, angle + 0.35, depth - 1);
    };

    drawBranch(canvas.width / 2, canvas.height, 80, 0, 8);
  }, []);

  return (
    <div className={cn("relative isolate w-full min-h-full bg-paper text-ink overflow-hidden", className)} {...props}>
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none -z-10" />
      {children}
    </div>
  );
}
