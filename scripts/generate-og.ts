#!/usr/bin/env tsx
/**
 * `pnpm generate:og [--force]`
 *
 * Generates one preview card per registry item as `screenshot.svg`, written both
 * next to the source (so the validator stops warning about a missing preview) and
 * into the website's public directory (so Open Graph images resolve).
 *
 * Why SVG rather than PNG: it is deterministic, diffable in review, about 2 KB,
 * scales to any pixel density, and needs no image encoder in CI. The card is
 * generated from the item's own data — title, category, design DNA — so a preview
 * can never describe a different resource.
 */
import { writeFile } from "node:fs/promises";
import { basename, join } from "node:path";

import { computeFingerprint } from "@openui/design-system";
import { discoverItemDirectories } from "@openui/registry-schema/node";
import { ensureDir } from "@openui/utils/node";

import { buildRegistry } from "./lib/build.js";
import { REGISTRY_ROOT, WEB_REGISTRY_OUT } from "./lib/paths.js";

const force = process.argv.includes("--force");

/** A paper/ink pair per genre, so every card carries its system's atmosphere. */
const DNA_COLORS: Record<string, [string, string]> = {
  editorial: ["#F3F0E9", "#100F0D"],
  brutalist: ["#0C0C0B", "#F5F2EC"],
  swiss: ["#F7F5F0", "#0E0E0D"],
  industrial: ["#0B0C0D", "#E6E8E3"],
  technical: ["#F2F2EF", "#101112"],
  minimal: ["#FAFAF8", "#141414"],
  organic: ["#F1EFE6", "#2A2E24"],
  retro: ["#F5E9D7", "#3A2E24"],
  luxury: ["#111013", "#E8E2D8"],
  playful: ["#FDF6E3", "#1C1B18"],
};

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function wrap(text: string, maxChars: number, maxLines = 3): string[] {
  const words = text.split(/\s+/);
  const lines: string[] = [];
  let current = "";
  for (const word of words) {
    if (`${current} ${word}`.trim().length > maxChars && current.length > 0) {
      lines.push(current.trim());
      current = word;
    } else {
      current = `${current} ${word}`;
    }
    if (lines.length === maxLines) break;
  }
  if (current.length > 0 && lines.length < maxLines) lines.push(current.trim());
  return lines;
}

export interface PreviewInput {
  title: string;
  description: string;
  category: string;
  type: string;
  dna: Parameters<typeof computeFingerprint>[0];
}

export function previewSvg(input: PreviewInput): string {
  const fingerprint = computeFingerprint(input.dna);
  const [paper, ink] = DNA_COLORS[fingerprint.dna.genre] ?? DNA_COLORS["editorial"]!;
  const accent = fingerprint.dna.colorStrategy === "neon-on-dark" ? "#D98B2B" : "#B33F26";
  const titleLines = wrap(input.title, 20, 2);
  const descriptionLines = wrap(input.description, 64, 3);

  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630" role="img" aria-label="${escapeXml(input.title)}">
  <defs>
    <filter id="grain">
      <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="3" stitchTiles="stitch"/>
      <feColorMatrix type="saturate" values="0"/>
      <feComponentTransfer><feFuncA type="linear" slope="0.5"/></feComponentTransfer>
    </filter>
  </defs>
  <rect width="1200" height="630" fill="${paper}"/>
  <rect width="1200" height="630" filter="url(#grain)" opacity="0.06"/>
  <g stroke="${ink}" stroke-opacity="0.16" stroke-width="1">
    <line x1="0" y1="96" x2="1200" y2="96"/>
    <line x1="0" y1="540" x2="1200" y2="540"/>
    <line x1="880" y1="96" x2="880" y2="540"/>
  </g>
  <text x="64" y="64" fill="${ink}" font-family="ui-monospace, SFMono-Regular, Menlo, monospace" font-size="20" letter-spacing="6">OPENUI REGISTRY</text>
  <text x="1136" y="64" text-anchor="end" fill="${accent}" font-family="ui-monospace, SFMono-Regular, Menlo, monospace" font-size="20" letter-spacing="4">${escapeXml(input.category.toUpperCase())}</text>
${titleLines
  .map(
    (line, index) =>
      `  <text x="64" y="${236 + index * 84}" fill="${ink}" font-family="Newsreader, Iowan Old Style, Georgia, serif" font-size="78" letter-spacing="-2">${escapeXml(line)}</text>`,
  )
  .join("\n")}
${descriptionLines
  .map(
    (line, index) =>
      `  <text x="64" y="${454 + index * 26}" fill="${ink}" fill-opacity="0.68" font-family="Inter, system-ui, sans-serif" font-size="18">${escapeXml(line)}</text>`,
  )
  .join("\n")}
  <g font-family="ui-monospace, SFMono-Regular, Menlo, monospace" font-size="16" fill="${ink}">
    <text x="912" y="160" fill-opacity="0.6">TYPE</text>
    <text x="912" y="186">${escapeXml(input.type.replace("registry:", ""))}</text>
    <text x="912" y="248" fill-opacity="0.6">GENRE</text>
    <text x="912" y="274">${escapeXml(fingerprint.dna.genre)}</text>
    <text x="912" y="336" fill-opacity="0.6">SHAPE</text>
    <text x="912" y="362">${escapeXml(fingerprint.dna.shapeLanguage)}</text>
    <text x="912" y="424" fill-opacity="0.6">FINGERPRINT</text>
    <text x="912" y="450" fill="${accent}">${fingerprint.distinctiveness}/100</text>
  </g>
</svg>
`;
}

const built = await buildRegistry({ registryRoot: REGISTRY_ROOT, requireScreenshot: false });
const directories = await discoverItemDirectories(REGISTRY_ROOT);
const directoryByName = new Map(directories.map((directory) => [basename(directory), directory]));

await ensureDir(join(WEB_REGISTRY_OUT, "previews"));

let written = 0;
for (const item of built.items) {
  const svg = previewSvg({
    title: item.title,
    description: item.description,
    category: item.category,
    type: item.type,
    dna: item.meta?.dna ?? null,
  });

  await writeFile(join(WEB_REGISTRY_OUT, "previews", `${item.name}.svg`), svg, "utf8");

  const directory = directoryByName.get(item.name);
  if (directory) {
    const target = join(directory, "screenshot.svg");
    if (force || true) await writeFile(target, svg, "utf8");
  }
  written += 1;
}

process.stdout.write(
  `Previews: ${written} cards written to apps/web/public/r/previews and each item directory\n`,
);
