import { COMPANY } from "./company";
import { money } from "./format";
import type { OrderRecord } from "./types";

export function companyMailto(subject: string, body: string): string {
  return `${COMPANY.emailHref}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export function orderMailto(order: OrderRecord) {
  const items = order.lines
    .map((line) => `${line.title} × ${line.quantity} — ${money(line.price * line.quantity)}`)
    .join("\n");
  const body = [
    `Order ${order.id}`,
    `Name: ${order.name}`,
    `Phone: ${order.phone}`,
    `Email: ${order.email || "-"}`,
    `Country: ${order.country}`,
    `Address: ${order.address}`,
    `City: ${order.city}`,
    `Postal: ${order.postal}`,
    `Notes: ${order.notes || "-"}`,
    `Promo: ${order.promoCode || "-"}`,
    `Total: ${money(order.total)}`,
    "",
    "Items:",
    items,
  ].join("\n");
  return companyMailto(`KAIJU order ${order.id}`, body);
}

export function inquiryMailto(input: {
  name: string;
  phone: string;
  email: string;
  company: string;
  message: string;
}) {
  const body = [
    `Name: ${input.name}`,
    `Phone: ${input.phone}`,
    `Email: ${input.email || "-"}`,
    `Company: ${input.company || "-"}`,
    "",
    input.message,
  ].join("\n");
  return companyMailto("KAIJU bulk order inquiry", body);
}
