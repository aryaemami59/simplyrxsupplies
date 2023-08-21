import { createEntityAdapter } from "@reduxjs/toolkit";

import { Cart } from "../../types/redux";

export const cartAdapter = createEntityAdapter<Cart>();

export const initialCartState = cartAdapter.getInitialState();
