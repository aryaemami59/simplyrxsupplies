import { EntityAdapter, EntitySelectors, EntityState } from "@reduxjs/toolkit";

import type { Category, Item, Vendor } from "./api";
/**
 * Controls the one to many relationship between an item and its vendors in the search results and the side bar accordion.
 */
export type ItemVendors = {
  /**
   * References itemId.
   */
  readonly id: number;
  readonly checkedVendorIds: number[];
  readonly vendorIds: number[];
};

export type SearchResultsItem = {
  /**
   * References itemId.
   */
  readonly id: number;
};

export type Cart = {
  /**
   * References vendorId.
   */
  readonly id: number;
  readonly itemIds: number[];
};

export type SuppliesState = {
  readonly items: Item[];
  readonly vendors: Vendor[];
  readonly categories: Category[];
  readonly cart: Cart[];
};

export type ItemIdAndVendorId = {
  readonly itemId: number;
  readonly vendorId: number;
};

type ApiAdapters = {
  readonly items: Item;
  readonly vendors: Vendor;
  readonly categories: Category;
};
/**
 * Controls the one to many relationship between a vendor and its items in a cart.
 */
export type CartItems = {
  /**
   * References vendorId.
   */
  readonly id: number;
  readonly minimizedItemIds: number[];
  readonly itemIds: number[];
};

export type StateAdapters = {
  readonly cart: Cart;
  readonly searchResults: SearchResultsItem;
  /**
   * Controls the one to many relationship between an item and its vendors in the search results and the side bar accordion.
   */
  readonly itemVendors: ItemVendors;
  /**
   * Controls the one to many relationship between a vendor and its items in a cart.
   */
  readonly cartItems: CartItems;
};

export type AdaptersHelper = ApiAdapters & StateAdapters;

export type Adapters = {
  readonly [K in keyof AdaptersHelper]: EntityAdapter<
    AdaptersHelper[K],
    number
  >;
};

export type AdapterSimpleSelectors = {
  readonly [K in keyof AdaptersHelper]: EntitySelectors<
    AdaptersHelper[K],
    EntityState<AdaptersHelper[K], number>,
    number
  >;
};

export type AdaptersInitialStates = {
  readonly [K in keyof AdaptersHelper]: EntityState<AdaptersHelper[K], number>;
};

type SelectorParam = {
  readonly params: readonly unknown[];
  readonly returnType: unknown;
  readonly name: string;
};

export type SelectorParamsProvider<
  State extends object,
  Params extends readonly SelectorParam[],
> = {
  readonly [K in Params[number] as `get${Capitalize<K["name"]>}`]: (
    state: State,
    ...params: K["params"]
  ) => K["returnType"];
};
