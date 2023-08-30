import { createEntityAdapter } from "@reduxjs/toolkit";

import { Category, Item, Vendor } from "../types/api";
import {
  Adapters,
  Cart,
  CartItems,
  ItemVendors,
  SearchResultsItem,
} from "../types/redux";

const ENTITY_ADAPTERS: Adapters = {
  cart: createEntityAdapter<Cart>(),

  searchResults: createEntityAdapter<SearchResultsItem>(),

  itemVendors: createEntityAdapter<ItemVendors>(),

  cartItems: createEntityAdapter<CartItems>(),

  items: createEntityAdapter<Item>(),

  vendors: createEntityAdapter<Vendor>(),

  categories: createEntityAdapter<Category>(),
} as const satisfies Adapters;

export default ENTITY_ADAPTERS;
