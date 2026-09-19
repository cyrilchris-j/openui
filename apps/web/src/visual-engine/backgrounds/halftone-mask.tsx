import * as React from "react";
import { ProceduralCanvas } from "./procedural-canvas.js";

export interface HalftoneMaskProps extends React.HTMLAttributes<HTMLDivElement> {
  dotColor?: string;
  spacing?: number;
}

export function HalftoneMask({
  dotColor = "#ba442c",
  spacing = 16,
  className = "w-full h-full",
  ...rest
}: HalftoneMaskProps): React.JSX.Element {
  const pointerRef = React.useRef<{ x: number; y: number; isHovered: boolean }>({ x: 0, y: 0, isHovered: false });

  const draw = React.useCallback(
    (ctx: CanvasRenderingContext2D, width: number, height: number, time: number) => {
      ctx.clearRect(0, 0, width, height);

      const pointer = pointerRef.current;
      const mouseX = pointer.isHovered ? pointer.x : width / 2 + Math.sin(time * 0.002) * 80;
      const mouseY = pointer.isHovered ? pointer.y : height / 2 + Math.cos(time * 0.002) * 60;

      for (let x = spacing / 2; x < width; x += spacing) {
        for (let y = spacing / 2; y < height; y += spacing) {
          const dx = mouseX - x;
          const dy = mouseY - y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          const maxDist = 140;
          let radius = 1.8;
          if (dist < maxDist) {
            radius = 1.8 + ((maxDist - dist) / maxDist) * 5.5;
          }

          ctx.fillStyle = dotColor;
          ctx.beginPath();
          ctx.arc(x, y, radius, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    },
    [dotColor, spacing],
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
