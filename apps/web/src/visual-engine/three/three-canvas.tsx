import * as React from "react";
import * as THREE from "three";
import { useDeviceCapabilities, useReducedMotion } from "../core/device.js";
import { WebGLErrorBoundary } from "../core/error-boundary.js";

export interface ThreeCanvasProps extends React.HTMLAttributes<HTMLDivElement> {
  onInitScene: (scene: THREE.Scene, camera: THREE.PerspectiveCamera, renderer: THREE.WebGLRenderer) => {
    onFrame: (time: number, delta: number) => void;
    onResize?: (width: number, height: number) => void;
    onPointerMove?: (x: number, y: number) => void;
    dispose?: () => void;
  };
  fallback?: React.ReactNode;
}

/**
 * OpenUI Three.js WebGL Canvas Harness
 *
 * Enforces strict WebGL performance & safety rules:
 *   1. Hardware check: automatically mounts fallback if WebGL is unavailable.
 *   2. Visibility: pauses render loop when offscreen or tab is hidden.
 *   3. Reduced motion: renders single frame and pauses loop.
 *   4. Memory management: completely disposes geometries, materials, and WebGL context on unmount.
 */
export function ThreeCanvas({
  onInitScene,
  fallback,
  className = "",
  style,
  ...rest
}: ThreeCanvasProps): React.JSX.Element {
  const capabilities = useDeviceCapabilities();
  const reduced = useReducedMotion();

  const defaultFallback = (
    <div className="flex h-full w-full items-center justify-center bg-surface/30 p-6 text-center">
      <span className="font-mono text-xs text-graphite">3D WebGL preview (hardware acceleration unavailable)</span>
    </div>
  );

  if (!capabilities.hasWebGL) {
    return <div className={`relative ${className}`} style={style} {...rest}>{fallback ?? defaultFallback}</div>;
  }

  return (
    <WebGLErrorBoundary fallback={fallback ?? defaultFallback}>
      <ThreeCanvasInternal
        onInitScene={onInitScene}
        reduced={reduced}
        className={className}
        style={style}
        {...rest}
      />
    </WebGLErrorBoundary>
  );
}

interface ThreeCanvasInternalProps extends React.HTMLAttributes<HTMLDivElement> {
  onInitScene: ThreeCanvasProps["onInitScene"];
  reduced: boolean;
}

function ThreeCanvasInternal({
  onInitScene,
  reduced,
  className = "",
  style,
  ...rest
}: ThreeCanvasInternalProps): React.JSX.Element {
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let width = Math.max(container.clientWidth, 1);
    let height = Math.max(container.clientHeight, 1);

    // 1. Setup Three.js scene & camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 5;

    // 2. Setup WebGLRenderer
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: "high-performance",
      });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      container.appendChild(renderer.domElement);
    } catch {
      return;
    }

    // 3. Initialize user scene callbacks
    const callbacks = onInitScene(scene, camera, renderer);

    // 4. Render loop with visibility pausing
    let rafId: number | null = null;
    let lastTime = performance.now();
    let isVisible = true;

    const render = (time: number) => {
      if (!isVisible || reduced) return;
      const delta = (time - lastTime) / 1000;
      lastTime = time;

      callbacks.onFrame(time, delta);
      renderer.render(scene, camera);

      rafId = requestAnimationFrame(render);
    };

    if (reduced) {
      callbacks.onFrame(0, 0);
      renderer.render(scene, camera);
    } else {
      rafId = requestAnimationFrame(render);
    }

    // 5. Resize handler
    const resizeObserver = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (!entry) return;
      width = Math.max(Math.floor(entry.contentRect.width), 1);
      height = Math.max(Math.floor(entry.contentRect.height), 1);

      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      callbacks.onResize?.(width, height);

      if (reduced) {
        renderer.render(scene, camera);
      }
    });
    resizeObserver.observe(container);

    // 6. Intersection observer
    const intersectionObserver = new IntersectionObserver(([entry]) => {
      isVisible = Boolean(entry?.isIntersecting);
      if (isVisible && !document.hidden && !reduced && rafId === null) {
        lastTime = performance.now();
        rafId = requestAnimationFrame(render);
      } else if (!isVisible && rafId !== null) {
        cancelAnimationFrame(rafId);
        rafId = null;
      }
    });
    intersectionObserver.observe(container);

    // 7. Pointer move handler
    const handlePointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      callbacks.onPointerMove?.(x, y);
    };
    container.addEventListener("pointermove", handlePointerMove, { passive: true });

    // 8. Cleanup and resource disposal
    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      container.removeEventListener("pointermove", handlePointerMove);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();

      callbacks.dispose?.();

      // Deep disposal of scene objects
      scene.traverse((object) => {
        if ((object as THREE.Mesh).isMesh) {
          const mesh = object as THREE.Mesh;
          mesh.geometry?.dispose();
          if (Array.isArray(mesh.material)) {
            mesh.material.forEach((m) => m.dispose());
          } else {
            mesh.material?.dispose();
          }
        }
      });

      renderer.dispose();
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [onInitScene, reduced]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full overflow-hidden ${className}`}
      style={style}
      {...rest}
    />
  );
}
