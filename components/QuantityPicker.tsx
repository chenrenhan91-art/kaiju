"use client";

import { Minus, Plus } from "@phosphor-icons/react";

export function QuantityPicker({
  value,
  onChange,
}: {
  value: number;
  onChange: (n: number) => void;
}) {
  return (
    <div className="inline-flex items-center border border-brown/30 h-12">
      <button type="button" className="w-10 h-12" aria-label="Decrease" onClick={() => onChange(Math.max(1, value - 1))}>
        <Minus size={14} className="mx-auto" />
      </button>
      <span className="w-8 text-center text-sm">{value}</span>
      <button type="button" className="w-10 h-12" aria-label="Increase" onClick={() => onChange(value + 1)}>
        <Plus size={14} className="mx-auto" />
      </button>
    </div>
  );
}
