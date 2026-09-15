/** Formatting helpers. All output is locale-stable (en-US) for snapshot tests. */

const NUMBER_FORMAT = new Intl.NumberFormat("en-US");
const COMPACT_FORMAT = new Intl.NumberFormat("en-US", { notation: "compact", maximumFractionDigits: 1 });

export function formatNumber(value: number): string {
  return NUMBER_FORMAT.format(value);
}

export function formatCount(value: number): string {
  return value < 1000 ? String(value) : COMPACT_FORMAT.format(value);
}

export function formatBytes(bytes: number): string {
  if (!Number.isFinite(bytes) || bytes < 0) return "0 B";
  const units = ["B", "KB", "MB", "GB"] as const;
  let value = bytes;
  let unitIndex = 0;
  while (value >= 1024 && unitIndex < units.length - 1) {
    value /= 1024;
    unitIndex += 1;
  }
  const rounded = unitIndex === 0 ? value : Math.round(value * 10) / 10;
  return `${rounded} ${units[unitIndex]}`;
}

export function formatMs(ms: number, unit: "s" | "ms" = "ms"): string {
  return `${Math.round(ms * 100) / 100}${unit}`;
}

export function formatDate(value: string | Date): string {
  const date = typeof value === "string" ? new Date(value) : value;
  if (Number.isNaN(date.getTime())) return "—";
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "2-digit",
    timeZone: "UTC",
  }).format(date);
}

export function formatDateTime(value: string | Date): string {
  const date = typeof value === "string" ? new Date(value) : value;
  if (Number.isNaN(date.getTime())) return "—";
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "UTC",
  }).format(date);
}

/** Relative time with a stable clock injection point for tests. */
export function formatRelativeTime(value: string | Date, now: Date = new Date()): string {
  const date = typeof value === "string" ? new Date(value) : value;
  if (Number.isNaN(date.getTime())) return "—";
  const deltaSeconds = Math.round((date.getTime() - now.getTime()) / 1000);
  const absolute = Math.abs(deltaSeconds);
  const formatter = new Intl.RelativeTimeFormat("en-US", { numeric: "auto" });
  const thresholds: Array<[number, Intl.RelativeTimeFormatUnit]> = [
    [60, "second"],
    [3600, "minute"],
    [86_400, "hour"],
    [2_592_000, "day"],
    [31_536_000, "month"],
  ];
  let divisor = 1;
  let unit: Intl.RelativeTimeFormatUnit = "year";
  for (const [limit, candidate] of thresholds) {
    if (absolute < limit) {
      unit = candidate;
      break;
    }
    divisor = limit;
  }
  return formatter.format(Math.round(deltaSeconds / divisor), unit);
}

export function formatPercent(value: number, digits = 0): string {
  return `${value.toFixed(digits)}%`;
}
