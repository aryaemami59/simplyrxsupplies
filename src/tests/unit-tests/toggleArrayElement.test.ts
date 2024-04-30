import {toggleArrayElement} from "../../utils/toggleArrayElement"

describe("toggleArrayElement", () => {
  it(toggleArrayElement, () => {
    expect(toggleArrayElement([1, 2], 1)).toStrictEqual([2])
    expect(toggleArrayElement([1, 2], 3)).toStrictEqual([1, 2, 3])
  })
})
