import type {
  CategoriesObj,
  CategoryName,
  ItemName,
  ItemsObj,
  SingleItemObj,
  VendorName,
  VendorsObj,
} from "./api";

export type AddedState = {
  listItems: ItemName[];
  errMsg: string;
  isLoading: boolean;
  itemsArr: ItemName[];
  itemsObj: ItemsObj;
  vendorsArr: VendorName[];
  vendorsObj: VendorsObj;
  categoriesArr: CategoryName[];
  categoriesObj: CategoriesObj;
};

export type FetchedData = {
  items: SingleItemObj[];
  vendors: VendorsObj;
  categories: CategoriesObj;
};
