import { createEntityAdapter } from "@reduxjs/toolkit"
import type { Category, Item, Vendor } from "../types/api.js"
import type {
  AllEntityAdapters,
  Cart,
  CartItems,
  ItemVendors,
  SearchResultsItem,
} from "../types/reduxHelperTypes.js"

/**
 * The {@linkcode createEntityAdapter | entity adapters} for every normalized
 * collection in the store - carts, cart items, categories, items,
 * item-vendors, search results, and vendors. Conforms to
 * {@linkcode AllEntityAdapters}.
 */
export const ENTITY_ADAPTERS = {
  cart: createEntityAdapter<Cart>(),

  cartItems: createEntityAdapter<CartItems>(),

  categories: createEntityAdapter<Category>(),

  items: createEntityAdapter<Item>(),

  itemVendors: createEntityAdapter<ItemVendors>(),

  searchResults: createEntityAdapter<SearchResultsItem>(),

  vendors: createEntityAdapter<Vendor>(),
} as const satisfies AllEntityAdapters
