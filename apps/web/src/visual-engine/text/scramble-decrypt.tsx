import * as React from "react";
import { useReducedMotion } from "../core/device.js";

const DEFAULT_GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_#@*&!%$";

export interface ScrambleDecryptionProps extends React.HTMLAttributes<HTMLSpanElement> {
  text: string;
  speedMs?: number;
  scrambleRounds?: number;
  triggerOnHover?: boolean;
  autoPlay?: boolean;
  glyphs?: string;
  onComplete?: () => void;
}

/**
 * OpenUI Scramble Decryption
 *
 * Original cryptographic character resolve animation.
 * Progressively locks in characters from left to right while
 * mutating remaining positions through a mathematical glyph pool.
 */
export function ScrambleDecryption({
  text,
  speedMs = 35,
  scrambleRounds = 3,
  triggerOnHover = true,
  autoPlay = true,
  glyphs = DEFAULT_GLYPHS,
  className = "",
  onComplete,
  ...rest
}: ScrambleDecryptionProps): React.JSX.Element {
  const reduced = useReducedMotion();
  const [displayText, setDisplayText] = React.useState(text);
  const [isAnimating, setIsAnimating] = React.useState(false);
  const intervalRef = React.useRef<number | null>(null);

  const startAnimation = React.useCallback(() => {
    if (reduced) {
      setDisplayText(text);
      return;
    }

    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
    }

    setIsAnimating(true);
    let iteration = 0;
    const maxIterations = text.length * scrambleRounds;

    intervalRef.current = window.setInterval(() => {
      iteration++;
      const resolvedCount = Math.floor(iteration / scrambleRounds);

      const nextText = text
        .split("")
        .map((char, index) => {
          if (char === " " || index < resolvedCount) {
            return text[index];
          }
          const randomIndex = Math.floor(Math.random() * glyphs.length);
          return glyphs[randomIndex];
        })
        .join("");

      setDisplayText(nextText);

      if (iteration >= maxIterations) {
        if (intervalRef.current !== null) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
        setDisplayText(text);
        setIsAnimating(false);
        onComplete?.();
      }
    }, speedMs);
  }, [text, reduced, speedMs, scrambleRounds, glyphs, onComplete]);

  React.useEffect(() => {
    if (autoPlay) {
      startAnimation();
    } else {
      setDisplayText(text);
    }

    return () => {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
      }
    };
  }, [text, autoPlay, startAnimation]);

  const handlePointerEnter = () => {
    if (triggerOnHover && !isAnimating) {
      startAnimation();
    }
  };

  return (
    <span
      onPointerEnter={handlePointerEnter}
      className={`font-mono inline-block tracking-normal select-none cursor-default ${className}`}
      {...rest}
    >
      {displayText}
    </span>
  );
}
