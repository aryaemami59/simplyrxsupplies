import {
  Category,
  ItemName,
  ItemNumber,
  Link,
  OfficialVendorNameType,
  Src,
  VendorNameType,
} from "../customTypes/types";
import { emptyArr } from "../features/shared/utilityFunctions";
import { RootState } from "./store";

export const selectAddedItemsByVendor =
  (vendorName: VendorNameType) =>
  (state: RootState): ItemName[] =>
    state.added.vendorsObj[vendorName].itemsAdded;

export const selectVendorsArr = (state: RootState): VendorNameType[] =>
  state.added.vendorsArr ? state.added.vendorsArr : emptyArr;

export const selectVendorsLinks =
  (vendorName: VendorNameType) =>
  (state: RootState): Link =>
    state.added.vendorsObj[vendorName].link;

export const selectCategoriesArr = (state: RootState): Category[] =>
  state.added.categoriesArr;

export const addedItemsLength =
  (vendorName: VendorNameType) =>
  (state: RootState): number =>
    state.added.vendorsObj[vendorName].itemsAdded.length;

export const selectItemNamesByVendor =
  (vendorName: VendorNameType) => (state: RootState) =>
    Object.values(state.added.itemsObj)
      .filter(({ vendors }) => vendors.includes(vendorName))
      .map(({ name }) => name);

export const selectCategoriesItemNames =
  (categoryParam: Category) =>
  (state: RootState): ItemName[] =>
    Object.values(state.added.itemsObj)
      .filter(({ category }) => category.includes(categoryParam))
      .map(({ name }) => name);

export const selectItemNamesArr = (state: RootState): ItemName[] =>
  state.added.itemsArr;

export const selectQRCodeContent =
  (vendorName: VendorNameType) =>
  (state: RootState): string =>
    state.added.vendorsObj[vendorName].qrContent;

export const selectQRText =
  (vendorName: VendorNameType) => (state: RootState) =>
    state.added.vendorsObj[vendorName].qrText;

export const checkIfAddedToAllVendors =
  (itemName: ItemName) =>
  (state: RootState): boolean =>
    state.added.itemsObj[itemName].vendorsAdded.length ===
    state.added.itemsObj[itemName].vendors.length;

export const checkIfItemAddedToOneVendor =
  (vendorName: VendorNameType, itemName: ItemName) =>
  (state: RootState): boolean =>
    state.added.itemsObj[itemName].vendorsAdded.includes(vendorName);

export const checkVendorsToAdd =
  (vendorName: VendorNameType, itemName: ItemName) =>
  (state: RootState): boolean =>
    state.added.itemsObj[itemName].vendorsToAdd.includes(vendorName);

export const checkVendorsAdded =
  (vendorName: VendorNameType, itemName: ItemName) =>
  (state: RootState): boolean =>
    state.added.itemsObj[itemName].vendorsAdded.includes(vendorName);

export const selectItemNumber =
  (itemName: ItemName) =>
  (state: RootState): ItemNumber =>
    state.added.itemsObj[itemName].itemNumber;

export const selectItemSrc =
  (itemName: ItemName) =>
  (state: RootState): Src =>
    state.added.itemsObj[itemName].src;

export const selectVendorsByItemName =
  (itemName: ItemName) =>
  (state: RootState): VendorNameType[] =>
    state.added.itemsObj[itemName].vendors;

export const selectVendorOfficialName =
  (vendorName: VendorNameType) =>
  (state: RootState): OfficialVendorNameType =>
    state.added.vendorsObj[vendorName].officialName;

export const selectAllListItems = (state: RootState) => state.added.listItems;

export const checkIfLoading = (state: RootState): boolean =>
  state.added.isLoading;

export const selectErrMsg = (state: RootState): string => state.added.errMsg;
