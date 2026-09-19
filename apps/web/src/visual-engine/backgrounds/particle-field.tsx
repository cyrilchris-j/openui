import * as React from "react";
import { ProceduralCanvas } from "./procedural-canvas.js";

export interface ParticleFieldProps extends React.HTMLAttributes<HTMLDivElement> {
  particleCount?: number;
  connectionDistance?: number;
  interactive?: boolean;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
}

/**
 * OpenUI Quantum Particle Lattice
 *
 * Interactive mathematical particle constellation.
 * Computes proximity links between points with pointer repulsion.
 */
export function ParticleField({
  particleCount = 45,
  connectionDistance = 110,
  interactive = true,
  className = "",
  style,
  ...rest
}: ParticleFieldProps): React.JSX.Element {
  const particlesRef = React.useRef<Particle[]>([]);
  const pointerRef = React.useRef<{ x: number; y: number } | null>(null);

  const initParticles = (width: number, height: number) => {
    const list: Particle[] = [];
    for (let i = 0; i < particleCount; i++) {
      list.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        size: Math.random() * 1.5 + 1,
      });
    }
    particlesRef.current = list;
  };

  const draw = React.useCallback(
    (ctx: CanvasRenderingContext2D, width: number, height: number) => {
      if (particlesRef.current.length === 0) {
        initParticles(width, height);
      }

      const particles = particlesRef.current;
      const pointer = pointerRef.current;

      // Update positions
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;

        // Bounce at bounds
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        // Pointer repulsion
        if (interactive && pointer) {
          const dx = p.x - pointer.x;
          const dy = p.y - pointer.y;
          const dist = Math.hypot(dx, dy);
          if (dist < 100 && dist > 0) {
            const force = (100 - dist) / 100;
            p.x += (dx / dist) * force * 2;
            p.y += (dy / dist) * force * 2;
          }
        }

        // Draw particle dot
        ctx.fillStyle = "rgba(186, 68, 44, 0.4)";
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }

      // Draw connection lines between close particles
      ctx.lineWidth = 0.5;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const p1 = particles[i]!;
          const p2 = particles[j]!;
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.hypot(dx, dy);

          if (dist < connectionDistance) {
            const alpha = (1 - dist / connectionDistance) * 0.22;
            ctx.strokeStyle = `rgba(186, 68, 44, ${alpha})`;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }
    },
    [connectionDistance, interactive],
  );

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    pointerRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  };

  const handlePointerLeave = () => {
    pointerRef.current = null;
  };

  return (
    <div
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className={`absolute inset-0 overflow-hidden pointer-events-auto ${className}`}
      style={style}
      {...rest}
    >
      <ProceduralCanvas onDraw={draw} fpsTarget={40} />
    </div>
  );
}
