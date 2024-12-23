import axios from "axios"
import { API_URL } from "../data/fetchInfo.js"
import type { Supplies } from "../types/api.js"
import { isCategory } from "../utils/predicates/isCategory.js"
import { isItem } from "../utils/predicates/isItem.js"
import { isVendor } from "../utils/predicates/isVendor.js"
import { newSuppliesSample } from "./test-utils/testUtils.js"

export type NewApiContext = {
  data: Supplies
}

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
