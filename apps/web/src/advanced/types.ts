/**
 * OpenUI Advanced Resource Ecosystem — Types & Taxonomy
 *
 * Defines the schema for the advanced visual catalogue:
 * 220+ resources across Heroes, 3D / Spatial, Backgrounds, Buttons,
 * Text Animations, UI Elements, CSS, Landing Pages, and Motion Design.
 */

export type AdvancedCategorySlug =
  | "heroes"
  | "spatial-3d"
  | "backgrounds"
  | "buttons"
  | "text-animations"
  | "ui-elements"
  | "css-layouts"
  | "landing-pages"
  | "motion-design";

export type AdvancedTechnology =
  | "three-webgl"
  | "canvas-2d"
  | "css-transforms"
  | "spring-physics"
  | "svg-paths"
  | "dom-motion";

export type PerformanceTier = "instant" | "high" | "moderate" | "heavy";

export interface AdvancedResourceFingerprint {
  visualFamily: string;
  motionProfile: string;
  interactionProfile: string;
  performanceTier: PerformanceTier;
  accessibilityProfile: string;
  responsiveProfile: string;
}

export interface AdvancedResourcePropDoc {
  name: string;
  type: string;
  default?: string;
  description: string;
}

export interface AdvancedResourceItem {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: AdvancedCategorySlug;
  subcategory: string;
  technology: AdvancedTechnology;
  tags: string[];
  dependencies: string[];
  fingerprint: AdvancedResourceFingerprint;
  props?: AdvancedResourcePropDoc[];
  sourceCode: string;
  previewFamily: string;
}

export interface AdvancedCategoryMeta {
  slug: AdvancedCategorySlug;
  title: string;
  description: string;
  icon: string;
  itemCount: number;
}
