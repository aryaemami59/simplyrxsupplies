import { AddedState } from "../types/AddedState";
import {
  AppSelector,
  createAppSelector,
  TopLevelSelectorsForAddedState,
} from "./hooks";

export const selectAdded: AppSelector<AddedState, never> = state => state.added;

export const TOP_LEVEL_SELECTORS: TopLevelSelectorsForAddedState = {
  searchResults: createAppSelector([selectAdded], added => added.searchResults),

  cart: createAppSelector([selectAdded], added => added.cart),

  itemVendors: createAppSelector([selectAdded], added => added.itemVendors),
} as const satisfies TopLevelSelectorsForAddedState;
