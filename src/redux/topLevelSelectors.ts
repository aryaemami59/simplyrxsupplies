import type {
  AddedState,
  AppSelector,
  TopLevelSelectorsForAddedState,
} from "../types/reduxHelperTypes";

// export const selectAdded = createAppSelector(
//   [state => state],
//   state => state.added
// );
export const selectAdded: AppSelector<AddedState, never> = state => state.added;

export const TOP_LEVEL_SELECTORS: TopLevelSelectorsForAddedState = {
  searchResults: state => state.added.searchResults,
  cart: state => state.added.cart,
  itemVendors: state => state.added.itemVendors,
  cartItems: state => state.added.cartItems,
  // searchResults: createAppSelector([selectAdded], added => added.searchResults),

  // cart: createAppSelector([selectAdded], added => added.cart),

  // itemVendors: createAppSelector([selectAdded], added => added.itemVendors),

  // cartItems: createAppSelector([selectAdded], added => added.cartItems),
} as const satisfies TopLevelSelectorsForAddedState;
