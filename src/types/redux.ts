import type {
  CategoriesObject,
  CategoryName,
  ItemName,
  ItemsObject,
  SingleItemObject,
  VendorName,
  VendorsObject,
} from "./api";

export type AddedState = {
  listItems: ItemName[];
  errorMessage: string;
  isLoading: boolean;
  itemsArray: ItemName[];
  itemsObject: ItemsObject;
  vendorsArray: VendorName[];
  vendorsObject: VendorsObject;
  categoriesArray: CategoryName[];
  categoriesObject: CategoriesObject;
};

export type FetchedData = {
  items: SingleItemObject[];
  vendors: VendorsObject;
  categories: CategoriesObject;
};
