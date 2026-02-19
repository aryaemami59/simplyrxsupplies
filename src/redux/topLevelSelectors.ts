import type {
  AddedState,
  AppSelector,
  TopLevelSelectorsForAddedState,
} from "../types/reduxHelperTypes.js"
import { createSelectorWeakMap } from "./createSelectors.js"

// export const selectAdded = createSelectorWeakmap(
//   [state => state],
//   state => state.added
// );
export const selectAdded: AppSelector<AddedState, never> = state => state.added

export const TOP_LEVEL_SELECTORS: TopLevelSelectorsForAddedState = {
  cart: createSelectorWeakMap([selectAdded], added => added.cart),

  cartItems: createSelectorWeakMap([selectAdded], added => added.cartItems),

  itemVendors: createSelectorWeakMap([selectAdded], added => added.itemVendors),

  // searchResults: state => state.added.searchResults,
  // cart: state => state.added.cart,
  // itemVendors: state => state.added.itemVendors,
  // cartItems: state => state.added.cartItems,
  searchResults: createSelectorWeakMap(
    [selectAdded],
    added => added.searchResults,
  ),
} as const satisfies TopLevelSelectorsForAddedState
