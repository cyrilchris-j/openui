import type { ResourceDefinition } from "../lib/definitions.js";

const P = (name: string, definition: Omit<ResourceDefinition, "name">): ResourceDefinition => ({
  name,
  ...definition,
});

export default [
  P("dot-matrix-grid", {
    category: "backgrounds",
    subcategory: "patterns",
    title: "Dot Matrix Grid",
    description: "Precise geometric dot matrix background rendered via radial gradient masks with configurable pitch and radius.",
    tags: ["dots", "grid", "matrix", "pattern", "minimal"],
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
      interactionModel: "passive-canvas-backdrop",
      visualModel: "radial-dot-lattice",
      motionModel: "none",
      layoutModel: "full-viewport-underlay",
      semanticPurpose: "subtle-data-backdrop",
    },
    source: `"use client";

import { cn } from "@/lib/cn";

export interface DotMatrixGridProps extends React.HTMLAttributes<HTMLDivElement> {
  spacing?: number;
  dotSize?: number;
  dotColor?: string;
  children?: React.ReactNode;
}

export function DotMatrixGrid({
  spacing = 24,
  dotSize = 1.5,
  dotColor = "currentColor",
  className,
  children,
  ...props
}: DotMatrixGridProps) {
  return (
    <div
      className={cn("relative isolate w-full min-h-full bg-paper text-ink overflow-hidden", className)}
      {...props}
    >
      <div
        className="absolute inset-0 pointer-events-none opacity-20 -z-10"
        style={{
          backgroundImage: \`radial-gradient(\${dotColor} \${dotSize}px, transparent \${dotSize}px)\`,
          backgroundSize: \`\${spacing}px \${spacing}px\`,
        }}
      />
      {children}
    </div>
  );
}
`,
    demo: `"use client";

import { DotMatrixGrid } from "./dot-matrix-grid";

export default function DotMatrixGridDemo() {
  return (
    <DotMatrixGrid className="min-h-[260px] flex items-center justify-center p-8">
      <div className="p-6 rounded-xl border border-line bg-paper/90 backdrop-blur-md shadow-md text-center max-w-sm">
        <h3 className="text-sm font-bold font-mono text-ink">Dot Matrix Underlay</h3>
        <p className="text-xs text-ink/60 mt-1 font-sans">Precision calibrated radial grid pattern.</p>
      </div>
    </DotMatrixGrid>
  );
}
`,
  }),

  P("isometric-mesh", {
    category: "backgrounds",
    subcategory: "patterns",
    title: "Isometric Mesh",
    description: "An angled 30-degree isometric rhomboid mesh background reminiscent of architectural axonometrics.",
    tags: ["isometric", "mesh", "rhombus", "architecture", "grid"],
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
      interactionModel: "passive-isometric-canvas",
      visualModel: "rhomboid-isometric-plane",
      motionModel: "none",
      layoutModel: "full-viewport-underlay",
      semanticPurpose: "architectural-mesh-layer",
    },
    source: `"use client";

import { cn } from "@/lib/cn";

export interface IsometricMeshProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: number;
  lineColor?: string;
  children?: React.ReactNode;
}

export function IsometricMesh({
  size = 40,
  lineColor = "currentColor",
  className,
  children,
  ...props
}: IsometricMeshProps) {
  return (
    <div className={cn("relative isolate w-full min-h-full bg-paper text-ink overflow-hidden", className)} {...props}>
      <svg className="absolute inset-0 w-full h-full opacity-15 pointer-events-none -z-10" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="iso-mesh-pat" width={size * 2} height={size * 1.154} patternUnits="userSpaceOnUse">
            <path
              d={\`M0 \${size * 0.577} L\${size} 0 L\${size * 2} \${size * 0.577} L\${size} \${size * 1.154} Z\`}
              fill="none"
              stroke={lineColor}
              strokeWidth="1"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#iso-mesh-pat)" />
      </svg>
      {children}
    </div>
  );
}
`,
    demo: `"use client";

import { IsometricMesh } from "./isometric-mesh";

export default function IsometricMeshDemo() {
  return (
    <IsometricMesh className="min-h-[260px] flex items-center justify-center p-8">
      <div className="p-6 rounded-xl border border-line bg-paper/90 backdrop-blur-md shadow-md text-center max-w-sm">
        <h3 className="text-sm font-bold font-mono text-ink">Isometric Lattice</h3>
        <p className="text-xs text-ink/60 mt-1 font-sans">Axonometric projection vector lattice.</p>
      </div>
    </IsometricMesh>
  );
}
`,
  }),

  P("concentric-radar-rings", {
    category: "backgrounds",
    subcategory: "ambient",
    title: "Concentric Radar Rings",
    description: "Expanding concentric circles with crosshair range finders creating a tactical radar sweep ambiance.",
    tags: ["radar", "concentric", "circles", "ambient", "tactical"],
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
      interactionModel: "passive-radar-ambiance",
      visualModel: "concentric-range-rings",
      motionModel: "subtle-pulsing-rings",
      layoutModel: "center-anchored-radial",
      semanticPurpose: "telemetry-radar-canvas",
    },
    source: `"use client";

import { cn } from "@/lib/cn";

export interface ConcentricRadarRingsProps extends React.HTMLAttributes<HTMLDivElement> {
  ringCount?: number;
  children?: React.ReactNode;
}

export function ConcentricRadarRings({
  ringCount = 5,
  className,
  children,
  ...props
}: ConcentricRadarRingsProps) {
  const rings = Array.from({ length: ringCount }, (_, i) => (i + 1) * (100 / ringCount));

  return (
    <div className={cn("relative isolate w-full min-h-full bg-paper text-ink overflow-hidden", className)} {...props}>
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20 -z-10">
        <div className="absolute inset-x-0 top-1/2 h-px bg-line" />
        <div className="absolute inset-y-0 left-1/2 w-px bg-line" />
        {rings.map((pct, idx) => (
          <div
            key={idx}
            className="absolute rounded-full border border-line"
            style={{ width: \`\${pct}%\`, height: \`\${pct}%\`, maxWidth: \`\${pct * 6}px\`, maxHeight: \`\${pct * 6}px\` }}
          />
        ))}
      </div>
      {children}
    </div>
  );
}
`,
    demo: `"use client";

import { ConcentricRadarRings } from "./concentric-radar-rings";

export default function ConcentricRadarRingsDemo() {
  return (
    <ConcentricRadarRings className="min-h-[260px] flex items-center justify-center p-8">
      <div className="p-6 rounded-xl border border-line bg-paper/90 backdrop-blur-md shadow-md text-center max-w-sm">
        <h3 className="text-sm font-bold font-mono text-ink">Radar Rings Target</h3>
        <p className="text-xs text-ink/60 mt-1 font-sans">Concentric range markers and crosshair lines.</p>
      </div>
    </ConcentricRadarRings>
  );
}
`,
  }),

  P("topographic-contour-lines", {
    category: "backgrounds",
    subcategory: "patterns",
    title: "Topographic Contour Lines",
    description: "Generative SVG topographic elevation contours reminiscent of geographic cartography maps.",
    tags: ["topographic", "contours", "elevation", "map", "lines"],
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
      interactionModel: "passive-contour-backdrop",
      visualModel: "curved-elevation-isobars",
      motionModel: "none",
      layoutModel: "full-viewport-underlay",
      semanticPurpose: "cartographic-elevation-texture",
    },
    source: `"use client";

import { cn } from "@/lib/cn";

export interface TopographicContourLinesProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export function TopographicContourLines({ className, children, ...props }: TopographicContourLinesProps) {
  return (
    <div className={cn("relative isolate w-full min-h-full bg-paper text-ink overflow-hidden", className)} {...props}>
      <svg className="absolute inset-0 w-full h-full opacity-15 pointer-events-none -z-10" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" viewBox="0 0 800 600">
        <path d="M0,100 Q200,50 400,120 T800,100" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <path d="M0,160 Q220,110 420,180 T800,160" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <path d="M0,240 Q250,190 450,260 T800,230" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <path d="M0,320 Q230,270 430,340 T800,310" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <path d="M0,400 Q270,350 470,420 T800,390" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <path d="M0,480 Q240,430 440,500 T800,470" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <path d="M0,560 Q260,510 460,580 T800,550" fill="none" stroke="currentColor" strokeWidth="1.5" />
      </svg>
      {children}
    </div>
  );
}
`,
    demo: `"use client";

import { TopographicContourLines } from "./topographic-contour-lines";

export default function TopographicContourLinesDemo() {
  return (
    <TopographicContourLines className="min-h-[260px] flex items-center justify-center p-8">
      <div className="p-6 rounded-xl border border-line bg-paper/90 backdrop-blur-md shadow-md text-center max-w-sm">
        <h3 className="text-sm font-bold font-sans text-ink">Topographic Isobars</h3>
        <p className="text-xs text-ink/60 mt-1">Geographic elevation curves and natural topology.</p>
      </div>
    </TopographicContourLines>
  );
}
`,
  }),

  P("honeycomb-hex-lattice", {
    category: "backgrounds",
    subcategory: "patterns",
    title: "Honeycomb Hex Lattice",
    description: "Repeating geometric hexagon tessellation pattern creating a structured honeycomb grid.",
    tags: ["honeycomb", "hex", "lattice", "tessellation", "geometric"],
    dependencies: ["react"],
    difficulty: "starter",
    dna: {
      genre: "technical",
      macrostructure: "full-bleed",
      density: "compact",
      shapeLanguage: "sharp",
      motionLanguage: "none",
      typographyStyle: "geometric",
      colorStrategy: "high-contrast",
    },
    fingerprint: {
      interactionModel: "passive-tessellation-canvas",
      visualModel: "hexagonal-tessellation",
      motionModel: "none",
      layoutModel: "full-viewport-underlay",
      semanticPurpose: "honeycomb-structure-backdrop",
    },
    source: `"use client";

import { cn } from "@/lib/cn";

export interface HoneycombHexLatticeProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: number;
  children?: React.ReactNode;
}

export function HoneycombHexLattice({ size = 32, className, children, ...props }: HoneycombHexLatticeProps) {
  const w = size * 2;
  const h = size * 1.732;

  return (
    <div className={cn("relative isolate w-full min-h-full bg-paper text-ink overflow-hidden", className)} {...props}>
      <svg className="absolute inset-0 w-full h-full opacity-15 pointer-events-none -z-10" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="hex-pat" width={w} height={h} patternUnits="userSpaceOnUse">
            <path
              d={\`M\${size * 0.5} 0 L\${size * 1.5} 0 L\${w} \${h * 0.5} L\${size * 1.5} \${h} L\${size * 0.5} \${h} L0 \${h * 0.5} Z\`}
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#hex-pat)" />
      </svg>
      {children}
    </div>
  );
}
`,
    demo: `"use client";

import { HoneycombHexLattice } from "./honeycomb-hex-lattice";

export default function HoneycombHexLatticeDemo() {
  return (
    <HoneycombHexLattice className="min-h-[260px] flex items-center justify-center p-8">
      <div className="p-6 rounded-xl border border-line bg-paper/90 backdrop-blur-md shadow-md text-center max-w-sm">
        <h3 className="text-sm font-bold font-mono text-ink">Honeycomb Tessellation</h3>
        <p className="text-xs text-ink/60 mt-1 font-sans">Hexagonal modular lattice vector tile.</p>
      </div>
    </HoneycombHexLattice>
  );
}
`,
  }),

  P("cyber-matrix-rain", {
    category: "backgrounds",
    subcategory: "canvases",
    title: "Cyber Matrix Rain",
    description: "HTML5 Canvas falling green/cyan glyph characters stream inspired by classic cyberpunk terminal screens.",
    tags: ["matrix", "rain", "cyberpunk", "canvas", "terminal"],
    dependencies: ["react"],
    difficulty: "intermediate",
    dna: {
      genre: "technical",
      macrostructure: "full-bleed",
      density: "dense",
      shapeLanguage: "sharp",
      motionLanguage: "kinetic",
      typographyStyle: "monospace",
      colorStrategy: "neon-on-dark",
    },
    fingerprint: {
      interactionModel: "passive-canvas-render",
      visualModel: "falling-code-rain",
      motionModel: "constant-stream-drop",
      layoutModel: "full-viewport-underlay",
      semanticPurpose: "cyberpunk-matrix-stream",
    },
    source: `"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/cn";

export interface CyberMatrixRainProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export function CyberMatrixRain({ className, children, ...props }: CyberMatrixRainProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    const resize = () => {
      canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
    };
    resize();

    const chars = "0123456789ABCDEF$#@*<>{}[]%^&";
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    const drops: number[] = Array.from({ length: columns }, () => Math.random() * -50);

    const render = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.08)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#10b981";
      ctx.font = \`\${fontSize}px monospace\`;

      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)] ?? "0";
        const x = i * fontSize;
        const y = (drops[i] ?? 0) * fontSize;

        ctx.fillText(text, x, y);
        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i] = (drops[i] ?? 0) + 1;
      }
      animId = requestAnimationFrame(render);
    };

    render();
    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div className={cn("relative isolate w-full min-h-full bg-black text-white overflow-hidden", className)} {...props}>
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none opacity-40 -z-10" />
      {children}
    </div>
  );
}
`,
    demo: `"use client";

import { CyberMatrixRain } from "./cyber-matrix-rain";

export default function CyberMatrixRainDemo() {
  return (
    <CyberMatrixRain className="min-h-[280px] flex items-center justify-center p-8">
      <div className="p-6 rounded-xl border border-emerald-500/40 bg-black/80 backdrop-blur-md shadow-lg text-center max-w-sm">
        <h3 className="text-sm font-bold font-mono text-emerald-400">Cyber Rain Stream</h3>
        <p className="text-xs text-white/70 mt-1 font-mono">Terminal data stream raining glyphs.</p>
      </div>
    </CyberMatrixRain>
  );
}
`,
  }),

  P("aurora-borealis-glow", {
    category: "backgrounds",
    subcategory: "ambient",
    title: "Aurora Borealis Glow",
    description: "Ethereal Northern Lights atmospheric glow with animated shifting radial color gradients.",
    tags: ["aurora", "glow", "ambient", "gradients", "atmosphere"],
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
      interactionModel: "passive-atmospheric-glow",
      visualModel: "aurora-curtain-field",
      motionModel: "subtle-color-drift",
      layoutModel: "full-viewport-underlay",
      semanticPurpose: "atmospheric-light-curtain",
    },
    source: `"use client";

import { cn } from "@/lib/cn";

export interface AuroraBorealisGlowProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export function AuroraBorealisGlow({ className, children, ...props }: AuroraBorealisGlowProps) {
  return (
    <div className={cn("relative isolate w-full min-h-full bg-slate-950 text-white overflow-hidden", className)} {...props}>
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute -top-40 left-1/4 w-96 h-96 rounded-full bg-emerald-500/30 blur-3xl" />
        <div className="absolute -top-20 right-1/4 w-96 h-96 rounded-full bg-cyan-500/30 blur-3xl" />
        <div className="absolute top-40 left-1/3 w-80 h-80 rounded-full bg-purple-500/25 blur-3xl" />
      </div>
      {children}
    </div>
  );
}
`,
    demo: `"use client";

import { AuroraBorealisGlow } from "./aurora-borealis-glow";

export default function AuroraBorealisGlowDemo() {
  return (
    <AuroraBorealisGlow className="min-h-[260px] flex items-center justify-center p-8">
      <div className="p-6 rounded-xl border border-white/20 bg-black/60 backdrop-blur-md shadow-xl text-center max-w-sm">
        <h3 className="text-sm font-bold font-sans text-white">Northern Lights</h3>
        <p className="text-xs text-white/70 mt-1 font-sans">Deep multi-spectrum atmospheric glow.</p>
      </div>
    </AuroraBorealisGlow>
  );
}
`,
  }),

  P("starfield-warp-speed", {
    category: "backgrounds",
    subcategory: "canvases",
    title: "Starfield Warp Speed",
    description: "Canvas 3D starfield simulation with stars accelerating toward the camera creating a hyperspace warp effect.",
    tags: ["starfield", "warp", "hyperspace", "canvas", "stars"],
    dependencies: ["react"],
    difficulty: "intermediate",
    dna: {
      genre: "technical",
      macrostructure: "full-bleed",
      density: "dense",
      shapeLanguage: "pill",
      motionLanguage: "kinetic",
      typographyStyle: "monospace",
      colorStrategy: "high-contrast",
    },
    fingerprint: {
      interactionModel: "passive-canvas-warp",
      visualModel: "radial-hyperspace-streaks",
      motionModel: "center-outward-acceleration",
      layoutModel: "full-viewport-underlay",
      semanticPurpose: "hyperspace-travel-canvas",
    },
    source: `"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/cn";

export interface StarfieldWarpSpeedProps extends React.HTMLAttributes<HTMLDivElement> {
  starCount?: number;
  speed?: number;
  children?: React.ReactNode;
}

export function StarfieldWarpSpeed({
  starCount = 120,
  speed = 4,
  className,
  children,
  ...props
}: StarfieldWarpSpeedProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let w = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let h = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    const stars = Array.from({ length: starCount }, () => ({
      x: (Math.random() - 0.5) * w,
      y: (Math.random() - 0.5) * h,
      z: Math.random() * w,
    }));

    const render = () => {
      ctx.fillStyle = "rgba(10, 10, 15, 0.25)";
      ctx.fillRect(0, 0, w, h);
      const cx = w / 2;
      const cy = h / 2;

      ctx.fillStyle = "#ffffff";
      for (const s of stars) {
        s.z -= speed;
        if (s.z <= 0) {
          s.z = w;
          s.x = (Math.random() - 0.5) * w;
          s.y = (Math.random() - 0.5) * h;
        }
        const k = 128 / s.z;
        const px = s.x * k + cx;
        const py = s.y * k + cy;
        if (px >= 0 && px <= w && py >= 0 && py <= h) {
          const sz = Math.max(1, (1 - s.z / w) * 2.5);
          ctx.beginPath();
          ctx.arc(px, py, sz, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [starCount, speed]);

  return (
    <div className={cn("relative isolate w-full min-h-full bg-slate-950 text-white overflow-hidden", className)} {...props}>
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none -z-10" />
      {children}
    </div>
  );
}
`,
    demo: `"use client";

import { StarfieldWarpSpeed } from "./starfield-warp-speed";

export default function StarfieldWarpSpeedDemo() {
  return (
    <StarfieldWarpSpeed className="min-h-[280px] flex items-center justify-center p-8">
      <div className="p-6 rounded-xl border border-white/20 bg-black/60 backdrop-blur-md shadow-xl text-center max-w-sm">
        <h3 className="text-sm font-bold font-mono text-white">Hyperspace Velocity</h3>
        <p className="text-xs text-white/70 mt-1 font-mono">3D radial star acceleration canvas.</p>
      </div>
    </StarfieldWarpSpeed>
  );
}
`,
  }),

  P("geometric-chevron-tile", {
    category: "backgrounds",
    subcategory: "patterns",
    title: "Geometric Chevron Tile",
    description: "Diagonal herringbone chevron tiles creating an orderly zig-zag textile texture.",
    tags: ["chevron", "herringbone", "pattern", "geometric", "textile"],
    dependencies: ["react"],
    difficulty: "starter",
    dna: {
      genre: "editorial",
      macrostructure: "full-bleed",
      density: "medium",
      shapeLanguage: "sharp",
      motionLanguage: "none",
      typographyStyle: "serif-display",
      colorStrategy: "high-contrast",
    },
    fingerprint: {
      interactionModel: "passive-textile-pattern",
      visualModel: "zigzag-herringbone-mesh",
      motionModel: "none",
      layoutModel: "full-viewport-underlay",
      semanticPurpose: "editorial-textile-pattern",
    },
    source: `"use client";

import { cn } from "@/lib/cn";

export interface GeometricChevronTileProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export function GeometricChevronTile({ className, children, ...props }: GeometricChevronTileProps) {
  return (
    <div className={cn("relative isolate w-full min-h-full bg-paper text-ink overflow-hidden", className)} {...props}>
      <svg className="absolute inset-0 w-full h-full opacity-15 pointer-events-none -z-10" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="chevron-pat" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M0 20 L20 0 L40 20 L20 40 Z" fill="none" stroke="currentColor" strokeWidth="1" />
            <path d="M0 0 L20 20 L40 0" fill="none" stroke="currentColor" strokeWidth="1" />
            <path d="M0 40 L20 20 L40 40" fill="none" stroke="currentColor" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#chevron-pat)" />
      </svg>
      {children}
    </div>
  );
}
`,
    demo: `"use client";

import { GeometricChevronTile } from "./geometric-chevron-tile";

export default function GeometricChevronTileDemo() {
  return (
    <GeometricChevronTile className="min-h-[260px] flex items-center justify-center p-8">
      <div className="p-6 rounded-xl border border-line bg-paper/90 backdrop-blur-md shadow-md text-center max-w-sm">
        <h3 className="text-sm font-bold font-serif text-ink">Chevron Tessellation</h3>
        <p className="text-xs text-ink/60 mt-1 font-sans">Precision angled herringbone vector weave.</p>
      </div>
    </GeometricChevronTile>
  );
}
`,
  }),

  P("halftone-dot-gradient", {
    category: "backgrounds",
    subcategory: "patterns",
    title: "Halftone Dot Gradient",
    description: "Classic newspaper printmaking halftone screen with dots scaling along an optical gradient.",
    tags: ["halftone", "screen", "print", "retro", "dots"],
    dependencies: ["react"],
    difficulty: "starter",
    dna: {
      genre: "retro",
      macrostructure: "full-bleed",
      density: "medium",
      shapeLanguage: "pill",
      motionLanguage: "none",
      typographyStyle: "condensed",
      colorStrategy: "monochrome",
    },
    fingerprint: {
      interactionModel: "passive-print-backdrop",
      visualModel: "variable-radius-halftone",
      motionModel: "none",
      layoutModel: "full-viewport-underlay",
      semanticPurpose: "printmaking-halftone-texture",
    },
    source: `"use client";

import { cn } from "@/lib/cn";

export interface HalftoneDotGradientProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export function HalftoneDotGradient({ className, children, ...props }: HalftoneDotGradientProps) {
  return (
    <div className={cn("relative isolate w-full min-h-full bg-paper text-ink overflow-hidden", className)} {...props}>
      <div
        className="absolute inset-0 pointer-events-none opacity-20 -z-10"
        style={{
          backgroundImage: "radial-gradient(currentColor 1.5px, transparent 1.5px)",
          backgroundSize: "16px 16px",
          maskImage: "linear-gradient(to bottom, black 20%, transparent 95%)",
          WebkitMaskImage: "linear-gradient(to bottom, black 20%, transparent 95%)",
        }}
      />
      {children}
    </div>
  );
}
`,
    demo: `"use client";

import { HalftoneDotGradient } from "./halftone-dot-gradient";

export default function HalftoneDotGradientDemo() {
  return (
    <HalftoneDotGradient className="min-h-[260px] flex items-center justify-center p-8">
      <div className="p-6 rounded-xl border border-line bg-paper/90 backdrop-blur-md shadow-md text-center max-w-sm">
        <h3 className="text-sm font-bold font-mono text-ink">Halftone Fade</h3>
        <p className="text-xs text-ink/60 mt-1 font-sans">Lithographic printing halftone mask fade.</p>
      </div>
    </HalftoneDotGradient>
  );
}
`,
  }),

  P("radial-beam-spotlight", {
    category: "backgrounds",
    subcategory: "ambient",
    title: "Radial Beam Spotlight",
    description: "An angled overhead conical beam spotlight illuminating the focal hero area against darkness.",
    tags: ["spotlight", "beam", "ambient", "lighting", "hero"],
    dependencies: ["react"],
    difficulty: "starter",
    dna: {
      genre: "minimal",
      macrostructure: "full-bleed",
      density: "airy",
      shapeLanguage: "soft",
      motionLanguage: "subtle",
      typographyStyle: "grotesk",
      colorStrategy: "high-contrast",
    },
    fingerprint: {
      interactionModel: "passive-lighting-underlay",
      visualModel: "conic-spotlight-cone",
      motionModel: "none",
      layoutModel: "top-anchored-cone",
      semanticPurpose: "stage-spotlight-illumination",
    },
    source: `"use client";

import { cn } from "@/lib/cn";

export interface RadialBeamSpotlightProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export function RadialBeamSpotlight({ className, children, ...props }: RadialBeamSpotlightProps) {
  return (
    <div className={cn("relative isolate w-full min-h-full bg-slate-950 text-white overflow-hidden", className)} {...props}>
      <div
        className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[500px] pointer-events-none -z-10 opacity-35"
        style={{
          background: "radial-gradient(ellipse at top, rgba(56, 189, 248, 0.45) 0%, rgba(56, 189, 248, 0.05) 50%, transparent 70%)",
        }}
      />
      {children}
    </div>
  );
}
`,
    demo: `"use client";

import { RadialBeamSpotlight } from "./radial-beam-spotlight";

export default function RadialBeamSpotlightDemo() {
  return (
    <RadialBeamSpotlight className="min-h-[260px] flex items-center justify-center p-8">
      <div className="p-6 rounded-xl border border-white/20 bg-black/60 backdrop-blur-md shadow-xl text-center max-w-sm">
        <h3 className="text-sm font-bold font-sans text-white">Overhead Spotlight</h3>
        <p className="text-xs text-white/70 mt-1 font-sans">Focused optical beam illuminating focal point.</p>
      </div>
    </RadialBeamSpotlight>
  );
}
`,
  }),

  P("moire-interference-mesh", {
    category: "backgrounds",
    subcategory: "patterns",
    title: "Moiré Interference Mesh",
    description: "Two overlapping slightly rotated line gratings creating an optical moiré ripple pattern.",
    tags: ["moire", "optical", "interference", "pattern", "illusion"],
    dependencies: ["react"],
    difficulty: "starter",
    dna: {
      genre: "technical",
      macrostructure: "full-bleed",
      density: "medium",
      shapeLanguage: "sharp",
      motionLanguage: "none",
      typographyStyle: "monospace",
      colorStrategy: "monochrome",
    },
    fingerprint: {
      interactionModel: "passive-optical-illusion",
      visualModel: "dual-lattice-moire",
      motionModel: "none",
      layoutModel: "full-viewport-underlay",
      semanticPurpose: "optical-moire-effect",
    },
    source: `"use client";

import { cn } from "@/lib/cn";

export interface MoireInterferenceMeshProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export function MoireInterferenceMesh({ className, children, ...props }: MoireInterferenceMeshProps) {
  return (
    <div className={cn("relative isolate w-full min-h-full bg-paper text-ink overflow-hidden", className)} {...props}>
      <div className="absolute inset-0 pointer-events-none opacity-20 -z-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "linear-gradient(to right, currentColor 1px, transparent 1px)",
            backgroundSize: "8px 8px",
          }}
        />
        <div
          className="absolute inset-0 origin-center rotate-3"
          style={{
            backgroundImage: "linear-gradient(to right, currentColor 1px, transparent 1px)",
            backgroundSize: "8px 8px",
          }}
        />
      </div>
      {children}
    </div>
  );
}
`,
    demo: `"use client";

import { MoireInterferenceMesh } from "./moire-interference-mesh";

export default function MoireInterferenceMeshDemo() {
  return (
    <MoireInterferenceMesh className="min-h-[260px] flex items-center justify-center p-8">
      <div className="p-6 rounded-xl border border-line bg-paper/90 backdrop-blur-md shadow-md text-center max-w-sm">
        <h3 className="text-sm font-bold font-mono text-ink">Moiré Interference</h3>
        <p className="text-xs text-ink/60 mt-1 font-sans">Superimposed grating angles producing interference waves.</p>
      </div>
    </MoireInterferenceMesh>
  );
}
`,
  }),

  P("abstract-noise-waves", {
    category: "backgrounds",
    subcategory: "canvases",
    title: "Abstract Noise Waves",
    description: "Layered undulating sine wave ribbons flowing smoothly across an animated HTML5 canvas.",
    tags: ["waves", "noise", "sine", "canvas", "abstract"],
    dependencies: ["react"],
    difficulty: "intermediate",
    dna: {
      genre: "organic",
      macrostructure: "full-bleed",
      density: "airy",
      shapeLanguage: "soft",
      motionLanguage: "subtle",
      typographyStyle: "humanist",
      colorStrategy: "high-contrast",
    },
    fingerprint: {
      interactionModel: "passive-canvas-waves",
      visualModel: "undulating-sine-ribbons",
      motionModel: "continuous-wave-flow",
      layoutModel: "full-viewport-underlay",
      semanticPurpose: "organic-wave-animation",
    },
    source: `"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/cn";

export interface AbstractNoiseWavesProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export function AbstractNoiseWaves({ className, children, ...props }: AbstractNoiseWavesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let step = 0;

    const render = () => {
      canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.lineWidth = 1.5;
      ctx.strokeStyle = "rgba(100, 116, 139, 0.25)";

      for (let j = 0; j < 3; j++) {
        ctx.beginPath();
        for (let x = 0; x < canvas.width; x += 10) {
          const y =
            canvas.height / 2 +
            Math.sin(x * 0.005 + step + j) * 40 +
            Math.cos(x * 0.01 + step * 0.5) * 20;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }

      step += 0.015;
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

import { AbstractNoiseWaves } from "./abstract-noise-waves";

export default function AbstractNoiseWavesDemo() {
  return (
    <AbstractNoiseWaves className="min-h-[260px] flex items-center justify-center p-8">
      <div className="p-6 rounded-xl border border-line bg-paper/90 backdrop-blur-md shadow-md text-center max-w-sm">
        <h3 className="text-sm font-bold font-sans text-ink">Harmonic Waves</h3>
        <p className="text-xs text-ink/60 mt-1 font-sans">Multi-frequency harmonic sine ribbons.</p>
      </div>
    </AbstractNoiseWaves>
  );
}
`,
  }),

  P("floating-bokeh-orbs", {
    category: "backgrounds",
    subcategory: "ambient",
    title: "Floating Bokeh Orbs",
    description: "Soft cinematic out-of-focus luminous bokeh orbs drifting lazily in deep field perspective.",
    tags: ["bokeh", "orbs", "cinematic", "ambient", "blur"],
    dependencies: ["react"],
    difficulty: "starter",
    dna: {
      genre: "luxury",
      macrostructure: "full-bleed",
      density: "airy",
      shapeLanguage: "pill",
      motionLanguage: "subtle",
      typographyStyle: "grotesk",
      colorStrategy: "neon-on-dark",
    },
    fingerprint: {
      interactionModel: "passive-bokeh-ambiance",
      visualModel: "defocused-light-discs",
      motionModel: "subtle-floating-drift",
      layoutModel: "full-viewport-underlay",
      semanticPurpose: "cinematic-bokeh-atmosphere",
    },
    source: `"use client";

import { cn } from "@/lib/cn";

export interface FloatingBokehOrbsProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export function FloatingBokehOrbs({ className, children, ...props }: FloatingBokehOrbsProps) {
  const orbs = [
    { size: 180, top: "10%", left: "15%", color: "bg-indigo-500/20" },
    { size: 240, top: "45%", left: "60%", color: "bg-fuchsia-500/20" },
    { size: 140, top: "70%", left: "25%", color: "bg-cyan-500/20" },
    { size: 200, top: "20%", left: "75%", color: "bg-amber-500/15" },
  ];

  return (
    <div className={cn("relative isolate w-full min-h-full bg-slate-950 text-white overflow-hidden", className)} {...props}>
      <div className="absolute inset-0 pointer-events-none -z-10">
        {orbs.map((orb, i) => (
          <div
            key={i}
            className={cn("absolute rounded-full blur-2xl transition-all duration-1000", orb.color)}
            style={{
              width: \`\${orb.size}px\`,
              height: \`\${orb.size}px\`,
              top: orb.top,
              left: orb.left,
            }}
          />
        ))}
      </div>
      {children}
    </div>
  );
}
`,
    demo: `"use client";

import { FloatingBokehOrbs } from "./floating-bokeh-orbs";

export default function FloatingBokehOrbsDemo() {
  return (
    <FloatingBokehOrbs className="min-h-[260px] flex items-center justify-center p-8">
      <div className="p-6 rounded-xl border border-white/20 bg-black/60 backdrop-blur-md shadow-xl text-center max-w-sm">
        <h3 className="text-sm font-bold font-sans text-white">Cinematic Bokeh</h3>
        <p className="text-xs text-white/70 mt-1 font-sans">Soft luminous focal discs with deep blur.</p>
      </div>
    </FloatingBokehOrbs>
  );
}
`,
  }),

  P("crosshatch-sketch-pattern", {
    category: "backgrounds",
    subcategory: "patterns",
    title: "Crosshatch Sketch Pattern",
    description: "Architectural dual-direction 45-degree diagonal line crosshatching pattern.",
    tags: ["crosshatch", "sketch", "pattern", "diagonal", "drawing"],
    dependencies: ["react"],
    difficulty: "starter",
    dna: {
      genre: "editorial",
      macrostructure: "full-bleed",
      density: "medium",
      shapeLanguage: "sharp",
      motionLanguage: "none",
      typographyStyle: "serif-display",
      colorStrategy: "monochrome",
    },
    fingerprint: {
      interactionModel: "passive-engraving-backdrop",
      visualModel: "dual-diagonal-hatching",
      motionModel: "none",
      layoutModel: "full-viewport-underlay",
      semanticPurpose: "etching-texture-layer",
    },
    source: `"use client";

import { cn } from "@/lib/cn";

export interface CrosshatchSketchPatternProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export function CrosshatchSketchPattern({ className, children, ...props }: CrosshatchSketchPatternProps) {
  return (
    <div className={cn("relative isolate w-full min-h-full bg-paper text-ink overflow-hidden", className)} {...props}>
      <div
        className="absolute inset-0 pointer-events-none opacity-15 -z-10"
        style={{
          backgroundImage: \`
            repeating-linear-gradient(45deg, currentColor 0, currentColor 1px, transparent 0, transparent 16px),
            repeating-linear-gradient(-45deg, currentColor 0, currentColor 1px, transparent 0, transparent 16px)
          \`,
        }}
      />
      {children}
    </div>
  );
}
`,
    demo: `"use client";

import { CrosshatchSketchPattern } from "./crosshatch-sketch-pattern";

export default function CrosshatchSketchPatternDemo() {
  return (
    <CrosshatchSketchPattern className="min-h-[260px] flex items-center justify-center p-8">
      <div className="p-6 rounded-xl border border-line bg-paper/90 backdrop-blur-md shadow-md text-center max-w-sm">
        <h3 className="text-sm font-bold font-serif text-ink">Etched Crosshatch</h3>
        <p className="text-xs text-ink/60 mt-1 font-sans">Dual 45-degree crosshatch drawing texture.</p>
      </div>
    </CrosshatchSketchPattern>
  );
}
`,
  }),

  P("striped-hazard-warning", {
    category: "backgrounds",
    subcategory: "patterns",
    title: "Striped Hazard Warning",
    description: "High-contrast industrial warning hazard chevron stripes with bold diagonal banding.",
    tags: ["hazard", "stripes", "industrial", "warning", "diagonal"],
    dependencies: ["react"],
    difficulty: "starter",
    dna: {
      genre: "industrial",
      macrostructure: "full-bleed",
      density: "dense",
      shapeLanguage: "sharp",
      motionLanguage: "none",
      typographyStyle: "condensed",
      colorStrategy: "high-contrast",
    },
    fingerprint: {
      interactionModel: "passive-industrial-hazard",
      visualModel: "hazard-diagonal-stripes",
      motionModel: "none",
      layoutModel: "full-viewport-underlay",
      semanticPurpose: "industrial-warning-texture",
    },
    source: `"use client";

import { cn } from "@/lib/cn";

export interface StripedHazardWarningProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export function StripedHazardWarning({ className, children, ...props }: StripedHazardWarningProps) {
  return (
    <div className={cn("relative isolate w-full min-h-full bg-paper text-ink overflow-hidden", className)} {...props}>
      <div
        className="absolute inset-0 pointer-events-none opacity-10 -z-10"
        style={{
          backgroundImage: "repeating-linear-gradient(-45deg, currentColor, currentColor 20px, transparent 20px, transparent 40px)",
        }}
      />
      {children}
    </div>
  );
}
`,
    demo: `"use client";

import { StripedHazardWarning } from "./striped-hazard-warning";

export default function StripedHazardWarningDemo() {
  return (
    <StripedHazardWarning className="min-h-[260px] flex items-center justify-center p-8">
      <div className="p-6 rounded-xl border border-line bg-paper/90 backdrop-blur-md shadow-md text-center max-w-sm">
        <h3 className="text-sm font-bold font-mono text-ink">Industrial Hazard</h3>
        <p className="text-xs text-ink/60 mt-1 font-sans">High-contrast diagonal warning stripe boundary.</p>
      </div>
    </StripedHazardWarning>
  );
}
`,
  }),

  P("circuit-board-traces", {
    category: "backgrounds",
    subcategory: "patterns",
    title: "Circuit Board Traces",
    description: "Printed circuit board etched copper bus traces with 45-degree angle elbows and terminal pads.",
    tags: ["circuit", "pcb", "traces", "hardware", "technical"],
    dependencies: ["react"],
    difficulty: "starter",
    dna: {
      genre: "technical",
      macrostructure: "full-bleed",
      density: "medium",
      shapeLanguage: "sharp",
      motionLanguage: "none",
      typographyStyle: "monospace",
      colorStrategy: "neon-on-dark",
    },
    fingerprint: {
      interactionModel: "passive-schematic-backdrop",
      visualModel: "copper-bus-traces",
      motionModel: "none",
      layoutModel: "full-viewport-underlay",
      semanticPurpose: "pcb-schematic-texture",
    },
    source: `"use client";

import { cn } from "@/lib/cn";

export interface CircuitBoardTracesProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export function CircuitBoardTraces({ className, children, ...props }: CircuitBoardTracesProps) {
  return (
    <div className={cn("relative isolate w-full min-h-full bg-paper text-ink overflow-hidden", className)} {...props}>
      <svg className="absolute inset-0 w-full h-full opacity-15 pointer-events-none -z-10" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="pcb-pat" width="100" height="100" patternUnits="userSpaceOnUse">
            <path d="M10 20 L50 20 L70 40 L90 40" fill="none" stroke="currentColor" strokeWidth="1.5" />
            <circle cx="10" cy="20" r="3" fill="currentColor" />
            <circle cx="90" cy="40" r="3" fill="currentColor" />
            <path d="M20 80 L40 60 L80 60" fill="none" stroke="currentColor" strokeWidth="1.5" />
            <circle cx="20" cy="80" r="3" fill="currentColor" />
            <circle cx="80" cy="60" r="3" fill="currentColor" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#pcb-pat)" />
      </svg>
      {children}
    </div>
  );
}
`,
    demo: `"use client";

import { CircuitBoardTraces } from "./circuit-board-traces";

export default function CircuitBoardTracesDemo() {
  return (
    <CircuitBoardTraces className="min-h-[260px] flex items-center justify-center p-8">
      <div className="p-6 rounded-xl border border-line bg-paper/90 backdrop-blur-md shadow-md text-center max-w-sm">
        <h3 className="text-sm font-bold font-mono text-ink">Circuit Traces</h3>
        <p className="text-xs text-ink/60 mt-1 font-sans">PCB conductor traces and soldering contact vias.</p>
      </div>
    </CircuitBoardTraces>
  );
}
`,
  }),

  P("triangular-faceted-mesh", {
    category: "backgrounds",
    subcategory: "patterns",
    title: "Triangular Faceted Mesh",
    description: "Low-poly faceted Delaunay triangulation mesh creating geometric architectural depth.",
    tags: ["triangles", "delaunay", "mesh", "faceted", "lowpoly"],
    dependencies: ["react"],
    difficulty: "starter",
    dna: {
      genre: "technical",
      macrostructure: "full-bleed",
      density: "medium",
      shapeLanguage: "sharp",
      motionLanguage: "none",
      typographyStyle: "geometric",
      colorStrategy: "high-contrast",
    },
    fingerprint: {
      interactionModel: "passive-polyhedral-canvas",
      visualModel: "faceted-triangulation",
      motionModel: "none",
      layoutModel: "full-viewport-underlay",
      semanticPurpose: "low-poly-surface-texture",
    },
    source: `"use client";

import { cn } from "@/lib/cn";

export interface TriangularFacetedMeshProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export function TriangularFacetedMesh({ className, children, ...props }: TriangularFacetedMeshProps) {
  return (
    <div className={cn("relative isolate w-full min-h-full bg-paper text-ink overflow-hidden", className)} {...props}>
      <svg className="absolute inset-0 w-full h-full opacity-15 pointer-events-none -z-10" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="tri-mesh-pat" width="60" height="52" patternUnits="userSpaceOnUse">
            <path d="M0 0 L30 52 L60 0 Z" fill="none" stroke="currentColor" strokeWidth="1" />
            <path d="M30 52 L60 0 L90 52 Z" fill="none" stroke="currentColor" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#tri-mesh-pat)" />
      </svg>
      {children}
    </div>
  );
}
`,
    demo: `"use client";

import { TriangularFacetedMesh } from "./triangular-faceted-mesh";

export default function TriangularFacetedMeshDemo() {
  return (
    <TriangularFacetedMesh className="min-h-[260px] flex items-center justify-center p-8">
      <div className="p-6 rounded-xl border border-line bg-paper/90 backdrop-blur-md shadow-md text-center max-w-sm">
        <h3 className="text-sm font-bold font-mono text-ink">Faceted Triangles</h3>
        <p className="text-xs text-ink/60 mt-1 font-sans">Delaunay triangulation crystal facets.</p>
      </div>
    </TriangularFacetedMesh>
  );
}
`,
  }),

  P("flowing-liquid-blobs", {
    category: "backgrounds",
    subcategory: "ambient",
    title: "Flowing Liquid Blobs",
    description: "Soft morphing SVG organic metaball shapes providing organic fluidity to marketing headers.",
    tags: ["liquid", "blobs", "metaball", "organic", "ambient"],
    dependencies: ["react"],
    difficulty: "starter",
    dna: {
      genre: "organic",
      macrostructure: "full-bleed",
      density: "airy",
      shapeLanguage: "soft",
      motionLanguage: "subtle",
      typographyStyle: "grotesk",
      colorStrategy: "pastel",
    },
    fingerprint: {
      interactionModel: "passive-liquid-ambiance",
      visualModel: "morphing-organic-blobs",
      motionModel: "subtle-morphing-shapes",
      layoutModel: "full-viewport-underlay",
      semanticPurpose: "organic-liquid-backdrop",
    },
    source: `"use client";

import { cn } from "@/lib/cn";

export interface FlowingLiquidBlobsProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export function FlowingLiquidBlobs({ className, children, ...props }: FlowingLiquidBlobsProps) {
  return (
    <div className={cn("relative isolate w-full min-h-full bg-paper text-ink overflow-hidden", className)} {...props}>
      <svg className="absolute -top-20 -left-20 w-96 h-96 opacity-20 pointer-events-none -z-10 text-accent" viewBox="0 0 200 200" fill="currentColor">
        <path d="M42.7,-62.9C53.9,-54.2,60.8,-40.4,66.1,-26.4C71.3,-12.4,74.9,1.8,72.4,15.4C70,29.1,61.4,42.2,50.1,51.8C38.8,61.4,24.8,67.5,9.6,71.2C-5.6,74.8,-22,76,-36.8,70.3C-51.6,64.6,-64.8,52,-72.1,36.8C-79.4,21.6,-80.8,3.9,-77,-12.3C-73.2,-28.5,-64.2,-43.2,-51.6,-51.7C-39,-60.2,-22.8,-62.5,-6.3,-64.5C10.2,-66.5,31.5,-71.6,42.7,-62.9Z" transform="translate(100 100)" />
      </svg>
      <svg className="absolute -bottom-20 -right-20 w-96 h-96 opacity-15 pointer-events-none -z-10 text-emerald-500" viewBox="0 0 200 200" fill="currentColor">
        <path d="M38.1,-52C49.1,-46.3,57.5,-34.5,63.1,-21.2C68.6,-7.9,71.3,7,67.7,20.4C64.2,33.8,54.4,45.8,42.4,53.2C30.4,60.7,16.2,63.6,1.4,61.7C-13.4,59.7,-28.9,53,-41.6,43.2C-54.3,33.4,-64.2,20.5,-67.2,5.8C-70.2,-8.9,-66.3,-25.4,-56.9,-36.6C-47.5,-47.8,-32.6,-53.7,-18.8,-57.4C-5,-61.1,7.1,-62.6,21.1,-58.5C35.1,-54.4,27.1,-57.7,38.1,-52Z" transform="translate(100 100)" />
      </svg>
      {children}
    </div>
  );
}
`,
    demo: `"use client";

import { FlowingLiquidBlobs } from "./flowing-liquid-blobs";

export default function FlowingLiquidBlobsDemo() {
  return (
    <FlowingLiquidBlobs className="min-h-[260px] flex items-center justify-center p-8">
      <div className="p-6 rounded-xl border border-line bg-paper/90 backdrop-blur-md shadow-md text-center max-w-sm">
        <h3 className="text-sm font-bold font-sans text-ink">Organic Metaballs</h3>
        <p className="text-xs text-ink/60 mt-1 font-sans">Generative bezier morphing blob contours.</p>
      </div>
    </FlowingLiquidBlobs>
  );
}
`,
  }),

  P("polka-dot-pop", {
    category: "backgrounds",
    subcategory: "patterns",
    title: "Polka Dot Pop",
    description: "Crisp staggered modern polka dots with alternating row offsets for playful editorial headers.",
    tags: ["polka", "dots", "pop", "playful", "pattern"],
    dependencies: ["react"],
    difficulty: "starter",
    dna: {
      genre: "playful",
      macrostructure: "full-bleed",
      density: "medium",
      shapeLanguage: "pill",
      motionLanguage: "none",
      typographyStyle: "grotesk",
      colorStrategy: "high-contrast",
    },
    fingerprint: {
      interactionModel: "passive-staggered-dots",
      visualModel: "staggered-polka-pattern",
      motionModel: "none",
      layoutModel: "full-viewport-underlay",
      semanticPurpose: "playful-dot-wallpaper",
    },
    source: `"use client";

import { cn } from "@/lib/cn";

export interface PolkaDotPopProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export function PolkaDotPop({ className, children, ...props }: PolkaDotPopProps) {
  return (
    <div className={cn("relative isolate w-full min-h-full bg-paper text-ink overflow-hidden", className)} {...props}>
      <svg className="absolute inset-0 w-full h-full opacity-15 pointer-events-none -z-10" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="polka-pat" width="32" height="32" patternUnits="userSpaceOnUse">
            <circle cx="8" cy="8" r="3" fill="currentColor" />
            <circle cx="24" cy="24" r="3" fill="currentColor" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#polka-pat)" />
      </svg>
      {children}
    </div>
  );
}
`,
    demo: `"use client";

import { PolkaDotPop } from "./polka-dot-pop";

export default function PolkaDotPopDemo() {
  return (
    <PolkaDotPop className="min-h-[260px] flex items-center justify-center p-8">
      <div className="p-6 rounded-xl border border-line bg-paper/90 backdrop-blur-md shadow-md text-center max-w-sm">
        <h3 className="text-sm font-bold font-sans text-ink">Staggered Polka</h3>
        <p className="text-xs text-ink/60 mt-1 font-sans">Dual row offset dot pattern.</p>
      </div>
    </PolkaDotPop>
  );
}
`,
  }),

  P("dappled-sunlight-caustics", {
    category: "backgrounds",
    subcategory: "ambient",
    title: "Dappled Sunlight Caustics",
    description: "Subtle forest canopy or water ripple dappled lighting caustics with soft blurred highlights.",
    tags: ["sunlight", "caustics", "ambient", "canopy", "lighting"],
    dependencies: ["react"],
    difficulty: "starter",
    dna: {
      genre: "organic",
      macrostructure: "full-bleed",
      density: "airy",
      shapeLanguage: "soft",
      motionLanguage: "subtle",
      typographyStyle: "humanist",
      colorStrategy: "muted-earth",
    },
    fingerprint: {
      interactionModel: "passive-caustic-lighting",
      visualModel: "dappled-sunlight-mask",
      motionModel: "none",
      layoutModel: "full-viewport-underlay",
      semanticPurpose: "natural-sunlight-caustics",
    },
    source: `"use client";

import { cn } from "@/lib/cn";

export interface DappledSunlightCausticsProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export function DappledSunlightCaustics({ className, children, ...props }: DappledSunlightCausticsProps) {
  return (
    <div className={cn("relative isolate w-full min-h-full bg-paper text-ink overflow-hidden", className)} {...props}>
      <div className="absolute inset-0 pointer-events-none -z-10 opacity-20">
        <div
          className="w-full h-full"
          style={{
            background: "radial-gradient(circle at 30% 30%, currentColor 0%, transparent 60%), radial-gradient(circle at 70% 60%, currentColor 0%, transparent 50%)",
            filter: "blur(40px)",
          }}
        />
      </div>
      {children}
    </div>
  );
}
`,
    demo: `"use client";

import { DappledSunlightCaustics } from "./dappled-sunlight-caustics";

export default function DappledSunlightCausticsDemo() {
  return (
    <DappledSunlightCaustics className="min-h-[260px] flex items-center justify-center p-8">
      <div className="p-6 rounded-xl border border-line bg-paper/90 backdrop-blur-md shadow-md text-center max-w-sm">
        <h3 className="text-sm font-bold font-serif text-ink">Canopy Light</h3>
        <p className="text-xs text-ink/60 mt-1 font-sans">Dappled organic sunbeam caustic diffusion.</p>
      </div>
    </DappledSunlightCaustics>
  );
}
`,
  }),

  P("perspective-infinity-grid", {
    category: "backgrounds",
    subcategory: "canvases",
    title: "Perspective Infinity Grid",
    description: "Classic 80s synthwave perspective vanishing point wireframe plane receding into the horizon.",
    tags: ["synthwave", "perspective", "horizon", "grid", "wireframe"],
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
      interactionModel: "passive-perspective-wireframe",
      visualModel: "vanishing-point-groundplane",
      motionModel: "none",
      layoutModel: "perspective-ground-tilt",
      semanticPurpose: "synthwave-horizon-grid",
    },
    source: `"use client";

import { cn } from "@/lib/cn";

export interface PerspectiveInfinityGridProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export function PerspectiveInfinityGrid({ className, children, ...props }: PerspectiveInfinityGridProps) {
  return (
    <div className={cn("relative isolate w-full min-h-full bg-slate-950 text-white overflow-hidden [perspective:500px]", className)} {...props}>
      <div
        className="absolute inset-0 top-1/3 [transform:rotateX(65deg)] origin-top pointer-events-none opacity-40 -z-10"
        style={{
          backgroundImage: "linear-gradient(to right, #8b5cf6 1px, transparent 1px), linear-gradient(to bottom, #8b5cf6 1px, transparent 1px)",
          backgroundSize: "36px 36px",
          maskImage: "linear-gradient(to bottom, black, transparent 90%)",
          WebkitMaskImage: "linear-gradient(to bottom, black, transparent 90%)",
        }}
      />
      {children}
    </div>
  );
}
`,
    demo: `"use client";

import { PerspectiveInfinityGrid } from "./perspective-infinity-grid";

export default function PerspectiveInfinityGridDemo() {
  return (
    <PerspectiveInfinityGrid className="min-h-[280px] flex items-center justify-center p-8">
      <div className="p-6 rounded-xl border border-purple-500/40 bg-black/70 backdrop-blur-md shadow-xl text-center max-w-sm">
        <h3 className="text-sm font-bold font-mono text-purple-400">Horizon Wireframe</h3>
        <p className="text-xs text-white/70 mt-1 font-mono">Vanishing point receding ground plane.</p>
      </div>
    </PerspectiveInfinityGrid>
  );
}
`,
  }),

  P("confetti-particle-field", {
    category: "backgrounds",
    subcategory: "canvases",
    title: "Confetti Particle Field",
    description: "Multi-colored geometric confetti squares drifting slowly downward across an celebratory canvas backdrop.",
    tags: ["confetti", "party", "canvas", "celebration", "particles"],
    dependencies: ["react"],
    difficulty: "intermediate",
    dna: {
      genre: "playful",
      macrostructure: "full-bleed",
      density: "airy",
      shapeLanguage: "cut",
      motionLanguage: "kinetic",
      typographyStyle: "grotesk",
      colorStrategy: "pastel",
    },
    fingerprint: {
      interactionModel: "passive-canvas-confetti",
      visualModel: "falling-geometric-flakes",
      motionModel: "downward-swaying-drift",
      layoutModel: "full-viewport-underlay",
      semanticPurpose: "celebratory-particle-field",
    },
    source: `"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/cn";

export interface ConfettiParticleFieldProps extends React.HTMLAttributes<HTMLDivElement> {
  count?: number;
  children?: React.ReactNode;
}

export function ConfettiParticleField({ count = 40, className, children, ...props }: ConfettiParticleFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let w = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let h = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    const colors = ["#ef4444", "#3b82f6", "#10b981", "#f59e0b", "#8b5cf6", "#ec4899"];
    const flakes = Array.from({ length: count }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      size: Math.random() * 6 + 4,
      color: colors[Math.floor(Math.random() * colors.length)] ?? "#3b82f6",
      speedY: Math.random() * 1.5 + 0.5,
      tilt: Math.random() * 10,
      tiltSpeed: Math.random() * 0.05 + 0.02,
    }));

    const render = () => {
      ctx.clearRect(0, 0, w, h);
      for (const f of flakes) {
        f.y += f.speedY;
        f.tilt += f.tiltSpeed;
        if (f.y > h) {
          f.y = -10;
          f.x = Math.random() * w;
        }

        ctx.fillStyle = f.color;
        ctx.fillRect(f.x, f.y, f.size, f.size * Math.sin(f.tilt));
      }
      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [count]);

  return (
    <div className={cn("relative isolate w-full min-h-full bg-paper text-ink overflow-hidden", className)} {...props}>
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none opacity-50 -z-10" />
      {children}
    </div>
  );
}
`,
    demo: `"use client";

import { ConfettiParticleField } from "./confetti-particle-field";

export default function ConfettiParticleFieldDemo() {
  return (
    <ConfettiParticleField className="min-h-[260px] flex items-center justify-center p-8">
      <div className="p-6 rounded-xl border border-line bg-paper/90 backdrop-blur-md shadow-md text-center max-w-sm">
        <h3 className="text-sm font-bold font-sans text-ink">Celebration Confetti</h3>
        <p className="text-xs text-ink/60 mt-1 font-sans">Slow fluttering geometric paper particles.</p>
      </div>
    </ConfettiParticleField>
  );
}
`,
  }),

  P("quantum-particle-web", {
    category: "backgrounds",
    subcategory: "canvases",
    title: "Quantum Particle Web",
    description: "Interactive constellation web connecting nearby drifting particles with dynamic threshold lines.",
    tags: ["constellation", "particles", "network", "canvas", "web"],
    dependencies: ["react"],
    difficulty: "intermediate",
    dna: {
      genre: "technical",
      macrostructure: "full-bleed",
      density: "airy",
      shapeLanguage: "pill",
      motionLanguage: "kinetic",
      typographyStyle: "monospace",
      colorStrategy: "high-contrast",
    },
    fingerprint: {
      interactionModel: "passive-canvas-particles",
      visualModel: "proximity-constellation-network",
      motionModel: "stochastic-particle-drift",
      layoutModel: "full-viewport-underlay",
      semanticPurpose: "network-graph-backdrop",
    },
    source: `"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/cn";

export interface QuantumParticleWebProps extends React.HTMLAttributes<HTMLDivElement> {
  nodeCount?: number;
  children?: React.ReactNode;
}

export function QuantumParticleWeb({ nodeCount = 35, className, children, ...props }: QuantumParticleWebProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let w = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let h = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    const nodes = Array.from({ length: nodeCount }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.8,
      vy: (Math.random() - 0.5) * 0.8,
    }));

    const render = () => {
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = "currentColor";

      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i]!;
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > w) n.vx *= -1;
        if (n.y < 0 || n.y > h) n.vy *= -1;

        ctx.beginPath();
        ctx.arc(n.x, n.y, 2, 0, Math.PI * 2);
        ctx.fill();

        for (let j = i + 1; j < nodes.length; j++) {
          const m = nodes[j]!;
          const dx = n.x - m.x;
          const dy = n.y - m.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 80) {
            ctx.strokeStyle = \`rgba(150, 150, 150, \${1 - dist / 80})\`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(n.x, n.y);
            ctx.lineTo(m.x, m.y);
            ctx.stroke();
          }
        }
      }
      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [nodeCount]);

  return (
    <div className={cn("relative isolate w-full min-h-full bg-paper text-ink overflow-hidden", className)} {...props}>
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none opacity-30 -z-10" />
      {children}
    </div>
  );
}
`,
    demo: `"use client";

import { QuantumParticleWeb } from "./quantum-particle-web";

export default function QuantumParticleWebDemo() {
  return (
    <QuantumParticleWeb className="min-h-[260px] flex items-center justify-center p-8">
      <div className="p-6 rounded-xl border border-line bg-paper/90 backdrop-blur-md shadow-md text-center max-w-sm">
        <h3 className="text-sm font-bold font-mono text-ink">Network Nodes</h3>
        <p className="text-xs text-ink/60 mt-1 font-sans">Dynamic proximity particle constellation web.</p>
      </div>
    </QuantumParticleWeb>
  );
}
`,
  }),

  P("linear-gradient-mesh", {
    category: "backgrounds",
    subcategory: "ambient",
    title: "Linear Gradient Mesh",
    description: "Smooth 4-corner multi-radial CSS mesh gradient blend for soft colorful backdrop glow.",
    tags: ["mesh", "gradient", "colors", "ambient", "modern"],
    dependencies: ["react"],
    difficulty: "starter",
    dna: {
      genre: "minimal",
      macrostructure: "full-bleed",
      density: "airy",
      shapeLanguage: "soft",
      motionLanguage: "none",
      typographyStyle: "grotesk",
      colorStrategy: "duotone",
    },
    fingerprint: {
      interactionModel: "passive-gradient-backdrop",
      visualModel: "four-corner-mesh-blend",
      motionModel: "none",
      layoutModel: "full-viewport-underlay",
      semanticPurpose: "modern-mesh-gradient",
    },
    source: `"use client";

import { cn } from "@/lib/cn";

export interface LinearGradientMeshProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export function LinearGradientMesh({ className, children, ...props }: LinearGradientMeshProps) {
  return (
    <div className={cn("relative isolate w-full min-h-full bg-paper text-ink overflow-hidden", className)} {...props}>
      <div
        className="absolute inset-0 pointer-events-none opacity-25 -z-10"
        style={{
          background: \`
            radial-gradient(at 0% 0%, rgba(59, 130, 246, 0.4) 0px, transparent 50%),
            radial-gradient(at 100% 0%, rgba(236, 72, 153, 0.4) 0px, transparent 50%),
            radial-gradient(at 100% 100%, rgba(16, 185, 129, 0.4) 0px, transparent 50%),
            radial-gradient(at 0% 100%, rgba(245, 158, 11, 0.4) 0px, transparent 50%)
          \`,
        }}
      />
      {children}
    </div>
  );
}
`,
    demo: `"use client";

import { LinearGradientMesh } from "./linear-gradient-mesh";

export default function LinearGradientMeshDemo() {
  return (
    <LinearGradientMesh className="min-h-[260px] flex items-center justify-center p-8">
      <div className="p-6 rounded-xl border border-line bg-paper/90 backdrop-blur-md shadow-md text-center max-w-sm">
        <h3 className="text-sm font-bold font-sans text-ink">4-Corner Mesh</h3>
        <p className="text-xs text-ink/60 mt-1 font-sans">Multi-anchor radial chromatic blend.</p>
      </div>
    </LinearGradientMesh>
  );
}
`,
  }),
];
