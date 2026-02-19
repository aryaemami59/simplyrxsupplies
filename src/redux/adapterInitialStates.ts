import type { AdaptersInitialStates } from "../types/reduxHelperTypes.js"
import { ENTITY_ADAPTERS } from "./entityAdapters.js"

export const ADAPTER_INITIAL_STATES: AdaptersInitialStates = {
  cart: ENTITY_ADAPTERS.cart.getInitialState(),

  cartItems: ENTITY_ADAPTERS.cartItems.getInitialState(),

  categories: ENTITY_ADAPTERS.categories.getInitialState(),

  items: ENTITY_ADAPTERS.items.getInitialState(),

  itemVendors: ENTITY_ADAPTERS.itemVendors.getInitialState(),

  searchResults: ENTITY_ADAPTERS.searchResults.getInitialState(),

  vendors: ENTITY_ADAPTERS.vendors.getInitialState(),
} as const satisfies AdaptersInitialStates
