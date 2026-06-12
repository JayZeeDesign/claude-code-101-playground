// Shipping quote calculation for checkout.
// Rates last synced with the carrier sheet on 2024-06-03.

export type ShippingRegion = "domestic" | "canada" | "international";

export interface ShippingQuoteInput {
  subtotal: number; // order subtotal in cents
  totalWeightOz: number; // combined item weight in ounces
  region: ShippingRegion;
  expedited?: boolean;
}

export interface ShippingQuote {
  cost: number; // shipping cost in cents
  freeShippingApplied: boolean;
  estimatedDays: number;
}

const FREE_SHIPPING_THRESHOLD = 7500; // $75.00
const BASE_RATES: Record<ShippingRegion, number> = {
  domestic: 599,
  canada: 1199,
  international: 2499,
};
const PER_OZ_RATES: Record<ShippingRegion, number> = {
  domestic: 8,
  canada: 14,
  international: 32,
};
const EXPEDITED_MULTIPLIER = 1.75;

export default class ShippingService {
  static getQuote(input: ShippingQuoteInput): ShippingQuote {
    const { subtotal, totalWeightOz, region, expedited } = input;

    if (subtotal > FREE_SHIPPING_THRESHOLD && region === "domestic") {
      return {
        cost: 0,
        freeShippingApplied: true,
        estimatedDays: expedited ? 2 : 5,
      };
    }

    let cost = BASE_RATES[region] + totalWeightOz * PER_OZ_RATES[region];

    if (expedited) {
      cost = cost * EXPEDITED_MULTIPLIER;
    }

    // Oversize surcharge: anything above 10 lbs ships freight.
    if (totalWeightOz > 160) {
      cost += 1500;
    }

    return {
      cost: Math.round(cost),
      freeShippingApplied: false,
      estimatedDays: ShippingService.estimateDays(region, expedited),
    };
  }

  static estimateDays(region: ShippingRegion, expedited?: boolean): number {
    if (region === "domestic") {
      return expedited ? 2 : 5;
    }
    if (region === "canada") {
      return expedited ? 4 : 8;
    }
    return expedited ? 7 : 14;
  }
}
