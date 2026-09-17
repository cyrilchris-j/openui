"use client";

import { HeaderBannerAnnouncement } from "./header-banner-announcement";

export default function HeaderBannerAnnouncementDemo() {
  return (
    <HeaderBannerAnnouncement
      banner={<span>🚀 OpenUI v1.0.0 is officially released! 800 working resources live.</span>}
      navbar={<span className="font-bold text-sm">OPENUI</span>}
    >
      <div className="text-xs text-ink/70">Main page hero content under header.</div>
    </HeaderBannerAnnouncement>
  );
}
