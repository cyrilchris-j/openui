/**
 * Shared error hierarchy.
 *
 * Every error that can reach a user carries a stable machine-readable `code`
 * and a message that is safe to display: no stack traces, no SQL, no file
 * system paths, no secrets. Internal detail belongs in `cause`, which the API
 * logs server-side and never serialises to a response.
 */

export type OpenUIErrorCode =
  | "bad_request"
  | "unauthorized"
  | "forbidden"
  | "not_found"
  | "conflict"
  | "rate_limit_exceeded"
  | "validation_failed"
  | "version_conflict"
  | "dependency_conflict"
  | "invalid_registry_path"
  | "unsafe_path"
  | "registry_schema_invalid"
  | "internal_error";

export interface OpenUIErrorOptions {
  cause?: unknown;
  details?: Array<{ path: string; message: string }>;
  /** HTTP status the API should use. Errors raised in the CLI ignore this. */
  status?: number;
}

export class OpenUIError extends Error {
  readonly code: OpenUIErrorCode;
  readonly status: number;
  readonly details?: Array<{ path: string; message: string }>;

  constructor(code: OpenUIErrorCode, message: string, options: OpenUIErrorOptions = {}) {
    super(message, options.cause === undefined ? undefined : { cause: options.cause });
    this.name = "OpenUIError";
    this.code = code;
    this.status = options.status ?? defaultStatusForCode(code);
    if (options.details) this.details = options.details;
  }
}

export function defaultStatusForCode(code: OpenUIErrorCode): number {
  switch (code) {
    case "bad_request":
    case "invalid_registry_path":
    case "unsafe_path":
      return 400;
    case "unauthorized":
      return 401;
    case "forbidden":
      return 403;
    case "not_found":
      return 404;
    case "conflict":
    case "version_conflict":
    case "dependency_conflict":
      return 409;
    case "validation_failed":
    case "registry_schema_invalid":
      return 422;
    case "rate_limit_exceeded":
      return 429;
    case "internal_error":
      return 500;
  }
}

export const badRequest = (message: string, options?: OpenUIErrorOptions) =>
  new OpenUIError("bad_request", message, options);
export const unauthorized = (message = "Authentication required.", options?: OpenUIErrorOptions) =>
  new OpenUIError("unauthorized", message, options);
export const forbidden = (message = "You do not have access to this resource.", options?: OpenUIErrorOptions) =>
  new OpenUIError("forbidden", message, options);
export const notFound = (message: string, options?: OpenUIErrorOptions) =>
  new OpenUIError("not_found", message, options);
export const conflict = (message: string, options?: OpenUIErrorOptions) =>
  new OpenUIError("conflict", message, options);
export const validationFailed = (
  message: string,
  details: Array<{ path: string; message: string }>,
  options?: OpenUIErrorOptions,
) => new OpenUIError("validation_failed", message, { ...options, details });
export const unsafePath = (message: string, options?: OpenUIErrorOptions) =>
  new OpenUIError("unsafe_path", message, options);

export function isOpenUIError(error: unknown): error is OpenUIError {
  return error instanceof OpenUIError;
}

/** Narrow an unknown throwable into a display-safe `{ code, message }`. */
export function toErrorResponse(error: unknown): { code: OpenUIErrorCode; message: string; status: number } {
  if (isOpenUIError(error)) {
    return { code: error.code, message: error.message, status: error.status };
  }
  return { code: "internal_error", message: "Something went wrong on our side.", status: 500 };
}
