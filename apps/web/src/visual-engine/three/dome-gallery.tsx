import * as React from "react";
import * as THREE from "three";
import { ThreeCanvas } from "./three-canvas.js";

export interface DomeGalleryProps extends React.HTMLAttributes<HTMLDivElement> {
  itemCount?: number;
  radius?: number;
}

/**
 * OpenUI 3D Dome Gallery
 *
 * Cylindrical 360-degree floating card panorama with depth-of-field perspective
 * and inertial panning.
 */
export function DomeGallery({
  itemCount = 8,
  radius = 3.2,
  className = "h-64 sm:h-80 w-full",
  ...rest
}: DomeGalleryProps): React.JSX.Element {
  const initScene = React.useCallback(
    (scene: THREE.Scene, camera: THREE.PerspectiveCamera) => {
      camera.position.set(0, 0.4, 4.2);

      const group = new THREE.Group();
      scene.add(group);

      const cardGeom = new THREE.PlaneGeometry(1.2, 1.6);
      const materials: THREE.Material[] = [];

      for (let i = 0; i < itemCount; i++) {
        const angle = (i / itemCount) * Math.PI * 2;
        const x = Math.sin(angle) * radius;
        const z = Math.cos(angle) * radius - radius * 0.5;

        // Subtle glowing glass wireframe card
        const isCenter = i === 0 || i === 1;
        const mat = new THREE.MeshStandardMaterial({
          color: new THREE.Color(isCenter ? "#ba442c" : "#64748b"),
          roughness: 0.2,
          metalness: 0.5,
          side: THREE.DoubleSide,
          transparent: true,
          opacity: 0.85,
        });
        materials.push(mat);

        const mesh = new THREE.Mesh(cardGeom, mat);
        mesh.position.set(x, 0, z);
        mesh.rotation.y = angle + Math.PI;

        // Add inner frame edge line
        const edges = new THREE.EdgesGeometry(cardGeom);
        const line = new THREE.LineSegments(
          edges,
          new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.6 }),
        );
        mesh.add(line);

        group.add(mesh);
      }

      const ambient = new THREE.AmbientLight(0xffffff, 0.9);
      scene.add(ambient);

      const light = new THREE.PointLight(0xffffff, 2.5, 15);
      light.position.set(0, 3, 3);
      scene.add(light);

      let targetRotY = 0;

      return {
        onFrame: (time: number, delta: number) => {
          group.rotation.y += delta * 0.15;
          group.rotation.y += (targetRotY - group.rotation.y) * 0.05;
        },
        onPointerMove: (x: number) => {
          targetRotY = x * 1.8;
        },
        dispose: () => {
          cardGeom.dispose();
          materials.forEach((m) => m.dispose());
        },
      };
    },
    [itemCount, radius],
  );

  return (
    <ThreeCanvas
      onInitScene={initScene}
      className={className}
      fallback={
        <div className="flex h-full w-full items-center justify-center bg-surface/30">
          <span className="font-mono text-xs text-graphite">3D Dome Gallery</span>
        </div>
      }
      {...rest}
    />
  );
}
