import type { createDraftSafeSelector } from "@reduxjs/toolkit";

import type {
  AdapterGlobalizedSelectors,
  AdapterLocalizedSelectors,
  AdapterSimpleSelectors,
  Selectors,
} from "../types/reduxHelperTypes";
import {
  selectCategoriesData,
  selectItemsData,
  selectVendorsData,
} from "./apiSlice";
import { createDraftSafeAppSelector } from "./createSelectors";
import ENTITY_ADAPTERS from "./entityAdapters";
import { TOP_LEVEL_SELECTORS } from "./topLevelSelectors";

export const SIMPLE_SELECTORS: AdapterSimpleSelectors = {
  searchResults: ENTITY_ADAPTERS.searchResults.getSelectors(),

  cart: ENTITY_ADAPTERS.cart.getSelectors(),

  items: ENTITY_ADAPTERS.items.getSelectors(),

  vendors: ENTITY_ADAPTERS.vendors.getSelectors(),

  categories: ENTITY_ADAPTERS.categories.getSelectors(),

  itemVendors: ENTITY_ADAPTERS.itemVendors.getSelectors(),

  cartItems: ENTITY_ADAPTERS.cartItems.getSelectors(),
} as const satisfies AdapterSimpleSelectors;

export const LOCAL_SELECTORS: AdapterLocalizedSelectors = {
  searchResults: ENTITY_ADAPTERS.searchResults.getSelectors(
    added => added.searchResults
  ),

  cart: ENTITY_ADAPTERS.cart.getSelectors(added => added.cart),

  itemVendors: ENTITY_ADAPTERS.itemVendors.getSelectors(
    added => added.itemVendors
  ),

  cartItems: ENTITY_ADAPTERS.cartItems.getSelectors(added => added.cartItems),
} as const satisfies AdapterLocalizedSelectors;
/** Takes RootState as an argument. */
export const GLOBAL_SELECTORS: AdapterGlobalizedSelectors = {
  searchResults: ENTITY_ADAPTERS.searchResults.getSelectors(
    TOP_LEVEL_SELECTORS.searchResults
  ),

  cart: ENTITY_ADAPTERS.cart.getSelectors(TOP_LEVEL_SELECTORS.cart, {
    createSelector:
      createDraftSafeAppSelector as typeof createDraftSafeSelector,
  }),

  items: ENTITY_ADAPTERS.items.getSelectors(selectItemsData),

  vendors: ENTITY_ADAPTERS.vendors.getSelectors(selectVendorsData),

  categories: ENTITY_ADAPTERS.categories.getSelectors(selectCategoriesData),

  itemVendors: ENTITY_ADAPTERS.itemVendors.getSelectors(
    TOP_LEVEL_SELECTORS.itemVendors
  ),

  cartItems: ENTITY_ADAPTERS.cartItems.getSelectors(
    TOP_LEVEL_SELECTORS.cartItems
  ),
} as const satisfies AdapterGlobalizedSelectors;

export const ADAPTER_SELECTORS: Selectors = {
  LOCAL: LOCAL_SELECTORS,
  SIMPLE: SIMPLE_SELECTORS,
  GLOBAL: GLOBAL_SELECTORS,
} as const satisfies Selectors;
