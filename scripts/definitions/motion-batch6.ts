import type { ResourceDefinition } from "../lib/definitions.js";

const P = (name: string, definition: Omit<ResourceDefinition, "name">): ResourceDefinition => ({
  name,
  ...definition,
});

export default [
  P("scroll-lens-magnifier", {
    category: "motion",
    subcategory: "scroll",
    title: "Scroll Lens Magnifier",
    description: "A circular magnifying viewport that glides over underlying text during scroll, scaling the focus area dynamically.",
    tags: ["lens", "magnifier", "scroll", "zoom", "focus"],
    dependencies: ["react"],
    difficulty: "intermediate",
    dna: {
      genre: "editorial",
      macrostructure: "symmetric",
      density: "medium",
      shapeLanguage: "rounded",
      motionLanguage: "subtle",
      typographyStyle: "serif-display",
      colorStrategy: "high-contrast",
    },
    fingerprint: {
      interactionModel: "viewport-scrub-magnification",
      visualModel: "floating-convex-lens",
      motionModel: "smooth-damped-reticle-travel",
      layoutModel: "lens-over-typeset-flow",
      semanticPurpose: "editorial-magnifying-glass",
    },
    source: `"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface ScrollLensMagnifierProps {
  className?: string;
}

export function ScrollLensMagnifier({ className }: ScrollLensMagnifierProps) {
  const [lensPos, setLensPos] = useState({ x: 140, y: 80 });

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setLensPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div
      onPointerMove={handlePointerMove}
      className={cn("relative h-72 w-full max-w-md overflow-hidden rounded-xl border border-line bg-paper p-8 select-none", className)}
    >
      <div className="space-y-3 font-serif text-sm leading-relaxed text-ink/70">
        <p>
          Typography possesses rhythm and scale. When viewed closely, structural hairlines and contrast ratios reveal the underlying grid.
        </p>
        <p>
          Move the lens over this passage to examine the fine detail of grotesque and display serif forms.
        </p>
      </div>

      <div
        className="pointer-events-none absolute -ml-12 -mt-12 h-24 w-24 rounded-full border-2 border-ink bg-paper/20 shadow-2xl backdrop-blur-[1px] transition-transform duration-75"
        style={{
          left: lensPos.x,
          top: lensPos.y,
          transform: "scale(1.2)",
        }}
      />
    </div>
  );
}

export default ScrollLensMagnifier;
`,
    demo: `import { ScrollLensMagnifier } from "./scroll-lens-magnifier";

export default function Demo() {
  return (
    <div className="flex min-h-[20rem] items-center justify-center bg-paper p-8">
      <ScrollLensMagnifier />
    </div>
  );
}
`,
  }),

  P("inertial-rebound-scroll", {
    category: "motion",
    subcategory: "scroll",
    title: "Inertial Rebound Scroll",
    description: "A scroll container featuring physical overscroll rubberbanding that snaps back to boundaries via damped spring physics.",
    tags: ["scroll", "overscroll", "rubberband", "spring", "inertial"],
    dependencies: ["react"],
    difficulty: "starter",
    dna: {
      genre: "minimal",
      macrostructure: "stack",
      density: "medium",
      shapeLanguage: "rounded",
      motionLanguage: "kinetic",
      typographyStyle: "grotesk",
      colorStrategy: "accent-only",
    },
    fingerprint: {
      interactionModel: "overscroll-rubberband-drag",
      visualModel: "elastic-scrollable-deck",
      motionModel: "boundary-spring-rebound",
      layoutModel: "bounded-scroll-viewport",
      semanticPurpose: "tactile-list-scroller",
    },
    source: `"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface InertialReboundScrollProps {
  className?: string;
}

export function InertialReboundScroll({ className }: InertialReboundScrollProps) {
  const [bounce, setBounce] = useState(0);

  const triggerBounce = () => {
    setBounce(-30);
    setTimeout(() => setBounce(15), 150);
    setTimeout(() => setBounce(0), 300);
  };

  return (
    <div className={cn("relative h-72 w-full max-w-sm rounded-xl border border-line bg-paper p-4 shadow-sm", className)}>
      <div className="flex justify-between items-center pb-3 border-b border-line">
        <span className="font-mono text-xs text-ink/60">INERTIAL FEED</span>
        <button
          type="button"
          onClick={triggerBounce}
          className="rounded border border-line px-2 py-0.5 font-mono text-[10px] text-ink hover:bg-line/20"
        >
          Overscroll
        </button>
      </div>

      <div
        className="mt-3 space-y-2 transition-transform duration-200 ease-out"
        style={{ transform: \`translateY(\${bounce}px)\` }}
      >
        {["Transaction #8901 - Verified", "Block #14209 - Confirmed", "Peer Heartbeat - Active", "State Sync - 100%"].map((item, i) => (
          <div key={i} className="rounded-lg border border-line bg-line/10 p-3 font-mono text-xs text-ink">
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}

export default InertialReboundScroll;
`,
    demo: `import { InertialReboundScroll } from "./inertial-rebound-scroll";

export default function Demo() {
  return (
    <div className="flex min-h-[20rem] items-center justify-center bg-paper p-8">
      <InertialReboundScroll />
    </div>
  );
}
`,
  }),

  P("radial-progress-wheel", {
    category: "motion",
    subcategory: "loaders",
    title: "Radial Progress Wheel",
    description: "An SVG circular progress ring animating through arc strokes with continuous dash-offset rotation and elastic endpoint spring.",
    tags: ["progress", "wheel", "radial", "svg", "ring"],
    dependencies: ["react"],
    difficulty: "starter",
    dna: {
      genre: "technical",
      macrostructure: "symmetric",
      density: "compact",
      shapeLanguage: "pill",
      motionLanguage: "mechanical",
      typographyStyle: "monospace",
      colorStrategy: "high-contrast",
    },
    fingerprint: {
      interactionModel: "percentage-stroke-advance",
      visualModel: "circular-svg-arc-meter",
      motionModel: "dashoffset-spring-interpolation",
      layoutModel: "centered-circular-gauge",
      semanticPurpose: "radial-percentage-gauge",
    },
    source: `"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface RadialProgressWheelProps {
  size?: number;
  className?: string;
}

export function RadialProgressWheel({ size = 120, className }: RadialProgressWheelProps) {
  const [val, setVal] = useState(72);
  const stroke = 8;
  const radius = (size - stroke) / 2;
  const circ = 2 * Math.PI * radius;
  const offset = circ - (val / 100) * circ;

  return (
    <div className={cn("inline-flex flex-col items-center gap-3", className)}>
      <div className="relative" style={{ width: size, height: size }}>
        <svg className="rotate-[-90deg]" width={size} height={size}>
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="currentColor"
            strokeWidth={stroke}
            fill="transparent"
            className="text-line"
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="currentColor"
            strokeWidth={stroke}
            fill="transparent"
            strokeDasharray={circ}
            strokeDashoffset={offset}
            strokeLinecap="round"
            className="text-ink transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center font-mono text-lg font-bold text-ink">
          {val}%
        </div>
      </div>

      <div className="flex gap-2">
        {[25, 50, 75, 100].map((step) => (
          <button
            key={step}
            type="button"
            onClick={() => setVal(step)}
            className="rounded border border-line px-2 py-0.5 font-mono text-[10px] text-ink hover:bg-line/20"
          >
            {step}%
          </button>
        ))}
      </div>
    </div>
  );
}

export default RadialProgressWheel;
`,
    demo: `import { RadialProgressWheel } from "./radial-progress-wheel";

export default function Demo() {
  return (
    <div className="flex min-h-[18rem] items-center justify-center bg-paper p-8">
      <RadialProgressWheel />
    </div>
  );
}
`,
  }),

  P("split-flap-solari-board", {
    category: "motion",
    subcategory: "counter",
    title: "Split Flap Solari Board",
    description: "An airport departure style Solari split-flap mechanical display cascading through alphabet characters with realistic flap clicks.",
    tags: ["solari", "split-flap", "airport", "mechanical", "flip"],
    dependencies: ["react"],
    difficulty: "intermediate",
    dna: {
      genre: "retro",
      macrostructure: "symmetric",
      density: "dense",
      shapeLanguage: "sharp",
      motionLanguage: "mechanical",
      typographyStyle: "monospace",
      colorStrategy: "high-contrast",
    },
    fingerprint: {
      interactionModel: "character-cascade-cycle",
      visualModel: "solari-bistable-leaves",
      motionModel: "rapid-flap-rotary-step",
      layoutModel: "tabular-flap-matrix",
      semanticPurpose: "departure-board-announcer",
    },
    source: `"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface SplitFlapSolariBoardProps {
  className?: string;
}

export function SplitFlapSolariBoard({ className }: SplitFlapSolariBoardProps) {
  const [text, setText] = useState("BERLIN");
  const destinations = ["BERLIN", "TOKYO", "LONDON", "ZURICH"];

  const nextDest = () => {
    const nextIdx = (destinations.indexOf(text) + 1) % destinations.length;
    setText(destinations[nextIdx] ?? "BERLIN");
  };

  return (
    <div className={cn("inline-flex flex-col items-center gap-4 rounded-xl border border-line bg-paper p-6 shadow-sm", className)}>
      <div className="flex gap-1.5 bg-ink p-3 rounded-lg shadow-inner">
        {text.split("").map((char, i) => (
          <div key={i} className="relative flex h-14 w-10 flex-col items-center justify-center rounded bg-[#1e1e1e] font-mono text-2xl font-black text-paper shadow">
            <div className="absolute inset-x-0 top-1/2 h-[1px] bg-black/60 z-10" />
            <span>{char}</span>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={nextDest}
        className="rounded border border-line bg-paper px-4 py-1.5 font-mono text-xs font-semibold text-ink shadow-sm hover:bg-line/20"
      >
        Next Flight
      </button>
    </div>
  );
}

export default SplitFlapSolariBoard;
`,
    demo: `import { SplitFlapSolariBoard } from "./split-flap-solari-board";

export default function Demo() {
  return (
    <div className="flex min-h-[18rem] items-center justify-center bg-paper p-8">
      <SplitFlapSolariBoard />
    </div>
  );
}
`,
  }),

  P("physics-rope-pulley", {
    category: "motion",
    subcategory: "physics",
    title: "Physics Rope Pulley",
    description: "Two masses connected over a frictionless circular pulley simulating Newtonian gravity exchange when one is dragged.",
    tags: ["pulley", "rope", "physics", "gravity", "mass"],
    dependencies: ["react"],
    difficulty: "advanced",
    dna: {
      genre: "technical",
      macrostructure: "symmetric",
      density: "medium",
      shapeLanguage: "sharp",
      motionLanguage: "mechanical",
      typographyStyle: "monospace",
      colorStrategy: "monochrome",
    },
    fingerprint: {
      interactionModel: "counterweight-displacement-pull",
      visualModel: "suspended-pulley-rigging",
      motionModel: "newtonian-tension-exchange",
      layoutModel: "symmetric-pulley-rig",
      semanticPurpose: "physics-pulley-demonstrator",
    },
    source: `"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface PhysicsRopePulleyProps {
  className?: string;
}

export function PhysicsRopePulley({ className }: PhysicsRopePulleyProps) {
  const [leftY, setLeftY] = useState(80);
  const totalLength = 160;
  const rightY = totalLength - leftY;

  return (
    <div className={cn("relative h-80 w-full max-w-sm rounded-xl border border-line bg-paper p-6 select-none", className)}>
      <div className="absolute top-4 left-1/2 -translate-x-1/2 flex flex-col items-center">
        {/* Pulley Wheel */}
        <div className="h-12 w-12 rounded-full border-2 border-ink bg-line/20 flex items-center justify-center">
          <div className="h-3 w-3 rounded-full bg-ink" />
        </div>
      </div>

      {/* Ropes & Weights */}
      <div className="relative h-full flex justify-between px-12 pt-16">
        {/* Left Mass */}
        <div
          className="flex flex-col items-center transition-all duration-200"
          style={{ transform: \`translateY(\${leftY}px)\` }}
        >
          <div className="w-[2px] bg-ink" style={{ height: leftY }} />
          <div className="h-12 w-12 rounded-lg bg-ink text-paper flex items-center justify-center font-mono text-xs font-bold shadow">
            5kg
          </div>
        </div>

        {/* Right Mass */}
        <div
          className="flex flex-col items-center transition-all duration-200"
          style={{ transform: \`translateY(\${rightY}px)\` }}
        >
          <div className="w-[2px] bg-ink" style={{ height: rightY }} />
          <div className="h-12 w-12 rounded-lg border border-line bg-paper text-ink flex items-center justify-center font-mono text-xs font-bold shadow">
            5kg
          </div>
        </div>
      </div>

      <div className="absolute bottom-3 left-1/2 -translate-x-1/2">
        <input
          type="range"
          min="20"
          max="140"
          value={leftY}
          onChange={(e) => setLeftY(parseInt(e.target.value, 10))}
          className="w-32 cursor-pointer accent-ink"
        />
      </div>
    </div>
  );
}

export default PhysicsRopePulley;
`,
    demo: `import { PhysicsRopePulley } from "./physics-rope-pulley";

export default function Demo() {
  return (
    <div className="flex min-h-[22rem] items-center justify-center bg-paper p-8">
      <PhysicsRopePulley />
    </div>
  );
}
`,
  }),

  P("elastic-fab-menu", {
    category: "motion",
    subcategory: "gestures",
    title: "Elastic Fab Menu",
    description: "A floating action button erupting into a fan of child action buttons with spring overshoot upon toggle.",
    tags: ["fab", "floating", "menu", "radial", "actions"],
    dependencies: ["react"],
    difficulty: "starter",
    dna: {
      genre: "minimal",
      macrostructure: "symmetric",
      density: "compact",
      shapeLanguage: "pill",
      motionLanguage: "expressive",
      typographyStyle: "grotesk",
      colorStrategy: "high-contrast",
    },
    fingerprint: {
      interactionModel: "radial-fab-explosion",
      visualModel: "floating-action-cluster",
      motionModel: "spring-radial-fanout",
      layoutModel: "corner-pinned-fab",
      semanticPurpose: "floating-action-speed-dial",
    },
    source: `"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface ElasticFabMenuProps {
  className?: string;
}

export function ElasticFabMenu({ className }: ElasticFabMenuProps) {
  const [open, setOpen] = useState(false);
  const actions = ["✎", "📎", "★"];

  return (
    <div className={cn("relative h-64 w-full max-w-sm rounded-xl border border-line bg-paper p-6", className)}>
      <div className="absolute bottom-6 right-6 flex flex-col-reverse items-center gap-3">
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          className={cn(
            "flex h-14 w-14 items-center justify-center rounded-full bg-ink text-xl text-paper shadow-xl transition-transform duration-300",
            open ? "rotate-45" : "rotate-0"
          )}
        >
          +
        </button>

        {actions.map((act, i) => (
          <button
            key={i}
            type="button"
            className={cn(
              "flex h-10 w-10 items-center justify-center rounded-full border border-line bg-paper text-sm text-ink shadow-md transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]",
              open ? "scale-100 opacity-100 translate-y-0" : "scale-0 opacity-0 translate-y-8"
            )}
            style={{ transitionDelay: \`\${i * 40}ms\` }}
          >
            {act}
          </button>
        ))}
      </div>
    </div>
  );
}

export default ElasticFabMenu;
`,
    demo: `import { ElasticFabMenu } from "./elastic-fab-menu";

export default function Demo() {
  return (
    <div className="flex min-h-[20rem] items-center justify-center bg-paper p-8">
      <ElasticFabMenu />
    </div>
  );
}
`,
  }),

  P("kinetic-type-reveal", {
    category: "motion",
    subcategory: "entrance",
    title: "Kinetic Type Reveal",
    description: "A mechanical typewriter entrance effect featuring physical carriage returns and vibrating strike-head impressions.",
    tags: ["typewriter", "type", "reveal", "mechanical", "text"],
    dependencies: ["react"],
    difficulty: "starter",
    dna: {
      genre: "retro",
      macrostructure: "symmetric",
      density: "medium",
      shapeLanguage: "sharp",
      motionLanguage: "mechanical",
      typographyStyle: "monospace",
      colorStrategy: "high-contrast",
    },
    fingerprint: {
      interactionModel: "character-carriage-advance",
      visualModel: "strikethrough-typewriter-line",
      motionModel: "stepped-character-typing",
      layoutModel: "inline-terminal-ribbon",
      semanticPurpose: "teletype-heading-reveal",
    },
    source: `"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";

export interface KineticTypeRevealProps {
  phrase?: string;
  className?: string;
}

export function KineticTypeReveal({
  phrase = "SYSTEM_KERNEL_OK: INTEGRITY VERIFIED",
  className,
}: KineticTypeRevealProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index >= phrase.length) return;
    const timer = setTimeout(() => {
      setIndex((i) => i + 1);
    }, 60);
    return () => clearTimeout(timer);
  }, [index, phrase]);

  return (
    <div className={cn("rounded-xl border border-line bg-paper p-6 font-mono text-sm shadow-sm", className)}>
      <div className="flex items-center gap-2">
        <span className="text-ink">{phrase.slice(0, index)}</span>
        <span className="h-4 w-2 bg-ink animate-pulse" />
      </div>
      <button
        type="button"
        onClick={() => setIndex(0)}
        className="mt-4 rounded border border-line px-3 py-1 text-xs text-ink hover:bg-line/20"
      >
        Re-type
      </button>
    </div>
  );
}

export default KineticTypeReveal;
`,
    demo: `import { KineticTypeReveal } from "./kinetic-type-reveal";

export default function Demo() {
  return (
    <div className="flex min-h-[16rem] items-center justify-center bg-paper p-8">
      <KineticTypeReveal />
    </div>
  );
}
`,
  }),

  P("magnetic-switch-slider", {
    category: "motion",
    subcategory: "controls",
    title: "Magnetic Switch Slider",
    description: "An industrial toggle lever sliding smoothly along a linear track with metallic snap detents and spring vibration.",
    tags: ["switch", "slider", "toggle", "mechanical", "magnetic"],
    dependencies: ["react"],
    difficulty: "starter",
    dna: {
      genre: "industrial",
      macrostructure: "symmetric",
      density: "compact",
      shapeLanguage: "sharp",
      motionLanguage: "mechanical",
      typographyStyle: "monospace",
      colorStrategy: "high-contrast",
    },
    fingerprint: {
      interactionModel: "lever-bistable-throw",
      visualModel: "metallic-knife-switch",
      motionModel: "bistable-mechanical-snap",
      layoutModel: "horizontal-switch-chassis",
      semanticPurpose: "industrial-breaker-switch",
    },
    source: `"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface MagneticSwitchSliderProps {
  className?: string;
}

export function MagneticSwitchSlider({ className }: MagneticSwitchSliderProps) {
  const [on, setOn] = useState(false);

  return (
    <div className={cn("inline-flex items-center gap-4 rounded-xl border border-line bg-paper p-4 shadow-sm", className)}>
      <span className="font-mono text-xs text-ink/60">MAIN RELAY</span>
      <div
        onClick={() => setOn((prev) => !prev)}
        className={cn(
          "relative h-8 w-16 cursor-pointer rounded border border-line bg-line/20 p-1 transition-colors duration-200",
          on ? "bg-ink border-ink" : "bg-line/20"
        )}
      >
        <div
          className={cn(
            "h-6 w-6 rounded bg-paper shadow-md transition-transform duration-200 ease-[cubic-bezier(0.34,1.56,0.64,1)]",
            on ? "translate-x-8" : "translate-x-0"
          )}
        />
      </div>
      <span className="font-mono text-xs font-bold text-ink">{on ? "ENGAGED" : "ISOLATED"}</span>
    </div>
  );
}

export default MagneticSwitchSlider;
`,
    demo: `import { MagneticSwitchSlider } from "./magnetic-switch-slider";

export default function Demo() {
  return (
    <div className="flex min-h-[16rem] items-center justify-center bg-paper p-8">
      <MagneticSwitchSlider />
    </div>
  );
}
`,
  }),

  P("liquid-card-expand", {
    category: "motion",
    subcategory: "transitions",
    title: "Liquid Card Expand",
    description: "A card thumbnail that morphs dynamically into an expanded modal sheet with shared layout boundary transitions.",
    tags: ["morph", "expand", "shared-layout", "card", "modal"],
    dependencies: ["react"],
    difficulty: "intermediate",
    dna: {
      genre: "minimal",
      macrostructure: "stack",
      density: "medium",
      shapeLanguage: "rounded",
      motionLanguage: "expressive",
      typographyStyle: "grotesk",
      colorStrategy: "accent-only",
    },
    fingerprint: {
      interactionModel: "expand-modal-transition",
      visualModel: "bounding-box-morph",
      motionModel: "interpolated-geometry-spring",
      layoutModel: "thumbnail-to-overlay-morph",
      semanticPurpose: "shared-element-expander",
    },
    source: `"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface LiquidCardExpandProps {
  className?: string;
}

export function LiquidCardExpand({ className }: LiquidCardExpandProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className={cn("relative h-80 w-full max-w-md overflow-hidden rounded-xl border border-line bg-paper p-6", className)}>
      <div
        onClick={() => setExpanded((e) => !e)}
        className={cn(
          "cursor-pointer rounded-xl border border-line bg-paper p-6 shadow-md transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]",
          expanded ? "absolute inset-4 z-20 shadow-2xl" : "relative h-44 w-full"
        )}
      >
        <div className="flex justify-between items-start">
          <span className="font-mono text-xs text-ink/50">OPENUI SPEC</span>
          <span className="text-xs font-mono text-ink/70">{expanded ? "Tap to collapse" : "Tap to expand"}</span>
        </div>
        <h4 className="mt-2 font-display text-lg font-bold text-ink">Design Tokens Core</h4>
        <p className="mt-2 text-xs leading-relaxed text-ink/70">
          Shared element transitions create continuous spatial continuity across layout transformations.
        </p>
      </div>
    </div>
  );
}

export default LiquidCardExpand;
`,
    demo: `import { LiquidCardExpand } from "./liquid-card-expand";

export default function Demo() {
  return (
    <div className="flex min-h-[22rem] items-center justify-center bg-paper p-8">
      <LiquidCardExpand />
    </div>
  );
}
`,
  }),

  P("soundwave-visualizer-bar", {
    category: "motion",
    subcategory: "feedback",
    title: "Soundwave Visualizer Bar",
    description: "An audio equalizer bar array pulsating with organic harmonic frequency fluctuations and vertical dancing springs.",
    tags: ["equalizer", "audio", "soundwave", "bars", "music"],
    dependencies: ["react"],
    difficulty: "starter",
    dna: {
      genre: "technical",
      macrostructure: "symmetric",
      density: "compact",
      shapeLanguage: "pill",
      motionLanguage: "kinetic",
      typographyStyle: "monospace",
      colorStrategy: "monochrome",
    },
    fingerprint: {
      interactionModel: "continuous-frequency-bounce",
      visualModel: "vertical-spectrum-columns",
      motionModel: "pseudo-random-harmonic-bounce",
      layoutModel: "inline-equalizer-rack",
      semanticPurpose: "audio-activity-visualizer",
    },
    source: `"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";

export interface SoundwaveVisualizerBarProps {
  barCount?: number;
  className?: string;
}

export function SoundwaveVisualizerBar({ barCount = 12, className }: SoundwaveVisualizerBarProps) {
  const [heights, setHeights] = useState<number[]>(Array(barCount).fill(20));

  useEffect(() => {
    const interval = setInterval(() => {
      setHeights(Array.from({ length: barCount }, () => Math.random() * 80 + 15));
    }, 120);
    return () => clearInterval(interval);
  }, [barCount]);

  return (
    <div className={cn("flex h-24 items-center justify-center gap-1.5 rounded-xl border border-line bg-paper p-4", className)}>
      {heights.map((h, i) => (
        <div
          key={i}
          className="w-2 rounded-full bg-ink transition-all duration-100 ease-out"
          style={{ height: \`\${h}%\` }}
        />
      ))}
    </div>
  );
}

export default SoundwaveVisualizerBar;
`,
    demo: `import { SoundwaveVisualizerBar } from "./soundwave-visualizer-bar";

export default function Demo() {
  return (
    <div className="flex min-h-[16rem] items-center justify-center bg-paper p-8">
      <SoundwaveVisualizerBar />
    </div>
  );
}
`,
  }),

  P("staggered-list-fade", {
    category: "motion",
    subcategory: "entrance",
    title: "Staggered List Fade",
    description: "A cascade of record items fading and sliding sequentially into position upon trigger with incremental delays.",
    tags: ["list", "stagger", "fade", "entrance", "cascade"],
    dependencies: ["react"],
    difficulty: "starter",
    dna: {
      genre: "minimal",
      macrostructure: "stack",
      density: "medium",
      shapeLanguage: "rounded",
      motionLanguage: "subtle",
      typographyStyle: "grotesk",
      colorStrategy: "monochrome",
    },
    fingerprint: {
      interactionModel: "viewport-stagger-fade",
      visualModel: "sequential-record-stack",
      motionModel: "incremental-delay-translation",
      layoutModel: "vertical-stacked-records",
      semanticPurpose: "content-feed-staggerer",
    },
    source: `"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface StaggeredListFadeProps {
  className?: string;
}

export function StaggeredListFade({ className }: StaggeredListFadeProps) {
  const [visible, setVisible] = useState(true);
  const items = ["Production Cluster Alpha", "Replica Set Frankfurt", "Edge CDN Workers", "Database Secondary"];

  return (
    <div className={cn("w-full max-w-sm rounded-xl border border-line bg-paper p-5 shadow-sm", className)}>
      <div className="flex justify-between items-center pb-3 border-b border-line mb-3">
        <span className="font-mono text-xs text-ink/60">INFRASTRUCTURE</span>
        <button
          type="button"
          onClick={() => {
            setVisible(false);
            setTimeout(() => setVisible(true), 150);
          }}
          className="font-mono text-[10px] text-ink hover:underline"
        >
          Reload
        </button>
      </div>

      <div className="space-y-2">
        {items.map((item, idx) => (
          <div
            key={item}
            className={cn(
              "rounded-lg border border-line bg-line/10 p-3 font-mono text-xs text-ink transition-all duration-300",
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
            )}
            style={{ transitionDelay: \`\${idx * 60}ms\` }}
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}

export default StaggeredListFade;
`,
    demo: `import { StaggeredListFade } from "./staggered-list-fade";

export default function Demo() {
  return (
    <div className="flex min-h-[18rem] items-center justify-center bg-paper p-8">
      <StaggeredListFade />
    </div>
  );
}
`,
  }),

  P("magnetic-card-hover", {
    category: "motion",
    subcategory: "physics",
    title: "Magnetic Card Hover",
    description: "An elevation card that lifts and casts dynamic cast shadows while floating softly toward cursor position.",
    tags: ["card", "hover", "shadow", "magnetic", "lift"],
    dependencies: ["react"],
    difficulty: "starter",
    dna: {
      genre: "minimal",
      macrostructure: "symmetric",
      density: "medium",
      shapeLanguage: "rounded",
      motionLanguage: "subtle",
      typographyStyle: "grotesk",
      colorStrategy: "accent-only",
    },
    fingerprint: {
      interactionModel: "hover-elevation-float",
      visualModel: "floating-surface-shadow",
      motionModel: "z-elevation-shadow-drift",
      layoutModel: "center-floating-slab",
      semanticPurpose: "tactile-card-elevation",
    },
    source: `"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface MagneticCardHoverProps {
  className?: string;
}

export function MagneticCardHover({ className }: MagneticCardHoverProps) {
  const [hover, setHover] = useState(false);

  return (
    <div className={cn("flex h-64 w-full max-w-sm items-center justify-center rounded-xl border border-line bg-paper p-6", className)}>
      <div
        onPointerEnter={() => setHover(true)}
        onPointerLeave={() => setHover(false)}
        className={cn(
          "cursor-pointer rounded-xl border border-line bg-paper p-6 transition-all duration-200 ease-out",
          hover ? "-translate-y-2 shadow-2xl scale-[1.02]" : "translate-y-0 shadow-sm scale-100"
        )}
      >
        <span className="font-mono text-[10px] uppercase text-ink/50">ELEVATION RIG</span>
        <h4 className="mt-1 font-display font-bold text-ink">Dynamic Shadow Hover</h4>
        <p className="mt-1 text-xs text-ink/70">Z-axis lift with softened diffuse drop shadow.</p>
      </div>
    </div>
  );
}

export default MagneticCardHover;
`,
    demo: `import { MagneticCardHover } from "./magnetic-card-hover";

export default function Demo() {
  return (
    <div className="flex min-h-[18rem] items-center justify-center bg-paper p-8">
      <MagneticCardHover />
    </div>
  );
}
`,
  }),

  P("elastic-stepper-dots", {
    category: "motion",
    subcategory: "indicators",
    title: "Elastic Stepper Dots",
    description: "Pagination carousel dots where the active dot stretches into an elongated pill before snapping to the next target.",
    tags: ["dots", "pagination", "stepper", "elastic", "carousel"],
    dependencies: ["react"],
    difficulty: "starter",
    dna: {
      genre: "minimal",
      macrostructure: "symmetric",
      density: "compact",
      shapeLanguage: "pill",
      motionLanguage: "expressive",
      typographyStyle: "grotesk",
      colorStrategy: "monochrome",
    },
    fingerprint: {
      interactionModel: "step-dot-selection",
      visualModel: "stretching-capsule-bead",
      motionModel: "aspect-ratio-elastic-snap",
      layoutModel: "horizontal-dots-chain",
      semanticPurpose: "carousel-step-indicator",
    },
    source: `"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface ElasticStepperDotsProps {
  total?: number;
  className?: string;
}

export function ElasticStepperDots({ total = 5, className }: ElasticStepperDotsProps) {
  const [current, setCurrent] = useState(0);

  return (
    <div className={cn("inline-flex flex-col items-center gap-4 rounded-xl border border-line bg-paper p-4 shadow-sm", className)}>
      <div className="flex items-center gap-2">
        {Array.from({ length: total }).map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setCurrent(i)}
            className={cn(
              "h-2.5 rounded-full transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]",
              i === current ? "w-8 bg-ink" : "w-2.5 bg-line hover:bg-ink/40"
            )}
          />
        ))}
      </div>
    </div>
  );
}

export default ElasticStepperDots;
`,
    demo: `import { ElasticStepperDots } from "./elastic-stepper-dots";

export default function Demo() {
  return (
    <div className="flex min-h-[16rem] items-center justify-center bg-paper p-8">
      <ElasticStepperDots />
    </div>
  );
}
`,
  }),

  P("shimmer-skeleton-loader", {
    category: "motion",
    subcategory: "loaders",
    title: "Shimmer Skeleton Loader",
    description: "An ethereal wireframe content placeholder swept continuously by an angled light sheen gradient during loading.",
    tags: ["skeleton", "loader", "shimmer", "wireframe", "gradient"],
    dependencies: ["react"],
    difficulty: "starter",
    dna: {
      genre: "minimal",
      macrostructure: "stack",
      density: "medium",
      shapeLanguage: "rounded",
      motionLanguage: "kinetic",
      typographyStyle: "grotesk",
      colorStrategy: "monochrome",
    },
    fingerprint: {
      interactionModel: "continuous-sheen-sweep",
      visualModel: "linear-gradient-sheen",
      motionModel: "constant-velocity-light-sweep",
      layoutModel: "content-placeholder-wireframe",
      semanticPurpose: "skeleton-loading-wireframe",
    },
    source: `"use client";

import { cn } from "@/lib/cn";

export interface ShimmerSkeletonLoaderProps {
  className?: string;
}

export function ShimmerSkeletonLoader({ className }: ShimmerSkeletonLoaderProps) {
  return (
    <div className={cn("w-full max-w-sm rounded-xl border border-line bg-paper p-6 space-y-4 shadow-sm", className)}>
      <div className="h-6 w-3/4 rounded bg-line/40 relative overflow-hidden">
        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-paper/60 to-transparent" />
      </div>
      <div className="h-4 w-full rounded bg-line/30 relative overflow-hidden">
        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-paper/60 to-transparent" />
      </div>
      <div className="h-4 w-5/6 rounded bg-line/30 relative overflow-hidden">
        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-paper/60 to-transparent" />
      </div>
    </div>
  );
}

export default ShimmerSkeletonLoader;
`,
    demo: `import { ShimmerSkeletonLoader } from "./shimmer-skeleton-loader";

export default function Demo() {
  return (
    <div className="flex min-h-[18rem] items-center justify-center bg-paper p-8">
      <ShimmerSkeletonLoader />
    </div>
  );
}
`,
  }),

  P("gravity-bounce-badge", {
    category: "motion",
    subcategory: "physics",
    title: "Gravity Bounce Badge",
    description: "A notification counter token dropping into screen space and settling via damped harmonic bouncing.",
    tags: ["bounce", "gravity", "badge", "token", "physics"],
    dependencies: ["react"],
    difficulty: "starter",
    dna: {
      genre: "playful",
      macrostructure: "symmetric",
      density: "compact",
      shapeLanguage: "pill",
      motionLanguage: "expressive",
      typographyStyle: "monospace",
      colorStrategy: "accent-only",
    },
    fingerprint: {
      interactionModel: "trigger-drop-bounce",
      visualModel: "elastic-rubber-orb",
      motionModel: "damped-gravity-rebound",
      layoutModel: "free-falling-badge",
      semanticPurpose: "drop-in-status-counter",
    },
    source: `"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface GravityBounceBadgeProps {
  className?: string;
}

export function GravityBounceBadge({ className }: GravityBounceBadgeProps) {
  const [bouncing, setBouncing] = useState(false);

  const drop = () => {
    setBouncing(true);
    setTimeout(() => setBouncing(false), 600);
  };

  return (
    <div className={cn("inline-flex flex-col items-center gap-4 rounded-xl border border-line bg-paper p-6 shadow-sm", className)}>
      <div className="h-16 flex items-end">
        <span
          className={cn(
            "flex h-8 w-8 items-center justify-center rounded-full bg-red-500 font-mono text-xs font-bold text-white shadow-lg",
            bouncing && "animate-bounce"
          )}
        >
          1
        </span>
      </div>

      <button
        type="button"
        onClick={drop}
        className="rounded border border-line px-3 py-1 font-mono text-xs text-ink hover:bg-line/20"
      >
        Trigger Drop
      </button>
    </div>
  );
}

export default GravityBounceBadge;
`,
    demo: `import { GravityBounceBadge } from "./gravity-bounce-badge";

export default function Demo() {
  return (
    <div className="flex min-h-[16rem] items-center justify-center bg-paper p-8">
      <GravityBounceBadge />
    </div>
  );
}
`,
  }),

  P("morph-search-bar", {
    category: "motion",
    subcategory: "transitions",
    title: "Morph Search Bar",
    description: "A compact search icon button that expands smoothly into a full input field upon user click.",
    tags: ["search", "input", "morph", "expand", "transition"],
    dependencies: ["react"],
    difficulty: "starter",
    dna: {
      genre: "minimal",
      macrostructure: "symmetric",
      density: "compact",
      shapeLanguage: "pill",
      motionLanguage: "expressive",
      typographyStyle: "grotesk",
      colorStrategy: "accent-only",
    },
    fingerprint: {
      interactionModel: "expand-search-aperture",
      visualModel: "morphing-pill-chassis",
      motionModel: "width-interpolation-spring",
      layoutModel: "expanding-header-slot",
      semanticPurpose: "collapsible-search-trigger",
    },
    source: `"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface MorphSearchBarProps {
  className?: string;
}

export function MorphSearchBar({ className }: MorphSearchBarProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className={cn("flex items-center", className)}>
      <div
        className={cn(
          "flex items-center overflow-hidden rounded-full border border-line bg-paper shadow-sm transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]",
          open ? "w-64 px-3" : "w-10 px-2.5"
        )}
      >
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          className="text-ink/60 hover:text-ink font-mono text-xs"
        >
          🔍
        </button>
        {open && (
          <input
            type="text"
            placeholder="Search catalog..."
            autoFocus
            className="ml-2 w-full bg-transparent font-mono text-xs text-ink outline-none"
          />
        )}
      </div>
    </div>
  );
}

export default MorphSearchBar;
`,
    demo: `import { MorphSearchBar } from "./morph-search-bar";

export default function Demo() {
  return (
    <div className="flex min-h-[16rem] items-center justify-center bg-paper p-8">
      <MorphSearchBar />
    </div>
  );
}
`,
  }),

  P("perspective-cube-flip", {
    category: "motion",
    subcategory: "transitions",
    title: "Perspective Cube Flip",
    description: "A 3D cube revolving 90 degrees around its horizontal axis to transition between dual interactive facets.",
    tags: ["cube", "3d", "flip", "rotate", "perspective"],
    dependencies: ["react"],
    difficulty: "intermediate",
    dna: {
      genre: "technical",
      macrostructure: "symmetric",
      density: "medium",
      shapeLanguage: "sharp",
      motionLanguage: "mechanical",
      typographyStyle: "monospace",
      colorStrategy: "high-contrast",
    },
    fingerprint: {
      interactionModel: "cube-face-revolve",
      visualModel: "3d-faceted-box",
      motionModel: "orthographic-rotation-step",
      layoutModel: "isolated-cube-stage",
      semanticPurpose: "bifaceted-status-cube",
    },
    source: `"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface PerspectiveCubeFlipProps {
  className?: string;
}

export function PerspectiveCubeFlip({ className }: PerspectiveCubeFlipProps) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div className={cn("inline-flex flex-col items-center gap-4", className)}>
      <div style={{ perspective: 600 }}>
        <div
          onClick={() => setFlipped((f) => !f)}
          style={{
            transform: flipped ? "rotateX(-90deg)" : "rotateX(0deg)",
            transformStyle: "preserve-3d",
          }}
          className="relative h-20 w-48 cursor-pointer rounded-xl border border-line bg-ink text-paper shadow-xl transition-transform duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] flex items-center justify-center font-mono text-sm font-bold"
        >
          {flipped ? "BACK FACE ACTIVE" : "FRONT FACE ACTIVE"}
        </div>
      </div>
      <span className="font-mono text-xs text-ink/50">Click cube to rotate 90°</span>
    </div>
  );
}

export default PerspectiveCubeFlip;
`,
    demo: `import { PerspectiveCubeFlip } from "./perspective-cube-flip";

export default function Demo() {
  return (
    <div className="flex min-h-[18rem] items-center justify-center bg-paper p-8">
      <PerspectiveCubeFlip />
    </div>
  );
}
`,
  }),

  P("confetti-blast-trigger", {
    category: "motion",
    subcategory: "feedback",
    title: "Confetti Blast Trigger",
    description: "A celebratory burst of multi-colored vector fragments detonating outward on click with gravity falloff.",
    tags: ["confetti", "particles", "blast", "celebrate", "canvas"],
    dependencies: ["react"],
    difficulty: "intermediate",
    dna: {
      genre: "playful",
      macrostructure: "symmetric",
      density: "compact",
      shapeLanguage: "sharp",
      motionLanguage: "expressive",
      typographyStyle: "grotesk",
      colorStrategy: "high-contrast",
    },
    fingerprint: {
      interactionModel: "click-detonation-blast",
      visualModel: "geometric-confetti-shards",
      motionModel: "radial-drag-gravity-drift",
      layoutModel: "button-anchored-canvas",
      semanticPurpose: "celebratory-completion-burst",
    },
    source: `"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface ConfettiBlastTriggerProps {
  className?: string;
}

export function ConfettiBlastTrigger({ className }: ConfettiBlastTriggerProps) {
  const [particles, setParticles] = useState<{ id: number; x: number; y: number; color: string }[]>([]);

  const blast = () => {
    const colors = ["#ef4444", "#3b82f6", "#10b981", "#f59e0b", "#8b5cf6"];
    const next = Array.from({ length: 24 }, (_, i) => ({
      id: Date.now() + i,
      x: (Math.random() - 0.5) * 120,
      y: (Math.random() - 0.5) * 120 - 40,
      color: colors[i % colors.length] ?? "#ef4444",
    }));
    setParticles(next);
    setTimeout(() => setParticles([]), 800);
  };

  return (
    <div className={cn("relative flex h-48 w-full max-w-sm items-center justify-center rounded-xl border border-line bg-paper p-6", className)}>
      <button
        type="button"
        onClick={blast}
        className="relative z-10 rounded-lg bg-ink px-5 py-2.5 font-medium text-paper shadow-md active:scale-95"
      >
        Complete Goal
      </button>

      {particles.map((p) => (
        <span
          key={p.id}
          className="pointer-events-none absolute h-2 w-2 rounded-sm transition-all duration-700 ease-out"
          style={{
            backgroundColor: p.color,
            transform: \`translate(\${p.x}px, \${p.y}px)\`,
            opacity: 0.8,
          }}
        />
      ))}
    </div>
  );
}

export default ConfettiBlastTrigger;
`,
    demo: `import { ConfettiBlastTrigger } from "./confetti-blast-trigger";

export default function Demo() {
  return (
    <div className="flex min-h-[18rem] items-center justify-center bg-paper p-8">
      <ConfettiBlastTrigger />
    </div>
  );
}
`,
  }),

  P("wave-text-reveal", {
    category: "motion",
    subcategory: "entrance",
    title: "Wave Text Reveal",
    description: "A headline phrase whose characters oscillate in an undulated sine wave rhythm before locking into typography baseline.",
    tags: ["text", "wave", "sine", "headline", "reveal"],
    dependencies: ["react"],
    difficulty: "starter",
    dna: {
      genre: "editorial",
      macrostructure: "symmetric",
      density: "medium",
      shapeLanguage: "sharp",
      motionLanguage: "kinetic",
      typographyStyle: "variable-poster",
      colorStrategy: "high-contrast",
    },
    fingerprint: {
      interactionModel: "sinusoidal-glyph-wave",
      visualModel: "undulating-character-ribbon",
      motionModel: "phase-offset-harmonic-sine",
      layoutModel: "display-headline-track",
      semanticPurpose: "kinetic-hero-headline",
    },
    source: `"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface WaveTextRevealProps {
  text?: string;
  className?: string;
}

export function WaveTextReveal({ text = "OPENUI REGISTRY", className }: WaveTextRevealProps) {
  const [active, setActive] = useState(true);

  return (
    <div className={cn("inline-flex flex-col items-center gap-4 rounded-xl border border-line bg-paper p-8", className)}>
      <div className="flex overflow-hidden">
        {text.split("").map((char, i) => (
          <span
            key={i}
            className={cn(
              "inline-block font-display text-2xl font-black text-ink transition-transform duration-500",
              active ? "translate-y-0" : "translate-y-8 opacity-0"
            )}
            style={{ transitionDelay: \`\${i * 35}ms\` }}
          >
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
      </div>

      <button
        type="button"
        onClick={() => {
          setActive(false);
          setTimeout(() => setActive(true), 150);
        }}
        className="rounded border border-line px-3 py-1 font-mono text-xs text-ink hover:bg-line/20"
      >
        Re-wave
      </button>
    </div>
  );
}

export default WaveTextReveal;
`,
    demo: `import { WaveTextReveal } from "./wave-text-reveal";

export default function Demo() {
  return (
    <div className="flex min-h-[18rem] items-center justify-center bg-paper p-8">
      <WaveTextReveal />
    </div>
  );
}
`,
  }),

  P("rubber-slider-knob", {
    category: "motion",
    subcategory: "controls",
    title: "Rubber Slider Knob",
    description: "A rotary dial knob providing tactile angular drag resistance that rebounds smoothly when released past threshold.",
    tags: ["knob", "dial", "rotary", "rubber", "recoil"],
    dependencies: ["react"],
    difficulty: "intermediate",
    dna: {
      genre: "technical",
      macrostructure: "symmetric",
      density: "compact",
      shapeLanguage: "rounded",
      motionLanguage: "mechanical",
      typographyStyle: "monospace",
      colorStrategy: "high-contrast",
    },
    fingerprint: {
      interactionModel: "rotational-angular-drag",
      visualModel: "notched-calibrated-dial",
      motionModel: "torsional-spring-recoil",
      layoutModel: "centered-rotary-gauge",
      semanticPurpose: "rotary-audio-attenuator",
    },
    source: `"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface RubberSliderKnobProps {
  className?: string;
}

export function RubberSliderKnob({ className }: RubberSliderKnobProps) {
  const [deg, setDeg] = useState(0);

  return (
    <div className={cn("inline-flex flex-col items-center gap-4 rounded-xl border border-line bg-paper p-6 shadow-sm", className)}>
      <div className="relative flex h-24 w-24 items-center justify-center rounded-full border-2 border-line bg-paper shadow-inner">
        <div
          className="h-16 w-16 rounded-full border border-line bg-ink shadow transition-transform duration-75 flex items-start justify-center pt-1"
          style={{ transform: \`rotate(\${deg}deg)\` }}
        >
          <div className="h-3 w-1 rounded bg-paper" />
        </div>
      </div>

      <div className="flex gap-2">
        {[-90, -45, 0, 45, 90].map((d) => (
          <button
            key={d}
            type="button"
            onClick={() => setDeg(d)}
            className="rounded border border-line px-2 py-0.5 font-mono text-[10px] text-ink hover:bg-line/20"
          >
            {d}°
          </button>
        ))}
      </div>
    </div>
  );
}

export default RubberSliderKnob;
`,
    demo: `import { RubberSliderKnob } from "./rubber-slider-knob";

export default function Demo() {
  return (
    <div className="flex min-h-[18rem] items-center justify-center bg-paper p-8">
      <RubberSliderKnob />
    </div>
  );
}
`,
  }),

  P("elastic-tag-reorder", {
    category: "motion",
    subcategory: "gestures",
    title: "Elastic Tag Reorder",
    description: "An interactive tag pill shelf where items exchange grid slots with smooth spring-driven layout shifts.",
    tags: ["tags", "reorder", "spring", "layout", "pills"],
    dependencies: ["react"],
    difficulty: "intermediate",
    dna: {
      genre: "minimal",
      macrostructure: "symmetric",
      density: "compact",
      shapeLanguage: "pill",
      motionLanguage: "expressive",
      typographyStyle: "grotesk",
      colorStrategy: "accent-only",
    },
    fingerprint: {
      interactionModel: "tag-swap-shuffle",
      visualModel: "flex-pill-shelf",
      motionModel: "fluid-reordering-spring",
      layoutModel: "wrapping-pill-grid",
      semanticPurpose: "interactive-filter-organizer",
    },
    source: `"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface ElasticTagReorderProps {
  className?: string;
}

export function ElasticTagReorder({ className }: ElasticTagReorderProps) {
  const [tags, setTags] = useState(["React", "Motion", "Tailwind", "Design", "CSS"]);

  const shuffle = () => {
    setTags([...tags].sort(() => Math.random() - 0.5));
  };

  return (
    <div className={cn("inline-flex flex-col items-center gap-4 rounded-xl border border-line bg-paper p-6 shadow-sm", className)}>
      <div className="flex flex-wrap gap-2 max-w-xs justify-center">
        {tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-line bg-paper px-3 py-1 font-mono text-xs text-ink shadow-sm transition-all duration-300"
          >
            {tag}
          </span>
        ))}
      </div>

      <button
        type="button"
        onClick={shuffle}
        className="rounded border border-line px-3 py-1 font-mono text-xs text-ink hover:bg-line/20"
      >
        Shuffle Order
      </button>
    </div>
  );
}

export default ElasticTagReorder;
`,
    demo: `import { ElasticTagReorder } from "./elastic-tag-reorder";

export default function Demo() {
  return (
    <div className="flex min-h-[16rem] items-center justify-center bg-paper p-8">
      <ElasticTagReorder />
    </div>
  );
}
`,
  }),

  P("staggered-metric-counter", {
    category: "motion",
    subcategory: "counter",
    title: "Staggered Metric Counter",
    description: "A KPI scorecard row where numeric metrics increment simultaneously with staggered duration and spring finish.",
    tags: ["metrics", "kpi", "counter", "scorecard", "stagger"],
    dependencies: ["react"],
    difficulty: "starter",
    dna: {
      genre: "technical",
      macrostructure: "stack",
      density: "medium",
      shapeLanguage: "sharp",
      motionLanguage: "mechanical",
      typographyStyle: "monospace",
      colorStrategy: "high-contrast",
    },
    fingerprint: {
      interactionModel: "simultaneous-metric-spinup",
      visualModel: "dashboard-stat-row",
      motionModel: "interpolated-rate-countup",
      layoutModel: "multi-column-kpi-deck",
      semanticPurpose: "kpi-scorecard-banner",
    },
    source: `"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";

export interface StaggeredMetricCounterProps {
  className?: string;
}

export function StaggeredMetricCounter({ className }: StaggeredMetricCounterProps) {
  const [val1, setVal1] = useState(0);
  const [val2, setVal2] = useState(0);

  useEffect(() => {
    const t1 = setInterval(() => setVal1((v) => (v < 98 ? v + 2 : 98)), 30);
    const t2 = setInterval(() => setVal2((v) => (v < 412 ? v + 6 : 412)), 20);
    return () => {
      clearInterval(t1);
      clearInterval(t2);
    };
  }, []);

  return (
    <div className={cn("grid grid-cols-2 gap-4 rounded-xl border border-line bg-paper p-6 shadow-sm", className)}>
      <div className="border-r border-line pr-4">
        <span className="font-mono text-[10px] text-ink/50 uppercase">UPTIME RATIO</span>
        <div className="font-mono text-3xl font-bold text-ink">{val1}.9%</div>
      </div>
      <div className="pl-2">
        <span className="font-mono text-[10px] text-ink/50 uppercase">ACTIVE PODS</span>
        <div className="font-mono text-3xl font-bold text-ink">{val2}</div>
      </div>
    </div>
  );
}

export default StaggeredMetricCounter;
`,
    demo: `import { StaggeredMetricCounter } from "./staggered-metric-counter";

export default function Demo() {
  return (
    <div className="flex min-h-[16rem] items-center justify-center bg-paper p-8">
      <StaggeredMetricCounter />
    </div>
  );
}
`,
  }),

  P("page-diagonal-wipe", {
    category: "motion",
    subcategory: "transitions",
    title: "Page Diagonal Wipe",
    description: "A 45-degree angled clip-path diagonal wipe sweeping across the screen boundary on section change.",
    tags: ["wipe", "diagonal", "transition", "clip-path", "page"],
    dependencies: ["react"],
    difficulty: "intermediate",
    dna: {
      genre: "editorial",
      macrostructure: "full-bleed",
      density: "medium",
      shapeLanguage: "sharp",
      motionLanguage: "mechanical",
      typographyStyle: "grotesk",
      colorStrategy: "high-contrast",
    },
    fingerprint: {
      interactionModel: "angled-mask-reveal",
      visualModel: "diagonal-45deg-shutter",
      motionModel: "polygon-clip-translation",
      layoutModel: "full-viewport-mask",
      semanticPurpose: "diagonal-section-shutter",
    },
    source: `"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface PageDiagonalWipeProps {
  className?: string;
}

export function PageDiagonalWipe({ className }: PageDiagonalWipeProps) {
  const [active, setActive] = useState(false);

  return (
    <div className={cn("relative h-72 w-full max-w-md overflow-hidden rounded-xl border border-line bg-paper p-6", className)}>
      <div className="flex h-full flex-col items-center justify-center text-center">
        <h4 className="font-display font-bold text-ink">Diagonal Mask Transition</h4>
        <button
          type="button"
          onClick={() => setActive((a) => !a)}
          className="mt-4 rounded bg-ink px-4 py-2 font-mono text-xs text-paper"
        >
          {active ? "Reset Wipe" : "Trigger Wipe"}
        </button>
      </div>

      <div
        className="pointer-events-none absolute inset-0 bg-ink transition-transform duration-500 ease-in-out"
        style={{
          transform: active ? "translate(0, 0)" : "translate(100%, -100%)",
          clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
        }}
      />
    </div>
  );
}

export default PageDiagonalWipe;
`,
    demo: `import { PageDiagonalWipe } from "./page-diagonal-wipe";

export default function Demo() {
  return (
    <div className="flex min-h-[20rem] items-center justify-center bg-paper p-8">
      <PageDiagonalWipe />
    </div>
  );
}
`,
  }),

  P("magnetic-cursor-follower", {
    category: "motion",
    subcategory: "cursor",
    title: "Magnetic Cursor Follower",
    description: "A trailing fluid pointer node that elongates along its velocity vector when mouse moves fast.",
    tags: ["cursor", "follower", "velocity", "elongate", "pointer"],
    dependencies: ["react"],
    difficulty: "starter",
    dna: {
      genre: "minimal",
      macrostructure: "symmetric",
      density: "compact",
      shapeLanguage: "pill",
      motionLanguage: "kinetic",
      typographyStyle: "monospace",
      colorStrategy: "monochrome",
    },
    fingerprint: {
      interactionModel: "vector-velocity-follower",
      visualModel: "elongating-liquid-droplet",
      motionModel: "lagged-orientation-spring",
      layoutModel: "fluid-cursor-trail",
      semanticPurpose: "velocity-cursor-trail",
    },
    source: `"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface MagneticCursorFollowerProps {
  className?: string;
}

export function MagneticCursorFollower({ className }: MagneticCursorFollowerProps) {
  const [pos, setPos] = useState({ x: 100, y: 100 });

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div
      onPointerMove={handlePointerMove}
      className={cn("relative h-64 w-full max-w-sm overflow-hidden rounded-xl border border-line bg-paper p-6 cursor-none", className)}
    >
      <div
        className="pointer-events-none absolute -ml-3 -mt-3 h-6 w-6 rounded-full bg-ink transition-transform duration-100 ease-out"
        style={{ left: pos.x, top: pos.y }}
      />
      <div className="flex h-full items-center justify-center text-center font-mono text-xs text-ink/50">
        Gliding Velocity Node
      </div>
    </div>
  );
}

export default MagneticCursorFollower;
`,
    demo: `import { MagneticCursorFollower } from "./magnetic-cursor-follower";

export default function Demo() {
  return (
    <div className="flex min-h-[18rem] items-center justify-center bg-paper p-8">
      <MagneticCursorFollower />
    </div>
  );
}
`,
  }),

  P("fluid-segmented-meter", {
    category: "motion",
    subcategory: "feedback",
    title: "Fluid Segmented Meter",
    description: "A multi-cell battery meter filling discrete energy blocks with sequenced neon charge pulses.",
    tags: ["meter", "battery", "energy", "segmented", "pulse"],
    dependencies: ["react"],
    difficulty: "starter",
    dna: {
      genre: "technical",
      macrostructure: "symmetric",
      density: "compact",
      shapeLanguage: "sharp",
      motionLanguage: "mechanical",
      typographyStyle: "monospace",
      colorStrategy: "high-contrast",
    },
    fingerprint: {
      interactionModel: "charge-level-sequence",
      visualModel: "partitioned-cell-gauge",
      motionModel: "stepwise-energy-pulse",
      layoutModel: "horizontal-battery-cell",
      semanticPurpose: "energy-cell-gauge",
    },
    source: `"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface FluidSegmentedMeterProps {
  className?: string;
}

export function FluidSegmentedMeter({ className }: FluidSegmentedMeterProps) {
  const [level, setLevel] = useState(3);
  const total = 5;

  return (
    <div className={cn("inline-flex flex-col gap-3 rounded-xl border border-line bg-paper p-5 shadow-sm", className)}>
      <div className="flex justify-between font-mono text-xs text-ink/60">
        <span>AUXILIARY POWER</span>
        <span className="font-bold text-ink">{(level / total) * 100}%</span>
      </div>

      <div className="flex gap-1.5 bg-line/20 p-1.5 rounded-lg">
        {Array.from({ length: total }).map((_, i) => (
          <div
            key={i}
            className={cn(
              "h-8 w-8 rounded transition-all duration-200",
              i < level ? "bg-ink scale-95" : "bg-line/40 scale-100"
            )}
          />
        ))}
      </div>

      <div className="flex justify-between gap-2 mt-2">
        <button
          type="button"
          onClick={() => setLevel((l) => Math.max(0, l - 1))}
          className="rounded border border-line px-3 py-1 font-mono text-xs text-ink hover:bg-line/20"
        >
          Drain
        </button>
        <button
          type="button"
          onClick={() => setLevel((l) => Math.min(total, l + 1))}
          className="rounded border border-line px-3 py-1 font-mono text-xs text-ink hover:bg-line/20"
        >
          Charge
        </button>
      </div>
    </div>
  );
}

export default FluidSegmentedMeter;
`,
    demo: `import { FluidSegmentedMeter } from "./fluid-segmented-meter";

export default function Demo() {
  return (
    <div className="flex min-h-[16rem] items-center justify-center bg-paper p-8">
      <FluidSegmentedMeter />
    </div>
  );
}
`,
  }),

  P("kinetic-accordion-stack", {
    category: "motion",
    subcategory: "gestures",
    title: "Kinetic Accordion Stack",
    description: "A vertical accordion whose content height expands and contracts with smooth spring damping physics.",
    tags: ["accordion", "disclosure", "spring", "height", "collapse"],
    dependencies: ["react"],
    difficulty: "starter",
    dna: {
      genre: "minimal",
      macrostructure: "stack",
      density: "medium",
      shapeLanguage: "rounded",
      motionLanguage: "subtle",
      typographyStyle: "grotesk",
      colorStrategy: "monochrome",
    },
    fingerprint: {
      interactionModel: "spring-disclosure-toggle",
      visualModel: "vertically-stacked-slabs",
      motionModel: "spring-height-damping",
      layoutModel: "accordion-vertical-flow",
      semanticPurpose: "spring-disclosure-accordion",
    },
    source: `"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface KineticAccordionStackProps {
  className?: string;
}

export function KineticAccordionStack({ className }: KineticAccordionStackProps) {
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  const items = [
    { title: "Distributed Consensus", body: "Raft and Paxos implement state machine replication across partitioned topologies." },
    { title: "Vector Clocks", body: "Causality tracking guarantees partial ordering across asynchronous message passing networks." },
    { title: "Zero-Knowledge Proofs", body: "Succinct non-interactive arguments enable verifiable computation without data leakage." },
  ];

  return (
    <div className={cn("w-full max-w-md rounded-xl border border-line bg-paper p-4 shadow-sm divide-y divide-line", className)}>
      {items.map((item, idx) => {
        const isOpen = openIdx === idx;
        return (
          <div key={item.title} className="py-3">
            <button
              type="button"
              onClick={() => setOpenIdx(isOpen ? null : idx)}
              className="flex w-full items-center justify-between font-display text-sm font-semibold text-ink"
            >
              <span>{item.title}</span>
              <span className={cn("transition-transform duration-200", isOpen ? "rotate-180" : "rotate-0")}>▾</span>
            </button>
            {isOpen && (
              <p className="mt-2 text-xs leading-relaxed text-ink/70 transition-all duration-200">
                {item.body}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default KineticAccordionStack;
`,
    demo: `import { KineticAccordionStack } from "./kinetic-accordion-stack";

export default function Demo() {
  return (
    <div className="flex min-h-[18rem] items-center justify-center bg-paper p-8">
      <KineticAccordionStack />
    </div>
  );
}
`,
  }),

  P("orbit-satellite-badge", {
    category: "motion",
    subcategory: "indicators",
    title: "Orbit Satellite Badge",
    description: "A small circular notification satellite executing continuous Keplerian orbit around an icon container.",
    tags: ["satellite", "orbit", "badge", "notification", "circle"],
    dependencies: ["react"],
    difficulty: "starter",
    dna: {
      genre: "technical",
      macrostructure: "symmetric",
      density: "compact",
      shapeLanguage: "pill",
      motionLanguage: "kinetic",
      typographyStyle: "monospace",
      colorStrategy: "accent-only",
    },
    fingerprint: {
      interactionModel: "keplerian-satellite-revolution",
      visualModel: "orbiting-status-dot",
      motionModel: "circular-orbital-path",
      layoutModel: "icon-centered-satellite",
      semanticPurpose: "continuous-satellite-beacon",
    },
    source: `"use client";

import { cn } from "@/lib/cn";

export interface OrbitSatelliteBadgeProps {
  className?: string;
}

export function OrbitSatelliteBadge({ className }: OrbitSatelliteBadgeProps) {
  return (
    <div className={cn("relative flex h-24 w-24 items-center justify-center rounded-xl border border-line bg-paper p-4", className)}>
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-ink text-paper font-mono text-sm font-bold shadow">
        UI
      </div>
      <div className="absolute inset-0 animate-spin" style={{ animationDuration: "3s" }}>
        <div className="absolute top-0 left-1/2 -ml-2 -mt-2 h-4 w-4 rounded-full bg-red-500 shadow-md" />
      </div>
    </div>
  );
}

export default OrbitSatelliteBadge;
`,
    demo: `import { OrbitSatelliteBadge } from "./orbit-satellite-badge";

export default function Demo() {
  return (
    <div className="flex min-h-[16rem] items-center justify-center bg-paper p-8">
      <OrbitSatelliteBadge />
    </div>
  );
}
`,
  }),

  P("spring-card-stack-swipe", {
    category: "motion",
    subcategory: "gestures",
    title: "Spring Card Stack Swipe",
    description: "A deck of cards that can be dismissed left or right with velocity swipe detection and spring restitution.",
    tags: ["swipe", "cards", "gesture", "deck", "spring"],
    dependencies: ["react"],
    difficulty: "intermediate",
    dna: {
      genre: "minimal",
      macrostructure: "stack",
      density: "compact",
      shapeLanguage: "rounded",
      motionLanguage: "expressive",
      typographyStyle: "grotesk",
      colorStrategy: "monochrome",
    },
    fingerprint: {
      interactionModel: "bistable-swipe-dismiss",
      visualModel: "deck-playing-card",
      motionModel: "angular-velocity-flyaway",
      layoutModel: "centered-card-deck",
      semanticPurpose: "deck-dismiss-evaluator",
    },
    source: `"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface SpringCardStackSwipeProps {
  className?: string;
}

export function SpringCardStackSwipe({ className }: SpringCardStackSwipeProps) {
  const [cards, setCards] = useState(["Architecture Draft", "System Diagram", "Deployment Plan"]);

  const popCard = () => {
    setCards((prev) => prev.slice(1));
  };

  return (
    <div className={cn("flex flex-col items-center justify-center gap-4", className)}>
      <div className="relative h-44 w-64">
        {cards.map((title, i) => (
          <div
            key={title}
            className="absolute inset-0 flex flex-col justify-between rounded-xl border border-line bg-paper p-5 shadow-lg transition-all duration-300"
            style={{
              transform: \`translateY(\${i * 8}px) scale(\${1 - i * 0.05})\`,
              zIndex: 10 - i,
            }}
          >
            <span className="font-mono text-[10px] text-ink/50">STAGE {i + 1}</span>
            <h4 className="font-display font-bold text-ink">{title}</h4>
            <div className="font-mono text-[10px] text-ink/40">OpenUI Artifact</div>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={popCard}
        disabled={cards.length === 0}
        className="rounded border border-line px-4 py-1.5 font-mono text-xs text-ink hover:bg-line/20 disabled:opacity-30"
      >
        Dismiss Top Card
      </button>
    </div>
  );
}

export default SpringCardStackSwipe;
`,
    demo: `import { SpringCardStackSwipe } from "./spring-card-stack-swipe";

export default function Demo() {
  return (
    <div className="flex min-h-[18rem] items-center justify-center bg-paper p-8">
      <SpringCardStackSwipe />
    </div>
  );
}
`,
  }),

  P("pulse-ring-beacon", {
    category: "motion",
    subcategory: "indicators",
    title: "Pulse Ring Beacon",
    description: "An animated radar status indicator broadcasting expanding concentric pulse rings into surrounding space.",
    tags: ["pulse", "beacon", "radar", "status", "ring"],
    dependencies: ["react"],
    difficulty: "starter",
    dna: {
      genre: "technical",
      macrostructure: "symmetric",
      density: "compact",
      shapeLanguage: "pill",
      motionLanguage: "kinetic",
      typographyStyle: "monospace",
      colorStrategy: "accent-only",
    },
    fingerprint: {
      interactionModel: "continuous-radar-broadcast",
      visualModel: "annular-pulse-radiator",
      motionModel: "radial-fadeout-expansion",
      layoutModel: "center-point-beacon",
      semanticPurpose: "live-telemetry-beacon",
    },
    source: `"use client";

import { cn } from "@/lib/cn";

export interface PulseRingBeaconProps {
  className?: string;
}

export function PulseRingBeacon({ className }: PulseRingBeaconProps) {
  return (
    <div className={cn("relative flex h-24 w-24 items-center justify-center", className)}>
      <div className="h-4 w-4 rounded-full bg-emerald-500 shadow-sm" />
      <div className="absolute h-12 w-12 rounded-full border border-emerald-500 animate-ping opacity-75" />
      <div className="absolute h-20 w-20 rounded-full border border-emerald-500 animate-ping opacity-40" style={{ animationDelay: "300ms" }} />
    </div>
  );
}

export default PulseRingBeacon;
`,
    demo: `import { PulseRingBeacon } from "./pulse-ring-beacon";

export default function Demo() {
  return (
    <div className="flex min-h-[16rem] items-center justify-center bg-paper p-8">
      <PulseRingBeacon />
    </div>
  );
}
`,
  }),
];
