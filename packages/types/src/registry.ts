import type { DesignDna, ResourceFingerprint } from "./design.js";
import type { Difficulty, ResourceType } from "./resource.js";

/**
 * Registry item type strings. The `registry:` prefix mirrors the convention
 * established by other registry ecosystems so that a consumer can tell at a
 * glance whether a file is application source, a stylesheet or metadata.
 */
export const REGISTRY_ITEM_TYPES = [
  "registry:component",
  "registry:text",
  "registry:motion",
  "registry:interaction",
  "registry:background",
  "registry:layout",
  "registry:section",
  "registry:block",
  "registry:theme",
  "registry:pattern",
  "registry:template",
  "registry:ai",
  "registry:hook",
  "registry:utility",
  "registry:config",
] as const;

export type RegistryItemType = (typeof REGISTRY_ITEM_TYPES)[number];

/** Maps a domain resource type onto its registry item type. */
export const RESOURCE_TYPE_TO_REGISTRY_ITEM_TYPE: Record<ResourceType, RegistryItemType> = {
  component: "registry:component",
  text: "registry:text",
  motion: "registry:motion",
  interaction: "registry:interaction",
  background: "registry:background",
  layout: "registry:layout",
  section: "registry:section",
  block: "registry:block",
  theme: "registry:theme",
  pattern: "registry:pattern",
  template: "registry:template",
  ai: "registry:ai",
  hook: "registry:hook",
  utility: "registry:utility",
  config: "registry:config",
};

export const REGISTRY_ITEM_TYPE_TO_RESOURCE_TYPE: Record<RegistryItemType, ResourceType> = {
  "registry:component": "component",
  "registry:text": "text",
  "registry:motion": "motion",
  "registry:interaction": "interaction",
  "registry:background": "background",
  "registry:layout": "layout",
  "registry:section": "section",
  "registry:block": "block",
  "registry:theme": "theme",
  "registry:pattern": "pattern",
  "registry:template": "template",
  "registry:ai": "ai",
  "registry:hook": "hook",
  "registry:utility": "utility",
  "registry:config": "config",
};

/** Where a file lands in the consumer's project. */
export const REGISTRY_FILE_TARGETS = [
  "components",
  "lib",
  "hooks",
  "styles",
  "app",
  "ai",
  "config",
] as const;
export type RegistryFileTarget = (typeof REGISTRY_FILE_TARGETS)[number];

/** One file entry as written by a contributor inside `registry.json`. */
export interface RegistryItemFile {
  /** Path relative to the registry item directory. Validated for traversal. */
  path: string;
  type: RegistryItemType;
  /** Optional override for the destination alias (`styles`, `ai`, ...). */
  target?: RegistryFileTarget;
}

export interface RegistryItemAuthor {
  name: string;
  url?: string;
}

export interface RegistryItemMeta {
  /** Design DNA summary so consumers can filter without downloading source. */
  dna?: Partial<DesignDna>;
  difficulty?: Difficulty;
  /** e.g. `responsive`, `dark-mode`, `reduced-motion-safe`. */
  features?: string[];
  /** Semver range of the peer framework the item targets (usually React). */
  peer?: Record<string, string>;
  /** Subcategory slug within the category, e.g. `navigation`, `forms`. */
  subcategory?: string;
  /** Behavioural fingerprint used by the uniqueness engine. */
  fingerprint?: ResourceFingerprint;
}

/** Shape of `registry.json` inside a single registry item directory. */
export interface RegistryItem {
  $schema?: string;
  name: string;
  type: RegistryItemType;
  title: string;
  description: string;
  category: string;
  /** npm packages the item imports at runtime. */
  dependencies: string[];
  /** Other registry items this item imports (resolved recursively). */
  registryDependencies: string[];
  files: RegistryItemFile[];
  tags?: string[];
  designSystem?: string;
  license?: string;
  docs?: string;
  author?: RegistryItemAuthor;
  meta?: RegistryItemMeta;
}

/** A registry item after the build pipeline has inlined content. */
export interface BuiltRegistryFile extends RegistryItemFile {
  /** UTF-8 source of the file. */
  content: string;
  contentHash: string;
  sizeBytes: number;
}

export interface BuiltRegistryItem extends Omit<RegistryItem, "files"> {
  files: BuiltRegistryFile[];
  /** Absolute, cacheable URL of this item's artifact. */
  url: string;
  /** `design.md` as raw markdown, when the item ships one. */
  designRules?: string;
}

export interface RegistryIndexEntry {
  name: string;
  /** Namespace the item is published under. Names stay unique across namespaces. */
  namespace: string;
  type: RegistryItemType;
  title: string;
  description: string;
  category: string;
  resourceType: ResourceType;
  author?: RegistryItemAuthor;
  tags: string[];
  designSystem?: string;
  dependencies: string[];
  registryDependencies: string[];
  license?: string;
  difficulty?: Difficulty;
  dna?: Partial<DesignDna>;
  /** Subcategory within the category, threaded from `meta.subcategory`. */
  subcategory?: string;
  /** Behavioural fingerprint, threaded from `meta.fingerprint`. */
  fingerprint?: ResourceFingerprint;
  /** Relative URL of the item artifact, e.g. `components/magnetic-button.json`. */
  url: string;
  /** Stable hash of the item's source, used for integrity checks by the CLI. */
  integrity: string;
}

export interface RegistryIndex {
  $schema: string;
  name: string;
  homepage: string;
  version: string;
  generatedAt: string;
  /** Namespaces published from this repository, in resolution order. */
  namespaces: string[];
  items: RegistryIndexEntry[];
}

/** Result of validating a single registry item directory. */
export interface RegistryValidationIssue {
  level: "error" | "warning";
  item: string | null;
  path: string | null;
  code: string;
  message: string;
}

export interface RegistryValidationResult {
  ok: boolean;
  itemCount: number;
  fileCount: number;
  issues: RegistryValidationIssue[];
}

export const REGISTRY_SCHEMA_PATH = "/schema/registry-item.json";
export const OPENUI_CONFIG_SCHEMA_PATH = "/schema/openui.json";
