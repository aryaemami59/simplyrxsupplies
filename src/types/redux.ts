import { EntityState } from "@reduxjs/toolkit";

import type { Categories, Category, Item, Items, Vendor, Vendors } from "./api";

export type SearchResultsItem = {
  id: number;
  checkedVendors: number[];
};

type VendorsArray = Vendors[keyof Vendors][];

type CategoriesArray = Categories[keyof Categories][];

export type AddedState = {
  searchResults: EntityState<SearchResultsItem, number>;
  cart: EntityState<Cart, number>;
  // items: EntityState<NewItem, number>;
  vendors: EntityState<Vendor, number>;
  categories: EntityState<Category, number>;
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

export type ItemIdAndVendorId = {
  itemId: number;
  vendorId: number;
};
