import { LedgerTable, type LedgerColumn } from "./ledger-table";

interface Row {
  slug: string;
  type: string;
  downloads: number;
  updated: string;
}

const ROWS: Row[] = [
  { slug: "magnetic-button", type: "component", downloads: 4201, updated: "2026-08-14" },
  { slug: "editorial-heading", type: "text", downloads: 3180, updated: "2026-08-11" },
  { slug: "grain-background", type: "background", downloads: 1904, updated: "2026-08-02" },
  { slug: "cursor-trail", type: "interaction", downloads: 987, updated: "2026-07-29" },
];

const COLUMNS: LedgerColumn<Row>[] = [
  { key: "slug", header: "Resource", accessor: (row) => row.slug },
  { key: "type", header: "Type", accessor: (row) => row.type },
  { key: "downloads", header: "Downloads", align: "right", accessor: (row) => row.downloads },
  { key: "updated", header: "Updated", align: "right", accessor: (row) => row.updated },
];

export default function Demo() {
  return (
    <div className="bg-paper p-8 text-ink">
      <LedgerTable
        caption="Registry ledger"
        columns={COLUMNS}
        rows={ROWS}
        rowKey={(row) => row.slug}
        initialSort={{ key: "downloads", direction: "desc" }}
      />
    </div>
  );
}
