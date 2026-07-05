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
/**
 * Selects the {@linkcode AddedState} slice from the root state. Serves as the
 * root input selector for every selector in {@linkcode TOP_LEVEL_SELECTORS}.
 */
export const selectAdded: AppSelector<AddedState, never> = state => state.added

/**
 * Memoized selectors that read each top-level field
 * ({@linkcode AddedState.cart | cart}, {@linkcode AddedState.cartItems | cartItems},
 * {@linkcode AddedState.itemVendors | itemVendors}, and
 * {@linkcode AddedState.searchResults | searchResults}) out of the
 * {@linkcode AddedState} slice returned by {@linkcode selectAdded}.
 */
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
