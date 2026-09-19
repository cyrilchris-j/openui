import * as React from "react";
import * as THREE from "three";
import { ThreeCanvas } from "./three-canvas.js";

export interface SpatialDeviceProps extends React.HTMLAttributes<HTMLDivElement> {
  accentColor?: string;
}

/**
 * OpenUI 3D Spatial Device Scene
 *
 * Floating spatial hardware mockup with chamfered bezels, glass display,
 * and mouse-reactive 3D tilt perspective.
 */
export function SpatialDevice({
  accentColor = "#ba442c",
  className = "h-64 sm:h-80 w-full",
  ...rest
}: SpatialDeviceProps): React.JSX.Element {
  const initScene = React.useCallback(
    (scene: THREE.Scene, camera: THREE.PerspectiveCamera) => {
      camera.position.z = 4.2;

      const group = new THREE.Group();
      scene.add(group);

      // 1. Device chassis
      const chassisGeom = new THREE.BoxGeometry(2.6, 1.6, 0.08);
      const chassisMat = new THREE.MeshStandardMaterial({
        color: 0x18181b,
        metalness: 0.9,
        roughness: 0.2,
      });
      const chassis = new THREE.Mesh(chassisGeom, chassisMat);
      group.add(chassis);

      // 2. Bezel / screen
      const screenGeom = new THREE.PlaneGeometry(2.45, 1.45);

      // Generate a sleek canvas texture for the device screen
      const screenCanvas = document.createElement("canvas");
      screenCanvas.width = 512;
      screenCanvas.height = 300;
      const ctx = screenCanvas.getContext("2d");
      if (ctx) {
        ctx.fillStyle = "#09090b";
        ctx.fillRect(0, 0, 512, 300);

        // Grid lines
        ctx.strokeStyle = "rgba(255, 255, 255, 0.06)";
        ctx.lineWidth = 1;
        for (let i = 0; i < 512; i += 32) {
          ctx.beginPath();
          ctx.moveTo(i, 0);
          ctx.lineTo(i, 300);
          ctx.stroke();
        }
        for (let j = 0; j < 300; j += 32) {
          ctx.beginPath();
          ctx.moveTo(0, j);
          ctx.lineTo(512, j);
          ctx.stroke();
        }

        // Futuristic UI widgets
        ctx.fillStyle = accentColor;
        ctx.fillRect(36, 36, 12, 12);
        ctx.fillStyle = "#ffffff";
        ctx.font = "bold 14px monospace";
        ctx.fillText("OPENUI // SPATIAL OS", 56, 48);

        // Chart waveform
        ctx.strokeStyle = accentColor;
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        for (let x = 36; x < 476; x += 10) {
          const y = 180 + Math.sin(x * 0.03) * 35 + Math.cos(x * 0.08) * 15;
          if (x === 36) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();

        ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
        ctx.font = "10px monospace";
        ctx.fillText("GPU TIER: ULTRA  •  LATENCY: 1.2ms  •  FPS: 120", 36, 260);
      }

      const screenTexture = new THREE.CanvasTexture(screenCanvas);
      const screenMat = new THREE.MeshBasicMaterial({ map: screenTexture });
      const screen = new THREE.Mesh(screenGeom, screenMat);
      screen.position.z = 0.045;
      group.add(screen);

      // 3. Glowing edge border
      const edgeGeom = new THREE.EdgesGeometry(chassisGeom);
      const edgeMat = new THREE.LineBasicMaterial({ color: new THREE.Color(accentColor), linewidth: 2 });
      const edge = new THREE.LineSegments(edgeGeom, edgeMat);
      group.add(edge);

      // Lighting
      const ambient = new THREE.AmbientLight(0xffffff, 0.8);
      scene.add(ambient);

      const light = new THREE.DirectionalLight(0xffffff, 2);
      light.position.set(3, 4, 5);
      scene.add(light);

      let targetRotX = 0;
      let targetRotY = 0;

      return {
        onFrame: (time: number) => {
          const floatOffset = Math.sin(time * 0.002) * 0.08;
          group.position.y = floatOffset;

          group.rotation.x += (targetRotX - group.rotation.x) * 0.06;
          group.rotation.y += (targetRotY - group.rotation.y) * 0.06;
        },
        onPointerMove: (x: number, y: number) => {
          targetRotY = x * 0.6;
          targetRotX = -y * 0.45;
        },
        dispose: () => {
          chassisGeom.dispose();
          chassisMat.dispose();
          screenGeom.dispose();
          screenMat.dispose();
          screenTexture.dispose();
          edgeGeom.dispose();
          edgeMat.dispose();
        },
      };
    },
    [accentColor],
  );

  return (
    <ThreeCanvas
      onInitScene={initScene}
      className={className}
      fallback={
        <div className="flex h-full w-full items-center justify-center bg-surface/30">
          <span className="font-mono text-xs text-graphite">3D Spatial Device</span>
        </div>
      }
      {...rest}
    />
  );
}
