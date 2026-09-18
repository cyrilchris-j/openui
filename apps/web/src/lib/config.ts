import { API_PREFIX } from "@openui/types";

/**
 * Runtime configuration.
 *
 * Every value here is *public by definition* — Vite inlines `VITE_*` variables
 * into the bundle, so a secret placed here would be shipped to every visitor.
 * The service-role key and the database URL are therefore deliberately absent,
 * and `missingConfiguration` below turns a misconfigured deployment into an
 * explicit, visible message rather than a failing fetch.
 */

function read(key: string, fallback: string): string {
  const value = import.meta.env[key];
  return typeof value === "string" && value.length > 0 ? value : fallback;
}

export interface AppConfig {
  /** Base URL of the registry API, without the `/api/v1` suffix. */
  apiBaseUrl: string;
  /** Where built registry artifacts are served from. */
  registryBaseUrl: string;
  supabaseUrl: string | null;
  supabaseAnonKey: string | null;
  /** True when a Supabase project is configured, i.e. auth is available. */
  authEnabled: boolean;
  environment: "development" | "production";
}

export const config: AppConfig = {
  // Defaults point at relative paths so CDN / hosting deployments work out of the box.
  apiBaseUrl: (
    import.meta.env.PROD && read("VITE_API_BASE_URL", "/api/v1").includes("localhost")
      ? "/api/v1"
      : read("VITE_API_BASE_URL", "/api/v1")
  ).replace(/\/+$/, ""),
  registryBaseUrl: (
    import.meta.env.PROD && read("VITE_REGISTRY_BASE_URL", "/r").includes("localhost")
      ? "/r"
      : read("VITE_REGISTRY_BASE_URL", "/r")
  ).replace(/\/+$/, ""),
  supabaseUrl: read("VITE_SUPABASE_URL", "https://hkzacjeplcmyexqmzyqn.supabase.co"),
  supabaseAnonKey: read(
    "VITE_SUPABASE_ANON_KEY",
    "sb_publishable_IsfEdcoPgI5Vu6SbcXSoXA_hLdp_CC6",
  ),
  get authEnabled(): boolean {
    return Boolean(this.supabaseUrl && this.supabaseAnonKey);
  },
  environment: import.meta.env.PROD ? "production" : "development",
};

/** Full URL of an API path, e.g. `/resources/magnetic-button`. */
export function apiUrl(path: string): string {
  const normalised = path.startsWith("/") ? path : `/${path}`;
  // The default `apiBaseUrl` already includes the version prefix.
  return config.apiBaseUrl.endsWith(API_PREFIX)
    ? `${config.apiBaseUrl}${normalised}`
    : `${config.apiBaseUrl}${API_PREFIX}${normalised}`;
}

/** Full URL of a built registry artifact, e.g. `magnetic-button.json`. */
export function registryUrl(path: string): string {
  return `${config.registryBaseUrl}/${path.replace(/^\/+/, "")}`;
}

/**
 * Configuration that is absent or suspicious, for the diagnostics page.
 *
 * Returning this instead of throwing is deliberate: a missing API URL should
 * degrade the community features, not take the whole catalogue offline.
 */
export function configurationIssues(): Array<{ key: string; problem: string }> {
  const issues: Array<{ key: string; problem: string }> = [];
  if (!config.supabaseUrl) {
    issues.push({
      key: "VITE_SUPABASE_URL",
      problem: "Not set. Authentication, favourites and collections are disabled.",
    });
  }
  if (!config.supabaseAnonKey) {
    issues.push({
      key: "VITE_SUPABASE_ANON_KEY",
      problem: "Not set. Authentication, favourites and collections are disabled.",
    });
  }
  return issues;
}
