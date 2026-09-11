export function money(n: number) {
  return `$${n.toFixed(2)} USD`;
}

export function moneyShort(n: number) {
  return `$${n.toFixed(2)}`;
}
