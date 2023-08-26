import { createEntityAdapter } from "@reduxjs/toolkit";

import { Cart } from "../../types/redux";

const cartAdapter = createEntityAdapter<Cart>();

export default cartAdapter;
