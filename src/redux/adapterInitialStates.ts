import type { AdaptersInitialStates } from "../types/reduxHelperTypes.js"
import { ENTITY_ADAPTERS } from "./entityAdapters.js"

/**
 * The initial state for each entity adapter, produced by calling every
 * adapter's `getInitialState()`. Conforms to {@linkcode AdaptersInitialStates}
 * and is used to seed the slice reducers.
 */
export const ADAPTER_INITIAL_STATES = {
  cart: ENTITY_ADAPTERS.cart.getInitialState(),

  cartItems: ENTITY_ADAPTERS.cartItems.getInitialState(),

  categories: ENTITY_ADAPTERS.categories.getInitialState(),

  items: ENTITY_ADAPTERS.items.getInitialState(),

  itemVendors: ENTITY_ADAPTERS.itemVendors.getInitialState(),

  searchResults: ENTITY_ADAPTERS.searchResults.getInitialState(),

  vendors: ENTITY_ADAPTERS.vendors.getInitialState(),
} as const satisfies AdaptersInitialStates
