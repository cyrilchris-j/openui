import { cn } from "@/lib/cn";

export interface TheatreMarqueeBulbsProps {
  children: string;
  /** Seconds for one bulb to travel the full border. */
  chaseSeconds?: number;
  className?: string;
}

export function TheatreMarqueeBulbs({ children, chaseSeconds = 2.4, className }: TheatreMarqueeBulbsProps) {
  return (
    <span className={cn("relative inline-block select-none", className)} role="text" aria-label={children}>
      <span
        aria-hidden
        className="pointer-events-none absolute -inset-3 rounded-lg"
        style={{
          background: `repeating-conic-gradient(from 0deg, #ffd98a 0deg 6deg, transparent 6deg 24deg)`,
          animation: `openui-chase ${chaseSeconds}s steps(15) infinite`,
          maskImage: "radial-gradient(circle, black 3px, transparent 3.5px)",
          WebkitMaskImage: "radial-gradient(circle, black 3px, transparent 3.5px)",
          maskSize: "24px 24px",
          WebkitMaskSize: "24px 24px",
          filter: "drop-shadow(0 0 6px rgba(255, 200, 100, 0.8))",
        }}
      />
      <span
        aria-hidden
        className="relative z-10 block rounded-lg bg-[#241a12] px-8 py-4 font-display text-step-2 tracking-wide text-amber-200"
        style={{ textShadow: "0 0 12px rgba(255, 190, 90, 0.55), 0 0 32px rgba(255, 160, 40, 0.3)" }}
      >
        {children}
      </span>
      <style>{`@keyframes openui-chase { to { transform: rotate(360deg) } } @media (prefers-reduced-motion: reduce) { span { animation: none !important } }`}</style>
    </span>
  );
}

export default TheatreMarqueeBulbs;
