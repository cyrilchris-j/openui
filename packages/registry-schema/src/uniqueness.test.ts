import { describe, expect, it } from "vitest";

import {
  descriptionSimilarity,
  findDuplicates,
  fingerprintOverlap,
  isValidResourceName,
  tagOverlap,
  UNIQUENESS_THRESHOLDS,
  type UniquenessSubject,
} from "./uniqueness.js";

function subject(overrides: Partial<UniquenessSubject> & { name: string }): UniquenessSubject {
  return {
    title: overrides.name,
    description: `A distinct resource: ${overrides.name} does something no other entry does.`,
    category: "components",
    subcategory: "actions",
    tags: ["interactive"],
    fingerprint: {
      interactionModel: "pointer-attraction",
      visualModel: "editorial-outline",
      motionModel: "spring-follow",
      layoutModel: "inline",
      semanticPurpose: "primary-cta",
    },
    ...overrides,
  };
}

describe("normalised name matching", () => {
  it("flags variant-suffix resubmissions", () => {
    const duplicates = findDuplicates([
      subject({ name: "magnetic-button" }),
      subject({ name: "magnetic-button-v2" }),
      subject({ name: "magnetic-button-blue" }),
    ]);
    const names = duplicates.map((pair) => [pair.a, pair.b].sort().join(" ~ "));
    expect(names).toContain("magnetic-button ~ magnetic-button-v2");
    expect(names).toContain("magnetic-button ~ magnetic-button-blue");
  });

  it("does not flag genuinely different names", () => {
    const duplicates = findDuplicates([
      subject({ name: "magnetic-button" }),
      subject({ name: "split-action-button", fingerprint: undefined }),
    ]);
    expect(duplicates).toHaveLength(0);
  });

  it("keeps names that merely contain a colour word", () => {
    const duplicates = findDuplicates([
      subject({ name: "blueprint-grid" }),
      subject({
        name: "cobalt-grid",
        description: "A cobalt modular grid drawn with repeating gradients and ruled gutters.",
        fingerprint: {
          interactionModel: "none",
          visualModel: "css-gradient-geometry",
          motionModel: "none",
          layoutModel: "full-bleed",
          semanticPurpose: "decorative-surface",
        },
      }),
    ]);
    expect(duplicates).toHaveLength(0);
  });
});

describe("fingerprint overlap", () => {
  it("counts shared axes", () => {
    const a = subject({ name: "alpha" }).fingerprint;
    const b = subject({ name: "beta" }).fingerprint;
    expect(fingerprintOverlap(a, b)).toBe(5);
  });

  it("ignores missing fingerprints", () => {
    expect(fingerprintOverlap(undefined, undefined)).toBe(0);
  });

  it("flags same-category items sharing 3+ axes", () => {
    const duplicates = findDuplicates([
      subject({ name: "alpha" }),
      subject({
        name: "beta",
        fingerprint: {
          interactionModel: "pointer-attraction",
          visualModel: "card-stack",
          motionModel: "spring-follow",
          layoutModel: "inline",
          semanticPurpose: "inline-feedback",
        },
      }),
    ]);
    expect(duplicates).toHaveLength(1);
    expect(duplicates[0]!.reasons).toContain("fingerprint_overlap");
  });

  it("does not flag identical fingerprints across categories", () => {
    const duplicates = findDuplicates([
      subject({ name: "alpha" }),
      subject({ name: "beta", category: "text" }),
    ]);
    expect(duplicates).toHaveLength(0);
  });
});

describe("description similarity", () => {
  it("is 1 for identical text", () => {
    const text = "A stack-based card surface that responds to pointer velocity and offsets neighbours.";
    expect(descriptionSimilarity(text, text)).toBeGreaterThan(0.9);
  });

  it("is low for different descriptions sharing vocabulary", () => {
    const a = "A stack-based card surface that responds to pointer velocity.";
    const b = "A segmented radiogroup with roving tabindex and arrow-key navigation.";
    expect(descriptionSimilarity(a, b)).toBeLessThan(UNIQUENESS_THRESHOLDS.descriptionJaccard);
  });

  it("requires subcategory or tag support to flag", () => {
    const description =
      "A stack-based card surface that responds to pointer velocity and progressively offsets neighbouring layers.";
    const duplicates = findDuplicates([
      subject({ name: "alpha", description }),
      subject({
        name: "beta",
        description,
        // A distinct fingerprint, a different subcategory and disjoint tags:
        // the shared copy alone must not be enough, or legitimately related
        // resources would collide.
        fingerprint: {
          interactionModel: "keyboard-driven",
          visualModel: "ruled-table",
          motionModel: "none",
          layoutModel: "stack",
          semanticPurpose: "data-scan",
        },
        subcategory: "data",
        tags: ["table"],
      }),
    ]);
    expect(duplicates).toHaveLength(0);
  });

  it("flags paraphrased copy with overlapping metadata", () => {
    const description =
      "A stack-based card surface that responds to pointer velocity and progressively offsets neighbouring layers.";
    const duplicates = findDuplicates([
      subject({ name: "alpha", description }),
      subject({
        name: "beta",
        description,
        // Distinct fingerprint so the description rule is exercised alone.
        fingerprint: {
          interactionModel: "keyboard-driven",
          visualModel: "ruled-table",
          motionModel: "none",
          layoutModel: "stack",
          semanticPurpose: "data-scan",
        },
      }),
    ]);
    expect(duplicates).toHaveLength(1);
    expect(duplicates[0]!.reasons).toContain("description_similarity");
  });
});

describe("tag overlap", () => {
  it("computes jaccard", () => {
    expect(tagOverlap(["a", "b", "c"], ["b", "c", "d"])).toBeCloseTo(0.5);
    expect(tagOverlap([], ["a"])).toBe(0);
  });
});

describe("isValidResourceName", () => {
  it("accepts slugs and rejects non-slugs", () => {
    expect(isValidResourceName("magnetic-button")).toBe(true);
    expect(isValidResourceName("Magnetic Button")).toBe(false);
    expect(isValidResourceName("ab")).toBe(false);
  });
});
