import * as React from "react";
import { SloshGauge } from "./slosh-gauge.js";
import { VoiceWaveform } from "./voice-waveform.js";
import { TactileJellyToggle } from "./tactile-jelly-toggle.js";
import { SlideCommit } from "./slide-commit.js";
import { RubberButton } from "./rubber-button.js";

// 1. infinite-spiral-canvas
export function InfiniteSpiralPreview() {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let angle = 0;
    let rafId: number;
    const render = () => {
      ctx.fillStyle = "rgba(10, 12, 18, 0.15)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const cx = canvas.width / 2;
      const cy = canvas.height / 2;
      ctx.strokeStyle = "#ba442c";
      ctx.lineWidth = 1.5;

      ctx.beginPath();
      for (let r = 0; r < 80; r += 1.5) {
        const a = r * 0.25 + angle;
        const x = cx + Math.cos(a) * r;
        const y = cy + Math.sin(a) * r;
        if (r === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      angle += 0.04;
      rafId = requestAnimationFrame(render);
    };
    render();
    return () => cancelAnimationFrame(rafId);
  }, []);

  return (
    <div className="relative w-full h-full flex items-center justify-center bg-[#07090e]">
      <canvas ref={canvasRef} width={240} height={160} className="w-full h-full" />
      <span className="absolute bottom-2 font-mono text-[9px] text-oxide uppercase font-bold">
        LOGARITHMIC SPIRAL
      </span>
    </div>
  );
}

// 2. depth-carousel-3d
export function DepthCarousel3DPreview() {
  const [active, setActive] = React.useState(1);
  return (
    <div className="w-full h-full p-4 flex items-center justify-center select-none [perspective:700px]">
      {[-1, 0, 1].map((offset) => {
        const idx = (active + offset + 3) % 3;
        const isCenter = offset === 0;
        return (
          <div
            key={offset}
            onClick={() => setActive(idx)}
            className={`w-28 h-36 rounded-xl border border-line bg-paper p-3 shadow-md cursor-pointer transition-all duration-300 flex flex-col justify-between ${
              isCenter
                ? "z-10 scale-105 shadow-xl border-oxide"
                : "opacity-60 scale-90 -translate-x-" + offset * 8
            }`}
            style={{
              transform: `translate3d(${offset * 40}px, 0, ${isCenter ? 0 : -60}px) rotateY(${offset * -18}deg)`,
            }}
          >
            <span className="font-mono text-[9px] text-graphite uppercase">CARD 0{idx + 1}</span>
            <div className="w-8 h-8 rounded-full bg-surface border border-line flex items-center justify-center font-mono text-xs">
              ◈
            </div>
            <span className="font-display font-bold text-xs text-ink">DEPTH 3D</span>
          </div>
        );
      })}
    </div>
  );
}

// 3. morph-slider-path
export function MorphSliderPathPreview() {
  const [val, setVal] = React.useState(50);
  return (
    <div className="p-4 w-full flex flex-col items-center justify-center select-none">
      <svg viewBox="0 0 240 60" className="w-full max-w-[240px]">
        <path
          d={`M 10,30 Q ${10 + (val / 100) * 220},${15 + (val % 20)} 230,30`}
          fill="none"
          stroke="#ba442c"
          strokeWidth="3"
        />
        <circle cx={10 + (val / 100) * 220} cy={30} r={8} fill="#1e293b" stroke="#ffffff" strokeWidth="2" />
      </svg>
      <input
        type="range"
        min={0}
        max={100}
        value={val}
        onChange={(e) => setVal(Number(e.target.value))}
        className="w-48 mt-2 accent-oxide cursor-pointer"
      />
      <span className="font-mono text-[9px] text-graphite mt-1">DRAG TO MORPH PATH</span>
    </div>
  );
}

// 4. drift-wall-parallax
export function DriftWallParallaxPreview() {
  const [tilt, setTilt] = React.useState({ x: 0, y: 0 });
  return (
    <div
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setTilt({
          x: ((e.clientX - rect.left) / rect.width - 0.5) * 20,
          y: ((e.clientY - rect.top) / rect.height - 0.5) * 20,
        });
      }}
      className="p-3 w-full h-full grid grid-cols-3 gap-2 items-center justify-center select-none cursor-pointer"
    >
      {[1, 2, 3, 4, 5, 6].map((n) => (
        <div
          key={n}
          className="h-14 rounded-lg bg-surface border border-line/60 flex items-center justify-center font-mono text-[9px] text-graphite shadow-xs transition-transform duration-75"
          style={{ transform: `translate3d(${tilt.x * (n * 0.15)}px, ${tilt.y * (n * 0.15)}px, 0)` }}
        >
          TILE 0{n}
        </div>
      ))}
    </div>
  );
}

// 5. accordion-gallery-split
export function AccordionGallerySplitPreview() {
  const [hovered, setHovered] = React.useState(0);
  return (
    <div className="p-3 w-full h-32 flex gap-1 select-none">
      {["ARCHITECTURAL", "TYPOGRAPHIC", "EDITORIAL"].map((title, i) => (
        <div
          key={i}
          onMouseEnter={() => setHovered(i)}
          className={`h-full rounded-lg border border-line p-2.5 transition-all duration-300 flex flex-col justify-between overflow-hidden cursor-pointer ${
            hovered === i ? "flex-[3] bg-ink text-paper" : "flex-[1] bg-surface text-graphite"
          }`}
        >
          <span className="font-mono text-[8px] uppercase">0{i + 1}</span>
          <span className="font-display font-bold text-xs whitespace-nowrap">{title}</span>
        </div>
      ))}
    </div>
  );
}

// 6. specular-button-lens
export function SpecularButtonLensPreview() {
  return (
    <div className="p-4 flex items-center justify-center select-none">
      <div className="relative px-6 py-3 rounded-2xl bg-gradient-to-tr from-oxide to-amber-500 text-white font-mono text-xs font-bold uppercase tracking-wider shadow-lg shadow-oxide/30 cursor-pointer overflow-hidden group">
        <span className="relative z-10 flex items-center gap-2">
          <span>✧</span> SPECULAR LENS
        </span>
        <div className="absolute inset-0 bg-white/20 translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
      </div>
    </div>
  );
}

// 7. option-wheel-3d
export function OptionWheel3DPreview() {
  const [selected, setSelected] = React.useState(2);
  const options = ["Editorial", "Spatial", "Kinetic", "Organic", "Swiss"];
  return (
    <div className="p-3 flex flex-col items-center justify-center select-none">
      <div className="w-40 h-24 border-y-2 border-oxide/40 flex flex-col items-center justify-center overflow-hidden py-1 relative">
        {[-1, 0, 1].map((offset) => {
          const idx = (selected + offset + options.length) % options.length;
          const isCenter = offset === 0;
          return (
            <div
              key={offset}
              onClick={() => setSelected(idx)}
              className={`font-display text-xs cursor-pointer py-1 transition-all ${
                isCenter
                  ? "text-base font-bold text-ink scale-110"
                  : "text-graphite/50 text-[11px]"
              }`}
            >
              {options[idx]}
            </div>
          );
        })}
      </div>
      <span className="font-mono text-[9px] text-graphite uppercase mt-1">CLICK TO ROTATE</span>
    </div>
  );
}

// 8. curved-input-field
export function CurvedInputFieldPreview() {
  const [focus, setFocus] = React.useState(false);
  return (
    <div className="p-4 w-full flex flex-col items-center justify-center select-none">
      <div
        className={`w-56 px-3.5 py-2 rounded-full border transition-all duration-300 flex items-center gap-2 bg-surface shadow-xs ${
          focus ? "border-oxide ring-2 ring-oxide/20" : "border-line"
        }`}
      >
        <span className="text-graphite font-mono text-xs">⌕</span>
        <input
          placeholder="Search components..."
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          className="bg-transparent text-xs text-ink outline-none w-full font-mono"
        />
      </div>
      <span className="font-mono text-[9px] text-graphite uppercase mt-2">CURVED FOCUS RING</span>
    </div>
  );
}

// 9. line-sidebar-rail
export function LineSidebarRailPreview() {
  const [active, setActive] = React.useState(0);
  const icons = ["⌘", "⚡", "◈", "⚙"];
  return (
    <div className="p-4 flex items-center justify-center select-none">
      <div className="p-1 rounded-2xl bg-surface border border-line flex gap-2 shadow-xs">
        {icons.map((icon, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`w-9 h-9 rounded-xl font-mono text-sm flex items-center justify-center transition-all ${
              active === i ? "bg-ink text-paper shadow-sm scale-105" : "text-graphite hover:text-ink"
            }`}
          >
            {icon}
          </button>
        ))}
      </div>
    </div>
  );
}

// 10. animated-list-stagger
export function AnimatedListStaggerPreview() {
  return (
    <div className="p-3 w-full max-w-[240px] space-y-1.5 select-none">
      {["Vector Shader", "Spring Matrix", "Spatial Camera"].map((name, i) => (
        <div
          key={i}
          className="px-3 py-1.5 rounded-lg border border-line bg-paper flex items-center justify-between text-xs font-mono shadow-xs"
        >
          <span className="text-ink font-medium">{name}</span>
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
        </div>
      ))}
    </div>
  );
}

// 11. scroll-stack-deck
export function ScrollStackDeckPreview() {
  return (
    <div className="p-3 relative w-36 h-28 flex flex-col items-center justify-center select-none cursor-pointer group">
      <div className="absolute w-32 h-16 rounded-xl bg-surface border border-line -top-1 transform -rotate-6 transition-transform group-hover:-rotate-12 shadow-xs" />
      <div className="absolute w-32 h-16 rounded-xl bg-surface border border-line top-2 transform rotate-3 transition-transform group-hover:rotate-6 shadow-xs" />
      <div className="relative w-32 h-16 rounded-xl bg-paper border border-line p-2 flex flex-col justify-between shadow-md">
        <span className="font-mono text-[9px] text-graphite uppercase">CARD STACK</span>
        <span className="font-display font-bold text-xs text-ink">HOVER TO FAN</span>
      </div>
    </div>
  );
}

// 12. bubble-menu-radial
export function BubbleMenuRadialPreview() {
  const [open, setOpen] = React.useState(false);
  return (
    <div className="relative w-32 h-32 flex items-center justify-center select-none">
      {open && (
        <>
          <div className="absolute -top-1 w-8 h-8 rounded-full bg-oxide text-white flex items-center justify-center text-xs shadow-md animate-bounce">
            ⚡
          </div>
          <div className="absolute -bottom-1 w-8 h-8 rounded-full bg-sky-500 text-white flex items-center justify-center text-xs shadow-md animate-bounce">
            ◈
          </div>
          <div className="absolute -left-1 w-8 h-8 rounded-full bg-indigo-500 text-white flex items-center justify-center text-xs shadow-md animate-bounce">
            ⌘
          </div>
        </>
      )}
      <button
        onClick={() => setOpen(!open)}
        className="relative z-10 w-12 h-12 rounded-full bg-ink text-paper font-bold text-base flex items-center justify-center shadow-lg transition-transform hover:scale-110 active:scale-95"
      >
        {open ? "✕" : "+"}
      </button>
    </div>
  );
}

// 13. reflective-card-foil
export function ReflectiveCardFoilPreview() {
  const [tilt, setTilt] = React.useState({ x: 0, y: 0 });
  return (
    <div
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setTilt({
          x: ((e.clientX - rect.left) / rect.width - 0.5) * 25,
          y: ((e.clientY - rect.top) / rect.height - 0.5) * -25,
        });
      }}
      className="p-3 select-none [perspective:600px]"
    >
      <div
        className="w-36 h-24 rounded-xl p-[1.5px] shadow-lg transition-transform duration-75"
        style={{
          background: `linear-gradient(${tilt.x * 4}deg, #ba442c, #38bdf8, #f59e0b)`,
          transform: `rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)`,
        }}
      >
        <div className="w-full h-full rounded-xl bg-black/85 p-2 flex flex-col justify-between text-white font-mono text-[10px]">
          <span className="text-amber-300 font-bold">★ HOLOGRAPHIC</span>
          <span className="font-display font-bold text-xs text-white">GEN-01 FOIL</span>
        </div>
      </div>
    </div>
  );
}

// 14. pill-nav-float
export function PillNavFloatPreview() {
  const [tab, setTab] = React.useState("Explore");
  const tabs = ["Explore", "Design", "Code"];
  return (
    <div className="p-4 select-none">
      <div className="p-1 rounded-full bg-surface border border-line flex gap-1 shadow-xs">
        {tabs.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-3.5 py-1 rounded-full text-xs font-mono transition-all ${
              tab === t ? "bg-ink text-paper font-semibold shadow-xs" : "text-graphite hover:text-ink"
            }`}
          >
            {t}
          </button>
        ))}
      </div>
    </div>
  );
}

// 15. tilted-card-perspective
export function TiltedCardPerspectivePreview() {
  const [rot, setRot] = React.useState({ x: 0, y: 0 });
  return (
    <div
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setRot({
          x: ((e.clientY - rect.top) / rect.height - 0.5) * -30,
          y: ((e.clientX - rect.left) / rect.width - 0.5) * 30,
        });
      }}
      onMouseLeave={() => setRot({ x: 0, y: 0 })}
      className="p-3 select-none [perspective:800px]"
    >
      <div
        className="w-40 h-24 rounded-xl bg-paper border border-line p-3 shadow-md transition-transform duration-100 flex flex-col justify-between"
        style={{ transform: `rotateX(${rot.x}deg) rotateY(${rot.y}deg)` }}
      >
        <span className="font-mono text-[9px] text-oxide font-bold">3D TILT MATRIX</span>
        <span className="font-display font-bold text-sm text-ink">PERSPECTIVE</span>
      </div>
    </div>
  );
}

// 16. bell-toggle-ring
export function BellToggleRingPreview() {
  const [ring, setRing] = React.useState(false);
  return (
    <div
      onMouseEnter={() => setRing(true)}
      onAnimationEnd={() => setRing(false)}
      className="p-4 flex flex-col items-center justify-center cursor-pointer select-none"
    >
      <div
        className={`w-12 h-12 rounded-full bg-surface border border-line flex items-center justify-center text-xl shadow-xs ${
          ring ? "animate-bounce text-oxide" : "text-ink"
        }`}
      >
        🔔
      </div>
      <span className="font-mono text-[9px] text-graphite uppercase mt-1">HOVER TO RING</span>
    </div>
  );
}

// 17. call-chip-pulse
export function CallChipPulsePreview() {
  return (
    <div className="p-4 flex items-center justify-center select-none">
      <div className="px-4 py-2 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 flex items-center gap-2.5 shadow-md">
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
        </span>
        <span className="font-mono text-xs font-bold">AUDIO STREAMING</span>
      </div>
    </div>
  );
}

// 18. status-mark-badge
export function StatusMarkBadgePreview() {
  return (
    <div className="p-4 flex items-center justify-center select-none">
      <div className="px-3.5 py-1.5 rounded-md border border-oxide/40 bg-oxide/10 text-oxide flex items-center gap-2 font-mono text-xs font-semibold shadow-xs">
        <span className="w-2 h-2 rounded-full bg-oxide animate-pulse" />
        STATUS: ONLINE
      </div>
    </div>
  );
}

// 19. glide-select-slider
export function GlideSelectSliderPreview() {
  const [active, setActive] = React.useState("Grid");
  return (
    <div className="p-4 select-none">
      <div className="p-1 rounded-xl bg-surface border border-line flex gap-1 shadow-xs">
        {["Grid", "List", "Tree"].map((m) => (
          <button
            key={m}
            onClick={() => setActive(m)}
            className={`px-3 py-1 rounded-lg text-xs font-mono transition-all ${
              active === m ? "bg-ink text-paper shadow-xs font-semibold" : "text-graphite"
            }`}
          >
            {m}
          </button>
        ))}
      </div>
    </div>
  );
}

// 20. pulse-heart-micro
export function PulseHeartMicroPreview() {
  const [liked, setLiked] = React.useState(false);
  return (
    <div
      onClick={() => setLiked(!liked)}
      className="p-4 flex flex-col items-center justify-center cursor-pointer select-none"
    >
      <div
        className={`w-12 h-12 rounded-full border border-line flex items-center justify-center text-2xl transition-transform ${
          liked ? "bg-rose-50 text-rose-500 scale-125 animate-ping" : "bg-surface text-graphite hover:scale-110"
        }`}
      >
        ♥
      </div>
      <span className="font-mono text-[9px] text-graphite uppercase mt-1">CLICK TO PULSE</span>
    </div>
  );
}

// 21. spring-check-box
export function SpringCheckBoxPreview() {
  const [checked, setChecked] = React.useState(true);
  return (
    <div
      onClick={() => setChecked(!checked)}
      className="p-4 flex items-center justify-center gap-3 cursor-pointer select-none"
    >
      <div
        className={`w-7 h-7 rounded-lg border-2 flex items-center justify-center text-sm font-bold transition-all ${
          checked ? "bg-oxide border-oxide text-white scale-110 shadow-sm" : "border-line bg-surface text-transparent"
        }`}
      >
        ✓
      </div>
      <span className="font-mono text-xs font-semibold text-ink">SPRING CHECKBOX</span>
    </div>
  );
}

// 22. peek-rating-stars
export function PeekRatingStarsPreview() {
  const [rating, setRating] = React.useState(4);
  return (
    <div className="p-4 flex flex-col items-center justify-center select-none">
      <div className="flex gap-1.5 text-xl cursor-pointer">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            onClick={() => setRating(star)}
            className={`transition-transform hover:scale-125 ${
              star <= rating ? "text-amber-400" : "text-line"
            }`}
          >
            ★
          </span>
        ))}
      </div>
      <span className="font-mono text-[9px] text-graphite uppercase mt-1">{rating} OF 5 STARS</span>
    </div>
  );
}

// 23. magic-bento-spotlight
export function MagicBentoSpotlightPreview() {
  const [mouse, setMouse] = React.useState({ x: 0, y: 0 });
  return (
    <div
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setMouse({ x: e.clientX - rect.left, y: e.clientY - rect.top });
      }}
      className="relative p-3 w-full max-w-[280px] grid grid-cols-2 gap-2 select-none overflow-hidden rounded-xl bg-surface/50 border border-line/50"
    >
      <div
        className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(180px circle at ${mouse.x}px ${mouse.y}px, rgba(186,68,44,0.15), transparent 80%)`,
        }}
      />
      <div className="col-span-2 p-2.5 rounded-lg bg-paper border border-line flex items-center justify-between">
        <div>
          <span className="font-mono text-[8px] text-oxide uppercase font-bold">TELEMETRY</span>
          <p className="font-display font-bold text-xs text-ink">Bento Core Hub</p>
        </div>
        <span className="font-mono text-xs text-emerald-500 font-bold">99.8%</span>
      </div>
      <div className="p-2 rounded-lg bg-paper border border-line">
        <span className="font-mono text-[8px] text-graphite">SPEED</span>
        <p className="font-mono text-xs font-bold text-ink mt-0.5">120 FPS</p>
      </div>
      <div className="p-2 rounded-lg bg-paper border border-line">
        <span className="font-mono text-[8px] text-graphite">LATENCY</span>
        <p className="font-mono text-xs font-bold text-oxide mt-0.5">0.4ms</p>
      </div>
    </div>
  );
}

// 24. circular-gallery-carousel
export function CircularGalleryCarouselPreview() {
  const [active, setActive] = React.useState(0);
  const items = ["SPATIAL", "KINETIC", "SURFACE", "OPTICAL"];
  return (
    <div className="relative w-full h-32 flex items-center justify-center select-none overflow-hidden">
      <div className="flex gap-2 items-center">
        {items.map((item, i) => (
          <div
            key={i}
            onClick={() => setActive(i)}
            className={`cursor-pointer transition-all duration-300 rounded-xl border p-2.5 text-center flex flex-col justify-between ${
              active === i
                ? "w-28 h-28 bg-ink text-paper border-ink scale-105 shadow-lg z-10"
                : "w-20 h-20 bg-paper text-graphite border-line opacity-60 scale-90"
            }`}
          >
            <span className="font-mono text-[8px] uppercase">0{i + 1}</span>
            <span className="font-display font-bold text-[11px] truncate">{item}</span>
            <span className="font-mono text-[7px] text-oxide">3D VIEW</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// 25. card-nav-expand
export function CardNavExpandPreview() {
  const [open, setOpen] = React.useState(false);
  return (
    <div className="p-4 select-none">
      <div
        onClick={() => setOpen(!open)}
        className={`cursor-pointer rounded-2xl bg-paper border border-line transition-all duration-300 p-3 shadow-sm ${
          open ? "w-60 shadow-xl border-oxide" : "w-40"
        }`}
      >
        <div className="flex items-center justify-between">
          <span className="font-display font-bold text-xs text-ink">Navigation</span>
          <span className="font-mono text-xs text-oxide">{open ? "▲" : "▼"}</span>
        </div>
        {open && (
          <div className="mt-2.5 pt-2 border-t border-line/60 flex flex-col gap-1.5 font-mono text-[10px]">
            <span className="hover:text-oxide cursor-pointer">◈ Architecture</span>
            <span className="hover:text-oxide cursor-pointer">⚡ Performance</span>
            <span className="hover:text-oxide cursor-pointer">⌘ Registry 2.0</span>
          </div>
        )}
      </div>
    </div>
  );
}

// 26. stack-cards-drag
export function StackCardsDragPreview() {
  const [cards, setCards] = React.useState(["Layer Alpha", "Layer Beta", "Layer Gamma"]);
  const cycle = () => {
    setCards((prev) => [prev[1] ?? "Alpha", prev[2] ?? "Beta", prev[0] ?? "Gamma"]);
  };
  return (
    <div onClick={cycle} className="relative w-40 h-24 select-none cursor-pointer">
      <div className="absolute inset-x-2 top-0 h-20 rounded-xl bg-surface border border-line transform rotate-3 shadow-xs" />
      <div className="absolute inset-x-1 top-1 h-20 rounded-xl bg-surface border border-line transform -rotate-2 shadow-xs" />
      <div className="absolute inset-0 h-20 rounded-xl bg-paper border border-line p-3 flex flex-col justify-between shadow-md hover:scale-102 transition-transform">
        <span className="font-mono text-[8px] text-oxide font-bold uppercase">CLICK TO CYCLE</span>
        <span className="font-display font-bold text-xs text-ink">{cards[0]}</span>
        <span className="font-mono text-[8px] text-graphite">3 CARDS IN DECK</span>
      </div>
    </div>
  );
}

// 27. fluid-glass-surface
export function FluidGlassSurfacePreview() {
  return (
    <div className="relative w-full h-full flex items-center justify-center p-4 bg-gradient-to-tr from-oxide/20 via-sky-500/10 to-amber-500/20">
      <div className="relative w-48 p-4 rounded-2xl bg-white/30 backdrop-blur-xl border border-white/60 shadow-lg text-center select-none">
        <span className="font-mono text-[9px] text-ink uppercase tracking-wider font-bold">FROSTED ACRYLIC</span>
        <h4 className="font-display font-black text-sm text-ink mt-0.5">Fluid Refraction</h4>
        <span className="inline-block mt-2 px-2 py-0.5 rounded-full bg-ink text-paper font-mono text-[8px]">
          BLUR 24PX
        </span>
      </div>
    </div>
  );
}

// 28. masonry-grid-fluid
export function MasonryGridFluidPreview() {
  return (
    <div className="p-3 w-full max-w-[260px] grid grid-cols-3 gap-1.5 select-none">
      <div className="h-16 rounded-lg bg-surface border border-line/60 p-1 flex items-end">
        <span className="font-mono text-[7px] text-graphite">01</span>
      </div>
      <div className="h-24 rounded-lg bg-paper border border-oxide/50 p-1 flex items-end shadow-xs">
        <span className="font-mono text-[7px] text-oxide font-bold">02 HERO</span>
      </div>
      <div className="h-14 rounded-lg bg-surface border border-line/60 p-1 flex items-end">
        <span className="font-mono text-[7px] text-graphite">03</span>
      </div>
      <div className="h-20 rounded-lg bg-paper border border-line/60 p-1 flex items-end">
        <span className="font-mono text-[7px] text-graphite">04</span>
      </div>
      <div className="h-14 rounded-lg bg-surface border border-line/60 p-1 flex items-end">
        <span className="font-mono text-[7px] text-graphite">05</span>
      </div>
      <div className="h-22 rounded-lg bg-surface border border-line/60 p-1 flex items-end">
        <span className="font-mono text-[7px] text-graphite">06</span>
      </div>
    </div>
  );
}

// 29. glass-surface-acrylic
export function GlassSurfaceAcrylicPreview() {
  return (
    <div className="p-4 flex items-center justify-center select-none">
      <div className="w-52 p-3.5 rounded-xl bg-paper/70 backdrop-blur-md border border-line shadow-sm relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-oxide to-transparent" />
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-oxide" />
          <span className="font-display font-bold text-xs text-ink">Acrylic Glass Panel</span>
        </div>
        <p className="font-mono text-[9px] text-graphite mt-1.5">Chromatic border reflection with dual-layer blur.</p>
      </div>
    </div>
  );
}

// 30. chroma-grid-fresnel
export function ChromaGridFresnelPreview() {
  const [hoverIdx, setHoverIdx] = React.useState<number | null>(null);
  return (
    <div className="p-3 grid grid-cols-4 gap-1.5 select-none">
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          onMouseEnter={() => setHoverIdx(i)}
          onMouseLeave={() => setHoverIdx(null)}
          className={`w-11 h-11 rounded-lg border transition-all duration-300 flex items-center justify-center font-mono text-[9px] cursor-pointer ${
            hoverIdx === i
              ? "bg-gradient-to-tr from-oxide via-amber-400 to-sky-400 text-white font-bold scale-110 shadow-md border-transparent"
              : "bg-surface border-line text-graphite"
          }`}
        >
          0{i + 1}
        </div>
      ))}
    </div>
  );
}

// 31. folder-tree-interactive
export function FolderTreeInteractivePreview() {
  const [open, setOpen] = React.useState(true);
  return (
    <div className="p-3 w-48 rounded-xl bg-paper border border-line font-mono text-xs select-none shadow-xs">
      <div onClick={() => setOpen(!open)} className="flex items-center gap-1.5 cursor-pointer font-bold text-ink">
        <span className="text-oxide">{open ? "📂" : "📁"}</span>
        <span>src/components</span>
      </div>
      {open && (
        <div className="ml-4 mt-1.5 pl-2 border-l border-line/60 flex flex-col gap-1 text-[10px] text-graphite">
          <span className="hover:text-ink cursor-pointer">📄 MotionCanvas.tsx</span>
          <span className="hover:text-ink cursor-pointer">📄 SpringSlider.tsx</span>
          <span className="hover:text-ink cursor-pointer">📄 WebGLViewer.tsx</span>
        </div>
      )}
    </div>
  );
}

// 32. staggered-menu-cascade
export function StaggeredMenuCascadePreview() {
  const items = ["ARCHITECTURE", "INTERACTION", "COMPONENTS", "ENGINE"];
  return (
    <div className="p-3 flex flex-col items-center justify-center gap-1 select-none">
      {items.map((item, i) => (
        <span
          key={i}
          className="font-display font-black text-sm text-ink hover:text-oxide hover:translate-x-2 transition-all cursor-pointer"
        >
          ✦ {item}
        </span>
      ))}
    </div>
  );
}

// 33. lanyard-card-spring
export function LanyardCardSpringPreview() {
  const [rock, setRock] = React.useState(false);
  return (
    <div
      onMouseEnter={() => setRock(true)}
      onAnimationEnd={() => setRock(false)}
      className="p-3 flex flex-col items-center justify-center cursor-pointer select-none"
    >
      <div className="w-1 h-5 bg-oxide rounded-full" />
      <div
        className={`w-28 h-20 rounded-xl bg-paper border border-line p-2 flex flex-col justify-between shadow-md origin-top ${
          rock ? "animate-[wiggle_0.8s_ease-in-out]" : ""
        }`}
      >
        <div className="flex items-center justify-between">
          <span className="font-mono text-[7px] text-oxide font-bold">PASS 049</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
        </div>
        <span className="font-display font-bold text-[11px] text-ink">PHYSICS ID</span>
        <span className="font-mono text-[7px] text-graphite">HOVER TO SWING</span>
      </div>
    </div>
  );
}

// 34. profile-card-holo
export function ProfileCardHoloPreview() {
  return (
    <div className="p-3 select-none">
      <div className="w-44 h-26 rounded-2xl bg-gradient-to-tr from-[#111] via-[#222] to-[#111] border border-oxide/40 p-3 shadow-lg flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-oxide/30 border border-oxide flex items-center justify-center text-white font-mono text-sm font-bold">
          ⚡
        </div>
        <div>
          <span className="font-display font-bold text-xs text-white">Cyber Engineer</span>
          <p className="font-mono text-[9px] text-oxide">LEVEL 9 ARCHITECT</p>
          <span className="font-mono text-[8px] text-emerald-400">ACTIVE SESSION</span>
        </div>
      </div>
    </div>
  );
}

// 35. gooey-nav-liquid
export function GooeyNavLiquidPreview() {
  const [pos, setPos] = React.useState(0);
  return (
    <div className="p-3 select-none">
      <div className="relative p-1.5 rounded-full bg-surface border border-line flex gap-2 shadow-xs">
        {["Home", "Motion", "Canvas", "3D"].map((tab, i) => (
          <button
            key={tab}
            onClick={() => setPos(i)}
            className={`relative z-10 px-3 py-1 rounded-full font-mono text-xs transition-colors duration-200 ${
              pos === i ? "text-paper font-bold" : "text-graphite hover:text-ink"
            }`}
          >
            {tab}
          </button>
        ))}
        <div
          className="absolute top-1.5 bottom-1.5 rounded-full bg-ink transition-all duration-300 ease-out"
          style={{
            left: `${6 + pos * 58}px`,
            width: "50px",
          }}
        />
      </div>
    </div>
  );
}

// 36. pixel-card-retro
export function PixelCardRetroPreview() {
  return (
    <div className="p-3 select-none">
      <div className="w-44 h-26 rounded border-2 border-ink bg-paper p-2.5 font-mono shadow-[4px_4px_0px_#1e293b] hover:shadow-[6px_6px_0px_#ba442c] transition-all">
        <div className="flex items-center justify-between text-[8px] font-bold text-oxide">
          <span>8-BIT RETRO</span>
          <span>1989</span>
        </div>
        <p className="font-black text-xs text-ink mt-1">PIXEL DITHER</p>
        <span className="inline-block mt-2 text-[9px] bg-ink text-paper px-1.5 py-0.5">PRESS START</span>
      </div>
    </div>
  );
}

// 37. kinetic-carousel-swipe
export function KineticCarouselSwipePreview() {
  const [offset, setOffset] = React.useState(0);
  return (
    <div className="p-3 flex flex-col items-center select-none">
      <div className="flex gap-2 overflow-hidden w-48 justify-center">
        {[-1, 0, 1].map((i) => (
          <div
            key={i}
            onClick={() => setOffset((prev) => (prev + 1) % 3)}
            className="w-20 h-24 rounded-xl border border-line bg-paper p-2 flex flex-col justify-between shadow-xs cursor-pointer hover:border-oxide transition-colors"
          >
            <span className="font-mono text-[8px] text-graphite">ITEM 0{(i + offset + 3) % 3 + 1}</span>
            <span className="font-display font-bold text-xs text-ink">SWIPE</span>
            <span className="font-mono text-[7px] text-oxide">CLICK NEXT</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// 38. spotlight-card-interactive
export function SpotlightCardInteractivePreview() {
  const [pos, setPos] = React.useState({ x: 50, y: 50 });
  return (
    <div
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        setPos({ x: e.clientX - r.left, y: e.clientY - r.top });
      }}
      className="relative w-48 h-28 rounded-xl border border-line bg-paper p-3 select-none shadow-sm overflow-hidden"
    >
      <div
        className="pointer-events-none absolute -inset-px rounded-xl"
        style={{
          background: `radial-gradient(120px circle at ${pos.x}px ${pos.y}px, rgba(186,68,44,0.18), transparent 70%)`,
        }}
      />
      <span className="font-mono text-[8px] text-oxide uppercase font-bold">RADIAL SPOTLIGHT</span>
      <h4 className="font-display font-bold text-xs text-ink mt-1">Cursor Tracking</h4>
      <p className="font-mono text-[9px] text-graphite mt-1">Light blooms dynamically beneath mouse.</p>
    </div>
  );
}

// 39. border-glow-card-pulse
export function BorderGlowCardPulsePreview() {
  return (
    <div className="p-3 select-none">
      <div className="relative p-[1.5px] rounded-2xl overflow-hidden shadow-md">
        <div className="absolute inset-0 bg-gradient-to-r from-oxide via-amber-400 to-sky-400 animate-pulse" />
        <div className="relative px-5 py-3.5 rounded-[14px] bg-paper text-ink">
          <span className="font-mono text-[8px] text-oxide font-bold uppercase">AMBIENT HALO</span>
          <h4 className="font-display font-bold text-xs text-ink mt-0.5">Luminous Border</h4>
          <span className="font-mono text-[8px] text-graphite">BREATHING CYCLE</span>
        </div>
      </div>
    </div>
  );
}

// 40. flying-posters-gallery
export function FlyingPostersGalleryPreview() {
  return (
    <div className="relative w-full h-32 flex items-center justify-center select-none [perspective:600px] overflow-hidden">
      <div className="w-20 h-28 rounded-lg bg-surface border border-line absolute -translate-x-12 [transform:rotateY(25deg)] shadow-xs opacity-70" />
      <div className="w-22 h-30 rounded-lg bg-paper border-2 border-oxide absolute z-10 p-2 flex flex-col justify-between shadow-xl">
        <span className="font-mono text-[7px] text-oxide font-bold">POSTER 01</span>
        <span className="font-display font-black text-xs text-ink text-center">3D FLY</span>
        <span className="font-mono text-[7px] text-graphite text-right">2026</span>
      </div>
      <div className="w-20 h-28 rounded-lg bg-surface border border-line absolute translate-x-12 [transform:rotateY(-25deg)] shadow-xs opacity-70" />
    </div>
  );
}

// 41. card-swap-deck
export function CardSwapDeckPreview() {
  const [swapped, setSwapped] = React.useState(false);
  return (
    <div onClick={() => setSwapped(!swapped)} className="relative w-40 h-24 select-none cursor-pointer">
      <div
        className={`absolute inset-0 rounded-xl bg-surface border border-line p-3 transition-all duration-500 shadow-sm ${
          swapped ? "z-10 translate-x-3 -translate-y-2 scale-102 border-oxide" : "z-0 -translate-x-3 translate-y-2 opacity-60"
        }`}
      >
        <span className="font-mono text-[8px] text-oxide font-bold">CARD B</span>
        <p className="font-display font-bold text-xs text-ink mt-1">Secondary View</p>
      </div>
      <div
        className={`absolute inset-0 rounded-xl bg-paper border border-line p-3 transition-all duration-500 shadow-md ${
          swapped ? "z-0 -translate-x-3 translate-y-2 opacity-60" : "z-10 translate-x-3 -translate-y-2 scale-102 border-ink"
        }`}
      >
        <span className="font-mono text-[8px] text-ink font-bold">CARD A</span>
        <p className="font-display font-bold text-xs text-ink mt-1">Primary Face</p>
        <span className="font-mono text-[7px] text-graphite block mt-1">CLICK TO SWAP</span>
      </div>
    </div>
  );
}

// 42. glass-icons-iridescent
export function GlassIconsIridescentPreview() {
  return (
    <div className="p-3 flex items-center justify-center gap-3 select-none">
      {["⚡", "◈", "⌘"].map((sym, i) => (
        <div
          key={i}
          className="w-12 h-12 rounded-2xl bg-white/40 backdrop-blur-md border border-white/80 flex items-center justify-center text-lg shadow-md hover:scale-115 transition-transform cursor-pointer"
        >
          {sym}
        </div>
      ))}
    </div>
  );
}

// 43. decay-card-friction
export function DecayCardFrictionPreview() {
  const [x, setX] = React.useState(0);
  return (
    <div className="p-3 flex flex-col items-center select-none">
      <div
        onClick={() => setX((prev) => (prev === 0 ? 30 : 0))}
        className="w-44 h-20 rounded-xl bg-paper border border-line p-3 shadow-md cursor-pointer transition-all duration-700 ease-out"
        style={{ transform: `translateX(${x}px)` }}
      >
        <span className="font-mono text-[8px] text-oxide font-bold uppercase">INERTIA FRICTION</span>
        <p className="font-display font-bold text-xs text-ink mt-0.5">Click to Glide</p>
        <span className="font-mono text-[8px] text-graphite">DAMPING COEFFICIENT: 0.92</span>
      </div>
    </div>
  );
}

// 44. flowing-menu-hover
export function FlowingMenuHoverPreview() {
  const [hovered, setHovered] = React.useState<string | null>(null);
  return (
    <div className="p-3 w-48 flex flex-col gap-1 select-none">
      {["Showcase", "Telemetry", "Playground"].map((item) => (
        <div
          key={item}
          onMouseEnter={() => setHovered(item)}
          onMouseLeave={() => setHovered(null)}
          className="flex items-center justify-between p-1.5 rounded-lg hover:bg-surface transition-colors cursor-pointer"
        >
          <span className="font-display font-semibold text-xs text-ink">{item}</span>
          {hovered === item && <span className="font-mono text-[9px] text-oxide font-bold animate-pulse">✦ VIEW</span>}
        </div>
      ))}
    </div>
  );
}

// 45. elastic-slider-rebound
export function ElasticSliderReboundPreview() {
  const [val, setVal] = React.useState(60);
  return (
    <div className="p-3 w-48 flex flex-col items-center select-none">
      <div className="flex items-center justify-between w-full font-mono text-[9px] text-graphite mb-1">
        <span>RUBBER REBOUND</span>
        <span className="text-oxide font-bold">{val}%</span>
      </div>
      <input
        type="range"
        min={0}
        max={100}
        value={val}
        onChange={(e) => setVal(Number(e.target.value))}
        className="w-full accent-oxide cursor-pointer"
      />
    </div>
  );
}

// 46. infinite-menu-marquee
export function InfiniteMenuMarqueePreview() {
  return (
    <div className="w-full overflow-hidden py-3 select-none">
      <div className="inline-flex gap-4 animate-marquee font-mono text-xs font-bold text-ink whitespace-nowrap">
        <span>✦ DESIGN REGISTRY</span>
        <span>⚡ RUNTIME SHADERS</span>
        <span>◈ SPATIAL 3D</span>
        <span>✦ DESIGN REGISTRY</span>
        <span>⚡ RUNTIME SHADERS</span>
      </div>
    </div>
  );
}

// 47. stepper-control-tactile
export function StepperControlTactilePreview() {
  const [count, setCount] = React.useState(12);
  return (
    <div className="p-3 select-none">
      <div className="p-1 rounded-xl bg-surface border border-line flex items-center gap-3 shadow-xs">
        <button
          onClick={() => setCount((c) => Math.max(0, c - 1))}
          className="w-7 h-7 rounded-lg bg-paper border border-line text-xs font-bold hover:border-oxide transition-colors"
        >
          -
        </button>
        <span className="font-mono text-sm font-bold text-ink min-w-[28px] text-center">{count}</span>
        <button
          onClick={() => setCount((c) => c + 1)}
          className="w-7 h-7 rounded-lg bg-paper border border-line text-xs font-bold hover:border-oxide transition-colors"
        >
          +
        </button>
      </div>
    </div>
  );
}

// 48. bounce-cards-stack
export function BounceCardsStackPreview() {
  const [fan, setFan] = React.useState(false);
  return (
    <div
      onMouseEnter={() => setFan(true)}
      onMouseLeave={() => setFan(false)}
      className="relative w-40 h-28 flex items-center justify-center select-none cursor-pointer"
    >
      {[-20, 0, 20].map((deg, i) => (
        <div
          key={i}
          className="absolute w-20 h-26 rounded-xl bg-paper border border-line p-2 flex flex-col justify-between shadow-md transition-transform duration-300"
          style={{
            transform: fan ? `rotate(${deg}deg) translateY(-8px)` : `rotate(${deg * 0.2}deg)`,
          }}
        >
          <span className="font-mono text-[7px] text-oxide">0{i + 1}</span>
          <span className="font-display font-bold text-[10px] text-ink">FAN</span>
          <span className="font-mono text-[7px] text-graphite">BOUNCE</span>
        </div>
      ))}
    </div>
  );
}

// 49. branched-menu-tree
export function BranchedMenuTreePreview() {
  return (
    <div className="p-3 w-48 font-mono text-[10px] select-none text-ink">
      <div className="font-bold text-xs flex items-center gap-1 text-oxide">
        <span>◆</span> Root Branch
      </div>
      <div className="ml-3 pl-2 border-l border-line flex flex-col gap-1 mt-1 text-graphite">
        <span className="hover:text-ink cursor-pointer">├─ 01 Physics Core</span>
        <span className="hover:text-ink cursor-pointer">├─ 02 Shader Pipeline</span>
        <span className="hover:text-ink cursor-pointer">└─ 03 Spatial Mesh</span>
      </div>
    </div>
  );
}

// 50. folder-float-hover
export function FolderFloatHoverPreview() {
  return (
    <div className="p-3 select-none group cursor-pointer">
      <div className="w-36 h-24 rounded-2xl bg-paper border border-line p-3 shadow-sm group-hover:-translate-y-2 group-hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <span className="text-xl">📁</span>
          <span className="font-mono text-[8px] text-oxide font-bold">ACTIVE</span>
        </div>
        <div>
          <span className="font-display font-bold text-xs text-ink">Workflows</span>
          <span className="font-mono text-[8px] text-graphite block">8 items inside</span>
        </div>
      </div>
    </div>
  );
}

// 51. refine-frame-slider
export function RefineFrameSliderPreview() {
  const [pos, setPos] = React.useState(50);
  return (
    <div className="relative w-48 h-28 rounded-xl border border-line overflow-hidden select-none">
      <div className="absolute inset-0 bg-ink text-paper p-3 flex flex-col justify-between">
        <span className="font-mono text-[8px] text-oxide">BEFORE</span>
        <span className="font-display font-bold text-xs">Wireframe Model</span>
      </div>
      <div
        className="absolute inset-y-0 left-0 bg-paper text-ink p-3 flex flex-col justify-between border-r-2 border-oxide"
        style={{ width: `${pos}%` }}
      >
        <span className="font-mono text-[8px] text-emerald-600">AFTER</span>
        <span className="font-display font-bold text-xs truncate">Shaded Render</span>
      </div>
      <input
        type="range"
        min={10}
        max={90}
        value={pos}
        onChange={(e) => setPos(Number(e.target.value))}
        className="absolute bottom-2 inset-x-2 accent-oxide opacity-70"
      />
    </div>
  );
}

// 52. thought-line-canvas
export function ThoughtLineCanvasPreview() {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let t = 0;
    let id: number;
    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = "#ba442c";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      for (let x = 10; x < canvas.width - 10; x += 5) {
        const y = canvas.height / 2 + Math.sin(x * 0.05 + t) * 18 + Math.cos(x * 0.02 + t * 0.7) * 10;
        if (x === 10) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
      t += 0.04;
      id = requestAnimationFrame(render);
    };
    render();
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <div className="relative w-full h-full flex items-center justify-center bg-paper">
      <canvas ref={canvasRef} width={220} height={120} />
      <span className="absolute bottom-2 font-mono text-[8px] text-graphite uppercase">GENERATIVE THOUGHT LINE</span>
    </div>
  );
}

// 53. prompt-bar-action
export function PromptBarActionPreview() {
  return (
    <div className="p-3 w-56 select-none">
      <div className="p-2 rounded-2xl bg-paper border border-line shadow-sm flex flex-col gap-2">
        <input
          placeholder="Ask OpenUI agent..."
          className="bg-transparent font-mono text-xs text-ink outline-none px-1"
        />
        <div className="flex items-center justify-between pt-1 border-t border-line/60">
          <div className="flex gap-1">
            <span className="px-1.5 py-0.5 rounded bg-surface text-[8px] font-mono text-graphite">⚡ 3D</span>
            <span className="px-1.5 py-0.5 rounded bg-surface text-[8px] font-mono text-graphite">◈ Canvas</span>
          </div>
          <button className="w-5 h-5 rounded-full bg-oxide text-white text-[10px] flex items-center justify-center font-bold">
            ↑
          </button>
        </div>
      </div>
    </div>
  );
}

// 54. swipe-toast-dismiss
export function SwipeToastDismissPreview() {
  const [dismissed, setDismissed] = React.useState(false);
  return (
    <div className="p-3 select-none">
      {dismissed ? (
        <button
          onClick={() => setDismissed(false)}
          className="px-3 py-1 rounded bg-surface border border-line font-mono text-[10px] text-oxide font-bold"
        >
          RESTORE TOAST
        </button>
      ) : (
        <div
          onClick={() => setDismissed(true)}
          className="w-52 p-3 rounded-xl bg-paper border border-line shadow-md flex items-center justify-between cursor-pointer hover:translate-x-3 transition-transform"
        >
          <div>
            <span className="font-display font-bold text-xs text-ink">Package Synced</span>
            <p className="font-mono text-[8px] text-graphite">Swipe right to dismiss</p>
          </div>
          <span className="text-oxide text-xs font-bold">✕</span>
        </div>
      )}
    </div>
  );
}

// 55. swipe-row-actions
export function SwipeRowActionsPreview() {
  const [swiped, setSwiped] = React.useState(false);
  return (
    <div className="p-3 w-52 select-none overflow-hidden">
      <div
        onClick={() => setSwiped(!swiped)}
        className="relative h-12 rounded-xl bg-paper border border-line flex items-center justify-between px-3 cursor-pointer shadow-xs transition-transform duration-300"
        style={{ transform: swiped ? "translateX(-48px)" : "translateX(0)" }}
      >
        <span className="font-display font-semibold text-xs text-ink">Row Item 01</span>
        <span className="font-mono text-[8px] text-graphite">CLICK SWIPE</span>
      </div>
    </div>
  );
}

// 56. comet-dial-gauge
export function CometDialGaugePreview() {
  return (
    <div className="relative w-28 h-28 flex items-center justify-center select-none">
      <svg viewBox="0 0 100 100" className="w-full h-full animate-[spin_4s_linear_infinite]">
        <circle cx="50" cy="50" r="40" fill="none" stroke="#e2e8f0" strokeWidth="4" />
        <circle
          cx="50"
          cy="50"
          r="40"
          fill="none"
          stroke="#ba442c"
          strokeWidth="4"
          strokeDasharray="60 200"
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute font-mono text-xs font-bold text-ink">84%</div>
    </div>
  );
}

// 57. wake-slider-drag
export function WakeSliderDragPreview() {
  const [val, setVal] = React.useState(45);
  return (
    <div className="p-3 w-48 flex flex-col items-center select-none">
      <div className="relative w-full h-3 bg-surface rounded-full border border-line overflow-hidden mb-2">
        <div className="h-full bg-oxide/30 transition-all" style={{ width: `${val}%` }} />
      </div>
      <input
        type="range"
        min={0}
        max={100}
        value={val}
        onChange={(e) => setVal(Number(e.target.value))}
        className="w-full accent-oxide cursor-pointer"
      />
      <span className="font-mono text-[8px] text-graphite mt-1">WAKE DISPLACEMENT</span>
    </div>
  );
}

// 58. code-slots-reveal
export function CodeSlotsRevealPreview() {
  const digits = ["4", "9", "2", "8"];
  return (
    <div className="p-3 flex gap-2 select-none">
      {digits.map((d, i) => (
        <div
          key={i}
          className="w-9 h-11 rounded-lg border-2 border-oxide bg-paper flex items-center justify-center font-mono text-base font-bold text-ink shadow-xs animate-pulse"
          style={{ animationDelay: `${i * 150}ms` }}
        >
          {d}
        </div>
      ))}
    </div>
  );
}

// 59. dodge-field-pointer
export function DodgeFieldPointerPreview() {
  const [dodged, setDodged] = React.useState(false);
  return (
    <div className="relative w-48 h-28 flex items-center justify-center select-none">
      <button
        onMouseEnter={() => setDodged(!dodged)}
        className="px-4 py-2 rounded-xl bg-ink text-paper font-mono text-xs font-bold uppercase shadow-md transition-transform duration-200"
        style={{ transform: dodged ? "translate(30px, -20px)" : "translate(-20px, 15px)" }}
      >
        CAN'T CATCH ME
      </button>
    </div>
  );
}

// 60. lattice-loader-orbit
export function LatticeLoaderOrbitPreview() {
  return (
    <div className="relative w-24 h-24 flex items-center justify-center select-none">
      <div className="absolute inset-0 rounded-full border-2 border-t-oxide border-r-transparent border-b-transparent border-l-transparent animate-spin" />
      <div className="absolute inset-2 rounded-full border-2 border-r-amber-400 border-t-transparent border-b-transparent border-l-transparent animate-[spin_2s_linear_infinite_reverse]" />
      <div className="absolute inset-4 rounded-full border-2 border-b-sky-400 border-t-transparent border-r-transparent border-l-transparent animate-spin" />
      <div className="w-2 h-2 rounded-full bg-oxide" />
    </div>
  );
}

// 61. scrub-field-timeline
export function ScrubFieldTimelinePreview() {
  const [pos, setPos] = React.useState(35);
  return (
    <div className="p-3 w-52 flex flex-col select-none">
      <div className="flex items-center justify-between font-mono text-[8px] text-graphite mb-1">
        <span>00:14</span>
        <span className="text-oxide font-bold">TIMELINE</span>
        <span>01:00</span>
      </div>
      <div className="relative h-6 bg-surface border border-line rounded flex items-center px-1">
        <div className="w-full flex items-end justify-between h-3">
          {[...Array(16)].map((_, i) => (
            <div
              key={i}
              className="w-1 bg-line/80 rounded-t"
              style={{ height: `${20 + ((i * 17) % 70)}%` }}
            />
          ))}
        </div>
        <div
          className="absolute top-0 bottom-0 w-1 bg-oxide shadow-xs"
          style={{ left: `${pos}%` }}
        />
      </div>
      <input
        type="range"
        min={0}
        max={100}
        value={pos}
        onChange={(e) => setPos(Number(e.target.value))}
        className="w-full mt-1.5 accent-oxide opacity-60"
      />
    </div>
  );
}

// 62. warm-tooltip-float
export function WarmTooltipFloatPreview() {
  return (
    <div className="p-4 flex flex-col items-center justify-center select-none">
      <div className="px-3 py-1.5 rounded-lg bg-ink text-paper font-mono text-[10px] shadow-lg mb-1 animate-bounce">
        ✦ Dynamic Spring Tooltip
      </div>
      <button className="px-4 py-1.5 rounded-full border border-line bg-surface font-mono text-xs text-graphite">
        Hover Target
      </button>
    </div>
  );
}

