"use client";

import { EcommerceProductStage } from "./ecommerce-product-stage";

export default function EcommerceProductStageDemo() {
  return (
    <EcommerceProductStage
      gallery={<div className="aspect-square w-full rounded-2xl border border-line bg-surface/40 flex items-center justify-center font-mono text-xs">Product Viewport</div>}
      details={
        <div>
          <h1 className="text-xl font-bold text-ink">Modular Mechanical Keyboard</h1>
          <p className="text-base font-bold font-mono text-accent my-2">$189.00</p>
          <button type="button" className="w-full py-2 rounded-xl bg-accent text-white font-mono text-xs font-bold">Add to Cart</button>
        </div>
      }
    />
  );
}
