"use client";

import { DatabaseQueryRunner } from "./database-query-runner";

export default function Demo() {
  return (
    <div className="w-full min-h-[350px] p-4 flex items-center justify-center bg-neutral-900">
      <DatabaseQueryRunner />
    </div>
  );
}
