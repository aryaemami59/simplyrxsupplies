import { describe, expectTypeOf } from "vitest";

import type { NewApiContext } from "./api.test";

describe<NewApiContext>("type checking new api", it => {
  it("new supplies", ({ data }) => {
    const { items, vendors, categories } = data;
    expectTypeOf(items).toBeArray();
    expectTypeOf(vendors).toBeArray();
    expectTypeOf(categories).toBeArray();
  });
});
