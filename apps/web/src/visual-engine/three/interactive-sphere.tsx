import * as React from "react";
import * as THREE from "three";
import { ThreeCanvas } from "./three-canvas.js";

export interface InteractiveSphereProps extends React.HTMLAttributes<HTMLDivElement> {
  color?: string;
  wireframe?: boolean;
  radius?: number;
}

/**
 * OpenUI 3D Interactive Sphere
 *
 * Three.js procedural sphere with pointer-reactive orientation
 * and subtle harmonic vertex rotation.
 */
export function InteractiveSphere({
  color = "#ba442c", // OpenUI Oxide
  wireframe = true,
  radius = 1.6,
  className = "h-64 sm:h-80 w-full",
  ...rest
}: InteractiveSphereProps): React.JSX.Element {
  const initScene = React.useCallback(
    (scene: THREE.Scene, camera: THREE.PerspectiveCamera) => {
      camera.position.z = 4.5;

      // 1. Geometry & Material
      const geometry = new THREE.IcosahedronGeometry(radius, 4);
      const material = new THREE.MeshStandardMaterial({
        color: new THREE.Color(color),
        wireframe,
        roughness: 0.3,
        metalness: 0.1,
      });

      const mesh = new THREE.Mesh(geometry, material);
      scene.add(mesh);

      // 2. Lighting
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
      scene.add(ambientLight);

      const pointLight = new THREE.PointLight(0xffffff, 2.5);
      pointLight.position.set(5, 5, 5);
      scene.add(pointLight);

      let targetRotX = 0;
      let targetRotY = 0;

      return {
        onFrame: (time: number, delta: number) => {
          mesh.rotation.y += delta * 0.25;
          mesh.rotation.x += (targetRotX - mesh.rotation.x) * 0.05;
          mesh.rotation.z += (targetRotY - mesh.rotation.z) * 0.05;
        },
        onPointerMove: (x: number, y: number) => {
          targetRotX = y * 0.8;
          targetRotY = -x * 0.8;
        },
        dispose: () => {
          geometry.dispose();
          material.dispose();
        },
      };
    },
    [color, wireframe, radius],
  );

  return (
    <ThreeCanvas
      onInitScene={initScene}
      className={className}
      fallback={
        <div className="flex h-full w-full items-center justify-center border border-line/20 rounded-lg bg-surface/30">
          <div className="w-24 h-24 rounded-full border-2 border-dashed border-oxide/40 animate-spin" />
        </div>
      }
      {...rest}
    />
  );
}
