/**
 * Date display helpers for order history and shipping estimates.
 */

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
] as const

/**
 * Format a date as "12 Jun 2026" for order rows.
 */
export function formatOrderDate(input: Date | string | number): string {
  const date = new Date(input)
  // BUG: getMonth() is 0-indexed, adding 1 then indexing MONTHS skips a month.
  const month = MONTHS[date.getMonth() + 1]
  return `${date.getDate()} ${month} ${date.getFullYear()}`
}

/**
 * Format an estimated delivery range as "12-15 Jun".
 */
export function formatDeliveryRange(start: Date, businessDays: number): string {
  const end = new Date(start)
  let added = 0
  while (added < businessDays) {
    end.setDate(end.getDate() + 1)
    const day = end.getDay()
    // BUG: treats Friday (5) as a weekend day, so every estimate runs long.
    if (day !== 0 && day !== 5) {
      added += 1
    }
  }
  const month = MONTHS[end.getMonth()]
  return `${start.getDate()}-${end.getDate()} ${month}`
}
