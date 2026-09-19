import * as React from "react";
import { useReducedMotion } from "../core/device.js";

/* -------------------------------------------------------------------------- */
/* Variable Font Proximity                                                    */
/* -------------------------------------------------------------------------- */
export interface VariableFontProximityProps extends React.HTMLAttributes<HTMLDivElement> {
  text: string;
  radius?: number;
  minWeight?: number;
  maxWeight?: number;
}

export function VariableFontProximity({
  text,
  radius = 160,
  minWeight = 300,
  maxWeight = 800,
  className = "",
  style,
  ...rest
}: VariableFontProximityProps): React.JSX.Element {
  const reduced = useReducedMotion();
  const containerRef = React.useRef<HTMLDivElement>(null);
  const charRefs = React.useRef<Array<HTMLSpanElement | null>>([]);
  const chars = React.useMemo(() => Array.from(text), [text]);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (reduced) return;
    const { clientX, clientY } = e;

    charRefs.current.forEach((charEl) => {
      if (!charEl) return;
      const rect = charEl.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const dist = Math.hypot(clientX - centerX, clientY - centerY);

      if (dist < radius) {
        const factor = 1 - dist / radius;
        const weight = Math.round(minWeight + factor * (maxWeight - minWeight));
        charEl.style.fontWeight = String(weight);
        charEl.style.transform = `scale(${1 + factor * 0.12})`;
      } else {
        charEl.style.fontWeight = String(minWeight);
        charEl.style.transform = "scale(1)";
      }
    });
  };

  const handlePointerLeave = () => {
    charRefs.current.forEach((charEl) => {
      if (!charEl) return;
      charEl.style.fontWeight = String(minWeight);
      charEl.style.transform = "scale(1)";
    });
  };

  return (
    <div
      ref={containerRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className={`inline-block select-none ${className}`}
      style={style}
      {...rest}
    >
      {chars.map((char, index) => (
        <span
          key={`${char}-${index}`}
          ref={(el) => {
            charRefs.current[index] = el;
          }}
          className="inline-block transition-[font-weight,transform] duration-fast"
          style={{ fontWeight: minWeight }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Curved Type (Radial Text Arc)                                              */
/* -------------------------------------------------------------------------- */
export interface CurvedTypeProps extends React.SVGAttributes<SVGSVGElement> {
  text: string;
  radius?: number;
  spinning?: boolean;
}

export function CurvedType({
  text,
  radius = 65,
  spinning = true,
  className = "",
  style,
  ...rest
}: CurvedTypeProps): React.JSX.Element {
  const reduced = useReducedMotion();
  const id = React.useId();
  const pathId = `curved-type-path-${id.replace(/:/g, "")}`;
  const size = radius * 2 + 40;
  const cx = size / 2;
  const cy = size / 2;

  return (
    <div
      className={`inline-flex items-center justify-center ${className}`}
      style={{
        ...style,
        animation: !reduced && spinning ? "openui-spin 18s linear infinite" : "none",
      }}
    >
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} {...rest}>
        <defs>
          <path
            id={pathId}
            d={`M ${cx - radius}, ${cy} A ${radius},${radius} 0 1,1 ${cx + radius},${cy} A ${radius},${radius} 0 1,1 ${cx - radius},${cy}`}
          />
        </defs>
        <text className="font-mono text-[11px] tracking-[0.24em] fill-current uppercase">
          <textPath href={`#${pathId}`} startOffset="0%">
            {text} • {text} •
          </textPath>
        </text>
      </svg>
      <style>{`
        @keyframes openui-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
