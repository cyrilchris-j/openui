import type { ResourceType } from "./resource.js";

/**
 * Design categories.
 *
 * A category is the *editorial* grouping shown in navigation — it is not the
 * same thing as a resource type. `Text` and `Motion` are categories in their own
 * right so that text and motion work is never buried under "Components", which
 * is the single most common failure mode of component registries.
 */
export interface ResourceCategory {
  slug: string;
  name: string;
  /** One-line editorial description used in navigation and metadata. */
  description: string;
  /** Resource types this category accepts. */
  resourceTypes: readonly ResourceType[];
  sortOrder: number;
}

export const RESOURCE_CATEGORIES: readonly ResourceCategory[] = [
  {
    slug: "components",
    name: "Components",
    description: "Composable interface elements with real interaction behaviour.",
    resourceTypes: ["component", "hook", "utility", "config"],
    sortOrder: 10,
  },
  {
    slug: "text",
    name: "Text",
    description: "Typographic treatments: headings, kinetic type, split text, tickers.",
    resourceTypes: ["text"],
    sortOrder: 20,
  },
  {
    slug: "motion",
    name: "Motion",
    description: "Entrances, reveals, transitions and scroll-linked movement.",
    resourceTypes: ["motion"],
    sortOrder: 30,
  },
  {
    slug: "interactions",
    name: "Interactions",
    description: "Pointer, cursor and gesture-driven behaviour.",
    resourceTypes: ["interaction"],
    sortOrder: 40,
  },
  {
    slug: "backgrounds",
    name: "Backgrounds",
    description: "Surfaces, grain, grids, noise and atmospheric layers.",
    resourceTypes: ["background"],
    sortOrder: 50,
  },
  {
    slug: "layouts",
    name: "Layouts",
    description: "Structural shells and composition primitives.",
    resourceTypes: ["layout"],
    sortOrder: 60,
  },
  {
    slug: "sections",
    name: "Sections",
    description: "Page-level sections: heroes, footers, navigation, editorial intros.",
    resourceTypes: ["section"],
    sortOrder: 70,
  },
  {
    slug: "blocks",
    name: "Blocks",
    description: "Larger functional assemblies: dashboards, pricing, data surfaces.",
    resourceTypes: ["block"],
    sortOrder: 80,
  },
  {
    slug: "themes",
    name: "Themes",
    description: "Token sets that repaint an interface without touching its code.",
    resourceTypes: ["theme"],
    sortOrder: 90,
  },
  {
    slug: "patterns",
    name: "Patterns",
    description: "Documented, repeatable composition recipes.",
    resourceTypes: ["pattern"],
    sortOrder: 100,
  },
  {
    slug: "templates",
    name: "Templates",
    description: "Whole pages built from registry resources.",
    resourceTypes: ["template"],
    sortOrder: 110,
  },
  {
    slug: "design-systems",
    name: "Design Systems",
    description: "Persistent identity: DNA, tokens and rules AI must follow.",
    resourceTypes: ["theme", "pattern", "template"],
    sortOrder: 120,
  },
  {
    slug: "ai",
    name: "AI",
    description: "Design rules, skills, agents and prompts that consume the registry.",
    resourceTypes: ["ai"],
    sortOrder: 130,
  },
] as const;

export const CATEGORY_SLUGS = RESOURCE_CATEGORIES.map((category) => category.slug);

export function findCategory(slug: string): ResourceCategory | undefined {
  return RESOURCE_CATEGORIES.find((category) => category.slug === slug);
}

export function categoryAccepts(slug: string, resourceType: ResourceType): boolean {
  const category = findCategory(slug);
  if (!category) return false;
  return category.resourceTypes.includes(resourceType);
}
