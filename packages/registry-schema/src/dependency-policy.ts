import {
  APPROVED_PACKAGES,
  DEPENDENCY_PATTERN,
  FORBIDDEN_DEPENDENCY_PREFIXES,
} from "./constants.js";
import { splitDependency } from "./names.js";

/**
 * Dependency policy.
 *
 * Registry items are installed into other people's projects, so a dependency
 * claim is treated as untrusted input:
 *
 *  - non-registry specifiers (`git:`, `file:`, `https:`, `workspace:`) are
 *    errors — they make builds unreproducible and can execute arbitrary code
 *  - wildcard ranges are errors — they make installs non-deterministic
 *  - packages outside the approved set are warnings, surfaced in CI and the
 *    submission review screen, so a maintainer makes the final call
 */

export interface DependencyFinding {
  level: "error" | "warning";
  specifier: string;
  code:
    | "forbidden_specifier"
    | "invalid_name"
    | "wildcard_range"
    | "unapproved_package"
    | "self_reference";
  message: string;
}

const WILDCARD_RANGES = new Set(["", "*", "latest", "x", "next", "canary"]);

export function isApprovedPackage(name: string): boolean {
  return (APPROVED_PACKAGES as readonly string[]).includes(name);
}

export function isWildcardRange(range: string | null): boolean {
  if (range === null) return false;
  return WILDCARD_RANGES.has(range.trim().toLowerCase());
}

export function inspectDependency(specifier: string, options: { requireApproved?: boolean } = {}): DependencyFinding[] {
  const findings: DependencyFinding[] = [];
  const trimmed = specifier.trim();

  const forbidden = FORBIDDEN_DEPENDENCY_PREFIXES.find((prefix) => trimmed.startsWith(prefix));
  if (forbidden) {
    findings.push({
      level: "error",
      specifier: trimmed,
      code: "forbidden_specifier",
      message: `"${forbidden}" specifiers are not publishable. Use a versioned npm package.`,
    });
    return findings;
  }

  if (!DEPENDENCY_PATTERN.test(trimmed)) {
    findings.push({
      level: "error",
      specifier: trimmed,
      code: "invalid_name",
      message: "Not a valid npm package name (optionally with a semver range).",
    });
    return findings;
  }

  const { name, range } = splitDependency(trimmed);
  if (isWildcardRange(range)) {
    findings.push({
      level: "error",
      specifier: trimmed,
      code: "wildcard_range",
      message: `Wildcard range "${range}" is not allowed. Pin a range, e.g. \`${name}@^12.0.0\`.`,
    });
  }

  if (options.requireApproved !== false && !isApprovedPackage(name)) {
    findings.push({
      level: "warning",
      specifier: trimmed,
      code: "unapproved_package",
      message: `"${name}" is not in the approved dependency list. A maintainer must review it.`,
    });
  }

  return findings;
}

export function inspectDependencies(
  specifiers: readonly string[],
  options: { requireApproved?: boolean } = {},
): DependencyFinding[] {
  const findings: DependencyFinding[] = [];
  const seen = new Set<string>();
  const known = new Set(specifiers.map((specifier) => splitDependency(specifier).name));

  for (const specifier of specifiers) {
    if (seen.has(specifier)) {
      findings.push({
        level: "warning",
        specifier,
        code: "invalid_name",
        message: `Duplicate dependency "${specifier}".`,
      });
      continue;
    }
    seen.add(specifier);

    const { name } = splitDependency(specifier);
    if (name.startsWith("@openui/")) {
      const packageName = name.replace("@openui/", "");
      // A resource must not depend on itself through the workspace alias.
      if (known.has(packageName)) {
        findings.push({
          level: "error",
          specifier,
          code: "self_reference",
          message: "A registry item cannot depend on itself.",
        });
      }
    }

    findings.push(...inspectDependency(specifier, options));
  }

  return findings;
}

export function hasErrors(findings: readonly DependencyFinding[]): boolean {
  return findings.some((finding) => finding.level === "error");
}
