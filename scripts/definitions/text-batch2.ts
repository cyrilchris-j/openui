import type { ResourceDefinition } from "../lib/definitions.js";

/**
 * Text batch 2 — eight more distinct typographic techniques.
 * Each uses a different mechanism than batch 1 (scramble/wave/circular/outline):
 * keyed glyph decryption, variable-font axis animation, phrase rotation,
 * focus-pull blur, editorial drop caps, numeric tweening, vertical writing
 * modes and hover content replacement.
 */

const P = (name: string, definition: Omit<ResourceDefinition, "name">): ResourceDefinition => ({
  name,
  ...definition,
});

export default [
  P("decrypt-text", {
    category: "text",
    subcategory: "kinetic",
    title: "Decrypt Text",
    description:
      "Click-to-decrypt ciphertext: a button-styled text surface that re-runs a keyed glyph resolution on every activation, with run progress announced to screen readers and deterministic per-index glyphs.",
    tags: ["decrypt", "cipher", "terminal", "click-triggered"],
    dependencies: ["react"],
    difficulty: "intermediate",
    dna: {
      genre: "technical",
      macrostructure: "stack",
      density: "compact",
      shapeLanguage: "sharp",
      motionLanguage: "mechanical",
      typographyStyle: "monospace",
      colorStrategy: "neon-on-dark",
    },
    fingerprint: {
      interactionModel: "click-rerun",
      visualModel: "keyed-glyph-hash",
      motionModel: "ordered-resolve",
      layoutModel: "inline",
      semanticPurpose: "message-decode",
    },
    source: `"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

const CIPHER = "ABCDEFGHJKLMNPQRSTUVWXYZ0123456789#$%&";

/** Stable pseudo-random from an index: same input, same glyph, always. */
function keyedGlyph(index: number, salt: number): string {
  const value = Math.sin(index * 12.9898 + salt * 78.233) * 43758.5453;
  return CIPHER[Math.abs(Math.floor(value)) % CIPHER.length] ?? "#";
}

export interface DecryptTextProps {
  text: string;
  /** Positions resolved per animation frame. */
  rate?: number;
  /** Re-runs the decryption; parent can trigger from anywhere. */
  runToken?: number;
  onDecrypted?: () => void;
  className?: string;
}

export function DecryptText({ text, rate = 1, runToken = 0, onDecrypted, className }: DecryptTextProps) {
  const [output, setOutput] = useState(() =>
    [...text].map((char, index) => (char === " " ? " " : keyedGlyph(index, 0))).join(""),
  );
  const [status, setStatus] = useState<"idle" | "running" | "done">("idle");
  const frame = useRef<number | null>(null);

  const run = useCallback(() => {
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      setOutput(text);
      setStatus("done");
      onDecrypted?.();
      return;
    }

    let resolved = 0;
    let salt = 0;
    setStatus("running");

    const step = () => {
      salt++;
      resolved = Math.min(text.length, resolved + rate);
      setOutput(
        [...text]
          .map((char, index) => {
            if (char === " ") return " ";
            if (index < resolved) return char;
            return keyedGlyph(index, salt);
          })
          .join(""),
      );
      if (resolved < text.length) {
        frame.current = requestAnimationFrame(step);
      } else {
        setStatus("done");
        onDecrypted?.();
      }
    };

    if (frame.current !== null) cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(step);
  }, [text, rate, onDecrypted]);

  useEffect(() => {
    if (runToken > 0) run();
    return () => {
      if (frame.current !== null) cancelAnimationFrame(frame.current);
    };
  }, [runToken, run]);

  return (
    <span
      role="button"
      tabIndex={0}
      aria-label={\`Decrypt message: \${text}\`}
      className={cn(
        "inline-block cursor-pointer font-mono tabular-nums",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-oxide",
        className,
      )}
      onClick={run}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          run();
        }
      }}
    >
      {output}
      <span aria-live="polite" className="sr-only">
        {status === "done" ? "Message decrypted" : status === "running" ? "Decrypting" : "Press to decrypt"}
      </span>
    </span>
  );
}

export default DecryptText;
`,
    demo: `import { useState } from "react";
import { DecryptText } from "./decrypt-text";

export default function Demo() {
  const [run, setRun] = useState(1);
  return (
    <div className="flex min-h-[10rem] flex-col items-start justify-center gap-5 bg-ink p-10">
      <DecryptText
        runToken={run}
        text="ACCESS GRANTED"
        className="text-step-2 text-moss"
      />
      <button
        type="button"
        onClick={() => setRun((value) => value + 1)}
        className="border border-line px-3 py-1.5 font-mono text-[0.75rem] uppercase tracking-[0.14em] text-paper transition-colors hover:border-oxide hover:text-oxide"
      >
        Re-run decryption
      </button>
    </div>
  );
}
`,
  }),

  P("variable-weight-text", {
    category: "text",
    subcategory: "interactive",
    title: "Variable Weight Text",
    description:
      "Per-glyph font-variation weight driven by distance to the pointer, so the word swells under the cursor like a pressure field; falls back to a static mid weight without a pointer.",
    tags: ["variable-font", "weight", "pointer", "typography"],
    dependencies: ["react"],
    difficulty: "intermediate",
    dna: {
      genre: "swiss",
      macrostructure: "rail",
      density: "airy",
      shapeLanguage: "sharp",
      motionLanguage: "expressive",
      typographyStyle: "variable-poster",
      colorStrategy: "monochrome",
    },
    fingerprint: {
      interactionModel: "pointer-proximity-weight",
      visualModel: "axis-animation",
      motionModel: "distance-falloff",
      layoutModel: "inline",
      semanticPurpose: "display-statement",
    },
    source: `"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

export interface VariableWeightTextProps {
  text: string;
  /** Weight at rest, 100–900 depending on the face. */
  baseWeight?: number;
  /** Weight at zero distance. */
  peakWeight?: number;
  /** Falloff radius in px. */
  radius?: number;
  className?: string;
}

export function VariableWeightText({
  text,
  baseWeight = 300,
  peakWeight = 800,
  radius = 120,
  className,
}: VariableWeightTextProps) {
  const containerRef = useRef<HTMLSpanElement>(null);
  const glyphRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const frame = useRef<number | null>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia?.("(pointer: fine)");
    const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    const update = () => setEnabled(Boolean(fine?.matches) && !reduced?.matches);
    update();
    fine?.addEventListener?.("change", update);
    return () => fine?.removeEventListener?.("change", update);
  }, []);

  useEffect(
    () => () => {
      if (frame.current !== null) cancelAnimationFrame(frame.current);
    },
    [],
  );

  const applyWeights = useCallback(
    (pointerX: number | null) => {
      for (const [index, glyph] of glyphRefs.current.entries()) {
        if (!glyph) continue;
        if (!enabled || pointerX === null) {
          glyph.style.fontVariationSettings = \`"wght" \${baseWeight}\`;
          continue;
        }
        const rect = glyph.getBoundingClientRect();
        const distance = Math.abs(pointerX - (rect.left + rect.width / 2));
        const falloff = Math.max(0, 1 - distance / radius);
        const weight = Math.round(baseWeight + (peakWeight - baseWeight) * falloff * falloff);
        glyph.style.fontVariationSettings = \`"wght" \${weight}\`;
      }
    },
    [baseWeight, enabled, peakWeight, radius],
  );

  const handleMove = (event: React.PointerEvent<HTMLSpanElement>) => {
    const x = event.clientX;
    if (frame.current !== null) cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => applyWeights(x));
  };

  return (
    <span
      ref={containerRef}
      className={cn("select-none", className)}
      style={{ fontVariationSettings: \`"wght" \${baseWeight}\` }}
      onPointerMove={handleMove}
      onPointerLeave={() => applyWeights(null)}
      aria-label={text}
      role="text"
    >
      {[...text].map((char, index) => (
        <span
          key={\`\${char}-\${index}\`}
          aria-hidden
          // eslint-disable-next-line no-return-assign
          ref={(element) => {
            glyphRefs.current[index] = element;
          }}
          className="inline-block will-change-[font-variation-settings]"
          style={{ transition: "font-variation-settings 120ms ease-out" }}
        >
          {char === " " ? "\\u00A0" : char}
        </span>
      ))}
    </span>
  );
}

export default VariableWeightText;
`,
    demo: `import { VariableWeightText } from "./variable-weight-text";

export default function Demo() {
  return (
    <div className="flex min-h-[10rem] items-center justify-center bg-paper p-10">
      <VariableWeightText
        text="PRESSURE"
        className="font-sans text-step-4 tracking-tight text-ink"
      />
    </div>
  );
}
`,
  }),

  P("type-stack", {
    category: "text",
    subcategory: "kinetic",
    title: "Type Stack",
    description:
      "A vertical stack of phrases that cycles with a directional slide, reserving the height of the longest phrase so surrounding layout never reflows; pauses on hover and focus.",
    tags: ["rotator", "stack", "phrases", "reserved-space"],
    dependencies: ["react"],
    difficulty: "starter",
    dna: {
      genre: "editorial",
      macrostructure: "stack",
      density: "medium",
      shapeLanguage: "sharp",
      motionLanguage: "subtle",
      typographyStyle: "serif-display",
      colorStrategy: "high-contrast",
    },
    fingerprint: {
      interactionModel: "timer-cycle",
      visualModel: "stacked-phrases",
      motionModel: "directional-slide",
      layoutModel: "reserved-height",
      semanticPurpose: "heading-rotation",
    },
    source: `"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

export interface TypeStackProps {
  phrases: string[];
  /** Milliseconds each phrase holds. */
  interval?: number;
  className?: string;
}

export function TypeStack({ phrases, interval = 2600, className }: TypeStackProps) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const timer = useRef<number | null>(null);
  const longest = phrases.reduce((max, phrase) => Math.max(max, phrase.length), 0);

  useEffect(() => {
    if (paused) return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
    timer.current = window.setInterval(
      () => setActive((value) => (value + 1) % phrases.length),
      interval,
    );
    return () => {
      if (timer.current !== null) window.clearInterval(timer.current);
    };
  }, [paused, phrases.length, interval]);

  return (
    <span
      className={cn("relative inline-grid overflow-hidden align-bottom", className)}
      style={{ minHeight: "1.2em", minWidth: \`\${longest}ch\` }}
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      tabIndex={0}
      role="status"
      aria-label={phrases[active]}
    >
      {phrases.map((phrase, index) => (
        <span
          key={phrase}
          aria-hidden={index !== active}
          className={cn(
            "col-start-1 row-start-1 transition-[transform,opacity] duration-normal ease-editorial motion-reduce:transition-none",
            index === active ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-full opacity-0",
          )}
        >
          {phrase}
        </span>
      ))}
    </span>
  );
}

export default TypeStack;
`,
    demo: `import { TypeStack } from "./type-stack";

export default function Demo() {
  return (
    <div className="flex min-h-[12rem] items-center justify-center bg-paper p-10">
      <p className="font-display text-step-3 text-ink">
        Design is <TypeStack phrases={["structure.", "rhythm.", "restraint.", "contrast."]} />
      </p>
    </div>
  );
}
`,
  }),

  P("blur-reveal-text", {
    category: "text",
    subcategory: "reveal",
    title: "Blur Reveal Text",
    description:
      "A focus-pull reveal: words start defocused and transparent, then sharpen in reading order with an interleaved delay, using only filter and opacity so layout is stable throughout.",
    tags: ["blur", "focus-pull", "reveal", "filter"],
    dependencies: ["react"],
    difficulty: "starter",
    dna: {
      genre: "luxury",
      macrostructure: "asymmetric",
      density: "airy",
      shapeLanguage: "soft",
      motionLanguage: "expressive",
      typographyStyle: "serif-display",
      colorStrategy: "monochrome",
    },
    fingerprint: {
      interactionModel: "in-view-trigger",
      visualModel: "filter-sharpen",
      motionModel: "reading-order-stagger",
      layoutModel: "inline",
      semanticPurpose: "intro-copy",
    },
    source: `"use client";

import { useInView } from "@/hooks/use-in-view";
import { cn } from "@/lib/cn";

export interface BlurRevealTextProps {
  text: string;
  /** Seconds between word starts. */
  stagger?: number;
  className?: string;
}

export function BlurRevealText({ text, stagger = 0.12, className }: BlurRevealTextProps) {
  const { ref, inView } = useInView<HTMLSpanElement>({ once: true });
  const words = text.split(" ");
  const reduced =
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
  const revealed = inView || Boolean(reduced);

  return (
    <span ref={ref} className={cn("inline", className)} aria-label={text}>
      {words.map((word, index) => (
        <span
          key={\`\${word}-\${index}\`}
          aria-hidden
          className="inline-block will-change-[filter,opacity]"
          style={{
            filter: revealed ? "blur(0)" : "blur(8px)",
            opacity: revealed ? 1 : 0,
            transition: revealed
              ? \`filter 520ms ease \${index * stagger}s, opacity 520ms ease \${index * stagger}s\`
              : "none",
          }}
        >
          {word}
          {index < words.length - 1 ? "\\u00A0" : ""}
        </span>
      ))}
    </span>
  );
}

export default BlurRevealText;
`,
    demo: `import { BlurRevealText } from "./blur-reveal-text";

export default function Demo() {
  return (
    <div className="flex min-h-[10rem] items-center justify-center bg-paper p-10">
      <BlurRevealText
        text="Clarity arrives one word at a time."
        className="font-display text-step-2 text-ink"
      />
    </div>
  );
}
`,
  }),

  P("editorial-drop-cap", {
    category: "text",
    subcategory: "editorial",
    title: "Editorial Drop Cap",
    description:
      "A true initial letter: the first character sits in a measured float spanning a fixed number of text lines, with a hanging indent recomputed from the glyph's actual advance width, not a guessed ch value.",
    tags: ["drop-cap", "editorial", "initial", "float"],
    dependencies: ["react"],
    difficulty: "intermediate",
    dna: {
      genre: "editorial",
      macrostructure: "asymmetric",
      density: "medium",
      shapeLanguage: "sharp",
      motionLanguage: "none",
      typographyStyle: "serif-display",
      colorStrategy: "high-contrast",
    },
    fingerprint: {
      interactionModel: "static",
      visualModel: "measured-float-initial",
      motionModel: "none",
      layoutModel: "hanging-indent",
      semanticPurpose: "article-opening",
    },
    source: `"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

export interface EditorialDropCapProps {
  /** Body copy; the first character becomes the initial. */
  text: string;
  /** How many body lines the initial spans. */
  lines?: number;
  className?: string;
}

export function EditorialDropCap({ text, lines = 3, className }: EditorialDropCapProps) {
  const initialRef = useRef<HTMLSpanElement>(null);
  const [offset, setOffset] = useState(0);
  const [reduced, setReduced] = useState(false);

  // The indent is measured from the rendered glyph rather than assumed from
  // the ch unit, which is wrong for proportional faces — a serif C is not one ch wide.
  useEffect(() => {
    setReduced(window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false);
    const initial = initialRef.current;
    if (!initial) return;
    const measure = () => setOffset(initial.getBoundingClientRect().width);
    measure();
    const observer = typeof ResizeObserver !== "undefined" ? new ResizeObserver(measure) : null;
    observer?.observe(initial);
    return () => observer?.disconnect();
  }, [text]);

  const [first, ...rest] = text;
  const body = rest.join("");

  return (
    <p className={cn("prose-measure text-[0.95rem] leading-[1.7] text-graphite", className)}>
      <span
        ref={initialRef}
        aria-hidden={reduced}
        className="float-left mr-3 select-none font-display text-ink"
        style={{
          fontSize: \`calc(\${lines} * 1.7em)\`,
          lineHeight: "0.82",
          paddingTop: "0.04em",
        }}
      >
        {first}
      </span>
      <span className={reduced ? "inline" : undefined} style={{ marginLeft: reduced ? 0 : -offset / 2 }}>
        {body}
      </span>
    </p>
  );
}

export default EditorialDropCap;
`,
    demo: `import { EditorialDropCap } from "./editorial-drop-cap";

export default function Demo() {
  return (
    <div className="bg-paper p-10">
      <EditorialDropCap
        lines={3}
        text="Typography is the craft of endowing human language with a durable visual form, and a page that opens with a measured initial is making a promise about the care inside."
      />
    </div>
  );
}
`,
  }),

  P("counter-typography", {
    category: "text",
    subcategory: "numeric",
    title: "Counter Typography",
    description:
      "Numeric tweening with tabular figures, an ease-out curve and locale-aware grouping; the width is reserved from the final value so the surrounding line never shifts while counting.",
    tags: ["counter", "numbers", "tween", "tabular"],
    dependencies: ["react"],
    difficulty: "intermediate",
    dna: {
      genre: "swiss",
      macrostructure: "stack",
      density: "compact",
      shapeLanguage: "sharp",
      motionLanguage: "subtle",
      typographyStyle: "grotesk",
      colorStrategy: "accent-only",
    },
    fingerprint: {
      interactionModel: "in-view-trigger",
      visualModel: "tabular-figures",
      motionModel: "ease-out-tween",
      layoutModel: "reserved-width",
      semanticPurpose: "metric-display",
    },
    source: `"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "@/hooks/use-in-view";
import { cn } from "@/lib/cn";

export interface CounterTypographyProps {
  value: number;
  /** Animation duration in milliseconds. */
  duration?: number;
  /** Decimal places to render. */
  decimals?: number;
  /** Locale for digit grouping. */
  locale?: string;
  /** Optional suffix rendered after the number (%, k, …). */
  suffix?: string;
  className?: string;
}

export function CounterTypography({
  value,
  duration = 1400,
  decimals = 0,
  locale = "en-US",
  suffix,
  className,
}: CounterTypographyProps) {
  const { ref, inView } = useInView<HTMLSpanElement>({ once: true });
  const [display, setDisplay] = useState(0);
  const frame = useRef<number | null>(null);

  useEffect(() => {
    if (!inView) return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      setDisplay(value);
      return;
    }

    const start = performance.now();
    const step = (now: number) => {
      const progress = Math.min(1, (now - start) / duration);
      // ease-out cubic: fast start, soft landing
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(value * eased);
      if (progress < 1) frame.current = requestAnimationFrame(step);
    };
    frame.current = requestAnimationFrame(step);
    return () => {
      if (frame.current !== null) cancelAnimationFrame(frame.current);
    };
  }, [inView, value, duration]);

  const formatted = display.toLocaleString(locale, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

  return (
    <span
      ref={ref}
      className={cn("tabular-nums", className)}
      // Reserve the final width so the line does not shift while counting.
      style={{ minWidth: \`\${value.toLocaleString(locale, { minimumFractionDigits: decimals, maximumFractionDigits: decimals }).length}ch\`, display: "inline-block" }}
    >
      {formatted}
      {suffix ? <span aria-hidden>{suffix}</span> : null}
    </span>
  );
}

export default CounterTypography;
`,
    demo: `import { CounterTypography } from "./counter-typography";

export default function Demo() {
  return (
    <div className="flex min-h-[10rem] items-center justify-center gap-10 bg-paper p-10">
      <CounterTypography value={800} className="font-display text-step-4 text-ink" />
      <CounterTypography value={99.7} decimals={1} suffix="%" className="font-display text-step-3 text-oxide" />
      <CounterTypography value={126400} className="font-display text-step-3 text-moss" />
    </div>
  );
}
`,
  }),

  P("vertical-kern-text", {
    category: "text",
    subcategory: "path",
    title: "Vertical Kern Text",
    description:
      "A label set in vertical writing mode with upright Latin glyphs and controlled letter spacing, for spines, rails and side navigation where horizontal space is the constraint.",
    tags: ["vertical", "writing-mode", "spine", "rail"],
    dependencies: ["react"],
    difficulty: "starter",
    dna: {
      genre: "industrial",
      macrostructure: "rail",
      density: "compact",
      shapeLanguage: "sharp",
      motionLanguage: "none",
      typographyStyle: "condensed",
      colorStrategy: "monochrome",
    },
    fingerprint: {
      interactionModel: "static",
      visualModel: "writing-mode-vertical",
      motionModel: "none",
      layoutModel: "vertical-rail",
      semanticPurpose: "section-label",
    },
    source: `import { cn } from "@/lib/cn";

export interface VerticalKernTextProps {
  children: string;
  /** Letter spacing in em. */
  tracking?: number;
  /** Rotate 180° so the text reads bottom-to-top. */
  flip?: boolean;
  className?: string;
}

/**
 * Vertical Kern Text
 *
 * \`text-orientation: mixed\` keeps Latin upright while genuinely vertical
 * scripts keep their native behaviour; \`upright\` would break CJK readers'
 * expectations. The flip variant is a rotation, not a different writing
 * direction, so the reading order in the DOM stays correct.
 */
export function VerticalKernText({
  children,
  tracking = 0.32,
  flip = false,
  className,
}: VerticalKernTextProps) {
  return (
    <span
      className={cn("select-none font-mono text-[0.72rem] uppercase text-graphite", className)}
      style={{
        writingMode: "vertical-rl",
        letterSpacing: \`\${tracking}em\`,
        transform: flip ? "rotate(180deg)" : undefined,
      }}
      role="text"
    >
      {children}
    </span>
  );
}

export default VerticalKernText;
`,
    demo: `import { VerticalKernText } from "./vertical-kern-text";

export default function Demo() {
  return (
    <div className="flex min-h-[14rem] items-stretch justify-center gap-8 bg-paper p-10">
      <div className="border-l border-line pl-3">
        <VerticalKernText>Chapter One</VerticalKernText>
      </div>
      <div className="border-r border-line pr-3">
        <VerticalKernText flip>Chapter Two</VerticalKernText>
      </div>
    </div>
  );
}
`,
  }),

  P("hover-replace-text", {
    category: "text",
    subcategory: "interactive",
    title: "Hover Replace Text",
    description:
      "Two stacked labels that cross-fade and slide on hover with a directional bias from the pointer's entry side; tap toggles on touch, and keyboard focus triggers the same swap.",
    tags: ["hover", "swap", "cross-fade", "link"],
    dependencies: ["react"],
    difficulty: "starter",
    dna: {
      genre: "editorial",
      macrostructure: "stack",
      density: "compact",
      shapeLanguage: "sharp",
      motionLanguage: "expressive",
      typographyStyle: "grotesk",
      colorStrategy: "high-contrast",
    },
    fingerprint: {
      interactionModel: "hover-swap",
      visualModel: "layered-labels",
      motionModel: "directional-cross-fade",
      layoutModel: "inline",
      semanticPurpose: "link-emphasis",
    },
    source: `"use client";

import { useRef, useState } from "react";
import { cn } from "@/lib/cn";

export interface HoverReplaceTextProps {
  /** Label shown at rest. */
  base: string;
  /** Label revealed on hover, focus or tap. */
  alt: string;
  href?: string;
  className?: string;
}

export function HoverReplaceText({ base, alt, href = "#", className }: HoverReplaceTextProps) {
  const [active, setActive] = useState(false);
  const [direction, setDirection] = useState<"up" | "down">("up");
  const enteredFromTop = useRef<boolean | null>(null);

  const handleEnter = (event: React.PointerEvent<HTMLAnchorElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const fromTop = event.clientY - rect.top < rect.height / 2;
    enteredFromTop.current = fromTop;
    setDirection(fromTop ? "up" : "down");
    setActive(true);
  };

  const swapTransition =
    "transform 220ms cubic-bezier(0.2, 0, 0, 1), opacity 220ms ease";

  return (
    <a
      href={href}
      className={cn("group relative inline-block overflow-hidden align-baseline", className)}
      onPointerEnter={handleEnter}
      onPointerLeave={() => setActive(false)}
      onFocus={() => setActive(true)}
      onBlur={() => setActive(false)}
      onClick={(event) => {
        // Touch: first tap swaps, second tap follows the link.
        if (enteredFromTop.current === null) {
          event.preventDefault();
          setActive((value) => !value);
        }
      }}
    >
      <span className="relative inline-grid" style={{ minWidth: "1ch" }} aria-label={\`\${base} — \${alt}\`}>
        <span
          aria-hidden
          className="col-start-1 row-start-1 text-ink"
          style={{
            transform: active ? \`translateY(\${direction === "up" ? "-100%" : "100%"})\` : "translateY(0)",
            opacity: active ? 0 : 1,
            transition: swapTransition,
          }}
        >
          {base}
        </span>
        <span
          aria-hidden
          className="col-start-1 row-start-1 text-oxide"
          style={{
            transform: active
              ? "translateY(0)"
              : \`translateY(\${direction === "up" ? "100%" : "-100%"})\`,
            opacity: active ? 1 : 0,
            transition: swapTransition,
          }}
        >
          {alt}
        </span>
      </span>
    </a>
  );
}

export default HoverReplaceText;
`,
    demo: `import { HoverReplaceText } from "./hover-replace-text";

export default function Demo() {
  return (
    <div className="flex min-h-[10rem] flex-col items-center justify-center gap-6 bg-paper p-10">
      <HoverReplaceText base="Read the essay" alt="12 minute read" className="font-display text-step-2 text-ink" />
      <HoverReplaceText base="Install the CLI" alt="pnpm dlx openui" className="font-mono text-[0.9rem] text-ink" />
    </div>
  );
}
`,
  }),
];
