"use client";

import { InboxConversationThread } from "./inbox-conversation-thread";

export default function Demo() {
  return (
    <div className="w-full min-h-[450px] p-4 flex items-center justify-center bg-neutral-50 dark:bg-neutral-900">
      <InboxConversationThread />
    </div>
  );
}
