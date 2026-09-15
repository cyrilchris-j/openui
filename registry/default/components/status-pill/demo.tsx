import { StatusPill } from "./status-pill";

export default function Demo() {
  return (
    <div className="flex flex-wrap items-center gap-3 bg-paper p-10 text-ink">
      <StatusPill tone="live" srLabel="Published and stable">
        published
      </StatusPill>
      <StatusPill tone="pending">reviewing</StatusPill>
      <StatusPill tone="attention" srLabel="Deprecated, migrate away">
        deprecated
      </StatusPill>
      <StatusPill tone="neutral">draft</StatusPill>
      <StatusPill tone="muted" size="sm">
        archived
      </StatusPill>
    </div>
  );
}
