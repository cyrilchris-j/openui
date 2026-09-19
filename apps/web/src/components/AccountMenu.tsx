import { LogIn, LogOut, Shield, User } from "lucide-react";
import * as React from "react";
import { Link } from "react-router";

import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Input,
} from "@openui/ui";

import { useAuth } from "../lib/auth.js";
import { useHasRole } from "../lib/auth.js";

/**
 * Account menu.
 *
 * Two states, and the difference matters:
 *
 *  - **Signed out** → a sign-in dialog. Providers first (one click), then magic
 *    link, because a password field would be a form we would then have to
 *    secure for no benefit.
 *  - **Signed in** → an account menu. The moderation link appears only when the
 *    *API-derived* role permits it; the navigation is a convenience, and the
 *    route itself is guarded server-side regardless.
 *
 * When the deployment has no Supabase project configured, the control explains
 * that rather than opening a dialog that cannot work.
 */
export function AccountMenu(): React.JSX.Element {
  const { user, enabled, signInWithGitHub, signInWithGoogle, signInWithEmail, signOut } = useAuth();
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [status, setStatus] = React.useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = React.useState<string | null>(null);
  const isStaff = useHasRole("moderator");

  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const errorDesc = params.get("error_description") ?? params.get("error");
    if (errorDesc) {
      setError(decodeURIComponent(errorDesc.replace(/\+/g, " ")));
      setDialogOpen(true);
    }
  }, []);

  React.useEffect(() => {
    const handleOpenSignIn = () => {
      setDialogOpen(true);
    };
    window.addEventListener("openui:open-signin", handleOpenSignIn);
    return () => {
      window.removeEventListener("openui:open-signin", handleOpenSignIn);
    };
  }, []);

  if (!enabled) {
    return (
      <Button
        variant="ghost"
        size="sm"
        disabled
        title="Authentication is not configured on this deployment."
        className="h-8 w-8 sm:h-9 sm:w-auto px-0 sm:px-2.5 shrink-0"
      >
        <User aria-hidden className="h-3.5 w-3.5" />
        <span className="hidden lg:inline ml-1.5">Accounts off</span>
      </Button>
    );
  }

  if (!user) {
    return (
      <>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setDialogOpen(true)}
          title="Account"
          aria-label="Account"
          className="h-8 sm:h-9 px-2.5 sm:px-3 text-[11px] font-mono uppercase tracking-wider gap-1.5 border-line text-ink hover:border-ink hover:bg-surface/50 shrink-0"
        >
          <User aria-hidden className="h-3.5 w-3.5" />
          <span>Account</span>
        </Button>

        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent className="sm:max-w-[28rem]">
            <div className="text-center space-y-1.5">
              <DialogTitle className="text-center">Sign in to OpenUI</DialogTitle>
              <DialogDescription className="text-center">
                Signing in lets you save favourites, build collections and submit resources to the
                registry. Everything in the catalogue is readable without an account.
              </DialogDescription>
            </div>

            <div className="flex flex-col gap-2.5">
              <Button
                variant="primary"
                className="w-full justify-center"
                onClick={() =>
                  void signInWithGitHub().catch((cause: unknown) =>
                    setError(cause instanceof Error ? cause.message : "GitHub sign-in failed."),
                  )
                }
              >
                Continue with GitHub
              </Button>
              <Button
                variant="outline"
                className="w-full justify-center"
                onClick={() =>
                  void signInWithGoogle().catch((cause: unknown) =>
                    setError(cause instanceof Error ? cause.message : "Google sign-in failed."),
                  )
                }
              >
                Continue with Google
              </Button>
            </div>

            <div className="relative my-1 text-center">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-line" />
              </div>
              <span className="relative bg-paper px-3 font-mono text-[10px] uppercase tracking-[0.14em] text-graphite">
                or use an email link
              </span>
            </div>

            <form
              className="flex flex-col gap-3"
              onSubmit={(event) => {
                event.preventDefault();
                setStatus("sending");
                setError(null);
                void signInWithEmail(email)
                  .then(() => setStatus("sent"))
                  .catch((cause: unknown) => {
                    setStatus("error");
                    setError(
                      cause instanceof Error ? cause.message : "Could not send the sign-in link.",
                    );
                  });
              }}
            >
              <Input
                label="Email address"
                type="email"
                required
                mono
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@example.com"
                error={status === "error" ? (error ?? "Something went wrong.") : undefined}
                hint="We send a one-time link. No password is stored."
              />
              <Button type="submit" variant="ghost" loading={status === "sending"} className="w-full justify-center">
                {status === "sent" ? "Link sent — check your inbox" : "Email me a link"}
              </Button>
            </form>

            {error && status !== "error" ? (
              <p role="alert" className="text-center text-[0.8rem] text-oxide">
                {error}
              </p>
            ) : null}
          </DialogContent>
        </Dialog>
      </>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          title={user.username ? `@${user.username}` : "Account"}
          aria-label="Account"
          className="h-8 sm:h-9 px-2.5 sm:px-3 text-[11px] font-mono uppercase tracking-wider gap-1.5 border-line text-ink hover:border-ink hover:bg-surface/50 shrink-0"
        >
          <User aria-hidden className="h-3.5 w-3.5" />
          <span>{user.username ? `@${user.username}` : "Account"}</span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <DropdownMenuLabel>{user.email ?? "Signed in"}</DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuItem asChild>
          <Link to="/account/profile" className="w-full">
            Profile
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to="/account/favorites" className="w-full">
            Favourites
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to="/account/collections" className="w-full">
            Collections
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to="/account/submissions" className="w-full">
            Submissions
          </Link>
        </DropdownMenuItem>

        {isStaff ? (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link to="/admin" className="w-full">
                <Shield aria-hidden className="h-3.5 w-3.5" />
                Moderation
              </Link>
            </DropdownMenuItem>
          </>
        ) : null}

        <DropdownMenuSeparator />
        <DropdownMenuItem destructive onSelect={() => void signOut()}>
          <LogOut aria-hidden className="h-3.5 w-3.5" />
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
