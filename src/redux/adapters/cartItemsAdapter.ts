import { createEntityAdapter } from "@reduxjs/toolkit";

import { CartItems } from "../../types/redux";

const cartItemsAdapter = createEntityAdapter<CartItems>();

export default cartItemsAdapter;
