"use client";

import { cn } from "@/lib/cn";

export interface AuditComplianceBadgesProps extends React.HTMLAttributes<HTMLElement> {
  title?: string;
}

export function AuditComplianceBadges({
  title = "ENTERPRISE COMPLIANCE & GOVERNANCE",
  className,
  ...props
}: AuditComplianceBadgesProps) {
  const badges = [
    { title: "SOC 2 Type II", desc: "Security & Confidentiality" },
    { title: "ISO / IEC 27001", desc: "Information Security" },
    { title: "GDPR Compliant", desc: "EU Data Sovereignty" },
    { title: "HIPAA Ready", desc: "Health Data Protection" },
  ];

  return (
    <section className={cn("py-12 px-6 max-w-5xl mx-auto font-mono text-xs bg-paper text-ink text-center", className)} {...props}>
      <div className="font-bold text-[11px] text-ink/50 tracking-wider uppercase mb-6">{title}</div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {badges.map((b) => (
          <div key={b.title} className="p-4 rounded-xl border border-line bg-surface/30 text-center">
            <div className="w-8 h-8 rounded-full bg-emerald-500/15 text-emerald-600 font-bold flex items-center justify-center mx-auto mb-2 text-xs">
              ✓
            </div>
            <div className="font-bold text-ink">{b.title}</div>
            <div className="text-[10px] text-ink/60 mt-0.5 font-sans">{b.desc}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
