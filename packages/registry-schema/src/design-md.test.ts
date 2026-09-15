import { describe, expect, it } from "vitest";

import { DEFAULT_DESIGN_DNA, formatDesignDnaHeader, parseDesignMarkdown, parseDurationMs } from "./design-md.js";

const SAMPLE = `# Editorial Design System

Genre: Editorial
Macrostructure: Asymmetric
Density: Medium
Shape: Sharp
Motion: Subtle

## Typography

Heading: Instrument Serif
Body: Inter
Mono: Geist Mono

## Motion

Fast: 180ms
Normal: 320ms
Slow: 0.6s

## Rules

- Avoid generic SaaS gradients.
- Avoid excessive rounded cards.
- Prefer asymmetric composition.
- Use large editorial typography.

## Avoid

- Centered three-column card grids.
`;

describe("parseDesignMarkdown", () => {
  it("parses DNA from the header block", () => {
    const { rules, warnings } = parseDesignMarkdown(SAMPLE);
    expect(warnings).toEqual([]);
    expect(rules.dna).toMatchObject({
      genre: "editorial",
      macrostructure: "asymmetric",
      density: "medium",
      shapeLanguage: "sharp",
      motionLanguage: "subtle",
    });
  });

  it("parses typography and motion sections", () => {
    const { rules } = parseDesignMarkdown(SAMPLE);
    expect(rules.fonts).toEqual({
      heading: "Instrument Serif",
      body: "Inter",
      mono: "Geist Mono",
    });
    expect(rules.motion).toEqual({ fast: 180, normal: 320, slow: 600 });
  });

  it("collects rules and hoists `Avoid` bullets out of Rules", () => {
    const { rules } = parseDesignMarkdown(SAMPLE);
    expect(rules.rules).toContain("Prefer asymmetric composition.");
    expect(rules.rules.some((rule) => /^Avoid/i.test(rule))).toBe(false);
    expect(rules.avoid).toContain("generic SaaS gradients.");
    expect(rules.avoid).toContain("Centered three-column card grids.");
  });

  it("keeps the raw markdown for AI consumers", () => {
    const { rules } = parseDesignMarkdown(SAMPLE);
    expect(rules.raw).toBe(SAMPLE);
  });

  it("tolerates prose-style axis values", () => {
    const { rules } = parseDesignMarkdown(`# T\n\nGenre: Brutalist\nShape language: Cut\nMotion language: Kinetic\n`);
    expect(rules.dna.genre).toBe("brutalist");
    expect(rules.dna.shapeLanguage).toBe("cut");
    expect(rules.dna.motionLanguage).toBe("kinetic");
  });

  it("warns on unknown axis values but keeps defaults", () => {
    const { rules, warnings } = parseDesignMarkdown("# T\n\nGenre: Cyberpunk\n");
    expect(rules.dna.genre).toBe(DEFAULT_DESIGN_DNA.genre);
    expect(warnings).toHaveLength(1);
    expect(warnings[0]).toContain("Unknown genre");
  });

  it("falls back to defaults for an empty document", () => {
    const { rules } = parseDesignMarkdown("");
    expect(rules.dna).toEqual(DEFAULT_DESIGN_DNA);
    expect(rules.rules).toEqual([]);
  });

  it("never throws on malformed input", () => {
    expect(() => parseDesignMarkdown("## Rules\n- ###\n:::")).not.toThrow();
  });
});

describe("parseDurationMs", () => {
  it("parses ms and s", () => {
    expect(parseDurationMs("180ms")).toBe(180);
    expect(parseDurationMs("0.6s")).toBe(600);
    expect(parseDurationMs("320")).toBe(320);
  });

  it("rejects nonsense and out-of-range values", () => {
    expect(parseDurationMs("fast")).toBeNull();
    expect(parseDurationMs("99s")).toBeNull();
  });
});

describe("formatDesignDnaHeader", () => {
  it("round-trips through the parser", () => {
    const header = formatDesignDnaHeader(DEFAULT_DESIGN_DNA);
    const { rules } = parseDesignMarkdown(`# Round trip\n\n${header}\n`);
    expect(rules.dna).toEqual(DEFAULT_DESIGN_DNA);
  });
});
