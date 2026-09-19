import * as React from "react";
import { ProceduralCanvas } from "./procedural-canvas.js";

export interface HyperspeedTunnelProps extends React.HTMLAttributes<HTMLDivElement> {
  speed?: number;
  starCount?: number;
  color?: string;
}

export function HyperspeedTunnel({
  speed = 1.0,
  starCount = 180,
  color = "#ba442c",
  className = "w-full h-full",
  ...rest
}: HyperspeedTunnelProps): React.JSX.Element {
  const starsRef = React.useRef<{ x: number; y: number; z: number; pz: number }[]>([]);
  const pointerRef = React.useRef<{ x: number; y: number; isHovered: boolean }>({ x: 0, y: 0, isHovered: false });

  const initStars = (count: number) => {
    const stars = [];
    for (let i = 0; i < count; i++) {
      stars.push({
        x: (Math.random() - 0.5) * 2000,
        y: (Math.random() - 0.5) * 2000,
        z: Math.random() * 1000,
        pz: 1000,
      });
    }
    return stars;
  };

  const draw = React.useCallback(
    (ctx: CanvasRenderingContext2D, width: number, height: number) => {
      if (starsRef.current.length === 0) {
        starsRef.current = initStars(starCount);
      }

      ctx.fillStyle = "rgba(10, 10, 15, 0.25)";
      ctx.fillRect(0, 0, width, height);

      const pointer = pointerRef.current;
      const cx = width / 2 + (pointer.isHovered ? (pointer.x - width / 2) * 0.3 : 0);
      const cy = height / 2 + (pointer.isHovered ? (pointer.y - height / 2) * 0.3 : 0);

      const velocity = (pointer.isHovered ? 18 : 10) * speed;

      starsRef.current.forEach((star) => {
        star.pz = star.z;
        star.z -= velocity;

        if (star.z <= 0) {
          star.x = (Math.random() - 0.5) * 2000;
          star.y = (Math.random() - 0.5) * 2000;
          star.z = 1000;
          star.pz = 1000;
        }

        const k = 250 / star.z;
        const px = star.x * k + cx;
        const py = star.y * k + cy;

        const pk = 250 / star.pz;
        const prevX = star.x * pk + cx;
        const prevY = star.y * pk + cy;

        if (px >= 0 && px <= width && py >= 0 && py <= height) {
          const depthAlpha = Math.min(1, (1000 - star.z) / 600);
          ctx.beginPath();
          ctx.moveTo(prevX, prevY);
          ctx.lineTo(px, py);
          ctx.strokeStyle = color;
          ctx.globalAlpha = depthAlpha * 0.8;
          ctx.lineWidth = Math.max(1, (1 - star.z / 1000) * 3);
          ctx.stroke();
        }
      });

      ctx.globalAlpha = 1;
    },
    [speed, starCount, color],
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
