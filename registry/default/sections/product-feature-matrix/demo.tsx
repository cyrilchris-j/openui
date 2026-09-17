"use client";

import { ProductFeatureMatrix } from "./product-feature-matrix";

export default function Demo() {
  return (
    <div className="w-full min-h-[350px] flex items-center justify-center p-4 bg-neutral-100 dark:bg-neutral-900/40">
      <ProductFeatureMatrix />
    </div>
  );
}
