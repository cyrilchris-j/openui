import * as React from "react";
import { useReducedMotion } from "../core/device.js";

/* -------------------------------------------------------------------------- */
/* Text Wave                                                                  */
/* -------------------------------------------------------------------------- */
export interface TextWaveProps extends React.HTMLAttributes<HTMLSpanElement> {
  text: string;
  amplitude?: number;
  periodMs?: number;
  interactive?: boolean;
}

export function TextWave({
  text,
  amplitude = 6,
  periodMs = 1800,
  interactive = true,
  className = "",
  ...rest
}: TextWaveProps): React.JSX.Element {
  const reduced = useReducedMotion();
  const [hovered, setHovered] = React.useState(false);
  const chars = React.useMemo(() => Array.from(text), [text]);

  return (
    <span
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
      className={`inline-block ${className}`}
      {...rest}
    >
      {chars.map((char, i) => {
        const delay = (i / chars.length) * periodMs;
        const active = !reduced && (!interactive || hovered);
        return (
          <span
            key={`${char}-${i}`}
            className="inline-block transition-transform will-change-transform"
            style={{
              animation: active
                ? `openui-sine-wave ${periodMs}ms ease-in-out infinite`
                : "none",
              animationDelay: `-${delay}ms`,
            }}
          >
            {char === " " ? "\u00A0" : char}
          </span>
        );
      })}
      <style>{`
        @keyframes openui-sine-wave {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-${amplitude}px); }
        }
      `}</style>
    </span>
  );
}

/* -------------------------------------------------------------------------- */
/* Glitch Type                                                                */
/* -------------------------------------------------------------------------- */
export interface GlitchTypeProps extends React.HTMLAttributes<HTMLSpanElement> {
  text: string;
  intensity?: "subtle" | "medium" | "heavy";
  triggerOnHover?: boolean;
}

export function GlitchType({
  text,
  intensity = "subtle",
  triggerOnHover = true,
  className = "",
  ...rest
}: GlitchTypeProps): React.JSX.Element {
  const reduced = useReducedMotion();
  const [isGlitching, setIsGlitching] = React.useState(false);

  const offset = intensity === "subtle" ? 2 : intensity === "medium" ? 4 : 7;

  return (
    <span
      onPointerEnter={() => triggerOnHover && setIsGlitching(true)}
      onPointerLeave={() => triggerOnHover && setIsGlitching(false)}
      className={`relative inline-block select-none ${className}`}
      {...rest}
    >
      <span className="relative z-10">{text}</span>
      {!reduced && isGlitching && (
        <>
          <span
            aria-hidden
            className="absolute inset-0 z-0 text-oxide/80 mix-blend-screen pointer-events-none"
            style={{
              clipPath: "inset(20% 0 30% 0)",
              transform: `translate3d(-${offset}px, -1px, 0)`,
            }}
          >
            {text}
          </span>
          <span
            aria-hidden
            className="absolute inset-0 z-0 text-azure/80 mix-blend-screen pointer-events-none"
            style={{
              clipPath: "inset(55% 0 10% 0)",
              transform: `translate3d(${offset}px, 1px, 0)`,
            }}
          >
            {text}
          </span>
        </>
      )}
    </span>
  );
}

/* -------------------------------------------------------------------------- */
/* Typewriter Stack                                                           */
/* -------------------------------------------------------------------------- */
export interface TypewriterStackProps extends React.HTMLAttributes<HTMLSpanElement> {
  phrases: string[];
  typingSpeedMs?: number;
  pauseMs?: number;
  loop?: boolean;
}

export function TypewriterStack({
  phrases,
  typingSpeedMs = 60,
  pauseMs = 1800,
  loop = true,
  className = "",
  ...rest
}: TypewriterStackProps): React.JSX.Element {
  const reduced = useReducedMotion();
  const [phraseIndex, setPhraseIndex] = React.useState(0);
  const [charIndex, setCharIndex] = React.useState(0);
  const [isDeleting, setIsDeleting] = React.useState(false);

  const currentPhrase = phrases[phraseIndex] || "";

  React.useEffect(() => {
    if (reduced) return;

    let timer: number;
    if (!isDeleting && charIndex < currentPhrase.length) {
      timer = window.setTimeout(() => setCharIndex((c) => c + 1), typingSpeedMs);
    } else if (!isDeleting && charIndex === currentPhrase.length) {
      timer = window.setTimeout(() => setIsDeleting(true), pauseMs);
    } else if (isDeleting && charIndex > 0) {
      timer = window.setTimeout(() => setCharIndex((c) => c - 1), typingSpeedMs * 0.6);
    } else if (isDeleting && charIndex === 0) {
      setIsDeleting(false);
      setPhraseIndex((prev) => (loop ? (prev + 1) % phrases.length : prev));
    }

    return () => clearTimeout(timer);
  }, [charIndex, isDeleting, phraseIndex, currentPhrase, typingSpeedMs, pauseMs, loop, phrases.length, reduced]);

  if (reduced) {
    return <span className={className} {...rest}>{phrases[0]}</span>;
  }

  return (
    <span className={`inline-block font-mono tracking-tight ${className}`} {...rest}>
      <span>{currentPhrase.slice(0, charIndex)}</span>
      <span className="inline-block w-2.5 h-[1.1em] ml-0.5 align-middle bg-oxide animate-pulse" />
    </span>
  );
}
