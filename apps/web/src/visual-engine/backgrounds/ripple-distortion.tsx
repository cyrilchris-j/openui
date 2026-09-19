import * as React from "react";
import { ProceduralCanvas } from "./procedural-canvas.js";

export interface RippleDistortionProps extends React.HTMLAttributes<HTMLDivElement> {
  rippleColor?: string;
}

interface Ripple {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  alpha: number;
}

export function RippleDistortion({
  rippleColor = "#ba442c",
  className = "w-full h-full",
  ...rest
}: RippleDistortionProps): React.JSX.Element {
  const ripplesRef = React.useRef<Ripple[]>([]);

  const addRipple = (x: number, y: number) => {
    ripplesRef.current.push({
      x,
      y,
      radius: 2,
      maxRadius: 180,
      alpha: 1.0,
    });
  };

  const draw = React.useCallback(
    (ctx: CanvasRenderingContext2D, width: number, height: number) => {
      ctx.clearRect(0, 0, width, height);

      if (ripplesRef.current.length === 0 || Math.random() > 0.985) {
        addRipple(Math.random() * width, Math.random() * height);
      }

      for (let i = ripplesRef.current.length - 1; i >= 0; i--) {
        const r = ripplesRef.current[i]!;
        r.radius += 2.8;
        r.alpha = Math.max(0, 1 - r.radius / r.maxRadius);

        if (r.alpha <= 0) {
          ripplesRef.current.splice(i, 1);
          continue;
        }

        for (let ring = 0; ring < 3; ring++) {
          const rad = r.radius - ring * 12;
          if (rad > 0) {
            ctx.strokeStyle = rippleColor;
            ctx.lineWidth = Math.max(0.5, 3 - ring);
            ctx.globalAlpha = r.alpha * (1 - ring * 0.3);
            ctx.beginPath();
            ctx.arc(r.x, r.y, rad, 0, Math.PI * 2);
            ctx.stroke();
          }
        }
      }

      ctx.globalAlpha = 1;
    },
    [rippleColor],
  );

  return (
    <div
      onClick={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        addRipple(e.clientX - rect.left, e.clientY - rect.top);
      }}
      className={`relative w-full h-full cursor-pointer overflow-hidden ${className}`}
      {...rest}
    >
      <ProceduralCanvas onDraw={draw} className="w-full h-full" />
    </div>
  );
}
