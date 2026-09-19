import * as React from "react";
import { ProceduralCanvas } from "./procedural-canvas.js";

export interface SwarmFlockProps extends React.HTMLAttributes<HTMLDivElement> {
  boidCount?: number;
  boidColor?: string;
}

interface Boid {
  x: number;
  y: number;
  vx: number;
  vy: number;
}

export function SwarmFlock({
  boidCount = 42,
  boidColor = "#ba442c",
  className = "w-full h-full",
  ...rest
}: SwarmFlockProps): React.JSX.Element {
  const boidsRef = React.useRef<Boid[]>([]);
  const pointerRef = React.useRef<{ x: number; y: number; isHovered: boolean }>({ x: 0, y: 0, isHovered: false });

  const draw = React.useCallback(
    (ctx: CanvasRenderingContext2D, width: number, height: number, time: number) => {
      if (boidsRef.current.length === 0) {
        boidsRef.current = Array.from({ length: boidCount }, () => ({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 3,
          vy: (Math.random() - 0.5) * 3,
        }));
      }

      ctx.clearRect(0, 0, width, height);

      const pointer = pointerRef.current;
      const targetX = pointer.isHovered ? pointer.x : width / 2 + Math.cos(time * 0.0015) * 120;
      const targetY = pointer.isHovered ? pointer.y : height / 2 + Math.sin(time * 0.0015) * 120;

      const boids = boidsRef.current;

      boids.forEach((boid) => {
        const dx = targetX - boid.x;
        const dy = targetY - boid.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist > 10) {
          boid.vx += (dx / dist) * 0.18;
          boid.vy += (dy / dist) * 0.18;
        }

        const speed = Math.sqrt(boid.vx * boid.vx + boid.vy * boid.vy);
        const maxSpeed = 4.2;
        if (speed > maxSpeed) {
          boid.vx = (boid.vx / speed) * maxSpeed;
          boid.vy = (boid.vy / speed) * maxSpeed;
        }

        boid.x += boid.vx;
        boid.y += boid.vy;

        const angle = Math.atan2(boid.vy, boid.vx);
        const len = 7;

        ctx.save();
        ctx.translate(boid.x, boid.y);
        ctx.rotate(angle);

        ctx.fillStyle = boidColor;
        ctx.beginPath();
        ctx.moveTo(len, 0);
        ctx.lineTo(-len * 0.7, -len * 0.5);
        ctx.lineTo(-len * 0.3, 0);
        ctx.lineTo(-len * 0.7, len * 0.5);
        ctx.closePath();
        ctx.fill();

        ctx.restore();
      });
    },
    [boidCount, boidColor],
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
