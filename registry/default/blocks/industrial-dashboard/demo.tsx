import { IndustrialDashboard } from "./industrial-dashboard";

export default function Demo() {
  return (
    <div className="bg-paper p-8 text-ink">
      <IndustrialDashboard
        title="Registry operations"
        metrics={[
          { label: "Published", value: "48", trend: "up", delta: "6" },
          { label: "In review", value: "03", trend: "flat" },
          { label: "Downloads / 7d", value: "12.4k", trend: "up", delta: "8%" },
          { label: "Failed audits", value: "02", trend: "down", delta: "1" },
        ]}
        panels={[
          {
            title: "Submission queue",
            span: 8,
            content: (
              <ul className="divide-y divide-line font-mono text-[13px]">
                {["kinetic-ticker · text", "spotlight-follow · interaction", "ledger-table · component"].map(
                  (row) => (
                    <li key={row} className="flex items-center justify-between py-2">
                      <span>{row}</span>
                      <span className="text-graphite">pending</span>
                    </li>
                  ),
                )}
              </ul>
            ),
          },
          {
            title: "Category mix",
            span: 4,
            content: (
              <dl className="space-y-2 font-mono text-[13px]">
                {[
                  ["components", "14"],
                  ["text", "05"],
                  ["motion", "05"],
                  ["interactions", "05"],
                ].map(([label, value]) => (
                  <div key={label} className="flex items-center justify-between border-b border-line pb-1">
                    <dt className="text-graphite">{label}</dt>
                    <dd className="tabular-nums">{value}</dd>
                  </div>
                ))}
              </dl>
            ),
          },
        ]}
      />
    </div>
  );
}
