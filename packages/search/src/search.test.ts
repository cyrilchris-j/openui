import { describe, expect, it } from "vitest";

import { applyFilters, countActiveFilters, localRelevance, matchesFilters } from "./filters.js";
import { buildFacets } from "./facets.js";
import { escapeLike, highlightMatches, splitPartialQuery, toTrigramPattern, tokenize, toWebSearchQuery } from "./query.js";
import { relatedResources, searchInMemory, paginate, sortResources } from "./rank.js";
import { DEFAULT_PER_PAGE, parseSearchParams, sanitizeTypeFilter, searchQueryToUrl, serializeSearchParams } from "./params.js";
import { SAMPLE_RESOURCES, makeResource } from "./testing.js";

describe("matchesFilters", () => {
  const resource = SAMPLE_RESOURCES[0]!;

  it("passes with no filters", () => {
    expect(matchesFilters(resource, {})).toBe(true);
  });

  it("matches type, category, tag and design facets", () => {
    expect(matchesFilters(resource, { type: ["component"] })).toBe(true);
    expect(matchesFilters(resource, { type: ["text"] })).toBe(false);
    expect(matchesFilters(resource, { category: ["components"] })).toBe(true);
    expect(matchesFilters(resource, { tag: ["physics"] })).toBe(true);
    expect(matchesFilters(resource, { shape: ["sharp"] })).toBe(true);
    expect(matchesFilters(resource, { shape: ["rounded"] })).toBe(false);
    expect(matchesFilters(resource, { genre: ["editorial", "brutalist"] })).toBe(true);
  });

  it("treats multiple values within a facet as OR", () => {
    expect(applyFilters(SAMPLE_RESOURCES, { type: ["component", "text"] })).toHaveLength(2);
  });

  it("treats different facets as AND", () => {
    expect(applyFilters(SAMPLE_RESOURCES, { type: ["component"], genre: ["industrial"] })).toHaveLength(0);
  });

  it("supports the zero-dependency filter", () => {
    const filtered = applyFilters(SAMPLE_RESOURCES, { zeroDependency: true });
    expect(filtered.every((item) => item.dependencies.length === 0)).toBe(true);
    expect(filtered.length).toBeGreaterThan(0);
  });

  it("counts active filters", () => {
    expect(countActiveFilters({})).toBe(0);
    expect(countActiveFilters({ type: ["component"], zeroDependency: true })).toBe(2);
  });
});

describe("localRelevance", () => {
  it("ranks an exact name match above a description match", () => {
    const exact = makeResource({ slug: "grain", title: "Grain", description: "x".repeat(30) });
    const loose = makeResource({ slug: "other", title: "Other", description: "a grain surface treatment" });
    expect(localRelevance(exact, "grain")).toBeGreaterThan(localRelevance(loose, "grain"));
  });

  it("returns zero for an empty query", () => {
    expect(localRelevance(SAMPLE_RESOURCES[0]!, "")).toBe(0);
  });
});

describe("buildFacets", () => {
  it("counts values per facet", () => {
    const facets = buildFacets(SAMPLE_RESOURCES);
    expect(facets["type"]).toEqual(
      expect.arrayContaining([{ value: "component", label: "Components", count: 1 }]),
    );
    expect(facets["genre"]!.map((entry) => entry.value)).toEqual(
      expect.arrayContaining(["editorial", "industrial", "swiss"]),
    );
  });

  it("sorts by count then value", () => {
    const facets = buildFacets(SAMPLE_RESOURCES, { keys: ["type"] });
    const counts = facets["type"]!.map((entry) => entry.count);
    expect([...counts].sort((a, b) => b - a)).toEqual(counts);
  });
});

describe("query helpers", () => {
  it("tokenizes and drops stop words", () => {
    expect(tokenize("A magnetic button for the pointer")).toEqual(["magnetic", "button", "pointer"]);
    expect(tokenize("the of and")).toEqual([]);
    expect(tokenize("keep the stop words", { keepStopWords: true })).toEqual(["keep", "the", "stop", "words"]);
  });

  it("normalises whitespace and control characters", () => {
    expect(tokenize("  magnetic\u0000   button ")).toEqual(["magnetic", "button"]);
  });

  it("sanitises websearch input", () => {
    expect(toWebSearchQuery('hero "quoted": term')).toBe("hero quoted term");
  });

  it("escapes LIKE wildcards so input cannot become a pattern", () => {
    expect(escapeLike("100%_match")).toBe("100\\%\\_match");
    expect(toTrigramPattern("grain background")).toBe("%grain%background%");
    expect(toTrigramPattern("100%")).toBe("%100%");
  });

  it("splits a trailing partial word", () => {
    expect(splitPartialQuery("grain back")).toEqual({ terms: ["grain"], prefix: "back" });
    expect(splitPartialQuery("grain ")).toEqual({ terms: ["grain"], prefix: "" });
  });

  it("highlights matches without corrupting the string", () => {
    const spans = highlightMatches("Magnetic Button", "magnetic");
    expect(spans.map((span) => span.text).join("")).toBe("Magnetic Button");
    expect(spans.some((span) => span.match)).toBe(true);
  });
});

describe("sortResources", () => {
  it("sorts by popularity and name", () => {
    expect(sortResources(SAMPLE_RESOURCES, "popular")[0]!.slug).toBe("magnetic-button");
    const byName = sortResources(SAMPLE_RESOURCES, "name").map((item) => item.title);
    expect(byName).toEqual([...byName].sort((a, b) => a.localeCompare(b, "en")));
  });

  it("is deterministic for equal scores", () => {
    const a = sortResources(SAMPLE_RESOURCES, "relevance", "button");
    const b = sortResources(SAMPLE_RESOURCES, "relevance", "button");
    expect(a.map((item) => item.slug)).toEqual(b.map((item) => item.slug));
  });

  it("sorts by recency using publishedAt", () => {
    const sorted = sortResources(SAMPLE_RESOURCES, "recent");
    expect(sorted).toHaveLength(4);
  });
});

describe("paginate", () => {
  it("slices and reports totals", () => {
    const page = paginate([1, 2, 3, 4, 5], 2, 2);
    expect(page).toEqual({ items: [3, 4], total: 5, page: 2, perPage: 2, hasMore: true });
    expect(paginate([1, 2, 3], 5, 2).items).toEqual([]);
  });
});

describe("searchInMemory", () => {
  it("browses everything without a query", () => {
    const result = searchInMemory(SAMPLE_RESOURCES, {});
    expect(result.strategy).toBe("browse");
    expect(result.total).toBe(4);
    expect(result.facets["type"]!.length).toBeGreaterThan(0);
  });

  it("finds by full text", () => {
    const result = searchInMemory(SAMPLE_RESOURCES, { q: "magnetic" });
    expect(result.items[0]!.slug).toBe("magnetic-button");
    expect(result.strategy).toBe("full_text");
  });

  it("falls back to fuzzy matching for a typo", () => {
    const result = searchInMemory(SAMPLE_RESOURCES, { q: "magnetik" });
    expect(result.items.map((item) => item.slug)).toContain("magnetic-button");
  });

  it("applies filters together with a query", () => {
    const result = searchInMemory(SAMPLE_RESOURCES, { q: "editorial", filters: { genre: ["swiss"] } });
    expect(result.items.every((item) => item.design?.genre === "swiss")).toBe(true);
  });

  it("reports timing", () => {
    expect(searchInMemory(SAMPLE_RESOURCES, {}).tookMs).toBeGreaterThanOrEqual(0);
  });
});

describe("relatedResources", () => {
  it("prefers shared tags and type", () => {
    const related = relatedResources(SAMPLE_RESOURCES[0]!, SAMPLE_RESOURCES);
    expect(related.every((item) => item.slug !== "magnetic-button")).toBe(true);
  });
});

describe("params", () => {
  it("parses query, filters, sort and paging", () => {
    const parsed = parseSearchParams(
      "q=editorial&type=text&type=component&genre=editorial&sort=popular&page=2&perPage=48&zeroDependency=true",
    );
    expect(parsed.q).toBe("editorial");
    expect(parsed.filters?.type).toEqual(["text", "component"]);
    expect(parsed.filters?.genre).toEqual(["editorial"]);
    expect(parsed.filters?.zeroDependency).toBe(true);
    expect(parsed.sort).toBe("popular");
    expect(parsed.page).toBe(2);
    expect(parsed.perPage).toBe(48);
  });

  it("ignores unknown sorts and clamps paging", () => {
    const parsed = parseSearchParams("sort=chaos&page=-4&perPage=9999");
    expect(parsed.sort).toBe("relevance");
    expect(parsed.page).toBe(1);
    expect(parsed.perPage).toBe(96);
  });

  it("round-trips through serialisation", () => {
    const query = parseSearchParams("q=hero&type=component&genre=brutalist&sort=recent&page=3");
    const roundTripped = parseSearchParams(serializeSearchParams(query));
    expect(roundTripped).toEqual(query);
  });

  it("omits defaults from the URL", () => {
    const url = searchQueryToUrl("/search", { q: "x", sort: "relevance", page: 1, perPage: DEFAULT_PER_PAGE });
    expect(url).toBe("/search?q=x");
  });

  it("validates the type filter against the taxonomy", () => {
    expect(sanitizeTypeFilter(["component", "not-a-type"])).toEqual(["component"]);
  });
});
