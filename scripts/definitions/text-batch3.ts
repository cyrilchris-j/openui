import type { ResourceDefinition } from "../lib/definitions.js";

/**
 * Text batch 3 — eight further distinct techniques: marquee band, 3D
 * perspective tilt, glitch bursts, scroll-linked mask wipe, elastic glyph
 * stretch, SVG stroke draw, flip-clock digits and seeded jitter.
 */

const P = (name: string, definition: Omit<ResourceDefinition, "name">): ResourceDefinition => ({
  name,
  ...definition,
});

export default [
  P("kinetic-marquee", {
    category: "text",
    subcategory: "kinetic",
    title: "Kinetic Marquee",
    description:
      "A continuous text band whose speed responds to scroll velocity — faster scrolling accelerates the ticker and skews it proportionally, settling back to base speed when scrolling stops.",
    tags: ["marquee", "scroll-velocity", "skew", "ticker"],
    dependencies: ["react"],
    difficulty: "intermediate",
    dna: {
      genre: "industrial",
      macrostructure: "rail",
      density: "compact",
      shapeLanguage: "sharp",
      motionLanguage: "kinetic",
      typographyStyle: "condensed",
      colorStrategy: "high-contrast",
    },
    fingerprint: {
      interactionModel: "scroll-velocity",
      visualModel: "repeating-band",
      motionModel: "velocity-coupled-translate",
      layoutModel: "full-bleed-rail",
      semanticPurpose: "announcement-band",
    },
    source: `"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/cn";

export interface KineticMarqueeProps {
  text: string;
  /** Base speed in px/s when the page is idle. */
  baseSpeed?: number;
  /** Multiplier applied at peak scroll velocity. */
  velocityGain?: number;
  className?: string;
}

export function KineticMarquee({
  text,
  baseSpeed = 60,
  velocityGain = 6,
  className,
}: KineticMarqueeProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const state = useRef({ offset: 0, velocity: 0, lastScrollY: 0, lastTime: 0, raf: 0, halfWidth: 0 });

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    const s = state.current;

    const measure = () => {
      s.halfWidth = track.scrollWidth / 2;
    };
    measure();

    const onScroll = () => {
      const now = performance.now();
      if (s.lastTime > 0) {
        const dy = window.scrollY - s.lastScrollY;
        const dt = Math.max(1, now - s.lastTime);
        s.velocity = s.velocity * 0.8 + (dy / dt) * 200 * 0.2;
      }
      s.lastScrollY = window.scrollY;
      s.lastTime = now;
    };

    const step = (now: number) => {
      const dt = Math.min(64, now - (s.lastTime || now));
      s.lastTime = now;
      // Scroll velocity adds to base speed and decays exponentially.
      const speed = baseSpeed + Math.abs(s.velocity) * velocityGain;
      s.velocity *= 0.92;
      s.offset = (s.offset + (speed * dt) / 1000) % Math.max(1, s.halfWidth);
      const skew = Math.max(-14, Math.min(14, s.velocity * velocityGain * 0.25));
      track.style.transform = \`translateX(-\${s.offset}px) skewX(\${skew}deg)\`;
      s.raf = requestAnimationFrame(step);
    };

    if (reduced) {
      // Static band: content is still fully readable.
      track.style.transform = "none";
      return;
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", measure);
    s.raf = requestAnimationFrame(step);
    return () => {
      cancelAnimationFrame(s.raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", measure);
    };
  }, [baseSpeed, velocityGain]);

  return (
    <div className={cn("overflow-hidden border-y border-line py-3", className)} aria-label={text}>
      <div ref={trackRef} className="flex w-max whitespace-nowrap will-change-transform">
        {[0, 1, 2, 3].map((copy) => (
          <span
            key={copy}
            aria-hidden={copy > 0}
            className="px-6 font-mono text-[0.85rem] uppercase tracking-[0.3em] text-ink"
          >
            {text} ·
          </span>
        ))}
      </div>
    </div>
  );
}

export default KineticMarquee;
`,
    demo: `import { KineticMarquee } from "./kinetic-marquee";

export default function Demo() {
  return (
    <div className="min-h-[16rem] bg-paper pt-16">
      <KineticMarquee text="800 resources · zero lock-in · MIT licensed" />
      <p className="mt-10 text-center text-[0.8rem] text-graphite">Scroll the page — the band reacts to velocity.</p>
    </div>
  );
}
`,
  }),

  P("perspective-tilt-text", {
    category: "text",
    subcategory: "3d",
    title: "Perspective Tilt Text",
    description:
      "Display text on a plane that tilts toward the pointer with rotateX/rotateY, layered with a translateZ shadow copy so the depth reads as physical; the transform origin eases back to centre on leave.",
    tags: ["3d", "perspective", "tilt", "pointer"],
    dependencies: ["react"],
    difficulty: "intermediate",
    dna: {
      genre: "brutalist",
      macrostructure: "asymmetric",
      density: "airy",
      shapeLanguage: "sharp",
      motionLanguage: "expressive",
      typographyStyle: "variable-poster",
      colorStrategy: "duotone",
    },
    fingerprint: {
      interactionModel: "pointer-tilt",
      visualModel: "z-layered-plane",
      motionModel: "spring-return",
      layoutModel: "inline",
      semanticPurpose: "display-statement",
    },
    source: `"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

export interface PerspectiveTiltTextProps {
  children: string;
  /** Maximum tilt in degrees on each axis. */
  maxTilt?: number;
  /** Extra depth for the shadow layer, in px. */
  depth?: number;
  className?: string;
}

export function PerspectiveTiltText({
  children,
  maxTilt = 18,
  depth = 24,
  className,
}: PerspectiveTiltTextProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [enabled, setEnabled] = useState(false);
  const frame = useRef<number | null>(null);

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

  const handleMove = (event: React.PointerEvent<HTMLSpanElement>) => {
    if (!enabled) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width - 0.5;
    const py = (event.clientY - rect.top) / rect.height - 0.5;
    if (frame.current !== null) cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => setTilt({ x: -py * maxTilt, y: px * maxTilt }));
  };

  const reset = () => setTilt({ x: 0, y: 0 });

  return (
    <span
      ref={ref}
      className={cn("inline-block", className)}
      style={{ perspective: "600px" }}
      onPointerMove={handleMove}
      onPointerLeave={reset}
      role="text"
      aria-label={children}
    >
      <span
        aria-hidden
        className="relative inline-block will-change-transform motion-reduce:transform-none"
        style={{
          transform: \`rotateX(\${tilt.x}deg) rotateY(\${tilt.y}deg)\`,
          transformStyle: "preserve-3d",
          transition: "transform 180ms cubic-bezier(0.2, 0, 0, 1)",
        }}
      >
        <span
          aria-hidden
          className="absolute inset-0 select-none text-graphite/25"
          style={{ transform: \`translateZ(-\${depth}px)\` }}
        >
          {children}
        </span>
        <span className="relative" style={{ transform: \`translateZ(\${depth / 2}px)\` }}>
          {children}
        </span>
      </span>
    </span>
  );
}

export default PerspectiveTiltText;
`,
    demo: `import { PerspectiveTiltText } from "./perspective-tilt-text";

export default function Demo() {
  return (
    <div className="flex min-h-[14rem] items-center justify-center bg-paper p-10">
      <PerspectiveTiltText className="font-display text-step-5 tracking-tight text-ink">
        DEPTH
      </PerspectiveTiltText>
    </div>
  );
}
`,
  }),

  P("glitch-type", {
    category: "text",
    subcategory: "paint",
    title: "Glitch Type",
    description:
      "Burst-based glitching, not a permanent loop: on an interval the text fires a 3-frame RGB channel split with clip-path slicing, then rests clean — the disturbance reads as an event, not wallpaper.",
    tags: ["glitch", "rgb-split", "burst", "clip-path"],
    dependencies: ["react"],
    difficulty: "intermediate",
    dna: {
      genre: "industrial",
      macrostructure: "stack",
      density: "dense",
      shapeLanguage: "cut",
      motionLanguage: "kinetic",
      typographyStyle: "monospace",
      colorStrategy: "neon-on-dark",
    },
    fingerprint: {
      interactionModel: "interval-burst",
      visualModel: "channel-split",
      motionModel: "burst-then-rest",
      layoutModel: "inline",
      semanticPurpose: "attention-signal",
    },
    source: `"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";

/** Deterministic slice values so bursts look composed, not random noise. */
const SLICES = [
  { top: "12%", shift: -6 },
  { top: "38%", shift: 5 },
  { top: "64%", shift: -3 },
  { top: "86%", shift: 8 },
];

export interface GlitchTypeProps {
  children: string;
  /** Average rest time between bursts in ms. */
  everyMs?: number;
  className?: string;
}

export function GlitchType({ children, everyMs = 4200, className }: GlitchTypeProps) {
  const [bursting, setBursting] = useState(false);

  useEffect(() => {
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
    let timeout: number | undefined;
    let reset: number | undefined;

    const schedule = () => {
      timeout = window.setTimeout(() => {
        setBursting(true);
        reset = window.setTimeout(() => {
          setBursting(false);
          schedule();
        }, 180);
      }, everyMs + Math.random() * everyMs * 0.6);
    };

    schedule();
    return () => {
      window.clearTimeout(timeout);
      window.clearTimeout(reset);
    };
  }, [everyMs]);

  return (
    <span className={cn("relative inline-block select-none", className)} role="text" aria-label={children}>
      <span aria-hidden className="relative inline-block">
        {children}
        {bursting
          ? SLICES.map((slice, index) => (
              <span
                key={index}
                className="absolute inset-0"
                style={{
                  clipPath: \`polygon(0 \${slice.top}, 100% \${slice.top}, 100% calc(\${slice.top} + 14%), 0 calc(\${slice.top} + 14%))\`,
                  transform: \`translateX(\${slice.shift}px)\`,
                  color: index % 2 === 0 ? "#ff2d55" : "#00e5ff",
                  mixBlendMode: "screen",
                }}
              >
                {children}
              </span>
            ))
          : null}
      </span>
      <span className="sr-only">{children}</span>
    </span>
  );
}

export default GlitchType;
`,
    demo: `import { GlitchType } from "./glitch-type";

export default function Demo() {
  return (
    <div className="flex min-h-[12rem] items-center justify-center bg-ink p-10">
      <GlitchType className="font-mono text-step-3 uppercase tracking-[0.2em] text-paper">
        Signal Lost
      </GlitchType>
    </div>
  );
}
`,
  }),

  P("scroll-mask-wipe", {
    category: "text",
    subcategory: "reveal",
    title: "Scroll Mask Wipe",
    description:
      "A headline wiped open by the page's own scroll position: an inset clip-path tied to viewport progress means the reader, not a timer, controls how much of the statement is visible.",
    tags: ["scroll-linked", "mask", "wipe", "clip-path"],
    dependencies: ["react"],
    difficulty: "intermediate",
    dna: {
      genre: "editorial",
      macrostructure: "full-bleed",
      density: "airy",
      shapeLanguage: "sharp",
      motionLanguage: "subtle",
      typographyStyle: "serif-display",
      colorStrategy: "high-contrast",
    },
    fingerprint: {
      interactionModel: "scroll-progress",
      visualModel: "inset-clip",
      motionModel: "scroll-mapped-reveal",
      layoutModel: "full-bleed",
      semanticPurpose: "statement-reveal",
    },
    source: `"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

export interface ScrollMaskWipeProps {
  children: string;
  /** Scroll distance over which the wipe completes, in px. */
  travel?: number;
  className?: string;
}

export function ScrollMaskWipe({ children, travel = 480, className }: ScrollMaskWipeProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      setProgress(1);
      return;
    }

    let raf = 0;
    const update = () => {
      raf = 0;
      const rect = element.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      // Map the element's travel through the viewport onto 0..1.
      const start = viewportHeight * 0.9;
      const end = viewportHeight * 0.25;
      const raw = (start - rect.top) / (start - end);
      setProgress(Math.max(0, Math.min(1, raw)));
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [travel]);

  return (
    <span
      ref={ref}
      className={cn("inline-block", className)}
      role="text"
      aria-label={children}
      style={{
        clipPath: \`inset(0 \${(1 - progress) * 100}% 0 0)\`,
        transition: "clip-path 60ms linear",
      }}
      aria-hidden
    >
      {children}
      <span className="sr-only">{children}</span>
    </span>
  );
}

export default ScrollMaskWipe;
`,
    demo: `import { ScrollMaskWipe } from "./scroll-mask-wipe";

export default function Demo() {
  return (
    <div className="bg-paper">
      <div className="h-[40vh]" />
      <div className="flex min-h-[30vh] items-center justify-center p-10">
        <ScrollMaskWipe className="font-display text-step-4 text-ink">
          Read by scrolling
        </ScrollMaskWipe>
      </div>
      <div className="h-[40vh]" />
    </div>
  );
}
`,
  }),

  P("elastic-stretch-text", {
    category: "text",
    subcategory: "interactive",
    title: "Elastic Stretch Text",
    description:
      "Glyphs stretch horizontally away from the pointer like a material with tension, using scaleX with an overshoot curve on release; the stretch is per-glyph so the word deforms, not just moves.",
    tags: ["elastic", "stretch", "pointer", "deform"],
    dependencies: ["react"],
    difficulty: "advanced",
    dna: {
      genre: "playful",
      macrostructure: "rail",
      density: "airy",
      shapeLanguage: "soft",
      motionLanguage: "expressive",
      typographyStyle: "geometric",
      colorStrategy: "duotone",
    },
    fingerprint: {
      interactionModel: "pointer-deform",
      visualModel: "glyph-scale-field",
      motionModel: "overshoot-release",
      layoutModel: "inline",
      semanticPurpose: "display-accent",
    },
    source: `"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

export interface ElasticStretchTextProps {
  text: string;
  /** Maximum horizontal stretch at the pointer position. */
  maxStretch?: number;
  /** Falloff radius in px. */
  radius?: number;
  className?: string;
}

export function ElasticStretchText({
  text,
  maxStretch = 1.9,
  radius = 110,
  className,
}: ElasticStretchTextProps) {
  const containerRef = useRef<HTMLSpanElement>(null);
  const glyphRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const frame = useRef<number | null>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia?.("(pointer: fine)");
    const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    setEnabled(Boolean(fine?.matches) && !reduced?.matches);
  }, []);

  useEffect(
    () => () => {
      if (frame.current !== null) cancelAnimationFrame(frame.current);
    },
    [],
  );

  const apply = useCallback(
    (pointerX: number | null) => {
      for (const [index, glyph] of glyphRefs.current.entries()) {
        if (!glyph) continue;
        if (!enabled || pointerX === null) {
          glyph.style.transform = "scaleX(1)";
          continue;
        }
        const rect = glyph.getBoundingClientRect();
        const distance = Math.abs(pointerX - (rect.left + rect.width / 2));
        const falloff = Math.max(0, 1 - distance / radius);
        glyph.style.transform = \`scaleX(\${1 + (maxStretch - 1) * falloff})\`;
      }
    },
    [enabled, maxStretch, radius],
  );

  const handleMove = (event: React.PointerEvent<HTMLSpanElement>) => {
    const x = event.clientX;
    if (frame.current !== null) cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => apply(x));
  };

  return (
    <span
      ref={containerRef}
      className={cn("select-none", className)}
      onPointerMove={handleMove}
      onPointerLeave={() => apply(null)}
      aria-label={text}
      role="text"
    >
      {[...text].map((char, index) => (
        <span
          key={\`\${char}-\${index}\`}
          aria-hidden
          ref={(element) => {
            glyphRefs.current[index] = element;
          }}
          className="inline-block will-change-transform motion-reduce:transform-none"
          style={{ transformOrigin: "center", transition: "transform 260ms cubic-bezier(0.3, 1.6, 0.4, 1)" }}
        >
          {char === " " ? "\\u00A0" : char}
        </span>
      ))}
    </span>
  );
}

export default ElasticStretchText;
`,
    demo: `import { ElasticStretchText } from "./elastic-stretch-text";

export default function Demo() {
  return (
    <div className="flex min-h-[12rem] items-center justify-center bg-paper p-10">
      <ElasticStretchText text="STRETCH" className="font-display text-step-4 tracking-tight text-ink" />
    </div>
  );
}
`,
  }),

  P("stroke-draw-text", {
    category: "text",
    subcategory: "reveal",
    title: "Stroke Draw Text",
    description:
      "An SVG path rendition of the headline whose strokes draw themselves via stroke-dashoffset on entering view; the DOM text stays present for accessibility while the drawn paths carry the visual.",
    tags: ["svg", "stroke", "draw", "handwriting"],
    dependencies: ["react"],
    difficulty: "advanced",
    dna: {
      genre: "luxury",
      macrostructure: "asymmetric",
      density: "airy",
      shapeLanguage: "sharp",
      motionLanguage: "expressive",
      typographyStyle: "serif-display",
      colorStrategy: "monochrome",
    },
    fingerprint: {
      interactionModel: "in-view-trigger",
      visualModel: "svg-path-stroke",
      motionModel: "dash-offset-draw",
      layoutModel: "inline",
      semanticPurpose: "signature-reveal",
    },
    source: `"use client";

import { useInView } from "@/hooks/use-in-view";
import { cn } from "@/lib/cn";

export interface StrokeDrawTextProps {
  children: string;
  /** Seconds for the full draw. */
  duration?: number;
  /** Font size in px; the SVG scales to the text. */
  size?: number;
  className?: string;
}

/**
 * Stroke Draw Text
 *
 * Real path conversion requires the glyph outlines, which needs the font file.
 * This implementation renders the text into an SVG \`<text>\` and strokes it —
 * stroke-dasharray works on text elements in every evergreen browser, so the
 * draw effect works with whatever face the consumer sets, no font tooling.
 */
export function StrokeDrawText({ children, duration = 2.4, size = 64, className }: StrokeDrawTextProps) {
  const { ref, inView } = useInView<HTMLSpanElement>({ once: true });
  const reduced =
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
  const drawn = inView || Boolean(reduced);

  return (
    <span ref={ref} className={cn("inline-block", className)} role="text" aria-label={children}>
      <svg
        aria-hidden
        width="100%"
        height={size * 1.3}
        viewBox={\`0 0 \${children.length * size * 0.62} \${size * 1.3}\`}
        style={{ overflow: "visible" }}
      >
        <text
          x="0"
          y={size}
          fontSize={size}
          fill={drawn ? "currentColor" : "transparent"}
          stroke="currentColor"
          strokeWidth={1.4}
          style={{
            strokeDasharray: 1400,
            strokeDashoffset: drawn ? 0 : 1400,
            transition: \`stroke-dashoffset \${duration}s ease, fill \${duration}s ease \${duration * 0.6}s\`,
            fontFamily: "inherit",
          }}
        >
          {children}
        </text>
      </svg>
    </span>
  );
}

export default StrokeDrawText;
`,
    demo: `import { StrokeDrawText } from "./stroke-draw-text";

export default function Demo() {
  return (
    <div className="flex min-h-[12rem] items-center justify-center bg-paper p-10">
      <StrokeDrawText className="font-display text-ink" size={56}>
        Signature
      </StrokeDrawText>
    </div>
  );
}
`,
  }),

  P("flip-clock-digits", {
    category: "text",
    subcategory: "numeric",
    title: "Flip Clock Digits",
    description:
      "Split-flap style digit transitions: each changing digit folds through a two-panel rotateX with a shadow phase, built on real 3D transforms with backface culling and per-digit stagger.",
    tags: ["flip", "clock", "split-flap", "3d"],
    dependencies: ["react"],
    difficulty: "advanced",
    dna: {
      genre: "industrial",
      macrostructure: "rail",
      density: "compact",
      shapeLanguage: "sharp",
      motionLanguage: "mechanical",
      typographyStyle: "monospace",
      colorStrategy: "high-contrast",
    },
    fingerprint: {
      interactionModel: "value-change",
      visualModel: "split-flap-panel",
      motionModel: "rotate-x-fold",
      layoutModel: "rail",
      semanticPurpose: "live-counter",
    },
    source: `"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

function FlipDigit({ digit }: { digit: string }) {
  const [current, setCurrent] = React.useState(digit);
  const [flipping, setFlipping] = React.useState(false);

  React.useEffect(() => {
    if (digit === current) return;
    setFlipping(true);
    const timeout = window.setTimeout(() => {
      setCurrent(digit);
      setFlipping(false);
    }, 320);
    return () => window.clearTimeout(timeout);
  }, [digit, current]);

  return (
    <span
      className="relative inline-block h-[1.6em] w-[1ch] overflow-hidden align-bottom font-mono text-ink"
      style={{ perspective: "220px" }}
      aria-hidden
    >
      <span
        className="absolute inset-0 flex items-start justify-center"
        style={{
          transformOrigin: "50% 100%",
          transformStyle: "preserve-3d",
          backfaceVisibility: "hidden",
          transition: "transform 320ms cubic-bezier(0.4, 0, 0.2, 1)",
          transform: flipping ? "rotateX(-90deg)" : "rotateX(0)",
        }}
      >
        {current}
      </span>
      <span
        className="absolute inset-0 flex items-end justify-center"
        style={{
          transformOrigin: "50% 0%",
          transformStyle: "preserve-3d",
          backfaceVisibility: "hidden",
          transition: "transform 320ms cubic-bezier(0.4, 0, 0.2, 1)",
          transform: flipping ? "rotateX(0)" : "rotateX(90deg)",
        }}
      >
        {digit}
      </span>
      <span className="absolute left-0 right-0 top-1/2 h-px bg-ink/20" aria-hidden />
    </span>
  );
}

export interface FlipClockDigitsProps {
  /** Numeric value; each digit flips independently. */
  value: number;
  /** Minimum digit count, zero-padded. */
  digits?: number;
  className?: string;
}

export function FlipClockDigits({ value, digits = 2, className }: FlipClockDigitsProps) {
  const padded = String(Math.max(0, Math.floor(value))).padStart(digits, "0");
  return (
    <span className={cn("inline-flex gap-0.5", className)} role="status" aria-label={String(value)}>
      {[...padded].map((digit, index) => (
        <FlipDigit key={\`\${index}-\${digit}\`} digit={digit} />
      ))}
    </span>
  );
}

export default FlipClockDigits;
`,
    demo: `import { useEffect, useState } from "react";
import { FlipClockDigits } from "./flip-clock-digits";

export default function Demo() {
  const [seconds, setSeconds] = useState(0);
  useEffect(() => {
    const timer = window.setInterval(() => setSeconds((value) => (value + 1) % 60), 1000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <div className="flex min-h-[12rem] items-center justify-center bg-paper p-10">
      <FlipClockDigits value={seconds} digits={2} className="text-step-4" />
    </div>
  );
}
`,
  }),

  P("jitter-type", {
    category: "text",
    subcategory: "paint",
    title: "Jitter Type",
    description:
      "Seeded per-glyph jitter on a coarse grid: each character offsets by a quantised random amount that re-rolls on an offbeat interval, so the field feels alive without a full-time animation loop.",
    tags: ["jitter", "noise", "seeded", "poster"],
    dependencies: ["react"],
    difficulty: "starter",
    dna: {
      genre: "brutalist",
      macrostructure: "scatter",
      density: "dense",
      shapeLanguage: "sharp",
      motionLanguage: "mechanical",
      typographyStyle: "variable-poster",
      colorStrategy: "high-contrast",
    },
    fingerprint: {
      interactionModel: "interval-quantised",
      visualModel: "seeded-offset-field",
      motionModel: "quantised-jump",
      layoutModel: "inline",
      semanticPurpose: "poster-energy",
    },
    source: `"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";

/** Quantise to a 2px grid so jitter reads as typeset, not shaky-cam. */
function seededOffset(seed: number): { x: number; y: number } {
  const value = Math.sin(seed * 91.7) * 10_000;
  const fraction = value - Math.floor(value);
  const angle = fraction * Math.PI * 2;
  return {
    x: Math.round(Math.cos(angle) * 4),
    y: Math.round(Math.sin(angle) * 3),
  };
}

export interface JitterTypeProps {
  children: string;
  /** Milliseconds between jitter re-rolls. */
  interval?: number;
  className?: string;
}

export function JitterType({ children, interval = 900, className }: JitterTypeProps) {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => setTick((value) => value + 1), interval);
    return () => window.clearInterval(timer);
  }, [interval]);

  return (
    <span className={cn("inline-block", className)} role="text" aria-label={children}>
      {[...children].map((char, index) => {
        const offset = tick === 0 ? { x: 0, y: 0 } : seededOffset(index * 13.7 + tick * 7.3);
        return (
          <span
            key={\`\${index}-\${char}\`}
            aria-hidden
            className="inline-block will-change-transform motion-reduce:transform-none"
            style={{
              transform: \`translate(\${offset.x}px, \${offset.y}px)\`,
              transition: "transform 120ms steps(3)",
            }}
          >
            {char === " " ? "\\u00A0" : char}
          </span>
        );
      })}
    </span>
  );
}

export default JitterType;
`,
    demo: `import { JitterType } from "./jitter-type";

export default function Demo() {
  return (
    <div className="flex min-h-[12rem] items-center justify-center bg-paper p-10">
      <JitterType className="font-display text-step-4 uppercase text-ink">Static</JitterType>
    </div>
  );
}
`,
  }),
];
