import { Heart, UserCog } from "lucide-react";
import * as React from "react";
import { NavLink, Outlet, useLocation } from "react-router";

import { Button, EmptyState, Skeleton } from "@openui/ui";

import { SignInPanel } from "../components/SignInPanel.js";
import { useAuth } from "../lib/auth.js";

/**
 * The account layout.
 *
 * The guard is on the *layout*, not on each page, so a new account route cannot
 * be added without one. It is a UI guard only — the API re-checks every write
 * against a verified token — but presenting an account screen to a signed-out
 * visitor is still wrong, so the check happens here.
 *
 * While the session is being read, a skeleton is shown rather than a redirect:
 * redirecting an authenticated user to sign-in during the first 200ms of a page
 * load is the classic auth-flash bug.
 */
const NAV = [
  { to: "/account/profile", label: "Profile", icon: UserCog },
  { to: "/account/favorites", label: "Favourites", icon: Heart },
] as const;

export function AccountLayout(): React.JSX.Element {
  const { user, initialising, enabled } = useAuth();
  const location = useLocation();

  if (!enabled) {
    return (
      <div className="shell py-20">
        <EmptyState
          eyebrow="Accounts unavailable"
          title="This deployment has no authentication configured."
          description="Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to enable accounts, favourites and collections. The catalogue, resource pages and playground all work without it."
        />
      </div>
    );
  }

  if (initialising) {
    return (
      <div className="shell grid gap-12 py-16 lg:grid-cols-[14rem_minmax(0,1fr)]">
        <Skeleton lines={4} />
        <Skeleton lines={8} />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="shell py-20">
        <SignInPanel
          title="Sign in to continue"
          description={`${location.pathname} is part of your account. Everything in the catalogue stays readable without one.`}
        />
      </div>
    );
  }

  return (
    <div className="shell py-12">
      <p className="eyebrow">Account</p>
      <h1 className="mt-4 font-display text-step-4 tracking-tight">Your library</h1>
      <p className="mt-3 max-w-[52ch] text-[0.95rem] text-graphite">
        Signed in as {user.email ?? "an unknown address"}
        {user.username ? ` · @${user.username}` : ""}.
      </p>

      <div className="mt-10 grid gap-10 lg:grid-cols-[14rem_minmax(0,1fr)] lg:gap-16">
        <nav aria-label="Account">
          <ul className="flex flex-row gap-4 overflow-x-auto border-b border-line pb-2 lg:flex-col lg:gap-0 lg:overflow-visible lg:border-b-0 lg:pb-0">
            {NAV.map((item) => (
              <li key={item.to} className="lg:border-b lg:border-line">
                <NavLink
                  to={item.to}
                  className={({ isActive }) =>
                    [
                      "flex items-center gap-2 whitespace-nowrap py-2.5 transition-colors duration-fast ease-editorial",
                      isActive ? "text-ink" : "text-graphite hover:text-ink",
                    ].join(" ")
                  }
                >
                  <item.icon aria-hidden className="h-3.5 w-3.5" />
                  <span className="eyebrow">{item.label}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <Outlet />
        </div>
      </div>

      <div className="mt-16">
        <Button variant="ghost" onClick={() => void window.scrollTo({ top: 0 })}>
          Back to top
        </Button>
      </div>
    </div>
  );
}
