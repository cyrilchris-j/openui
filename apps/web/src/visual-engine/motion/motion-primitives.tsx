import * as React from "react";
import { useReducedMotion } from "../core/device.js";
import { MOTION_EASINGS } from "../core/tokens.js";

/* -------------------------------------------------------------------------- */
/* Fade Primitive                                                             */
/* -------------------------------------------------------------------------- */
export interface FadeProps extends React.HTMLAttributes<HTMLDivElement> {
  show?: boolean;
  duration?: number;
  delay?: number;
  children: React.ReactNode;
}

export function Fade({
  show = true,
  duration = 340,
  delay = 0,
  className = "",
  style,
  children,
  ...rest
}: FadeProps): React.JSX.Element {
  const reduced = useReducedMotion();

  return (
    <div
      className={className}
      style={{
        ...style,
        opacity: show ? 1 : 0,
        transitionProperty: "opacity",
        transitionDuration: reduced ? "0ms" : `${duration}ms`,
        transitionDelay: reduced ? "0ms" : `${delay}ms`,
        transitionTimingFunction: MOTION_EASINGS.editorialCSS,
      }}
      {...rest}
    >
      {children}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Slide Primitive                                                            */
/* -------------------------------------------------------------------------- */
export interface SlideProps extends React.HTMLAttributes<HTMLDivElement> {
  show?: boolean;
  direction?: "up" | "down" | "left" | "right";
  distance?: number;
  duration?: number;
  delay?: number;
  children: React.ReactNode;
}

export function Slide({
  show = true,
  direction = "up",
  distance = 24,
  duration = 420,
  delay = 0,
  className = "",
  style,
  children,
  ...rest
}: SlideProps): React.JSX.Element {
  const reduced = useReducedMotion();

  const getTransform = () => {
    if (!show && !reduced) {
      switch (direction) {
        case "up":
          return `translateY(${distance}px)`;
        case "down":
          return `translateY(-${distance}px)`;
        case "left":
          return `translateX(${distance}px)`;
        case "right":
          return `translateX(-${distance}px)`;
      }
    }
    return "translate3d(0, 0, 0)";
  };

  return (
    <div
      className={className}
      style={{
        ...style,
        opacity: show ? 1 : 0,
        transform: getTransform(),
        transitionProperty: "opacity, transform",
        transitionDuration: reduced ? "0ms" : `${duration}ms`,
        transitionDelay: reduced ? "0ms" : `${delay}ms`,
        transitionTimingFunction: MOTION_EASINGS.editorialCSS,
        willChange: show ? "auto" : "transform, opacity",
      }}
      {...rest}
    >
      {children}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* BlurReveal Primitive                                                       */
/* -------------------------------------------------------------------------- */
export interface BlurRevealProps extends React.HTMLAttributes<HTMLDivElement> {
  show?: boolean;
  blurAmount?: number;
  duration?: number;
  delay?: number;
  children: React.ReactNode;
}

export function BlurReveal({
  show = true,
  blurAmount = 12,
  duration = 500,
  delay = 0,
  className = "",
  style,
  children,
  ...rest
}: BlurRevealProps): React.JSX.Element {
  const reduced = useReducedMotion();

  return (
    <div
      className={className}
      style={{
        ...style,
        opacity: show ? 1 : 0,
        filter: reduced || show ? "blur(0px)" : `blur(${blurAmount}px)`,
        transform: reduced || show ? "translateY(0)" : "translateY(10px) scale(0.98)",
        transitionProperty: "opacity, filter, transform",
        transitionDuration: reduced ? "0ms" : `${duration}ms`,
        transitionDelay: reduced ? "0ms" : `${delay}ms`,
        transitionTimingFunction: MOTION_EASINGS.editorialCSS,
      }}
      {...rest}
    >
      {children}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Stagger Primitive                                                          */
/* -------------------------------------------------------------------------- */
export interface StaggerProps extends React.HTMLAttributes<HTMLDivElement> {
  staggerDelay?: number;
  baseDelay?: number;
  children: React.ReactNode;
}

export function Stagger({
  staggerDelay = 60,
  baseDelay = 0,
  className = "",
  children,
  ...rest
}: StaggerProps): React.JSX.Element {
  const reduced = useReducedMotion();
  const count = React.Children.count(children);

  return (
    <div className={className} {...rest}>
      {React.Children.map(children, (child, idx) => {
        if (!React.isValidElement(child)) return child;
        const delay = reduced ? 0 : baseDelay + idx * staggerDelay;
        return (
          <div
            style={{
              animationDelay: `${delay}ms`,
              transitionDelay: `${delay}ms`,
            }}
          >
            {child}
          </div>
        );
      })}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Float Primitive (Idle Levitation)                                          */
/* -------------------------------------------------------------------------- */
export interface FloatProps extends React.HTMLAttributes<HTMLDivElement> {
  amplitude?: number;
  durationSeconds?: number;
  children: React.ReactNode;
}

export function Float({
  amplitude = 8,
  durationSeconds = 4,
  className = "",
  style,
  children,
  ...rest
}: FloatProps): React.JSX.Element {
  const reduced = useReducedMotion();

  return (
    <div
      className={className}
      style={{
        ...style,
        animation: reduced
          ? "none"
          : `openui-float ${durationSeconds}s ease-in-out infinite alternate`,
      }}
      {...rest}
    >
      <style>{`
        @keyframes openui-float {
          0% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-${amplitude}px) rotate(0.4deg); }
          100% { transform: translateY(${amplitude * 0.5}px) rotate(-0.3deg); }
        }
      `}</style>
      {children}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Interactive 3D Tilt Primitive                                              */
/* -------------------------------------------------------------------------- */
export interface TiltProps extends React.HTMLAttributes<HTMLDivElement> {
  maxRotation?: number;
  perspective?: number;
  scaleOnHover?: number;
  glare?: boolean;
  children: React.ReactNode;
}

export function Tilt({
  maxRotation = 12,
  perspective = 800,
  scaleOnHover = 1.02,
  glare = true,
  className = "",
  style,
  children,
  ...rest
}: TiltProps): React.JSX.Element {
  const reduced = useReducedMotion();
  const [transform, setTransform] = React.useState("perspective(800px) rotateX(0deg) rotateY(0deg) scale(1)");
  const [glarePos, setGlarePos] = React.useState({ x: 50, y: 50, opacity: 0 });
  const cardRef = React.useRef<HTMLDivElement>(null);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (reduced || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const px = (x / rect.width - 0.5) * 2;
    const py = (y / rect.height - 0.5) * 2;

    const rotX = -py * maxRotation;
    const rotY = px * maxRotation;

    setTransform(`perspective(${perspective}px) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg) scale(${scaleOnHover})`);
    setGlarePos({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 0.18,
    });
  };

  const handlePointerLeave = () => {
    setTransform(`perspective(${perspective}px) rotateX(0deg) rotateY(0deg) scale(1)`);
    setGlarePos((prev) => ({ ...prev, opacity: 0 }));
  };

  return (
    <div
      ref={cardRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className={`relative overflow-hidden ${className}`}
      style={{
        ...style,
        transform,
        transition: "transform 260ms cubic-bezier(0.16, 1, 0.3, 1)",
        transformStyle: "preserve-3d",
      }}
      {...rest}
    >
      {children}
      {glare && !reduced && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 transition-opacity duration-normal"
          style={{
            opacity: glarePos.opacity,
            background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(255,255,255,0.4) 0%, transparent 65%)`,
          }}
        />
      )}
    </div>
  );
}
