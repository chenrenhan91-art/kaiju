"use client";

import { useState } from "react";
import { COMPANY } from "@/lib/company";

export default function BulkOrderPage() {
  const [sent, setSent] = useState(false);

  return (
    <div className="page-width py-14 max-w-2xl">
      <h1 className="display text-4xl md:text-5xl">Bulk Order Inquiry</h1>
      <p className="mt-4 leading-relaxed">
        For wholesale, hospitality, or gift programs, tell us what you need. We will call the number
        you leave. You can also reach us directly at{" "}
        <a href={COMPANY.phoneHref} className="underline">
          {COMPANY.phone}
        </a>
        .
      </p>
      {sent ? (
        <p className="mt-10 bg-cream-2 p-6">
          Thank you. Keep your phone nearby. We will call to discuss quantities and woods.
        </p>
      ) : (
        <form
          className="mt-10 grid gap-4"
          onSubmit={(e) => {
            e.preventDefault();
            setSent(true);
          }}
        >
          <label className="grid gap-2 text-sm">
            Name
            <input required className="input" name="name" />
          </label>
          <label className="grid gap-2 text-sm">
            Phone
            <input required className="input" name="phone" type="tel" />
          </label>
          <label className="grid gap-2 text-sm">
            Company (optional)
            <input className="input" name="company" />
          </label>
          <label className="grid gap-2 text-sm">
            What are you looking for?
            <textarea required className="input min-h-32" name="message" />
          </label>
          <button type="submit" className="btn btn-primary justify-self-start">
            Submit inquiry
          </button>
        </form>
      )}
    </div>
  );
}
