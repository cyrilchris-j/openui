import * as React from "react";
import { ProceduralCanvas } from "./procedural-canvas.js";

export interface LightningCanvasProps extends React.HTMLAttributes<HTMLDivElement> {
  boltColor?: string;
}

export function LightningCanvas({
  boltColor = "#38bdf8",
  className = "w-full h-full",
  ...rest
}: LightningCanvasProps): React.JSX.Element {
  const lastBoltTime = React.useRef(0);
  const pointerRef = React.useRef<{ x: number; y: number; isHovered: boolean }>({ x: 0, y: 0, isHovered: false });

  const drawBolt = (
    ctx: CanvasRenderingContext2D,
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    displace: number,
    iteration: number,
  ) => {
    if (iteration === 0) {
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
      return;
    }

    const midX = (x1 + x2) / 2 + (Math.random() - 0.5) * displace;
    const midY = (y1 + y2) / 2 + (Math.random() - 0.5) * displace;

    drawBolt(ctx, x1, y1, midX, midY, displace / 2, iteration - 1);
    drawBolt(ctx, midX, midY, x2, y2, displace / 2, iteration - 1);

    if (Math.random() > 0.82 && iteration > 2) {
      const branchX = midX + (Math.random() - 0.5) * displace * 1.5;
      const branchY = midY + (Math.random() - 0.5) * displace * 1.5;
      drawBolt(ctx, midX, midY, branchX, branchY, displace / 2.5, iteration - 2);
    }
  };

  const draw = React.useCallback(
    (ctx: CanvasRenderingContext2D, width: number, height: number, time: number) => {
      ctx.fillStyle = "rgba(10, 12, 18, 0.2)";
      ctx.fillRect(0, 0, width, height);

      const pointer = pointerRef.current;
      if (time - lastBoltTime.current > 600 || pointer.isHovered) {
        lastBoltTime.current = time;

        const startX = width / 2 + (Math.random() - 0.5) * width * 0.6;
        const startY = 0;
        const endX = pointer.isHovered ? pointer.x : width / 2 + (Math.random() - 0.5) * width * 0.8;
        const endY = pointer.isHovered ? pointer.y : height;

        ctx.strokeStyle = boltColor;
        ctx.lineWidth = 3.5;
        ctx.shadowColor = boltColor;
        ctx.shadowBlur = 12;
        drawBolt(ctx, startX, startY, endX, endY, 120, 5);

        ctx.strokeStyle = "#ffffff";
        ctx.lineWidth = 1.5;
        ctx.shadowBlur = 4;
        drawBolt(ctx, startX, startY, endX, endY, 120, 5);

        ctx.shadowBlur = 0;
      }
    },
    [boltColor],
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
