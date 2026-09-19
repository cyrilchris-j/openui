import * as React from "react";
import { useReducedMotion } from "../core/device.js";
import { MOTION_EASINGS } from "../core/tokens.js";

/* -------------------------------------------------------------------------- */
/* Character Reveal                                                           */
/* -------------------------------------------------------------------------- */
export interface CharacterRevealProps extends React.HTMLAttributes<HTMLSpanElement> {
  text: string;
  staggerMs?: number;
  durationMs?: number;
  delayMs?: number;
  inView?: boolean;
}

export function CharacterReveal({
  text,
  staggerMs = 28,
  durationMs = 460,
  delayMs = 0,
  inView = true,
  className = "",
  ...rest
}: CharacterRevealProps): React.JSX.Element {
  const reduced = useReducedMotion();
  const chars = React.useMemo(() => Array.from(text), [text]);

  if (reduced) {
    return <span className={className} {...rest}>{text}</span>;
  }

  return (
    <span className={`inline-block whitespace-pre-wrap ${className}`} {...rest}>
      {chars.map((char, index) => (
        <span key={`${char}-${index}`} className="inline-block overflow-hidden align-top">
          <span
            className="inline-block transition-transform will-change-transform"
            style={{
              transform: inView ? "translate3d(0, 0, 0)" : "translate3d(0, 110%, 0)",
              transitionDuration: `${durationMs}ms`,
              transitionDelay: `${delayMs + index * staggerMs}ms`,
              transitionTimingFunction: MOTION_EASINGS.editorialCSS,
            }}
          >
            {char === " " ? "\u00A0" : char}
          </span>
        </span>
      ))}
    </span>
  );
}

/* -------------------------------------------------------------------------- */
/* Word Reveal                                                                */
/* -------------------------------------------------------------------------- */
export interface WordRevealProps extends React.HTMLAttributes<HTMLSpanElement> {
  text: string;
  staggerMs?: number;
  durationMs?: number;
  delayMs?: number;
  inView?: boolean;
}

export function WordReveal({
  text,
  staggerMs = 60,
  durationMs = 520,
  delayMs = 0,
  inView = true,
  className = "",
  ...rest
}: WordRevealProps): React.JSX.Element {
  const reduced = useReducedMotion();
  const words = React.useMemo(() => text.split(" "), [text]);

  if (reduced) {
    return <span className={className} {...rest}>{text}</span>;
  }

  return (
    <span className={`inline-flex flex-wrap gap-x-[0.28em] ${className}`} {...rest}>
      {words.map((word, index) => (
        <span key={`${word}-${index}`} className="inline-block overflow-hidden py-0.5">
          <span
            className="inline-block transition-[transform,opacity] will-change-transform"
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? "translate3d(0, 0, 0)" : "translate3d(0, 120%, 0) rotate(3deg)",
              transitionDuration: `${durationMs}ms`,
              transitionDelay: `${delayMs + index * staggerMs}ms`,
              transitionTimingFunction: MOTION_EASINGS.editorialCSS,
            }}
          >
            {word}
          </span>
        </span>
      ))}
    </span>
  );
}

/* -------------------------------------------------------------------------- */
/* Blur Reveal Text                                                           */
/* -------------------------------------------------------------------------- */
export interface BlurRevealTextProps extends React.HTMLAttributes<HTMLSpanElement> {
  text: string;
  blurRadius?: number;
  durationMs?: number;
  inView?: boolean;
}

export function BlurRevealText({
  text,
  blurRadius = 14,
  durationMs = 680,
  inView = true,
  className = "",
  style,
  ...rest
}: BlurRevealTextProps): React.JSX.Element {
  const reduced = useReducedMotion();

  return (
    <span
      className={`inline-block transition-[filter,opacity,transform] ${className}`}
      style={{
        ...style,
        filter: reduced || inView ? "blur(0px)" : `blur(${blurRadius}px)`,
        opacity: reduced || inView ? 1 : 0,
        transform: reduced || inView ? "translate3d(0, 0, 0)" : "translate3d(0, 8px, 0)",
        transitionDuration: `${durationMs}ms`,
        transitionTimingFunction: MOTION_EASINGS.editorialCSS,
      }}
      {...rest}
    >
      {text}
    </span>
  );
}
