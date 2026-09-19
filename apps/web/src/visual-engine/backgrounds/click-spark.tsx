import * as React from "react";
import { ProceduralCanvas } from "./procedural-canvas.js";

export interface ClickSparkProps extends React.HTMLAttributes<HTMLDivElement> {
  sparkColor?: string;
}

interface Spark {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  color: string;
}

export function ClickSpark({
  sparkColor = "#ba442c",
  className = "w-full h-full",
  ...rest
}: ClickSparkProps): React.JSX.Element {
  const sparksRef = React.useRef<Spark[]>([]);
  const lastPosRef = React.useRef({ x: 0, y: 0 });
  const pointerRef = React.useRef<{ x: number; y: number; isHovered: boolean }>({ x: 0, y: 0, isHovered: false });

  const spawnBurst = (x: number, y: number, count = 28) => {
    const colors = [sparkColor, "#fbbf24", "#f43f5e", "#ffffff"];
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 5 + 2;
      sparksRef.current.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 0,
        maxLife: Math.random() * 25 + 20,
        color: colors[Math.floor(Math.random() * colors.length)]!,
      });
    }
  };

  const draw = React.useCallback(
    (ctx: CanvasRenderingContext2D, width: number, height: number) => {
      ctx.fillStyle = "rgba(10, 10, 15, 0.2)";
      ctx.fillRect(0, 0, width, height);

      const pointer = pointerRef.current;
      if (pointer.isHovered) {
        const dx = pointer.x - lastPosRef.current.x;
        const dy = pointer.y - lastPosRef.current.y;
        if (Math.sqrt(dx * dx + dy * dy) > 8) {
          spawnBurst(pointer.x, pointer.y, 3);
          lastPosRef.current = { x: pointer.x, y: pointer.y };
        }
      } else if (Math.random() > 0.94) {
        spawnBurst(Math.random() * width, Math.random() * height, 12);
      }

      for (let i = sparksRef.current.length - 1; i >= 0; i--) {
        const s = sparksRef.current[i]!;
        s.x += s.vx;
        s.y += s.vy;
        s.vy += 0.12;
        s.vx *= 0.96;
        s.vy *= 0.96;
        s.life++;

        if (s.life >= s.maxLife) {
          sparksRef.current.splice(i, 1);
          continue;
        }

        const alpha = 1 - s.life / s.maxLife;
        ctx.fillStyle = s.color;
        ctx.globalAlpha = alpha;
        ctx.beginPath();
        ctx.arc(s.x, s.y, Math.max(0.5, (1 - s.life / s.maxLife) * 2.5), 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.globalAlpha = 1;
    },
    [sparkColor],
  );

  return (
    <div
      onClick={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        spawnBurst(e.clientX - rect.left, e.clientY - rect.top, 35);
      }}
      onPointerMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        pointerRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top, isHovered: true };
      }}
      onPointerLeave={() => {
        pointerRef.current.isHovered = false;
      }}
      className={`relative w-full h-full cursor-pointer overflow-hidden ${className}`}
      {...rest}
    >
      <ProceduralCanvas onDraw={draw} className="w-full h-full" />
    </div>
  );
}
