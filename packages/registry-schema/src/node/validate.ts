import type { Dirent } from "node:fs";
import { access, readdir } from "node:fs/promises";
import { join, relative, resolve } from "node:path";

import {
  REGISTRY_ITEM_TYPE_TO_RESOURCE_TYPE,
  categoryAccepts,
  type RegistryValidationIssue,
  type RegistryValidationResult,
} from "@openui/types";
import { toPosix } from "@openui/utils/node";

import {
  DEMO_REQUIRED_ITEM_TYPES,
  REQUIRED_ITEM_FILES,
} from "../constants.js";
import { inspectDependencies } from "../dependency-policy.js";
import { parseRegistryName } from "../names.js";
import { AUXILIARY_FILES, loadRegistryItem, type LoadedRegistryItem } from "./load-item.js";

/** Resource types where a `design.md` is expected to exist. */
const DESIGN_MD_EXPECTED_ITEM_TYPES = new Set<string>(DEMO_REQUIRED_ITEM_TYPES);

const AUXILIARY_SET = new Set<string>(AUXILIARY_FILES);

export interface ValidateItemOptions {
  /** Directory of the whole registry, used to report repo-relative paths. */
  registryRoot?: string;
  requireScreenshot?: boolean;
}

function makeIssue(
  level: "error" | "warning",
  code: string,
  message: string,
  item: string | null,
  path: string | null,
): RegistryValidationIssue {
  return { level, code, message, item, path };
}

/**
 * Validates one registry item directory.
 *
 * Returns issues instead of throwing so a single broken contribution does not
 * hide the problems in the other 40 items — CI prints the whole list.
 */
export async function validateItemDirectory(
  itemDir: string,
  options: ValidateItemOptions = {},
): Promise<RegistryValidationIssue[]> {
  const issues: RegistryValidationIssue[] = [];
  const directory = resolve(itemDir);
  const relDir = options.registryRoot ? toPosix(relative(options.registryRoot, directory)) : directory;
  const directoryName = relDir.split("/").pop() ?? "";

  let loaded: LoadedRegistryItem;
  try {
    loaded = await loadRegistryItem(directory);
  } catch (error) {
    const details =
      error && typeof error === "object" && "details" in error
        ? ((error as { details?: Array<{ path: string; message: string }> }).details ?? [])
        : [];
    const baseMessage = error instanceof Error ? error.message : "Unable to load registry item.";
    if (details.length > 0) {
      for (const detail of details) {
        issues.push(
          makeIssue("error", "schema_invalid", `${detail.path}: ${detail.message}`, directoryName, relDir),
        );
      }
    } else {
      issues.push(makeIssue("error", "load_failed", baseMessage, directoryName, relDir));
    }
    return issues;
  }

  const { item } = loaded;
  const itemLabel = item.name;

  // --- identity --------------------------------------------------------------
  if (item.name !== directoryName) {
    issues.push(
      makeIssue(
        "error",
        "name_mismatch",
        `registry.json declares name "${item.name}" but the directory is "${directoryName}".`,
        itemLabel,
        relDir,
      ),
    );
  }

  const resourceType = REGISTRY_ITEM_TYPE_TO_RESOURCE_TYPE[item.type];
  if (!categoryAccepts(item.category, resourceType)) {
    issues.push(
      makeIssue(
        "error",
        "category_mismatch",
        `Category "${item.category}" does not accept resource type "${resourceType}".`,
        itemLabel,
        relDir,
      ),
    );
  }

  // --- required files --------------------------------------------------------
  for (const required of REQUIRED_ITEM_FILES) {
    if (!loaded.allFiles.includes(required)) {
      issues.push(
        makeIssue("error", "missing_file", `Missing required file "${required}".`, itemLabel, relDir),
      );
    }
  }

  if (DEMO_REQUIRED_ITEM_TYPES.includes(item.type as (typeof DEMO_REQUIRED_ITEM_TYPES)[number])) {
    if (!loaded.demoSource) {
      issues.push(
        makeIssue(
          "error",
          "missing_demo",
          "Missing demo.tsx. Every previewable resource ships a runnable demo.",
          itemLabel,
          relDir,
        ),
      );
    }
  }

  if (options.requireScreenshot !== false && !loaded.screenshotPath) {
    issues.push(
      makeIssue(
        "warning",
        "missing_preview",
        "No screenshot.webp found. Run `pnpm generate:og` before publishing.",
        itemLabel,
        relDir,
      ),
    );
  }

  if (!loaded.designMarkdown && DESIGN_MD_EXPECTED_ITEM_TYPES.has(item.type)) {
    issues.push(
      makeIssue(
        "warning",
        "missing_design_md",
        "No design.md. Design-bearing resources should document their DNA and rules.",
        itemLabel,
        relDir,
      ),
    );
  }

  if (loaded.designRules) {
    for (const warning of loaded.designRules.warnings) {
      issues.push(makeIssue("warning", "design_md_parse", warning, itemLabel, `${relDir}/design.md`));
    }
    if (loaded.designRules.rules.rules.length === 0) {
      issues.push(
        makeIssue(
          "warning",
          "design_md_empty_rules",
          "design.md declares DNA but no rules. AI tools consume the Rules section.",
          itemLabel,
          `${relDir}/design.md`,
        ),
      );
    }
  }

  // --- declared vs present files --------------------------------------------
  const declared = new Set(item.files.map((file) => file.path));
  for (const file of loaded.allFiles) {
    if (declared.has(file)) continue;
    if (AUXILIARY_SET.has(file)) continue;
    if (file.startsWith(".")) continue;
    issues.push(
      makeIssue(
        "error",
        "unlisted_file",
        `File "${file}" is present but not declared in registry.json files[].`,
        itemLabel,
        relDir,
      ),
    );
  }

  // --- dependencies ----------------------------------------------------------
  for (const finding of inspectDependencies(item.dependencies)) {
    issues.push(makeIssue(finding.level, `dependency_${finding.code}`, finding.message, itemLabel, relDir));
  }

  const selfReference = item.registryDependencies
    .map((dependency) => parseRegistryName(dependency).name)
    .filter((name) => name === item.name);
  for (const name of selfReference) {
    issues.push(
      makeIssue("error", "self_reference", `Registry dependency on itself ("${name}").`, itemLabel, relDir),
    );
  }

  // --- documentation quality -------------------------------------------------
  if (loaded.readme && loaded.readme.trim().length < 80) {
    issues.push(
      makeIssue(
        "warning",
        "thin_readme",
        "README.md is very short. Document props, accessibility notes and what makes it distinctive.",
        itemLabel,
        relDir,
      ),
    );
  }

  if (!item.license) {
    issues.push(
      makeIssue(
        "warning",
        "missing_license",
        "No license declared. Each resource must make its license explicit.",
        itemLabel,
        relDir,
      ),
    );
  }

  // AI resources describe rules for other resources; they do not carry a design
  // language of their own, so they are exempt from the DNA requirement.
  if (item.type !== "registry:ai" && !item.meta?.dna && !loaded.designRules) {
    issues.push(
      makeIssue(
        "warning",
        "missing_dna",
        "No design DNA in meta.dna or design.md; the resource cannot be faceted by design.",
        itemLabel,
        relDir,
      ),
    );
  }

  return issues;
}

/** Every directory under `root` that contains a `registry.json`. */
export async function discoverItemDirectories(root: string): Promise<string[]> {
  const found: string[] = [];

  async function visit(current: string): Promise<void> {
    let entries: Dirent[];
    try {
      entries = await readdir(current, { withFileTypes: true });
    } catch {
      return;
    }
    const names = new Set(entries.map((entry) => entry.name));
    if (names.has("registry.json")) {
      found.push(current);
      return; // an item never nests inside another item
    }
    for (const entry of entries) {
      if (!entry.isDirectory()) continue;
      if (entry.name === "node_modules" || entry.name.startsWith(".")) continue;
      await visit(join(current, entry.name));
    }
  }

  await visit(resolve(root));
  return found.sort();
}

/** Namespaces are the first-level directories that contain registry items. */
export async function discoverNamespaces(root: string): Promise<string[]> {
  const itemDirs = await discoverItemDirectories(root);
  const namespaces = new Set<string>();
  const rootAbsolute = resolve(root);
  for (const dir of itemDirs) {
    const rel = toPosix(relative(rootAbsolute, dir));
    const [namespace] = rel.split("/");
    if (namespace) namespaces.add(namespace);
  }
  return [...namespaces].sort();
}

export interface ValidateRegistryOptions {
  registryRoot: string;
  requireScreenshot?: boolean;
  /** Treat warnings as failures. Used by the publish job. */
  strict?: boolean;
}

export interface ValidateRegistryOutput {
  result: RegistryValidationResult;
  issues: RegistryValidationIssue[];
  items: LoadedRegistryItem[];
}

/**
 * Validates the whole registry: every item independently, then the
 * cross-cutting rules that only make sense once all items are known
 * (unique names, resolvable and acyclic registry dependencies).
 */
export async function validateRegistry(
  options: ValidateRegistryOptions,
): Promise<ValidateRegistryOutput> {
  const root = resolve(options.registryRoot);
  const directories = await discoverItemDirectories(root);
  const issues: RegistryValidationIssue[] = [];
  const items: LoadedRegistryItem[] = [];

  for (const directory of directories) {
    const itemIssues = await validateItemDirectory(directory, {
      registryRoot: root,
      ...(options.requireScreenshot === undefined ? {} : { requireScreenshot: options.requireScreenshot }),
    });
    issues.push(...itemIssues);
    if (itemIssues.some((entry) => entry.level === "error")) continue;

    try {
      items.push(await loadRegistryItem(directory));
    } catch {
      /* already reported above */
    }
  }

  const byName = new Map<string, LoadedRegistryItem>();
  for (const item of items) {
    const existing = byName.get(item.item.name);
    if (existing) {
      issues.push(
        makeIssue(
          "error",
          "duplicate_name",
          `Duplicate registry item name "${item.item.name}". Names are global across namespaces.`,
          item.item.name,
          toPosix(relative(root, item.directory)),
        ),
      );
      continue;
    }
    byName.set(item.item.name, item);
  }

  // Registry dependency resolution + cycle detection.
  const state = new Map<string, "visiting" | "done">();
  const visit = (name: string, trail: string[]): void => {
    const current = state.get(name);
    if (current === "done") return;
    if (current === "visiting") {
      issues.push(
        makeIssue(
          "error",
          "dependency_cycle",
          `Registry dependency cycle: ${[...trail, name].join(" → ")}.`,
          name,
          null,
        ),
      );
      return;
    }
    const item = byName.get(name);
    if (!item) return;
    state.set(name, "visiting");
    for (const dependency of item.item.registryDependencies) {
      const resolvedName = parseRegistryName(dependency).name;
      if (!byName.has(resolvedName)) {
        issues.push(
          makeIssue(
            "error",
            "unresolved_registry_dependency",
            `Registry dependency "${dependency}" does not exist in this registry.`,
            name,
            null,
          ),
        );
        continue;
      }
      visit(resolvedName, [...trail, name]);
    }
    state.set(name, "done");
  };
  for (const name of byName.keys()) visit(name, []);

  // `designSystem` must point at a design system item.
  for (const item of byName.values()) {
    const designSystem = item.item.designSystem;
    if (!designSystem) continue;
    const target = byName.get(designSystem);
    if (!target) {
      issues.push(
        makeIssue(
          "error",
          "unknown_design_system",
          `Unknown design system "${designSystem}".`,
          item.item.name,
          null,
        ),
      );
    } else if (target.item.category !== "design-systems") {
      issues.push(
        makeIssue(
          "warning",
          "unexpected_design_system_target",
          `"${designSystem}" is not published in the design-systems category.`,
          item.item.name,
          null,
        ),
      );
    }
  }

  const errorCount = issues.filter((issue) => issue.level === "error").length;
  const warningCount = issues.filter((issue) => issue.level === "warning").length;
  const fileCount = items.reduce((total, item) => total + item.files.length, 0);

  return {
    issues,
    items,
    result: {
      ok: errorCount === 0 && (!options.strict || warningCount === 0),
      itemCount: items.length,
      fileCount,
      issues,
    },
  };
}

/** Exposed for tests and the CLI: does this path contain a registry item? */
export async function isRegistryItemDirectory(directory: string): Promise<boolean> {
  try {
    await access(join(directory, "registry.json"));
    return true;
  } catch {
    return false;
  }
}
