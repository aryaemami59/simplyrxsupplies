import type {
  Categories,
  CategoryName,
  SingleItemObject,
  VendorName,
  VendorObject,
} from "./api";

export type AddedState = {
  searchResultsItemNames: string[];
  // errorMessage: string;
  // isLoading: boolean;
  readonly itemsArray: string[];
  itemsObject: Record<string, SingleItemObject>;
  readonly vendorsArray: VendorName[];
  vendorsObject: VendorObject;
  readonly categoriesArray: CategoryName[];
  categoriesObject: Categories;
};

// export type FetchedData = {
//   items: SingleItemObject[];
//   vendors: VendorsObject;
//   categories: CategoriesObject;
// };
