import type { ResourceDefinition } from "../lib/definitions.js";

const P = (name: string, definition: Omit<ResourceDefinition, "name">): ResourceDefinition => ({
  name,
  ...definition,
});

export default [
  P("subtle-isometric-circuit", {
    category: "backgrounds",
    subcategory: "patterns",
    title: "Subtle Isometric Circuit",
    description: "Axonometric electronic circuit bus with three-dimensional perspective traces.",
    tags: ["isometric", "circuit", "pcb", "axonometric", "hardware"],
    dependencies: ["react"],
    difficulty: "starter",
    dna: {
      genre: "technical",
      macrostructure: "full-bleed",
      density: "medium",
      shapeLanguage: "sharp",
      motionLanguage: "none",
      typographyStyle: "monospace",
      colorStrategy: "high-contrast",
    },
    fingerprint: {
      interactionModel: "passive-isometric-circuit",
      visualModel: "axonometric-pcb-traces",
      motionModel: "none",
      layoutModel: "full-viewport-underlay",
      semanticPurpose: "isometric-circuit-backdrop",
    },
    source: `"use client";

import { cn } from "@/lib/cn";

export interface SubtleIsometricCircuitProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export function SubtleIsometricCircuit({ className, children, ...props }: SubtleIsometricCircuitProps) {
  return (
    <div className={cn("relative isolate w-full min-h-full bg-paper text-ink overflow-hidden", className)} {...props}>
      <svg className="absolute inset-0 w-full h-full opacity-15 pointer-events-none -z-10" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="iso-pcb-pat" width="60" height="52" patternUnits="userSpaceOnUse">
            <path d="M0 26 L30 9 L60 26 M30 9 L30 43" fill="none" stroke="currentColor" strokeWidth="1" />
            <circle cx="30" cy="9" r="2.5" fill="currentColor" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#iso-pcb-pat)" />
      </svg>
      {children}
    </div>
  );
}
`,
    demo: `"use client";

import { SubtleIsometricCircuit } from "./subtle-isometric-circuit";

export default function SubtleIsometricCircuitDemo() {
  return (
    <SubtleIsometricCircuit className="min-h-[260px] flex items-center justify-center p-8">
      <div className="p-6 rounded-xl border border-line bg-paper/90 backdrop-blur-md shadow-md text-center max-w-sm">
        <h3 className="text-sm font-bold font-mono text-ink">Axonometric PCB</h3>
        <p className="text-xs text-ink/60 mt-1 font-sans">Three-dimensional perspective circuit board traces.</p>
      </div>
    </SubtleIsometricCircuit>
  );
}
`,
  }),

  P("vintage-engraving-shading", {
    category: "backgrounds",
    subcategory: "patterns",
    title: "Vintage Engraving Shading",
    description: "Fine steel-plate intaglio banknote engraving lines providing rich classical texture.",
    tags: ["engraving", "banknote", "intaglio", "classical", "lines"],
    dependencies: ["react"],
    difficulty: "starter",
    dna: {
      genre: "editorial",
      macrostructure: "full-bleed",
      density: "dense",
      shapeLanguage: "soft",
      motionLanguage: "none",
      typographyStyle: "serif-display",
      colorStrategy: "monochrome",
    },
    fingerprint: {
      interactionModel: "passive-intaglio-engraving",
      visualModel: "variable-frequency-engraving-hatching",
      motionModel: "none",
      layoutModel: "full-viewport-underlay",
      semanticPurpose: "banknote-engraving-texture",
    },
    source: `"use client";

import { cn } from "@/lib/cn";

export interface VintageEngravingShadingProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export function VintageEngravingShading({ className, children, ...props }: VintageEngravingShadingProps) {
  return (
    <div className={cn("relative isolate w-full min-h-full bg-paper text-ink overflow-hidden", className)} {...props}>
      <svg className="absolute inset-0 w-full h-full opacity-15 pointer-events-none -z-10" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="engraving-pat" width="40" height="20" patternUnits="userSpaceOnUse">
            <path d="M0 5 Q20 0 40 5 M0 10 Q20 5 40 10 M0 15 Q20 10 40 15 M0 20 Q20 15 40 20" fill="none" stroke="currentColor" strokeWidth="0.75" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#engraving-pat)" />
      </svg>
      {children}
    </div>
  );
}
`,
    demo: `"use client";

import { VintageEngravingShading } from "./vintage-engraving-shading";

export default function VintageEngravingShadingDemo() {
  return (
    <VintageEngravingShading className="min-h-[260px] flex items-center justify-center p-8">
      <div className="p-6 rounded-xl border border-line bg-paper/90 backdrop-blur-md shadow-md text-center max-w-sm">
        <h3 className="text-sm font-bold font-serif text-ink">Intaglio Banknote</h3>
        <p className="text-xs text-ink/60 mt-1 font-sans">Fine sinusoidal steel engraving guilloche lines.</p>
      </div>
    </VintageEngravingShading>
  );
}
`,
  }),

  P("circular-aperture-diaphragm", {
    category: "backgrounds",
    subcategory: "ambient",
    title: "Circular Aperture Diaphragm",
    description: "Mechanical camera lens iris aperture diaphragm blades forming an optical polygonal opening.",
    tags: ["aperture", "lens", "camera", "diaphragm", "optics"],
    dependencies: ["react"],
    difficulty: "starter",
    dna: {
      genre: "technical",
      macrostructure: "full-bleed",
      density: "airy",
      shapeLanguage: "sharp",
      motionLanguage: "none",
      typographyStyle: "monospace",
      colorStrategy: "high-contrast",
    },
    fingerprint: {
      interactionModel: "passive-camera-aperture",
      visualModel: "overlapping-iris-blades",
      motionModel: "none",
      layoutModel: "center-anchored-radial",
      semanticPurpose: "photographic-aperture-backdrop",
    },
    source: `"use client";

import { cn } from "@/lib/cn";

export interface CircularApertureDiaphragmProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export function CircularApertureDiaphragm({ className, children, ...props }: CircularApertureDiaphragmProps) {
  return (
    <div className={cn("relative isolate w-full min-h-full bg-paper text-ink overflow-hidden", className)} {...props}>
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-15 -z-10">
        <svg className="w-[500px] h-[500px]" viewBox="0 0 200 200">
          <circle cx="100" cy="100" r="85" fill="none" stroke="currentColor" strokeWidth="1.5" />
          {[0, 60, 120, 180, 240, 300].map((deg) => (
            <line
              key={deg}
              x1="100"
              y1="15"
              x2="160"
              y2="135"
              stroke="currentColor"
              strokeWidth="1"
              transform={\`rotate(\${deg} 100 100)\`}
            />
          ))}
        </svg>
      </div>
      {children}
    </div>
  );
}
`,
    demo: `"use client";

import { CircularApertureDiaphragm } from "./circular-aperture-diaphragm";

export default function CircularApertureDiaphragmDemo() {
  return (
    <CircularApertureDiaphragm className="min-h-[260px] flex items-center justify-center p-8">
      <div className="p-6 rounded-xl border border-line bg-paper/90 backdrop-blur-md shadow-md text-center max-w-sm">
        <h3 className="text-sm font-bold font-mono text-ink">Camera Lens Iris</h3>
        <p className="text-xs text-ink/60 mt-1 font-sans">Mechanical 6-blade photographic diaphragm.</p>
      </div>
    </CircularApertureDiaphragm>
  );
}
`,
  }),

  P("diffraction-grating-sheen", {
    category: "backgrounds",
    subcategory: "ambient",
    title: "Diffraction Grating Sheen",
    description: "Holographic optical disc surface sheen shimmering with iridescent rainbow diffraction.",
    tags: ["holographic", "diffraction", "iridescent", "rainbow", "sheen"],
    dependencies: ["react"],
    difficulty: "starter",
    dna: {
      genre: "luxury",
      macrostructure: "full-bleed",
      density: "airy",
      shapeLanguage: "soft",
      motionLanguage: "subtle",
      typographyStyle: "grotesk",
      colorStrategy: "neon-on-dark",
    },
    fingerprint: {
      interactionModel: "passive-hologram-sheen",
      visualModel: "iridescent-grating-flare",
      motionModel: "none",
      layoutModel: "full-viewport-underlay",
      semanticPurpose: "iridescent-holographic-foil",
    },
    source: `"use client";

import { cn } from "@/lib/cn";

export interface DiffractionGratingSheenProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export function DiffractionGratingSheen({ className, children, ...props }: DiffractionGratingSheenProps) {
  return (
    <div className={cn("relative isolate w-full min-h-full bg-slate-950 text-white overflow-hidden", className)} {...props}>
      <div
        className="absolute inset-0 pointer-events-none opacity-20 -z-10"
        style={{
          background: "conic-gradient(from 45deg at 50% 50%, #f43f5e, #f59e0b, #10b981, #06b6d4, #8b5cf6, #ec4899, #f43f5e)",
          filter: "blur(60px)",
        }}
      />
      {children}
    </div>
  );
}
`,
    demo: `"use client";

import { DiffractionGratingSheen } from "./diffraction-grating-sheen";

export default function DiffractionGratingSheenDemo() {
  return (
    <DiffractionGratingSheen className="min-h-[260px] flex items-center justify-center p-8">
      <div className="p-6 rounded-xl border border-white/20 bg-black/70 backdrop-blur-md shadow-xl text-center max-w-sm">
        <h3 className="text-sm font-bold font-sans text-white">Iridescent Hologram</h3>
        <p className="text-xs text-white/70 mt-1 font-sans">Multi-spectrum conic diffraction foil luster.</p>
      </div>
    </DiffractionGratingSheen>
  );
}
`,
  }),

  P("radial-compass-rose", {
    category: "backgrounds",
    subcategory: "ambient",
    title: "Radial Compass Rose",
    description: "Nautical mariner 16-point navigation star compass rose with degree graduation ticks.",
    tags: ["compass", "nautical", "navigation", "mariner", "star"],
    dependencies: ["react"],
    difficulty: "starter",
    dna: {
      genre: "editorial",
      macrostructure: "full-bleed",
      density: "airy",
      shapeLanguage: "sharp",
      motionLanguage: "none",
      typographyStyle: "serif-display",
      colorStrategy: "high-contrast",
    },
    fingerprint: {
      interactionModel: "passive-compass-rose",
      visualModel: "sixteen-point-nautical-star",
      motionModel: "none",
      layoutModel: "center-anchored-radial",
      semanticPurpose: "nautical-cartography-backdrop",
    },
    source: `"use client";

import { cn } from "@/lib/cn";

export interface RadialCompassRoseProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export function RadialCompassRose({ className, children, ...props }: RadialCompassRoseProps) {
  return (
    <div className={cn("relative isolate w-full min-h-full bg-paper text-ink overflow-hidden", className)} {...props}>
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20 -z-10">
        <svg className="w-[500px] h-[500px]" viewBox="0 0 200 200">
          <circle cx="100" cy="100" r="90" fill="none" stroke="currentColor" strokeWidth="1" />
          <circle cx="100" cy="100" r="82" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="1 3" />
          <polygon points="100,10 106,90 100,85 94,90" fill="currentColor" />
          <polygon points="100,190 106,110 100,115 94,110" fill="currentColor" />
          <polygon points="10,100 90,106 85,100 90,94" fill="currentColor" />
          <polygon points="190,100 110,106 115,100 110,94" fill="currentColor" />
        </svg>
      </div>
      {children}
    </div>
  );
}
`,
    demo: `"use client";

import { RadialCompassRose } from "./radial-compass-rose";

export default function RadialCompassRoseDemo() {
  return (
    <RadialCompassRose className="min-h-[260px] flex items-center justify-center p-8">
      <div className="p-6 rounded-xl border border-line bg-paper/90 backdrop-blur-md shadow-md text-center max-w-sm">
        <h3 className="text-sm font-bold font-serif text-ink">Nautical Compass</h3>
        <p className="text-xs text-ink/60 mt-1 font-sans">Classic marine cartographic navigation star.</p>
      </div>
    </RadialCompassRose>
  );
}
`,
  }),

  P("retro-crt-phosphor-grid", {
    category: "backgrounds",
    subcategory: "patterns",
    title: "Retro CRT Phosphor Grid",
    description: "Trinitron television aperture grille vertical phosphor stripes with RGB subpixel pattern.",
    tags: ["crt", "phosphor", "trinitron", "subpixel", "retro"],
    dependencies: ["react"],
    difficulty: "starter",
    dna: {
      genre: "retro",
      macrostructure: "full-bleed",
      density: "dense",
      shapeLanguage: "sharp",
      motionLanguage: "none",
      typographyStyle: "monospace",
      colorStrategy: "neon-on-dark",
    },
    fingerprint: {
      interactionModel: "passive-phosphor-grille",
      visualModel: "vertical-aperture-stripes",
      motionModel: "none",
      layoutModel: "full-viewport-underlay",
      semanticPurpose: "trinitron-aperture-grille",
    },
    source: `"use client";

import { cn } from "@/lib/cn";

export interface RetroCRTPhosphorGridProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export function RetroCRTPhosphorGrid({ className, children, ...props }: RetroCRTPhosphorGridProps) {
  return (
    <div className={cn("relative isolate w-full min-h-full bg-slate-950 text-white overflow-hidden", className)} {...props}>
      <div
        className="absolute inset-0 pointer-events-none opacity-25 -z-10"
        style={{
          backgroundImage: "linear-gradient(to right, rgba(255, 0, 0, 0.4) 1px, rgba(0, 255, 0, 0.4) 2px, rgba(0, 0, 255, 0.4) 3px, transparent 4px)",
          backgroundSize: "6px 100%",
        }}
      />
      {children}
    </div>
  );
}
`,
    demo: `"use client";

import { RetroCRTPhosphorGrid } from "./retro-crt-phosphor-grid";

export default function RetroCRTPhosphorGridDemo() {
  return (
    <RetroCRTPhosphorGrid className="min-h-[260px] flex items-center justify-center p-8">
      <div className="p-6 rounded-xl border border-white/20 bg-black/70 backdrop-blur-md shadow-xl text-center max-w-sm">
        <h3 className="text-sm font-bold font-mono text-white">Trinitron Phosphor</h3>
        <p className="text-xs text-white/70 mt-1 font-mono">RGB cathode phosphor vertical aperture grille.</p>
      </div>
    </RetroCRTPhosphorGrid>
  );
}
`,
  }),

  P("metaball-lava-lamp", {
    category: "backgrounds",
    subcategory: "canvases",
    title: "Metaball Lava Lamp",
    description: "Rising and falling viscous wax liquid metaball blobs floating smoothly inside a heated column.",
    tags: ["lava", "metaball", "canvas", "wax", "fluid"],
    dependencies: ["react"],
    difficulty: "intermediate",
    dna: {
      genre: "retro",
      macrostructure: "full-bleed",
      density: "airy",
      shapeLanguage: "soft",
      motionLanguage: "kinetic",
      typographyStyle: "grotesk",
      colorStrategy: "neon-on-dark",
    },
    fingerprint: {
      interactionModel: "passive-canvas-lava",
      visualModel: "buoyant-wax-droplets",
      motionModel: "convective-thermal-buoyancy",
      layoutModel: "full-viewport-underlay",
      semanticPurpose: "lava-lamp-ambiance",
    },
    source: `"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/cn";

export interface MetaballLavaLampProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export function MetaballLavaLamp({ className, children, ...props }: MetaballLavaLampProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let w = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let h = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    const blobs = Array.from({ length: 8 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 40 + 30,
      vy: (Math.random() - 0.5) * 0.8,
    }));

    const render = () => {
      ctx.fillStyle = "#090d16";
      ctx.fillRect(0, 0, w, h);

      for (const b of blobs) {
        b.y += b.vy;
        if (b.y < -50) b.y = h + 50;
        if (b.y > h + 50) b.y = -50;

        const grad = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, b.r);
        grad.addColorStop(0, "rgba(244, 63, 94, 0.4)");
        grad.addColorStop(1, "rgba(244, 63, 94, 0)");
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
        ctx.fill();
      }
      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <div className={cn("relative isolate w-full min-h-full bg-slate-950 text-white overflow-hidden", className)} {...props}>
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none -z-10" />
      {children}
    </div>
  );
}
`,
    demo: `"use client";

import { MetaballLavaLamp } from "./metaball-lava-lamp";

export default function MetaballLavaLampDemo() {
  return (
    <MetaballLavaLamp className="min-h-[260px] flex items-center justify-center p-8">
      <div className="p-6 rounded-xl border border-rose-500/30 bg-black/70 backdrop-blur-md shadow-xl text-center max-w-sm">
        <h3 className="text-sm font-bold font-sans text-rose-400">Thermal Lava Lamp</h3>
        <p className="text-xs text-white/70 mt-1 font-sans">Buoyant wax convective liquid metaball flow.</p>
      </div>
    </MetaballLavaLamp>
  );
}
`,
  }),

  P("circuit-logic-gates", {
    category: "backgrounds",
    subcategory: "patterns",
    title: "Circuit Logic Gates",
    description: "Digital schematic diagram with Boolean logic gates (AND, OR, XOR) interconnected by signal nets.",
    tags: ["logic", "gates", "schematic", "boolean", "circuit"],
    dependencies: ["react"],
    difficulty: "starter",
    dna: {
      genre: "technical",
      macrostructure: "full-bleed",
      density: "medium",
      shapeLanguage: "sharp",
      motionLanguage: "none",
      typographyStyle: "monospace",
      colorStrategy: "high-contrast",
    },
    fingerprint: {
      interactionModel: "passive-logic-schematic",
      visualModel: "boolean-gate-diagram",
      motionModel: "none",
      layoutModel: "full-viewport-underlay",
      semanticPurpose: "logic-schematic-texture",
    },
    source: `"use client";

import { cn } from "@/lib/cn";

export interface CircuitLogicGatesProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export function CircuitLogicGates({ className, children, ...props }: CircuitLogicGatesProps) {
  return (
    <div className={cn("relative isolate w-full min-h-full bg-paper text-ink overflow-hidden", className)} {...props}>
      <svg className="absolute inset-0 w-full h-full opacity-15 pointer-events-none -z-10" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="gates-pat" width="100" height="60" patternUnits="userSpaceOnUse">
            <path d="M10 20 L25 20 M10 40 L25 40 M25 15 L35 15 A15 15 0 0 1 35 45 L25 45 Z M50 30 L70 30" fill="none" stroke="currentColor" strokeWidth="1" />
            <circle cx="70" cy="30" r="2" fill="currentColor" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#gates-pat)" />
      </svg>
      {children}
    </div>
  );
}
`,
    demo: `"use client";

import { CircuitLogicGates } from "./circuit-logic-gates";

export default function CircuitLogicGatesDemo() {
  return (
    <CircuitLogicGates className="min-h-[260px] flex items-center justify-center p-8">
      <div className="p-6 rounded-xl border border-line bg-paper/90 backdrop-blur-md shadow-md text-center max-w-sm">
        <h3 className="text-sm font-bold font-mono text-ink">Boolean Logic Gates</h3>
        <p className="text-xs text-ink/60 mt-1 font-sans">Digital AND/OR schematic gate arrays.</p>
      </div>
    </CircuitLogicGates>
  );
}
`,
  }),

  P("soundwave-radial-pulse", {
    category: "backgrounds",
    subcategory: "ambient",
    title: "Soundwave Radial Pulse",
    description: "Circular audio sonar pulses emanating radially outward like acoustic underwater echolocation.",
    tags: ["sonar", "pulse", "acoustic", "echolocation", "soundwave"],
    dependencies: ["react"],
    difficulty: "starter",
    dna: {
      genre: "technical",
      macrostructure: "full-bleed",
      density: "airy",
      shapeLanguage: "pill",
      motionLanguage: "subtle",
      typographyStyle: "monospace",
      colorStrategy: "neon-on-dark",
    },
    fingerprint: {
      interactionModel: "passive-sonar-pulse",
      visualModel: "pulsing-echolocation-rings",
      motionModel: "none",
      layoutModel: "center-anchored-radial",
      semanticPurpose: "sonar-pulse-canvas",
    },
    source: `"use client";

import { cn } from "@/lib/cn";

export interface SoundwaveRadialPulseProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export function SoundwaveRadialPulse({ className, children, ...props }: SoundwaveRadialPulseProps) {
  return (
    <div className={cn("relative isolate w-full min-h-full bg-slate-950 text-cyan-400 overflow-hidden", className)} {...props}>
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-25 -z-10">
        <div className="w-96 h-96 rounded-full border border-cyan-500/40" />
        <div className="absolute w-72 h-72 rounded-full border border-cyan-500/50" />
        <div className="absolute w-48 h-48 rounded-full border border-cyan-500/60" />
        <div className="absolute w-24 h-24 rounded-full border border-cyan-500/80" />
      </div>
      {children}
    </div>
  );
}
`,
    demo: `"use client";

import { SoundwaveRadialPulse } from "./soundwave-radial-pulse";

export default function SoundwaveRadialPulseDemo() {
  return (
    <SoundwaveRadialPulse className="min-h-[260px] flex items-center justify-center p-8">
      <div className="p-6 rounded-xl border border-cyan-500/30 bg-black/70 backdrop-blur-md shadow-xl text-center max-w-sm">
        <h3 className="text-sm font-bold font-mono text-cyan-400">Sonar Echolocation</h3>
        <p className="text-xs text-white/70 mt-1 font-mono">Radial acoustic wave emission rings.</p>
      </div>
    </SoundwaveRadialPulse>
  );
}
`,
  }),

  P("geometric-houndstooth-check", {
    category: "backgrounds",
    subcategory: "patterns",
    title: "Geometric Houndstooth Check",
    description: "Classic high-fashion pied-de-poule houndstooth duotone broken checkered tessellation.",
    tags: ["houndstooth", "fashion", "textile", "check", "classic"],
    dependencies: ["react"],
    difficulty: "starter",
    dna: {
      genre: "luxury",
      macrostructure: "full-bleed",
      density: "dense",
      shapeLanguage: "sharp",
      motionLanguage: "none",
      typographyStyle: "serif-display",
      colorStrategy: "monochrome",
    },
    fingerprint: {
      interactionModel: "passive-houndstooth-textile",
      visualModel: "pied-de-poule-tessellation",
      motionModel: "none",
      layoutModel: "full-viewport-underlay",
      semanticPurpose: "fashion-houndstooth-texture",
    },
    source: `"use client";

import { cn } from "@/lib/cn";

export interface GeometricHoundstoothCheckProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export function GeometricHoundstoothCheck({ className, children, ...props }: GeometricHoundstoothCheckProps) {
  return (
    <div className={cn("relative isolate w-full min-h-full bg-paper text-ink overflow-hidden", className)} {...props}>
      <svg className="absolute inset-0 w-full h-full opacity-10 pointer-events-none -z-10" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="houndstooth-pat" width="32" height="32" patternUnits="userSpaceOnUse">
            <polygon points="0,0 8,0 16,8 8,8" fill="currentColor" />
            <polygon points="16,8 24,8 32,16 24,16" fill="currentColor" />
            <polygon points="16,16 32,16 32,32 16,32" fill="currentColor" />
            <polygon points="0,16 8,16 0,24" fill="currentColor" />
            <polygon points="24,0 32,0 32,8" fill="currentColor" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#houndstooth-pat)" />
      </svg>
      {children}
    </div>
  );
}
`,
    demo: `"use client";

import { GeometricHoundstoothCheck } from "./geometric-houndstooth-check";

export default function GeometricHoundstoothCheckDemo() {
  return (
    <GeometricHoundstoothCheck className="min-h-[260px] flex items-center justify-center p-8">
      <div className="p-6 rounded-xl border border-line bg-paper/90 backdrop-blur-md shadow-md text-center max-w-sm">
        <h3 className="text-sm font-bold font-serif text-ink">Haute Houndstooth</h3>
        <p className="text-xs text-ink/60 mt-1 font-sans">Heritage broken checkered textile weave.</p>
      </div>
    </GeometricHoundstoothCheck>
  );
}
`,
  }),

  P("dappled-forest-canopy", {
    category: "backgrounds",
    subcategory: "ambient",
    title: "Dappled Forest Canopy",
    description: "Atmospheric sunbeams (crepuscular rays) filtering down through an overhead woodland canopy.",
    tags: ["forest", "canopy", "sunbeams", "godrays", "nature"],
    dependencies: ["react"],
    difficulty: "starter",
    dna: {
      genre: "organic",
      macrostructure: "full-bleed",
      density: "airy",
      shapeLanguage: "soft",
      motionLanguage: "none",
      typographyStyle: "humanist",
      colorStrategy: "muted-earth",
    },
    fingerprint: {
      interactionModel: "passive-crepuscular-rays",
      visualModel: "canopy-light-shafts",
      motionModel: "none",
      layoutModel: "full-viewport-underlay",
      semanticPurpose: "forest-canopy-sunbeams",
    },
    source: `"use client";

import { cn } from "@/lib/cn";

export interface DappledForestCanopyProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export function DappledForestCanopy({ className, children, ...props }: DappledForestCanopyProps) {
  return (
    <div className={cn("relative isolate w-full min-h-full bg-paper text-ink overflow-hidden", className)} {...props}>
      <div
        className="absolute -top-32 left-1/3 w-[600px] h-[500px] pointer-events-none opacity-20 -z-10 rotate-12"
        style={{
          background: "radial-gradient(ellipse at top, rgba(245, 158, 11, 0.4) 0%, rgba(16, 185, 129, 0.15) 60%, transparent 80%)",
          filter: "blur(40px)",
        }}
      />
      {children}
    </div>
  );
}
`,
    demo: `"use client";

import { DappledForestCanopy } from "./dappled-forest-canopy";

export default function DappledForestCanopyDemo() {
  return (
    <DappledForestCanopy className="min-h-[260px] flex items-center justify-center p-8">
      <div className="p-6 rounded-xl border border-line bg-paper/90 backdrop-blur-md shadow-md text-center max-w-sm">
        <h3 className="text-sm font-bold font-serif text-ink">Sunbeam Foliage</h3>
        <p className="text-xs text-ink/60 mt-1 font-sans">Filtered crepuscular woodland sunbeams.</p>
      </div>
    </DappledForestCanopy>
  );
}
`,
  }),

  P("infinite-tunnel-rings", {
    category: "backgrounds",
    subcategory: "ambient",
    title: "Infinite Tunnel Rings",
    description: "Concentric perspective square portal frames receding into an infinite central corridor.",
    tags: ["tunnel", "portal", "perspective", "infinite", "corridor"],
    dependencies: ["react"],
    difficulty: "starter",
    dna: {
      genre: "technical",
      macrostructure: "full-bleed",
      density: "medium",
      shapeLanguage: "sharp",
      motionLanguage: "none",
      typographyStyle: "monospace",
      colorStrategy: "high-contrast",
    },
    fingerprint: {
      interactionModel: "passive-infinite-tunnel",
      visualModel: "receding-square-frames",
      motionModel: "none",
      layoutModel: "center-anchored-radial",
      semanticPurpose: "infinite-portal-tunnel",
    },
    source: `"use client";

import { cn } from "@/lib/cn";

export interface InfiniteTunnelRingsProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export function InfiniteTunnelRings({ className, children, ...props }: InfiniteTunnelRingsProps) {
  return (
    <div className={cn("relative isolate w-full min-h-full bg-paper text-ink overflow-hidden", className)} {...props}>
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20 -z-10">
        <svg className="w-[500px] h-[500px]" viewBox="0 0 200 200">
          {[10, 25, 45, 70, 95].map((s) => (
            <rect
              key={s}
              x={100 - s}
              y={100 - s}
              width={s * 2}
              height={s * 2}
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
            />
          ))}
          <line x1="5" y1="5" x2="90" y2="90" stroke="currentColor" strokeWidth="0.75" />
          <line x1="195" y1="5" x2="110" y2="90" stroke="currentColor" strokeWidth="0.75" />
          <line x1="5" y1="195" x2="90" y2="110" stroke="currentColor" strokeWidth="0.75" />
          <line x1="195" y1="195" x2="110" y2="110" stroke="currentColor" strokeWidth="0.75" />
        </svg>
      </div>
      {children}
    </div>
  );
}
`,
    demo: `"use client";

import { InfiniteTunnelRings } from "./infinite-tunnel-rings";

export default function InfiniteTunnelRingsDemo() {
  return (
    <InfiniteTunnelRings className="min-h-[260px] flex items-center justify-center p-8">
      <div className="p-6 rounded-xl border border-line bg-paper/90 backdrop-blur-md shadow-md text-center max-w-sm">
        <h3 className="text-sm font-bold font-mono text-ink">Corridor Tunnel</h3>
        <p className="text-xs text-ink/60 mt-1 font-sans">Deep perspective receding structural frames.</p>
      </div>
    </InfiniteTunnelRings>
  );
}
`,
  }),

  P("quantum-field-lattice", {
    category: "backgrounds",
    subcategory: "patterns",
    title: "Quantum Field Lattice",
    description: "Quantum electrodynamics subatomic particle probability density lattice with probability vertices.",
    tags: ["quantum", "physics", "lattice", "probability", "particles"],
    dependencies: ["react"],
    difficulty: "starter",
    dna: {
      genre: "technical",
      macrostructure: "full-bleed",
      density: "medium",
      shapeLanguage: "pill",
      motionLanguage: "none",
      typographyStyle: "monospace",
      colorStrategy: "high-contrast",
    },
    fingerprint: {
      interactionModel: "passive-quantum-lattice",
      visualModel: "probability-density-crosshairs",
      motionModel: "none",
      layoutModel: "full-viewport-underlay",
      semanticPurpose: "subatomic-lattice-backdrop",
    },
    source: `"use client";

import { cn } from "@/lib/cn";

export interface QuantumFieldLatticeProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export function QuantumFieldLattice({ className, children, ...props }: QuantumFieldLatticeProps) {
  return (
    <div className={cn("relative isolate w-full min-h-full bg-paper text-ink overflow-hidden", className)} {...props}>
      <svg className="absolute inset-0 w-full h-full opacity-20 pointer-events-none -z-10" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="quantum-pat" width="36" height="36" patternUnits="userSpaceOnUse">
            <line x1="18" y1="14" x2="18" y2="22" stroke="currentColor" strokeWidth="1" />
            <line x1="14" y1="18" x2="22" y2="18" stroke="currentColor" strokeWidth="1" />
            <circle cx="18" cy="18" r="1.5" fill="currentColor" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#quantum-pat)" />
      </svg>
      {children}
    </div>
  );
}
`,
    demo: `"use client";

import { QuantumFieldLattice } from "./quantum-field-lattice";

export default function QuantumFieldLatticeDemo() {
  return (
    <QuantumFieldLattice className="min-h-[260px] flex items-center justify-center p-8">
      <div className="p-6 rounded-xl border border-line bg-paper/90 backdrop-blur-md shadow-md text-center max-w-sm">
        <h3 className="text-sm font-bold font-mono text-ink">Quantum Field Grid</h3>
        <p className="text-xs text-ink/60 mt-1 font-sans">Crosshair probability matrix vertices.</p>
      </div>
    </QuantumFieldLattice>
  );
}
`,
  }),

  P("origami-hex-rosette", {
    category: "backgrounds",
    subcategory: "patterns",
    title: "Origami Hex Rosette",
    description: "Six-fold rotational origami paper tessellation forming star-shaped kaleidoscopic florets.",
    tags: ["origami", "rosette", "hexagon", "folding", "paper"],
    dependencies: ["react"],
    difficulty: "starter",
    dna: {
      genre: "minimal",
      macrostructure: "full-bleed",
      density: "medium",
      shapeLanguage: "sharp",
      motionLanguage: "none",
      typographyStyle: "grotesk",
      colorStrategy: "high-contrast",
    },
    fingerprint: {
      interactionModel: "passive-origami-rosette",
      visualModel: "six-fold-paper-florets",
      motionModel: "none",
      layoutModel: "full-viewport-underlay",
      semanticPurpose: "folded-rosette-texture",
    },
    source: `"use client";

import { cn } from "@/lib/cn";

export interface OrigamiHexRosetteProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export function OrigamiHexRosette({ className, children, ...props }: OrigamiHexRosetteProps) {
  return (
    <div className={cn("relative isolate w-full min-h-full bg-paper text-ink overflow-hidden", className)} {...props}>
      <svg className="absolute inset-0 w-full h-full opacity-15 pointer-events-none -z-10" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="hex-rosette-pat" width="48" height="48" patternUnits="userSpaceOnUse">
            <polygon points="24,4 30,18 44,24 30,30 24,44 18,30 4,24 18,18" fill="none" stroke="currentColor" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#hex-rosette-pat)" />
      </svg>
      {children}
    </div>
  );
}
`,
    demo: `"use client";

import { OrigamiHexRosette } from "./origami-hex-rosette";

export default function OrigamiHexRosetteDemo() {
  return (
    <OrigamiHexRosette className="min-h-[260px] flex items-center justify-center p-8">
      <div className="p-6 rounded-xl border border-line bg-paper/90 backdrop-blur-md shadow-md text-center max-w-sm">
        <h3 className="text-sm font-bold font-sans text-ink">Origami Hex Rosette</h3>
        <p className="text-xs text-ink/60 mt-1 font-sans">Folded paper star flower tessellation.</p>
      </div>
    </OrigamiHexRosette>
  );
}
`,
  }),

  P("vintage-ledger-lines", {
    category: "backgrounds",
    subcategory: "patterns",
    title: "Vintage Ledger Lines",
    description: "Classic double-ruled accounting book ledger lines with vertical currency column rules.",
    tags: ["ledger", "accounting", "vintage", "rules", "book"],
    dependencies: ["react"],
    difficulty: "starter",
    dna: {
      genre: "editorial",
      macrostructure: "full-bleed",
      density: "medium",
      shapeLanguage: "sharp",
      motionLanguage: "none",
      typographyStyle: "serif-display",
      colorStrategy: "muted-earth",
    },
    fingerprint: {
      interactionModel: "passive-accounting-ledger",
      visualModel: "double-ruled-columns",
      motionModel: "none",
      layoutModel: "full-viewport-underlay",
      semanticPurpose: "accounting-ledger-texture",
    },
    source: `"use client";

import { cn } from "@/lib/cn";

export interface VintageLedgerLinesProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export function VintageLedgerLines({ className, children, ...props }: VintageLedgerLinesProps) {
  return (
    <div className={cn("relative isolate w-full min-h-full bg-paper text-ink overflow-hidden", className)} {...props}>
      <div
        className="absolute inset-0 pointer-events-none opacity-20 -z-10"
        style={{
          backgroundImage: \`
            linear-gradient(to bottom, #3b82f6 1px, transparent 1px),
            linear-gradient(to right, #ef4444 1px, transparent 1px)
          \`,
          backgroundSize: "100% 24px, 80px 100%",
        }}
      />
      {children}
    </div>
  );
}
`,
    demo: `"use client";

import { VintageLedgerLines } from "./vintage-ledger-lines";

export default function VintageLedgerLinesDemo() {
  return (
    <VintageLedgerLines className="min-h-[260px] flex items-center justify-center p-8">
      <div className="p-6 rounded-xl border border-line bg-paper/90 backdrop-blur-md shadow-md text-center max-w-sm">
        <h3 className="text-sm font-bold font-serif text-ink">Accounting Ledger</h3>
        <p className="text-xs text-ink/60 mt-1 font-sans">Dual-color horizontal entries and vertical columns.</p>
      </div>
    </VintageLedgerLines>
  );
}
`,
  }),

  P("halftone-diamond-mesh", {
    category: "backgrounds",
    subcategory: "patterns",
    title: "Halftone Diamond Mesh",
    description: "Rhombus diamond-shaped screen printing halftone dots scaled across a diagonal angle matrix.",
    tags: ["halftone", "diamond", "rhombus", "print", "screen"],
    dependencies: ["react"],
    difficulty: "starter",
    dna: {
      genre: "retro",
      macrostructure: "full-bleed",
      density: "medium",
      shapeLanguage: "sharp",
      motionLanguage: "none",
      typographyStyle: "condensed",
      colorStrategy: "high-contrast",
    },
    fingerprint: {
      interactionModel: "passive-diamond-halftone",
      visualModel: "rhomboid-raster-dots",
      motionModel: "none",
      layoutModel: "full-viewport-underlay",
      semanticPurpose: "diamond-halftone-texture",
    },
    source: `"use client";

import { cn } from "@/lib/cn";

export interface HalftoneDiamondMeshProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export function HalftoneDiamondMesh({ className, children, ...props }: HalftoneDiamondMeshProps) {
  return (
    <div className={cn("relative isolate w-full min-h-full bg-paper text-ink overflow-hidden", className)} {...props}>
      <svg className="absolute inset-0 w-full h-full opacity-15 pointer-events-none -z-10" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="dia-half-pat" width="24" height="24" patternUnits="userSpaceOnUse">
            <polygon points="12,6 18,12 12,18 6,12" fill="currentColor" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#dia-half-pat)" />
      </svg>
      {children}
    </div>
  );
}
`,
    demo: `"use client";

import { HalftoneDiamondMesh } from "./halftone-diamond-mesh";

export default function HalftoneDiamondMeshDemo() {
  return (
    <HalftoneDiamondMesh className="min-h-[260px] flex items-center justify-center p-8">
      <div className="p-6 rounded-xl border border-line bg-paper/90 backdrop-blur-md shadow-md text-center max-w-sm">
        <h3 className="text-sm font-bold font-mono text-ink">Diamond Halftone</h3>
        <p className="text-xs text-ink/60 mt-1 font-sans">Rhomboid halftone screening matrix.</p>
      </div>
    </HalftoneDiamondMesh>
  );
}
`,
  }),

  P("aurora-curtain-drape", {
    category: "backgrounds",
    subcategory: "ambient",
    title: "Aurora Curtain Drape",
    description: "Vertical waving celestial curtains of polar light draped softly across a starry night backdrop.",
    tags: ["aurora", "curtain", "polar", "atmosphere", "glow"],
    dependencies: ["react"],
    difficulty: "starter",
    dna: {
      genre: "organic",
      macrostructure: "full-bleed",
      density: "airy",
      shapeLanguage: "soft",
      motionLanguage: "subtle",
      typographyStyle: "grotesk",
      colorStrategy: "neon-on-dark",
    },
    fingerprint: {
      interactionModel: "passive-aurora-drape",
      visualModel: "vertical-light-ribbons",
      motionModel: "none",
      layoutModel: "full-viewport-underlay",
      semanticPurpose: "polar-curtain-drape",
    },
    source: `"use client";

import { cn } from "@/lib/cn";

export interface AuroraCurtainDrapeProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export function AuroraCurtainDrape({ className, children, ...props }: AuroraCurtainDrapeProps) {
  return (
    <div className={cn("relative isolate w-full min-h-full bg-slate-950 text-white overflow-hidden", className)} {...props}>
      <div
        className="absolute inset-0 pointer-events-none opacity-30 -z-10"
        style={{
          background: "linear-gradient(to bottom, transparent 20%, rgba(16, 185, 129, 0.4) 60%, rgba(6, 182, 212, 0.3) 80%, transparent 100%)",
          filter: "blur(30px)",
        }}
      />
      {children}
    </div>
  );
}
`,
    demo: `"use client";

import { AuroraCurtainDrape } from "./aurora-curtain-drape";

export default function AuroraCurtainDrapeDemo() {
  return (
    <AuroraCurtainDrape className="min-h-[260px] flex items-center justify-center p-8">
      <div className="p-6 rounded-xl border border-emerald-500/30 bg-black/70 backdrop-blur-md shadow-xl text-center max-w-sm">
        <h3 className="text-sm font-bold font-sans text-emerald-400">Polar Curtains</h3>
        <p className="text-xs text-white/70 mt-1 font-sans">Vertical curtains of solar wind atmospheric ion luminescence.</p>
      </div>
    </AuroraCurtainDrape>
  );
}
`,
  }),

  P("geometric-tartan-plaid", {
    category: "backgrounds",
    subcategory: "patterns",
    title: "Geometric Tartan Plaid",
    description: "Scottish woven tartan plaid with layered intersecting warp and weft yarn bands.",
    tags: ["tartan", "plaid", "scottish", "textile", "heritage"],
    dependencies: ["react"],
    difficulty: "starter",
    dna: {
      genre: "editorial",
      macrostructure: "full-bleed",
      density: "dense",
      shapeLanguage: "sharp",
      motionLanguage: "none",
      typographyStyle: "serif-display",
      colorStrategy: "muted-earth",
    },
    fingerprint: {
      interactionModel: "passive-tartan-weave",
      visualModel: "criss-cross-yarn-bands",
      motionModel: "none",
      layoutModel: "full-viewport-underlay",
      semanticPurpose: "heritage-tartan-pattern",
    },
    source: `"use client";

import { cn } from "@/lib/cn";

export interface GeometricTartanPlaidProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export function GeometricTartanPlaid({ className, children, ...props }: GeometricTartanPlaidProps) {
  return (
    <div className={cn("relative isolate w-full min-h-full bg-paper text-ink overflow-hidden", className)} {...props}>
      <div
        className="absolute inset-0 pointer-events-none opacity-10 -z-10"
        style={{
          backgroundImage: \`
            repeating-linear-gradient(0deg, currentColor 0, currentColor 2px, transparent 2px, transparent 24px),
            repeating-linear-gradient(90deg, currentColor 0, currentColor 2px, transparent 2px, transparent 24px),
            repeating-linear-gradient(0deg, currentColor 0, currentColor 6px, transparent 6px, transparent 72px),
            repeating-linear-gradient(90deg, currentColor 0, currentColor 6px, transparent 6px, transparent 72px)
          \`,
        }}
      />
      {children}
    </div>
  );
}
`,
    demo: `"use client";

import { GeometricTartanPlaid } from "./geometric-tartan-plaid";

export default function GeometricTartanPlaidDemo() {
  return (
    <GeometricTartanPlaid className="min-h-[260px] flex items-center justify-center p-8">
      <div className="p-6 rounded-xl border border-line bg-paper/90 backdrop-blur-md shadow-md text-center max-w-sm">
        <h3 className="text-sm font-bold font-serif text-ink">Heritage Tartan</h3>
        <p className="text-xs text-ink/60 mt-1 font-sans">Multi-stripe highland wool woven plaid.</p>
      </div>
    </GeometricTartanPlaid>
  );
}
`,
  }),

  P("cybernetic-hex-shield", {
    category: "backgrounds",
    subcategory: "ambient",
    title: "Cybernetic Hex Shield",
    description: "Futuristic energy deflector force field shield with glowing cyan hexagonal barrier tiles.",
    tags: ["shield", "scifi", "forcefield", "hex", "cyber"],
    dependencies: ["react"],
    difficulty: "starter",
    dna: {
      genre: "technical",
      macrostructure: "full-bleed",
      density: "medium",
      shapeLanguage: "sharp",
      motionLanguage: "subtle",
      typographyStyle: "monospace",
      colorStrategy: "neon-on-dark",
    },
    fingerprint: {
      interactionModel: "passive-deflector-shield",
      visualModel: "hexagonal-energy-barrier",
      motionModel: "none",
      layoutModel: "full-viewport-underlay",
      semanticPurpose: "energy-shield-backdrop",
    },
    source: `"use client";

import { cn } from "@/lib/cn";

export interface CyberneticHexShieldProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export function CyberneticHexShield({ className, children, ...props }: CyberneticHexShieldProps) {
  return (
    <div className={cn("relative isolate w-full min-h-full bg-slate-950 text-cyan-400 overflow-hidden", className)} {...props}>
      <svg className="absolute inset-0 w-full h-full opacity-25 pointer-events-none -z-10" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="shield-hex" width="40" height="34.64" patternUnits="userSpaceOnUse">
            <polygon points="10,0 30,0 40,17.32 30,34.64 10,34.64 0,17.32" fill="none" stroke="currentColor" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#shield-hex)" />
      </svg>
      {children}
    </div>
  );
}
`,
    demo: `"use client";

import { CyberneticHexShield } from "./cybernetic-hex-shield";

export default function CyberneticHexShieldDemo() {
  return (
    <CyberneticHexShield className="min-h-[260px] flex items-center justify-center p-8">
      <div className="p-6 rounded-xl border border-cyan-500/30 bg-black/70 backdrop-blur-md shadow-xl text-center max-w-sm">
        <h3 className="text-sm font-bold font-mono text-cyan-400">Force Field Shield</h3>
        <p className="text-xs text-white/70 mt-1 font-mono">Honeycomb deflector kinetic energy barrier.</p>
      </div>
    </CyberneticHexShield>
  );
}
`,
  }),

  P("fluid-smoke-turbulence", {
    category: "backgrounds",
    subcategory: "canvases",
    title: "Fluid Smoke Turbulence",
    description: "Navier-Stokes fluid dynamic smoke vortex currents swirling realistically on animated canvas.",
    tags: ["fluid", "smoke", "turbulence", "vortex", "canvas"],
    dependencies: ["react"],
    difficulty: "intermediate",
    dna: {
      genre: "organic",
      macrostructure: "full-bleed",
      density: "airy",
      shapeLanguage: "soft",
      motionLanguage: "kinetic",
      typographyStyle: "humanist",
      colorStrategy: "high-contrast",
    },
    fingerprint: {
      interactionModel: "passive-fluid-vortex",
      visualModel: "turbulent-smoke-eddies",
      motionModel: "navier-stokes-vorticity",
      layoutModel: "full-viewport-underlay",
      semanticPurpose: "fluid-turbulence-canvas",
    },
    source: `"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/cn";

export interface FluidSmokeTurbulenceProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export function FluidSmokeTurbulence({ className, children, ...props }: FluidSmokeTurbulenceProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let w = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let h = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    let t = 0;
    const render = () => {
      ctx.fillStyle = "rgba(255, 255, 255, 0.05)";
      ctx.fillRect(0, 0, w, h);

      ctx.strokeStyle = "rgba(100, 116, 139, 0.15)";
      ctx.lineWidth = 1.5;

      for (let i = 0; i < 4; i++) {
        ctx.beginPath();
        for (let x = 0; x < w; x += 15) {
          const y = h * 0.5 + Math.sin(x * 0.008 + t + i) * 50 * Math.cos(t * 0.5);
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }

      t += 0.015;
      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <div className={cn("relative isolate w-full min-h-full bg-paper text-ink overflow-hidden", className)} {...props}>
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none -z-10" />
      {children}
    </div>
  );
}
`,
    demo: `"use client";

import { FluidSmokeTurbulence } from "./fluid-smoke-turbulence";

export default function FluidSmokeTurbulenceDemo() {
  return (
    <FluidSmokeTurbulence className="min-h-[260px] flex items-center justify-center p-8">
      <div className="p-6 rounded-xl border border-line bg-paper/90 backdrop-blur-md shadow-md text-center max-w-sm">
        <h3 className="text-sm font-bold font-sans text-ink">Turbulent Eddy Current</h3>
        <p className="text-xs text-ink/60 mt-1 font-sans">Navier-Stokes fluid dynamic smoke eddies.</p>
      </div>
    </FluidSmokeTurbulence>
  );
}
`,
  }),

  P("topographic-ocean-trench", {
    category: "backgrounds",
    subcategory: "patterns",
    title: "Topographic Ocean Trench",
    description: "Deep bathymetric submarine trench isobaths illustrating ocean floor abyssal contours.",
    tags: ["bathymetric", "ocean", "trench", "submarine", "contours"],
    dependencies: ["react"],
    difficulty: "starter",
    dna: {
      genre: "technical",
      macrostructure: "full-bleed",
      density: "medium",
      shapeLanguage: "soft",
      motionLanguage: "none",
      typographyStyle: "monospace",
      colorStrategy: "neon-on-dark",
    },
    fingerprint: {
      interactionModel: "passive-bathymetric-chart",
      visualModel: "abyssal-trench-isobaths",
      motionModel: "none",
      layoutModel: "full-viewport-underlay",
      semanticPurpose: "ocean-depth-contour-layer",
    },
    source: `"use client";

import { cn } from "@/lib/cn";

export interface TopographicOceanTrenchProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export function TopographicOceanTrench({ className, children, ...props }: TopographicOceanTrenchProps) {
  return (
    <div className={cn("relative isolate w-full min-h-full bg-slate-950 text-cyan-400 overflow-hidden", className)} {...props}>
      <svg className="absolute inset-0 w-full h-full opacity-20 pointer-events-none -z-10" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" viewBox="0 0 800 600">
        <path d="M0,150 Q400,350 800,150" fill="none" stroke="currentColor" strokeWidth="1" />
        <path d="M0,220 Q400,420 800,220" fill="none" stroke="currentColor" strokeWidth="1.2" />
        <path d="M0,300 Q400,490 800,300" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <path d="M0,380 Q400,560 800,380" fill="none" stroke="currentColor" strokeWidth="2" />
      </svg>
      {children}
    </div>
  );
}
`,
    demo: `"use client";

import { TopographicOceanTrench } from "./topographic-ocean-trench";

export default function TopographicOceanTrenchDemo() {
  return (
    <TopographicOceanTrench className="min-h-[260px] flex items-center justify-center p-8">
      <div className="p-6 rounded-xl border border-cyan-500/30 bg-black/70 backdrop-blur-md shadow-xl text-center max-w-sm">
        <h3 className="text-sm font-bold font-mono text-cyan-400">Mariana Trench Isobaths</h3>
        <p className="text-xs text-white/70 mt-1 font-mono">Abyssal submarine bathymetric depth curves.</p>
      </div>
    </TopographicOceanTrench>
  );
}
`,
  }),

  P("glitch-rgb-split", {
    category: "backgrounds",
    subcategory: "ambient",
    title: "Glitch RGB Split",
    description: "Horizontal chromatic aberration split separating red and cyan video color channels.",
    tags: ["glitch", "rgb", "chromatic", "aberration", "split"],
    dependencies: ["react"],
    difficulty: "starter",
    dna: {
      genre: "retro",
      macrostructure: "full-bleed",
      density: "airy",
      shapeLanguage: "sharp",
      motionLanguage: "subtle",
      typographyStyle: "monospace",
      colorStrategy: "neon-on-dark",
    },
    fingerprint: {
      interactionModel: "passive-rgb-aberration",
      visualModel: "channel-offset-split",
      motionModel: "none",
      layoutModel: "full-viewport-underlay",
      semanticPurpose: "chromatic-aberration-texture",
    },
    source: `"use client";

import { cn } from "@/lib/cn";

export interface GlitchRGBSplitProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export function GlitchRGBSplit({ className, children, ...props }: GlitchRGBSplitProps) {
  return (
    <div className={cn("relative isolate w-full min-h-full bg-slate-950 text-white overflow-hidden", className)} {...props}>
      <div className="absolute inset-0 pointer-events-none opacity-20 -z-10 mix-blend-screen">
        <div
          className="absolute inset-0 translate-x-1"
          style={{
            backgroundImage: "repeating-linear-gradient(0deg, #ef4444 0, #ef4444 1px, transparent 1px, transparent 8px)",
          }}
        />
        <div
          className="absolute inset-0 -translate-x-1"
          style={{
            backgroundImage: "repeating-linear-gradient(0deg, #06b6d4 0, #06b6d4 1px, transparent 1px, transparent 8px)",
          }}
        />
      </div>
      {children}
    </div>
  );
}
`,
    demo: `"use client";

import { GlitchRGBSplit } from "./glitch-rgb-split";

export default function GlitchRGBSplitDemo() {
  return (
    <GlitchRGBSplit className="min-h-[260px] flex items-center justify-center p-8">
      <div className="p-6 rounded-xl border border-cyan-500/30 bg-black/70 backdrop-blur-md shadow-xl text-center max-w-sm">
        <h3 className="text-sm font-bold font-mono text-cyan-400">RGB Channel Shift</h3>
        <p className="text-xs text-white/70 mt-1 font-mono">Sub-pixel horizontal chromatic dispersion.</p>
      </div>
    </GlitchRGBSplit>
  );
}
`,
  }),

  P("star-constellation-astrolabe", {
    category: "backgrounds",
    subcategory: "patterns",
    title: "Star Constellation Astrolabe",
    description: "Brass medieval Islamic navigational astrolabe with stereographic rete and star pointers.",
    tags: ["astrolabe", "navigation", "stars", "medieval", "brass"],
    dependencies: ["react"],
    difficulty: "starter",
    dna: {
      genre: "editorial",
      macrostructure: "full-bleed",
      density: "airy",
      shapeLanguage: "sharp",
      motionLanguage: "none",
      typographyStyle: "serif-display",
      colorStrategy: "muted-earth",
    },
    fingerprint: {
      interactionModel: "passive-astrolabe-grid",
      visualModel: "stereographic-rete-astrolabe",
      motionModel: "none",
      layoutModel: "center-anchored-radial",
      semanticPurpose: "ancient-astrolabe-backdrop",
    },
    source: `"use client";

import { cn } from "@/lib/cn";

export interface StarConstellationAstrolabeProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export function StarConstellationAstrolabe({ className, children, ...props }: StarConstellationAstrolabeProps) {
  return (
    <div className={cn("relative isolate w-full min-h-full bg-paper text-ink overflow-hidden", className)} {...props}>
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20 -z-10">
        <svg className="w-[500px] h-[500px]" viewBox="0 0 200 200">
          <circle cx="100" cy="100" r="85" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="100" cy="100" r="60" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="3 2" />
          <circle cx="100" cy="100" r="35" fill="none" stroke="currentColor" strokeWidth="0.75" />
          <line x1="15" y1="100" x2="185" y2="100" stroke="currentColor" strokeWidth="1" />
          <line x1="100" y1="15" x2="100" y2="185" stroke="currentColor" strokeWidth="1" />
          <polygon points="100,20 103,30 97,30" fill="currentColor" />
          <polygon points="100,180 103,170 97,170" fill="currentColor" />
        </svg>
      </div>
      {children}
    </div>
  );
}
`,
    demo: `"use client";

import { StarConstellationAstrolabe } from "./star-constellation-astrolabe";

export default function StarConstellationAstrolabeDemo() {
  return (
    <StarConstellationAstrolabe className="min-h-[260px] flex items-center justify-center p-8">
      <div className="p-6 rounded-xl border border-line bg-paper/90 backdrop-blur-md shadow-md text-center max-w-sm">
        <h3 className="text-sm font-bold font-serif text-ink">Navigation Astrolabe</h3>
        <p className="text-xs text-ink/60 mt-1 font-sans">Ancient stereographic celestial rete coordinates.</p>
      </div>
    </StarConstellationAstrolabe>
  );
}
`,
  }),

  P("abstract-geometric-mandala", {
    category: "backgrounds",
    subcategory: "ambient",
    title: "Abstract Geometric Mandala",
    description: "Contemporary vector sacred mandala with clean concentric polygon rings and precision starbursts.",
    tags: ["mandala", "geometric", "sacred", "vector", "modern"],
    dependencies: ["react"],
    difficulty: "starter",
    dna: {
      genre: "minimal",
      macrostructure: "full-bleed",
      density: "airy",
      shapeLanguage: "sharp",
      motionLanguage: "none",
      typographyStyle: "grotesk",
      colorStrategy: "high-contrast",
    },
    fingerprint: {
      interactionModel: "passive-modern-mandala",
      visualModel: "concentric-polygon-mandala",
      motionModel: "none",
      layoutModel: "center-anchored-radial",
      semanticPurpose: "modern-mandala-canvas",
    },
    source: `"use client";

import { cn } from "@/lib/cn";

export interface AbstractGeometricMandalaProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export function AbstractGeometricMandala({ className, children, ...props }: AbstractGeometricMandalaProps) {
  return (
    <div className={cn("relative isolate w-full min-h-full bg-paper text-ink overflow-hidden", className)} {...props}>
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-15 -z-10">
        <svg className="w-[500px] h-[500px]" viewBox="0 0 200 200">
          <circle cx="100" cy="100" r="85" fill="none" stroke="currentColor" strokeWidth="1" />
          {[0, 30, 60, 90, 120, 150].map((deg) => (
            <rect
              key={deg}
              x="50"
              y="50"
              width="100"
              height="100"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.75"
              transform={\`rotate(\${deg} 100 100)\`}
            />
          ))}
          <circle cx="100" cy="100" r="20" fill="none" stroke="currentColor" strokeWidth="1" />
        </svg>
      </div>
      {children}
    </div>
  );
}
`,
    demo: `"use client";

import { AbstractGeometricMandala } from "./abstract-geometric-mandala";

export default function AbstractGeometricMandalaDemo() {
  return (
    <AbstractGeometricMandala className="min-h-[260px] flex items-center justify-center p-8">
      <div className="p-6 rounded-xl border border-line bg-paper/90 backdrop-blur-md shadow-md text-center max-w-sm">
        <h3 className="text-sm font-bold font-sans text-ink">Concentric Rosette</h3>
        <p className="text-xs text-ink/60 mt-1 font-sans">Multi-angle rotational square mandala.</p>
      </div>
    </AbstractGeometricMandala>
  );
}
`,
  }),
];
