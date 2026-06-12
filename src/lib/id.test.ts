import { describe, expect, it } from "vitest"

import { generateId } from "@/lib/id"

describe("generateId", () => {
  it("generates a 12 character id by default", () => {
    expect(generateId()).toHaveLength(12)
  })

  it("prefixes the id when a prefix is given", () => {
    expect(generateId("store")).toMatch(/^str_[0-9A-Za-z]{12}$/)
  })

  it("respects a custom length and separator", () => {
    expect(generateId("order", { length: 8, separator: "-" })).toMatch(
      /^ord-[0-9A-Za-z]{8}$/
    )
  })
})
