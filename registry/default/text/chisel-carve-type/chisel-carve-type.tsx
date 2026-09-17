import { cn } from "@/lib/cn";

export interface ChiselCarveTypeProps {
  children: string;
  stone?: string;
  className?: string;
}

export function ChiselCarveType({ children, stone = "#8a877f", className }: ChiselCarveTypeProps) {
  return (
    <span
      className={cn("inline-flex items-center justify-center rounded-lg px-10 py-8", className)}
      style={{
        background: `
          radial-gradient(circle at 18% 22%, rgba(255,255,255,0.10) 0 2px, transparent 3px),
          radial-gradient(circle at 64% 68%, rgba(255,255,255,0.07) 0 2px, transparent 3px),
          radial-gradient(circle at 82% 30%, rgba(0,0,0,0.14) 0 2px, transparent 3px),
          radial-gradient(circle at 38% 80%, rgba(0,0,0,0.12) 0 2px, transparent 3px),
          ${stone}`,
        backgroundSize: "26px 26px, 34px 34px, 22px 22px, 30px 30px, 100% 100%",
      }}
    >
      <span
        aria-hidden
        className="select-none font-display text-step-4 leading-none"
        role="text"
        aria-label={children}
        style={{
          color: "color-mix(in oklab, ${stone}, black 45%)",
          textShadow:
            "0 1px 0 rgba(255,255,255,0.35), 0 -1px 0 rgba(0,0,0,0.55), inset 0 -1px 1px rgba(0,0,0,0.4)",
        }}
      >
        {children}
      </span>
      <span className="sr-only">{children}</span>
    </span>
  );
}

export default ChiselCarveType;
