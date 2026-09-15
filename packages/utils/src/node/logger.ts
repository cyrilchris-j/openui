/**
 * Structured logging.
 *
 * One JSON object per line so that log aggregators can index it, with an
 * allow-list of redacted keys so secrets and personally identifying detail
 * cannot leak through a careless log call.
 */

export type LogLevel = "debug" | "info" | "warn" | "error";

const LEVEL_RANK: Record<LogLevel, number> = { debug: 10, info: 20, warn: 30, error: 40 };

const REDACTED_KEYS = [
  "password",
  "token",
  "access_token",
  "refresh_token",
  "authorization",
  "apikey",
  "api_key",
  "secret",
  "service_role",
  "cookie",
  "set-cookie",
  "email",
  "ip",
  "ip_address",
];

export interface LoggerOptions {
  level?: LogLevel;
  /** Extra context merged into every line, e.g. `{ service: "registry-api" }`. */
  context?: Record<string, unknown>;
  /** Injectable sink so tests can assert on output. */
  sink?: (line: string) => void;
}

export interface Logger {
  debug(message: string, fields?: Record<string, unknown>): void;
  info(message: string, fields?: Record<string, unknown>): void;
  warn(message: string, fields?: Record<string, unknown>): void;
  error(message: string, fields?: Record<string, unknown>): void;
  child(context: Record<string, unknown>): Logger;
}

export function redact(value: unknown, depth = 0): unknown {
  if (depth > 4) return "[truncated]";
  if (value === null || typeof value !== "object") return value;
  if (Array.isArray(value)) return value.slice(0, 20).map((item) => redact(item, depth + 1));
  if (value instanceof Error) {
    return { name: value.name, message: value.message, stack: value.stack };
  }
  const output: Record<string, unknown> = {};
  for (const [key, item] of Object.entries(value as Record<string, unknown>)) {
    output[key] = REDACTED_KEYS.includes(key.toLowerCase()) ? "[redacted]" : redact(item, depth + 1);
  }
  return output;
}

/** `redact` narrowed to a plain object, so log fields can be spread safely. */
export function redactRecord(value: Record<string, unknown>, depth = 0): Record<string, unknown> {
  const redacted = redact(value, depth);
  if (redacted && typeof redacted === "object" && !Array.isArray(redacted)) {
    return redacted as Record<string, unknown>;
  }
  return {};
}

export function createLogger(options: LoggerOptions = {}): Logger {
  const threshold = LEVEL_RANK[options.level ?? (process.env["LOG_LEVEL"] as LogLevel) ?? "info"] ?? 20;
  const sink = options.sink ?? ((line: string) => process.stdout.write(`${line}\n`));

  function emit(level: LogLevel, message: string, fields: Record<string, unknown> = {}): void {
    if (LEVEL_RANK[level] < threshold) return;
    sink(
      JSON.stringify({
        ts: new Date().toISOString(),
        level,
        message,
        ...redactRecord(options.context ?? {}),
        ...redactRecord(fields),
      }),
    );
  }

  return {
    debug: (message, fields) => emit("debug", message, fields),
    info: (message, fields) => emit("info", message, fields),
    warn: (message, fields) => emit("warn", message, fields),
    error: (message, fields) => emit("error", message, fields),
    child: (context) =>
      createLogger({ level: options.level, context: { ...options.context, ...context }, sink }),
  };
}
