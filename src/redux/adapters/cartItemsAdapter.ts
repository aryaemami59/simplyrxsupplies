import { createEntityAdapter } from "@reduxjs/toolkit";

import { Item } from "../../types/api";

export const cartItemsAdapter = createEntityAdapter<
  Pick<Item, "id"> & { vendorId: number }
>();

export const initialItemsAdapterState = cartItemsAdapter.getInitialState();

// export const cartItemsAdapterSelectors =
//   cartItemsAdapter.getSelectors<RootState>(state => state.added.cart);
