import * as React from "react";
import { ProceduralCanvas } from "./procedural-canvas.js";

export interface LaserFlowProps extends React.HTMLAttributes<HTMLDivElement> {
  particleCount?: number;
  laserColor?: string;
}

export function LaserFlow({
  particleCount = 140,
  laserColor = "#ba442c",
  className = "w-full h-full",
  ...rest
}: LaserFlowProps): React.JSX.Element {
  const particlesRef = React.useRef<{ x: number; y: number; px: number; py: number; speed: number }[]>([]);
  const pointerRef = React.useRef<{ x: number; y: number; isHovered: boolean }>({ x: 0, y: 0, isHovered: false });

  const draw = React.useCallback(
    (ctx: CanvasRenderingContext2D, width: number, height: number, time: number) => {
      if (particlesRef.current.length === 0) {
        particlesRef.current = Array.from({ length: particleCount }, () => ({
          x: Math.random() * width,
          y: Math.random() * height,
          px: 0,
          py: 0,
          speed: Math.random() * 2 + 1.5,
        }));
      }

      ctx.fillStyle = "rgba(10, 10, 15, 0.12)";
      ctx.fillRect(0, 0, width, height);

      const t = time * 0.0006;
      const pointer = pointerRef.current;

      particlesRef.current.forEach((p) => {
        p.px = p.x;
        p.py = p.y;

        let angle = Math.sin(p.x * 0.005 + t) * Math.cos(p.y * 0.005 + t) * Math.PI * 2;

        if (pointer.isHovered) {
          const dx = p.x - pointer.x;
          const dy = p.y - pointer.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 80) {
            angle = Math.atan2(dy, dx);
          }
        }

        p.x += Math.cos(angle) * p.speed;
        p.y += Math.sin(angle) * p.speed;

        if (p.x < 0 || p.x > width || p.y < 0 || p.y > height) {
          p.x = Math.random() * width;
          p.y = Math.random() * height;
          p.px = p.x;
          p.py = p.y;
        }

        ctx.strokeStyle = laserColor;
        ctx.lineWidth = 1.6;
        ctx.beginPath();
        ctx.moveTo(p.px, p.py);
        ctx.lineTo(p.x, p.y);
        ctx.stroke();
      });
    },
    [particleCount, laserColor],
  );

  return (
    <div
      onPointerMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        pointerRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top, isHovered: true };
      }}
      onPointerLeave={() => {
        pointerRef.current.isHovered = false;
      }}
      className={`relative w-full h-full overflow-hidden ${className}`}
      {...rest}
    >
      <ProceduralCanvas onDraw={draw} className="w-full h-full" />
    </div>
  );
}
