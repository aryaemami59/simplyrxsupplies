import { describe, expect, it } from "vitest";

import EMPTY_ARRAY from "../../utils/emptyArray";
import withEmptyArrayFallback from "../../utils/withEmptyArrayFallback";

describe("setToEmptyArray", () => {
  it(withEmptyArrayFallback, () => {
    expect(withEmptyArrayFallback(undefined)).toBe(EMPTY_ARRAY);
  });
});
