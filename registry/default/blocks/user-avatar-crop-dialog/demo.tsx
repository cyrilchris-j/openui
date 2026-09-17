"use client";

import { UserAvatarCropDialog } from "./user-avatar-crop-dialog";

export default function Demo() {
  return (
    <div className="w-full min-h-[350px] p-4 flex items-center justify-center bg-neutral-100 dark:bg-neutral-900">
      <UserAvatarCropDialog />
    </div>
  );
}
