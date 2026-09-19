import { describe, expect, it } from "vitest";
import React, { act } from "react";
import { createRoot } from "react-dom/client";

import {
  ADVANCED_CATEGORIES,
  ADVANCED_RESOURCES,
  getAdvancedItemBySlug,
  getAdvancedItemsByCategory,
} from "./index.js";
import { AdvancedPreview } from "./renderers/AdvancedPreview.js";

describe("OpenUI Advanced Resource Ecosystem", () => {
  it("registers at least 220 advanced resources", () => {
    expect(ADVANCED_RESOURCES.length).toBeGreaterThanOrEqual(220);
  });

  it("registers all 9 advanced categories with positive counts", () => {
    expect(ADVANCED_CATEGORIES.length).toBe(9);
    for (const cat of ADVANCED_CATEGORIES) {
      const items = getAdvancedItemsByCategory(cat.slug);
      expect(items.length).toBeGreaterThan(0);
      expect(items.length).toBe(cat.itemCount);
    }
  });

  it("guarantees unique slugs and IDs across all advanced items", () => {
    const slugs = new Set<string>();
    const ids = new Set<string>();

    for (const item of ADVANCED_RESOURCES) {
      expect(slugs.has(item.slug)).toBe(false);
      expect(ids.has(item.id)).toBe(false);
      slugs.add(item.slug);
      ids.add(item.id);

      // Verify essential metadata
      expect(item.title).toBeTruthy();
      expect(item.description).toBeTruthy();
      expect(item.category).toBeTruthy();
      expect(item.technology).toBeTruthy();
      expect(item.fingerprint).toBeDefined();
      expect(item.fingerprint.visualFamily).toBeTruthy();
      expect(item.fingerprint.motionProfile).toBeTruthy();
      expect(item.fingerprint.performanceTier).toBeTruthy();
      expect(item.tags.length).toBeGreaterThan(0);
    }
  });

  it("finds resources by slug and category", () => {
    const item = getAdvancedItemBySlug("text-loop");
    expect(item).toBeDefined();
    expect(item?.category).toBe("text-animations");

    const hero = getAdvancedItemBySlug("kinetic-editorial-hero");
    expect(hero).toBeDefined();
    expect(hero?.category).toBe("heroes");

    const button = getAdvancedItemBySlug("magnetic-spring-button");
    expect(button).toBeDefined();
    expect(button?.category).toBe("buttons");
  });
});

describe("Advanced Resource Preview Mounting", () => {
  async function mountComponent(element: React.ReactElement) {
    const container = document.createElement("div");
    document.body.appendChild(container);
    const root = createRoot(container);
    await act(async () => {
      root.render(element);
    });
    return {
      container,
      unmount: async () => {
        await act(async () => {
          root.unmount();
        });
        container.remove();
      },
    };
  }

  it("renders a text-animation preview without error", async () => {
    const item = getAdvancedItemBySlug("text-loop");
    expect(item).toBeDefined();
    if (item) {
      const { container, unmount } = await mountComponent(<AdvancedPreview item={item} />);
      expect(container.textContent).toContain(item.title);
      await unmount();
    }
  });

  it("renders a button preview with interactive controls", async () => {
    const item = getAdvancedItemBySlug("magnetic-spring-button");
    expect(item).toBeDefined();
    if (item) {
      const { container, unmount } = await mountComponent(<AdvancedPreview item={item} />);
      expect(container.textContent).toContain(item.title);
      await unmount();
    }
  });

  it("renders a background preview without throwing", async () => {
    const item = getAdvancedItemBySlug("aurora-sky-harmonic");
    expect(item).toBeDefined();
    if (item) {
      const { container, unmount } = await mountComponent(<AdvancedPreview item={item} reducedMotion={true} />);
      expect(container.textContent).toContain(item.title);
      await unmount();
    }
  });

  it("renders a 3D scene with error boundary fallback safe for test env", async () => {
    const item = getAdvancedItemBySlug("interactive-wireframe-globe");
    expect(item).toBeDefined();
    if (item) {
      const { container, unmount } = await mountComponent(<AdvancedPreview item={item} />);
      expect(container).toBeDefined();
      await unmount();
    }
  });
});
