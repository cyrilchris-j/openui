import * as React from "react";
import { useReducedMotion } from "../core/device.js";
import { useElementScrollProgress } from "./scroll-observer.js";
import { MOTION_EASINGS } from "../core/tokens.js";

/* -------------------------------------------------------------------------- */
/* Scroll Reveal Primitive                                                    */
/* -------------------------------------------------------------------------- */
export interface ScrollRevealProps extends React.HTMLAttributes<HTMLDivElement> {
  animation?: "fade-up" | "fade-scale" | "clip-wipe" | "blur";
  delayMs?: number;
  durationMs?: number;
  threshold?: number;
  children: React.ReactNode;
}

export function ScrollReveal({
  animation = "fade-up",
  delayMs = 0,
  durationMs = 540,
  threshold = 0.15,
  className = "",
  style,
  children,
  ...rest
}: ScrollRevealProps): React.JSX.Element {
  const reduced = useReducedMotion();
  const ref = React.useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = React.useState(false);

  React.useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setRevealed(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setRevealed(true);
          observer.unobserve(el);
        }
      },
      { threshold },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  const getStyle = (): React.CSSProperties => {
    if (reduced) return {};

    const base: React.CSSProperties = {
      transitionProperty: "opacity, transform, filter, clip-path",
      transitionDuration: `${durationMs}ms`,
      transitionDelay: `${delayMs}ms`,
      transitionTimingFunction: MOTION_EASINGS.editorialCSS,
      willChange: revealed ? "auto" : "opacity, transform",
    };

    switch (animation) {
      case "fade-up":
        return {
          ...base,
          opacity: revealed ? 1 : 0,
          transform: revealed ? "translate3d(0, 0, 0)" : "translate3d(0, 24px, 0)",
        };
      case "fade-scale":
        return {
          ...base,
          opacity: revealed ? 1 : 0,
          transform: revealed ? "scale(1)" : "scale(0.96)",
        };
      case "clip-wipe":
        return {
          ...base,
          clipPath: revealed ? "inset(0% 0% 0% 0%)" : "inset(100% 0% 0% 0%)",
        };
      case "blur":
        return {
          ...base,
          opacity: revealed ? 1 : 0,
          filter: revealed ? "blur(0px)" : "blur(12px)",
          transform: revealed ? "scale(1)" : "scale(0.98)",
        };
    }
  };

  return (
    <div ref={ref} className={className} style={{ ...style, ...getStyle() }} {...rest}>
      {children}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Scroll Parallax Primitive                                                  */
/* -------------------------------------------------------------------------- */
export interface ScrollParallaxProps extends React.HTMLAttributes<HTMLDivElement> {
  speed?: number; // -1 to 1 (negative moves slower, positive moves faster)
  children: React.ReactNode;
}

export function ScrollParallax({
  speed = 0.15,
  className = "",
  style,
  children,
  ...rest
}: ScrollParallaxProps): React.JSX.Element {
  const reduced = useReducedMotion();
  const { ref, progress } = useElementScrollProgress<HTMLDivElement>();

  const offset = reduced ? 0 : (progress - 0.5) * speed * 200;

  return (
    <div
      ref={ref}
      className={className}
      style={{
        ...style,
        transform: `translate3d(0, ${offset.toFixed(1)}px, 0)`,
        willChange: "transform",
      }}
      {...rest}
    >
      {children}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Scroll Progress Ring                                                       */
/* -------------------------------------------------------------------------- */
export interface ScrollProgressRingProps extends React.SVGAttributes<SVGSVGElement> {
  progress?: number; // 0 to 1
  size?: number;
  strokeWidth?: number;
  color?: string;
}

export function ScrollProgressRing({
  progress = 0,
  size = 36,
  strokeWidth = 2.5,
  color = "hsl(var(--oxide))",
  className = "",
  ...rest
}: ScrollProgressRingProps): React.JSX.Element {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference * (1 - Math.min(Math.max(progress, 0), 1));

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className={`-rotate-90 ${className}`}
      {...rest}
    >
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        className="text-line/20"
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeDasharray={circumference}
        strokeDashoffset={strokeDashoffset}
        strokeLinecap="round"
        className="transition-[stroke-dashoffset] duration-fast"
      />
    </svg>
  );
}
