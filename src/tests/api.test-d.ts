import type { NewApiContext } from "./api.test.js"

describe<NewApiContext>("type checking new api", it => {
  it("new supplies", ({ data }) => {
    const { categories, items, vendors } = data
    expectTypeOf(items).toBeArray()
    expectTypeOf(vendors).toBeArray()
    expectTypeOf(categories).toBeArray()
  })
})
