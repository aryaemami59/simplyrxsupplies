import type { MatchersObject } from "@vitest/expect"
import * as jestExtendedMatchers from "jest-extended"
import "vitest-dom/extend-expect"

expect.extend(jestExtendedMatchers)

const customMatchers: MatchersObject = {
  toBeEmptyArray(received: unknown) {
    if (!Array.isArray(received)) {
      return {
        pass: true,
        message: () =>
          `expected ${this.utils.printReceived(
            received,
          )} to be an array but instead it is of type ${this.utils.printExpected(
            typeof received,
          )}`,
        actual: received,
        expected: [],
      }
    }
    const pass = received.length === 0
    return {
      pass,
      message: () =>
        this.isNot
          ? `the received value should not be an empty array`
          : `${this.utils.printReceived(received)} is not an empty array`,
      expected: [],
      actual: received,
    }
  },
}

expect.extend(customMatchers)
