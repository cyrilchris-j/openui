import { describe, expect, it } from "vitest";

import { DEFAULT_CHECKS, auditDna, formatAuditReport, runAudit, type UiStructure } from "./audit.js";
import { bestForeground, contrastRatio, isDark, parseHex, wcagLevel } from "./contrast.js";

const genericPage: UiStructure = {
  sections: [
    { id: "hero", role: "hero", columns: 3, alignment: "center" },
    { id: "features", role: "features", columns: 3, alignment: "center" },
    { id: "pricing", role: "pricing", columns: 3, alignment: "center" },
    { id: "testimonials", role: "testimonial", columns: 3, alignment: "center" },
    { id: "cta", role: "cta", columns: 3, alignment: "center" },
  ],
  typography: {
    families: ["Inter"],
    weights: [400],
    sizes: [16, 18],
    headingLevels: [1, 1, 3],
  },
  surface: {
    radii: [16, 16, 16, 16, 24],
    gradientCount: 6,
    shadowCount: 9,
    colors: ["#7C6BF2", "#4C7CF2"],
    colorPairs: [{ foreground: "#A0A0A8", background: "#F5F5F7" }],
  },
  motion: { durations: [180, 220, 260, 340, 420, 900], easings: ["ease", "linear", "ease-in", "ease-out", "bounce"], reducedMotionCovered: false },
  interactions: [],
  spacing: [16, 16.5],
};

const distinctivePage: UiStructure = {
  sections: [
    { id: "hero", role: "hero", columns: 2, alignment: "split" },
    { id: "index", role: "index", columns: 1, alignment: "left" },
    { id: "editorial", role: "features", columns: 4, alignment: "offset" },
    { id: "manifesto", role: "cta", columns: 1, alignment: "right" },
    { id: "footer", role: "footer", columns: 3, alignment: "split" },
  ],
  typography: {
    families: ["Instrument Serif", "Inter", "JetBrains Mono"],
    weights: [400, 500, 700],
    sizes: [13, 16, 20, 34, 58, 96],
    headingLevels: [1, 2, 2, 3, 3, 4],
  },
  surface: {
    radii: [0, 0, 2, 0, 4],
    gradientCount: 0,
    shadowCount: 1,
    colors: ["#100F0D", "#F3F0E9", "#B33F26"],
    colorPairs: [
      { foreground: "#100F0D", background: "#F3F0E9", label: "ink on paper" },
      { foreground: "#B33F26", background: "#F3F0E9", label: "oxide on paper" },
    ],
  },
  motion: { durations: [180, 320, 600], easings: ["cubic-bezier(0.2,0,0,1)"], reducedMotionCovered: true },
  interactions: ["pointer-magnet", "scroll-reveal", "text-scramble", "cursor-trail"],
  spacing: [4, 8, 16, 24, 32, 64],
};

describe("runAudit", () => {
  it("reports a generic page as a problem", () => {
    const report = runAudit(genericPage);
    expect(report.overall).toBeLessThan(60);
    expect(report.categories.originality).toBeLessThan(50);
    expect(report.issues.length).toBeGreaterThan(0);
    expect(report.recommendations.length).toBeGreaterThan(0);
    expect(report.issues.join(" ")).toMatch(/centred hero|gradients|rounded/i);
  });

  it("reports a considered page as strong", () => {
    const report = runAudit(distinctivePage);
    expect(report.overall).toBeGreaterThan(80);
    expect(report.categories.accessibility).toBe(100);
    expect(report.issues).toEqual([]);
  });

  it("scores every check between 0 and 100 and covers every category", () => {
    const report = runAudit(distinctivePage);
    for (const check of report.checks) {
      expect(check.score).toBeGreaterThanOrEqual(0);
      expect(check.score).toBeLessThanOrEqual(100);
    }
    expect(Object.keys(report.categories).sort()).toEqual([
      "accessibility",
      "composition",
      "motion",
      "originality",
      "structure",
      "typography",
    ]);
  });

  it("is deterministic when the clock is injected", () => {
    const now = new Date("2026-03-01T00:00:00.000Z");
    expect(runAudit(distinctivePage, { now }).generatedAt).toBe("2026-03-01T00:00:00.000Z");
  });

  it("is extensible: extra checks join the report", () => {
    const report = runAudit(distinctivePage, {
      checks: [
        ...DEFAULT_CHECKS,
        {
          id: "custom_rule",
          label: "Custom rule",
          category: "originality",
          weight: 1,
          run: () => ({ score: 10, findings: ["Custom finding."] }),
        },
      ],
    });
    expect(report.checks.some((check) => check.id === "custom_rule")).toBe(true);
    expect(report.issues).toContain("Custom finding.");
  });

  it("flags missing inputs rather than crashing", () => {
    const empty: UiStructure = {
      sections: [],
      typography: { families: [], weights: [], sizes: [], headingLevels: [] },
      surface: { radii: [], gradientCount: 0, shadowCount: 0, colors: [] },
      motion: { durations: [], easings: [], reducedMotionCovered: true },
      interactions: [],
      spacing: [],
    };
    expect(() => runAudit(empty)).not.toThrow();
  });
});

describe("auditDna", () => {
  it("rewards a committed fingerprint", () => {
    const report = auditDna({
      genre: "brutalist",
      macrostructure: "asymmetric",
      shapeLanguage: "cut",
      motionLanguage: "kinetic",
      typographyStyle: "variable-poster",
      colorStrategy: "duotone",
    });
    expect(report.categories.originality).toBeGreaterThan(70);
  });

  it("penalises the default look and explains why", () => {
    const report = auditDna({
      genre: "minimal",
      macrostructure: "symmetric",
      shapeLanguage: "rounded",
      motionLanguage: "none",
      typographyStyle: "grotesk",
    });
    expect(report.overall).toBeLessThan(75);
    expect(report.recommendations.join(" ")).toMatch(/fingerprint/i);
  });
});

describe("formatAuditReport", () => {
  it("renders the documented report shape", () => {
    const text = formatAuditReport(runAudit(genericPage));
    expect(text).toContain("AI UI AUDIT");
    expect(text).toContain("Structure");
    expect(text).toContain("/100");
  });
});

describe("contrast", () => {
  it("parses hex colours", () => {
    expect(parseHex("#fff")).toEqual({ r: 255, g: 255, b: 255 });
    expect(parseHex("#100F0D")).toEqual({ r: 16, g: 15, b: 13 });
    expect(parseHex("rgb(1,2,3)")).toBeNull();
  });

  it("computes WCAG ratios", () => {
    expect(Math.round(contrastRatio("#000000", "#FFFFFF"))).toBe(21);
    expect(contrastRatio("#FFFFFF", "#FFFFFF")).toBe(1);
    expect(contrastRatio("nonsense", "#fff")).toBe(1);
  });

  it("grades levels", () => {
    expect(wcagLevel(21)).toBe("AAA");
    expect(wcagLevel(5)).toBe("AA");
    expect(wcagLevel(3.5)).toBe("fail");
    expect(wcagLevel(3.5, true)).toBe("AA-large");
  });

  it("detects dark colours and picks a readable foreground", () => {
    expect(isDark("#100F0D")).toBe(true);
    expect(isDark("#F3F0E9")).toBe(false);
    expect(bestForeground("#F3F0E9")).toBe("#100F0D");
    expect(bestForeground("#100F0D")).toBe("#F3F0E9");
  });
});
