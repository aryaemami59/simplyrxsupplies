import { createEntityAdapter } from "@reduxjs/toolkit";

import { CartItems } from "../../types/redux";

export const cartItemsAdapter = createEntityAdapter<CartItems>();

export const initialItemsAdapterState = cartItemsAdapter.getInitialState();

// export const cartItemsAdapterSelectors =
//   cartItemsAdapter.getSelectors<RootState>(state => state.added.cart);
