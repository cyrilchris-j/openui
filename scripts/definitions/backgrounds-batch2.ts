import type { ResourceDefinition } from "../lib/definitions.js";

const P = (name: string, definition: Omit<ResourceDefinition, "name">): ResourceDefinition => ({
  name,
  ...definition,
});

export default [
  P("diagonal-stripes-pattern", {
    category: "backgrounds",
    subcategory: "patterns",
    title: "Diagonal Stripes Pattern",
    description: "Ultra-fine minimal 45-degree pinstripes with high-contrast subtle rhythm.",
    tags: ["stripes", "diagonal", "pattern", "minimal", "texture"],
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
      interactionModel: "passive-pinstripe-backdrop",
      visualModel: "fine-diagonal-striping",
      motionModel: "none",
      layoutModel: "full-viewport-underlay",
      semanticPurpose: "minimalist-stripe-texture",
    },
    source: `"use client";

import { cn } from "@/lib/cn";

export interface DiagonalStripesPatternProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export function DiagonalStripesPattern({ className, children, ...props }: DiagonalStripesPatternProps) {
  return (
    <div className={cn("relative isolate w-full min-h-full bg-paper text-ink overflow-hidden", className)} {...props}>
      <div
        className="absolute inset-0 pointer-events-none opacity-10 -z-10"
        style={{
          backgroundImage: "repeating-linear-gradient(45deg, currentColor, currentColor 1px, transparent 1px, transparent 12px)",
        }}
      />
      {children}
    </div>
  );
}
`,
    demo: `"use client";

import { DiagonalStripesPattern } from "./diagonal-stripes-pattern";

export default function DiagonalStripesPatternDemo() {
  return (
    <DiagonalStripesPattern className="min-h-[260px] flex items-center justify-center p-8">
      <div className="p-6 rounded-xl border border-line bg-paper/90 backdrop-blur-md shadow-md text-center max-w-sm">
        <h3 className="text-sm font-bold font-sans text-ink">Fine Pinstripe</h3>
        <p className="text-xs text-ink/60 mt-1 font-sans">Precision 45-degree diagonal hairline rhythm.</p>
      </div>
    </DiagonalStripesPattern>
  );
}
`,
  }),

  P("vintage-sunburst-rays", {
    category: "backgrounds",
    subcategory: "ambient",
    title: "Vintage Sunburst Rays",
    description: "Retro radial sunburst flare with alternating light and dark beams radiating upward from bottom.",
    tags: ["sunburst", "rays", "retro", "vintage", "beams"],
    dependencies: ["react"],
    difficulty: "starter",
    dna: {
      genre: "retro",
      macrostructure: "full-bleed",
      density: "airy",
      shapeLanguage: "sharp",
      motionLanguage: "none",
      typographyStyle: "serif-display",
      colorStrategy: "muted-earth",
    },
    fingerprint: {
      interactionModel: "passive-sunburst-flare",
      visualModel: "radial-wedge-sunburst",
      motionModel: "none",
      layoutModel: "bottom-center-anchored",
      semanticPurpose: "vintage-sunburst-backdrop",
    },
    source: `"use client";

import { cn } from "@/lib/cn";

export interface VintageSunburstRaysProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export function VintageSunburstRays({ className, children, ...props }: VintageSunburstRaysProps) {
  return (
    <div className={cn("relative isolate w-full min-h-full bg-paper text-ink overflow-hidden", className)} {...props}>
      <div
        className="absolute inset-0 pointer-events-none opacity-15 -z-10"
        style={{
          background: "repeating-conic-gradient(from 0deg at 50% 100%, currentColor 0deg 10deg, transparent 10deg 20deg)",
        }}
      />
      {children}
    </div>
  );
}
`,
    demo: `"use client";

import { VintageSunburstRays } from "./vintage-sunburst-rays";

export default function VintageSunburstRaysDemo() {
  return (
    <VintageSunburstRays className="min-h-[260px] flex items-center justify-center p-8">
      <div className="p-6 rounded-xl border border-line bg-paper/90 backdrop-blur-md shadow-md text-center max-w-sm">
        <h3 className="text-sm font-bold font-serif text-ink">Sunburst Rays</h3>
        <p className="text-xs text-ink/60 mt-1 font-sans">Retro conic beam flare from baseline horizon.</p>
      </div>
    </VintageSunburstRays>
  );
}
`,
  }),

  P("glitch-scanline-static", {
    category: "backgrounds",
    subcategory: "canvases",
    title: "Glitch Scanline Static",
    description: "Cathode-ray tube CRT monitor horizontal scanlines with subtle chromatic aberration bands.",
    tags: ["crt", "scanlines", "glitch", "retro", "terminal"],
    dependencies: ["react"],
    difficulty: "starter",
    dna: {
      genre: "retro",
      macrostructure: "full-bleed",
      density: "dense",
      shapeLanguage: "sharp",
      motionLanguage: "subtle",
      typographyStyle: "monospace",
      colorStrategy: "neon-on-dark",
    },
    fingerprint: {
      interactionModel: "passive-crt-scanlines",
      visualModel: "horizontal-raster-scanlines",
      motionModel: "subtle-flicker-shiver",
      layoutModel: "full-viewport-underlay",
      semanticPurpose: "crt-television-raster",
    },
    source: `"use client";

import { cn } from "@/lib/cn";

export interface GlitchScanlineStaticProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export function GlitchScanlineStatic({ className, children, ...props }: GlitchScanlineStaticProps) {
  return (
    <div className={cn("relative isolate w-full min-h-full bg-slate-950 text-emerald-400 overflow-hidden", className)} {...props}>
      <div
        className="absolute inset-0 pointer-events-none opacity-25 -z-10"
        style={{
          backgroundImage: "linear-gradient(to bottom, rgba(255,255,255,0), rgba(255,255,255,0) 50%, rgba(0, 0, 0, 0.7) 50%, rgba(0, 0, 0, 0.7))",
          backgroundSize: "100% 4px",
        }}
      />
      <div className="absolute inset-0 pointer-events-none bg-radial-gradient from-transparent via-black/40 to-black/80 -z-10" />
      {children}
    </div>
  );
}
`,
    demo: `"use client";

import { GlitchScanlineStatic } from "./glitch-scanline-static";

export default function GlitchScanlineStaticDemo() {
  return (
    <GlitchScanlineStatic className="min-h-[260px] flex items-center justify-center p-8">
      <div className="p-6 rounded-xl border border-emerald-500/30 bg-black/70 backdrop-blur-md shadow-xl text-center max-w-sm">
        <h3 className="text-sm font-bold font-mono text-emerald-400">CRT Monitor Phosphor</h3>
        <p className="text-xs text-white/70 mt-1 font-mono">Simulated phosphor raster scanlines.</p>
      </div>
    </GlitchScanlineStatic>
  );
}
`,
  }),

  P("voronoi-diagram-cells", {
    category: "backgrounds",
    subcategory: "patterns",
    title: "Voronoi Diagram Cells",
    description: "Computational geometry cellular Voronoi tessellation partitions with boundary line edges.",
    tags: ["voronoi", "cells", "geometry", "tessellation", "organic"],
    dependencies: ["react"],
    difficulty: "starter",
    dna: {
      genre: "technical",
      macrostructure: "full-bleed",
      density: "medium",
      shapeLanguage: "cut",
      motionLanguage: "none",
      typographyStyle: "monospace",
      colorStrategy: "high-contrast",
    },
    fingerprint: {
      interactionModel: "passive-voronoi-tessellation",
      visualModel: "polygon-cellular-partitions",
      motionModel: "none",
      layoutModel: "full-viewport-underlay",
      semanticPurpose: "cellular-voronoi-texture",
    },
    source: `"use client";

import { cn } from "@/lib/cn";

export interface VoronoiDiagramCellsProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export function VoronoiDiagramCells({ className, children, ...props }: VoronoiDiagramCellsProps) {
  return (
    <div className={cn("relative isolate w-full min-h-full bg-paper text-ink overflow-hidden", className)} {...props}>
      <svg className="absolute inset-0 w-full h-full opacity-15 pointer-events-none -z-10" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" viewBox="0 0 600 400">
        <polygon points="0,0 120,50 80,180 0,140" fill="none" stroke="currentColor" strokeWidth="1" />
        <polygon points="120,50 280,30 260,160 80,180" fill="none" stroke="currentColor" strokeWidth="1" />
        <polygon points="280,30 450,40 420,190 260,160" fill="none" stroke="currentColor" strokeWidth="1" />
        <polygon points="450,40 600,0 600,160 420,190" fill="none" stroke="currentColor" strokeWidth="1" />
        <polygon points="0,140 80,180 100,320 0,300" fill="none" stroke="currentColor" strokeWidth="1" />
        <polygon points="80,180 260,160 240,310 100,320" fill="none" stroke="currentColor" strokeWidth="1" />
        <polygon points="260,160 420,190 400,330 240,310" fill="none" stroke="currentColor" strokeWidth="1" />
        <polygon points="420,190 600,160 600,320 400,330" fill="none" stroke="currentColor" strokeWidth="1" />
        <polygon points="0,300 100,320 120,400 0,400" fill="none" stroke="currentColor" strokeWidth="1" />
        <polygon points="100,320 240,310 260,400 120,400" fill="none" stroke="currentColor" strokeWidth="1" />
        <polygon points="240,310 400,330 430,400 260,400" fill="none" stroke="currentColor" strokeWidth="1" />
        <polygon points="400,330 600,320 600,400 430,400" fill="none" stroke="currentColor" strokeWidth="1" />
      </svg>
      {children}
    </div>
  );
}
`,
    demo: `"use client";

import { VoronoiDiagramCells } from "./voronoi-diagram-cells";

export default function VoronoiDiagramCellsDemo() {
  return (
    <VoronoiDiagramCells className="min-h-[260px] flex items-center justify-center p-8">
      <div className="p-6 rounded-xl border border-line bg-paper/90 backdrop-blur-md shadow-md text-center max-w-sm">
        <h3 className="text-sm font-bold font-mono text-ink">Voronoi Partitioning</h3>
        <p className="text-xs text-ink/60 mt-1 font-sans">Geometric polygon Dirichlet cell partition.</p>
      </div>
    </VoronoiDiagramCells>
  );
}
`,
  }),

  P("interlocking-rings-pattern", {
    category: "backgrounds",
    subcategory: "patterns",
    title: "Interlocking Rings Pattern",
    description: "Classic geometric interlocking circle torus rings forming an intricate intersecting lattice.",
    tags: ["rings", "interlocking", "circles", "torus", "pattern"],
    dependencies: ["react"],
    difficulty: "starter",
    dna: {
      genre: "editorial",
      macrostructure: "full-bleed",
      density: "medium",
      shapeLanguage: "pill",
      motionLanguage: "none",
      typographyStyle: "serif-display",
      colorStrategy: "high-contrast",
    },
    fingerprint: {
      interactionModel: "passive-torus-geometry",
      visualModel: "interlaced-circle-rings",
      motionModel: "none",
      layoutModel: "full-viewport-underlay",
      semanticPurpose: "ornamental-circle-mesh",
    },
    source: `"use client";

import { cn } from "@/lib/cn";

export interface InterlockingRingsPatternProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export function InterlockingRingsPattern({ className, children, ...props }: InterlockingRingsPatternProps) {
  return (
    <div className={cn("relative isolate w-full min-h-full bg-paper text-ink overflow-hidden", className)} {...props}>
      <svg className="absolute inset-0 w-full h-full opacity-15 pointer-events-none -z-10" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="rings-pat" width="48" height="48" patternUnits="userSpaceOnUse">
            <circle cx="24" cy="24" r="20" fill="none" stroke="currentColor" strokeWidth="1" />
            <circle cx="0" cy="0" r="20" fill="none" stroke="currentColor" strokeWidth="1" />
            <circle cx="48" cy="0" r="20" fill="none" stroke="currentColor" strokeWidth="1" />
            <circle cx="0" cy="48" r="20" fill="none" stroke="currentColor" strokeWidth="1" />
            <circle cx="48" cy="48" r="20" fill="none" stroke="currentColor" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#rings-pat)" />
      </svg>
      {children}
    </div>
  );
}
`,
    demo: `"use client";

import { InterlockingRingsPattern } from "./interlocking-rings-pattern";

export default function InterlockingRingsPatternDemo() {
  return (
    <InterlockingRingsPattern className="min-h-[260px] flex items-center justify-center p-8">
      <div className="p-6 rounded-xl border border-line bg-paper/90 backdrop-blur-md shadow-md text-center max-w-sm">
        <h3 className="text-sm font-bold font-serif text-ink">Interlocking Rings</h3>
        <p className="text-xs text-ink/60 mt-1 font-sans">Classic geometric intersecting circle lattice.</p>
      </div>
    </InterlockingRingsPattern>
  );
}
`,
  }),

  P("wave-interference-grid", {
    category: "backgrounds",
    subcategory: "canvases",
    title: "Wave Interference Grid",
    description: "Physical dual-source wave interference pattern with constructive and destructive wave crests.",
    tags: ["physics", "interference", "waves", "canvas", "ripple"],
    dependencies: ["react"],
    difficulty: "intermediate",
    dna: {
      genre: "technical",
      macrostructure: "full-bleed",
      density: "dense",
      shapeLanguage: "soft",
      motionLanguage: "kinetic",
      typographyStyle: "monospace",
      colorStrategy: "high-contrast",
    },
    fingerprint: {
      interactionModel: "passive-canvas-physics",
      visualModel: "constructive-interference-ripples",
      motionModel: "dual-source-frequency-propagation",
      layoutModel: "full-viewport-underlay",
      semanticPurpose: "wave-optics-simulation",
    },
    source: `"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/cn";

export interface WaveInterferenceGridProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export function WaveInterferenceGrid({ className, children, ...props }: WaveInterferenceGridProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let t = 0;

    const render = () => {
      canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const src1 = { x: canvas.width * 0.35, y: canvas.height * 0.5 };
      const src2 = { x: canvas.width * 0.65, y: canvas.height * 0.5 };

      ctx.strokeStyle = "rgba(100, 116, 139, 0.2)";
      ctx.lineWidth = 1;

      for (let r = 20; r < Math.max(canvas.width, canvas.height); r += 24) {
        const rad = (r + t * 20) % Math.max(canvas.width, canvas.height);
        ctx.beginPath();
        ctx.arc(src1.x, src1.y, rad, 0, Math.PI * 2);
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(src2.x, src2.y, rad, 0, Math.PI * 2);
        ctx.stroke();
      }

      t += 0.02;
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

import { WaveInterferenceGrid } from "./wave-interference-grid";

export default function WaveInterferenceGridDemo() {
  return (
    <WaveInterferenceGrid className="min-h-[260px] flex items-center justify-center p-8">
      <div className="p-6 rounded-xl border border-line bg-paper/90 backdrop-blur-md shadow-md text-center max-w-sm">
        <h3 className="text-sm font-bold font-mono text-ink">Two-Slit Interference</h3>
        <p className="text-xs text-ink/60 mt-1 font-sans">Dual-source coherent wave propagation rings.</p>
      </div>
    </WaveInterferenceGrid>
  );
}
`,
  }),

  P("morse-code-telegraph", {
    category: "backgrounds",
    subcategory: "patterns",
    title: "Morse Code Telegraph",
    description: "Horizontal rhythm of dots and dashes encoding telegraphic transmission signals.",
    tags: ["morse", "telegraph", "dots", "dashes", "data"],
    dependencies: ["react"],
    difficulty: "starter",
    dna: {
      genre: "technical",
      macrostructure: "full-bleed",
      density: "airy",
      shapeLanguage: "pill",
      motionLanguage: "none",
      typographyStyle: "monospace",
      colorStrategy: "high-contrast",
    },
    fingerprint: {
      interactionModel: "passive-telegraph-texture",
      visualModel: "staggered-morse-lines",
      motionModel: "none",
      layoutModel: "full-viewport-underlay",
      semanticPurpose: "telegraph-transmission-pattern",
    },
    source: `"use client";

import { cn } from "@/lib/cn";

export interface MorseCodeTelegraphProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export function MorseCodeTelegraph({ className, children, ...props }: MorseCodeTelegraphProps) {
  return (
    <div className={cn("relative isolate w-full min-h-full bg-paper text-ink overflow-hidden", className)} {...props}>
      <svg className="absolute inset-0 w-full h-full opacity-15 pointer-events-none -z-10" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="morse-pat" width="80" height="24" patternUnits="userSpaceOnUse">
            <rect x="5" y="11" width="4" height="2" rx="1" fill="currentColor" />
            <rect x="15" y="11" width="14" height="2" rx="1" fill="currentColor" />
            <rect x="35" y="11" width="4" height="2" rx="1" fill="currentColor" />
            <rect x="45" y="11" width="4" height="2" rx="1" fill="currentColor" />
            <rect x="55" y="11" width="18" height="2" rx="1" fill="currentColor" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#morse-pat)" />
      </svg>
      {children}
    </div>
  );
}
`,
    demo: `"use client";

import { MorseCodeTelegraph } from "./morse-code-telegraph";

export default function MorseCodeTelegraphDemo() {
  return (
    <MorseCodeTelegraph className="min-h-[260px] flex items-center justify-center p-8">
      <div className="p-6 rounded-xl border border-line bg-paper/90 backdrop-blur-md shadow-md text-center max-w-sm">
        <h3 className="text-sm font-bold font-mono text-ink">Morse Telegraph</h3>
        <p className="text-xs text-ink/60 mt-1 font-sans">Horizontal dot-and-dash telegraph signal tracks.</p>
      </div>
    </MorseCodeTelegraph>
  );
}
`,
  }),

  P("circuit-matrix-nexus", {
    category: "backgrounds",
    subcategory: "ambient",
    title: "Circuit Matrix Nexus",
    description: "Glowing cyan/emerald circuit junction nodes pulsing at critical power grid intersections.",
    tags: ["nexus", "matrix", "circuit", "junction", "glow"],
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
      interactionModel: "passive-nexus-glow",
      visualModel: "junction-node-matrix",
      motionModel: "subtle-nodal-pulse",
      layoutModel: "full-viewport-underlay",
      semanticPurpose: "cybernetic-nexus-backdrop",
    },
    source: `"use client";

import { cn } from "@/lib/cn";

export interface CircuitMatrixNexusProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export function CircuitMatrixNexus({ className, children, ...props }: CircuitMatrixNexusProps) {
  return (
    <div className={cn("relative isolate w-full min-h-full bg-slate-950 text-cyan-400 overflow-hidden", className)} {...props}>
      <svg className="absolute inset-0 w-full h-full opacity-20 pointer-events-none -z-10" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="nexus-pat" width="60" height="60" patternUnits="userSpaceOnUse">
            <line x1="0" y1="30" x2="60" y2="30" stroke="currentColor" strokeWidth="1" />
            <line x1="30" y1="0" x2="30" y2="60" stroke="currentColor" strokeWidth="1" />
            <circle cx="30" cy="30" r="3" fill="currentColor" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#nexus-pat)" />
      </svg>
      {children}
    </div>
  );
}
`,
    demo: `"use client";

import { CircuitMatrixNexus } from "./circuit-matrix-nexus";

export default function CircuitMatrixNexusDemo() {
  return (
    <CircuitMatrixNexus className="min-h-[260px] flex items-center justify-center p-8">
      <div className="p-6 rounded-xl border border-cyan-500/30 bg-black/70 backdrop-blur-md shadow-xl text-center max-w-sm">
        <h3 className="text-sm font-bold font-mono text-cyan-400">Power Nexus Grid</h3>
        <p className="text-xs text-white/70 mt-1 font-mono">Orthogonal bus junctions with node terminals.</p>
      </div>
    </CircuitMatrixNexus>
  );
}
`,
  }),

  P("origami-crease-lines", {
    category: "backgrounds",
    subcategory: "patterns",
    title: "Origami Crease Lines",
    description: "Geometric folding crease lines inspired by Japanese Miura-ori paper engineering patterns.",
    tags: ["origami", "crease", "folding", "japanese", "paper"],
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
      interactionModel: "passive-crease-texture",
      visualModel: "angled-folding-creases",
      motionModel: "none",
      layoutModel: "full-viewport-underlay",
      semanticPurpose: "paper-folding-geometry",
    },
    source: `"use client";

import { cn } from "@/lib/cn";

export interface OrigamiCreaseLinesProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export function OrigamiCreaseLines({ className, children, ...props }: OrigamiCreaseLinesProps) {
  return (
    <div className={cn("relative isolate w-full min-h-full bg-paper text-ink overflow-hidden", className)} {...props}>
      <svg className="absolute inset-0 w-full h-full opacity-15 pointer-events-none -z-10" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="origami-pat" width="50" height="40" patternUnits="userSpaceOnUse">
            <path d="M0 0 L25 20 L50 0 M25 20 L25 40 M0 40 L25 20 L50 40" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="3 2" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#origami-pat)" />
      </svg>
      {children}
    </div>
  );
}
`,
    demo: `"use client";

import { OrigamiCreaseLines } from "./origami-crease-lines";

export default function OrigamiCreaseLinesDemo() {
  return (
    <OrigamiCreaseLines className="min-h-[260px] flex items-center justify-center p-8">
      <div className="p-6 rounded-xl border border-line bg-paper/90 backdrop-blur-md shadow-md text-center max-w-sm">
        <h3 className="text-sm font-bold font-sans text-ink">Miura-Ori Creases</h3>
        <p className="text-xs text-ink/60 mt-1 font-sans">Origami fold lines and valley tessellations.</p>
      </div>
    </OrigamiCreaseLines>
  );
}
`,
  }),

  P("carbon-fiber-weave", {
    category: "backgrounds",
    subcategory: "patterns",
    title: "Carbon Fiber Weave",
    description: "Automotive high-performance 2x2 twill composite carbon fiber checkered weave.",
    tags: ["carbon", "fiber", "automotive", "weave", "composite"],
    dependencies: ["react"],
    difficulty: "starter",
    dna: {
      genre: "industrial",
      macrostructure: "full-bleed",
      density: "dense",
      shapeLanguage: "sharp",
      motionLanguage: "none",
      typographyStyle: "condensed",
      colorStrategy: "monochrome",
    },
    fingerprint: {
      interactionModel: "passive-carbon-twill",
      visualModel: "twill-woven-carbon",
      motionModel: "none",
      layoutModel: "full-viewport-underlay",
      semanticPurpose: "composite-material-texture",
    },
    source: `"use client";

import { cn } from "@/lib/cn";

export interface CarbonFiberWeaveProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export function CarbonFiberWeave({ className, children, ...props }: CarbonFiberWeaveProps) {
  return (
    <div className={cn("relative isolate w-full min-h-full bg-slate-950 text-white overflow-hidden", className)} {...props}>
      <div
        className="absolute inset-0 pointer-events-none opacity-40 -z-10"
        style={{
          background: \`
            radial-gradient(black 15%, transparent 16%) 0 0,
            radial-gradient(black 15%, transparent 16%) 8px 8px,
            radial-gradient(rgba(255,255,255,.1) 15%, transparent 20%) 0 1px,
            radial-gradient(rgba(255,255,255,.1) 15%, transparent 20%) 8px 9px
          \`,
          backgroundColor: "#1e2024",
          backgroundSize: "16px 16px",
        }}
      />
      {children}
    </div>
  );
}
`,
    demo: `"use client";

import { CarbonFiberWeave } from "./carbon-fiber-weave";

export default function CarbonFiberWeaveDemo() {
  return (
    <CarbonFiberWeave className="min-h-[260px] flex items-center justify-center p-8">
      <div className="p-6 rounded-xl border border-white/20 bg-black/70 backdrop-blur-md shadow-xl text-center max-w-sm">
        <h3 className="text-sm font-bold font-mono text-white">Carbon Twill Weave</h3>
        <p className="text-xs text-white/70 mt-1 font-mono">Structural motorsport carbon fiber twill.</p>
      </div>
    </CarbonFiberWeave>
  );
}
`,
  }),

  P("falling-matrix-symbols", {
    category: "backgrounds",
    subcategory: "canvases",
    title: "Falling Matrix Symbols",
    description: "Arithmetic operators, brackets, and engineering calculus glyphs floating gently in suspension.",
    tags: ["math", "symbols", "calculus", "canvas", "symbols"],
    dependencies: ["react"],
    difficulty: "starter",
    dna: {
      genre: "technical",
      macrostructure: "full-bleed",
      density: "airy",
      shapeLanguage: "sharp",
      motionLanguage: "subtle",
      typographyStyle: "monospace",
      colorStrategy: "high-contrast",
    },
    fingerprint: {
      interactionModel: "passive-canvas-glyphs",
      visualModel: "drifting-math-glyphs",
      motionModel: "vertical-buoyancy-drift",
      layoutModel: "full-viewport-underlay",
      semanticPurpose: "mathematical-symbol-layer",
    },
    source: `"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/cn";

export interface FallingMatrixSymbolsProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export function FallingMatrixSymbols({ className, children, ...props }: FallingMatrixSymbolsProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let w = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let h = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    const glyphs = ["∑", "∫", "∂", "√", "π", "∆", "∞", "≈", "≠", "≤", "≥", "λ", "Ω"];
    const items = Array.from({ length: 30 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      char: glyphs[Math.floor(Math.random() * glyphs.length)] ?? "π",
      vy: Math.random() * 0.4 + 0.2,
      opacity: Math.random() * 0.25 + 0.05,
    }));

    const render = () => {
      ctx.clearRect(0, 0, w, h);
      ctx.font = "14px monospace";

      for (const item of items) {
        item.y += item.vy;
        if (item.y > h) {
          item.y = -10;
          item.x = Math.random() * w;
        }
        ctx.fillStyle = \`rgba(150, 150, 150, \${item.opacity})\`;
        ctx.fillText(item.char, item.x, item.y);
      }
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

import { FallingMatrixSymbols } from "./falling-matrix-symbols";

export default function FallingMatrixSymbolsDemo() {
  return (
    <FallingMatrixSymbols className="min-h-[260px] flex items-center justify-center p-8">
      <div className="p-6 rounded-xl border border-line bg-paper/90 backdrop-blur-md shadow-md text-center max-w-sm">
        <h3 className="text-sm font-bold font-mono text-ink">Calculus Glyphs</h3>
        <p className="text-xs text-ink/60 mt-1 font-sans">Buoyant floating mathematical operators.</p>
      </div>
    </FallingMatrixSymbols>
  );
}
`,
  }),

  P("subtle-grid-paper", {
    category: "backgrounds",
    subcategory: "patterns",
    title: "Subtle Grid Paper",
    description: "Classic drafting quadrant grid paper with fine square divisions and major index lines.",
    tags: ["drafting", "paper", "grid", "engineering", "notebook"],
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
      interactionModel: "passive-graph-paper",
      visualModel: "quad-ruled-drafting-paper",
      motionModel: "none",
      layoutModel: "full-viewport-underlay",
      semanticPurpose: "engineering-drafting-grid",
    },
    source: `"use client";

import { cn } from "@/lib/cn";

export interface SubtleGridPaperProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export function SubtleGridPaper({ className, children, ...props }: SubtleGridPaperProps) {
  return (
    <div className={cn("relative isolate w-full min-h-full bg-paper text-ink overflow-hidden", className)} {...props}>
      <div
        className="absolute inset-0 pointer-events-none opacity-20 -z-10"
        style={{
          backgroundImage: \`
            linear-gradient(to right, currentColor 1px, transparent 1px),
            linear-gradient(to bottom, currentColor 1px, transparent 1px)
          \`,
          backgroundSize: "20px 20px",
        }}
      />
      {children}
    </div>
  );
}
`,
    demo: `"use client";

import { SubtleGridPaper } from "./subtle-grid-paper";

export default function SubtleGridPaperDemo() {
  return (
    <SubtleGridPaper className="min-h-[260px] flex items-center justify-center p-8">
      <div className="p-6 rounded-xl border border-line bg-paper/90 backdrop-blur-md shadow-md text-center max-w-sm">
        <h3 className="text-sm font-bold font-mono text-ink">Drafting Grid Paper</h3>
        <p className="text-xs text-ink/60 mt-1 font-sans">Quad-ruled engineering millimetric paper.</p>
      </div>
    </SubtleGridPaper>
  );
}
`,
  }),

  P("circular-mandala-rays", {
    category: "backgrounds",
    subcategory: "ambient",
    title: "Circular Mandala Rays",
    description: "Hypnotic sacred geometry kaleidoscope mandala rings with 12-fold rotational symmetry.",
    tags: ["mandala", "kaleidoscope", "symmetry", "geometry", "circular"],
    dependencies: ["react"],
    difficulty: "starter",
    dna: {
      genre: "organic",
      macrostructure: "full-bleed",
      density: "dense",
      shapeLanguage: "soft",
      motionLanguage: "subtle",
      typographyStyle: "serif-display",
      colorStrategy: "muted-earth",
    },
    fingerprint: {
      interactionModel: "passive-mandala-symmetry",
      visualModel: "twelve-fold-sacred-geometry",
      motionModel: "none",
      layoutModel: "center-anchored-radial",
      semanticPurpose: "kaleidoscope-mandala-canvas",
    },
    source: `"use client";

import { cn } from "@/lib/cn";

export interface CircularMandalaRaysProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export function CircularMandalaRays({ className, children, ...props }: CircularMandalaRaysProps) {
  return (
    <div className={cn("relative isolate w-full min-h-full bg-paper text-ink overflow-hidden", className)} {...props}>
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-15 -z-10">
        <svg className="w-[600px] h-[600px]" viewBox="0 0 200 200">
          {Array.from({ length: 12 }).map((_, i) => (
            <ellipse
              key={i}
              cx="100"
              cy="100"
              rx="80"
              ry="25"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.75"
              transform={\`rotate(\${i * 15} 100 100)\`}
            />
          ))}
          <circle cx="100" cy="100" r="80" fill="none" stroke="currentColor" strokeWidth="0.75" />
          <circle cx="100" cy="100" r="40" fill="none" stroke="currentColor" strokeWidth="0.75" />
        </svg>
      </div>
      {children}
    </div>
  );
}
`,
    demo: `"use client";

import { CircularMandalaRays } from "./circular-mandala-rays";

export default function CircularMandalaRaysDemo() {
  return (
    <CircularMandalaRays className="min-h-[260px] flex items-center justify-center p-8">
      <div className="p-6 rounded-xl border border-line bg-paper/90 backdrop-blur-md shadow-md text-center max-w-sm">
        <h3 className="text-sm font-bold font-serif text-ink">Sacred Mandala</h3>
        <p className="text-xs text-ink/60 mt-1 font-sans">12-fold geometric rotational rosette rings.</p>
      </div>
    </CircularMandalaRays>
  );
}
`,
  }),

  P("gradient-prism-rainbow", {
    category: "backgrounds",
    subcategory: "ambient",
    title: "Gradient Prism Rainbow",
    description: "Refractive optical prism dispersion band stretching diagonally with spectral color hues.",
    tags: ["prism", "rainbow", "optics", "spectral", "gradient"],
    dependencies: ["react"],
    difficulty: "starter",
    dna: {
      genre: "minimal",
      macrostructure: "full-bleed",
      density: "airy",
      shapeLanguage: "soft",
      motionLanguage: "none",
      typographyStyle: "grotesk",
      colorStrategy: "neon-on-dark",
    },
    fingerprint: {
      interactionModel: "passive-prism-refraction",
      visualModel: "spectral-dispersion-ribbon",
      motionModel: "none",
      layoutModel: "diagonal-band-underlay",
      semanticPurpose: "optical-refraction-backdrop",
    },
    source: `"use client";

import { cn } from "@/lib/cn";

export interface GradientPrismRainbowProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export function GradientPrismRainbow({ className, children, ...props }: GradientPrismRainbowProps) {
  return (
    <div className={cn("relative isolate w-full min-h-full bg-slate-950 text-white overflow-hidden", className)} {...props}>
      <div
        className="absolute -top-40 -left-40 w-[800px] h-[300px] pointer-events-none -z-10 rotate-45 blur-3xl opacity-30"
        style={{
          background: "linear-gradient(to right, #ef4444, #f97316, #eab308, #22c55e, #06b6d4, #8b5cf6)",
        }}
      />
      {children}
    </div>
  );
}
`,
    demo: `"use client";

import { GradientPrismRainbow } from "./gradient-prism-rainbow";

export default function GradientPrismRainbowDemo() {
  return (
    <GradientPrismRainbow className="min-h-[260px] flex items-center justify-center p-8">
      <div className="p-6 rounded-xl border border-white/20 bg-black/60 backdrop-blur-md shadow-xl text-center max-w-sm">
        <h3 className="text-sm font-bold font-sans text-white">Optical Prism</h3>
        <p className="text-xs text-white/70 mt-1 font-sans">Spectral wavelength optical dispersion beam.</p>
      </div>
    </GradientPrismRainbow>
  );
}
`,
  }),

  P("fractal-tree-branches", {
    category: "backgrounds",
    subcategory: "canvases",
    title: "Fractal Tree Branches",
    description: "Generative recursive fractal branching system growing delicate natural organic vascular networks.",
    tags: ["fractal", "tree", "branches", "canvas", "generative"],
    dependencies: ["react"],
    difficulty: "intermediate",
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
      interactionModel: "passive-canvas-fractal",
      visualModel: "recursive-branching-tree",
      motionModel: "none",
      layoutModel: "full-viewport-underlay",
      semanticPurpose: "fractal-vascular-network",
    },
    source: `"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/cn";

export interface FractalTreeBranchesProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export function FractalTreeBranches({ className, children, ...props }: FractalTreeBranchesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
    canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = "rgba(100, 116, 139, 0.25)";
    ctx.lineWidth = 1;

    const drawBranch = (x: number, y: number, len: number, angle: number, depth: number) => {
      if (depth === 0) return;
      const x2 = x + len * Math.sin(angle);
      const y2 = y - len * Math.cos(angle);

      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x2, y2);
      ctx.stroke();

      drawBranch(x2, y2, len * 0.75, angle - 0.35, depth - 1);
      drawBranch(x2, y2, len * 0.75, angle + 0.35, depth - 1);
    };

    drawBranch(canvas.width / 2, canvas.height, 80, 0, 8);
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

import { FractalTreeBranches } from "./fractal-tree-branches";

export default function FractalTreeBranchesDemo() {
  return (
    <FractalTreeBranches className="min-h-[260px] flex items-center justify-center p-8">
      <div className="p-6 rounded-xl border border-line bg-paper/90 backdrop-blur-md shadow-md text-center max-w-sm">
        <h3 className="text-sm font-bold font-sans text-ink">Recursive Arbor</h3>
        <p className="text-xs text-ink/60 mt-1 font-sans">Procedural fractal tree branching arbor.</p>
      </div>
    </FractalTreeBranches>
  );
}
`,
  }),

  P("celestial-zodiac-map", {
    category: "backgrounds",
    subcategory: "patterns",
    title: "Celestial Zodiac Map",
    description: "Antique star constellation chart with coordinate meridian lines and celestial astrological markers.",
    tags: ["celestial", "stars", "zodiac", "map", "astronomy"],
    dependencies: ["react"],
    difficulty: "starter",
    dna: {
      genre: "editorial",
      macrostructure: "full-bleed",
      density: "airy",
      shapeLanguage: "pill",
      motionLanguage: "none",
      typographyStyle: "serif-display",
      colorStrategy: "high-contrast",
    },
    fingerprint: {
      interactionModel: "passive-astronomy-chart",
      visualModel: "celestial-meridian-lattice",
      motionModel: "none",
      layoutModel: "full-viewport-underlay",
      semanticPurpose: "celestial-cartography-backdrop",
    },
    source: `"use client";

import { cn } from "@/lib/cn";

export interface CelestialZodiacMapProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export function CelestialZodiacMap({ className, children, ...props }: CelestialZodiacMapProps) {
  return (
    <div className={cn("relative isolate w-full min-h-full bg-paper text-ink overflow-hidden", className)} {...props}>
      <svg className="absolute inset-0 w-full h-full opacity-15 pointer-events-none -z-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400">
        <circle cx="300" cy="200" r="180" fill="none" stroke="currentColor" strokeWidth="1" />
        <circle cx="300" cy="200" r="120" fill="none" stroke="currentColor" strokeWidth="0.75" strokeDasharray="3 3" />
        <line x1="120" y1="200" x2="480" y2="200" stroke="currentColor" strokeWidth="0.75" />
        <line x1="300" y1="20" x2="300" y2="380" stroke="currentColor" strokeWidth="0.75" />
        <circle cx="240" cy="160" r="2" fill="currentColor" />
        <circle cx="360" cy="140" r="3" fill="currentColor" />
        <circle cx="280" cy="260" r="2" fill="currentColor" />
        <circle cx="330" cy="220" r="2.5" fill="currentColor" />
        <line x1="240" y1="160" x2="360" y2="140" stroke="currentColor" strokeWidth="0.5" />
        <line x1="360" y1="140" x2="330" y2="220" stroke="currentColor" strokeWidth="0.5" />
      </svg>
      {children}
    </div>
  );
}
`,
    demo: `"use client";

import { CelestialZodiacMap } from "./celestial-zodiac-map";

export default function CelestialZodiacMapDemo() {
  return (
    <CelestialZodiacMap className="min-h-[260px] flex items-center justify-center p-8">
      <div className="p-6 rounded-xl border border-line bg-paper/90 backdrop-blur-md shadow-md text-center max-w-sm">
        <h3 className="text-sm font-bold font-serif text-ink">Celestial Meridian</h3>
        <p className="text-xs text-ink/60 mt-1 font-sans">Astrological constellation chart meridians.</p>
      </div>
    </CelestialZodiacMap>
  );
}
`,
  }),

  P("noise-grain-overlay", {
    category: "backgrounds",
    subcategory: "ambient",
    title: "Noise Grain Overlay",
    description: "Tactile analog film grain noise texture using SVG turbulence filter.",
    tags: ["noise", "grain", "film", "analog", "texture"],
    dependencies: ["react"],
    difficulty: "starter",
    dna: {
      genre: "editorial",
      macrostructure: "full-bleed",
      density: "dense",
      shapeLanguage: "sharp",
      motionLanguage: "none",
      typographyStyle: "grotesk",
      colorStrategy: "high-contrast",
    },
    fingerprint: {
      interactionModel: "passive-film-grain",
      visualModel: "analog-fe-turbulence-grain",
      motionModel: "none",
      layoutModel: "full-viewport-underlay",
      semanticPurpose: "film-grain-surface-texture",
    },
    source: `"use client";

import { cn } from "@/lib/cn";

export interface NoiseGrainOverlayProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export function NoiseGrainOverlay({ className, children, ...props }: NoiseGrainOverlayProps) {
  return (
    <div className={cn("relative isolate w-full min-h-full bg-paper text-ink overflow-hidden", className)} {...props}>
      <svg className="absolute inset-0 w-full h-full opacity-35 pointer-events-none -z-10">
        <filter id="noiseFilter">
          <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="3" stitchTiles="stitch" />
        </filter>
        <rect width="100%" height="100%" filter="url(#noiseFilter)" />
      </svg>
      {children}
    </div>
  );
}
`,
    demo: `"use client";

import { NoiseGrainOverlay } from "./noise-grain-overlay";

export default function NoiseGrainOverlayDemo() {
  return (
    <NoiseGrainOverlay className="min-h-[260px] flex items-center justify-center p-8">
      <div className="p-6 rounded-xl border border-line bg-paper/90 backdrop-blur-md shadow-md text-center max-w-sm">
        <h3 className="text-sm font-bold font-sans text-ink">Film Grain Noise</h3>
        <p className="text-xs text-ink/60 mt-1 font-sans">Tactile SVG fractal turbulence film emulsion.</p>
      </div>
    </NoiseGrainOverlay>
  );
}
`,
  }),

  P("soundwave-equalizer-bars", {
    category: "backgrounds",
    subcategory: "ambient",
    title: "Soundwave Equalizer Bars",
    description: "Vertical acoustic equalizer spectral frequency bars running along the bottom edge.",
    tags: ["soundwave", "audio", "equalizer", "frequency", "bars"],
    dependencies: ["react"],
    difficulty: "starter",
    dna: {
      genre: "technical",
      macrostructure: "full-bleed",
      density: "medium",
      shapeLanguage: "pill",
      motionLanguage: "subtle",
      typographyStyle: "monospace",
      colorStrategy: "high-contrast",
    },
    fingerprint: {
      interactionModel: "passive-audio-equalizer",
      visualModel: "vertical-spectrum-columns",
      motionModel: "none",
      layoutModel: "bottom-pinned-equalizer",
      semanticPurpose: "audio-spectrum-backdrop",
    },
    source: `"use client";

import { cn } from "@/lib/cn";

export interface SoundwaveEqualizerBarsProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export function SoundwaveEqualizerBars({ className, children, ...props }: SoundwaveEqualizerBarsProps) {
  const bars = [25, 45, 60, 85, 95, 70, 50, 40, 65, 80, 55, 30, 45, 75, 90, 60, 40, 25, 35, 55];

  return (
    <div className={cn("relative isolate w-full min-h-full bg-paper text-ink overflow-hidden", className)} {...props}>
      <div className="absolute inset-x-0 bottom-0 h-32 flex items-end justify-center gap-1.5 px-6 pointer-events-none opacity-15 -z-10">
        {bars.map((h, i) => (
          <div
            key={i}
            className="flex-1 bg-currentColor rounded-t-sm"
            style={{ height: \`\${h}%\` }}
          />
        ))}
      </div>
      {children}
    </div>
  );
}
`,
    demo: `"use client";

import { SoundwaveEqualizerBars } from "./soundwave-equalizer-bars";

export default function SoundwaveEqualizerBarsDemo() {
  return (
    <SoundwaveEqualizerBars className="min-h-[260px] flex items-center justify-center p-8">
      <div className="p-6 rounded-xl border border-line bg-paper/90 backdrop-blur-md shadow-md text-center max-w-sm">
        <h3 className="text-sm font-bold font-mono text-ink">Equalizer Spectrum</h3>
        <p className="text-xs text-ink/60 mt-1 font-sans">Acoustic frequency spectrum band underlay.</p>
      </div>
    </SoundwaveEqualizerBars>
  );
}
`,
  }),

  P("geometric-cube-lattice", {
    category: "backgrounds",
    subcategory: "patterns",
    title: "Geometric Cube Lattice",
    description: "Escher-inspired 3D tumbling isometric cubes optical illusion pattern.",
    tags: ["cubes", "escher", "illusion", "isometric", "geometric"],
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
      interactionModel: "passive-cube-illusion",
      visualModel: "isometric-cube-tessellation",
      motionModel: "none",
      layoutModel: "full-viewport-underlay",
      semanticPurpose: "isometric-cube-texture",
    },
    source: `"use client";

import { cn } from "@/lib/cn";

export interface GeometricCubeLatticeProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export function GeometricCubeLattice({ className, children, ...props }: GeometricCubeLatticeProps) {
  return (
    <div className={cn("relative isolate w-full min-h-full bg-paper text-ink overflow-hidden", className)} {...props}>
      <svg className="absolute inset-0 w-full h-full opacity-15 pointer-events-none -z-10" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="cubes-pat" width="60" height="104" patternUnits="userSpaceOnUse">
            <polygon points="30,0 60,17 60,52 30,35" fill="none" stroke="currentColor" strokeWidth="1" />
            <polygon points="30,0 0,17 0,52 30,35" fill="none" stroke="currentColor" strokeWidth="1" />
            <polygon points="30,35 60,52 30,69 0,52" fill="none" stroke="currentColor" strokeWidth="1" />
            <polygon points="30,69 60,86 60,121 30,104" fill="none" stroke="currentColor" strokeWidth="1" />
            <polygon points="30,69 0,86 0,121 30,104" fill="none" stroke="currentColor" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#cubes-pat)" />
      </svg>
      {children}
    </div>
  );
}
`,
    demo: `"use client";

import { GeometricCubeLattice } from "./geometric-cube-lattice";

export default function GeometricCubeLatticeDemo() {
  return (
    <GeometricCubeLattice className="min-h-[260px] flex items-center justify-center p-8">
      <div className="p-6 rounded-xl border border-line bg-paper/90 backdrop-blur-md shadow-md text-center max-w-sm">
        <h3 className="text-sm font-bold font-mono text-ink">Isometric Cubes</h3>
        <p className="text-xs text-ink/60 mt-1 font-sans">Tumbling isometric cube geometric illusion.</p>
      </div>
    </GeometricCubeLattice>
  );
}
`,
  }),

  P("dune-sand-ripples", {
    category: "backgrounds",
    subcategory: "patterns",
    title: "Dune Sand Ripples",
    description: "Sinusoidal natural wind-blown sand ripples reminiscent of Saharan desert dunes.",
    tags: ["dune", "sand", "ripples", "desert", "organic"],
    dependencies: ["react"],
    difficulty: "starter",
    dna: {
      genre: "organic",
      macrostructure: "full-bleed",
      density: "medium",
      shapeLanguage: "soft",
      motionLanguage: "none",
      typographyStyle: "humanist",
      colorStrategy: "muted-earth",
    },
    fingerprint: {
      interactionModel: "passive-dune-ripples",
      visualModel: "sinusoidal-sand-crests",
      motionModel: "none",
      layoutModel: "full-viewport-underlay",
      semanticPurpose: "desert-sand-texture",
    },
    source: `"use client";

import { cn } from "@/lib/cn";

export interface DuneSandRipplesProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export function DuneSandRipples({ className, children, ...props }: DuneSandRipplesProps) {
  return (
    <div className={cn("relative isolate w-full min-h-full bg-paper text-ink overflow-hidden", className)} {...props}>
      <svg className="absolute inset-0 w-full h-full opacity-15 pointer-events-none -z-10" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="dune-pat" width="100" height="24" patternUnits="userSpaceOnUse">
            <path d="M0 12 Q25 4 50 12 T100 12" fill="none" stroke="currentColor" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#dune-pat)" />
      </svg>
      {children}
    </div>
  );
}
`,
    demo: `"use client";

import { DuneSandRipples } from "./dune-sand-ripples";

export default function DuneSandRipplesDemo() {
  return (
    <DuneSandRipples className="min-h-[260px] flex items-center justify-center p-8">
      <div className="p-6 rounded-xl border border-line bg-paper/90 backdrop-blur-md shadow-md text-center max-w-sm">
        <h3 className="text-sm font-bold font-sans text-ink">Desert Dune Ripples</h3>
        <p className="text-xs text-ink/60 mt-1 font-sans">Wind-blown sinusoidal sand ridge striations.</p>
      </div>
    </DuneSandRipples>
  );
}
`,
  }),

  P("neon-laser-grid", {
    category: "backgrounds",
    subcategory: "ambient",
    title: "Neon Laser Grid",
    description: "Retro 80s arcade neon magenta and cyan luminous laser lines with glowing intersections.",
    tags: ["laser", "neon", "arcade", "80s", "grid"],
    dependencies: ["react"],
    difficulty: "starter",
    dna: {
      genre: "retro",
      macrostructure: "full-bleed",
      density: "medium",
      shapeLanguage: "sharp",
      motionLanguage: "none",
      typographyStyle: "monospace",
      colorStrategy: "neon-on-dark",
    },
    fingerprint: {
      interactionModel: "passive-neon-laser",
      visualModel: "luminescent-laser-lattice",
      motionModel: "none",
      layoutModel: "full-viewport-underlay",
      semanticPurpose: "arcade-neon-grid",
    },
    source: `"use client";

import { cn } from "@/lib/cn";

export interface NeonLaserGridProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export function NeonLaserGrid({ className, children, ...props }: NeonLaserGridProps) {
  return (
    <div className={cn("relative isolate w-full min-h-full bg-slate-950 text-white overflow-hidden", className)} {...props}>
      <div
        className="absolute inset-0 pointer-events-none opacity-30 -z-10"
        style={{
          backgroundImage: \`
            linear-gradient(to right, rgba(236, 72, 153, 0.7) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(6, 182, 212, 0.7) 1px, transparent 1px)
          \`,
          backgroundSize: "40px 40px",
        }}
      />
      {children}
    </div>
  );
}
`,
    demo: `"use client";

import { NeonLaserGrid } from "./neon-laser-grid";

export default function NeonLaserGridDemo() {
  return (
    <NeonLaserGrid className="min-h-[260px] flex items-center justify-center p-8">
      <div className="p-6 rounded-xl border border-pink-500/40 bg-black/70 backdrop-blur-md shadow-xl text-center max-w-sm">
        <h3 className="text-sm font-bold font-mono text-pink-400">Arcade Laser Grid</h3>
        <p className="text-xs text-white/70 mt-1 font-mono">Dual-color cyan and magenta laser crosshatch.</p>
      </div>
    </NeonLaserGrid>
  );
}
`,
  }),

  P("geometric-arabesque-stars", {
    category: "backgrounds",
    subcategory: "patterns",
    title: "Geometric Arabesque Stars",
    description: "Islamic geometric 8-pointed star tessellation with interlocking polygonal strapwork.",
    tags: ["arabesque", "islamic", "stars", "tessellation", "geometry"],
    dependencies: ["react"],
    difficulty: "starter",
    dna: {
      genre: "editorial",
      macrostructure: "full-bleed",
      density: "dense",
      shapeLanguage: "sharp",
      motionLanguage: "none",
      typographyStyle: "serif-display",
      colorStrategy: "high-contrast",
    },
    fingerprint: {
      interactionModel: "passive-arabesque-tessellation",
      visualModel: "eight-point-star-strapwork",
      motionModel: "none",
      layoutModel: "full-viewport-underlay",
      semanticPurpose: "ornamental-arabesque-texture",
    },
    source: `"use client";

import { cn } from "@/lib/cn";

export interface GeometricArabesqueStarsProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export function GeometricArabesqueStars({ className, children, ...props }: GeometricArabesqueStarsProps) {
  return (
    <div className={cn("relative isolate w-full min-h-full bg-paper text-ink overflow-hidden", className)} {...props}>
      <svg className="absolute inset-0 w-full h-full opacity-15 pointer-events-none -z-10" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="arabesque-pat" width="60" height="60" patternUnits="userSpaceOnUse">
            <rect x="15" y="15" width="30" height="30" fill="none" stroke="currentColor" strokeWidth="1" />
            <rect x="15" y="15" width="30" height="30" fill="none" stroke="currentColor" strokeWidth="1" transform="rotate(45 30 30)" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#arabesque-pat)" />
      </svg>
      {children}
    </div>
  );
}
`,
    demo: `"use client";

import { GeometricArabesqueStars } from "./geometric-arabesque-stars";

export default function GeometricArabesqueStarsDemo() {
  return (
    <GeometricArabesqueStars className="min-h-[260px] flex items-center justify-center p-8">
      <div className="p-6 rounded-xl border border-line bg-paper/90 backdrop-blur-md shadow-md text-center max-w-sm">
        <h3 className="text-sm font-bold font-serif text-ink">Arabesque Stars</h3>
        <p className="text-xs text-ink/60 mt-1 font-sans">8-pointed rotational star strapwork tessellation.</p>
      </div>
    </GeometricArabesqueStars>
  );
}
`,
  }),

  P("liquid-marbling-swirl", {
    category: "backgrounds",
    subcategory: "ambient",
    title: "Liquid Marbling Swirl",
    description: "Viscous paper marbling Ebru ink fluid swirls with smooth harmonic color currents.",
    tags: ["marbling", "ebru", "liquid", "swirl", "fluid"],
    dependencies: ["react"],
    difficulty: "starter",
    dna: {
      genre: "luxury",
      macrostructure: "full-bleed",
      density: "airy",
      shapeLanguage: "soft",
      motionLanguage: "none",
      typographyStyle: "serif-display",
      colorStrategy: "pastel",
    },
    fingerprint: {
      interactionModel: "passive-marbling-currents",
      visualModel: "viscous-marbled-flow",
      motionModel: "none",
      layoutModel: "full-viewport-underlay",
      semanticPurpose: "paper-marbling-texture",
    },
    source: `"use client";

import { cn } from "@/lib/cn";

export interface LiquidMarblingSwirlProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export function LiquidMarblingSwirl({ className, children, ...props }: LiquidMarblingSwirlProps) {
  return (
    <div className={cn("relative isolate w-full min-h-full bg-paper text-ink overflow-hidden", className)} {...props}>
      <div
        className="absolute inset-0 pointer-events-none opacity-20 -z-10"
        style={{
          background: \`
            radial-gradient(circle at 20% 40%, rgba(244, 114, 182, 0.4) 0%, transparent 50%),
            radial-gradient(circle at 80% 60%, rgba(96, 165, 250, 0.4) 0%, transparent 50%),
            radial-gradient(circle at 50% 80%, rgba(52, 211, 153, 0.3) 0%, transparent 50%)
          \`,
          filter: "blur(30px)",
        }}
      />
      {children}
    </div>
  );
}
`,
    demo: `"use client";

import { LiquidMarblingSwirl } from "./liquid-marbling-swirl";

export default function LiquidMarblingSwirlDemo() {
  return (
    <LiquidMarblingSwirl className="min-h-[260px] flex items-center justify-center p-8">
      <div className="p-6 rounded-xl border border-line bg-paper/90 backdrop-blur-md shadow-md text-center max-w-sm">
        <h3 className="text-sm font-bold font-serif text-ink">Ebru Marbled Silk</h3>
        <p className="text-xs text-ink/60 mt-1 font-sans">Handmade paper marbling dye currents.</p>
      </div>
    </LiquidMarblingSwirl>
  );
}
`,
  }),

  P("pixel-checkerboard-fade", {
    category: "backgrounds",
    subcategory: "patterns",
    title: "Pixel Checkerboard Fade",
    description: "Retro 8-bit dithered checkerboard pattern with optical fade mask across the viewport.",
    tags: ["checkerboard", "pixel", "dither", "8bit", "retro"],
    dependencies: ["react"],
    difficulty: "starter",
    dna: {
      genre: "retro",
      macrostructure: "full-bleed",
      density: "dense",
      shapeLanguage: "sharp",
      motionLanguage: "none",
      typographyStyle: "monospace",
      colorStrategy: "monochrome",
    },
    fingerprint: {
      interactionModel: "passive-dithered-checkerboard",
      visualModel: "pixelated-checkerboard-fade",
      motionModel: "none",
      layoutModel: "full-viewport-underlay",
      semanticPurpose: "retro-dithering-mask",
    },
    source: `"use client";

import { cn } from "@/lib/cn";

export interface PixelCheckerboardFadeProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export function PixelCheckerboardFade({ className, children, ...props }: PixelCheckerboardFadeProps) {
  return (
    <div className={cn("relative isolate w-full min-h-full bg-paper text-ink overflow-hidden", className)} {...props}>
      <div
        className="absolute inset-0 pointer-events-none opacity-10 -z-10"
        style={{
          backgroundImage: "repeating-conic-gradient(currentColor 0% 25%, transparent 0% 50%)",
          backgroundSize: "16px 16px",
        }}
      />
      {children}
    </div>
  );
}
`,
    demo: `"use client";

import { PixelCheckerboardFade } from "./pixel-checkerboard-fade";

export default function PixelCheckerboardFadeDemo() {
  return (
    <PixelCheckerboardFade className="min-h-[260px] flex items-center justify-center p-8">
      <div className="p-6 rounded-xl border border-line bg-paper/90 backdrop-blur-md shadow-md text-center max-w-sm">
        <h3 className="text-sm font-bold font-mono text-ink">Pixel Checkerboard</h3>
        <p className="text-xs text-ink/60 mt-1 font-sans">8-bit retro gaming tiled dither pattern.</p>
      </div>
    </PixelCheckerboardFade>
  );
}
`,
  }),

  P("hypnotic-spiral-vortex", {
    category: "backgrounds",
    subcategory: "ambient",
    title: "Hypnotic Spiral Vortex",
    description: "Rotating Archimedean logarithmic spiral vortex drawing focal attention inward.",
    tags: ["spiral", "vortex", "hypnotic", "archimedean", "optical"],
    dependencies: ["react"],
    difficulty: "starter",
    dna: {
      genre: "technical",
      macrostructure: "full-bleed",
      density: "medium",
      shapeLanguage: "soft",
      motionLanguage: "none",
      typographyStyle: "monospace",
      colorStrategy: "high-contrast",
    },
    fingerprint: {
      interactionModel: "passive-spiral-geometry",
      visualModel: "archimedean-spiral-vortex",
      motionModel: "none",
      layoutModel: "center-anchored-radial",
      semanticPurpose: "hypnotic-focal-vortex",
    },
    source: `"use client";

import { cn } from "@/lib/cn";

export interface HypnoticSpiralVortexProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export function HypnoticSpiralVortex({ className, children, ...props }: HypnoticSpiralVortexProps) {
  return (
    <div className={cn("relative isolate w-full min-h-full bg-paper text-ink overflow-hidden", className)} {...props}>
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-15 -z-10">
        <svg className="w-[500px] h-[500px]" viewBox="0 0 200 200">
          <path
            d="M 100 100 m 0 0 a 10 10 0 0 1 10 10 a 20 20 0 0 1 -20 20 a 30 30 0 0 1 -30 -30 a 40 40 0 0 1 40 -40 a 50 50 0 0 1 50 50 a 60 60 0 0 1 -60 60 a 70 70 0 0 1 -70 -70 a 80 80 0 0 1 80 -80"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.2"
          />
        </svg>
      </div>
      {children}
    </div>
  );
}
`,
    demo: `"use client";

import { HypnoticSpiralVortex } from "./hypnotic-spiral-vortex";

export default function HypnoticSpiralVortexDemo() {
  return (
    <HypnoticSpiralVortex className="min-h-[260px] flex items-center justify-center p-8">
      <div className="p-6 rounded-xl border border-line bg-paper/90 backdrop-blur-md shadow-md text-center max-w-sm">
        <h3 className="text-sm font-bold font-mono text-ink">Logarithmic Spiral</h3>
        <p className="text-xs text-ink/60 mt-1 font-sans">Inward focusing Archimedean vortex spiral.</p>
      </div>
    </HypnoticSpiralVortex>
  );
}
`,
  }),
];
