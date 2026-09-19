import * as React from "react";
import * as THREE from "three";
import { ThreeCanvas } from "./three-canvas.js";

export interface ModelViewerProps extends React.HTMLAttributes<HTMLDivElement> {
  geometryType?: "torusKnot" | "icosahedron" | "octahedron";
  color?: string;
  metalness?: number;
  roughness?: number;
}

/**
 * OpenUI 3D Model Viewer WebGL
 *
 * Hardware-accelerated 3D object showcase with metallic reflections,
 * dual colored lighting, and pointer rotation tracking.
 */
export function ModelViewer({
  geometryType = "torusKnot",
  color = "#ba442c",
  metalness = 0.85,
  roughness = 0.18,
  className = "h-64 sm:h-80 w-full",
  ...rest
}: ModelViewerProps): React.JSX.Element {
  const initScene = React.useCallback(
    (scene: THREE.Scene, camera: THREE.PerspectiveCamera) => {
      camera.position.z = 4.2;

      let geometry: THREE.BufferGeometry;
      switch (geometryType) {
        case "icosahedron":
          geometry = new THREE.IcosahedronGeometry(1.6, 1);
          break;
        case "octahedron":
          geometry = new THREE.OctahedronGeometry(1.7, 0);
          break;
        default:
          geometry = new THREE.TorusKnotGeometry(1.2, 0.38, 128, 32, 2, 3);
          break;
      }

      const material = new THREE.MeshStandardMaterial({
        color: new THREE.Color(color),
        metalness,
        roughness,
      });

      const mesh = new THREE.Mesh(geometry, material);
      scene.add(mesh);

      // Dual contrasting lights for dramatic specular highlight
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
      scene.add(ambientLight);

      const keyLight = new THREE.DirectionalLight(0xffffff, 2.5);
      keyLight.position.set(5, 5, 4);
      scene.add(keyLight);

      const rimLight = new THREE.PointLight(0x38bdf8, 3.5, 15);
      rimLight.position.set(-6, -4, 2);
      scene.add(rimLight);

      let targetRotX = 0;
      let targetRotY = 0;

      return {
        onFrame: (time: number, delta: number) => {
          mesh.rotation.y += delta * 0.4;
          mesh.rotation.x += delta * 0.2;

          mesh.rotation.x += (targetRotX - mesh.rotation.x) * 0.05;
          mesh.rotation.y += (targetRotY - mesh.rotation.y) * 0.05;
        },
        onPointerMove: (x: number, y: number) => {
          targetRotY = x * 1.5;
          targetRotX = -y * 1.5;
        },
        dispose: () => {
          geometry.dispose();
          material.dispose();
        },
      };
    },
    [geometryType, color, metalness, roughness],
  );

  return (
    <ThreeCanvas
      onInitScene={initScene}
      className={className}
      fallback={
        <div className="flex h-full w-full items-center justify-center bg-surface/30">
          <span className="font-mono text-xs text-graphite">3D Model Viewer</span>
        </div>
      }
      {...rest}
    />
  );
}
