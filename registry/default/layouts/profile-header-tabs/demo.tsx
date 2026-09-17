"use client";

import { ProfileHeaderTabs } from "./profile-header-tabs";

export default function ProfileHeaderTabsDemo() {
  return (
    <ProfileHeaderTabs
      avatar="AG"
      info={<button type="button" className="px-3 py-1.5 rounded bg-accent text-white text-xs font-mono">Edit Profile</button>}
      tabs={
        <>
          <span className="font-bold text-accent">Repositories</span>
          <span className="text-ink/60">Contributions</span>
        </>
      }
    >
      <div className="text-xs text-ink/70">Public code repositories and active design tokens.</div>
    </ProfileHeaderTabs>
  );
}
