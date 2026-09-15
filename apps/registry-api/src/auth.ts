import { createRemoteJWKSet, jwtVerify, type JWTPayload } from "jose";

import { roleAtLeast, type UserRole } from "@openui/types";
import { forbidden, unauthorized } from "@openui/utils";

import type { Env } from "./env.js";

/**
 * Authentication and authorisation.
 *
 * Tokens are verified **server-side**, in one of two ways:
 *
 *  - asymmetric (ECC/RSA) Supabase signing keys: the JWKS is fetched from the
 *    project and cached by `jose`, so verification is a local operation
 *  - legacy HS256 projects: the shared secret from the environment
 *
 * A role is never read from the token. The token establishes *identity*; the
 * `profiles.role` column — read from the database — establishes *authority*.
 * That distinction is what stops a compromised or hand-crafted token from
 * granting moderation rights: a JWT can claim `role: admin` and it changes
 * nothing here.
 */

export interface AuthContext {
  userId: string;
  email: string | null;
  /** Unverified claim, kept for logging and support only. */
  tokenRole: string | null;
  expiresAt: number | null;
}

let jwks: ReturnType<typeof createRemoteJWKSet> | null = null;

function jwksFor(env: Env) {
  if (!env.SUPABASE_URL) return null;
  jwks ??= createRemoteJWKSet(new URL(`${env.SUPABASE_URL.replace(/\/+$/, "")}/auth/v1/.well-known/jwks.json`));
  return jwks;
}

export async function verifyToken(env: Env, token: string): Promise<AuthContext> {
  const audience = "authenticated";

  if (env.SUPABASE_JWT_SECRET) {
    const { payload } = await jwtVerify(token, new TextEncoder().encode(env.SUPABASE_JWT_SECRET), {
      audience,
      clockTolerance: 5,
    });
    return toContext(payload);
  }

  const set = jwksFor(env);
  if (!set) {
    throw unauthorized("Authentication is not configured on this deployment.");
  }
  const { payload } = await jwtVerify(token, set, { audience, clockTolerance: 5 });
  return toContext(payload);
}

function toContext(payload: JWTPayload): AuthContext {
  const subject = typeof payload.sub === "string" ? payload.sub : null;
  if (!subject) throw unauthorized("Token is missing a subject claim.");
  return {
    userId: subject,
    email: typeof payload.email === "string" ? payload.email : null,
    tokenRole: typeof (payload as Record<string, unknown>)["role"] === "string"
      ? String((payload as Record<string, unknown>)["role"])
      : null,
    expiresAt: typeof payload.exp === "number" ? payload.exp : null,
  };
}

/** Extracts a bearer token, or null when the request is anonymous. */
export function bearerToken(header: string | undefined): string | null {
  if (!header) return null;
  const match = /^Bearer\s+(.+)$/i.exec(header.trim());
  return match?.[1]?.trim() || null;
}

export interface Principal {
  auth: AuthContext;
  /** The role from the database. Authoritative. */
  role: UserRole;
}

export function requireRole(principal: Principal | null, minimum: UserRole): Principal {
  if (!principal) throw unauthorized();
  if (!roleAtLeast(principal.role, minimum)) {
    throw forbidden(
      minimum === "admin"
        ? "This action requires an administrator."
        : "This action requires moderator access.",
    );
  }
  return principal;
}

/** Public API errors never include the reason a signature failed. */
export function authenticationFailed(): never {
  throw unauthorized("Your session is invalid or has expired. Sign in again.");
}
