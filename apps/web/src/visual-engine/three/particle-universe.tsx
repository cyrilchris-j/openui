import * as React from "react";
import * as THREE from "three";
import { ThreeCanvas } from "./three-canvas.js";

export interface ParticleUniverseProps extends React.HTMLAttributes<HTMLDivElement> {
  particleCount?: number;
  color?: string;
}

/**
 * OpenUI 3D Particle Universe
 *
 * Orbiting stellar particle cloud rendered with Three.js BufferGeometry points.
 */
export function ParticleUniverse({
  particleCount = 600,
  color = "#ba442c",
  className = "h-72 w-full",
  ...rest
}: ParticleUniverseProps): React.JSX.Element {
  const initScene = React.useCallback(
    (scene: THREE.Scene, camera: THREE.PerspectiveCamera) => {
      camera.position.z = 6;

      const positions = new Float32Array(particleCount * 3);
      for (let i = 0; i < particleCount * 3; i += 3) {
        // Uniform spherical shell distribution
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(Math.random() * 2 - 1);
        const radius = 2.4 + (Math.random() - 0.5) * 0.8;

        positions[i] = radius * Math.sin(phi) * Math.cos(theta);
        positions[i + 1] = radius * Math.sin(phi) * Math.sin(theta);
        positions[i + 2] = radius * Math.cos(phi);
      }

      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

      const material = new THREE.PointsMaterial({
        color: new THREE.Color(color),
        size: 0.05,
        transparent: true,
        opacity: 0.75,
      });

      const points = new THREE.Points(geometry, material);
      scene.add(points);

      let targetX = 0;
      let targetY = 0;

      return {
        onFrame: (time: number, delta: number) => {
          points.rotation.y += delta * 0.15;
          points.rotation.x += (targetY - points.rotation.x) * 0.04;
          points.rotation.z += (targetX - points.rotation.z) * 0.04;
        },
        onPointerMove: (x: number, y: number) => {
          targetX = x * 0.5;
          targetY = -y * 0.5;
        },
        dispose: () => {
          geometry.dispose();
          material.dispose();
        },
      };
    },
    [particleCount, color],
  );

  return (
    <ThreeCanvas
      onInitScene={initScene}
      className={className}
      fallback={
        <div className="flex h-full w-full items-center justify-center border border-line/20 rounded-lg bg-surface/30">
          <span className="font-mono text-xs text-graphite">Particle Universe (CSS mode)</span>
        </div>
      }
      {...rest}
    />
  );
}
