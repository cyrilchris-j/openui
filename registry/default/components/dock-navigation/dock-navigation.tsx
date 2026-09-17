"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import { Home, Search, Bell, User, Settings } from "lucide-react";
import { cn } from "@/lib/cn";

export interface DockItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

export interface DockNavigationProps {
  items?: DockItem[];
  /** Max scale at zero distance. */
  magnification?: number;
  /** Distance in px over which the effect falls off. */
  range?: number;
  className?: string;
}

const DEFAULT_ITEMS: DockItem[] = [
  { label: "Home", href: "#home", icon: Home },
  { label: "Search", href: "#search", icon: Search },
  { label: "Notifications", href: "#bell", icon: Bell },
  { label: "Profile", href: "#user", icon: User },
  { label: "Settings", href: "#settings", icon: Settings },
];

export function DockNavigation({
  items = DEFAULT_ITEMS,
  magnification = 1.8,
  range = 90,
  className,
}: DockNavigationProps) {
  const dockRef = useRef<HTMLDivElement>(null);
  const frame = useRef<number | null>(null);
  const [pointerX, setPointerX] = useState<number | null>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const coarse = window.matchMedia("(pointer: coarse)");
    const update = () => setEnabled(!reduced.matches && !coarse.matches);
    update();
    reduced.addEventListener("change", update);
    coarse.addEventListener("change", update);
    return () => {
      reduced.removeEventListener("change", update);
      coarse.removeEventListener("change", update);
    };
  }, []);

  useEffect(
    () => () => {
      if (frame.current !== null) cancelAnimationFrame(frame.current);
    },
    [],
  );

  const handleMove = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      if (!enabled) return;
      const x = event.clientX;
      if (frame.current !== null) cancelAnimationFrame(frame.current);
      frame.current = requestAnimationFrame(() => setPointerX(x));
    },
    [enabled],
  );

  const scaleFor = (element: HTMLElement | null): number => {
    if (!enabled || pointerX === null || !element) return 1;
    const rect = element.getBoundingClientRect();
    const center = rect.left + rect.width / 2;
    const distance = Math.abs(pointerX - center);
    const falloff = Math.max(0, 1 - distance / range);
    return 1 + (magnification - 1) * falloff * falloff;
  };
  void scaleFor;

  return (
    <nav
      aria-label="Dock"
      className={cn(
        "inline-flex items-end gap-2 rounded-pill border border-line bg-paper/90 px-3 pb-2 pt-3 backdrop-blur",
        className,
      )}
      ref={dockRef}
      onPointerMove={handleMove}
      onPointerLeave={() => setPointerX(null)}
    >
      {items.map((item) => (
        <a
          key={item.label}
          href={item.href}
          aria-label={item.label}
          data-dock-item
          className={cn(
            "flex h-11 w-11 items-center justify-center rounded-lg border border-transparent bg-ink/[0.04] text-ink",
            "transition-[transform,border-color] duration-150 ease-out origin-bottom motion-reduce:transition-none",
            "hover:border-line focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-oxide",
          )}
          ref={(element) => {
            if (element && pointerX !== null && enabled) {
              const scale = scaleFor(element);
              element.style.transform = `scale(${scale})`;
            } else if (element) {
              element.style.transform = "";
            }
          }}
        >
          <item.icon className="h-5 w-5" aria-hidden />
        </a>
      ))}
    </nav>
  );
}

export default DockNavigation;
