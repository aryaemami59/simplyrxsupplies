import { createEntityAdapter } from "@reduxjs/toolkit";

import { Category, Item, Vendor } from "../types/api";
import {
  Adapters,
  Cart,
  CartItem,
  CheckedVendorItem,
  SearchResultsItem,
} from "../types/redux";

const ENTITY_ADAPTERS: Adapters = {
  cart: createEntityAdapter<Cart>(),

  searchResults: createEntityAdapter<SearchResultsItem>(),

  checkedVendorItems: createEntityAdapter<CheckedVendorItem>(),

  cartItems: createEntityAdapter<CartItem>(),

  items: createEntityAdapter<Item>(),

  vendors: createEntityAdapter<Vendor>(),

  categories: createEntityAdapter<Category>(),
} as const satisfies Adapters;

export default ENTITY_ADAPTERS;
