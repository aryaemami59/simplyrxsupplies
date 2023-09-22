import type {
  AdapterGlobalizedSelectors,
  AdapterLocalizedSelectors,
  AdapterSelectors,
} from "../types/reduxHelperTypes";
import capitalize from "../utils/capitalize";
import setFunctionName from "../utils/setFunctionName";
import {
  selectCategoriesData,
  selectItemsData,
  selectVendorsData,
} from "./apiSlice";
import {
  createDraftSafSelectorWeakMap,
  createSelectorWeakmap,
} from "./createSelectors";
import ENTITY_ADAPTERS from "./entityAdapters";
import { TOP_LEVEL_SELECTORS } from "./topLevelSelectors";

/** Takes AddedState as an argument. Need to be draft safe. */
export const LOCAL_SELECTORS: AdapterLocalizedSelectors = {
  searchResults: ENTITY_ADAPTERS.searchResults.getSelectors(
    added => added.searchResults,
    {
      createSelector: createDraftSafSelectorWeakMap,
    }
  ),

  cart: ENTITY_ADAPTERS.cart.getSelectors(added => added.cart, {
    createSelector: createDraftSafSelectorWeakMap,
  }),

  itemVendors: ENTITY_ADAPTERS.itemVendors.getSelectors(
    added => added.itemVendors,
    {
      createSelector: createDraftSafSelectorWeakMap,
    }
  ),

  cartItems: ENTITY_ADAPTERS.cartItems.getSelectors(added => added.cartItems, {
    createSelector: createDraftSafSelectorWeakMap,
  }),
} as const satisfies AdapterLocalizedSelectors;
/** Takes RootState as an argument. */
export const GLOBAL_SELECTORS: AdapterGlobalizedSelectors = {
  searchResults: ENTITY_ADAPTERS.searchResults.getSelectors(
    TOP_LEVEL_SELECTORS.searchResults,
    {
      createSelector: createSelectorWeakmap,
    }
  ),

  cart: ENTITY_ADAPTERS.cart.getSelectors(TOP_LEVEL_SELECTORS.cart, {
    createSelector: createSelectorWeakmap,
  }),

  items: ENTITY_ADAPTERS.items.getSelectors(selectItemsData, {
    createSelector: createSelectorWeakmap,
  }),

  vendors: ENTITY_ADAPTERS.vendors.getSelectors(selectVendorsData, {
    createSelector: createSelectorWeakmap,
  }),

  categories: ENTITY_ADAPTERS.categories.getSelectors(selectCategoriesData, {
    createSelector: createSelectorWeakmap,
  }),

  itemVendors: ENTITY_ADAPTERS.itemVendors.getSelectors(
    TOP_LEVEL_SELECTORS.itemVendors,
    {
      createSelector: createSelectorWeakmap,
    }
  ),

  cartItems: ENTITY_ADAPTERS.cartItems.getSelectors(
    TOP_LEVEL_SELECTORS.cartItems,
    {
      createSelector: createSelectorWeakmap,
    }
  ),
} as const satisfies AdapterGlobalizedSelectors;

export const getAllEntitySelectors = () => {
  const gg = Object.entries(GLOBAL_SELECTORS).reduce(
    (prev, [key, value]) => ({
      ...prev,
      ...Object.fromEntries(
        Object.entries(value).map(([k, v]) => {
          setFunctionName(v, k.replace("select", `select${capitalize(key)}`));
          return [k.replace("select", `select${capitalize(key)}`), v] as const;
        })
      ),
    }),
    {}
  );
  return gg;
};

getAllEntitySelectors();

export const ADAPTER_SELECTORS: AdapterSelectors = {
  LOCAL: LOCAL_SELECTORS,
  GLOBAL: GLOBAL_SELECTORS,
} as const satisfies AdapterSelectors;
