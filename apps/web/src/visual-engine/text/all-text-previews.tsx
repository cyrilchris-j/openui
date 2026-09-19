import * as React from "react";
import { GlitchType } from "./kinetic-type.js";
import { ScrambleDecryption } from "./scramble-decrypt.js";
import { SplitFlap } from "./split-flap.js";
import { ParticleText } from "./particle-text.js";
import { CountRoller } from "./count-roller.js";
import { TrueFocus } from "./true-focus.js";

// 1. text-loop
export function TextLoopPreview({ title = "Text Loop" }: { title?: string }) {
  return (
    <div className="w-full overflow-hidden whitespace-nowrap py-4 select-none">
      <div className="inline-flex gap-8 animate-marquee font-mono text-base font-bold text-ink uppercase tracking-wider">
        <span>✦ {title}</span>
        <span>⚡ RUNTIME MOTION</span>
        <span>◈ EDITORIAL ENGINE</span>
        <span>✦ {title}</span>
        <span>⚡ RUNTIME MOTION</span>
      </div>
    </div>
  );
}

// 2. masked-heading
export function MaskedHeadingPreview() {
  return (
    <div className="p-4 text-center select-none">
      <h2 className="font-display text-3xl font-black tracking-tight bg-gradient-to-r from-oxide via-amber-400 to-sky-400 bg-clip-text text-transparent animate-pulse">
        MASKED GRADIENT
      </h2>
      <p className="font-mono text-[10px] text-graphite mt-1">DYNAMIC CLIPPING MASK</p>
    </div>
  );
}

// 3. particle-text: <ParticleText text="OPENUI" />

// 4. split-flap-text: <SplitFlap words={["DEPART", "OPENUI", "FUTURE", "ARRIVE"]} />

// 5. warp-text
export function WarpTextPreview() {
  return (
    <div className="p-4 flex items-center justify-center select-none">
      <svg viewBox="0 0 400 80" className="w-full max-w-[320px]">
        <path id="curve" d="M 10,50 Q 100,10 200,50 Q 300,90 390,50" fill="transparent" />
        <text className="font-display font-bold text-2xl fill-ink">
          <textPath href="#curve" startOffset="5%">
            SPATIAL WARPED TYPOGRAPHY
          </textPath>
        </text>
      </svg>
    </div>
  );
}

// 6. stroke-text
export function StrokeTextPreview() {
  return (
    <div className="p-4 text-center select-none">
      <svg viewBox="0 0 300 60" className="w-full max-w-[280px]">
        <text
          x="50%"
          y="65%"
          textAnchor="middle"
          className="font-display font-black text-3xl fill-transparent stroke-oxide stroke-[1.5px] [stroke-dasharray:180] [stroke-dashoffset:180] animate-[dash_3s_ease-in-out_infinite_alternate]"
        >
          STROKE OUTLINE
        </text>
      </svg>
    </div>
  );
}

// 7. depth-text
export function DepthTextPreview() {
  return (
    <div className="p-4 text-center select-none">
      <h2
        className="font-display text-3xl font-black text-ink uppercase tracking-wider"
        style={{
          textShadow: `
            1px 1px 0px #ba442c,
            2px 2px 0px #ba442c,
            3px 3px 0px #ba442c,
            4px 4px 0px #1e293b,
            5px 5px 0px #1e293b,
            6px 6px 12px rgba(0,0,0,0.3)
          `,
        }}
      >
        EXTRUDED 3D
      </h2>
      <p className="font-mono text-[9px] text-graphite uppercase mt-2">ISOMETRIC DEPTH STACK</p>
    </div>
  );
}

// 8. fold-text
export function FoldTextPreview() {
  const [folded, setFolded] = React.useState(false);
  return (
    <div
      onMouseEnter={() => setFolded(true)}
      onMouseLeave={() => setFolded(false)}
      className="p-4 flex flex-col items-center justify-center cursor-pointer select-none"
    >
      <div className="relative font-display text-3xl font-bold text-ink">
        <span
          className={`block transition-transform duration-300 origin-bottom ${
            folded ? "rotate-x-90 opacity-40 text-oxide" : ""
          }`}
        >
          ORIGAMI FOLD
        </span>
      </div>
      <span className="font-mono text-[9px] text-graphite uppercase mt-1">HOVER TO FOLD</span>
    </div>
  );
}

// 9. echo-text
export function EchoTextPreview() {
  return (
    <div className="p-4 relative flex items-center justify-center select-none">
      <span className="absolute font-display font-black text-3xl text-oxide/20 translate-x-4 translate-y-2">
        ECHO CASCADE
      </span>
      <span className="absolute font-display font-black text-3xl text-oxide/40 translate-x-2 translate-y-1">
        ECHO CASCADE
      </span>
      <span className="relative font-display font-black text-3xl text-ink">
        ECHO CASCADE
      </span>
    </div>
  );
}

// 10. split-text-flow
export function SplitTextFlowPreview() {
  const words = ["STAGGERED", "KINETIC", "WORD", "FLOW"];
  return (
    <div className="p-4 flex flex-wrap items-center justify-center gap-2 select-none">
      {words.map((w, i) => (
        <span
          key={i}
          className="font-display font-bold text-lg text-ink px-2 py-0.5 rounded border border-line bg-surface/50 shadow-xs animate-pulse"
          style={{ animationDelay: `${i * 200}ms` }}
        >
          {w}
        </span>
      ))}
    </div>
  );
}

// 11. blur-text-flow
export function BlurTextFlowPreview() {
  return (
    <div className="p-4 text-center select-none group cursor-pointer">
      <h3 className="font-display font-bold text-2xl text-ink filter blur-[3px] group-hover:blur-none transition-all duration-300">
        OPTICAL FOCUS
      </h3>
      <span className="font-mono text-[9px] text-graphite uppercase mt-1 block">
        HOVER TO SHARPEN
      </span>
    </div>
  );
}

// 12. circular-text-orbit
export function CircularTextOrbitPreview() {
  return (
    <div className="relative w-32 h-32 flex items-center justify-center select-none">
      <div className="absolute inset-0 animate-[spin_8s_linear_infinite]">
        <svg viewBox="0 0 120 120" className="w-full h-full">
          <path id="circlePath" d="M 60,60 m -45,0 a 45,45 0 1,1 90,0 a 45,45 0 1,1 -90,0" fill="transparent" />
          <text className="font-mono text-[9px] font-bold fill-ink uppercase tracking-widest">
            <textPath href="#circlePath">✦ OPENUI ✦ ORBITAL MOTION ✦ DESIGN ✦</textPath>
          </text>
        </svg>
      </div>
      <div className="w-8 h-8 rounded-full bg-oxide/20 border border-oxide flex items-center justify-center text-xs font-mono text-oxide font-bold">
        ◈
      </div>
    </div>
  );
}

// 13. text-type-stack
export function TextTypeStackPreview() {
  const [text, setText] = React.useState("CREATIVE INTERACTION");
  return (
    <div className="p-4 text-center select-none font-mono">
      <div className="inline-flex items-center text-lg font-bold text-ink bg-surface px-3 py-1.5 rounded border border-line">
        <span>{text}</span>
        <span className="w-2 h-4 ml-1 bg-oxide animate-pulse" />
      </div>
      <p className="text-[9px] text-graphite uppercase mt-2">HUMAN CADENCE TYPEWRITER</p>
    </div>
  );
}

// 14. shuffle-decrypt: <ScrambleDecryption text="CYBERNETIC_TELEMETRY" speedMs={30} />

// 15. shiny-text-sheen
export function ShinyTextSheenPreview() {
  return (
    <div className="p-4 text-center select-none">
      <h2 className="relative font-display text-3xl font-black text-ink uppercase tracking-tight overflow-hidden inline-block">
        METALLIC SHEEN
        <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/80 to-transparent -translate-x-full animate-[shimmer_2.2s_infinite] pointer-events-none" />
      </h2>
      <p className="font-mono text-[9px] text-graphite uppercase mt-1">SPECULAR REFLECTION</p>
    </div>
  );
}

// 16. text-pressure-geo
export function TextPressureGeoPreview() {
  const [weight, setWeight] = React.useState(400);
  return (
    <div
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const pct = (e.clientX - rect.left) / rect.width;
        setWeight(Math.floor(200 + pct * 700));
      }}
      className="p-4 text-center select-none cursor-ew-resize"
    >
      <h2 className="font-display text-3xl text-ink transition-all duration-75" style={{ fontWeight: weight }}>
        VARIABLE WEIGHT
      </h2>
      <span className="font-mono text-[10px] text-oxide font-bold">WEIGHT: {weight}</span>
    </div>
  );
}

// 17. curved-loop-ribbon
export function CurvedLoopRibbonPreview() {
  return (
    <div className="p-3 w-full flex items-center justify-center select-none">
      <svg viewBox="0 0 320 70" className="w-full max-w-[300px]">
        <path id="ribbonPath" d="M 10,35 C 80,5 120,65 190,35 C 240,10 280,60 310,35" fill="none" stroke="#ba442c" strokeWidth="1" strokeDasharray="3 3" />
        <text className="font-mono text-xs font-bold fill-ink uppercase">
          <textPath href="#ribbonPath" startOffset="0%">
            ✦ HARMONIC BEZIER RIBBON ✦
          </textPath>
        </text>
      </svg>
    </div>
  );
}

// 18. fuzzy-noise-text
export function FuzzyNoiseTextPreview() {
  return (
    <div className="p-4 text-center select-none">
      <h2 className="font-mono text-3xl font-black text-ink tracking-widest relative">
        <span className="opacity-90">STATIC NOISE</span>
        <span className="absolute inset-0 text-oxide/40 filter blur-[1px] animate-pulse">
          STATIC NOISE
        </span>
      </h2>
      <p className="font-mono text-[9px] text-graphite uppercase mt-1">CRT PHOSPHOR GRAIN</p>
    </div>
  );
}

// 19. gradient-contour-text
export function GradientContourTextPreview() {
  return (
    <div className="p-4 text-center select-none">
      <h2 className="font-display text-3xl font-black tracking-tight text-paper [-webkit-text-stroke:1.5px_#ba442c] drop-shadow-[0_0_8px_rgba(186,68,44,0.5)]">
        CONTOUR GLOW
      </h2>
      <p className="font-mono text-[9px] text-oxide uppercase mt-1">NEON VECTOR SILHOUETTE</p>
    </div>
  );
}

// 20. falling-physics-text
export function FallingPhysicsTextPreview() {
  const letters = ["P", "H", "Y", "S", "I", "C", "S"];
  return (
    <div className="p-4 h-28 flex items-end justify-center gap-1.5 select-none border-b border-line">
      {letters.map((l, i) => (
        <span
          key={i}
          className="font-display font-black text-2xl text-ink px-1.5 py-0.5 rounded bg-surface border border-line/60 shadow-xs transform transition-transform hover:-translate-y-6 hover:rotate-12 cursor-pointer"
          style={{ transform: `rotate(${(i - 3) * 6}deg)` }}
        >
          {l}
        </span>
      ))}
    </div>
  );
}

// 21. text-cursor-follow
export function TextCursorFollowPreview() {
  const [pos, setPos] = React.useState({ x: 50, y: 50 });
  return (
    <div
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setPos({
          x: ((e.clientX - rect.left) / rect.width) * 100,
          y: ((e.clientY - rect.top) / rect.height) * 100,
        });
      }}
      className="relative w-full h-full p-4 overflow-hidden select-none cursor-crosshair flex items-center justify-center"
    >
      <span className="font-mono text-[10px] text-graphite">MOVE MOUSE INSIDE</span>
      <div
        className="absolute z-10 px-2.5 py-1 rounded-full bg-ink text-paper font-mono text-[10px] uppercase font-bold shadow-md pointer-events-none transition-all duration-75"
        style={{ left: `${pos.x}%`, top: `${pos.y}%`, transform: "translate(-50%, -50%)" }}
      >
        ✦ FOLLOWING
      </div>
    </div>
  );
}

// 22. decrypted-glyph-text
export function DecryptedGlyphTextPreview() {
  return (
    <div className="p-4 text-center font-mono select-none">
      <div className="text-xl font-bold text-emerald-400 bg-[#090d10] px-4 py-2 rounded-lg border border-emerald-950 inline-block">
        <span className="text-white">ACCESS:</span> GRANTED_0x4F
      </div>
      <p className="text-[9px] text-graphite uppercase mt-1">HEX CIPHER STREAM</p>
    </div>
  );
}

// 23. true-focus-lens: <TrueFocus sentence="DYNAMIC MOTION WITH OPTICAL FOCUS" />

// 24. scroll-float-type
export function ScrollFloatTypePreview() {
  return (
    <div className="p-4 flex items-center justify-center gap-1 select-none">
      {"FLOATING".split("").map((c, i) => (
        <span
          key={i}
          className="font-display font-bold text-2xl text-ink animate-bounce"
          style={{ animationDuration: `${1.4 + i * 0.15}s` }}
        >
          {c}
        </span>
      ))}
    </div>
  );
}

// 25. scroll-reveal-chars
export function ScrollRevealCharsPreview() {
  const [hovered, setHovered] = React.useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="p-4 text-center cursor-pointer select-none"
    >
      <div className="flex items-center justify-center gap-0.5">
        {"STAGGERED".split("").map((char, i) => (
          <span
            key={i}
            className={`font-display font-black text-2xl transition-all duration-300 transform ${
              hovered ? "translate-y-0 opacity-100 text-oxide" : "-translate-y-2 opacity-50 text-ink"
            }`}
            style={{ transitionDelay: `${i * 35}ms` }}
          >
            {char}
          </span>
        ))}
      </div>
      <span className="font-mono text-[9px] text-graphite uppercase mt-1 block">HOVER TO STAGGER</span>
    </div>
  );
}

// 26. ascii-render-text
export function AsciiRenderTextPreview() {
  return (
    <pre className="p-2 font-mono text-[9px] leading-[10px] text-center font-bold text-ink select-none overflow-hidden">
{`   ___  ___  ____ _  __ __  __ ____
  / _ \\/ _ \\/ __// |/ // / / //  _/
 / // / ___// _/ /    // /_/ /_/ /  
 \\___/_/   /___//_/|_/ \\____//___/  `}
    </pre>
  );
}

// 27. scrambled-kinetic-text
export function ScrambledKineticTextPreview() {
  return (
    <div className="p-4 text-center font-mono select-none">
      <ScrambleDecryption text="TELEMETRY // SPEED 120" speedMs={25} className="text-base font-bold text-oxide" />
      <span className="font-mono text-[9px] text-graphite uppercase mt-1 block">FAST ENTROPY TELEMETRY</span>
    </div>
  );
}

// 28. rotating-axis-text
export function RotatingAxisTextPreview() {
  const [flip, setFlip] = React.useState(false);
  return (
    <div
      onClick={() => setFlip(!flip)}
      className="p-4 flex flex-col items-center justify-center cursor-pointer select-none [perspective:800px]"
    >
      <div
        className={`px-5 py-2 rounded-lg bg-ink text-paper font-display text-xl font-bold transition-transform duration-500 [transform-style:preserve-3d] ${
          flip ? "[transform:rotateX(180deg)]" : ""
        }`}
      >
        {flip ? "SIDE B // REVERSE" : "SIDE A // PERSPECTIVE"}
      </div>
      <span className="font-mono text-[9px] text-graphite uppercase mt-2">CLICK TO 3D FLIP</span>
    </div>
  );
}

// 29. glitch-chromatic-text: <GlitchType text="CHROMATIC GLITCH" className="text-2xl font-display font-bold text-ink" />

// 30. scroll-velocity-skew
export function ScrollVelocitySkewPreview() {
  return (
    <div className="p-4 text-center select-none group cursor-pointer">
      <h2 className="font-display font-black text-3xl text-ink transform -skew-x-12 group-hover:skew-x-12 transition-transform duration-300">
        VELOCITY SKEW
      </h2>
      <span className="font-mono text-[9px] text-graphite uppercase mt-1 block">HOVER TO SKEW</span>
    </div>
  );
}

// 31. variable-proximity-sans
export function VariableProximitySansPreview() {
  const [spacing, setSpacing] = React.useState(2);
  return (
    <div
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const pct = (e.clientX - rect.left) / rect.width;
        setSpacing(Math.floor(pct * 14));
      }}
      className="p-4 text-center select-none cursor-ew-resize"
    >
      <h2
        className="font-display font-black text-2xl text-ink uppercase transition-all duration-75"
        style={{ letterSpacing: `${spacing}px` }}
      >
        PROXIMITY
      </h2>
      <span className="font-mono text-[9px] text-oxide uppercase font-bold">SPACING: {spacing}px</span>
    </div>
  );
}

// 32. count-up-roller: <CountRoller targetNumber={9824} />
