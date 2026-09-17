"use client";

import { cn } from "@/lib/cn";

export interface DownloadAppBannerProps extends React.HTMLAttributes<HTMLElement> {
  title?: string;
}

export function DownloadAppBanner({
  title = "Access OpenUI on iOS and Android",
  className,
  ...props
}: DownloadAppBannerProps) {
  return (
    <section className={cn("py-12 px-6 max-w-4xl mx-auto font-sans bg-paper text-ink text-center", className)} {...props}>
      <div className="p-8 rounded-3xl border border-line bg-surface/30 space-y-4">
        <h3 className="text-xl font-bold text-ink">{title}</h3>
        <p className="text-xs text-ink/60 max-w-md mx-auto">Inspect component tokens, test interaction gestures, and copy code directly on mobile devices.</p>
        <div className="flex justify-center gap-3 pt-2">
          <button type="button" className="px-5 py-2.5 rounded-xl border border-line bg-paper text-xs font-mono font-bold hover:bg-surface">
             App Store
          </button>
          <button type="button" className="px-5 py-2.5 rounded-xl border border-line bg-paper text-xs font-mono font-bold hover:bg-surface">
            ▶ Google Play
          </button>
        </div>
      </div>
    </section>
  );
}
