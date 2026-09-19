import * as React from "react";
import { ProceduralCanvas } from "./procedural-canvas.js";

export interface BalatroShaderProps extends React.HTMLAttributes<HTMLDivElement> {
  speed?: number;
  colorScheme?: "crimson" | "cyber" | "emerald";
}

export function BalatroShader({
  speed = 1.0,
  colorScheme = "crimson",
  className = "w-full h-full",
  ...rest
}: BalatroShaderProps): React.JSX.Element {
  const pointerRef = React.useRef<{ x: number; y: number; isHovered: boolean }>({ x: 0, y: 0, isHovered: false });

  const draw = React.useCallback(
    (ctx: CanvasRenderingContext2D, width: number, height: number, time: number) => {
      const step = 8;
      const cols = Math.ceil(width / step);
      const rows = Math.ceil(height / step);

      const t = time * 0.0012 * speed;
      const pointer = pointerRef.current;
      const mouseX = pointer.isHovered ? pointer.x / width : 0.5;
      const mouseY = pointer.isHovered ? pointer.y / height : 0.5;

      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const px = x * step;
          const py = y * step;

          const u = px / width - 0.5;
          const v = py / height - 0.5;

          const d1 = Math.sqrt(u * u + v * v);
          const d2 = Math.sqrt((u - (mouseX - 0.5)) ** 2 + (v - (mouseY - 0.5)) ** 2);

          const angle = Math.atan2(v, u);
          const wave =
            Math.sin(d1 * 18 - t * 3 + angle * 4) +
            Math.sin(d2 * 12 + t * 2) * 0.5 +
            Math.cos(u * 8 + t) * 0.3;

          const normalized = (wave + 1.8) / 3.6;

          if (colorScheme === "emerald") {
            const r = Math.floor(10 + normalized * 30);
            const g = Math.floor(60 + normalized * 180);
            const b = Math.floor(40 + normalized * 120);
            ctx.fillStyle = `rgb(${r},${g},${b})`;
          } else if (colorScheme === "cyber") {
            const r = Math.floor(20 + normalized * 60);
            const g = Math.floor(80 + normalized * 140);
            const b = Math.floor(140 + normalized * 115);
            ctx.fillStyle = `rgb(${r},${g},${b})`;
          } else {
            const r = Math.floor(160 + normalized * 85);
            const g = Math.floor(35 + normalized * 70);
            const b = Math.floor(30 + normalized * 50);
            ctx.fillStyle = `rgb(${r},${g},${b})`;
          }

          ctx.fillRect(px, py, step, step);
        }
      }
    },
    [speed, colorScheme],
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
      <ProceduralCanvas onDraw={draw} fpsTarget={30} className="w-full h-full" />
    </div>
  );
}
