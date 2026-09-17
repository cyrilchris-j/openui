import { cn } from "@/lib/cn";

export interface RansomCollageNoteProps {
  children: string;
  className?: string;
}

const PAPERS = ["#f5efe3", "#efe6d2", "#f8f4ea", "#ece2cc"];
const ROTATIONS = [-4, 3, -2, 5, -3, 2];

export function RansomCollageNote({ children, className }: RansomCollageNoteProps) {
  let seed = 0;
  const next = () => {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };

  return (
    <span
      className={cn("inline-flex flex-wrap items-baseline", className)}
      role="text"
      aria-label={children}
    >
      {[...children].map((char, index) => {
        if (char === " ") return <span key={index} className="w-3" />;
        const rotation = ROTATIONS[index % ROTATIONS.length]!;
        const paper = PAPERS[Math.floor(next() * PAPERS.length)]!;
        const serif = index % 2 === 0;
        return (
          <span
            key={index}
            aria-hidden
            className="relative mx-[1px] inline-block px-1.5 py-0.5 text-ink"
            style={{
              background: paper,
              transform: `rotate(${rotation}deg) translateY(${(next() * 4 - 2).toFixed(1)}px)`,
              fontFamily: serif ? "Georgia, serif" : "system-ui, sans-serif",
              fontWeight: serif ? 400 : 700,
              boxShadow: "0 1px 2px rgba(0,0,0,0.22)",
            }}
          >
            {char}
            <span
              className="absolute -top-1 left-1/2 h-2 w-5 -translate-x-1/2"
              style={{ background: "rgba(222,205,166,0.85)", transform: `translateX(-50%) rotate(${rotation * -1.4}deg)` }}
            />
          </span>
        );
      })}
    </span>
  );
}

export default RansomCollageNote;
