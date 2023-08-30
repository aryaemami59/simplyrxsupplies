import { EntityAdapter, EntitySelectors, EntityState } from "@reduxjs/toolkit";

import type { Category, Item, Vendor } from "./api";

export type CheckedVendorItem = {
  readonly id: number;
  readonly checkedVendors: number[];
  readonly vendors: number[];
};

export type SearchResultsItem = {
  readonly id: number;
};

export type CartItem = {
  readonly id: number;
  readonly vendorId: number;
  readonly minimized: boolean;
};

export type Cart = {
  readonly id: number;
  readonly items: EntityState<CartItem, number>;
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

type NonStateAdapters = {
  readonly cartItems: CartItem;
};

type ApiAdapters = {
  readonly items: Item;
  readonly vendors: Vendor;
  readonly categories: Category;
};

export type StateAdapters = {
  readonly cart: Cart;
  readonly searchResults: SearchResultsItem;
  readonly checkedVendorItems: CheckedVendorItem;
};

export type StateAndApiAdapters = ApiAdapters & StateAdapters;

type AdaptersHelper = NonStateAdapters & StateAndApiAdapters;

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
