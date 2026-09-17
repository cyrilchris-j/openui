import { cn } from "@/lib/cn";

export interface WanderingGradientTypeProps {
  children: string;
  /** Gradient stops; pass three or more for the wander to read. */
  stops?: string[];
  /** Full drift duration; long values read calmer. */
  duration?: number;
  className?: string;
}

const KEYFRAMES = `@keyframes openui-wander {
  0%   { background-position: 0% 50%; }
  17%  { background-position: 28% 38%; }
  34%  { background-position: 61% 57%; }
  51%  { background-position: 84% 33%; }
  68%  { background-position: 47% 71%; }
  85%  { background-position: 12% 62%; }
  100% { background-position: 0% 50%; }
}
@media (prefers-reduced-motion: reduce) {
  .openui-wander-target { animation: none !important; background-position: 30% 40% !important; }
}`;

export function WanderingGradientType({
  children,
  stops = ["#e2624a", "#d9a441", "#5d8a72", "#4a6fa5", "#e2624a"],
  duration = 14,
  className,
}: WanderingGradientTypeProps) {
  return (
    <span className={cn("inline", className)}>
      <style>{KEYFRAMES}</style>
      <span
        aria-hidden
        className="openui-wander-target inline-block"
        style={{
          backgroundImage: `linear-gradient(100deg, ${stops.join(", ")})`,
          backgroundSize: "280% 280%",
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          color: "transparent",
          animation: `openui-wander ${duration}s ease-in-out infinite`,
        }}
      >
        {children}
      </span>
      <span className="sr-only">{children}</span>
    </span>
  );
}

export default WanderingGradientType;
