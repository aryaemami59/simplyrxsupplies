import { shallowEqual } from "react-redux";
import { describe, expect, it } from "vitest";

import App from "../../App";
import { ADAPTER_SELECTORS } from "../../redux/adapterSelectors";
import type { ItemVendors } from "../../types/reduxHelperTypes";
import { renderWithProviders } from "../test-utils/testUtils";

describe("App", () => {
  it("initial state after fetch", async () => {
    const { store } = await renderWithProviders(<App />);
    const addedState = store.getState().added;
    const state = store.getState();
    expect(
      ADAPTER_SELECTORS.GLOBAL.itemVendors.selectIds(state)
    ).toBeArrayOfSize(367);
    expect(addedState.cart.ids).toBeArrayOfSize(8);
    expect(addedState.cartItems.ids).toBeArrayOfSize(8);
    expect(addedState.searchResults.ids).toBeArrayOfSize(0);
    expect(addedState.cart.ids).toContainEqual(1);
    expect(
      ADAPTER_SELECTORS.GLOBAL.itemVendors.selectAll(state)
    ).toSatisfyAll<ItemVendors>(
      ({ vendorIds, checkedVendorIds }) =>
        Object.is(checkedVendorIds, vendorIds) &&
        shallowEqual(checkedVendorIds, vendorIds)
    );
  });

  it("initial state before fetch", async () => {
    const { store } = await renderWithProviders(<App />, {
      fetch: false,
    });
    const addedState = store.getState().added;
    expect(addedState.itemVendors.ids).toBeArrayOfSize(0);
    expect(addedState.cart.ids).toBeArrayOfSize(0);
    expect(addedState.cartItems.ids).toBeArrayOfSize(0);
    expect(addedState.searchResults.ids).toBeArrayOfSize(0);
  });
});
