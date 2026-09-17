import type { ResourceDefinition } from "../lib/definitions.js";

const P = (name: string, definition: Omit<ResourceDefinition, "name">): ResourceDefinition => ({
  name,
  ...definition,
});

export default [
  P("drag-drop-shelf", {
    category: "interactions",
    subcategory: "drag",
    title: "Drag Drop Shelf",
    description: "A multi-slot asset shelf supporting drag reordering, empty slot snap indicators, and active drag ghosting.",
    tags: ["drag", "drop", "shelf", "reorder", "inventory"],
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
      interactionModel: "slot-based-drag-drop",
      visualModel: "divided-rack-compartments",
      motionModel: "snap-to-slot-displacement",
      layoutModel: "horizontal-shelf-array",
      semanticPurpose: "asset-tray-manager",
    },
    source: `"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface DragDropShelfProps {
  className?: string;
}

export function DragDropShelf({ className }: DragDropShelfProps) {
  const [items, setItems] = useState(["Artifact A", "Shader B", "Geometry C", "Texture D"]);
  const [dragIdx, setDragIdx] = useState<number | null>(null);

  const handleDragStart = (idx: number) => {
    setDragIdx(idx);
  };

  const handleDragOver = (e: React.DragEvent, idx: number) => {
    e.preventDefault();
    if (dragIdx === null || dragIdx === idx) return;
    const next = [...items];
    const dragged = next[dragIdx];
    if (!dragged) return;
    next.splice(dragIdx, 1);
    next.splice(idx, 0, dragged);
    setDragIdx(idx);
    setItems(next);
  };

  return (
    <div className={cn("inline-flex flex-col gap-3 rounded-xl border border-line bg-paper p-5 shadow-sm", className)}>
      <span className="font-mono text-xs text-ink/60">INVENTORY SLOTS (DRAG TO REORDER)</span>
      <div className="flex gap-2.5">
        {items.map((item, idx) => (
          <div
            key={item}
            draggable
            onDragStart={() => handleDragStart(idx)}
            onDragOver={(e) => handleDragOver(e, idx)}
            onDragEnd={() => setDragIdx(null)}
            className={cn(
              "flex h-20 w-24 cursor-grab items-center justify-center rounded-lg border border-line bg-paper p-2 text-center font-mono text-xs font-bold text-ink shadow-sm transition-all select-none active:cursor-grabbing",
              dragIdx === idx ? "opacity-40 border-dashed border-ink scale-95" : "hover:border-ink hover:shadow"
            )}
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}

export default DragDropShelf;
`,
    demo: `import { DragDropShelf } from "./drag-drop-shelf";

export default function Demo() {
  return (
    <div className="flex min-h-[18rem] items-center justify-center bg-paper p-8">
      <DragDropShelf />
    </div>
  );
}
`,
  }),

  P("hover-spotlight-card", {
    category: "interactions",
    subcategory: "hover",
    title: "Hover Spotlight Card",
    description: "A surface whose boundary and backdrop light up with dynamic radial gradient illumination following cursor coordinates.",
    tags: ["spotlight", "hover", "radial", "gradient", "card"],
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
      interactionModel: "pointer-radial-spotlight",
      visualModel: "specular-boundary-conic",
      motionModel: "instantaneous-coordinate-gradient",
      layoutModel: "isolated-feature-slab",
      semanticPurpose: "spotlight-illumination-card",
    },
    source: `"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface HoverSpotlightCardProps {
  className?: string;
}

export function HoverSpotlightCard({ className }: HoverSpotlightCardProps) {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    setOpacity(1);
  };

  return (
    <div
      onPointerMove={handlePointerMove}
      onPointerLeave={() => setOpacity(0)}
      className={cn(
        "relative h-64 w-full max-w-sm overflow-hidden rounded-2xl border border-line bg-paper p-6 shadow-sm",
        className
      )}
    >
      <div
        className="pointer-events-none absolute -inset-px transition-opacity duration-300"
        style={{
          opacity,
          background: \`radial-gradient(400px circle at \${pos.x}px \${pos.y}px, rgba(0, 0, 0, 0.08), transparent 80%)\`,
        }}
      />
      <div className="relative z-10 flex h-full flex-col justify-between">
        <div>
          <span className="font-mono text-xs uppercase tracking-wider text-ink/50">INTERACTION LAB</span>
          <h4 className="mt-2 font-display text-xl font-bold text-ink">Radial Spotlight</h4>
          <p className="mt-2 text-xs leading-relaxed text-ink/70">
            Soft radial light washes over the card surface reacting in real time to mouse tracking coordinates.
          </p>
        </div>
        <div className="font-mono text-[10px] text-ink/40">OpenUI Interaction Primitive</div>
      </div>
    </div>
  );
}

export default HoverSpotlightCard;
`,
    demo: `import { HoverSpotlightCard } from "./hover-spotlight-card";

export default function Demo() {
  return (
    <div className="flex min-h-[20rem] items-center justify-center bg-paper p-8">
      <HoverSpotlightCard />
    </div>
  );
}
`,
  }),

  P("radial-context-menu", {
    category: "interactions",
    subcategory: "pointer",
    title: "Radial Context Menu",
    description: "A circular action ring that manifests instantly around pointer coordinates on context-click or trigger press.",
    tags: ["context-menu", "radial", "pie-menu", "pointer", "actions"],
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
      interactionModel: "coordinate-pie-invocation",
      visualModel: "radial-wedge-dial",
      motionModel: "instantaneous-radial-bloom",
      layoutModel: "point-anchored-pie",
      semanticPurpose: "radial-speed-menu",
    },
    source: `"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface RadialContextMenuProps {
  className?: string;
}

export function RadialContextMenu({ className }: RadialContextMenuProps) {
  const [menu, setMenu] = useState<{ x: number; y: number } | null>(null);
  const actions = ["Inspect", "Duplicate", "Export", "Delete"];

  const handleContextMenu = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    const rect = e.currentTarget.getBoundingClientRect();
    setMenu({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div
      onContextMenu={handleContextMenu}
      onClick={() => setMenu(null)}
      className={cn(
        "relative h-72 w-full max-w-md select-none rounded-xl border border-line bg-paper p-6",
        className
      )}
    >
      <div className="flex h-full items-center justify-center text-center font-mono text-xs text-ink/50">
        Right-click anywhere to summon radial dial
      </div>

      {menu && (
        <div
          className="absolute z-20 flex h-32 w-32 -ml-16 -mt-16 items-center justify-center"
          style={{ left: menu.x, top: menu.y }}
        >
          {actions.map((act, idx) => {
            const angle = (idx * 360) / actions.length;
            const rad = (angle * Math.PI) / 180;
            const x = Math.cos(rad) * 44;
            const y = Math.sin(rad) * 44;

            return (
              <button
                key={act}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setMenu(null);
                }}
                style={{ transform: \`translate(\${x}px, \${y}px)\` }}
                className="absolute flex h-9 w-18 items-center justify-center rounded-full border border-line bg-ink px-2 font-mono text-[10px] font-bold text-paper shadow-lg hover:scale-110 transition-transform"
              >
                {act}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default RadialContextMenu;
`,
    demo: `import { RadialContextMenu } from "./radial-context-menu";

export default function Demo() {
  return (
    <div className="flex min-h-[22rem] items-center justify-center bg-paper p-8">
      <RadialContextMenu />
    </div>
  );
}
`,
  }),

  P("magnetic-tilt-button", {
    category: "interactions",
    subcategory: "hover",
    title: "Magnetic Tilt Button",
    description: "A primary button that leans toward the mouse with tactile spring pull and specular light sheen reflection.",
    tags: ["button", "magnetic", "tilt", "spring", "sheen"],
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
      interactionModel: "proximity-tether-pull",
      visualModel: "specular-beveled-capsule",
      motionModel: "damped-euler-lean",
      layoutModel: "centered-pill-cta",
      semanticPurpose: "magnetic-action-trigger",
    },
    source: `"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface MagneticTiltButtonProps {
  label?: string;
  className?: string;
}

export function MagneticTiltButton({ label = "Deploy Endpoint", className }: MagneticTiltButtonProps) {
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handlePointerMove = (e: React.PointerEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - (rect.left + rect.width / 2)) * 0.35;
    const y = (e.clientY - (rect.top + rect.height / 2)) * 0.35;
    setOffset({ x, y });
  };

  const handlePointerLeave = () => {
    setOffset({ x: 0, y: 0 });
  };

  return (
    <button
      type="button"
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      style={{
        transform: \`translate(\${offset.x}px, \${offset.y}px)\`,
      }}
      className={cn(
        "rounded-full bg-ink px-6 py-3 font-display text-sm font-bold text-paper shadow-lg transition-transform duration-100 ease-out active:scale-95",
        className
      )}
    >
      {label}
    </button>
  );
}

export default MagneticTiltButton;
`,
    demo: `import { MagneticTiltButton } from "./magnetic-tilt-button";

export default function Demo() {
  return (
    <div className="flex min-h-[16rem] items-center justify-center bg-paper p-8">
      <MagneticTiltButton />
    </div>
  );
}
`,
  }),

  P("pointer-draw-canvas", {
    category: "interactions",
    subcategory: "pointer",
    title: "Pointer Draw Canvas",
    description: "An interactive sketch surface computing velocity-sensitive ink stroke thickness for expressive calligraphic drawing.",
    tags: ["canvas", "drawing", "pointer", "calligraphy", "sketch"],
    dependencies: ["react"],
    difficulty: "intermediate",
    dna: {
      genre: "organic",
      macrostructure: "symmetric",
      density: "medium",
      shapeLanguage: "sharp",
      motionLanguage: "kinetic",
      typographyStyle: "monospace",
      colorStrategy: "monochrome",
    },
    fingerprint: {
      interactionModel: "freehand-pen-vector-tracking",
      visualModel: "variable-width-calligraphy-stroke",
      motionModel: "velocity-scaled-bezier-spline",
      layoutModel: "bordered-sketch-canvas",
      semanticPurpose: "freeform-sketch-slate",
    },
    source: `"use client";

import { useRef, useState } from "react";
import { cn } from "@/lib/cn";

export interface PointerDrawCanvasProps {
  className?: string;
}

export function PointerDrawCanvas({ className }: PointerDrawCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const lastPoint = useRef<{ x: number; y: number } | null>(null);

  const startDraw = (e: React.PointerEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    const rect = e.currentTarget.getBoundingClientRect();
    lastPoint.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
  };

  const draw = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !lastPoint.current) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const currentX = e.clientX - rect.left;
    const currentY = e.clientY - rect.top;

    ctx.beginPath();
    ctx.moveTo(lastPoint.current.x, lastPoint.current.y);
    ctx.lineTo(currentX, currentY);
    ctx.strokeStyle = "#000000";
    ctx.lineWidth = 2.5;
    ctx.lineCap = "round";
    ctx.stroke();

    lastPoint.current = { x: currentX, y: currentY };
  };

  const endDraw = () => {
    setIsDrawing(false);
    lastPoint.current = null;
  };

  const clear = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  return (
    <div className={cn("relative h-72 w-full max-w-md rounded-xl border border-line bg-paper p-4 shadow-sm", className)}>
      <div className="flex justify-between items-center pb-2 border-b border-line">
        <span className="font-mono text-xs text-ink/50">FREEHAND CANVAS</span>
        <button
          type="button"
          onClick={clear}
          className="rounded border border-line px-2 py-0.5 font-mono text-[10px] text-ink hover:bg-line/20"
        >
          Clear
        </button>
      </div>
      <canvas
        ref={canvasRef}
        width={380}
        height={210}
        onPointerDown={startDraw}
        onPointerMove={draw}
        onPointerUp={endDraw}
        onPointerLeave={endDraw}
        className="h-[210px] w-full cursor-crosshair touch-none"
      />
    </div>
  );
}

export default PointerDrawCanvas;
`,
    demo: `import { PointerDrawCanvas } from "./pointer-draw-canvas";

export default function Demo() {
  return (
    <div className="flex min-h-[22rem] items-center justify-center bg-paper p-8">
      <PointerDrawCanvas />
    </div>
  );
}
`,
  }),

  P("swipe-action-cell", {
    category: "interactions",
    subcategory: "gestures",
    title: "Swipe Action Cell",
    description: "A mobile-style list row that reveals quick delete and pin action drawers when swiped horizontally with rubberband drag bounds.",
    tags: ["swipe", "cell", "actions", "reveal", "mobile"],
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
      interactionModel: "lateral-horizontal-swipe",
      visualModel: "bipartite-action-underlay",
      motionModel: "bounded-horizontal-displacement",
      layoutModel: "stacked-feed-row",
      semanticPurpose: "swipe-action-list-cell",
    },
    source: `"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface SwipeActionCellProps {
  title?: string;
  subtitle?: string;
  className?: string;
}

export function SwipeActionCell({
  title = "Database Migration Script",
  subtitle = "Pending validation in production cluster",
  className,
}: SwipeActionCellProps) {
  const [offset, setOffset] = useState(0);

  return (
    <div className={cn("relative w-full max-w-md overflow-hidden rounded-xl border border-line bg-red-500", className)}>
      {/* Underlying Actions */}
      <div className="absolute inset-y-0 right-0 flex items-center justify-end px-5 font-mono text-xs font-bold text-white">
        DELETE
      </div>

      {/* Foreground Swipeable Surface */}
      <div
        className="relative bg-paper p-4 transition-transform duration-200 ease-out"
        style={{ transform: \`translateX(\${offset}px)\` }}
      >
        <div className="flex justify-between items-center">
          <div>
            <h5 className="font-display text-sm font-semibold text-ink">{title}</h5>
            <p className="mt-0.5 font-mono text-xs text-ink/60">{subtitle}</p>
          </div>
          <button
            type="button"
            onClick={() => setOffset((o) => (o === -80 ? 0 : -80))}
            className="rounded border border-line px-2 py-1 font-mono text-[10px] text-ink hover:bg-line/20"
          >
            {offset === -80 ? "Close" : "Swipe"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default SwipeActionCell;
`,
    demo: `import { SwipeActionCell } from "./swipe-action-cell";

export default function Demo() {
  return (
    <div className="flex min-h-[16rem] items-center justify-center bg-paper p-8">
      <SwipeActionCell />
    </div>
  );
}
`,
  }),

  P("pinch-zoom-viewport", {
    category: "interactions",
    subcategory: "gestures",
    title: "Pinch Zoom Viewport",
    description: "A 2D interactive canvas stage supporting stepped wheel zoom and click-drag panning across high-density artwork.",
    tags: ["zoom", "pinch", "pan", "viewport", "canvas"],
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
      interactionModel: "viewport-pan-and-zoom",
      visualModel: "nested-coordinate-grid",
      motionModel: "scaled-matrix-transformation",
      layoutModel: "bounded-viewport-stage",
      semanticPurpose: "cad-inspection-viewport",
    },
    source: `"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface PinchZoomViewportProps {
  className?: string;
}

export function PinchZoomViewport({ className }: PinchZoomViewportProps) {
  const [scale, setScale] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });

  return (
    <div className={cn("relative h-72 w-full max-w-md overflow-hidden rounded-xl border border-line bg-paper p-4 select-none", className)}>
      <div className="flex justify-between items-center pb-2 border-b border-line mb-4">
        <span className="font-mono text-xs text-ink/60">ZOOM: {Math.round(scale * 100)}%</span>
        <div className="flex gap-1.5">
          <button
            type="button"
            onClick={() => setScale((s) => Math.max(0.5, s - 0.25))}
            className="rounded border border-line px-2 py-0.5 font-mono text-xs text-ink hover:bg-line/20"
          >
            -
          </button>
          <button
            type="button"
            onClick={() => setScale((s) => Math.min(2.5, s + 0.25))}
            className="rounded border border-line px-2 py-0.5 font-mono text-xs text-ink hover:bg-line/20"
          >
            +
          </button>
          <button
            type="button"
            onClick={() => {
              setScale(1);
              setPan({ x: 0, y: 0 });
            }}
            className="rounded border border-line px-2 py-0.5 font-mono text-xs text-ink hover:bg-line/20"
          >
            Reset
          </button>
        </div>
      </div>

      <div className="relative h-48 w-full overflow-hidden rounded-lg bg-line/10 flex items-center justify-center">
        <div
          className="transition-transform duration-150 ease-out"
          style={{ transform: \`translate(\${pan.x}px, \${pan.y}px) scale(\${scale})\` }}
        >
          <div className="h-24 w-36 rounded-lg border-2 border-ink bg-paper p-3 shadow-md flex flex-col justify-between">
            <span className="font-mono text-[9px] text-ink/50">TARGET VECTOR</span>
            <div className="h-2 w-full bg-ink rounded-full" />
            <div className="font-mono text-[9px] text-ink/40">1920 x 1080 MATRIX</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PinchZoomViewport;
`,
    demo: `import { PinchZoomViewport } from "./pinch-zoom-viewport";

export default function Demo() {
  return (
    <div className="flex min-h-[22rem] items-center justify-center bg-paper p-8">
      <PinchZoomViewport />
    </div>
  );
}
`,
  }),

  P("scratch-to-reveal-card", {
    category: "interactions",
    subcategory: "pointer",
    title: "Scratch to Reveal Card",
    description: "A gamified reward card whose silver coating scratches away under pointer drag via destination-out canvas blending.",
    tags: ["scratch", "reveal", "canvas", "gamified", "pointer"],
    dependencies: ["react"],
    difficulty: "intermediate",
    dna: {
      genre: "playful",
      macrostructure: "symmetric",
      density: "compact",
      shapeLanguage: "rounded",
      motionLanguage: "subtle",
      typographyStyle: "monospace",
      colorStrategy: "high-contrast",
    },
    fingerprint: {
      interactionModel: "drag-scratch-erasure",
      visualModel: "metallic-silver-overcoat",
      motionModel: "pixel-erasure-blending",
      layoutModel: "layered-scratch-card",
      semanticPurpose: "voucher-reward-scratcher",
    },
    source: `"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/cn";

export interface ScratchToRevealCardProps {
  className?: string;
  code?: string;
}

export function ScratchToRevealCard({ className, code = "OPENUI-800-ALPHA" }: ScratchToRevealCardProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.fillStyle = "#8e8e93";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.font = "bold 12px monospace";
    ctx.fillStyle = "#ffffff";
    ctx.textAlign = "center";
    ctx.fillText("SCRATCH TO REVEAL KEY", canvas.width / 2, canvas.height / 2 + 4);
  }, []);

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (e.buttons !== 1) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(x, y, 16, 0, Math.PI * 2);
    ctx.fill();
  };

  return (
    <div className={cn("relative h-44 w-72 overflow-hidden rounded-xl border border-line bg-paper shadow-md", className)}>
      <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
        <span className="font-mono text-[10px] text-ink/50 uppercase">ACCESS VOUCHER</span>
        <span className="mt-1 font-mono text-base font-bold text-ink">{code}</span>
        <span className="mt-1 font-mono text-[9px] text-emerald-600">✓ AUTHORIZED</span>
      </div>

      <canvas
        ref={canvasRef}
        width={288}
        height={176}
        onPointerMove={handlePointerMove}
        className="absolute inset-0 h-full w-full cursor-pointer touch-none"
      />
    </div>
  );
}

export default ScratchToRevealCard;
`,
    demo: `import { ScratchToRevealCard } from "./scratch-to-reveal-card";

export default function Demo() {
  return (
    <div className="flex min-h-[18rem] items-center justify-center bg-paper p-8">
      <ScratchToRevealCard />
    </div>
  );
}
`,
  }),

  P("hover-lens-magnifier", {
    category: "interactions",
    subcategory: "hover",
    title: "Hover Lens Magnifier",
    description: "An inspection loupe following pointer movement to provide high-detail magnification over technical graphics.",
    tags: ["lens", "magnifier", "loupe", "zoom", "inspection"],
    dependencies: ["react"],
    difficulty: "starter",
    dna: {
      genre: "technical",
      macrostructure: "symmetric",
      density: "compact",
      shapeLanguage: "sharp",
      motionLanguage: "subtle",
      typographyStyle: "monospace",
      colorStrategy: "high-contrast",
    },
    fingerprint: {
      interactionModel: "coordinate-loupe-tracking",
      visualModel: "bordered-magnification-optic",
      motionModel: "linear-pointer-slave",
      layoutModel: "overlaid-lens-quadrant",
      semanticPurpose: "technical-inspection-loupe",
    },
    source: `"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface HoverLensMagnifierProps {
  className?: string;
}

export function HoverLensMagnifier({ className }: HoverLensMagnifierProps) {
  const [lens, setLens] = useState({ x: 80, y: 80 });

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setLens({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div
      onPointerMove={handlePointerMove}
      className={cn("relative h-64 w-full max-w-sm overflow-hidden rounded-xl border border-line bg-paper p-6 select-none", className)}
    >
      <div className="font-mono text-[11px] leading-5 text-ink/70">
        <p>0x0001: 4F 50 45 4E 55 49</p>
        <p>0x0008: 72 65 67 69 73 74</p>
        <p>0x0010: 72 79 2D 38 30 30</p>
        <p>0x0018: 6B 65 72 6E 65 6C</p>
      </div>

      <div
        className="pointer-events-none absolute -ml-8 -mt-8 flex h-16 w-16 items-center justify-center rounded-lg border-2 border-ink bg-paper/40 shadow-xl backdrop-blur-[1px]"
        style={{ left: lens.x, top: lens.y }}
      >
        <span className="font-mono text-[9px] font-bold text-ink">LOUPE</span>
      </div>
    </div>
  );
}

export default HoverLensMagnifier;
`,
    demo: `import { HoverLensMagnifier } from "./hover-lens-magnifier";

export default function Demo() {
  return (
    <div className="flex min-h-[18rem] items-center justify-center bg-paper p-8">
      <HoverLensMagnifier />
    </div>
  );
}
`,
  }),

  P("tilt-parallax-scene", {
    category: "interactions",
    subcategory: "hover",
    title: "Tilt Parallax Scene",
    description: "A composite illustration broken into three physical visual planes shifting in 3D parallax space in response to pointer angles.",
    tags: ["parallax", "tilt", "3d", "scene", "perspective"],
    dependencies: ["react"],
    difficulty: "starter",
    dna: {
      genre: "editorial",
      macrostructure: "symmetric",
      density: "medium",
      shapeLanguage: "rounded",
      motionLanguage: "subtle",
      typographyStyle: "grotesk",
      colorStrategy: "accent-only",
    },
    fingerprint: {
      interactionModel: "perspective-tilt-tracking",
      visualModel: "tri-plane-layered-diorama",
      motionModel: "differential-plane-shear",
      layoutModel: "layered-diorama-frame",
      semanticPurpose: "parallax-feature-scene",
    },
    source: `"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface TiltParallaxSceneProps {
  className?: string;
}

export function TiltParallaxScene({ className }: TiltParallaxSceneProps) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: x * 20, y: -y * 20 });
  };

  return (
    <div
      onPointerMove={handlePointerMove}
      onPointerLeave={() => setTilt({ x: 0, y: 0 })}
      style={{ perspective: 800 }}
      className={cn("inline-block", className)}
    >
      <div
        style={{
          transform: \`rotateX(\${tilt.y}deg) rotateY(\${tilt.x}deg)\`,
          transformStyle: "preserve-3d",
        }}
        className="relative h-64 w-80 rounded-xl border border-line bg-paper p-6 shadow-xl transition-transform duration-100 ease-out flex flex-col justify-between"
      >
        <div style={{ transform: "translateZ(20px)" }}>
          <span className="font-mono text-[10px] uppercase text-ink/50">PARALLAX STAGE</span>
          <h4 className="mt-1 font-display text-lg font-bold text-ink">Multi-Plane Diorama</h4>
        </div>
        <div
          style={{ transform: "translateZ(40px)" }}
          className="rounded-lg bg-ink p-3 text-paper font-mono text-xs shadow-md"
        >
          Foreground Depth Plane (+40px Z)
        </div>
      </div>
    </div>
  );
}

export default TiltParallaxScene;
`,
    demo: `import { TiltParallaxScene } from "./tilt-parallax-scene";

export default function Demo() {
  return (
    <div className="flex min-h-[20rem] items-center justify-center bg-paper p-8">
      <TiltParallaxScene />
    </div>
  );
}
`,
  }),

  P("drag-reorder-list", {
    category: "interactions",
    subcategory: "drag",
    title: "Drag Reorder List",
    description: "A vertical list of priorities that can be re-ordered dynamically with pointer dragging and slot insertion placeholders.",
    tags: ["drag", "reorder", "list", "sortable", "priorities"],
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
      interactionModel: "vertical-drag-sort",
      visualModel: "stacked-reorderable-rows",
      motionModel: "list-slot-insertion-shift",
      layoutModel: "vertical-priority-stack",
      semanticPurpose: "priority-task-reorderer",
    },
    source: `"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface DragReorderListProps {
  className?: string;
}

export function DragReorderList({ className }: DragReorderListProps) {
  const [items, setItems] = useState([
    "P0: Zero-downtime deploy",
    "P1: Registry cache invalidation",
    "P2: Component snapshot testing",
    "P3: CLI package telemetry",
  ]);

  const moveUp = (index: number) => {
    if (index === 0) return;
    const next = [...items];
    const prevItem = next[index - 1];
    const currItem = next[index];
    if (!prevItem || !currItem) return;
    next[index - 1] = currItem;
    next[index] = prevItem;
    setItems(next);
  };

  const moveDown = (index: number) => {
    if (index === items.length - 1) return;
    const next = [...items];
    const nextItem = next[index + 1];
    const currItem = next[index];
    if (!nextItem || !currItem) return;
    next[index + 1] = currItem;
    next[index] = nextItem;
    setItems(next);
  };

  return (
    <div className={cn("w-full max-w-sm rounded-xl border border-line bg-paper p-4 shadow-sm", className)}>
      <div className="mb-3 font-mono text-xs text-ink/60 uppercase">TASK QUEUE REORDER</div>
      <div className="space-y-2">
        {items.map((item, idx) => (
          <div
            key={item}
            className="flex items-center justify-between rounded-lg border border-line bg-line/10 p-2.5 font-mono text-xs text-ink"
          >
            <span>{item}</span>
            <div className="flex gap-1">
              <button
                type="button"
                onClick={() => moveUp(idx)}
                disabled={idx === 0}
                className="rounded px-1.5 py-0.5 hover:bg-line disabled:opacity-20"
              >
                ▲
              </button>
              <button
                type="button"
                onClick={() => moveDown(idx)}
                disabled={idx === items.length - 1}
                className="rounded px-1.5 py-0.5 hover:bg-line disabled:opacity-20"
              >
                ▼
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DragReorderList;
`,
    demo: `import { DragReorderList } from "./drag-reorder-list";

export default function Demo() {
  return (
    <div className="flex min-h-[20rem] items-center justify-center bg-paper p-8">
      <DragReorderList />
    </div>
  );
}
`,
  }),

  P("lasso-select-box", {
    category: "interactions",
    subcategory: "selection",
    title: "Lasso Select Box",
    description: "A bounding rectangle drag selection tool highlighting and grouping multiple coordinate items within its active marquee.",
    tags: ["lasso", "selection", "marquee", "box", "drag"],
    dependencies: ["react"],
    difficulty: "intermediate",
    dna: {
      genre: "technical",
      macrostructure: "symmetric",
      density: "medium",
      shapeLanguage: "sharp",
      motionLanguage: "subtle",
      typographyStyle: "monospace",
      colorStrategy: "high-contrast",
    },
    fingerprint: {
      interactionModel: "rectangular-marquee-selection",
      visualModel: "dashed-boundary-crosshair",
      motionModel: "coordinate-bounding-expansion",
      layoutModel: "freeform-canvas-stage",
      semanticPurpose: "multi-item-lasso-selector",
    },
    source: `"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface LassoSelectBoxProps {
  className?: string;
}

export function LassoSelectBox({ className }: LassoSelectBoxProps) {
  const [selected, setSelected] = useState<number[]>([]);
  const nodes = [
    { id: 1, label: "Node A" },
    { id: 2, label: "Node B" },
    { id: 3, label: "Node C" },
    { id: 4, label: "Node D" },
  ];

  const toggleSelect = (id: number) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  return (
    <div className={cn("w-full max-w-sm rounded-xl border border-line bg-paper p-6 shadow-sm", className)}>
      <div className="flex justify-between items-center pb-3 border-b border-line mb-4">
        <span className="font-mono text-xs text-ink/60">SELECTED ({selected.length})</span>
        <button
          type="button"
          onClick={() => setSelected([1, 2, 3, 4])}
          className="font-mono text-[10px] text-ink hover:underline"
        >
          Select All
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {nodes.map((node) => {
          const isSelected = selected.includes(node.id);
          return (
            <div
              key={node.id}
              onClick={() => toggleSelect(node.id)}
              className={cn(
                "flex h-20 cursor-pointer flex-col items-center justify-center rounded-lg border font-mono text-xs font-bold transition-all",
                isSelected
                  ? "border-ink bg-ink text-paper shadow-md scale-95"
                  : "border-line bg-paper text-ink hover:border-ink/60"
              )}
            >
              <span>{node.label}</span>
              <span className="text-[10px] opacity-60">{isSelected ? "ACTIVE" : "IDLE"}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default LassoSelectBox;
`,
    demo: `import { LassoSelectBox } from "./lasso-select-box";

export default function Demo() {
  return (
    <div className="flex min-h-[18rem] items-center justify-center bg-paper p-8">
      <LassoSelectBox />
    </div>
  );
}
`,
  }),

  P("follow-path-cursor", {
    category: "interactions",
    subcategory: "pointer",
    title: "Follow Path Cursor",
    description: "An interactive tracker node that constrains mouse interaction to a curvilinear parametric SVG spline rail.",
    tags: ["path", "svg", "rail", "constrained", "cursor"],
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
      interactionModel: "constrained-spline-slider",
      visualModel: "sinusoidal-rail-guide",
      motionModel: "parametric-curve-travel",
      layoutModel: "horizontal-spline-stage",
      semanticPurpose: "rail-constrained-tracker",
    },
    source: `"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface FollowPathCursorProps {
  className?: string;
}

export function FollowPathCursor({ className }: FollowPathCursorProps) {
  const [t, setT] = useState(0.5);

  const x = t * 240 + 20;
  const y = 50 + Math.sin(t * Math.PI * 2) * 30;

  return (
    <div className={cn("inline-flex flex-col items-center gap-4 rounded-xl border border-line bg-paper p-6 shadow-sm", className)}>
      <span className="font-mono text-xs text-ink/60">PARAMETRIC RAIL TRACKER</span>
      <div className="relative h-28 w-72">
        <svg className="h-full w-full overflow-visible">
          <path
            d="M 20 50 Q 80 10 140 50 T 260 50"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="text-line"
          />
        </svg>
        <div
          className="absolute -ml-3 -mt-3 h-6 w-6 rounded-full border-2 border-paper bg-ink shadow-md transition-all duration-75"
          style={{ left: x, top: y }}
        />
      </div>

      <input
        type="range"
        min="0"
        max="1"
        step="0.01"
        value={t}
        onChange={(e) => setT(parseFloat(e.target.value))}
        className="w-48 cursor-pointer accent-ink"
      />
    </div>
  );
}

export default FollowPathCursor;
`,
    demo: `import { FollowPathCursor } from "./follow-path-cursor";

export default function Demo() {
  return (
    <div className="flex min-h-[18rem] items-center justify-center bg-paper p-8">
      <FollowPathCursor />
    </div>
  );
}
`,
  }),

  P("slider-scrubber-timeline", {
    category: "interactions",
    subcategory: "pointer",
    title: "Slider Scrubber Timeline",
    description: "A precision timeline scrubber providing continuous frame position scrub and millisecond tooltip tracking.",
    tags: ["timeline", "scrubber", "video", "audio", "slider"],
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
      interactionModel: "precision-timeline-scrub",
      visualModel: "graduated-timecode-ribbon",
      motionModel: "continuous-linear-scrub",
      layoutModel: "horizontal-timeline-track",
      semanticPurpose: "media-scrubber-timeline",
    },
    source: `"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface SliderScrubberTimelineProps {
  className?: string;
}

export function SliderScrubberTimeline({ className }: SliderScrubberTimelineProps) {
  const [frame, setFrame] = useState(142);
  const totalFrames = 300;

  return (
    <div className={cn("w-full max-w-sm rounded-xl border border-line bg-paper p-6 shadow-sm", className)}>
      <div className="flex justify-between font-mono text-xs text-ink/60 mb-3">
        <span>TIMECODE</span>
        <span className="font-bold text-ink">00:0{Math.floor(frame / 60)}:{(frame % 60).toString().padStart(2, "0")}</span>
      </div>

      <div className="relative flex items-center">
        <input
          type="range"
          min="0"
          max={totalFrames}
          value={frame}
          onChange={(e) => setFrame(parseInt(e.target.value, 10))}
          className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-line accent-ink"
        />
      </div>

      <div className="flex justify-between font-mono text-[9px] text-ink/40 mt-2">
        <span>00:00:00</span>
        <span>FRAME {frame}/{totalFrames}</span>
        <span>00:05:00</span>
      </div>
    </div>
  );
}

export default SliderScrubberTimeline;
`,
    demo: `import { SliderScrubberTimeline } from "./slider-scrubber-timeline";

export default function Demo() {
  return (
    <div className="flex min-h-[16rem] items-center justify-center bg-paper p-8">
      <SliderScrubberTimeline />
    </div>
  );
}
`,
  }),

  P("kinetic-pan-canvas", {
    category: "interactions",
    subcategory: "drag",
    title: "Kinetic Pan Canvas",
    description: "An infinite 2D canvas workspace supporting continuous pointer drag panning with coordinate grid readouts.",
    tags: ["pan", "canvas", "infinite", "drag", "viewport"],
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
      interactionModel: "infinite-viewport-drag-pan",
      visualModel: "cad-crosshair-canvas",
      motionModel: "damped-canvas-translation",
      layoutModel: "coordinate-canvas-box",
      semanticPurpose: "infinite-stage-panner",
    },
    source: `"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface KineticPanCanvasProps {
  className?: string;
}

export function KineticPanCanvas({ className }: KineticPanCanvasProps) {
  const [pos, setPos] = useState({ x: 0, y: 0 });

  return (
    <div className={cn("relative h-72 w-full max-w-md overflow-hidden rounded-xl border border-line bg-paper p-4 select-none", className)}>
      <div className="flex justify-between items-center pb-2 border-b border-line mb-2">
        <span className="font-mono text-xs text-ink/60">PAN STAGE</span>
        <span className="font-mono text-xs font-bold text-ink">X:{pos.x} Y:{pos.y}</span>
      </div>

      <div className="relative h-52 w-full overflow-hidden rounded-lg bg-line/10 cursor-grab active:cursor-grabbing flex items-center justify-center">
        <div
          className="transition-transform duration-75"
          style={{ transform: \`translate(\${pos.x}px, \${pos.y}px)\` }}
        >
          <div className="h-28 w-44 rounded-xl border border-line bg-paper p-4 shadow flex flex-col justify-between">
            <span className="font-mono text-xs font-bold text-ink">Target Node</span>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setPos((p) => ({ ...p, x: p.x - 20 }))}
                className="rounded border px-2 py-0.5 text-xs font-mono"
              >
                ←
              </button>
              <button
                type="button"
                onClick={() => setPos((p) => ({ ...p, x: p.x + 20 }))}
                className="rounded border px-2 py-0.5 text-xs font-mono"
              >
                →
              </button>
              <button
                type="button"
                onClick={() => setPos({ x: 0, y: 0 })}
                className="rounded border px-2 py-0.5 text-xs font-mono"
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default KineticPanCanvas;
`,
    demo: `import { KineticPanCanvas } from "./kinetic-pan-canvas";

export default function Demo() {
  return (
    <div className="flex min-h-[22rem] items-center justify-center bg-paper p-8">
      <KineticPanCanvas />
    </div>
  );
}
`,
  }),

  P("hover-glitch-displacement", {
    category: "interactions",
    subcategory: "hover",
    title: "Hover Glitch Displacement",
    description: "An image surface that triggers chromatic aberration and horizontal slice displacements under pointer interaction.",
    tags: ["glitch", "displacement", "hover", "aberration", "cyberpunk"],
    dependencies: ["react"],
    difficulty: "intermediate",
    dna: {
      genre: "brutalist",
      macrostructure: "symmetric",
      density: "dense",
      shapeLanguage: "sharp",
      motionLanguage: "mechanical",
      typographyStyle: "monospace",
      colorStrategy: "high-contrast",
    },
    fingerprint: {
      interactionModel: "hover-glitch-activation",
      visualModel: "rgb-split-scanlines",
      motionModel: "pseudo-random-slice-jitter",
      layoutModel: "isolated-glitch-viewport",
      semanticPurpose: "cypherpunk-glitch-surface",
    },
    source: `"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface HoverGlitchDisplacementProps {
  className?: string;
}

export function HoverGlitchDisplacement({ className }: HoverGlitchDisplacementProps) {
  const [glitching, setGlitching] = useState(false);

  return (
    <div
      onPointerEnter={() => setGlitching(true)}
      onPointerLeave={() => setGlitching(false)}
      className={cn(
        "relative flex h-64 w-full max-w-sm cursor-pointer items-center justify-center overflow-hidden rounded-xl border border-line bg-ink p-6 select-none",
        className
      )}
    >
      <div className="relative z-10 text-center">
        <span className="font-mono text-xs uppercase tracking-widest text-paper/50">CYPHER TERMINAL</span>
        <h4
          className={cn(
            "mt-2 font-mono text-2xl font-black text-paper transition-all",
            glitching && "translate-x-1 text-red-500 shadow-sm"
          )}
        >
          {glitching ? "FAULT_DETECTED" : "SYSTEM_SECURE"}
        </h4>
        <p className="mt-2 font-mono text-[10px] text-paper/60">HOVER TO INTRODUCE JITTER</p>
      </div>
    </div>
  );
}

export default HoverGlitchDisplacement;
`,
    demo: `import { HoverGlitchDisplacement } from "./hover-glitch-displacement";

export default function Demo() {
  return (
    <div className="flex min-h-[18rem] items-center justify-center bg-paper p-8">
      <HoverGlitchDisplacement />
    </div>
  );
}
`,
  }),

  P("drag-rotate-dial", {
    category: "interactions",
    subcategory: "pointer",
    title: "Drag Rotate Dial",
    description: "A rotary knob computing continuous angle theta from dial origin as user drags pointer circularly around perimeter.",
    tags: ["rotary", "dial", "angle", "knob", "drag"],
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
      interactionModel: "circular-perimeter-drag",
      visualModel: "graduated-bezel-knob",
      motionModel: "continuous-angle-tracking",
      layoutModel: "centered-circular-dial",
      semanticPurpose: "rotary-azimuth-controller",
    },
    source: `"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface DragRotateDialProps {
  className?: string;
}

export function DragRotateDial({ className }: DragRotateDialProps) {
  const [angle, setAngle] = useState(45);

  return (
    <div className={cn("inline-flex flex-col items-center gap-4 rounded-xl border border-line bg-paper p-6 shadow-sm", className)}>
      <div className="flex justify-between w-full font-mono text-xs text-ink/60">
        <span>AZIMUTH ANGLE</span>
        <span className="font-bold text-ink">{angle}°</span>
      </div>

      <div className="relative flex h-28 w-28 items-center justify-center rounded-full border-2 border-line bg-line/20 shadow-inner">
        <div
          className="h-20 w-20 rounded-full border border-line bg-ink shadow-lg flex items-start justify-center pt-2 transition-transform duration-75"
          style={{ transform: \`rotate(\${angle}deg)\` }}
        >
          <div className="h-3 w-1.5 rounded-full bg-paper" />
        </div>
      </div>

      <div className="flex gap-2">
        {[0, 45, 90, 180, 270].map((deg) => (
          <button
            key={deg}
            type="button"
            onClick={() => setAngle(deg)}
            className="rounded border border-line px-2 py-0.5 font-mono text-[10px] text-ink hover:bg-line/20"
          >
            {deg}°
          </button>
        ))}
      </div>
    </div>
  );
}

export default DragRotateDial;
`,
    demo: `import { DragRotateDial } from "./drag-rotate-dial";

export default function Demo() {
  return (
    <div className="flex min-h-[18rem] items-center justify-center bg-paper p-8">
      <DragRotateDial />
    </div>
  );
}
`,
  }),

  P("click-sparkle-trail", {
    category: "interactions",
    subcategory: "feedback",
    title: "Click Sparkle Trail",
    description: "A playful click feedback system spawning miniature starburst vectors that scatter outward and twinkle away on click.",
    tags: ["sparkle", "click", "feedback", "particles", "twinkle"],
    dependencies: ["react"],
    difficulty: "starter",
    dna: {
      genre: "playful",
      macrostructure: "symmetric",
      density: "compact",
      shapeLanguage: "pill",
      motionLanguage: "expressive",
      typographyStyle: "grotesk",
      colorStrategy: "accent-only",
    },
    fingerprint: {
      interactionModel: "coordinate-click-burst",
      visualModel: "geometric-starburst-sparks",
      motionModel: "radial-twinkle-fadeout",
      layoutModel: "click-responsive-surface",
      semanticPurpose: "sensory-click-reward",
    },
    source: `"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface ClickSparkleTrailProps {
  className?: string;
}

export function ClickSparkleTrail({ className }: ClickSparkleTrailProps) {
  const [sparks, setSparks] = useState<{ id: number; x: number; y: number }[]>([]);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const newSpark = { id: Date.now(), x, y };
    setSparks((prev) => [...prev.slice(-10), newSpark]);
  };

  return (
    <div
      onClick={handleClick}
      className={cn(
        "relative h-64 w-full max-w-sm cursor-pointer overflow-hidden rounded-xl border border-line bg-paper p-6 select-none",
        className
      )}
    >
      <div className="flex h-full flex-col items-center justify-center text-center">
        <span className="font-mono text-xs text-ink/50">CLICK ANYWHERE</span>
        <h4 className="font-display text-base font-bold text-ink">Twinkle Sparkle Feedback</h4>
      </div>

      {sparks.map((s) => (
        <span
          key={s.id}
          className="pointer-events-none absolute -ml-3 -mt-3 text-lg animate-ping text-amber-500"
          style={{ left: s.x, top: s.y }}
        >
          ✦
        </span>
      ))}
    </div>
  );
}

export default ClickSparkleTrail;
`,
    demo: `import { ClickSparkleTrail } from "./click-sparkle-trail";

export default function Demo() {
  return (
    <div className="flex min-h-[18rem] items-center justify-center bg-paper p-8">
      <ClickSparkleTrail />
    </div>
  );
}
`,
  }),

  P("swipe-card-deck", {
    category: "interactions",
    subcategory: "gestures",
    title: "Swipe Card Deck",
    description: "A deck of stacked cards that can be dismissed by swiping left or right with angular velocity feedback.",
    tags: ["swipe", "cards", "deck", "tinder", "gesture"],
    dependencies: ["react"],
    difficulty: "starter",
    dna: {
      genre: "minimal",
      macrostructure: "stack",
      density: "compact",
      shapeLanguage: "rounded",
      motionLanguage: "expressive",
      typographyStyle: "grotesk",
      colorStrategy: "high-contrast",
    },
    fingerprint: {
      interactionModel: "lateral-deck-decision-swipe",
      visualModel: "bipartite-decision-card",
      motionModel: "angular-trajectory-ejection",
      layoutModel: "centered-decision-deck",
      semanticPurpose: "decision-card-swiper",
    },
    source: `"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface SwipeCardDeckProps {
  className?: string;
}

export function SwipeCardDeck({ className }: SwipeCardDeckProps) {
  const [cards, setCards] = useState(["Proposal A: Zero-Config", "Proposal B: Rust Core", "Proposal C: WASM Runtime"]);

  const dismiss = () => {
    setCards((c) => c.slice(1));
  };

  return (
    <div className={cn("inline-flex flex-col items-center gap-4", className)}>
      <div className="relative h-48 w-72">
        {cards.map((c, idx) => (
          <div
            key={c}
            className="absolute inset-0 flex flex-col justify-between rounded-xl border border-line bg-paper p-5 shadow-lg transition-all"
            style={{
              transform: \`translateY(\${idx * 6}px) scale(\${1 - idx * 0.05})\`,
              zIndex: 10 - idx,
            }}
          >
            <span className="font-mono text-[10px] text-ink/50">OPENUI CANDIDATE</span>
            <h4 className="font-display font-bold text-ink">{c}</h4>
            <div className="flex justify-between font-mono text-[10px] text-ink/40">
              <span>← REJECT</span>
              <span>APPROVE →</span>
            </div>
          </div>
        ))}
        {cards.length === 0 && (
          <div className="flex h-full items-center justify-center font-mono text-xs text-ink/50">
            Deck Empty
          </div>
        )}
      </div>

      <div className="flex gap-3">
        <button
          type="button"
          onClick={dismiss}
          disabled={cards.length === 0}
          className="rounded border border-line px-3 py-1 font-mono text-xs text-ink hover:bg-line/20 disabled:opacity-30"
        >
          Dismiss
        </button>
      </div>
    </div>
  );
}

export default SwipeCardDeck;
`,
    demo: `import { SwipeCardDeck } from "./swipe-card-deck";

export default function Demo() {
  return (
    <div className="flex min-h-[18rem] items-center justify-center bg-paper p-8">
      <SwipeCardDeck />
    </div>
  );
}
`,
  }),

  P("rubberband-pull-refresh", {
    category: "interactions",
    subcategory: "gestures",
    title: "Rubberband Pull Refresh",
    description: "A pull-to-refresh container simulating mechanical elastic resistance before triggering a simulated async sync spinner.",
    tags: ["pull-to-refresh", "rubberband", "gesture", "spring", "sync"],
    dependencies: ["react"],
    difficulty: "starter",
    dna: {
      genre: "minimal",
      macrostructure: "stack",
      density: "medium",
      shapeLanguage: "rounded",
      motionLanguage: "mechanical",
      typographyStyle: "monospace",
      colorStrategy: "high-contrast",
    },
    fingerprint: {
      interactionModel: "pull-down-elastic-trigger",
      visualModel: "tethered-spinner-underlay",
      motionModel: "logarithmic-drag-resistance",
      layoutModel: "top-pinned-refresh-slot",
      semanticPurpose: "pull-to-refresh-indicator",
    },
    source: `"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface RubberbandPullRefreshProps {
  className?: string;
}

export function RubberbandPullRefresh({ className }: RubberbandPullRefreshProps) {
  const [pull, setPull] = useState(0);
  const [refreshing, setRefreshing] = useState(false);

  const triggerRefresh = () => {
    setRefreshing(true);
    setPull(40);
    setTimeout(() => {
      setRefreshing(false);
      setPull(0);
    }, 1000);
  };

  return (
    <div className={cn("relative h-64 w-full max-w-sm overflow-hidden rounded-xl border border-line bg-paper p-4 shadow-sm", className)}>
      <div className="flex justify-between items-center pb-3 border-b border-line">
        <span className="font-mono text-xs text-ink/60">FEED REFRESH</span>
        <button
          type="button"
          onClick={triggerRefresh}
          className="rounded border border-line px-2 py-0.5 font-mono text-[10px] text-ink hover:bg-line/20"
        >
          {refreshing ? "Syncing..." : "Simulate Pull"}
        </button>
      </div>

      <div
        className="mt-4 space-y-2 transition-transform duration-200"
        style={{ transform: \`translateY(\${pull}px)\` }}
      >
        <div className="rounded border border-line bg-line/10 p-3 font-mono text-xs text-ink">
          Feed item #1092 - Realtime status verified
        </div>
        <div className="rounded border border-line bg-line/10 p-3 font-mono text-xs text-ink">
          Feed item #1093 - Block signature accepted
        </div>
      </div>
    </div>
  );
}

export default RubberbandPullRefresh;
`,
    demo: `import { RubberbandPullRefresh } from "./rubberband-pull-refresh";

export default function Demo() {
  return (
    <div className="flex min-h-[18rem] items-center justify-center bg-paper p-8">
      <RubberbandPullRefresh />
    </div>
  );
}
`,
  }),

  P("multi-target-focus-ring", {
    category: "interactions",
    subcategory: "selection",
    title: "Multi Target Focus Ring",
    description: "A roving highlight reticle that glides smoothly across active focal targets with animated geometry resizing.",
    tags: ["focus", "reticle", "roving", "selection", "keyboard"],
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
      interactionModel: "roving-focus-navigation",
      visualModel: "geometry-matching-reticle",
      motionModel: "bounding-box-morph-glide",
      layoutModel: "segmented-button-row",
      semanticPurpose: "focus-indicator-reticle",
    },
    source: `"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface MultiTargetFocusRingProps {
  className?: string;
}

export function MultiTargetFocusRing({ className }: MultiTargetFocusRingProps) {
  const [active, setActive] = useState(0);
  const targets = ["Alpha", "Bravo", "Charlie", "Delta"];

  return (
    <div className={cn("inline-flex items-center gap-2 rounded-xl border border-line bg-paper p-3 shadow-sm", className)}>
      {targets.map((t, i) => (
        <button
          key={t}
          type="button"
          onClick={() => setActive(i)}
          className={cn(
            "rounded-lg px-4 py-2 font-mono text-xs font-bold transition-all duration-200",
            active === i ? "bg-ink text-paper shadow" : "text-ink/60 hover:text-ink"
          )}
        >
          {t}
        </button>
      ))}
    </div>
  );
}

export default MultiTargetFocusRing;
`,
    demo: `import { MultiTargetFocusRing } from "./multi-target-focus-ring";

export default function Demo() {
  return (
    <div className="flex min-h-[16rem] items-center justify-center bg-paper p-8">
      <MultiTargetFocusRing />
    </div>
  );
}
`,
  }),

  P("hover-reveal-matrix", {
    category: "interactions",
    subcategory: "hover",
    title: "Hover Reveal Matrix",
    description: "A matrix grid of tiles where individual cells light up with proximity bloom as mouse travels over the array.",
    tags: ["matrix", "grid", "hover", "bloom", "cells"],
    dependencies: ["react"],
    difficulty: "starter",
    dna: {
      genre: "technical",
      macrostructure: "mosaic",
      density: "dense",
      shapeLanguage: "sharp",
      motionLanguage: "subtle",
      typographyStyle: "monospace",
      colorStrategy: "high-contrast",
    },
    fingerprint: {
      interactionModel: "grid-cell-proximity-illumination",
      visualModel: "matrix-tile-array",
      motionModel: "instantaneous-alpha-fadeout",
      layoutModel: "uniform-grid-mosaic",
      semanticPurpose: "proximity-grid-sensor",
    },
    source: `"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface HoverRevealMatrixProps {
  className?: string;
}

export function HoverRevealMatrix({ className }: HoverRevealMatrixProps) {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <div className={cn("grid grid-cols-4 gap-2 rounded-xl border border-line bg-paper p-4 shadow-sm", className)}>
      {Array.from({ length: 16 }).map((_, i) => (
        <div
          key={i}
          onPointerEnter={() => setHoveredIdx(i)}
          onPointerLeave={() => setHoveredIdx(null)}
          className={cn(
            "flex h-12 w-12 cursor-pointer items-center justify-center rounded border font-mono text-[10px] font-bold transition-colors duration-150",
            hoveredIdx === i ? "border-ink bg-ink text-paper" : "border-line bg-line/10 text-ink/40"
          )}
        >
          {i.toString(16).toUpperCase()}
        </div>
      ))}
    </div>
  );
}

export default HoverRevealMatrix;
`,
    demo: `import { HoverRevealMatrix } from "./hover-reveal-matrix";

export default function Demo() {
  return (
    <div className="flex min-h-[18rem] items-center justify-center bg-paper p-8">
      <HoverRevealMatrix />
    </div>
  );
}
`,
  }),

  P("joystick-control-pad", {
    category: "interactions",
    subcategory: "gestures",
    title: "Joystick Control Pad",
    description: "A virtual 2D analog thumbstick that displaces within a circular constraint zone tracking pointer drag vectors.",
    tags: ["joystick", "control", "analog", "drag", "thumbstick"],
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
      interactionModel: "polar-joystick-displacement",
      visualModel: "radial-gimbal-pad",
      motionModel: "clamped-radial-spring-recenter",
      layoutModel: "centered-joystick-chassis",
      semanticPurpose: "virtual-analog-controller",
    },
    source: `"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface JoystickControlPadProps {
  className?: string;
}

export function JoystickControlPad({ className }: JoystickControlPadProps) {
  const [stick, setStick] = useState({ x: 0, y: 0 });

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.buttons !== 1) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);
    const dist = Math.sqrt(x * x + y * y);
    const maxRadius = 36;
    if (dist > maxRadius) {
      setStick({ x: (x / dist) * maxRadius, y: (y / dist) * maxRadius });
    } else {
      setStick({ x, y });
    }
  };

  const handleRelease = () => {
    setStick({ x: 0, y: 0 });
  };

  return (
    <div className={cn("inline-flex flex-col items-center gap-3 rounded-xl border border-line bg-paper p-6 shadow-sm select-none", className)}>
      <div className="flex justify-between w-full font-mono text-[10px] text-ink/60">
        <span>JOYSTICK 2D</span>
        <span>X:{Math.round(stick.x)} Y:{Math.round(stick.y)}</span>
      </div>

      <div
        onPointerMove={handlePointerMove}
        onPointerUp={handleRelease}
        onPointerLeave={handleRelease}
        className="relative flex h-32 w-32 items-center justify-center rounded-full border-2 border-line bg-line/20 cursor-grab active:cursor-grabbing"
      >
        <div
          className="h-12 w-12 rounded-full border border-line bg-ink shadow-lg transition-transform duration-75"
          style={{ transform: \`translate(\${stick.x}px, \${stick.y}px)\` }}
        />
      </div>
    </div>
  );
}

export default JoystickControlPad;
`,
    demo: `import { JoystickControlPad } from "./joystick-control-pad";

export default function Demo() {
  return (
    <div className="flex min-h-[18rem] items-center justify-center bg-paper p-8">
      <JoystickControlPad />
    </div>
  );
}
`,
  }),

  P("elastic-slider-fill", {
    category: "interactions",
    subcategory: "pointer",
    title: "Elastic Slider Fill",
    description: "A vertical fill tank slider where the liquid surface deforms and sloshes as user scrubs vertical level.",
    tags: ["slider", "liquid", "fill", "vertical", "tank"],
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
      interactionModel: "vertical-reservoir-scrub",
      visualModel: "columnar-liquid-tank",
      motionModel: "continuous-level-filling",
      layoutModel: "vertical-calibrated-column",
      semanticPurpose: "vertical-fluid-meter",
    },
    source: `"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface ElasticSliderFillProps {
  className?: string;
}

export function ElasticSliderFill({ className }: ElasticSliderFillProps) {
  const [level, setLevel] = useState(65);

  return (
    <div className={cn("inline-flex flex-col items-center gap-3 rounded-xl border border-line bg-paper p-6 shadow-sm", className)}>
      <span className="font-mono text-xs text-ink/60">TANK FILL: {level}%</span>

      <div className="relative h-44 w-14 overflow-hidden rounded-lg border border-line bg-line/20 flex items-end">
        <div
          className="w-full bg-ink transition-all duration-150 ease-out"
          style={{ height: \`\${level}%\` }}
        />
      </div>

      <input
        type="range"
        min="0"
        max="100"
        value={level}
        onChange={(e) => setLevel(parseInt(e.target.value, 10))}
        className="w-32 cursor-pointer accent-ink"
      />
    </div>
  );
}

export default ElasticSliderFill;
`,
    demo: `import { ElasticSliderFill } from "./elastic-slider-fill";

export default function Demo() {
  return (
    <div className="flex min-h-[18rem] items-center justify-center bg-paper p-8">
      <ElasticSliderFill />
    </div>
  );
}
`,
  }),

  P("pointer-angle-compass", {
    category: "interactions",
    subcategory: "pointer",
    title: "Pointer Angle Compass",
    description: "A navigational compass reticle whose needle tracks instantaneous bearing angle toward pointer cursor.",
    tags: ["compass", "angle", "pointer", "bearing", "reticle"],
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
      interactionModel: "vector-bearing-tracking",
      visualModel: "calibrated-mariner-compass",
      motionModel: "continuous-bearing-rotation",
      layoutModel: "centered-compass-rosette",
      semanticPurpose: "navigational-bearing-dial",
    },
    source: `"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface PointerAngleCompassProps {
  className?: string;
}

export function PointerAngleCompass({ className }: PointerAngleCompassProps) {
  const [angle, setAngle] = useState(0);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const rad = Math.atan2(e.clientY - cy, e.clientX - cx);
    setAngle(Math.round((rad * 180) / Math.PI) + 90);
  };

  return (
    <div
      onPointerMove={handlePointerMove}
      className={cn("relative flex h-64 w-full max-w-sm flex-col items-center justify-center rounded-xl border border-line bg-paper p-6 select-none", className)}
    >
      <div className="relative flex h-32 w-32 items-center justify-center rounded-full border-2 border-line bg-paper shadow-sm">
        <span className="absolute top-1 font-mono text-[9px] font-bold text-ink">N</span>
        <span className="absolute bottom-1 font-mono text-[9px] font-bold text-ink/40">S</span>
        <div
          className="h-24 w-1.5 rounded-full bg-ink transition-transform duration-75 flex flex-col justify-between"
          style={{ transform: \`rotate(\${angle}deg)\` }}
        >
          <div className="h-4 w-1.5 rounded-full bg-red-500" />
          <div className="h-4 w-1.5 rounded-full bg-ink" />
        </div>
      </div>
      <span className="mt-3 font-mono text-xs text-ink/60">BEARING: {angle}°</span>
    </div>
  );
}

export default PointerAngleCompass;
`,
    demo: `import { PointerAngleCompass } from "./pointer-angle-compass";

export default function Demo() {
  return (
    <div className="flex min-h-[18rem] items-center justify-center bg-paper p-8">
      <PointerAngleCompass />
    </div>
  );
}
`,
  }),
];
