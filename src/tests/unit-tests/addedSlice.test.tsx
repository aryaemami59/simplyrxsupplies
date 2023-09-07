import { beforeEach, describe, expect } from "vitest";

import App from "../../App";
import addedSlice, {
  addItemToCarts,
  checkOneVendorForAllSearchResults,
  deleteOneItemFromCart,
  maximizeAllItemsInCart,
  minimizeAllItemsInCart,
  removeAllItemsFromCart,
  toggleMinimizeOneItemInCart,
  toggleVendorForOneSearchResultItem,
  unCheckOneVendorForAllSearchResults,
} from "../../redux/addedSlice";
import type { AppStore } from "../../redux/store";
import { renderWithProviders, unFreeze } from "../test-utils/testUtils";

type LocalTestContext = {
  store: AppStore;
};

describe<LocalTestContext>("addedSlice reducers", it => {
  beforeEach<LocalTestContext>(async context => {
    const { store } = await renderWithProviders(<App />);
    context.store = store;
  });

  it("addItemToCarts", ({ store }) => {
    const initialStateClone = structuredClone(store.getState()).added;
    expect(store.getState().added.cart.entities).toBeFrozen();
    expect(initialStateClone.cart.entities).toBeExtensible();
    store.dispatch(addItemToCarts({ itemId: 0 }));
    expect(store.getState().added.cart.entities).not.toStrictEqual(
      initialStateClone.cart.entities
    );
    expect(addedSlice.reducer(undefined, { type: "" })).toStrictEqual(
      unFreeze(addedSlice.getInitialState())
    );
    expect(
      addedSlice.reducer(addedSlice.getInitialState(), { type: "" })
    ).toStrictEqual(unFreeze(addedSlice.getInitialState()));
    expect(store.getState().added).not.toStrictEqual(initialStateClone);
    store.dispatch(deleteOneItemFromCart({ itemId: 0, vendorId: 0 }));
    expect(store.getState().added.cart.entities).not.toStrictEqual(
      initialStateClone.cart.entities
    );
    store.dispatch(deleteOneItemFromCart({ itemId: 0, vendorId: 1 }));
    expect(store.getState().added.cart.entities).toStrictEqual(
      initialStateClone.cart.entities
    );
    store.dispatch(addItemToCarts({ itemId: 0 }));
    store.dispatch(removeAllItemsFromCart({ vendorId: 0 }));
    expect(store.getState().added.cart.entities).not.toStrictEqual(
      initialStateClone.cart.entities
    );
    store.dispatch(removeAllItemsFromCart({ vendorId: 1 }));
    expect(store.getState().added.cart.entities).toStrictEqual(
      initialStateClone.cart.entities
    );
    store.dispatch(
      toggleVendorForOneSearchResultItem({ itemId: 0, vendorId: 0 })
    );
    expect(store.getState().added.itemVendors.entities).not.toStrictEqual(
      initialStateClone.itemVendors.entities
    );
    store.dispatch(
      toggleVendorForOneSearchResultItem({ itemId: 0, vendorId: 0 })
    );
    expect(store.getState().added.itemVendors.entities).toStrictEqual(
      initialStateClone.itemVendors.entities
    );
    store.dispatch(toggleMinimizeOneItemInCart({ itemId: 0, vendorId: 0 }));
    expect(store.getState().added.cartItems.entities).not.toStrictEqual(
      initialStateClone.cartItems.entities
    );
    store.dispatch(toggleMinimizeOneItemInCart({ itemId: 0, vendorId: 0 }));
    expect(store.getState().added.cartItems.entities).toStrictEqual(
      initialStateClone.cartItems.entities
    );
    store.dispatch(minimizeAllItemsInCart({ vendorId: 0 }));
    expect(store.getState().added.cartItems.entities).not.toStrictEqual(
      initialStateClone.cartItems.entities
    );
    store.dispatch(maximizeAllItemsInCart({ vendorId: 0 }));
    expect(store.getState().added.cartItems.entities).toStrictEqual(
      initialStateClone.cartItems.entities
    );
    store.dispatch(checkOneVendorForAllSearchResults({ vendorId: 0 }));
    expect(store.getState().added.itemVendors.entities).toStrictEqual(
      initialStateClone.itemVendors.entities
    );
    store.dispatch(unCheckOneVendorForAllSearchResults({ vendorId: 0 }));
    expect(store.getState().added.itemVendors.entities).not.toStrictEqual(
      initialStateClone.itemVendors.entities
    );
    store.dispatch(checkOneVendorForAllSearchResults({ vendorId: 0 }));
    expect(store.getState().added.itemVendors.entities).toStrictEqual(
      initialStateClone.itemVendors.entities
    );
  });
});
