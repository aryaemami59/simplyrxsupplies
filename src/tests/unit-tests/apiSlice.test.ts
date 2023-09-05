import { describe, expect, it } from "vitest";

import { endpoints } from "../../redux/apiSlice";
import { setupStore } from "../../redux/store";
import EMPTY_ARRAY from "../../utils/emptyArray";

describe("apiSlice", () => {
  it("api call", async () => {
    const store = setupStore();
    const { data } = await store.dispatch(endpoints.getMain.initiate());
    expect(data).toBeDefined();
    expect(data?.cart[0]?.itemIds).toBe(EMPTY_ARRAY);
  });
});
