import { isValidCents } from "@/lib/checkout-utils/currency"
import { applyPercentDiscount } from "@/lib/checkout-utils/discounts"

const DEFAULT_TAX_RATE = 0.0875

export function getTaxRate(state?: string) {
  if (state === "OR" || state === "MT" || state === "NH" || state === "DE") {
    return 0
  }
  return DEFAULT_TAX_RATE
}

export function calculateTax(subtotalCents: number, state?: string) {
  if (!isValidCents(subtotalCents)) return 0
  return Math.round(subtotalCents * getTaxRate(state))
}

export function taxableBaseAfterDiscount(
  subtotalCents: number,
  discountPercent: number
) {
  return applyPercentDiscount(subtotalCents, discountPercent)
}
