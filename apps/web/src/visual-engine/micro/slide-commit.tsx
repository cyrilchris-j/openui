import * as React from "react";

export interface SlideCommitProps {
  label?: string;
  onCommit?: () => void;
}

/**
 * OpenUI Slide Commit Slider
 *
 * Tactile slide-to-confirm interaction with bounded drag physics,
 * spring reset, and success threshold trigger.
 */
export function SlideCommit({
  label = "Slide to Confirm",
  onCommit,
}: SlideCommitProps): React.JSX.Element {
  const [dragX, setDragX] = React.useState(0);
  const [committed, setCommitted] = React.useState(false);
  const trackRef = React.useRef<HTMLDivElement>(null);
  const isDraggingRef = React.useRef(false);

  const handlePointerDown = () => {
    if (committed) return;
    isDraggingRef.current = true;
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current || committed || !trackRef.current) return;
    const rect = trackRef.current.getBoundingClientRect();
    const maxDrag = rect.width - 48;
    const currentX = Math.max(0, Math.min(maxDrag, e.clientX - rect.left - 24));
    setDragX(currentX);

    if (currentX >= maxDrag * 0.92) {
      setCommitted(true);
      isDraggingRef.current = false;
      onCommit?.();
    }
  };

  const handlePointerUp = () => {
    isDraggingRef.current = false;
    if (!committed) {
      setDragX(0); // Spring reset
    }
  };

  return (
    <div
      ref={trackRef}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
      className={`relative w-64 h-12 rounded-full border border-line bg-surface/80 shadow-inner flex items-center p-1 select-none overflow-hidden ${
        committed ? "bg-moss/20 border-moss" : ""
      }`}
    >
      {/* Background track text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <span className="font-mono text-[11px] uppercase tracking-wider text-graphite">
          {committed ? "✓ Action Confirmed" : label}
        </span>
      </div>

      {/* Sliding thumb */}
      <div
        onPointerDown={handlePointerDown}
        className="relative z-10 w-10 h-10 rounded-full bg-ink text-paper flex items-center justify-center cursor-grab active:cursor-grabbing shadow-md font-mono text-xs transition-transform duration-75"
        style={{ transform: `translateX(${dragX}px)` }}
      >
        {committed ? "✓" : "→"}
      </div>
    </div>
  );
}
