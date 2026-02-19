import type {
  AdapterGlobalizedSelectors,
  AdapterLocalizedSelectors,
  AdapterSelectors,
} from "../types/reduxHelperTypes.js"
import { capitalize } from "../utils/capitalize.js"
import { setFunctionName } from "../utils/setFunctionName.js"
import {
  selectCategoriesData,
  selectItemsData,
  selectVendorsData,
} from "./apiSlice.js"
import {
  createDraftSafSelectorWeakMap,
  createSelectorWeakMap,
} from "./createSelectors.js"
import { ENTITY_ADAPTERS } from "./entityAdapters.js"
import { TOP_LEVEL_SELECTORS } from "./topLevelSelectors.js"

export const SIMPLE_SELECTORS = {
  cart: ENTITY_ADAPTERS.cart.getSelectors(undefined, {
    createSelector: createDraftSafSelectorWeakMap,
  }),

  cartItems: ENTITY_ADAPTERS.cartItems.getSelectors(undefined, {
    createSelector: createDraftSafSelectorWeakMap,
  }),

  categories: ENTITY_ADAPTERS.categories.getSelectors(undefined, {
    createSelector: createSelectorWeakMap,
  }),

  items: ENTITY_ADAPTERS.items.getSelectors(undefined, {
    createSelector: createSelectorWeakMap,
  }),

  itemVendors: ENTITY_ADAPTERS.itemVendors.getSelectors(undefined, {
    createSelector: createDraftSafSelectorWeakMap,
  }),

  searchResults: ENTITY_ADAPTERS.searchResults.getSelectors(undefined, {
    createSelector: createDraftSafSelectorWeakMap,
  }),

  vendors: ENTITY_ADAPTERS.vendors.getSelectors(undefined, {
    createSelector: createSelectorWeakMap,
  }),
}

/** Takes AddedState as an argument. Need to be draft safe. Mostly used inside of reducers. */
export const LOCAL_SELECTORS: AdapterLocalizedSelectors = {
  cart: ENTITY_ADAPTERS.cart.getSelectors(added => added.cart, {
    createSelector: createDraftSafSelectorWeakMap,
  }),

  cartItems: ENTITY_ADAPTERS.cartItems.getSelectors(added => added.cartItems, {
    createSelector: createDraftSafSelectorWeakMap,
  }),

  itemVendors: ENTITY_ADAPTERS.itemVendors.getSelectors(
    added => added.itemVendors,
    {
      createSelector: createDraftSafSelectorWeakMap,
    },
  ),

  searchResults: ENTITY_ADAPTERS.searchResults.getSelectors(
    added => added.searchResults,
    {
      createSelector: createDraftSafSelectorWeakMap,
    },
  ),
} as const satisfies AdapterLocalizedSelectors
/** Takes RootState as an argument. */
export const GLOBAL_SELECTORS: AdapterGlobalizedSelectors = {
  cart: ENTITY_ADAPTERS.cart.getSelectors(TOP_LEVEL_SELECTORS.cart, {
    createSelector: createSelectorWeakMap,
  }),

  cartItems: ENTITY_ADAPTERS.cartItems.getSelectors(
    TOP_LEVEL_SELECTORS.cartItems,
    {
      createSelector: createSelectorWeakMap,
    },
  ),

  categories: ENTITY_ADAPTERS.categories.getSelectors(selectCategoriesData, {
    createSelector: createSelectorWeakMap,
  }),

  items: ENTITY_ADAPTERS.items.getSelectors(selectItemsData, {
    createSelector: createSelectorWeakMap,
  }),

  itemVendors: ENTITY_ADAPTERS.itemVendors.getSelectors(
    TOP_LEVEL_SELECTORS.itemVendors,
    {
      createSelector: createSelectorWeakMap,
    },
  ),

  searchResults: ENTITY_ADAPTERS.searchResults.getSelectors(
    TOP_LEVEL_SELECTORS.searchResults,
    {
      createSelector: createSelectorWeakMap,
    },
  ),

  vendors: ENTITY_ADAPTERS.vendors.getSelectors(selectVendorsData, {
    createSelector: createSelectorWeakMap,
  }),
} as const satisfies AdapterGlobalizedSelectors

export const getAllEntitySelectors = () => {
  const gg = Object.entries(GLOBAL_SELECTORS).reduce(
    (prev, [key, value]) => ({
      ...prev,
      ...Object.fromEntries(
        Object.entries(value).map(([k, v]) => {
          setFunctionName(
            v as never,
            k.replace("select", `select${capitalize(key)}`),
          )
          return [k.replace("select", `select${capitalize(key)}`), v] as const
        }),
      ),
    }),
    {},
  )
  return gg
}

export const ADAPTER_SELECTORS: AdapterSelectors = {
  GLOBAL: GLOBAL_SELECTORS,
  LOCAL: LOCAL_SELECTORS,
} as const satisfies AdapterSelectors
