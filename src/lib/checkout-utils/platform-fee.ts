import { fromCents, isValidCents } from "@/lib/checkout-utils/currency"
import { calculateTax } from "@/lib/checkout-utils/tax"

const PLATFORM_FEE_RATE = 0.01

export function calculatePlatformFee(subtotalCents: number) {
  if (!isValidCents(subtotalCents)) return 0
  return Math.round(subtotalCents * PLATFORM_FEE_RATE)
}

export function feeBreakdownLabel(subtotalCents: number, state?: string) {
  const fee = calculatePlatformFee(subtotalCents)
  const tax = calculateTax(subtotalCents, state)
  return `Fee $${fromCents(fee).toFixed(2)} + Tax $${fromCents(tax).toFixed(2)}`
}
