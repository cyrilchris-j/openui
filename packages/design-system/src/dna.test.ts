import { describe, expect, it } from "vitest";

import { computeFingerprint, describeDna, dnaDistance, axisScore } from "./dna.js";

const DISTINCTIVE = {
  genre: "brutalist",
  macrostructure: "asymmetric",
  density: "dense",
  shapeLanguage: "cut",
  motionLanguage: "kinetic",
  typographyStyle: "variable-poster",
  colorStrategy: "duotone",
} as const;

const GENERIC = {
  genre: "minimal",
  macrostructure: "symmetric",
  density: "medium",
  shapeLanguage: "rounded",
  motionLanguage: "none",
  typographyStyle: "grotesk",
  colorStrategy: "pastel",
} as const;

describe("computeFingerprint", () => {
  it("is deterministic", () => {
    expect(computeFingerprint(DISTINCTIVE)).toEqual(computeFingerprint(DISTINCTIVE));
  });

  it("scores a committed design language highly", () => {
    expect(computeFingerprint(DISTINCTIVE).distinctiveness).toBeGreaterThan(85);
  });

  it("scores the default UI-kit look low", () => {
    expect(computeFingerprint(GENERIC).distinctiveness).toBeLessThan(35);
  });

  it("explains risks for generic choices", () => {
    const fingerprint = computeFingerprint(GENERIC);
    expect(fingerprint.risks.length).toBeGreaterThan(0);
    expect(fingerprint.risks.join(" ")).toMatch(/rounded corners|default|template|grotesk/i);
  });

  it("explains strengths for distinctive choices", () => {
    const fingerprint = computeFingerprint(DISTINCTIVE);
    expect(fingerprint.strengths.length).toBeGreaterThan(0);
  });

  it("falls back to defaults for missing axes", () => {
    const fingerprint = computeFingerprint({});
    expect(fingerprint.dna.genre).toBe("editorial");
    expect(fingerprint.distinctiveness).toBeGreaterThan(0);
  });

  it("stays within 0–100", () => {
    for (const dna of [DISTINCTIVE, GENERIC, {}, { shapeLanguage: "cut" as const }]) {
      const score = computeFingerprint(dna).distinctiveness;
      expect(score).toBeGreaterThanOrEqual(0);
      expect(score).toBeLessThanOrEqual(100);
    }
  });
});

describe("axisScore", () => {
  it("ranks committed values above defaults", () => {
    expect(axisScore("shapeLanguage", "cut")).toBeGreaterThan(axisScore("shapeLanguage", "rounded"));
    expect(axisScore("motionLanguage", "kinetic")).toBeGreaterThan(axisScore("motionLanguage", "none"));
  });

  it("returns a neutral score for unknown values", () => {
    expect(axisScore("genre", "not-a-genre")).toBe(0.5);
  });
});

describe("dnaDistance", () => {
  it("is zero for identical DNA and large for opposites", () => {
    expect(dnaDistance(DISTINCTIVE, DISTINCTIVE)).toBe(0);
    expect(dnaDistance(DISTINCTIVE, GENERIC)).toBeGreaterThan(0.5);
  });

  it("is symmetric", () => {
    expect(dnaDistance(DISTINCTIVE, GENERIC)).toBe(dnaDistance(GENERIC, DISTINCTIVE));
  });
});

describe("describeDna", () => {
  it("produces a readable one-liner", () => {
    expect(describeDna(DISTINCTIVE)).toContain("brutalist");
    expect(describeDna(DISTINCTIVE)).toContain("kinetic motion");
  });
});
