import type {
  CategoriesObject,
  CategoryName,
  ItemName,
  ItemsObject,
  SingleItemObject,
  VendorName,
  VendorsObject,
} from "./aa";

export type AddedState = {
  searchResultsItemNames: ItemName[];
  errorMessage: string;
  isLoading: boolean;
  readonly itemsArray: ItemName[];
  itemsObject: ItemsObject;
  readonly vendorsArray: VendorName[];
  vendorsObject: VendorsObject;
  readonly categoriesArray: CategoryName[];
  categoriesObject: CategoriesObject;
};

export type FetchedData = {
  items: SingleItemObject[];
  vendors: VendorsObject;
  categories: CategoriesObject;
};
