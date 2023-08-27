import { EntityState } from "@reduxjs/toolkit";

import type { Categories, Item, Items, Vendors } from "./api";

export type CheckedVendors = {
  id: number;
  checked: boolean;
};

export type SearchResultsItem = {
  id: number;
  checkedVendors: EntityState<CheckedVendors, number>;
};

type VendorsArray = Vendors[keyof Vendors][];

type CategoriesArray = Categories[keyof Categories][];

export type AddedState = {
  searchResults: EntityState<SearchResultsItem, number>;
  cart: EntityState<Cart, number>;
  // items: EntityState<NewItem, number>;
  // vendors: EntityState<Vendor, number>;
  // categories: EntityState<Category, number>;
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

type NewItem = Omit<Item, "vendors"> & {
  readonly vendors: number[];
};

export type SuppliesEntityState = {
  readonly items: Items;
  readonly vendors: VendorsArray;
  readonly categories: CategoriesArray;
  readonly cart: Cart[];
};

export type ItemIdAndCheckedVendorIds = {
  itemId: number;
  checkedVendorIds: number[];
};

export type ItemIdAndVendorIds = {
  itemId: number;
  vendorIds: number[];
};

export type ItemIdAndVendorId = {
  itemId: number;
  vendorId: number;
};
