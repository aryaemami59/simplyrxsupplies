import { AdaptersInitialStates } from "../types/redux";
import ADAPTERS from "./adapters/Adapters";

const INITIAL_STATES: AdaptersInitialStates = {
  searchResults: ADAPTERS.searchResults.getInitialState(),

  cart: ADAPTERS.cart.getInitialState(),

  items: ADAPTERS.items.getInitialState(),

  vendors: ADAPTERS.vendors.getInitialState(),

  categories: ADAPTERS.categories.getInitialState(),

  cartItems: ADAPTERS.cartItems.getInitialState(),

  checkedVendorItems: ADAPTERS.checkedVendorItems.getInitialState(),
} as const satisfies AdaptersInitialStates;

export default INITIAL_STATES;
