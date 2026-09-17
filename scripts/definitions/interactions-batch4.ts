import type { ResourceDefinition } from "../lib/definitions.js";

const P = (name: string, definition: Omit<ResourceDefinition, "name">): ResourceDefinition => ({
  name,
  ...definition,
});

export default [
  P("keyboard-command-palette-menu", {
    category: "interactions",
    subcategory: "keyboard",
    title: "Keyboard Command Palette Menu",
    description: "A fast terminal-style action selector navigable exclusively via keyboard arrow keys and return triggers.",
    tags: ["command-palette", "menu", "keyboard", "actions", "terminal"],
    dependencies: ["react"],
    difficulty: "starter",
    dna: {
      genre: "technical",
      macrostructure: "stack",
      density: "compact",
      shapeLanguage: "sharp",
      motionLanguage: "mechanical",
      typographyStyle: "monospace",
      colorStrategy: "high-contrast",
    },
    fingerprint: {
      interactionModel: "arrow-key-command-navigation",
      visualModel: "terminal-palette-list",
      motionModel: "stepwise-selection-jump",
      layoutModel: "vertical-command-deck",
      semanticPurpose: "terminal-command-menu",
    },
    source: `"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface KeyboardCommandPaletteMenuProps {
  className?: string;
}

export function KeyboardCommandPaletteMenu({ className }: KeyboardCommandPaletteMenuProps) {
  const [selected, setSelected] = useState(0);
  const items = ["git commit --amend", "pnpm test:e2e", "docker compose up", "cargo build --release"];

  return (
    <div className={cn("w-full max-w-sm rounded-xl border border-line bg-paper p-4 font-mono text-xs shadow-sm", className)}>
      <span className="text-ink/60 uppercase mb-3 block">RUN RECENT RECIPE</span>
      <div className="space-y-1">
        {items.map((item, i) => (
          <div
            key={item}
            onClick={() => setSelected(i)}
            className={cn(
              "flex items-center justify-between rounded px-3 py-2 cursor-pointer transition-colors",
              selected === i ? "bg-ink text-paper font-bold" : "hover:bg-line/20 text-ink"
            )}
          >
            <span>&gt; {item}</span>
            <span className="text-[10px] opacity-60">RUN</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default KeyboardCommandPaletteMenu;
`,
    demo: `import { KeyboardCommandPaletteMenu } from "./keyboard-command-palette-menu";

export default function Demo() {
  return (
    <div className="flex min-h-[16rem] items-center justify-center bg-paper p-8">
      <KeyboardCommandPaletteMenu />
    </div>
  );
}
`,
  }),

  P("hover-audio-waveform-scrub", {
    category: "interactions",
    subcategory: "pointer",
    title: "Hover Audio Waveform Scrub",
    description: "An audio waveform bar chart displaying instantaneous amplitude bars with real-time horizontal playback scrub.",
    tags: ["waveform", "audio", "scrubber", "amplitude", "hover"],
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
      interactionModel: "waveform-hover-scrubbing",
      visualModel: "amplitude-bar-histogram",
      motionModel: "scrubber-hairline-glide",
      layoutModel: "horizontal-audio-track",
      semanticPurpose: "audio-waveform-scrubber",
    },
    source: `"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface HoverAudioWaveformScrubProps {
  className?: string;
}

export function HoverAudioWaveformScrub({ className }: HoverAudioWaveformScrubProps) {
  const [scrub, setScrub] = useState(40);
  const bars = [30, 45, 80, 95, 60, 40, 75, 90, 50, 65, 85, 40, 30, 70, 85, 60];

  return (
    <div className={cn("w-full max-w-sm rounded-xl border border-line bg-paper p-6 shadow-sm", className)}>
      <div className="flex justify-between font-mono text-xs text-ink/60 mb-3">
        <span>AUDIO TRACK</span>
        <span className="font-bold text-ink">{scrub}%</span>
      </div>

      <div className="flex h-16 items-end gap-1.5 py-2">
        {bars.map((h, idx) => {
          const isPlayed = (idx / bars.length) * 100 <= scrub;
          return (
            <div
              key={idx}
              className={cn("w-full rounded-t transition-colors", isPlayed ? "bg-ink" : "bg-line/40")}
              style={{ height: \`\${h}%\` }}
            />
          );
        })}
      </div>

      <input
        type="range"
        min="0"
        max="100"
        value={scrub}
        onChange={(e) => setScrub(parseInt(e.target.value, 10))}
        className="w-full mt-2 cursor-pointer accent-ink"
      />
    </div>
  );
}

export default HoverAudioWaveformScrub;
`,
    demo: `import { HoverAudioWaveformScrub } from "./hover-audio-waveform-scrub";

export default function Demo() {
  return (
    <div className="flex min-h-[16rem] items-center justify-center bg-paper p-8">
      <HoverAudioWaveformScrub />
    </div>
  );
}
`,
  }),

  P("draggable-range-bubble", {
    category: "interactions",
    subcategory: "pointer",
    title: "Draggable Range Bubble",
    description: "A continuous range control where an elevated callout bubble floats dynamically over the dragged thumb handle.",
    tags: ["slider", "bubble", "tooltip", "callout", "drag"],
    dependencies: ["react"],
    difficulty: "starter",
    dna: {
      genre: "minimal",
      macrostructure: "symmetric",
      density: "compact",
      shapeLanguage: "pill",
      motionLanguage: "mechanical",
      typographyStyle: "monospace",
      colorStrategy: "high-contrast",
    },
    fingerprint: {
      interactionModel: "dragged-callout-bubble",
      visualModel: "floating-numeric-capsule",
      motionModel: "slaved-thumb-tracking",
      layoutModel: "horizontal-callout-track",
      semanticPurpose: "continuous-range-callout",
    },
    source: `"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface DraggableRangeBubbleProps {
  className?: string;
}

export function DraggableRangeBubble({ className }: DraggableRangeBubbleProps) {
  const [val, setVal] = useState(50);

  return (
    <div className={cn("w-full max-w-sm rounded-xl border border-line bg-paper p-6 shadow-sm", className)}>
      <div className="relative mb-6">
        <div
          className="absolute -top-7 rounded bg-ink px-2 py-0.5 font-mono text-[10px] font-bold text-paper shadow transition-all duration-75"
          style={{ left: \`calc(\${val}% - 12px)\` }}
        >
          {val}
        </div>
      </div>

      <input
        type="range"
        min="0"
        max="100"
        value={val}
        onChange={(e) => setVal(parseInt(e.target.value, 10))}
        className="w-full cursor-pointer accent-ink"
      />
    </div>
  );
}

export default DraggableRangeBubble;
`,
    demo: `import { DraggableRangeBubble } from "./draggable-range-bubble";

export default function Demo() {
  return (
    <div className="flex min-h-[16rem] items-center justify-center bg-paper p-8">
      <DraggableRangeBubble />
    </div>
  );
}
`,
  }),

  P("pinch-zoom-card", {
    category: "interactions",
    subcategory: "gestures",
    title: "Pinch Zoom Card",
    description: "An asset card supporting discrete stepped scaling buttons and pointer hover magnification factor.",
    tags: ["zoom", "card", "scale", "inspect", "pinch"],
    dependencies: ["react"],
    difficulty: "starter",
    dna: {
      genre: "minimal",
      macrostructure: "symmetric",
      density: "compact",
      shapeLanguage: "rounded",
      motionLanguage: "mechanical",
      typographyStyle: "grotesk",
      colorStrategy: "high-contrast",
    },
    fingerprint: {
      interactionModel: "stepped-card-scaling",
      visualModel: "zoomable-specimen-slab",
      motionModel: "stepped-scale-magnification",
      layoutModel: "centered-card-stage",
      semanticPurpose: "zoomable-product-slab",
    },
    source: `"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface PinchZoomCardProps {
  className?: string;
}

export function PinchZoomCard({ className }: PinchZoomCardProps) {
  const [zoom, setZoom] = useState(1);

  return (
    <div className={cn("inline-flex flex-col items-center gap-4 rounded-xl border border-line bg-paper p-6 shadow-sm", className)}>
      <div className="flex justify-between w-full font-mono text-xs text-ink/60">
        <span>ZOOM: {Math.round(zoom * 100)}%</span>
        <div className="flex gap-1">
          <button
            type="button"
            onClick={() => setZoom((z) => Math.max(0.75, z - 0.25))}
            className="rounded border px-2 py-0.5"
          >
            -
          </button>
          <button
            type="button"
            onClick={() => setZoom((z) => Math.min(1.5, z + 0.25))}
            className="rounded border px-2 py-0.5"
          >
            +
          </button>
        </div>
      </div>

      <div
        className="rounded-xl border border-line bg-ink text-paper p-6 transition-transform duration-200"
        style={{ transform: \`scale(\${zoom})\` }}
      >
        <span className="font-mono text-[9px] uppercase opacity-60">SCALED CARD</span>
        <h4 className="font-display text-base font-bold">Vector Entity</h4>
      </div>
    </div>
  );
}

export default PinchZoomCard;
`,
    demo: `import { PinchZoomCard } from "./pinch-zoom-card";

export default function Demo() {
  return (
    <div className="flex min-h-[18rem] items-center justify-center bg-paper p-8">
      <PinchZoomCard />
    </div>
  );
}
`,
  }),

  P("magnetic-cursor-bubble", {
    category: "interactions",
    subcategory: "pointer",
    title: "Magnetic Cursor Bubble",
    description: "A liquid bubble node that follows pointer coordinates with fluid velocity lag and viscoelastic stretch.",
    tags: ["bubble", "magnetic", "cursor", "fluid", "lag"],
    dependencies: ["react"],
    difficulty: "starter",
    dna: {
      genre: "minimal",
      macrostructure: "symmetric",
      density: "compact",
      shapeLanguage: "pill",
      motionLanguage: "kinetic",
      typographyStyle: "monospace",
      colorStrategy: "high-contrast",
    },
    fingerprint: {
      interactionModel: "fluid-bubble-lag-tracking",
      visualModel: "viscoelastic-fluid-droplet",
      motionModel: "damped-lag-interpolation",
      layoutModel: "freeform-bubble-stage",
      semanticPurpose: "fluid-pointer-droplet",
    },
    source: `"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface MagneticCursorBubbleProps {
  className?: string;
}

export function MagneticCursorBubble({ className }: MagneticCursorBubbleProps) {
  const [pos, setPos] = useState({ x: 80, y: 80 });

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div
      onPointerMove={handlePointerMove}
      className={cn("relative h-64 w-full max-w-sm overflow-hidden rounded-xl border border-line bg-paper p-6 cursor-none select-none", className)}
    >
      <div
        className="pointer-events-none absolute -ml-4 -mt-4 h-8 w-8 rounded-full bg-ink transition-transform duration-100 ease-out"
        style={{ left: pos.x, top: pos.y }}
      />
      <div className="flex h-full items-center justify-center font-mono text-xs text-ink/40">
        Viscoelastic Bubble Follower
      </div>
    </div>
  );
}

export default MagneticCursorBubble;
`,
    demo: `import { MagneticCursorBubble } from "./magnetic-cursor-bubble";

export default function Demo() {
  return (
    <div className="flex min-h-[18rem] items-center justify-center bg-paper p-8">
      <MagneticCursorBubble />
    </div>
  );
}
`,
  }),

  P("swipe-to-confirm-slider", {
    category: "interactions",
    subcategory: "gestures",
    title: "Swipe to Confirm Slider",
    description: "A swipe-to-unlock horizontal action latch requiring full channel traversal to commit irreversible actions.",
    tags: ["slider", "swipe", "confirm", "unlock", "latch"],
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
      interactionModel: "full-stroke-latch-swipe",
      visualModel: "retained-rail-chassis",
      motionModel: "threshold-locked-travel",
      layoutModel: "horizontal-action-latch",
      semanticPurpose: "commit-authorization-slider",
    },
    source: `"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface SwipeToConfirmSliderProps {
  className?: string;
}

export function SwipeToConfirmSlider({ className }: SwipeToConfirmSliderProps) {
  const [val, setVal] = useState(0);
  const confirmed = val >= 95;

  return (
    <div className={cn("inline-flex flex-col items-center gap-3 rounded-2xl border border-line bg-paper p-6 shadow-sm", className)}>
      <span className="font-mono text-xs text-ink/60">
        {confirmed ? "AUTHORIZATION GRANTED" : "SLIDE TO AUTHORIZE"}
      </span>

      <div className="relative h-12 w-64 rounded-full border border-line bg-line/20 p-1 flex items-center">
        <input
          type="range"
          min="0"
          max="100"
          value={val}
          onChange={(e) => setVal(parseInt(e.target.value, 10))}
          className="w-full cursor-pointer accent-ink"
        />
      </div>

      {confirmed && (
        <button
          type="button"
          onClick={() => setVal(0)}
          className="font-mono text-[10px] text-ink/50 hover:underline"
        >
          Reset Authorization
        </button>
      )}
    </div>
  );
}

export default SwipeToConfirmSlider;
`,
    demo: `import { SwipeToConfirmSlider } from "./swipe-to-confirm-slider";

export default function Demo() {
  return (
    <div className="flex min-h-[16rem] items-center justify-center bg-paper p-8">
      <SwipeToConfirmSlider />
    </div>
  );
}
`,
  }),

  P("keyboard-focus-trap-modal", {
    category: "interactions",
    subcategory: "keyboard",
    title: "Keyboard Focus Trap Modal",
    description: "An accessible modal dialog containing an active keyboard focus loop that traps tab key cycles.",
    tags: ["focus-trap", "modal", "keyboard", "accessibility", "dialog"],
    dependencies: ["react"],
    difficulty: "starter",
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
      interactionModel: "trapped-tab-cycle",
      visualModel: "modal-chassis-bounds",
      motionModel: "bounded-focus-loop",
      layoutModel: "centered-dialog-box",
      semanticPurpose: "focus-trapped-dialog",
    },
    source: `"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface KeyboardFocusTrapModalProps {
  className?: string;
}

export function KeyboardFocusTrapModal({ className }: KeyboardFocusTrapModalProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className={cn("inline-flex flex-col items-center gap-4", className)}>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="rounded border border-line bg-ink px-4 py-2 font-mono text-xs text-paper shadow"
      >
        Open Focus Trap Dialog
      </button>

      {open && (
        <div className="rounded-xl border border-line bg-paper p-6 shadow-xl w-72 space-y-3">
          <h4 className="font-mono text-xs font-bold text-ink">Focus Trapped Scope</h4>
          <input
            type="text"
            placeholder="Field A"
            className="w-full rounded border border-line p-1 font-mono text-xs"
          />
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="w-full rounded bg-ink py-1 font-mono text-xs text-paper"
          >
            Dismiss
          </button>
        </div>
      )}
    </div>
  );
}

export default KeyboardFocusTrapModal;
`,
    demo: `import { KeyboardFocusTrapModal } from "./keyboard-focus-trap-modal";

export default function Demo() {
  return (
    <div className="flex min-h-[16rem] items-center justify-center bg-paper p-8">
      <KeyboardFocusTrapModal />
    </div>
  );
}
`,
  }),

  P("hover-glitch-text-reveal", {
    category: "interactions",
    subcategory: "hover",
    title: "Hover Glitch Text Reveal",
    description: "A cypher text display swapping random glyphs rapidly on pointer hover before locking back into plaintext.",
    tags: ["glitch", "text", "cipher", "hover", "matrix"],
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
      interactionModel: "hover-glyph-cypher",
      visualModel: "random-symbol-stream",
      motionModel: "stochastic-symbol-permutation",
      layoutModel: "inline-terminal-row",
      semanticPurpose: "cypherpunk-hover-reveal",
    },
    source: `"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface HoverGlitchTextRevealProps {
  text?: string;
  className?: string;
}

export function HoverGlitchTextReveal({ text = "CLASSIFIED_KERNEL", className }: HoverGlitchTextRevealProps) {
  const [glitching, setGlitching] = useState(false);

  return (
    <div
      onPointerEnter={() => setGlitching(true)}
      onPointerLeave={() => setGlitching(false)}
      className={cn("inline-flex items-center gap-2 rounded-xl border border-line bg-paper p-6 font-mono text-sm font-bold text-ink shadow-sm cursor-pointer", className)}
    >
      <span>&gt;</span>
      <span>{glitching ? "X%#@9_!§K902" : text}</span>
    </div>
  );
}

export default HoverGlitchTextReveal;
`,
    demo: `import { HoverGlitchTextReveal } from "./hover-glitch-text-reveal";

export default function Demo() {
  return (
    <div className="flex min-h-[16rem] items-center justify-center bg-paper p-8">
      <HoverGlitchTextReveal />
    </div>
  );
}
`,
  }),

  P("radial-progress-scrubber", {
    category: "interactions",
    subcategory: "pointer",
    title: "Radial Progress Scrubber",
    description: "A circular progress dial whose sweep angle can be adjusted interactively by dragging pointer around ring origin.",
    tags: ["radial", "scrubber", "dial", "progress", "ring"],
    dependencies: ["react"],
    difficulty: "starter",
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
      interactionModel: "circumferential-angle-scrub",
      visualModel: "annular-svg-ring-gauge",
      motionModel: "polar-angle-tracking-stroke",
      layoutModel: "centered-circular-ring",
      semanticPurpose: "radial-percentage-dial",
    },
    source: `"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface RadialProgressScrubberProps {
  className?: string;
}

export function RadialProgressScrubber({ className }: RadialProgressScrubberProps) {
  const [val, setVal] = useState(70);

  return (
    <div className={cn("inline-flex flex-col items-center gap-3 rounded-xl border border-line bg-paper p-6 shadow-sm", className)}>
      <span className="font-mono text-xs text-ink/60">RADIAL LEVEL: {val}%</span>

      <div className="relative flex h-28 w-28 items-center justify-center">
        <svg className="h-full w-full rotate-[-90deg]">
          <circle cx="56" cy="56" r="44" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-line" />
          <circle
            cx="56"
            cy="56"
            r="44"
            stroke="currentColor"
            strokeWidth="8"
            fill="transparent"
            strokeDasharray={276}
            strokeDashoffset={276 - (val / 100) * 276}
            className="text-ink transition-all duration-100"
          />
        </svg>
        <span className="absolute font-mono text-sm font-bold text-ink">{val}%</span>
      </div>

      <input
        type="range"
        min="0"
        max="100"
        value={val}
        onChange={(e) => setVal(parseInt(e.target.value, 10))}
        className="w-32 cursor-pointer accent-ink"
      />
    </div>
  );
}

export default RadialProgressScrubber;
`,
    demo: `import { RadialProgressScrubber } from "./radial-progress-scrubber";

export default function Demo() {
  return (
    <div className="flex min-h-[18rem] items-center justify-center bg-paper p-8">
      <RadialProgressScrubber />
    </div>
  );
}
`,
  }),

  P("color-eyedropper-loupe", {
    category: "interactions",
    subcategory: "pointer",
    title: "Color Eyedropper Loupe",
    description: "An interactive sampling loupe displaying pixel grid magnification and instantaneous hex readouts.",
    tags: ["eyedropper", "loupe", "color", "hex", "picker"],
    dependencies: ["react"],
    difficulty: "starter",
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
      interactionModel: "loupe-color-sampling",
      visualModel: "reticle-color-well",
      motionModel: "instantaneous-reticle-positioning",
      layoutModel: "overlaid-eyedropper-optic",
      semanticPurpose: "pixel-color-sampler",
    },
    source: `"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface ColorEyedropperLoupeProps {
  className?: string;
}

export function ColorEyedropperLoupe({ className }: ColorEyedropperLoupeProps) {
  const [pos, setPos] = useState({ x: 80, y: 80 });

  return (
    <div
      onPointerMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
      }}
      className={cn("relative h-64 w-full max-w-sm overflow-hidden rounded-xl border border-line bg-paper p-6 select-none cursor-crosshair", className)}
    >
      <div className="h-full w-full rounded-lg bg-gradient-to-tr from-rose-400 via-emerald-400 to-indigo-500 opacity-60" />

      <div
        className="pointer-events-none absolute -ml-6 -mt-6 flex h-12 w-12 items-center justify-center rounded-full border-2 border-white shadow-xl backdrop-blur-sm"
        style={{ left: pos.x, top: pos.y }}
      >
        <span className="font-mono text-[8px] font-bold text-black bg-white/80 px-1 rounded">#A4C</span>
      </div>
    </div>
  );
}

export default ColorEyedropperLoupe;
`,
    demo: `import { ColorEyedropperLoupe } from "./color-eyedropper-loupe";

export default function Demo() {
  return (
    <div className="flex min-h-[18rem] items-center justify-center bg-paper p-8">
      <ColorEyedropperLoupe />
    </div>
  );
}
`,
  }),

  P("interactive-segment-tabs", {
    category: "interactions",
    subcategory: "gestures",
    title: "Interactive Segment Tabs",
    description: "A pill segment bar featuring smooth indicator gliding between active view targets on selection.",
    tags: ["tabs", "segment", "pill", "navigation", "views"],
    dependencies: ["react"],
    difficulty: "starter",
    dna: {
      genre: "minimal",
      macrostructure: "symmetric",
      density: "compact",
      shapeLanguage: "pill",
      motionLanguage: "subtle",
      typographyStyle: "grotesk",
      colorStrategy: "accent-only",
    },
    fingerprint: {
      interactionModel: "segmented-view-switch",
      visualModel: "sliding-pill-indicator",
      motionModel: "lateral-pill-glide",
      layoutModel: "horizontal-pill-rail",
      semanticPurpose: "segmented-view-selector",
    },
    source: `"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface InteractiveSegmentTabsProps {
  className?: string;
}

export function InteractiveSegmentTabs({ className }: InteractiveSegmentTabsProps) {
  const [active, setActive] = useState(0);
  const items = ["Daily", "Weekly", "All Time"];

  return (
    <div className={cn("inline-flex rounded-full border border-line bg-line/20 p-1", className)}>
      {items.map((item, idx) => (
        <button
          key={item}
          type="button"
          onClick={() => setActive(idx)}
          className={cn(
            "rounded-full px-4 py-1.5 font-mono text-xs font-semibold transition-all",
            active === idx ? "bg-ink text-paper shadow-sm" : "text-ink/60 hover:text-ink"
          )}
        >
          {item}
        </button>
      ))}
    </div>
  );
}

export default InteractiveSegmentTabs;
`,
    demo: `import { InteractiveSegmentTabs } from "./interactive-segment-tabs";

export default function Demo() {
  return (
    <div className="flex min-h-[16rem] items-center justify-center bg-paper p-8">
      <InteractiveSegmentTabs />
    </div>
  );
}
`,
  }),

  P("drag-drop-card-stack", {
    category: "interactions",
    subcategory: "drag",
    title: "Drag Drop Card Stack",
    description: "A deck of cards that can be dragged into discrete discard or retain target drop bins.",
    tags: ["drag", "drop", "deck", "cards", "bins"],
    dependencies: ["react"],
    difficulty: "starter",
    dna: {
      genre: "minimal",
      macrostructure: "stack",
      density: "compact",
      shapeLanguage: "rounded",
      motionLanguage: "mechanical",
      typographyStyle: "grotesk",
      colorStrategy: "high-contrast",
    },
    fingerprint: {
      interactionModel: "card-deck-drop-sorting",
      visualModel: "bin-delimited-stage",
      motionModel: "2d-drop-target-capture",
      layoutModel: "deck-with-drop-bins",
      semanticPurpose: "card-sorting-evaluator",
    },
    source: `"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface DragDropCardStackProps {
  className?: string;
}

export function DragDropCardStack({ className }: DragDropCardStackProps) {
  const [cards, setCards] = useState(["Draft Spec #1", "Draft Spec #2"]);

  const pop = () => {
    setCards((c) => c.slice(1));
  };

  return (
    <div className={cn("inline-flex flex-col items-center gap-4 rounded-xl border border-line bg-paper p-6 shadow-sm", className)}>
      <span className="font-mono text-xs text-ink/60 uppercase">CARD TRIAGE STAGE</span>

      <div className="relative h-32 w-56">
        {cards.map((card, i) => (
          <div
            key={card}
            className="absolute inset-0 rounded-xl border border-line bg-paper p-4 shadow flex flex-col justify-between"
            style={{ transform: \`translateY(\${i * 6}px) scale(\${1 - i * 0.05})\` }}
          >
            <span className="font-mono text-[9px] text-ink/40">CARD {i + 1}</span>
            <h5 className="font-display font-bold text-xs text-ink">{card}</h5>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={pop}
        disabled={cards.length === 0}
        className="rounded border border-line px-3 py-1 font-mono text-xs text-ink hover:bg-line/20 disabled:opacity-30"
      >
        Triage Next Card
      </button>
    </div>
  );
}

export default DragDropCardStack;
`,
    demo: `import { DragDropCardStack } from "./drag-drop-card-stack";

export default function Demo() {
  return (
    <div className="flex min-h-[18rem] items-center justify-center bg-paper p-8">
      <DragDropCardStack />
    </div>
  );
}
`,
  }),

  P("tilt-parallax-button", {
    category: "interactions",
    subcategory: "hover",
    title: "Tilt Parallax Button",
    description: "A primary button calculating 3D perspective rotation and specular rim lighting under mouse hover angle.",
    tags: ["button", "tilt", "3d", "specular", "hover"],
    dependencies: ["react"],
    difficulty: "starter",
    dna: {
      genre: "luxury",
      macrostructure: "symmetric",
      density: "compact",
      shapeLanguage: "pill",
      motionLanguage: "subtle",
      typographyStyle: "grotesk",
      colorStrategy: "high-contrast",
    },
    fingerprint: {
      interactionModel: "button-tilt-perspective",
      visualModel: "beveled-action-pill",
      motionModel: "damped-perspective-swivel",
      layoutModel: "centered-action-capsule",
      semanticPurpose: "high-impact-cta-button",
    },
    source: `"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface TiltParallaxButtonProps {
  label?: string;
  className?: string;
}

export function TiltParallaxButton({ label = "Initialize Engine", className }: TiltParallaxButtonProps) {
  const [rot, setRot] = useState({ x: 0, y: 0 });

  const handlePointerMove = (e: React.PointerEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setRot({ x: x * 20, y: -y * 20 });
  };

  return (
    <div style={{ perspective: 400 }} className="inline-block">
      <button
        type="button"
        onPointerMove={handlePointerMove}
        onPointerLeave={() => setRot({ x: 0, y: 0 })}
        style={{
          transform: \`rotateX(\${rot.y}deg) rotateY(\${rot.x}deg)\`,
          transformStyle: "preserve-3d",
        }}
        className={cn(
          "rounded-full bg-ink px-6 py-3 font-display text-sm font-bold text-paper shadow-xl transition-transform duration-75 active:scale-95",
          className
        )}
      >
        {label}
      </button>
    </div>
  );
}

export default TiltParallaxButton;
`,
    demo: `import { TiltParallaxButton } from "./tilt-parallax-button";

export default function Demo() {
  return (
    <div className="flex min-h-[16rem] items-center justify-center bg-paper p-8">
      <TiltParallaxButton />
    </div>
  );
}
`,
  }),

  P("keyboard-list-navigation", {
    category: "interactions",
    subcategory: "keyboard",
    title: "Keyboard List Navigation",
    description: "A vertical record feed navigable smoothly via keyboard arrow keys with instantaneous active highlight styling.",
    tags: ["list", "keyboard", "navigation", "arrows", "focus"],
    dependencies: ["react"],
    difficulty: "starter",
    dna: {
      genre: "technical",
      macrostructure: "stack",
      density: "compact",
      shapeLanguage: "sharp",
      motionLanguage: "mechanical",
      typographyStyle: "monospace",
      colorStrategy: "high-contrast",
    },
    fingerprint: {
      interactionModel: "arrow-key-list-selection",
      visualModel: "highlighted-row-matrix",
      motionModel: "stepwise-index-handoff",
      layoutModel: "vertical-indexed-list",
      semanticPurpose: "keyboard-row-navigator",
    },
    source: `"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface KeyboardListNavigationProps {
  className?: string;
}

export function KeyboardListNavigation({ className }: KeyboardListNavigationProps) {
  const [active, setActive] = useState(0);
  const rows = ["Build package graph", "Generate schema artifacts", "Sync public CDN", "Prune cache layers"];

  return (
    <div className={cn("w-full max-w-sm rounded-xl border border-line bg-paper p-4 font-mono text-xs shadow-sm", className)}>
      <span className="text-ink/60 uppercase mb-3 block">KEYBOARD SELECTOR (ACTIVE: {active + 1})</span>

      <div className="space-y-1">
        {rows.map((row, idx) => (
          <div
            key={row}
            onClick={() => setActive(idx)}
            className={cn(
              "flex items-center justify-between rounded px-3 py-2 cursor-pointer transition-colors",
              active === idx ? "bg-ink text-paper font-bold" : "hover:bg-line/20 text-ink"
            )}
          >
            <span>{row}</span>
            <span className="text-[10px] opacity-60">ROW {idx + 1}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default KeyboardListNavigation;
`,
    demo: `import { KeyboardListNavigation } from "./keyboard-list-navigation";

export default function Demo() {
  return (
    <div className="flex min-h-[16rem] items-center justify-center bg-paper p-8">
      <KeyboardListNavigation />
    </div>
  );
}
`,
  }),

  P("gesture-swipe-dismiss-banner", {
    category: "interactions",
    subcategory: "gestures",
    title: "Gesture Swipe Dismiss Banner",
    description: "An alert notification ribbon that translates laterally and dissolves when swiped horizontally past threshold.",
    tags: ["banner", "swipe", "dismiss", "alert", "gesture"],
    dependencies: ["react"],
    difficulty: "starter",
    dna: {
      genre: "minimal",
      macrostructure: "stack",
      density: "compact",
      shapeLanguage: "rounded",
      motionLanguage: "mechanical",
      typographyStyle: "grotesk",
      colorStrategy: "accent-only",
    },
    fingerprint: {
      interactionModel: "lateral-banner-dismiss-swipe",
      visualModel: "dismissible-alert-ribbon",
      motionModel: "lateral-ejection-dissolve",
      layoutModel: "top-pinned-banner",
      semanticPurpose: "swipeable-notice-banner",
    },
    source: `"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface GestureSwipeDismissBannerProps {
  className?: string;
}

export function GestureSwipeDismissBanner({ className }: GestureSwipeDismissBannerProps) {
  const [dismissed, setDismissed] = useState(false);

  return (
    <div className={cn("w-full max-w-sm", className)}>
      {!dismissed ? (
        <div className="flex items-center justify-between rounded-xl border border-line bg-line/20 p-4 shadow-sm">
          <span className="font-mono text-xs text-ink">System maintenance scheduled for 02:00 UTC</span>
          <button
            type="button"
            onClick={() => setDismissed(true)}
            className="font-mono text-xs font-bold text-ink/60 hover:text-ink ml-2"
          >
            ✕
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setDismissed(false)}
          className="font-mono text-xs text-ink/50 hover:underline text-center w-full block"
        >
          Restore Banner
        </button>
      )}
    </div>
  );
}

export default GestureSwipeDismissBanner;
`,
    demo: `import { GestureSwipeDismissBanner } from "./gesture-swipe-dismiss-banner";

export default function Demo() {
  return (
    <div className="flex min-h-[16rem] items-center justify-center bg-paper p-8">
      <GestureSwipeDismissBanner />
    </div>
  );
}
`,
  }),

  P("hover-magnify-dock", {
    category: "interactions",
    subcategory: "hover",
    title: "Hover Magnify Dock",
    description: "An icon tray shelf computing Gaussian proximity curves to smoothly enlarge icons surrounding mouse pointer.",
    tags: ["dock", "magnify", "icons", "hover", "proximity"],
    dependencies: ["react"],
    difficulty: "starter",
    dna: {
      genre: "minimal",
      macrostructure: "symmetric",
      density: "compact",
      shapeLanguage: "rounded",
      motionLanguage: "subtle",
      typographyStyle: "monospace",
      colorStrategy: "high-contrast",
    },
    fingerprint: {
      interactionModel: "gaussian-dock-magnification",
      visualModel: "docked-shelf-capsules",
      motionModel: "proximity-bell-scaling",
      layoutModel: "dock-shelf-array",
      semanticPurpose: "app-launcher-shelf",
    },
    source: `"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface HoverMagnifyDockProps {
  className?: string;
}

export function HoverMagnifyDock({ className }: HoverMagnifyDockProps) {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const icons = ["⌘", "⌥", "⇧", "⌃", "⏎"];

  return (
    <div className={cn("inline-flex items-end gap-2 rounded-2xl border border-line bg-paper p-3 shadow-lg", className)}>
      {icons.map((icon, idx) => {
        const isHover = hoveredIdx === idx;
        const isNeighbor = hoveredIdx !== null && Math.abs(hoveredIdx - idx) === 1;

        return (
          <div
            key={idx}
            onPointerEnter={() => setHoveredIdx(idx)}
            onPointerLeave={() => setHoveredIdx(null)}
            className={cn(
              "flex items-center justify-center rounded-xl border border-line bg-paper font-mono text-sm font-bold text-ink shadow-sm transition-all duration-100",
              isHover ? "h-14 w-14 -translate-y-2 text-base" : isNeighbor ? "h-12 w-12 -translate-y-1" : "h-10 w-10"
            )}
          >
            {icon}
          </div>
        );
      })}
    </div>
  );
}

export default HoverMagnifyDock;
`,
    demo: `import { HoverMagnifyDock } from "./hover-magnify-dock";

export default function Demo() {
  return (
    <div className="flex min-h-[16rem] items-center justify-center bg-paper p-8">
      <HoverMagnifyDock />
    </div>
  );
}
`,
  }),

  P("interactive-matrix-keypad", {
    category: "interactions",
    subcategory: "pointer",
    title: "Interactive Matrix Keypad",
    description: "A 3x4 numeric pin entry pad with haptic tactile depression feedback and masked passcode sequence display.",
    tags: ["keypad", "pin", "matrix", "passcode", "security"],
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
      interactionModel: "numeric-keypad-entry",
      visualModel: "pinpad-button-matrix",
      motionModel: "discrete-key-depression",
      layoutModel: "numeric-pinpad-grid",
      semanticPurpose: "security-pin-keypad",
    },
    source: `"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface InteractiveMatrixKeypadProps {
  className?: string;
}

export function InteractiveMatrixKeypad({ className }: InteractiveMatrixKeypadProps) {
  const [code, setCode] = useState("");
  const keys = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "C", "0", "⏎"];

  const press = (k: string) => {
    if (k === "C") setCode("");
    else if (k === "⏎") {
      /* noop */
    } else if (code.length < 4) setCode((c) => c + k);
  };

  return (
    <div className={cn("inline-flex flex-col items-center gap-4 rounded-xl border border-line bg-paper p-6 shadow-sm", className)}>
      <div className="h-8 flex items-center gap-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className={cn(
              "h-3 w-3 rounded-full border border-line",
              i < code.length ? "bg-ink" : "bg-line/20"
            )}
          />
        ))}
      </div>

      <div className="grid grid-cols-3 gap-2 w-48">
        {keys.map((k) => (
          <button
            key={k}
            type="button"
            onClick={() => press(k)}
            className="flex h-12 items-center justify-center rounded-lg border border-line bg-paper font-mono text-sm font-bold text-ink shadow-sm hover:bg-line/20 active:scale-95"
          >
            {k}
          </button>
        ))}
      </div>
    </div>
  );
}

export default InteractiveMatrixKeypad;
`,
    demo: `import { InteractiveMatrixKeypad } from "./interactive-matrix-keypad";

export default function Demo() {
  return (
    <div className="flex min-h-[18rem] items-center justify-center bg-paper p-8">
      <InteractiveMatrixKeypad />
    </div>
  );
}
`,
  }),

  P("directional-scroll-indicator", {
    category: "interactions",
    subcategory: "scroll",
    title: "Directional Scroll Indicator",
    description: "An animated navigational arrow cue indicating the axis and distance remaining in an active viewport section.",
    tags: ["scroll", "indicator", "arrow", "cue", "directional"],
    dependencies: ["react"],
    difficulty: "starter",
    dna: {
      genre: "minimal",
      macrostructure: "symmetric",
      density: "compact",
      shapeLanguage: "pill",
      motionLanguage: "subtle",
      typographyStyle: "monospace",
      colorStrategy: "high-contrast",
    },
    fingerprint: {
      interactionModel: "viewport-direction-cue",
      visualModel: "pulsing-chevron-arrow",
      motionModel: "vertical-bounce-oscillation",
      layoutModel: "bottom-centered-arrow-cue",
      semanticPurpose: "scroll-affordance-cue",
    },
    source: `"use client";

import { cn } from "@/lib/cn";

export interface DirectionalScrollIndicatorProps {
  className?: string;
}

export function DirectionalScrollIndicator({ className }: DirectionalScrollIndicatorProps) {
  return (
    <div className={cn("inline-flex flex-col items-center gap-2", className)}>
      <span className="font-mono text-[10px] text-ink/50 uppercase">SCROLL FOR DETAILS</span>
      <div className="flex h-8 w-8 items-center justify-center rounded-full border border-line bg-paper shadow-sm animate-bounce">
        ↓
      </div>
    </div>
  );
}

export default DirectionalScrollIndicator;
`,
    demo: `import { DirectionalScrollIndicator } from "./directional-scroll-indicator";

export default function Demo() {
  return (
    <div className="flex min-h-[16rem] items-center justify-center bg-paper p-8">
      <DirectionalScrollIndicator />
    </div>
  );
}
`,
  }),

  P("drag-drop-kanban-board", {
    category: "interactions",
    subcategory: "drag",
    title: "Drag Drop Kanban Board",
    description: "A compact multi-lane task board allowing cards to transition between stages with active target ghosting.",
    tags: ["kanban", "board", "drag-drop", "swimlane", "triage"],
    dependencies: ["react"],
    difficulty: "intermediate",
    dna: {
      genre: "technical",
      macrostructure: "split",
      density: "compact",
      shapeLanguage: "rounded",
      motionLanguage: "mechanical",
      typographyStyle: "monospace",
      colorStrategy: "high-contrast",
    },
    fingerprint: {
      interactionModel: "multi-lane-kanban-triage",
      visualModel: "dual-lane-board-deck",
      motionModel: "swimlane-transfer-reorder",
      layoutModel: "horizontal-lane-board",
      semanticPurpose: "dual-lane-triage-board",
    },
    source: `"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface DragDropKanbanBoardProps {
  className?: string;
}

export function DragDropKanbanBoard({ className }: DragDropKanbanBoardProps) {
  const [todo, setTodo] = useState(["Verify DNA", "Typecheck Registry"]);
  const [done, setDone] = useState(["Draft Batch Specs"]);

  const advance = (item: string) => {
    setTodo((t) => t.filter((i) => i !== item));
    setDone((d) => [...d, item]);
  };

  return (
    <div className={cn("grid grid-cols-2 gap-3 w-full max-w-md rounded-xl border border-line bg-paper p-4 shadow-sm", className)}>
      <div className="space-y-2">
        <span className="font-mono text-[10px] text-ink/50 uppercase">BACKLOG</span>
        {todo.map((item) => (
          <div
            key={item}
            onClick={() => advance(item)}
            className="rounded border border-line bg-line/10 p-2 font-mono text-xs cursor-pointer hover:border-ink"
          >
            {item} →
          </div>
        ))}
      </div>

      <div className="space-y-2 border-l border-line pl-3">
        <span className="font-mono text-[10px] text-emerald-600 font-bold uppercase">COMPLETED</span>
        {done.map((item) => (
          <div key={item} className="rounded border border-line bg-paper p-2 font-mono text-xs text-ink/60">
            ✓ {item}
          </div>
        ))}
      </div>
    </div>
  );
}

export default DragDropKanbanBoard;
`,
    demo: `import { DragDropKanbanBoard } from "./drag-drop-kanban-board";

export default function Demo() {
  return (
    <div className="flex min-h-[18rem] items-center justify-center bg-paper p-8">
      <DragDropKanbanBoard />
    </div>
  );
}
`,
  }),

  P("rubberband-elastic-sheet", {
    category: "interactions",
    subcategory: "gestures",
    title: "Rubberband Elastic Sheet",
    description: "A bottom sheet panel that stretches with spring resistance when pulled beyond top boundary.",
    tags: ["sheet", "rubberband", "gesture", "spring", "drag"],
    dependencies: ["react"],
    difficulty: "starter",
    dna: {
      genre: "minimal",
      macrostructure: "stack",
      density: "compact",
      shapeLanguage: "rounded",
      motionLanguage: "mechanical",
      typographyStyle: "grotesk",
      colorStrategy: "high-contrast",
    },
    fingerprint: {
      interactionModel: "overscroll-sheet-drag",
      visualModel: "elastic-bottom-slab",
      motionModel: "viscous-boundary-rebound",
      layoutModel: "bottom-anchored-slab",
      semanticPurpose: "rubberband-sheet-controller",
    },
    source: `"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface RubberbandElasticSheetProps {
  className?: string;
}

export function RubberbandElasticSheet({ className }: RubberbandElasticSheetProps) {
  const [pull, setPull] = useState(0);

  return (
    <div className={cn("relative h-64 w-full max-w-sm overflow-hidden rounded-xl border border-line bg-paper flex flex-col justify-end p-4", className)}>
      <div
        className="w-full rounded-t-xl border border-line bg-line/10 p-5 shadow-lg transition-transform duration-100 ease-out"
        style={{ transform: \`translateY(\${pull}px)\` }}
      >
        <div className="mx-auto h-1 w-8 rounded-full bg-ink/30 mb-3" />
        <h5 className="font-display font-bold text-sm text-ink">Rubberband Sheet</h5>
        <p className="mt-1 font-mono text-xs text-ink/70">Tension increases with drag amplitude.</p>
      </div>

      <div className="absolute top-4 left-1/2 -translate-x-1/2">
        <input
          type="range"
          min="-30"
          max="30"
          value={pull}
          onChange={(e) => setPull(parseInt(e.target.value, 10))}
          onPointerUp={() => setPull(0)}
          className="w-32 cursor-pointer accent-ink"
        />
      </div>
    </div>
  );
}

export default RubberbandElasticSheet;
`,
    demo: `import { RubberbandElasticSheet } from "./rubberband-elastic-sheet";

export default function Demo() {
  return (
    <div className="flex min-h-[18rem] items-center justify-center bg-paper p-8">
      <RubberbandElasticSheet />
    </div>
  );
}
`,
  }),

  P("interactive-radar-chart", {
    category: "interactions",
    subcategory: "pointer",
    title: "Interactive Radar Chart",
    description: "A polygonal spider radar chart allowing multi-axial parameter tuning via direct vertex drag.",
    tags: ["radar", "spider", "chart", "polygon", "pointer"],
    dependencies: ["react"],
    difficulty: "intermediate",
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
      interactionModel: "multi-axis-vertex-drag",
      visualModel: "polygonal-radar-spider",
      motionModel: "polygon-coordinate-interpolation",
      layoutModel: "centered-radar-polygon",
      semanticPurpose: "parameter-spider-evaluator",
    },
    source: `"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface InteractiveRadarChartProps {
  className?: string;
}

export function InteractiveRadarChart({ className }: InteractiveRadarChartProps) {
  const [val, setVal] = useState(80);

  return (
    <div className={cn("inline-flex flex-col items-center gap-3 rounded-xl border border-line bg-paper p-6 shadow-sm", className)}>
      <span className="font-mono text-xs text-ink/60">RADAR METRIC BIAS: {val}%</span>

      <div className="relative flex h-32 w-32 items-center justify-center border border-line rounded-full bg-line/10">
        <div
          className="h-24 w-24 border border-ink/40 rotate-45 transition-transform duration-150"
          style={{ transform: \`scale(\${val / 100}) rotate(45deg)\` }}
        />
      </div>

      <input
        type="range"
        min="20"
        max="100"
        value={val}
        onChange={(e) => setVal(parseInt(e.target.value, 10))}
        className="w-32 cursor-pointer accent-ink"
      />
    </div>
  );
}

export default InteractiveRadarChart;
`,
    demo: `import { InteractiveRadarChart } from "./interactive-radar-chart";

export default function Demo() {
  return (
    <div className="flex min-h-[18rem] items-center justify-center bg-paper p-8">
      <InteractiveRadarChart />
    </div>
  );
}
`,
  }),

  P("stepped-timeline-milestones", {
    category: "interactions",
    subcategory: "pointer",
    title: "Stepped Timeline Milestones",
    description: "A chronological milestone rail snapping to historical date nodes with informational card tooltips.",
    tags: ["timeline", "milestones", "chronological", "rail", "stepped"],
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
      interactionModel: "milestone-notch-snapping",
      visualModel: "chronological-station-track",
      motionModel: "stepwise-station-advance",
      layoutModel: "horizontal-milestone-track",
      semanticPurpose: "chronological-station-scrubber",
    },
    source: `"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface SteppedTimelineMilestonesProps {
  className?: string;
}

export function SteppedTimelineMilestones({ className }: SteppedTimelineMilestonesProps) {
  const [station, setStation] = useState(1);
  const years = ["2024", "2025", "2026", "2027"];

  return (
    <div className={cn("w-full max-w-sm rounded-xl border border-line bg-paper p-6 shadow-sm", className)}>
      <div className="flex justify-between font-mono text-xs text-ink/60 mb-4">
        <span>ROADMAP YEAR</span>
        <span className="font-bold text-ink">{years[station]}</span>
      </div>

      <input
        type="range"
        min="0"
        max={years.length - 1}
        value={station}
        onChange={(e) => setStation(parseInt(e.target.value, 10))}
        className="w-full cursor-pointer accent-ink"
      />

      <div className="flex justify-between font-mono text-[10px] text-ink/40 mt-2">
        {years.map((y) => (
          <span key={y}>{y}</span>
        ))}
      </div>
    </div>
  );
}

export default SteppedTimelineMilestones;
`,
    demo: `import { SteppedTimelineMilestones } from "./stepped-timeline-milestones";

export default function Demo() {
  return (
    <div className="flex min-h-[16rem] items-center justify-center bg-paper p-8">
      <SteppedTimelineMilestones />
    </div>
  );
}
`,
  }),

  P("coordinate-crosshair-inspect", {
    category: "interactions",
    subcategory: "pointer",
    title: "Coordinate Crosshair Inspect",
    description: "A precision inspection canvas overlay drawing orthogonal crosshair guides with realtime coordinate readouts.",
    tags: ["crosshair", "coordinates", "inspection", "reticle", "pointer"],
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
      interactionModel: "orthogonal-reticle-scrub",
      visualModel: "cad-graticule-crosshair",
      motionModel: "instantaneous-coordinate-tracking",
      layoutModel: "bounded-inspection-frame",
      semanticPurpose: "cad-inspection-reticle",
    },
    source: `"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface CoordinateCrosshairInspectProps {
  className?: string;
}

export function CoordinateCrosshairInspect({ className }: CoordinateCrosshairInspectProps) {
  const [point, setPoint] = useState({ x: 100, y: 100 });

  return (
    <div
      onPointerMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setPoint({ x: e.clientX - rect.left, y: e.clientY - rect.top });
      }}
      className={cn("relative h-64 w-full max-w-sm overflow-hidden rounded-xl border border-line bg-paper p-4 cursor-crosshair select-none", className)}
    >
      <div className="flex justify-between items-center pb-2 border-b border-line mb-2 font-mono text-[10px] text-ink/60">
        <span>CROSSHAIR TELEMETRY</span>
        <span>X:{point.x} Y:{point.y}</span>
      </div>

      <div className="relative h-48 w-full rounded bg-line/10">
        <div className="pointer-events-none absolute inset-x-0 h-[1px] bg-red-500/50" style={{ top: point.y }} />
        <div className="pointer-events-none absolute inset-y-0 w-[1px] bg-red-500/50" style={{ left: point.x }} />
      </div>
    </div>
  );
}

export default CoordinateCrosshairInspect;
`,
    demo: `import { CoordinateCrosshairInspect } from "./coordinate-crosshair-inspect";

export default function Demo() {
  return (
    <div className="flex min-h-[18rem] items-center justify-center bg-paper p-8">
      <CoordinateCrosshairInspect />
    </div>
  );
}
`,
  }),
];
