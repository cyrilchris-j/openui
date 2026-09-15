import { describe, expect, it } from "vitest";

import { formatZodError, openuiConfigSchema, registryItemSchema } from "./schemas.js";
import { inspectDependencies, inspectDependency } from "./dependency-policy.js";
import { parseRegistryName, splitDependency } from "./names.js";

const validItem = {
  name: "magnetic-button",
  type: "registry:component",
  title: "Magnetic Button",
  description: "A physics-inspired button that leans toward the pointer.",
  category: "components",
  dependencies: ["motion"],
  registryDependencies: [],
  files: [{ path: "magnetic-button.tsx", type: "registry:component" }],
} as const;

describe("registryItemSchema", () => {
  it("accepts a minimal valid item and applies defaults", () => {
    const parsed = registryItemSchema.parse(validItem);
    expect(parsed.dependencies).toEqual(["motion"]);
    expect(parsed.registryDependencies).toEqual([]);
  });

  it("rejects unknown keys", () => {
    const result = registryItemSchema.safeParse({ ...validItem, unexpected: true });
    expect(result.success).toBe(false);
  });

  it("rejects non-slug names", () => {
    for (const name of ["Magnetic Button", "magnetic_button", "-leading", "trailing-", "Ünicode"]) {
      expect(registryItemSchema.safeParse({ ...validItem, name }).success).toBe(false);
    }
  });

  it("rejects a too-short description", () => {
    const result = registryItemSchema.safeParse({ ...validItem, description: "too short" });
    expect(result.success).toBe(false);
  });

  it("rejects traversal in file paths", () => {
    const result = registryItemSchema.safeParse({
      ...validItem,
      files: [{ path: "../../etc/passwd.tsx", type: "registry:component" }],
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(JSON.stringify(formatZodError(result.error))).toContain("..");
    }
  });

  it("rejects absolute file paths and null bytes", () => {
    for (const path of ["/etc/passwd.tsx", "C:/windows/x.tsx", "evil\u0000.tsx"]) {
      expect(
        registryItemSchema.safeParse({
          ...validItem,
          files: [{ path, type: "registry:component" }],
        }).success,
      ).toBe(false);
    }
  });

  it("rejects disallowed extensions", () => {
    expect(
      registryItemSchema.safeParse({
        ...validItem,
        files: [{ path: "payload.exe", type: "registry:component" }],
      }).success,
    ).toBe(false);
  });

  it("rejects duplicate file paths", () => {
    const result = registryItemSchema.safeParse({
      ...validItem,
      files: [
        { path: "button.tsx", type: "registry:component" },
        { path: "button.tsx", type: "registry:component" },
      ],
    });
    expect(result.success).toBe(false);
  });

  it("requires at least one source file", () => {
    const result = registryItemSchema.safeParse({
      ...validItem,
      files: [{ path: "README.md", type: "registry:component" }],
    });
    expect(result.success).toBe(false);
  });

  it("rejects git and file dependency specifiers", () => {
    for (const dependency of ["git+https://example.com/x.git", "file:../local", "https://cdn/x.tgz"]) {
      expect(registryItemSchema.safeParse({ ...validItem, dependencies: [dependency] }).success).toBe(
        false,
      );
    }
  });

  it("accepts versioned dependencies", () => {
    const result = registryItemSchema.safeParse({
      ...validItem,
      dependencies: ["motion@^12.0.0", "@radix-ui/react-slot@1.0.2"],
    });
    expect(result.success).toBe(true);
  });

  it("accepts design metadata", () => {
    const result = registryItemSchema.safeParse({
      ...validItem,
      designSystem: "swiss-editorial",
      license: "MIT",
      tags: ["pointer", "physics"],
      meta: { dna: { genre: "brutalist", density: "dense" }, difficulty: "intermediate" },
    });
    expect(result.success).toBe(true);
  });

  it("rejects invalid DNA values", () => {
    const result = registryItemSchema.safeParse({
      ...validItem,
      meta: { dna: { genre: "vaporwave" } },
    });
    expect(result.success).toBe(false);
  });
});

describe("openuiConfigSchema", () => {
  it("accepts a minimal project config", () => {
    const parsed = openuiConfigSchema.parse({
      registry: "https://openui.dev/r",
      aliases: { components: "./src/components", lib: "./src/lib" },
    });
    expect(parsed.namespaces).toEqual(["default"]);
    expect(parsed.typescript).toBe(true);
  });

  it("rejects escaping aliases", () => {
    const result = openuiConfigSchema.safeParse({
      registry: "https://openui.dev/r",
      aliases: { components: "../../etc", lib: "./src/lib" },
    });
    expect(result.success).toBe(false);
  });

  it("rejects absolute aliases", () => {
    const result = openuiConfigSchema.safeParse({
      registry: "https://openui.dev/r",
      aliases: { components: "/etc/components", lib: "./src/lib" },
    });
    expect(result.success).toBe(false);
  });
});

describe("dependency policy", () => {
  it("flags wildcard ranges", () => {
    const findings = inspectDependency("react@*");
    expect(findings.map((finding) => finding.code)).toContain("wildcard_range");
    expect(findings.every((finding) => finding.level === "error")).toBe(true);
  });

  it("warns about unapproved packages", () => {
    const findings = inspectDependency("some-random-package@^1.0.0");
    expect(findings).toHaveLength(1);
    expect(findings[0]!.level).toBe("warning");
    expect(findings[0]!.code).toBe("unapproved_package");
  });

  it("passes approved packages", () => {
    expect(inspectDependency("motion@^12.0.0")).toEqual([]);
  });

  it("flags duplicates", () => {
    const findings = inspectDependencies(["motion", "motion"]);
    expect(findings.some((finding) => finding.message.includes("Duplicate"))).toBe(true);
  });
});

describe("names", () => {
  it("parses qualified and unqualified names", () => {
    expect(parseRegistryName("default/magnetic-button")).toEqual({
      namespace: "default",
      name: "magnetic-button",
    });
    expect(parseRegistryName("magnetic-button")).toEqual({ namespace: null, name: "magnetic-button" });
    expect(parseRegistryName("magnetic-button", "default")).toEqual({
      namespace: "default",
      name: "magnetic-button",
    });
  });

  it("rejects deeply nested names", () => {
    expect(() => parseRegistryName("a/b/c")).toThrowError(/Invalid registry name/);
  });

  it("splits dependency ranges", () => {
    expect(splitDependency("motion@^12.0.0")).toEqual({ name: "motion", range: "^12.0.0" });
    expect(splitDependency("@scope/pkg@^1.0.0")).toEqual({ name: "@scope/pkg", range: "^1.0.0" });
    expect(splitDependency("motion")).toEqual({ name: "motion", range: null });
  });
});
