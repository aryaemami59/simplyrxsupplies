import { createEntityAdapter } from "@reduxjs/toolkit"
import type { Category, Item, Vendor } from "../types/api.js"
import type {
  Adapters,
  Cart,
  CartItems,
  ItemVendors,
  SearchResultsItem,
} from "../types/reduxHelperTypes.js"

export const ENTITY_ADAPTERS: Adapters = {
  cart: createEntityAdapter<Cart>(),

  cartItems: createEntityAdapter<CartItems>(),

  categories: createEntityAdapter<Category>(),

  items: createEntityAdapter<Item>(),

  itemVendors: createEntityAdapter<ItemVendors>(),

  searchResults: createEntityAdapter<SearchResultsItem>(),

  vendors: createEntityAdapter<Vendor>(),
} as const satisfies Adapters
