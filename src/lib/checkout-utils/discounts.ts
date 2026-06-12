import { isValidCents, toCents } from "@/lib/checkout-utils/currency"

export function applyPercentDiscount(subtotalCents: number, percent: number) {
  if (!isValidCents(subtotalCents)) return subtotalCents
  return Math.round(subtotalCents * (1 - percent / 100))
}

export function applyFixedDiscount(subtotalCents: number, amountOff: number) {
  const offCents = toCents(amountOff)
  return Math.max(0, subtotalCents - offCents)
}
