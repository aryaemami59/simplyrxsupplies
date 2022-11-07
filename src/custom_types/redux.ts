import {
  ItemName,
  VendorNameType,
  VendorsObjType,
  Category,
  ItemObjType,
  CategoriesObjType,
  ItemsObj,
} from "./api";

export type EmptyObj = Record<string, never>;

export type EmptyArr = [];

export type AddedState = {
  listItems: ItemName[];
  errMsg: string;
  isLoading: boolean;
  itemsArr: ItemName[];
  itemsObj: ItemsObj;
  vendorsArr: VendorNameType[];
  vendorsObj: VendorsObjType;
  categoriesArr: Category[];
  categoriesObj: CategoriesObjType;
};

export type FetchedData = {
  items: ItemObjType[];
  vendors: VendorsObjType;
  categories: CategoriesObjType;
};
