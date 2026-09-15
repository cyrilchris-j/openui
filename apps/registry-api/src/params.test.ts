import { describe, expect, it } from "vitest";

import { OpenUIError } from "@openui/utils";

import { optionalResourceType, pagination, slugParam, sortParam, uuidParam } from "./params.js";

/**
 * Parameter helpers are a security boundary, so they are tested as one: every
 * case below is an input a hostile client can actually send.
 */
describe("uuidParam", () => {
  it("accepts a canonical uuid", () => {
    const id = "3f2504e0-4f89-11d3-9a0c-0305e82c3301";
    expect(uuidParam(id)).toBe(id);
  });

  it.each([
    ["undefined", undefined],
    ["empty", ""],
    ["an integer", "42"],
    ["a slug", "magnetic-button"],
    ["sql fragment", "1; drop table resources"],
    ["a path traversal attempt", "../../etc/passwd"],
  ])("rejects %s", (_label, value) => {
    expect(() => uuidParam(value)).toThrow(OpenUIError);
    try {
      uuidParam(value);
    } catch (error) {
      expect((error as OpenUIError).status).toBe(422);
      expect((error as OpenUIError).code).toBe("validation_failed");
    }
  });
});

describe("slugParam", () => {
  it.each(["magnetic-button", "grain-background", "swiss-ledger", "a1-b2"])(
    "accepts %s",
    (slug) => {
      expect(slugParam(slug)).toBe(slug);
    },
  );

  it.each([
    ["uppercase", "Magnetic-Button"],
    ["spaces", "magnetic button"],
    ["double hyphen", "magnetic--button"],
    ["trailing hyphen", "magnetic-"],
    ["leading hyphen", "-magnetic"],
    ["path traversal", "..%2f..%2fetc"],
    ["a slash", "components/magnetic-button"],
    ["over the length cap", "a".repeat(65)],
  ])("rejects %s", (_label, slug) => {
    expect(() => slugParam(slug)).toThrow(OpenUIError);
  });
});

describe("pagination", () => {
  it("defaults to the first page", () => {
    expect(pagination(new URLSearchParams())).toEqual({ limit: 24, offset: 0, page: 1 });
  });

  it("derives the offset from the page", () => {
    expect(pagination(new URLSearchParams("page=3&perPage=10"))).toEqual({
      limit: 10,
      offset: 20,
      page: 3,
    });
  });

  it("clamps perPage to the documented maximum", () => {
    expect(() => pagination(new URLSearchParams("perPage=100000"))).toThrow(OpenUIError);
  });

  it.each(["0", "-1", "1.5", "abc", ""])("rejects page=%s", (page) => {
    // An empty string means "unset" and is allowed; the others are not.
    if (page === "") {
      expect(pagination(new URLSearchParams(`page=${page}`)).page).toBe(1);
      return;
    }
    expect(() => pagination(new URLSearchParams(`page=${page}`))).toThrow(OpenUIError);
  });
});

describe("optionalResourceType", () => {
  it("returns undefined when absent", () => {
    expect(optionalResourceType(null)).toBeUndefined();
  });

  it("accepts a known resource type", () => {
    expect(optionalResourceType("background")).toBe("background");
  });

  it("rejects an unknown type rather than ignoring it", () => {
    expect(() => optionalResourceType("wormhole")).toThrow(OpenUIError);
  });
});

describe("sortParam", () => {
  it.each([
    [null, "recent"],
    ["", "recent"],
    ["recent", "recent"],
    ["popular", "popular"],
    ["name", "name"],
    // Relevance only exists for text queries; a browse list falls back to recency.
    ["relevance", "recent"],
  ] as const)("maps %s to %s", (input, expected) => {
    expect(sortParam(input)).toBe(expected);
  });

  it("rejects an unknown sort", () => {
    expect(() => sortParam("cheapest")).toThrow(OpenUIError);
  });
});
