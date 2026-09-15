import { z } from "zod";

import { RESOURCE_TYPES, type ResourceType } from "@openui/types";
import { MAX_PER_PAGE, DEFAULT_PER_PAGE, SEARCH_SORTS } from "@openui/search";
import { badRequest, validationFailed } from "@openui/utils";

/**
 * Route parameter helpers.
 *
 * Path and query values arrive as untrusted strings. Each helper either returns
 * a value of the right type or throws a documented 4xx — nothing downstream
 * needs to re-check, and no handler has to remember to.
 */

const uuidSchema = z.string().uuid("Must be a UUID.");

export function uuidParam(value: string | undefined, name = "id"): string {
  const parsed = uuidSchema.safeParse(value);
  if (!parsed.success) {
    throw validationFailed(`The "${name}" parameter is not a valid identifier.`, [
      { path: name, message: "Must be a UUID." },
    ]);
  }
  return parsed.data;
}

/** Registry slugs: lowercase words joined by single hyphens. */
const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const MAX_SLUG = 64;

export function slugParam(value: string | undefined, name = "slug"): string {
  if (!value || value.length > MAX_SLUG || !SLUG_PATTERN.test(value)) {
    throw validationFailed(`The "${name}" parameter is not a valid slug.`, [
      { path: name, message: "Use lowercase words separated by single hyphens." },
    ]);
  }
  return value;
}

export interface Pagination {
  limit: number;
  offset: number;
  page: number;
}

export function pagination(searchParams: URLSearchParams): Pagination {
  const page = positiveInt(searchParams.get("page"), 1, 500, "page");
  const requested = positiveInt(searchParams.get("perPage"), DEFAULT_PER_PAGE, MAX_PER_PAGE, "perPage");
  return { limit: requested, offset: (page - 1) * requested, page };
}

function positiveInt(raw: string | null, fallback: number, max: number, name: string): number {
  if (raw === null || raw === "") return fallback;
  const value = Number(raw);
  if (!Number.isInteger(value) || value < 1 || value > max) {
    throw badRequest(`The "${name}" parameter must be an integer between 1 and ${max}.`);
  }
  return value;
}

export function optionalResourceType(raw: string | null, name = "type"): ResourceType | undefined {
  if (raw === null || raw === "") return undefined;
  if (!(RESOURCE_TYPES as readonly string[]).includes(raw)) {
    throw badRequest(`The "${name}" parameter must be one of: ${RESOURCE_TYPES.join(", ")}.`);
  }
  return raw as ResourceType;
}

export function sortParam(raw: string | null): "recent" | "popular" | "name" {
  if (raw === null || raw === "") return "recent";
  if (raw === "relevance") return "recent";
  if (raw === "recent" || raw === "popular" || raw === "name") return raw;
  if ((SEARCH_SORTS as readonly string[]).includes(raw)) return "recent";
  throw badRequest(`The "sort" parameter must be one of: ${SEARCH_SORTS.join(", ")}.`);
}
