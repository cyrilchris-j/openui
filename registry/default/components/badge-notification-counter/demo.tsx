import { BadgeNotificationCounter } from "./badge-notification-counter";

export default function Demo() {
  return (
    <div className="flex min-h-[14rem] items-center justify-center gap-4 bg-paper p-8">
      <span className="font-mono text-xs text-ink">Alerts</span>
      <BadgeNotificationCounter count={142} />
    </div>
  );
}
