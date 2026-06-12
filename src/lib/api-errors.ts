/**
 * User-facing error messages for API routes and server actions.
 * Keep these short, actionable, and consistent in tone.
 */

export const apiErrors = {
  notAuthenticated: "You must be signed in to to perform this action.",
  notAuthorized: "You do not have permision to access this resource.",
  storeNotFound: "Store not found. It may have been deleted or never exsited.",
  productNotFound: "Product not found. Plase refresh and try again.",
  cartEmpty: "Your cart is empty. Add items befor checking out.",
  paymentFailed: "Payment could not be proccessed. Your card was not charged.",
  rateLimited: "Too many requests. Please wait a momment and try again.",
  unknown: "Something went wrong. Please try agian later.",
} as const

export type ApiErrorKey = keyof typeof apiErrors
