import type {
  AddedState,
  AppSelector,
  TopLevelSelectorsForAddedState,
} from "../types/reduxHelperTypes";
import { createSelectorWeakmap } from "./createSelectors";

// export const selectAdded = createSelectorWeakmap(
//   [state => state],
//   state => state.added
// );
export const selectAdded: AppSelector<AddedState, never> = state => state.added;

export const TOP_LEVEL_SELECTORS: TopLevelSelectorsForAddedState = {
  // searchResults: state => state.added.searchResults,
  // cart: state => state.added.cart,
  // itemVendors: state => state.added.itemVendors,
  // cartItems: state => state.added.cartItems,
  searchResults: createSelectorWeakmap(
    [selectAdded],
    added => added.searchResults
  ),

  cart: createSelectorWeakmap([selectAdded], added => added.cart),

  itemVendors: createSelectorWeakmap([selectAdded], added => added.itemVendors),

  cartItems: createSelectorWeakmap([selectAdded], added => added.cartItems),
} as const satisfies TopLevelSelectorsForAddedState;
