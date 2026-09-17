"use client";

import { RadialMenuOverlay } from "./radial-menu-overlay";

export default function RadialMenuOverlayDemo() {
  return (
    <RadialMenuOverlay
      center="HUB"
      items={[
        <div key="1" className="p-2 rounded-full border border-line bg-paper shadow text-[10px]">Edit</div>,
        <div key="2" className="p-2 rounded-full border border-line bg-paper shadow text-[10px]">Copy</div>,
        <div key="3" className="p-2 rounded-full border border-line bg-paper shadow text-[10px]">Share</div>,
        <div key="4" className="p-2 rounded-full border border-line bg-paper shadow text-[10px]">Delete</div>,
      ]}
    />
  );
}
