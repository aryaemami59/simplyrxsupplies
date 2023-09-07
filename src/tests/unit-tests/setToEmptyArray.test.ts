import { describe, expect, it } from "vitest";

import EMPTY_ARRAY from "../../utils/emptyArray";
import setToEmptyArray from "../../utils/setToEmptyArray";

describe("setToEmptyArray", () => {
  it(setToEmptyArray, () => {
    expect(setToEmptyArray(undefined)).toBe(EMPTY_ARRAY);
  });
});
