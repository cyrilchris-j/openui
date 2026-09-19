import * as React from "react";
import { ProceduralCanvas } from "./procedural-canvas.js";

export interface QuantumLatticeProps extends React.HTMLAttributes<HTMLDivElement> {
  nodeCount?: number;
  lineDistance?: number;
  color?: string;
}

export function QuantumLattice({
  nodeCount = 42,
  lineDistance = 85,
  color = "#ba442c",
  className = "w-full h-full",
  ...rest
}: QuantumLatticeProps): React.JSX.Element {
  const nodesRef = React.useRef<{ x: number; y: number; vx: number; vy: number }[]>([]);
  const pointerRef = React.useRef<{ x: number; y: number; isHovered: boolean }>({ x: 0, y: 0, isHovered: false });

  const draw = React.useCallback(
    (ctx: CanvasRenderingContext2D, width: number, height: number) => {
      if (nodesRef.current.length === 0) {
        nodesRef.current = Array.from({ length: nodeCount }, () => ({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 1.2,
          vy: (Math.random() - 0.5) * 1.2,
        }));
      }

      ctx.clearRect(0, 0, width, height);

      const nodes = nodesRef.current;
      const pointer = pointerRef.current;

      nodes.forEach((node) => {
        node.x += node.vx;
        node.y += node.vy;

        if (node.x < 0 || node.x > width) node.vx *= -1;
        if (node.y < 0 || node.y > height) node.vy *= -1;

        if (pointer.isHovered) {
          const dx = pointer.x - node.x;
          const dy = pointer.y - node.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 110) {
            node.x += (dx / dist) * 1.5;
            node.y += (dy / dist) * 1.5;

            ctx.strokeStyle = color;
            ctx.lineWidth = 1.2;
            ctx.globalAlpha = 1 - dist / 110;
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(pointer.x, pointer.y);
            ctx.stroke();
          }
        }
      });

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i]!.x - nodes[j]!.x;
          const dy = nodes[i]!.y - nodes[j]!.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < lineDistance) {
            ctx.strokeStyle = color;
            ctx.lineWidth = 0.8;
            ctx.globalAlpha = 1 - dist / lineDistance;
            ctx.beginPath();
            ctx.moveTo(nodes[i]!.x, nodes[i]!.y);
            ctx.lineTo(nodes[j]!.x, nodes[j]!.y);
            ctx.stroke();
          }
        }

        ctx.fillStyle = color;
        ctx.globalAlpha = 0.85;
        ctx.beginPath();
        ctx.arc(nodes[i]!.x, nodes[i]!.y, 2.5, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.globalAlpha = 1;
    },
    [nodeCount, lineDistance, color],
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
