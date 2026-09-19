import * as React from "react";
import { ProceduralCanvas } from "./procedural-canvas.js";

export interface MatrixTerminalProps extends React.HTMLAttributes<HTMLDivElement> {
  color?: string;
}

export function MatrixTerminal({
  color = "#22c55e",
  className = "w-full h-full",
  ...rest
}: MatrixTerminalProps): React.JSX.Element {
  const dropsRef = React.useRef<number[]>([]);
  const chars = "OPENUI0123456789ABCDEFλπΩ⚡◈✦";

  const draw = React.useCallback(
    (ctx: CanvasRenderingContext2D, width: number, height: number) => {
      const fontSize = 13;
      const columns = Math.floor(width / fontSize);

      if (dropsRef.current.length !== columns) {
        dropsRef.current = Array.from({ length: columns }, () => Math.floor(Math.random() * -50));
      }

      ctx.fillStyle = "rgba(5, 7, 10, 0.22)";
      ctx.fillRect(0, 0, width, height);

      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < dropsRef.current.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)] || "0";
        const x = i * fontSize;
        const currentDrop = dropsRef.current[i] ?? 0;
        const y = currentDrop * fontSize;

        ctx.fillStyle = "#ffffff";
        ctx.fillText(text, x, y);

        ctx.fillStyle = color;
        ctx.fillText(text, x, y - fontSize);

        if (y > height && Math.random() > 0.975) {
          dropsRef.current[i] = 0;
        } else {
          dropsRef.current[i] = currentDrop + 1;
        }
      }

      ctx.fillStyle = "rgba(0, 0, 0, 0.12)";
      for (let y = 0; y < height; y += 4) {
        ctx.fillRect(0, y, width, 1.5);
      }
    },
    [color],
  );

  return (
    <div className={`relative w-full h-full overflow-hidden ${className}`} {...rest}>
      <ProceduralCanvas onDraw={draw} fpsTarget={30} className="w-full h-full" />
    </div>
  );
}
