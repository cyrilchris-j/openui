import * as React from "react";

export interface SpecularLiquidButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string;
}

/**
 * OpenUI Specular Liquid Button
 *
 * Shimmering mercury button face where a specular glossy highlight
 * actively tracks the pointer angle across the reflective liquid surface.
 */
export function SpecularLiquidButton({
  label = "Liquid Specular",
  className = "",
  ...rest
}: SpecularLiquidButtonProps): React.JSX.Element {
  const [pos, setPos] = React.useState({ x: 50, y: 50 });

  const handlePointerMove = (e: React.PointerEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setPos({ x, y });
  };

  return (
    <button
      onPointerMove={handlePointerMove}
      className={`relative px-6 py-3 rounded-xl overflow-hidden font-mono text-xs uppercase tracking-wider font-semibold text-paper shadow-md transition-transform hover:scale-[1.03] active:scale-[0.98] ${className}`}
      style={{
        background: `radial-gradient(circle at ${pos.x}% ${pos.y}%, rgba(255,255,255,0.4) 0%, rgba(186,68,44,0.9) 35%, rgba(20,20,25,0.95) 80%)`,
        boxShadow: `0 4px 20px rgba(186, 68, 44, 0.35)`,
      }}
      {...rest}
    >
      <span className="relative z-10 flex items-center gap-2">
        <span className="text-amber-300">✦</span>
        {label}
      </span>
      {/* Specular boundary ring */}
      <div className="absolute inset-0 rounded-xl border border-white/30 pointer-events-none" />
    </button>
  );
}
