import { createEntityAdapter } from "@reduxjs/toolkit";

import { Cart } from "../../types/redux";
import { RootState } from "../store";

export const cartAdapter = createEntityAdapter<Cart>();

export const cartAdapterSelectors = cartAdapter.getSelectors<RootState>(
  state => state.added.cart
);

// export const initialCartState = cartAdapter.getInitialState();

// export type InitialCartState = typeof initialCartState;
