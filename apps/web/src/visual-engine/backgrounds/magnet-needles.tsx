import * as React from "react";
import { ProceduralCanvas } from "./procedural-canvas.js";

export interface MagnetNeedlesProps extends React.HTMLAttributes<HTMLDivElement> {
  rows?: number;
  cols?: number;
  needleColor?: string;
}

export function MagnetNeedles({
  rows = 8,
  cols = 12,
  needleColor = "#ba442c",
  className = "w-full h-full",
  ...rest
}: MagnetNeedlesProps): React.JSX.Element {
  const pointerRef = React.useRef<{ x: number; y: number; isHovered: boolean }>({ x: 0, y: 0, isHovered: false });

  const draw = React.useCallback(
    (ctx: CanvasRenderingContext2D, width: number, height: number, time: number) => {
      ctx.clearRect(0, 0, width, height);

      const cellW = width / cols;
      const cellH = height / rows;
      const needleLen = Math.min(cellW, cellH) * 0.38;
      const pointer = pointerRef.current;

      const targetX = pointer.isHovered ? pointer.x : width / 2 + Math.cos(time * 0.002) * 100;
      const targetY = pointer.isHovered ? pointer.y : height / 2 + Math.sin(time * 0.002) * 100;

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const cx = (c + 0.5) * cellW;
          const cy = (r + 0.5) * cellH;

          const dx = targetX - cx;
          const dy = targetY - cy;
          const targetAngle = Math.atan2(dy, dx);

          ctx.fillStyle = "rgba(100, 116, 139, 0.4)";
          ctx.beginPath();
          ctx.arc(cx, cy, 1.5, 0, Math.PI * 2);
          ctx.fill();

          const nx = cx + Math.cos(targetAngle) * needleLen;
          const ny = cy + Math.sin(targetAngle) * needleLen;

          ctx.beginPath();
          ctx.moveTo(cx, cy);
          ctx.lineTo(nx, ny);
          ctx.strokeStyle = needleColor;
          ctx.lineWidth = 1.6;
          ctx.stroke();

          ctx.fillStyle = needleColor;
          ctx.beginPath();
          ctx.arc(nx, ny, 2.2, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    },
    [rows, cols, needleColor],
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
