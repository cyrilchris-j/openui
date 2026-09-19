import * as React from "react";
import { ProceduralCanvas } from "./procedural-canvas.js";

export interface AuroraFieldProps extends React.HTMLAttributes<HTMLDivElement> {
  speed?: number;
  opacity?: number;
}

/**
 * OpenUI Aurora Field
 *
 * Procedural harmonic atmospheric wave gradient.
 * Calculates undulating gradient meshes blending oxide, moss, and paper tones.
 */
export function AuroraField({
  speed = 0.0006,
  opacity = 0.6,
  className = "",
  style,
  ...rest
}: AuroraFieldProps): React.JSX.Element {
  const draw = React.useCallback(
    (ctx: CanvasRenderingContext2D, width: number, height: number, time: number) => {
      ctx.clearRect(0, 0, width, height);

      const t = time * speed;
      const numWaves = 3;

      for (let i = 0; i < numWaves; i++) {
        const waveOffset = (i * Math.PI * 2) / numWaves;
        const gradient = ctx.createLinearGradient(0, 0, width, height);

        if (i === 0) {
          gradient.addColorStop(0, "rgba(186, 68, 44, 0.18)"); // Oxide
          gradient.addColorStop(0.5, "rgba(217, 119, 6, 0.08)");
          gradient.addColorStop(1, "transparent");
        } else if (i === 1) {
          gradient.addColorStop(0, "transparent");
          gradient.addColorStop(0.6, "rgba(59, 130, 246, 0.12)"); // Azure
          gradient.addColorStop(1, "rgba(40, 60, 45, 0.14)");    // Moss
        } else {
          gradient.addColorStop(0.2, "rgba(234, 88, 12, 0.10)");
          gradient.addColorStop(0.8, "transparent");
        }

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.moveTo(0, height);

        const segments = 24;
        const step = width / segments;

        for (let j = 0; j <= segments; j++) {
          const x = j * step;
          const y =
            height * 0.45 +
            Math.sin(j * 0.35 + t + waveOffset) * (height * 0.18) +
            Math.cos(j * 0.2 - t * 0.8) * (height * 0.12);
          ctx.lineTo(x, y);
        }

        ctx.lineTo(width, height);
        ctx.closePath();
        ctx.fill();
      }
    },
    [speed],
  );

  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      style={{ opacity, ...style }}
      {...rest}
    >
      <ProceduralCanvas onDraw={draw} fpsTarget={30} />
    </div>
  );
}
