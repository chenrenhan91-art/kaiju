import { COMPANY } from "./company";
import type { OrderRecord } from "./types";

export async function notifyCompany(fields: Record<string, string>) {
  try {
    const res = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(COMPANY.email)}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        _template: "table",
        _captcha: "false",
        ...fields,
      }),
    });
    return res.ok;
  } catch {
    return false;
  }
}

export function orderNotificationFields(order: OrderRecord) {
  return {
    _subject: `KAIJU order ${order.id}`,
    order_id: order.id,
    name: order.name,
    phone: order.phone,
    email: order.email || "(not provided)",
    country: order.country,
    address: order.address,
    city: order.city,
    postal: order.postal,
    notes: order.notes || "(none)",
    promo: order.promoCode || "(none)",
    total_usd: String(order.total),
    items: order.lines.map((line) => `${line.title} × ${line.quantity} ($${line.price})`).join("; "),
  };
}
