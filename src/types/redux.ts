import { EntityState } from "@reduxjs/toolkit";

import type { Categories, Items, Vendors } from "./api";

export type CheckedVendors = {
  id: number;
  checked: boolean;
  itemId: number;
};

export type CheckedVendorItems = {
  id: number;
  checkedVendors: number[];
  vendors: number[];
};

export type SearchResultsItem = {
  id: number;
};

type VendorsArray = Vendors[keyof Vendors][];

type CategoriesArray = Categories[keyof Categories][];

export type AddedState = {
  searchResults: EntityState<SearchResultsItem, number>;
  cart: EntityState<Cart, number>;
  checkedVendorItems: EntityState<CheckedVendorItems, number>;
};

export type CartItems = {
  id: number;
  vendorId: number;
  minimized: boolean;
};

export type Cart = {
  readonly id: number;
  readonly items: EntityState<CartItems, number>;
};

export type SuppliesEntityState = {
  readonly items: Items;
  readonly vendors: VendorsArray;
  readonly categories: CategoriesArray;
  readonly cart: Cart[];
};

export type ItemIdAndVendorIds = {
  itemId: number;
  vendorIds: number[];
};

export type ItemIdAndVendorId = {
  itemId: number;
  vendorId: number;
};
