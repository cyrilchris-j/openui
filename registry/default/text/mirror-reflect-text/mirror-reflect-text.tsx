import { cn } from "@/lib/cn";

export interface MirrorReflectTextProps {
  children: string;
  /** How far the reflection fades, 0–1. */
  fade?: number;
  className?: string;
}

export function MirrorReflectText({ children, fade = 0.35, className }: MirrorReflectTextProps) {
  return (
    <span className={cn("inline-flex flex-col", className)}>
      <span role="text" aria-label={children} className="font-display leading-none">
        <span aria-hidden>{children}</span>
      </span>
      <span
        aria-hidden
        className="select-none font-display leading-none"
        style={{
          transform: "scaleY(-1)",
          opacity: fade,
          maskImage: "linear-gradient(to top, rgba(0,0,0,0.9), transparent 72%)",
          WebkitMaskImage: "linear-gradient(to top, rgba(0,0,0,0.9), transparent 72%)",
          marginTop: "0.08em",
          userSelect: "none",
        }}
      >
        {children}
      </span>
      <span className="sr-only">{children}</span>
    </span>
  );
}

export default MirrorReflectText;
