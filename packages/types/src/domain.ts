import type { ResourceStatus, ResourceType, SubmissionStatus, UserRole } from "./resource.js";

/** ISO-8601 UTC timestamp string, e.g. `2026-02-14T09:31:00.000Z`. */
export type Timestamp = string;

export interface Profile {
  id: string;
  username: string;
  displayName: string | null;
  bio: string | null;
  avatarUrl: string | null;
  websiteUrl: string | null;
  githubUsername: string | null;
  role: UserRole;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface ResourceVersionSummary {
  id: string;
  resourceId: string;
  version: string;
  commitSha: string | null;
  changelog: string | null;
  isLatest: boolean;
  publishedAt: Timestamp | null;
  createdAt: Timestamp;
}

export interface ResourceFileSummary {
  id: string;
  path: string;
  fileType: string;
  contentHash: string;
  sizeBytes: number;
  sourceUrl: string | null;
}

export interface ResourceSummary {
  id: string;
  slug: string;
  name: string;
  title: string;
  description: string;
  resourceType: ResourceType;
  status: ResourceStatus;
  categorySlug: string | null;
  categoryName: string | null;
  designSystemSlug: string | null;
  licenseSpdx: string | null;
  author: {
    id: string;
    username: string;
    displayName: string | null;
    avatarUrl: string | null;
  } | null;
  latestVersion: string | null;    tags: string[];
    /** Subcategory within the category; null when the item does not declare one. */
    subcategory: string | null;
    /** Behavioural fingerprint; null when the item does not declare one. */
    fingerprint: Partial<Record<string, string>> | null;
    design: {
    genre: string | null;
    macrostructure: string | null;
    density: string | null;
    shapeLanguage: string | null;
    motionLanguage: string | null;
    typographyStyle: string | null;
    colorStrategy: string | null;
  } | null;
  dependencies: string[];
  registryDependencies: string[];
  downloadCount: number;
  viewCount: number;
  favoriteCount: number;
  difficulty: string | null;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  publishedAt: Timestamp | null;
}

export interface ResourceDetail extends ResourceSummary {
  repositoryUrl: string | null;
  documentationUrl: string | null;
  previewUrl: string | null;
  versions: ResourceVersionSummary[];
  files: ResourceFileSummary[];
  designRules: string | null;
}

export interface Category {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  resourceType: ResourceType | null;
  sortOrder: number;
  resourceCount: number;
}

export interface TagSummary {
  id: string;
  slug: string;
  name: string;
  resourceCount: number;
}

export interface CollectionSummary {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  isPublic: boolean;
  owner: {
    id: string;
    username: string;
    displayName: string | null;
  } | null;
  itemCount: number;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface CollectionItem {
  id: string;
  collectionId: string;
  resourceId: string;
  note: string | null;
  sortOrder: number;
  resource: ResourceSummary;
}

export interface CollectionDetail extends CollectionSummary {
  items: CollectionItem[];
}

export interface SubmissionSummary {
  id: string;
  title: string;
  slug: string;
  resourceType: ResourceType;
  status: SubmissionStatus;
  submitter: {
    id: string;
    username: string;
    displayName: string | null;
  } | null;
  pullRequestUrl: string | null;
  reviewNotes: string | null;
  reviewerId: string | null;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface ReportSummary {
  id: string;
  resourceId: string | null;
  resourceSlug: string | null;
  reason: string;
  details: string | null;
  status: string;
  reporterId: string | null;
  createdAt: Timestamp;
}

export interface ContributorSummary {
  id: string;
  username: string;
  displayName: string | null;
  avatarUrl: string | null;
  bio: string | null;
  resourceCount: number;
  totalDownloads: number;
  joinedAt: Timestamp;
}

export interface DesignSystemRecord {
  id: string;
  slug: string;
  name: string;
  description: string;
  tokens: Record<string, unknown>;
  rules: Record<string, unknown>;
  author_id: string;
  is_official: boolean;
  version: string;
  created_at: string;
  updated_at: string;
}

export interface Paginated<T> {
  items: T[];
  total: number;
  page: number;
  perPage: number;
  hasMore: boolean;
}

export interface ApiErrorBody {
  error: {
    code: string;
    message: string;
    /** Field-level problems for 422 responses. Never contains stack traces. */
    details?: Array<{ path: string; message: string }>;
    requestId?: string;
  };
}
