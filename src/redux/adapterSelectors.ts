import type {
  AdapterGlobalizedSelectors,
  AdapterLocalizedSelectors,
  AdapterSelectors,
  AdapterSimpleSelectors,
} from "../types/reduxHelperTypes";
import {
  selectCategoriesData,
  selectItemsData,
  selectVendorsData,
} from "./apiSlice";
import {
  createDraftSafeAppSelector,
  createDraftSafSelectorWeakMap,
} from "./createSelectors";
import ENTITY_ADAPTERS from "./entityAdapters";
import { TOP_LEVEL_SELECTORS } from "./topLevelSelectors";

export const SIMPLE_SELECTORS: AdapterSimpleSelectors = {
  searchResults: ENTITY_ADAPTERS.searchResults.getSelectors(undefined, {
    createSelector: createDraftSafeAppSelector,
  }),

  cart: ENTITY_ADAPTERS.cart.getSelectors(undefined, {
    createSelector: createDraftSafeAppSelector,
  }),

  items: ENTITY_ADAPTERS.items.getSelectors(undefined, {
    createSelector: createDraftSafeAppSelector,
  }),

  vendors: ENTITY_ADAPTERS.vendors.getSelectors(undefined, {
    createSelector: createDraftSafeAppSelector,
  }),

  categories: ENTITY_ADAPTERS.categories.getSelectors(undefined, {
    createSelector: createDraftSafeAppSelector,
  }),

  itemVendors: ENTITY_ADAPTERS.itemVendors.getSelectors(undefined, {
    createSelector: createDraftSafeAppSelector,
  }),

  cartItems: ENTITY_ADAPTERS.cartItems.getSelectors(undefined, {
    createSelector: createDraftSafeAppSelector,
  }),
} as const satisfies AdapterSimpleSelectors;
/** Takes AddedState as an argument. */
export const LOCAL_SELECTORS: AdapterLocalizedSelectors = {
  searchResults: ENTITY_ADAPTERS.searchResults.getSelectors(
    added => added.searchResults,
    {
      createSelector: createDraftSafeAppSelector,
    }
  ),

  cart: ENTITY_ADAPTERS.cart.getSelectors(added => added.cart, {
    createSelector: createDraftSafeAppSelector,
  }),

  itemVendors: ENTITY_ADAPTERS.itemVendors.getSelectors(
    added => added.itemVendors,
    {
      createSelector: createDraftSafeAppSelector,
    }
  ),

  cartItems: ENTITY_ADAPTERS.cartItems.getSelectors(added => added.cartItems, {
    createSelector: createDraftSafeAppSelector,
  }),
} as const satisfies AdapterLocalizedSelectors;
/** Takes RootState as an argument. */
export const GLOBAL_SELECTORS: AdapterGlobalizedSelectors = {
  searchResults: ENTITY_ADAPTERS.searchResults.getSelectors(
    TOP_LEVEL_SELECTORS.searchResults,
    {
      createSelector: createDraftSafSelectorWeakMap,
    }
  ),

  cart: ENTITY_ADAPTERS.cart.getSelectors(TOP_LEVEL_SELECTORS.cart, {
    createSelector: createDraftSafSelectorWeakMap,
  }),

  items: ENTITY_ADAPTERS.items.getSelectors(selectItemsData, {
    createSelector: createDraftSafSelectorWeakMap,
  }),

  vendors: ENTITY_ADAPTERS.vendors.getSelectors(selectVendorsData, {
    createSelector: createDraftSafSelectorWeakMap,
  }),

  categories: ENTITY_ADAPTERS.categories.getSelectors(selectCategoriesData, {
    createSelector: createDraftSafSelectorWeakMap,
  }),

  itemVendors: ENTITY_ADAPTERS.itemVendors.getSelectors(
    TOP_LEVEL_SELECTORS.itemVendors,
    {
      createSelector: createDraftSafSelectorWeakMap,
    }
  ),

  cartItems: ENTITY_ADAPTERS.cartItems.getSelectors(
    TOP_LEVEL_SELECTORS.cartItems,
    {
      createSelector: createDraftSafSelectorWeakMap,
    }
  ),
} as const satisfies AdapterGlobalizedSelectors;

export const ADAPTER_SELECTORS: AdapterSelectors = {
  LOCAL: LOCAL_SELECTORS,
  SIMPLE: SIMPLE_SELECTORS,
  GLOBAL: GLOBAL_SELECTORS,
} as const satisfies AdapterSelectors;
