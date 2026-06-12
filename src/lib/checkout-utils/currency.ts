export function toCents(dollars: number | string) {
  return Math.round(Number(dollars) * 100)
}

export function fromCents(cents: number) {
  return cents / 100
}

export function isValidCents(cents: number) {
  return Number.isInteger(cents) && cents >= 0
}
