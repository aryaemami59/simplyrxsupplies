import type {
  CategoriesObjType,
  Category,
  ItemName,
  ItemObjType,
  ItemsObj,
  VendorNameType,
  VendorsObjType,
} from "./api";

export type AnyObject = Record<string, unknown>;

export type AnyArray = unknown[];

export type AnyFunction = () => unknown;

export type EmptyObject = Record<string, never>;

export type EmptyArray = [];

export type Composite = AnyFunction | AnyArray | AnyObject;

export type AnyNonNullishValue = string | number | boolean | object | Composite;
// | string
// | number
// | boolean
// | object
// | AnyObject
// | Composite
// | AnyArray;

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
