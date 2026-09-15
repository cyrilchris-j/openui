import { unsafePath } from "./errors.js";

/**
 * Path safety.
 *
 * Registry items are contributed by strangers, so every path that crosses a
 * trust boundary goes through these guards:
 *
 *  - registry item directories → artifact `files[].path`
 *  - artifact `files[].path` → the CLI's destination on disk
 *
 * Rules, in one place so they cannot drift:
 *   1. relative only — no `/`, `~`, drive letters, UNC prefixes
 *   2. forward slashes only — backslashes are rejected outright
 *   3. no `.` or `..` segments
 *   4. no NUL bytes or control characters
 *   5. no Windows reserved device names
 *   6. bounded length per segment and overall
 */

const WINDOWS_RESERVED = new Set([
  "con",
  "prn",
  "aux",
  "nul",
  "com1",
  "com2",
  "com3",
  "com4",
  "com5",
  "com6",
  "com7",
  "com8",
  "com9",
  "lpt1",
  "lpt2",
  "lpt3",
  "lpt4",
  "lpt5",
  "lpt6",
  "lpt7",
  "lpt8",
  "lpt9",
]);

const MAX_SEGMENT_LENGTH = 128;
const MAX_PATH_LENGTH = 512;

/** eslint-disable-next-line no-control-regex */
const CONTROL_CHARS = /[\u0000-\u001f\u007f]/;

export function hasNullByte(value: string): boolean {
  return value.includes("\u0000");
}

export function hasControlCharacters(value: string): boolean {
  return CONTROL_CHARS.test(value);
}

/** `/foo`, `C:\foo`, `\\server\share`, `~/foo` all look absolute. */
export function isAbsoluteLike(value: string): boolean {
  return (
    value.startsWith("/") ||
    value.startsWith("\\") ||
    value.startsWith("~") ||
    /^[a-zA-Z]:[\\/]/.test(value)
  );
}

export interface PathSafetyOptions {
  /** Path depth ceiling. Registry files are shallow by design. */
  maxDepth?: number;
  /** Extensions the caller accepts, e.g. `[".tsx", ".ts"]`. */
  allowedExtensions?: readonly string[];
}

/**
 * Returns `null` when the path is safe, or a human-readable reason when it is
 * not. Callers that need a boolean use `isSafeRelativePath`.
 */
export function explainUnsafePath(value: string, options: PathSafetyOptions = {}): string | null {
  const maxDepth = options.maxDepth ?? 8;

  if (value.length === 0) return "Path is empty.";
  if (hasNullByte(value)) return "Path contains a null byte.";
  if (hasControlCharacters(value)) return "Path contains control characters.";
  if (value.includes("\\")) return "Path must use forward slashes.";
  if (isAbsoluteLike(value)) return "Path must be relative to the project root.";
  if (value.length > MAX_PATH_LENGTH) return `Path exceeds ${MAX_PATH_LENGTH} characters.`;
  if (value.endsWith("/")) return "Path must not end with a slash.";

  const segments = value.split("/");
  if (segments.length > maxDepth) return `Path is deeper than ${maxDepth} segments.`;

  for (const segment of segments) {
    if (segment === "") return "Path contains an empty segment.";
    if (segment === "." || segment === "..") return "Path must not contain '.' or '..' segments.";
    if (segment.length > MAX_SEGMENT_LENGTH) {
      return `Path segment exceeds ${MAX_SEGMENT_LENGTH} characters.`;
    }
    if (segment.endsWith(" ") || segment.endsWith(".")) {
      return "Path segments must not end with a space or a dot.";
    }
    if (hasNullByte(segment)) return "Path contains a null byte.";

    const baseName = segment.split(".")[0]?.toLowerCase() ?? "";
    if (WINDOWS_RESERVED.has(baseName)) {
      return `Path segment "${segment}" is a reserved device name.`;
    }
  }

  if (options.allowedExtensions && options.allowedExtensions.length > 0) {
    const extension = extensionOf(value);
    if (!options.allowedExtensions.includes(extension)) {
      return `Unsupported file extension "${extension || "(none)"}".`;
    }
  }

  return null;
}

export function isSafeRelativePath(value: string, options: PathSafetyOptions = {}): boolean {
  return explainUnsafePath(value, options) === null;
}

/**
 * Throws `unsafe_path` when the path fails validation. Use this at every trust
 * boundary rather than validating and continuing.
 */
export function assertSafeRelativePath(value: string, options: PathSafetyOptions = {}): string {
  const reason = explainUnsafePath(value, options);
  if (reason) throw unsafePath(`${reason} (received: ${JSON.stringify(truncateForMessage(value))})`);
  return value;
}

export function extensionOf(value: string): string {
  const lastSegment = value.split("/").pop() ?? "";
  const dot = lastSegment.lastIndexOf(".");
  if (dot <= 0) return "";
  return lastSegment.slice(dot).toLowerCase();
}

export function stripExtension(value: string): string {
  const extension = extensionOf(value);
  return extension ? value.slice(0, -extension.length) : value;
}

/**
 * Joins a trusted root with an untrusted relative path and guarantees the
 * result stays inside the root. Pure string maths so it works identically on
 * every platform and is trivially unit-testable.
 */
export function safeJoin(root: string, relative: string, options: PathSafetyOptions = {}): string {
  assertSafeRelativePath(relative, options);
  const trimmedRoot = root.replace(/\/+$/, "");
  return `${trimmedRoot}/${relative}`;
}

/** True when `candidate` resolves inside `root` (both may be posix-ish). */
export function isWithinRoot(root: string, candidate: string): boolean {
  const normalizedRoot = root.replace(/\/+$/, "").split("/").filter(Boolean);
  const normalizedCandidate = candidate.split("/").filter(Boolean);
  if (normalizedCandidate.length < normalizedRoot.length) return false;
  return normalizedRoot.every((segment, index) => normalizedCandidate[index] === segment);
}

/** Removes characters that are unsafe or confusing in a filename. */
export function sanitizeFileName(value: string, fallback = "file"): string {
  const cleaned = value
    .replace(/[\u0000-\u001f\u007f]/g, "")
    .replace(/[\\/]/g, "-")
    .replace(/[^a-zA-Z0-9._-]/g, "-")
    .replace(/-{2,}/g, "-")
    .replace(/^[-.]+/, "")
    .replace(/[-.]+$/, "");
  return cleaned.length > 0 ? cleaned : fallback;
}

export function truncateForMessage(value: string, max = 80): string {
  return value.length <= max ? value : `${value.slice(0, max)}…`;
}
