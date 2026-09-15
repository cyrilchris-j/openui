import { describe, expect, it } from "vitest";

import { assertSafeRelativePath, extensionOf, isSafeRelativePath, isWithinRoot, safeJoin, sanitizeFileName } from "./path.js";
import { OpenUIError } from "./errors.js";

describe("isSafeRelativePath", () => {
  it("accepts ordinary registry paths", () => {
    expect(isSafeRelativePath("magnetic-button.tsx")).toBe(true);
    expect(isSafeRelativePath("components/magnetic-button/demo.tsx")).toBe(true);
    expect(isSafeRelativePath("ai/design-rules/anti-slop.md")).toBe(true);
    expect(isSafeRelativePath("theme.css")).toBe(true);
  });

  it("rejects traversal segments", () => {
    expect(isSafeRelativePath("../secrets.ts")).toBe(false);
    expect(isSafeRelativePath("components/../../etc/passwd")).toBe(false);
    expect(isSafeRelativePath("./file.ts")).toBe(false);
  });

  it("rejects absolute paths and drive letters on every platform", () => {
    expect(isSafeRelativePath("/etc/passwd")).toBe(false);
    expect(isSafeRelativePath("C:/Windows/system32")).toBe(false);
    expect(isSafeRelativePath("\\\\server\\share")).toBe(false);
    expect(isSafeRelativePath("~/secrets")).toBe(false);
  });

  it("rejects backslashes, null bytes and control characters", () => {
    expect(isSafeRelativePath("components\\button.tsx")).toBe(false);
    expect(isSafeRelativePath("button\u0000.tsx")).toBe(false);
    expect(isSafeRelativePath("button\u001b.tsx")).toBe(false);
  });

  it("rejects windows reserved device names", () => {
    expect(isSafeRelativePath("con.tsx")).toBe(false);
    expect(isSafeRelativePath("nul.md")).toBe(false);
    expect(isSafeRelativePath("lpt1.tsx")).toBe(false);
  });

  it("rejects empty segments, trailing slashes and over-long segments", () => {
    expect(isSafeRelativePath("")).toBe(false);
    expect(isSafeRelativePath("components//button.tsx")).toBe(false);
    expect(isSafeRelativePath("components/button.tsx/")).toBe(false);
    expect(isSafeRelativePath(`a/${"x".repeat(200)}.tsx`)).toBe(false);
  });

  it("rejects depths beyond the configured ceiling", () => {
    expect(isSafeRelativePath("a/b/c/d.tsx", { maxDepth: 3 })).toBe(false);
    expect(isSafeRelativePath("a/b/d.tsx", { maxDepth: 3 })).toBe(true);
  });

  it("enforces extension allow-lists", () => {
    expect(isSafeRelativePath("button.tsx", { allowedExtensions: [".tsx"] })).toBe(true);
    expect(isSafeRelativePath("button.exe", { allowedExtensions: [".tsx"] })).toBe(false);
    expect(isSafeRelativePath("noextension", { allowedExtensions: [".tsx"] })).toBe(false);
  });
});

describe("assertSafeRelativePath", () => {
  it("returns the path when safe", () => {
    expect(assertSafeRelativePath("components/button.tsx")).toBe("components/button.tsx");
  });

  it("throws a typed unsafe_path error with a safe message", () => {
    try {
      assertSafeRelativePath("../evil.ts");
      throw new Error("expected throw");
    } catch (error) {
      expect(error).toBeInstanceOf(OpenUIError);
      expect((error as OpenUIError).code).toBe("unsafe_path");
      expect((error as Error).message).toContain("..");
    }
  });
});

describe("safeJoin / isWithinRoot", () => {
  it("joins inside the root", () => {
    expect(safeJoin("/tmp/project", "src/components/button.tsx")).toBe("/tmp/project/src/components/button.tsx");
  });

  it("refuses to join escaping paths", () => {
    expect(() => safeJoin("/tmp/project", "../outside.ts")).toThrowError(/must not contain/);
  });

  it("detects containment", () => {
    expect(isWithinRoot("src/components", "src/components/ui/button.tsx")).toBe(true);
    expect(isWithinRoot("src/components", "src/lib/utils.ts")).toBe(false);
  });
});

describe("helpers", () => {
  it("reads extensions", () => {
    expect(extensionOf("button.tsx")).toBe(".tsx");
    expect(extensionOf("a/b/theme.css")).toBe(".css");
    expect(extensionOf("Makefile")).toBe("");
  });

  it("sanitises file names", () => {
    expect(sanitizeFileName("../../evil name.tsx")).toBe("evil-name.tsx");
    expect(sanitizeFileName("")).toBe("file");
  });
});
