import { describe, expect, it } from "vitest"

import splitBySpace from "../../utils/search/splitBySpace"

describe("splitBySpace", () => {
  it(splitBySpace, () => {
    expect(splitBySpace("10 Dram Vials")).toStrictEqual(["10", "Dram", "Vials"])
  })
})
