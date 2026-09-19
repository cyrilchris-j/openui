import * as React from "react";
import * as THREE from "three";
import { ThreeCanvas } from "./three-canvas.js";

export interface IsometricCubesProps extends React.HTMLAttributes<HTMLDivElement> {
  gridSize?: number;
  cubeColor?: string;
  accentColor?: string;
}

/**
 * OpenUI 3D Isometric Cubes Scene
 *
 * 4x4 matrix of volumetric cubes pulsating in a 3D sine-wave harmonic field
 * with directional lighting, shadows, and pointer-driven tilt.
 */
export function IsometricCubes({
  gridSize = 4,
  cubeColor = "#2d3748",
  accentColor = "#ba442c",
  className = "h-64 sm:h-80 w-full",
  ...rest
}: IsometricCubesProps): React.JSX.Element {
  const initScene = React.useCallback(
    (scene: THREE.Scene, camera: THREE.PerspectiveCamera) => {
      camera.position.set(6, 7, 8);
      camera.lookAt(0, 0, 0);

      // Group holding the entire isometric grid
      const group = new THREE.Group();
      scene.add(group);

      const cubes: { mesh: THREE.Mesh; baseX: number; baseZ: number; offset: number }[] = [];
      const spacing = 1.15;
      const size = 0.85;

      const geometry = new THREE.BoxGeometry(size, size, size);

      for (let x = 0; x < gridSize; x++) {
        for (let z = 0; z < gridSize; z++) {
          const posX = (x - (gridSize - 1) / 2) * spacing;
          const posZ = (z - (gridSize - 1) / 2) * spacing;
          const dist = Math.sqrt(posX * posX + posZ * posZ);

          const isAccent = (x + z) % 3 === 0;
          const material = new THREE.MeshStandardMaterial({
            color: new THREE.Color(isAccent ? accentColor : cubeColor),
            roughness: 0.35,
            metalness: 0.25,
          });

          const mesh = new THREE.Mesh(geometry, material);
          mesh.position.set(posX, 0, posZ);
          group.add(mesh);

          cubes.push({
            mesh,
            baseX: posX,
            baseZ: posZ,
            offset: dist * 0.8,
          });
        }
      }

      // Lighting
      const ambient = new THREE.AmbientLight(0xffffff, 0.7);
      scene.add(ambient);

      const dirLight = new THREE.DirectionalLight(0xffffff, 2.0);
      dirLight.position.set(10, 15, 10);
      scene.add(dirLight);

      const fillLight = new THREE.PointLight(new THREE.Color(accentColor), 2, 12);
      fillLight.position.set(-5, 4, -5);
      scene.add(fillLight);

      let targetRotY = 0;
      let targetRotX = 0;

      return {
        onFrame: (time: number) => {
          const t = time * 0.0025;

          // Wave motion across cubes
          cubes.forEach(({ mesh, offset }) => {
            mesh.position.y = Math.sin(t + offset) * 0.55;
            mesh.scale.setScalar(0.9 + Math.cos(t + offset) * 0.15);
          });

          // Smooth group tilt towards pointer
          group.rotation.y += (targetRotY - group.rotation.y) * 0.06;
          group.rotation.x += (targetRotX - group.rotation.x) * 0.06;
        },
        onPointerMove: (x: number, y: number) => {
          targetRotY = x * 0.45;
          targetRotX = -y * 0.35;
        },
        dispose: () => {
          geometry.dispose();
          cubes.forEach((c) => {
            if (Array.isArray(c.mesh.material)) {
              c.mesh.material.forEach((m) => m.dispose());
            } else {
              c.mesh.material.dispose();
            }
          });
        },
      };
    },
    [gridSize, cubeColor, accentColor],
  );

  return (
    <ThreeCanvas
      onInitScene={initScene}
      className={className}
      fallback={
        <div className="flex h-full w-full items-center justify-center bg-surface/30">
          <span className="font-mono text-xs text-graphite">Isometric 3D Cubes Preview</span>
        </div>
      }
      {...rest}
    />
  );
}
