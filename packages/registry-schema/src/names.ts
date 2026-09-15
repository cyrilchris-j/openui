import { NAMESPACE_PATTERN, REGISTRY_ITEM_NAME_PATTERN } from "./constants.js";

export interface ParsedRegistryName {
  namespace: string | null;
  name: string;
}

/**
 * Parses `default/magnetic-button` or `magnetic-button`.
 *
 * The namespace is optional; an unqualified name resolves against the project's
 * configured namespaces in order, which is what makes `openui add magnetic-button`
 * work even though the item lives in the `default` namespace.
 */
export function parseRegistryName(value: string, defaultNamespace?: string): ParsedRegistryName {
  const trimmed = value.trim().replace(/^\/+|\/+$/g, "");
  const segments = trimmed.split("/");

  if (segments.length === 1) {
    return { namespace: defaultNamespace ?? null, name: segments[0]! };
  }
  if (segments.length === 2) {
    return { namespace: segments[0]!, name: segments[1]! };
  }
  throw new Error(`Invalid registry name "${value}": expected "name" or "namespace/name".`);
}

export function isRegistryItemName(value: string): boolean {
  return REGISTRY_ITEM_NAME_PATTERN.test(value);
}

export function isNamespace(value: string): boolean {
  return NAMESPACE_PATTERN.test(value);
}

export function qualifyRegistryName(namespace: string | null, name: string): string {
  return namespace ? `${namespace}/${name}` : name;
}

/** Stable sort used everywhere names are listed, so output is diff-friendly. */
export function compareNames(a: string, b: string): number {
  return a < b ? -1 : a > b ? 1 : 0;
}

/** Splits `motion@^12` into `{ name: "motion", range: "^12" }`. */
export function splitDependency(specifier: string): { name: string; range: string | null } {
  const at = specifier.lastIndexOf("@");
  if (at <= 0) return { name: specifier, range: null };
  return { name: specifier.slice(0, at), range: specifier.slice(at + 1) };
}

export function packageNameOnly(specifier: string): string {
  return splitDependency(specifier).name;
}
