/**
 * Vitest environment stubs.
 *
 * jsdom implements neither matchMedia nor (reliably) the observers. Registry
 * resources legitimately branch on both — that is the reduced-motion and
 * offscreen-pause contract — so the tests provide the minimal honest stubs:
 * matchMedia reports *reduced motion on* (the conservative path), observers
 * never fire.
 */
import { vi } from "vitest";

if (typeof window !== "undefined" && !window.matchMedia) {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: (query: string) => ({
      matches: query.includes("prefers-reduced-motion"),
      media: query,
      onchange: null,
      addEventListener: () => {},
      removeEventListener: () => {},
      addListener: () => {},
      removeListener: () => {},
      dispatchEvent: () => false,
    }),
  });
}

if (typeof window !== "undefined" && typeof window.ResizeObserver === "undefined") {
  class ResizeObserverStub {
    observe() {}
    unobserve() {}
    disconnect() {}
  }
  Object.defineProperty(window, "ResizeObserver", { writable: true, value: ResizeObserverStub });
}

if (typeof window !== "undefined" && typeof window.IntersectionObserver === "undefined") {
  class IntersectionObserverStub {
    observe() {}
    unobserve() {}
    disconnect() {}
    takeRecords(): IntersectionObserverEntry[] {
      return [];
    }
  }
  Object.defineProperty(window, "IntersectionObserver", {
    writable: true,
    value: IntersectionObserverStub,
  });
}

// Element.scrollTo and friends are unimplemented in jsdom; no-op them.
if (typeof window !== "undefined") {
  window.scrollTo = window.scrollTo ?? (() => {});
  if (!Element.prototype.scrollTo) {
    Element.prototype.scrollTo = (() => {}) as Element["scrollTo"];
  }
}

void vi;
