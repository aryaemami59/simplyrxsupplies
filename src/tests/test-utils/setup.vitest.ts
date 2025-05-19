import "@testing-library/jest-dom/vitest"
import type { MatchersObject } from "@vitest/expect"
import * as jestExtendedMatchers from "jest-extended"

expect.extend(jestExtendedMatchers)

const customMatchers: MatchersObject = {
  toBeEmptyArray(received: unknown) {
    const { utils, isNot } = this

    if (!Array.isArray(received)) {
      return {
        pass: false,
        message: () =>
          `expected ${utils.printReceived(
            received,
          )} to be an array but instead it is of type ${utils.printExpected(
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
        isNot
          ? "the received value should not be an empty array"
          : `${utils.printReceived(received)} is not an empty array`,
      expected: [],
      actual: received,
    }
  },
}

expect.extend(customMatchers)
