"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { COMPANY } from "@/lib/company";
import { loadLastOrder } from "@/lib/cart";
import { money } from "@/lib/format";
import { orderMailto } from "@/lib/notify";
import type { OrderRecord } from "@/lib/types";

function ConfirmedBody() {
  const params = useSearchParams();
  const [order, setOrder] = useState<OrderRecord | null>(null);

  useEffect(() => {
    const last = loadLastOrder();
    if (last && (!params.get("id") || last.id === params.get("id"))) setOrder(last);
  }, [params]);

  if (!order) {
    return (
      <div className="page-width py-20 text-center">
        <p>No recent order found in this browser.</p>
        <Link href="/collections/all-products" className="btn btn-primary mt-6">
          Continue shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="page-width py-14 max-w-2xl">
      <h1 className="display text-4xl">Order received</h1>
      <p className="mt-4 leading-relaxed">
        Thank you, {order.name}. Your request {order.id} is saved on this device. Email it to us so
        we can confirm stock and payment, or wait for a call at {order.phone}.
      </p>
      <a href={orderMailto(order)} className="btn btn-primary mt-6">
        Email this order to {COMPANY.email}
      </a>
      <p className="mt-4 text-sm text-brown-soft">
        That opens your email app with our inbox already filled in. You can also call{" "}
        <a href={COMPANY.phoneHref} className="underline">
          {COMPANY.phone}
        </a>
        .
      </p>
      <ul className="mt-8 grid gap-3 text-sm">
        {order.lines.map((line) => (
          <li key={`${line.handle}-${line.variantTitle}`} className="flex justify-between gap-4">
            <span>
              {line.title} × {line.quantity}
            </span>
            <span>{money(line.price * line.quantity)}</span>
          </li>
        ))}
      </ul>
      <p className="mt-6 font-bold">Total {money(order.total)}</p>
      <p className="mt-6 whitespace-pre-line text-sm">
        {COMPANY.legalName}
        {"\n"}
        {COMPANY.addressLines.join("\n")}
      </p>
      <Link href="/" className="btn btn-outline mt-8">
        Back to home
      </Link>
    </div>
  );
}

export default function OrderConfirmedPage() {
  return (
    <Suspense>
      <ConfirmedBody />
    </Suspense>
  );
}
