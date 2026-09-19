/**
 * OpenUI Visual Engine — Core Taxonomy & Types
 *
 * Defines the interaction models, visual families, motion profiles,
 * and device capability structures used across the engine.
 */

export type VisualFamily =
  | "editorial"
  | "kinetic"
  | "organic"
  | "glitch"
  | "procedural"
  | "spatial"
  | "technical"
  | "minimal";

export type MotionProfileType =
  | "instant"
  | "subtle"
  | "spring-natural"
  | "kinetic-snappy"
  | "fluid-damped"
  | "atmospheric-drift";

export type InteractionProfileType =
  | "pointer-attraction"
  | "cursor-proximity"
  | "tilt-parallax"
  | "scroll-driven"
  | "gesture-drag"
  | "hover-lens"
  | "state-toggle";

export type RenderTarget = "dom" | "canvas2d" | "webgl";

export interface DeviceCapabilities {
  isTouch: boolean;
  hasHover: boolean;
  prefersReducedMotion: boolean;
  hasWebGL: boolean;
  isLowPower: boolean;
  pixelRatio: number;
}

export interface PerformanceMetrics {
  fps: number;
  renderTarget: RenderTarget;
  activeParticles?: number;
  degraded: boolean;
}

export interface VisualEngineResourceMeta {
  visualFamily: VisualFamily;
  motionProfile: MotionProfileType;
  interactionProfile: InteractionProfileType;
  supportsReducedMotion: boolean;
  supportsWebGL?: boolean;
  recommendedRenderTarget: RenderTarget;
}

export interface VisualEngineCategory {
  id: string;
  title: string;
  description: string;
}

export const VISUAL_CATEGORIES: VisualEngineCategory[] = [
  { id: "kinetic-typography", title: "Kinetic Typography", description: "Dynamic glyph animation, scramble decryption, and variable fonts." },
  { id: "micro-interactions", title: "Micro-Interactions", description: "Spring buttons, hold-to-confirm triggers, and tactile toggles." },
  { id: "webgl-3d", title: "WebGL & 3D Objects", description: "Three.js spatial scenes, shaders, and procedural meshes." },
  { id: "procedural-backgrounds", title: "Procedural Backgrounds", description: "Harmonic auroras, particle fields, and algorithmic noise waves." },
  { id: "cursor-effects", title: "Cursor Craft", description: "Target-following spotlights, glow trailing, and pointer physics." },
  { id: "hover-craft", title: "Hover Interactions", description: "Bounded magnetic attraction, energy borders, and spotlight cards." },
  { id: "scroll-driven", title: "Scroll-Driven Motion", description: "Staggered reveals, parallax layers, and progress rings." },
  { id: "creative-components", title: "Creative Components", description: "Bento layouts, proximity docks, and digit rollers." },
];
