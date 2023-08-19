import { EntityState } from "@reduxjs/toolkit";

import type { Categories, Item, Items, Vendors } from "./api";

export type SearchResultsItem = { id: number; checkedVendors: number[] };

export type VendorsArray = Vendors[keyof Vendors][];

export type CategoriesArray = Categories[keyof Categories][];

export type AddedState = {
  searchResultsItemNames: EntityState<Item>;
  // searchResultsItemNames: string[];
  // errorMessage: string;
  // isLoading: boolean;
  cart: EntityState<Cart>;
  items: EntityState<Item>;
  vendors: EntityState<VendorsArray>;
  categories: EntityState<CategoriesArray>;
  // readonly itemsArray: string[];
  // itemsObject: Record<string, SingleItemObject>;
  // readonly vendorsArray: VendorName[];
  // vendorsObject: VendorObject;
  // readonly categoriesArray: CategoryName[];
  // categoriesObject: Categories;
};

export type Cart = {
  readonly id: number;
  readonly items: EntityState<Pick<Item, "id"> & { vendorId: number }>;
};

export type SuppliesEntityState = {
  readonly items: Items;
  readonly vendors: VendorsArray;
  readonly categories: CategoriesArray;
  readonly cart: Cart[];
};

// export type FetchedData = {
//   items: SingleItemObject[];
//   vendors: VendorsObject;
//   categories: CategoriesObject;
// };
