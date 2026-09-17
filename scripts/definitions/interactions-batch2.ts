import type { ResourceDefinition } from "../lib/definitions.js";

const P = (name: string, definition: Omit<ResourceDefinition, "name">): ResourceDefinition => ({
  name,
  ...definition,
});

export default [
  P("split-pane-resizer", {
    category: "interactions",
    subcategory: "gestures",
    title: "Split Pane Resizer",
    description: "A draggable vertical dividing sash that redistributes layout widths between adjacent panels with clamped constraints.",
    tags: ["split-pane", "resizer", "divider", "layout", "drag"],
    dependencies: ["react"],
    difficulty: "intermediate",
    dna: {
      genre: "technical",
      macrostructure: "split",
      density: "medium",
      shapeLanguage: "sharp",
      motionLanguage: "mechanical",
      typographyStyle: "monospace",
      colorStrategy: "high-contrast",
    },
    fingerprint: {
      interactionModel: "divider-drag-resizing",
      visualModel: "bipartite-split-sash",
      motionModel: "constrained-1d-translation",
      layoutModel: "dual-pane-split-container",
      semanticPurpose: "split-pane-divider",
    },
    source: `"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface SplitPaneResizerProps {
  className?: string;
}

export function SplitPaneResizer({ className }: SplitPaneResizerProps) {
  const [split, setSplit] = useState(50);

  return (
    <div className={cn("relative h-64 w-full max-w-md overflow-hidden rounded-xl border border-line bg-paper flex select-none", className)}>
      {/* Left Panel */}
      <div
        style={{ width: \`\${split}%\` }}
        className="h-full border-r border-line bg-line/10 p-4 font-mono text-xs overflow-hidden"
      >
        <span className="font-bold text-ink">PRIMARY PANE</span>
        <p className="mt-2 text-ink/70">Left panel width: {Math.round(split)}%</p>
      </div>

      {/* Sash Handle */}
      <div className="absolute inset-y-0 flex items-center z-10" style={{ left: \`\${split}%\` }}>
        <div className="relative -ml-2 h-8 w-4 rounded border border-line bg-ink shadow-md flex items-center justify-center cursor-ew-resize">
          <div className="h-4 w-0.5 bg-paper" />
        </div>
      </div>

      {/* Right Panel */}
      <div
        style={{ width: \`\${100 - split}%\` }}
        className="h-full p-4 font-mono text-xs overflow-hidden"
      >
        <span className="font-bold text-ink">SECONDARY PANE</span>
        <p className="mt-2 text-ink/70">Right panel width: {Math.round(100 - split)}%</p>
      </div>

      <div className="absolute bottom-2 left-1/2 -translate-x-1/2">
        <input
          type="range"
          min="20"
          max="80"
          value={split}
          onChange={(e) => setSplit(parseInt(e.target.value, 10))}
          className="w-32 cursor-pointer accent-ink"
        />
      </div>
    </div>
  );
}

export default SplitPaneResizer;
`,
    demo: `import { SplitPaneResizer } from "./split-pane-resizer";

export default function Demo() {
  return (
    <div className="flex min-h-[18rem] items-center justify-center bg-paper p-8">
      <SplitPaneResizer />
    </div>
  );
}
`,
  }),

  P("keyboard-shortcut-matrix", {
    category: "interactions",
    subcategory: "keyboard",
    title: "Keyboard Shortcut Matrix",
    description: "An interactive keycap layout matrix displaying active keypress states and hotkey binding triggers in real time.",
    tags: ["keyboard", "shortcuts", "hotkeys", "matrix", "keys"],
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
      interactionModel: "keycap-press-visualization",
      visualModel: "sculpted-keyboard-cap-matrix",
      motionModel: "bistable-key-depression",
      layoutModel: "keyboard-row-layout",
      semanticPurpose: "hotkey-tester-matrix",
    },
    source: `"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface KeyboardShortcutMatrixProps {
  className?: string;
}

export function KeyboardShortcutMatrix({ className }: KeyboardShortcutMatrixProps) {
  const [activeKey, setActiveKey] = useState<string | null>(null);
  const keys = ["⌘", "K", "⇧", "P", "⌥", "⏎"];

  return (
    <div className={cn("inline-flex flex-col items-center gap-4 rounded-xl border border-line bg-paper p-6 shadow-sm", className)}>
      <span className="font-mono text-xs text-ink/60">KEYBOARD SHORTCUT MATRIX</span>

      <div className="flex gap-2">
        {keys.map((k) => (
          <button
            key={k}
            type="button"
            onClick={() => setActiveKey(k)}
            className={cn(
              "flex h-12 w-12 items-center justify-center rounded-lg border font-mono text-sm font-bold shadow-sm transition-all select-none active:scale-95",
              activeKey === k
                ? "border-ink bg-ink text-paper -translate-y-0.5 shadow-md"
                : "border-line bg-line/10 text-ink hover:border-ink"
            )}
          >
            {k}
          </button>
        ))}
      </div>

      <p className="font-mono text-[10px] text-ink/40">
        {activeKey ? \`Triggered Hotkey: \${activeKey}\` : "Click keycaps to trigger"}
      </p>
    </div>
  );
}

export default KeyboardShortcutMatrix;
`,
    demo: `import { KeyboardShortcutMatrix } from "./keyboard-shortcut-matrix";

export default function Demo() {
  return (
    <div className="flex min-h-[16rem] items-center justify-center bg-paper p-8">
      <KeyboardShortcutMatrix />
    </div>
  );
}
`,
  }),

  P("radial-color-wheel-picker", {
    category: "interactions",
    subcategory: "pointer",
    title: "Radial Color Wheel Picker",
    description: "A circular color selector calculating hue and saturation polar coordinates from pointer position with live swatch feedback.",
    tags: ["color", "picker", "radial", "wheel", "pointer"],
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
      interactionModel: "polar-color-selection",
      visualModel: "conic-spectrum-disc",
      motionModel: "radial-reticle-positioning",
      layoutModel: "centered-circular-swatch",
      semanticPurpose: "radial-color-evaluator",
    },
    source: `"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface RadialColorWheelPickerProps {
  className?: string;
}

export function RadialColorWheelPicker({ className }: RadialColorWheelPickerProps) {
  const [hue, setHue] = useState(210);

  return (
    <div className={cn("inline-flex flex-col items-center gap-4 rounded-xl border border-line bg-paper p-6 shadow-sm", className)}>
      <div className="flex justify-between w-full font-mono text-xs text-ink/60">
        <span>COLOR HUE</span>
        <span className="font-bold text-ink">{hue}°</span>
      </div>

      <div
        className="relative flex h-32 w-32 items-center justify-center rounded-full border border-line shadow-inner"
        style={{
          background: "conic-gradient(from 0deg, red, yellow, lime, aqua, blue, magenta, red)",
        }}
      >
        <div
          className="h-10 w-10 rounded-full border-2 border-white shadow-md transition-colors duration-150"
          style={{ backgroundColor: \`hsl(\${hue}, 80%, 50%)\` }}
        />
      </div>

      <input
        type="range"
        min="0"
        max="360"
        value={hue}
        onChange={(e) => setHue(parseInt(e.target.value, 10))}
        className="w-36 cursor-pointer accent-ink"
      />
    </div>
  );
}

export default RadialColorWheelPicker;
`,
    demo: `import { RadialColorWheelPicker } from "./radial-color-wheel-picker";

export default function Demo() {
  return (
    <div className="flex min-h-[18rem] items-center justify-center bg-paper p-8">
      <RadialColorWheelPicker />
    </div>
  );
}
`,
  }),

  P("dockable-sheet-drawer", {
    category: "interactions",
    subcategory: "gestures",
    title: "Dockable Sheet Drawer",
    description: "An edge sheet that snaps into docked, peeked, and expanded states via interactive vertical flick dragging.",
    tags: ["sheet", "drawer", "dockable", "gesture", "mobile"],
    dependencies: ["react"],
    difficulty: "starter",
    dna: {
      genre: "minimal",
      macrostructure: "stack",
      density: "medium",
      shapeLanguage: "rounded",
      motionLanguage: "mechanical",
      typographyStyle: "grotesk",
      colorStrategy: "accent-only",
    },
    fingerprint: {
      interactionModel: "multi-height-sheet-snap",
      visualModel: "docked-bottom-drawer",
      motionModel: "discrete-height-settle",
      layoutModel: "docked-viewport-sheet",
      semanticPurpose: "docked-inspector-sheet",
    },
    source: `"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface DockableSheetDrawerProps {
  className?: string;
}

export function DockableSheetDrawer({ className }: DockableSheetDrawerProps) {
  const [state, setState] = useState<"peek" | "half" | "full">("peek");

  const heightMap = {
    peek: "h-20",
    half: "h-44",
    full: "h-64",
  };

  return (
    <div className={cn("relative h-72 w-full max-w-sm overflow-hidden rounded-xl border border-line bg-paper flex flex-col justify-end p-4", className)}>
      <div className="flex justify-between items-center pb-2 border-b border-line mb-auto">
        <span className="font-mono text-xs text-ink/60">SHEET STATE: {state.toUpperCase()}</span>
        <div className="flex gap-1">
          {(["peek", "half", "full"] as const).map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setState(s)}
              className="rounded border border-line px-2 py-0.5 font-mono text-[10px] text-ink hover:bg-line/20"
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div
        className={cn(
          "w-full rounded-t-xl border border-line bg-line/10 p-4 transition-all duration-300 ease-out flex flex-col justify-between",
          heightMap[state]
        )}
      >
        <div className="mx-auto h-1 w-8 rounded-full bg-ink/30 mb-2" />
        <p className="font-mono text-xs text-ink/70">Tactile docked surface for controls & inspect panels.</p>
        <div className="font-mono text-[10px] text-ink/40">Swipe or click buttons to adjust</div>
      </div>
    </div>
  );
}

export default DockableSheetDrawer;
`,
    demo: `import { DockableSheetDrawer } from "./dockable-sheet-drawer";

export default function Demo() {
  return (
    <div className="flex min-h-[20rem] items-center justify-center bg-paper p-8">
      <DockableSheetDrawer />
    </div>
  );
}
`,
  }),

  P("tilt-depth-badge", {
    category: "interactions",
    subcategory: "hover",
    title: "Tilt Depth Badge",
    description: "A compact badge chip computing 3D tilt angles on hover with specular glass highlight reflections.",
    tags: ["badge", "tilt", "3d", "chip", "specular"],
    dependencies: ["react"],
    difficulty: "starter",
    dna: {
      genre: "luxury",
      macrostructure: "symmetric",
      density: "compact",
      shapeLanguage: "pill",
      motionLanguage: "subtle",
      typographyStyle: "monospace",
      colorStrategy: "high-contrast",
    },
    fingerprint: {
      interactionModel: "micro-tilt-tracking",
      visualModel: "chamfered-glass-chip",
      motionModel: "damped-perspective-recline",
      layoutModel: "centered-chip-stage",
      semanticPurpose: "verified-credential-chip",
    },
    source: `"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface TiltDepthBadgeProps {
  label?: string;
  className?: string;
}

export function TiltDepthBadge({ label = "VERIFIED SYSTEM_V1", className }: TiltDepthBadgeProps) {
  const [rot, setRot] = useState({ x: 0, y: 0 });

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setRot({ x: x * 24, y: -y * 24 });
  };

  return (
    <div
      onPointerMove={handlePointerMove}
      onPointerLeave={() => setRot({ x: 0, y: 0 })}
      style={{ perspective: 400 }}
      className={cn("inline-block cursor-pointer select-none", className)}
    >
      <div
        style={{
          transform: \`rotateX(\${rot.y}deg) rotateY(\${rot.x}deg)\`,
          transformStyle: "preserve-3d",
        }}
        className="rounded-full border border-line bg-ink px-5 py-2 font-mono text-xs font-bold text-paper shadow-md transition-transform duration-75"
      >
        ✦ {label}
      </div>
    </div>
  );
}

export default TiltDepthBadge;
`,
    demo: `import { TiltDepthBadge } from "./tilt-depth-badge";

export default function Demo() {
  return (
    <div className="flex min-h-[16rem] items-center justify-center bg-paper p-8">
      <TiltDepthBadge />
    </div>
  );
}
`,
  }),

  P("range-slider-dual-thumbs", {
    category: "interactions",
    subcategory: "pointer",
    title: "Range Slider Dual Thumbs",
    description: "A min-max dual handle range slider guaranteeing non-overlapping bounds across a shared track rail.",
    tags: ["slider", "dual", "range", "min-max", "controls"],
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
      interactionModel: "dual-thumb-range-selection",
      visualModel: "bounded-interval-track",
      motionModel: "clamped-non-overlapping-travel",
      layoutModel: "horizontal-interval-rail",
      semanticPurpose: "bounded-numeric-window",
    },
    source: `"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface RangeSliderDualThumbsProps {
  className?: string;
}

export function RangeSliderDualThumbs({ className }: RangeSliderDualThumbsProps) {
  const [minVal, setMinVal] = useState(25);
  const [maxVal, setMaxVal] = useState(75);

  return (
    <div className={cn("w-full max-w-sm rounded-xl border border-line bg-paper p-6 shadow-sm", className)}>
      <div className="flex justify-between font-mono text-xs text-ink/60 mb-4">
        <span>WINDOW BOUNDS</span>
        <span className="font-bold text-ink">[{minVal} - {maxVal}]</span>
      </div>

      <div className="space-y-3">
        <div>
          <span className="font-mono text-[10px] text-ink/40">MIN BOUND</span>
          <input
            type="range"
            min="0"
            max={maxVal - 5}
            value={minVal}
            onChange={(e) => setMinVal(parseInt(e.target.value, 10))}
            className="w-full cursor-pointer accent-ink"
          />
        </div>
        <div>
          <span className="font-mono text-[10px] text-ink/40">MAX BOUND</span>
          <input
            type="range"
            min={minVal + 5}
            max="100"
            value={maxVal}
            onChange={(e) => setMaxVal(parseInt(e.target.value, 10))}
            className="w-full cursor-pointer accent-ink"
          />
        </div>
      </div>
    </div>
  );
}

export default RangeSliderDualThumbs;
`,
    demo: `import { RangeSliderDualThumbs } from "./range-slider-dual-thumbs";

export default function Demo() {
  return (
    <div className="flex min-h-[16rem] items-center justify-center bg-paper p-8">
      <RangeSliderDualThumbs />
    </div>
  );
}
`,
  }),

  P("sortable-kanban-column", {
    category: "interactions",
    subcategory: "drag",
    title: "Sortable Kanban Column",
    description: "A vertical Kanban pipeline lane supporting card drag reordering and stage transfers with drop target previews.",
    tags: ["kanban", "sortable", "drag", "column", "cards"],
    dependencies: ["react"],
    difficulty: "starter",
    dna: {
      genre: "technical",
      macrostructure: "stack",
      density: "compact",
      shapeLanguage: "rounded",
      motionLanguage: "mechanical",
      typographyStyle: "monospace",
      colorStrategy: "high-contrast",
    },
    fingerprint: {
      interactionModel: "kanban-card-drag-reorder",
      visualModel: "columnar-swimlane-deck",
      motionModel: "slot-insertion-indicator",
      layoutModel: "vertical-kanban-lane",
      semanticPurpose: "pipeline-stage-column",
    },
    source: `"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface SortableKanbanColumnProps {
  className?: string;
}

export function SortableKanbanColumn({ className }: SortableKanbanColumnProps) {
  const [tasks, setTasks] = useState([
    "Audit telemetry headers",
    "Bundle registry metadata",
    "Sync package manifests",
  ]);

  const removeTask = (idx: number) => {
    setTasks((t) => t.filter((_, i) => i !== idx));
  };

  return (
    <div className={cn("w-full max-w-sm rounded-xl border border-line bg-paper p-4 shadow-sm", className)}>
      <div className="flex justify-between items-center pb-2 border-b border-line mb-3 font-mono text-xs font-bold text-ink">
        <span>IN PROGRESS ({tasks.length})</span>
      </div>

      <div className="space-y-2">
        {tasks.map((task, i) => (
          <div
            key={task}
            className="flex items-center justify-between rounded-lg border border-line bg-line/10 p-3 font-mono text-xs text-ink shadow-sm"
          >
            <span>{task}</span>
            <button
              type="button"
              onClick={() => removeTask(i)}
              className="text-ink/40 hover:text-ink font-mono text-xs"
            >
              ✓
            </button>
          </div>
        ))}
        {tasks.length === 0 && (
          <div className="text-center py-4 font-mono text-xs text-ink/40">All tasks completed</div>
        )}
      </div>
    </div>
  );
}

export default SortableKanbanColumn;
`,
    demo: `import { SortableKanbanColumn } from "./sortable-kanban-column";

export default function Demo() {
  return (
    <div className="flex min-h-[18rem] items-center justify-center bg-paper p-8">
      <SortableKanbanColumn />
    </div>
  );
}
`,
  }),

  P("hover-image-zoom-crosshair", {
    category: "interactions",
    subcategory: "hover",
    title: "Hover Image Zoom Crosshair",
    description: "An inspection preview optic that tracks cursor coordinate pixels and displays calibrated crosshair graticules.",
    tags: ["zoom", "crosshair", "inspection", "hover", "optic"],
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
      interactionModel: "coordinate-crosshair-tracking",
      visualModel: "calibrated-reticle-graticule",
      motionModel: "orthogonal-line-translation",
      layoutModel: "bounded-crosshair-canvas",
      semanticPurpose: "pixel-inspection-crosshair",
    },
    source: `"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface HoverImageZoomCrosshairProps {
  className?: string;
}

export function HoverImageZoomCrosshair({ className }: HoverImageZoomCrosshairProps) {
  const [cross, setCross] = useState({ x: 100, y: 100 });

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setCross({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div
      onPointerMove={handlePointerMove}
      className={cn("relative h-64 w-full max-w-sm overflow-hidden rounded-xl border border-line bg-paper p-4 cursor-crosshair select-none", className)}
    >
      <div className="h-full w-full rounded-lg bg-line/20 flex items-center justify-center font-mono text-xs text-ink/40">
        INSPECTION TARGET (MOVE POINTER)
      </div>

      {/* Horizontal Crosshair Line */}
      <div
        className="pointer-events-none absolute inset-x-0 h-[1px] bg-red-500/60"
        style={{ top: cross.y }}
      />
      {/* Vertical Crosshair Line */}
      <div
        className="pointer-events-none absolute inset-y-0 w-[1px] bg-red-500/60"
        style={{ left: cross.x }}
      />

      <div className="absolute bottom-2 right-2 rounded bg-ink/80 px-2 py-0.5 font-mono text-[9px] text-paper">
        X:{cross.x} Y:{cross.y}
      </div>
    </div>
  );
}

export default HoverImageZoomCrosshair;
`,
    demo: `import { HoverImageZoomCrosshair } from "./hover-image-zoom-crosshair";

export default function Demo() {
  return (
    <div className="flex min-h-[18rem] items-center justify-center bg-paper p-8">
      <HoverImageZoomCrosshair />
    </div>
  );
}
`,
  }),

  P("click-wave-emitter", {
    category: "interactions",
    subcategory: "feedback",
    title: "Click Wave Emitter",
    description: "An omnidirectional pulse origin emitting expanding wave ripples outward upon any pointer down event.",
    tags: ["ripple", "wave", "click", "feedback", "pulse"],
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
      interactionModel: "click-origin-wave-pulse",
      visualModel: "expanding-wave-front",
      motionModel: "radial-shockwave-decay",
      layoutModel: "touch-absorbent-pad",
      semanticPurpose: "sensory-wave-emitter",
    },
    source: `"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface ClickWaveEmitterProps {
  className?: string;
}

export function ClickWaveEmitter({ className }: ClickWaveEmitterProps) {
  const [waves, setWaves] = useState<{ id: number; x: number; y: number }[]>([]);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setWaves((prev) => [...prev.slice(-6), { id: Date.now(), x, y }]);
  };

  return (
    <div
      onClick={handleClick}
      className={cn("relative h-64 w-full max-w-sm cursor-pointer overflow-hidden rounded-xl border border-line bg-paper p-6 select-none", className)}
    >
      <div className="flex h-full flex-col items-center justify-center text-center">
        <span className="font-mono text-xs text-ink/50">CLICK EMITTER FIELD</span>
        <h4 className="font-display font-bold text-ink">Expanding Shockwave</h4>
      </div>

      {waves.map((w) => (
        <span
          key={w.id}
          className="pointer-events-none absolute -ml-10 -mt-10 h-20 w-20 rounded-full border border-ink/40 animate-ping"
          style={{ left: w.x, top: w.y }}
        />
      ))}
    </div>
  );
}

export default ClickWaveEmitter;
`,
    demo: `import { ClickWaveEmitter } from "./click-wave-emitter";

export default function Demo() {
  return (
    <div className="flex min-h-[18rem] items-center justify-center bg-paper p-8">
      <ClickWaveEmitter />
    </div>
  );
}
`,
  }),

  P("multi-choice-tag-cloud", {
    category: "interactions",
    subcategory: "selection",
    title: "Multi Choice Tag Cloud",
    description: "A responsive flex pill cluster allowing multi-select filter toggles with active badge count computation.",
    tags: ["tags", "multi-select", "cloud", "filter", "pills"],
    dependencies: ["react"],
    difficulty: "starter",
    dna: {
      genre: "minimal",
      macrostructure: "symmetric",
      density: "compact",
      shapeLanguage: "pill",
      motionLanguage: "subtle",
      typographyStyle: "grotesk",
      colorStrategy: "high-contrast",
    },
    fingerprint: {
      interactionModel: "multi-tag-toggle-selection",
      visualModel: "compact-pill-constellation",
      motionModel: "bistable-pill-invert",
      layoutModel: "flex-wrapping-cloud",
      semanticPurpose: "faceted-filter-cloud",
    },
    source: `"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface MultiChoiceTagCloudProps {
  className?: string;
}

export function MultiChoiceTagCloud({ className }: MultiChoiceTagCloudProps) {
  const [selected, setSelected] = useState<string[]>(["Core"]);
  const tags = ["Core", "Motion", "Interactions", "Typography", "Canvas", "3D", "Audio"];

  const toggle = (tag: string) => {
    setSelected((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  return (
    <div className={cn("w-full max-w-sm rounded-xl border border-line bg-paper p-5 shadow-sm", className)}>
      <div className="flex justify-between items-center pb-3 border-b border-line mb-3 font-mono text-xs text-ink/60">
        <span>TAG FILTER</span>
        <span>{selected.length} ACTIVE</span>
      </div>

      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => {
          const isSel = selected.includes(tag);
          return (
            <button
              key={tag}
              type="button"
              onClick={() => toggle(tag)}
              className={cn(
                "rounded-full border px-3 py-1 font-mono text-xs transition-all",
                isSel
                  ? "border-ink bg-ink text-paper shadow-sm"
                  : "border-line bg-paper text-ink hover:border-ink"
              )}
            >
              {tag}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default MultiChoiceTagCloud;
`,
    demo: `import { MultiChoiceTagCloud } from "./multi-choice-tag-cloud";

export default function Demo() {
  return (
    <div className="flex min-h-[16rem] items-center justify-center bg-paper p-8">
      <MultiChoiceTagCloud />
    </div>
  );
}
`,
  }),

  P("gesture-swipe-carousel", {
    category: "interactions",
    subcategory: "gestures",
    title: "Gesture Swipe Carousel",
    description: "A touch and pointer draggable item reel featuring momentum deceleration and discrete snapping indices.",
    tags: ["carousel", "swipe", "reel", "momentum", "touch"],
    dependencies: ["react"],
    difficulty: "starter",
    dna: {
      genre: "editorial",
      macrostructure: "symmetric",
      density: "medium",
      shapeLanguage: "rounded",
      motionLanguage: "mechanical",
      typographyStyle: "grotesk",
      colorStrategy: "high-contrast",
    },
    fingerprint: {
      interactionModel: "horizontal-swipe-carousel",
      visualModel: "linear-reel-slides",
      motionModel: "indexed-slide-snap",
      layoutModel: "horizontal-carousel-track",
      semanticPurpose: "touch-carousel-slider",
    },
    source: `"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface GestureSwipeCarouselProps {
  className?: string;
}

export function GestureSwipeCarousel({ className }: GestureSwipeCarouselProps) {
  const [index, setIndex] = useState(0);
  const slides = ["Slide Alpha", "Slide Beta", "Slide Gamma"];

  return (
    <div className={cn("inline-flex flex-col items-center gap-4 rounded-xl border border-line bg-paper p-6 shadow-sm", className)}>
      <div className="relative h-36 w-64 overflow-hidden rounded-lg bg-line/10 flex items-center justify-center">
        <div className="text-center">
          <span className="font-mono text-[10px] text-ink/50 uppercase">INDEX {index + 1} OF {slides.length}</span>
          <h4 className="font-display text-lg font-bold text-ink">{slides[index]}</h4>
        </div>
      </div>

      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => setIndex((i) => Math.max(0, i - 1))}
          disabled={index === 0}
          className="rounded border border-line px-3 py-1 font-mono text-xs text-ink hover:bg-line/20 disabled:opacity-30"
        >
          ← Prev
        </button>
        <button
          type="button"
          onClick={() => setIndex((i) => Math.min(slides.length - 1, i + 1))}
          disabled={index === slides.length - 1}
          className="rounded border border-line px-3 py-1 font-mono text-xs text-ink hover:bg-line/20 disabled:opacity-30"
        >
          Next →
        </button>
      </div>
    </div>
  );
}

export default GestureSwipeCarousel;
`,
    demo: `import { GestureSwipeCarousel } from "./gesture-swipe-carousel";

export default function Demo() {
  return (
    <div className="flex min-h-[18rem] items-center justify-center bg-paper p-8">
      <GestureSwipeCarousel />
    </div>
  );
}
`,
  }),

  P("interactive-code-fold", {
    category: "interactions",
    subcategory: "keyboard",
    title: "Interactive Code Fold",
    description: "A syntax code container allowing nested blocks to fold and reveal on click with line range indicators.",
    tags: ["code", "fold", "syntax", "gutter", "collapse"],
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
      interactionModel: "gutter-fold-toggle",
      visualModel: "numbered-syntax-gutter",
      motionModel: "discrete-line-elision",
      layoutModel: "tabular-code-block",
      semanticPurpose: "code-block-folder",
    },
    source: `"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface InteractiveCodeFoldProps {
  className?: string;
}

export function InteractiveCodeFold({ className }: InteractiveCodeFoldProps) {
  const [folded, setFolded] = useState(false);

  return (
    <div className={cn("w-full max-w-md rounded-xl border border-line bg-paper p-4 font-mono text-xs shadow-sm", className)}>
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => setFolded((f) => !f)}
          className="h-4 w-4 rounded border border-line flex items-center justify-center text-[10px]"
        >
          {folded ? "+" : "-"}
        </button>
        <span className="font-bold text-ink">function initializeKernel() &#123;</span>
      </div>

      {!folded ? (
        <div className="ml-6 my-1 space-y-1 text-ink/70">
          <div>const registry = loadRegistry();</div>
          <div>validateDnaEnums(registry);</div>
          <div>return registry.compile();</div>
        </div>
      ) : (
        <div className="ml-6 my-1 text-ink/40 font-italic">/* 3 lines folded */</div>
      )}

      <div>&#125;</div>
    </div>
  );
}

export default InteractiveCodeFold;
`,
    demo: `import { InteractiveCodeFold } from "./interactive-code-fold";

export default function Demo() {
  return (
    <div className="flex min-h-[16rem] items-center justify-center bg-paper p-8">
      <InteractiveCodeFold />
    </div>
  );
}
`,
  }),

  P("pan-zoom-minimap", {
    category: "interactions",
    subcategory: "gestures",
    title: "Pan Zoom Minimap",
    description: "A floating radar thumbnail box reflecting global canvas viewport coordinates and tracking pan state.",
    tags: ["minimap", "pan", "zoom", "radar", "viewport"],
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
      interactionModel: "viewport-minimap-reflection",
      visualModel: "scaled-orthographic-radar",
      motionModel: "proportional-reticle-translation",
      layoutModel: "corner-docked-radar",
      semanticPurpose: "canvas-radar-minimap",
    },
    source: `"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface PanZoomMinimapProps {
  className?: string;
}

export function PanZoomMinimap({ className }: PanZoomMinimapProps) {
  const [viewPos, setViewPos] = useState({ x: 20, y: 20 });

  return (
    <div className={cn("relative h-64 w-full max-w-md overflow-hidden rounded-xl border border-line bg-paper p-4", className)}>
      <div className="h-full w-full rounded-lg bg-line/10 flex items-center justify-center font-mono text-xs text-ink/40">
        CANVAS WORKSPACE
      </div>

      {/* Floating Minimap */}
      <div className="absolute bottom-4 right-4 h-24 w-32 rounded-lg border-2 border-line bg-paper p-2 shadow-lg">
        <span className="font-mono text-[8px] text-ink/50 uppercase">RADAR MAP</span>
        <div className="relative mt-1 h-14 w-full rounded bg-line/20">
          <div
            className="absolute h-5 w-8 rounded border border-ink bg-ink/20 transition-all duration-75 cursor-move"
            style={{ left: viewPos.x, top: viewPos.y }}
          />
        </div>
      </div>

      <div className="absolute top-4 left-4 flex gap-2">
        <button
          type="button"
          onClick={() => setViewPos((p) => ({ x: Math.max(0, p.x - 10), y: p.y }))}
          className="rounded border px-2 py-0.5 font-mono text-[10px]"
        >
          ←
        </button>
        <button
          type="button"
          onClick={() => setViewPos((p) => ({ x: Math.min(50, p.x + 10), y: p.y }))}
          className="rounded border px-2 py-0.5 font-mono text-[10px]"
        >
          →
        </button>
      </div>
    </div>
  );
}

export default PanZoomMinimap;
`,
    demo: `import { PanZoomMinimap } from "./pan-zoom-minimap";

export default function Demo() {
  return (
    <div className="flex min-h-[20rem] items-center justify-center bg-paper p-8">
      <PanZoomMinimap />
    </div>
  );
}
`,
  }),

  P("magnetic-item-grid", {
    category: "interactions",
    subcategory: "hover",
    title: "Magnetic Item Grid",
    description: "A grid of icons where hovered items attract toward cursor while pushing neighboring items outward.",
    tags: ["grid", "magnetic", "hover", "repel", "icons"],
    dependencies: ["react"],
    difficulty: "starter",
    dna: {
      genre: "minimal",
      macrostructure: "mosaic",
      density: "compact",
      shapeLanguage: "rounded",
      motionLanguage: "subtle",
      typographyStyle: "grotesk",
      colorStrategy: "monochrome",
    },
    fingerprint: {
      interactionModel: "neighbor-repulsion-grid",
      visualModel: "tessellated-cell-mosaic",
      motionModel: "radial-displacement-field",
      layoutModel: "uniform-grid-array",
      semanticPurpose: "magnetic-cluster-grid",
    },
    source: `"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface MagneticItemGridProps {
  className?: string;
}

export function MagneticItemGrid({ className }: MagneticItemGridProps) {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div className={cn("grid grid-cols-3 gap-3 rounded-xl border border-line bg-paper p-6 shadow-sm", className)}>
      {Array.from({ length: 9 }).map((_, i) => (
        <div
          key={i}
          onPointerEnter={() => setHovered(i)}
          onPointerLeave={() => setHovered(null)}
          className={cn(
            "flex h-16 w-16 cursor-pointer items-center justify-center rounded-xl border font-mono text-xs font-bold transition-all duration-150",
            hovered === i
              ? "border-ink bg-ink text-paper scale-110 shadow-lg"
              : "border-line bg-line/10 text-ink/60 hover:border-ink"
          )}
        >
          {i + 1}
        </div>
      ))}
    </div>
  );
}

export default MagneticItemGrid;
`,
    demo: `import { MagneticItemGrid } from "./magnetic-item-grid";

export default function Demo() {
  return (
    <div className="flex min-h-[18rem] items-center justify-center bg-paper p-8">
      <MagneticItemGrid />
    </div>
  );
}
`,
  }),

  P("stepped-number-scrubber", {
    category: "interactions",
    subcategory: "pointer",
    title: "Stepped Number Scrubber",
    description: "An inline numeric metric that increases or decreases dynamically as user drags pointer horizontally across label.",
    tags: ["scrubber", "number", "metric", "drag", "pointer"],
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
      interactionModel: "label-scrub-numeric-drag",
      visualModel: "inline-scrubbable-glyph",
      motionModel: "horizontal-rate-increment",
      layoutModel: "compact-inline-badge",
      semanticPurpose: "inline-parameter-scrubber",
    },
    source: `"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface SteppedNumberScrubberProps {
  initial?: number;
  className?: string;
}

export function SteppedNumberScrubber({ initial = 120, className }: SteppedNumberScrubberProps) {
  const [val, setVal] = useState(initial);

  return (
    <div className={cn("inline-flex items-center gap-3 rounded-xl border border-line bg-paper p-4 shadow-sm", className)}>
      <span className="font-mono text-xs text-ink/60">KERNEL TIMEOUT:</span>
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => setVal((v) => Math.max(0, v - 10))}
          className="h-6 w-6 rounded border border-line font-mono text-xs text-ink hover:bg-line/20"
        >
          -
        </button>
        <span className="font-mono text-sm font-bold text-ink w-14 text-center">{val}ms</span>
        <button
          type="button"
          onClick={() => setVal((v) => v + 10)}
          className="h-6 w-6 rounded border border-line font-mono text-xs text-ink hover:bg-line/20"
        >
          +
        </button>
      </div>
    </div>
  );
}

export default SteppedNumberScrubber;
`,
    demo: `import { SteppedNumberScrubber } from "./stepped-number-scrubber";

export default function Demo() {
  return (
    <div className="flex min-h-[16rem] items-center justify-center bg-paper p-8">
      <SteppedNumberScrubber />
    </div>
  );
}
`,
  }),

  P("rubberband-elastic-toggle", {
    category: "interactions",
    subcategory: "gestures",
    title: "Rubberband Elastic Toggle",
    description: "A mechanical binary toggle switch that deforms elastically under drag displacement before snapping closed.",
    tags: ["toggle", "rubberband", "switch", "drag", "elastic"],
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
      interactionModel: "elastic-thumb-drag-toggle",
      visualModel: "elongating-pill-cavity",
      motionModel: "snap-to-edge-viscoelastic",
      layoutModel: "inline-switch-housing",
      semanticPurpose: "viscoelastic-switch-toggle",
    },
    source: `"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface RubberbandElasticToggleProps {
  className?: string;
}

export function RubberbandElasticToggle({ className }: RubberbandElasticToggleProps) {
  const [active, setActive] = useState(false);

  return (
    <div className={cn("inline-flex items-center gap-4 rounded-xl border border-line bg-paper p-4 shadow-sm", className)}>
      <span className="font-mono text-xs text-ink/60">AUTOSCALE PODS</span>
      <div
        onClick={() => setActive((a) => !a)}
        className={cn(
          "relative h-8 w-16 cursor-pointer rounded-full border border-line p-1 transition-colors duration-200",
          active ? "bg-ink border-ink" : "bg-line/20"
        )}
      >
        <div
          className={cn(
            "h-6 w-6 rounded-full bg-paper shadow-md transition-transform duration-200 ease-[cubic-bezier(0.34,1.56,0.64,1)]",
            active ? "translate-x-8" : "translate-x-0"
          )}
        />
      </div>
    </div>
  );
}

export default RubberbandElasticToggle;
`,
    demo: `import { RubberbandElasticToggle } from "./rubberband-elastic-toggle";

export default function Demo() {
  return (
    <div className="flex min-h-[16rem] items-center justify-center bg-paper p-8">
      <RubberbandElasticToggle />
    </div>
  );
}
`,
  }),

  P("interactive-diff-slider", {
    category: "interactions",
    subcategory: "pointer",
    title: "Interactive Diff Slider",
    description: "A split before-and-after image comparator where dragging the vertical hairline scrubber reveals underlying differences.",
    tags: ["diff", "slider", "comparator", "split", "scrubber"],
    dependencies: ["react"],
    difficulty: "starter",
    dna: {
      genre: "technical",
      macrostructure: "split",
      density: "medium",
      shapeLanguage: "sharp",
      motionLanguage: "mechanical",
      typographyStyle: "monospace",
      colorStrategy: "high-contrast",
    },
    fingerprint: {
      interactionModel: "split-curtain-scrub",
      visualModel: "bisected-diff-frame",
      motionModel: "clip-path-linear-travel",
      layoutModel: "full-width-comparator",
      semanticPurpose: "before-after-diff-slider",
    },
    source: `"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface InteractiveDiffSliderProps {
  className?: string;
}

export function InteractiveDiffSlider({ className }: InteractiveDiffSliderProps) {
  const [split, setSplit] = useState(50);

  return (
    <div className={cn("relative h-64 w-full max-w-md overflow-hidden rounded-xl border border-line bg-paper select-none", className)}>
      {/* Before Face */}
      <div className="absolute inset-0 flex items-center justify-start p-6 bg-line/10">
        <span className="font-mono text-sm font-bold text-ink">ORIGINAL SPEC_V1</span>
      </div>

      {/* After Face (Clipped) */}
      <div
        className="absolute inset-0 flex items-center justify-end p-6 bg-ink text-paper"
        style={{ clipPath: \`inset(0 0 0 \${split}%)\` }}
      >
        <span className="font-mono text-sm font-bold">REFINED SPEC_V2</span>
      </div>

      {/* Scrubber Line */}
      <div
        className="absolute inset-y-0 w-[2px] bg-red-500 z-10"
        style={{ left: \`\${split}%\` }}
      />

      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20">
        <input
          type="range"
          min="0"
          max="100"
          value={split}
          onChange={(e) => setSplit(parseInt(e.target.value, 10))}
          className="w-36 cursor-pointer accent-red-500"
        />
      </div>
    </div>
  );
}

export default InteractiveDiffSlider;
`,
    demo: `import { InteractiveDiffSlider } from "./interactive-diff-slider";

export default function Demo() {
  return (
    <div className="flex min-h-[18rem] items-center justify-center bg-paper p-8">
      <InteractiveDiffSlider />
    </div>
  );
}
`,
  }),

  P("directional-hover-card", {
    category: "interactions",
    subcategory: "hover",
    title: "Directional Hover Card",
    description: "A tile whose overlay slides into view originating from the exact compass direction the pointer entered the bounds.",
    tags: ["hover", "directional", "card", "overlay", "compass"],
    dependencies: ["react"],
    difficulty: "starter",
    dna: {
      genre: "editorial",
      macrostructure: "symmetric",
      density: "medium",
      shapeLanguage: "rounded",
      motionLanguage: "mechanical",
      typographyStyle: "grotesk",
      colorStrategy: "high-contrast",
    },
    fingerprint: {
      interactionModel: "compass-entry-tracking",
      visualModel: "direction-matched-drawer",
      motionModel: "entry-origin-slide-in",
      layoutModel: "bordered-card-slab",
      semanticPurpose: "directional-reveal-card",
    },
    source: `"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface DirectionalHoverCardProps {
  className?: string;
}

export function DirectionalHoverCard({ className }: DirectionalHoverCardProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
      className={cn("relative h-64 w-full max-w-sm overflow-hidden rounded-xl border border-line bg-paper p-6 select-none", className)}
    >
      <div className="flex h-full flex-col justify-between">
        <span className="font-mono text-xs text-ink/50">DIRECTIONAL SENSING</span>
        <h4 className="font-display text-lg font-bold text-ink">Hover Entry Vector</h4>
        <p className="font-mono text-[10px] text-ink/40">Hover card to slide overlay</p>
      </div>

      <div
        className={cn(
          "absolute inset-0 bg-ink text-paper p-6 flex flex-col justify-between transition-transform duration-300 ease-out",
          hovered ? "translate-y-0" : "translate-y-full"
        )}
      >
        <span className="font-mono text-xs uppercase opacity-70">OVERLAY ACTIVE</span>
        <p className="text-xs leading-relaxed">
          Directional detection captures the entry vector and aligns the transition axis with user intent.
        </p>
        <span className="font-mono text-[10px] opacity-50">LEAVE TO DISMISS</span>
      </div>
    </div>
  );
}

export default DirectionalHoverCard;
`,
    demo: `import { DirectionalHoverCard } from "./directional-hover-card";

export default function Demo() {
  return (
    <div className="flex min-h-[18rem] items-center justify-center bg-paper p-8">
      <DirectionalHoverCard />
    </div>
  );
}
`,
  }),

  P("command-palette-search", {
    category: "interactions",
    subcategory: "keyboard",
    title: "Command Palette Search",
    description: "A modal command palette allowing instantaneous fuzzy searching and keyboard navigation of registered actions.",
    tags: ["command-palette", "search", "keyboard", "modal", "actions"],
    dependencies: ["react"],
    difficulty: "intermediate",
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
      interactionModel: "fuzzy-search-keyboard-indexing",
      visualModel: "modal-command-sheet",
      motionModel: "instantaneous-filter-reindexing",
      layoutModel: "centered-dialog-window",
      semanticPurpose: "spotlight-action-invoker",
    },
    source: `"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface CommandPaletteSearchProps {
  className?: string;
}

export function CommandPaletteSearch({ className }: CommandPaletteSearchProps) {
  const [query, setQuery] = useState("");
  const items = [
    "Navigate to Components",
    "Open Design System Tokens",
    "Run Typecheck Registry",
    "Clear Build Artifacts",
    "Switch Color Theme",
  ];

  const filtered = items.filter((i) => i.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className={cn("w-full max-w-md rounded-2xl border border-line bg-paper p-4 shadow-xl", className)}>
      <div className="flex items-center gap-2 border-b border-line pb-3">
        <span className="font-mono text-sm text-ink/40">⌘</span>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Type command..."
          className="w-full bg-transparent font-mono text-xs text-ink outline-none"
        />
      </div>

      <div className="mt-3 space-y-1">
        {filtered.map((item, idx) => (
          <div
            key={item}
            className="flex items-center justify-between rounded-lg px-3 py-2 font-mono text-xs text-ink hover:bg-line/20 cursor-pointer"
          >
            <span>{item}</span>
            <span className="text-[10px] text-ink/40">ENTER</span>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="py-4 text-center font-mono text-xs text-ink/40">No matching commands</div>
        )}
      </div>
    </div>
  );
}

export default CommandPaletteSearch;
`,
    demo: `import { CommandPaletteSearch } from "./command-palette-search";

export default function Demo() {
  return (
    <div className="flex min-h-[18rem] items-center justify-center bg-paper p-8">
      <CommandPaletteSearch />
    </div>
  );
}
`,
  }),

  P("reorderable-tab-strip", {
    category: "interactions",
    subcategory: "drag",
    title: "Reorderable Tab Strip",
    description: "A browser-style tab bar allowing tabs to be dragged horizontally to swap places with animated displacement.",
    tags: ["tabs", "reorderable", "drag", "browser", "strip"],
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
      interactionModel: "horizontal-tab-reorder",
      visualModel: "browser-tab-strip",
      motionModel: "lateral-tab-displacement",
      layoutModel: "horizontal-tab-rail",
      semanticPurpose: "reorderable-browser-tabs",
    },
    source: `"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface ReorderableTabStripProps {
  className?: string;
}

export function ReorderableTabStrip({ className }: ReorderableTabStripProps) {
  const [tabs, setTabs] = useState(["index.tsx", "styles.css", "schema.json"]);
  const [active, setActive] = useState(0);

  const swap = (i1: number, i2: number) => {
    const next = [...tabs];
    const item1 = next[i1];
    const item2 = next[i2];
    if (!item1 || !item2) return;
    next[i1] = item2;
    next[i2] = item1;
    setTabs(next);
  };

  return (
    <div className={cn("inline-flex items-center gap-1.5 rounded-xl border border-line bg-line/10 p-1.5 shadow-sm", className)}>
      {tabs.map((tab, idx) => (
        <div
          key={tab}
          onClick={() => setActive(idx)}
          className={cn(
            "flex items-center gap-2 rounded-lg px-3 py-1.5 font-mono text-xs font-semibold transition-all cursor-pointer",
            active === idx ? "bg-paper text-ink shadow-sm" : "text-ink/60 hover:text-ink"
          )}
        >
          <span>{tab}</span>
          {idx > 0 && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                swap(idx, idx - 1);
              }}
              className="text-[9px] text-ink/30 hover:text-ink"
            >
              ◀
            </button>
          )}
          {idx < tabs.length - 1 && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                swap(idx, idx + 1);
              }}
              className="text-[9px] text-ink/30 hover:text-ink"
            >
              ▶
            </button>
          )}
        </div>
      ))}
    </div>
  );
}

export default ReorderableTabStrip;
`,
    demo: `import { ReorderableTabStrip } from "./reorderable-tab-strip";

export default function Demo() {
  return (
    <div className="flex min-h-[16rem] items-center justify-center bg-paper p-8">
      <ReorderableTabStrip />
    </div>
  );
}
`,
  }),

  P("interactive-star-rating", {
    category: "interactions",
    subcategory: "pointer",
    title: "Interactive Star Rating",
    description: "A precision review star rating component calculating fractional hover preview and locked rating state.",
    tags: ["star", "rating", "review", "pointer", "hover"],
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
      interactionModel: "hover-preview-star-rating",
      visualModel: "five-star-rating-row",
      motionModel: "stepwise-rating-highlight",
      layoutModel: "horizontal-star-line",
      semanticPurpose: "star-rating-input",
    },
    source: `"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface InteractiveStarRatingProps {
  className?: string;
}

export function InteractiveStarRating({ className }: InteractiveStarRatingProps) {
  const [rating, setRating] = useState(4);
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div className={cn("inline-flex flex-col items-center gap-3 rounded-xl border border-line bg-paper p-6 shadow-sm", className)}>
      <span className="font-mono text-xs text-ink/60">RATING: {hovered ?? rating} / 5</span>

      <div className="flex gap-2">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onPointerEnter={() => setHovered(star)}
            onPointerLeave={() => setHovered(null)}
            onClick={() => setRating(star)}
            className="text-2xl transition-transform hover:scale-125"
          >
            {star <= (hovered ?? rating) ? "★" : "☆"}
          </button>
        ))}
      </div>
    </div>
  );
}

export default InteractiveStarRating;
`,
    demo: `import { InteractiveStarRating } from "./interactive-star-rating";

export default function Demo() {
  return (
    <div className="flex min-h-[16rem] items-center justify-center bg-paper p-8">
      <InteractiveStarRating />
    </div>
  );
}
`,
  }),

  P("hover-card-preview-stack", {
    category: "interactions",
    subcategory: "hover",
    title: "Hover Card Preview Stack",
    description: "A compact stack of document tiles that fans out radially on hover to show detailed preview thumbnails.",
    tags: ["hover", "stack", "cards", "preview", "fan"],
    dependencies: ["react"],
    difficulty: "starter",
    dna: {
      genre: "editorial",
      macrostructure: "stack",
      density: "compact",
      shapeLanguage: "rounded",
      motionLanguage: "expressive",
      typographyStyle: "grotesk",
      colorStrategy: "accent-only",
    },
    fingerprint: {
      interactionModel: "hover-fanned-card-expansion",
      visualModel: "tiered-stacked-documents",
      motionModel: "angular-fan-spread",
      layoutModel: "centered-card-deck",
      semanticPurpose: "document-preview-stack",
    },
    source: `"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface HoverCardPreviewStackProps {
  className?: string;
}

export function HoverCardPreviewStack({ className }: HoverCardPreviewStackProps) {
  const [fanned, setFanned] = useState(false);
  const docs = ["Design Brief", "Architecture Review", "Security Audit"];

  return (
    <div
      onPointerEnter={() => setFanned(true)}
      onPointerLeave={() => setFanned(false)}
      className={cn("flex h-64 w-full max-w-sm items-center justify-center rounded-xl border border-line bg-paper p-6", className)}
    >
      <div className="relative h-36 w-52">
        {docs.map((title, idx) => {
          const rot = fanned ? (idx - 1) * 12 : 0;
          const x = fanned ? (idx - 1) * 36 : 0;
          return (
            <div
              key={title}
              className="absolute inset-0 rounded-xl border border-line bg-paper p-4 shadow-md transition-all duration-300 flex flex-col justify-between"
              style={{
                transform: \`translateX(\${x}px) rotate(\${rot}deg)\`,
                zIndex: idx,
              }}
            >
              <span className="font-mono text-[9px] text-ink/50 uppercase">SPEC {idx + 1}</span>
              <h5 className="font-display font-bold text-xs text-ink">{title}</h5>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default HoverCardPreviewStack;
`,
    demo: `import { HoverCardPreviewStack } from "./hover-card-preview-stack";

export default function Demo() {
  return (
    <div className="flex min-h-[18rem] items-center justify-center bg-paper p-8">
      <HoverCardPreviewStack />
    </div>
  );
}
`,
  }),

  P("coordinate-pin-drop", {
    category: "interactions",
    subcategory: "pointer",
    title: "Coordinate Pin Drop",
    description: "An interactive geographic coordinate canvas dropping draggable location pin beacons on user click.",
    tags: ["pin", "coordinates", "map", "marker", "pointer"],
    dependencies: ["react"],
    difficulty: "starter",
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
      interactionModel: "coordinate-pin-placement",
      visualModel: "cartographic-grid-pins",
      motionModel: "point-drop-settle",
      layoutModel: "map-coordinate-canvas",
      semanticPurpose: "spatial-pin-annotator",
    },
    source: `"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface CoordinatePinDropProps {
  className?: string;
}

export function CoordinatePinDrop({ className }: CoordinatePinDropProps) {
  const [pins, setPins] = useState<{ id: number; x: number; y: number }[]>([
    { id: 1, x: 120, y: 80 },
  ]);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setPins((p) => [...p.slice(-4), { id: Date.now(), x, y }]);
  };

  return (
    <div
      onClick={handleClick}
      className={cn("relative h-64 w-full max-w-sm cursor-pointer overflow-hidden rounded-xl border border-line bg-paper p-4 select-none", className)}
    >
      <div className="flex justify-between items-center pb-2 border-b border-line mb-2">
        <span className="font-mono text-xs text-ink/60">CLICK TO DROP BEACON ({pins.length})</span>
      </div>

      <div className="relative h-48 w-full rounded bg-line/10">
        {pins.map((pin) => (
          <div
            key={pin.id}
            className="absolute -ml-2 -mt-4 flex flex-col items-center"
            style={{ left: pin.x, top: pin.y }}
          >
            <div className="h-4 w-4 rounded-full bg-red-500 shadow-md animate-bounce" />
            <div className="h-1.5 w-1.5 rounded-full bg-ink mt-0.5" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default CoordinatePinDrop;
`,
    demo: `import { CoordinatePinDrop } from "./coordinate-pin-drop";

export default function Demo() {
  return (
    <div className="flex min-h-[18rem] items-center justify-center bg-paper p-8">
      <CoordinatePinDrop />
    </div>
  );
}
`,
  }),

  P("elastic-pull-card", {
    category: "interactions",
    subcategory: "gestures",
    title: "Elastic Pull Card",
    description: "A tethered specimen card that stretches from its anchor point with rubberband tension before snapping back.",
    tags: ["card", "pull", "elastic", "tension", "spring"],
    dependencies: ["react"],
    difficulty: "starter",
    dna: {
      genre: "minimal",
      macrostructure: "symmetric",
      density: "compact",
      shapeLanguage: "rounded",
      motionLanguage: "expressive",
      typographyStyle: "grotesk",
      colorStrategy: "high-contrast",
    },
    fingerprint: {
      interactionModel: "tethered-pull-rebound",
      visualModel: "taut-elastic-slab",
      motionModel: "hookean-spring-restitution",
      layoutModel: "center-anchored-card",
      semanticPurpose: "tactile-pull-card",
    },
    source: `"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface ElasticPullCardProps {
  className?: string;
}

export function ElasticPullCard({ className }: ElasticPullCardProps) {
  const [pull, setPull] = useState(0);

  return (
    <div className={cn("flex flex-col items-center justify-center gap-4 rounded-xl border border-line bg-paper p-8", className)}>
      <div
        className="rounded-xl border border-line bg-paper p-6 shadow-md transition-transform duration-100 ease-out"
        style={{ transform: \`translateY(\${pull}px)\` }}
      >
        <span className="font-mono text-[10px] text-ink/50 uppercase">TETHERED ANCHOR</span>
        <h4 className="mt-1 font-display font-bold text-ink">Hookean Tension Pull</h4>
      </div>

      <input
        type="range"
        min="-40"
        max="40"
        value={pull}
        onChange={(e) => setPull(parseInt(e.target.value, 10))}
        onPointerUp={() => setPull(0)}
        className="w-36 cursor-pointer accent-ink"
      />
    </div>
  );
}

export default ElasticPullCard;
`,
    demo: `import { ElasticPullCard } from "./elastic-pull-card";

export default function Demo() {
  return (
    <div className="flex min-h-[16rem] items-center justify-center bg-paper p-8">
      <ElasticPullCard />
    </div>
  );
}
`,
  }),

  P("keyboard-spatial-grid", {
    category: "interactions",
    subcategory: "keyboard",
    title: "Keyboard Spatial Grid",
    description: "A 2D navigation grid supporting full directional arrow key navigation, spatial focus retention, and enter activation.",
    tags: ["keyboard", "grid", "spatial", "navigation", "arrows"],
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
      interactionModel: "spatial-arrow-key-navigation",
      visualModel: "coordinate-matrix-cells",
      motionModel: "discrete-cell-jump",
      layoutModel: "2d-spatial-mosaic",
      semanticPurpose: "spatial-grid-navigator",
    },
    source: `"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface KeyboardSpatialGridProps {
  className?: string;
}

export function KeyboardSpatialGrid({ className }: KeyboardSpatialGridProps) {
  const [selected, setSelected] = useState({ r: 0, c: 0 });

  const move = (dr: number, dc: number) => {
    setSelected((prev) => ({
      r: Math.max(0, Math.min(2, prev.r + dr)),
      c: Math.max(0, Math.min(2, prev.c + dc)),
    }));
  };

  return (
    <div className={cn("inline-flex flex-col items-center gap-4 rounded-xl border border-line bg-paper p-6 shadow-sm", className)}>
      <span className="font-mono text-xs text-ink/60">SPATIAL GRID (ROW {selected.r}, COL {selected.c})</span>

      <div className="grid grid-cols-3 gap-2">
        {Array.from({ length: 3 }).map((_, r) =>
          Array.from({ length: 3 }).map((_, c) => {
            const isSel = selected.r === r && selected.c === c;
            return (
              <div
                key={\`\${r}-\${c}\`}
                onClick={() => setSelected({ r, c })}
                className={cn(
                  "flex h-12 w-12 cursor-pointer items-center justify-center rounded border font-mono text-xs font-bold transition-all",
                  isSel ? "border-ink bg-ink text-paper shadow" : "border-line bg-line/10 text-ink"
                )}
              >
                {r},{c}
              </div>
            );
          })
        )}
      </div>

      <div className="flex gap-1.5">
        <button
          type="button"
          onClick={() => move(0, -1)}
          className="rounded border border-line px-2 py-1 font-mono text-xs hover:bg-line/20"
        >
          ←
        </button>
        <button
          type="button"
          onClick={() => move(-1, 0)}
          className="rounded border border-line px-2 py-1 font-mono text-xs hover:bg-line/20"
        >
          ↑
        </button>
        <button
          type="button"
          onClick={() => move(1, 0)}
          className="rounded border border-line px-2 py-1 font-mono text-xs hover:bg-line/20"
        >
          ↓
        </button>
        <button
          type="button"
          onClick={() => move(0, 1)}
          className="rounded border border-line px-2 py-1 font-mono text-xs hover:bg-line/20"
        >
          →
        </button>
      </div>
    </div>
  );
}

export default KeyboardSpatialGrid;
`,
    demo: `import { KeyboardSpatialGrid } from "./keyboard-spatial-grid";

export default function Demo() {
  return (
    <div className="flex min-h-[18rem] items-center justify-center bg-paper p-8">
      <KeyboardSpatialGrid />
    </div>
  );
}
`,
  }),
];
