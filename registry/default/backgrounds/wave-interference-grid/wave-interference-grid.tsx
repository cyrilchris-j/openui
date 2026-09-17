"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/cn";

export interface WaveInterferenceGridProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export function WaveInterferenceGrid({ className, children, ...props }: WaveInterferenceGridProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let t = 0;

    const render = () => {
      canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const src1 = { x: canvas.width * 0.35, y: canvas.height * 0.5 };
      const src2 = { x: canvas.width * 0.65, y: canvas.height * 0.5 };

      ctx.strokeStyle = "rgba(100, 116, 139, 0.2)";
      ctx.lineWidth = 1;

      for (let r = 20; r < Math.max(canvas.width, canvas.height); r += 24) {
        const rad = (r + t * 20) % Math.max(canvas.width, canvas.height);
        ctx.beginPath();
        ctx.arc(src1.x, src1.y, rad, 0, Math.PI * 2);
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(src2.x, src2.y, rad, 0, Math.PI * 2);
        ctx.stroke();
      }

      t += 0.02;
      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <div className={cn("relative isolate w-full min-h-full bg-paper text-ink overflow-hidden", className)} {...props}>
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none -z-10" />
      {children}
    </div>
  );
}
