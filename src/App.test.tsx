import { describe, expect, it } from "vitest";

import App from "./App";
import { renderWithProviders } from "./test-utils/testUtils";

describe("App", () => {
  it("initial state after fetch", async () => {
    const { store } = await renderWithProviders(<App />);
    expect(store.getState().added.itemVendors.ids).toHaveLength(367);
    expect(store.getState().added.cart.ids).toHaveLength(8);
    expect(store.getState().added.cartItems.ids).toHaveLength(8);
    expect(store.getState().added.searchResults.ids).toHaveLength(0);
  });
  it("initial state before fetch", async () => {
    const { store } = await renderWithProviders(<App />, {
      fetch: false,
    });
    expect(store.getState().added.itemVendors.ids).toHaveLength(0);
    expect(store.getState().added.cart.ids).toHaveLength(0);
    expect(store.getState().added.cartItems.ids).toHaveLength(0);
    expect(store.getState().added.searchResults.ids).toHaveLength(0);
  });
});
