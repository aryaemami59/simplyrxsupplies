import axios from "axios"
import { beforeEach, describe, expect } from "vitest"

import API_URL from "../data/fetchInfo"
import type { Supplies } from "../types/api"
import isCategory from "../utils/predicates/isCategory"
import isItem from "../utils/predicates/isItem"
import isVendor from "../utils/predicates/isVendor"
import { newSuppliesSample } from "./test-utils/testUtils"

export type NewApiContext = {
  data: Supplies
}

// const newApiTest = it.extend<NewApiContext>({
//   data: async ({ task }, use) => {
//     const response = await axios.get<Supplies>(API_URL);
//     const { data } = response;
//     console.log(data);
//     await use(data);
//   },
// });

describe<NewApiContext>("new api", it => {
  beforeEach<NewApiContext>(async context => {
    const response = await axios.get<Supplies>(API_URL)
    const { data } = response
    context.data = data
  })

  it("new items", ({ data }) => {
    const { items } = data
    expect(items).not.toBeEmptyArray()
    expect(items).toContainEqual(newSuppliesSample.items[0])
    expect(items).toSatisfyAll(isItem)
  })

  it("new vendors", ({ data }) => {
    const { vendors } = data
    expect(vendors).not.toBeEmptyArray()
    expect(vendors).toContainEqual(newSuppliesSample.vendors[0])
    expect(vendors).toSatisfyAll(isVendor)
  })

  it("new categories", ({ data }) => {
    const { categories } = data
    expect(categories).not.toBeEmptyArray()
    expect(categories).toContainEqual(newSuppliesSample.categories[0])
    expect(categories).toSatisfyAll(isCategory)
  })
})
