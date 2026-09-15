import type {
  ApiErrorBody,
  Category,
  CollectionDetail,
  CollectionSummary,
  ContributorSummary,
  DesignSystemRecord,
  Paginated,
  ResourceDetail,
  ResourceSummary,
  SearchResult,
  SubmissionSummary,
  TagSummary,
} from "@openui/types";

import { apiUrl } from "./config.js";

/**
 * The community API client.
 *
 * Deliberately narrower than the API: it covers the operations the website
 * performs, and nothing else. Reads that the registry artefacts already satisfy
 * are *not* here, because adding a second source for the same data is how two
 * views of the catalogue drift apart.
 *
 * Error handling is uniform. The API returns a documented envelope
 * (`{ error: { code, message, details, requestId } }`), and every non-2xx
 * response is converted into an `ApiError` carrying that code — so a caller can
 * branch on `code === "conflict"` instead of parsing a message.
 */

export class ApiError extends Error {
  constructor(
    readonly code: string,
    message: string,
    readonly status: number,
    /** Field-level problems, present on a 422. */
    readonly details?: Array<{ path: string; message: string }>,
    /** Correlates a user-visible failure with a server log line. */
    readonly requestId?: string,
  ) {
    super(message);
    this.name = "ApiError";
  }

  /** True when re-authenticating would plausibly fix it. */
  get isAuthProblem(): boolean {
    return this.status === 401;
  }

  /** True when the caller lacks the role, not the session. */
  get isPermissionProblem(): boolean {
    return this.status === 403;
  }
}

interface RequestOptions {
  method?: "GET" | "POST" | "PATCH" | "DELETE";
  body?: unknown;
  /** Access token from the auth session, if the caller has one. */
  token?: string | null;
  signal?: AbortSignal;
}

async function request<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const headers: Record<string, string> = { accept: "application/json" };
  if (options.body !== undefined) headers["content-type"] = "application/json";
  if (options.token) headers["authorization"] = `Bearer ${options.token}`;

  let response: Response;
  try {
    response = await fetch(apiUrl(path), {
      method: options.method ?? "GET",
      headers,
      ...(options.body !== undefined ? { body: JSON.stringify(options.body) } : {}),
      ...(options.signal ? { signal: options.signal } : {}),
    });
  } catch (error) {
    // A network failure is not an API error; say so, because "check your
    // connection" and "you are not allowed" need different user responses.
    if (error instanceof DOMException && error.name === "AbortError") throw error;
    throw new ApiError(
      "network_error",
      "Could not reach the OpenUI API. Check your connection and try again.",
      0,
    );
  }

  if (response.status === 204) return undefined as T;

  const text = await response.text();
  const payload: unknown = text.length > 0 ? safeJson(text) : null;

  if (!response.ok) {
    const envelope = payload as ApiErrorBody | null;
    throw new ApiError(
      envelope?.error?.code ?? "internal_error",
      envelope?.error?.message ?? "Something went wrong on our side.",
      response.status,
      envelope?.error?.details,
      envelope?.error?.requestId,
    );
  }

  return payload as T;
}

function safeJson(text: string): unknown {
  try {
    return JSON.parse(text);
  } catch {
    return null;
  }
}

/** Query string helper that drops empty values instead of sending `?q=`. */
function query(params: Record<string, string | number | boolean | undefined | null>): string {
  const search = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value === undefined || value === null || value === "") continue;
    search.set(key, String(value));
  }
  const encoded = search.toString();
  return encoded ? `?${encoded}` : "";
}

export interface SearchParams {
  q?: string;
  type?: readonly string[];
  category?: readonly string[];
  tag?: readonly string[];
  designSystem?: readonly string[];
  license?: readonly string[];
  difficulty?: readonly string[];
  genre?: readonly string[];
  density?: readonly string[];
  shape?: readonly string[];
  motion?: readonly string[];
  typography?: readonly string[];
  zeroDependency?: boolean;
  sort?: string;
  page?: number;
  perPage?: number;
}

/**
 * Search. Sent to the API rather than evaluated in the browser because ranking
 * — full-text first, trigram fallback — is a database concern, and duplicating
 * it in JavaScript would produce a second, divergent definition of relevance.
 */
export function searchResources(params: SearchParams, token?: string | null): Promise<SearchResult> {
  const flat: Record<string, string | number | boolean | undefined> = {
    q: params.q,
    sort: params.sort,
    page: params.page,
    perPage: params.perPage,
    zeroDependency: params.zeroDependency,
  };
  // Array filters are repeated parameters, which is what the API's parser reads.
  for (const key of [
    "type",
    "category",
    "tag",
    "designSystem",
    "license",
    "difficulty",
    "genre",
    "density",
    "shape",
    "motion",
    "typography",
  ] as const) {
    const values = params[key];
    if (values && values.length > 0) flat[key] = values.join(",");
  }

  return request<SearchResult>(`/search${query(flat)}`, { token });
}

export interface ResourceQuery {
  type?: string;
  category?: string;
  sort?: "recent" | "popular" | "name";
  page?: number;
  perPage?: number;
}

export function listResources(
  params: ResourceQuery = {},
  token?: string | null,
): Promise<Paginated<ResourceSummary>> {
  return request<Paginated<ResourceSummary>>(`/resources${query({ ...params })}`, { token });
}

export function getResource(slug: string, token?: string | null): Promise<ResourceDetail> {
  return request<ResourceDetail>(`/resources/${encodeURIComponent(slug)}`, { token });
}

export function listCategories(): Promise<{ items: Category[]; total: number }> {
  return request("/categories");
}

export function listTags(): Promise<{ items: TagSummary[]; total: number }> {
  return request("/tags");
}

export function listDesignSystems(): Promise<{ items: DesignSystemRecord[]; total: number }> {
  return request("/design-systems");
}

export function getDesignSystem(slug: string): Promise<DesignSystemRecord> {
  return request(`/design-systems/${encodeURIComponent(slug)}`);
}

export function listContributors(): Promise<{ items: ContributorSummary[]; total: number }> {
  return request("/contributors");
}

export function getContributor(username: string): Promise<ContributorSummary> {
  return request(`/contributors/${encodeURIComponent(username)}`);
}

export function recordDownload(slug: string, token?: string | null): Promise<{ downloadCount: number }> {
  return request(`/resources/${encodeURIComponent(slug)}/download`, {
    method: "POST",
    token,
  });
}

export function favorite(slug: string, token: string | null): Promise<{ favorited: boolean }> {
  return request(`/resources/${encodeURIComponent(slug)}/favorite`, { method: "POST", token });
}

export function unfavorite(slug: string, token: string | null): Promise<{ favorited: boolean }> {
  return request(`/resources/${encodeURIComponent(slug)}/favorite`, { method: "DELETE", token });
}

export function listMyFavorites(token: string | null): Promise<Paginated<ResourceSummary>> {
  return request("/me/favorites", { token });
}

export function getMe(token: string | null): Promise<{
  userId: string;
  username: string;
  displayName: string | null;
  role: string;
  email: string | null;
}> {
  return request("/me", { token });
}

export function listCollections(
  options: { owner?: "me"; page?: number; perPage?: number } = {},
  token?: string | null,
): Promise<Paginated<CollectionSummary>> {
  return request(`/collections${query({ ...options })}`, { token });
}

export function getCollection(id: string, token?: string | null): Promise<CollectionDetail> {
  return request(`/collections/${encodeURIComponent(id)}`, { token });
}

export function createCollection(
  input: { title: string; description?: string; isPublic?: boolean },
  token: string | null,
): Promise<{ id: string; slug: string }> {
  return request("/collections", { method: "POST", body: input, token });
}

export function updateCollection(
  id: string,
  input: { title?: string; description?: string; isPublic?: boolean },
  token: string | null,
): Promise<{ id: string }> {
  return request(`/collections/${encodeURIComponent(id)}`, { method: "PATCH", body: input, token });
}

export function deleteCollection(id: string, token: string | null): Promise<void> {
  return request(`/collections/${encodeURIComponent(id)}`, { method: "DELETE", token });
}

export function addCollectionItem(
  id: string,
  resourceSlug: string,
  token: string | null,
): Promise<CollectionDetail> {
  return request(`/collections/${encodeURIComponent(id)}/items`, {
    method: "POST",
    body: { resourceSlug },
    token,
  });
}

export function listMySubmissions(token: string | null): Promise<{
  items: Array<{ id: string; title: string; slug: string; status: string; created_at: string }>;
  total: number;
}> {
  return request("/me/submissions", { token });
}

export function createSubmission(
  input: {
    title: string;
    description: string;
    resourceType: string;
    slug: string;
    pullRequestUrl?: string;
  },
  token: string | null,
): Promise<{ id: string; status: string }> {
  return request("/submissions", { method: "POST", body: input, token });
}

export function reportResource(
  input: { resourceSlug?: string; reason: string; details?: string },
  token?: string | null,
): Promise<{ id: string; status: string }> {
  return request("/reports", { method: "POST", body: input, token });
}

export function submitReview(
  submissionId: string,
  input: { decision: string; notes?: string },
  token: string | null,
): Promise<{ id: string; status: string }> {
  return request(`/admin/submissions/${encodeURIComponent(submissionId)}/review`, {
    method: "POST",
    body: input,
    token,
  });
}

export function listSubmissionsForReview(
  options: { status?: string; page?: number; perPage?: number } = {},
  token?: string | null,
): Promise<Paginated<SubmissionSummary>> {
  return request(`/admin/submissions${query({ ...options })}`, { token });
}

export function getAnalytics(token: string | null): Promise<{
  resources: number;
  published: number;
  submissionsOpen: number;
  reportsOpen: number;
  downloads7d: number;
  views7d: number;
  contributors: number;
}> {
  return request("/admin/analytics", { token });
}
