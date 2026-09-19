import * as React from "react";
import { ProceduralCanvas } from "./procedural-canvas.js";

export interface BallpitCanvasProps extends React.HTMLAttributes<HTMLDivElement> {
  ballCount?: number;
}

interface Ball {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
}

export function BallpitCanvas({
  ballCount = 36,
  className = "w-full h-full",
  ...rest
}: BallpitCanvasProps): React.JSX.Element {
  const ballsRef = React.useRef<Ball[]>([]);
  const pointerRef = React.useRef<{ x: number; y: number; isHovered: boolean }>({ x: 0, y: 0, isHovered: false });
  const colors = ["#ba442c", "#38bdf8", "#818cf8", "#e2e8f0", "#f59e0b"];

  const draw = React.useCallback(
    (ctx: CanvasRenderingContext2D, width: number, height: number) => {
      if (ballsRef.current.length === 0) {
        ballsRef.current = Array.from({ length: ballCount }, () => ({
          x: Math.random() * (width - 40) + 20,
          y: Math.random() * (height - 40) + 20,
          vx: (Math.random() - 0.5) * 4,
          vy: (Math.random() - 0.5) * 4,
          radius: Math.random() * 8 + 10,
          color: colors[Math.floor(Math.random() * colors.length)]!,
        }));
      }

      ctx.clearRect(0, 0, width, height);

      const gravity = 0.12;
      const friction = 0.985;
      const bounce = -0.78;
      const pointer = pointerRef.current;

      ballsRef.current.forEach((ball) => {
        ball.vy += gravity;
        ball.vx *= friction;
        ball.vy *= friction;

        ball.x += ball.vx;
        ball.y += ball.vy;

        if (ball.x - ball.radius < 0) {
          ball.x = ball.radius;
          ball.vx *= bounce;
        } else if (ball.x + ball.radius > width) {
          ball.x = width - ball.radius;
          ball.vx *= bounce;
        }

        if (ball.y + ball.radius > height) {
          ball.y = height - ball.radius;
          ball.vy *= bounce;
        } else if (ball.y - ball.radius < 0) {
          ball.y = ball.radius;
          ball.vy *= bounce;
        }

        if (pointer.isHovered) {
          const dx = ball.x - pointer.x;
          const dy = ball.y - pointer.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 70 && dist > 0) {
            const force = (70 - dist) / 70;
            ball.vx += (dx / dist) * force * 5;
            ball.vy += (dy / dist) * force * 5;
          }
        }

        const grad = ctx.createRadialGradient(
          ball.x - ball.radius * 0.3,
          ball.y - ball.radius * 0.3,
          ball.radius * 0.1,
          ball.x,
          ball.y,
          ball.radius,
        );
        grad.addColorStop(0, "#ffffff");
        grad.addColorStop(0.3, ball.color);
        grad.addColorStop(1, "#000000");

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
        ctx.fill();
      });
    },
    [ballCount],
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
