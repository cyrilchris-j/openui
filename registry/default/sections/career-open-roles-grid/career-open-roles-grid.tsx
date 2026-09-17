"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

export interface JobRole {
  id: string;
  department: "Engineering" | "Product" | "Design" | "Security";
  title: string;
  location: string;
  type: string;
}

export interface CareerOpenRolesGridProps extends React.HTMLAttributes<HTMLElement> {
  roles?: JobRole[];
}

const DEFAULT_ROLES: JobRole[] = [
  { id: "r1", department: "Engineering", title: "Senior Systems Engineer (Rust / V8)", location: "Remote (Global)", type: "Full-Time" },
  { id: "r2", department: "Engineering", title: "Staff Frontend Architect (React / Next.js)", location: "San Francisco, CA", type: "Full-Time" },
  { id: "r3", department: "Design", title: "Principal Design Systems Designer", location: "London, UK / Remote", type: "Full-Time" },
  { id: "r4", department: "Security", title: "Security Operations & Compliance Lead", location: "Remote (US/EU)", type: "Full-Time" },
  { id: "r5", department: "Product", title: "Developer Experience Product Manager", location: "New York, NY", type: "Full-Time" },
];

export function CareerOpenRolesGrid({
  roles = DEFAULT_ROLES,
  className,
  ...props
}: CareerOpenRolesGridProps) {
  const [selectedDept, setSelectedDept] = React.useState<string>("All");

  const departments = ["All", "Engineering", "Design", "Security", "Product"];
  const filteredRoles = selectedDept === "All" ? roles : roles.filter((r) => r.department === selectedDept);

  return (
    <section className={cn("w-full py-16 px-4 md:px-8 max-w-5xl mx-auto", className)} {...props}>
      <div className="text-center max-w-2xl mx-auto mb-10">
        <span className="text-xs font-mono uppercase tracking-widest text-emerald-600 dark:text-emerald-400 font-bold">
          Join Our Mission
        </span>
        <h2 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100 mt-2">
          Help build the open web interface registry
        </h2>
        <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-3">
          We operate as an autonomous, remote-first collective passionate about high-precision developer tools.
        </p>
      </div>

      {/* Dept filters */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {departments.map((dept) => (
          <button
            key={dept}
            type="button"
            onClick={() => setSelectedDept(dept)}
            className={cn(
              "px-3 py-1.5 rounded-full text-xs font-medium transition-colors",
              selectedDept === dept
                ? "bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900"
                : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-400"
            )}
          >
            {dept}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {filteredRoles.map((role) => (
          <div
            key={role.id}
            className="p-5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:border-neutral-300 dark:hover:border-neutral-700 transition-colors"
          >
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400">
                  {role.department}
                </span>
                <span className="text-xs text-neutral-400 font-mono">{role.location}</span>
              </div>
              <h3 className="text-base font-semibold text-neutral-900 dark:text-neutral-100 mt-1">
                {role.title}
              </h3>
            </div>
            <button
              type="button"
              className="px-4 py-2 rounded-lg text-xs font-semibold bg-neutral-900 text-white hover:bg-neutral-800 dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-neutral-200"
            >
              Apply Now →
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
