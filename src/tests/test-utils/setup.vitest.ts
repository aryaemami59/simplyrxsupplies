/* eslint-disable prefer-arrow-functions/prefer-arrow-functions */
import "@testing-library/jest-dom/vitest";

import matchers from "jest-extended";
import type { ExpectStatic } from "vitest";
import { expect } from "vitest";

expect.extend(matchers);

const customMatchers: Parameters<ExpectStatic["extend"]>[0] = {
  toBeEmptyArray(received: unknown) {
    if (!Array.isArray(received)) {
      return {
        pass: true,
        message: () =>
          `expected ${this.utils.printReceived(
            received
          )} to be an array but instead it is of type ${this.utils.printExpected(
            typeof received
          )}`,
        actual: received,
        expected: [],
      };
    }
    const pass = received.length === 0;
    return {
      pass,
      message: () =>
        this.isNot
          ? `the received value should not be an empty array`
          : `${this.utils.printReceived(received)} is not an empty array`,
      expected: [],
      actual: received,
    };
  },
};

expect.extend(customMatchers);
