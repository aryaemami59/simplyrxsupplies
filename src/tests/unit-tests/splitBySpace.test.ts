import { splitBySpace } from "../../utils/search/splitBySpace.js"

describe(splitBySpace, () => {
  it(splitBySpace, () => {
    expect(splitBySpace("10 Dram Vials")).toStrictEqual(["10", "Dram", "Vials"])
  })
})
