import * as React from "react";
import { ProceduralCanvas } from "./procedural-canvas.js";

export interface TacticalRadarProps extends React.HTMLAttributes<HTMLDivElement> {
  color?: string;
  sweepSpeed?: number;
}

export function TacticalRadar({
  color = "#38bdf8",
  sweepSpeed = 1.0,
  className = "w-full h-full",
  ...rest
}: TacticalRadarProps): React.JSX.Element {
  const blipsRef = React.useRef<{ x: number; y: number; angle: number; dist: number; alpha: number }[]>([]);
  const pointerRef = React.useRef<{ x: number; y: number; isHovered: boolean }>({ x: 0, y: 0, isHovered: false });

  const draw = React.useCallback(
    (ctx: CanvasRenderingContext2D, width: number, height: number, time: number) => {
      const cx = width / 2;
      const cy = height / 2;
      const maxRadius = Math.min(width, height) * 0.45;
      const pointer = pointerRef.current;

      ctx.fillStyle = "#05070c";
      ctx.fillRect(0, 0, width, height);

      ctx.strokeStyle = "rgba(56, 189, 248, 0.15)";
      ctx.lineWidth = 1;
      for (let r = 0.25; r <= 1.0; r += 0.25) {
        ctx.beginPath();
        ctx.arc(cx, cy, maxRadius * r, 0, Math.PI * 2);
        ctx.stroke();
      }

      ctx.beginPath();
      ctx.moveTo(cx - maxRadius, cy);
      ctx.lineTo(cx + maxRadius, cy);
      ctx.moveTo(cx, cy - maxRadius);
      ctx.lineTo(cx, cy + maxRadius);
      ctx.stroke();

      const angle = (time * 0.0018 * sweepSpeed) % (Math.PI * 2);

      const sweepGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, maxRadius);
      sweepGrad.addColorStop(0, "rgba(56, 189, 248, 0.3)");
      sweepGrad.addColorStop(1, "rgba(56, 189, 248, 0.02)");

      ctx.save();
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.arc(cx, cy, maxRadius, angle - 0.5, angle);
      ctx.closePath();
      ctx.fillStyle = sweepGrad;
      ctx.fill();
      ctx.restore();

      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(cx + Math.cos(angle) * maxRadius, cy + Math.sin(angle) * maxRadius);
      ctx.strokeStyle = "#ffffff";
      ctx.lineWidth = 1.5;
      ctx.stroke();

      if (blipsRef.current.length === 0) {
        blipsRef.current = [
          { x: 0, y: 0, angle: 0.8, dist: maxRadius * 0.6, alpha: 0 },
          { x: 0, y: 0, angle: 2.2, dist: maxRadius * 0.35, alpha: 0 },
          { x: 0, y: 0, angle: 4.1, dist: maxRadius * 0.75, alpha: 0 },
        ];
      }

      if (pointer.isHovered) {
        const dx = pointer.x - cx;
        const dy = pointer.y - cy;
        const pDist = Math.sqrt(dx * dx + dy * dy);
        if (pDist <= maxRadius) {
          ctx.fillStyle = "#ef4444";
          ctx.beginPath();
          ctx.arc(pointer.x, pointer.y, 4, 0, Math.PI * 2);
          ctx.fill();

          ctx.strokeStyle = "rgba(239, 68, 68, 0.5)";
          ctx.beginPath();
          ctx.arc(pointer.x, pointer.y, 8, 0, Math.PI * 2);
          ctx.stroke();
        }
      }

      blipsRef.current.forEach((blip) => {
        const bx = cx + Math.cos(blip.angle) * blip.dist;
        const by = cy + Math.sin(blip.angle) * blip.dist;

        const diff = Math.abs(angle - blip.angle);
        if (diff < 0.1 || diff > Math.PI * 2 - 0.1) {
          blip.alpha = 1.0;
        } else {
          blip.alpha = Math.max(0.1, blip.alpha - 0.015);
        }

        ctx.fillStyle = `rgba(56, 189, 248, ${blip.alpha})`;
        ctx.beginPath();
        ctx.arc(bx, by, 3.5, 0, Math.PI * 2);
        ctx.fill();
      });
    },
    [color, sweepSpeed],
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
