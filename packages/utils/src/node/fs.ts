import { mkdir, readFile, readdir, rm, stat, writeFile } from "node:fs/promises";
import { dirname, isAbsolute, relative, resolve, sep } from "node:path";

import { conflict } from "../errors.js";
import { assertSafeRelativePath } from "../path.js";

/** Normalises any platform path to forward slashes for registry metadata. */
export function toPosix(value: string): string {
  return value.split(sep).join("/");
}

export function fromRoot(root: string, absolutePath: string): string {
  return toPosix(relative(root, absolutePath));
}

export async function pathExists(target: string): Promise<boolean> {
  try {
    await stat(target);
    return true;
  } catch {
    return false;
  }
}

export async function isDirectory(target: string): Promise<boolean> {
  try {
    return (await stat(target)).isDirectory();
  } catch {
    return false;
  }
}

export async function ensureDir(target: string): Promise<void> {
  await mkdir(target, { recursive: true });
}

export async function readTextFile(target: string): Promise<string> {
  return readFile(target, "utf8");
}

export async function writeTextFile(target: string, content: string): Promise<void> {
  await ensureDir(dirname(target));
  await writeFile(target, content, "utf8");
}

export async function readJsonFile<T>(target: string): Promise<T> {
  const raw = await readFile(target, "utf8");
  return JSON.parse(raw) as T;
}

export async function writeJsonFile(target: string, value: unknown, space = 2): Promise<void> {
  await ensureDir(dirname(target));
  await writeFile(target, `${JSON.stringify(value, null, space)}\n`, "utf8");
}

export async function removeDir(target: string): Promise<void> {
  await rm(target, { recursive: true, force: true });
}

/** Immediate child directories of `target`, sorted for deterministic builds. */
export async function listDirectories(target: string): Promise<string[]> {
  const entries = await readdir(target, { withFileTypes: true });
  return entries
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort((a, b) => (a < b ? -1 : a > b ? 1 : 0));
}

export interface WalkOptions {
  /** Skip directories entirely (matched against the directory name). */
  skipDirs?: readonly string[];
  /** Extension allow-list, e.g. `[".tsx", ".ts", ".css"]`. */
  extensions?: readonly string[];
}

/** Recursively collects files under `target`, returning posix-relative paths. */
export async function walkFiles(target: string, options: WalkOptions = {}): Promise<string[]> {
  const skip = new Set(options.skipDirs ?? ["node_modules", ".git", "dist", ".turbo"]);
  const output: string[] = [];

  async function visit(current: string): Promise<void> {
    const entries = await readdir(current, { withFileTypes: true });
    for (const entry of entries) {
      if (entry.isDirectory()) {
        if (skip.has(entry.name)) continue;
        await visit(resolve(current, entry.name));
        continue;
      }
      if (!entry.isFile()) continue;
      const absolute = resolve(current, entry.name);
      if (options.extensions && options.extensions.length > 0) {
        const dot = entry.name.lastIndexOf(".");
        const extension = dot > 0 ? entry.name.slice(dot).toLowerCase() : "";
        if (!options.extensions.includes(extension)) continue;
      }
      output.push(fromRoot(target, absolute));
    }
  }

  if (await isDirectory(target)) await visit(target);
  return output.sort((a, b) => (a < b ? -1 : a > b ? 1 : 0));
}

/**
 * Resolves an untrusted relative path against a trusted root and verifies the
 * result cannot escape it. Used by `openui add` before writing a single byte.
 */
export function resolveWithinRoot(root: string, relativePath: string): string {
  assertSafeRelativePath(relativePath);
  const rootAbsolute = resolve(root);
  const candidate = resolve(rootAbsolute, relativePath);
  if (candidate !== rootAbsolute && !candidate.startsWith(`${rootAbsolute}${sep}`)) {
    throw conflict("Resolved path escapes the project root.");
  }
  if (isAbsolute(relativePath)) {
    throw conflict("Absolute paths are not allowed.");
  }
  return candidate;
}
