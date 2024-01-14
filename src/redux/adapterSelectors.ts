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
  createSelectorWeakMap,
} from "./createSelectors";
import ENTITY_ADAPTERS from "./entityAdapters";
import { TOP_LEVEL_SELECTORS } from "./topLevelSelectors";

export const SIMPLE_SELECTORS = {
  searchResults: ENTITY_ADAPTERS.searchResults.getSelectors(undefined, {
    createSelector: createDraftSafSelectorWeakMap,
  }),

  cart: ENTITY_ADAPTERS.cart.getSelectors(undefined, {
    createSelector: createDraftSafSelectorWeakMap,
  }),

  itemVendors: ENTITY_ADAPTERS.itemVendors.getSelectors(undefined, {
    createSelector: createDraftSafSelectorWeakMap,
  }),

  cartItems: ENTITY_ADAPTERS.cartItems.getSelectors(undefined, {
    createSelector: createDraftSafSelectorWeakMap,
  }),

  items: ENTITY_ADAPTERS.items.getSelectors(undefined, {
    createSelector: createSelectorWeakMap,
  }),

  vendors: ENTITY_ADAPTERS.vendors.getSelectors(undefined, {
    createSelector: createSelectorWeakMap,
  }),

  categories: ENTITY_ADAPTERS.categories.getSelectors(undefined, {
    createSelector: createSelectorWeakMap,
  }),
};

/** Takes AddedState as an argument. Need to be draft safe. Mostly used inside of reducers. */
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
      createSelector: createSelectorWeakMap,
    }
  ),

  cart: ENTITY_ADAPTERS.cart.getSelectors(TOP_LEVEL_SELECTORS.cart, {
    createSelector: createSelectorWeakMap,
  }),

  items: ENTITY_ADAPTERS.items.getSelectors(selectItemsData, {
    createSelector: createSelectorWeakMap,
  }),

  vendors: ENTITY_ADAPTERS.vendors.getSelectors(selectVendorsData, {
    createSelector: createSelectorWeakMap,
  }),

  categories: ENTITY_ADAPTERS.categories.getSelectors(selectCategoriesData, {
    createSelector: createSelectorWeakMap,
  }),

  itemVendors: ENTITY_ADAPTERS.itemVendors.getSelectors(
    TOP_LEVEL_SELECTORS.itemVendors,
    {
      createSelector: createSelectorWeakMap,
    }
  ),

  cartItems: ENTITY_ADAPTERS.cartItems.getSelectors(
    TOP_LEVEL_SELECTORS.cartItems,
    {
      createSelector: createSelectorWeakMap,
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
