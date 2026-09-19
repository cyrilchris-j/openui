import * as React from "react";
import { ProceduralCanvas } from "./procedural-canvas.js";

export interface TopographicWavesProps extends React.HTMLAttributes<HTMLDivElement> {
  linesCount?: number;
  waveSpeed?: number;
}

/**
 * OpenUI Topographic Contour Waves
 *
 * Flowing mathematical contour lines representing isometric elevation.
 */
export function TopographicWaves({
  linesCount = 14,
  waveSpeed = 0.0008,
  className = "",
  style,
  ...rest
}: TopographicWavesProps): React.JSX.Element {
  const draw = React.useCallback(
    (ctx: CanvasRenderingContext2D, width: number, height: number, time: number) => {
      ctx.clearRect(0, 0, width, height);

      const t = time * waveSpeed;
      const spacing = height / (linesCount + 1);

      ctx.lineWidth = 1;

      for (let i = 1; i <= linesCount; i++) {
        const baseY = i * spacing;
        const progress = i / linesCount;
        const alpha = Math.sin(progress * Math.PI) * 0.18 + 0.04;

        ctx.strokeStyle = `rgba(186, 68, 44, ${alpha})`;
        ctx.beginPath();

        const segments = 40;
        const step = width / segments;

        for (let j = 0; j <= segments; j++) {
          const x = j * step;
          const offset =
            Math.sin(j * 0.25 + t + i * 0.3) * 16 +
            Math.cos(j * 0.15 - t * 0.5 + i * 0.2) * 12;

          const y = baseY + offset;

          if (j === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }

        ctx.stroke();
      }
    },
    [linesCount, waveSpeed],
  );

  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      style={style}
      {...rest}
    >
      <ProceduralCanvas onDraw={draw} fpsTarget={30} />
    </div>
  );
}
