import { describe, expect, it } from "vitest";

import { clamp, groupBy, slugify, splitForEmphasis, titleCase, uniqueBy } from "./string.js";
import { formatBytes, formatRelativeTime } from "./format.js";
import { contentFingerprint, stableId } from "./hash.js";

describe("slugify", () => {
  it("produces url-safe slugs", () => {
    expect(slugify("Magnetic Button")).toBe("magnetic-button");
    expect(slugify("Grain & Noise / Overlay")).toBe("grain-noise-overlay");
    expect(slugify("  Leading and trailing  ")).toBe("leading-and-trailing");
  });

  it("is stable and bounded", () => {
    expect(slugify("A".repeat(200)).length).toBeLessThanOrEqual(64);
    expect(slugify("Magnetic Button")).toBe(slugify("Magnetic Button"));
  });

  it("preserves non-latin characters", () => {
    expect(slugify("見出し")).toBe("見出し");
  });
});

describe("titleCase", () => {
  it("handles separators and acronyms", () => {
    expect(titleCase("magnetic-button")).toBe("Magnetic Button");
    expect(titleCase("registry_item_type")).toBe("Registry Item Type");
    expect(titleCase("ai design audit")).toBe("AI Design Audit");
  });
});

describe("collections", () => {
  it("uniqueBy keeps the first occurrence", () => {
    const values = [
      { id: "a", n: 1 },
      { id: "b", n: 2 },
      { id: "a", n: 3 },
    ];
    expect(uniqueBy(values, (value) => value.id)).toEqual([
      { id: "a", n: 1 },
      { id: "b", n: 2 },
    ]);
  });

  it("groupBy buckets deterministically", () => {
    expect(groupBy(["a", "bb", "c"], (value) => (value.length === 1 ? "short" : "long"))).toEqual({
      short: ["a", "c"],
      long: ["bb"],
    });
  });

  it("clamp bounds values", () => {
    expect(clamp(120, 0, 100)).toBe(100);
    expect(clamp(-5, 0, 100)).toBe(0);
  });
});

describe("splitForEmphasis", () => {
  it("splits off a trailing emphasis phrase", () => {
    expect(splitForEmphasis("Interfaces should have a fingerprint")).toEqual([
      "Interfaces should have",
      "a fingerprint",
    ]);
    expect(splitForEmphasis("Distinctive design")).toEqual(["Distinctive", "design"]);
  });

  it("handles empty input", () => {
    expect(splitForEmphasis("")).toEqual(["", ""]);
  });
});

describe("formatting", () => {
  it("formats bytes", () => {
    expect(formatBytes(0)).toBe("0 B");
    expect(formatBytes(999)).toBe("999 B");
    expect(formatBytes(2048)).toBe("2 KB");
    expect(formatBytes(-1)).toBe("0 B");
  });

  it("formats relative time against an injected clock", () => {
    const now = new Date("2026-02-01T00:00:00.000Z");
    expect(formatRelativeTime("2026-01-30T00:00:00.000Z", now)).toBe("2 days ago");
    expect(formatRelativeTime("not-a-date", now)).toBe("—");
  });
});

describe("hashing", () => {
  it("is deterministic", () => {
    expect(contentFingerprint("hello")).toBe(contentFingerprint("hello"));
    expect(contentFingerprint("hello")).not.toBe(contentFingerprint("hellp"));
    expect(contentFingerprint("hello", 12)).toHaveLength(12);
    expect(stableId("seed", 8)).toHaveLength(8);
  });
});
