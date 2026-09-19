import { createClient, type Session, type SupabaseClient } from "@supabase/supabase-js";
import * as React from "react";

import type { UserRole } from "@openui/types";

import * as api from "./api.js";
import { config } from "./config.js";

/**
 * Authentication.
 *
 * Supabase Auth owns the credentials, the session and the refresh cycle; this
 * module owns the *translation* of a session into something the UI can use.
 *
 * The important decision is what this provider refuses to do: it never derives
 * a role from the token. The token's `role` claim is not authoritative here, and
 * the UI treats it as absent. Authority comes from `GET /me`, which reads
 * `profiles.role` from the database. The consequence is that a hand-modified
 * token cannot make the admin navigation appear, and — more importantly — that
 * the UI's idea of a role matches what the API will actually permit.
 *
 * When no Supabase project is configured the provider still renders, in a
 * permanently signed-out state, so every page works without a backend.
 */

export interface AuthUser {
  id: string;
  email: string | null;
  username: string | null;
  displayName: string | null;
  role: UserRole;
}

export interface AuthContextValue {
  user: AuthUser | null;
  /** Access token for API calls. `null` when signed out. */
  token: string | null;
  /** False when the deployment has no Supabase project configured. */
  enabled: boolean;
  /** True until the initial session has been read. */
  initialising: boolean;
  signInWithGitHub: () => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signInWithEmail: (email: string) => Promise<void>;
  signOut: () => Promise<void>;
  openSignInDialog: () => void;
}

const AuthContext = React.createContext<AuthContextValue | null>(null);

let client: SupabaseClient | null = null;

/** The Supabase client, or null when auth is not configured. */
export function supabase(): SupabaseClient | null {
  if (!config.supabaseUrl || !config.supabaseAnonKey) return null;
  client ??= createClient(config.supabaseUrl, config.supabaseAnonKey, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      // Sessions are returned in the URL hash for OAuth; parsing it is required
      // for the redirect back from a provider to complete.
      detectSessionInUrl: true,
      flowType: "pkce",
    },
  });
  return client;
}

export function AuthProvider({ children }: { children: React.ReactNode }): React.JSX.Element {
  const [user, setUser] = React.useState<AuthUser | null>(null);
  const [token, setToken] = React.useState<string | null>(null);
  const [initialising, setInitialising] = React.useState(true);

  React.useEffect(() => {
    const auth = supabase();
    if (!auth) {
      // No project configured: resolve immediately so nothing waits forever.
      setInitialising(false);
      return;
    }

    let active = true;

    /**
     * Turns a session into a user.
     *
     * The profile lookup goes through the API rather than straight to Postgres,
     * so the role the UI believes in is the role the API will enforce. A failed
     * lookup leaves the user signed in with the least privilege, which is the
     * safe direction to fail in.
     */
    const resolve = async (session: Session | null) => {
      if (!active) return;

      if (!session) {
        setUser(null);
        setToken(null);
        setInitialising(false);
        return;
      }

      setToken(session.access_token);
      const email = session.user.email ?? null;
      const userMeta = session.user.user_metadata as Record<string, unknown> | undefined;
      const oauthDisplayName: string | null =
        (typeof userMeta?.full_name === "string" && userMeta.full_name) ||
        (typeof userMeta?.name === "string" && userMeta.name) ||
        (typeof userMeta?.user_name === "string" && userMeta.user_name) ||
        (typeof userMeta?.preferred_username === "string" && userMeta.preferred_username) ||
        (email ? email.split("@")[0] : null) ||
        null;

      try {
        const me = await api.getMe(session.access_token);
        if (!active) return;
        setUser({
          id: me.userId,
          email: me.email ?? email,
          username: me.username,
          displayName: me.displayName || oauthDisplayName,
          role: me.role as UserRole,
        });
      } catch {
        if (!active) return;
        setUser({
          id: session.user.id,
          email,
          username: null,
          displayName: oauthDisplayName,
          role: "user",
        });
      } finally {
        if (active) setInitialising(false);
      }
    };

    void auth.auth.getSession().then(({ data }) => resolve(data.session));

    const { data: subscription } = auth.auth.onAuthStateChange((_event, session) => {
      void resolve(session);
    });

    return () => {
      active = false;
      subscription.subscription.unsubscribe();
    };
  }, []);

  /** Sends the browser to the provider, returning to the current origin after. */
  const signIn = React.useCallback(async (provider: "github" | "google") => {
    const auth = supabase();
    if (!auth) throw new Error("Authentication is not configured on this deployment.");
    const redirectUrl = `${window.location.origin}/`;
    const { data, error } = await auth.auth.signInWithOAuth({
      provider,
      options: { redirectTo: redirectUrl },
    });
    if (error) throw error;
    if (data?.url) {
      window.location.href = data.url;
    }
  }, []);

  const value = React.useMemo<AuthContextValue>(
    () => ({
      user,
      token,
      enabled: config.authEnabled,
      initialising,
      signInWithGitHub: () => signIn("github"),
      signInWithGoogle: () => signIn("google"),
      signInWithEmail: async (email: string) => {
        const auth = supabase();
        if (!auth) throw new Error("Authentication is not configured on this deployment.");
        const { error } = await auth.auth.signInWithOtp({
          email,
          options: { emailRedirectTo: window.location.href },
        });
        if (error) throw error;
      },
      signOut: async () => {
        await supabase()?.auth.signOut();
        setUser(null);
        setToken(null);
      },
      openSignInDialog: () => {
        if (typeof window !== "undefined") {
          window.dispatchEvent(new CustomEvent("openui:open-signin"));
        }
      },
    }),
    [user, token, initialising, signIn],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function openSignInDialog(): void {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("openui:open-signin"));
  }
}

export function useAuth(): AuthContextValue {
  const context = React.useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside <AuthProvider>.");
  return context;
}

/** True when the signed-in user holds at least `minimum`. */
export function useHasRole(minimum: UserRole): boolean {
  const { user } = useAuth();
  if (!user) return false;
  const rank: Record<UserRole, number> = { user: 0, contributor: 1, moderator: 2, admin: 3 };
  return rank[user.role] >= rank[minimum];
}
