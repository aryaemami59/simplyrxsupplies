import { beforeEach, describe, expect } from "vitest";

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
import type { AddedState } from "../../types/reduxHelperTypes";
import { setupWithNoUI } from "../test-utils/testUtils";

type LocalTestContext = {
  store: AppStore;
  initialAddedState: AddedState;
};

describe<LocalTestContext>("addedSlice reducers", it => {
  beforeEach<LocalTestContext>(async context => {
    const { store } = await setupWithNoUI();
    context.store = store;
    context.initialAddedState = store.getState().added;
  });

  it(addItemToCarts.type, ({ store, initialAddedState }) => {
    // expect(store.getState().added.cart.entities).toBeFrozen();
    expect(addedSlice.reducer(undefined, { type: "" })).toStrictEqual(
      addedSlice.getInitialState()
    );
    store.dispatch(addItemToCarts({ itemId: 0 }));
    expect(store.getState().added).not.toStrictEqual(initialAddedState);
    expect(store.getState().added).not.toStrictEqual(initialAddedState);
    // expect(
    //   addedSlice.reducer(store.getState().added, { type: "" })
    // ).toStrictEqual(initialAddedState);
    expect(store.getState().added).not.toStrictEqual(initialAddedState);
    store.dispatch(deleteOneItemFromCart({ itemId: 0, vendorId: 0 }));
    expect(store.getState().added).not.toStrictEqual(initialAddedState);
    store.dispatch(deleteOneItemFromCart({ itemId: 0, vendorId: 1 }));
    expect(store.getState().added).toStrictEqual(initialAddedState);
  });

  it(toggleMinimizeOneItemInCart.type, ({ store, initialAddedState }) => {
    store.dispatch(toggleMinimizeOneItemInCart({ itemId: 0, vendorId: 0 }));
    expect(store.getState().added).not.toStrictEqual(initialAddedState);
    store.dispatch(toggleMinimizeOneItemInCart({ itemId: 0, vendorId: 0 }));
    expect(store.getState().added).toStrictEqual(initialAddedState);
  });

  it(checkOneVendorForAllSearchResults.type, ({ store, initialAddedState }) => {
    store.dispatch(checkOneVendorForAllSearchResults({ vendorId: 0 }));
    expect(store.getState().added).toStrictEqual(initialAddedState);
    store.dispatch(unCheckOneVendorForAllSearchResults({ vendorId: 0 }));
    expect(store.getState().added).not.toStrictEqual(initialAddedState);
    store.dispatch(checkOneVendorForAllSearchResults({ vendorId: 0 }));
    expect(store.getState().added).toStrictEqual(initialAddedState);
    expect(store.getState().added).toStrictEqual(initialAddedState);
    expect(store.getState().added).toStrictEqual(initialAddedState);
  });

  it(minimizeAllItemsInCart.type, ({ store, initialAddedState }) => {
    store.dispatch(minimizeAllItemsInCart({ vendorId: 0 }));
    expect(store.getState().added).not.toStrictEqual(initialAddedState);
    store.dispatch(maximizeAllItemsInCart({ vendorId: 0 }));
    expect(store.getState().added).toStrictEqual(initialAddedState);
  });

  it(
    toggleVendorForOneSearchResultItem.type,
    ({ store, initialAddedState }) => {
      store.dispatch(
        toggleVendorForOneSearchResultItem({ itemId: 0, vendorId: 0 })
      );
      expect(store.getState().added).not.toStrictEqual(initialAddedState);
      store.dispatch(
        toggleVendorForOneSearchResultItem({ itemId: 0, vendorId: 0 })
      );
      expect(store.getState().added).toStrictEqual(initialAddedState);
    }
  );

  it(removeAllItemsFromCart.type, ({ store, initialAddedState }) => {
    store.dispatch(addItemToCarts({ itemId: 0 }));
    store.dispatch(addItemToCarts({ itemId: 1 }));
    store.dispatch(removeAllItemsFromCart({ vendorId: 0 }));
    expect(store.getState().added).not.toStrictEqual(initialAddedState);
    store.dispatch(removeAllItemsFromCart({ vendorId: 1 }));
    expect(store.getState().added).toStrictEqual(initialAddedState);
  });
});
