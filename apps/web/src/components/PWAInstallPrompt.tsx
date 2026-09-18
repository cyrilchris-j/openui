import { Download, Share2, X } from "lucide-react";
import * as React from "react";

import { Button } from "@openui/ui";

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: "accepted" | "dismissed";
    platform: string;
  }>;
  prompt(): Promise<void>;
}

export function PWAInstallPrompt(): React.JSX.Element | null {
  const [installPrompt, setInstallPrompt] = React.useState<BeforeInstallPromptEvent | null>(null);
  const [isIOS, setIsIOS] = React.useState(false);
  const [isVisible, setIsVisible] = React.useState(false);

  React.useEffect(() => {
    // If running in standalone PWA mode, don't show prompt
    const isStandalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      Boolean((navigator as unknown as { standalone?: boolean }).standalone);

    if (isStandalone) return;

    // Check if dismissed recently (within 7 days)
    const dismissedAt = localStorage.getItem("openui-pwa-dismissed");
    if (dismissedAt) {
      const diffDays = (Date.now() - parseInt(dismissedAt, 10)) / (1000 * 60 * 60 * 24);
      if (diffDays < 7) return;
    }

    // Android / Chromium beforeinstallprompt handler
    const handleBeforeInstall = (event: Event) => {
      event.preventDefault();
      setInstallPrompt(event as BeforeInstallPromptEvent);
      setIsVisible(true);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstall);

    // iOS Safari detection
    const ua = window.navigator.userAgent.toLowerCase();
    const isIOSDevice = /iphone|ipad|ipod/.test(ua) && !(window as unknown as { MSStream?: unknown }).MSStream;
    const isSafari = /safari/.test(ua) && !/chrome|crios|fxios|edgios/.test(ua);

    if (isIOSDevice && isSafari) {
      setIsIOS(true);
      // Delay slightly for smooth initial rendering
      const timer = setTimeout(() => setIsVisible(true), 2500);
      return () => {
        clearTimeout(timer);
        window.removeEventListener("beforeinstallprompt", handleBeforeInstall);
      };
    }

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstall);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!installPrompt) return;
    await installPrompt.prompt();
    const choice = await installPrompt.userChoice;
    if (choice.outcome === "accepted") {
      setIsVisible(false);
    }
    setInstallPrompt(null);
  };

  const handleDismiss = () => {
    setIsVisible(false);
    localStorage.setItem("openui-pwa-dismissed", Date.now().toString());
  };

  if (!isVisible) return null;

  return (
    <aside
      aria-label="Install OpenUI Web App"
      className="fixed bottom-4 left-4 right-4 z-50 mx-auto max-w-md animate-in fade-in slide-in-from-bottom-5 duration-300 sm:bottom-6 sm:left-auto sm:right-6"
    >
      <div className="relative flex flex-col gap-3 rounded-xl border border-line bg-paper/95 p-4 shadow-xl backdrop-blur-md dark:border-line/70 dark:bg-paper/90">
        <button
          type="button"
          onClick={handleDismiss}
          aria-label="Dismiss install banner"
          className="absolute right-3 top-3 grid h-7 w-7 place-items-center rounded-md text-graphite transition-colors hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-oxide"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="flex items-center gap-3.5 pr-6">
          <img
            src="/logo.png"
            alt="OpenUI"
            width={44}
            height={44}
            className="h-11 w-11 shrink-0 rounded-lg object-contain shadow-sm ring-1 ring-line/50"
          />
          <div className="min-w-0">
            <h2 className="font-display text-step-0 font-medium tracking-tight text-ink">
              Install OpenUI
            </h2>
            <p className="text-xs text-graphite leading-relaxed">
              {isIOS
                ? "Install on your home screen for offline access and full-screen experience."
                : "Fast, offline-ready registry access directly on your device."}
            </p>
          </div>
        </div>

        {isIOS ? (
          <div className="mt-1 flex items-center gap-2 rounded-lg bg-surface/70 px-3 py-2 text-xs text-graphite">
            <span>Tap</span>
            <Share2 className="h-3.5 w-3.5 text-ink shrink-0 inline" />
            <span>in Safari and choose <strong className="text-ink font-medium">Add to Home Screen</strong>.</span>
          </div>
        ) : (
          <div className="mt-1 flex items-center justify-end gap-2">
            <Button variant="ghost" size="sm" onClick={handleDismiss} className="text-xs">
              Not now
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={handleInstallClick}
              className="gap-1.5 text-xs font-mono"
            >
              <Download className="h-3.5 w-3.5" />
              Install
            </Button>
          </div>
        )}
      </div>
    </aside>
  );
}
