import { EMPTY_ARRAY } from "../../utils/emptyArray.js"
import { fallbackToEmptyArray } from "../../utils/fallbackToEmptyArray.js"

describe(fallbackToEmptyArray, () => {
  it(fallbackToEmptyArray, () => {
    expect(fallbackToEmptyArray(undefined)).toBe(EMPTY_ARRAY)
  })
})
