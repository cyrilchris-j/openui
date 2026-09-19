import * as React from "react";
import type { DeviceCapabilities } from "./types.js";

/**
 * OpenUI Visual Engine — Device Capability Detector
 *
 * Reliably detects pointer precision (touch vs fine cursor),
 * prefers-reduced-motion, WebGL hardware acceleration, and
 * power considerations. Used across all visual engine components
 * to deliver optimized, accessible experiences.
 */

function checkWebGL(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const canvas = document.createElement("canvas");
    const gl =
      canvas.getContext("webgl2") ||
      canvas.getContext("webgl") ||
      canvas.getContext("experimental-webgl");
    return Boolean(gl);
  } catch {
    return false;
  }
}

export function getDeviceCapabilities(): DeviceCapabilities {
  if (typeof window === "undefined") {
    return {
      isTouch: false,
      hasHover: true,
      prefersReducedMotion: false,
      hasWebGL: false,
      isLowPower: false,
      pixelRatio: 1,
    };
  }

  const isTouch =
    "ontouchstart" in window ||
    navigator.maxTouchPoints > 0 ||
    window.matchMedia("(pointer: coarse)").matches;

  const hasHover = window.matchMedia("(hover: hover)").matches;

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const hasWebGL = checkWebGL();

  // Basic heuristic for low-power or constrained devices (CPU cores, memory, mobile)
  const hardwareConcurrency = navigator.hardwareConcurrency || 4;
  const isLowPower = hardwareConcurrency <= 2 || (isTouch && window.innerWidth < 640);

  return {
    isTouch,
    hasHover,
    prefersReducedMotion,
    hasWebGL,
    isLowPower,
    pixelRatio: Math.min(window.devicePixelRatio || 1, 2),
  };
}

export function useDeviceCapabilities(): DeviceCapabilities {
  const [capabilities, setCapabilities] = React.useState<DeviceCapabilities>(getDeviceCapabilities);

  React.useEffect(() => {
    if (typeof window === "undefined") return;

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const hoverQuery = window.matchMedia("(hover: hover)");

    const update = () => {
      setCapabilities(getDeviceCapabilities());
    };

    motionQuery.addEventListener("change", update);
    hoverQuery.addEventListener("change", update);
    window.addEventListener("resize", update, { passive: true });

    return () => {
      motionQuery.removeEventListener("change", update);
      hoverQuery.removeEventListener("change", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return capabilities;
}

export function useReducedMotion(): boolean {
  const { prefersReducedMotion } = useDeviceCapabilities();
  return prefersReducedMotion;
}
