import * as React from "react";
import * as THREE from "three";
import { ThreeCanvas } from "./three-canvas.js";

export interface ParticleNebulaProps extends React.HTMLAttributes<HTMLDivElement> {
  particleCount?: number;
}

/**
 * OpenUI 3D Spatial Particle Nebula
 *
 * Volumetric point cloud with orbital cosmic drift, chromatic dispersion,
 * and mouse-reactive 3D parallax.
 */
export function ParticleNebula({
  particleCount = 800,
  className = "h-64 sm:h-80 w-full",
  ...rest
}: ParticleNebulaProps): React.JSX.Element {
  const initScene = React.useCallback(
    (scene: THREE.Scene, camera: THREE.PerspectiveCamera) => {
      camera.position.z = 4.0;

      const positions = new Float32Array(particleCount * 3);
      const colors = new Float32Array(particleCount * 3);

      const color1 = new THREE.Color("#ba442c"); // Oxide
      const color2 = new THREE.Color("#38bdf8"); // Cyan
      const color3 = new THREE.Color("#818cf8"); // Indigo

      for (let i = 0; i < particleCount; i++) {
        // Spiral galaxy distribution
        const radius = Math.random() * 2.8 + 0.3;
        const spinAngle = radius * 3.5;
        const branchAngle = ((i % 3) * (2 * Math.PI)) / 3;

        const randomX = (Math.random() - 0.5) * 0.45;
        const randomY = (Math.random() - 0.5) * 0.45;
        const randomZ = (Math.random() - 0.5) * 0.45;

        positions[i * 3] = Math.cos(branchAngle + spinAngle) * radius + randomX;
        positions[i * 3 + 1] = randomY;
        positions[i * 3 + 2] = Math.sin(branchAngle + spinAngle) * radius + randomZ;

        // Color gradient based on radius
        const mixColor = color1.clone().lerp(color2, Math.random()).lerp(color3, radius / 3);
        colors[i * 3] = mixColor.r;
        colors[i * 3 + 1] = mixColor.g;
        colors[i * 3 + 2] = mixColor.b;
      }

      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

      const material = new THREE.PointsMaterial({
        size: 0.045,
        vertexColors: true,
        transparent: true,
        opacity: 0.9,
        blending: THREE.AdditiveBlending,
      });

      const points = new THREE.Points(geometry, material);
      scene.add(points);

      let targetRotX = 0;
      let targetRotY = 0;

      return {
        onFrame: (time: number, delta: number) => {
          points.rotation.y += delta * 0.2;
          points.rotation.z += delta * 0.05;

          points.rotation.x += (targetRotX - points.rotation.x) * 0.05;
          points.rotation.y += (targetRotY - points.rotation.y) * 0.05;
        },
        onPointerMove: (x: number, y: number) => {
          targetRotY = x * 0.8;
          targetRotX = -y * 0.6;
        },
        dispose: () => {
          geometry.dispose();
          material.dispose();
        },
      };
    },
    [particleCount],
  );

  return (
    <ThreeCanvas
      onInitScene={initScene}
      className={className}
      fallback={
        <div className="flex h-full w-full items-center justify-center bg-surface/30">
          <span className="font-mono text-xs text-graphite">3D Particle Nebula</span>
        </div>
      }
      {...rest}
    />
  );
}
