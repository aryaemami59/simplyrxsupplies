import type { TopLevelSelectorsForAddedState } from "../types/reduxHelperTypes";
import {
  createAppSelector,
  createDraftSafeAppSelector,
} from "./createSelectors";

export const selectAdded = createDraftSafeAppSelector(
  [state => state],
  state => state.added
);
// export const selectAdded: AppSelector<AddedState, never> = state => state.added;

export const TOP_LEVEL_SELECTORS: TopLevelSelectorsForAddedState = {
  searchResults: createAppSelector([selectAdded], added => added.searchResults),

  cart: createAppSelector([selectAdded], added => added.cart),

  itemVendors: createAppSelector([selectAdded], added => added.itemVendors),

  cartItems: createAppSelector([selectAdded], added => added.cartItems),
} as const satisfies TopLevelSelectorsForAddedState;
