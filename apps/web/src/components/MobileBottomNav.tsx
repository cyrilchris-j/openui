import { Compass, Home, Layers, Search, Sliders } from "lucide-react";
import * as React from "react";
import { NavLink, useLocation } from "react-router";

import { cn } from "@openui/ui";

interface MobileBottomNavProps {
  onOpenMenu?: () => void;
  menuOpen?: boolean;
}

export function MobileBottomNav({
  onOpenMenu,
  menuOpen,
}: MobileBottomNavProps): React.JSX.Element {
  const location = useLocation();

  const NAV_ITEMS = [
    {
      to: "/",
      label: "Home",
      icon: Home,
      end: true,
    },
    {
      to: "/explore",
      label: "Explore",
      icon: Compass,
    },
    {
      to: "/search",
      label: "Search",
      icon: Search,
    },
    {
      to: "/playground",
      label: "Sandbox",
      icon: Sliders,
    },
  ];

  return (
    <nav
      aria-label="Mobile Navigation"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-paper/95 backdrop-blur-md lg:hidden"
      style={{
        paddingBottom: "max(0.5rem, env(safe-area-inset-bottom, 0px))",
      }}
    >
      <div className="shell flex h-14 items-center justify-around px-2">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = item.end
            ? location.pathname === item.to
            : location.pathname.startsWith(item.to);

          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={cn(
                "flex flex-1 flex-col items-center justify-center gap-1 py-1 transition-colors duration-fast",
                isActive
                  ? "text-ink font-semibold"
                  : "text-graphite hover:text-ink",
              )}
            >
              <Icon
                className={cn(
                  "h-4 w-4 transition-transform duration-fast",
                  isActive ? "scale-110 text-ink" : "text-graphite",
                )}
                strokeWidth={isActive ? 2.2 : 1.8}
              />
              <span className="font-mono text-[9px] uppercase tracking-wider">
                {item.label}
              </span>
            </NavLink>
          );
        })}

        {/* Index Drawer Trigger */}
        <button
          type="button"
          onClick={onOpenMenu}
          aria-expanded={menuOpen}
          className={cn(
            "flex flex-1 flex-col items-center justify-center gap-1 py-1 transition-colors duration-fast",
            menuOpen ? "text-ink font-semibold" : "text-graphite hover:text-ink",
          )}
        >
          <Layers
            className={cn(
              "h-4 w-4 transition-transform duration-fast",
              menuOpen ? "scale-110 text-ink" : "text-graphite",
            )}
            strokeWidth={menuOpen ? 2.2 : 1.8}
          />
          <span className="font-mono text-[9px] uppercase tracking-wider">
            Index
          </span>
        </button>
      </div>
    </nav>
  );
}
