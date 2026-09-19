import * as React from "react";
import { ProceduralCanvas } from "./procedural-canvas.js";

export interface ElasticMeshProps extends React.HTMLAttributes<HTMLDivElement> {
  gridCols?: number;
  gridRows?: number;
  lineColor?: string;
}

interface MeshPoint {
  x: number;
  y: number;
  origX: number;
  origY: number;
  vx: number;
  vy: number;
}

export function ElasticMesh({
  gridCols = 14,
  gridRows = 10,
  lineColor = "#ba442c",
  className = "w-full h-full",
  ...rest
}: ElasticMeshProps): React.JSX.Element {
  const pointsRef = React.useRef<MeshPoint[][]>([]);
  const pointerRef = React.useRef<{ x: number; y: number; isHovered: boolean }>({ x: 0, y: 0, isHovered: false });

  const draw = React.useCallback(
    (ctx: CanvasRenderingContext2D, width: number, height: number) => {
      const stepX = width / (gridCols - 1);
      const stepY = height / (gridRows - 1);

      if (pointsRef.current.length === 0) {
        const grid: MeshPoint[][] = [];
        for (let r = 0; r < gridRows; r++) {
          const row: MeshPoint[] = [];
          for (let c = 0; c < gridCols; c++) {
            const x = c * stepX;
            const y = r * stepY;
            row.push({ x, y, origX: x, origY: y, vx: 0, vy: 0 });
          }
          grid.push(row);
        }
        pointsRef.current = grid;
      }

      ctx.clearRect(0, 0, width, height);

      const grid = pointsRef.current;
      const tension = 0.08;
      const damping = 0.88;
      const pointer = pointerRef.current;

      for (let r = 0; r < gridRows; r++) {
        for (let c = 0; c < gridCols; c++) {
          const p = grid[r]![c]!;

          if (pointer.isHovered) {
            const dx = pointer.x - p.x;
            const dy = pointer.y - p.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 80 && dist > 0) {
              const force = (80 - dist) / 80;
              p.vx -= (dx / dist) * force * 4;
              p.vy -= (dy / dist) * force * 4;
            }
          }

          const springX = (p.origX - p.x) * tension;
          const springY = (p.origY - p.y) * tension;

          p.vx = (p.vx + springX) * damping;
          p.vy = (p.vy + springY) * damping;

          p.x += p.vx;
          p.y += p.vy;
        }
      }

      ctx.strokeStyle = lineColor;
      ctx.lineWidth = 1.2;
      ctx.globalAlpha = 0.65;

      for (let r = 0; r < gridRows; r++) {
        ctx.beginPath();
        for (let c = 0; c < gridCols; c++) {
          const p = grid[r]![c]!;
          if (c === 0) ctx.moveTo(p.x, p.y);
          else ctx.lineTo(p.x, p.y);
        }
        ctx.stroke();
      }

      for (let c = 0; c < gridCols; c++) {
        ctx.beginPath();
        for (let r = 0; r < gridRows; r++) {
          const p = grid[r]![c]!;
          if (r === 0) ctx.moveTo(p.x, p.y);
          else ctx.lineTo(p.x, p.y);
        }
        ctx.stroke();
      }

      ctx.globalAlpha = 1;
    },
    [gridCols, gridRows, lineColor],
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
