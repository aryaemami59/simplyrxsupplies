import type {
  CategoryName,
  ItemName,
  ItemNumber,
  Link,
  OfficialVendorName,
  SingleItemObj,
  Src,
  VendorName,
} from "../types/api";
import emptyArr from "../utils/emptyArr";
import type { RootState } from "./store";

export const selectAddedItemsByVendor =
  (vendorName: VendorName) =>
  (state: RootState): ItemName[] =>
    state.added.vendorsObj[vendorName].itemsAdded;

export const selectVendorsArr = (state: RootState): VendorName[] =>
  state.added.vendorsArr.length ? state.added.vendorsArr : emptyArr;

export const selectVendorsLinks =
  (vendorName: VendorName) =>
  (state: RootState): Link =>
    state.added.vendorsObj[vendorName].link;

export const selectCategoriesArr = (state: RootState): CategoryName[] =>
  state.added.categoriesArr;

export const addedItemsLength =
  (vendorName: VendorName) =>
  (state: RootState): number =>
    state.added.vendorsObj[vendorName].itemsAdded.length;

export const selectItemNamesByVendor =
  (vendorName: VendorName) =>
  (state: RootState): ItemName[] =>
    Object.values(state.added.itemsObj)
      .filter(({ vendors }: SingleItemObj) => vendors.includes(vendorName))
      .map(({ name }) => name);

export const selectCategoriesItemNames =
  (categoryParam: CategoryName) =>
  (state: RootState): ItemName[] =>
    Object.values(state.added.itemsObj)
      .filter(({ category }) => category.includes(categoryParam as never))
      .map(({ name }) => name);

export const selectItemNamesArr = (state: RootState): ItemName[] =>
  state.added.itemsArr;

export const selectQRCodeContent =
  (vendorName: VendorName) =>
  (state: RootState): string =>
    state.added.vendorsObj[vendorName].qrContent;

export const selectQRText = (vendorName: VendorName) => (state: RootState) =>
  state.added.vendorsObj[vendorName].qrText;

export const checkIfAddedToAllVendors =
  (itemName: ItemName) =>
  (state: RootState): boolean =>
    state.added.itemsObj[itemName].vendorsAdded.length ===
    state.added.itemsObj[itemName].vendors.length;

export const checkIfItemAddedToOneVendor =
  (vendorName: VendorName, itemName: ItemName) =>
  (state: RootState): boolean =>
    state.added.itemsObj[itemName].vendorsAdded.includes(vendorName);

export const checkVendorsToAdd =
  (vendorName: VendorName, itemName: ItemName) =>
  (state: RootState): boolean =>
    state.added.itemsObj[itemName].vendorsToAdd.includes(vendorName);

export const checkVendorsAdded =
  (vendorName: VendorName, itemName: ItemName) =>
  (state: RootState): boolean =>
    state.added.itemsObj[itemName].vendorsAdded.includes(vendorName);

export const checkIfAnyAddedToOneVendor =
  (vendorName: VendorName) =>
  (state: RootState): boolean =>
    !!state.added.vendorsObj[vendorName].itemsAdded.length;

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
  (state: RootState): VendorName[] =>
    state.added.itemsObj[itemName].vendors;

export const selectVendorOfficialName =
  (vendorName: VendorName) =>
  (state: RootState): OfficialVendorName =>
    state.added.vendorsObj[vendorName].officialName;

export const selectAllListItems = (state: RootState) => state.added.listItems;

export const checkIfLoading = (state: RootState): boolean =>
  state.added.isLoading;

export const selectErrMsg = (state: RootState): string => state.added.errMsg;
