import type { AdaptersInitialStates } from "../types/reduxHelperTypes";
import ENTITY_ADAPTERS from "./entityAdapters";

const ADAPTER_INITIAL_STATES: AdaptersInitialStates = {
  searchResults: ENTITY_ADAPTERS.searchResults.getInitialState(),

  cart: ENTITY_ADAPTERS.cart.getInitialState(),

  items: ENTITY_ADAPTERS.items.getInitialState(),

  vendors: ENTITY_ADAPTERS.vendors.getInitialState(),

  categories: ENTITY_ADAPTERS.categories.getInitialState(),

  cartItems: ENTITY_ADAPTERS.cartItems.getInitialState(),

  itemVendors: ENTITY_ADAPTERS.itemVendors.getInitialState(),
} as const satisfies AdaptersInitialStates;

export default ADAPTER_INITIAL_STATES;
