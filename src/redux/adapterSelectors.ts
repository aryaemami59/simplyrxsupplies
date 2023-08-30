import type { AdapterLocalizedSelectors } from "../types/AddedState";
import type { AdapterSimpleSelectors } from "../types/redux";
import {
  selectCategoriesData,
  selectItemsData,
  selectVendorsData,
} from "./apiSlice";
import ENTITY_ADAPTERS from "./entityAdapters";
import type { AdapterGlobalizedSelectors, Selectors } from "./hooks";
import { TOP_LEVEL_SELECTORS } from "./topLevelSelectors";

export const SIMPLE_SELECTORS: AdapterSimpleSelectors = {
  searchResults: ENTITY_ADAPTERS.searchResults.getSelectors(),

  cart: ENTITY_ADAPTERS.cart.getSelectors(),

  items: ENTITY_ADAPTERS.items.getSelectors(),

  vendors: ENTITY_ADAPTERS.vendors.getSelectors(),

  categories: ENTITY_ADAPTERS.categories.getSelectors(),

  cartItems: ENTITY_ADAPTERS.cartItems.getSelectors(),

  checkedVendorItems: ENTITY_ADAPTERS.checkedVendorItems.getSelectors(),
} as const satisfies AdapterSimpleSelectors;

export const LOCAL_SELECTORS: AdapterLocalizedSelectors = {
  searchResults: ENTITY_ADAPTERS.searchResults.getSelectors(
    added => added.searchResults
  ),

  cart: ENTITY_ADAPTERS.cart.getSelectors(added => added.cart),

  checkedVendorItems: ENTITY_ADAPTERS.checkedVendorItems.getSelectors(
    added => added.checkedVendorItems
  ),
} as const satisfies AdapterLocalizedSelectors;

export const GLOBAL_SELECTORS: AdapterGlobalizedSelectors = {
  searchResults: ENTITY_ADAPTERS.searchResults.getSelectors(
    TOP_LEVEL_SELECTORS.searchResults
  ),

  cart: ENTITY_ADAPTERS.cart.getSelectors(TOP_LEVEL_SELECTORS.cart),

  items: ENTITY_ADAPTERS.items.getSelectors(selectItemsData),

  vendors: ENTITY_ADAPTERS.vendors.getSelectors(selectVendorsData),

  categories: ENTITY_ADAPTERS.categories.getSelectors(selectCategoriesData),

  checkedVendorItems: ENTITY_ADAPTERS.checkedVendorItems.getSelectors(
    TOP_LEVEL_SELECTORS.checkedVendorItems
  ),
} as const satisfies AdapterGlobalizedSelectors;

export const ADAPTER_SELECTORS: Selectors = {
  LOCAL: LOCAL_SELECTORS,
  SIMPLE: SIMPLE_SELECTORS,
  GLOBAL: GLOBAL_SELECTORS,
} as const satisfies Selectors;
