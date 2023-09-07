import { beforeEach, describe, expect } from "vitest";

import { endpoints } from "../../redux/apiSlice";
import { setupStore } from "../../redux/store";
import type { SuppliesState } from "../../types/reduxHelperTypes";
import EMPTY_ARRAY from "../../utils/emptyArray";

type LocalTestContext = {
  data: SuppliesState | undefined;
};

describe<LocalTestContext>("apiSlice", it => {
  beforeEach<LocalTestContext>(async context => {
    const store = setupStore();
    const { data } = await store.dispatch(endpoints.getMain.initiate());
    context.data = data;
  });

  it("api call", ({ data }) => {
    expect(data).toBeDefined();
    expect(data?.cart[0]?.itemIds).toBe(EMPTY_ARRAY);
  });
});
