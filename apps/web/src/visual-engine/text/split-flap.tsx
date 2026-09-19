import * as React from "react";

export interface SplitFlapProps extends React.HTMLAttributes<HTMLDivElement> {
  words?: string[];
  flipIntervalMs?: number;
}

/**
 * OpenUI Split Flap Text
 *
 * Mechanical airport departure board alphanumeric flip animation
 * with 3D perspective fold, shadow crease, and tactile cadence.
 */
export function SplitFlap({
  words = ["OPENUI", "VISUAL", "ENGINE", "MOTION", "DESIGN"],
  flipIntervalMs = 2800,
  className = "",
  ...rest
}: SplitFlapProps): React.JSX.Element {
  const [index, setIndex] = React.useState(0);
  const [flipping, setFlipping] = React.useState(false);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setFlipping(true);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % words.length);
        setFlipping(false);
      }, 350);
    }, flipIntervalMs);

    return () => clearInterval(timer);
  }, [words, flipIntervalMs]);

  const currentWord = words[index] || "OPENUI";
  const maxLen = 8;
  const padded = currentWord.padEnd(maxLen, " ");

  return (
    <div className={`flex items-center justify-center gap-1.5 select-none ${className}`} {...rest}>
      {padded.split("").map((char, i) => (
        <div
          key={i}
          className="relative w-8 sm:w-10 h-12 sm:h-14 bg-[#1e232d] text-[#f8fafc] font-mono text-xl sm:text-2xl font-bold rounded flex flex-col items-center justify-center overflow-hidden shadow-md border border-[#334155]/60"
        >
          {/* Split crease line */}
          <div className="absolute inset-x-0 top-1/2 h-[1px] bg-black/70 z-10" />

          {/* Top half shadow */}
          <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />

          {/* Character display */}
          <span
            className={`transition-transform duration-300 transform ${
              flipping ? "scale-y-0 opacity-40" : "scale-y-100 opacity-100"
            }`}
            style={{ transitionDelay: `${i * 35}ms` }}
          >
            {char === " " ? "•" : char}
          </span>
        </div>
      ))}
    </div>
  );
}
