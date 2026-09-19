import * as React from "react";

export interface SloshGaugeProps extends React.HTMLAttributes<HTMLDivElement> {
  levelPercent?: number;
  fluidColor?: string;
}

/**
 * OpenUI Slosh Gauge Micro-Interaction
 *
 * Interactive fluid level gauge with realistic liquid surface physics
 * that sloshes back and forth with wave inertia upon click or hover.
 */
export function SloshGauge({
  levelPercent = 68,
  fluidColor = "#ba442c",
  className = "",
  ...rest
}: SloshGaugeProps): React.JSX.Element {
  const [tilt, setTilt] = React.useState(0);
  const [sloshing, setSloshing] = React.useState(false);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const relX = (e.clientX - rect.left) / rect.width - 0.5;
    setTilt(relX * 24);
  };

  const handlePointerLeave = () => {
    setSloshing(true);
    setTilt(0);
    setTimeout(() => setSloshing(false), 800);
  };

  return (
    <div
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className={`relative w-28 h-40 rounded-2xl border-2 border-line/60 bg-surface/80 overflow-hidden cursor-pointer shadow-sm p-1.5 flex flex-col justify-end ${className}`}
      {...rest}
    >
      {/* Gauge glass markers */}
      <div className="absolute top-3 right-2 flex flex-col gap-3 pointer-events-none opacity-40">
        <div className="w-2.5 h-0.5 bg-graphite" />
        <div className="w-1.5 h-0.5 bg-graphite" />
        <div className="w-2.5 h-0.5 bg-graphite" />
        <div className="w-1.5 h-0.5 bg-graphite" />
        <div className="w-2.5 h-0.5 bg-graphite" />
      </div>

      {/* Numerical readout */}
      <div className="absolute top-3 left-3 pointer-events-none z-10">
        <span className="font-mono text-xs font-bold text-ink">{levelPercent}%</span>
        <p className="font-mono text-[9px] text-graphite uppercase">Fluid Level</p>
      </div>

      {/* Sloshing fluid body */}
      <div
        className="w-full rounded-b-xl relative overflow-hidden transition-transform duration-200 ease-out"
        style={{
          height: `${levelPercent}%`,
          backgroundColor: fluidColor,
          transform: `rotate(${tilt}deg)`,
          transformOrigin: "bottom center",
        }}
      >
        {/* Surface wave ripple */}
        <div
          className={`absolute inset-x-0 -top-2 h-4 rounded-full bg-white/30 ${
            sloshing ? "animate-pulse scale-y-125" : ""
          }`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
      </div>
    </div>
  );
}
