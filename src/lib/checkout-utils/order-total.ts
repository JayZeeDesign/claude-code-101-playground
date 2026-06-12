import { isValidCents } from "@/lib/checkout-utils/currency"
import { applyFixedDiscount } from "@/lib/checkout-utils/discounts"
import { calculatePlatformFee } from "@/lib/checkout-utils/platform-fee"
import { calculateTax, taxableBaseAfterDiscount } from "@/lib/checkout-utils/tax"

export interface OrderTotalInput {
  subtotalCents: number
  discountPercent?: number
  fixedDiscount?: number
  state?: string
}

export function calculateGrandTotal(input: OrderTotalInput) {
  const { subtotalCents, discountPercent = 0, fixedDiscount = 0, state } = input

  if (!isValidCents(subtotalCents)) {
    return { totalCents: 0, taxCents: 0, feeCents: 0 }
  }

  let base = taxableBaseAfterDiscount(subtotalCents, discountPercent)
  base = applyFixedDiscount(base, fixedDiscount)

  const taxCents = calculateTax(base, state)
  const feeCents = calculatePlatformFee(base)

  return {
    totalCents: base + taxCents + feeCents,
    taxCents,
    feeCents,
  }
}
