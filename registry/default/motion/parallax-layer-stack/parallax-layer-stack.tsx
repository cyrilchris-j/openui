"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/cn";

export interface ParallaxLayer {
  content: React.ReactNode;
  /** Scroll rate multiplier; <1 lags, >1 leads. */
  speed: number;
}

export interface ParallaxLayerStackProps {
  layers: ParallaxLayer[];
  className?: string;
}

export function ParallaxLayerStack({ layers, className }: ParallaxLayerStackProps) {
  const layerRefs = useRef<Array<HTMLDivElement | null>>([]);
  const hostRef = useRef<HTMLDivElement>(null);
  const reduced =
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    if (reduced) return;
    const host = hostRef.current;
    if (!host) return;

    const onScroll = () => {
      const rect = host.getBoundingClientRect();
      const viewportCentre = window.innerHeight / 2;
      const offset = rect.top + rect.height / 2 - viewportCentre;

      layers.forEach((layer, index) => {
        const node = layerRefs.current[index];
        if (!node) return;
        const shifted = -offset * (layer.speed - 1) * 0.4;
        const scale = 1 - Math.abs(layer.speed - 1) * 0.08;
        node.style.transform = `translateY(${shifted.toFixed(1)}px) scale(${scale.toFixed(3)})`;
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [layers, reduced]);

  return (
    <div ref={hostRef} className={cn("relative overflow-hidden", className)}>
      {layers.map((layer, index) => (
        <div
          key={index}
          ref={(node) => {
            layerRefs.current[index] = node;
          }}
          className="will-change-transform"
          style={{ zIndex: Math.round(layer.speed * 10) }}
        >
          {layer.content}
        </div>
      ))}
    </div>
  );
}

export default ParallaxLayerStack;
