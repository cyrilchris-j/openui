import type { Paginated, ResourceSummary } from "@openui/types";
import * as api from "./api.js";

export interface StoredFavorite {
  id: string;
  slug: string;
  name: string;
  title: string;
  description: string;
  categorySlug: string;
  resourceType: string;
  savedAt: string;
}

const STORAGE_PREFIX = "openui_favorites_";

function getStorageKey(userId: string): string {
  return `${STORAGE_PREFIX}${userId}`;
}

export function getStoredFavorites(userId: string | null | undefined): StoredFavorite[] {
  if (!userId || typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(getStorageKey(userId));
    return raw ? (JSON.parse(raw) as StoredFavorite[]) : [];
  } catch {
    return [];
  }
}

export function isResourceFavorited(userId: string | null | undefined, slug: string): boolean {
  if (!userId || !slug) return false;
  const list = getStoredFavorites(userId);
  return list.some((item) => item.slug === slug || item.name === slug);
}

export function saveFavorite(
  userId: string,
  entry: { name: string; title: string; description: string; category?: string; type?: string },
  token?: string | null,
): boolean {
  if (!userId || typeof window === "undefined") return false;
  try {
    const list = getStoredFavorites(userId);
    const existing = list.findIndex((item) => item.slug === entry.name || item.name === entry.name);
    if (existing === -1) {
      list.unshift({
        id: entry.name,
        slug: entry.name,
        name: entry.name,
        title: entry.title,
        description: entry.description,
        categorySlug: entry.category ?? "components",
        resourceType: (entry.type ?? "component").replace("registry:", ""),
        savedAt: new Date().toISOString(),
      });
      localStorage.setItem(getStorageKey(userId), JSON.stringify(list));
      window.dispatchEvent(
        new CustomEvent("openui:favorites_changed", { detail: { slug: entry.name, favorited: true } }),
      );
    }
    // Attempt remote sync if token exists
    if (token) {
      void api.favorite(entry.name, token).catch(() => {});
    }
    return true;
  } catch {
    return false;
  }
}

export function removeFavorite(
  userId: string,
  slug: string,
  token?: string | null,
): boolean {
  if (!userId || typeof window === "undefined") return false;
  try {
    const list = getStoredFavorites(userId);
    const filtered = list.filter((item) => item.slug !== slug && item.name !== slug);
    localStorage.setItem(getStorageKey(userId), JSON.stringify(filtered));
    window.dispatchEvent(
      new CustomEvent("openui:favorites_changed", { detail: { slug, favorited: false } }),
    );
    // Attempt remote sync if token exists
    if (token) {
      void api.unfavorite(slug, token).catch(() => {});
    }
    return true;
  } catch {
    return false;
  }
}

export function toggleStoredFavorite(
  userId: string,
  entry: { name: string; title: string; description: string; category?: string; type?: string },
  token?: string | null,
): boolean {
  if (isResourceFavorited(userId, entry.name)) {
    removeFavorite(userId, entry.name, token);
    return false;
  } else {
    saveFavorite(userId, entry, token);
    return true;
  }
}

export function getFavoritesAsPaginated(userId: string | null | undefined): Paginated<ResourceSummary> {
  const list = getStoredFavorites(userId);
  const items: ResourceSummary[] = list.map((item) => ({
    id: item.id,
    slug: item.slug,
    name: item.name,
    title: item.title,
    description: item.description,
    resourceType: (item.resourceType as any) || "component",
    status: "published",
    categorySlug: item.categorySlug,
    categoryName: item.categorySlug,
    designSystemSlug: null,
    licenseSpdx: "MIT",
    author: null,
    latestVersion: "0.1.0",
    tags: [],
    subcategory: null,
    fingerprint: null,
    design: null,
    dependencies: [],
    registryDependencies: [],
    downloadCount: 0,
    viewCount: 0,
    favoriteCount: 1,
    difficulty: null,
    createdAt: item.savedAt,
    updatedAt: item.savedAt,
    publishedAt: item.savedAt,
  }));

  return {
    items,
    total: items.length,
    page: 1,
    perPage: 50,
    hasMore: false,
  };
}
