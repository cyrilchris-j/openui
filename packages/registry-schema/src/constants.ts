/**
 * Registry-wide constants.
 *
 * Everything a contributor can trip over lives here so that the error message,
 * the documentation and the CI check cannot disagree.
 */

export const REGISTRY_ITEM_NAME_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
export const NAMESPACE_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
/** npm package name, optionally with an explicit version range (`motion@^12`). */
export const DEPENDENCY_PATTERN =
  /^(?:@[a-z0-9-~][a-z0-9-._~]*\/)?[a-z0-9-~][a-z0-9-._~]*(?:@(?:[\^~]?\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?|\^?\d+\.x|\*|(?:>=|<=|>|<)\d+\.\d+\.\d+))?$/;
export const LICENSE_ID_PATTERN = /^(?:[A-Za-z0-9.+-]+|LicenseRef-[A-Za-z0-9.-]+)$/;
export const TOKEN_NAME_PATTERN = /^[a-z0-9]+(?:[-./][a-z0-9]+)*$/;
export const TAG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
export const VERSION_PATTERN = /^\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?$/;

export const LIMITS = {
  name: 64,
  title: 80,
  descriptionMin: 20,
  descriptionMax: 320,
  changelogMax: 4000,
  tagsMax: 12,
  dependenciesMax: 40,
  registryDependenciesMax: 30,
  filesMax: 40,
  versionCommentMax: 500,
} as const;

/**
 * File extensions the registry will inline into artifacts. Anything else is
 * rejected, which stops a contribution from smuggling a binary or executable
 * into a published version.
 */
export const ALLOWED_FILE_EXTENSIONS = [
  ".tsx",
  ".ts",
  ".jsx",
  ".js",
  ".css",
  ".json",
  ".md",
  ".mdx",
  ".txt",
  ".webp",
  ".png",
  ".svg",
] as const;

export const TEXT_FILE_EXTENSIONS = ALLOWED_FILE_EXTENSIONS.filter(
  (extension) => !extension.startsWith(".png") && !extension.startsWith(".webp"),
);

/** Files that must exist in every registry item directory. */
export const REQUIRED_ITEM_FILES = ["registry.json", "README.md"] as const;

/** Resource types that must ship a runnable `demo.tsx`. */
export const DEMO_REQUIRED_ITEM_TYPES = [
  "registry:component",
  "registry:text",
  "registry:motion",
  "registry:interaction",
  "registry:background",
  "registry:layout",
  "registry:section",
  "registry:block",
  "registry:pattern",
  "registry:template",
] as const;

export const SPDX_LICENSES = [
  { id: "MIT", name: "MIT License", osiApproved: true },
  { id: "Apache-2.0", name: "Apache License 2.0", osiApproved: true },
  { id: "BSD-3-Clause", name: "BSD 3-Clause", osiApproved: true },
  { id: "BSD-2-Clause", name: "BSD 2-Clause", osiApproved: true },
  { id: "ISC", name: "ISC License", osiApproved: true },
  { id: "MPL-2.0", name: "Mozilla Public License 2.0", osiApproved: true },
  { id: "LGPL-3.0-only", name: "GNU LGPL v3.0 only", osiApproved: true },
  { id: "GPL-3.0-only", name: "GNU GPL v3.0 only", osiApproved: true },
  { id: "AGPL-3.0-only", name: "GNU AGPL v3.0 only", osiApproved: true },
  { id: "Unlicense", name: "The Unlicense", osiApproved: true },
  { id: "CC0-1.0", name: "Creative Commons Zero v1.0", osiApproved: false },
  { id: "CC-BY-4.0", name: "Creative Commons Attribution 4.0", osiApproved: false },
] as const;

export const SPDX_LICENSE_IDS = SPDX_LICENSES.map((license) => license.id);

/**
 * Runtime packages first-party resources are allowed to depend on.
 *
 * This is a *policy* allow-list, not a hard security boundary: it keeps the
 * registry coherent (one motion library, one primitive layer) and makes
 * dependency review tractable. Contributors can propose additions in a PR.
 */
export const APPROVED_PACKAGES = [
  "react",
  "react-dom",
  "motion",
  "framer-motion",
  "clsx",
  "tailwind-merge",
  "class-variance-authority",
  "lucide-react",
  "@radix-ui/react-accordion",
  "@radix-ui/react-dialog",
  "@radix-ui/react-dropdown-menu",
  "@radix-ui/react-label",
  "@radix-ui/react-popover",
  "@radix-ui/react-scroll-area",
  "@radix-ui/react-select",
  "@radix-ui/react-separator",
  "@radix-ui/react-slider",
  "@radix-ui/react-slot",
  "@radix-ui/react-switch",
  "@radix-ui/react-tabs",
  "@radix-ui/react-toggle",
  "@radix-ui/react-tooltip",
  "@openui/primitives",
  "@openui/ui",
  "@openui/design-system",
  "@openui/utils",
] as const;

/** Dependency specifiers that must never be published. */
export const FORBIDDEN_DEPENDENCY_PREFIXES = [
  "git:",
  "git+",
  "ssh:",
  "file:",
  "link:",
  "workspace:",
  "http:",
  "https:",
  "npm:",
  "portal:",
  "patch:",
  "github:",
] as const;
