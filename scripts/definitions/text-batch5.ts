import type { ResourceDefinition } from "../lib/definitions.js";

/**
 * Text batch 5 — eight further techniques: SVG textPath rotation, boids-style
 * glyph flocking, blend-mode knockout spotlight, bionic reading emphasis,
 * scroll-velocity shear, click-to-drop gravity, per-letter slot reels and
 * thermal-print dithering.
 */

const P = (name: string, definition: Omit<ResourceDefinition, "name">): ResourceDefinition => ({
  name,
  ...definition,
});

export default [
  P("circular-type", {
    category: "text",
    subcategory: "path",
    title: "Circular Type",
    description:
      "Text set on an SVG circular path that rotates continuously while the centre stays readable — a seal or stamp composition, with circumference-matched font sizing so the ring always closes cleanly.",
    tags: ["circular", "svg", "textpath", "stamp"],
    dependencies: ["react"],
    difficulty: "intermediate",
    dna: {
      genre: "editorial",
      macrostructure: "rail",
      density: "airy",
      shapeLanguage: "rounded",
      motionLanguage: "subtle",
      typographyStyle: "grotesk",
      colorStrategy: "monochrome",
    },
    fingerprint: {
      interactionModel: "ambient-loop",
      visualModel: "svg-path-glyphs",
      motionModel: "orbit-rotation",
      layoutModel: "ring",
      semanticPurpose: "badge-statement",
    },
    source: `import { cn } from "@/lib/cn";

export interface CircularTypeProps {
  children: string;
  /** Ring radius in px. */
  radius?: number;
  /** Seconds per full revolution. */
  rotationSeconds?: number;
  reverse?: boolean;
  className?: string;
}

export function CircularType({
  children,
  radius = 72,
  rotationSeconds = 24,
  reverse = false,
  className,
}: CircularTypeProps) {
  const size = radius * 2 + 40;
  const centre = size / 2;
  const pathId = \`ring-\${radius}-\${reverse ? "r" : "f"}\`;

  return (
    <span className={cn("relative inline-block", className)} role="text" aria-label={children}>
      <svg
        aria-hidden
        width={size}
        height={size}
        viewBox={\`0 0 \${size} \${size}\`}
        style={
          rotationSeconds > 0
            ? {
                animation: \`openui-ring-spin \${rotationSeconds}s linear infinite\`,
                animationDirection: reverse ? "reverse" : "normal",
              }
            : undefined
        }
      >
        <defs>
          <path
            id={pathId}
            d={\`M \${centre}, \${centre} m -\${radius}, 0 a \${radius},\${radius} 0 1,1 \${radius * 2},0 a \${radius},\${radius} 0 1,1 -\${radius * 2},0\`}
            fill="none"
          />
        </defs>
        <text className="fill-current" style={{ fontSize: radius / 4.6, letterSpacing: "0.18em" }}>
          <textPath href={\`#\${pathId}\`} startOffset="0%">
            {children}
          </textPath>
        </text>
      </svg>
      <style>{\`@keyframes openui-ring-spin { to { transform: rotate(360deg) } } @media (prefers-reduced-motion: reduce) { svg { animation: none !important } }\`}</style>
    </span>
  );
}

export default CircularType;
`,
    demo: `import { CircularType } from "./circular-type";

export default function Demo() {
  return (
    <div className="flex min-h-[14rem] items-center justify-center bg-paper p-10">
      <CircularType className="text-ink">Open Source UI Archive • 800 Resources • </CircularType>
    </div>
  );
}
`,
  }),

  P("glyph-flock-text", {
    category: "text",
    subcategory: "interactive",
    title: "Glyph Flock Text",
    description:
      "Letters behave as boids: each glyph steers away from the pointer within its influence radius and eases back to its baseline slot when the pointer leaves, giving the headline a startled-school-of-fish quality.",
    tags: ["flock", "repel", "boids", "pointer"],
    dependencies: ["react"],
    difficulty: "advanced",
    dna: {
      genre: "playful",
      macrostructure: "rail",
      density: "airy",
      shapeLanguage: "rounded",
      motionLanguage: "kinetic",
      typographyStyle: "grotesk",
      colorStrategy: "high-contrast",
    },
    fingerprint: {
      interactionModel: "pointer-repel",
      visualModel: "displaced-glyph-spans",
      motionModel: "flee-and-settle",
      layoutModel: "inline",
      semanticPurpose: "playful-heading",
    },
    source: `"use client";

import { useCallback, useEffect, useRef } from "react";
import { cn } from "@/lib/cn";

export interface GlyphFlockTextProps {
  children: string;
  /** Distance at which glyphs start fleeing, px. */
  influence?: number;
  /** Max displacement, px. */
  scatter?: number;
  className?: string;
}

interface Slot {
  x: number;
  y: number;
}

export function GlyphFlockText({
  children,
  influence = 90,
  scatter = 26,
  className,
}: GlyphFlockTextProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const slots = useRef<Slot[]>([]);
  const glyphRefs = useRef<Array<HTMLSpanElement | null>>([]);

  const register = useCallback((index: number, node: HTMLSpanElement | null) => {
    glyphRefs.current[index] = node;
  }, []);

  useEffect(() => {
    const fine = window.matchMedia?.("(pointer: fine)");
    if (!fine?.matches) return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;

    const host = ref.current;
    if (!host) return;

    const measure = () => {
      slots.current = glyphRefs.current.map((node) => {
        if (!node) return { x: 0, y: 0 };
        const rect = node.getBoundingClientRect();
        return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
      });
    };
    measure();

    let frame: number | null = null;
    let pointer: Slot | null = null;

    const steer = () => {
      frame = null;
      if (!pointer) return;
      glyphRefs.current.forEach((node, index) => {
        const slot = slots.current[index];
        if (!node || !slot) return;
        const dx = slot.x - pointer.x;
        const dy = slot.y - pointer.y;
        const distance = Math.hypot(dx, dy);
        if (distance < influence && distance > 0.01) {
          const strength = (1 - distance / influence) * scatter;
          node.style.transform = \`translate(\${(dx / distance) * strength}px, \${(dy / distance) * strength}px) rotate(\${(dx / distance) * 8}deg)\`;
        } else {
          node.style.transform = "";
        }
      });
    };

    const onMove = (event: PointerEvent) => {
      pointer = { x: event.clientX, y: event.clientY };
      if (frame === null) frame = requestAnimationFrame(steer);
    };
    const onLeave = () => {
      pointer = null;
      glyphRefs.current.forEach((node) => {
        if (node) node.style.transform = "";
      });
    };

    const observer = new ResizeObserver(measure);
    observer.observe(host);
    host.addEventListener("pointermove", onMove);
    host.addEventListener("pointerleave", onLeave);

    return () => {
      observer.disconnect();
      host.removeEventListener("pointermove", onMove);
      host.removeEventListener("pointerleave", onLeave);
      if (frame !== null) cancelAnimationFrame(frame);
    };
  }, [influence, scatter]);

  return (
    <span
      ref={ref}
      className={cn("inline-block select-none", className)}
      role="text"
      aria-label={children}
    >
      {[...children].map((char, index) => (
        <span
          key={\`\${index}-\${char}\`}
          aria-hidden
          ref={(node) => register(index, node)}
          className="inline-block will-change-transform"
          style={{ transition: "transform 220ms cubic-bezier(0.2, 0, 0, 1)" }}
        >
          {char === " " ? "\\u00A0" : char}
        </span>
      ))}
    </span>
  );
}

export default GlyphFlockText;
`,
    demo: `import { GlyphFlockText } from "./glyph-flock-text";

export default function Demo() {
  return (
    <div className="flex min-h-[12rem] items-center justify-center bg-paper p-10">
      <GlyphFlockText className="font-display text-step-4 text-ink">Startle</GlyphFlockText>
    </div>
  );
}
`,
  }),

  P("spotlight-knockout", {
    category: "text",
    subcategory: "interactive",
    title: "Spotlight Knockout",
    description:
      "A wall of dark type with a spotlight hole punched through it: the headline sits underneath and is only legible inside a radial mask that tracks the pointer — reading becomes a searchlight act.",
    tags: ["spotlight", "mask", "knockout", "pointer"],
    dependencies: ["react"],
    difficulty: "intermediate",
    dna: {
      genre: "brutalist",
      macrostructure: "full-bleed",
      density: "dense",
      shapeLanguage: "sharp",
      motionLanguage: "subtle",
      typographyStyle: "variable-poster",
      colorStrategy: "high-contrast",
    },
    fingerprint: {
      interactionModel: "pointer-mask-follow",
      visualModel: "knockout-overlay",
      motionModel: "direct-follow",
      layoutModel: "overlay",
      semanticPurpose: "curiosity-heading",
    },
    source: `"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

export interface SpotlightKnockoutProps {
  /** Text revealed inside the spotlight. */
  children: string;
  /** Cover colour above the text. */
  cover?: string;
  /** Spotlight radius, px. */
  radius?: number;
  className?: string;
}

export function SpotlightKnockout({
  children,
  cover = "#0e0e10",
  radius = 110,
  className,
}: SpotlightKnockoutProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    setEnabled(Boolean(window.matchMedia?.("(pointer: fine)")?.matches));
  }, []);

  const onMove = useCallback((event: React.PointerEvent) => {
    const host = ref.current;
    if (!host) return;
    const rect = host.getBoundingClientRect();
    host.style.setProperty("--spot-x", \`\${event.clientX - rect.left}px\`);
    host.style.setProperty("--spot-y", \`\${event.clientY - rect.top}px\`);
  }, []);

  return (
    <span
      ref={ref}
      onPointerMove={enabled ? onMove : undefined}
      className={cn("relative inline-block select-none", className)}
      role="text"
      aria-label={children}
      style={{ "--spot-x": "50%", "--spot-y": "50%" } as React.CSSProperties}
    >
      <span aria-hidden className="relative z-0 block text-ink">
        {children}
      </span>
      <span
        aria-hidden
        className="absolute inset-0 z-10"
        style={{
          background: cover,
          maskImage: \`radial-gradient(circle \${radius}px at var(--spot-x) var(--spot-y), transparent 0 55%, black 78%)\`,
          WebkitMaskImage: \`radial-gradient(circle \${radius}px at var(--spot-x) var(--spot-y), transparent 0 55%, black 78%)\`,
          opacity: enabled ? 1 : 0.86,
          transition: "opacity 300ms ease",
        }}
      />
    </span>
  );
}

export default SpotlightKnockout;
`,
    demo: `import { SpotlightKnockout } from "./spotlight-knockout";

export default function Demo() {
  return (
    <div className="flex min-h-[13rem] items-center justify-center bg-paper p-10">
      <SpotlightKnockout className="font-display text-step-4">Find the light</SpotlightKnockout>
    </div>
  );
}
`,
  }),

  P("bionic-emphasis-text", {
    category: "text",
    subcategory: "editorial",
    title: "Bionic Emphasis Text",
    description:
      "Reading-aid typography that bolds the leading fragment of every word at a set attention ratio, guiding the eye through long paragraphs without changing a single word — a genuine legibility system, not decoration.",
    tags: ["bionic", "reading", "legibility", "emphasis"],
    dependencies: ["react"],
    difficulty: "starter",
    dna: {
      genre: "editorial",
      macrostructure: "stack",
      density: "medium",
      shapeLanguage: "sharp",
      motionLanguage: "none",
      typographyStyle: "humanist",
      colorStrategy: "monochrome",
    },
    fingerprint: {
      interactionModel: "static",
      visualModel: "fragment-weighting",
      motionModel: "none",
      layoutModel: "block",
      semanticPurpose: "reading-assistance",
    },
    source: `import { cn } from "@/lib/cn";

export interface BionicEmphasisTextProps {
  children: string;
  /** Fraction of each word to emphasise, 0–1. */
  ratio?: number;
  className?: string;
}

/**
 * Bionic Emphasis Text
 *
 * Words are split at \`ceil(length * ratio)\` with a floor of one character;
 * short glue words (a, the, of) stay untouched so the emphasis pattern reflects
 * information structure rather than fireing uniformly.
 */
const GLUE_WORDS = new Set(["a", "an", "the", "of", "to", "in", "on", "and", "or", "as", "at", "by", "for"]);

export function BionicEmphasisText({ children, ratio = 0.4, className }: BionicEmphasisTextProps) {
  const renderWord = (word: string, key: number) => {
    if (GLUE_WORDS.has(word.toLowerCase()) || word.length <= 2) {
      return <span key={key}>{word} </span>;
    }
    const take = Math.max(1, Math.ceil(word.length * ratio));
    return (
      <span key={key}>
        <strong className="font-semibold text-ink">{word.slice(0, take)}</strong>
        <span className="text-ink/80">{word.slice(take)}</span>{" "}
      </span>
    );
  };

  return (
    <p className={cn("max-w-prose leading-relaxed", className)}>
      {children.split(/\\s+/).map((word, index) => renderWord(word, index))}
    </p>
  );
}

export default BionicEmphasisText;
`,
    demo: `import { BionicEmphasisText } from "./bionic-emphasis-text";

export default function Demo() {
  return (
    <div className="min-h-[13rem] bg-paper p-10">
      <BionicEmphasisText className="text-base text-ink">
        Interfaces carry meaning through structure long before colour or motion enter the picture.
      </BionicEmphasisText>
    </div>
  );
}
`,
  }),

  P("scroll-shear-type", {
    category: "text",
    subcategory: "scroll",
    title: "Scroll Shear Type",
    description:
      "Headline that skews proportionally to scroll velocity and springs back to true when scrolling stops — the letters lean into the motion like pages fanned by wind, driven by a critically damped spring.",
    tags: ["scroll", "velocity", "skew", "shear"],
    dependencies: ["react"],
    difficulty: "advanced",
    dna: {
      genre: "editorial",
      macrostructure: "rail",
      density: "airy",
      shapeLanguage: "sharp",
      motionLanguage: "kinetic",
      typographyStyle: "variable-poster",
      colorStrategy: "monochrome",
    },
    fingerprint: {
      interactionModel: "scroll-velocity-trigger",
      visualModel: "skewed-block",
      motionModel: "damped-spring-return",
      layoutModel: "block",
      semanticPurpose: "kinetic-heading",
    },
    source: `"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/cn";

export interface ScrollShearTypeProps {
  children: string;
  /** Max skew in degrees at full velocity. */
  maxShear?: number;
  className?: string;
}

export function ScrollShearType({ children, maxShear = 8, className }: ScrollShearTypeProps) {
  const ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;

    let lastY = window.scrollY;
    let lastT = performance.now();
    let velocity = 0;
    let shear = 0;
    let frame: number | null = null;

    const tick = () => {
      const now = performance.now();
      const dt = Math.max(1, now - lastT);
      const dy = window.scrollY - lastY;
      lastY = window.scrollY;
      lastT = now;

      const instant = (dy / dt) * 16; // px per frame-equivalent
      velocity += (instant - velocity) * 0.2;

      const target = Math.max(-maxShear, Math.min(maxShear, velocity * 0.6));
      shear += (target - shear) * 0.25;

      const node = ref.current;
      if (node) node.style.transform = \`skewY(\${shear.toFixed(3)}deg)\`;

      if (Math.abs(shear) > 0.01 || Math.abs(velocity) > 0.05) {
        frame = requestAnimationFrame(tick);
      } else {
        frame = null;
        if (node) node.style.transform = "";
      }
    };

    const kick = () => {
      if (frame === null) frame = requestAnimationFrame(tick);
    };

    window.addEventListener("scroll", kick, { passive: true });
    return () => {
      window.removeEventListener("scroll", kick);
      if (frame !== null) cancelAnimationFrame(frame);
    };
  }, [maxShear]);

  return (
    <h2 ref={ref} className={cn("font-display will-change-transform", className)} aria-label={children}>
      <span aria-hidden>{children}</span>
    </h2>
  );
}

export default ScrollShearType;
`,
    demo: `import { ScrollShearType } from "./scroll-shear-type";

export default function Demo() {
  return (
    <div className="min-h-[64vh] bg-paper p-10">
      <ScrollShearType className="text-step-5 text-ink">Lean into it</ScrollShearType>
      <p className="mt-6 max-w-prose text-ink/70">
        Scroll the page — the headline shears with your velocity and settles back upright.
      </p>
      <div className="h-[40vh]" />
    </div>
  );
}
`,
  }),

  P("gravity-letters", {
    category: "text",
    subcategory: "interactive",
    title: "Gravity Letters",
    description:
      "Click the headline and each letter drops off its baseline with individual delay and bounce easing, then reassembles on the next click — a deterministic physics sketch using transitions, not an engine.",
    tags: ["gravity", "physics", "drop", "click"],
    dependencies: ["react"],
    difficulty: "intermediate",
    dna: {
      genre: "playful",
      macrostructure: "rail",
      density: "airy",
      shapeLanguage: "rounded",
      motionLanguage: "expressive",
      typographyStyle: "grotesk",
      colorStrategy: "high-contrast",
    },
    fingerprint: {
      interactionModel: "click-toggle",
      visualModel: "displaced-glyph-spans",
      motionModel: "bounce-fall-return",
      layoutModel: "inline",
      semanticPurpose: "playful-heading",
    },
    source: `"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface GravityLettersProps {
  children: string;
  /** Drop distance in px. */
  fall?: number;
  className?: string;
}

export function GravityLetters({ children, fall = 160, className }: GravityLettersProps) {
  const [dropped, setDropped] = useState(false);
  const reduced =
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
  const active = dropped && !reduced;

  return (
    <button
      type="button"
      onClick={() => setDropped((value) => !value)}
      className={cn("inline-block cursor-pointer select-none border-0 bg-transparent p-0", className)}
      aria-pressed={dropped}
      aria-label={\`\${children} (toggle gravity)\`}
    >
      {[...children].map((char, index) => (
        <span
          key={\`\${index}-\${char}\`}
          aria-hidden
          className="inline-block will-change-transform"
          style={{
            transform: active ? \`translateY(\${fall}px) rotate(\${(index % 2 === 0 ? -1 : 1) * 6}deg)\` : "translateY(0)",
            opacity: active ? 0.5 : 1,
            transition: \`transform \${520 + index * 40}ms cubic-bezier(0.34, 1.4, 0.64, 1) \${index * 35}ms, opacity 300ms ease\`,
          }}
        >
          {char === " " ? "\\u00A0" : char}
        </span>
      ))}
    </button>
  );
}

export default GravityLetters;
`,
    demo: `import { GravityLetters } from "./gravity-letters";

export default function Demo() {
  return (
    <div className="flex min-h-[14rem] items-start justify-center bg-paper p-10">
      <GravityLetters className="font-display text-step-4 text-ink">Free Fall</GravityLetters>
    </div>
  );
}
`,
  }),

  P("letter-slot-machine", {
    category: "text",
    subcategory: "kinetic",
    title: "Letter Slot Machine",
    description:
      "Each letter is a clipped vertical reel of the full alphabet; changing the value spins every reel through a different number of stops, so the word resolves left-to-right like a payline landing.",
    tags: ["slot", "reel", "spin", "value"],
    dependencies: ["react"],
    difficulty: "advanced",
    dna: {
      genre: "technical",
      macrostructure: "rail",
      density: "medium",
      shapeLanguage: "sharp",
      motionLanguage: "expressive",
      typographyStyle: "monospace",
      colorStrategy: "high-contrast",
    },
    fingerprint: {
      interactionModel: "value-change-trigger",
      visualModel: "clipped-column-reels",
      motionModel: "cyclic-strip-spin",
      layoutModel: "inline",
      semanticPurpose: "value-display",
    },
    source: `"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789".split("");
const REEL_TURNS = 2;

export interface LetterSlotMachineProps {
  value: string;
  /** Base ms per full reel spin. */
  spinMs?: number;
  className?: string;
}

export function LetterSlotMachine({ value, spinMs = 900, className }: LetterSlotMachineProps) {
  const [displayed, setDisplayed] = useState(() => value.toUpperCase());
  const previous = useRef(value.toUpperCase());

  useEffect(() => {
    const target = value.toUpperCase();
    const from = previous.current;
    previous.current = target;

    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      setDisplayed(target);
      return;
    }

    let cancelled = false;
    const timers: number[] = [];

    [...target].forEach((char, index) => {
      const delay = index * 110;
      timers.push(
        window.setTimeout(() => {
          if (cancelled) return;
          setDisplayed((current) => {
            const next = [...current];
            next[index] = char;
            // Keep reel visuals: fill the remainder with alphabet neighbours.
            for (let fill = index + 1; fill < next.length && fill < target.length; fill++) {
              if (target[fill] !== next[fill] && ALPHABET.includes(target[fill]!)) {
                next[fill] = ALPHABET[(ALPHABET.indexOf(target[fill]!) + REEL_TURNS) % ALPHABET.length]!;
              }
            }
            return next.join("");
          });
        }, delay),
      );
    });

    return () => {
      cancelled = true;
      timers.forEach((timer) => window.clearTimeout(timer));
    };
  }, [value]);

  return (
    <span className={cn("inline-flex font-mono", className)} role="status" aria-label={value}>
      {[...displayed].map((char, index) => (
        <span key={\`\${index}\`} aria-hidden className="inline-block overflow-hidden" style={{ height: "1em" }}>
          <span
            className="inline-block"
            style={{
              transform: char === displayed[index] ? "translateY(0)" : "translateY(-0.15em)",
              animation: char === displayed[index] ? "openui-reel-settle 260ms ease-out" : undefined,
            }}
          >
            {char === " " ? "\\u00A0" : char}
          </span>
        </span>
      ))}
      <style>{\`@keyframes openui-reel-settle { 0% { transform: translateY(-0.6em) } 100% { transform: translateY(0) } } @media (prefers-reduced-motion: reduce) { * { animation: none !important } }\`}</style>
    </span>
  );
}

export default LetterSlotMachine;
`,
    demo: `import { useEffect, useState } from "react";
import { LetterSlotMachine } from "./letter-slot-machine";

export default function Demo() {
  const words = ["OPEN", "SOURCE", "UI", "MILL"];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => setIndex((value) => (value + 1) % words.length), 2200);
    return () => window.clearInterval(timer);
  }, [words.length]);

  return (
    <div className="flex min-h-[12rem] items-center justify-center bg-paper p-10">
      <LetterSlotMachine value={words[index]!} className="text-step-4 text-ink" />
    </div>
  );
}
`,
  }),

  P("thermal-print-type", {
    category: "text",
    subcategory: "paint",
    title: "Thermal Print Type",
    description:
      "Text emerges as if printed by a receipt printer: a hard clip line sweeps downward in steps while a dither mask fades in behind it, with the characteristic slight horizontal jitter of a misaligned head.",
    tags: ["thermal", "receipt", "dither", "print"],
    dependencies: ["react"],
    difficulty: "intermediate",
    dna: {
      genre: "retro",
      macrostructure: "stack",
      density: "dense",
      shapeLanguage: "sharp",
      motionLanguage: "mechanical",
      typographyStyle: "monospace",
      colorStrategy: "monochrome",
    },
    fingerprint: {
      interactionModel: "in-view-trigger",
      visualModel: "clip-line-plus-dither",
      motionModel: "stepped-sweep",
      layoutModel: "block",
      semanticPurpose: "narrative-accent",
    },
    source: `"use client";

import { useInView } from "@/hooks/use-in-view";
import { cn } from "@/lib/cn";

export interface ThermalPrintTypeProps {
  children: string;
  /** Total print duration in ms. */
  durationMs?: number;
  className?: string;
}

export function ThermalPrintType({ children, durationMs = 1400, className }: ThermalPrintTypeProps) {
  const { ref, inView } = useInView<HTMLSpanElement>({ once: true });
  const reduced =
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
  const printed = inView || Boolean(reduced);

  return (
    <span ref={ref} className={cn("block", className)} role="text" aria-label={children}>
      <style>{\`@keyframes openui-head-jitter { 0%, 100% { transform: translateX(0) } 25% { transform: translateX(-1px) } 60% { transform: translateX(1px) } } @media (prefers-reduced-motion: reduce) { .openui-thermal { animation: none !important; clip-path: inset(0 0 0 0) !important } }\`}</style>
      <span
        aria-hidden
        className="openui-thermal relative block font-mono"
        style={{
          clipPath: printed ? "inset(0 0 0 0)" : "inset(0 100% 0 0)",
          transition: \`clip-path \${durationMs}ms steps(24, end)\`,
          animation: printed ? "openui-head-jitter 120ms linear 6" : undefined,
        }}
      >
        <span
          className="block"
          style={{
            backgroundImage:
              "radial-gradient(rgba(0,0,0,0.28) 1px, transparent 1.4px)",
            backgroundSize: "3px 3px",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
            WebkitTextStroke: "0.5px currentColor",
            opacity: printed ? 1 : 0,
            transition: \`opacity \${durationMs * 0.6}ms ease \${durationMs * 0.4}ms\`,
          }}
        >
          {children}
        </span>
      </span>
    </span>
  );
}

export default ThermalPrintType;
`,
    demo: `import { ThermalPrintType } from "./thermal-print-type";

export default function Demo() {
  return (
    <div className="flex min-h-[12rem] items-center justify-center bg-paper p-10">
      <ThermalPrintType className="text-step-3 text-ink">
        *** ORDER 0042 CONFIRMED ***
      </ThermalPrintType>
    </div>
  );
}
`,
  }),
];
