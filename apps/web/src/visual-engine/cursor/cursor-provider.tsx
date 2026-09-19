import * as React from "react";
import { useDeviceCapabilities } from "../core/device.js";

export interface CursorContextValue {
  x: number;
  y: number;
  visible: boolean;
  activeVariant: string;
  setVariant: (variant: string) => void;
  registerMagneticTarget: (el: HTMLElement | null) => void;
  magneticTarget: HTMLElement | null;
}

const CursorContext = React.createContext<CursorContextValue | null>(null);

export interface CursorProviderProps {
  children: React.ReactNode;
  enabled?: boolean;
}

/**
 * OpenUI Cursor Provider
 *
 * Automatically detects device pointer capabilities (touch vs fine pointer).
 * Disables custom cursor completely on touch and reduced-motion devices.
 */
export function CursorProvider({
  children,
  enabled = true,
}: CursorProviderProps): React.JSX.Element {
  const capabilities = useDeviceCapabilities();
  const [pos, setPos] = React.useState({ x: -100, y: -100 });
  const [visible, setVisible] = React.useState(false);
  const [variant, setVariant] = React.useState("default");
  const [magneticTarget, setMagneticTarget] = React.useState<HTMLElement | null>(null);

  const isActive = enabled && !capabilities.isTouch && capabilities.hasHover && !capabilities.prefersReducedMotion;

  React.useEffect(() => {
    if (!isActive) return;

    const handlePointerMove = (e: PointerEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      if (!visible) setVisible(true);
    };

    const handlePointerLeave = () => setVisible(false);
    const handlePointerEnter = () => setVisible(true);

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    document.addEventListener("mouseleave", handlePointerLeave);
    document.addEventListener("mouseenter", handlePointerEnter);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      document.removeEventListener("mouseleave", handlePointerLeave);
      document.removeEventListener("mouseenter", handlePointerEnter);
    };
  }, [isActive, visible]);

  const value = React.useMemo<CursorContextValue>(
    () => ({
      x: pos.x,
      y: pos.y,
      visible: visible && isActive,
      activeVariant: variant,
      setVariant,
      registerMagneticTarget: setMagneticTarget,
      magneticTarget,
    }),
    [pos.x, pos.y, visible, isActive, variant, magneticTarget],
  );

  return <CursorContext.Provider value={value}>{children}</CursorContext.Provider>;
}

export function useCursor(): CursorContextValue | null {
  return React.useContext(CursorContext);
}
