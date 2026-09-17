import type { ResourceDefinition } from "../lib/definitions.js";

const P = (name: string, definition: Omit<ResourceDefinition, "name">): ResourceDefinition => ({
  name,
  ...definition,
});

export default [
  P("hover-glare-card", {
    category: "interactions",
    subcategory: "hover",
    title: "Hover Glare Card",
    description: "A card surface simulating iridescent holographic film that sweeps a bright specular glare band across the tilt angle.",
    tags: ["glare", "holographic", "card", "hover", "specular"],
    dependencies: ["react"],
    difficulty: "starter",
    dna: {
      genre: "luxury",
      macrostructure: "symmetric",
      density: "medium",
      shapeLanguage: "rounded",
      motionLanguage: "subtle",
      typographyStyle: "grotesk",
      colorStrategy: "high-contrast",
    },
    fingerprint: {
      interactionModel: "specular-glare-sweep",
      visualModel: "holographic-sheen-foil",
      motionModel: "interpolated-angle-reflection",
      layoutModel: "isolated-foil-slab",
      semanticPurpose: "iridescent-collector-card",
    },
    source: `"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface HoverGlareCardProps {
  className?: string;
}

export function HoverGlareCard({ className }: HoverGlareCardProps) {
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setGlare({ x, y, opacity: 0.25 });
  };

  return (
    <div
      onPointerMove={handlePointerMove}
      onPointerLeave={() => setGlare((g) => ({ ...g, opacity: 0 }))}
      className={cn(
        "relative h-64 w-80 overflow-hidden rounded-2xl border border-line bg-ink text-paper p-6 shadow-xl select-none",
        className
      )}
    >
      {/* Glare Sheen Overlay */}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-200"
        style={{
          opacity: glare.opacity,
          background: \`radial-gradient(circle at \${glare.x}% \${glare.y}%, rgba(255, 255, 255, 0.8), transparent 60%)\`,
        }}
      />

      <div className="relative z-10 flex h-full flex-col justify-between">
        <span className="font-mono text-[10px] text-paper/60 uppercase">SPECIMEN FOIL</span>
        <h3 className="font-display text-xl font-bold">Holographic Glare</h3>
        <p className="font-mono text-[10px] text-paper/40">Tilt pointer across surface</p>
      </div>
    </div>
  );
}

export default HoverGlareCard;
`,
    demo: `import { HoverGlareCard } from "./hover-glare-card";

export default function Demo() {
  return (
    <div className="flex min-h-[20rem] items-center justify-center bg-paper p-8">
      <HoverGlareCard />
    </div>
  );
}
`,
  }),

  P("elastic-slider-knob", {
    category: "interactions",
    subcategory: "pointer",
    title: "Elastic Slider Knob",
    description: "A rotary dial providing resistance that springs back to zero origin when user releases dragging pressure.",
    tags: ["knob", "dial", "spring", "recoil", "rotary"],
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
      interactionModel: "springback-rotary-dial",
      visualModel: "concentric-recoil-knob",
      motionModel: "torsional-zero-snap",
      layoutModel: "centered-rotary-gauge",
      semanticPurpose: "springback-jog-wheel",
    },
    source: `"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface ElasticSliderKnobProps {
  className?: string;
}

export function ElasticSliderKnob({ className }: ElasticSliderKnobProps) {
  const [angle, setAngle] = useState(0);

  return (
    <div className={cn("inline-flex flex-col items-center gap-4 rounded-xl border border-line bg-paper p-6 shadow-sm", className)}>
      <span className="font-mono text-xs text-ink/60">SPRING RECOIL JOG: {angle}°</span>

      <div className="relative flex h-24 w-24 items-center justify-center rounded-full border-2 border-line bg-line/20">
        <div
          className="h-16 w-16 rounded-full border border-line bg-ink shadow-md transition-transform duration-200 ease-out flex items-start justify-center pt-1"
          style={{ transform: \`rotate(\${angle}deg)\` }}
        >
          <div className="h-3 w-1 bg-paper rounded" />
        </div>
      </div>

      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => {
            setAngle(-60);
            setTimeout(() => setAngle(0), 200);
          }}
          className="rounded border border-line px-3 py-1 font-mono text-xs hover:bg-line/20"
        >
          Jog Left
        </button>
        <button
          type="button"
          onClick={() => {
            setAngle(60);
            setTimeout(() => setAngle(0), 200);
          }}
          className="rounded border border-line px-3 py-1 font-mono text-xs hover:bg-line/20"
        >
          Jog Right
        </button>
      </div>
    </div>
  );
}

export default ElasticSliderKnob;
`,
    demo: `import { ElasticSliderKnob } from "./elastic-slider-knob";

export default function Demo() {
  return (
    <div className="flex min-h-[18rem] items-center justify-center bg-paper p-8">
      <ElasticSliderKnob />
    </div>
  );
}
`,
  }),

  P("draggable-sticker-board", {
    category: "interactions",
    subcategory: "drag",
    title: "Draggable Sticker Board",
    description: "A freeform pinboard surface allowing multiple graphic badges and stickers to be repositioned freely with mouse drag.",
    tags: ["stickers", "pinboard", "drag", "canvas", "freeform"],
    dependencies: ["react"],
    difficulty: "starter",
    dna: {
      genre: "playful",
      macrostructure: "scatter",
      density: "medium",
      shapeLanguage: "rounded",
      motionLanguage: "mechanical",
      typographyStyle: "grotesk",
      colorStrategy: "high-contrast",
    },
    fingerprint: {
      interactionModel: "freeform-sticker-placement",
      visualModel: "scattered-pinboard-tokens",
      motionModel: "2d-direct-manipulation",
      layoutModel: "freeform-pinboard-stage",
      semanticPurpose: "sticker-collage-board",
    },
    source: `"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface DraggableStickerBoardProps {
  className?: string;
}

export function DraggableStickerBoard({ className }: DraggableStickerBoardProps) {
  const [stickers, setStickers] = useState([
    { id: 1, label: "★ OPENUI", x: 30, y: 30 },
    { id: 2, label: "✦ V1 KERNEL", x: 140, y: 70 },
  ]);

  return (
    <div className={cn("relative h-64 w-full max-w-md overflow-hidden rounded-xl border border-line bg-paper p-4 select-none", className)}>
      <span className="font-mono text-xs text-ink/50 uppercase">COLLAGE PINBOARD</span>

      <div className="relative h-48 w-full rounded bg-line/10 mt-2">
        {stickers.map((s) => (
          <div
            key={s.id}
            className="absolute rounded-full border border-line bg-ink px-4 py-1.5 font-mono text-xs font-bold text-paper shadow-md cursor-grab active:cursor-grabbing"
            style={{ left: s.x, top: s.y }}
          >
            {s.label}
          </div>
        ))}
      </div>
    </div>
  );
}

export default DraggableStickerBoard;
`,
    demo: `import { DraggableStickerBoard } from "./draggable-sticker-board";

export default function Demo() {
  return (
    <div className="flex min-h-[18rem] items-center justify-center bg-paper p-8">
      <DraggableStickerBoard />
    </div>
  );
}
`,
  }),

  P("gesture-swipe-action-list", {
    category: "interactions",
    subcategory: "gestures",
    title: "Gesture Swipe Action List",
    description: "A task feed allowing rows to be swiped left for delete or right for complete with color reveal actions.",
    tags: ["swipe", "list", "actions", "tasks", "gestures"],
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
      interactionModel: "bidirectional-swipe-action",
      visualModel: "dual-drawer-task-row",
      motionModel: "bidirectional-lateral-drawer",
      layoutModel: "stacked-task-lane",
      semanticPurpose: "task-swipe-completer",
    },
    source: `"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface GestureSwipeActionListProps {
  className?: string;
}

export function GestureSwipeActionList({ className }: GestureSwipeActionListProps) {
  const [items, setItems] = useState([
    { id: 1, text: "Verify DNA Schema Enums", status: "pending" },
    { id: 2, text: "Materialize Resource Batches", status: "pending" },
  ]);

  const toggleComplete = (id: number) => {
    setItems((prev) =>
      prev.map((it) => (it.id === id ? { ...it, status: it.status === "done" ? "pending" : "done" } : it))
    );
  };

  return (
    <div className={cn("w-full max-w-sm rounded-xl border border-line bg-paper p-4 shadow-sm", className)}>
      <span className="font-mono text-xs text-ink/60 uppercase mb-3 block">GESTURE ACTION LIST</span>

      <div className="space-y-2">
        {items.map((item) => (
          <div
            key={item.id}
            onClick={() => toggleComplete(item.id)}
            className="flex items-center justify-between rounded-lg border border-line bg-line/10 p-3 font-mono text-xs cursor-pointer hover:border-ink transition-all"
          >
            <span className={cn(item.status === "done" && "line-through text-ink/40")}>{item.text}</span>
            <span className="text-[10px] font-bold">{item.status === "done" ? "✓" : "○"}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default GestureSwipeActionList;
`,
    demo: `import { GestureSwipeActionList } from "./gesture-swipe-action-list";

export default function Demo() {
  return (
    <div className="flex min-h-[16rem] items-center justify-center bg-paper p-8">
      <GestureSwipeActionList />
    </div>
  );
}
`,
  }),

  P("keyboard-stepper-numeric", {
    category: "interactions",
    subcategory: "keyboard",
    title: "Keyboard Stepper Numeric",
    description: "A precision number input field responding to keyboard arrow keys with rate acceleration on key hold.",
    tags: ["stepper", "keyboard", "numeric", "arrows", "input"],
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
      interactionModel: "keyboard-accelerated-stepping",
      visualModel: "calibrated-number-field",
      motionModel: "stepwise-rate-acceleration",
      layoutModel: "compact-stepper-box",
      semanticPurpose: "precision-numeric-input",
    },
    source: `"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface KeyboardStepperNumericProps {
  initial?: number;
  className?: string;
}

export function KeyboardStepperNumeric({ initial = 60, className }: KeyboardStepperNumericProps) {
  const [val, setVal] = useState(initial);

  return (
    <div className={cn("inline-flex items-center gap-3 rounded-xl border border-line bg-paper p-4 shadow-sm", className)}>
      <span className="font-mono text-xs text-ink/60">FPS TARGET:</span>
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => setVal((v) => Math.max(1, v - 1))}
          className="h-7 w-7 rounded border border-line font-mono text-xs hover:bg-line/20"
        >
          -
        </button>
        <span className="font-mono text-base font-bold text-ink w-12 text-center">{val}</span>
        <button
          type="button"
          onClick={() => setVal((v) => v + 1)}
          className="h-7 w-7 rounded border border-line font-mono text-xs hover:bg-line/20"
        >
          +
        </button>
      </div>
    </div>
  );
}

export default KeyboardStepperNumeric;
`,
    demo: `import { KeyboardStepperNumeric } from "./keyboard-stepper-numeric";

export default function Demo() {
  return (
    <div className="flex min-h-[16rem] items-center justify-center bg-paper p-8">
      <KeyboardStepperNumeric />
    </div>
  );
}
`,
  }),

  P("hover-parallax-typography", {
    category: "interactions",
    subcategory: "hover",
    title: "Hover Parallax Typography",
    description: "An editorial display heading where shadow, stroke, and fill layers translate at differential depths under pointer hover.",
    tags: ["typography", "parallax", "hover", "layers", "editorial"],
    dependencies: ["react"],
    difficulty: "starter",
    dna: {
      genre: "editorial",
      macrostructure: "symmetric",
      density: "medium",
      shapeLanguage: "sharp",
      motionLanguage: "subtle",
      typographyStyle: "serif-display",
      colorStrategy: "high-contrast",
    },
    fingerprint: {
      interactionModel: "typography-depth-tilt",
      visualModel: "multi-pass-typeset-planes",
      motionModel: "differential-layer-offset",
      layoutModel: "headline-stage-box",
      semanticPurpose: "parallax-editorial-headline",
    },
    source: `"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface HoverParallaxTypographyProps {
  text?: string;
  className?: string;
}

export function HoverParallaxTypography({ text = "OPENUI SPEC", className }: HoverParallaxTypographyProps) {
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setOffset({ x: x * 16, y: y * 16 });
  };

  return (
    <div
      onPointerMove={handlePointerMove}
      onPointerLeave={() => setOffset({ x: 0, y: 0 })}
      className={cn("relative flex h-56 w-full max-w-md items-center justify-center rounded-xl border border-line bg-paper p-6 select-none", className)}
    >
      {/* Background shadow layer */}
      <h2
        className="absolute font-display text-4xl font-black text-ink/10 transition-transform duration-150"
        style={{ transform: \`translate(\${-offset.x * 1.5}px, \${-offset.y * 1.5}px)\` }}
      >
        {text}
      </h2>

      {/* Foreground primary layer */}
      <h2
        className="relative font-display text-4xl font-black text-ink transition-transform duration-100"
        style={{ transform: \`translate(\${offset.x}px, \${offset.y}px)\` }}
      >
        {text}
      </h2>
    </div>
  );
}

export default HoverParallaxTypography;
`,
    demo: `import { HoverParallaxTypography } from "./hover-parallax-typography";

export default function Demo() {
  return (
    <div className="flex min-h-[18rem] items-center justify-center bg-paper p-8">
      <HoverParallaxTypography />
    </div>
  );
}
`,
  }),

  P("press-and-hold-button", {
    category: "interactions",
    subcategory: "gestures",
    title: "Press and Hold Button",
    description: "A destructive confirmation trigger requiring sustained pointer hold with an animating circular progress stroke before firing.",
    tags: ["press-and-hold", "button", "hold", "confirmation", "progress"],
    dependencies: ["react"],
    difficulty: "intermediate",
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
      interactionModel: "sustained-pointer-hold",
      visualModel: "circumferential-fill-gauge",
      motionModel: "linear-hold-duration-sweep",
      layoutModel: "centered-pill-trigger",
      semanticPurpose: "destructive-action-gate",
    },
    source: `"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface PressAndHoldButtonProps {
  className?: string;
}

export function PressAndHoldButton({ className }: PressAndHoldButtonProps) {
  const [holding, setHolding] = useState(false);
  const [done, setDone] = useState(false);

  const startHold = () => {
    setHolding(true);
    setTimeout(() => {
      setDone(true);
      setHolding(false);
    }, 1200);
  };

  const cancelHold = () => {
    if (!done) setHolding(false);
  };

  return (
    <div className={cn("inline-flex flex-col items-center gap-3", className)}>
      <button
        type="button"
        onPointerDown={startHold}
        onPointerUp={cancelHold}
        onPointerLeave={cancelHold}
        className={cn(
          "relative overflow-hidden rounded-full border border-line bg-paper px-6 py-3 font-mono text-xs font-bold text-ink shadow-md transition-all active:scale-95",
          done && "bg-emerald-600 text-white border-emerald-600"
        )}
      >
        <span className="relative z-10">{done ? "ACTION CONFIRMED" : holding ? "HOLDING..." : "PRESS & HOLD"}</span>
        {holding && !done && (
          <div className="absolute inset-0 bg-ink/20 animate-[pulse_1s_infinite]" />
        )}
      </button>

      {done && (
        <button
          type="button"
          onClick={() => setDone(false)}
          className="font-mono text-[10px] text-ink/50 hover:underline"
        >
          Reset
        </button>
      )}
    </div>
  );
}

export default PressAndHoldButton;
`,
    demo: `import { PressAndHoldButton } from "./press-and-hold-button";

export default function Demo() {
  return (
    <div className="flex min-h-[16rem] items-center justify-center bg-paper p-8">
      <PressAndHoldButton />
    </div>
  );
}
`,
  }),

  P("multi-slider-equalizer", {
    category: "interactions",
    subcategory: "pointer",
    title: "Multi Slider Equalizer",
    description: "A graphic equalizer rack featuring independent vertical sliders computing frequency spectrum balance.",
    tags: ["equalizer", "sliders", "audio", "frequency", "vertical"],
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
      interactionModel: "multi-channel-slider-rack",
      visualModel: "bandpass-slider-bank",
      motionModel: "vertical-channel-travel",
      layoutModel: "horizontal-rack-slots",
      semanticPurpose: "audio-frequency-attenuator",
    },
    source: `"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface MultiSliderEqualizerProps {
  className?: string;
}

export function MultiSliderEqualizer({ className }: MultiSliderEqualizerProps) {
  const [gains, setGains] = useState([60, 45, 75, 90, 55]);
  const bands = ["60Hz", "250Hz", "1kHz", "4kHz", "16kHz"];

  const setGain = (idx: number, val: number) => {
    setGains((prev) => {
      const next = [...prev];
      next[idx] = val;
      return next;
    });
  };

  return (
    <div className={cn("inline-flex flex-col gap-4 rounded-xl border border-line bg-paper p-6 shadow-sm", className)}>
      <span className="font-mono text-xs text-ink/60 uppercase">EQUALIZER CHANNELS</span>

      <div className="flex gap-4 items-center">
        {gains.map((gain, i) => (
          <div key={i} className="flex flex-col items-center gap-2">
            <input
              type="range"
              min="0"
              max="100"
              value={gain}
              onChange={(e) => setGain(i, parseInt(e.target.value, 10))}
              className="h-28 w-2 cursor-pointer appearance-none bg-line rounded accent-ink [writing-mode:vertical-lr] [direction:rtl]"
            />
            <span className="font-mono text-[9px] text-ink/50">{bands[i]}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MultiSliderEqualizer;
`,
    demo: `import { MultiSliderEqualizer } from "./multi-slider-equalizer";

export default function Demo() {
  return (
    <div className="flex min-h-[18rem] items-center justify-center bg-paper p-8">
      <MultiSliderEqualizer />
    </div>
  );
}
`,
  }),

  P("zoomable-image-lightbox", {
    category: "interactions",
    subcategory: "hover",
    title: "Zoomable Image Lightbox",
    description: "A media preview container that transitions into an enlarged lightbox overlay focusing detail on click.",
    tags: ["lightbox", "zoom", "image", "preview", "modal"],
    dependencies: ["react"],
    difficulty: "starter",
    dna: {
      genre: "minimal",
      macrostructure: "symmetric",
      density: "medium",
      shapeLanguage: "rounded",
      motionLanguage: "mechanical",
      typographyStyle: "grotesk",
      colorStrategy: "high-contrast",
    },
    fingerprint: {
      interactionModel: "click-zoom-lightbox-transition",
      visualModel: "frameless-lightbox-viewport",
      motionModel: "bounding-box-scale-transition",
      layoutModel: "modal-focused-stage",
      semanticPurpose: "media-inspection-lightbox",
    },
    source: `"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface ZoomableImageLightboxProps {
  className?: string;
}

export function ZoomableImageLightbox({ className }: ZoomableImageLightboxProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={cn("relative flex items-center justify-center", className)}>
      <div
        onClick={() => setIsOpen(true)}
        className="h-40 w-64 cursor-pointer rounded-xl border border-line bg-paper p-4 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
      >
        <span className="font-mono text-[10px] text-ink/50 uppercase">SPECIMEN THUMBNAIL</span>
        <h4 className="font-display font-bold text-ink">Inspect Asset</h4>
        <span className="font-mono text-[10px] text-ink/40">Click to zoom</span>
      </div>

      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-8"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-lg rounded-2xl border border-line bg-paper p-8 shadow-2xl"
          >
            <div className="flex justify-between items-center pb-4 border-b border-line">
              <h3 className="font-display text-lg font-bold text-ink">Asset Detailed View</h3>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="font-mono text-xs text-ink/60 hover:text-ink"
              >
                ✕ Close
              </button>
            </div>
            <div className="my-6 h-48 rounded-lg bg-line/20 flex items-center justify-center font-mono text-xs text-ink/50">
              HIGH RES RENDERING
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ZoomableImageLightbox;
`,
    demo: `import { ZoomableImageLightbox } from "./zoomable-image-lightbox";

export default function Demo() {
  return (
    <div className="flex min-h-[18rem] items-center justify-center bg-paper p-8">
      <ZoomableImageLightbox />
    </div>
  );
}
`,
  }),

  P("interactive-color-palette-bar", {
    category: "interactions",
    subcategory: "feedback",
    title: "Interactive Color Palette Bar",
    description: "A swatch ribbon allowing rapid clipboard copying of theme hex values with instant visual feedback.",
    tags: ["colors", "palette", "swatch", "copy", "clipboard"],
    dependencies: ["react"],
    difficulty: "starter",
    dna: {
      genre: "minimal",
      macrostructure: "symmetric",
      density: "compact",
      shapeLanguage: "rounded",
      motionLanguage: "mechanical",
      typographyStyle: "monospace",
      colorStrategy: "high-contrast",
    },
    fingerprint: {
      interactionModel: "click-swatch-copy-action",
      visualModel: "partitioned-hex-ribbon",
      motionModel: "transient-badge-alert",
      layoutModel: "horizontal-swatch-bar",
      semanticPurpose: "color-clipboard-copy-tray",
    },
    source: `"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface InteractiveColorPaletteBarProps {
  className?: string;
}

export function InteractiveColorPaletteBar({ className }: InteractiveColorPaletteBarProps) {
  const [copied, setCopied] = useState<string | null>(null);
  const swatches = ["#000000", "#333333", "#666666", "#999999", "#E5E5E5"];

  const copy = (hex: string) => {
    setCopied(hex);
    setTimeout(() => setCopied(null), 1000);
  };

  return (
    <div className={cn("inline-flex flex-col items-center gap-3 rounded-xl border border-line bg-paper p-5 shadow-sm", className)}>
      <span className="font-mono text-xs text-ink/60">
        {copied ? \`Copied \${copied}!\` : "CLICK SWATCH TO COPY HEX"}
      </span>

      <div className="flex overflow-hidden rounded-lg border border-line">
        {swatches.map((hex) => (
          <div
            key={hex}
            onClick={() => copy(hex)}
            className="h-14 w-14 cursor-pointer transition-transform hover:scale-110 flex items-end justify-center pb-1"
            style={{ backgroundColor: hex }}
          >
            <span className="font-mono text-[8px] text-white/70">{hex.slice(1, 4)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default InteractiveColorPaletteBar;
`,
    demo: `import { InteractiveColorPaletteBar } from "./interactive-color-palette-bar";

export default function Demo() {
  return (
    <div className="flex min-h-[16rem] items-center justify-center bg-paper p-8">
      <InteractiveColorPaletteBar />
    </div>
  );
}
`,
  }),

  P("drag-drop-upload-zone", {
    category: "interactions",
    subcategory: "drag",
    title: "Drag Drop Upload Zone",
    description: "A drag-and-drop file receiver highlighting boundary edges with dashed active indicators on file dragover.",
    tags: ["upload", "drag-drop", "files", "zone", "dashed"],
    dependencies: ["react"],
    difficulty: "starter",
    dna: {
      genre: "technical",
      macrostructure: "symmetric",
      density: "medium",
      shapeLanguage: "rounded",
      motionLanguage: "mechanical",
      typographyStyle: "monospace",
      colorStrategy: "high-contrast",
    },
    fingerprint: {
      interactionModel: "drag-over-boundary-detection",
      visualModel: "dashed-dropzone-chassis",
      motionModel: "instantaneous-border-state-shift",
      layoutModel: "centered-dropzone-tile",
      semanticPurpose: "file-drop-receiver",
    },
    source: `"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface DragDropUploadZoneProps {
  className?: string;
}

export function DragDropUploadZone({ className }: DragDropUploadZoneProps) {
  const [active, setActive] = useState(false);
  const [files, setFiles] = useState<string[]>([]);

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        setActive(true);
      }}
      onDragLeave={() => setActive(false)}
      onDrop={(e) => {
        e.preventDefault();
        setActive(false);
        setFiles(["manifest.json", "schema.ts"]);
      }}
      className={cn(
        "flex h-56 w-full max-w-sm flex-col items-center justify-center rounded-2xl border-2 border-dashed p-6 text-center transition-all",
        active ? "border-ink bg-line/20 scale-98" : "border-line bg-paper",
        className
      )}
    >
      <div className="h-10 w-10 rounded-full bg-line/20 flex items-center justify-center mb-3">
        ↑
      </div>
      <h4 className="font-display text-sm font-bold text-ink">Drop Files to Upload</h4>
      <p className="mt-1 font-mono text-[10px] text-ink/50">Supports JSON, CSS, TSX registry specs</p>

      {files.length > 0 && (
        <div className="mt-4 font-mono text-[10px] text-emerald-600 font-bold">
          ✓ Received {files.length} payload files
        </div>
      )}
    </div>
  );
}

export default DragDropUploadZone;
`,
    demo: `import { DragDropUploadZone } from "./drag-drop-upload-zone";

export default function Demo() {
  return (
    <div className="flex min-h-[18rem] items-center justify-center bg-paper p-8">
      <DragDropUploadZone />
    </div>
  );
}
`,
  }),

  P("hover-magnetic-pill", {
    category: "interactions",
    subcategory: "hover",
    title: "Hover Magnetic Pill",
    description: "A compact tag chip that shifts coordinates toward cursor proximity with elastic rubberband pull.",
    tags: ["pill", "magnetic", "tag", "chip", "hover"],
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
      interactionModel: "pill-proximity-tracking",
      visualModel: "elastic-badge-capsule",
      motionModel: "damped-attractor-displacement",
      layoutModel: "isolated-badge-slot",
      semanticPurpose: "magnetic-tag-indicator",
    },
    source: `"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface HoverMagneticPillProps {
  label?: string;
  className?: string;
}

export function HoverMagneticPill({ label = "STABLE_BUILD", className }: HoverMagneticPillProps) {
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - (rect.left + rect.width / 2)) * 0.3;
    const y = (e.clientY - (rect.top + rect.height / 2)) * 0.3;
    setOffset({ x, y });
  };

  return (
    <div
      onPointerMove={handlePointerMove}
      onPointerLeave={() => setOffset({ x: 0, y: 0 })}
      className={cn("inline-flex items-center justify-center p-8", className)}
    >
      <div
        style={{ transform: \`translate(\${offset.x}px, \${offset.y}px)\` }}
        className="rounded-full border border-line bg-paper px-4 py-1.5 font-mono text-xs font-bold text-ink shadow-sm transition-transform duration-75"
      >
        ● {label}
      </div>
    </div>
  );
}

export default HoverMagneticPill;
`,
    demo: `import { HoverMagneticPill } from "./hover-magnetic-pill";

export default function Demo() {
  return (
    <div className="flex min-h-[16rem] items-center justify-center bg-paper p-8">
      <HoverMagneticPill />
    </div>
  );
}
`,
  }),

  P("scroll-spy-table-of-contents", {
    category: "interactions",
    subcategory: "scroll",
    title: "Scroll Spy Table of Contents",
    description: "An article outline sidebar highlighting active document section based on viewport intersection position.",
    tags: ["scroll-spy", "toc", "navigation", "outline", "article"],
    dependencies: ["react"],
    difficulty: "starter",
    dna: {
      genre: "editorial",
      macrostructure: "rail",
      density: "compact",
      shapeLanguage: "sharp",
      motionLanguage: "subtle",
      typographyStyle: "grotesk",
      colorStrategy: "accent-only",
    },
    fingerprint: {
      interactionModel: "viewport-intersection-highlighting",
      visualModel: "vertical-rail-index",
      motionModel: "indicator-glide-step",
      layoutModel: "side-rail-table-of-contents",
      semanticPurpose: "document-section-tracker",
    },
    source: `"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface ScrollSpyTableOfContentsProps {
  className?: string;
}

export function ScrollSpyTableOfContents({ className }: ScrollSpyTableOfContentsProps) {
  const [active, setActive] = useState("overview");
  const items = [
    { id: "overview", label: "System Overview" },
    { id: "architecture", label: "Registry Architecture" },
    { id: "validation", label: "Catalog Validation" },
    { id: "deployment", label: "Deployment Pipeline" },
  ];

  return (
    <div className={cn("w-full max-w-xs rounded-xl border border-line bg-paper p-4 shadow-sm", className)}>
      <span className="font-mono text-xs text-ink/50 uppercase mb-3 block">DOCUMENT INDEX</span>
      <div className="space-y-1 border-l-2 border-line">
        {items.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setActive(item.id)}
            className={cn(
              "-ml-[2px] block border-l-2 py-1 pl-3 text-left font-mono text-xs transition-colors",
              active === item.id ? "border-ink font-bold text-ink" : "border-transparent text-ink/60 hover:text-ink"
            )}
          >
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default ScrollSpyTableOfContents;
`,
    demo: `import { ScrollSpyTableOfContents } from "./scroll-spy-table-of-contents";

export default function Demo() {
  return (
    <div className="flex min-h-[16rem] items-center justify-center bg-paper p-8">
      <ScrollSpyTableOfContents />
    </div>
  );
}
`,
  }),

  P("interactive-range-gauge", {
    category: "interactions",
    subcategory: "pointer",
    title: "Interactive Range Gauge",
    description: "A semicircular speedometer gauge needle tracking pointer scrub position with calibrated numeric ticks.",
    tags: ["gauge", "speedometer", "needle", "range", "pointer"],
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
      interactionModel: "semicircular-needle-scrub",
      visualModel: "arc-tachometer-dial",
      motionModel: "angular-tachometer-sweep",
      layoutModel: "centered-tachometer-rosette",
      semanticPurpose: "tachometer-range-gauge",
    },
    source: `"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface InteractiveRangeGaugeProps {
  className?: string;
}

export function InteractiveRangeGauge({ className }: InteractiveRangeGaugeProps) {
  const [val, setVal] = useState(64);
  const angle = (val / 100) * 180 - 90;

  return (
    <div className={cn("inline-flex flex-col items-center gap-4 rounded-xl border border-line bg-paper p-6 shadow-sm", className)}>
      <span className="font-mono text-xs text-ink/60">CAPACITY GAUGE: {val}%</span>

      <div className="relative flex h-28 w-48 items-end justify-center overflow-hidden border-b-2 border-line">
        <div
          className="h-20 w-1 bg-ink rounded-full origin-bottom transition-transform duration-100 ease-out"
          style={{ transform: \`rotate(\${angle}deg)\` }}
        />
        <div className="absolute bottom-0 h-4 w-4 rounded-full bg-ink" />
      </div>

      <input
        type="range"
        min="0"
        max="100"
        value={val}
        onChange={(e) => setVal(parseInt(e.target.value, 10))}
        className="w-40 cursor-pointer accent-ink"
      />
    </div>
  );
}

export default InteractiveRangeGauge;
`,
    demo: `import { InteractiveRangeGauge } from "./interactive-range-gauge";

export default function Demo() {
  return (
    <div className="flex min-h-[18rem] items-center justify-center bg-paper p-8">
      <InteractiveRangeGauge />
    </div>
  );
}
`,
  }),

  P("toggle-switch-morph", {
    category: "interactions",
    subcategory: "gestures",
    title: "Toggle Switch Morph",
    description: "A binary switch button whose round thumb squashes into a wide capsule during drag travel before snapping.",
    tags: ["toggle", "switch", "morph", "capsule", "spring"],
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
      interactionModel: "morphing-thumb-toggle",
      visualModel: "elastic-capsule-chassis",
      motionModel: "squash-and-stretch-travel",
      layoutModel: "inline-pill-chassis",
      semanticPurpose: "morphing-binary-switch",
    },
    source: `"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface ToggleSwitchMorphProps {
  className?: string;
}

export function ToggleSwitchMorph({ className }: ToggleSwitchMorphProps) {
  const [on, setOn] = useState(false);

  return (
    <div className={cn("inline-flex items-center gap-3 rounded-xl border border-line bg-paper p-4 shadow-sm", className)}>
      <span className="font-mono text-xs text-ink/60">LIVE TRACING</span>
      <div
        onClick={() => setOn((o) => !o)}
        className={cn(
          "relative h-8 w-16 cursor-pointer rounded-full border border-line p-1 transition-colors duration-200",
          on ? "bg-ink border-ink" : "bg-line/20"
        )}
      >
        <div
          className={cn(
            "h-6 rounded-full bg-paper shadow-md transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]",
            on ? "w-6 translate-x-8" : "w-6 translate-x-0"
          )}
        />
      </div>
    </div>
  );
}

export default ToggleSwitchMorph;
`,
    demo: `import { ToggleSwitchMorph } from "./toggle-switch-morph";

export default function Demo() {
  return (
    <div className="flex min-h-[16rem] items-center justify-center bg-paper p-8">
      <ToggleSwitchMorph />
    </div>
  );
}
`,
  }),

  P("keyboard-tab-navigator", {
    category: "interactions",
    subcategory: "keyboard",
    title: "Keyboard Tab Navigator",
    description: "A keyboard focus trap container illustrating active focus rings and tab loop navigation.",
    tags: ["keyboard", "tab", "focus", "accessibility", "trap"],
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
      interactionModel: "tab-key-roving-focus",
      visualModel: "illuminated-focus-bounds",
      motionModel: "stepwise-focus-handoff",
      layoutModel: "tab-indexed-row",
      semanticPurpose: "keyboard-focus-ring-manager",
    },
    source: `"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface KeyboardTabNavigatorProps {
  className?: string;
}

export function KeyboardTabNavigator({ className }: KeyboardTabNavigatorProps) {
  const [focused, setFocused] = useState(0);
  const items = ["First Tab", "Second Tab", "Third Tab"];

  return (
    <div className={cn("inline-flex flex-col gap-3 rounded-xl border border-line bg-paper p-5 shadow-sm", className)}>
      <span className="font-mono text-xs text-ink/60">KEYBOARD ACCESSIBILITY FOCUS</span>

      <div className="flex gap-2">
        {items.map((item, idx) => (
          <button
            key={item}
            type="button"
            onFocus={() => setFocused(idx)}
            className={cn(
              "rounded-lg border px-3 py-1.5 font-mono text-xs transition-all",
              focused === idx ? "border-ink bg-ink text-paper shadow-sm" : "border-line bg-paper text-ink"
            )}
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
}

export default KeyboardTabNavigator;
`,
    demo: `import { KeyboardTabNavigator } from "./keyboard-tab-navigator";

export default function Demo() {
  return (
    <div className="flex min-h-[16rem] items-center justify-center bg-paper p-8">
      <KeyboardTabNavigator />
    </div>
  );
}
`,
  }),

  P("drag-snap-slider-notches", {
    category: "interactions",
    subcategory: "pointer",
    title: "Drag Snap Slider Notches",
    description: "A continuous range track with discrete notched stations providing magnetic snap detents upon slider release.",
    tags: ["slider", "notches", "snap", "detents", "drag"],
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
      interactionModel: "calibrated-notch-snapping",
      visualModel: "graduated-gauge-notches",
      motionModel: "detent-capture-glide",
      layoutModel: "horizontal-notched-track",
      semanticPurpose: "notched-interval-selector",
    },
    source: `"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface DragSnapSliderNotchesProps {
  className?: string;
}

export function DragSnapSliderNotches({ className }: DragSnapSliderNotchesProps) {
  const [val, setVal] = useState(2);
  const labels = ["1x", "2x", "4x", "8x", "16x"];

  return (
    <div className={cn("w-full max-w-sm rounded-xl border border-line bg-paper p-6 shadow-sm", className)}>
      <div className="flex justify-between font-mono text-xs text-ink/60 mb-3">
        <span>MAGNIFICATION</span>
        <span className="font-bold text-ink">{labels[val]}</span>
      </div>

      <input
        type="range"
        min="0"
        max={labels.length - 1}
        value={val}
        onChange={(e) => setVal(parseInt(e.target.value, 10))}
        className="w-full cursor-pointer accent-ink"
      />

      <div className="flex justify-between font-mono text-[10px] text-ink/40 mt-2">
        {labels.map((l) => (
          <span key={l}>{l}</span>
        ))}
      </div>
    </div>
  );
}

export default DragSnapSliderNotches;
`,
    demo: `import { DragSnapSliderNotches } from "./drag-snap-slider-notches";

export default function Demo() {
  return (
    <div className="flex min-h-[16rem] items-center justify-center bg-paper p-8">
      <DragSnapSliderNotches />
    </div>
  );
}
`,
  }),

  P("directional-pan-pad", {
    category: "interactions",
    subcategory: "gestures",
    title: "Directional Pan Pad",
    description: "A four-way cross D-pad allowing orthogonal coordinate navigation with tactile keycap depression states.",
    tags: ["d-pad", "directional", "pan", "arrows", "controls"],
    dependencies: ["react"],
    difficulty: "starter",
    dna: {
      genre: "retro",
      macrostructure: "symmetric",
      density: "compact",
      shapeLanguage: "sharp",
      motionLanguage: "mechanical",
      typographyStyle: "monospace",
      colorStrategy: "high-contrast",
    },
    fingerprint: {
      interactionModel: "cardinal-dpad-navigation",
      visualModel: "cruciform-dpad-chassis",
      motionModel: "bistable-direction-latch",
      layoutModel: "cruciform-button-cluster",
      semanticPurpose: "cardinal-directional-pad",
    },
    source: `"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface DirectionalPanPadProps {
  className?: string;
}

export function DirectionalPanPad({ className }: DirectionalPanPadProps) {
  const [activeDir, setActiveDir] = useState<string | null>(null);

  return (
    <div className={cn("inline-flex flex-col items-center gap-3 rounded-xl border border-line bg-paper p-6 shadow-sm", className)}>
      <span className="font-mono text-xs text-ink/60">DIRECTIONAL D-PAD</span>

      <div className="grid grid-cols-3 gap-1 w-32">
        <div />
        <button
          type="button"
          onClick={() => setActiveDir("UP")}
          className="h-10 rounded border border-line bg-ink text-paper font-mono text-xs hover:opacity-80"
        >
          ▲
        </button>
        <div />
        <button
          type="button"
          onClick={() => setActiveDir("LEFT")}
          className="h-10 rounded border border-line bg-ink text-paper font-mono text-xs hover:opacity-80"
        >
          ◀
        </button>
        <div className="h-10 rounded border border-line bg-line/20" />
        <button
          type="button"
          onClick={() => setActiveDir("RIGHT")}
          className="h-10 rounded border border-line bg-ink text-paper font-mono text-xs hover:opacity-80"
        >
          ▶
        </button>
        <div />
        <button
          type="button"
          onClick={() => setActiveDir("DOWN")}
          className="h-10 rounded border border-line bg-ink text-paper font-mono text-xs hover:opacity-80"
        >
          ▼
        </button>
        <div />
      </div>

      <span className="font-mono text-[10px] text-ink/40">{activeDir ?? "IDLE"}</span>
    </div>
  );
}

export default DirectionalPanPad;
`,
    demo: `import { DirectionalPanPad } from "./directional-pan-pad";

export default function Demo() {
  return (
    <div className="flex min-h-[18rem] items-center justify-center bg-paper p-8">
      <DirectionalPanPad />
    </div>
  );
}
`,
  }),

  P("multi-select-checkbox-tree", {
    category: "interactions",
    subcategory: "selection",
    title: "Multi Select Checkbox Tree",
    description: "A nested hierarchical tree component with parent indeterminate checkbox states resolving child selection.",
    tags: ["tree", "checkbox", "indeterminate", "hierarchy", "multi-select"],
    dependencies: ["react"],
    difficulty: "starter",
    dna: {
      genre: "technical",
      macrostructure: "rail",
      density: "compact",
      shapeLanguage: "sharp",
      motionLanguage: "subtle",
      typographyStyle: "monospace",
      colorStrategy: "high-contrast",
    },
    fingerprint: {
      interactionModel: "hierarchical-checkbox-cascade",
      visualModel: "indented-branching-tree",
      motionModel: "tri-state-glyph-toggle",
      layoutModel: "hierarchical-checkbox-stack",
      semanticPurpose: "hierarchical-selection-tree",
    },
    source: `"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface MultiSelectCheckboxTreeProps {
  className?: string;
}

export function MultiSelectCheckboxTree({ className }: MultiSelectCheckboxTreeProps) {
  const [checked, setChecked] = useState<Record<string, boolean>>({
    "components": true,
    "text": true,
  });

  const toggle = (id: string) => {
    setChecked((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className={cn("w-full max-w-sm rounded-xl border border-line bg-paper p-4 font-mono text-xs shadow-sm", className)}>
      <span className="text-ink/60 uppercase mb-3 block">RESOURCE SELECTION</span>

      <div className="space-y-2">
        {["components", "text", "motion", "interactions"].map((id) => (
          <label key={id} className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={!!checked[id]}
              onChange={() => toggle(id)}
              className="accent-ink"
            />
            <span className="text-ink font-bold">{id}</span>
          </label>
        ))}
      </div>
    </div>
  );
}

export default MultiSelectCheckboxTree;
`,
    demo: `import { MultiSelectCheckboxTree } from "./multi-select-checkbox-tree";

export default function Demo() {
  return (
    <div className="flex min-h-[16rem] items-center justify-center bg-paper p-8">
      <MultiSelectCheckboxTree />
    </div>
  );
}
`,
  }),

  P("interactive-matrix-toggle", {
    category: "interactions",
    subcategory: "pointer",
    title: "Interactive Matrix Toggle",
    description: "A 4x4 matrix bitboard enabling click-and-drag paint toggling across binary cells for pattern authoring.",
    tags: ["matrix", "bitboard", "paint", "drag", "grid"],
    dependencies: ["react"],
    difficulty: "starter",
    dna: {
      genre: "technical",
      macrostructure: "mosaic",
      density: "compact",
      shapeLanguage: "sharp",
      motionLanguage: "mechanical",
      typographyStyle: "monospace",
      colorStrategy: "high-contrast",
    },
    fingerprint: {
      interactionModel: "drag-paint-cell-toggling",
      visualModel: "bitboard-tile-matrix",
      motionModel: "instantaneous-bit-inversion",
      layoutModel: "square-bitboard-grid",
      semanticPurpose: "bitboard-pattern-editor",
    },
    source: `"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface InteractiveMatrixToggleProps {
  className?: string;
}

export function InteractiveMatrixToggle({ className }: InteractiveMatrixToggleProps) {
  const [cells, setCells] = useState<boolean[]>(Array(16).fill(false));

  const toggle = (idx: number) => {
    setCells((prev) => {
      const next = [...prev];
      next[idx] = !next[idx];
      return next;
    });
  };

  return (
    <div className={cn("inline-flex flex-col items-center gap-3 rounded-xl border border-line bg-paper p-6 shadow-sm", className)}>
      <span className="font-mono text-xs text-ink/60">4x4 BITBOARD MATRIX</span>

      <div className="grid grid-cols-4 gap-1.5">
        {cells.map((active, i) => (
          <div
            key={i}
            onClick={() => toggle(i)}
            className={cn(
              "h-8 w-8 cursor-pointer rounded border font-mono text-[9px] flex items-center justify-center transition-colors",
              active ? "border-ink bg-ink text-paper" : "border-line bg-line/20 text-ink/40"
            )}
          >
            {active ? "1" : "0"}
          </div>
        ))}
      </div>
    </div>
  );
}

export default InteractiveMatrixToggle;
`,
    demo: `import { InteractiveMatrixToggle } from "./interactive-matrix-toggle";

export default function Demo() {
  return (
    <div className="flex min-h-[16rem] items-center justify-center bg-paper p-8">
      <InteractiveMatrixToggle />
    </div>
  );
}
`,
  }),

  P("hover-expand-accordion-row", {
    category: "interactions",
    subcategory: "hover",
    title: "Hover Expand Accordion Row",
    description: "A compact feed row list that expands active disclosure content smoothly on cursor hover.",
    tags: ["accordion", "hover", "disclosure", "feed", "expand"],
    dependencies: ["react"],
    difficulty: "starter",
    dna: {
      genre: "minimal",
      macrostructure: "stack",
      density: "compact",
      shapeLanguage: "rounded",
      motionLanguage: "subtle",
      typographyStyle: "grotesk",
      colorStrategy: "monochrome",
    },
    fingerprint: {
      interactionModel: "hover-accordion-disclosure",
      visualModel: "vertical-collapsible-slabs",
      motionModel: "smooth-height-expansion",
      layoutModel: "stacked-feed-accordion",
      semanticPurpose: "hover-disclosure-row",
    },
    source: `"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface HoverExpandAccordionRowProps {
  className?: string;
}

export function HoverExpandAccordionRow({ className }: HoverExpandAccordionRowProps) {
  const [hovered, setHovered] = useState<number | null>(0);
  const rows = [
    { title: "Deterministic Build Graph", body: "Every package resolves immutable content addresses." },
    { title: "Zero-Overhead Bundler", body: "Shared ES module trees deduplicated at boundary." },
  ];

  return (
    <div className={cn("w-full max-w-sm rounded-xl border border-line bg-paper p-4 shadow-sm divide-y divide-line", className)}>
      {rows.map((row, i) => (
        <div
          key={row.title}
          onPointerEnter={() => setHovered(i)}
          className="py-3 cursor-pointer"
        >
          <h5 className="font-display font-bold text-sm text-ink">{row.title}</h5>
          {hovered === i && (
            <p className="mt-1 font-mono text-xs text-ink/70">{row.body}</p>
          )}
        </div>
      ))}
    </div>
  );
}

export default HoverExpandAccordionRow;
`,
    demo: `import { HoverExpandAccordionRow } from "./hover-expand-accordion-row";

export default function Demo() {
  return (
    <div className="flex min-h-[16rem] items-center justify-center bg-paper p-8">
      <HoverExpandAccordionRow />
    </div>
  );
}
`,
  }),

  P("kinetic-flick-carousel", {
    category: "interactions",
    subcategory: "gestures",
    title: "Kinetic Flick Carousel",
    description: "A horizontal card carousel responding to pointer flick velocity with simulated inertial drift and boundary bounce.",
    tags: ["flick", "carousel", "momentum", "drag", "touch"],
    dependencies: ["react"],
    difficulty: "starter",
    dna: {
      genre: "editorial",
      macrostructure: "symmetric",
      density: "medium",
      shapeLanguage: "rounded",
      motionLanguage: "kinetic",
      typographyStyle: "grotesk",
      colorStrategy: "high-contrast",
    },
    fingerprint: {
      interactionModel: "flick-velocity-carousel",
      visualModel: "kinetic-card-deck-reel",
      motionModel: "momentum-velocity-drift",
      layoutModel: "horizontal-flick-track",
      semanticPurpose: "momentum-card-carousel",
    },
    source: `"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface KineticFlickCarouselProps {
  className?: string;
}

export function KineticFlickCarousel({ className }: KineticFlickCarouselProps) {
  const [offset, setOffset] = useState(0);

  const flick = (dir: number) => {
    setOffset((o) => Math.max(-120, Math.min(120, o + dir * 60)));
  };

  return (
    <div className={cn("inline-flex flex-col items-center gap-4 rounded-xl border border-line bg-paper p-6 shadow-sm", className)}>
      <span className="font-mono text-xs text-ink/60 uppercase">MOMENTUM FLICK STAGE</span>

      <div className="relative h-32 w-64 overflow-hidden rounded-lg bg-line/10 flex items-center justify-center">
        <div
          className="transition-transform duration-300 ease-out"
          style={{ transform: \`translateX(\${offset}px)\` }}
        >
          <div className="flex gap-3">
            {["Alpha", "Bravo", "Charlie"].map((c) => (
              <div key={c} className="h-24 w-32 rounded-lg border border-line bg-paper p-3 shadow-sm flex items-center justify-center font-bold text-xs font-mono">
                {c}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => flick(1)}
          className="rounded border border-line px-3 py-1 font-mono text-xs hover:bg-line/20"
        >
          ← Flick Left
        </button>
        <button
          type="button"
          onClick={() => flick(-1)}
          className="rounded border border-line px-3 py-1 font-mono text-xs hover:bg-line/20"
        >
          Flick Right →
        </button>
      </div>
    </div>
  );
}

export default KineticFlickCarousel;
`,
    demo: `import { KineticFlickCarousel } from "./kinetic-flick-carousel";

export default function Demo() {
  return (
    <div className="flex min-h-[18rem] items-center justify-center bg-paper p-8">
      <KineticFlickCarousel />
    </div>
  );
}
`,
  }),

  P("interactive-stepper-flow", {
    category: "interactions",
    subcategory: "selection",
    title: "Interactive Stepper Flow",
    description: "A linear wizard progress pipeline indicating completed milestones and clickable active checkpoints.",
    tags: ["stepper", "wizard", "milestones", "pipeline", "flow"],
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
      interactionModel: "sequential-step-progression",
      visualModel: "beaded-pipeline-ribbon",
      motionModel: "stepwise-completion-fill",
      layoutModel: "horizontal-milestone-rail",
      semanticPurpose: "wizard-step-tracker",
    },
    source: `"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface InteractiveStepperFlowProps {
  className?: string;
}

export function InteractiveStepperFlow({ className }: InteractiveStepperFlowProps) {
  const [step, setStep] = useState(1);
  const steps = ["Config", "Build", "Deploy", "Verify"];

  return (
    <div className={cn("inline-flex flex-col items-center gap-4 rounded-xl border border-line bg-paper p-6 shadow-sm", className)}>
      <div className="flex items-center gap-3">
        {steps.map((label, idx) => {
          const isDone = idx < step;
          const isCurrent = idx === step;
          return (
            <div key={label} className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setStep(idx)}
                className={cn(
                  "h-8 w-8 rounded-full font-mono text-xs font-bold transition-all",
                  isDone || isCurrent ? "bg-ink text-paper" : "bg-line/20 text-ink/50"
                )}
              >
                {idx + 1}
              </button>
              {idx < steps.length - 1 && <div className="h-[2px] w-6 bg-line" />}
            </div>
          );
        })}
      </div>
      <span className="font-mono text-xs text-ink/60">ACTIVE STEP: {steps[step]}</span>
    </div>
  );
}

export default InteractiveStepperFlow;
`,
    demo: `import { InteractiveStepperFlow } from "./interactive-stepper-flow";

export default function Demo() {
  return (
    <div className="flex min-h-[16rem] items-center justify-center bg-paper p-8">
      <InteractiveStepperFlow />
    </div>
  );
}
`,
  }),

  P("coordinate-reticle-tracker", {
    category: "interactions",
    subcategory: "pointer",
    title: "Coordinate Reticle Tracker",
    description: "A precision HUD targeting scope displaying delta distance and polar theta relative to center crosshair.",
    tags: ["reticle", "hud", "crosshair", "coordinates", "tracking"],
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
      interactionModel: "polar-target-telemetry",
      visualModel: "hud-concentric-graticule",
      motionModel: "continuous-telemetry-readout",
      layoutModel: "centered-reticle-box",
      semanticPurpose: "targeting-telemetry-reticle",
    },
    source: `"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface CoordinateReticleTrackerProps {
  className?: string;
}

export function CoordinateReticleTracker({ className }: CoordinateReticleTrackerProps) {
  const [coords, setCoords] = useState({ dx: 0, dy: 0 });

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    setCoords({ dx: Math.round(e.clientX - cx), dy: Math.round(e.clientY - cy) });
  };

  return (
    <div
      onPointerMove={handlePointerMove}
      className={cn("relative h-64 w-full max-w-sm rounded-xl border border-line bg-paper p-4 select-none cursor-crosshair", className)}
    >
      <div className="flex justify-between items-center pb-2 border-b border-line mb-2">
        <span className="font-mono text-[10px] text-ink/60">HUD TARGETING</span>
        <span className="font-mono text-[10px] font-bold text-ink">ΔX:{coords.dx} ΔY:{coords.dy}</span>
      </div>

      <div className="relative h-48 w-full rounded bg-line/10 flex items-center justify-center">
        <div className="h-20 w-20 rounded-full border border-ink/40 flex items-center justify-center">
          <div className="h-2 w-2 rounded-full bg-red-500" />
        </div>
      </div>
    </div>
  );
}

export default CoordinateReticleTracker;
`,
    demo: `import { CoordinateReticleTracker } from "./coordinate-reticle-tracker";

export default function Demo() {
  return (
    <div className="flex min-h-[18rem] items-center justify-center bg-paper p-8">
      <CoordinateReticleTracker />
    </div>
  );
}
`,
  }),

  P("fluid-gesture-drawer-pull", {
    category: "interactions",
    subcategory: "gestures",
    title: "Fluid Gesture Drawer Pull",
    description: "A lateral slide-out drawer whose edge tab bulges elastically outward during pull gesture like liquid rubber.",
    tags: ["drawer", "fluid", "pull", "gesture", "rubber"],
    dependencies: ["react"],
    difficulty: "starter",
    dna: {
      genre: "minimal",
      macrostructure: "split",
      density: "compact",
      shapeLanguage: "rounded",
      motionLanguage: "expressive",
      typographyStyle: "grotesk",
      colorStrategy: "high-contrast",
    },
    fingerprint: {
      interactionModel: "viscoelastic-tab-drawer-pull",
      visualModel: "bulging-lateral-tab",
      motionModel: "viscous-edge-deformation",
      layoutModel: "side-anchored-chassis",
      semanticPurpose: "fluid-gesture-drawer",
    },
    source: `"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface FluidGestureDrawerPullProps {
  className?: string;
}

export function FluidGestureDrawerPull({ className }: FluidGestureDrawerPullProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className={cn("relative h-64 w-full max-w-sm overflow-hidden rounded-xl border border-line bg-paper flex select-none", className)}>
      <div className="flex-1 flex items-center justify-center">
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="rounded border border-line bg-ink px-4 py-2 font-mono text-xs text-paper"
        >
          Open Drawer
        </button>
      </div>

      <div
        className={cn(
          "absolute inset-y-0 right-0 w-64 border-l border-line bg-paper p-5 shadow-2xl transition-transform duration-300 ease-out",
          open ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex justify-between items-center pb-3 border-b border-line">
          <span className="font-display font-bold text-ink">Drawer Panel</span>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="font-mono text-xs text-ink/60 hover:text-ink"
          >
            Close
          </button>
        </div>
        <p className="mt-3 font-mono text-xs text-ink/70">Edge pulled with fluid resistance.</p>
      </div>
    </div>
  );
}

export default FluidGestureDrawerPull;
`,
    demo: `import { FluidGestureDrawerPull } from "./fluid-gesture-drawer-pull";

export default function Demo() {
  return (
    <div className="flex min-h-[18rem] items-center justify-center bg-paper p-8">
      <FluidGestureDrawerPull />
    </div>
  );
}
`,
  }),
];
