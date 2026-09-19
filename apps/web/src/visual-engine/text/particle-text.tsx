import * as React from "react";
import { ProceduralCanvas } from "../backgrounds/procedural-canvas.js";

export interface ParticleTextProps extends React.HTMLAttributes<HTMLDivElement> {
  text?: string;
  particleColor?: string;
}

interface TextParticle {
  x: number;
  y: number;
  origX: number;
  origY: number;
  vx: number;
  vy: number;
}

export function ParticleText({
  text = "OPENUI",
  particleColor = "#ba442c",
  className = "w-full h-full",
  ...rest
}: ParticleTextProps): React.JSX.Element {
  const particlesRef = React.useRef<TextParticle[]>([]);
  const pointerRef = React.useRef<{ x: number; y: number; isHovered: boolean }>({ x: 0, y: 0, isHovered: false });
  const lastSizeRef = React.useRef<{ width: number; height: number }>({ width: 0, height: 0 });

  const initParticles = (width: number, height: number) => {
    if (width <= 0 || height <= 0) return;
    const offCanvas = document.createElement("canvas");
    offCanvas.width = width;
    offCanvas.height = height;
    const offCtx = offCanvas.getContext("2d");
    if (!offCtx) return;

    offCtx.fillStyle = "#ffffff";
    let fontSize = Math.min(width * 0.16, 68);
    offCtx.font = `bold ${fontSize}px sans-serif`;

    const maxAllowedWidth = width * 0.82;
    const textMetrics = offCtx.measureText(text);
    if (textMetrics.width > maxAllowedWidth && textMetrics.width > 0) {
      fontSize = Math.max(16, Math.floor(fontSize * (maxAllowedWidth / textMetrics.width)));
      offCtx.font = `bold ${fontSize}px sans-serif`;
    }

    offCtx.textAlign = "center";
    offCtx.textBaseline = "middle";
    offCtx.fillText(text, width / 2, height / 2);

    const imgData = offCtx.getImageData(0, 0, width, height).data;
    const particles: TextParticle[] = [];
    const step = width < 480 ? 3 : 4;

    for (let y = 0; y < height; y += step) {
      for (let x = 0; x < width; x += step) {
        const index = (y * width + x) * 4;
        if (imgData[index + 3]! > 128) {
          particles.push({
            x: x + (Math.random() - 0.5) * 30,
            y: y + (Math.random() - 0.5) * 30,
            origX: x,
            origY: y,
            vx: 0,
            vy: 0,
          });
        }
      }
    }
    particlesRef.current = particles;
  };

  const draw = React.useCallback(
    (ctx: CanvasRenderingContext2D, width: number, height: number) => {
      const sizeChanged =
        Math.abs(lastSizeRef.current.width - width) > 10 ||
        Math.abs(lastSizeRef.current.height - height) > 10;

      if (particlesRef.current.length === 0 || sizeChanged) {
        lastSizeRef.current = { width, height };
        initParticles(width, height);
      }

      ctx.clearRect(0, 0, width, height);

      const tension = 0.08;
      const damping = 0.85;
      const pointer = pointerRef.current;

      ctx.fillStyle = particleColor;

      particlesRef.current.forEach((p) => {
        if (pointer.isHovered) {
          const dx = pointer.x - p.x;
          const dy = pointer.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 60 && dist > 0) {
            const force = (60 - dist) / 60;
            p.vx -= (dx / dist) * force * 7;
            p.vy -= (dy / dist) * force * 7;
          }
        }

        const springX = (p.origX - p.x) * tension;
        const springY = (p.origY - p.y) * tension;

        p.vx = (p.vx + springX) * damping;
        p.vy = (p.vy + springY) * damping;

        p.x += p.vx;
        p.y += p.vy;

        ctx.fillRect(p.x, p.y, 2.2, 2.2);
      });
    },
    [text, particleColor],
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
