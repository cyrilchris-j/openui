import * as React from "react";

export interface VoiceWaveformProps extends React.HTMLAttributes<HTMLDivElement> {
  barCount?: number;
  active?: boolean;
}

/**
 * OpenUI Voice Pill Waveform
 *
 * Real-time audio frequency visualizer pill with animated harmonic bars
 * and interactive hover amplification.
 */
export function VoiceWaveform({
  barCount = 18,
  active = true,
  className = "",
  ...rest
}: VoiceWaveformProps): React.JSX.Element {
  const [hovered, setHovered] = React.useState(false);
  const [heights, setHeights] = React.useState<number[]>(() =>
    Array.from({ length: barCount }, () => Math.random() * 24 + 6),
  );

  React.useEffect(() => {
    if (!active) return;
    const interval = setInterval(() => {
      setHeights(
        Array.from({ length: barCount }, (_, i) => {
          const mult = hovered ? 1.6 : 1.0;
          return Math.sin(Date.now() * 0.006 + i * 0.4) * 14 * mult + 18;
        }),
      );
    }, 60);

    return () => clearInterval(interval);
  }, [active, barCount, hovered]);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`px-4 py-2.5 rounded-full border border-line bg-paper/80 shadow-xs flex items-center gap-2 cursor-pointer select-none ${className}`}
      {...rest}
    >
      <div className="w-2 h-2 rounded-full bg-oxide animate-ping" />
      <span className="font-mono text-[10px] text-graphite uppercase tracking-wider">Voice</span>
      <div className="flex items-center gap-1 h-8 px-1">
        {heights.map((h, i) => (
          <div
            key={i}
            className="w-1 rounded-full bg-ink transition-all duration-75 ease-out"
            style={{ height: `${Math.max(4, h)}px` }}
          />
        ))}
      </div>
      <span className="font-mono text-[10px] text-graphite">00:14</span>
    </div>
  );
}
