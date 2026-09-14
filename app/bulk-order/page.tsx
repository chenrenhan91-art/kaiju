"use client";

import { useState } from "react";
import { COMPANY } from "@/lib/company";
import { inquiryMailto } from "@/lib/notify";

export default function BulkOrderPage() {
  const [sent, setSent] = useState(false);
  const [mailHref, setMailHref] = useState(COMPANY.emailHref);

  return (
    <div className="page-width py-14 max-w-2xl">
      <h1 className="display text-4xl md:text-5xl">Bulk Order Inquiry</h1>
      <p className="mt-4 leading-relaxed">
        For wholesale, hospitality, or gift programs, tell us what you need. Submitting opens your
        email app with a message already addressed to{" "}
        <a href={COMPANY.emailHref} className="underline break-all">
          {COMPANY.email}
        </a>
        . You can also call{" "}
        <a href={COMPANY.phoneHref} className="underline">
          {COMPANY.phone}
        </a>
        .
      </p>
      {sent ? (
        <div className="mt-10 bg-cream-2 p-6 grid gap-4">
          <p>Your email app should have opened with the inquiry. Send that message to reach us.</p>
          <a href={mailHref} className="btn btn-primary justify-self-start">
            Open email again
          </a>
        </div>
      ) : (
        <form
          className="mt-10 grid gap-4"
          onSubmit={(e) => {
            e.preventDefault();
            const data = new FormData(e.currentTarget);
            const href = inquiryMailto({
              name: String(data.get("name") || ""),
              phone: String(data.get("phone") || ""),
              email: String(data.get("email") || "").trim(),
              company: String(data.get("company") || "").trim(),
              message: String(data.get("message") || ""),
            });
            setMailHref(href);
            setSent(true);
            window.location.href = href;
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
            Your email
            <input required className="input" name="email" type="email" autoComplete="email" />
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
            Email inquiry
          </button>
        </form>
      )}
    </div>
  );
}
