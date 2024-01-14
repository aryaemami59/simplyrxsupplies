import type {
  AddedState,
  AppSelector,
  TopLevelSelectorsForAddedState,
} from "../types/reduxHelperTypes";
import { createSelectorWeakMap } from "./createSelectors";

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
  searchResults: createSelectorWeakMap(
    [selectAdded],
    added => added.searchResults
  ),

  cart: createSelectorWeakMap([selectAdded], added => added.cart),

  itemVendors: createSelectorWeakMap([selectAdded], added => added.itemVendors),

  cartItems: createSelectorWeakMap([selectAdded], added => added.cartItems),
} as const satisfies TopLevelSelectorsForAddedState;
