"use client";

import { FAQAccordionStack } from "./faq-accordion-stack";

export default function FAQAccordionStackDemo() {
  return (
    <FAQAccordionStack>
      <div className="p-4 rounded-xl border border-line bg-paper">
        <div className="font-bold text-xs text-ink">Are components copy-paste friendly?</div>
        <p className="text-xs text-ink/60 mt-1">Yes, all components are standalone and zero-dependency.</p>
      </div>
      <div className="p-4 rounded-xl border border-line bg-paper">
        <div className="font-bold text-xs text-ink">Can I customize design tokens?</div>
        <p className="text-xs text-ink/60 mt-1">OpenUI provides full CSS custom property token mappings.</p>
      </div>
    </FAQAccordionStack>
  );
}
