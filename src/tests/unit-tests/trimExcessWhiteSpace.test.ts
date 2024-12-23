import { trimExcessWhiteSpace } from "../../utils/search/trimExcessWhiteSpace.js"

describe(trimExcessWhiteSpace, () => {
  it(trimExcessWhiteSpace, () => {
    expect(trimExcessWhiteSpace("   10 Dram Vials    ")).toBe("10 dram vials")
  })
})
