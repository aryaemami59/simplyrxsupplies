import { EMPTY_ARRAY } from "../../utils/emptyArray"
import { fallbackToEmptyArray } from "../../utils/fallbackToEmptyArray"

describe("setToEmptyArray", () => {
  it(fallbackToEmptyArray, () => {
    expect(fallbackToEmptyArray(undefined)).toBe(EMPTY_ARRAY)
  })
})
